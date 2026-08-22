/**
 * Paths that should return 410 Gone so Google drops them from the index.
 * These were crawled as 404s, soft 404s, or accidental publishes.
 */
const GONE_EXACT = new Set([
  '/blog/blog_writing_guide',
  '/blog/core-web-vitals-cookie-consent',
  '/&',
  '/$',
])

export function isGonePath(pathname: string): boolean {
  let decoded = pathname
  try {
    decoded = decodeURIComponent(pathname)
  } catch {
    decoded = pathname
  }
  const normalized = decoded.replace(/\/+$/, '') || '/'
  return GONE_EXACT.has(normalized.toLowerCase())
}
