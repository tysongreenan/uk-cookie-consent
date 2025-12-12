import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function setUserPlan() {
  const email = process.argv[2]
  const plan = process.argv[3] || 'pro'

  if (!email) {
    console.log('Usage: node scripts/set-user-plan.js <email> [plan]')
    process.exit(1)
  }

  console.log(`Updating user ${email} to plan: ${plan}...`)

  // 1. Find the user
  const { data: user, error: findError } = await supabase
    .from('User')
    .select('id, email, planTier')
    .eq('email', email)
    .single()

  if (findError || !user) {
    console.error('User not found:', findError?.message || 'No user with that email')
    process.exit(1)
  }

  console.log(`Current plan: ${user.planTier}`)

  // 2. Update the plan
  const { data: updatedUser, error: updateError } = await supabase
    .from('User')
    .update({ 
      planTier: plan,
      upgradedAt: new Date().toISOString()
    })
    .eq('id', user.id)
    .select()
    .single()

  if (updateError) {
    console.error('Failed to update user:', updateError.message)
    process.exit(1)
  }

  console.log(`✅ Successfully updated ${email} to ${updatedUser.planTier}`)
}

setUserPlan()





