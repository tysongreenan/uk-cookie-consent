/**
 * Read Aloud — Web Speech API for the reading unit under pointer, tap, keyboard
 * focus, or a text selection. Not a screen reader (VoiceOver/NVDA/TalkBack remain
 * the complete option); this is for people who want the page spoken without one.
 *
 * Cases we handle that a naive hover-TTS misses:
 * - iOS/Safari: synthesis is silent until a user-gesture speak (tap speaks immediately)
 * - Chrome: cancel() + speak() in the same tick drops the utterance (80ms defer)
 * - Chrome: speech dies after ~15s unless pause()/resume() keep it alive
 * - Voices not loaded yet (`voiceschanged`) and wrong voice for the element's lang
 * - Card-sized links: speak the heading/paragraph under the pointer, not the whole card
 * - Hidden / aria-hidden / decorative / presentation: skip
 * - Icon buttons: aria-label / aria-labelledby / associated <label>
 * - Form fields: name + current value + required + invalid; never speak passwords
 * - Selected text: speak the selection instead of the hovered node
 * - Nested hover jitter: same unit is not restarted; leaving cancels the hover timer
 * - Touch + mouseover: ignore the compatibility mouseover after a tap
 * - Shadow DOM: composedPath, not event.target
 * - Tab backgrounded / pagehide / Escape: stop so speech doesn't continue off-screen
 * - Highlight the unit so low-vision users can see what is being spoken
 */
import { fmt, HOST_ID, pageTarget } from '../dom'
import type { A11yStrings, Ctx } from '../types'

export const SPEAKING_ATTR = 'data-cb-a11y-speaking'
const MAX_CHARS = 800
const HOVER_MS = 380
const TOUCH_MOUSE_GUARD_MS = 900
const CHROME_DEFER_MS = 80
const KEEPALIVE_MS = 9000
const UNIT =
  'p,li,h1,h2,h3,h4,h5,h6,blockquote,td,th,dt,dd,label,button,summary,figcaption,caption,legend,pre,option,abbr,area,[role="button"],[role="img"],img,input,textarea,select,a[href],[contenteditable="true"],[contenteditable=""]'

const CARD_CHILD = 'h1,h2,h3,h4,h5,h6,p,li,figcaption,img,blockquote,td,th'

let over: ((e: Event) => void) | null = null
let out: ((e: Event) => void) | null = null
let focusIn: ((e: FocusEvent) => void) | null = null
let keyDown: ((e: KeyboardEvent) => void) | null = null
let pointerDown: ((e: PointerEvent) => void) | null = null
let selectionEnd: (() => void) | null = null
let onVis: (() => void) | null = null
let onHide: (() => void) | null = null
let hoverTimer = 0
let speakTimer = 0
let selTimer = 0
let keepAliveTimer = 0
let lastSpoken: Element | null = null
let pendingUnit: Element | null = null
let lastTouchAt = 0
let voicesReady = false
let live: { lang: string; strings: A11yStrings } | null = null

export function ttsAvailable(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window && typeof SpeechSynthesisUtterance !== 'undefined'
}

export function isHidden(el: Element | null): boolean {
  if (!el || !(el instanceof Element)) return true
  if (el.closest(`#${HOST_ID}`)) return true
  if (el.closest('[hidden],[aria-hidden="true"],[inert]')) return true
  const role = el.getAttribute('role') || ''
  if (role === 'presentation' || role === 'none') return true
  try {
    const cs = getComputedStyle(el)
    if (cs.display === 'none' || cs.visibility === 'hidden') return true
  } catch {
    /* jsdom */
  }
  return false
}

/**
 * Innermost thing a person would expect to hear — not a wrapping card <a>, not
 * <main>, not the widget.
 */
export function readingUnit(start: EventTarget | null): Element | null {
  if (!(start instanceof Element)) return null
  if (start.closest(`#${HOST_ID}`)) return null
  let el: Element | null = start
  while (el && el !== document.documentElement && el !== document.body) {
    if (el.id === HOST_ID) return null
    if (el.tagName === 'IFRAME') return null
    if (el.matches?.('input:not([type="hidden"]),textarea,select') && !isHidden(el)) return el
    if (el instanceof HTMLElement && el.isContentEditable && !isHidden(el)) return el
    if (el.matches?.(UNIT) && !isHidden(el)) {
      if (el.tagName === 'A' && el.querySelector(CARD_CHILD)) {
        const inner = start.closest(CARD_CHILD)
        if (inner && el.contains(inner) && !isHidden(inner)) return inner
      }
      return el
    }
    el = el.parentElement
  }
  return null
}

