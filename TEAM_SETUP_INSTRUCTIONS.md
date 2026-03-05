# Team Management Setup Instructions

## Issue
The team management feature is not working because the required database tables don't exist yet. The migration needs to be run manually in the Supabase dashboard.

## Solution
You need to run the database migration to create the team management tables.

### Step 1: Access Supabase Dashboard
1. Go to https://supabase.com/dashboard
2. Select your project (or create a new one)
3. Log in with your Supabase account
4. Navigate to the SQL Editor (left sidebar)

### Step 2: Run the Migration
1. Copy the contents of `manual-migration.sql` (in the project root)
2. Paste it into the SQL Editor
3. Click "Run" to execute the migration

### Step 3: Verify Tables Were Created
After running the migration, you should see these new tables in your database:
- `Team` - stores team information
- `TeamMember` - links users to teams with roles
- `TeamInvitation` - manages team invitations

### Step 4: Test Team Creation
1. Go back to your application
2. Navigate to `/dashboard/team`
3. Try creating a team - it should work now

## What the Migration Does
- Creates the team management tables
- Adds `current_team_id` column to the `User` table
- Adds `team_id` column to the `Project` table
- Sets up Row Level Security (RLS) policies
- Creates necessary indexes for performance

## Alternative: Use Supabase CLI
If you have the Supabase CLI installed, you can also run:
```bash
supabase db push
```

## Troubleshooting
If you encounter any issues:
1. Check that you're logged into the correct Supabase project
2. Ensure you have admin access to the project
3. Verify the SQL executed without errors
4. Check the database tables in the Table Editor

## Next Steps
Once the migration is complete:
1. The team management feature will be fully functional
2. Users can create teams and invite members
3. Role-based permissions will be enforced
4. All existing users will need to create a team to access the dashboard
