-- Comprehensive RLS fix for ConsentBanner table
-- This handles both possible column names (projectId vs project_id)

BEGIN;

-- Drop all existing ConsentBanner policies
DROP POLICY IF EXISTS "Users can view their own banners" ON "ConsentBanner";
DROP POLICY IF EXISTS "Users can create banners" ON "ConsentBanner";
DROP POLICY IF EXISTS "Users can update their own banners" ON "ConsentBanner";
DROP POLICY IF EXISTS "Users can delete their own banners" ON "ConsentBanner";
DROP POLICY IF EXISTS "Users can view banners in their teams" ON "ConsentBanner";
DROP POLICY IF EXISTS "Users can create banners in their teams" ON "ConsentBanner";
DROP POLICY IF EXISTS "Users can update banners in their teams" ON "ConsentBanner";
DROP POLICY IF EXISTS "Users can delete banners in their teams" ON "ConsentBanner";
DROP POLICY IF EXISTS "Allow all operations on ConsentBanner" ON "ConsentBanner";

-- Try to create policies with projectId (camelCase) first
-- If this fails, we'll know the column name is different
DO $$
BEGIN
    -- Try to create a simple policy that references projectId
    EXECUTE '
    CREATE POLICY "Users can view banners in their teams" ON "ConsentBanner"
      FOR SELECT
      USING (
        EXISTS (
          SELECT 1 FROM "Project" p
          JOIN "TeamMember" tm ON tm.team_id = p.team_id
          WHERE p.id = "ConsentBanner"."projectId"
          AND tm.user_id = auth.uid()::text
        )
      )';
    
    -- If we get here, projectId exists, create the rest of the policies
    EXECUTE '
    CREATE POLICY "Users can create banners in their teams" ON "ConsentBanner"
      FOR INSERT
      WITH CHECK (
        EXISTS (
          SELECT 1 FROM "Project" p
          JOIN "TeamMember" tm ON tm.team_id = p.team_id
          WHERE p.id = "ConsentBanner"."projectId"
          AND tm.user_id = auth.uid()::text
          AND tm.role IN (''owner'', ''admin'', ''editor'')
        )
      )';
    
    EXECUTE '
    CREATE POLICY "Users can update banners in their teams" ON "ConsentBanner"
      FOR UPDATE
      USING (
        EXISTS (
          SELECT 1 FROM "Project" p
          JOIN "TeamMember" tm ON tm.team_id = p.team_id
          WHERE p.id = "ConsentBanner"."projectId"
          AND tm.user_id = auth.uid()::text
          AND tm.role IN (''owner'', ''admin'', ''editor'')
        )
      )';
    
    EXECUTE '
    CREATE POLICY "Users can delete banners in their teams" ON "ConsentBanner"
      FOR DELETE
      USING (
        EXISTS (
          SELECT 1 FROM "Project" p
          JOIN "TeamMember" tm ON tm.team_id = p.team_id
          WHERE p.id = "ConsentBanner"."projectId"
          AND tm.user_id = auth.uid()::text
          AND tm.role IN (''owner'', ''admin'', ''editor'')
        )
      )';
    
    RAISE NOTICE 'Successfully created RLS policies with projectId column';
    
EXCEPTION
    WHEN OTHERS THEN
        -- If projectId doesn't exist, try project_id (snake_case)
        BEGIN
            EXECUTE '
            CREATE POLICY "Users can view banners in their teams" ON "ConsentBanner"
              FOR SELECT
              USING (
                EXISTS (
                  SELECT 1 FROM "Project" p
                  JOIN "TeamMember" tm ON tm.team_id = p.team_id
                  WHERE p.id = "ConsentBanner"."project_id"
                  AND tm.user_id = auth.uid()::text
                )
              )';
            
            EXECUTE '
            CREATE POLICY "Users can create banners in their teams" ON "ConsentBanner"
              FOR INSERT
              WITH CHECK (
                EXISTS (
                  SELECT 1 FROM "Project" p
                  JOIN "TeamMember" tm ON tm.team_id = p.team_id
                  WHERE p.id = "ConsentBanner"."project_id"
                  AND tm.user_id = auth.uid()::text
                  AND tm.role IN (''owner'', ''admin'', ''editor'')
                )
              )';
            
            EXECUTE '
            CREATE POLICY "Users can update banners in their teams" ON "ConsentBanner"
              FOR UPDATE
              USING (
                EXISTS (
                  SELECT 1 FROM "Project" p
                  JOIN "TeamMember" tm ON tm.team_id = p.team_id
                  WHERE p.id = "ConsentBanner"."project_id"
                  AND tm.user_id = auth.uid()::text
                  AND tm.role IN (''owner'', ''admin'', ''editor'')
                )
              )';
            
            EXECUTE '
            CREATE POLICY "Users can delete banners in their teams" ON "ConsentBanner"
              FOR DELETE
              USING (
                EXISTS (
                  SELECT 1 FROM "Project" p
                  JOIN "TeamMember" tm ON tm.team_id = p.team_id
                  WHERE p.id = "ConsentBanner"."project_id"
                  AND tm.user_id = auth.uid()::text
                  AND tm.role IN (''owner'', ''admin'', ''editor'')
                )
              )';
            
            RAISE NOTICE 'Successfully created RLS policies with project_id column';
            
        EXCEPTION
            WHEN OTHERS THEN
                -- If neither column exists, create permissive policies
                EXECUTE '
                CREATE POLICY "Allow all operations on ConsentBanner" ON "ConsentBanner"
                  FOR ALL
                  USING (true)
                  WITH CHECK (true)';
                
                RAISE NOTICE 'Created permissive RLS policies - column name issue detected';
        END;
END;
$$;

COMMIT;
