import { NextRequest, NextResponse } from 'next/server'
import {
  CORS_HEADERS,
  isDeveloperAuthContext,
  requireDeveloperApiKey,
} from '@/lib/developer-auth'
import { discoverBrand } from '@/lib/brand/discover'
import { RateLimit } from '@/lib/rate-limit'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const searchDomainRateLimit = new RateLimit({
  name: 'developer-search-domain',
  windowMs: 10 * 60 * 1000,
  maxRequests: 20,
  failClosed: true,
})

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS })
}

/**
 * POST /api/v1/developer/search-domain
 * Fetch a live site and return its logo, brand colors, and fonts.
 */
export async function POST(request: NextRequest) {
  const auth = await requireDeveloperApiKey(request)
  if (!isDeveloperAuthContext(auth)) return auth

  const rateLimitResult = await searchDomainRateLimit.check(request, auth.userId)
  if (!rateLimitResult.allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait before trying again.' },
      {
        status: 429,
        headers: {
          ...CORS_HEADERS,
          'Retry-After': Math.ceil(
            (rateLimitResult.resetTime - Date.now()) / 1000
          ).toString(),
        },
      }
    )
  }

  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>
  const targetUrl =
    (typeof body.url === 'string' && body.url) ||
    (typeof body.site_url === 'string' && body.site_url) ||
    ''

  if (!targetUrl.trim()) {
    return NextResponse.json(
      { error: 'url is required' },
      { status: 400, headers: CORS_HEADERS }
    )
  }

  try {
    const result = await discoverBrand(targetUrl)
    return NextResponse.json(
      {
        url: result.url,
        logo: result.logo || null,
        colors: result.suggestions,
        fonts: result.fonts || [],
        warnings: result.warnings,
      },
      { headers: CORS_HEADERS }
    )
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Could not fetch that site'
    return NextResponse.json(
      { error: message },
      { status: 422, headers: CORS_HEADERS }
    )
  }
}