function labelledBy(el: Element): string {
  const ids = (el.getAttribute('aria-labelledby') || '').trim()
  if (!ids) return ''
  return ids
    .split(/\s+/)
    .map((id) => document.getElementById(id)?.textContent || '')
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function describedBy(el: Element): string {
  const ids = (el.getAttribute('aria-describedby') || '').trim()
  if (!ids) return ''
  return ids
    .split(/\s+/)
    .map((id) => document.getElementById(id)?.textContent || '')
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function associatedLabel(el: Element): string {
  if (!(el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement || el instanceof HTMLSelectElement)) return ''
  if (el.id) {
    const esc = typeof CSS !== 'undefined' && CSS.escape ? CSS.escape(el.id) : el.id.replace(/"/g, '')
    const lab = document.querySelector(`label[for="${esc}"]`)
    if (lab) return (lab.textContent || '').replace(/\s+/g, ' ').trim()
  }
  const wrap = el.closest('label')
  return wrap ? (wrap.textContent || '').replace(/\s+/g, ' ').trim() : ''
}

function visibleText(el: Element): string {
  if (el instanceof HTMLImageElement) return (el.alt || '').trim()
  const bits: string[] = []
  const walk = (node: Node, root: Element) => {
    if (node.nodeType === 3) {
      const t = (node.textContent || '').replace(/\s+/g, ' ')
      if (t.trim()) bits.push(t)
      return
    }
    if (!(node instanceof Element)) return
    if (node.closest(`#${HOST_ID}`)) return
    if (node.getAttribute('aria-hidden') === 'true' || node.hasAttribute('hidden')) return
    if (node.matches('script,style,noscript,template,svg')) return
    // A list item should not dump nested lists — those are their own units.
    if (root.tagName === 'LI' && node !== root && node.matches('ul,ol')) return
    for (const child of Array.from(node.childNodes)) walk(child, root)
  }
  walk(el, el)
  return bits.join(' ').replace(/\s+/g, ' ').trim()
}

function svgName(el: Element): string {
  if (el.tagName !== 'SVG' && el.getAttribute('role') !== 'img') return ''
  return (
    (el.getAttribute('aria-label') || '').trim() ||
    (el.querySelector('title')?.textContent || '').replace(/\s+/g, ' ').trim()
  )
}

function figureCaption(el: Element): string {
  const fig = el.closest('figure')
  const cap = fig?.querySelector('figcaption')
  return cap ? (cap.textContent || '').replace(/\s+/g, ' ').trim() : ''
}

function cellHeader(el: Element): string {
  if (el.tagName !== 'TD') return ''
  const row = el.closest('tr')
  const table = el.closest('table')
  if (!row || !table) return ''
  const idx = Array.from(row.children).indexOf(el)
  if (idx < 0) return ''
  const th =
    table.querySelector(`thead tr th:nth-child(${idx + 1})`) ||
    row.querySelector('th') ||
    table.querySelector(`tr:first-child th:nth-child(${idx + 1})`)
  return th ? (th.textContent || '').replace(/\s+/g, ' ').trim() : ''
}

export function accessibleName(el: Element): string {
  const by = labelledBy(el)
  if (by) return by
  const aria = (el.getAttribute('aria-label') || '').trim()
  if (aria) return aria
  if (el instanceof HTMLImageElement) {
    const alt = (el.alt || '').trim()
    if (alt) return alt
    return figureCaption(el)
  }
  if (el.tagName === 'AREA') return (el.getAttribute('alt') || '').trim()
  const svg = svgName(el)
  if (svg) return svg
  const lab = associatedLabel(el)
  if (lab) return lab
  const text = visibleText(el)
  const title = (el.getAttribute('title') || '').trim()
  const abbr = el.tagName === 'ABBR' ? title : ''
  return text || title || abbr
}

function rolePhrase(el: Element, strings: A11yStrings): string {
  const tag = el.tagName
  if (/^H[1-6]$/.test(tag)) return fmt(strings.speakHeading, { n: tag.slice(1) })
  if (tag === 'A' || el.getAttribute('role') === 'link') return strings.speakLink
  if (tag === 'BUTTON' || el.getAttribute('role') === 'button') return strings.speakButton
  if (tag === 'IMG' || el.getAttribute('role') === 'img' || tag === 'AREA') return strings.speakImage
  return ''
}

function controlValue(el: Element, strings: A11yStrings): string {
  if (el instanceof HTMLInputElement) {
    if (el.type === 'password') return ''
    if (el.type === 'checkbox' || el.type === 'radio') return el.checked ? strings.speakChecked : strings.speakNotChecked
    return el.value.trim()
  }
  if (el instanceof HTMLTextAreaElement) return el.value.trim()
  if (el instanceof HTMLSelectElement) return (el.selectedOptions[0]?.text || el.value || '').trim()
  return ''
}

export function clipUtterance(text: string): string {
  if (text.length <= MAX_CHARS) return text
  const slice = text.slice(0, MAX_CHARS)
  const at = Math.max(slice.lastIndexOf('. '), slice.lastIndexOf('? '), slice.lastIndexOf('! '))
  return (at > MAX_CHARS * 0.5 ? slice.slice(0, at + 1) : slice).trim()
}

export function buildUtterance(el: Element, strings: A11yStrings): string {
  if (el instanceof HTMLImageElement) {
    if (el.getAttribute('aria-hidden') === 'true' || /^(presentation|none)$/.test(el.getAttribute('role') || '')) return ''
    if (el.getAttribute('alt') === '') return ''
    if (el.getAttribute('alt') === null && !el.getAttribute('aria-label') && !figureCaption(el)) {
      return `${strings.speakImage}. ${strings.speakImageMissing}`
    }
  }
  const name = accessibleName(el)
  const role = rolePhrase(el, strings)
  const extra: string[] = []
  const header = cellHeader(el)
  if (header && header !== name) extra.push(header)
  const value = controlValue(el, strings)
  if (value && value !== name) extra.push(value)
  if (el instanceof HTMLElement && el.hasAttribute('required')) extra.push(strings.speakRequired)
  if (el.getAttribute('aria-invalid') === 'true') extra.push(strings.speakInvalid)
  const desc = describedBy(el)
  if (desc && desc !== name) extra.push(desc)
  if (!name && !role && extra.length === 0) return ''
  const parts = [role, name, ...extra].filter(Boolean)
  return clipUtterance(parts.join('. ').replace(/\s+/g, ' ').trim())
}

function selectionText(): string {
  try {
    const sel = window.getSelection()
    if (!sel || sel.isCollapsed) return ''
    const t = sel.toString().replace(/\s+/g, ' ').trim()
    return t.length >= 2 ? clipUtterance(t) : ''
  } catch {
    return ''
  }
}

function markSpeaking(el: Element | null): void {
  document.querySelectorAll(`[${SPEAKING_ATTR}]`).forEach((n) => n.removeAttribute(SPEAKING_ATTR))
  if (el instanceof HTMLElement) el.setAttribute(SPEAKING_ATTR, '')
}

function pickVoice(lang: string): SpeechSynthesisVoice | null {
  try {
    const voices = speechSynthesis.getVoices()
    if (!voices.length) return null
    const prefix = (lang || 'en').slice(0, 2).toLowerCase()
    return (
      voices.find((v) => v.lang.toLowerCase().startsWith(prefix) && v.localService) ||
      voices.find((v) => v.lang.toLowerCase().startsWith(prefix)) ||
      null
    )
  } catch {
    return null
  }
}

function ensureVoices(): void {
  if (voicesReady || !ttsAvailable()) return
  try {
    if (speechSynthesis.getVoices().length) voicesReady = true
    else speechSynthesis.addEventListener('voiceschanged', () => { voicesReady = true }, { once: true })
  } catch {
    /* ignore */
  }
}

function startKeepAlive(): void {
  if (keepAliveTimer || !ttsAvailable()) return
  keepAliveTimer = window.setInterval(() => {
    try {
      if (speechSynthesis.speaking && !speechSynthesis.paused) {
        speechSynthesis.pause()
        speechSynthesis.resume()
      }
    } catch {
      /* ignore */
    }
  }, KEEPALIVE_MS)
}

function stopKeepAlive(): void {
  if (keepAliveTimer) {
    clearInterval(keepAliveTimer)
    keepAliveTimer = 0
  }
}

export function stopSpeaking(): void {
  clearTimeout(speakTimer)
  try {
    speechSynthesis.cancel()
  } catch {
    /* ignore */
  }
  lastSpoken = null
  markSpeaking(null)
}

/**
 * Speak chrome in the menu itself (trigger, profiles, the Read Aloud tile).
 * People who cannot read the labels still need to hear "this is Read aloud,
 * and it is on" — the page TTS never reaches inside our shadow root.
 */
export function speakNow(text: string, lang: string, immediate = false): void {
  if (!ttsAvailable()) return
  const t = (text || '').replace(/\s+/g, ' ').trim()
  if (!t) return
  ensureVoices()
  lastSpoken = null
  markSpeaking(null)
  speakText(t, lang, null, immediate)
}

function resolveLang(el: Element | null, fallback: string): string {
  return (el?.closest('[lang]')?.getAttribute('lang') || document.documentElement.lang || fallback || 'en').slice(0, 8)
}

function speakText(text: string, lang: string, el: Element | null, immediate = false): void {
  if (!text) return
  try {
    if (speechSynthesis.paused) speechSynthesis.resume()
    if (speechSynthesis.speaking || speechSynthesis.pending) speechSynthesis.cancel()
  } catch {
    /* ignore */
  }
  clearTimeout(speakTimer)
  const fire = () => {
    try {
      const u = new SpeechSynthesisUtterance(text)
      u.lang = resolveLang(el, lang)
      u.rate = 0.92
      const voice = pickVoice(u.lang)
      if (voice) u.voice = voice
      u.onend = u.onerror = () => {
        if (lastSpoken === el) lastSpoken = null
        markSpeaking(null)
      }
      startKeepAlive()
      speechSynthesis.speak(u)
    } catch {
      /* ignore */
    }
  }
  if (immediate) fire()
  else speakTimer = window.setTimeout(fire, CHROME_DEFER_MS)
}

function speakUnit(el: Element, lang: string, strings: A11yStrings, immediate = false): void {
  if (el === lastSpoken) return
  const text = buildUtterance(el, strings)
  if (!text) return
  lastSpoken = el
  markSpeaking(el)
  if (el instanceof HTMLElement) {
    try {
      const r = el.getBoundingClientRect()
      const vh = document.documentElement.clientHeight || window.innerHeight
      if (r.bottom < 0 || r.top > vh) el.scrollIntoView({ block: 'nearest', inline: 'nearest' })
    } catch {
      /* ignore */
    }
  }
  speakText(text, lang, el, immediate)
}

function detach(): void {
  if (over) document.removeEventListener('mouseover', over)
  if (out) document.removeEventListener('mouseout', out)
  if (focusIn) document.removeEventListener('focusin', focusIn)
  if (pointerDown) document.removeEventListener('pointerdown', pointerDown)
  if (selectionEnd) document.removeEventListener('selectionchange', selectionEnd)
  if (keyDown) document.removeEventListener('keydown', keyDown)
  if (onVis) document.removeEventListener('visibilitychange', onVis)
  if (onHide) window.removeEventListener('pagehide', onHide)
  over = out = focusIn = keyDown = pointerDown = selectionEnd = onVis = onHide = live = null
  clearTimeout(hoverTimer)
  clearTimeout(selTimer)
  stopKeepAlive()
  stopSpeaking()
}

export function applyReadAloud(ctx: Ctx, on: boolean): void {
  if (!on) {
    if (over) detach()
    return
  }
  if (!ttsAvailable()) {
    if (over) detach()
    ctx.announce(ctx.strings.ttsUnavailable)
    return
  }
  live = { lang: ctx.lang === 'auto' ? navigator.language : ctx.lang, strings: ctx.strings }
  if (over) return
  ensureVoices()
  over = (e) => {
    if (!live) return
    if (Date.now() - lastTouchAt < TOUCH_MOUSE_GUARD_MS) return
    if (selectionText()) return
    const unit = readingUnit(pageTarget(e))
    clearTimeout(hoverTimer)
    pendingUnit = unit
    if (!unit) return
    hoverTimer = window.setTimeout(() => {
      if (pendingUnit === unit && live) speakUnit(unit, live.lang, live.strings)
    }, HOVER_MS)
  }
  out = (e) => {
    const unit = readingUnit(pageTarget(e))
    const next = readingUnit((e as MouseEvent).relatedTarget)
    if (unit && next !== unit) {
      clearTimeout(hoverTimer)
      if (pendingUnit === unit) pendingUnit = null
    }
  }
  focusIn = (e) => {
    if (!live) return
    const unit = readingUnit(pageTarget(e))
    if (!unit) return
    speakUnit(unit, live.lang, live.strings)
  }
  pointerDown = (e) => {
    if (e.pointerType === 'mouse') return
    lastTouchAt = Date.now()
    const unit = readingUnit(pageTarget(e))
    if (!unit || !live) return
    speakUnit(unit, live.lang, live.strings, true)
  }
  selectionEnd = () => {
    clearTimeout(selTimer)
    selTimer = window.setTimeout(() => {
      const t = selectionText()
      if (!t || !live) return
      lastSpoken = null
      markSpeaking(null)
      speakText(t, live.lang, null)
    }, 400)
  }
  keyDown = (e) => {
    if (e.key === 'Escape') {
      stopSpeaking()
      e.stopPropagation()
    }
  }
  onVis = () => {
    if (document.hidden) stopSpeaking()
  }
  onHide = () => stopSpeaking()
  document.addEventListener('mouseover', over, { passive: true })
  document.addEventListener('mouseout', out, { passive: true })
  document.addEventListener('focusin', focusIn)
  document.addEventListener('pointerdown', pointerDown, { passive: true })
  document.addEventListener('selectionchange', selectionEnd)
  document.addEventListener('keydown', keyDown)
  document.addEventListener('visibilitychange', onVis)
  window.addEventListener('pagehide', onHide)
}
