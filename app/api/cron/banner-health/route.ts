// Every 10 minutes: can we read a live banner from the database, and does the public banner.js
// serve it? Emails ADMIN_EMAILS if not. The 2026-10-28 outage (rotated service key) ran 5 days unnoticed.
// shortcut: runs inside the same deployment, so it can't report a deployment that is fully down;
// pair it with an external uptime monitor on banner.js for that.
import { NextRequest, NextResponse } from 'next/server'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { sendEmail } from '@/lib/email'

export const dynamic = 'force-dynamic'

// The host customers' <script> tags point at.
const BANNER_HOST = 'https://www.cookie-banner.ca'
// Each step gets a deadline so a hung dependency still leaves time to send the alert (function limit is 30s).
const STEP_TIMEOUT_MS = 8000
// One email per incident, then a reminder every 6 hours while it stays broken.
const REMIND_EVERY_MS = 6 * 60 * 60 * 1000
const ALERT_ACTION = 'health.banner_alert'

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

// Should this failed run email? Uses the audit log as memory between runs. If the database is the
// thing that's down, fall back to the clock: the first run of each hour emails (at most 24 a day).
async function shouldAlert(supabase: SupabaseClient | null, now: Date): Promise<boolean> {
  if (supabase) {
    const { data, error } = await supabase
      .from('audit_log')
      .select('created_at')
      .eq('action', ALERT_ACTION)
      .gte('created_at', new Date(now.getTime() - REMIND_EVERY_MS).toISOString())
      .limit(1)
      .abortSignal(AbortSignal.timeout(STEP_TIMEOUT_MS))
    if (!error) return !data?.length
  }
  return now.getUTCMinutes() < 10
}

export async function GET(request: NextRequest) {
  if (request.headers.get('authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  const supabase = url && key ? createClient(url, key) : null

  let problem: string | null
  try {
    problem = await check(supabase)
  } catch (e) {
    problem = `Health check failed: ${e instanceof Error ? e.message : String(e)}`
  }
  if (!problem) return NextResponse.json({ ok: true })

  console.error('[HEALTH] banner.js check failed:', problem)
  const now = new Date()
  let alert = true
  try {
    alert = await shouldAlert(supabase, now)
  } catch {
    alert = now.getUTCMinutes() < 10
  }
  if (!alert) return NextResponse.json({ ok: false, problem, alerted: false }, { status: 500 })

  const to = (process.env.ADMIN_EMAILS || '').split(',').map((e) => e.trim()).filter(Boolean)
  await Promise.all(
    to.map((addr) =>
      sendEmail({
        to: addr,
        subject: 'cookie-banner.ca: banner health check failed',
        text: `${problem}\n\nCustomer banners may not be loading. Checked ${now.toISOString()}. You'll get a reminder every 6 hours while this keeps failing.`,
        html: `<p>${problem.replace(/</g, '&lt;')}</p><p>Customer banners may not be loading. Checked ${now.toISOString()}. You'll get a reminder every 6 hours while this keeps failing.</p>`,
      }),
    ),
  )
  if (supabase) {
    await supabase.from('audit_log').insert({ user_id: null, action: ALERT_ACTION, metadata: { problem } }).then(
      () => undefined,
      () => undefined,
    )
  }
  return NextResponse.json({ ok: false, problem, alerted: true }, { status: 500 })
}
