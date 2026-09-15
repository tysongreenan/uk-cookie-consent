import { describe, expect, it } from 'vitest'
import { accentInk, contrast } from '../src/dom'

/**
 * WCAG 2.2 AA: 4.5:1 for 13px body copy, 3:1 for UI component boundaries
 * (1.4.3 / 1.4.11). Keep these hexes in sync with panel.css.
 */
const light = { bg: '#eef0f6', card: '#ffffff', card2: '#f7f8fb', text: '#17181c', muted: '#4a5568', border: '#5c6578' }
const dark = { bg: '#15171d', card: '#1f222b', card2: '#262a35', text: '#f3f4f8', muted: '#c5cad8', border: '#8b93a8' }

describe('menu colour tokens meet WCAG 2.2 AA', () => {
  it('light theme text is 4.5:1 on every surface', () => {
    for (const surface of [light.bg, light.card, light.card2]) {
      expect(contrast(light.text, surface)).toBeGreaterThanOrEqual(4.5)
      expect(contrast(light.muted, surface)).toBeGreaterThanOrEqual(4.5)
    }
  })

  it('dark theme text is 4.5:1 on every surface', () => {
    for (const surface of [dark.bg, dark.card, dark.card2]) {
      expect(contrast(dark.text, surface)).toBeGreaterThanOrEqual(4.5)
      expect(contrast(dark.muted, surface)).toBeGreaterThanOrEqual(4.5)
    }
  })

  it('control borders and switch tracks hit 3:1 (non-text contrast)', () => {
    expect(contrast(light.border, light.card)).toBeGreaterThanOrEqual(3)
    expect(contrast(light.border, light.card2)).toBeGreaterThanOrEqual(3)
    expect(contrast(dark.border, dark.card)).toBeGreaterThanOrEqual(3)
    expect(contrast(dark.border, dark.card2)).toBeGreaterThanOrEqual(3)
  })

  it('white or black header text is 4.5:1 on the Dairy Farmers navy accent', () => {
    const accent = '#23344e'
    const ink = contrast('#ffffff', accent) >= 4.5 ? '#ffffff' : '#111111'
    expect(contrast(ink, accent)).toBeGreaterThanOrEqual(4.5)
  })

  it('accentInk keeps section labels at 4.5:1 on light and dark cards', () => {
    const navy = '#23344e'
    expect(contrast(accentInk(navy, light.card2), light.card2)).toBeGreaterThanOrEqual(4.5)
    expect(contrast(accentInk(navy, dark.card2), dark.card2)).toBeGreaterThanOrEqual(4.5)
  })
})
