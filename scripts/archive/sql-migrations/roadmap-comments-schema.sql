-- Threaded comments on roadmap items
CREATE TABLE "RoadmapComment" (
    "id" SERIAL PRIMARY KEY,
    "roadmapItemId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "parentId" INTEGER, -- NULL for top-level comments, references parent comment for replies
    "content" TEXT NOT NULL,
    "isAdminReply" BOOLEAN NOT NULL DEFAULT FALSE,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("roadmapItemId") REFERENCES "RoadmapItem"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("parentId") REFERENCES "RoadmapComment"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Indexes for performance
CREATE INDEX "RoadmapComment_roadmapItemId_idx" ON "RoadmapComment"("roadmapItemId");
CREATE INDEX "RoadmapComment_userId_idx" ON "RoadmapComment"("userId");
CREATE INDEX "RoadmapComment_parentId_idx" ON "RoadmapComment"("parentId");
