-- Extend consent_records partitions through 2027-02.
-- The original migration (20260326000001) created partitions only up to
-- 2026-08. Inserts for recorded_at >= 2026-09-01 would fail with
-- "no partition of relation ... found for row" until these exist.
--
-- create_consent_records_partition(target_month date) is idempotent — it
-- checks pg_class before creating — so re-running this migration is safe.
-- Going forward, the /api/cron/consent-partitions cron keeps the window ahead.

SELECT create_consent_records_partition('2026-09-01'::date);
SELECT create_consent_records_partition('2026-10-01'::date);
SELECT create_consent_records_partition('2026-11-01'::date);
SELECT create_consent_records_partition('2026-12-01'::date);
SELECT create_consent_records_partition('2027-01-01'::date);
SELECT create_consent_records_partition('2027-02-01'::date);
