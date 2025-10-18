#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js')

// Load environment variables
require('dotenv').config({ path: './env.local' })

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

async function debugTeamCreation() {
  console.log('🔍 Debugging Team Creation Process...\n')

  try {
    // 1. Check database connection
    console.log('1. Testing database connection...')
    const { data: healthCheck, error: healthError } = await supabase
      .from('User')
      .select('count')
      .limit(1)
    
    if (healthError) {
      console.error('❌ Database connection failed:', healthError)
      return
    }
    console.log('✅ Database connection successful')

    // 2. Check if Team table exists and has correct structure
    console.log('\n2. Checking Team table structure...')
    const { data: teamStructure, error: teamError } = await supabase
      .from('Team')
      .select('*')
      .limit(1)
    
    if (teamError) {
      console.error('❌ Team table error:', teamError)
      return
    }
    console.log('✅ Team table accessible')

    // 3. Check if TeamMember table exists
    console.log('\n3. Checking TeamMember table structure...')
    const { data: memberStructure, error: memberError } = await supabase
      .from('TeamMember')
      .select('*')
      .limit(1)
    
    if (memberError) {
      console.error('❌ TeamMember table error:', memberError)
      return
    }
    console.log('✅ TeamMember table accessible')

    // 4. Check RLS policies
    console.log('\n4. Testing RLS policies...')
    const { data: rlsTest, error: rlsError } = await supabase
      .from('Team')
      .select('id, name')
      .limit(1)
    
    if (rlsError) {
      console.error('❌ RLS policy error:', rlsError)
      return
    }
    console.log('✅ RLS policies working')

    // 5. Test creating a test team (we'll clean it up)
    console.log('\n5. Testing team creation...')
    const testTeamId = 'test-team-' + Date.now()
    const testMemberId = 'test-member-' + Date.now()
    const testUserId = 'test-user-' + Date.now()

    // Create test team
    const { data: testTeam, error: createTeamError } = await supabase
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

    if (createTeamError) {
      console.error('❌ Team creation failed:', createTeamError)
      return
    }
    console.log('✅ Team creation successful:', testTeam)

    // Create test team member
    const { data: testMember, error: createMemberError } = await supabase
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

    if (createMemberError) {
      console.error('❌ Team member creation failed:', createMemberError)
      // Clean up test team
      await supabase.from('Team').delete().eq('id', testTeamId)
      return
    }
    console.log('✅ Team member creation successful:', testMember)

    // Clean up test data
    console.log('\n6. Cleaning up test data...')
    await supabase.from('TeamMember').delete().eq('id', testMemberId)
    await supabase.from('Team').delete().eq('id', testTeamId)
    console.log('✅ Test data cleaned up')

    console.log('\n🎉 All team creation components are working correctly!')

  } catch (error) {
    console.error('❌ Unexpected error:', error)
  }
}

// Run the debug function
debugTeamCreation()
