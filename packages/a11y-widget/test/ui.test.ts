// @vitest-environment jsdom
import { beforeEach, describe, expect, it, vi } from 'vitest'
import axe from 'axe-core'
import { A11Y_TRANSLATIONS } from '../../../lib/accessibility/translations'
import { applyAll } from '../src/apply'
import { HOST_ID } from '../src/dom'
import { defaultPrefs } from '../src/state'
import type { A11yRuntimeConfig, Ctx } from '../src/types'
import { avoidObstacles } from '../src/placement'
import { mountUi, setLanguage } from '../src/ui'

function runtime(overrides: Partial<A11yRuntimeConfig> = {}): A11yRuntimeConfig {
  return {
    v: 1,
    lang: 'en',
    strings: { en: A11Y_TRANSLATIONS.en, fr: A11Y_TRANSLATIONS.fr },
    languageNames: { en: 'English', fr: 'Français' },
    trigger: {
      position: 'bottom-right',
      offsetX: 20,
      offsetY: 20,
      size: 'medium',
      shape: 'circle',
      icon: 'universal-access',
      label: '',
      hideOnMobile: false,
      customSelector: '',
      colors: { background: '#3b82f6', icon: '#fff', border: 'transparent' },
    },
    panel: { theme: 'light', accent: '#3b82f6', accentText: '#ffffff', headerBg: '#3b82f6', headerFg: '#ffffff' },
    features: ['profiles', 'fontSize', 'fontWeight', 'lineHeight', 'letterSpacing', 'dyslexiaFont', 'highlightLinks', 'highlightTitles', 'superFocus', 'readAloud', 'readingGuide', 'bigCursor', 'pageStructure', 'monochrome', 'lowSaturation', 'highSaturation', 'highContrast', 'lightContrast', 'darkContrast', 'stopAnimations', 'hideImages', 'imageTooltips', 'muteSounds'],
    shortcut: 'alt-shift-a',
    statementUrl: 'https://example.com/accessibility',
    feedbackEmail: 'access@example.com',
    poweredBy: true,
    assetsBase: 'https://www.cookie-banner.ca/a11y',
    avoidCorner: 'bottom-left',
    fontFamily: '',
    ...overrides,
  }
}

function mount(cfg = runtime()) {
  const host = document.createElement('div')
  host.id = HOST_ID
  const root = host.attachShadow({ mode: 'open' })
  const prefs = defaultPrefs()
  const track = vi.fn()
  const ctx: Ctx = {
    cfg,
    prefs,
    strings: cfg.strings.en,
    lang: 'en',
    root,
    host,
    announce: () => {},
    save: () => {},
    render: () => applyAll(ctx),
    track,
  }
  setLanguage(ctx, 'en')
  document.body.appendChild(host)
  const ui = mountUi(ctx)
  applyAll(ctx)
  return { host, root, ctx, ui, track }
}

beforeEach(() => {
  document.body.innerHTML = `
    <header><h1 style="font-size:32px">Title</h1><nav><a href="/x">Home</a></nav></header>
    <main>
      <h2 style="font-size:24px">Section</h2>
      <p style="font-size:16px">Some <a href="/y">link</a> text.</p>
      <img src="/a.png" alt="A described image"><img src="/b.png">
      <video></video>
    </main>`
  document.documentElement.className = ''
  localStorage.clear()
  // jsdom lacks these; the widget guards them, tests just need them present
  ;(window as unknown as { requestAnimationFrame: (cb: FrameRequestCallback) => number }).requestAnimationFrame = (cb) => {
    cb(0)
    return 0
  }
})

