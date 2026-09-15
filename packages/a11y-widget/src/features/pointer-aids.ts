/**
 * Pointer-following aids rendered inside our shadow root:
 * - Reading guide: a horizontal bar that tracks the pointer's Y.
 * - Super focus: dims the page except the block under the pointer.
 * - Image tooltips: shows alt text (or a "missing description" flag) on hover.
 */
import { h, HOST_ID, pageTarget } from '../dom'
import type { Ctx } from '../types'

// ── Reading guide ───────────────────────────────────────────────────

let guide: HTMLElement | null = null
let guideMove: ((e: PointerEvent) => void) | null = null

export function applyReadingGuide(ctx: Ctx, on: boolean): void {
  if (on && !guide) {
    guide = h('div', { class: 'cb-a11y-guide', 'aria-hidden': 'true' })
    // Start mid-viewport so the guide is visible before the pointer moves (touch devices)
    guide.style.transform = `translateY(${Math.round(window.innerHeight * 0.4)}px)`
    ctx.root.appendChild(guide)
    guideMove = (e) => {
      if (guide) guide.style.transform = `translateY(${e.clientY - 6}px)`
    }
    document.addEventListener('pointermove', guideMove, { passive: true })
    document.addEventListener('pointerdown', guideMove, { passive: true })
  } else if (!on && guide) {
    guide.remove()
    guide = null
    if (guideMove) {
      document.removeEventListener('pointermove', guideMove)
      document.removeEventListener('pointerdown', guideMove)
    }
    guideMove = null
  }
}

// ── Super focus ─────────────────────────────────────────────────────

const BLOCKS = 'p,li,h1,h2,h3,h4,h5,h6,blockquote,figure,td,th,dt,dd,pre,label,button,a,summary,article,section,aside,nav,header,footer,form,img,video'

let focusHole: HTMLElement | null = null
let focusMove: ((e: PointerEvent) => void) | null = null
let focusRaf = 0
let lastPoint: { x: number; y: number } | null = null

function nearestBlock(x: number, y: number): Element | null {
  const el = document.elementFromPoint(x, y)
  if (!el || el.id === HOST_ID || el.closest(`#${HOST_ID}`)) return null
  const block = el.closest(BLOCKS)
  if (!block || block === document.body || block === document.documentElement) return null
  return block
}

function paintHole(): void {
  focusRaf = 0
  if (!focusHole || !lastPoint) return
  const block = nearestBlock(lastPoint.x, lastPoint.y)
  // Between blocks (margins, gutters): keep the last spotlight instead of flashing the dim off and on
  if (!block) return
  const r = block.getBoundingClientRect()
  const pad = 8
  focusHole.style.opacity = '1'
  focusHole.style.transform = `translate(${r.left - pad}px, ${r.top - pad}px)`
  focusHole.style.width = `${r.width + pad * 2}px`
  focusHole.style.height = `${r.height + pad * 2}px`
}

export function applySuperFocus(ctx: Ctx, on: boolean): void {
  if (on && !focusHole) {
    focusHole = h('div', { class: 'cb-a11y-focus-hole', 'aria-hidden': 'true' })
    ctx.root.appendChild(focusHole)
    focusMove = (e) => {
      if (typeof e.clientX === 'number') lastPoint = { x: e.clientX, y: e.clientY }
      if (!focusRaf) focusRaf = requestAnimationFrame(paintHole)
    }
    document.addEventListener('pointermove', focusMove, { passive: true })
    document.addEventListener('pointerdown', focusMove, { passive: true })
    document.addEventListener('scroll', focusMove as EventListener, { passive: true, capture: true })
  } else if (!on && focusHole) {
    focusHole.remove()
    focusHole = null
    if (focusMove) {
      document.removeEventListener('pointermove', focusMove)
      document.removeEventListener('pointerdown', focusMove)
      document.removeEventListener('scroll', focusMove as EventListener, { capture: true } as EventListenerOptions)
    }
    focusMove = null
    lastPoint = null
  }
}

