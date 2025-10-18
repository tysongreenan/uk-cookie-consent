#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js')

// Load environment variables
require('dotenv').config({ path: './env.local' })

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

async function debugSession() {
  console.log('🔍 Debugging Session and Team Association...\n')

  try {
    // 1. Check all users
    console.log('1. All users in database:')
    const { data: users, error: usersError } = await supabase
      .from('User')
      .select('id, name, email, currentTeamId')
      .order('createdAt', { ascending: false })
    
    if (usersError) {
      console.error('❌ Error fetching users:', usersError)
      return
    }
    
    users.forEach((user, index) => {
      console.log(`User ${index + 1}:`, {
        id: user.id,
        name: user.name,
        email: user.email,
        currentTeamId: user.currentTeamId
      })
    })

    // 2. Check all teams
    console.log('\n2. All teams in database:')
    const { data: teams, error: teamsError } = await supabase
      .from('Team')
      .select('id, name, owner_id, created_at')
      .order('created_at', { ascending: false })
    
    if (teamsError) {
      console.error('❌ Error fetching teams:', teamsError)
      return
    }
    
    teams.forEach((team, index) => {
      console.log(`Team ${index + 1}:`, {
        id: team.id,
        name: team.name,
        owner_id: team.owner_id,
        created_at: team.created_at
      })
    })

    // 3. Check all team members
    console.log('\n3. All team members in database:')
    const { data: members, error: membersError } = await supabase
      .from('TeamMember')
      .select('id, team_id, user_id, role, joined_at')
      .order('joined_at', { ascending: false })
    
    if (membersError) {
      console.error('❌ Error fetching team members:', membersError)
      return
    }
    
    members.forEach((member, index) => {
      console.log(`Member ${index + 1}:`, {
        id: member.id,
        team_id: member.team_id,
        user_id: member.user_id,
        role: member.role,
        joined_at: member.joined_at
      })
    })

    // 4. Find which user should have which team
    console.log('\n4. User-Team associations:')
    users.forEach(user => {
      const userTeams = teams.filter(team => team.owner_id === user.id)
      const userMemberships = members.filter(member => member.user_id === user.id)
      
      console.log(`\nUser: ${user.name} (${user.email})`)
      console.log(`  - Current Team ID: ${user.currentTeamId}`)
      console.log(`  - Owned Teams: ${userTeams.length}`)
      userTeams.forEach(team => {
        console.log(`    * ${team.name} (${team.id})`)
      })
      console.log(`  - Team Memberships: ${userMemberships.length}`)
      userMemberships.forEach(member => {
        const team = teams.find(t => t.id === member.team_id)
        console.log(`    * ${team?.name || 'Unknown'} (${member.role})`)
      })
    })

  } catch (error) {
    console.error('❌ Unexpected error:', error)
  }
}

// Run the debug function
debugSession()
