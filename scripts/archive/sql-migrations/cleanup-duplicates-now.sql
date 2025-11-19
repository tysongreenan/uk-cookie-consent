-- URGENT: Clean up duplicate workspaces immediately
-- This will remove all duplicate "Sway's Team" workspaces and keep only the oldest one

-- Step 1: Delete duplicate teams, keeping only the oldest one for each user
WITH ranked_teams AS (
  SELECT 
    t.id,
    t.owner_id,
    t.name,
    t.created_at,
    ROW_NUMBER() OVER (PARTITION BY t.owner_id ORDER BY t.created_at ASC) as rn
  FROM "Team" t
  WHERE t.name LIKE '%Team' OR t.name LIKE '%Workspace'
),
teams_to_delete AS (
  SELECT id
  FROM ranked_teams
  WHERE rn > 1  -- Keep the first (oldest) team, delete the rest
)
DELETE FROM "Team"
WHERE id IN (SELECT id FROM teams_to_delete);

-- Step 2: Update all users to point to their oldest remaining team
UPDATE "User" u
SET current_team_id = (
  SELECT tm.team_id
  FROM "TeamMember" tm
  JOIN "Team" t ON t.id = tm.team_id
  WHERE tm.user_id = u.id
  ORDER BY t.created_at ASC
  LIMIT 1
)
WHERE current_team_id IS NULL OR current_team_id NOT IN (
  SELECT team_id FROM "TeamMember" WHERE user_id = u.id
);

-- Step 3: Verify the cleanup worked
SELECT 'Remaining teams for each user:' as info;
SELECT 
  u.email,
  t.name as team_name,
  t.created_at,
  tm.role
FROM "User" u
JOIN "TeamMember" tm ON tm.user_id = u.id
JOIN "Team" t ON t.id = tm.team_id
ORDER BY u.email, t.created_at;
