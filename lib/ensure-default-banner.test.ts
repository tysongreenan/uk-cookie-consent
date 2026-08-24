import { describe, expect, it, vi, beforeEach } from 'vitest'
import {
  awaitDefaultBannerMint,
  ensureDefaultBanner,
  resetDefaultBannerMintLock,
  shouldMintDefaultBanner,
} from './ensure-default-banner'

describe('shouldMintDefaultBanner', () => {
  it('mints only when the builder has no id and the workspace has zero banners', () => {
    expect(
      shouldMintDefaultBanner({
        hasQueryBannerId: false,
        existingBannerCount: 0,
        hasConsentBanner: true,
      }),
    ).toBe(true)
  })

  it('does not mint when editing an existing banner', () => {
    expect(
      shouldMintDefaultBanner({
        hasQueryBannerId: true,
        existingBannerCount: 0,
        hasConsentBanner: true,
      }),
    ).toBe(false)
  })

  it('does not mint when the workspace already has banners', () => {
    expect(
      shouldMintDefaultBanner({
        hasQueryBannerId: false,
        existingBannerCount: 1,
        hasConsentBanner: true,
      }),
    ).toBe(false)
  })

  it('does not mint for privacy-only product accounts', () => {
    expect(
      shouldMintDefaultBanner({
        hasQueryBannerId: false,
        existingBannerCount: 0,
        hasConsentBanner: false,
      }),
    ).toBe(false)
  })
})

describe('ensureDefaultBanner', () => {
  beforeEach(() => {
    resetDefaultBannerMintLock()
  })

  it('POSTs /api/banners/simple once when the list is empty', async () => {
    const fetchImpl = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input)
      if (url === '/api/banners/simple' && !init?.method) {
        return new Response(JSON.stringify({ banners: [] }), { status: 200 })
      }
      expect(init?.method).toBe('POST')
      const body = JSON.parse(String(init?.body))
      expect(body.source).toBe('auto_mint')
      expect(body.name).toBe('My Cookie Banner')
      return new Response(JSON.stringify({ bannerId: 'minted-id' }), { status: 200 })
    })

    const first = ensureDefaultBanner({
      config: { name: 'My Cookie Banner' },
      hasQueryBannerId: false,
      hasConsentBanner: true,
      fetchImpl: fetchImpl as unknown as typeof fetch,
    })
    const second = ensureDefaultBanner({
      config: { name: 'My Cookie Banner' },
      hasQueryBannerId: false,
      hasConsentBanner: true,
      fetchImpl: fetchImpl as unknown as typeof fetch,
    })

    await expect(first).resolves.toBe('minted-id')
    await expect(second).resolves.toBe('minted-id')
    const posts = fetchImpl.mock.calls.filter(([, init]) => init?.method === 'POST')
    expect(posts).toHaveLength(1)
    await expect(awaitDefaultBannerMint()).resolves.toBe('minted-id')
  })

  it('does not create when the workspace already has a banner', async () => {
    const fetchImpl = vi.fn(async () => {
      return new Response(JSON.stringify({ banners: [{ id: 'existing' }] }), { status: 200 })
    })

    await expect(
      ensureDefaultBanner({
        config: { name: 'My Cookie Banner' },
        hasQueryBannerId: false,
        hasConsentBanner: true,
        fetchImpl: fetchImpl as unknown as typeof fetch,
      }),
    ).resolves.toBeNull()

    expect(fetchImpl).toHaveBeenCalledTimes(1)
  })

  it('does not create for privacy-only accounts', async () => {
    const fetchImpl = vi.fn()
    await expect(
      ensureDefaultBanner({
        config: { name: 'My Cookie Banner' },
        hasQueryBannerId: false,
        hasConsentBanner: false,
        fetchImpl: fetchImpl as unknown as typeof fetch,
      }),
    ).resolves.toBeNull()
    expect(fetchImpl).not.toHaveBeenCalled()
  })
})
