import { describe, expect, it } from 'vitest'
import { hostedInstallSnippet } from './install-snippet'

describe('hostedInstallSnippet', () => {
  it('returns a one-line async script tag for paid/no-branding installs', () => {
    const snippet = hostedInstallSnippet('banner-123')
    expect(snippet).toContain('/api/v1/banner.js?id=banner-123')
    expect(snippet.startsWith('<script src="')).toBe(true)
    expect(snippet.endsWith('async></script>')).toBe(true)
    expect(snippet).not.toContain('<noscript>')
  })

  it('adds the noscript attribution line when branding is shown', () => {
    const snippet = hostedInstallSnippet('banner-123', { showBranding: true })
    expect(snippet).toContain('async></script>')
    expect(snippet).toContain('<noscript>')
    expect(snippet).toContain('cookie-banner.ca/?ref=banner')
  })
})
