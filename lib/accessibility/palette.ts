import { contrast, isHexColor, parseHex, readableOn } from './contrast'

export type A11yColorMode = 'accent' | 'full' | 'match-banner'

export interface A11yPanelSurface {
  bg: string
  card: string
  card2: string
  text: string
  muted: string
  border: string
  control: string
  tint: string
  /** Locks the widget's data-theme so system dark/light CSS does not fight the paint. */
  theme: 'light' | 'dark'
}

export interface A11yPanelLook {
  theme: 'light' | 'dark' | 'auto'
  accent: string
  accentText: string
  headerBg: string
  headerFg: string
  surface?: A11yPanelSurface
}

function toHex(rgb: [number, number, number]): string {
  return `#${rgb.map((c) => Math.max(0, Math.min(255, Math.round(c))).toString(16).padStart(2, '0')).join('')}`
}

export function hexColor(value: unknown, fallback: string): string {
  return isHexColor(value) ? value.trim() : fallback
}

export function mixHex(a: string, b: string, t: number): string {
  const A = parseHex(a)
  const B = parseHex(b)
  if (!A || !B) return a
  return toHex(A.map((c, i) => c + (B[i] - c) * t) as [number, number, number])
}

export function relativeLuminance(hex: string): number {
  const rgb = parseHex(hex)
  if (!rgb) return 0
  const [r, g, b] = rgb.map((c) => {
    const s = c / 255
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

export function isDarkSurface(hex: string): boolean {
  return relativeLuminance(hex) <= 0.45
}

export function accentInk(accent: string, surface: string): string {
  const a = parseHex(accent)
  const s = parseHex(surface)
  if (!a || !s) return accent
  const toward: [number, number, number] = relativeLuminance(surface) > 0.4 ? [0, 0, 0] : [255, 255, 255]
  for (let t = 0; t <= 1.0001; t += 0.05) {
    const mixed = a.map((c, i) => Math.round(c + (toward[i] - c) * t)) as [number, number, number]
    const hex = `#${mixed.map((c) => c.toString(16).padStart(2, '0')).join('')}`
    if (contrast(hex, surface) >= 4.5) return hex
  }
  return toward[0] === 0 ? '#111111' : '#ffffff'
}

/** Mix `fg` toward black or white until it hits `min` contrast on `bg`. */
export function ensureContrast(fg: string, bg: string, min: number): string {
  if (contrast(fg, bg) >= min) return fg
  const toward = contrast('#111111', bg) >= contrast('#ffffff', bg) ? '#111111' : '#ffffff'
  for (let t = 0.05; t <= 1.001; t += 0.05) {
    const mixed = mixHex(fg, toward, t)
    if (contrast(mixed, bg) >= min) return mixed
  }
  return toward
}

function ensureOnAll(fg: string, surfaces: string[], min: number): string {
  return surfaces.reduce((c, surface) => ensureContrast(c, surface, min), fg)
}

/**
 * Mid-luminance brand colours (Tailwind blue-500, etc.) cannot host 4.5:1
 * black *or* white. Shift the surface toward black or white — whichever is
 * closer — so body copy can be readable while keeping the hue.
 */
export function paintSafeBg(bg: string): { bg: string; text: string } {
  if (contrast('#ffffff', bg) >= 4.5) return { bg, text: '#ffffff' }
  if (contrast('#111111', bg) >= 4.5) return { bg, text: '#111111' }
  let bestDark: { bg: string; t: number } | null = null
  let bestLight: { bg: string; t: number } | null = null
  for (let t = 0.05; t <= 1.001; t += 0.05) {
    if (!bestDark) {
      const mixed = mixHex(bg, '#000000', t)
      if (contrast('#ffffff', mixed) >= 4.5) bestDark = { bg: mixed, t }
    }
    if (!bestLight) {
      const mixed = mixHex(bg, '#ffffff', t)
      if (contrast('#111111', mixed) >= 4.5) bestLight = { bg: mixed, t }
    }
    if (bestDark && bestLight) break
  }
  if (bestDark && (!bestLight || bestDark.t <= bestLight.t)) return { bg: bestDark.bg, text: '#ffffff' }
  if (bestLight) return { bg: bestLight.bg, text: '#111111' }
  return { bg: '#111111', text: '#ffffff' }
}

export function buildPanelSurface(bg: string, accent: string, text?: string): A11yPanelSurface {
  const safe = paintSafeBg(bg)
  const surfaceBg = safe.bg
  const ink = text && contrast(text, surfaceBg) >= 4.5 ? text : safe.text
  const dark = isDarkSurface(surfaceBg)
  const card = dark ? mixHex(surfaceBg, '#ffffff', 0.1) : relativeLuminance(surfaceBg) > 0.88 ? '#ffffff' : mixHex(surfaceBg, '#ffffff', 0.62)
  const card2 = dark ? mixHex(surfaceBg, '#ffffff', 0.05) : mixHex(surfaceBg, '#000000', 0.035)
  const surfaces = [surfaceBg, card, card2]
  const muted = ensureOnAll(mixHex(ink, surfaceBg, 0.28), surfaces, 4.5)
  const border = ensureOnAll(mixHex(ink, surfaceBg, 0.4), [card, card2], 3)
  const tint = mixHex(accent, surfaceBg, 0.86)
  return {
    bg: surfaceBg,
    card,
    card2,
    text: ink,
    muted,
    border,
    control: border,
    tint,
    theme: dark ? 'dark' : 'light',
  }
}

export function resolveA11yPanelLook(input: {
  colorMode: A11yColorMode
  theme: 'light' | 'dark' | 'auto'
  accent: string
  headerText?: string
  background?: string
  text?: string
  bannerBg: string
  bannerText: string
}): A11yPanelLook {
  const accent = hexColor(input.accent, '#3b82f6')
  const pickHeaderFg = (headerBg: string) =>
    hexColor(input.headerText, '') && contrast(input.headerText!, headerBg) >= 3
      ? input.headerText!.trim()
      : readableOn(headerBg)

  if (input.colorMode === 'match-banner' || input.colorMode === 'full') {
    const bg =
      input.colorMode === 'match-banner'
        ? hexColor(input.bannerBg, '#ffffff')
        : hexColor(input.background, accent)
    const textCandidate = input.colorMode === 'match-banner' ? input.bannerText : input.text
    const preferredText =
      hexColor(textCandidate, '') && contrast(textCandidate!, bg) >= 4.5 ? textCandidate!.trim() : undefined
    const surface = buildPanelSurface(bg, accent, preferredText)
    const similar = contrast(accent, surface.bg) < 1.8
    const chrome = similar ? surface.text : accent
    const headerBg = similar ? surface.bg : accent
    return {
      theme: input.theme,
      accent: chrome,
      accentText: similar ? surface.bg : pickHeaderFg(accent),
      headerBg,
      headerFg: pickHeaderFg(headerBg),
      surface,
    }
  }

  const accentText = pickHeaderFg(accent)
  return {
    theme: input.theme,
    accent,
    accentText,
    headerBg: accent,
    headerFg: accentText,
  }
}
