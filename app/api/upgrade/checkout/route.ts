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
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { userId } = await request.json()

    if (userId !== session.user.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Create Stripe checkout session
    const stripe = getStripe()
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.cookie-banner.ca'

    // Check for existing Stripe customer to avoid creating duplicates
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { stripeCustomerId: true },
    })

    const customerParams: Record<string, unknown> = user?.stripeCustomerId
      ? { customer: user.stripeCustomerId }
      : { customer_email: session.user.email || undefined, customer_creation: 'always' as const }

    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'UK Cookie Consent Pro - Lifetime Access',
              description: 'Analytics dashboard, team collaboration, custom layouts, logo uploads, and priority support - lifetime access with all future updates included',
              images: [`${BASE_URL}/logo.png`],
            },
            unit_amount: 9900, // $99.00 in cents
            tax_behavior: 'exclusive',
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${BASE_URL}/upgrade/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${BASE_URL}/upgrade`,
      ...customerParams,
      metadata: {
        userId: session.user.id,
        userEmail: session.user.email || '',
        planTier: 'pro'
      },
      allow_promotion_codes: true,
      billing_address_collection: 'required',
      tax_id_collection: {
        enabled: true,
      },
      automatic_tax: {
        enabled: true,
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

    return NextResponse.json({ url: checkoutSession.url })

  } catch (error) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
