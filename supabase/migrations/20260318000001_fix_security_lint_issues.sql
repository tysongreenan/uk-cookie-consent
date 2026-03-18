-- Migration: Fix Supabase Security Linter Issues
-- Date: 2026-03-18
--
-- Fixes:
--   1. Enable RLS on webhook_events, RoadmapComment, Payment
--   2. Recreate RoadmapItemWithVotes view with SECURITY INVOKER
--   3. Set search_path on all public functions
--   4. Tighten overly permissive RLS policies (scope to specific roles)
--
-- NOTE: This project uses NextAuth (not Supabase Auth), so auth.uid() is NOT
-- available for anon-key requests. All API routes and server-side libs now use
-- service_role which bypasses RLS. RLS policies here are defense-in-depth:
-- they block direct PostgREST access via the anon key.

-- ============================================================
-- 1. Enable RLS on tables missing it
-- ============================================================

-- webhook_events: no code references this table, lock it down to service_role
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'webhook_events') THEN
        ALTER TABLE public.webhook_events ENABLE ROW LEVEL SECURITY;

        IF NOT EXISTS (
            SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'webhook_events'
        ) THEN
            -- Only service_role can access (used by Stripe webhooks via API routes)
            CREATE POLICY "Service role full access to webhook_events"
                ON public.webhook_events FOR ALL
                TO service_role
                USING (true)
                WITH CHECK (true);
        END IF;
    END IF;
END $$;

-- RoadmapComment: accessed via service_role in /api/roadmap/comments
-- Public SELECT is intentional (public roadmap). Writes go through service_role.
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'RoadmapComment') THEN
        ALTER TABLE "RoadmapComment" ENABLE ROW LEVEL SECURITY;

        -- Anyone can read comments (public roadmap feature)
        IF NOT EXISTS (
            SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'RoadmapComment' AND policyname = 'Anyone can view roadmap comments'
        ) THEN
            CREATE POLICY "Anyone can view roadmap comments"
                ON "RoadmapComment" FOR SELECT
                USING (true);
        END IF;

        -- Only service_role can write (API route handles auth via NextAuth)
        IF NOT EXISTS (
            SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'RoadmapComment' AND policyname = 'Service role can manage comments'
        ) THEN
            CREATE POLICY "Service role can manage comments"
                ON "RoadmapComment" FOR ALL
                TO service_role
                USING (true)
                WITH CHECK (true);
        END IF;
    END IF;
END $$;

-- Payment: accessed only via Prisma (bypasses RLS) and service_role
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'Payment') THEN
        ALTER TABLE "Payment" ENABLE ROW LEVEL SECURITY;

        -- Service role for Stripe webhook writes and admin reads
        IF NOT EXISTS (
            SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'Payment' AND policyname = 'Service role full access to payments'
        ) THEN
            CREATE POLICY "Service role full access to payments"
                ON "Payment" FOR ALL
                TO service_role
                USING (true)
                WITH CHECK (true);
        END IF;
    END IF;
END $$;

-- ============================================================
-- 2. Fix SECURITY DEFINER view: RoadmapItemWithVotes
-- Recreate with security_invoker = true so it respects caller's RLS
-- ============================================================

DROP VIEW IF EXISTS "RoadmapItemWithVotes";

CREATE VIEW "RoadmapItemWithVotes" WITH (security_invoker = true) AS
SELECT
    ri.*,
    COALESCE(vote_counts.vote_count, 0) as vote_count,
    CASE WHEN user_votes.user_id IS NOT NULL THEN true ELSE false END as user_voted
FROM "RoadmapItem" ri
LEFT JOIN (
    SELECT
        "roadmapItemId",
        COUNT(*) as vote_count
    FROM "RoadmapVote"
    GROUP BY "roadmapItemId"
) vote_counts ON ri."id" = vote_counts."roadmapItemId"
LEFT JOIN (
    SELECT DISTINCT "roadmapItemId", "userId" as user_id
    FROM "RoadmapVote"
) user_votes ON ri."id" = user_votes."roadmapItemId";

COMMENT ON VIEW "RoadmapItemWithVotes" IS 'Roadmap items with vote counts (SECURITY INVOKER)';

-- ============================================================
-- 3. Fix mutable search_path on all public functions
-- This prevents search_path injection attacks on SECURITY DEFINER functions
-- ============================================================

-- Helper: set search_path on a function if it exists (by name only, no args)
-- We use specific signatures where known

DO $$
DECLARE
    func RECORD;
BEGIN
    -- Parameterless trigger functions
    FOR func IN
        SELECT unnest(ARRAY[
            'update_github_connections_updated_at',
            'update_change_requests_updated_at',
            'update_site_guidelines_updated_at',
            'set_updated_at',
            'update_updated_at_column'
        ]) AS name
    LOOP
        IF EXISTS (
            SELECT 1 FROM pg_proc p
            JOIN pg_namespace n ON p.pronamespace = n.oid
            WHERE n.nspname = 'public' AND p.proname = func.name
        ) THEN
            EXECUTE format('ALTER FUNCTION public.%I() SET search_path = public', func.name);
        END IF;
    END LOOP;