// ── Image tooltips ──────────────────────────────────────────────────

let tip: HTMLElement | null = null
let tipOver: ((e: Event) => void) | null = null
let tipOut: ((e: Event) => void) | null = null

function describe(el: Element, missing: string): { text: string; missing: boolean } {
  const img = el.closest('img,[role="img"],svg,picture,figure') as HTMLElement | null
  if (!img) return { text: '', missing: false }
  // Explicitly decorative: nothing to describe and nothing to flag
  if (img.getAttribute('aria-hidden') === 'true' || /^(presentation|none)$/.test(img.getAttribute('role') || '')) {
    return { text: '', missing: false }
  }
  const rawAlt = img.getAttribute('alt')
  if (rawAlt !== null && rawAlt.trim() === '') return { text: '', missing: false }
  const labelled = (img.getAttribute('aria-labelledby') || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((id) => document.getElementById(id)?.textContent || '')
    .join(' ')
    .trim()
  const alt =
    labelled ||
    rawAlt ||
    img.getAttribute('aria-label') ||
    img.getAttribute('title') ||
    img.querySelector('title')?.textContent ||
    img.querySelector('figcaption')?.textContent ||
    (img.tagName === 'PICTURE' ? img.querySelector('img')?.getAttribute('alt') : null) ||
    null
  if (alt === null) return { text: missing, missing: true }
  if (String(alt).trim() === '') return { text: '', missing: false }
  return { text: String(alt).trim(), missing: false }
}

function placeTip(node: HTMLElement, x: number, y: number): void {
  const xPos = Math.min(x + 14, window.innerWidth - node.offsetWidth - 8)
  const yPos = Math.min(y + 18, window.innerHeight - node.offsetHeight - 8)
  node.style.transform = `translate(${Math.max(8, xPos)}px, ${Math.max(8, yPos)}px)`
}

export function applyImageTooltips(ctx: Ctx, on: boolean): void {
  if (on && !tip) {
    tip = h('div', { class: 'cb-a11y-tip', role: 'tooltip', hidden: true })
    ctx.root.appendChild(tip)
    const showAt = (target: Element | null, x: number, y: number) => {
      if (!tip || !target) {
        if (tip) tip.hidden = true
        return
      }
      const d = describe(target, ctx.strings.missingAlt)
      if (!d.text) {
        tip.hidden = true
        return
      }
      tip.textContent = d.text
      tip.classList.toggle('is-missing', d.missing)
      tip.hidden = false
      placeTip(tip, x, y)
    }
    tipOver = (e) => {
      const target = pageTarget(e)
      if (!target) {
        if (tip) tip.hidden = true
        return
      }
      const pt = e as PointerEvent | MouseEvent
      showAt(target, 'clientX' in pt ? pt.clientX : 0, 'clientY' in pt ? pt.clientY : 0)
    }
    tipOut = (e) => {
      const next = (e as MouseEvent).relatedTarget
      if (next instanceof Node && (e.currentTarget as Node | null)?.contains?.(next)) return
      const related = next instanceof Element ? next.closest('img,[role="img"],svg,picture,figure') : null
      const from = pageTarget(e)?.closest('img,[role="img"],svg,picture,figure')
      if (related && related === from) return
      if (tip) tip.hidden = true
    }
    document.addEventListener('pointerover', tipOver, { passive: true })
    document.addEventListener('pointermove', tipOver, { passive: true })
    document.addEventListener('pointerdown', tipOver, { passive: true })
    document.addEventListener('pointerout', tipOut, { passive: true })
  } else if (!on && tip) {
    tip.remove()
    tip = null
    if (tipOver) {
      document.removeEventListener('pointerover', tipOver)
      document.removeEventListener('pointermove', tipOver)
      document.removeEventListener('pointerdown', tipOver)
    }
    if (tipOut) document.removeEventListener('pointerout', tipOut)
    tipOver = tipOut = null
  }
}
