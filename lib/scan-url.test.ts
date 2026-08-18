import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  canScanWebsiteUrl,
  normalizeSiteUrl,
  readLastSiteUrl,
  resolveScanPrefillUrl,
  writeLastSiteUrl,
} from './scan-url'

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

describe('normalizeSiteUrl / canScanWebsiteUrl', () => {
  it('rejects empty and placeholder URLs', () => {
    expect(normalizeSiteUrl('')).toBeNull()
    expect(normalizeSiteUrl('   ')).toBeNull()
    expect(normalizeSiteUrl('https://example.com')).toBeNull()
    expect(normalizeSiteUrl('https://www.example.com/')).toBeNull()
    expect(canScanWebsiteUrl('https://example.com')).toBe(false)
  })

  it('accepts a real site and adds https when missing', () => {
    expect(normalizeSiteUrl('espaceergo.com')).toBe('https://espaceergo.com/')
    expect(canScanWebsiteUrl('https://espaceergo.com/')).toBe(true)
  })
})

describe('resolveScanPrefillUrl', () => {
  it('prefers ?url= over last site and brand import', () => {
    expect(
      resolveScanPrefillUrl({
        queryUrl: 'https://espaceergo.com/',
        lastSiteUrl: 'https://old.example.org',
        brandImportUrl: 'https://brand.example.org',
      }),
    ).toBe('https://espaceergo.com/')
  })

  it('falls back to last site, then imported brand', () => {
    expect(
      resolveScanPrefillUrl({
        queryUrl: '',
        lastSiteUrl: 'https://last.site/',
        brandImportUrl: 'https://brand.site/',
      }),
    ).toBe('https://last.site/')
    expect(
      resolveScanPrefillUrl({
        queryUrl: 'https://example.com',
        lastSiteUrl: '',
        brandImportUrl: 'https://brand.site/',
      }),
    ).toBe('https://brand.site/')
  })
})

describe('last site storage', () => {
  beforeEach(() => {
    vi.stubGlobal('window', { localStorage: createMemoryStorage() })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('remembers a scanned site and ignores placeholders', () => {
    writeLastSiteUrl('https://espaceergo.com/')
    writeLastSiteUrl('https://example.com')
    expect(readLastSiteUrl()).toBe('https://espaceergo.com/')
  })
})
