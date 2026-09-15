/**
 * Per-element font scaling. Sites mix px/rem/em, so scaling <html> alone misses
 * most text; instead we record each text-bearing element's original computed
 * size once and set an !important inline size from it. Idempotent for any scale,
 * fully reversible, and watches for new nodes while active.
 */
import { HOST_ID } from '../dom'

const ORIG_ATTR = 'data-cb-a11y-fs'
/** The author's own inline font-size (page builders set these); restored on reset. */
const INLINE_ATTR = 'data-cb-a11y-fs-inline'
const MAX_ELEMENTS = 6000
const SKIP = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEMPLATE', 'SVG', 'PATH', 'IFRAME', 'CANVAS', 'VIDEO', 'AUDIO'])

let currentScale = 1
let observer: MutationObserver | null = null
let pending: number | null = null

function hasOwnText(el: Element): boolean {
  for (const node of Array.from(el.childNodes)) {
    if (node.nodeType === 3 && (node.textContent || '').trim()) return true
  }
  return false
}

function scaleElement(el: HTMLElement, scale: number): void {
  let orig = parseFloat(el.getAttribute(ORIG_ATTR) || '')
  if (!Number.isFinite(orig)) {
    orig = parseFloat(getComputedStyle(el).fontSize)
    if (!Number.isFinite(orig) || orig <= 0) return
    el.setAttribute(ORIG_ATTR, String(orig))
    const inline = el.style.getPropertyValue('font-size')
    if (inline) el.setAttribute(INLINE_ATTR, `${inline}${el.style.getPropertyPriority('font-size') === 'important' ? '!' : ''}`)
  }
  el.style.setProperty('font-size', `${Math.round(nextSize(orig, scale) * 100) / 100}px`, 'important')
}

function nextSize(orig: number, scale: number): number {
  const scaled = orig * scale
  // Enlarged tiny type (10–12px captions, legal, nav) still fails low vision if we
  // only multiply. Mild enlarge: 15px floor. Visually-impaired-scale (≥140%): 18px.
  if (scale >= 1.4) return Math.max(scaled, 18)
  if (scale > 1) return Math.max(scaled, 15)
  return scaled
}

function walk(root: ParentNode, scale: number): void {
  const all = root.querySelectorAll('body *')
  const limit = Math.min(all.length, MAX_ELEMENTS)
  for (let i = 0; i < limit; i++) {
    const el = all[i] as HTMLElement
    if (SKIP.has(el.tagName.toUpperCase()) || el.id === HOST_ID || el.closest(`#${HOST_ID}`)) continue
    if (!hasOwnText(el) && !el.matches('input,textarea,select,button')) continue
    scaleElement(el, scale)
  }
}

function restore(): void {
  document.querySelectorAll(`[${ORIG_ATTR}]`).forEach((el) => {
    const inline = el.getAttribute(INLINE_ATTR)
    if (inline) {
      const important = inline.endsWith('!')
      ;(el as HTMLElement).style.setProperty('font-size', important ? inline.slice(0, -1) : inline, important ? 'important' : '')
    } else {
      ;(el as HTMLElement).style.removeProperty('font-size')
    }
    el.removeAttribute(ORIG_ATTR)
    el.removeAttribute(INLINE_ATTR)
  })
}

export function applyFontSize(percent: number): void {
  const scale = percent / 100
  if (scale === 1) {
    currentScale = 1
    restore()
    stopObserving()
    return
  }
  currentScale = scale
  walk(document, scale)
  startObserving()
}

function startObserving(): void {
  if (observer || typeof MutationObserver === 'undefined') return
  observer = new MutationObserver(() => {
    if (pending !== null) return
    pending = window.setTimeout(() => {
      pending = null
      if (currentScale !== 1) walk(document, currentScale)
    }, 250)
  })
  observer.observe(document.body, { childList: true, subtree: true })
}

function stopObserving(): void {
  observer?.disconnect()
  observer = null
  if (pending !== null) {
    clearTimeout(pending)
    pending = null
  }
}
