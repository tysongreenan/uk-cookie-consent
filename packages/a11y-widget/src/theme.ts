import { accentInk, readableOn } from './dom'
import type { A11yRuntimeConfig } from './types'

const SURFACE_KEYS = ['bg', 'card', 'card-2', 'text', 'muted', 'border', 'control', 'tint'] as const

/** Paint chrome + optional full-panel surface onto the widget host. */
export function paintPanelHost(
  host: HTMLElement,
  panel: A11yRuntimeConfig['panel'],
  theme: 'light' | 'dark',
): void {
  const surface = panel.surface
  const resolvedTheme = surface?.theme || theme
  host.setAttribute('data-theme', resolvedTheme)
  host.style.setProperty('--accent', panel.accent)
  host.style.setProperty('--accent-text', panel.accentText || readableOn(panel.accent))
  host.style.setProperty('--header-bg', panel.headerBg || panel.accent)
  host.style.setProperty('--header-fg', panel.headerFg || panel.accentText || readableOn(panel.accent))
  if (surface) {
    host.style.setProperty('--bg', surface.bg)
    host.style.setProperty('--card', surface.card)
    host.style.setProperty('--card-2', surface.card2)
    host.style.setProperty('--text', surface.text)
    host.style.setProperty('--muted', surface.muted)
    host.style.setProperty('--border', surface.border)
    host.style.setProperty('--control', surface.control)
    host.style.setProperty('--tint', surface.tint)
  } else {
    for (const key of SURFACE_KEYS) host.style.removeProperty(`--${key}`)
  }
  const card2 = surface?.card2 || (resolvedTheme === 'dark' ? '#262a35' : '#f7f8fb')
  host.style.setProperty('--accent-ink', accentInk(panel.accent, card2))
}
