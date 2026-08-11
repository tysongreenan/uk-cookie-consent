-- Enable RLS on all consent_records partitions.
--
-- The parent table has RLS enabled (20260326000001), but each monthly
-- partition is its own table in public and PostgREST exposes partitions
-- directly — querying consent_records_2026_03 with the anon key bypasses
-- the parent's RLS entirely. All app access goes through the service role
-- (which bypasses RLS), so enabling RLS with no anon/authenticated
-- policies locks the partitions down without breaking anything.

DO $$
DECLARE
  part regclass;
BEGIN
  FOR part IN
    SELECT inhrelid::regclass
    FROM pg_inherits
    WHERE inhparent = 'public.consent_records'::regclass
  LOOP
    EXECUTE format('ALTER TABLE %s ENABLE ROW LEVEL SECURITY', part);
  END LOOP;
END;
$$;

-- Ensure future partitions are created with RLS enabled.
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
    EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY', partition_name);
  END IF;
END;
$$;