describe('mount + open/close', () => {
  it('renders a trigger and a hidden dialog; opens on click; closes on Escape returning focus', () => {
    const { root, ui } = mount()
    const trigger = root.querySelector<HTMLButtonElement>('.cb-a11y-trigger')!
    const panel = root.getElementById('cb-a11y-panel')!
    expect(trigger.getAttribute('aria-label')).toBe('Open accessibility menu')
    expect(trigger.getAttribute('aria-expanded')).toBe('false')
    expect(panel.getAttribute('role')).toBe('dialog')
    expect(panel.getAttribute('aria-modal')).toBe('true')
    expect(panel.classList.contains('is-open')).toBe(false)

    trigger.focus()
    trigger.click()
    expect(panel.classList.contains('is-open')).toBe(true)
    expect(trigger.getAttribute('aria-expanded')).toBe('true')
    expect(root.activeElement).not.toBeNull()
    expect(panel.contains(root.activeElement)).toBe(true)

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    expect(panel.classList.contains('is-open')).toBe(false)
    expect(root.activeElement).toBe(trigger)
    ui.close()
  })

  it('opens with the keyboard shortcut and from a custom selector', () => {
    document.body.insertAdjacentHTML('beforeend', '<footer><a id="a11y-link" href="#">Accessibility</a></footer>')
    const { root } = mount(runtime({ trigger: { ...runtime().trigger, customSelector: '#a11y-link' } }))
    const panel = root.getElementById('cb-a11y-panel')!
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'A', altKey: true, shiftKey: true, bubbles: true }))
    expect(panel.classList.contains('is-open')).toBe(true)
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    document.getElementById('a11y-link')!.click()
    expect(panel.classList.contains('is-open')).toBe(true)
  })

  it('places the trigger in the configured corner (safe-area aware)', () => {
    const a = mount().root.querySelector<HTMLElement>('.cb-a11y-trigger')!
    expect(a.style.right).toContain('20px')
    expect(a.style.right).toContain('safe-area-inset-right')
    expect(a.style.bottom).toContain('20px')
    document.getElementById(HOST_ID)!.remove()
    const b = mount(runtime({ trigger: { ...runtime().trigger, position: 'top-left' } })).root.querySelector<HTMLElement>('.cb-a11y-trigger')!
    expect(b.style.left).toContain('20px')
    expect(b.style.top).toContain('20px')
  })

  it('moves clear of a cookie banner / cookie pill it would overlap', () => {
    // jsdom has no layout: stub rects. Viewport 1000×800, trigger in the bottom-left corner,
    // a 90px-tall banner bar across the bottom and the cookie pill sitting in the same corner.
    Object.defineProperty(window, 'innerWidth', { value: 1000, configurable: true })
    Object.defineProperty(window, 'innerHeight', { value: 800, configurable: true })
    Object.defineProperty(document.documentElement, 'clientHeight', { value: 800, configurable: true })
    document.body.insertAdjacentHTML(
      'beforeend',
      '<div id="cookie-consent-banner"></div><div id="cookie-settings-float"></div>',
    )
    const rect = (l: number, t: number, w: number, hh: number) =>
      ({ left: l, top: t, right: l + w, bottom: t + hh, width: w, height: hh, x: l, y: t, toJSON: () => ({}) }) as DOMRect
    const banner = document.getElementById('cookie-consent-banner')!
    const pill = document.getElementById('cookie-settings-float')!
    banner.getBoundingClientRect = () => rect(0, 710, 1000, 90)
    pill.getBoundingClientRect = () => rect(20, 640, 160, 48) // sits just above the bar

    const { root } = mount(runtime({ trigger: { ...runtime().trigger, position: 'bottom-left' } }))
    const trigger = root.querySelector<HTMLElement>('.cb-a11y-trigger')!
    let bottom = 20
    trigger.getBoundingClientRect = () => rect(20, 800 - bottom - 48, 48, 48)
    Object.defineProperty(trigger.style, 'bottom', {
      get: () => `${bottom}px`,
      set: (v: string) => {
        const px = /^(\d+(?:\.\d+)?)px$/.exec(v)
        if (px) bottom = Number(px[1])
        else if (v.startsWith('calc(20px')) bottom = 20
      },
      configurable: true,
    })

    expect(avoidObstacles(trigger as HTMLElement & { dataset: DOMStringMap }, runtime({ trigger: { ...runtime().trigger, position: 'bottom-left' } }).trigger)).toBe(true)
    // Lifted above the bar (800-710+12 = 102), then above the pill on top of it (800-640+12 = 172)
    expect(bottom).toBe(172)
  })
})

