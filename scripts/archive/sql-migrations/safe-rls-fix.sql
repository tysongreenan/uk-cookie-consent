-- SAFE RLS Policy Fix - No data deletion, only policy management
-- This script will NOT delete any data, only fix the RLS policies

-- Step 1: First, let's temporarily disable RLS to stop the infinite recursion
-- This is safe and reversible
ALTER TABLE "TeamMember" DISABLE ROW LEVEL SECURITY;

-- Step 2: Drop only the problematic policies (these are just rules, not data)
DROP POLICY IF EXISTS "Users can view team members of their teams" ON "TeamMember";
DROP POLICY IF EXISTS "Users can insert team members for their teams" ON "TeamMember";
DROP POLICY IF EXISTS "Users can update team members of their teams" ON "TeamMember";
DROP POLICY IF EXISTS "Users can delete team members of their teams" ON "TeamMember";
DROP POLICY IF EXISTS "Team members can view their own membership" ON "TeamMember";
DROP POLICY IF EXISTS "Team owners can manage all members" ON "TeamMember";
DROP POLICY IF EXISTS "Users can view their own team memberships" ON "TeamMember";
DROP POLICY IF EXISTS "Team owners can manage team members" ON "TeamMember";

-- Step 3: Re-enable RLS
ALTER TABLE "TeamMember" ENABLE ROW LEVEL SECURITY;

-- Step 4: Create new, simple policies that won't cause recursion
-- These policies are much simpler and safer

-- Policy 1: Allow users to view team members if they are members of that team
CREATE POLICY "team_members_select_safe" ON "TeamMember"
    FOR SELECT
    USING (
        "user_id" = auth.uid() OR
        EXISTS (
            SELECT 1 FROM "Team" t 
            WHERE t."id" = "TeamMember"."team_id" 
            AND t."owner_id" = auth.uid()
        )
    );

-- Policy 2: Allow team owners to insert new members
CREATE POLICY "team_members_insert_safe" ON "TeamMember"
    FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM "Team" t 
            WHERE t."id" = "TeamMember"."team_id" 
            AND t."owner_id" = auth.uid()
        )
    );

-- Policy 3: Allow team owners to update members
CREATE POLICY "team_members_update_safe" ON "TeamMember"
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

-- Policy 4: Allow team owners to delete members
CREATE POLICY "team_members_delete_safe" ON "TeamMember"
    FOR DELETE
    USING (
        EXISTS (
            SELECT 1 FROM "Team" t 
            WHERE t."id" = "TeamMember"."team_id" 
            AND t."owner_id" = auth.uid()
        )
    );
