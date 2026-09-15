// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from 'vitest'
import {
  applyProfile,
  cycleLevel,
  defaultPrefs,
  isDefault,
  loadPrefs,
  PROFILES,
  resetPrefs,
  savePrefs,
  setToggle,
  stepFont,
  STORAGE_KEY,
} from '../src/state'

beforeEach(() => localStorage.clear())

describe('prefs model', () => {
  it('font size steps in 10s and clamps 80–200', () => {
    const p = defaultPrefs()
    expect(stepFont(p, 1)).toBe(110)
    for (let i = 0; i < 20; i++) stepFont(p, 1)
    expect(p.fontSize).toBe(200)
    for (let i = 0; i < 30; i++) stepFont(p, -1)
    expect(p.fontSize).toBe(80)
  })

  it('levels cycle 0→1→2→3→0', () => {
    const p = defaultPrefs()
    expect([cycleLevel(p, 'lineHeight'), cycleLevel(p, 'lineHeight'), cycleLevel(p, 'lineHeight'), cycleLevel(p, 'lineHeight')]).toEqual([1, 2, 3, 0])
  })

  it('exclusive groups: one saturation mode and one contrast mode at a time', () => {
    const p = defaultPrefs()
    setToggle(p, 'monochrome', true)
    setToggle(p, 'highSaturation', true)
    expect(p.toggles.monochrome).toBeUndefined()
    expect(p.toggles.highSaturation).toBe(true)
    setToggle(p, 'darkContrast', true)
    setToggle(p, 'lightContrast', true)
    expect(p.toggles.darkContrast).toBeUndefined()
    expect(p.toggles.lightContrast).toBe(true)
    // unrelated toggles coexist
    setToggle(p, 'bigCursor', true)
    expect(p.toggles.highSaturation).toBe(true)
    expect(p.toggles.bigCursor).toBe(true)
  })

  it('profiles apply a bundle from a clean slate, keep language, and clear on manual change', () => {
    const p = defaultPrefs()
    p.lang = 'fr'
    setToggle(p, 'hideImages', true)
    applyProfile(p, 'visuallyImpaired')
    expect(p.profile).toBe('visuallyImpaired')
    expect(p.fontSize).toBe(150)
    expect(p.fontWeight).toBe(1)
    expect(p.lineHeight).toBe(1)
    expect(p.letterSpacing).toBe(1)
    expect(p.toggles).toEqual(PROFILES.visuallyImpaired.toggles)
    expect(p.toggles.hideImages).toBeUndefined()
    expect(p.lang).toBe('fr')
    setToggle(p, 'bigCursor', false)
    expect(p.profile).toBeNull()
    applyProfile(p, null)
    expect(isDefault({ ...p, lang: null })).toBe(true)
  })

  it('keeps menu voice when a profile is applied', () => {
    const p = defaultPrefs()
    p.menuVoice = true
    applyProfile(p, 'readAloud')
    expect(p.menuVoice).toBe(true)
    expect(p.toggles.readAloud).toBe(true)
  })

  it('every profile only references known toggles', () => {
    const known = new Set(['dyslexiaFont', 'highlightLinks', 'highlightTitles', 'superFocus', 'readAloud', 'readingGuide', 'bigCursor', 'monochrome', 'lowSaturation', 'highSaturation', 'highContrast', 'lightContrast', 'darkContrast', 'stopAnimations', 'hideImages', 'imageTooltips', 'muteSounds', 'focusRing'])
    for (const bundle of Object.values(PROFILES)) for (const k of Object.keys(bundle.toggles || {})) expect(known.has(k)).toBe(true)
  })
})

describe('persistence', () => {
  it('round-trips and removes the key when back to defaults', () => {
    const p = defaultPrefs()
    stepFont(p, 1)
    setToggle(p, 'readingGuide', true)
    savePrefs(p)
    expect(localStorage.getItem(STORAGE_KEY)).toBeTruthy()
    const loaded = loadPrefs()
    expect(loaded.fontSize).toBe(110)
    expect(loaded.toggles.readingGuide).toBe(true)
    resetPrefs(loaded)
    savePrefs(loaded)
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull()
  })

  it('ignores corrupt or foreign data', () => {
    localStorage.setItem(STORAGE_KEY, '{not json')
    expect(loadPrefs()).toEqual(defaultPrefs())
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ v: 99, fontSize: 500 }))
    expect(loadPrefs()).toEqual(defaultPrefs())
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ v: 1, fontSize: 9999, lineHeight: 42 }))
    const p = loadPrefs()
    expect(p.fontSize).toBe(200)
    expect(p.lineHeight).toBe(3)
  })
})
