/**
 * Filter-type colour adjustments (monochrome, saturation, contrast).
 *
 * Phase 0 spike result: `filter` on <html>/<body> turns them into the containing
 * block for every position:fixed descendant, which breaks sticky headers and our
 * own banner, and is slow on iOS. A full-viewport, pointer-events:none overlay
 * with `backdrop-filter` filters everything painted behind it without touching
 * layout. The overlay lives in our shadow root *below* the panel, so the menu
 * itself is never filtered. Fallback (no backdrop-filter): class on <html> that
 * applies `filter` to body>* — see adjust-css.ts.
 */
import { h } from '../dom'

const FILTERS: Record<string, string> = {
  monochrome: 'grayscale(1)',
  lowSaturation: 'saturate(0.5)',
  highSaturation: 'saturate(2)',
  highContrast: 'contrast(1.7)',
}

export const FILTER_KEYS = Object.keys(FILTERS)

let overlay: HTMLElement | null = null

export function supportsBackdropFilter(): boolean {
  try {
    return (
      typeof CSS !== 'undefined' &&
      (CSS.supports('backdrop-filter', 'grayscale(1)') || CSS.supports('-webkit-backdrop-filter', 'grayscale(1)'))
    )
  } catch {
    return false
  }
}

export function applyColorFilters(root: ShadowRoot, active: Record<string, boolean | undefined>): void {
  const filter = FILTER_KEYS.filter((k) => active[k]).map((k) => FILTERS[k]).join(' ')
  const html = document.documentElement

  if (!supportsBackdropFilter()) {
    html.classList.add('cb-a11y-nobf')
    return
  }
  html.classList.remove('cb-a11y-nobf')

  if (!filter) {
    overlay?.remove()
    overlay = null
    return
  }
  if (!overlay) {
    overlay = h('div', { class: 'cb-a11y-overlay', 'aria-hidden': 'true' })
    root.insertBefore(overlay, root.firstChild)
  }
  overlay.style.setProperty('backdrop-filter', filter)
  overlay.style.setProperty('-webkit-backdrop-filter', filter)
}
