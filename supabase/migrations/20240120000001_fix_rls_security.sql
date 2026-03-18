-- Migration: Fix RLS Security Issues
-- This migration enables Row Level Security (RLS) on all public tables
-- and fixes the SECURITY DEFINER view issue
--
-- NOTE: Uses service_role-only policies because this project uses NextAuth,
-- not Supabase Auth (auth.uid() is unavailable).

-- ============================================================
-- 1. Enable RLS on all tables that need it
-- ============================================================

-- Prisma-managed tables (may or may not exist depending on migration order)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'ConsentBanner') THEN
        ALTER TABLE "ConsentBanner" ENABLE ROW LEVEL SECURITY;
        IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'ConsentBanner') THEN
            CREATE POLICY "Service role full access to consent_banners"
                ON "ConsentBanner" FOR ALL TO service_role USING (true) WITH CHECK (true);
        END IF;
    END IF;

    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'Project') THEN
        ALTER TABLE "Project" ENABLE ROW LEVEL SECURITY;
        IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'Project') THEN
            CREATE POLICY "Service role full access to projects"
                ON "Project" FOR ALL TO service_role USING (true) WITH CHECK (true);
        END IF;
    END IF;
END $$;

-- Tables from earlier migrations (should exist)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'Team') THEN
        ALTER TABLE "Team" ENABLE ROW LEVEL SECURITY;
    END IF;
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'TeamMember') THEN
        ALTER TABLE "TeamMember" ENABLE ROW LEVEL SECURITY;
    END IF;
END $$;

-- Enable RLS on User table
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;

-- Roadmap tables (created by Prisma or external mechanism)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'RoadmapItem') THEN
        ALTER TABLE "RoadmapItem" ENABLE ROW LEVEL SECURITY;

        IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'RoadmapItem' AND policyname = 'Anyone can view roadmap items') THEN
            CREATE POLICY "Anyone can view roadmap items"
                ON "RoadmapItem" FOR SELECT USING (true);
        END IF;
        IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'RoadmapItem' AND policyname = 'Service role can manage roadmap items') THEN
            CREATE POLICY "Service role can manage roadmap items"
                ON "RoadmapItem" FOR ALL TO service_role USING (true) WITH CHECK (true);
        END IF;
    END IF;

    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'RoadmapVote') THEN
        ALTER TABLE "RoadmapVote" ENABLE ROW LEVEL SECURITY;

        IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'RoadmapVote' AND policyname = 'Anyone can view votes') THEN
            CREATE POLICY "Anyone can view votes"
                ON "RoadmapVote" FOR SELECT USING (true);
        END IF;
        IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'RoadmapVote' AND policyname = 'Service role can manage votes') THEN
            CREATE POLICY "Service role can manage votes"
                ON "RoadmapVote" FOR ALL TO service_role USING (true) WITH CHECK (true);
        END IF;
    END IF;
END $$;

-- SimpleBanners table (if it exists)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'SimpleBanners') THEN
        ALTER TABLE "SimpleBanners" ENABLE ROW LEVEL SECURITY;
        IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'SimpleBanners') THEN
            CREATE POLICY "Service role full access to simple_banners"
                ON "SimpleBanners" FOR ALL TO service_role USING (true) WITH CHECK (true);
        END IF;
    END IF;
END $$;

-- ============================================================
-- 2. Fix SECURITY DEFINER view issue
-- Recreate RoadmapItemWithVotes view with security_invoker
-- ============================================================

DROP VIEW IF EXISTS "RoadmapItemWithVotes";

DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'RoadmapItem')
       AND EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'RoadmapVote')
    THEN
        EXECUTE '
            CREATE VIEW "RoadmapItemWithVotes" WITH (security_invoker = true) AS
            SELECT
                ri.*,
                COALESCE(vote_counts.vote_count, 0) as vote_count,
                CASE WHEN user_votes.user_id IS NOT NULL THEN true ELSE false END as user_voted
            FROM "RoadmapItem" ri
            LEFT JOIN (
                SELECT "roadmapItemId", COUNT(*) as vote_count
                FROM "RoadmapVote"
                GROUP BY "roadmapItemId"
            ) vote_counts ON ri."id" = vote_counts."roadmapItemId"
            LEFT JOIN (
                SELECT DISTINCT "roadmapItemId", "userId" as user_id
                FROM "RoadmapVote"
            ) user_votes ON ri."id" = user_votes."roadmapItemId"
        ';

        COMMENT ON VIEW "RoadmapItemWithVotes" IS 'Roadmap items with vote counts (SECURITY INVOKER)';
    END IF;
END $$;
