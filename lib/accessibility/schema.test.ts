import { describe, expect, it } from 'vitest'
import { parseAccessibilityForSave, mergeAccessibilityPatch } from './save'
import { accessibilityConfigSchema } from './schema'
import { isA11yTrackEvent } from './analytics'

describe('accessibilityConfigSchema', () => {
  it('accepts the MCP enable-only payload', () => {
    const parsed = accessibilityConfigSchema.parse({ enabled: true })
    expect(parsed.enabled).toBe(true)
  })

  it('rejects non-boolean enabled and unknown feature keys', () => {
    expect(accessibilityConfigSchema.safeParse({ enabled: 'yes' }).success).toBe(false)
    expect(
      accessibilityConfigSchema.safeParse({ enabled: true, features: { notAFeature: true } }).success,
    ).toBe(false)
  })
})

describe('parseAccessibilityForSave', () => {
  it('leaves banners without a menu untouched', () => {
    const config: Record<string, unknown> = { name: 'Site' }
    expect(parseAccessibilityForSave(config)).toEqual({ ok: true })
    expect(config.accessibility).toBeUndefined()
  })

  it('hardens a valid partial so stored JSON is complete', () => {
    const config: Record<string, unknown> = { accessibility: { enabled: true } }
    expect(parseAccessibilityForSave(config).ok).toBe(true)
    const a11y = config.accessibility as { enabled: boolean; trigger: { position: string; shape: string } }
    expect(a11y.enabled).toBe(true)
    expect(a11y.trigger.position).toBe('bottom-left')
    expect(a11y.trigger.shape).toBe('circle')
  })

  it('returns a 400-ready error for garbage', () => {
    const config: Record<string, unknown> = { accessibility: 'on' }
    const result = parseAccessibilityForSave(config)
    expect(result.ok).toBe(false)
    if (!result.ok) expect(result.error).toMatch(/Invalid accessibility settings/)
  })
})

describe('mergeAccessibilityPatch', () => {
  it('keeps the existing trigger when only enabled is patched', () => {
    const merged = mergeAccessibilityPatch(
      { enabled: false, trigger: { position: 'top-right', shape: 'pill' } },
      { enabled: true },
    )
    expect(merged?.enabled).toBe(true)
    expect(merged?.trigger.position).toBe('top-right')
    expect(merged?.trigger.shape).toBe('pill')
  })
})

describe('a11y track events', () => {
  it('accepts the four widget event names and nothing else', () => {
    expect(isA11yTrackEvent('a11y_open')).toBe(true)
    expect(isA11yTrackEvent('a11y_toggle')).toBe(true)
    expect(isA11yTrackEvent('impression')).toBe(false)
    expect(isA11yTrackEvent('custom')).toBe(false)
  })
})
