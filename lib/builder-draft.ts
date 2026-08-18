import type { BannerConfig } from '@/types'

export const PENDING_BANNER_CONFIG_KEY = 'pendingBannerConfig'

function getLocalStorage(): Storage | null {
  if (typeof window === 'undefined') return null
  try {
    const storage = window.localStorage
    storage.getItem(PENDING_BANNER_CONFIG_KEY)
    return storage
  } catch {
    return null
  }
}

export function readPendingBannerConfig(): BannerConfig | null {
  const storage = getLocalStorage()
  const raw = storage?.getItem(PENDING_BANNER_CONFIG_KEY)
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') return null
    return parsed as BannerConfig
  } catch {
    return null
  }
}

export function writePendingBannerConfig(config: BannerConfig): void {
  const storage = getLocalStorage()
  if (!storage) return
  try {
    storage.setItem(PENDING_BANNER_CONFIG_KEY, JSON.stringify(config))
  } catch {
    // Private mode / quota
  }
}

export function clearPendingBannerConfig(): void {
  const storage = getLocalStorage()
  if (!storage) return
  storage.removeItem(PENDING_BANNER_CONFIG_KEY)
}

export function postPayBuilderHref(options: {
  existingBannerId?: string | null
  siteUrl?: string | null
}): string {
  if (options.existingBannerId) {
    return `/dashboard/builder?id=${encodeURIComponent(options.existingBannerId)}&tab=code&from=upgrade`
  }
  const params = new URLSearchParams({ from: 'upgrade' })
  if (options.siteUrl) params.set('url', options.siteUrl)
  return `/dashboard/builder?${params.toString()}`
}
