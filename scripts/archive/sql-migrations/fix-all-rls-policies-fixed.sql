-- Fix all RLS policies for workspace system (FIXED VERSION)
-- This script ensures all tables have proper RLS policies for the workspace system
-- Fixed to handle UUID/text type casting issues

BEGIN;

-- 1. Fix Project table RLS policies
DROP POLICY IF EXISTS "Users can view their own projects" ON "Project";
DROP POLICY IF EXISTS "Users can create projects" ON "Project";
DROP POLICY IF EXISTS "Users can update their own projects" ON "Project";
DROP POLICY IF EXISTS "Users can delete their own projects" ON "Project";
DROP POLICY IF EXISTS "Users can view projects in their teams" ON "Project";
DROP POLICY IF EXISTS "Users can create projects in their teams" ON "Project";
DROP POLICY IF EXISTS "Users can update projects in their teams" ON "Project";
DROP POLICY IF EXISTS "Users can delete projects in their teams" ON "Project";

CREATE POLICY "Users can view projects in their teams" ON "Project"
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM "TeamMember" tm
      WHERE tm.team_id = "Project".team_id
      AND tm.user_id = auth.uid()::text
    )
  );

CREATE POLICY "Users can create projects in their teams" ON "Project"
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM "TeamMember" tm
      WHERE tm.team_id = "Project".team_id
      AND tm.user_id = auth.uid()::text
      AND tm.role IN ('owner', 'admin', 'editor')
    )
  );

CREATE POLICY "Users can update projects in their teams" ON "Project"
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM "TeamMember" tm
      WHERE tm.team_id = "Project".team_id
      AND tm.user_id = auth.uid()::text
      AND tm.role IN ('owner', 'admin', 'editor')
    )
  );

CREATE POLICY "Users can delete projects in their teams" ON "Project"
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM "TeamMember" tm
      WHERE tm.team_id = "Project".team_id
      AND tm.user_id = auth.uid()::text
      AND tm.role IN ('owner', 'admin', 'editor')
    )
  );

-- 2. Fix ConsentBanner table RLS policies
DROP POLICY IF EXISTS "Users can view their own banners" ON "ConsentBanner";
DROP POLICY IF EXISTS "Users can create banners" ON "ConsentBanner";
DROP POLICY IF EXISTS "Users can update their own banners" ON "ConsentBanner";
DROP POLICY IF EXISTS "Users can delete their own banners" ON "ConsentBanner";
DROP POLICY IF EXISTS "Users can view banners in their teams" ON "ConsentBanner";
DROP POLICY IF EXISTS "Users can create banners in their teams" ON "ConsentBanner";
DROP POLICY IF EXISTS "Users can update banners in their teams" ON "ConsentBanner";
DROP POLICY IF EXISTS "Users can delete banners in their teams" ON "ConsentBanner";

CREATE POLICY "Users can view banners in their teams" ON "ConsentBanner"
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM "Project" p
      JOIN "TeamMember" tm ON tm.team_id = p.team_id
      WHERE p.id = "ConsentBanner"."projectId"
      AND tm.user_id = auth.uid()::text
    )
  );

CREATE POLICY "Users can create banners in their teams" ON "ConsentBanner"
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM "Project" p
      JOIN "TeamMember" tm ON tm.team_id = p.team_id
      WHERE p.id = "ConsentBanner"."projectId"
      AND tm.user_id = auth.uid()::text
      AND tm.role IN ('owner', 'admin', 'editor')
    )
  );

CREATE POLICY "Users can update banners in their teams" ON "ConsentBanner"
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM "Project" p
      JOIN "TeamMember" tm ON tm.team_id = p.team_id
      WHERE p.id = "ConsentBanner"."projectId"
      AND tm.user_id = auth.uid()::text
      AND tm.role IN ('owner', 'admin', 'editor')
    )
  );

CREATE POLICY "Users can delete banners in their teams" ON "ConsentBanner"
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM "Project" p
      JOIN "TeamMember" tm ON tm.team_id = p.team_id
      WHERE p.id = "ConsentBanner"."projectId"
      AND tm.user_id = auth.uid()::text
      AND tm.role IN ('owner', 'admin', 'editor')
    )
  );

-- 3. Ensure Team table RLS policies are correct
DROP POLICY IF EXISTS "Users can view teams they belong to" ON "Team";
DROP POLICY IF EXISTS "Users can create teams" ON "Team";
DROP POLICY IF EXISTS "Users can update teams they own" ON "Team";
DROP POLICY IF EXISTS "Users can delete teams they own" ON "Team";

CREATE POLICY "Users can view teams they belong to" ON "Team"
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM "TeamMember" tm
      WHERE tm.team_id = "Team".id
      AND tm.user_id = auth.uid()::text
    )
  );

CREATE POLICY "Users can create teams" ON "Team"
  FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can update teams they own" ON "Team"
  FOR UPDATE
  USING (owner_id = auth.uid()::text);

CREATE POLICY "Users can delete teams they own" ON "Team"
  FOR DELETE
  USING (owner_id = auth.uid()::text);

-- 4. Ensure TeamMember table RLS policies are correct
DROP POLICY IF EXISTS "Users can view team members in their teams" ON "TeamMember";
DROP POLICY IF EXISTS "Users can add team members" ON "TeamMember";
DROP POLICY IF EXISTS "Users can update team members" ON "TeamMember";
DROP POLICY IF EXISTS "Users can remove team members" ON "TeamMember";

CREATE POLICY "Users can view team members in their teams" ON "TeamMember"
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM "TeamMember" tm2
      WHERE tm2.team_id = "TeamMember".team_id
      AND tm2.user_id = auth.uid()::text
    )
  );

CREATE POLICY "Users can add team members to their teams" ON "TeamMember"
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM "TeamMember" tm
      WHERE tm.team_id = "TeamMember".team_id
      AND tm.user_id = auth.uid()::text
      AND tm.role IN ('owner', 'admin')
    )
  );

CREATE POLICY "Users can update team members in their teams" ON "TeamMember"
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM "TeamMember" tm
      WHERE tm.team_id = "TeamMember".team_id
      AND tm.user_id = auth.uid()::text
      AND tm.role IN ('owner', 'admin')
    )
  );

CREATE POLICY "Users can remove team members from their teams" ON "TeamMember"
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM "TeamMember" tm
      WHERE tm.team_id = "TeamMember".team_id
      AND tm.user_id = auth.uid()::text
      AND tm.role IN ('owner', 'admin')
    )
  );

COMMIT;
