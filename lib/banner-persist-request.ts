/**
 * Create vs update for builder persist. The current draft's id is the only
 * signal — other banners the user already owns must not force a PUT or skip
 * the create that Copy / Save Draft needs on Create New Banner.
 */
export function resolveBannerPersistRequest(currentBannerId?: string | null): {
  method: 'POST' | 'PUT'
  url: string
} {
  if (!currentBannerId) {
    return { method: 'POST', url: '/api/banners/simple' }
  }
  return { method: 'PUT', url: `/api/banners/simple/${currentBannerId}` }
}

export function savedBannerIdFromPersistResponse(options: {
  currentBannerId?: string | null
  responseBannerId?: string | null
}): string | null {
  return options.responseBannerId || options.currentBannerId || null
}

export const CREATE_NEW_BANNER_HREF = '/dashboard/builder?new=1'

export function isCreateNewBannerQuery(newDraft?: string | null): boolean {
  return newDraft === '1' || newDraft === 'true'
}

/** True when the builder URL is a new draft, not an existing banner. */
export function isNewBuilderDraft(options: {
  id?: string | null
  edit?: string | null
  newDraft?: string | null
}): boolean {
  if (isCreateNewBannerQuery(options.newDraft)) return true
  return !options.id && !options.edit
}

/**
 * Banner id that Copy / persist should use. Create New Banner (`?new=1` or a
 * bare builder URL) must not reuse leftover React state from a previous `?id=`
 * when Next.js keeps the builder page mounted. After this draft is persisted,
 * pass `createdThisDraftId` so a second Copy does not POST again before the
 * URL updates to `?id=`.
 */
export function activeBannerIdForBuilder(options: {
  urlId?: string | null
  urlEdit?: string | null
  urlNew?: string | null
  stateBannerId?: string | null
  createdThisDraftId?: string | null
}): string | null {
  if (
    isNewBuilderDraft({
      id: options.urlId,
      edit: options.urlEdit,
      newDraft: options.urlNew,
    })
  ) {
    return options.createdThisDraftId || null
  }
  return options.stateBannerId || options.urlId || options.urlEdit || null
}

export class BannerPersistError extends Error {
  readonly upgradeRequired: boolean

  constructor(message: string, upgradeRequired = false) {
    super(message)
    this.name = 'BannerPersistError'
    this.upgradeRequired = upgradeRequired
  }
}
