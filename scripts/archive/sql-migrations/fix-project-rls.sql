-- Fix Project table RLS policies
-- This script fixes RLS policies to allow users to create projects in their workspaces

BEGIN;

-- Drop existing RLS policies on Project table
DROP POLICY IF EXISTS "Users can view their own projects" ON "Project";
DROP POLICY IF EXISTS "Users can create projects" ON "Project";
DROP POLICY IF EXISTS "Users can update their own projects" ON "Project";
DROP POLICY IF EXISTS "Users can delete their own projects" ON "Project";

-- Create new RLS policies for Project table
-- Allow users to view projects where they are team members
CREATE POLICY "Users can view projects in their teams" ON "Project"
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM "TeamMember" tm
      WHERE tm.team_id = "Project".team_id
      AND tm.user_id = auth.uid()
    )
  );

-- Allow users to create projects in teams where they are members
CREATE POLICY "Users can create projects in their teams" ON "Project"
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM "TeamMember" tm
      WHERE tm.team_id = "Project".team_id
      AND tm.user_id = auth.uid()
      AND tm.role IN ('owner', 'admin', 'editor')
    )
  );

-- Allow users to update projects in teams where they are members with edit permissions
CREATE POLICY "Users can update projects in their teams" ON "Project"
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM "TeamMember" tm
      WHERE tm.team_id = "Project".team_id
      AND tm.user_id = auth.uid()
      AND tm.role IN ('owner', 'admin', 'editor')
    )
  );

-- Allow users to delete projects in teams where they are members with edit permissions
CREATE POLICY "Users can delete projects in their teams" ON "Project"
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM "TeamMember" tm
      WHERE tm.team_id = "Project".team_id
      AND tm.user_id = auth.uid()
      AND tm.role IN ('owner', 'admin', 'editor')
    )
  );

COMMIT;
