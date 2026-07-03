/**
 * Public consent log endpoint — called by the banner script on visitor consent.
 *
 * POST /api/v1/consent-log
 *   Records a consent decision into consent_records.
 *   Checks plan access (hasConsentLogs) with feature-freeze logic.
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { RateLimit } from '@/lib/rate-limit'
import { canAccessFeatureWithFreeze } from '@/lib/plan-restrictions'
import { resolveEffectivePlan } from '@/lib/team-permissions'
import type { PlanTier } from '@/types'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

const VALID_DECISIONS = ['accept', 'reject', 'custom'] as const

// 60 requests per minute per IP (one consent action per page load)
const consentLogRateLimit = new RateLimit({
  name: 'v1-consent-log',
  windowMs: 60 * 1000,
  maxRequests: 60,
})

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  )
}

function isValidUuid(id: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)
}

function isValidHashedCookieId(id: string): boolean {
  return /^[0-9a-f]{64}$/i.test(id)
}

function isValidCountryCode(code: string): boolean {
  return /^[A-Z]{2}$/.test(code)
}

export async function POST(request: NextRequest) {
  try {
    // Rate limit
    const rateLimitResult = await consentLogRateLimit.check(request)
    if (!rateLimitResult.allowed) {
      console.log('[CONSENT-LOG] Rate limited')
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { status: 429, headers: CORS_HEADERS }
      )
    }

    const body = await request.json()
    const {
      bannerId,
      userId,
      consentId,
      hashedCookieId,
      decision,
      categories,
      country,
      pagePath,
    } = body

    // ── Validate inputs ──────────────────────────────────────────────

    if (!userId || typeof userId !== 'string' || !isValidUuid(userId)) {
      return NextResponse.json(
        { error: 'Invalid userId (must be UUID)' },
        { status: 400, headers: CORS_HEADERS }
      )
    }

    if (!bannerId || typeof bannerId !== 'string' || !isValidUuid(bannerId)) {
      return NextResponse.json(
        { error: 'Invalid bannerId (must be UUID)' },
        { status: 400, headers: CORS_HEADERS }
      )
    }

    if (!consentId || typeof consentId !== 'string' || !isValidUuid(consentId)) {
      return NextResponse.json(
        { error: 'Invalid consentId (must be UUID)' },
        { status: 400, headers: CORS_HEADERS }
      )
    }

    if (!hashedCookieId || typeof hashedCookieId !== 'string' || !isValidHashedCookieId(hashedCookieId)) {
      return NextResponse.json(
        { error: 'Invalid hashedCookieId (must be 64-char hex string)' },
        { status: 400, headers: CORS_HEADERS }
      )
    }

    if (!decision || !VALID_DECISIONS.includes(decision as typeof VALID_DECISIONS[number])) {
      return NextResponse.json(
        { error: 'Invalid decision (must be accept, reject, or custom)' },
        { status: 400, headers: CORS_HEADERS }
      )
    }

    if (!categories || typeof categories !== 'object' || Array.isArray(categories)) {
      return NextResponse.json(
        { error: 'Invalid categories (must be an object)' },
        { status: 400, headers: CORS_HEADERS }
      )
    }

    // Country: normalize instead of reject. banner.js sends 'unknown' when the
    // x-vercel-ip-country header is absent; the DB column also defaults to
    // 'unknown'. A consent record with an unknown country is far better than a
    // dropped Law 25 proof-of-consent record.
    const safeCountry = (typeof country === 'string' && isValidCountryCode(country))
      ? country
      : 'unknown'

    const safePagePath = (typeof pagePath === 'string')
      ? pagePath.replace(/[<>"']/g, '').slice(0, 200)
      : '/'

    // ── Plan check ───────────────────────────────────────────────────

    const supabase = getSupabase()

    // User plan lookup and banner ownership check are independent queries —
    // run them in parallel to keep this hot path at one round-trip of latency.
    const [
      { data: user, error: userError },
      { data: ownedBanner, error: bannerError },
    ] = await Promise.all([
      supabase
        .from('User')
        .select('planTier, featureFreezeDate, currentTeamId')
        .eq('id', userId)
        .single(),
      supabase
        .from('SimpleBanners')
        .select('id, userId')
        .eq('id', bannerId)
        .eq('userId', userId)
        .single(),
    ])

    if (userError) {
      console.error('[CONSENT-LOG] User lookup failed:', { userId, error: userError.message })
      return NextResponse.json(
        { success: false, reason: 'user_not_found' },
        { status: 200, headers: CORS_HEADERS }
      )
    }

    const teamId = user?.currentTeamId || null

    // This runs on every visitor consent event, so the common case (no team)
    // uses the fields already selected above — zero extra queries. Only when
    // the user works in a team workspace do we resolve the effective plan
    // (team owner's plan), so a Pro-team member's records aren't rejected
    // after their banner already loaded the logging JS.
    let tier = (user?.planTier || 'free') as PlanTier
    let featureFreezeDate: string | null = user?.featureFreezeDate || null

    if (teamId) {
      const effective = await resolveEffectivePlan(userId, teamId)
      tier = (effective.planTier || 'free') as PlanTier
      featureFreezeDate = effective.featureFreezeDate
    }

    const hasAccess = canAccessFeatureWithFreeze(tier, 'hasConsentLogs', featureFreezeDate)
    if (!hasAccess) {
      console.log('[CONSENT-LOG] Plan does not include consent logs:', { userId, tier })
      return NextResponse.json(
        { success: false, reason: 'plan_required' },
        { status: 200, headers: CORS_HEADERS }
      )
    }

    // ── Banner ownership check ───────────────────────────────────────
    // bannerId and userId are both public in banner.js, so without this join
    // anyone could forge consent records against another user's account.
    if (bannerError || !ownedBanner) {
      console.log('[CONSENT-LOG] Banner does not belong to user:', { userId, bannerId })
      return NextResponse.json(
        { success: false, reason: 'banner_mismatch' },
        { status: 200, headers: CORS_HEADERS }
      )
    }

    // ── Insert consent record ────────────────────────────────────────

    const { error: insertError } = await supabase
      .from('consent_records')
      .insert({
        banner_id: bannerId,
        user_id: userId,
        team_id: teamId,
        consent_id: consentId,
        hashed_cookie_id: hashedCookieId,
        recorded_at: new Date().toISOString(),
        decision,
        categories,
        country: safeCountry,
        page_path: safePagePath,
      })

    if (insertError) {
      console.error('[CONSENT-LOG] Insert failed:', { userId, bannerId, error: insertError.message })
      return NextResponse.json(
        { success: false },
        { status: 500, headers: CORS_HEADERS }
      )
    }

    return NextResponse.json(
      { success: true },
      { headers: CORS_HEADERS }
    )
  } catch (error) {
    console.error('[CONSENT-LOG] Unexpected error:', error)
    return NextResponse.json(
      { success: false },
      { status: 500, headers: CORS_HEADERS }
    )
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: CORS_HEADERS,
  })
}