describe('menu content', () => {
  it('shows every configured feature, all six profiles (read-aloud hidden without TTS) and the footer links', () => {
    const { root } = mount()
    root.querySelector<HTMLButtonElement>('.cb-a11y-trigger')!.click()
    const keys = Array.from(root.querySelectorAll<HTMLElement>('.cb-a11y-tile')).map((t) => t.dataset.key)
    expect(keys).toEqual(['fontWeight', 'lineHeight', 'letterSpacing', 'dyslexiaFont', 'highlightLinks', 'highlightTitles', 'readAloud', 'superFocus', 'readingGuide', 'bigCursor', 'pageStructure', 'monochrome', 'lowSaturation', 'highSaturation', 'highContrast', 'lightContrast', 'darkContrast', 'stopAnimations', 'hideImages', 'imageTooltips', 'muteSounds'])
    expect((root.querySelector('[data-key="readAloud"]') as HTMLButtonElement).disabled).toBe(true) // no speechSynthesis in jsdom
    expect(root.querySelector('[data-key="readAloud"]')!.classList.contains('is-read-aloud')).toBe(true)
    expect(root.querySelectorAll('.cb-a11y-profile')).toHaveLength(5)
    expect(root.querySelector('.cb-a11y-stepper .val')!.textContent).toBe('100%')
    const links = Array.from(root.querySelectorAll<HTMLAnchorElement>('.cb-a11y-links a')).map((a) => a.href)
    expect(links[0]).toBe('https://example.com/accessibility')
    expect(links[1]).toMatch(/^mailto:access@example.com/)
    expect(root.querySelector('.cb-a11y-fine')!.textContent).toContain('Accessibility menu by cookie-banner.ca')
  })

  it('honours the feature allowlist and hides branding for Pro', () => {
    const { root } = mount(runtime({ features: ['fontSize', 'darkContrast'], poweredBy: false, statementUrl: '', feedbackEmail: '' }))
    root.querySelector<HTMLButtonElement>('.cb-a11y-trigger')!.click()
    expect(Array.from(root.querySelectorAll<HTMLElement>('.cb-a11y-tile')).map((t) => t.dataset.key)).toEqual(['darkContrast'])
    expect(root.querySelector('.cb-a11y-profile')).toBeNull()
    expect(root.querySelector('.cb-a11y-stepper')).not.toBeNull()
    expect(root.querySelector('.cb-a11y-fine')!.textContent).not.toContain('cookie-banner.ca')
    expect(root.querySelector('.cb-a11y-links')).toBeNull()
  })

  it('switches language to French and persists the choice', () => {
    const { root, ctx } = mount()
    root.querySelector<HTMLButtonElement>('.cb-a11y-trigger')!.click()
    const select = root.querySelector<HTMLSelectElement>('.cb-a11y-select')!
    select.value = 'fr'
    select.dispatchEvent(new Event('change'))
    expect(ctx.prefs.lang).toBe('fr')
    expect(root.getElementById('cb-a11y-title')!.textContent).toBe('Menu d’accessibilité')
    expect(root.querySelector<HTMLButtonElement>('.cb-a11y-trigger')!.getAttribute('aria-label')).toBe('Ouvrir le menu d’accessibilité')
  })
})

