import { fmt, focusables, h, isMobile, svg } from './dom'
import { renderStructure, jumpTo } from './features/page-structure'
import { speakNow, stopSpeaking, ttsAvailable } from './features/read-aloud'
import { ICONS } from './icons'
import { applyBasePosition, watchPlacement } from './placement'
import { applyProfile, cycleLevel, FONT_MAX, FONT_MIN, LEVEL_MAX, resetPrefs, setToggle, stepFont } from './state'
import type { A11yFeatureKey, A11yProfileId, Ctx, LevelKey, ToggleKey } from './types'

const PROFILE_ORDER: A11yProfileId[] = ['seizureSafe', 'readAloud', 'visuallyImpaired', 'adhd', 'cognitive', 'motorImpaired']
const PROFILE_ICON: Record<A11yProfileId, string> = {
  seizureSafe: 'seizureSafe',
  readAloud: 'readAloudProfile',
  visuallyImpaired: 'visuallyImpaired',
  adhd: 'adhd',
  cognitive: 'cognitive',
  motorImpaired: 'motorImpaired',
}

const GROUPS: Array<{ title: keyof Ctx['strings']; keys: A11yFeatureKey[] }> = [
  { title: 'sectionContent', keys: ['fontWeight', 'lineHeight', 'letterSpacing', 'dyslexiaFont', 'highlightLinks', 'highlightTitles'] },
  { title: 'sectionVisual', keys: ['readAloud', 'superFocus', 'readingGuide', 'bigCursor', 'pageStructure'] },
  { title: 'sectionColor', keys: ['monochrome', 'lowSaturation', 'highSaturation', 'highContrast', 'lightContrast', 'darkContrast'] },
  { title: 'sectionTools', keys: ['stopAnimations', 'hideImages', 'imageTooltips', 'muteSounds'] },
]
const LEVEL_KEYS: LevelKey[] = ['fontWeight', 'lineHeight', 'letterSpacing']
const SIZE_PX = { small: 40, medium: 48, large: 56 }

export interface Ui {
  open: () => void
  close: () => void
  toggle: () => void
  render: () => void
}

