-- Migration: Add Team Management System
-- This migration adds multi-user collaboration with role-based permissions

-- Create Team table (workspace/account)
CREATE TABLE IF NOT EXISTS "Team" (
  id TEXT NOT NULL PRIMARY KEY,
  name TEXT NOT NULL,
  owner_id TEXT NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Create TeamMember table (links users to teams)
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

-- Create TeamInvitation table (pending invitations)
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

-- Add currentTeamId to User table
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS current_team_id TEXT REFERENCES "Team"(id) ON DELETE SET NULL;

-- Change Project ownership from userId to teamId
-- First, create a backup of existing projects
CREATE TABLE IF NOT EXISTS "Project_backup" AS SELECT * FROM "Project";

-- Add team_id column to Project
ALTER TABLE "Project" ADD COLUMN IF NOT EXISTS team_id TEXT REFERENCES "Team"(id) ON DELETE CASCADE;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_team_owner ON "Team"(owner_id);
CREATE INDEX IF NOT EXISTS idx_team_member_team ON "TeamMember"(team_id);
CREATE INDEX IF NOT EXISTS idx_team_member_user ON "TeamMember"(user_id);
CREATE INDEX IF NOT EXISTS idx_team_member_role ON "TeamMember"(role);
CREATE INDEX IF NOT EXISTS idx_team_invitation_team ON "TeamInvitation"(team_id);
CREATE INDEX IF NOT EXISTS idx_team_invitation_token ON "TeamInvitation"(token);
CREATE INDEX IF NOT EXISTS idx_team_invitation_email ON "TeamInvitation"(email);
CREATE INDEX IF NOT EXISTS idx_team_invitation_status ON "TeamInvitation"(status);
CREATE INDEX IF NOT EXISTS idx_team_invitation_expires ON "TeamInvitation"(expires_at);
CREATE INDEX IF NOT EXISTS idx_user_current_team ON "User"(current_team_id);
CREATE INDEX IF NOT EXISTS idx_project_team ON "Project"(team_id);

-- Enable RLS on all new tables
ALTER TABLE "Team" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "TeamMember" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "TeamInvitation" ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Team table
CREATE POLICY "Users can view teams they belong to"
  ON "Team" FOR SELECT
  USING (
    id IN (
      SELECT team_id FROM "TeamMember" 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Team owners can update their teams"
  ON "Team" FOR UPDATE
  USING (owner_id = auth.uid());

CREATE POLICY "Team owners can delete their teams"
  ON "Team" FOR DELETE
  USING (owner_id = auth.uid());

-- RLS Policies for TeamMember table
CREATE POLICY "Users can view team members of their teams"
  ON "TeamMember" FOR SELECT
  USING (
    team_id IN (
      SELECT team_id FROM "TeamMember" 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Team owners and admins can manage members"
  ON "TeamMember" FOR ALL
  USING (
    team_id IN (
      SELECT team_id FROM "TeamMember" 
      WHERE user_id = auth.uid() 
      AND role IN ('owner', 'admin')
    )
  );

-- RLS Policies for TeamInvitation table
CREATE POLICY "Users can view invitations for their teams"
  ON "TeamInvitation" FOR SELECT
  USING (
    team_id IN (
      SELECT team_id FROM "TeamMember" 
      WHERE user_id = auth.uid() 
      AND role IN ('owner', 'admin')
    )
  );

CREATE POLICY "Team owners and admins can manage invitations"
  ON "TeamInvitation" FOR ALL
  USING (
    team_id IN (
      SELECT team_id FROM "TeamMember" 
      WHERE user_id = auth.uid() 
      AND role IN ('owner', 'admin')
    )
  );

-- Public policy for invitation acceptance (no auth required)
CREATE POLICY "Anyone can view invitation details by token"
  ON "TeamInvitation" FOR SELECT
  USING (token IS NOT NULL);

-- Function to create team for existing users
CREATE OR REPLACE FUNCTION create_teams_for_existing_users()
RETURNS void AS $$
DECLARE
  user_record RECORD;
  team_id TEXT;
BEGIN
  -- Loop through all existing users
  FOR user_record IN 
    SELECT id, email, name FROM "User" 
    WHERE current_team_id IS NULL
  LOOP
    -- Generate team ID
    team_id := gen_random_uuid()::text;
    
    -- Create team for user
    INSERT INTO "Team" (id, name, owner_id, created_at, updated_at)
    VALUES (team_id, COALESCE(user_record.name, user_record.email), user_record.id, now(), now());
    
    -- Add user as team owner
    INSERT INTO "TeamMember" (id, team_id, user_id, role, invited_by, joined_at, created_at, updated_at)
    VALUES (gen_random_uuid()::text, team_id, user_record.id, 'owner', user_record.id, now(), now(), now());
    
    -- Set user's current team
    UPDATE "User" SET current_team_id = team_id WHERE id = user_record.id;
    
    -- Migrate user's projects to team
    UPDATE "Project" SET team_id = team_id WHERE user_id = user_record.id;
  END LOOP;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to clean up expired invitations
CREATE OR REPLACE FUNCTION cleanup_expired_invitations()
RETURNS void AS $$
BEGIN
  UPDATE "TeamInvitation" 
  SET status = 'expired' 
  WHERE status = 'pending' 
  AND expires_at < now();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to generate invitation token
CREATE OR REPLACE FUNCTION generate_invitation_token()
RETURNS TEXT AS $$
BEGIN
  RETURN encode(gen_random_bytes(32), 'hex');
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers
DROP TRIGGER IF EXISTS update_team_updated_at ON "Team";
CREATE TRIGGER update_team_updated_at
    BEFORE UPDATE ON "Team"
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_team_member_updated_at ON "TeamMember";
CREATE TRIGGER update_team_member_updated_at
    BEFORE UPDATE ON "TeamMember"
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Run the migration for existing users
SELECT create_teams_for_existing_users();

-- Clean up the migration function
DROP FUNCTION create_teams_for_existing_users();

-- Add comment
COMMENT ON TABLE "Team" IS 'Represents a workspace/account with multiple users';
COMMENT ON TABLE "TeamMember" IS 'Links users to teams with specific roles';
COMMENT ON TABLE "TeamInvitation" IS 'Pending team invitations with expiration';
