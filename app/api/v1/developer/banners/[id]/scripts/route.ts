import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import {
  CORS_HEADERS,
  isDeveloperAuthContext,
  requireDeveloperApiKey,
} from '@/lib/developer-auth'
import { logActivity, AuditAction } from '@/lib/audit-log'
import { invalidateBannerCache } from '@/lib/banner-cache'
import { ScriptSnippetError } from '@/lib/script-snippets'
import {
  addScriptToConfig,
  listScriptsFromConfig,
  parseScriptInput,
  removeScriptFromConfig,
} from '@/lib/developer-scripts'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ||
      ''
  )
}

type RouteContext = { params: { id: string } }

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS })
}

async function loadOwnedBanner(userId: string, bannerId: string) {
  const supabase = getSupabase()
  const { data, error } = await supabase
    .from('SimpleBanners')
    .select('id, name, isActive, config, userId')
    .eq('id', bannerId)
    .eq('userId', userId)
    .single()

  if (error || !data) return null
  return data
}

async function persistConfig(
  banner: { id: string; name: string; userId: string },
  config: Record<string, unknown>
) {
  const supabase = getSupabase()
  const name =
    (typeof config.name === 'string' && config.name) || banner.name || 'Untitled Banner'
  config.name = name
  const { error } = await supabase.rpc('update_banner_simple', {
    banner_id: banner.id,
    banner_name: name,
    banner_config: config,
    banner_code: `<!-- cookie-banner.ca ${banner.id} -->`,
    user_id: banner.userId,
  })
  if (error) throw error
  await invalidateBannerCache(banner.id)
}

/**
 * GET /api/v1/developer/banners/:id/scripts
 */
export async function GET(request: NextRequest, { params }: RouteContext) {
  const auth = await requireDeveloperApiKey(request)
  if (!isDeveloperAuthContext(auth)) return auth

  const banner = await loadOwnedBanner(auth.userId, params.id)
  if (!banner) {
    return NextResponse.json(
      { error: 'Banner not found' },
      { status: 404, headers: CORS_HEADERS }
    )
  }

  const config =
    banner.config && typeof banner.config === 'object'
      ? (banner.config as Record<string, unknown>)
      : {}

  return NextResponse.json(
    { scripts: listScriptsFromConfig(config) },
    { headers: CORS_HEADERS }
  )
}

/**
 * POST /api/v1/developer/banners/:id/scripts
 * Attach a tracking template (GA4, GTM, Meta, …) or a custom script.
 */
export async function POST(request: NextRequest, { params }: RouteContext) {
  const auth = await requireDeveloperApiKey(request)
  if (!isDeveloperAuthContext(auth)) return auth

  const banner = await loadOwnedBanner(auth.userId, params.id)
  if (!banner) {
    return NextResponse.json(
      { error: 'Banner not found' },
      { status: 404, headers: CORS_HEADERS }
    )
  }

  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>
  const current =
    banner.config && typeof banner.config === 'object'
      ? { ...(banner.config as Record<string, unknown>) }
      : {}

  try {
    const result = addScriptToConfig(current, parseScriptInput(body), auth.planTier)
    await persistConfig(banner, result.config)
    logActivity(auth.userId, AuditAction.BANNER_UPDATE, request, {
      bannerId: params.id,
      source: 'developer_api',
      scriptId: result.added.id,
    })
    return NextResponse.json(
      {
        success: true,
        alreadyPresent: result.alreadyPresent,
        script: result.added,
        scripts: listScriptsFromConfig(result.config),
      },
      { status: result.alreadyPresent ? 200 : 201, headers: CORS_HEADERS }
    )
  } catch (err) {
    if (err instanceof ScriptSnippetError) {
      return NextResponse.json(
        { error: 'invalid_script', message: err.message },
        { status: 400, headers: CORS_HEADERS }
      )
    }
    console.error('[DEVELOPER] add script failed:', err)
    return NextResponse.json(
      { error: 'Failed to add script' },
      { status: 500, headers: CORS_HEADERS }
    )
  }
}

/**
 * DELETE /api/v1/developer/banners/:id/scripts
 * Body: { script_id }
 */
export async function DELETE(request: NextRequest, { params }: RouteContext) {
  const auth = await requireDeveloperApiKey(request)
  if (!isDeveloperAuthContext(auth)) return auth

  const banner = await loadOwnedBanner(auth.userId, params.id)
  if (!banner) {
    return NextResponse.json(
      { error: 'Banner not found' },
      { status: 404, headers: CORS_HEADERS }
    )
  }

  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>
  const scriptId =
    (typeof body.script_id === 'string' && body.script_id) ||
    (typeof body.scriptId === 'string' && body.scriptId) ||
    ''
  if (!scriptId) {
    return NextResponse.json(
      { error: 'script_id is required' },
      { status: 400, headers: CORS_HEADERS }
    )
  }

  const current =
    banner.config && typeof banner.config === 'object'
      ? { ...(banner.config as Record<string, unknown>) }
      : {}
  const result = removeScriptFromConfig(current, scriptId)
  if (!result.removed) {
    return NextResponse.json(
      { error: 'Script not found' },
      { status: 404, headers: CORS_HEADERS }
    )
  }

  try {
    await persistConfig(banner, result.config)
  } catch (err) {
    console.error('[DEVELOPER] remove script failed:', err)
    return NextResponse.json(
      { error: 'Failed to remove script' },
      { status: 500, headers: CORS_HEADERS }
    )
  }

  logActivity(auth.userId, AuditAction.BANNER_UPDATE, request, {
    bannerId: params.id,
    source: 'developer_api',
    scriptId,
  })

  return NextResponse.json(
    { success: true, scripts: listScriptsFromConfig(result.config) },
    { headers: CORS_HEADERS }
  )
}
