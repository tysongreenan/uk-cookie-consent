-- Add isActive column to SimpleBanners table and update functions

-- 1. Add isActive column if it doesn't exist
ALTER TABLE "SimpleBanners" ADD COLUMN IF NOT EXISTS "isActive" BOOLEAN DEFAULT true;

-- 2. Update create_banner_simple function to include isActive
CREATE OR REPLACE FUNCTION create_banner_simple(
    banner_id TEXT,
    banner_name TEXT,
    banner_config JSONB,
    banner_code TEXT,
    user_id TEXT,
    is_active BOOLEAN DEFAULT true
)
RETURNS TEXT AS $$
BEGIN
    INSERT INTO "SimpleBanners" (
        "id",
        "name", 
        "config",
        "code",
        "userId",
        "isActive",
        "createdAt",
        "updatedAt"
    ) VALUES (
        banner_id,
        banner_name,
        banner_config,
        banner_code,
        user_id,
        is_active,
        NOW(),
        NOW()
    );
    
    RETURN banner_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Update get_banners_simple function to include isActive
CREATE OR REPLACE FUNCTION get_banners_simple(user_id TEXT)
RETURNS TABLE (
    id TEXT,
    name TEXT,
    config JSONB,
    code TEXT,
    "isActive" BOOLEAN,
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
        sb."isActive",
        sb."createdAt",
        sb."updatedAt"
    FROM "SimpleBanners" sb
    WHERE sb."userId" = user_id
    ORDER BY sb."createdAt" DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. Update update_banner_simple function to include isActive
CREATE OR REPLACE FUNCTION update_banner_simple(
    banner_id TEXT,
    banner_name TEXT,
    banner_config JSONB,
    banner_code TEXT,
    user_id TEXT,
    is_active BOOLEAN DEFAULT NULL
)
RETURNS TEXT AS $$
BEGIN
    -- If is_active is provided, update it; otherwise keep existing value
    IF is_active IS NOT NULL THEN
        UPDATE "SimpleBanners" 
        SET 
            "name" = COALESCE(banner_name, "name"),
            "config" = COALESCE(banner_config, "config"),
            "code" = COALESCE(banner_code, "code"),
            "isActive" = is_active,
            "updatedAt" = NOW()
        WHERE "id" = banner_id AND "userId" = user_id;
    ELSE
        UPDATE "SimpleBanners" 
        SET 
            "name" = banner_name,
            "config" = banner_config,
            "code" = banner_code,
            "updatedAt" = NOW()
        WHERE "id" = banner_id AND "userId" = user_id;
    END IF;
    
    RETURN banner_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Create a dedicated toggle function for isActive
CREATE OR REPLACE FUNCTION toggle_banner_active(
    banner_id TEXT,
    user_id TEXT,
    is_active BOOLEAN
)
RETURNS BOOLEAN AS $$
BEGIN
    UPDATE "SimpleBanners" 
    SET 
        "isActive" = is_active,
        "updatedAt" = NOW()
    WHERE "id" = banner_id AND "userId" = user_id;
    
    RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

