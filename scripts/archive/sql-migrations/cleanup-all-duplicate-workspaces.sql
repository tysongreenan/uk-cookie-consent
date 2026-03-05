-- Clean up all duplicate workspaces, keeping only the oldest for each user

BEGIN;

-- Step 1: Identify and delete duplicate teams
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

-- Step 2: Update all users to point to their oldest remaining team
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

-- Step 3: Verify cleanup
SELECT 
  u.email,
  t.name as workspace_name,
  t.created_at,
  tm.role
FROM "User" u
JOIN "TeamMember" tm ON tm.user_id = u.id
JOIN "Team" t ON t.id = tm.team_id
WHERE tm.role = 'owner'
ORDER BY u.email, t.created_at;

COMMIT;
