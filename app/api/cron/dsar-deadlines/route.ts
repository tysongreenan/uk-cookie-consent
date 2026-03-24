/**
 * DSAR Deadline Monitor — daily cron to flag approaching deadlines
 *
 * Schedule: daily at 08:00 UTC (configured in vercel.json)
 * Logs warnings to audit_log for requests approaching the 30-day deadline.
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { sendDSARDeadlineReminder } from '@/lib/email'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) {
    return NextResponse.json({ error: 'Supabase config missing' }, { status: 500 })
  }

  const supabase = createClient(url, key)

  // Find active requests with deadlines between 1 day ago (recently overdue) and 7 days from now
  const oneDayAgo = new Date()
  oneDayAgo.setDate(oneDayAgo.getDate() - 1)
  const sevenDaysFromNow = new Date()
  sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7)

  const { data: approaching, error } = await supabase
    .from('data_access_requests')
    .select('id, organization_user_id, team_id, deadline_at, status, subject_identifier_type, subject_identifier_value')
    .in('status', ['pending', 'identity_verified', 'processing'])
    .is('deleted_at', null)
    .gte('deadline_at', oneDayAgo.toISOString())
    .lte('deadline_at', sevenDaysFromNow.toISOString())

  if (error) {
    console.error('[CRON] DSAR deadline check failed:', error)
    return NextResponse.json({ error: 'Deadline check failed' }, { status: 500 })
  }

  // Deduplicate: find requests that were already warned about today
  const todayStart = new Date()
  todayStart.setUTCHours(0, 0, 0, 0)

  const requestIds = (approaching || []).map((r: { id: string }) => r.id)
  let alreadyWarned = new Set<string>()

  if (requestIds.length > 0) {
    const { data: recentWarnings } = await supabase
      .from('audit_log')
      .select('metadata')
      .eq('action', 'data_request.deadline_warning')
      .gte('created_at', todayStart.toISOString())
    alreadyWarned = new Set(
      (recentWarnings || [])
        .map((w: { metadata: Record<string, unknown> }) => w.metadata?.requestId as string)
        .filter(Boolean)
    )
  }

  // Log warnings for approaching deadlines (skip already warned today)
  const now = new Date()
  let warningCount = 0

  for (const req of approaching || []) {
    if (alreadyWarned.has(req.id)) continue

    const deadline = new Date(req.deadline_at)
    const daysRemaining = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    const isOverdue = daysRemaining < 0

    await supabase.from('audit_log').insert({
      user_id: req.organization_user_id,
      action: 'data_request.deadline_warning',
      metadata: {
        requestId: req.id,
        teamId: req.team_id,
        status: req.status,
        daysRemaining,
        isOverdue,
        deadlineAt: req.deadline_at,
      },
    })

    // Send email reminder to the org user
    const { data: orgUser } = await supabase
      .from('User')
      .select('email')
      .eq('id', req.organization_user_id)
      .single()

    if (orgUser?.email) {
      await sendDSARDeadlineReminder(
        orgUser.email,
        req.id,
        daysRemaining,
        `${req.subject_identifier_type}: ${req.subject_identifier_value}`
      )
    }

    warningCount++
  }

  console.log(`[CRON] DSAR deadline check: ${warningCount} warning(s) logged`)
  return NextResponse.json({ success: true, warningsLogged: warningCount })
}
