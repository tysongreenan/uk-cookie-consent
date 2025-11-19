import { NextRequest, NextResponse } from 'next/server'

import { discoverScripts } from '@/lib/scripts/discover'
import { RateLimit } from '@/lib/rate-limit'

// Rate limiter: 5 requests per 10 minutes per IP (same as brand discovery)
const scriptDiscoveryRateLimit = new RateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  maxRequests: 5, // 5 requests per window
})

export async function POST(request: NextRequest) {
  try {
    // Check rate limit
    const rateLimitResult = await scriptDiscoveryRateLimit.check(request)
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait before trying again.' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': '5',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': rateLimitResult.resetTime.toString(),
            'Retry-After': Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000).toString(),
          },
        }
      )
    }

    const body = await request.json()
    const targetUrl = typeof body?.url === 'string' ? body.url : ''

    if (!targetUrl.trim()) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }

    const result = await discoverScripts(targetUrl)
    
    return NextResponse.json(result, {
      headers: {
        'X-RateLimit-Limit': '5',
        'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
        'X-RateLimit-Reset': rateLimitResult.resetTime.toString(),
      },
    })
  } catch (error) {
    console.error('Script discovery error:', error)
    const message = error instanceof Error ? error.message : 'Unexpected error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

