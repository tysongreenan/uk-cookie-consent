/**
 * Reconcile the page with the current prefs. Idempotent: call after any change.
 * Class-driven adjustments are flips on <html>; side-effect features get their
 * enable/disable pair called with the desired state.
 */
import { buildAdjustCss } from './adjust-css'
import { ADJUST_STYLE_ID } from './dom'
import { applyColorFilters, FILTER_KEYS } from './features/color-overlay'
import { applyFontSize } from './features/font-size'
import { applyMuteSounds, applyStopAnimations } from './features/media'
import { applyImageTooltips, applyReadingGuide, applySuperFocus } from './features/pointer-aids'
import { applyReadAloud } from './features/read-aloud'
import type { Ctx, ToggleKey } from './types'

const CLASS_TOGGLES: ToggleKey[] = [
  'dyslexiaFont',
  'highlightLinks',
  'highlightTitles',
  'focusRing',
  'bigCursor',
  'stopAnimations',
  'hideImages',
  'lightContrast',
  'darkContrast',
  'readAloud',
  // filter keys also get a class (used by the no-backdrop-filter fallback)
  'monochrome',
  'lowSaturation',
  'highSaturation',
  'highContrast',
]

export function ensureAdjustStylesheet(assetsBase: string): void {
  if (document.getElementById(ADJUST_STYLE_ID)) return
  const style = document.createElement('style')
  style.id = ADJUST_STYLE_ID
  style.textContent = buildAdjustCss(assetsBase)
  document.head.appendChild(style)
}

function setLevelClass(prefix: string, level: number): void {
  const html = document.documentElement
  for (let i = 1; i <= 3; i++) html.classList.toggle(`${prefix}-${i}`, level === i)
}

export function applyAll(ctx: Ctx): void {
  const { prefs } = ctx
  const html = document.documentElement
  const t = prefs.toggles

  // Only inject the (font-face-bearing) stylesheet once something is actually on,
  // so a visitor who never touches the menu never downloads any of it.
  const anythingOn =
    prefs.fontSize !== 100 || prefs.fontWeight || prefs.lineHeight || prefs.letterSpacing || Object.keys(t).some((k) => t[k as ToggleKey])
  if (anythingOn) ensureAdjustStylesheet(ctx.cfg.assetsBase)

  for (const key of CLASS_TOGGLES) html.classList.toggle(`cb-a11y-${key}`, Boolean(t[key]))
  setLevelClass('cb-a11y-fw', prefs.fontWeight)
  setLevelClass('cb-a11y-lh', prefs.lineHeight)
  setLevelClass('cb-a11y-ls', prefs.letterSpacing)
  html.classList.toggle('cb-a11y-enlarge', prefs.fontSize > 100)

  safe(() => applyFontSize(prefs.fontSize))
  safe(() => applyColorFilters(ctx.root, Object.fromEntries(FILTER_KEYS.map((k) => [k, t[k as ToggleKey]]))))
  safe(() => applyStopAnimations(Boolean(t.stopAnimations)))
  safe(() => applyMuteSounds(Boolean(t.muteSounds)))
  safe(() => applyReadingGuide(ctx, Boolean(t.readingGuide)))
  safe(() => applySuperFocus(ctx, Boolean(t.superFocus)))
  safe(() => applyImageTooltips(ctx, Boolean(t.imageTooltips)))
  safe(() => applyReadAloud(ctx, Boolean(t.readAloud)))
}

function safe(fn: () => void): void {
  try {
    fn()
  } catch (e) {
    try {
      console.warn('[Accessibility Menu] adjustment failed:', e)
    } catch {
      /* ignore */
    }
  }
}
