/**
 * Mint a SimpleBanners row on the first builder visit so Install can show a
 * real hosted snippet before the user clicks Save Draft.
 *
 * Uses POST /api/banners/simple only (never the dead /api/banners 410 path).
 */

export function shouldMintDefaultBanner(options: {
  hasQueryBannerId: boolean
  existingBannerCount: number
  hasConsentBanner: boolean
}): boolean {
  if (options.hasQueryBannerId) return false
  if (options.existingBannerCount > 0) return false
  // Privacy-only accounts never opted into the cookie-banner product.
  if (!options.hasConsentBanner) return false
  return true
}

type FetchLike = typeof fetch

let inFlight: Promise<string | null> | null = null

/** Test-only: clear the double-mount lock between cases. */
export function resetDefaultBannerMintLock(): void {
  inFlight = null
}

/** Await an in-flight first-visit mint so Save Draft can PUT instead of POSTing a second row. */
export function awaitDefaultBannerMint(): Promise<string | null> | null {
  return inFlight
}

export async function ensureDefaultBanner(options: {
  config: { name?: string }
  hasQueryBannerId: boolean
  hasConsentBanner: boolean
  headers?: Record<string, string>
  fetchImpl?: FetchLike
}): Promise<string | null> {
  if (
    !shouldMintDefaultBanner({
      hasQueryBannerId: options.hasQueryBannerId,
      existingBannerCount: 0,
      hasConsentBanner: options.hasConsentBanner,
    })
  ) {
    return null
  }

  if (inFlight) return inFlight

  const fetchFn = options.fetchImpl ?? fetch

  inFlight = (async () => {
    try {
      const listRes = await fetchFn('/api/banners/simple')
      if (!listRes.ok) return null

      const listData = (await listRes.json()) as { banners?: unknown[] }
      const existingBannerCount = Array.isArray(listData.banners) ? listData.banners.length : 0
      if (
        !shouldMintDefaultBanner({
          hasQueryBannerId: options.hasQueryBannerId,
          existingBannerCount,
          hasConsentBanner: options.hasConsentBanner,
        })
      ) {
        return null
      }

      const createRes = await fetchFn('/api/banners/simple', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        body: JSON.stringify({
          name: options.config.name || 'My Cookie Banner',
          config: options.config,
          source: 'auto_mint',
        }),
      })
      if (!createRes.ok) return null

      const created = (await createRes.json()) as { bannerId?: string }
      return created.bannerId ?? null
    } catch {
      return null
    }
  })()

  const bannerId = await inFlight
  if (!bannerId) inFlight = null
  return bannerId
}
