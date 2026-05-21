import { NextRequest, NextResponse } from 'next/server'

import { scanWebsite } from '@/lib/scripts/scan-website'
import { RateLimit } from '@/lib/rate-limit'

// Headless Chromium needs the Node.js runtime, not Edge.
export const runtime = 'nodejs'
// 60 s lets a slow site finish (navigation up to 25 s + Chromium cold start
// up to ~8 s + scoring + slack). Vercel.json also sets this limit.
export const maxDuration = 60

// Public marketing tool — tighter rate limit than the in-builder scanner
// because this endpoint is unauthenticated and reachable from the landing
// page.
const publicScanRateLimit = new RateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  maxRequests: 3, // 3 scans per hour per IP
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
    const rateLimitResult = await publicScanRateLimit.check(request)
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { error: 'Too many scans from your IP. Please wait an hour before scanning another site.' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': '3',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': rateLimitResult.resetTime.toString(),
            'Retry-After': Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000).toString(),
          },
        }
      )
    }

    const body = await request.json().catch(() => ({}))
    const rawUrl = typeof body?.url === 'string' ? body.url : ''
    const domain = normalizeUrl(rawUrl)

    if (!domain || !isValidDomain(domain)) {
      return NextResponse.json({ error: 'Enter a valid domain (e.g., example.com).' }, { status: 400 })
    }

    const result = await scanWebsite(`https://${domain}`)

    return NextResponse.json(result, {
      headers: {
        'X-RateLimit-Limit': '3',
        'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
        'X-RateLimit-Reset': rateLimitResult.resetTime.toString(),
      },
    })
  } catch (error) {
    console.error('Public cookie scanner error:', error)
    const message = error instanceof Error ? error.message : 'Unexpected error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