describe('adjustments reach the page and fully reverse', () => {
  it('font size scales text elements and restores them', () => {
    const { root } = mount()
    root.querySelector<HTMLButtonElement>('.cb-a11y-trigger')!.click()
    const p = document.querySelector<HTMLElement>('main p')!
    root.querySelector<HTMLButtonElement>('.cb-a11y-stepbtn:last-of-type')!.click()
    expect(root.querySelector('.cb-a11y-stepper .val')!.textContent).toBe('110%')
    expect(p.style.fontSize).toBe('17.6px')
    expect(document.querySelector<HTMLElement>('h1')!.style.fontSize).toBe('35.2px')
    expect(document.getElementById(HOST_ID)!.style.fontSize).toBe('')
    root.querySelector<HTMLButtonElement>('.cb-a11y-reset')!.click()
    // The author's own inline `font-size:16px` survives the reset
    expect(p.style.fontSize).toBe('16px')
    expect(p.hasAttribute('data-cb-a11y-fs')).toBe(false)
    expect(p.hasAttribute('data-cb-a11y-fs-inline')).toBe(false)
  })

  it('toggles set html classes, exclusive groups replace each other, reset clears everything', () => {
    const { root } = mount()
    root.querySelector<HTMLButtonElement>('.cb-a11y-trigger')!.click()
    const click = (key: string) => root.querySelector<HTMLButtonElement>(`[data-key="${key}"]`)!.click()
    click('highlightLinks')
    click('monochrome')
    click('darkContrast')
    const html = document.documentElement
    expect(html.classList.contains('cb-a11y-highlightLinks')).toBe(true)
    expect(html.classList.contains('cb-a11y-monochrome')).toBe(true)
    expect(html.classList.contains('cb-a11y-darkContrast')).toBe(true)
    expect(html.classList.contains('cb-a11y-nobf')).toBe(true) // jsdom: no backdrop-filter → fallback path
    expect(root.querySelector('[data-key="monochrome"]')!.getAttribute('aria-checked')).toBe('true')
    click('lowSaturation')
    expect(html.classList.contains('cb-a11y-monochrome')).toBe(false)
    expect(html.classList.contains('cb-a11y-lowSaturation')).toBe(true)
    click('lineHeight')
    click('lineHeight')
    expect(html.classList.contains('cb-a11y-lh-2')).toBe(true)
    expect(document.getElementById('cb-a11y-adjust')).not.toBeNull()

    root.querySelector<HTMLButtonElement>('.cb-a11y-reset')!.click()
    expect(Array.from(html.classList).filter((c) => c.startsWith('cb-a11y-') && c !== 'cb-a11y-nobf')).toEqual([])
  })

  it('side-effect features mount/unmount their helpers and mute media reversibly', () => {
    const { root } = mount()
    root.querySelector<HTMLButtonElement>('.cb-a11y-trigger')!.click()
    const click = (key: string) => root.querySelector<HTMLButtonElement>(`[data-key="${key}"]`)!.click()
    const video = document.querySelector('video')!
    click('readingGuide')
    click('superFocus')
    click('imageTooltips')
    click('muteSounds')
    expect(root.querySelector('.cb-a11y-guide')).not.toBeNull()
    expect(root.querySelector('.cb-a11y-focus-hole')).not.toBeNull()
    expect(root.querySelector('.cb-a11y-tip')).not.toBeNull()
    expect(video.muted).toBe(true)

    // image tooltip flags a missing alt
    const noAlt = document.querySelectorAll('img')[1]
    noAlt.dispatchEvent(new Event('pointerover', { bubbles: true }))
    const tip = root.querySelector<HTMLElement>('.cb-a11y-tip')!
    expect(tip.hidden).toBe(false)
    expect(tip.textContent).toBe('No description provided for this image')
    expect(tip.classList.contains('is-missing')).toBe(true)

    root.querySelector<HTMLButtonElement>('.cb-a11y-reset')!.click()
    expect(root.querySelector('.cb-a11y-guide')).toBeNull()
    expect(root.querySelector('.cb-a11y-focus-hole')).toBeNull()
    expect(root.querySelector('.cb-a11y-tip')).toBeNull()
    expect(video.muted).toBe(false)
  })

  it('page structure lists headings, landmarks and links', () => {
    const { root } = mount()
    root.querySelector<HTMLButtonElement>('.cb-a11y-trigger')!.click()
    root.querySelector<HTMLButtonElement>('[data-key="pageStructure"]')!.click()
    expect(root.getElementById('cb-a11y-title')!.textContent).toBe('Page structure')
    const items = Array.from(root.querySelectorAll('.cb-a11y-struct-item')).map((b) => b.textContent)
    expect(items).toContain('H1Title')
    expect(items).toContain('H2Section')
    expect(items).toContain('headerheader')
    expect(items).toContain('navnav')
    expect(items).toContain('link')
  })

  it('speaks menu labels only after menu voice is on, and mutes immediately', () => {
    const spoken: string[] = []
    class FakeUtterance {
      text: string
      lang = ''
      rate = 1
      onend: (() => void) | null = null
      onerror: (() => void) | null = null
      constructor(text: string) {
        this.text = text
      }
    }
    vi.stubGlobal('SpeechSynthesisUtterance', FakeUtterance)
    vi.stubGlobal('speechSynthesis', {
      speaking: false,
      pending: false,
      paused: false,
      cancel() {},
      pause() {},
      resume() {},
      getVoices: () => [],
      speak(u: { text: string }) {
        spoken.push(u.text)
      },
      addEventListener() {},
    })
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] })
    try {
      const { root } = mount()
      const trigger = root.querySelector<HTMLButtonElement>('.cb-a11y-trigger')!
      trigger.dispatchEvent(new Event('pointerenter', { bubbles: true }))
      vi.advanceTimersByTime(100)
      expect(spoken).toEqual([])

      trigger.click()
      expect(spoken).toEqual([])

      const row = root.querySelector<HTMLButtonElement>('[data-profile="readAloud"]')!
      row.dispatchEvent(new Event('pointerenter', { bubbles: true }))
      vi.advanceTimersByTime(100)
      expect(spoken).toEqual([])

      const mic = root.querySelector<HTMLButtonElement>('.cb-a11y-voicebtn')!
      expect(mic.hidden).toBe(false)
      expect(mic.getAttribute('aria-pressed')).toBe('false')
      mic.click()
      expect(mic.getAttribute('aria-pressed')).toBe('true')
      expect(spoken.join(' ')).toMatch(/menu voice is on/i)
      spoken.length = 0

      row.dispatchEvent(new Event('pointerenter', { bubbles: true }))
      vi.advanceTimersByTime(100)
      expect(spoken.join(' ')).toMatch(/read aloud/i)

      spoken.length = 0
      mic.click()
      expect(mic.getAttribute('aria-pressed')).toBe('false')
      expect(spoken).toEqual([])
    } finally {
      vi.useRealTimers()
      vi.unstubAllGlobals()
    }
  })
})

describe('the menu itself is accessible (axe)', () => {
  it('has no serious or critical violations in the open panel', async () => {
    const { host, root } = mount()
    root.querySelector<HTMLButtonElement>('.cb-a11y-trigger')!.click()
    const results = await axe.run(host, {
      // Layout-dependent rules cannot run in jsdom
      rules: { 'color-contrast': { enabled: false }, region: { enabled: false } },
    })
    const bad = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical')
    expect(bad.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`)).toEqual([])
  })
})
