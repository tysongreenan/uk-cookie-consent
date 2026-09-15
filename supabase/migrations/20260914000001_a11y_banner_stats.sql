-- Accessibility Menu usage counters on banner_stats.
-- Widget events (a11y_open / a11y_toggle / a11y_reset / a11y_profile) go through
-- POST /api/v1/track and this dedicated RPC so we do not have to rewrite the
-- existing increment_banner_stat unique-key (hand-applied in production with
-- banner_id + gpc_impressions).
--
-- Idempotent: ADD COLUMN IF NOT EXISTS + CREATE OR REPLACE FUNCTION.

ALTER TABLE banner_stats ADD COLUMN IF NOT EXISTS banner_id TEXT;
ALTER TABLE banner_stats ADD COLUMN IF NOT EXISTS gpc_impressions integer DEFAULT 0;
ALTER TABLE banner_stats ADD COLUMN IF NOT EXISTS a11y_opens integer DEFAULT 0;
ALTER TABLE banner_stats ADD COLUMN IF NOT EXISTS a11y_toggles integer DEFAULT 0;
ALTER TABLE banner_stats ADD COLUMN IF NOT EXISTS a11y_resets integer DEFAULT 0;
ALTER TABLE banner_stats ADD COLUMN IF NOT EXISTS a11y_profiles integer DEFAULT 0;

CREATE OR REPLACE FUNCTION increment_a11y_stat(
  p_user_id TEXT,
  p_date date,
  p_event_type text,
  p_banner_id TEXT DEFAULT NULL
)
RETURNS void AS $$
DECLARE
  v_opens integer := CASE WHEN p_event_type = 'a11y_open' THEN 1 ELSE 0 END;
  v_toggles integer := CASE WHEN p_event_type = 'a11y_toggle' THEN 1 ELSE 0 END;
  v_resets integer := CASE WHEN p_event_type = 'a11y_reset' THEN 1 ELSE 0 END;
  v_profiles integer := CASE WHEN p_event_type = 'a11y_profile' THEN 1 ELSE 0 END;
BEGIN
  IF v_opens + v_toggles + v_resets + v_profiles = 0 THEN
    RETURN;
  END IF;

  UPDATE banner_stats
  SET
    a11y_opens = COALESCE(a11y_opens, 0) + v_opens,
    a11y_toggles = COALESCE(a11y_toggles, 0) + v_toggles,
    a11y_resets = COALESCE(a11y_resets, 0) + v_resets,
    a11y_profiles = COALESCE(a11y_profiles, 0) + v_profiles,
    updated_at = now()
  WHERE user_id = p_user_id
    AND date = p_date
    AND (p_banner_id IS NULL OR banner_id IS NOT DISTINCT FROM p_banner_id);

  IF FOUND THEN
    RETURN;
  END IF;

  BEGIN
    INSERT INTO banner_stats (
      id, user_id, date, banner_id,
      accepts, rejects, dismisses, impressions,
      a11y_opens, a11y_toggles, a11y_resets, a11y_profiles
    ) VALUES (
      gen_random_uuid()::text, p_user_id, p_date, p_banner_id,
      0, 0, 0, 0,
      v_opens, v_toggles, v_resets, v_profiles
    );
  EXCEPTION WHEN unique_violation THEN
    UPDATE banner_stats
    SET
      a11y_opens = COALESCE(a11y_opens, 0) + v_opens,
      a11y_toggles = COALESCE(a11y_toggles, 0) + v_toggles,
      a11y_resets = COALESCE(a11y_resets, 0) + v_resets,
      a11y_profiles = COALESCE(a11y_profiles, 0) + v_profiles,
      updated_at = now()
    WHERE user_id = p_user_id
      AND date = p_date
      AND (p_banner_id IS NULL OR banner_id IS NOT DISTINCT FROM p_banner_id);
  END;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public;
