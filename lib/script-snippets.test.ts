import { describe, expect, it } from 'vitest'
import {
  buildTrackingScript,
  getScriptTemplate,
  listScriptTemplates,
  ScriptSnippetError,
} from './script-snippets'

describe('script snippets', () => {
  it('lists first-class templates with required id fields', () => {
    const ids = listScriptTemplates().map((t) => t.id)
    expect(ids).toContain('google-analytics-4')
    expect(ids).toContain('google-tag-manager')
    expect(ids).toContain('facebook-pixel')
    expect(getScriptTemplate('google-analytics-4')?.idField).toBe('measurementId')
  })

  it('builds a GA4 snippet from a measurement id', () => {
    const script = buildTrackingScript({
      template: 'google-analytics-4',
      measurementId: 'g-xyz123abc',
    })
    expect(script.name).toBe('Google Analytics 4')
    expect(script.category).toBe('tracking-performance')
    expect(script.source).toBe('template')
    expect(script.scriptCode).toContain('G-XYZ123ABC')
    expect(script.scriptCode).toContain('gtag/js?id=G-XYZ123ABC')
  })

  it('builds GTM with a noscript body tag', () => {
    const script = buildTrackingScript({
      template: 'google-tag-manager',
      containerId: 'GTM-PZHQ5C2',
    })
    expect(script.scriptCode).toContain("GTM-PZHQ5C2")
    expect(script.bodyCode).toContain('ns.html?id=GTM-PZHQ5C2')
  })

  it('rejects a bad measurement id', () => {
    expect(() =>
      buildTrackingScript({ template: 'google-analytics-4', measurementId: 'UA-123' })
    ).toThrow(ScriptSnippetError)
  })

  it('requires scriptCode for custom templates', () => {
    expect(() => buildTrackingScript({ template: 'custom' })).toThrow(/scriptCode/)
    const script = buildTrackingScript({
      template: 'custom',
      name: 'HubSpot',
      category: 'functionality',
      scriptCode: '<script src="https://js.hs-scripts.com/1.js"></script>',
    })
    expect(script.name).toBe('HubSpot')
    expect(script.category).toBe('functionality')
  })
})
