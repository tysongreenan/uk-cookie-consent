-- Migration: Add Visitor Dimensions + Platform Benchmarks
-- Date: 2026-03-19
-- Adds banner_visitors table for per-dimension tracking (source, device, country, page)
-- Adds RPCs for dimension breakdown and platform benchmarks

-- 1. Create banner_visitors table
CREATE TABLE IF NOT EXISTS banner_visitors (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id TEXT NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
  banner_id TEXT,
  date DATE NOT NULL,
  source TEXT NOT NULL DEFAULT 'direct',
  device TEXT NOT NULL DEFAULT 'desktop',
  country TEXT NOT NULL DEFAULT 'unknown',
  page_path TEXT NOT NULL DEFAULT '/',
  impressions INTEGER DEFAULT 0,
  accepts INTEGER DEFAULT 0,
  rejects INTEGER DEFAULT 0,
  dismisses INTEGER DEFAULT 0,
  total_decision_time_ms BIGINT DEFAULT 0,
  decision_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_banner_visitors_unique
  ON banner_visitors(user_id, COALESCE(banner_id, ''), date, source, device, country, page_path);
CREATE INDEX IF NOT EXISTS idx_banner_visitors_user_date ON banner_visitors(user_id, date DESC);

-- 2. RLS
ALTER TABLE banner_visitors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access to banner_visitors"
  ON banner_visitors FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- 3. Upsert RPC for visitor dimensions
CREATE OR REPLACE FUNCTION increment_banner_visitor(
  p_user_id TEXT,
  p_banner_id TEXT,
  p_date DATE,
  p_event_type TEXT,
  p_source TEXT DEFAULT 'direct',
  p_device TEXT DEFAULT 'desktop',
  p_country TEXT DEFAULT 'unknown',
  p_page_path TEXT DEFAULT '/',
  p_decision_time_ms INTEGER DEFAULT NULL
)
RETURNS void AS $$
BEGIN
  INSERT INTO banner_visitors (
    user_id, banner_id, date, source, device, country, page_path,
    impressions, accepts, rejects, dismisses,
    total_decision_time_ms, decision_count
  )
  VALUES (
    p_user_id, p_banner_id, p_date, p_source, p_device, p_country, p_page_path,
    CASE WHEN p_event_type = 'impression' THEN 1 ELSE 0 END,
    CASE WHEN p_event_type = 'accept' THEN 1 ELSE 0 END,
    CASE WHEN p_event_type = 'reject' THEN 1 ELSE 0 END,
    CASE WHEN p_event_type = 'dismiss' THEN 1 ELSE 0 END,
    COALESCE(p_decision_time_ms, 0),
    CASE WHEN p_decision_time_ms IS NOT NULL THEN 1 ELSE 0 END
  )
  ON CONFLICT (user_id, COALESCE(banner_id, ''), date, source, device, country, page_path)
  DO UPDATE SET
    impressions = banner_visitors.impressions + CASE WHEN p_event_type = 'impression' THEN 1 ELSE 0 END,
    accepts = banner_visitors.accepts + CASE WHEN p_event_type = 'accept' THEN 1 ELSE 0 END,
    rejects = banner_visitors.rejects + CASE WHEN p_event_type = 'reject' THEN 1 ELSE 0 END,
    dismisses = banner_visitors.dismisses + CASE WHEN p_event_type = 'dismiss' THEN 1 ELSE 0 END,
    total_decision_time_ms = banner_visitors.total_decision_time_ms + COALESCE(p_decision_time_ms, 0),
    decision_count = banner_visitors.decision_count + CASE WHEN p_decision_time_ms IS NOT NULL THEN 1 ELSE 0 END,
    updated_at = now();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public;

-- 4. Dimension breakdown RPC
CREATE OR REPLACE FUNCTION get_visitor_breakdown(
  p_user_id TEXT,
  p_dimension TEXT,
  p_banner_id TEXT DEFAULT NULL,
  p_days INTEGER DEFAULT 30
)
RETURNS TABLE(
  value TEXT,
  impressions BIGINT,
  accepts BIGINT,
  rejects BIGINT,
  dismisses BIGINT
) AS $$
BEGIN
  IF p_dimension NOT IN ('source', 'device', 'country', 'page_path') THEN
    RAISE EXCEPTION 'Invalid dimension: %', p_dimension;
  END IF;

  RETURN QUERY EXECUTE format(
    'SELECT %I::text AS value,
            SUM(impressions)::bigint AS impressions,
            SUM(accepts)::bigint AS accepts,
            SUM(rejects)::bigint AS rejects,
            SUM(dismisses)::bigint AS dismisses
     FROM banner_visitors
     WHERE user_id = $1
       AND date >= CURRENT_DATE - ($2 || '' days'')::interval
       AND ($3 IS NULL OR banner_id = $3)
     GROUP BY %I
     ORDER BY SUM(impressions) DESC
     LIMIT 20',
    p_dimension, p_dimension
  )
  USING p_user_id, p_days, p_banner_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public;

-- 5. Platform benchmarks RPC (anonymized, min 5 users for privacy)
CREATE OR REPLACE FUNCTION get_platform_benchmarks(
  p_days INTEGER DEFAULT 30,
  p_today DATE DEFAULT CURRENT_DATE
)
RETURNS TABLE(
  total_users BIGINT,
  avg_accept_rate NUMERIC,
  avg_reject_rate NUMERIC,
  avg_dismiss_rate NUMERIC,
  avg_decision_time_ms NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  WITH user_stats AS (
    SELECT
      bs.user_id,
      SUM(bs.impressions) AS impressions,
      SUM(bs.accepts) AS accepts,
      SUM(bs.rejects) AS rejects,
      SUM(bs.dismisses) AS dismisses,
      SUM(bs.total_decision_time_ms) AS total_dt,
      SUM(bs.decision_count) AS dt_count
    FROM banner_stats bs
    WHERE bs.date >= p_today - (p_days || ' days')::interval
      AND bs.impressions > 0
    GROUP BY bs.user_id
    HAVING SUM(bs.impressions) >= 10
  )
  SELECT
    COUNT(DISTINCT us.user_id)::bigint AS total_users,
    CASE WHEN COUNT(*) >= 5 THEN
      ROUND(AVG(us.accepts::numeric / NULLIF(us.impressions, 0) * 100), 1)
    ELSE NULL END AS avg_accept_rate,
    CASE WHEN COUNT(*) >= 5 THEN
      ROUND(AVG(us.rejects::numeric / NULLIF(us.impressions, 0) * 100), 1)
    ELSE NULL END AS avg_reject_rate,
    CASE WHEN COUNT(*) >= 5 THEN
      ROUND(AVG(us.dismisses::numeric / NULLIF(us.impressions, 0) * 100), 1)
    ELSE NULL END AS avg_dismiss_rate,
    CASE WHEN COUNT(*) >= 5 THEN
      ROUND(AVG(us.total_dt::numeric / NULLIF(us.dt_count, 0)), 0)
    ELSE NULL END AS avg_decision_time_ms
  FROM user_stats us;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public;

-- 6. Updated_at trigger
DROP TRIGGER IF EXISTS update_banner_visitors_updated_at ON banner_visitors;
CREATE TRIGGER update_banner_visitors_updated_at
    BEFORE UPDATE ON banner_visitors
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
