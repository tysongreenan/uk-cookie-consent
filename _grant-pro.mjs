import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const BHAVAY = '0f572dff-d21e-41fd-8ef0-e83889280a26'

const before = await supabase.from('User').select('id, email, "planTier"').eq('id', BHAVAY).single()
console.log('BEFORE:', before.data)

const upd = await supabase.from('User').update({ planTier: 'pro_lifetime' }).eq('id', BHAVAY).select('id, email, "planTier"').single()
console.log('AFTER: ', upd.data, 'error:', upd.error)

const ownerPlanTier = upd.data?.planTier || 'free'
const showPoweredBy = false // confirmed saved on banner 1dd2ccbd
const showBranding = ownerPlanTier === 'free' || showPoweredBy !== false
console.log('\nLive decision now -> showBranding (true = SHOWS it):', showBranding, showBranding ? 'STILL SHOWING' : 'HIDDEN ✅')
