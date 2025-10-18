#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js')

// Load environment variables
require('dotenv').config({ path: './env.local' })

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

async function debugUserPlan() {
  console.log('🔍 Debugging User Plan and Team Creation...\n')

  try {
    // 1. Check if there are any users in the database
    console.log('1. Checking users in database...')
    const { data: users, error: usersError } = await supabase
      .from('User')
      .select('*')
      .limit(1)
    
    if (usersError) {
      console.error('❌ Error fetching users:', usersError)
      return
    }
    
    console.log('✅ Users found:', users?.length || 0)
    if (users && users.length > 0) {
      console.log('User columns:', Object.keys(users[0]))
      console.log('Sample user:', users[0])
    }

    // 2. Check if there are any teams
    console.log('\n2. Checking teams in database...')
    const { data: teams, error: teamsError } = await supabase
      .from('Team')
      .select('*')
      .limit(1)
    
    if (teamsError) {
      console.error('❌ Error fetching teams:', teamsError)
      return
    }
    
    console.log('✅ Teams found:', teams?.length || 0)
    if (teams && teams.length > 0) {
      console.log('Team columns:', Object.keys(teams[0]))
      console.log('Sample team:', teams[0])
    }

    // 3. Check if there are any team members
    console.log('\n3. Checking team members in database...')
    const { data: teamMembers, error: membersError } = await supabase
      .from('TeamMember')
      .select('*')
      .limit(1)
    
    if (membersError) {
      console.error('❌ Error fetching team members:', membersError)
      console.log('This confirms the RLS policy issue!')
      return
    }
    
    console.log('✅ Team members found:', teamMembers?.length || 0)
    if (teamMembers && teamMembers.length > 0) {
      console.log('TeamMember columns:', Object.keys(teamMembers[0]))
      console.log('Sample team member:', teamMembers[0])
    }

  } catch (error) {
    console.error('❌ Unexpected error:', error)
  }
}

// Run the debug function
debugUserPlan()