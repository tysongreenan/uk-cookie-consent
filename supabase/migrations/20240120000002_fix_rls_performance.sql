-- Ensure toggle_banner_active function exists and works correctly
-- This fixes PGRST204 errors when toggling banner status

-- Create or replace the toggle function with proper error handling
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

-- Grant execute permission to authenticated users (though SECURITY DEFINER bypasses this)
GRANT EXECUTE ON FUNCTION toggle_banner_active(TEXT, TEXT, BOOLEAN) TO authenticated;
GRANT EXECUTE ON FUNCTION toggle_banner_active(TEXT, TEXT, BOOLEAN) TO anon;
GRANT EXECUTE ON FUNCTION toggle_banner_active(TEXT, TEXT, BOOLEAN) TO service_role;

-- Add comment
COMMENT ON FUNCTION toggle_banner_active IS 'Toggle banner active status. Returns true if banner was found and updated, false otherwise.';

