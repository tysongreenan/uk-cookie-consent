import { describe, expect, it } from 'vitest'
import { getLlmsSections, renderLlmsTxt, renderSitemapMd } from '@/lib/seo/llms-catalog'

describe('llms catalog', () => {
  it('includes product, compliance, and published blog markdown URLs', () => {
    const headings = getLlmsSections().map((section) => section.heading)
    expect(headings).toContain('Product')
    expect(headings).toContain('Compliance')
    expect(headings).toContain('Blog')

    const blog = getLlmsSections().find((section) => section.heading === 'Blog')
    const canada = blog?.links.find((link) => link.path.includes('cookie-consent-canada-guide-2026'))
    expect(canada?.path).toBe('/blog/cookie-consent-canada-guide-2026.md')
    expect(blog?.links.some((link) => link.path.includes('blog-post-template'))).toBe(false)
  })

  it('renders a valid llms.txt index', () => {
    const txt = renderLlmsTxt('https://www.cookie-banner.ca')
    expect(txt.startsWith('# Cookie-Banner.ca\n')).toBe(true)
    expect(txt).toContain('## Product')
    expect(txt).toContain('https://www.cookie-banner.ca/pricing')
    expect(txt).toContain('https://www.cookie-banner.ca/tools/cookie-scanner.md')
    expect(txt).toContain('https://www.cookie-banner.ca/blog/cookie-consent-canada-guide-2026.md')
    expect(txt).toContain('https://www.cookie-banner.ca/llms-full.txt')
  })

  it('renders a markdown sitemap', () => {
    const sitemap = renderSitemapMd('https://www.cookie-banner.ca')
    expect(sitemap).toContain('# Cookie-Banner.ca sitemap')
    expect(sitemap).toContain('/sitemap.xml')
    expect(sitemap).toContain('/integrations/wordpress')
  })
})
