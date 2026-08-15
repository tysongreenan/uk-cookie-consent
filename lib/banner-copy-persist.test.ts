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
    const copy = vi.fn().mockResolvedValue(undefined)

    const result = await persistThenCopySnippet({ persist, copy })

    expect(persist).toHaveBeenCalledOnce()
    expect(copy).toHaveBeenCalledWith('new-banner-id')
    expect(result).toEqual({ bannerId: 'new-banner-id', persisted: true })
  })

  it('does not create a second banner when one already exists', async () => {
    const persist = vi.fn()
    const copy = vi.fn().mockResolvedValue(undefined)

    const result = await persistThenCopySnippet({
      bannerId: 'existing-id',
      persist,
      copy,
    })

    expect(persist).not.toHaveBeenCalled()
    expect(copy).toHaveBeenCalledWith('existing-id')
    expect(result).toEqual({ bannerId: 'existing-id', persisted: false })
  })

  it('does not copy when persist fails', async () => {
    const persist = vi.fn().mockResolvedValue(null)
    const copy = vi.fn()

    await expect(persistThenCopySnippet({ persist, copy })).rejects.toThrow(/must be saved/i)
    expect(copy).not.toHaveBeenCalled()
  })
})
