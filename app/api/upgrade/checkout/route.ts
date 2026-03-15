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

    // Fetch user name from database for Stripe customer record
    const stripe = getStripe()
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { name: true, email: true, stripeCustomerId: true },
    })

    // Create or retrieve Stripe customer with name
    let customerId = user?.stripeCustomerId
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: session.user.email || undefined,
        name: user?.name || undefined,
        metadata: { userId: session.user.id },
      })
      customerId = customer.id

      // Store Stripe customer ID for future use
      await prisma.user.update({
        where: { id: session.user.id },
        data: { stripeCustomerId: customerId },
      })
    } else {
      // Update existing customer name in case it was missing or changed
      await stripe.customers.update(customerId, {
        name: user?.name || undefined,
      })
    }

    // Create Stripe checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'UK Cookie Consent Pro - Lifetime Access',
              description: 'Analytics dashboard, team collaboration, custom layouts, logo uploads, and priority support - lifetime access with all future updates included',
              images: [`${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.cookie-banner.ca'}/logo.png`],
            },
            unit_amount: 9900, // $99.00 in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.cookie-banner.ca'}/upgrade/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.cookie-banner.ca'}/upgrade`,
      customer: customerId,
      metadata: {
        userId: session.user.id,
        userEmail: session.user.email || '',
        planTier: 'pro'
      },
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
      invoice_creation: {
        enabled: true,
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
