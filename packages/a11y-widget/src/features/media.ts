/** Pause media, CSS/WAAPI motion, and a few known animation runtimes.
 *  Do not set animation-duration: 0s on `body *` — that completes every
 *  animation at once (animationend storms) and tanks GSAP/Lottie/Framer sites.
 */
import { HOST_ID } from '../dom'

/** Animations inside our own shadow root (panel slide, switches) must keep running. */
function ours(a: Animation): boolean {
  const target = (a.effect as KeyframeEffect | null)?.target
  const root = target?.getRootNode()
  return Boolean(root && (root as ShadowRoot).host && (root as ShadowRoot).host.id === HOST_ID)
}

const mutedByUs = new WeakSet<HTMLMediaElement>()
const pausedByUs = new WeakSet<HTMLMediaElement>()
let muteObserver: MutationObserver | null = null
let stopObserver: MutationObserver | null = null
let gsapPausedByUs = false

function media(): HTMLMediaElement[] {
  return Array.from(document.querySelectorAll<HTMLMediaElement>('audio,video'))
}

function schedule(fn: () => void, slot: { id: number }): void {
  if (slot.id) return
  const raf =
    typeof requestAnimationFrame === 'function'
      ? requestAnimationFrame
      : (cb: FrameRequestCallback) => setTimeout(cb, 16) as unknown as number
  slot.id = raf(() => {
    slot.id = 0
    fn()
  })
}

function cancelSlot(slot: { id: number }): void {
  if (!slot.id) return
  if (typeof cancelAnimationFrame === 'function') cancelAnimationFrame(slot.id)
  else clearTimeout(slot.id)
  slot.id = 0
}

const muteSlot = { id: 0 }
const stopSlot = { id: 0 }

export function applyMuteSounds(on: boolean): void {
  if (on) {
    const muteAll = () =>
      media().forEach((m) => {
        if (!m.muted) {
          m.muted = true
          mutedByUs.add(m)
        }
      })
    muteAll()
    if (!muteObserver && typeof MutationObserver !== 'undefined') {
      muteObserver = new MutationObserver(() => schedule(muteAll, muteSlot))
      muteObserver.observe(document.documentElement, { childList: true, subtree: true })
    }
  } else {
    muteObserver?.disconnect()
    muteObserver = null
    media().forEach((m) => {
      if (mutedByUs.has(m)) {
        m.muted = false
        mutedByUs.delete(m)
      }
    })
  }
}

function pauseWebAnimations(): void {
  try {
    document.getAnimations?.().forEach((a) => {
      if (!ours(a) && a.playState === 'running') a.pause()
    })
  } catch {
    /* older browsers */
  }
}

function pauseGsap(on: boolean): void {
  try {
    const gsap = (window as unknown as { gsap?: { globalTimeline?: { paused: (v?: boolean) => boolean } } })
      .gsap
    const tl = gsap?.globalTimeline
    if (!tl || typeof tl.paused !== 'function') return
    if (on && !tl.paused()) {
      tl.paused(true)
      gsapPausedByUs = true
    } else if (!on && gsapPausedByUs) {
      tl.paused(false)
      gsapPausedByUs = false
    }
  } catch {
    /* page has no GSAP, or a different shape */
  }
}

function pauseLottie(): void {
  document.querySelectorAll('lottie-player, dotlottie-player').forEach((el) => {
    const player = el as HTMLElement & { pause?: () => void }
    try {
      player.pause?.()
    } catch {
      /* ignore */
    }
  })
}

function pauseNow(): void {
  media().forEach((m) => {
    if (!m.paused) {
      m.pause()
      pausedByUs.add(m)
    }
    m.removeAttribute('autoplay')
  })
  pauseWebAnimations()
  pauseGsap(true)
  pauseLottie()
}

export function applyStopAnimations(on: boolean): void {
  if (on) {
    pauseNow()
    if (!stopObserver && typeof MutationObserver !== 'undefined') {
      stopObserver = new MutationObserver(() => schedule(pauseNow, stopSlot))
      stopObserver.observe(document.documentElement, { childList: true, subtree: true })
    }
  } else {
    stopObserver?.disconnect()
    stopObserver = null
    cancelSlot(stopSlot)
    pauseGsap(false)
    try {
      document.getAnimations?.().forEach((a) => {
        if (a.playState === 'paused' && !ours(a)) a.play()
      })
    } catch {
      /* ignore */
    }
    media().forEach((m) => {
      if (pausedByUs.has(m)) {
        m.play().catch(() => {})
        pausedByUs.delete(m)
      }
    })
  }
}
