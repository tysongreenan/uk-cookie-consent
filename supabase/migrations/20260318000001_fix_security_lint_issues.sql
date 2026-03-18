-- Migration: Fix RLS on Payment and User tables
-- Date: 2026-03-18
-- Status: Applied to production
--
-- These two tables were the only ones missing RLS in the live database.
-- All other security fixes (search_path, permissive policies, etc.) are
-- baked into the migration files that create those objects.

-- Enable RLS on Payment table (accessed via Prisma + service_role)
ALTER TABLE "Payment" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access to payments"
    ON "Payment" FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- Enable RLS on User table (accessed via service_role API routes)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'User' AND policyname = 'Allow update access to User') THEN
        DROP POLICY "Allow update access to User" ON "User";
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'User' AND policyname = 'Service role full access to users') THEN
        CREATE POLICY "Service role full access to users"
            ON "User" FOR ALL
            TO service_role
            USING (true)
            WITH CHECK (true);
    END IF;
END $$;
