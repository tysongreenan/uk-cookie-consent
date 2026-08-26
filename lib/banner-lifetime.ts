/** Durable "this account has already created a banner" — used to avoid reminting after delete-last. */

export function everCreatedBannerStorageKey(userId: string): string {
  return `cookie_banner_has_ever_created:${userId}`
}

type ReadableStorage = Pick<Storage, 'getItem'>
type WritableStorage = Pick<Storage, 'setItem'>

function defaultStorage(): Storage | null {
  return typeof window !== 'undefined' ? window.localStorage : null
}

export function readHasEverCreatedBanner(
  userId?: string | null,
  storage?: ReadableStorage | null,
): boolean {
  if (!userId) return false
  const store = storage ?? defaultStorage()
  if (!store) return false
  return store.getItem(everCreatedBannerStorageKey(userId)) === '1'
}

export function markHasEverCreatedBanner(
  userId?: string | null,
  storage?: WritableStorage | null,
): void {
  if (!userId) return
  const store = storage ?? defaultStorage()
  if (!store) return
  store.setItem(everCreatedBannerStorageKey(userId), '1')
}
