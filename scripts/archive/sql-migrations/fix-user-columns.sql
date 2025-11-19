-- Fix User table column names to match what the app expects
-- This will rename columns back to the original camelCase format

-- Check what columns actually exist in the User table
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'User' 
ORDER BY column_name;

-- Rename columns back to camelCase if they were changed to snake_case
DO $$ 
BEGIN
    -- Rename created_at back to createdAt if it exists
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'User' AND column_name = 'created_at') THEN
        ALTER TABLE "User" RENAME COLUMN "created_at" TO "createdAt";
    END IF;
    
    -- Rename updated_at back to updatedAt if it exists
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'User' AND column_name = 'updated_at') THEN
        ALTER TABLE "User" RENAME COLUMN "updated_at" TO "updatedAt";
    END IF;
    
    -- Rename current_team_id back to currentTeamId if it exists
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'User' AND column_name = 'current_team_id') THEN
        ALTER TABLE "User" RENAME COLUMN "current_team_id" TO "currentTeamId";
    END IF;
END $$;

-- Check the final column structure
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'User' 
ORDER BY column_name;
