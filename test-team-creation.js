// Test script to check team creation functionality
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

async function testTeamCreation() {
  console.log('Testing team creation...')
  
  try {
    // Check if Team table exists
    const { data: tables, error: tableError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_name', 'Team')
    
    if (tableError) {
      console.error('Error checking tables:', tableError)
      return
    }
    
    console.log('Team table exists:', tables.length > 0)
    
    if (tables.length === 0) {
      console.log('Team table does not exist. Need to run migration.')
      return
    }
    
    // Check Team table structure
    const { data: columns, error: columnError } = await supabase
      .from('information_schema.columns')
      .select('column_name, data_type')
      .eq('table_name', 'Team')
    
    if (columnError) {
      console.error('Error checking columns:', columnError)
      return
    }
    
    console.log('Team table columns:', columns)
    
    // Test if we can query the Team table
    const { data: teams, error: queryError } = await supabase
      .from('Team')
      .select('*')
      .limit(1)
    
    if (queryError) {
      console.error('Error querying Team table:', queryError)
      console.log('This might be due to RLS policies or missing permissions')
    } else {
      console.log('Successfully queried Team table')
    }
    
  } catch (error) {
    console.error('Test failed:', error)
  }
}

testTeamCreation()
