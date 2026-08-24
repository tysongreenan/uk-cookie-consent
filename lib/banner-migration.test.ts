import { describe, expect, it } from 'vitest'
import {
  CURRENT_BANNER_VERSION,
  needsMigration,
  shouldShowGeneratorUpdateNotice,
} from './banner-migration'

describe('needsMigration', () => {
  it('does not fire for in-memory defaults at the current version', () => {
    expect(needsMigration({ version: CURRENT_BANNER_VERSION })).toBe(false)
  })

  it('fires for older persisted banners that still need a republish', () => {
    expect(needsMigration({ version: '2.1.0' })).toBe(true)
    expect(needsMigration({ version: '1.0.0' })).toBe(true)
    expect(needsMigration({})).toBe(true)
  })
})

describe('shouldShowGeneratorUpdateNotice', () => {
  it('hides the amber notice when the banner is unsaved', () => {
    expect(
      shouldShowGeneratorUpdateNotice({
        bannerId: undefined,
        config: { version: '2.1.0' },
      }),
    ).toBe(false)
  })

  it('hides the amber notice for a brand-new hosted banner at the current version', () => {
    expect(
      shouldShowGeneratorUpdateNotice({
        bannerId: 'new-banner',
        config: { version: CURRENT_BANNER_VERSION },
      }),
    ).toBe(false)
  })

  it('shows the amber notice for an old real banner that needs migration', () => {
    expect(
      shouldShowGeneratorUpdateNotice({
        bannerId: 'old-banner',
        config: { version: '2.1.0' },
      }),
    ).toBe(true)
  })
})
