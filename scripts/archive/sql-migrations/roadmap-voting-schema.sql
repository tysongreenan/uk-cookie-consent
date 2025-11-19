-- Roadmap voting system schema

-- Roadmap items table
CREATE TABLE "RoadmapItem" (
    "id" SERIAL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'planned', -- 'planned', 'in-progress', 'completed'
    "priority" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- User votes on roadmap items
CREATE TABLE "RoadmapVote" (
    "id" SERIAL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "roadmapItemId" INTEGER NOT NULL,
    "votedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("roadmapItemId") REFERENCES "RoadmapItem"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    UNIQUE("userId", "roadmapItemId") -- Prevent duplicate votes
);

-- Feature suggestions from users
CREATE TABLE "FeatureSuggestion" (
    "id" SERIAL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'under-review', 'accepted', 'rejected'
    "votes" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Votes on feature suggestions
CREATE TABLE "SuggestionVote" (
    "id" SERIAL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "suggestionId" INTEGER NOT NULL,
    "votedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("suggestionId") REFERENCES "FeatureSuggestion"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    UNIQUE("userId", "suggestionId") -- Prevent duplicate votes
);

-- Create indexes for better performance
CREATE INDEX "RoadmapVote_userId_idx" ON "RoadmapVote"("userId");
CREATE INDEX "RoadmapVote_roadmapItemId_idx" ON "RoadmapVote"("roadmapItemId");
CREATE INDEX "FeatureSuggestion_userId_idx" ON "FeatureSuggestion"("userId");
CREATE INDEX "FeatureSuggestion_status_idx" ON "FeatureSuggestion"("status");
CREATE INDEX "SuggestionVote_userId_idx" ON "SuggestionVote"("userId");
CREATE INDEX "SuggestionVote_suggestionId_idx" ON "SuggestionVote"("suggestionId");

-- Insert initial roadmap items
INSERT INTO "RoadmapItem" ("title", "description", "category", "status", "priority") VALUES
('Advanced Analytics Dashboard', 'Comprehensive analytics showing consent rates, user interactions, and conversion metrics.', 'analytics', 'planned', 1),
('Team Collaboration Features', 'Invite team members, assign roles, and collaborate on banner projects together.', 'collaboration', 'planned', 2),
('Multi-Language Support', 'Built-in translations for 20+ languages with automatic locale detection.', 'localization', 'in-progress', 3),
('Advanced Compliance Tools', 'Automated compliance checking, privacy policy generators, and legal document templates.', 'compliance', 'planned', 4),
('Custom CSS Editor', 'Advanced styling options with live preview and CSS customization.', 'design', 'planned', 5),
('A/B Testing Framework', 'Test different banner designs and messages to optimize conversion rates.', 'optimization', 'planned', 6);

-- Create view for roadmap items with vote counts
CREATE VIEW "RoadmapItemWithVotes" AS
SELECT 
    r.*,
    COALESCE(vote_counts.vote_count, 0) as vote_count
FROM "RoadmapItem" r
LEFT JOIN (
    SELECT 
        "roadmapItemId",
        COUNT(*) as vote_count
    FROM "RoadmapVote"
    GROUP BY "roadmapItemId"
) vote_counts ON r."id" = vote_counts."roadmapItemId"
ORDER BY r."priority" ASC, vote_count DESC;
