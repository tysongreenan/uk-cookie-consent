import { describe, expect, it } from 'vitest'
import { getPostBySlug, parseHeroCta } from '@/lib/blog/blog'

describe('parseHeroCta', () => {
  it('accepts a primary and secondary internal link', () => {
    expect(
      parseHeroCta({
        primary: { label: 'Scan your site', href: '/tools/cookie-scanner' },
        secondary: { label: 'Start a free banner', href: '/free-cookie-banner' },
      })
    ).toEqual({
      primary: { label: 'Scan your site', href: '/tools/cookie-scanner' },
      secondary: { label: 'Start a free banner', href: '/free-cookie-banner' },
    })
  })

  it('rejects external and protocol-relative hrefs', () => {
    expect(
      parseHeroCta({
        primary: { label: 'Leave', href: 'https://example.com' },
      })
    ).toBeUndefined()
    expect(
      parseHeroCta({
        primary: { label: 'Leave', href: '//evil.example' },
      })
    ).toBeUndefined()
  })

  it('ignores missing or incomplete frontmatter', () => {
    expect(parseHeroCta(undefined)).toBeUndefined()
    expect(parseHeroCta({ secondary: { label: 'Only', href: '/x' } })).toBeUndefined()
    expect(parseHeroCta({ primary: { label: 'No href' } })).toBeUndefined()
  })
})

describe('canada guide hero CTA', () => {
  it('exposes scanner and banner CTAs from frontmatter', async () => {
    const post = await getPostBySlug('cookie-consent-canada-guide-2026')
    expect(post?.heroCta).toEqual({
      primary: { label: 'Scan your site', href: '/tools/cookie-scanner' },
      secondary: { label: 'Start a free banner', href: '/free-cookie-banner' },
    })
    expect(post?.content).toContain('href="/tools/cookie-scanner"')
    expect(post?.content).toContain('href="/free-cookie-banner"')
    expect(post?.content).toContain('The short answer')
    expect(post?.content).toContain('What Is Cookie Consent in Canada?')
    expect(post?.content).toContain('Frequently Asked Questions')
  })
})
