#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js')

// Load environment variables
require('dotenv').config({ path: './env.local' })

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
)

async function assignTeamToUser() {
  console.log('🔧 Assigning team to user...\n')

  try {
    // Get the first Tyson user (you can change this to the specific user you want)
    const { data: users, error: usersError } = await supabase
      .from('User')
      .select('id, name, email')
      .eq('email', 'mmtjk3@hotmail.com') // Change this to Tyson's email
      .limit(1)
    
    if (usersError || !users || users.length === 0) {
      console.error('❌ User not found')
      return
    }
    
    const user = users[0]
    console.log('Found user:', user)

    // Get the most recent team
    const { data: teams, error: teamsError } = await supabase
      .from('Team')
      .select('id, name, owner_id')
      .order('created_at', { ascending: false })
      .limit(1)
    
    if (teamsError || !teams || teams.length === 0) {
      console.error('❌ No teams found')
      return
    }
    
    const team = teams[0]
    console.log('Found team:', team)

    // Update the team owner to the current user
    const { error: updateTeamError } = await supabase
      .from('Team')
      .update({ owner_id: user.id })
      .eq('id', team.id)
    
    if (updateTeamError) {
      console.error('❌ Error updating team owner:', updateTeamError)
      return
    }
    console.log('✅ Team owner updated')

    // Add user as team member
    const { error: addMemberError } = await supabase
      .from('TeamMember')
      .insert({
        id: 'member-' + Date.now(),
        team_id: team.id,
        user_id: user.id,
        role: 'owner',
        invited_by: user.id,
        joined_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
    
    if (addMemberError) {
      console.error('❌ Error adding team member:', addMemberError)
      return
    }
    console.log('✅ User added as team member')

    // Update user's current team
    const { error: updateUserError } = await supabase
      .from('User')
      .update({ currentTeamId: team.id })
      .eq('id', user.id)
    
    if (updateUserError) {
      console.error('❌ Error updating user team:', updateUserError)
      return
    }
    console.log('✅ User current team updated')

    console.log('\n🎉 Team successfully assigned to user!')
    console.log(`User: ${user.name} (${user.email})`)
    console.log(`Team: ${team.name} (${team.id})`)

  } catch (error) {
    console.error('❌ Unexpected error:', error)
  }
}

// Run the function
assignTeamToUser()
