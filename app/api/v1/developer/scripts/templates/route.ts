import { NextRequest, NextResponse } from 'next/server'
import {
  CORS_HEADERS,
  isDeveloperAuthContext,
  requireDeveloperApiKey,
} from '@/lib/developer-auth'
import { listScriptTemplates } from '@/lib/script-snippets'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS })
}

/**
 * GET /api/v1/developer/scripts/templates
 * Catalog of first-class tracking templates the MCP can attach to a banner.
 */
export async function GET(request: NextRequest) {
  const auth = await requireDeveloperApiKey(request)
  if (!isDeveloperAuthContext(auth)) return auth

  return NextResponse.json(
    {
      templates: listScriptTemplates(),
    },
    { headers: CORS_HEADERS }
  )
}
