import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Stripe from 'stripe'

const getStripe = () => {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('Stripe secret key not configured')
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2025-09-30.clover',
  })
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { userId, billingCycle = 'one_time' } = body

    if (userId !== session.user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!['one_time', 'annual'].includes(billingCycle)) {
      return NextResponse.json({ error: 'Invalid billing cycle' }, { status: 400 })
    }

    const stripe = getStripe()
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.cookie-banner.ca'

    // Check for existing Stripe customer
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { stripeCustomerId: true, planTier: true, loyaltyUpgradeEligible: true },
    })

    // Prevent double upgrades (allow loyalty upgrade from pro_lifetime to pro_annual)
    if (user?.planTier && user.planTier !== 'free') {
      if (billingCycle === 'one_time') {
        return NextResponse.json({ error: 'Already on a paid plan' }, { status: 400 })
      }
      if (billingCycle === 'annual' && user.planTier === 'pro_annual') {
        return NextResponse.json({ error: 'Already on annual plan' }, { status: 400 })
      }
    }

    const customerParams: Record<string, unknown> = user?.stripeCustomerId
      ? { customer: user.stripeCustomerId }
      : { customer_email: session.user.email || undefined, customer_creation: 'always' as const }

    const commonParams = {
      ...customerParams,
      success_url: `${BASE_URL}/upgrade/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${BASE_URL}/upgrade`,
      allow_promotion_codes: true,
      billing_address_collection: 'required' as const,
    }

    let checkoutSession: Stripe.Checkout.Session

    if (billingCycle === 'annual') {
      // ── Annual subscription checkout ──
      const ANNUAL_PRICE_ID = process.env.STRIPE_PRICE_ANNUAL
      if (!ANNUAL_PRICE_ID) {
        console.error('[CHECKOUT] STRIPE_PRICE_ANNUAL not configured')
        return NextResponse.json({ error: 'Annual pricing not configured' }, { status: 500 })
      }

      // Apply loyalty coupon for existing lifetime customers
      const discounts: Stripe.Checkout.SessionCreateParams.Discount[] = []
      const LOYALTY_COUPON = process.env.STRIPE_COUPON_LOYALTY
      if (LOYALTY_COUPON && user?.loyaltyUpgradeEligible) {
        discounts.push({ coupon: LOYALTY_COUPON })
      }

      checkoutSession = await stripe.checkout.sessions.create({
        ...commonParams,
        payment_method_types: ['card'],
        line_items: [{ price: ANNUAL_PRICE_ID, quantity: 1 }],
        mode: 'subscription',
        subscription_data: {
          metadata: {
            userId: session.user.id,
            userEmail: session.user.email || '',
            planTier: 'pro_annual',
            billingCycle: 'annual',
          },
        },
        metadata: {
          userId: session.user.id,
          userEmail: session.user.email || '',
          planTier: 'pro_annual',
          billingCycle: 'annual',
        },
        ...(discounts.length > 0 ? { discounts } : {}),
      })
    } else {
      // ── One-time payment checkout ──
      checkoutSession = await stripe.checkout.sessions.create({
        ...commonParams,
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'Cookie Banner Pro — Lifetime',
                description: 'All current Pro features forever. Security patches included. One-time payment.',
                images: [`${BASE_URL}/logo.png`],
              },
              unit_amount: 9900,
              tax_behavior: 'exclusive',
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        metadata: {
          userId: session.user.id,
          userEmail: session.user.email || '',
          planTier: 'pro_lifetime',
          billingCycle: 'one_time',
        },
        invoice_creation: {
          enabled: true,
          invoice_data: {
            footer: 'Thank you for your purchase. This invoice serves as your tax receipt.',
          },
        },
        payment_intent_data: {
          receipt_email: session.user.email || undefined,
        },
      })
    }

    return NextResponse.json({ url: checkoutSession.url })

  } catch (error) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}
