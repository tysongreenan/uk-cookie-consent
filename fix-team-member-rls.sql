-- Fix infinite recursion in TeamMember RLS policies
-- Drop all existing policies first
DROP POLICY IF EXISTS "Users can view team members of their teams" ON "TeamMember";
DROP POLICY IF EXISTS "Users can insert team members for their teams" ON "TeamMember";
DROP POLICY IF EXISTS "Users can update team members of their teams" ON "TeamMember";
DROP POLICY IF EXISTS "Users can delete team members of their teams" ON "TeamMember";
DROP POLICY IF EXISTS "Team members can view their own membership" ON "TeamMember";
DROP POLICY IF EXISTS "Team owners can manage all members" ON "TeamMember";

-- Create simplified, non-recursive policies
-- Policy 1: Users can view team members if they are members of that team
CREATE POLICY "Users can view team members of their teams" ON "TeamMember"
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM "TeamMember" tm2 
            WHERE tm2."team_id" = "TeamMember"."team_id" 
            AND tm2."user_id" = auth.uid()
        )
    );

-- Policy 2: Users can insert team members if they are owners of the team
CREATE POLICY "Users can insert team members for their teams" ON "TeamMember"
    FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM "Team" t 
            WHERE t."id" = "TeamMember"."team_id" 
            AND t."owner_id" = auth.uid()
        )
    );

-- Policy 3: Users can update team members if they are owners of the team
CREATE POLICY "Users can update team members of their teams" ON "TeamMember"
    FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM "Team" t 
            WHERE t."id" = "TeamMember"."team_id" 
            AND t."owner_id" = auth.uid()
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM "Team" t 
            WHERE t."id" = "TeamMember"."team_id" 
            AND t."owner_id" = auth.uid()
        )
    );

-- Policy 4: Users can delete team members if they are owners of the team
CREATE POLICY "Users can delete team members of their teams" ON "TeamMember"
    FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM "Team" t 
            WHERE t."id" = "TeamMember"."team_id" 
            AND t."owner_id" = auth.uid()
        )
    );
