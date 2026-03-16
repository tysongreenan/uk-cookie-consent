-- Emergency fix: Ensure all banners with NULL isActive are set to true (active)
-- After the caching fix (2026-03-15), browsers no longer serve stale cached responses.
-- Any banner with isActive = NULL is treated as inactive by the API, breaking customer sites.

-- 1. Fix SimpleBanners: set NULL isActive to true
UPDATE "SimpleBanners" SET "isActive" = true WHERE "isActive" IS NULL;

-- 2. Fix ConsentBanner (legacy): set NULL isActive to true
UPDATE "ConsentBanner" SET "isActive" = true WHERE "isActive" IS NULL;

-- 3. Add NOT NULL constraint with DEFAULT true to prevent this from happening again
ALTER TABLE "SimpleBanners" ALTER COLUMN "isActive" SET DEFAULT true;
ALTER TABLE "SimpleBanners" ALTER COLUMN "isActive" SET NOT NULL;

-- 4. Same for ConsentBanner if the column exists
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'public'
        AND table_name = 'ConsentBanner'
        AND column_name = 'isActive'
    ) THEN
        ALTER TABLE "ConsentBanner" ALTER COLUMN "isActive" SET DEFAULT true;
        ALTER TABLE "ConsentBanner" ALTER COLUMN "isActive" SET NOT NULL;
    END IF;
END $$;
