-- Create Team table
CREATE TABLE IF NOT EXISTS "Team" (
  id TEXT NOT NULL PRIMARY KEY,
  name TEXT NOT NULL,
  owner_id TEXT NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Create TeamMember table
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

-- Create TeamInvitation table
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

-- Add current_team_id to User table
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS current_team_id TEXT REFERENCES "Team"(id) ON DELETE SET NULL;

-- Add team_id to Project table
ALTER TABLE "Project" ADD COLUMN IF NOT EXISTS team_id TEXT REFERENCES "Team"(id) ON DELETE CASCADE;

-- Create indexes
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

-- Enable RLS
ALTER TABLE "Team" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "TeamMember" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "TeamInvitation" ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Team table
CREATE POLICY "Users can view teams they belong to"
  ON "Team" FOR SELECT
  USING (
    id IN (
      SELECT team_id FROM "TeamMember" 
      WHERE user_id = auth.uid()::text
    )
  );

CREATE POLICY "Team owners can update their teams"
  ON "Team" FOR UPDATE
  USING (owner_id = auth.uid()::text);

CREATE POLICY "Team owners can delete their teams"
  ON "Team" FOR DELETE
  USING (owner_id = auth.uid()::text);

-- RLS Policies for TeamMember table
CREATE POLICY "Users can view team members of their teams"
  ON "TeamMember" FOR SELECT
  USING (
    team_id IN (
      SELECT team_id FROM "TeamMember" 
      WHERE user_id = auth.uid()::text
    )
  );

CREATE POLICY "Team owners and admins can manage members"
  ON "TeamMember" FOR ALL
  USING (
    team_id IN (
      SELECT team_id FROM "TeamMember" 
      WHERE user_id = auth.uid()::text 
      AND role IN ('owner', 'admin')
    )
  );

-- RLS Policies for TeamInvitation table
CREATE POLICY "Users can view invitations for their teams"
  ON "TeamInvitation" FOR SELECT
  USING (
    team_id IN (
      SELECT team_id FROM "TeamMember" 
      WHERE user_id = auth.uid()::text 
      AND role IN ('owner', 'admin')
    )
  );

CREATE POLICY "Team owners and admins can manage invitations"
  ON "TeamInvitation" FOR ALL
  USING (
    team_id IN (
      SELECT team_id FROM "TeamMember" 
      WHERE user_id = auth.uid()::text 
      AND role IN ('owner', 'admin')
    )
  );

-- Public policy for invitation acceptance
CREATE POLICY "Anyone can view invitation details by token"
  ON "TeamInvitation" FOR SELECT
  USING (token IS NOT NULL);
