import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const { data: user } = await supabase
  .from('User')
  .select('id, email, "planTier", "billingCycle", "upgradedAt", "stripeCustomerId", "stripePaymentIntentId", "featureFreezeDate", "loyaltyUpgradeEligible"')
  .eq('email', 'kaven.rousseau@cliniqueamica.vet')
  .single()
console.log('User:', JSON.stringify(user, null, 2))

const { data: payments } = await supabase
  .from('Payment').select('*').eq('userId', user.id)
console.log('Payments:', JSON.stringify(payments, null, 2))
