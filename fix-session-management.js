// Fix session management by ensuring currentTeamId is properly set
// This script updates the user's current_team_id in the database

const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function fixUserSessions() {
  try {
    console.log('🔧 Fixing user sessions...')
    
    // Get all users who don't have a current_team_id set
    const { data: users, error: usersError } = await supabase
      .from('User')
      .select('id, current_team_id')
      .is('current_team_id', null)
    
    if (usersError) {
      console.error('Error fetching users:', usersError)
      return
    }
    
    console.log(`Found ${users.length} users without current_team_id`)
    
    for (const user of users) {
      // Find the user's first team
      const { data: teamMember, error: teamError } = await supabase
        .from('TeamMember')
        .select('team_id')
        .eq('user_id', user.id)
        .limit(1)
        .single()
      
      if (teamError) {
        console.error(`Error finding team for user ${user.id}:`, teamError)
        continue
      }
      
      if (teamMember) {
        // Update the user's current_team_id
        const { error: updateError } = await supabase
          .from('User')
          .update({ current_team_id: teamMember.team_id })
          .eq('id', user.id)
        
        if (updateError) {
          console.error(`Error updating user ${user.id}:`, updateError)
        } else {
          console.log(`✅ Updated user ${user.id} with team ${teamMember.team_id}`)
        }
      }
    }
    
    console.log('✅ Session management fix complete')
  } catch (error) {
    console.error('Error fixing sessions:', error)
  }
}

fixUserSessions()
