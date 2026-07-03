-- Fix consent_records read scoping: XOR → inclusive OR.
--
-- The original functions (20260326000001) scoped records with a strict XOR:
--   ((p_team_id IS NOT NULL AND team_id = p_team_id)
--     OR (p_team_id IS NULL AND user_id = p_user_id))
-- Records are stamped with the writer's mutable currentTeamId, so whenever a
-- user's workspace changes (or legacy records have team_id NULL), previously
-- written records become invisible to the dashboard, count, and DSAR search.
--
-- New clause is an inclusive OR:
--   (user_id = p_user_id OR (p_team_id IS NOT NULL AND team_id = p_team_id))
-- This never leaks across users: p_user_id is always the session user, and
-- team-scoped records are only included when the caller supplies a team.
--
-- Everything else (signatures, return shapes, search_path) is unchanged.

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
BEGIN
  RETURN QUERY
  SELECT
    cr.id,
    cr.banner_id,
    cr.consent_id,
    cr.hashed_cookie_id,
    cr.recorded_at,
    cr.decision,
    cr.categories,
    cr.country,
    cr.page_path
  FROM consent_records cr
  WHERE
    -- Org scoping: own records always, plus team records when a team is given
    (cr.user_id = p_user_id
      OR (p_team_id IS NOT NULL AND cr.team_id = p_team_id))
    AND (p_banner_id IS NULL OR cr.banner_id = p_banner_id)
    AND (p_consent_id IS NULL OR cr.consent_id = p_consent_id)
    AND (p_date_from IS NULL OR cr.recorded_at >= p_date_from)
    AND (p_date_to IS NULL OR cr.recorded_at <= p_date_to)
    AND (p_decision IS NULL OR cr.decision = p_decision)
  ORDER BY cr.recorded_at DESC
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
  total bigint;
BEGIN
  SELECT count(*) INTO total
  FROM consent_records cr
  WHERE
    (cr.user_id = p_user_id
      OR (p_team_id IS NOT NULL AND cr.team_id = p_team_id))
    AND (p_banner_id IS NULL OR cr.banner_id = p_banner_id)
    AND (p_consent_id IS NULL OR cr.consent_id = p_consent_id)
    AND (p_date_from IS NULL OR cr.recorded_at >= p_date_from)
    AND (p_date_to IS NULL OR cr.recorded_at <= p_date_to)
    AND (p_decision IS NULL OR cr.decision = p_decision);

  RETURN total;
END;
$$;

CREATE OR REPLACE FUNCTION search_consent_records_for_dsar(
  p_user_id text,
  p_team_id text DEFAULT NULL,
  p_hashed_cookie_id text DEFAULT NULL,
  p_consent_id text DEFAULT NULL,
  p_limit int DEFAULT 10000
)
RETURNS TABLE (
  consent_id text,
  hashed_cookie_id text,
  recorded_at timestamptz,
  decision text,
  categories jsonb,
  country text,
  page_path text,
  banner_id text
)
LANGUAGE plpgsql
SET search_path = 'public'
AS $$
BEGIN
  RETURN QUERY
  SELECT
    cr.consent_id,
    cr.hashed_cookie_id,
    cr.recorded_at,
    cr.decision,
    cr.categories,
    cr.country,
    cr.page_path,
    cr.banner_id
  FROM consent_records cr
  WHERE
    (cr.user_id = p_user_id
      OR (p_team_id IS NOT NULL AND cr.team_id = p_team_id))
    AND (
      (p_hashed_cookie_id IS NOT NULL AND cr.hashed_cookie_id = p_hashed_cookie_id)
      OR (p_consent_id IS NOT NULL AND cr.consent_id = p_consent_id)
    )
  ORDER BY cr.recorded_at DESC
  LIMIT p_limit;
END;
$$;
