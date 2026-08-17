import { describe, expect, it, vi } from 'vitest'
import { needsBannerPersistBeforeCopy, persistThenCopySnippet } from './banner-copy-persist'

describe('needsBannerPersistBeforeCopy', () => {
  it('requires a save when the banner has never been persisted', () => {
    expect(needsBannerPersistBeforeCopy(undefined)).toBe(true)
    expect(needsBannerPersistBeforeCopy(null)).toBe(true)
    expect(needsBannerPersistBeforeCopy('')).toBe(true)
  })

  it('skips save when a banner id already exists', () => {
    expect(needsBannerPersistBeforeCopy('banner-123')).toBe(false)
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

  it('rejects when persist fails, so nothing is written to the clipboard', async () => {
    const persist = vi.fn().mockResolvedValue(null)
    const copy = vi.fn(async (idPromise: Promise<string>) => {
      // Mirrors the real callers: the clipboard write awaits the id and
      // therefore fails alongside the save.
      await idPromise
    })

    await expect(persistThenCopySnippet({ persist, copy })).rejects.toThrow(/must be saved/i)
  })
})
