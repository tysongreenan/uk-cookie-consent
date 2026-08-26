/**
 * Mint a SimpleBanners row on the first builder visit so Install can show a
 * real hosted snippet before the user clicks Save Draft.
 *
 * Uses POST /api/banners/simple only (never the dead /api/banners 410 path).
 * Persist and mint share one create lock so Copy/Save cannot POST a second row.
 */

import { BannerPersistError } from './banner-persist-request'

export function shouldMintDefaultBanner(options: {
  hasQueryBannerId: boolean
  existingBannerCount: number
  hasConsentBanner: boolean
  isCreateNewBanner?: boolean
  hasInMemoryDraftId?: boolean
  hasEverCreatedBanner?: boolean
}): boolean {
  if (options.hasQueryBannerId) return false
  if (options.isCreateNewBanner) return false
  if (options.hasInMemoryDraftId) return false
  // First-time empty only — never remint after the user deleted their last banner.
  if (options.hasEverCreatedBanner) return false
  if (options.existingBannerCount > 0) return false
  // Privacy-only accounts never opted into the cookie-banner product.
  if (!options.hasConsentBanner) return false
  return true
}

type FetchLike = typeof fetch

let inFlight: Promise<string | null> | null = null

/** Test-only: clear the shared create lock between cases. */
export function resetDefaultBannerMintLock(): void {
  inFlight = null
}

/** Await an in-flight first-visit mint / persist create. */
export function awaitDefaultBannerMint(): Promise<string | null> | null {
  return inFlight
}

export async function coordinateBannerCreate(
  create: () => Promise<string | null>,
): Promise<{ id: string | null; createdHere: boolean }> {
  if (inFlight) {
    try {
      const id = await inFlight
      return { id, createdHere: false }
    } catch {
      inFlight = null
    }
  }

  inFlight = (async () => {
    try {
      const id = await create()
      if (!id) inFlight = null
      return id
    } catch (error) {
      inFlight = null
      throw error
    }
  })()

  const id = await inFlight
  return { id, createdHere: true }
}

/**
 * Persist create vs update through the same lock mint uses. If mint already
 * started, wait and PUT. If persist starts first, mint joins this POST.
 */
export async function persistWithSharedCreateLock(options: {
  currentBannerId?: string | null
  create: () => Promise<string>
  update: (id: string) => Promise<string>
}): Promise<string> {
  if (options.currentBannerId) {
    return options.update(options.currentBannerId)
  }

  const { id, createdHere } = await coordinateBannerCreate(options.create)
  if (id && createdHere) return id
  if (id && !createdHere) return options.update(id)

  if (createdHere) {
    throw new BannerPersistError('Save did not return a banner id')
  }

  // Mint ran and declined (already had a banner / not first-time). Persist a new row.
  const retry = await coordinateBannerCreate(options.create)
  if (!retry.id) {
    throw new BannerPersistError('Save did not return a banner id')
  }
  if (!retry.createdHere) return options.update(retry.id)
  return retry.id
}

export async function ensureDefaultBanner(options: {
  config: { name?: string }
  hasQueryBannerId: boolean
  hasConsentBanner: boolean
  isCreateNewBanner?: boolean
  hasInMemoryDraftId?: boolean
  hasEverCreatedBanner?: boolean
  headers?: Record<string, string>
  fetchImpl?: FetchLike
}): Promise<string | null> {
  if (
    !shouldMintDefaultBanner({
      hasQueryBannerId: options.hasQueryBannerId,
      existingBannerCount: 0,
      hasConsentBanner: options.hasConsentBanner,
      isCreateNewBanner: options.isCreateNewBanner,
      hasInMemoryDraftId: options.hasInMemoryDraftId,
      hasEverCreatedBanner: options.hasEverCreatedBanner,
    })
  ) {
    return null
  }

  try {
    const { id } = await coordinateBannerCreate(async () => {
      const fetchFn = options.fetchImpl ?? fetch
      const listRes = await fetchFn('/api/banners/simple')
      if (!listRes.ok) return null

      const listData = (await listRes.json()) as { banners?: unknown[] }
      const existingBannerCount = Array.isArray(listData.banners) ? listData.banners.length : 0
      if (
        !shouldMintDefaultBanner({
          hasQueryBannerId: options.hasQueryBannerId,
          existingBannerCount,
          hasConsentBanner: options.hasConsentBanner,
          isCreateNewBanner: options.isCreateNewBanner,
          hasInMemoryDraftId: options.hasInMemoryDraftId,
          hasEverCreatedBanner: options.hasEverCreatedBanner,
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
    })
    return id
  } catch {
    return null
  }
}
