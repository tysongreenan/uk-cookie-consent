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

-- POST /api/banners/simple calls this RPC; it previously lived only in scripts/archive.
CREATE OR REPLACE FUNCTION create_banner_simple(
    banner_id TEXT,
    banner_name TEXT,
    banner_config JSONB,
    banner_code TEXT,
    user_id TEXT
)
RETURNS TEXT AS $$
BEGIN
    INSERT INTO "SimpleBanners" (
        "id",
        "name",
        "config",
        "code",
        "userId",
        "createdAt",
        "updatedAt"
    ) VALUES (
        banner_id,
        banner_name,
        banner_config,
        banner_code,
        user_id,
        NOW(),
        NOW()
    );

    RETURN banner_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public;

GRANT EXECUTE ON FUNCTION create_banner_simple(TEXT, TEXT, JSONB, TEXT, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION create_banner_simple(TEXT, TEXT, JSONB, TEXT, TEXT) TO service_role;
