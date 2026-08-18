import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  clearPendingBannerConfig,
  postPayBuilderHref,
  readPendingBannerConfig,
  writePendingBannerConfig,
} from './builder-draft'
import type { BannerConfig } from '@/types'

function createMemoryStorage(): Storage {
  const map = new Map<string, string>()
  return {
    get length() {
      return map.size
    },
    clear: () => map.clear(),
    getItem: (key: string) => (map.has(key) ? map.get(key)! : null),
    setItem: (key: string, value: string) => {
      map.set(key, String(value))
    },
    removeItem: (key: string) => {
      map.delete(key)
    },
    key: (index: number) => Array.from(map.keys())[index] ?? null,
  }
}

describe('pending banner draft', () => {
  beforeEach(() => {
    vi.stubGlobal('window', { localStorage: createMemoryStorage() })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('round-trips unsaved builder state', () => {
    const draft = { name: 'Espace Ergo' } as BannerConfig
    writePendingBannerConfig(draft)
    expect(readPendingBannerConfig()?.name).toBe('Espace Ergo')
    clearPendingBannerConfig()
    expect(readPendingBannerConfig()).toBeNull()
  })
})

describe('postPayBuilderHref', () => {
  it('lands a just-paid user with no banners in the builder', () => {
    expect(postPayBuilderHref({})).toBe('/dashboard/builder?from=upgrade')
    expect(postPayBuilderHref({ siteUrl: 'https://espaceergo.com/' })).toBe(
      '/dashboard/builder?from=upgrade&url=https%3A%2F%2Fespaceergo.com%2F',
    )
  })

  it('opens the installer when a banner already exists', () => {
    expect(postPayBuilderHref({ existingBannerId: 'banner-1' })).toBe(
      '/dashboard/builder?id=banner-1&tab=code&from=upgrade',
    )
  })
})
