-- Fix Project table column name from teamId to team_id
-- This is causing the "Could not find the 'teamId' column" errors

-- First, check if the column exists and what it's called
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'Project' 
AND column_name IN ('teamId', 'team_id');

-- If teamId exists, rename it to team_id
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'Project' AND column_name = 'teamId') THEN
        ALTER TABLE "Project" RENAME COLUMN "teamId" TO "team_id";
        RAISE NOTICE 'Renamed Project.teamId to Project.team_id';
    ELSE
        RAISE NOTICE 'Project.team_id already exists or teamId does not exist';
    END IF;
END $$;

-- Verify the change
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'Project' 
AND column_name IN ('teamId', 'team_id');
