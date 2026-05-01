// One-off fix: reconcile a paid Stripe checkout that the webhook missed.
// Usage: node scripts/reconcile-stripe-payment.js <email>
import { createClient } from '@supabase/supabase-js'
import Stripe from 'stripe'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2025-09-30.clover' })

const email = process.argv[2]
if (!email) {
  console.error('Usage: node scripts/reconcile-stripe-payment.js <email>')
  process.exit(1)
}

const { data: user, error: userErr } = await supabase
  .from('User')
  .select('id, email, "planTier", "stripeCustomerId"')
  .eq('email', email)
  .single()

if (userErr || !user) {
  console.error('User not found:', userErr?.message || email)
  process.exit(1)
}
console.log(`Found user: ${user.id} (currently ${user.planTier})`)

// Find paid checkout sessions for this email (last 30 days of activity)
const customers = await stripe.customers.list({ email, limit: 5 })
let session = null
for (const c of customers.data) {
  const sessions = await stripe.checkout.sessions.list({ customer: c.id, limit: 10 })
  const paid = sessions.data.find(s => s.payment_status === 'paid')
  if (paid) { session = paid; break }
}

if (!session) {
  console.error('No paid checkout session found in Stripe for this email')
  process.exit(1)
}
console.log(`Found paid session: ${session.id} ($${(session.amount_total || 0) / 100} ${session.currency})`)

const isAnnual = session.mode === 'subscription' || session.metadata?.billingCycle === 'annual'
const planTier = isAnnual ? 'pro_annual' : 'pro_lifetime'
const paymentIntentId = session.payment_intent || ''
const customerId = session.customer

const userUpdate = isAnnual
  ? {
      planTier: 'pro_annual',
      billingCycle: 'annual',
      subscriptionStatus: 'active',
      stripeSubscriptionId: session.subscription,
      stripeCustomerId: customerId,
      upgradedAt: new Date().toISOString(),
      subscriptionEndsAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      featureFreezeDate: null,
      loyaltyUpgradeEligible: false,
    }
  : {
      planTier: 'pro_lifetime',
      billingCycle: 'one_time',
      upgradedAt: new Date().toISOString(),
      stripeCustomerId: customerId,
      stripePaymentIntentId: paymentIntentId,
      featureFreezeDate: new Date().toISOString(),
      loyaltyUpgradeEligible: true,
    }

const { error: updErr } = await supabase.from('User').update(userUpdate).eq('id', user.id)
if (updErr) { console.error('User update failed:', updErr.message); process.exit(1) }
console.log(`✅ User updated to ${planTier}`)

const { error: payErr } = await supabase.from('Payment').insert({
  id: 'reconcile_' + session.id.slice(-12) + '_' + Date.now(),
  userId: user.id,
  amount: session.amount_total || 0,
  currency: session.currency || 'usd',
  status: 'succeeded',
  planTier,
  paymentType: isAnnual ? 'subscription' : 'one_time',
  stripeSessionId: session.id,
  stripePaymentIntentId: paymentIntentId,
  stripeCustomerId: customerId,
})
if (payErr) console.warn('Payment row insert failed (non-fatal):', payErr.message)
else console.log('✅ Payment row created')

console.log('Done.')
