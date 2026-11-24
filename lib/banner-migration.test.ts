import { describe, expect, it } from 'vitest'
import {
  CURRENT_BANNER_VERSION,
  needsMigration,
  shouldShowGeneratorUpdateNotice,
  withBannerConfigDefaults,
  withCurrentBannerVersion,
} from './banner-migration'
import type { BannerConfig } from '@/types'

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

  it('hides the amber notice after mint/persist writes the current version', () => {
    const persisted = withCurrentBannerVersion({ name: 'My Cookie Banner' })
    expect(persisted.version).toBe(CURRENT_BANNER_VERSION)
    expect(persisted.version).not.toBe('2.1.0')
    expect(
      shouldShowGeneratorUpdateNotice({
        bannerId: 'minted-id',
        config: persisted,
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

describe('withCurrentBannerVersion', () => {
  it('is used for persist and Push Live instead of hardcoded 2.1.0', () => {
    expect(CURRENT_BANNER_VERSION).toBe('2.2.0')
    expect(withCurrentBannerVersion({ version: '2.1.0' }).version).toBe('2.2.0')
  })
})

describe('withBannerConfigDefaults', () => {
  const defaults = {
    name: 'My Cookie Banner',
    position: 'bottom',
    colors: { background: '#ffffff', text: '#1f2937', button: '#0f766e', buttonText: '#ffffff', link: '#0f766e' },
    layout: { borderRadius: 8, padding: 20, margin: 20 },
    behavior: { autoShow: true, showRejectButton: true },
    scripts: { strictlyNecessary: [], functionality: [], trackingPerformance: [], targetingAdvertising: [] },
  } as unknown as BannerConfig

  it('fills sections that a stored config does not have', () => {
    const merged = withBannerConfigDefaults(defaults, { version: CURRENT_BANNER_VERSION, name: 'Shop' })
    expect(merged.name).toBe('Shop')
    expect(merged.colors.background).toBe('#ffffff')
    expect(merged.layout.borderRadius).toBe(8)
    expect(merged.scripts.functionality).toEqual([])
  })

  it('keeps stored values and fills only the missing keys of a section', () => {
    const merged = withBannerConfigDefaults(defaults, {
      colors: { background: '#000000' },
      behavior: { autoShow: false },
    })
    expect(merged.colors.background).toBe('#000000')
    expect(merged.colors.button).toBe('#0f766e')
    expect(merged.behavior.autoShow).toBe(false)
    expect(merged.behavior.showRejectButton).toBe(true)
  })

  it('uses the default section when the stored section is not an object', () => {
    const merged = withBannerConfigDefaults(defaults, { colors: null, layout: 'full' })
    expect(merged.colors).toEqual(defaults.colors)
    expect(merged.layout).toEqual(defaults.layout)
  })

  it('returns the defaults for a missing config', () => {
    expect(withBannerConfigDefaults(defaults, null)).toBe(defaults)
  })
})
