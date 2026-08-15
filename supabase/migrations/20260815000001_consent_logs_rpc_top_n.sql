-- Consent-logs dashboard RPCs timed out once consent_records passed ~500k rows.
--
-- The OR scope `(user_id = X OR team_id = Y)` forces a BitmapOr plan that
-- fetches EVERY matching record (18k+ heap pages for a busy account) and
-- top-N sorts them on each request — measured 2.6s warm on prod, past the 8s
-- statement timeout cold. The dashboard then 500s and renders as "no logs".
--
-- Fix: split the scope into two arms combined with UNION ALL so each arm
-- walks its own (user_id|team_id, recorded_at DESC) index in order and stops
-- at limit+offset rows (Merge Append, no sort of the full set). Measured
-- 12.8ms on the same prod data. Semantics are unchanged:
--   - user arm: own records (matches old behavior for p_team_id IS NULL)
--   - team arm: workspace records not already owned by the user; guarded with
--     IS DISTINCT FROM so a hypothetical NULL user_id row is still returned.
--
-- count_consent_logs gets the same split (sum of two disjoint counts) so each
-- count uses one index cleanly instead of BitmapOr + heap recheck.
-- search_consent_records_for_dsar is untouched: it narrows via the
-- hashed_cookie_id / consent_id indexes first, so its OR scope is cheap.

CREATE OR REPLACE FUNCTION get_consent_logs(
  p_user_id text,
  p_team_id text DEFAULT NULL,
  p_banner_id text DEFAULT NULL,
  p_consent_id text DEFAULT NULL,
  p_date_from timestamptz DEFAULT NULL,
  p_date_to timestamptz DEFAULT NULL,
  p_decision text DEFAULT NULL,
  p_limit int DEFAULT 50,
  p_offset int DEFAULT 0
)
RETURNS TABLE (
  id text,
  banner_id text,
  consent_id text,
  hashed_cookie_id text,
  recorded_at timestamptz,
  decision text,
  categories jsonb,
  country text,
  page_path text
)
LANGUAGE plpgsql
SET search_path = 'public'
AS $$
DECLARE
  -- Each arm only ever needs the first limit+offset rows in recorded_at order.
  arm_limit int := GREATEST(p_limit + p_offset, 0);
BEGIN
  RETURN QUERY
  SELECT u.id, u.banner_id, u.consent_id, u.hashed_cookie_id, u.recorded_at,
         u.decision, u.categories, u.country, u.page_path
  FROM (
    (
      SELECT cr.id, cr.banner_id, cr.consent_id, cr.hashed_cookie_id,
             cr.recorded_at, cr.decision, cr.categories, cr.country, cr.page_path
      FROM consent_records cr
      WHERE cr.user_id = p_user_id
        AND (p_banner_id IS NULL OR cr.banner_id = p_banner_id)
        AND (p_consent_id IS NULL OR cr.consent_id = p_consent_id)
        AND (p_date_from IS NULL OR cr.recorded_at >= p_date_from)
        AND (p_date_to IS NULL OR cr.recorded_at <= p_date_to)
        AND (p_decision IS NULL OR cr.decision = p_decision)
      ORDER BY cr.recorded_at DESC
      LIMIT arm_limit
    )
    UNION ALL
    (
      SELECT cr.id, cr.banner_id, cr.consent_id, cr.hashed_cookie_id,
             cr.recorded_at, cr.decision, cr.categories, cr.country, cr.page_path
      FROM consent_records cr
      WHERE p_team_id IS NOT NULL
        AND cr.team_id = p_team_id
        AND cr.user_id IS DISTINCT FROM p_user_id
        AND (p_banner_id IS NULL OR cr.banner_id = p_banner_id)
        AND (p_consent_id IS NULL OR cr.consent_id = p_consent_id)
        AND (p_date_from IS NULL OR cr.recorded_at >= p_date_from)
        AND (p_date_to IS NULL OR cr.recorded_at <= p_date_to)
        AND (p_decision IS NULL OR cr.decision = p_decision)
      ORDER BY cr.recorded_at DESC
      LIMIT arm_limit
    )
  ) u
  ORDER BY u.recorded_at DESC
  LIMIT p_limit
  OFFSET p_offset;
END;
$$;

CREATE OR REPLACE FUNCTION count_consent_logs(
  p_user_id text,
  p_team_id text DEFAULT NULL,
  p_banner_id text DEFAULT NULL,
  p_consent_id text DEFAULT NULL,
  p_date_from timestamptz DEFAULT NULL,
  p_date_to timestamptz DEFAULT NULL,
  p_decision text DEFAULT NULL
)
RETURNS bigint
LANGUAGE plpgsql
SET search_path = 'public'
AS $$
DECLARE
  own_count bigint;
  team_count bigint;
BEGIN
  SELECT count(*) INTO own_count
  FROM consent_records cr
  WHERE cr.user_id = p_user_id
    AND (p_banner_id IS NULL OR cr.banner_id = p_banner_id)
    AND (p_consent_id IS NULL OR cr.consent_id = p_consent_id)
    AND (p_date_from IS NULL OR cr.recorded_at >= p_date_from)
    AND (p_date_to IS NULL OR cr.recorded_at <= p_date_to)
    AND (p_decision IS NULL OR cr.decision = p_decision);

  IF p_team_id IS NULL THEN
    RETURN own_count;
  END IF;

  SELECT count(*) INTO team_count
  FROM consent_records cr
  WHERE cr.team_id = p_team_id
    AND cr.user_id IS DISTINCT FROM p_user_id
    AND (p_banner_id IS NULL OR cr.banner_id = p_banner_id)
    AND (p_consent_id IS NULL OR cr.consent_id = p_consent_id)
    AND (p_date_from IS NULL OR cr.recorded_at >= p_date_from)
    AND (p_date_to IS NULL OR cr.recorded_at <= p_date_to)
    AND (p_decision IS NULL OR cr.decision = p_decision);

  RETURN own_count + team_count;
END;
$$;
