import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Block direct access to location pages (only allow from landing page)
  if (pathname.startsWith('/locations/')) {
    // Check if the request came from the landing page
    const referer = request.headers.get('referer')
    const host = request.headers.get('host')
    
    // If no referer or referer is not from the same domain, redirect to home
    if (!referer || !referer.includes(host || 'cookie-banner.ca')) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}