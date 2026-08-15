/**
 * Copying an install snippet for a banner that was never saved produces a
 * dead snippet (no banner_created, hosted URL has no id). Persist first.
 */
export function needsBannerPersistBeforeCopy(bannerId?: string | null): boolean {
  return !bannerId
}

export async function persistThenCopySnippet(options: {
  bannerId?: string | null
  persist: () => Promise<string | null>
  copy: (bannerId: string) => Promise<void>
}): Promise<{ bannerId: string; persisted: boolean }> {
  let bannerId = options.bannerId ?? null
  let persisted = false

  if (needsBannerPersistBeforeCopy(bannerId)) {
    bannerId = await options.persist()
    persisted = true
  }

  if (!bannerId) {
    throw new Error('Banner must be saved before the install snippet can be copied')
  }

  await options.copy(bannerId)
  return { bannerId, persisted }
}
