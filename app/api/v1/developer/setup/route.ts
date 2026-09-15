import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import {
  CORS_HEADERS,
  isDeveloperAuthContext,
  requireDeveloperApiKey,
} from '@/lib/developer-auth'
import { canCreateBanner, getBannerLimit } from '@/lib/plan-restrictions'
import type { PlanTier } from '@/types'
import { logActivity, AuditAction } from '@/lib/audit-log'
import { hostedInstallSnippet } from '@/lib/install-snippet'
import { ScriptSnippetError } from '@/lib/script-snippets'
import { parseScriptInput } from '@/lib/developer-scripts'
import {
  applyScriptsToConfig,
  cloneBannerTemplate,
  getInstallInstructions,
  isSiteFramework,
  resolveComplianceFramework,
  SETUP_AGENT_HINT,
  type SiteFramework,
} from '@/lib/ai-setup'

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

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS })
}

/**
 * POST /api/v1/developer/setup
 * One-shot: create a banner, attach tracking scripts, return the header snippet.
 */
export async function POST(request: NextRequest) {
  const auth = await requireDeveloperApiKey(request)
  if (!isDeveloperAuthContext(auth)) return auth

  const supabase = getSupabase()
  const userTier = (auth.planTier || 'free') as PlanTier

  const { data: existing } = await supabase.rpc('get_banners_simple', {
    user_id: auth.userId,
  })
  const currentCount = existing?.length || 0

  if (!canCreateBanner(userTier, currentCount)) {
    const limit = getBannerLimit(userTier)
    return NextResponse.json(
      {
        error: `Banner limit reached (${limit} on Free). Upgrade to Pro for unlimited banners.`,
        upgradeRequired: true,
      },
      { status: 403, headers: CORS_HEADERS }
    )
  }

  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>
  const name =
    (typeof body.name === 'string' && body.name.trim()) || 'Untitled Banner'
  const compliance = resolveComplianceFramework(
    typeof body.compliance === 'string' ? body.compliance : undefined
  )
  const frameworkRaw =
    (typeof body.framework === 'string' && body.framework) ||
    (typeof body.site_framework === 'string' && body.site_framework) ||
    'html'
  const framework: SiteFramework = isSiteFramework(frameworkRaw) ? frameworkRaw : 'html'
  const privacyPolicyUrl =
    (typeof body.privacyPolicyUrl === 'string' && body.privacyPolicyUrl) ||
    (typeof body.privacy_policy_url === 'string' && body.privacy_policy_url) ||
    undefined
  const siteUrl =
    (typeof body.siteUrl === 'string' && body.siteUrl) ||
    (typeof body.site_url === 'string' && body.site_url) ||
    undefined

  const scriptInputs = Array.isArray(body.scripts)
    ? body.scripts
        .filter((item): item is Record<string, unknown> => !!item && typeof item === 'object')
        .map(parseScriptInput)
    : []

  let config: Record<string, unknown>
  let added
  try {
    const cloned = cloneBannerTemplate(compliance, name, privacyPolicyUrl)
    if (siteUrl && !privacyPolicyUrl) {
      cloned.branding.privacyPolicy.url = `${siteUrl.replace(/\/$/, '')}/privacy`
    }
    const applied = applyScriptsToConfig(
      cloned as unknown as Record<string, unknown>,
      scriptInputs,
      auth.planTier
    )
    config = applied.config
    added = applied.added
  } catch (err) {
    if (err instanceof ScriptSnippetError) {
      return NextResponse.json(
        { error: 'invalid_script', message: err.message },
        { status: 400, headers: CORS_HEADERS }
      )
    }
    throw err
  }

  const bannerId = crypto.randomUUID()
  const { error } = await supabase.rpc('create_banner_simple', {
    banner_id: bannerId,
    banner_name: name,
    banner_config: config,
    banner_code: `<!-- cookie-banner.ca ${bannerId} -->`,
    user_id: auth.userId,
  })

  if (error) {
    console.error('[DEVELOPER] setup create failed:', error)
    return NextResponse.json(
      { error: 'Failed to create banner' },
      { status: 500, headers: CORS_HEADERS }
    )
  }

  logActivity(auth.userId, AuditAction.BANNER_CREATE, request, {
    bannerId,
    bannerName: name,
    source: 'developer_api_setup',
  })

  const installSnippet = hostedInstallSnippet(bannerId)

  return NextResponse.json(
    {
      success: true,
      banner: {
        id: bannerId,
        name,
        compliance,
      },
      scripts: added,
      installSnippet,
      installUrl: `https://www.cookie-banner.ca/api/v1/banner.js?id=${bannerId}`,
      installInstructions: getInstallInstructions(framework, bannerId, installSnippet),
      agentHint: SETUP_AGENT_HINT,
    },
    { status: 201, headers: CORS_HEADERS }
  )
}
