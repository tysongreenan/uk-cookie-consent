-- Clean up duplicate workspaces for a user
-- This script removes duplicate teams and keeps only the oldest one

-- First, let's see what we're dealing with
-- Uncomment this to check duplicates before deleting:
-- SELECT t.id, t.name, t.owner_id, t.created_at, tm.user_id
-- FROM "Team" t
-- JOIN "TeamMember" tm ON t.id = tm.team_id
-- WHERE tm.user_id = 'YOUR_USER_ID_HERE'
-- ORDER BY t.created_at;

-- Delete duplicate teams, keeping only the oldest one for each user
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

-- Update all users to point to their oldest remaining team
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

