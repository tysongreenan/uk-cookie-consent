import type { A11yProfileId, Prefs, ToggleKey } from './types'

export const STORAGE_KEY = 'cb-a11y-prefs'

export const FONT_MIN = 80
export const FONT_MAX = 200
export const FONT_STEP = 10
export const LEVEL_MAX = 3

/** Toggles that cannot be on at the same time. Turning one on turns the others off. */
export const EXCLUSIVE_GROUPS: ToggleKey[][] = [
  ['monochrome', 'lowSaturation', 'highSaturation'],
  ['highContrast', 'lightContrast', 'darkContrast'],
]

export function defaultPrefs(): Prefs {
  return { v: 1, fontSize: 100, fontWeight: 0, lineHeight: 0, letterSpacing: 0, toggles: {}, profile: null, lang: null, menuVoice: false }
}

export function loadPrefs(): Prefs {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultPrefs()
    const parsed = JSON.parse(raw) as Partial<Prefs>
    if (!parsed || parsed.v !== 1) return defaultPrefs()
    const p = defaultPrefs()
    p.fontSize = clampFont(Number(parsed.fontSize))
    p.fontWeight = clampLevel(parsed.fontWeight)
    p.lineHeight = clampLevel(parsed.lineHeight)
    p.letterSpacing = clampLevel(parsed.letterSpacing)
    p.toggles = parsed.toggles && typeof parsed.toggles === 'object' ? { ...parsed.toggles } : {}
    p.profile = typeof parsed.profile === 'string' ? (parsed.profile as A11yProfileId) : null
    p.lang = typeof parsed.lang === 'string' ? parsed.lang : null
    p.menuVoice = parsed.menuVoice === true
    return p
  } catch {
    return defaultPrefs()
  }
}

export function savePrefs(prefs: Prefs): void {
  try {
    if (isDefault(prefs)) localStorage.removeItem(STORAGE_KEY)
    else localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs))
  } catch {
    // Private mode / quota — preferences simply won't persist
  }
}

export function isDefault(p: Prefs): boolean {
  return (
    p.fontSize === 100 &&
    p.fontWeight === 0 &&
    p.lineHeight === 0 &&
    p.letterSpacing === 0 &&
    p.profile === null &&
    p.lang === null &&
    !p.menuVoice &&
    !Object.keys(p.toggles).some((k) => p.toggles[k as ToggleKey])
  )
}

export function clampFont(n: number): number {
  if (!Number.isFinite(n)) return 100
  const stepped = Math.round(n / FONT_STEP) * FONT_STEP
  return Math.min(FONT_MAX, Math.max(FONT_MIN, stepped))
}

export function clampLevel(n: unknown): number {
  const v = typeof n === 'number' ? Math.round(n) : 0
  return Math.min(LEVEL_MAX, Math.max(0, Number.isFinite(v) ? v : 0))
}

export function setToggle(p: Prefs, key: ToggleKey, on: boolean): void {
  if (on) {
    for (const group of EXCLUSIVE_GROUPS) {
      if (group.includes(key)) for (const other of group) if (other !== key) delete p.toggles[other]
    }
    p.toggles[key] = true
  } else {
    delete p.toggles[key]
  }
  // Any manual change leaves the profile; the profile is a shortcut, not a lock.
  p.profile = null
}

export function cycleLevel(p: Prefs, key: 'fontWeight' | 'lineHeight' | 'letterSpacing'): number {
  p[key] = (p[key] + 1) % (LEVEL_MAX + 1)
  p.profile = null
  return p[key]
}

export function stepFont(p: Prefs, dir: 1 | -1): number {
  p.fontSize = clampFont(p.fontSize + dir * FONT_STEP)
  p.profile = null
  return p.fontSize
}

/** Profiles are bundles applied on top of a clean slate (except language). */
export const PROFILES: Record<A11yProfileId, Partial<Prefs>> = {
  seizureSafe: { toggles: { stopAnimations: true, lowSaturation: true, muteSounds: true } },
  readAloud: { toggles: { readAloud: true } },
  visuallyImpaired: {
    fontSize: 150,
    fontWeight: 1,
    lineHeight: 1,
    letterSpacing: 1,
    toggles: {
      lightContrast: true,
      highlightLinks: true,
      highlightTitles: true,
      bigCursor: true,
      focusRing: true,
      imageTooltips: true,
      readingGuide: true,
    },
  },
  adhd: { toggles: { superFocus: true, stopAnimations: true, muteSounds: true } },
  cognitive: { toggles: { readingGuide: true, highlightTitles: true, highlightLinks: true, dyslexiaFont: true }, lineHeight: 1 },
  motorImpaired: { fontSize: 110, toggles: { bigCursor: true, focusRing: true, highlightLinks: true } },
}

export function applyProfile(p: Prefs, id: A11yProfileId | null): void {
  const lang = p.lang
  const menuVoice = p.menuVoice
  const fresh = defaultPrefs()
  fresh.lang = lang
  fresh.menuVoice = menuVoice
  if (id) {
    const bundle = PROFILES[id]
    Object.assign(fresh, bundle, { toggles: { ...(bundle.toggles || {}) }, profile: id, lang, menuVoice })
  }
  Object.assign(p, fresh)
}

export function resetPrefs(p: Prefs): void {
  const lang = p.lang
  Object.assign(p, defaultPrefs())
  p.lang = lang
}
