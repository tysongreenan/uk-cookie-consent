-- Backfill: the only prior CREATE lived under scripts/archive and is being deleted.
-- Columns match live SimpleBanners and /api/banners/simple*.

CREATE TABLE IF NOT EXISTS "SimpleBanners" (
    "id" TEXT PRIMARY KEY,
    "name" TEXT NOT NULL,
    "config" JSONB NOT NULL,
    "code" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "isActive" BOOLEAN NOT NULL DEFAULT true
);

CREATE INDEX IF NOT EXISTS "SimpleBanners_userId_idx" ON "SimpleBanners"("userId");
CREATE INDEX IF NOT EXISTS "SimpleBanners_createdAt_idx" ON "SimpleBanners"("createdAt");
