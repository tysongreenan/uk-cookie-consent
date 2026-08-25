import { describe, expect, it } from 'vitest'
import {
  everCreatedBannerStorageKey,
  markHasEverCreatedBanner,
  readHasEverCreatedBanner,
} from './banner-lifetime'

function memoryStorage(initial: Record<string, string> = {}) {
  const data = { ...initial }
  return {
    getItem: (key: string) => data[key] ?? null,
    setItem: (key: string, value: string) => {
      data[key] = value
    },
    data,
  }
}

describe('hasEverCreatedBanner', () => {
  it('is false until a banner is created or deleted', () => {
    const storage = memoryStorage()
    expect(readHasEverCreatedBanner('user-1', storage)).toBe(false)
  })

  it('is scoped per user', () => {
    const storage = memoryStorage()
    markHasEverCreatedBanner('user-1', storage)
    expect(readHasEverCreatedBanner('user-1', storage)).toBe(true)
    expect(readHasEverCreatedBanner('user-2', storage)).toBe(false)
    expect(storage.data[everCreatedBannerStorageKey('user-1')]).toBe('1')
  })
})
