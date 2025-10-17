-- Fix RLS Security Issues
-- Enable Row Level Security on all tables and create appropriate policies

-- Enable RLS on all tables
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Project" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "ConsentBanner" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "TrackingScript" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "UserLogo" ENABLE ROW LEVEL SECURITY;

-- User table policies
-- Users can only view and update their own data
CREATE POLICY "Users can view their own data"
  ON "User" FOR SELECT
  USING (id = auth.uid()::text);

CREATE POLICY "Users can update their own data"
  ON "User" FOR UPDATE
  USING (id = auth.uid()::text);

-- Users can insert their own data (for registration)
CREATE POLICY "Users can insert their own data"
  ON "User" FOR INSERT
  WITH CHECK (id = auth.uid()::text);

-- Project table policies
-- Users can view projects they own or are team members of
CREATE POLICY "Users can view their projects"
  ON "Project" FOR SELECT
  USING (
    "userId" = auth.uid()::text 
    OR team_id IN (
      SELECT team_id FROM "TeamMember" 
      WHERE user_id = auth.uid()::text
    )
  );

-- Users can create projects (they become the owner)
CREATE POLICY "Users can create projects"
  ON "Project" FOR INSERT
  WITH CHECK ("userId" = auth.uid()::text);

-- Users can update projects they own or are team members of
CREATE POLICY "Users can update their projects"
  ON "Project" FOR UPDATE
  USING (
    "userId" = auth.uid()::text 
    OR team_id IN (
      SELECT team_id FROM "TeamMember" 
      WHERE user_id = auth.uid()::text
    )
  );

-- Users can delete projects they own
CREATE POLICY "Users can delete their projects"
  ON "Project" FOR DELETE
  USING ("userId" = auth.uid()::text);

-- ConsentBanner table policies
-- Users can view their own banners
CREATE POLICY "Users can view their banners"
  ON "ConsentBanner" FOR SELECT
  USING ("userId" = auth.uid()::text);

-- Users can create their own banners
CREATE POLICY "Users can create banners"
  ON "ConsentBanner" FOR INSERT
  WITH CHECK ("userId" = auth.uid()::text);

-- Users can update their own banners
CREATE POLICY "Users can update their banners"
  ON "ConsentBanner" FOR UPDATE
  USING ("userId" = auth.uid()::text);

-- Users can delete their own banners
CREATE POLICY "Users can delete their banners"
  ON "ConsentBanner" FOR DELETE
  USING ("userId" = auth.uid()::text);

-- TrackingScript table policies
-- Users can view scripts for their projects
CREATE POLICY "Users can view their scripts"
  ON "TrackingScript" FOR SELECT
  USING (
    "projectId" IN (
      SELECT id FROM "Project" 
      WHERE "userId" = auth.uid()::text 
      OR team_id IN (
        SELECT team_id FROM "TeamMember" 
        WHERE user_id = auth.uid()::text
      )
    )
  );

-- Users can create scripts for their projects
CREATE POLICY "Users can create scripts"
  ON "TrackingScript" FOR INSERT
  WITH CHECK (
    "projectId" IN (
      SELECT id FROM "Project" 
      WHERE "userId" = auth.uid()::text 
      OR team_id IN (
        SELECT team_id FROM "TeamMember" 
        WHERE user_id = auth.uid()::text
      )
    )
  );

-- Users can update scripts for their projects
CREATE POLICY "Users can update their scripts"
  ON "TrackingScript" FOR UPDATE
  USING (
    "projectId" IN (
      SELECT id FROM "Project" 
      WHERE "userId" = auth.uid()::text 
      OR team_id IN (
        SELECT team_id FROM "TeamMember" 
        WHERE user_id = auth.uid()::text
      )
    )
  );

-- Users can delete scripts for their projects
CREATE POLICY "Users can delete their scripts"
  ON "TrackingScript" FOR DELETE
  USING (
    "projectId" IN (
      SELECT id FROM "Project" 
      WHERE "userId" = auth.uid()::text 
      OR team_id IN (
        SELECT team_id FROM "TeamMember" 
        WHERE user_id = auth.uid()::text
      )
    )
  );

-- UserLogo table policies
-- Users can only access their own logos
CREATE POLICY "Users can view their own logos"
  ON "UserLogo" FOR SELECT
  USING ("userId" = auth.uid()::text);

CREATE POLICY "Users can create their own logos"
  ON "UserLogo" FOR INSERT
  WITH CHECK ("userId" = auth.uid()::text);

CREATE POLICY "Users can update their own logos"
  ON "UserLogo" FOR UPDATE
  USING ("userId" = auth.uid()::text);

CREATE POLICY "Users can delete their own logos"
  ON "UserLogo" FOR DELETE
  USING ("userId" = auth.uid()::text);
