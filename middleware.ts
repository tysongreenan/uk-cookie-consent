import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { prefersMarkdown } from '@/lib/seo/content-negotiation'
import { aiCrawlerLogLine, detectAiCrawler } from '@/lib/seo/ai-crawlers'
import { getPageMarkdownKey } from '@/lib/seo/markdown-routes'

function logAiCrawler(request: NextRequest) {
  const bot = detectAiCrawler(request.headers.get('user-agent'))
  if (!bot) return
  const accept = request.headers.get('accept') ?? ''
  console.info(
    aiCrawlerLogLine({
      bot,
      path: request.nextUrl.pathname,
      method: request.method,
      accept,
      markdown: prefersMarkdown(accept),
    })
  )
}

function rewriteToBlogMarkdown(request: NextRequest, slug: string) {
  const url = request.nextUrl.clone()
  url.pathname = `/api/md/blog/${slug.toLowerCase()}`
  return NextResponse.rewrite(url)
}

function rewriteToPageMarkdown(request: NextRequest, key: string) {
  const url = request.nextUrl.clone()
  url.pathname = `/api/md/page/${key}`
  return NextResponse.rewrite(url)
}

function htmlPathFromMarkdownUrl(pathname: string): string | null {
  if (!pathname.endsWith('.md') && !pathname.endsWith('.md/')) return null
  const withoutExt = pathname.replace(/\.md\/?$/i, '')
  return withoutExt || '/'
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  logAiCrawler(request)

  // Explicit `.md` URL, or the same HTML URL with Accept: text/markdown.
  const blogMarkdown = pathname.match(/^\/blog\/([a-z0-9-]+)\.md\/?$/i)
  if (blogMarkdown) {
    return rewriteToBlogMarkdown(request, blogMarkdown[1])
  }

  const blogHtml = pathname.match(/^\/blog\/([a-z0-9-]+)\/?$/i)
  if (blogHtml) {
    if (prefersMarkdown(request.headers.get('accept'))) {
      return rewriteToBlogMarkdown(request, blogHtml[1])
    }
    const response = NextResponse.next()
    response.headers.append('Vary', 'Accept')
    return response
  }

  const markdownHtmlPath = htmlPathFromMarkdownUrl(pathname)
  if (markdownHtmlPath) {
    const pageKey = getPageMarkdownKey(markdownHtmlPath)
    if (pageKey) {
      return rewriteToPageMarkdown(request, pageKey)
    }
  }

  const pageKey = getPageMarkdownKey(pathname)
  if (pageKey) {
    if (prefersMarkdown(request.headers.get('accept'))) {
      return rewriteToPageMarkdown(request, pageKey)
    }
    const response = NextResponse.next()
    response.headers.append('Vary', 'Accept')
    return response
  }

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
    // Run on pages and APIs so crawler hits are logged. Skip static assets.
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2)$).*)',
  ],
}
