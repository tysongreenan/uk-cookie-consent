// Stripe webhook handler — one-time payments + annual subscriptions.
// Uses Supabase client directly (not Prisma) to avoid PgBouncer transaction-mode issues.
import { NextRequest, NextResponse } from 'next/server'
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { validatePaymentAmount } from '@/lib/security-validation'
import { logActivity, AuditAction } from '@/lib/audit-log'
import { generateDisputeEvidence } from '@/lib/dispute-evidence'
import Stripe from 'stripe'
import { randomUUID } from 'crypto'

const getStripe = () =>
  new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2025-09-30.clover' })

const getSupabase = (): SupabaseClient =>
  createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

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

const yearFromNowIso = () => {
  const d = new Date()
  d.setFullYear(d.getFullYear() + 1)
  return d.toISOString()
}

const newId = () => 'pay_' + randomUUID().replace(/-/g, '').slice(0, 24)

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    console.error('[WEBHOOK] Missing stripe-signature header')
    return fail('Missing signature')
  }

  let event: Stripe.Event
  try {
    event = getStripe().webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    console.error('[WEBHOOK] Signature verification failed:', err)
    return fail('Invalid signature')
  }

  console.log(`[WEBHOOK] Received event: ${event.type} (${event.id})`)
  const supabase = getSupabase()

  try {
    switch (event.type) {

      // ── Checkout completed (one-time OR subscription first payment) ──
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session

        if (session.payment_status !== 'paid') {
          console.error('[WEBHOOK] Payment not completed:', { sessionId: session.id, paymentStatus: session.payment_status })
          return ok()
        }

        const userId = session.metadata?.userId
        if (!userId) {
          console.error('[WEBHOOK] Missing userId in metadata:', { sessionId: session.id })
          return ok()
        }

        const { data: user, error: userErr } = await supabase
          .from('User')
          .select('id, email, "planTier"')
          .eq('id', userId)
          .single()

        if (userErr || !user) {
          console.error('[WEBHOOK] User not found:', { sessionId: session.id, userId, error: userErr?.message })
          return ok()
        }

        const billingCycle = session.metadata?.billingCycle || 'one_time'

        if (billingCycle === 'annual' || session.mode === 'subscription') {
          // ── Annual subscription ──
          const subscriptionId = session.subscription as string

          // Idempotency: don't reprocess same subscription
          const { data: existingSub } = await supabase
            .from('User')
            .select('id')
            .eq('id', userId)
            .eq('stripeSubscriptionId', subscriptionId)
            .maybeSingle()

          if (existingSub) {
            console.log('[WEBHOOK] Subscription already processed:', { sessionId: session.id, userId })
            return ok({ received: true, message: 'Already processed' })
          }

          const { error: updateErr } = await supabase
            .from('User')
            .update({
              planTier: 'pro_annual',
              billingCycle: 'annual',
              subscriptionStatus: 'active',
              stripeSubscriptionId: subscriptionId,
              stripeCustomerId: session.customer as string,
              upgradedAt: new Date().toISOString(),
              subscriptionEndsAt: yearFromNowIso(),
              featureFreezeDate: null,
              loyaltyUpgradeEligible: false,
            })
            .eq('id', userId)

          if (updateErr) {
            console.error('[WEBHOOK] User update failed (annual):', { userId, error: updateErr.message })
            return NextResponse.json({ error: 'User update failed' }, { status: 500, headers: SECURITY_HEADERS })
          }

          const { error: payErr } = await supabase
            .from('Payment')
            .insert({
              id: newId(),
              userId,
              amount: session.amount_total || 0,
              currency: session.currency || 'usd',
              status: 'succeeded',
              planTier: 'pro_annual',
              paymentType: 'subscription',
              stripeSessionId: session.id,
              stripePaymentIntentId: (session.payment_intent as string) || null,
              stripeCustomerId: session.customer as string,
            })

          if (payErr) {
            // Non-fatal: user is upgraded, just log Payment row failure (likely duplicate retry).
            console.warn('[WEBHOOK] Payment row insert failed (annual):', { userId, error: payErr.message })
          }

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

          // Idempotency: same paymentIntent already attached to this user
          const { data: existingPayment } = await supabase
            .from('User')
            .select('id')
            .eq('id', userId)
            .eq('stripePaymentIntentId', session.payment_intent as string)
            .maybeSingle()

          if (existingPayment) {
            console.log('[WEBHOOK] Payment already processed:', { sessionId: session.id, userId })
            return ok({ received: true, message: 'Already processed' })
          }

          if (user.planTier === 'pro_annual') {
            console.warn('[WEBHOOK] User already on annual, skipping one-time:', { userId })
            return ok({ received: true, message: 'User already on annual' })
          }

          if (user.planTier !== 'free') {
            console.warn('[WEBHOOK] User already upgraded:', { userId, currentPlan: user.planTier })
            return ok({ received: true, message: 'User already upgraded' })
          }

          const { error: updateErr } = await supabase
            .from('User')
            .update({
              planTier: 'pro_lifetime',
              billingCycle: 'one_time',
              upgradedAt: new Date().toISOString(),
              stripeCustomerId: session.customer as string,
              stripePaymentIntentId: session.payment_intent as string,
              featureFreezeDate: new Date().toISOString(),
              loyaltyUpgradeEligible: true,
            })
            .eq('id', userId)

          if (updateErr) {
            console.error('[WEBHOOK] User update failed (one-time):', { userId, error: updateErr.message })
            return NextResponse.json({ error: 'User update failed' }, { status: 500, headers: SECURITY_HEADERS })
          }

          const { error: payErr } = await supabase
            .from('Payment')
            .insert({
              id: newId(),
              userId,
              amount,
              currency: session.currency || 'usd',
              status: 'succeeded',
              planTier: 'pro_lifetime',
              paymentType: 'one_time',
              stripeSessionId: session.id,
              stripePaymentIntentId: session.payment_intent as string,
              stripeCustomerId: session.customer as string,
            })

          if (payErr) {
            console.warn('[WEBHOOK] Payment row insert failed (one-time):', { userId, error: payErr.message })
          }

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
        if (!subscriptionId) break

        if (invoice.billing_reason === 'subscription_create') {
          console.log('[WEBHOOK] Skipping initial subscription invoice:', { invoiceId: invoice.id })
          break
        }

        const { data: renewalUser } = await supabase
          .from('User')
          .select('id, email')
          .eq('stripeSubscriptionId', subscriptionId)
          .maybeSingle()

        if (!renewalUser) {
          console.error('[WEBHOOK] No user for subscription renewal:', { subscriptionId })
          break
        }

        await supabase
          .from('User')
          .update({
            subscriptionStatus: 'active',
            subscriptionEndsAt: yearFromNowIso(),
          })
          .eq('id', renewalUser.id)

        await supabase
          .from('Payment')
          .insert({
            id: newId(),
            userId: renewalUser.id,
            amount: invoice.amount_paid || 0,
            currency: invoice.currency || 'usd',
            status: 'succeeded',
            planTier: 'pro_annual',
            paymentType: 'subscription_renewal',
            stripeSessionId: invoice.id,
            stripePaymentIntentId: (invoice.payment_intent as string) || null,
            stripeCustomerId: invoice.customer as string,
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

        const { data: subUser } = await supabase
          .from('User')
          .select('id, email')
          .eq('stripeSubscriptionId', subscription.id)
          .maybeSingle()

        if (!subUser) {
          console.error('[WEBHOOK] No user for subscription update:', { subscriptionId: subscription.id })
          break
        }

        const newStatus = subscription.status === 'active' ? 'active'
          : subscription.status === 'past_due' ? 'past_due'
          : subscription.status === 'canceled' ? 'canceled'
          : null

        if (newStatus) {
          await supabase
            .from('User')
            .update({ subscriptionStatus: newStatus })
            .eq('id', subUser.id)
          console.log('[WEBHOOK] Subscription status updated:', { userId: subUser.id, status: newStatus })
        }
        break
      }

      // ── Subscription canceled/expired ──
      case 'customer.subscription.deleted': {
        const deletedSub = event.data.object as Stripe.Subscription

        const { data: deletedSubUser } = await supabase
          .from('User')
          .select('id, email, "planTier"')
          .eq('stripeSubscriptionId', deletedSub.id)
          .maybeSingle()

        if (!deletedSubUser) {
          console.error('[WEBHOOK] No user for deleted subscription:', { subscriptionId: deletedSub.id })
          break
        }

        await supabase
          .from('User')
          .update({
            planTier: 'pro_lifetime',
            billingCycle: 'one_time',
            subscriptionStatus: 'canceled',
            featureFreezeDate: new Date().toISOString(),
            loyaltyUpgradeEligible: true,
          })
          .eq('id', deletedSubUser.id)

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

        const { data: refundUser } = await supabase
          .from('User')
          .select('id, email, "planTier"')
          .eq('stripeCustomerId', refundCustomerId)
          .maybeSingle()

        if (!refundUser) {
          console.error('[WEBHOOK] No user found for refund customer:', refundCustomerId)
          break
        }

        await supabase
          .from('User')
          .update({ planTier: 'free', billingCycle: null, subscriptionStatus: null })
          .eq('id', refundUser.id)

        await supabase
          .from('Payment')
          .update({ status: 'refunded' })
          .eq('userId', refundUser.id)
          .eq('stripeCustomerId', refundCustomerId)
          .eq('status', 'succeeded')

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

        const { data: disputeUser } = await supabase
          .from('User')
          .select('id, email, "planTier"')
          .eq('stripeCustomerId', disputeCustomerId)
          .maybeSingle()

        if (!disputeUser) {
          console.error('[WEBHOOK] No user found for dispute customer:', disputeCustomerId)
          break
        }

        await supabase
          .from('User')
          .update({ planTier: 'free', billingCycle: null, subscriptionStatus: null })
          .eq('id', disputeUser.id)

        await supabase
          .from('Payment')
          .update({ status: 'disputed' })
          .eq('userId', disputeUser.id)
          .eq('stripeCustomerId', disputeCustomerId)
          .eq('status', 'succeeded')

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
