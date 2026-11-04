-- Activity audit log (lib/audit-log.ts, dispute evidence, DSAR deadline cron).
-- The code has written here since launch, but the table was never created, so every write failed silently.
create table if not exists public.audit_log (
  id bigint generated always as identity primary key,
  user_id text,
  action text not null,
  ip_address text,
  user_agent text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists audit_log_user_created_idx on public.audit_log (user_id, created_at);
create index if not exists audit_log_action_created_idx on public.audit_log (action, created_at);

-- Server-only: the app writes with the service role. No browser access.
alter table public.audit_log enable row level security;
revoke all on public.audit_log from public, anon, authenticated;
grant all on public.audit_log to service_role;

-- Called by /api/cron/cleanup-audit-log (weekly). Keeps 13 months.
create or replace function public.cleanup_old_audit_logs()
returns integer
language sql
security definer
set search_path = 'public'
as $$
  with deleted as (
    delete from public.audit_log where created_at < now() - interval '13 months' returning 1
  )
  select count(*)::int from deleted
$$;

revoke execute on function public.cleanup_old_audit_logs() from public, anon, authenticated;
grant execute on function public.cleanup_old_audit_logs() to service_role;
