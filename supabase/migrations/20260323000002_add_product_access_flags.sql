-- Product access flags — one account, multiple products
-- Each boolean indicates the user has access to that product using the same credentials

ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "hasConsentBanner" boolean NOT NULL DEFAULT false;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "hasPrivacyConsumer" boolean NOT NULL DEFAULT false;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "hasCommentTool" boolean NOT NULL DEFAULT false;

-- Backfill: all existing users came through the consent banner product
UPDATE "User" SET "hasConsentBanner" = true WHERE "hasConsentBanner" = false;

-- Backfill: users with consumer API keys have the privacy consumer product
UPDATE "User" SET "hasPrivacyConsumer" = true
WHERE id IN (SELECT DISTINCT user_id FROM consumer_api_keys WHERE revoked_at IS NULL);

-- Index for querying users by product
CREATE INDEX IF NOT EXISTS idx_user_products ON "User" ("hasConsentBanner", "hasPrivacyConsumer", "hasCommentTool");
