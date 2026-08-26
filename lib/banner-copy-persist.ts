/**
 * Copying an install snippet for a banner that was never saved produces a
 * dead snippet (no banner_created, hosted URL has no id). Persist first.
 *
 * `existingBannerCount` is accepted so callers can pass it, but it must not
 * change the result. Create New Banner is an unsaved draft even when the
 * account already has other banners.
 */
export function needsBannerPersistBeforeCopy(
  bannerId?: string | null,
  _existingBannerCount?: number,
): boolean {
  return !bannerId
}

/**
 * `copy` is invoked immediately — inside the original user gesture — with a
 * promise of the (possibly just-persisted) banner id. Pair it with
 * `copyToClipboard(() => idPromise.then(...))` so Safari's clipboard access
 * survives the async save; a plain `await persist(); copy(id)` does not.
 */
export async function persistThenCopySnippet(options: {
  bannerId?: string | null
  persist: () => Promise<string | null>
  copy: (bannerId: Promise<string>) => Promise<void>
}): Promise<{ bannerId: string; persisted: boolean }> {
  const persisted = needsBannerPersistBeforeCopy(options.bannerId)
  const idPromise = persisted
    ? options.persist().then((id) => {
        if (!id) {
          throw new Error('Banner must be saved before the install snippet can be copied')
        }
        return id
      })
    : Promise.resolve(options.bannerId as string)

  await options.copy(idPromise)
  return { bannerId: await idPromise, persisted }
}
