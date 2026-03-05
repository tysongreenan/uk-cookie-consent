-- Final Workspace Cleanup Script
-- This script removes ALL duplicate workspaces and fixes the database state

BEGIN;

-- Step 1: Show current state before cleanup
SELECT 'BEFORE CLEANUP - Current workspaces:' as status;
SELECT 
  u.email,
  COUNT(t.id) as workspace_count,
  STRING_AGG(t.name, ', ') as workspace_names
FROM "User" u
LEFT JOIN "TeamMember" tm ON tm.user_id = u.id
LEFT JOIN "Team" t ON t.id = tm.team_id
WHERE tm.role = 'owner'
GROUP BY u.email
ORDER BY workspace_count DESC;

-- Step 2: Delete ALL duplicate teams, keeping only the oldest for each user
WITH ranked_teams AS (
  SELECT 
    t.id,
    t.owner_id,
    t.name,
    t.created_at,
    ROW_NUMBER() OVER (PARTITION BY t.owner_id ORDER BY t.created_at ASC) as rn
  FROM "Team" t
  WHERE t.name LIKE '%Workspace' OR t.name LIKE '%Team'
),
teams_to_delete AS (
  SELECT id
  FROM ranked_teams
  WHERE rn > 1  -- Keep the first (oldest) team, delete the rest
)
DELETE FROM "Team"
WHERE id IN (SELECT id FROM teams_to_delete);

-- Step 3: Clean up orphaned TeamMember records
DELETE FROM "TeamMember" 
WHERE team_id NOT IN (SELECT id FROM "Team");

-- Step 4: Update all users to point to their oldest remaining team
UPDATE "User" u
SET current_team_id = (
  SELECT tm.team_id
  FROM "TeamMember" tm
  JOIN "Team" t ON t.id = tm.team_id
  WHERE tm.user_id = u.id
  AND tm.role = 'owner'
  ORDER BY t.created_at ASC
  LIMIT 1
)
WHERE current_team_id IS NULL OR current_team_id NOT IN (
  SELECT team_id FROM "TeamMember" WHERE user_id = u.id
);

-- Step 5: Show final state after cleanup
SELECT 'AFTER CLEANUP - Final workspaces:' as status;
SELECT 
  u.email,
  t.name as workspace_name,
  t.created_at,
  tm.role,
  u.current_team_id
FROM "User" u
JOIN "TeamMember" tm ON tm.user_id = u.id
JOIN "Team" t ON t.id = tm.team_id
WHERE tm.role = 'owner'
ORDER BY u.email, t.created_at;

-- Step 6: Verify no duplicates remain
SELECT 'VERIFICATION - Checking for remaining duplicates:' as status;
SELECT 
  owner_id,
  COUNT(*) as team_count
FROM "Team"
GROUP BY owner_id
HAVING COUNT(*) > 1;

COMMIT;
