-- Add missing projectId column to ConsentBanner table
-- This column is expected by the application code but missing from the database

BEGIN;

-- Add the missing projectId column
ALTER TABLE "ConsentBanner" ADD COLUMN IF NOT EXISTS "projectId" TEXT;

-- Add foreign key constraint
ALTER TABLE "ConsentBanner" ADD CONSTRAINT "ConsentBanner_projectId_fkey" 
  FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Create index for better performance
CREATE INDEX IF NOT EXISTS "ConsentBanner_projectId_idx" ON "ConsentBanner"("projectId");

-- Update existing banners to have a projectId
-- We'll set them to the user's first project or create a default project
UPDATE "ConsentBanner" 
SET "projectId" = (
  SELECT p.id 
  FROM "Project" p 
  WHERE p."userId" = "ConsentBanner"."userId" 
  ORDER BY p."createdAt" 
  LIMIT 1
)
WHERE "projectId" IS NULL;

-- If any banners still don't have a projectId, create a default project for the user
INSERT INTO "Project" ("id", "name", "userId", "createdAt", "updatedAt")
SELECT 
  gen_random_uuid()::text,
  'Default Project',
  cb."userId",
  NOW(),
  NOW()
FROM "ConsentBanner" cb
WHERE cb."projectId" IS NULL
AND NOT EXISTS (
  SELECT 1 FROM "Project" p WHERE p."userId" = cb."userId"
);

-- Update the remaining banners with the newly created project
UPDATE "ConsentBanner" 
SET "projectId" = (
  SELECT p.id 
  FROM "Project" p 
  WHERE p."userId" = "ConsentBanner"."userId" 
  ORDER BY p."createdAt" 
  LIMIT 1
)
WHERE "projectId" IS NULL;

COMMIT;
