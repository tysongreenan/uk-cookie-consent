require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
)

async function migrateUsersToTeams() {
  try {
    console.log('Starting user migration to teams...')

    // Get all users who don't have a currentTeamId
    const { data: users, error: usersError } = await supabase
      .from('User')
      .select('id, email, name, createdAt')
      .is('currentTeamId', null)

    if (usersError) {
      console.error('Error fetching users:', usersError)
      return
    }

    console.log(`Found ${users.length} users to migrate`)

    for (const user of users) {
      try {
        console.log(`Migrating user: ${user.email}`)

        // Create a team for this user
        const { data: team, error: teamError } = await supabase
          .from('Team')
          .insert({
            name: `${user.name || user.email}'s Team`,
            ownerId: user.id
          })
          .select()
          .single()

        if (teamError) {
          console.error(`Error creating team for user ${user.email}:`, teamError)
          continue
        }

        console.log(`Created team: ${team.name} (${team.id})`)

        // Add user as owner of the team
        const { error: memberError } = await supabase
          .from('TeamMember')
          .insert({
            teamId: team.id,
            userId: user.id,
            role: 'owner',
            joinedAt: new Date().toISOString()
          })

        if (memberError) {
          console.error(`Error adding user as team member:`, memberError)
          continue
        }

        // Update user's currentTeamId
        const { error: updateError } = await supabase
          .from('User')
          .update({ currentTeamId: team.id })
          .eq('id', user.id)

        if (updateError) {
          console.error(`Error updating user's currentTeamId:`, updateError)
          continue
        }

        // Update all user's projects to use the team
        const { error: projectError } = await supabase
          .from('Project')
          .update({ teamId: team.id })
          .eq('userId', user.id)

        if (projectError) {
          console.error(`Error updating user's projects:`, projectError)
          // Don't continue here as the team is already created
        }

        console.log(`✅ Successfully migrated user: ${user.email}`)

      } catch (error) {
        console.error(`Error migrating user ${user.email}:`, error)
      }
    }

    console.log('Migration completed!')

  } catch (error) {
    console.error('Migration failed:', error)
  }
}

// Run the migration
migrateUsersToTeams()
