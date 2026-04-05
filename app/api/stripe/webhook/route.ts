// Stripe webhook handler — one-time payments + annual subscriptions
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { validatePaymentAmount } from '@/lib/security-validation'
import { logActivity, AuditAction } from '@/lib/audit-log'
import { generateDisputeEvidence } from '@/lib/dispute-evidence'
import Stripe from 'stripe'

const getStripe = () => {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('Stripe secret key not configured')
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2025-09-30.clover',
  })
}

const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
}

function ok(data: Record<string, unknown> = { received: true }) {
  return NextResponse.json(data, { headers: SECURITY_HEADERS })
}
function fail(error: string, status = 400) {
  return NextResponse.json({ error }, { status, headers: SECURITY_HEADERS })
}

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    console.error('[WEBHOOK] Missing stripe-signature header')
    return fail('Missing signature')
  }

  let event: Stripe.Event
  try {
    const stripe = getStripe()
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    console.error('[WEBHOOK] Signature verification failed:', err)
    return fail('Invalid signature')
  }

  console.log(`[WEBHOOK] Received event: ${event.type} (${event.id})`)

  try {
    switch (event.type) {

      // ── Checkout completed (one-time OR subscription first payment) ──
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session

        if (session.payment_status !== 'paid') {
          console.error('[WEBHOOK] Payment not completed:', { sessionId: session.id, paymentStatus: session.payment_status })
          return ok() // Acknowledge to stop Stripe retries — payment isn't complete yet
        }

        const userId = session.metadata?.userId
        if (!userId) {
          console.error('[WEBHOOK] Missing userId in metadata:', { sessionId: session.id })
          return ok() // Acknowledge — can't process without userId, don't retry
        }

        const user = await prisma.user.findUnique({
          where: { id: userId },
          select: { id: true, email: true, planTier: true },
        })
        if (!user) {
          console.error('[WEBHOOK] User not found:', { sessionId: session.id, userId })
          return ok() // User may have been deleted — don't retry
        }

        const billingCycle = session.metadata?.billingCycle || 'one_time'

        if (billingCycle === 'annual' || session.mode === 'subscription') {
          // ── Annual subscription ──
          const subscriptionId = session.subscription as string

          // Prevent duplicate subscription processing
          const existingSub = await prisma.user.findFirst({
            where: { id: userId, stripeSubscriptionId: subscriptionId },
          })
          if (existingSub) {
            console.log('[WEBHOOK] Subscription already processed:', { sessionId: session.id, userId })
            return ok({ received: true, message: 'Already processed' })
          }

          // Calculate subscription end date (1 year from now)
          const subscriptionEndsAt = new Date()
          subscriptionEndsAt.setFullYear(subscriptionEndsAt.getFullYear() + 1)

          await prisma.user.update({
            where: { id: userId },
            data: {
              planTier: 'pro_annual',
              billingCycle: 'annual',
              subscriptionStatus: 'active',
              stripeSubscriptionId: subscriptionId,
              stripeCustomerId: session.customer as string,
              upgradedAt: new Date(),
              subscriptionEndsAt,
              featureFreezeDate: null, // Annual users have no freeze
              loyaltyUpgradeEligible: false, // They've upgraded
            },
          })

          await prisma.payment.create({
            data: {
              userId,
              amount: session.amount_total || 0,
              currency: session.currency || 'usd',
              status: 'succeeded',
              planTier: 'pro_annual',
              paymentType: 'subscription',
              stripeSessionId: session.id,
              stripePaymentIntentId: (session.payment_intent as string) || '',
              stripeCustomerId: session.customer as string,
            },
          })

          logActivity(userId, AuditAction.PLAN_UPGRADE, null, {
            planTier: 'pro_annual',
            billingCycle: 'annual',
            amount: (session.amount_total || 0) / 100,
            stripeSessionId: session.id,
          })

          console.log('[WEBHOOK] User upgraded to pro_annual:', { userId, email: user.email })

        } else {
          // ── One-time payment ──
          const amount = session.amount_total || 0
          const amountValidation = validatePaymentAmount(amount)
          if (!amountValidation.valid) {
            console.error('[WEBHOOK] Invalid payment amount:', { sessionId: session.id, amount })
            return fail('Invalid payment amount')
          }

          // Idempotency check
          const existingPayment = await prisma.user.findFirst({
            where: { id: userId, stripePaymentIntentId: session.payment_intent as string },
          })
          if (existingPayment) {
            console.log('[WEBHOOK] Payment already processed:', { sessionId: session.id, userId })
            return ok({ received: true, message: 'Already processed' })
          }

          // Don't downgrade an annual subscriber to lifetime
          if (user.planTier === 'pro_annual') {
            console.warn('[WEBHOOK] User already on annual, skipping one-time:', { userId })
            return ok({ received: true, message: 'User already on annual' })
          }

          if (user.planTier !== 'free') {
            console.warn('[WEBHOOK] User already upgraded:', { userId, currentPlan: user.planTier })
            return ok({ received: true, message: 'User already upgraded' })
          }

          await prisma.$transaction([
            prisma.user.update({
              where: { id: userId },
              data: {
                planTier: 'pro_lifetime',
                billingCycle: 'one_time',
                upgradedAt: new Date(),
                stripeCustomerId: session.customer as string,
                stripePaymentIntentId: session.payment_intent as string,
                featureFreezeDate: new Date(),
                loyaltyUpgradeEligible: true,
              },
            }),
            prisma.payment.create({
              data: {
                userId,
                amount,
                currency: session.currency || 'usd',
                status: 'succeeded',
                planTier: 'pro_lifetime',
                paymentType: 'one_time',
                stripeSessionId: session.id,
                stripePaymentIntentId: session.payment_intent as string,
                stripeCustomerId: session.customer as string,
              },
            }),
          ])

          logActivity(userId, AuditAction.PLAN_UPGRADE, null, {
            planTier: 'pro_lifetime',
            billingCycle: 'one_time',
            amount: amount / 100,
            stripeSessionId: session.id,
          })

          console.log('[WEBHOOK] User upgraded to pro_lifetime:', { userId, email: user.email, amount: amount / 100 })
        }

        break
      }

      // ── Subscription renewal (invoice paid after first payment) ──
      case 'invoice.paid': {
        const invoice = event.data.object as Stripe.Invoice & { subscription?: string; payment_intent?: string }
        const subscriptionId = invoice.subscription as string
        if (!subscriptionId) break // Not a subscription invoice

        // Skip the first invoice (handled by checkout.session.completed)
        if (invoice.billing_reason === 'subscription_create') {
          console.log('[WEBHOOK] Skipping initial subscription invoice:', { invoiceId: invoice.id })
          break
        }

        const renewalUser = await prisma.user.findFirst({
          where: { stripeSubscriptionId: subscriptionId },
          select: { id: true, email: true },
        })

        if (!renewalUser) {
          console.error('[WEBHOOK] No user for subscription renewal:', { subscriptionId })
          break
        }

        const subscriptionEndsAt = new Date()
        subscriptionEndsAt.setFullYear(subscriptionEndsAt.getFullYear() + 1)

        await prisma.user.update({
          where: { id: renewalUser.id },
          data: {
            subscriptionStatus: 'active',
            subscriptionEndsAt,
          },
        })

        await prisma.payment.create({
          data: {
            userId: renewalUser.id,
            amount: invoice.amount_paid || 0,
            currency: invoice.currency || 'usd',
            status: 'succeeded',
            planTier: 'pro_annual',
            paymentType: 'subscription_renewal',
            stripeSessionId: invoice.id,
            stripePaymentIntentId: (invoice.payment_intent as string) || '',
            stripeCustomerId: invoice.customer as string,
          },
        })

        logActivity(renewalUser.id, AuditAction.PLAN_UPGRADE, null, {
          reason: 'subscription_renewal',
          amount: (invoice.amount_paid || 0) / 100,
        })

        console.log('[WEBHOOK] Subscription renewed:', { userId: renewalUser.id, email: renewalUser.email })
        break
      }

      // ── Subscription status changes ──
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription

        const subUser = await prisma.user.findFirst({
          where: { stripeSubscriptionId: subscription.id },
          select: { id: true, email: true },
        })

        if (!subUser) {
          console.error('[WEBHOOK] No user for subscription update:', { subscriptionId: subscription.id })
          break
        }

        const newStatus = subscription.status === 'active' ? 'active'
          : subscription.status === 'past_due' ? 'past_due'
          : subscription.status === 'canceled' ? 'canceled'
          : null

        if (newStatus) {
          await prisma.user.update({
            where: { id: subUser.id },
            data: { subscriptionStatus: newStatus },
          })
          console.log('[WEBHOOK] Subscription status updated:', { userId: subUser.id, status: newStatus })
        }

        break
      }

      // ── Subscription canceled/expired ──
      case 'customer.subscription.deleted': {
        const deletedSub = event.data.object as Stripe.Subscription

        const deletedSubUser = await prisma.user.findFirst({
          where: { stripeSubscriptionId: deletedSub.id },
          select: { id: true, email: true, planTier: true },
        })

        if (!deletedSubUser) {
          console.error('[WEBHOOK] No user for deleted subscription:', { subscriptionId: deletedSub.id })
          break
        }

        // Downgrade to pro_lifetime (not free) — they keep features frozen at cancellation
        await prisma.user.update({
          where: { id: deletedSubUser.id },
          data: {
            planTier: 'pro_lifetime',
            billingCycle: 'one_time',
            subscriptionStatus: 'canceled',
            featureFreezeDate: new Date(),
            loyaltyUpgradeEligible: true, // They can re-subscribe later
          },
        })

        logActivity(deletedSubUser.id, AuditAction.PLAN_DOWNGRADE, null, {
          reason: 'subscription_canceled',
          previousPlan: deletedSubUser.planTier,
          newPlan: 'pro_lifetime',
        })

        console.log('[WEBHOOK] Subscription canceled, downgraded to pro_lifetime:', {
          userId: deletedSubUser.id,
          email: deletedSubUser.email,
        })

        break
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.log('[WEBHOOK] Payment succeeded:', { paymentIntentId: paymentIntent.id, amount: paymentIntent.amount / 100 })
        break
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.error('[WEBHOOK] Payment failed:', { paymentIntentId: paymentIntent.id, error: paymentIntent.last_payment_error?.message })
        break
      }

      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge
        const refundCustomerId = charge.customer as string | null

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
            data: { planTier: 'free', billingCycle: null, subscriptionStatus: null },
          }),
          prisma.payment.updateMany({
            where: { userId: refundUser.id, stripeCustomerId: refundCustomerId, status: 'succeeded' },
            data: { status: 'refunded' },
          }),
        ])

        logActivity(refundUser.id, AuditAction.PLAN_DOWNGRADE, null, {
          reason: 'refund',
          chargeId: charge.id,
          amount: charge.amount_refunded / 100,
        })

        console.log('[WEBHOOK] User downgraded due to refund:', { userId: refundUser.id, email: refundUser.email })
        break
      }

      case 'charge.dispute.created': {
        const dispute = event.data.object as Stripe.Dispute
        const disputeCustomerId = (dispute as unknown as { customer: string | null }).customer

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
            data: { planTier: 'free', billingCycle: null, subscriptionStatus: null },
          }),
          prisma.payment.updateMany({
            where: { userId: disputeUser.id, stripeCustomerId: disputeCustomerId, status: 'succeeded' },
            data: { status: 'disputed' },
          }),
        ])

        logActivity(disputeUser.id, AuditAction.PLAN_DOWNGRADE, null, {
          reason: 'dispute',
          disputeId: dispute.id,
          amount: dispute.amount / 100,
        })

        try {
          const evidence = await generateDisputeEvidence(disputeCustomerId)
          if (evidence) {
            console.log('[WEBHOOK] Dispute evidence generated. Review at /api/admin/dispute-evidence?customerId=' + disputeCustomerId)
          }
        } catch (evidenceError) {
          console.error('[WEBHOOK] Failed to generate dispute evidence:', evidenceError)
        }

        console.log('[WEBHOOK] User downgraded due to chargeback:', { userId: disputeUser.id, email: disputeUser.email })
        break
      }

      default:
        console.log('[WEBHOOK] Unhandled event type:', event.type)
    }

    return ok()
  } catch (error) {
    console.error('[WEBHOOK] Processing error:', {
      eventId: event.id,
      eventType: event.type,
      error: error instanceof Error ? error.message : 'Unknown error',
    })
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500, headers: SECURITY_HEADERS })
  }
}
