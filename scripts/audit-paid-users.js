import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const { data: users } = await supabase
  .from('User')
  .select('id, email, "planTier", "billingCycle", "upgradedAt", "stripeCustomerId", "stripePaymentIntentId", "stripeSubscriptionId"')
  .neq('planTier', 'free')
  .order('upgradedAt', { ascending: false })

console.log(`Paid users: ${users.length}`)
for (const u of users) {
  const { data: pays } = await supabase
    .from('Payment').select('id, stripeSessionId').eq('userId', u.id)
  console.log(`${u.upgradedAt || 'no-date'} | ${u.email} | ${u.planTier} | payments=${pays?.length || 0} | cust=${u.stripeCustomerId?.slice(0,12) || '-'} | pi=${u.stripePaymentIntentId?.slice(0,12) || '-'} | sub=${u.stripeSubscriptionId?.slice(0,12) || '-'}`)
}
