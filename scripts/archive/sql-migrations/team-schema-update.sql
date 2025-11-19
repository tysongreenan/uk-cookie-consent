-- Team collaboration schema updates

-- Add userId to ConsentBanner table (for backward compatibility)
ALTER TABLE "ConsentBanner" ADD COLUMN "userId" TEXT;
UPDATE "ConsentBanner" SET "userId" = "Project"."userId" FROM "Project" WHERE "ConsentBanner"."projectId" = "Project"."id";
ALTER TABLE "ConsentBanner" ALTER COLUMN "userId" SET NOT NULL;

-- Create Team table
CREATE TABLE "Team" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "ownerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Create TeamMember table
CREATE TABLE "TeamMember" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "teamId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'member', -- 'owner', 'admin', 'member'
    "invitedBy" TEXT,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("invitedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE,
    UNIQUE("teamId", "userId")
);

-- Create TeamInvitation table
CREATE TABLE "TeamInvitation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "teamId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'member',
    "invitedBy" TEXT NOT NULL,
    "token" TEXT NOT NULL UNIQUE,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "acceptedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("invitedBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Add team support to Project table
ALTER TABLE "Project" ADD COLUMN "teamId" TEXT;
ALTER TABLE "Project" ADD CONSTRAINT "Project_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Create indexes for team functionality
CREATE INDEX "Team_ownerId_idx" ON "Team"("ownerId");
CREATE INDEX "TeamMember_teamId_idx" ON "TeamMember"("teamId");
CREATE INDEX "TeamMember_userId_idx" ON "TeamMember"("userId");
CREATE INDEX "TeamInvitation_teamId_idx" ON "TeamInvitation"("teamId");
CREATE INDEX "TeamInvitation_email_idx" ON "TeamInvitation"("email");
CREATE INDEX "TeamInvitation_token_idx" ON "TeamInvitation"("token");
CREATE INDEX "Project_teamId_idx" ON "Project"("teamId");

-- Update ConsentBanner to support team access
ALTER TABLE "ConsentBanner" ADD COLUMN "teamId" TEXT;
ALTER TABLE "ConsentBanner" ADD CONSTRAINT "ConsentBanner_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;
CREATE INDEX "ConsentBanner_teamId_idx" ON "ConsentBanner"("teamId");

-- Create view for user's accessible banners (both owned and team-shared)
CREATE VIEW "UserAccessibleBanners" AS
SELECT DISTINCT
    cb.*,
    CASE 
        WHEN cb."userId" = u."id" THEN 'owner'
        WHEN tm."role" IS NOT NULL THEN tm."role"
        ELSE NULL
    END as access_level
FROM "ConsentBanner" cb
LEFT JOIN "User" u ON cb."userId" = u."id"
LEFT JOIN "TeamMember" tm ON cb."teamId" = tm."teamId" AND tm."userId" = u."id"
WHERE cb."userId" = u."id" OR tm."userId" = u."id";

-- Create function to check if user can access banner
CREATE OR REPLACE FUNCTION can_access_banner(user_id TEXT, banner_id TEXT)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM "UserAccessibleBanners" 
        WHERE "id" = banner_id 
        AND (
            "userId" = user_id 
            OR EXISTS (
                SELECT 1 FROM "TeamMember" 
                WHERE "teamId" = "UserAccessibleBanners"."teamId" 
                AND "userId" = user_id
            )
        )
    );
END;
$$ LANGUAGE plpgsql;
