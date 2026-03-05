-- Ensure isActive column exists and toggle function works
-- This fixes the 42703 (undefined_column) error

-- 1. Add isActive column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'SimpleBanners' 
        AND column_name = 'isActive'
    ) THEN
        ALTER TABLE "SimpleBanners" ADD COLUMN "isActive" BOOLEAN DEFAULT true;
        -- Update existing rows to be active by default
        UPDATE "SimpleBanners" SET "isActive" = true WHERE "isActive" IS NULL;
    END IF;
END $$;

-- 2. Ensure toggle_banner_active function exists and works
CREATE OR REPLACE FUNCTION toggle_banner_active(
    banner_id TEXT,
    user_id TEXT,
    is_active BOOLEAN
)
RETURNS BOOLEAN AS $$
DECLARE
    rows_updated INTEGER;
BEGIN
    -- Update the banner
    UPDATE "SimpleBanners" 
    SET 
        "isActive" = is_active,
        "updatedAt" = NOW()
    WHERE "id" = banner_id AND "userId" = user_id;
    
    -- Get the number of rows updated
    GET DIAGNOSTICS rows_updated = ROW_COUNT;
    
    -- Return true if a row was updated, false otherwise
    RETURN rows_updated > 0;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Ensure get_banners_simple includes isActive
-- Drop and recreate to change return type
DROP FUNCTION IF EXISTS get_banners_simple(TEXT);

CREATE FUNCTION get_banners_simple(user_id TEXT)
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
        COALESCE(sb."isActive", true) as "isActive",  -- Default to true if null
        sb."createdAt",
        sb."updatedAt"
    FROM "SimpleBanners" sb
    WHERE sb."userId" = user_id
    ORDER BY sb."createdAt" DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant permissions
GRANT EXECUTE ON FUNCTION toggle_banner_active(TEXT, TEXT, BOOLEAN) TO authenticated;
GRANT EXECUTE ON FUNCTION toggle_banner_active(TEXT, TEXT, BOOLEAN) TO anon;
GRANT EXECUTE ON FUNCTION toggle_banner_active(TEXT, TEXT, BOOLEAN) TO service_role;

GRANT EXECUTE ON FUNCTION get_banners_simple(TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION get_banners_simple(TEXT) TO anon;
GRANT EXECUTE ON FUNCTION get_banners_simple(TEXT) TO service_role;

