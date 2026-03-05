-- Fix Team Creation Issues
-- This script ensures the Team tables exist with the correct structure

-- Create Team table if it doesn't exist
CREATE TABLE IF NOT EXISTS "Team" (
  id TEXT NOT NULL PRIMARY KEY,
  name TEXT NOT NULL,
  owner_id TEXT NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Create TeamMember table if it doesn't exist
CREATE TABLE IF NOT EXISTS "TeamMember" (
  id TEXT NOT NULL PRIMARY KEY,
  team_id TEXT NOT NULL REFERENCES "Team"(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('owner', 'admin', 'editor', 'viewer')),
  invited_by TEXT REFERENCES "User"(id) ON DELETE SET NULL,
  joined_at TIMESTAMP DEFAULT now(),
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now(),
  UNIQUE(team_id, user_id)
);

-- Create TeamInvitation table if it doesn't exist
CREATE TABLE IF NOT EXISTS "TeamInvitation" (
  id TEXT NOT NULL PRIMARY KEY,
  team_id TEXT NOT NULL REFERENCES "Team"(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'editor', 'viewer')),
  token TEXT NOT NULL UNIQUE,
  invited_by TEXT NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
  expires_at TIMESTAMP NOT NULL,
  accepted_at TIMESTAMP NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'expired', 'revoked')),
  created_at TIMESTAMP DEFAULT now()
);

-- Ensure User table has current_team_id column
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS current_team_id TEXT REFERENCES "Team"(id) ON DELETE SET NULL;

-- Ensure Project table has team_id column
ALTER TABLE "Project" ADD COLUMN IF NOT EXISTS team_id TEXT REFERENCES "Team"(id) ON DELETE CASCADE;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_team_owner ON "Team"(owner_id);
CREATE INDEX IF NOT EXISTS idx_team_member_team ON "TeamMember"(team_id);
CREATE INDEX IF NOT EXISTS idx_team_member_user ON "TeamMember"(user_id);
CREATE INDEX IF NOT EXISTS idx_team_member_role ON "TeamMember"(role);
CREATE INDEX IF NOT EXISTS idx_team_invitation_team ON "TeamInvitation"(team_id);
CREATE INDEX IF NOT EXISTS idx_team_invitation_token ON "TeamInvitation"(token);
CREATE INDEX IF NOT EXISTS idx_team_invitation_email ON "TeamInvitation"(email);

-- Enable RLS on Team tables
ALTER TABLE "Team" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "TeamMember" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "TeamInvitation" ENABLE ROW LEVEL SECURITY;

-- Team table policies
CREATE POLICY "Users can view teams they belong to"
  ON "Team" FOR SELECT
  USING (
    id IN (
      SELECT team_id FROM "TeamMember" 
      WHERE user_id = auth.uid()::text
    )
  );

CREATE POLICY "Users can create teams"
  ON "Team" FOR INSERT
  WITH CHECK (owner_id = auth.uid()::text);

CREATE POLICY "Team owners can update their teams"
  ON "Team" FOR UPDATE
  USING (owner_id = auth.uid()::text);

CREATE POLICY "Team owners can delete their teams"
  ON "Team" FOR DELETE
  USING (owner_id = auth.uid()::text);

-- TeamMember table policies
CREATE POLICY "Users can view team members of their teams"
  ON "TeamMember" FOR SELECT
  USING (
    team_id IN (
      SELECT team_id FROM "TeamMember" 
      WHERE user_id = auth.uid()::text
    )
  );

CREATE POLICY "Team owners can add members"
  ON "TeamMember" FOR INSERT
  WITH CHECK (
    team_id IN (
      SELECT id FROM "Team" 
      WHERE owner_id = auth.uid()::text
    )
  );

CREATE POLICY "Team owners can update members"
  ON "TeamMember" FOR UPDATE
  USING (
    team_id IN (
      SELECT id FROM "Team" 
      WHERE owner_id = auth.uid()::text
    )
  );

CREATE POLICY "Team owners can remove members"
  ON "TeamMember" FOR DELETE
  USING (
    team_id IN (
      SELECT id FROM "Team" 
      WHERE owner_id = auth.uid()::text
    )
  );

-- TeamInvitation table policies
CREATE POLICY "Users can view invitations for their teams"
  ON "TeamInvitation" FOR SELECT
  USING (
    team_id IN (
      SELECT id FROM "Team" 
      WHERE owner_id = auth.uid()::text
    )
  );

CREATE POLICY "Team owners can create invitations"
  ON "TeamInvitation" FOR INSERT
  WITH CHECK (
    team_id IN (
      SELECT id FROM "Team" 
      WHERE owner_id = auth.uid()::text
    )
  );

CREATE POLICY "Team owners can update invitations"
  ON "TeamInvitation" FOR UPDATE
  USING (
    team_id IN (
      SELECT id FROM "Team" 
      WHERE owner_id = auth.uid()::text
    )
  );

CREATE POLICY "Team owners can delete invitations"
  ON "TeamInvitation" FOR DELETE
  USING (
    team_id IN (
      SELECT id FROM "Team" 
      WHERE owner_id = auth.uid()::text
    )
  );
