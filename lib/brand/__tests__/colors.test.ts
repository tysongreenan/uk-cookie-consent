import { describe, it, expect } from 'vitest'
import chroma from 'chroma-js'
import { buildColorSuggestions } from '@/lib/brand/colors'
import type { BrandColorCandidate } from '@/types'

function candidate(hex: string, score: number): BrandColorCandidate {
  const color = chroma(hex)
  const luminance = color.luminance()
  return {
    hex: hex.toLowerCase(),
    score,
    sources: ['stylesheet'],
    luminance,
    contrastOnWhite: chroma.contrast(hex, '#ffffff'),
    contrastOnBlack: chroma.contrast(hex, '#111111'),
    recommendedUsage: [],
    suggestedTextColor: chroma.contrast(hex, '#ffffff') >= chroma.contrast(hex, '#111111') ? '#ffffff' : '#111111',
  }
}

describe('buildColorSuggestions', () => {
  it('uses a neutral surface with the brand color on the button, not as the background', () => {
    // A sway.ca-like palette: vivid blue brand color, orange secondary,
    // white/dark structural neutrals
    const suggestions = buildColorSuggestions([
      candidate('#4d65ff', 100),
      candidate('#ff6b35', 60),
      candidate('#ffffff', 50),
      candidate('#111827', 40),
    ])

    // Background must be neutral — never the vivid brand color
    expect(suggestions.background).not.toBe('#4d65ff')
    const [, bgSat] = chroma(suggestions.background).hsl()
    expect(isNaN(bgSat) ? 0 : bgSat).toBeLessThan(0.25)
    // Brand color lands on the button
    expect(suggestions.button).toBe('#4d65ff')
    // Every text-bearing pairing passes WCAG AA
    expect(chroma.contrast(suggestions.text, suggestions.background)).toBeGreaterThanOrEqual(4.5)
    expect(chroma.contrast(suggestions.link, suggestions.background)).toBeGreaterThanOrEqual(4.5)
    expect(chroma.contrast(suggestions.buttonText, suggestions.button)).toBeGreaterThanOrEqual(3)
  })

  it('follows a dark site with a dark neutral surface', () => {
    const suggestions = buildColorSuggestions([
      candidate('#0a0a0a', 80),
      candidate('#22d3ee', 70),
    ])

    expect(chroma(suggestions.background).luminance()).toBeLessThan(0.2)
    expect(chroma.contrast(suggestions.text, suggestions.background)).toBeGreaterThanOrEqual(4.5)
    expect(chroma.contrast(suggestions.link, suggestions.background)).toBeGreaterThanOrEqual(4.5)
  })

  it('falls back to safe defaults when no colors were found', () => {
    const suggestions = buildColorSuggestions([])
    expect(chroma.contrast(suggestions.text, suggestions.background)).toBeGreaterThanOrEqual(4.5)
  })
})
