import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Homepage A/B test ended: always serve app/page.tsx for `/`.
  // Clear leftover ab-homepage cookies so users stuck on rewrite stop getting /v2.
  if (pathname === '/' && request.cookies.get('ab-homepage')) {
    const response = NextResponse.next()
    response.cookies.set('ab-homepage', '', { maxAge: 0, path: '/' })
    return response
  }

  // Location pages (/locations/*) are public SEO landing pages — do not gate them.

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
