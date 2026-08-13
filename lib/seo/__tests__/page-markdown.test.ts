import { describe, expect, it } from 'vitest'
import {
  formatPageAsAgentMarkdown,
  getPageMarkdownKey,
  getPageSourceByKey,
} from '@/lib/seo/page-markdown'

describe('page markdown', () => {
  it('maps public widget pages to source keys', () => {
    expect(getPageMarkdownKey('/docs')).toBe('docs')
    expect(getPageMarkdownKey('/tools/cookie-scanner/')).toBe('tools-cookie-scanner')
    expect(getPageMarkdownKey('/pricing')).toBeNull()
  })

  it('loads docs markdown without converting to HTML', () => {
    const page = getPageSourceByKey('docs')
    expect(page?.title).toContain('Documentation')
    expect(page?.markdown.includes('Step 1')).toBe(true)
    expect(page?.markdown.includes('<p>')).toBe(false)
  })

  it('formats agent frontmatter', () => {
    const page = getPageSourceByKey('tools-cookie-scanner')
    expect(page).not.toBeNull()
    const markdown = formatPageAsAgentMarkdown(page!, 'https://www.cookie-banner.ca')
    expect(markdown).toContain('canonical_url: https://www.cookie-banner.ca/tools/cookie-scanner')
    expect(markdown).toContain('md_url: https://www.cookie-banner.ca/tools/cookie-scanner.md')
    expect(markdown).toContain('47,000+')
  })
})
