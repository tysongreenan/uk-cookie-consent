// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest'
import { buildAdjustCss } from '../src/adjust-css'
import { applyStopAnimations } from '../src/features/media'

describe('stop-animations CSS', () => {
  it('pauses playback instead of zeroing every animation on the page', () => {
    const css = buildAdjustCss('https://example.com/a11y')
    expect(css).toContain('html.cb-a11y-stopAnimations')
    expect(css).toContain('animation-play-state:paused')
    expect(css).not.toContain('animation-duration:0s')
    expect(css).not.toContain('transition-duration:0s')
  })
})

describe('applyStopAnimations', () => {
  afterEach(() => {
    applyStopAnimations(false)
    vi.unstubAllGlobals()
  })

  it('pauses running Web Animations once, not on every DOM mutation synchronously', () => {
    const pause = vi.fn()
    const play = vi.fn()
    const running = { playState: 'running', pause, play, effect: { target: document.body } }
    const alreadyPaused = { playState: 'paused', pause, play, effect: { target: document.body } }
    document.getAnimations = () => [running as unknown as Animation, alreadyPaused as unknown as Animation]

    applyStopAnimations(true)
    expect(pause).toHaveBeenCalledTimes(1)

    document.body.appendChild(document.createElement('div'))
    document.body.appendChild(document.createElement('span'))
    expect(pause).toHaveBeenCalledTimes(1)
  })
})
