// Production Stripe webhook handler - One-time payments at $99
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { validatePaymentAmount } from '@/lib/security-validation'
import Stripe from 'stripe'

const getStripe = () => {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('Stripe secret key not configured')
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2025-09-30.clover',
  })
}

// Security headers for all responses
const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
}

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    console.error('[WEBHOOK] Missing stripe-signature header')
    return NextResponse.json(
      { error: 'Missing signature' },
      { status: 400, headers: SECURITY_HEADERS }
    )
  }

  // Validate webhook signature
  let event: Stripe.Event
  try {
    const stripe = getStripe()
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('[WEBHOOK] Signature verification failed:', err)
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400, headers: SECURITY_HEADERS }
    )
  }

  console.log(`[WEBHOOK] Received event: ${event.type} (${event.id})`)

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session

        // Validate payment status
        if (session.payment_status !== 'paid') {
          console.error('[WEBHOOK] Payment not completed:', {
            sessionId: session.id,
            paymentStatus: session.payment_status,
          })
          return NextResponse.json(
            { error: 'Payment not completed' },
            { status: 400, headers: SECURITY_HEADERS }
          )
        }

        // Validate payment amount against allowed range (supports promo codes)
        const amount = session.amount_total || 0
        const amountValidation = validatePaymentAmount(amount)
        if (!amountValidation.valid) {
          console.error('[WEBHOOK] Invalid payment amount:', {
            sessionId: session.id,
            amount,
            error: amountValidation.error,
          })
          return NextResponse.json(
            { error: 'Invalid payment amount' },
            { status: 400, headers: SECURITY_HEADERS }
          )
        }

        // Extract metadata
        const userId = session.metadata?.userId
        const planTier = session.metadata?.planTier || 'pro'

        if (!userId) {
          console.error('[WEBHOOK] Missing userId in metadata:', {
            sessionId: session.id,
            metadata: session.metadata,
          })
          return NextResponse.json(
            { error: 'Missing user metadata' },
            { status: 400, headers: SECURITY_HEADERS }
          )
        }

        // Check for duplicate processing using idempotency
        const existingPayment = await prisma.user.findFirst({
          where: {
            id: userId,
            stripePaymentIntentId: session.payment_intent as string,
          },
        })

        if (existingPayment) {
          console.log('[WEBHOOK] Payment already processed:', {
            sessionId: session.id,
            userId,
          })
          return NextResponse.json(
            { received: true, message: 'Already processed' },
            { headers: SECURITY_HEADERS }
          )
        }

        // Validate user exists and is on free plan
        const user = await prisma.user.findUnique({
          where: { id: userId },
          select: { id: true, email: true, planTier: true },
        })

        if (!user) {
          console.error('[WEBHOOK] User not found:', {
            sessionId: session.id,
            userId,
          })
          return NextResponse.json(
            { error: 'User not found' },
            { status: 404, headers: SECURITY_HEADERS }
          )
        }

        if (user.planTier === 'pro' || user.planTier === 'enterprise') {
          console.warn('[WEBHOOK] User already upgraded:', {
            sessionId: session.id,
            userId,
            currentPlan: user.planTier,
          })
          return NextResponse.json(
            { received: true, message: 'User already upgraded' },
            { headers: SECURITY_HEADERS }
          )
        }

        // Update user to Pro plan and create payment record
        await prisma.$transaction([
          prisma.user.update({
            where: { id: userId },
            data: {
              planTier: planTier,
              upgradedAt: new Date(),
              stripeCustomerId: session.customer as string,
              stripePaymentIntentId: session.payment_intent as string,
            },
          }),
          prisma.payment.create({
            data: {
              userId: userId,
              amount: amount,
              currency: session.currency || 'usd',
              status: 'succeeded',
              planTier: planTier,
              stripeSessionId: session.id,
              stripePaymentIntentId: session.payment_intent as string,
              stripeCustomerId: session.customer as string,
            },
          }),
        ])

        console.log('[WEBHOOK] User upgraded successfully:', {
          sessionId: session.id,
          userId,
          planTier,
          amount: amount / 100,
          email: user.email,
        })

        break
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.log('[WEBHOOK] Payment succeeded:', {
          paymentIntentId: paymentIntent.id,
          amount: paymentIntent.amount / 100,
        })
        break
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.error('[WEBHOOK] Payment failed:', {
          paymentIntentId: paymentIntent.id,
          amount: paymentIntent.amount / 100,
          error: paymentIntent.last_payment_error?.message,
        })
        break
      }

      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge
        const refundCustomerId = charge.customer as string | null

        console.log('[WEBHOOK] Charge refunded:', {
          chargeId: charge.id,
          customerId: refundCustomerId,
          amount: charge.amount / 100,
          refunded: charge.amount_refunded / 100,
        })

        if (!refundCustomerId) {
          console.error('[WEBHOOK] No customer ID on refunded charge:', charge.id)
          break
        }

        const refundUser = await prisma.user.findFirst({
          where: { stripeCustomerId: refundCustomerId },
          select: { id: true, email: true, planTier: true },
        })

        if (!refundUser) {
          console.error('[WEBHOOK] No user found for refund customer:', refundCustomerId)
          break
        }

        await prisma.$transaction([
          prisma.user.update({
            where: { id: refundUser.id },
            data: {
              planTier: 'free',
            },
          }),
          prisma.payment.updateMany({
            where: {
              userId: refundUser.id,
              stripeCustomerId: refundCustomerId,
              status: 'succeeded',
            },
            data: {
              status: 'refunded',
            },
          }),
        ])

        console.log('[WEBHOOK] User downgraded due to refund:', {
          chargeId: charge.id,
          userId: refundUser.id,
          email: refundUser.email,
          previousPlan: refundUser.planTier,
          newPlan: 'free',
          refundedAmount: charge.amount_refunded / 100,
        })

        break
      }

      case 'charge.dispute.created': {
        const dispute = event.data.object as Stripe.Dispute
        const disputeCharge = dispute.charge as string
        const disputeCustomerId = (dispute as unknown as { customer: string | null }).customer

        console.log('[WEBHOOK] Charge dispute created:', {
          disputeId: dispute.id,
          chargeId: disputeCharge,
          amount: dispute.amount / 100,
          reason: dispute.reason,
        })

        if (!disputeCustomerId) {
          console.error('[WEBHOOK] No customer ID on dispute:', dispute.id)
          break
        }

        const disputeUser = await prisma.user.findFirst({
          where: { stripeCustomerId: disputeCustomerId },
          select: { id: true, email: true, planTier: true },
        })

        if (!disputeUser) {
          console.error('[WEBHOOK] No user found for dispute customer:', disputeCustomerId)
          break
        }

        await prisma.$transaction([
          prisma.user.update({
            where: { id: disputeUser.id },
            data: {
              planTier: 'free',
            },
          }),
          prisma.payment.updateMany({
            where: {
              userId: disputeUser.id,
              stripeCustomerId: disputeCustomerId,
              status: 'succeeded',
            },
            data: {
              status: 'disputed',
            },
          }),
        ])

        console.log('[WEBHOOK] User downgraded due to chargeback:', {
          disputeId: dispute.id,
          userId: disputeUser.id,
          email: disputeUser.email,
          previousPlan: disputeUser.planTier,
          newPlan: 'free',
          disputeAmount: dispute.amount / 100,
          reason: dispute.reason,
        })

        break
      }

      default:
        console.log('[WEBHOOK] Unhandled event type:', event.type)
    }

    return NextResponse.json(
      { received: true },
      { headers: SECURITY_HEADERS }
    )
  } catch (error) {
    console.error('[WEBHOOK] Processing error:', {
      eventId: event.id,
      eventType: event.type,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    })

    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500, headers: SECURITY_HEADERS }
    )
  }
}
