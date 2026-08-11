-- Lock down the "User" table's public read policy.
--
-- "Allow read access to User" was SELECT to role public with USING (true).
-- anon has no table grant, but authenticated has SELECT — and comment-tool
-- (websitefeedback.ca, same database) runs open Supabase Auth signup, so any
-- self-registered account could read every user's email, password hash,
-- resetToken, and Stripe IDs via PostgREST. No client-side code reads this
-- table (both apps access it server-side with the service role, which
-- bypasses RLS), so scoping to own-row breaks nothing.

DROP POLICY IF EXISTS "Allow read access to User" ON "User";

CREATE POLICY "Users can read own record"
  ON "User" FOR SELECT TO authenticated
  USING (id = (SELECT auth.uid())::text);

-- TRUNCATE is not governed by RLS policies, so the default grant is a
-- standing footgun even though PostgREST never issues it.
REVOKE TRUNCATE ON ALL TABLES IN SCHEMA public FROM anon, authenticated;
