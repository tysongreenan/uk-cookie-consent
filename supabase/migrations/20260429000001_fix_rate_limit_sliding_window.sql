-- Fix rate limiter: convert fixed-window counter to sliding-window counter,
-- and remove dead RETURNING clause from cleanup function.
--
-- Previously, check_rate_limit was a fixed-window counter: at the window
-- boundary an attacker could fire maxRequests just before reset and another
-- maxRequests immediately after, doubling the effective burst limit.
--
-- This replaces it with a sliding-window-counter algorithm that keeps the
-- previous bucket's count and weights it by the fraction of the previous
-- window still overlapping the current sliding window.
--
-- weighted = previous_count * (1 - elapsed_in_current/window) + current_count

ALTER TABLE public.rate_limit_buckets
  ADD COLUMN IF NOT EXISTS previous_count integer NOT NULL DEFAULT 0;

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
  v_window interval := make_interval(secs => p_window_seconds);
  v_window_start timestamptz;
  v_count integer;
  v_previous_count integer;
  v_elapsed_fraction numeric;
  v_weighted numeric;
BEGIN
  INSERT INTO public.rate_limit_buckets (key, window_start, count, previous_count)
  VALUES (p_key, v_now, 1, 0)
  ON CONFLICT (key) DO UPDATE
  SET
    -- Roll the window forward by exactly one window if the current bucket
    -- has expired but the previous one is still partially relevant; reset
    -- both buckets if more than two windows have elapsed.
    window_start = CASE
      WHEN public.rate_limit_buckets.window_start + (v_window * 2) <= v_now THEN v_now
      WHEN public.rate_limit_buckets.window_start + v_window <= v_now
        THEN public.rate_limit_buckets.window_start + v_window
      ELSE public.rate_limit_buckets.window_start
    END,
    previous_count = CASE
      WHEN public.rate_limit_buckets.window_start + (v_window * 2) <= v_now THEN 0
      WHEN public.rate_limit_buckets.window_start + v_window <= v_now
        THEN public.rate_limit_buckets.count
      ELSE public.rate_limit_buckets.previous_count
    END,
    count = CASE
      WHEN public.rate_limit_buckets.window_start + v_window <= v_now THEN 1
      ELSE public.rate_limit_buckets.count + 1
    END
  RETURNING
    public.rate_limit_buckets.window_start,
    public.rate_limit_buckets.count,
    public.rate_limit_buckets.previous_count
  INTO v_window_start, v_count, v_previous_count;

  v_elapsed_fraction := EXTRACT(EPOCH FROM (v_now - v_window_start)) / p_window_seconds;
  IF v_elapsed_fraction < 0 THEN v_elapsed_fraction := 0; END IF;
  IF v_elapsed_fraction > 1 THEN v_elapsed_fraction := 1; END IF;

  v_weighted := v_previous_count * (1 - v_elapsed_fraction) + v_count;

  RETURN QUERY SELECT
    (v_weighted <= p_max_requests) AS allowed,
    GREATEST(p_max_requests - CEIL(v_weighted)::integer, 0) AS remaining,
    (v_window_start + v_window) AS reset_at;
END;
$$;

REVOKE ALL ON FUNCTION public.check_rate_limit(text, integer, integer) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.check_rate_limit(text, integer, integer) TO service_role;

-- Remove dead RETURNING clause: GET DIAGNOSTICS ROW_COUNT was already
-- overwriting v_deleted, so the RETURNING was a no-op (and a foot-gun if
-- anyone ever added STRICT to the INTO).
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
  WHERE window_start < now() - interval '24 hours';
  GET DIAGNOSTICS v_deleted = ROW_COUNT;
  RETURN v_deleted;
END;
$$;

REVOKE ALL ON FUNCTION public.cleanup_rate_limit_buckets() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.cleanup_rate_limit_buckets() TO service_role;
