/**
 * Authenticated consent logs endpoint — dashboard API.
 *
 * GET /api/consent-logs?bannerId=...&consentId=...&dateFrom=...&dateTo=...&decision=...&page=1&limit=50
 *   Returns paginated consent records for the current user's team.
 *   Checks plan access (hasConsentLogs) with feature-freeze logic.
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createClient } from '@supabase/supabase-js'
import { canAccessFeatureWithFreeze } from '@/lib/plan-restrictions'
import type { PlanTier } from '@/types'

const VALID_DECISIONS = ['accept', 'reject', 'custom']

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  )
}

function isValidUuid(id: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)
}

function isValidDate(dateStr: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(dateStr) && !isNaN(Date.parse(dateStr))
}

export async function GET(request: NextRequest) {
  try {
    // ── Auth ──────────────────────────────────────────────────────────

    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const supabase = getSupabase()

    // ── Plan check ───────────────────────────────────────────────────

    const { data: user, error: userError } = await supabase
      .from('User')
      .select('planTier, featureFreezeDate')
      .eq('id', session.user.id)
      .single()

    if (userError) {
      console.error('[CONSENT-LOGS] User lookup failed:', { userId: session.user.id, error: userError.message })
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const tier = (user?.planTier || 'free') as PlanTier
    const featureFreezeDate = user?.featureFreezeDate || null

    const hasAccess = canAccessFeatureWithFreeze(tier, 'hasConsentLogs', featureFreezeDate)
    if (!hasAccess) {
      return NextResponse.json({ error: 'Consent logs require an active Pro Annual subscription' }, { status: 403 })
    }

    // ── Team lookup ──────────────────────────────────────────────────

    const teamId = session.user.currentTeamId
    if (!teamId) {
      return NextResponse.json({ error: 'No team selected' }, { status: 400 })
    }

    // ── Parse query params ───────────────────────────────────────────

    const { searchParams } = new URL(request.url)

    const bannerId = searchParams.get('bannerId')
    const consentId = searchParams.get('consentId')
    const dateFrom = searchParams.get('dateFrom')
    const dateTo = searchParams.get('dateTo')
    const decision = searchParams.get('decision')
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10))
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '50', 10)))

    // Validate optional filters
    if (bannerId && !isValidUuid(bannerId)) {
      return NextResponse.json({ error: 'Invalid bannerId format' }, { status: 400 })
    }
    if (consentId && !isValidUuid(consentId)) {
      return NextResponse.json({ error: 'Invalid consentId format' }, { status: 400 })
    }
    if (dateFrom && !isValidDate(dateFrom)) {
      return NextResponse.json({ error: 'Invalid dateFrom format (YYYY-MM-DD)' }, { status: 400 })
    }
    if (dateTo && !isValidDate(dateTo)) {
      return NextResponse.json({ error: 'Invalid dateTo format (YYYY-MM-DD)' }, { status: 400 })
    }
    if (decision && !VALID_DECISIONS.includes(decision)) {
      return NextResponse.json({ error: 'Invalid decision filter (accept, reject, or custom)' }, { status: 400 })
    }

    // ── Build RPC params ─────────────────────────────────────────────

    const rpcParams: Record<string, unknown> = {
      p_team_id: teamId,
      p_banner_id: bannerId || null,
      p_consent_id: consentId || null,
      p_date_from: dateFrom || null,
      p_date_to: dateTo || null,
      p_decision: decision || null,
      p_limit: limit,
      p_offset: (page - 1) * limit,
    }

    // ── Fetch data + count in parallel ───────────────────────────────

    const [logsResult, countResult] = await Promise.all([
      supabase.rpc('get_consent_logs', rpcParams),
      supabase.rpc('count_consent_logs', {
        p_team_id: teamId,
        p_banner_id: bannerId || null,
        p_consent_id: consentId || null,
        p_date_from: dateFrom || null,
        p_date_to: dateTo || null,
        p_decision: decision || null,
      }),
    ])

    if (logsResult.error) {
      console.error('[CONSENT-LOGS] get_consent_logs RPC failed:', logsResult.error.message)
      return NextResponse.json({ error: 'Failed to fetch consent logs' }, { status: 500 })
    }

    if (countResult.error) {
      console.error('[CONSENT-LOGS] count_consent_logs RPC failed:', countResult.error.message)
      // Non-fatal — return data without total
    }

    const total = countResult.data ?? 0

    return NextResponse.json({
      data: logsResult.data || [],
      total,
      page,
      limit,
    })
  } catch (error) {
    console.error('[CONSENT-LOGS] Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
