import { describe, expect, it } from 'vitest'
import { isValidBlogSlug, getPostSourceBySlug } from '@/lib/blog/blog'
import {
  formatMarkdownNotFound,
  formatPostAsAgentMarkdown,
  yamlQuote,
} from '@/lib/blog/agent-markdown'

describe('isValidBlogSlug', () => {
  it('accepts kebab-case slugs', () => {
    expect(isValidBlogSlug('cookie-consent-canada-guide-2026')).toBe(true)
    expect(isValidBlogSlug('gdpr')).toBe(true)
  })

  it('rejects .md suffixes, path traversal, and empty values', () => {
    expect(isValidBlogSlug('cookie-consent-canada-guide-2026.md')).toBe(false)
    expect(isValidBlogSlug('../etc/passwd')).toBe(false)
    expect(isValidBlogSlug('')).toBe(false)
    expect(isValidBlogSlug('Hello World')).toBe(false)
    expect(isValidBlogSlug('UPPER')).toBe(false)
  })
})

describe('yamlQuote', () => {
  it('leaves simple tokens unquoted', () => {
    expect(yamlQuote('PIPEDA')).toBe('PIPEDA')
  })

  it('quotes values that would break YAML', () => {
    expect(yamlQuote('GDPR Cookie Consent: 6 Requirements')).toBe(
      '"GDPR Cookie Consent: 6 Requirements"'
    )
  })
})

describe('formatPostAsAgentMarkdown', () => {
  it('emits frontmatter, an H1, and the raw body', () => {
    const markdown = formatPostAsAgentMarkdown({
      slug: 'gdpr-cookie-consent-requirements',
      title: 'GDPR Cookie Consent: 6 Requirements',
      description: 'The 6 legal requirements for GDPR cookie consent.',
      date: '2025-01-17',
      updatedDate: '2026-05-26',
      author: 'cookie-banner-team',
      tags: ['GDPR', 'Cookie Consent'],
      published: true,
      markdown: 'Non-essential cookies need opt-in consent.',
    }, 'https://www.cookie-banner.ca')

    expect(markdown).toContain('title: "GDPR Cookie Consent: 6 Requirements"')
    expect(markdown).toContain('canonical_url: https://www.cookie-banner.ca/blog/gdpr-cookie-consent-requirements')
    expect(markdown).toContain('md_url: https://www.cookie-banner.ca/blog/gdpr-cookie-consent-requirements.md')
    expect(markdown).toContain('last_updated: 2026-05-26')
    expect(markdown).toContain('author: "Cookie Banner Team"')
    expect(markdown).toContain('  - GDPR')
    expect(markdown).toContain('# GDPR Cookie Consent: 6 Requirements')
    expect(markdown).toContain('> The 6 legal requirements for GDPR cookie consent.')
    expect(markdown).toContain('Non-essential cookies need opt-in consent.')
    expect(markdown.startsWith('---\n')).toBe(true)
  })

  it('does not duplicate an H1 that already matches the title', () => {
    const markdown = formatPostAsAgentMarkdown({
      slug: 'example',
      title: 'Example',
      description: 'Desc',
      date: '2026-01-01',
      author: 'cookie-banner-team',
      tags: [],
      published: true,
      markdown: '# Example\n\nBody.',
    })

    expect(markdown.match(/^# Example$/gm)).toHaveLength(1)
  })
})

describe('getPostSourceBySlug', () => {
  it('returns raw markdown for a published post', () => {
    const post = getPostSourceBySlug('cookie-consent-canada-guide-2026')
    expect(post).not.toBeNull()
    expect(post?.published).toBe(true)
    expect(post?.markdown.includes('<p>')).toBe(false)
    expect(post?.markdown.length).toBeGreaterThan(200)
  })

  it('returns null for a .md suffix or missing slug', () => {
    expect(getPostSourceBySlug('cookie-consent-canada-guide-2026.md')).toBeNull()
    expect(getPostSourceBySlug('does-not-exist')).toBeNull()
  })

  it('still loads unpublished source so the route can 404 it', () => {
    const post = getPostSourceBySlug('blog-post-template')
    expect(post?.published).toBe(false)
  })
})

describe('formatMarkdownNotFound', () => {
  it('points agents at llms.txt', () => {
    expect(formatMarkdownNotFound('missing')).toContain('/llms.txt')
    expect(formatMarkdownNotFound('missing')).toContain('/blog/missing')
  })
})
