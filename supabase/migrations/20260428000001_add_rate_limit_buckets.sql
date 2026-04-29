-- Postgres-backed rate limiter (replaces Upstash Redis)
-- Atomic upsert + decision in a single round-trip via check_rate_limit RPC.

CREATE TABLE IF NOT EXISTS public.rate_limit_buckets (
  key text PRIMARY KEY,
  window_start timestamptz NOT NULL DEFAULT now(),
  count integer NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS rate_limit_buckets_window_start_idx
  ON public.rate_limit_buckets (window_start);

ALTER TABLE public.rate_limit_buckets ENABLE ROW LEVEL SECURITY;

-- No public policies: only service_role (which bypasses RLS) may read/write.

CREATE OR REPLACE FUNCTION public.check_rate_limit(
  p_key text,
  p_window_seconds integer,
  p_max_requests integer
)
RETURNS TABLE (allowed boolean, remaining integer, reset_at timestamptz)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_now timestamptz := now();
  v_window_start timestamptz;
  v_count integer;
BEGIN
  INSERT INTO public.rate_limit_buckets (key, window_start, count)
  VALUES (p_key, v_now, 1)
  ON CONFLICT (key) DO UPDATE
  SET
    window_start = CASE
      WHEN public.rate_limit_buckets.window_start < v_now - make_interval(secs => p_window_seconds)
      THEN v_now
      ELSE public.rate_limit_buckets.window_start
    END,
    count = CASE
      WHEN public.rate_limit_buckets.window_start < v_now - make_interval(secs => p_window_seconds)
      THEN 1
      ELSE public.rate_limit_buckets.count + 1
    END
  RETURNING public.rate_limit_buckets.window_start, public.rate_limit_buckets.count
  INTO v_window_start, v_count;

  RETURN QUERY SELECT
    (v_count <= p_max_requests) AS allowed,
    GREATEST(p_max_requests - v_count, 0) AS remaining,
    (v_window_start + make_interval(secs => p_window_seconds)) AS reset_at;
END;
$$;

REVOKE ALL ON FUNCTION public.check_rate_limit(text, integer, integer) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.check_rate_limit(text, integer, integer) TO service_role;

-- Cleanup helper (call from a daily cron, optional)
CREATE OR REPLACE FUNCTION public.cleanup_rate_limit_buckets()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_deleted integer;
BEGIN
  DELETE FROM public.rate_limit_buckets
  WHERE window_start < now() - interval '24 hours'
  RETURNING 1 INTO v_deleted;
  GET DIAGNOSTICS v_deleted = ROW_COUNT;
  RETURN v_deleted;
END;
$$;

REVOKE ALL ON FUNCTION public.cleanup_rate_limit_buckets() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.cleanup_rate_limit_buckets() TO service_role;
