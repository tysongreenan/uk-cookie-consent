-- Migration: Fix RLS Security Issues
-- This migration enables Row Level Security (RLS) on all public tables
-- and fixes the SECURITY DEFINER view issue

-- ============================================================
-- 1. Enable RLS on all tables that need it
-- ============================================================

-- Enable RLS on ConsentBanner table
ALTER TABLE "ConsentBanner" ENABLE ROW LEVEL SECURITY;

-- Enable RLS on Project table
ALTER TABLE "Project" ENABLE ROW LEVEL SECURITY;

-- Enable RLS on Team table
ALTER TABLE "Team" ENABLE ROW LEVEL SECURITY;

-- Enable RLS on TeamMember table
ALTER TABLE "TeamMember" ENABLE ROW LEVEL SECURITY;

-- Enable RLS on User table
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;

-- Enable RLS on RoadmapItem table
ALTER TABLE "RoadmapItem" ENABLE ROW LEVEL SECURITY;

-- Enable RLS on RoadmapVote table
ALTER TABLE "RoadmapVote" ENABLE ROW LEVEL SECURITY;

-- Enable RLS on SimpleBanners table (if it exists)
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'SimpleBanners') THEN
        ALTER TABLE "SimpleBanners" ENABLE ROW LEVEL SECURITY;
    END IF;
END $$;

-- ============================================================
-- 2. Fix SECURITY DEFINER view issue
-- Recreate RoadmapItemWithVotes view without SECURITY DEFINER
-- ============================================================

-- Drop the existing view if it exists
DROP VIEW IF EXISTS "RoadmapItemWithVotes";

-- Recreate the view without SECURITY DEFINER
CREATE VIEW "RoadmapItemWithVotes" AS
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

-- ============================================================
-- 3. Add RLS policies for tables that don't have them yet
-- ============================================================

-- RLS Policies for RoadmapItem table
DO $$ 
BEGIN
    -- Only create policies if they don't exist
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'RoadmapItem' 
        AND policyname = 'Anyone can view roadmap items'
    ) THEN
        CREATE POLICY "Anyone can view roadmap items"
            ON "RoadmapItem" FOR SELECT
            USING (true);
    END IF;
END $$;

-- RLS Policies for RoadmapVote table
DO $$ 
BEGIN
    -- Users can view all votes
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'RoadmapVote' 
        AND policyname = 'Anyone can view votes'
    ) THEN
        CREATE POLICY "Anyone can view votes"
            ON "RoadmapVote" FOR SELECT
            USING (true);
    END IF;

    -- Users can insert their own votes
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'RoadmapVote' 
        AND policyname = 'Users can vote on roadmap items'
    ) THEN
        CREATE POLICY "Users can vote on roadmap items"
            ON "RoadmapVote" FOR INSERT
            WITH CHECK (auth.uid()::text = "userId");
    END IF;

    -- Users can delete their own votes
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'RoadmapVote' 
        AND policyname = 'Users can remove their votes'
    ) THEN
        CREATE POLICY "Users can remove their votes"
            ON "RoadmapVote" FOR DELETE
            USING (auth.uid()::text = "userId");
    END IF;
END $$;

-- RLS Policies for SimpleBanners table (if it exists)
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'SimpleBanners') THEN
        -- Users can view their own banners
        IF NOT EXISTS (
            SELECT 1 FROM pg_policies 
            WHERE schemaname = 'public' 
            AND tablename = 'SimpleBanners' 
            AND policyname = 'Users can view their own simple banners'
        ) THEN
            CREATE POLICY "Users can view their own simple banners"
                ON "SimpleBanners" FOR SELECT
                USING (auth.uid()::text = "userId");
        END IF;

        -- Users can insert their own banners
        IF NOT EXISTS (
            SELECT 1 FROM pg_policies 
            WHERE schemaname = 'public' 
            AND tablename = 'SimpleBanners' 
            AND policyname = 'Users can create simple banners'
        ) THEN
            CREATE POLICY "Users can create simple banners"
                ON "SimpleBanners" FOR INSERT
                WITH CHECK (auth.uid()::text = "userId");
        END IF;

        -- Users can update their own banners
        IF NOT EXISTS (
            SELECT 1 FROM pg_policies 
            WHERE schemaname = 'public' 
            AND tablename = 'SimpleBanners' 
            AND policyname = 'Users can update their own simple banners'
        ) THEN
            CREATE POLICY "Users can update their own simple banners"
                ON "SimpleBanners" FOR UPDATE
                USING (auth.uid()::text = "userId");
        END IF;

        -- Users can delete their own banners
        IF NOT EXISTS (
            SELECT 1 FROM pg_policies 
            WHERE schemaname = 'public' 
            AND tablename = 'SimpleBanners' 
            AND policyname = 'Users can delete their own simple banners'
        ) THEN
            CREATE POLICY "Users can delete their own simple banners"
                ON "SimpleBanners" FOR DELETE
                USING (auth.uid()::text = "userId");
        END IF;
    END IF;
END $$;

-- Add comment
COMMENT ON TABLE "RoadmapItem" IS 'Public roadmap items that anyone can view';
COMMENT ON TABLE "RoadmapVote" IS 'User votes on roadmap items';
COMMENT ON VIEW "RoadmapItemWithVotes" IS 'Roadmap items with vote counts and user vote status (no SECURITY DEFINER)';

