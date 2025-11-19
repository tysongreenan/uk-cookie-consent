-- Fix Team Schema Inconsistency
-- This script ensures all Team-related tables use consistent snake_case column names

-- First, let's check what columns actually exist and fix any inconsistencies

-- Fix Team table to use snake_case consistently (only if columns exist)
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'Team' AND column_name = 'ownerId') THEN
        ALTER TABLE "Team" RENAME COLUMN "ownerId" TO "owner_id";
    END IF;
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'Team' AND column_name = 'createdAt') THEN
        ALTER TABLE "Team" RENAME COLUMN "createdAt" TO "created_at";
    END IF;
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'Team' AND column_name = 'updatedAt') THEN
        ALTER TABLE "Team" RENAME COLUMN "updatedAt" TO "updated_at";
    END IF;
END $$;

-- Fix TeamMember table to use snake_case consistently
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'TeamMember' AND column_name = 'teamId') THEN
        ALTER TABLE "TeamMember" RENAME COLUMN "teamId" TO "team_id";
    END IF;
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'TeamMember' AND column_name = 'userId') THEN
        ALTER TABLE "TeamMember" RENAME COLUMN "userId" TO "user_id";
    END IF;
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'TeamMember' AND column_name = 'invitedBy') THEN
        ALTER TABLE "TeamMember" RENAME COLUMN "invitedBy" TO "invited_by";
    END IF;
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'TeamMember' AND column_name = 'joinedAt') THEN
        ALTER TABLE "TeamMember" RENAME COLUMN "joinedAt" TO "joined_at";
    END IF;
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'TeamMember' AND column_name = 'createdAt') THEN
        ALTER TABLE "TeamMember" RENAME COLUMN "createdAt" TO "created_at";
    END IF;
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'TeamMember' AND column_name = 'updatedAt') THEN
        ALTER TABLE "TeamMember" RENAME COLUMN "updatedAt" TO "updated_at";
    END IF;
END $$;

-- Fix TeamInvitation table to use snake_case consistently
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'TeamInvitation' AND column_name = 'teamId') THEN
        ALTER TABLE "TeamInvitation" RENAME COLUMN "teamId" TO "team_id";
    END IF;
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'TeamInvitation' AND column_name = 'invitedBy') THEN
        ALTER TABLE "TeamInvitation" RENAME COLUMN "invitedBy" TO "invited_by";
    END IF;
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'TeamInvitation' AND column_name = 'expiresAt') THEN
        ALTER TABLE "TeamInvitation" RENAME COLUMN "expiresAt" TO "expires_at";
    END IF;
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'TeamInvitation' AND column_name = 'acceptedAt') THEN
        ALTER TABLE "TeamInvitation" RENAME COLUMN "acceptedAt" TO "accepted_at";
    END IF;
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'TeamInvitation' AND column_name = 'createdAt') THEN
        ALTER TABLE "TeamInvitation" RENAME COLUMN "createdAt" TO "created_at";
    END IF;
END $$;

-- Fix User table to use snake_case consistently
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'User' AND column_name = 'currentTeamId') THEN
        ALTER TABLE "User" RENAME COLUMN "currentTeamId" TO "current_team_id";
    END IF;
END $$;

-- Fix Project table to use snake_case consistently
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'Project' AND column_name = 'teamId') THEN
        ALTER TABLE "Project" RENAME COLUMN "teamId" TO "team_id";
    END IF;
END $$;

-- Ensure all tables exist with correct structure
CREATE TABLE IF NOT EXISTS "Team" (
  id TEXT NOT NULL PRIMARY KEY,
  name TEXT NOT NULL,
  owner_id TEXT NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

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

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Users can view teams they belong to" ON "Team";
DROP POLICY IF EXISTS "Users can create teams" ON "Team";
DROP POLICY IF EXISTS "Team owners can update their teams" ON "Team";
DROP POLICY IF EXISTS "Team owners can delete their teams" ON "Team";
DROP POLICY IF EXISTS "Users can view team members of their teams" ON "TeamMember";
DROP POLICY IF EXISTS "Team owners can add members" ON "TeamMember";
DROP POLICY IF EXISTS "Team owners can update members" ON "TeamMember";
DROP POLICY IF EXISTS "Team owners can remove members" ON "TeamMember";
DROP POLICY IF EXISTS "Users can view invitations for their teams" ON "TeamInvitation";
DROP POLICY IF EXISTS "Team owners can create invitations" ON "TeamInvitation";
DROP POLICY IF EXISTS "Team owners can update invitations" ON "TeamInvitation";
DROP POLICY IF EXISTS "Team owners can delete invitations" ON "TeamInvitation";

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
