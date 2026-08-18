import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { isJustPaid, markJustPaid, shouldShowUpgradeCta } from './just-paid'

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

describe('shouldShowUpgradeCta', () => {
  beforeEach(() => {
    vi.stubGlobal('window', { sessionStorage: createMemoryStorage() })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('hides the upgrade CTA for paid plans', () => {
    expect(shouldShowUpgradeCta('pro_annual')).toBe(false)
    expect(shouldShowUpgradeCta('pro_lifetime')).toBe(false)
    expect(shouldShowUpgradeCta('pro')).toBe(false)
  })

  it('shows the upgrade CTA for free users who have not just paid', () => {
    expect(shouldShowUpgradeCta('free')).toBe(true)
    expect(shouldShowUpgradeCta(undefined)).toBe(true)
  })

  it('hides the upgrade CTA after checkout even if the session still says free', () => {
    markJustPaid()
    expect(isJustPaid()).toBe(true)
    expect(shouldShowUpgradeCta('free')).toBe(false)
  })
})
