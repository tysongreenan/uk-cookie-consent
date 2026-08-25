import { describe, expect, it, vi, beforeEach } from 'vitest'
import {
  awaitDefaultBannerMint,
  coordinateBannerCreate,
  ensureDefaultBanner,
  persistWithSharedCreateLock,
  resetDefaultBannerMintLock,
  shouldMintDefaultBanner,
} from './ensure-default-banner'
import { BannerPersistError } from './banner-persist-request'
import {
  activeBannerIdForBuilder,
  resolveBannerPersistRequest,
  shouldWipeNewDraftIdentity,
} from './banner-persist-request'

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

  it('does not remint after the user deleted their last banner', () => {
    expect(
      shouldMintDefaultBanner({
        hasQueryBannerId: false,
        existingBannerCount: 0,
        hasConsentBanner: true,
        hasEverCreatedBanner: true,
      }),
    ).toBe(false)
  })

  it('does not mint on Create New Banner (?new=1)', () => {
    expect(
      shouldMintDefaultBanner({
        hasQueryBannerId: false,
        existingBannerCount: 0,
        hasConsentBanner: true,
        isCreateNewBanner: true,
      }),
    ).toBe(false)
  })

  it('does not mint when this draft already has an in-memory id', () => {
    expect(
      shouldMintDefaultBanner({
        hasQueryBannerId: false,
        existingBannerCount: 0,
        hasConsentBanner: true,
        hasInMemoryDraftId: true,
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

  it('does not remint after delete-last even when the list is empty', async () => {
    const fetchImpl = vi.fn()
    await expect(
      ensureDefaultBanner({
        config: { name: 'My Cookie Banner' },
        hasQueryBannerId: false,
        hasConsentBanner: true,
        hasEverCreatedBanner: true,
        fetchImpl: fetchImpl as unknown as typeof fetch,
      }),
    ).resolves.toBeNull()
    expect(fetchImpl).not.toHaveBeenCalled()
  })
})

describe('mint vs persist shared create lock', () => {
  beforeEach(() => {
    resetDefaultBannerMintLock()
  })

  it('persist PUTs after mint wins the lock — only one POST', async () => {
    let releaseMint!: (id: string) => void
    const mintGate = new Promise<string>((resolve) => {
      releaseMint = resolve
    })

    const mint = coordinateBannerCreate(async () => mintGate)
    const create = vi.fn(async () => 'persist-should-not-post')
    const update = vi.fn(async (id: string) => `put:${id}`)

    const persist = persistWithSharedCreateLock({
      currentBannerId: null,
      create,
      update,
    })

    releaseMint('minted-id')
    await expect(mint).resolves.toEqual({ id: 'minted-id', createdHere: true })
    await expect(persist).resolves.toBe('put:minted-id')
    expect(create).not.toHaveBeenCalled()
    expect(update).toHaveBeenCalledWith('minted-id')
    expect(resolveBannerPersistRequest('minted-id').method).toBe('PUT')
  })

  it('mint joins persist when Copy/Save claims the lock first — only one create', async () => {
    let releasePersist!: (id: string) => void
    const persistGate = new Promise<string>((resolve) => {
      releasePersist = resolve
    })
    const create = vi.fn(async () => persistGate)
    const update = vi.fn(async (id: string) => `put:${id}`)

    const persist = persistWithSharedCreateLock({
      currentBannerId: null,
      create,
      update,
    })
    const mint = ensureDefaultBanner({
      config: { name: 'My Cookie Banner' },
      hasQueryBannerId: false,
      hasConsentBanner: true,
      fetchImpl: vi.fn() as unknown as typeof fetch,
    })

    releasePersist('persist-id')
    await expect(persist).resolves.toBe('persist-id')
    await expect(mint).resolves.toBe('persist-id')
    expect(create).toHaveBeenCalledOnce()
    expect(update).not.toHaveBeenCalled()
  })

  it('Create New Banner leftover id still POSTs a new banner after the mint lock is reset', async () => {
    await coordinateBannerCreate(async () => 'banner-1')
    resetDefaultBannerMintLock()

    const leftoverFirstBannerId = 'banner-1'
    const activeId = activeBannerIdForBuilder({
      urlNew: '1',
      stateBannerId: leftoverFirstBannerId,
      createdThisDraftId: null,
    })
    expect(activeId).toBeNull()
    expect(resolveBannerPersistRequest(activeId).method).toBe('POST')

    const create = vi.fn(async () => 'banner-2')
    const update = vi.fn()
    await expect(
      persistWithSharedCreateLock({
        currentBannerId: activeId,
        create,
        update,
      }),
    ).resolves.toBe('banner-2')
    expect(create).toHaveBeenCalledOnce()
    expect(update).not.toHaveBeenCalled()
  })
})

describe('minted banner identity', () => {
  it('keeps the minted id on a bare builder when createdThisDraftId is set', () => {
    expect(
      activeBannerIdForBuilder({
        urlId: null,
        urlNew: null,
        stateBannerId: 'minted-id',
        createdThisDraftId: 'minted-id',
      }),
    ).toBe('minted-id')
    expect(shouldWipeNewDraftIdentity('minted-id', 'minted-id')).toBe(false)
    expect(resolveBannerPersistRequest('minted-id').method).toBe('PUT')
  })

  it('would wipe a minted id if createdThisDraftId is missing — mint must set it', () => {
    expect(
      activeBannerIdForBuilder({
        urlId: null,
        urlNew: null,
        stateBannerId: 'minted-id',
        createdThisDraftId: null,
      }),
    ).toBeNull()
    expect(shouldWipeNewDraftIdentity('minted-id', null)).toBe(true)
    expect(resolveBannerPersistRequest(null).method).toBe('POST')
  })
})

describe('persistWithSharedCreateLock errors', () => {
  beforeEach(() => {
    resetDefaultBannerMintLock()
  })

  it('propagates persist create errors and clears the lock', async () => {
    const error = new BannerPersistError('banner limit', true)
    await expect(
      persistWithSharedCreateLock({
        currentBannerId: null,
        create: async () => {
          throw error
        },
        update: async () => 'nope',
      }),
    ).rejects.toBe(error)

    const create = vi.fn(async () => 'recovered-id')
    await expect(
      persistWithSharedCreateLock({
        currentBannerId: null,
        create,
        update: async () => 'nope',
      }),
    ).resolves.toBe('recovered-id')
    expect(create).toHaveBeenCalledOnce()
  })
})
