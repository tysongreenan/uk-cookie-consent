const LAST_SITE_KEY = 'cb-last-site-url'
const PLACEHOLDER_HOSTS = new Set(['example.com', 'www.example.com'])

function getLocalStorage(): Storage | null {
  if (typeof window === 'undefined') return null
  try {
    const storage = window.localStorage
    storage.getItem(LAST_SITE_KEY)
    return storage
  } catch {
    return null
  }
}

/** Empty, whitespace-only, and example.com placeholders are not scannable. */
export function normalizeSiteUrl(raw: string | null | undefined): string | null {
  const trimmed = raw?.trim() ?? ''
  if (!trimmed) return null
  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
  try {
    const parsed = new URL(withProtocol)
    if (!parsed.hostname || PLACEHOLDER_HOSTS.has(parsed.hostname.toLowerCase())) {
      return null
    }
    return parsed.toString()
  } catch {
    return null
  }
}

export function canScanWebsiteUrl(url: string | null | undefined): boolean {
  return Boolean(normalizeSiteUrl(url))
}

export function readLastSiteUrl(): string | null {
  const storage = getLocalStorage()
  if (!storage) return null
  return normalizeSiteUrl(storage.getItem(LAST_SITE_KEY))
}

export function writeLastSiteUrl(url: string): void {
  const storage = getLocalStorage()
  const normalized = normalizeSiteUrl(url)
  if (!storage || !normalized) return
  storage.setItem(LAST_SITE_KEY, normalized)
}

/**
 * Prefill order: ?url= → last scanned/imported site → brand import field.
 */
export function resolveScanPrefillUrl(options: {
  queryUrl?: string | null
  lastSiteUrl?: string | null
  brandImportUrl?: string | null
}): string {
  return (
    normalizeSiteUrl(options.queryUrl)
    ?? normalizeSiteUrl(options.lastSiteUrl)
    ?? normalizeSiteUrl(options.brandImportUrl)
    ?? ''
  )
}
