-- Revoke anon EXECUTE on public functions.
--
-- Supabase grants EXECUTE on new public functions to anon, authenticated and
-- service_role directly, so earlier `REVOKE ... FROM PUBLIC` statements did not
-- remove anon access. Audit on 2026-10-29 found ~19 SECURITY DEFINER RPCs
-- (get_banners_simple, update_banner_simple, delete_banner_simple,
-- toggle_banner_active, get_visitor_breakdown, comment_tool_spend_ai_credits, ...)
-- callable with the browser-shipped publishable key and scoped only by a
-- caller-supplied user_id.
--
-- This app calls every RPC from server routes with the service role, which is
-- unaffected. The comment_tool_* functions belong to websitefeedback.ca (shared
-- DB) and may be called client-side as `authenticated`, so only anon is revoked
-- on those.

DO $$
DECLARE
  fn record;
BEGIN
  FOR fn IN
    SELECT p.oid::regprocedure AS sig, p.proname
    FROM pg_proc p
    JOIN pg_namespace n ON n.oid = p.pronamespace
    WHERE n.nspname = 'public'
  LOOP
    EXECUTE format('REVOKE EXECUTE ON FUNCTION %s FROM PUBLIC, anon', fn.sig);
    IF fn.proname NOT LIKE 'comment_tool_%' THEN
      EXECUTE format('REVOKE EXECUTE ON FUNCTION %s FROM authenticated', fn.sig);
    END IF;
    EXECUTE format('GRANT EXECUTE ON FUNCTION %s TO service_role', fn.sig);
  END LOOP;
END $$;

-- Stop future functions from being callable by anon or authenticated by
-- default. All public functions are owned by postgres. In this shared DB every
-- websitefeedback.ca user holds an `authenticated` JWT, so authenticated must be
-- opted into per function: websitefeedback.ca migrations need an explicit
-- `GRANT EXECUTE ... TO authenticated` for any client-called RPC.
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public
  REVOKE EXECUTE ON FUNCTIONS FROM PUBLIC, anon, authenticated;
