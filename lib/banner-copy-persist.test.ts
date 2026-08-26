import { describe, expect, it, vi } from 'vitest'
import { needsBannerPersistBeforeCopy, persistThenCopySnippet } from './banner-copy-persist'
import {
  activeBannerIdForBuilder,
  resolveBannerPersistRequest,
} from './banner-persist-request'

describe('needsBannerPersistBeforeCopy', () => {
  it('requires a save when the banner has never been persisted', () => {
    expect(needsBannerPersistBeforeCopy(undefined)).toBe(true)
    expect(needsBannerPersistBeforeCopy(null)).toBe(true)
    expect(needsBannerPersistBeforeCopy('')).toBe(true)
  })

  it('skips save when a banner id already exists', () => {
    expect(needsBannerPersistBeforeCopy('banner-123')).toBe(false)
    expect(needsBannerPersistBeforeCopy('banner-123', 4)).toBe(false)
  })

  it('still requires a save on Create New Banner when other banners exist', () => {
    expect(needsBannerPersistBeforeCopy(undefined, 1)).toBe(true)
    expect(needsBannerPersistBeforeCopy(null, 3)).toBe(true)
    expect(needsBannerPersistBeforeCopy('', 1)).toBe(true)
  })
})

describe('persistThenCopySnippet', () => {
  it('saves first on an unsaved banner, then copies the hosted snippet', async () => {
    const persist = vi.fn().mockResolvedValue('new-banner-id')
    const copy = vi.fn(async (idPromise: Promise<string>) => {
      await expect(idPromise).resolves.toBe('new-banner-id')
    })

    const result = await persistThenCopySnippet({ persist, copy })

    expect(persist).toHaveBeenCalledOnce()
    expect(copy).toHaveBeenCalledOnce()
    expect(result).toEqual({ bannerId: 'new-banner-id', persisted: true })
  })

  it('does not create a second banner when one already exists', async () => {
    const persist = vi.fn()
    const copy = vi.fn(async (idPromise: Promise<string>) => {
      await expect(idPromise).resolves.toBe('existing-id')
    })

    const result = await persistThenCopySnippet({
      bannerId: 'existing-id',
      persist,
      copy,
    })

    expect(persist).not.toHaveBeenCalled()
    expect(result).toEqual({ bannerId: 'existing-id', persisted: false })
  })

  it('starts the copy inside the user gesture, before the save resolves', async () => {
    let saveResolved = false
    let copyStarted = false
    const persist = vi.fn(
      () =>
        new Promise<string>((resolve) => {
          setTimeout(() => {
            saveResolved = true
            resolve('new-banner-id')
          }, 0)
        }),
    )
    const copy = vi.fn(async (idPromise: Promise<string>) => {
      copyStarted = true
      expect(saveResolved).toBe(false)
      await idPromise
    })

    await persistThenCopySnippet({ persist, copy })
    expect(copyStarted).toBe(true)
    expect(saveResolved).toBe(true)
  })

  it('saves then copies on Create New Banner after a first banner already exists', async () => {
    const persist = vi.fn().mockResolvedValue('second-banner-id')
    const copy = vi.fn(async (idPromise: Promise<string>) => {
      await expect(idPromise).resolves.toBe('second-banner-id')
    })

    const result = await persistThenCopySnippet({ persist, copy })

    expect(persist).toHaveBeenCalledOnce()
    expect(copy).toHaveBeenCalledOnce()
    expect(result).toEqual({ bannerId: 'second-banner-id', persisted: true })
  })

  it('rejects when persist fails, so nothing is written to the clipboard', async () => {
    const persist = vi.fn().mockResolvedValue(null)
    const copy = vi.fn(async (idPromise: Promise<string>) => {
      // Mirrors the real callers: the clipboard write awaits the id and
      // therefore fails alongside the save.
      await idPromise
    })

    await expect(persistThenCopySnippet({ persist, copy })).rejects.toThrow(/must be saved/i)
  })

  it('propagates a real persist error instead of claiming the banner must be saved', async () => {
    const persist = vi.fn().mockRejectedValue(
      new Error("You've reached the 1 banner limit on the Free plan. Upgrade to Pro for unlimited banners."),
    )
    const copy = vi.fn(async (idPromise: Promise<string>) => {
      await idPromise
    })

    try {
      await persistThenCopySnippet({ persist, copy })
      throw new Error('expected persistThenCopySnippet to reject')
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
      expect((error as Error).message).toMatch(/banner limit/i)
      expect((error as Error).message).not.toMatch(/must be saved/i)
    }
  })

  it('first unsaved Copy still persists and copies', async () => {
    const activeId = activeBannerIdForBuilder({})
    expect(needsBannerPersistBeforeCopy(activeId)).toBe(true)
    expect(resolveBannerPersistRequest(activeId)).toEqual({
      method: 'POST',
      url: '/api/banners/simple',
    })

    const persist = vi.fn().mockResolvedValue('first-banner-id')
    const result = await persistThenCopySnippet({
      bannerId: activeId,
      persist,
      copy: async (idPromise) => {
        await expect(idPromise).resolves.toBe('first-banner-id')
      },
    })

    expect(persist).toHaveBeenCalledOnce()
    expect(result).toEqual({ bannerId: 'first-banner-id', persisted: true })
  })

  it('Create New Banner then Copy creates a second banner and does not throw', async () => {
    const leftoverFirstBannerId = 'banner-1'
    const activeId = activeBannerIdForBuilder({
      urlNew: '1',
      stateBannerId: leftoverFirstBannerId,
      createdThisDraftId: null,
    })

    expect(activeId).toBeNull()
    expect(needsBannerPersistBeforeCopy(activeId, 1)).toBe(true)
    expect(resolveBannerPersistRequest(activeId).method).toBe('POST')

    const persist = vi.fn().mockResolvedValue('banner-2')
    const result = await persistThenCopySnippet({
      bannerId: activeId,
      persist,
      copy: async (idPromise) => {
        await expect(idPromise).resolves.toBe('banner-2')
      },
    })

    expect(persist).toHaveBeenCalledOnce()
    expect(result).toEqual({ bannerId: 'banner-2', persisted: true })
  })

  it('Copy after mint PUTs the minted id instead of POSTing a second banner', async () => {
    const mintedId = activeBannerIdForBuilder({
      urlId: null,
      urlNew: null,
      stateBannerId: 'minted-id',
      createdThisDraftId: 'minted-id',
    })
    expect(mintedId).toBe('minted-id')
    expect(needsBannerPersistBeforeCopy(mintedId)).toBe(false)
    expect(resolveBannerPersistRequest(mintedId)).toEqual({
      method: 'PUT',
      url: '/api/banners/simple/minted-id',
    })

    const persist = vi.fn()
    const result = await persistThenCopySnippet({
      bannerId: mintedId,
      persist,
      copy: async (idPromise) => {
        await expect(idPromise).resolves.toBe('minted-id')
      },
    })

    expect(persist).not.toHaveBeenCalled()
    expect(result).toEqual({ bannerId: 'minted-id', persisted: false })
  })
})
