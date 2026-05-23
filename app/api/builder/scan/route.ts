import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/auth'
import { RateLimit } from '@/lib/rate-limit'
import { scanWebsite } from '@/lib/scripts/scan-website'
import { discoverScripts } from '@/lib/scripts/discover'
import { toImportCandidates, type BuilderScannerResult } from '@/lib/scripts/import-candidates'

export const runtime = 'nodejs'
export const maxDuration = 60

const builderScanRateLimit = new RateLimit({
  name: 'builder-cookie-scanner',
  windowMs: 60 * 60 * 1000,
  maxRequests: 20,
  keyGenerator: (req) => {
    const userId = req.headers.get('x-cookie-banner-user-id')
    const forwarded = req.headers.get('x-forwarded-for')
    const realIp = req.headers.get('x-real-ip')
    return userId || forwarded?.split(',')[0]?.trim() || realIp || 'unknown'
  },
})

function normalizeUrl(input: string): string {
  let cleaned = input.trim().toLowerCase()
  cleaned = cleaned.replace(/^https?:\/\//, '')
  cleaned = cleaned.replace(/^www\./, '')
  cleaned = cleaned.replace(/\/+$/, '')
  cleaned = cleaned.split('/')[0].split('?')[0].split('#')[0]
  return cleaned
}

function isValidDomain(domain: string): boolean {
  return /^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*\.[a-z]{2,}$/.test(domain)
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const rateLimitRequest = new Request(request.url, {
      headers: new Headers(request.headers),
    })
    rateLimitRequest.headers.set('x-cookie-banner-user-id', session.user.id)

    const rateLimitResult = await builderScanRateLimit.check(rateLimitRequest)
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { error: 'Too many scans. Please wait before scanning another site.' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': '20',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': rateLimitResult.resetTime.toString(),
            'Retry-After': Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000).toString(),
          },
        },
      )
    }

    const body = await request.json().catch(() => ({}))
    const rawUrl = typeof body?.url === 'string' ? body.url : ''
    const domain = normalizeUrl(rawUrl)

    if (!domain || !isValidDomain(domain)) {
      return NextResponse.json({ error: 'Enter a valid domain (e.g., example.com).' }, { status: 400 })
    }

    const targetUrl = `https://${domain}`
    const [scanResult, discoveryResult] = await Promise.all([
      scanWebsite(targetUrl),
      discoverScripts(targetUrl),
    ])

    const result: BuilderScannerResult = {
      url: scanResult.url,
      fetchedAt: scanResult.fetchedAt,
      scanMethod: scanResult.scanMethod,
      consentBanner: scanResult.consentBanner,
      privacyPolicyUrl: scanResult.privacyPolicyUrl,
      cookies: scanResult.cookies,
      scripts: await toImportCandidates(scanResult, discoveryResult.scripts),
      compliance: scanResult.compliance,
      recommendations: scanResult.recommendations,
      warnings: [...(scanResult.warnings || []), ...(discoveryResult.warnings || [])],
    }

    return NextResponse.json(result, {
      headers: {
        'X-RateLimit-Limit': '20',
        'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
        'X-RateLimit-Reset': rateLimitResult.resetTime.toString(),
      },
    })
  } catch (error) {
    console.error('Builder scanner error:', error)
    const message = error instanceof Error ? error.message : 'Unexpected error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
