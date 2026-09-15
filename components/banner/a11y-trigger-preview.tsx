'use client'

import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
import { Accessibility } from 'lucide-react'
import type { BannerConfig } from '@/types'
import { resolveA11yRuntimeConfig } from '@/lib/accessibility/config'

interface A11yTriggerPreviewProps {
  config: BannerConfig
  /** Whether the owner's plan allows customization (Pro Annual / Enterprise). */
  customization: boolean
  /** Scale down for the small builder preview frame. */
  compact?: boolean
  /** Changes whenever the previewed banner/floater shows, hides or moves. */
  layoutKey?: string
  /** Resolve the trigger even when the menu is still Off (Accessibility tab preview). */
  preview?: boolean
  /** Clicking the trigger (Accessibility tab). Off elsewhere so it never eats banner clicks. */
  onOpen?: () => void
}

const SIZE_PX = { small: 40, medium: 48, large: 56 }
const GAP = 8

/**
 * Static preview of the Accessibility Menu trigger inside the builder's fake
 * website frame. Mirrors the live widget: configured corner first, then pushed
 * clear of whatever the preview is showing (`[data-cb-preview]` = banner or
 * "Cookie Settings" pill) so the two never overlap.
 */
export function A11yTriggerPreview({ config, customization, compact = true, layoutKey, preview = false, onOpen }: A11yTriggerPreviewProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [shift, setShift] = useState(0)
  const runtime = resolveA11yRuntimeConfig(config, { customization, baseUrl: '', preview })
  const position = runtime?.trigger.position

  useLayoutEffect(() => {
    const el = ref.current
    if (!el || !position) return
    const frame =
      (el.closest('[data-cb-preview-frame]') as HTMLElement | null) ||
      (el.offsetParent as HTMLElement | null)
    if (!frame) return
    const measure = () => {
      // Measure from the base position, not the already-shifted (or mid-transition) one
      const prevTransition = el.style.transition
      el.style.transition = 'none'
      el.style.setProperty('--shift', '0px')
      const me = el.getBoundingClientRect()
      el.style.transition = prevTransition
      const anchor = position.startsWith('top') ? 'top' : position.startsWith('middle') ? 'middle' : 'bottom'
      let next = 0
      for (const ob of Array.from(frame.querySelectorAll<HTMLElement>('[data-cb-preview]'))) {
        const r = ob.getBoundingClientRect()
        if (r.width === 0 || r.height === 0) continue
        const hit = me.left < r.right + 4 && me.right > r.left - 4 && me.top < r.bottom + 4 && me.bottom > r.top - 4
        if (!hit) continue
        if (anchor === 'bottom') next = Math.max(next, me.bottom - r.top + GAP)
        else if (anchor === 'top') next = Math.max(next, r.bottom - me.top + GAP)
        else next = Math.max(next, me.bottom - r.top + GAP)
      }
      // Apply directly too: React skips the re-render when the value is unchanged
      el.style.setProperty('--shift', `${Math.round(next)}px`)
      setShift(Math.round(next))
    }
    measure()
    // Banner previews animate in; re-measure after the transition settles
    const t = window.setTimeout(measure, 450)
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null
    ro?.observe(frame)
    return () => {
      window.clearTimeout(t)
      ro?.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position, layoutKey, config.position, config.layout, compact])

  if (!runtime || !position) return null

  const { trigger } = runtime
  const scale = compact ? 0.75 : 1
  const size = Math.round(SIZE_PX[trigger.size] * scale)
  const offX = Math.round(trigger.offsetX * scale)
  const offY = Math.round(trigger.offsetY * scale)

  const style: CSSProperties & { ['--shift']?: string } = {
    position: 'absolute',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    minWidth: size,
    height: size,
    padding: trigger.label && trigger.shape !== 'circle' ? `0 ${Math.round(size * 0.25)}px` : 0,
    borderRadius: trigger.shape === 'square' ? 10 : 999,
    background: trigger.colors.background,
    color: trigger.colors.icon,
    border: `2px solid ${trigger.colors.border}`,
    boxShadow: '0 4px 14px rgba(0,0,0,0.22)',
    fontSize: 12,
    fontWeight: 600,
    whiteSpace: 'nowrap',
    zIndex: 60,
    pointerEvents: onOpen ? 'auto' : 'none',
    cursor: onOpen ? 'pointer' : 'default',
    transition: 'top 220ms cubic-bezier(0.2,0.8,0.2,1), bottom 220ms cubic-bezier(0.2,0.8,0.2,1)',
    '--shift': `${shift}px`,
  }
  if (position.endsWith('right')) style.right = offX
  else style.left = offX
  if (position.startsWith('top')) style.top = `calc(${offY}px + var(--shift))`
  else if (position.startsWith('middle')) {
    style.top = `calc(50% - var(--shift))`
    style.transform = 'translateY(-50%)'
  } else style.bottom = `calc(${offY}px + var(--shift))`

  return (
    <div
      ref={ref}
      role={onOpen ? 'button' : undefined}
      tabIndex={onOpen ? 0 : undefined}
      style={style}
      aria-label="Accessibility menu button preview"
      title="Accessibility menu button"
      onClick={onOpen}
      onKeyDown={
        onOpen
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onOpen()
              }
            }
          : undefined
      }
    >
      <Accessibility style={{ width: Math.round(size * 0.55), height: Math.round(size * 0.55) }} aria-hidden="true" />
      {trigger.label && trigger.shape !== 'circle' && <span>{trigger.label}</span>}
    </div>
  )
}
