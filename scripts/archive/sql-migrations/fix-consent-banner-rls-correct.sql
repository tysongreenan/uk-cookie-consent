-- Correct RLS policies for ConsentBanner table based on actual schema
-- The table has userId, not projectId

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
DROP POLICY IF EXISTS "Allow all operations on ConsentBanner" ON "ConsentBanner";

-- Create RLS policies based on userId (the actual column)
CREATE POLICY "Users can view their own banners" ON "ConsentBanner"
  FOR SELECT
  USING ("userId" = auth.uid()::text);

CREATE POLICY "Users can create banners" ON "ConsentBanner"
  FOR INSERT
  WITH CHECK ("userId" = auth.uid()::text);

CREATE POLICY "Users can update their own banners" ON "ConsentBanner"
  FOR UPDATE
  USING ("userId" = auth.uid()::text)
  WITH CHECK ("userId" = auth.uid()::text);

CREATE POLICY "Users can delete their own banners" ON "ConsentBanner"
  FOR DELETE
  USING ("userId" = auth.uid()::text);

COMMIT;
