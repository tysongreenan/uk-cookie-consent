import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { hardenBannerConfig } from '@/lib/banner-config-security'
import { RateLimit } from '@/lib/rate-limit'
import { SECURITY_HEADERS } from '@/lib/security-validation'
import { canAccessFeatureWithFreeze } from '@/lib/plan-restrictions'
import { A11Y_WIDGET_BUILD, generateA11yLoaderScript, resolveA11yRuntimeConfig } from '@/lib/accessibility'
import type { PlanTier } from '@/types'

/**
 * Standalone Accessibility Menu install:
 *
 *   <script src="https://www.cookie-banner.ca/api/v1/a11y.js?id=BANNER_ID" async></script>
 *
 * For sites that keep another cookie banner (or none) but want the menu. Sites
 * on the hosted `banner.js` snippet do NOT need this — the menu ships inside it.
 * Both on one page is harmless: the loader is idempotent.
 *
 * Same plan enforcement, hardening, kill switch and cache tags as banner.js.
 */
const BROWSER_CACHE_CONTROL = 'public, max-age=300'
const CDN_CACHE_CONTROL = 'public, s-maxage=300, stale-while-revalidate=60'
const NO_STORE = 'private, no-cache, no-store, must-revalidate'
const JS_HEADERS = { 'Content-Type': 'application/javascript; charset=utf-8', ...SECURITY_HEADERS }

const rateLimit = new RateLimit({ name: 'a11y-script', windowMs: 60 * 1000, maxRequests: 100 })

function isValidBannerId(id: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)
}

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
  if (!url || !key) throw new Error('Supabase configuration is missing')
  return createClient(url, key, { global: { headers: { 'Cache-Control': 'no-cache, no-store' } } })
}

function js(body: string, init: { status?: number; cache: string; cdn?: string; etag?: string; tag?: string }) {
  return new NextResponse(body, {
    status: init.status || 200,
    headers: {
      ...JS_HEADERS,
      'Cache-Control': init.cache,
      ...(init.cdn ? { 'Vercel-CDN-Cache-Control': init.cdn } : {}),
      ...(init.etag ? { ETag: init.etag } : {}),
      ...(init.tag ? { 'Vercel-Cache-Tag': init.tag } : {}),
    },
  })
}

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const limited = await rateLimit.check(request)
    if (!limited.allowed) {
      return js('console.error("[Accessibility Menu] Rate limit exceeded.");', { status: 429, cache: NO_STORE })
    }

    const bannerId = request.nextUrl.searchParams.get('id') || ''
    if (!isValidBannerId(bannerId)) {
      return js('console.error("[Accessibility Menu] Missing or invalid id= in the <script> tag.");', { status: 400, cache: NO_STORE })
    }
    const noCache = request.nextUrl.searchParams.get('nocache') === '1'
    const cache = noCache ? NO_STORE : BROWSER_CACHE_CONTROL
    const cdn = noCache ? 'no-store' : CDN_CACHE_CONTROL
    const tag = `banner-${bannerId}`

    if (process.env.A11Y_MENU_DISABLED === '1') {
      return js('/* Accessibility Menu temporarily disabled */', { cache, cdn, tag })
    }

    const supabase = getSupabaseClient()
    const { data: banner, error } = await supabase
      .from('SimpleBanners')
      .select('id, name, config, "isActive", "updatedAt", "userId"')
      .eq('id', bannerId)
      .single()

    if (error || !banner) {
      return js(
        `console.error("[Accessibility Menu] No banner found for id " + ${JSON.stringify(bannerId)} + ". Check the id= in your <script> tag against your dashboard.");`,
        { status: 404, cache: noCache ? NO_STORE : 'public, max-age=60', cdn: noCache ? 'no-store' : 'public, s-maxage=60', tag },
      )
    }

    const updatedAt = banner.updatedAt ? new Date(banner.updatedAt).getTime() : Date.now()
    const etag = `"a11y-${bannerId}-${updatedAt}-${A11Y_WIDGET_BUILD}"`
    if (request.headers.get('if-none-match') === etag) {
      return new NextResponse(null, { status: 304, headers: { ETag: etag, 'Cache-Control': cache, ...SECURITY_HEADERS } })
    }

    if (banner.isActive === false) {
      return js(
        `console.warn("[Accessibility Menu] Banner " + ${JSON.stringify(bannerId)} + " is disabled in the dashboard, so its accessibility menu is off too.");`,
        { cache, cdn, etag, tag },
      )
    }

    let config = typeof banner.config === 'string' ? JSON.parse(banner.config) : banner.config
    if (config?.config && typeof config.config === 'object') config = { ...config.config, ...config, config: undefined }
    hardenBannerConfig(config)

    if (!config.accessibility?.enabled) {
      return js(
        `console.info("[Accessibility Menu] Not enabled for this banner. Turn it on under Builder → Accessibility.");`,
        { cache, cdn, etag, tag },
      )
    }

    // Owner plan (team-aware), same signal as banner.js
    let ownerPlanTier: string = 'free'
    let ownerFreeze: string | null = null
    if (banner.userId) {
      const { data: owner } = await supabase
        .from('User')
        .select('currentTeamId, planTier, featureFreezeDate')
        .eq('id', banner.userId)
        .single()
      if (owner) {
        ownerPlanTier = owner.planTier || 'free'
        ownerFreeze = owner.featureFreezeDate || null
        if (owner.currentTeamId) {
          const { data: team } = await supabase.from('Team').select('owner_id').eq('id', owner.currentTeamId).single()
          if (team?.owner_id && team.owner_id !== banner.userId) {
            const { data: teamOwner } = await supabase.from('User').select('planTier, featureFreezeDate').eq('id', team.owner_id).single()
            if (teamOwner?.planTier) {
              ownerPlanTier = teamOwner.planTier
              ownerFreeze = teamOwner.featureFreezeDate || null
            }
          }
        }
      }
    }

    const tier = ownerPlanTier as PlanTier
    if (!canAccessFeatureWithFreeze(tier, 'hasAccessibilityMenu', ownerFreeze)) {
      return js('/* Accessibility Menu not available on this plan */', { cache, cdn, etag, tag })
    }
    const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL || 'https://www.cookie-banner.ca').replace(/\/$/, '')
    const runtime = resolveA11yRuntimeConfig(config, {
      customization: canAccessFeatureWithFreeze(tier, 'hasAccessibilityCustomization', ownerFreeze),
      baseUrl,
    })
    if (!runtime) return js('/* Accessibility Menu not enabled */', { cache, cdn, etag, tag })

    const analytics =
      ownerPlanTier !== 'free' && banner.userId
        ? { userId: banner.userId, bannerId }
        : undefined
    const body = `/* cookie-banner.ca Accessibility Menu loader */\n(function(){${generateA11yLoaderScript(runtime, { baseUrl, analytics })}})();\n`
    return js(body, { cache, cdn, etag, tag })
  } catch (e) {
    console.error('[A11Y.JS] Error:', e)
    return js('console.error("[Accessibility Menu] Failed to load.");', { status: 500, cache: NO_STORE })
  }
}
