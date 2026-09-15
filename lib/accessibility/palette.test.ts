import { describe, expect, it } from 'vitest'
import { contrast } from './contrast'
import { buildPanelSurface, resolveA11yPanelLook } from './palette'

const SWATCHES = ['#111111', '#5f3838', '#23344e', '#3b82f6', '#f5e6d3', '#ffffff']

describe('buildPanelSurface', () => {
  it('keeps body copy and muted text at 4.5:1 on every generated surface', () => {
    for (const bg of SWATCHES) {
      const surface = buildPanelSurface(bg, '#3b82f6')
      for (const face of [surface.bg, surface.card, surface.card2]) {
        expect(contrast(surface.text, face), `${bg} text on ${face}`).toBeGreaterThanOrEqual(4.5)
        expect(contrast(surface.muted, face), `${bg} muted on ${face}`).toBeGreaterThanOrEqual(4.5)
      }
      expect(contrast(surface.border, surface.card)).toBeGreaterThanOrEqual(3)
    }
  })
})

describe('resolveA11yPanelLook', () => {
  it('accent mode only sets chrome, not a surface', () => {
    const look = resolveA11yPanelLook({
      colorMode: 'accent',
      theme: 'auto',
      accent: '#5f3838',
      bannerBg: '#ffffff',
      bannerText: '#111111',
    })
    expect(look.surface).toBeUndefined()
    expect(look.headerBg).toBe('#5f3838')
    expect(look.headerFg).toBe('#ffffff')
  })

  it('full mode on a dark brand colour paints the body the same colour', () => {
    const look = resolveA11yPanelLook({
      colorMode: 'full',
      theme: 'auto',
      accent: '#5f3838',
      bannerBg: '#ffffff',
      bannerText: '#111111',
    })
    expect(look.surface?.bg).toBe('#5f3838')
    expect(look.headerBg).toBe('#5f3838')
    expect(look.accent).toBe('#ffffff')
  })
})