END $$;

-- Functions with specific signatures
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_proc p JOIN pg_namespace n ON p.pronamespace = n.oid WHERE n.nspname = 'public' AND p.proname = 'increment_banner_stat') THEN
        ALTER FUNCTION public.increment_banner_stat(TEXT, date, text, integer, boolean) SET search_path = public;
    END IF;
END $$;

DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_proc p JOIN pg_namespace n ON p.pronamespace = n.oid WHERE n.nspname = 'public' AND p.proname = 'create_banner_simple') THEN
        ALTER FUNCTION public.create_banner_simple(TEXT, TEXT, JSONB, TEXT, TEXT) SET search_path = public;
    END IF;
END $$;

DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_proc p JOIN pg_namespace n ON p.pronamespace = n.oid WHERE n.nspname = 'public' AND p.proname = 'update_banner_simple') THEN
        ALTER FUNCTION public.update_banner_simple(TEXT, TEXT, JSONB, TEXT, TEXT) SET search_path = public;
    END IF;
END $$;

DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_proc p JOIN pg_namespace n ON p.pronamespace = n.oid WHERE n.nspname = 'public' AND p.proname = 'delete_banner_simple') THEN
        ALTER FUNCTION public.delete_banner_simple(TEXT, TEXT) SET search_path = public;
    END IF;
END $$;

DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_proc p JOIN pg_namespace n ON p.pronamespace = n.oid WHERE n.nspname = 'public' AND p.proname = 'get_banner_code_simple') THEN
        ALTER FUNCTION public.get_banner_code_simple(TEXT, TEXT) SET search_path = public;
    END IF;
END $$;

DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_proc p JOIN pg_namespace n ON p.pronamespace = n.oid WHERE n.nspname = 'public' AND p.proname = 'toggle_banner_active') THEN
        ALTER FUNCTION public.toggle_banner_active(TEXT, TEXT) SET search_path = public;
    END IF;
END $$;

DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_proc p JOIN pg_namespace n ON p.pronamespace = n.oid WHERE n.nspname = 'public' AND p.proname = 'get_banners_simple') THEN
        ALTER FUNCTION public.get_banners_simple(TEXT) SET search_path = public;
    END IF;
END $$;

-- ============================================================
-- 4. Tighten overly permissive RLS policies
-- The issue: policies with USING(true)/WITH CHECK(true) for ALL
-- operations grant unrestricted access to ANY role including anon.
-- Fix: scope "allow all" policies to service_role only.
-- ============================================================

-- Fix FeatureSuggestion: scope ALL policy to service_role,
-- keep public SELECT for the roadmap search endpoint
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'FeatureSuggestion' AND policyname = 'Allow authenticated API access') THEN
        DROP POLICY "Allow authenticated API access" ON "FeatureSuggestion";

        -- Public read (search endpoint is anonymous)
        CREATE POLICY "Anyone can view suggestions"
            ON "FeatureSuggestion" FOR SELECT
            USING (true);

        -- Only service_role can write (API route handles auth)
        CREATE POLICY "Service role can manage suggestions"
            ON "FeatureSuggestion" FOR ALL
            TO service_role
            USING (true)
            WITH CHECK (true);
    END IF;
END $$;

-- Fix User UPDATE: replace unrestricted UPDATE with service_role only
-- All User access now goes through API routes (service_role), no anon access needed
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'User' AND policyname = 'Allow update access to User') THEN
        DROP POLICY "Allow update access to User" ON "User";

        IF NOT EXISTS (
            SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'User' AND policyname = 'Service role full access to users'
        ) THEN
            CREATE POLICY "Service role full access to users"
                ON "User" FOR ALL
                TO service_role
                USING (true)
                WITH CHECK (true);
        END IF;
    END IF;
END $$;

-- Fix banner_stats: replace unrestricted ALL with service_role only
-- Analytics page now uses /api/analytics (service_role), no anon access needed
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'banner_stats' AND policyname = 'Allow all access to banner_stats') THEN
        DROP POLICY "Allow all access to banner_stats" ON banner_stats;

        IF NOT EXISTS (
            SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'banner_stats' AND policyname = 'Service role full access to banner_stats'
        ) THEN
            CREATE POLICY "Service role full access to banner_stats"
                ON banner_stats FOR ALL
                TO service_role
                USING (true)
                WITH CHECK (true);
        END IF;
    END IF;
END $$;

-- Fix subscriptions: scope ALL policy to service_role only
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'subscriptions' AND policyname = 'Service role full access') THEN
        DROP POLICY "Service role full access" ON subscriptions;

        CREATE POLICY "Service role full access to subscriptions"
            ON subscriptions FOR ALL
            TO service_role
            USING (true)
            WITH CHECK (true);
    END IF;
END $$;
