import { describe, expect, it } from 'vitest'
import {
  applyScriptsToConfig,
  cloneBannerTemplate,
  getInstallInstructions,
  resolveComplianceFramework,
  SETUP_AGENT_HINT,
} from './ai-setup'

describe('ai setup', () => {
  it('maps law25 to the GDPR template without mutating the shared template', () => {
    expect(resolveComplianceFramework('law-25')).toBe('gdpr')
    const first = cloneBannerTemplate('gdpr', 'Acme')
    first.text.title = 'Changed'
    const second = cloneBannerTemplate('gdpr', 'Other')
    expect(second.text.title).not.toBe('Changed')
    expect(second.name).toBe('Other')
    expect(second.scripts.trackingPerformance).toEqual([])
  })

  it('applies multiple scripts onto a cloned template', () => {
    const config = cloneBannerTemplate('pipeda', 'Lively Leadership', 'https://example.com/privacy')
    const { added } = applyScriptsToConfig(
      config as unknown as Record<string, unknown>,
      [
        { template: 'google-analytics-4', measurementId: 'G-ABCDEF12' },
        { template: 'facebook-pixel', pixelId: '1234567890' },
      ],
      'pro'
    )
    expect(added).toHaveLength(2)
    expect(added[0].kind).toBe('ga4-integration')
    expect(added[1].category).toBe('targeting-advertising')
    expect(config.branding.privacyPolicy.url).toBe('https://example.com/privacy')
  })

  it('returns Next.js install instructions that use beforeInteractive', () => {
    const instructions = getInstallInstructions('nextjs', 'banner-123')
    expect(instructions.file).toContain('app/layout.tsx')
    expect(instructions.example).toContain('strategy="beforeInteractive"')
    expect(instructions.example).toContain('banner-123')
    expect(instructions.after).toMatch(/Remove any raw/i)
  })

  it('tells the agent the menu rides in the same snippet', () => {
    expect(SETUP_AGENT_HINT).toMatch(/accessibility\.enabled/)
    expect(SETUP_AGENT_HINT).toMatch(/a11y\.js/)
  })
})
