import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // ── A/B Test: Homepage V2 (disabled for bots) ──
  // Split traffic 50/50 between / and /v2. A cookie keeps the user on
  // the same variant for the duration of the session.
  // IMPORTANT: Always serve v1 to search engine crawlers so Google sees
  // consistent content — serving random variants caused ranking instability.
  if (pathname === '/') {
    const ua = request.headers.get('user-agent') || ''
    const isBot = /googlebot|bingbot|yandex|baiduspider|duckduckbot|slurp|msnbot|petalbot|linkedinbot|facebookexternalhit|twitterbot|applebot|gptbot|oai-searchbot|claudebot|perplexitybot|bytespider/i.test(ua)

    if (!isBot) {
      const abCookie = request.cookies.get('ab-homepage')
      if (abCookie?.value === 'v2') {
        const url = request.nextUrl.clone()
        url.pathname = '/v2'
        return NextResponse.rewrite(url)
      }
      if (!abCookie) {
        const variant = Math.random() < 0.5 ? 'v1' : 'v2'
        if (variant === 'v2') {
          const url = request.nextUrl.clone()
          url.pathname = '/v2'
          const response = NextResponse.rewrite(url)
          response.cookies.set('ab-homepage', 'v2', { maxAge: 60 * 60 * 24 * 30, path: '/' })
          return response
        }
        const response = NextResponse.next()
        response.cookies.set('ab-homepage', 'v1', { maxAge: 60 * 60 * 24 * 30, path: '/' })
        return response
      }
    }
  }

  // Block direct access to location pages (only allow from landing page or bots)
  if (pathname.startsWith('/locations/')) {
    const ua = request.headers.get('user-agent') || ''
    const isCrawler = /googlebot|bingbot|yandex|baiduspider|duckduckbot|slurp|msnbot|petalbot|gptbot|oai-searchbot|claudebot|perplexitybot|bytespider/i.test(ua)

    if (!isCrawler) {
      const referer = request.headers.get('referer')
      const host = request.headers.get('host')
      if (!referer || !referer.includes(host || 'cookie-banner.ca')) {
        return NextResponse.redirect(new URL('/', request.url))
      }
    }
  }

  // ── Dashboard auth gate ──
  // Redirect unauthenticated users to sign-in. The public /builder route must
  // stay open so acquisition CTAs can land visitors in the banner builder.
  if (pathname.startsWith('/dashboard')) {
    const sessionToken =
      request.cookies.get('next-auth.session-token') ||
      request.cookies.get('__Secure-next-auth.session-token')

    if (!sessionToken) {
      const signInUrl = new URL('/auth/signin', request.url)
      signInUrl.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(signInUrl)
    }
  }

  // Auth boundary: block API keys on B2B routes
  // Prevents consumer extension keys from accessing business endpoints
  if (pathname.startsWith('/api/banners') || pathname.startsWith('/api/projects') || pathname.startsWith('/api/teams')) {
    const authHeader = request.headers.get('authorization')
    if (authHeader?.startsWith('Bearer ck_')) {
      return NextResponse.json(
        { error: 'forbidden', message: 'API keys cannot access this endpoint' },
        { status: 403 }
      )
    }
  }

  // Auth boundary: block session cookies on extension API routes
  // Extension must use API key auth, not session cookies
  if (pathname.startsWith('/api/v1/consumer/')) {
    const sessionCookie = request.cookies.get('next-auth.session-token') || request.cookies.get('__Secure-next-auth.session-token')
    const authHeader = request.headers.get('authorization')
    // If there's a session cookie but no API key, reject — must use API key for extension routes
    if (sessionCookie && !authHeader?.startsWith('Bearer ck_')) {
      return NextResponse.json(
        { error: 'forbidden', message: 'Use API key authentication for extension endpoints' },
        { status: 403 }
      )
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/',
    '/dashboard/:path*',
    '/locations/:path*',
    '/api/banners/:path*',
    '/api/projects/:path*',
    '/api/teams/:path*',
    '/api/v1/consumer/:path*',
  ],
}
