import { describe, expect, it } from 'vitest'
import { prefersMarkdown } from '@/lib/seo/content-negotiation'

describe('prefersMarkdown', () => {
  it('is false when Accept is missing or wildcard-only', () => {
    expect(prefersMarkdown(null)).toBe(false)
    expect(prefersMarkdown('')).toBe(false)
    expect(prefersMarkdown('*/*')).toBe(false)
    expect(prefersMarkdown('text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8')).toBe(false)
  })

  it('is true for markdown-only agents', () => {
    expect(prefersMarkdown('text/markdown')).toBe(true)
    expect(prefersMarkdown('text/x-markdown')).toBe(true)
  })

  it('prefers markdown when both types are listed at the same quality', () => {
    expect(prefersMarkdown('text/markdown, text/html')).toBe(true)
    expect(prefersMarkdown('text/markdown, text/html;q=0.9')).toBe(true)
  })

  it('stays on HTML when the client ranks HTML higher', () => {
    expect(prefersMarkdown('text/html, text/markdown;q=0.8')).toBe(false)
    expect(prefersMarkdown('text/markdown;q=0')).toBe(false)
  })
})
