-- Migration: Fix banner_visitors updated_at trigger
-- Date: 2026-07-03
--
-- Bug: every POST /api/v1/track dropped visitor analytics with
--   `record "new" has no field "updatedAt"`.
--
-- Root cause: banner_visitors carries a BEFORE UPDATE trigger
-- (update_banner_visitors_updated_at) wired to the shared
-- public.update_updated_at_column(). In production that shared function was
-- redefined to camelCase — `NEW."updatedAt" = now()` — to serve Prisma tables
-- like "ConsentBanner" (which really has an "updatedAt" column). banner_visitors
-- is a snake_case table (updated_at), so every ON CONFLICT DO UPDATE in
-- increment_banner_visitor fired the trigger and threw. banner_stats has no
-- such trigger, which is why only the visitor RPC failed.
--
-- Fix: point the banner_visitors trigger at a dedicated snake_case function that
-- writes NEW.updated_at. We deliberately do NOT redefine the shared
-- update_updated_at_column() — "ConsentBanner" legitimately depends on its
-- camelCase behavior. The increment_banner_visitor RPC already sets
-- updated_at = now() itself, but keeping a correct trigger preserves the
-- schema's intent and covers any direct/manual UPDATEs.
--
-- Idempotent: CREATE OR REPLACE FUNCTION + DROP TRIGGER IF EXISTS.

-- Dedicated snake_case updated_at maintainer (safe for snake_case tables).
CREATE OR REPLACE FUNCTION public.update_updated_at_snake_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql
SET search_path = 'public';

-- Repoint the banner_visitors trigger away from the camelCase shared function.
DROP TRIGGER IF EXISTS update_banner_visitors_updated_at ON public.banner_visitors;
CREATE TRIGGER update_banner_visitors_updated_at
    BEFORE UPDATE ON public.banner_visitors
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_snake_column();
