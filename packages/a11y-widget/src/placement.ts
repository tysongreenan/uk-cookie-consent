/**
 * Trigger placement that never sits on top of the cookie banner.
 *
 * banner.js injects `#cookie-consent-banner` (bar, card or modal), and after a
 * choice `#cookie-settings-float` (the "Cookie Settings" pill). Both are fixed
 * and can land in any corner, can animate in, and appear asynchronously — so
 * instead of guessing we measure: place the trigger at its configured spot,
 * then, while it intersects an obstacle, push it along its anchored axis
 * (up for bottom-anchored, down for top-anchored, up for middle).
 */
import type { A11yRuntimeConfig } from './types'

const OBSTACLES = ['cookie-consent-banner', 'cookie-settings-float']
const GAP = 12
const MARGIN = 6

type Trigger = HTMLElement & { dataset: DOMStringMap }

/** Fixed elements are laid out against the viewport *minus scrollbars*; innerHeight includes them. */
function viewportHeight(): number {
  return document.documentElement.clientHeight || window.innerHeight
}

function visibleRect(el: Element | null): DOMRect | null {
  if (!el) return null
  const cs = getComputedStyle(el)
  if (cs.display === 'none' || cs.visibility === 'hidden' || cs.opacity === '0') return null
  const r = el.getBoundingClientRect()
  if (r.width <= 0 || r.height <= 0) return null
  // Off-screen (e.g. slide-in animation start) is not an obstacle
  if (r.bottom < 0 || r.top > viewportHeight() || r.right < 0 || r.left > (document.documentElement.clientWidth || window.innerWidth)) return null
  return r
}

function intersects(a: DOMRect, b: DOMRect): boolean {
  return a.left < b.right + MARGIN && a.right > b.left - MARGIN && a.top < b.bottom + MARGIN && a.bottom > b.top - MARGIN
}

export function applyBasePosition(trigger: Trigger, cfg: A11yRuntimeConfig['trigger']): void {
  const st = trigger.style
  st.left = st.right = st.top = st.bottom = 'auto'
  st.transform = ''
  const horizontal = cfg.position.endsWith('right') ? 'right' : 'left'
  st[horizontal] = `calc(${cfg.offsetX}px + env(safe-area-inset-${horizontal}, 0px))`
  if (cfg.position.startsWith('top')) st.top = `calc(${cfg.offsetY}px + env(safe-area-inset-top, 0px))`
  else if (cfg.position.startsWith('middle')) {
    st.top = '50%'
    st.transform = 'translateY(-50%)'
  } else st.bottom = `calc(${cfg.offsetY}px + env(safe-area-inset-bottom, 0px))`
}

/** Push the trigger clear of every visible obstacle. Returns true if it moved. */
export function avoidObstacles(trigger: Trigger, cfg: A11yRuntimeConfig['trigger']): boolean {
  applyBasePosition(trigger, cfg)
  const anchor = cfg.position.startsWith('top') ? 'top' : cfg.position.startsWith('middle') ? 'middle' : 'bottom'
  let moved = false

  for (let pass = 0; pass < 3; pass++) {
    const me = trigger.getBoundingClientRect()
    if (me.width === 0) return moved
    const hit = OBSTACLES.map((id) => visibleRect(document.getElementById(id))).find((r) => r && intersects(me, r))
    if (!hit) return moved
    moved = true
    if (anchor === 'bottom') {
      trigger.style.bottom = `${Math.max(0, viewportHeight() - hit.top + GAP)}px`
    } else if (anchor === 'top') {
      trigger.style.top = `${hit.bottom + GAP}px`
    } else {
      trigger.style.transform = ''
      trigger.style.top = `${Math.max(GAP, hit.top - me.height - GAP)}px`
    }
  }
  return moved
}

/**
 * Keep the trigger clear over time: obstacles are injected later, shown/hidden
 * via the style attribute, resized, and animated.
 */
export function watchPlacement(trigger: Trigger, cfg: A11yRuntimeConfig['trigger']): () => void {
  let raf = 0
  const timers: number[] = []
  const check = () => {
    if (raf) return
    raf = requestAnimationFrame(() => {
      raf = 0
      try {
        avoidObstacles(trigger, cfg)
      } catch {
        /* never let placement break the page */
      }
    })
  }
  // Banners animate in; re-measure a few times after any change settles.
  const burst = () => {
    check()
    timers.forEach(clearTimeout)
    timers.length = 0
    for (const ms of [120, 400, 900, 1800]) timers.push(window.setTimeout(check, ms))
  }

  const attached = new WeakSet<Element>()
  const attrObserver = typeof MutationObserver !== 'undefined' ? new MutationObserver(burst) : null
  const sizeObserver = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(check) : null
  const attach = () => {
    for (const id of OBSTACLES) {
      const el = document.getElementById(id)
      if (!el || attached.has(el)) continue
      attached.add(el)
      attrObserver?.observe(el, { attributes: true, attributeFilter: ['style', 'class', 'hidden', 'aria-hidden'] })
      sizeObserver?.observe(el)
      el.addEventListener('transitionend', check)
      el.addEventListener('animationend', check)
    }
  }

  attach()
  burst()
  const bodyObserver =
    typeof MutationObserver !== 'undefined'
      ? new MutationObserver(() => {
          attach()
          burst()
        })
      : null
  bodyObserver?.observe(document.body, { childList: true })
  window.addEventListener('resize', check, { passive: true })
  window.addEventListener('orientationchange', burst)

  return () => {
    bodyObserver?.disconnect()
    attrObserver?.disconnect()
    sizeObserver?.disconnect()
    window.removeEventListener('resize', check)
    window.removeEventListener('orientationchange', burst)
    timers.forEach(clearTimeout)
    if (raf) cancelAnimationFrame(raf)
  }
}
