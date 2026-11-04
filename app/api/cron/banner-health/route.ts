// Every 10 minutes: can we read a live banner from the database, and does the public banner.js
// serve it? Emails ADMIN_EMAILS if not. The 2026-10-28 outage (rotated service key) ran 5 days unnoticed.
// shortcut: runs inside the same deployment, so it can't report a deployment that is fully down;
// pair it with an external uptime monitor on banner.js for that.
//
// Incidents are tracked in audit_log: a failed check opens one ('health.banner_alert') and emails once,
// with a reminder every 6 hours while it stays open; the next passing check closes it
// ('health.banner_recovered') and sends an all-clear.
import { NextRequest, NextResponse } from 'next/server'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { sendEmail } from '@/lib/email'

export const dynamic = 'force-dynamic'

// The host customers' <script> tags point at.
const BANNER_HOST = 'https://www.cookie-banner.ca'
// Every step gets a deadline so a hung dependency still leaves time to alert (function limit is 60s).
const STEP_TIMEOUT_MS = 6000
const REMIND_EVERY_MS = 6 * 60 * 60 * 1000
const ALERT = 'health.banner_alert'
const RECOVERED = 'health.banner_recovered'

const withTimeout = <T,>(p: PromiseLike<T>, fallback: T): Promise<T> =>
  Promise.race([Promise.resolve(p), new Promise<T>((r) => setTimeout(() => r(fallback), STEP_TIMEOUT_MS))])

async function check(supabase: SupabaseClient | null): Promise<string | null> {
  if (!supabase) return 'Supabase env vars are missing.'

  const { data, error } = await supabase
    .from('SimpleBanners')
    .select('id')
    .eq('isActive', true)
    .order('updatedAt', { ascending: false })
    .limit(1)
    .abortSignal(AbortSignal.timeout(STEP_TIMEOUT_MS))
    .maybeSingle()
  if (error || !data) return `Database read failed: ${error?.message || 'no active banner found'}`

  // Unique query string so the CDN can't answer from cache. The signal also bounds the body read.
  const res = await fetch(`${BANNER_HOST}/api/v1/banner.js?id=${data.id}&health=${Date.now()}`, {
    cache: 'no-store',
    signal: AbortSignal.timeout(STEP_TIMEOUT_MS),
  })
  const body = await res.text()
  if (!res.ok) return `banner.js returned HTTP ${res.status} for banner ${data.id}.`
  if (!body.includes('cookie-consent-banner')) return `banner.js returned 200 but no banner code for ${data.id}: ${body.slice(0, 200)}`
  return null
}

/** Latest incident row, or undefined when the log can't be read. */
async function lastIncidentRow(supabase: SupabaseClient | null) {
  if (!supabase) return undefined
  try {
    const { data, error } = await supabase
      .from('audit_log')
      .select('id, action, created_at')
      .in('action', [ALERT, RECOVERED])
      .order('created_at', { ascending: false })
      .limit(1)
      .abortSignal(AbortSignal.timeout(STEP_TIMEOUT_MS))
    if (error) return undefined
    return (data?.[0] as { id: number; action: string; created_at: string } | undefined) ?? null
  } catch {
    return undefined
  }
}

/** Writes an incident row; returns its id, or null if the write failed. */
async function record(supabase: SupabaseClient | null, action: string, problem?: string): Promise<number | null> {
  if (!supabase) return null
  try {
    const { data, error } = await withTimeout(
      supabase.from('audit_log').insert({ user_id: null, action, metadata: problem ? { problem } : {} }).select('id').single(),
      { data: null, error: { message: 'timeout' } } as any,
    )
    return error || !data ? null : (data as { id: number }).id
  } catch {
    return null
  }
}

/** Emails every admin; true if at least one got it. */
async function notify(subject: string, text: string): Promise<boolean> {
  const to = (process.env.ADMIN_EMAILS || '').split(',').map((e) => e.trim()).filter(Boolean)
  const html = text.split('\n\n').map((p) => `<p>${p.replace(/</g, '&lt;')}</p>`).join('')
  const sent = await Promise.all(to.map((addr) => withTimeout(sendEmail({ to: addr, subject, text, html }).catch(() => false), false)))
  return sent.some(Boolean)
}

export async function GET(request: NextRequest) {
  if (request.headers.get('authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  const supabase = url && key ? createClient(url, key) : null
  const now = new Date()

  let problem: string | null
  try {
    problem = await check(supabase)
  } catch (e) {
    problem = `Health check failed: ${e instanceof Error ? e.message : String(e)}`
  }
  const last = await lastIncidentRow(supabase)

  if (!problem) {
    if (last?.action === ALERT && (await record(supabase, RECOVERED)) !== null) {
      await notify('cookie-banner.ca: banners are loading again', `The banner health check passes again as of ${now.toISOString()}.`)
    }
    return NextResponse.json({ ok: true })
  }

  console.error('[HEALTH] banner.js check failed:', problem)
  // Open incident alerted recently: stay quiet until the next reminder is due.
  if (last?.action === ALERT && now.getTime() - new Date(last.created_at).getTime() < REMIND_EVERY_MS) {
    return NextResponse.json({ ok: false, problem, alerted: false }, { status: 500 })
  }

  // Claim the alert first. If the log can't be read or written (often the DB is what's broken),
  // fall back to the clock: only the run in the first 10 minutes of each hour emails.
  // shortcut: a late or overlapping cron run can skip or repeat that hourly email.
  const claimId = last === undefined ? null : await record(supabase, ALERT, problem)
  if (claimId === null && now.getUTCMinutes() >= 10) {
    return NextResponse.json({ ok: false, problem, alerted: false }, { status: 500 })
  }

  const delivered = await notify(
    'cookie-banner.ca: banner health check failed',
    `${problem}\n\nCustomer banners may not be loading. Checked ${now.toISOString()}. You'll get a reminder every 6 hours while this keeps failing, and an all-clear when it recovers.`,
  )
  // Nobody got it: drop the claim so the next run tries again.
  if (!delivered && claimId !== null && supabase) {
    await withTimeout(supabase.from('audit_log').delete().eq('id', claimId), null)
  }
  return NextResponse.json({ ok: false, problem, alerted: delivered }, { status: 500 })
}
