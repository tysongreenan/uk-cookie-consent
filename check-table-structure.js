#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js')

// Load environment variables
require('dotenv').config({ path: './env.local' })

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

async function checkTableStructure() {
  console.log('🔍 Checking Database Table Structure...\n')

  try {
    // 1. Check User table structure
    console.log('1. User table structure:')
    const { data: users, error: usersError } = await supabase
      .from('User')
      .select('*')
      .limit(1)
    
    if (usersError) {
      console.error('❌ User table error:', usersError)
    } else {
      console.log('✅ User table accessible')
      if (users && users.length > 0) {
        console.log('Columns:', Object.keys(users[0]))
      }
    }

    // 2. Check Team table structure
    console.log('\n2. Team table structure:')
    const { data: teams, error: teamsError } = await supabase
      .from('Team')
      .select('*')
      .limit(1)
    
    if (teamsError) {
      console.error('❌ Team table error:', teamsError)
    } else {
      console.log('✅ Team table accessible')
      if (teams && teams.length > 0) {
        console.log('Columns:', Object.keys(teams[0]))
      }
    }

    // 3. Check TeamMember table structure
    console.log('\n3. TeamMember table structure:')
    const { data: teamMembers, error: membersError } = await supabase
      .from('TeamMember')
      .select('*')
      .limit(1)
    
    if (membersError) {
      console.error('❌ TeamMember table error:', membersError)
    } else {
      console.log('✅ TeamMember table accessible')
      if (teamMembers && teamMembers.length > 0) {
        console.log('Columns:', Object.keys(teamMembers[0]))
      }
    }

    // 4. Check if there are any existing RLS policies
    console.log('\n4. Checking existing RLS policies...')
    const { data: policies, error: policiesError } = await supabase
      .rpc('get_table_policies', { table_name: 'TeamMember' })
      .limit(10)
    
    if (policiesError) {
      console.log('Note: Could not fetch policies via RPC, but that\'s okay')
    } else {
      console.log('Policies found:', policies?.length || 0)
    }

  } catch (error) {
    console.error('❌ Unexpected error:', error)
  }
}

// Run the debug function
checkTableStructure()
