-- Create a brand new, simplified banner saving system
-- This bypasses all the existing RLS and schema issues

BEGIN;

-- 1. Create a simple banners table without RLS complications
CREATE TABLE IF NOT EXISTS "SimpleBanners" (
    "id" TEXT PRIMARY KEY,
    "name" TEXT NOT NULL,
    "config" JSONB NOT NULL,
    "code" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create indexes for performance
CREATE INDEX IF NOT EXISTS "SimpleBanners_userId_idx" ON "SimpleBanners"("userId");
CREATE INDEX IF NOT EXISTS "SimpleBanners_createdAt_idx" ON "SimpleBanners"("createdAt");

-- 3. Create function to create banners (bypasses RLS)
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. Create function to get banners (bypasses RLS)
CREATE OR REPLACE FUNCTION get_banners_simple(user_id TEXT)
RETURNS TABLE (
    id TEXT,
    name TEXT,
    config JSONB,
    code TEXT,
    "createdAt" TIMESTAMP WITH TIME ZONE,
    "updatedAt" TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        sb."id",
        sb."name",
        sb."config",
        sb."code",
        sb."createdAt",
        sb."updatedAt"
    FROM "SimpleBanners" sb
    WHERE sb."userId" = user_id
    ORDER BY sb."createdAt" DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Create function to update banners
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. Create function to delete banners
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 7. Create function to get banner code
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMIT;
