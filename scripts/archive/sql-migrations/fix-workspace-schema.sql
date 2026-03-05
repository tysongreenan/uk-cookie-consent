-- Fix database schema issues for workspace invitation system

-- 1. Add current_team_id to User table if it doesn't exist
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS current_team_id TEXT REFERENCES "Team"(id) ON DELETE SET NULL;

-- 2. Fix Project table column name from teamId to team_id
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'Project' AND column_name = 'teamId') THEN
        ALTER TABLE "Project" RENAME COLUMN "teamId" TO "team_id";
    END IF;
END $$;

-- 3. Add missing columns to TeamInvitation table
ALTER TABLE "TeamInvitation" ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- 4. Create roadmap tables if they don't exist
CREATE TABLE IF NOT EXISTS "RoadmapItem" (
    "id" SERIAL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'planned',
    "priority" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "RoadmapVote" (
    "id" SERIAL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "roadmapItemId" INTEGER NOT NULL,
    "votedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("roadmapItemId") REFERENCES "RoadmapItem"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    UNIQUE("userId", "roadmapItemId")
);

-- 5. Create RoadmapItemWithVotes view
CREATE OR REPLACE VIEW "RoadmapItemWithVotes" AS
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

-- 6. Insert initial roadmap items if table is empty
INSERT INTO "RoadmapItem" ("title", "description", "category", "status", "priority") 
SELECT * FROM (VALUES
    ('Advanced Analytics Dashboard', 'Comprehensive analytics showing consent rates, user interactions, and conversion metrics.', 'analytics', 'planned', 1),
    ('Team Collaboration Features', 'Invite team members, assign roles, and collaborate on banner projects together.', 'collaboration', 'planned', 2),
    ('Multi-Language Support', 'Built-in translations for 20+ languages with automatic locale detection.', 'localization', 'in-progress', 3),
    ('Advanced Compliance Tools', 'Automated compliance checking, privacy policy generators, and legal document templates.', 'compliance', 'planned', 4),
    ('Custom CSS Editor', 'Advanced styling options with live preview and CSS customization.', 'design', 'planned', 5),
    ('A/B Testing Framework', 'Test different banner designs and messages to optimize conversion rates.', 'optimization', 'planned', 6)
) AS v(title, description, category, status, priority)
WHERE NOT EXISTS (SELECT 1 FROM "RoadmapItem" LIMIT 1);
