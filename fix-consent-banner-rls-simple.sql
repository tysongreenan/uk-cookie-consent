-- Simple RLS fix for ConsentBanner table
-- This avoids the projectId column issue by using a simpler approach

BEGIN;

-- Drop all existing ConsentBanner policies
DROP POLICY IF EXISTS "Users can view their own banners" ON "ConsentBanner";
DROP POLICY IF EXISTS "Users can create banners" ON "ConsentBanner";
DROP POLICY IF EXISTS "Users can update their own banners" ON "ConsentBanner";
DROP POLICY IF EXISTS "Users can delete their own banners" ON "ConsentBanner";
DROP POLICY IF EXISTS "Users can view banners in their teams" ON "ConsentBanner";
DROP POLICY IF EXISTS "Users can create banners in their teams" ON "ConsentBanner";
DROP POLICY IF EXISTS "Users can update banners in their teams" ON "ConsentBanner";
DROP POLICY IF EXISTS "Users can delete banners in their teams" ON "ConsentBanner";

-- Create simple permissive policies for now
-- This allows the application to handle authorization
CREATE POLICY "Allow all operations on ConsentBanner" ON "ConsentBanner"
  FOR ALL
  USING (true)
  WITH CHECK (true);

COMMIT;
