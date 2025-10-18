#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js')

// Load environment variables
require('dotenv').config({ path: './env.local' })

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

async function debugTeamCreationDetailed() {
  console.log('🔍 Detailed Team Creation Debug...\n')

  try {
    // 1. Check if we can create a team directly
    console.log('1. Testing direct team creation...')
    const testTeamId = 'test-team-' + Date.now()
    const testUserId = 'user_zy7pcvnaz' // Use the existing user ID
    
    console.log('Creating team with ID:', testTeamId)
    console.log('For user ID:', testUserId)
    
    const { data: team, error: teamError } = await supabase
      .from('Team')
      .insert({
        id: testTeamId,
        name: 'Test Team Debug',
        owner_id: testUserId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single()

    if (teamError) {
      console.error('❌ Team creation failed:', teamError)
      console.log('Error code:', teamError.code)
      console.log('Error message:', teamError.message)
      console.log('Error details:', teamError.details)
      console.log('Error hint:', teamError.hint)
      return
    }
    console.log('✅ Team creation successful:', team)

    // 2. Test team member creation
    console.log('\n2. Testing team member creation...')
    const testMemberId = 'test-member-' + Date.now()
    
    const { data: member, error: memberError } = await supabase
      .from('TeamMember')
      .insert({
        id: testMemberId,
        team_id: testTeamId,
        user_id: testUserId,
        role: 'owner',
        invited_by: testUserId,
        joined_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single()

    if (memberError) {
      console.error('❌ Team member creation failed:', memberError)
      console.log('Error code:', memberError.code)
      console.log('Error message:', memberError.message)
      console.log('Error details:', memberError.details)
      console.log('Error hint:', memberError.hint)
      
      // Clean up the team
      await supabase.from('Team').delete().eq('id', testTeamId)
      return
    }
    console.log('✅ Team member creation successful:', member)

    // 3. Test updating user's current_team_id
    console.log('\n3. Testing user team update...')
    const { error: updateError } = await supabase
      .from('User')
      .update({ currentTeamId: testTeamId })
      .eq('id', testUserId)

    if (updateError) {
      console.error('❌ User team update failed:', updateError)
    } else {
      console.log('✅ User team update successful')
    }

    // 4. Clean up test data
    console.log('\n4. Cleaning up test data...')
    await supabase.from('TeamMember').delete().eq('id', testMemberId)
    await supabase.from('Team').delete().eq('id', testTeamId)
    await supabase.from('User').update({ currentTeamId: null }).eq('id', testUserId)
    console.log('✅ Test data cleaned up')

    console.log('\n🎉 All team creation steps work correctly!')

  } catch (error) {
    console.error('❌ Unexpected error:', error)
  }
}

// Run the debug function
debugTeamCreationDetailed()
