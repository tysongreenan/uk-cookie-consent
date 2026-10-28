import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const { data: payments, count } = await supabase
  .from('Payment')
  .select('*', { count: 'exact' })
  .order('createdAt', { ascending: false })
  .limit(20)
console.log(`Total payments: ${count}`)
for (const p of payments) {
  console.log(`${p.createdAt} | ${p.userId} | ${p.amount/100} ${p.currency} | ${p.planTier} | ${p.stripeSessionId?.slice(0,20)} | id=${p.id.slice(0,16)}...`)
}
