-- Consent Records — individual consent log for GDPR/Law 25 proof-of-consent and DSAR lookups
-- Monthly partitioned for efficient retention management and query performance
-- Privacy: hashed cookie ID only, no PII. Site owner = data controller, we = processor.

-- Create parent table with range partitioning on timestamp
CREATE TABLE consent_records (
  id text NOT NULL DEFAULT gen_random_uuid()::text,
  banner_id text NOT NULL,
  user_id text NOT NULL,          -- site owner (banner owner)
  team_id text,                    -- team scope for multi-user orgs
  consent_id text NOT NULL,        -- UUID shown to the visitor as proof
  hashed_cookie_id text NOT NULL,  -- SHA-256 of visitor cookie ID (no PII)
  recorded_at timestamptz NOT NULL DEFAULT now(),
  decision text NOT NULL CHECK (decision IN ('accept', 'reject', 'custom')),
  categories jsonb NOT NULL DEFAULT '{}',  -- { analytics: true, marketing: false, ... }
  country text NOT NULL DEFAULT 'unknown',
  page_path text NOT NULL DEFAULT '/',
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (id, recorded_at)     -- partition key must be in PK
) PARTITION BY RANGE (recorded_at);

-- Create partitions: current month + 3 months ahead
-- (a cron job or migration will create future partitions)
CREATE TABLE consent_records_2026_03 PARTITION OF consent_records
  FOR VALUES FROM ('2026-03-01') TO ('2026-04-01');
CREATE TABLE consent_records_2026_04 PARTITION OF consent_records
  FOR VALUES FROM ('2026-04-01') TO ('2026-05-01');
CREATE TABLE consent_records_2026_05 PARTITION OF consent_records
  FOR VALUES FROM ('2026-05-01') TO ('2026-06-01');
CREATE TABLE consent_records_2026_06 PARTITION OF consent_records
  FOR VALUES FROM ('2026-06-01') TO ('2026-07-01');
CREATE TABLE consent_records_2026_07 PARTITION OF consent_records
  FOR VALUES FROM ('2026-07-01') TO ('2026-08-01');
CREATE TABLE consent_records_2026_08 PARTITION OF consent_records
  FOR VALUES FROM ('2026-08-01') TO ('2026-09-01');

-- Indexes for common query patterns
-- 1. Dashboard: browse by banner + date range
CREATE INDEX idx_consent_records_banner_ts ON consent_records (banner_id, recorded_at DESC);

-- 2. Dashboard: search by consent_id (visitor proof lookup)
CREATE INDEX idx_consent_records_consent_id ON consent_records (consent_id);

-- 3. DSAR: search by hashed_cookie_id within org scope
CREATE INDEX idx_consent_records_hashed_cookie ON consent_records (hashed_cookie_id, recorded_at DESC);

-- 4. Org scoping: user_id + team_id for access control
CREATE INDEX idx_consent_records_user ON consent_records (user_id, recorded_at DESC);
CREATE INDEX idx_consent_records_team ON consent_records (team_id, recorded_at DESC) WHERE team_id IS NOT NULL;

-- Row Level Security — service_role only (application handles scoping)
ALTER TABLE consent_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access"
  ON consent_records FOR ALL TO service_role
  USING (true) WITH CHECK (true);

-- Function to auto-create monthly partitions (run via pg_cron or manually)
CREATE OR REPLACE FUNCTION create_consent_records_partition(target_month date)
RETURNS void
LANGUAGE plpgsql
SET search_path = 'public'
AS $$
DECLARE
  partition_name text;
  start_date date;
  end_date date;
BEGIN
  start_date := date_trunc('month', target_month)::date;
  end_date := (start_date + interval '1 month')::date;
  partition_name := 'consent_records_' || to_char(start_date, 'YYYY_MM');

  -- Check if partition already exists
  IF NOT EXISTS (
    SELECT 1 FROM pg_class WHERE relname = partition_name
  ) THEN
    EXECUTE format(
      'CREATE TABLE %I PARTITION OF consent_records FOR VALUES FROM (%L) TO (%L)',
      partition_name, start_date, end_date
    );
  END IF;
END;
$$;

-- Function to query consent logs for dashboard (paginated, filterable)
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
    -- Org scoping: team_id if available, else user_id
    ((p_team_id IS NOT NULL AND cr.team_id = p_team_id)
      OR (p_team_id IS NULL AND cr.user_id = p_user_id))
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

-- Function to count consent logs (for pagination)
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
    ((p_team_id IS NOT NULL AND cr.team_id = p_team_id)
      OR (p_team_id IS NULL AND cr.user_id = p_user_id))
    AND (p_banner_id IS NULL OR cr.banner_id = p_banner_id)
    AND (p_consent_id IS NULL OR cr.consent_id = p_consent_id)
    AND (p_date_from IS NULL OR cr.recorded_at >= p_date_from)
    AND (p_date_to IS NULL OR cr.recorded_at <= p_date_to)
    AND (p_decision IS NULL OR cr.decision = p_decision);

  RETURN total;
END;
$$;

-- Function for DSAR: search consent records by hashed cookie ID within org scope
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
    ((p_team_id IS NOT NULL AND cr.team_id = p_team_id)
    OR (p_team_id IS NULL AND cr.user_id = p_user_id))
    AND (
      (p_hashed_cookie_id IS NOT NULL AND cr.hashed_cookie_id = p_hashed_cookie_id)
      OR (p_consent_id IS NOT NULL AND cr.consent_id = p_consent_id)
    )
  ORDER BY cr.recorded_at DESC
  LIMIT p_limit;
END;
$$;