export function mountUi(ctx: Ctx): Ui {
  const { cfg, root } = ctx
  const enabled = new Set(cfg.features)
  const side: 'left' | 'right' = cfg.trigger.position.endsWith('right') ? 'right' : 'left'
  let isOpen = false
  let view: 'menu' | 'structure' = 'menu'
  let lastFocus: HTMLElement | null = null

  // ── Trigger ──
  const trigger = h('button', {
    type: 'button',
    class: 'cb-a11y-trigger',
    'aria-label': ctx.strings.openMenu,
    'aria-haspopup': 'dialog',
    'aria-expanded': 'false',
    'aria-controls': 'cb-a11y-panel',
    'data-shape': cfg.trigger.shape,
    title: ctx.strings.openMenu,
  })
  trigger.style.setProperty('--size-cfg', `${SIZE_PX[cfg.trigger.size]}px`)
  trigger.appendChild(svg(ICONS[cfg.trigger.icon] || ICONS['universal-access']))
  if (cfg.trigger.label && cfg.trigger.shape !== 'circle') trigger.appendChild(h('span', { text: cfg.trigger.label }))
  applyBasePosition(trigger, cfg.trigger)
  if (cfg.trigger.hideOnMobile) {
    const applyHide = () => {
      trigger.hidden = isMobile()
    }
    applyHide()
    try {
      window.matchMedia('(max-width: 767px)').addEventListener('change', applyHide)
    } catch {
      /* older Safari */
    }
  }

  // ── Scrim + panel shell ──
  const scrim = h('div', { class: 'cb-a11y-scrim' })
  const title = h('h2', { id: 'cb-a11y-title', text: ctx.strings.menuTitle })
  const backBtn = h('button', { type: 'button', class: 'cb-a11y-iconbtn', 'aria-label': ctx.strings.closeMenu, hidden: true }, [svg(ICONS.back)])
  const resetBtn = h('button', { type: 'button', class: 'cb-a11y-iconbtn', 'aria-label': ctx.strings.resetSettings, title: ctx.strings.resetSettings }, [svg(ICONS.reset)])
  const voiceBtn = h('button', {
    type: 'button',
    class: 'cb-a11y-iconbtn cb-a11y-voicebtn',
    'aria-label': ctx.strings.menuVoiceOn,
    title: ctx.strings.menuVoiceOn,
    'aria-pressed': 'false',
  }, [svg(ICONS.menuVoiceOff)])
  const closeBtn = h('button', { type: 'button', class: 'cb-a11y-iconbtn', 'aria-label': ctx.strings.closeMenu, title: ctx.strings.closeMenu }, [svg(ICONS.close)])
  const header = h('div', { class: 'cb-a11y-header' }, [backBtn, title, voiceBtn, resetBtn, closeBtn])
  const body = h('div', { class: 'cb-a11y-body' })
  const footer = h('div', { class: 'cb-a11y-footer' })
  const panel = h('div', {
    id: 'cb-a11y-panel',
    class: 'cb-a11y-panel',
    role: 'dialog',
    'aria-modal': 'true',
    'aria-labelledby': 'cb-a11y-title',
    'data-side': side,
    tabindex: '-1',
  }, [header, body, footer])
  const live = h('div', { class: 'cb-a11y-sr', role: 'status', 'aria-live': 'polite', 'aria-atomic': 'true' })

  root.append(scrim, panel, trigger, live)

  ctx.announce = (msg) => {
    live.textContent = ''
    // Re-set on the next frame so identical consecutive messages are re-announced
    requestAnimationFrame(() => (live.textContent = msg))
  }

  function voiceLang(): string {
    return ctx.lang === 'auto' ? navigator.language : ctx.lang
  }

  function voice(text: string, immediate = false): void {
    if (!ctx.prefs.menuVoice) return
    speakNow(text, voiceLang(), immediate)
  }

  let muteExploreUntil = 0

  function paintVoiceBtn(): void {
    const on = ctx.prefs.menuVoice
    const s = ctx.strings
    voiceBtn.hidden = !ttsAvailable()
    voiceBtn.classList.toggle('is-on', on)
    voiceBtn.setAttribute('aria-pressed', String(on))
    voiceBtn.setAttribute('aria-label', on ? s.menuVoiceOff : s.menuVoiceOn)
    voiceBtn.title = on ? s.menuVoiceOff : s.menuVoiceOn
    voiceBtn.replaceChildren(svg(ICONS[on ? 'menuVoice' : 'menuVoiceOff']))
  }

  /** Hover (mouse) or keyboard focus: say the control's name. Skip touch — the tap will speak. */
  function speakOnExplore(el: HTMLElement, text: () => string): void {
    el.addEventListener('pointerenter', (e) => {
      if (!ctx.prefs.menuVoice) return
      if (Date.now() < muteExploreUntil) return
      if ((e as PointerEvent).pointerType === 'touch') return
      voice(text(), false)
    })
    el.addEventListener('focus', () => {
      if (!ctx.prefs.menuVoice) return
      if (Date.now() < muteExploreUntil) return
      voice(text(), false)
    })
  }

  // ── Rendering ──
  function render(): void {
    const s = ctx.strings
    title.textContent = view === 'menu' ? s.menuTitle : s.structureTitle
    backBtn.hidden = view === 'menu'
    backBtn.setAttribute('aria-label', s.menuTitle)
    resetBtn.hidden = view !== 'menu'
    trigger.setAttribute('aria-label', s.openMenu)
    trigger.title = s.openMenu
    closeBtn.setAttribute('aria-label', s.closeMenu)
    closeBtn.title = s.closeMenu
    paintVoiceBtn()
    ctx.host.setAttribute('dir', ctx.lang === 'ar' || ctx.lang === 'he' ? 'rtl' : 'ltr')

    body.replaceChildren()
    footer.replaceChildren()
    if (view === 'structure') {
      body.appendChild(renderStructure(s, (el) => {
        close()
        jumpTo(el)
      }))
      return
    }

    // Language
    const langs = Object.keys(cfg.strings)
    if (langs.length > 1) {
      const select = h('select', { class: 'cb-a11y-select', 'aria-label': s.language }) as HTMLSelectElement
      for (const code of langs) {
        const opt = h('option', { value: code, text: cfg.languageNames[code] || code }) as HTMLOptionElement
        if (code === ctx.lang) opt.selected = true
        select.appendChild(opt)
      }
      select.addEventListener('change', () => {
        ctx.prefs.lang = select.value
        setLanguage(ctx, select.value)
        ctx.save()
        render()
        ;(root.querySelector('.cb-a11y-select') as HTMLElement | null)?.focus()
        ctx.announce(ctx.strings.menuTitle)
      })
      body.appendChild(select)
    }

    // Profiles
    if (enabled.has('profiles')) {
      const card = h('div', { class: 'cb-a11y-card' }, [h('h3', { text: s.sectionProfiles })])
      for (const id of PROFILE_ORDER) {
        if (id === 'readAloud' && (!enabled.has('readAloud') || !ttsAvailable())) continue
        const on = ctx.prefs.profile === id
        const row = h('button', {
          type: 'button',
          class: 'cb-a11y-profile',
          role: 'switch',
          'aria-checked': String(on),
          'aria-label': `${s.profiles[id].name}, ${on ? s.speakOn : s.speakOff}`,
          'data-profile': id,
        }, [
          h('span', { class: 'ic', 'aria-hidden': 'true' }, [svg(ICONS[PROFILE_ICON[id]])]),
          h('span', { class: 'tx' }, [h('b', { text: s.profiles[id].name }), h('span', { text: s.profiles[id].description })]),
          h('span', { class: 'cb-a11y-switch', 'aria-hidden': 'true' }),
        ])
        row.addEventListener('click', () => {
          const turningOn = !on
          applyProfile(ctx.prefs, on ? null : id)
          const msg =
            id === 'readAloud'
              ? turningOn
                ? s.readAloudOnSpeak
                : s.readAloudOffSpeak
              : turningOn
                ? fmt(s.profileApplied, { name: s.profiles[id].name })
                : fmt(s.turnedOff, { name: s.profiles[id].name })
          commit(msg)
          voice(msg, true)
          ctx.track('a11y_profile', { profile: id, on: turningOn })
          ;(root.querySelector(`[data-profile="${id}"]`) as HTMLElement | null)?.focus()
        })
        speakOnExplore(row, () => {
          if (id === 'readAloud') return ctx.prefs.toggles.readAloud ? s.readAloudPreviewOn : s.readAloudPreviewOff
          return fmt(s.profilePreview, { name: s.profiles[id].name, state: ctx.prefs.profile === id ? s.speakOn : s.speakOff })
        })
        card.appendChild(row)
      }
      body.appendChild(card)
    }

    // Content: font size stepper first, then tiles
    for (const group of GROUPS) {
      const keys = group.keys.filter((k) => enabled.has(k))
      const isContent = group.title === 'sectionContent'
      if (!keys.length && !(isContent && enabled.has('fontSize'))) continue
      const card = h('div', { class: 'cb-a11y-card' }, [h('h3', { text: s[group.title] as string })])
      if (isContent && enabled.has('fontSize')) card.appendChild(renderStepper())
      if (keys.length) {
        const grid = h('div', { class: 'cb-a11y-grid' })
        for (const key of keys) grid.appendChild(renderTile(key))
        card.appendChild(grid)
      }
      body.appendChild(card)
    }

    // Footer
    const reset = h('button', { type: 'button', class: 'cb-a11y-reset', text: s.resetSettings })
    reset.addEventListener('click', () => {
      doReset()
      ;(root.querySelector('.cb-a11y-reset') as HTMLElement | null)?.focus()
    })
    footer.appendChild(reset)
    const links = h('div', { class: 'cb-a11y-links' })
    if (cfg.statementUrl) links.appendChild(h('a', { href: cfg.statementUrl, target: '_blank', rel: 'noopener' }, [svg(ICONS.external), s.statementLink]))
    if (cfg.feedbackEmail) links.appendChild(h('a', { href: `mailto:${cfg.feedbackEmail}?subject=${encodeURIComponent(s.feedbackLink)}` }, [svg(ICONS.mail), s.feedbackLink]))
    if (links.childNodes.length) footer.appendChild(links)
    const fine = h('p', { class: 'cb-a11y-fine', text: s.disclaimer })
    if (cfg.poweredBy) {
      fine.appendChild(document.createTextNode(' '))
      fine.appendChild(h('a', { href: 'https://www.cookie-banner.ca/?ref=a11y', target: '_blank', rel: 'noopener', text: s.poweredBy }))
    }
    footer.appendChild(fine)
  }

  function renderStepper(): HTMLElement {
    const s = ctx.strings
    const value = h('span', { class: 'val', 'aria-live': 'off', text: `${ctx.prefs.fontSize}%` })
    const dec = h('button', { type: 'button', class: 'cb-a11y-stepbtn', 'aria-label': s.fontSizeDecrease }, [svg(ICONS.minus)]) as HTMLButtonElement
    const inc = h('button', { type: 'button', class: 'cb-a11y-stepbtn', 'aria-label': s.fontSizeIncrease }, [svg(ICONS.plus)]) as HTMLButtonElement
    dec.disabled = ctx.prefs.fontSize <= FONT_MIN
    inc.disabled = ctx.prefs.fontSize >= FONT_MAX
    const step = (dir: 1 | -1) => {
      const v = stepFont(ctx.prefs, dir)
      commit(fmt(s.fontSizeAnnounce, { value: v }))
      ctx.track('a11y_toggle', { feature: 'fontSize', value: v })
      // keep focus on the same button after re-render
      ;(root.querySelector(dir === 1 ? '.cb-a11y-stepbtn:last-of-type' : '.cb-a11y-stepbtn') as HTMLElement | null)?.focus()
    }
    dec.addEventListener('click', () => step(-1))
    inc.addEventListener('click', () => step(1))
    return h('div', { class: 'cb-a11y-stepper', role: 'group', 'aria-label': `${s.fontSize}, ${ctx.prefs.fontSize}%` }, [
      h('div', { class: 'lb' }, [svg(ICONS.fontSize), s.fontSize]),
      dec, value, inc,
    ])
  }

  function renderTile(key: A11yFeatureKey): HTMLElement {
    const s = ctx.strings
    const name = s[key as keyof typeof s] as string
    const isLevel = (LEVEL_KEYS as string[]).includes(key)
    const level = isLevel ? ctx.prefs[key as LevelKey] : 0
    const on = isLevel ? level > 0 : key === 'pageStructure' ? false : Boolean(ctx.prefs.toggles[key as ToggleKey])
    const tile = h('button', {
      type: 'button',
      class: key === 'readAloud' ? 'cb-a11y-tile is-read-aloud' : 'cb-a11y-tile',
      role: key === 'pageStructure' ? null : 'switch',
      'aria-checked': key === 'pageStructure' ? null : String(on),
      'data-key': key,
      'aria-label': isLevel
        ? `${name}: ${s.levelLabels[level] || s.levelOff}`
        : key === 'pageStructure'
          ? name
          : `${name}, ${on ? s.speakOn : s.speakOff}`,
    }, [
      svg(ICONS[key]),
      h('span', { class: 'tx' }, [
        h('b', { text: name }),
        isLevel ? h('span', { class: 'lv-cap', text: s.levelLabels[level] || s.levelOff }) : null,
      ]),
    ])
    if (key === 'readAloud') {
      tile.querySelector('.tx')?.appendChild(h('span', { text: s.readAloudShort }))
    }
    if (isLevel) {
      const dots = h('span', { class: 'lv', 'aria-hidden': 'true' })
      for (let i = 1; i <= LEVEL_MAX; i++) dots.appendChild(h('i', { class: i <= level ? 'on' : '' }))
      tile.appendChild(dots)
    }
    if (key === 'readAloud') {
      if (!ttsAvailable()) {
        ;(tile as HTMLButtonElement).disabled = true
        tile.title = ctx.strings.ttsUnavailable
      } else {
        tile.title = ctx.strings.readAloudHint
      }
      speakOnExplore(tile, () => (on ? s.readAloudPreviewOn : s.readAloudPreviewOff))
    }
    tile.addEventListener('click', () => {
      if (key === 'pageStructure') {
        view = 'structure'
        render()
        ;(backBtn as HTMLElement).focus()
        ctx.track('a11y_open', { view: 'structure' })
        return
      }
      if (isLevel) {
        const lv = cycleLevel(ctx.prefs, key as LevelKey)
        commit(`${name}: ${s.levelLabels[lv] || s.levelOff}`)
        ctx.track('a11y_toggle', { feature: key, value: lv })
      } else {
        const next = !on
        setToggle(ctx.prefs, key as ToggleKey, next)
        const msg = key === 'readAloud' ? (next ? s.readAloudOnSpeak : s.readAloudOffSpeak) : fmt(next ? s.turnedOn : s.turnedOff, { name })
        commit(msg)
        if (key === 'readAloud') voice(msg, true)
        ctx.track('a11y_toggle', { feature: key, on: next })
      }
      ;(root.querySelector(`[data-key="${key}"]`) as HTMLElement | null)?.focus()
    })
    return tile
  }

  function commit(message: string): void {
    muteExploreUntil = Date.now() + 600
    ctx.save()
    ctx.render()
    render()
    ctx.announce(message)
  }

  function doReset(): void {
    resetPrefs(ctx.prefs)
    commit(ctx.strings.resetDone)
    ctx.track('a11y_reset')
  }

  // ── Open / close ──
  function open(): void {
    if (isOpen) return
    isOpen = true
    view = 'menu'
    // document.activeElement is retargeted to our host when focus is inside the shadow root
    const active = document.activeElement as HTMLElement | null
    lastFocus = active === ctx.host ? (root.activeElement as HTMLElement | null) : active
    if (!lastFocus || lastFocus === document.body || panel.contains(lastFocus)) lastFocus = trigger
    render()
    scrim.classList.add('is-open')
    panel.classList.add('is-open')
    trigger.setAttribute('aria-expanded', 'true')
    trigger.style.visibility = 'hidden' // would otherwise float over the open panel
    ;(closeBtn as HTMLElement).focus()
    document.addEventListener('keydown', onKeyDown, true)
    ctx.track('a11y_open')
  }
  function close(): void {
    if (!isOpen) return
    isOpen = false
    scrim.classList.remove('is-open')
    panel.classList.remove('is-open')
    trigger.setAttribute('aria-expanded', 'false')
    trigger.style.visibility = ''
    document.removeEventListener('keydown', onKeyDown, true)
    ;(lastFocus && lastFocus.isConnected ? lastFocus : trigger).focus()
  }
  function toggle(): void {
    isOpen ? close() : open()
  }

  function onKeyDown(e: KeyboardEvent): void {
    if (e.key === 'Escape') {
      e.preventDefault()
      if (view === 'structure') {
        view = 'menu'
        render()
        ;(closeBtn as HTMLElement).focus()
      } else close()
      return
    }
    if (e.key !== 'Tab') return
    // Focus trap within the panel (shadow-root aware)
    const items = focusables(panel)
    if (!items.length) return
    const active = root.activeElement as HTMLElement | null
    const first = items[0]
    const last = items[items.length - 1]
    if (e.shiftKey && (active === first || !active || !panel.contains(active))) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && (active === last || !active || !panel.contains(active))) {
      e.preventDefault()
      first.focus()
    }
  }

  trigger.addEventListener('click', toggle)
  speakOnExplore(trigger, () => ctx.strings.openMenu)
  voiceBtn.addEventListener('click', () => {
    const next = !ctx.prefs.menuVoice
    ctx.prefs.menuVoice = next
    ctx.save()
    paintVoiceBtn()
    ctx.track('a11y_toggle', { feature: 'menuVoice', on: next })
    if (!next) {
      stopSpeaking()
      ctx.announce(ctx.strings.menuVoiceOff)
      return
    }
    speakNow(ctx.strings.menuVoiceOnSpeak, voiceLang(), true)
  })
  closeBtn.addEventListener('click', close)
  backBtn.addEventListener('click', () => {
    view = 'menu'
    render()
    ;(closeBtn as HTMLElement).focus()
  })
  resetBtn.addEventListener('click', doReset)
  scrim.addEventListener('click', close)

  // Keyboard shortcut
  if (cfg.shortcut !== 'none') {
    document.addEventListener('keydown', (e) => {
      const match =
        cfg.shortcut === 'alt-shift-a'
          ? e.altKey && e.shiftKey && (e.key === 'A' || e.key === 'a')
          : (e.ctrlKey || e.metaKey) && !e.shiftKey && (e.key === 'u' || e.key === 'U')
      if (match) {
        e.preventDefault()
        toggle()
      }
    })
  }

  // Site-provided opener (e.g. a footer "Accessibility" link)
  if (cfg.trigger.customSelector) {
    document.addEventListener('click', (e) => {
      const t = e.target as Element | null
      if (t && t.closest(cfg.trigger.customSelector)) {
        e.preventDefault()
        open()
      }
    })
  }

  watchPlacement(trigger, cfg.trigger)

  return { open, close, toggle, render }
}

export function setLanguage(ctx: Ctx, code: string): void {
  const strings = ctx.cfg.strings[code] || ctx.cfg.strings.en || Object.values(ctx.cfg.strings)[0]
  ctx.strings = strings
  ctx.lang = code
}
