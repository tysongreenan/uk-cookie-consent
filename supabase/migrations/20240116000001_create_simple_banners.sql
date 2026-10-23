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

-- These also lived only under scripts/archive. Live API:
-- PATCH/DELETE /api/banners/simple/[id], GET /api/banners/simple/[id]/code
CREATE OR REPLACE FUNCTION update_banner_simple(
    banner_id TEXT,
    banner_name TEXT,
    banner_config JSONB,
    banner_code TEXT,
    user_id TEXT
)
RETURNS TEXT AS $$
BEGIN
    UPDATE "SimpleBanners"
    SET
        "name" = banner_name,
        "config" = banner_config,
        "code" = banner_code,
        "updatedAt" = NOW()
    WHERE "id" = banner_id AND "userId" = user_id;

    RETURN banner_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public;

CREATE OR REPLACE FUNCTION delete_banner_simple(
    banner_id TEXT,
    user_id TEXT
)
RETURNS BOOLEAN AS $$
BEGIN
    DELETE FROM "SimpleBanners"
    WHERE "id" = banner_id AND "userId" = user_id;

    RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public;

CREATE OR REPLACE FUNCTION get_banner_code_simple(
    banner_id TEXT,
    user_id TEXT
)
RETURNS TABLE (
    code TEXT,
    name TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        sb."code",
        sb."name"
    FROM "SimpleBanners" sb
    WHERE sb."id" = banner_id AND sb."userId" = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public;

GRANT EXECUTE ON FUNCTION update_banner_simple(TEXT, TEXT, JSONB, TEXT, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION update_banner_simple(TEXT, TEXT, JSONB, TEXT, TEXT) TO service_role;
GRANT EXECUTE ON FUNCTION delete_banner_simple(TEXT, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION delete_banner_simple(TEXT, TEXT) TO service_role;
GRANT EXECUTE ON FUNCTION get_banner_code_simple(TEXT, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION get_banner_code_simple(TEXT, TEXT) TO service_role;
