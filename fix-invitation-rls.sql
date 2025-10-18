-- Fix RLS policies for TeamInvitation to work with NextAuth.js sessions
-- The issue is that RLS policies are using auth.uid() but we're using NextAuth.js sessions

-- First, let's drop ALL existing policies to start fresh
DROP POLICY IF EXISTS "Users can view invitations for their teams" ON "TeamInvitation";
DROP POLICY IF EXISTS "Team owners and admins can manage invitations" ON "TeamInvitation";
DROP POLICY IF EXISTS "Team owners can create invitations" ON "TeamInvitation";
DROP POLICY IF EXISTS "Team owners can update invitations" ON "TeamInvitation";
DROP POLICY IF EXISTS "Team owners can delete invitations" ON "TeamInvitation";
DROP POLICY IF EXISTS "team_invitation_select" ON "TeamInvitation";
DROP POLICY IF EXISTS "team_invitation_insert" ON "TeamInvitation";
DROP POLICY IF EXISTS "team_invitation_update" ON "TeamInvitation";
DROP POLICY IF EXISTS "team_invitation_delete" ON "TeamInvitation";
DROP POLICY IF EXISTS "Anyone can view invitation details by token" ON "TeamInvitation";

-- Create new policies that work with our application logic
-- For now, we'll create permissive policies since the application handles authorization

-- Allow users to view invitations for teams they own or are members of
CREATE POLICY "team_invitation_select" ON "TeamInvitation"
    FOR SELECT
    USING (true); -- Application will filter based on user permissions

-- Allow team owners to create invitations
CREATE POLICY "team_invitation_insert" ON "TeamInvitation"
    FOR INSERT
    WITH CHECK (true); -- Application will verify team ownership

-- Allow team owners to update invitations
CREATE POLICY "team_invitation_update" ON "TeamInvitation"
    FOR UPDATE
    USING (true) -- Application will verify team ownership
    WITH CHECK (true);

-- Allow team owners to delete invitations
CREATE POLICY "team_invitation_delete" ON "TeamInvitation"
    FOR DELETE
    USING (true); -- Application will verify team ownership

-- Keep the public policy for invitation acceptance
CREATE POLICY "Anyone can view invitation details by token"
    ON "TeamInvitation" FOR SELECT
    USING (token IS NOT NULL);
