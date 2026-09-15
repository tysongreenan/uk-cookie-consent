/**
 * Entry point. Reads the runtime config published by banner.js
 * (`window.__cbA11yConfig`) or, for copy-paste installs, the `data-cb-a11y`
 * attribute on this script tag. Then mounts the Shadow DOM menu and re-applies
 * any saved visitor preferences.
 *
 * Everything is wrapped so a failure here can never affect the host page or the
 * cookie banner that loaded us.
 */
import { applyAll } from './apply'
import { HOST_ID, prefersDark, Z_HOST } from './dom'
import { buildMenuFontStack, samplePageFontFamily } from './font'
import panelCss from './panel.css'
import { loadPrefs, savePrefs } from './state'
import { paintPanelHost } from './theme'
import type { A11yRuntimeConfig, Ctx } from './types'
import { mountUi, setLanguage } from './ui'

declare const __A11Y_VERSION__: number

declare global {
  interface Window {
    __cbA11yConfig?: A11yRuntimeConfig
    __cbA11yBooted?: boolean
    __cbA11yTrack?: (type: string, extra?: Record<string, unknown>) => void
    cbAccessibility?: { open: () => void; close: () => void; toggle: () => void; reset: () => void; version: number }
  }
}

function readConfig(): A11yRuntimeConfig | null {
  if (window.__cbA11yConfig && typeof window.__cbA11yConfig === 'object') return window.__cbA11yConfig
  const script = (document.currentScript as HTMLScriptElement | null) || document.getElementById('cb-a11y-script')
  const raw = script?.getAttribute('data-cb-a11y')
  if (!raw) return null
  try {
    return JSON.parse(raw) as A11yRuntimeConfig
  } catch {
    return null
  }
}

function resolveInitialLang(cfg: A11yRuntimeConfig, saved: string | null): string {
  const available = Object.keys(cfg.strings)
  if (saved && available.includes(saved)) return saved
  if (cfg.lang === 'auto') {
    const nav = (navigator.language || 'en').slice(0, 2).toLowerCase()
    return available.includes(nav) ? nav : available[0] || 'en'
  }
  return available.includes(cfg.lang) ? cfg.lang : available[0] || 'en'
}

function boot(): void {
  if (window.__cbA11yBooted || document.getElementById(HOST_ID)) return
  const cfg = readConfig()
  if (!cfg || !cfg.strings || !cfg.trigger) return
  window.__cbA11yBooted = true

  const mount = () => {
    if (!document.body) {
      setTimeout(mount, 50)
      return
    }
    const fontStack = buildMenuFontStack(cfg.fontFamily || '', samplePageFontFamily())
    const host = document.createElement('div')
    host.id = HOST_ID
    // Inline (not :host) so the host page's own `div {…}` rules can't win, and
    // typography is re-declared right after `all:initial` resets it to UA serif.
    host.style.cssText =
      `all:initial;display:block;position:fixed;inset:auto;width:0;height:0;z-index:${Z_HOST};` +
      `font-family:${fontStack};` +
      `font-size:15px;line-height:1.4;font-weight:400;letter-spacing:normal;text-transform:none;color:var(--text)`
    const root = host.attachShadow({ mode: 'open' })
    const style = document.createElement('style')
    style.textContent = panelCss
    root.appendChild(style)

    const theme = cfg.panel.theme === 'auto' ? (prefersDark() ? 'dark' : 'light') : cfg.panel.theme
    paintPanelHost(host, cfg.panel, theme)
    host.style.setProperty('--trigger-bg', cfg.trigger.colors.background)
    host.style.setProperty('--trigger-fg', cfg.trigger.colors.icon)
    host.style.setProperty('--trigger-border', cfg.trigger.colors.border)
    host.style.setProperty('--font', fontStack)

    const prefs = loadPrefs()
    const ctx: Ctx = {
      cfg,
      prefs,
      strings: cfg.strings.en || Object.values(cfg.strings)[0],
      lang: 'en',
      root,
      host,
      announce: () => {},
      save: () => savePrefs(prefs),
      render: () => applyAll(ctx),
      track: (type, extra) => {
        try {
          window.__cbA11yTrack?.(type, extra)
        } catch {
          /* analytics must never throw */
        }
      },
    }
    setLanguage(ctx, resolveInitialLang(cfg, prefs.lang))

    document.body.appendChild(host)
    const ui = mountUi(ctx)
    ui.render()
    applyAll(ctx)

    if (cfg.panel.theme === 'auto' && !cfg.panel.surface) {
      try {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
          paintPanelHost(host, cfg.panel, e.matches ? 'dark' : 'light')
        })
      } catch {
        /* older Safari */
      }
    }

    window.cbAccessibility = {
      open: ui.open,
      close: ui.close,
      toggle: ui.toggle,
      reset: () => {
        prefs.fontSize = 100
        prefs.fontWeight = prefs.lineHeight = prefs.letterSpacing = 0
        prefs.toggles = {}
        prefs.profile = null
        prefs.menuVoice = false
        savePrefs(prefs)
        applyAll(ctx)
        ui.render()
      },
      version: __A11Y_VERSION__,
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount)
  else mount()
}

try {
  boot()
} catch (e) {
  try {
    console.warn('[Accessibility Menu] failed to start:', e)
  } catch {
    /* ignore */
  }
}
