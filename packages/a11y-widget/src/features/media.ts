/** Stop animations (pause media + Web Animations) and mute sounds. */
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

function media(): HTMLMediaElement[] {
  return Array.from(document.querySelectorAll<HTMLMediaElement>('audio,video'))
}

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
      muteObserver = new MutationObserver(muteAll)
      muteObserver.observe(document.body, { childList: true, subtree: true })
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

export function applyStopAnimations(on: boolean): void {
  if (on) {
    const pauseAll = () => {
      media().forEach((m) => {
        if (!m.paused) {
          m.pause()
          pausedByUs.add(m)
        }
        m.removeAttribute('autoplay')
      })
      try {
        document.getAnimations?.().forEach((a) => {
          if (!ours(a)) a.pause()
        })
      } catch {
        /* older browsers */
      }
    }
    pauseAll()
    if (!stopObserver && typeof MutationObserver !== 'undefined') {
      stopObserver = new MutationObserver(pauseAll)
      stopObserver.observe(document.body, { childList: true, subtree: true })
    }
  } else {
    stopObserver?.disconnect()
    stopObserver = null
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
