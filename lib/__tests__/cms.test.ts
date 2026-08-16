import { afterEach, describe, expect, it, vi } from 'vitest'
import { cmsFind, cmsFindPublic } from '@/lib/cms'
import {
  mapCmsPage,
  mapCmsPost,
  mapFeaturedVideo,
  renderCmsRichText,
} from '@/lib/cms-content'

const originalEnv = { ...process.env }

afterEach(() => {
  process.env.CMS_URL = originalEnv.CMS_URL
  process.env.CMS_TENANT_SLUG = originalEnv.CMS_TENANT_SLUG
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

describe('cmsFind', () => {
  it('throws when CMS env is missing', async () => {
    delete process.env.CMS_URL
    delete process.env.CMS_TENANT_SLUG
    await expect(cmsFind('posts')).rejects.toThrow(
      'CMS_URL and CMS_TENANT_SLUG are required'
    )
  })

  it('returns empty docs for public callers when env is missing', async () => {
    delete process.env.CMS_URL
    delete process.env.CMS_TENANT_SLUG
    await expect(cmsFindPublic('posts')).resolves.toEqual({ docs: [] })
  })

  it('GETs posts with tenant and published filters', async () => {
    process.env.CMS_URL = 'https://agency-cms-omega.vercel.app'
    process.env.CMS_TENANT_SLUG = 'cookie-banner'
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ docs: [{ slug: 'welcome', title: 'Welcome' }] }),
    })
    vi.stubGlobal('fetch', fetchMock)

    const result = await cmsFind('posts')
    expect(result.docs).toHaveLength(1)

    const url = new URL(fetchMock.mock.calls[0][0] as string)
    expect(url.origin + url.pathname).toBe(
      'https://agency-cms-omega.vercel.app/api/posts'
    )
    expect(url.searchParams.get('where[and][0][tenant.slug][equals]')).toBe(
      'cookie-banner'
    )
    expect(url.searchParams.get('where[and][1][_status][equals]')).toBe(
      'published'
    )
    expect(url.searchParams.get('depth')).toBe('1')
    expect(url.searchParams.get('limit')).toBe('50')
  })

  it('does not send a published filter for site-settings', async () => {
    process.env.CMS_URL = 'https://agency-cms-omega.vercel.app'
    process.env.CMS_TENANT_SLUG = 'cookie-banner'
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ docs: [] }),
    })
    vi.stubGlobal('fetch', fetchMock)

    await cmsFind('site-settings')
    const url = new URL(fetchMock.mock.calls[0][0] as string)
    expect(url.pathname).toBe('/api/site-settings')
    expect(url.searchParams.get('where[and][1][_status][equals]')).toBeNull()
    expect(url.searchParams.get('limit')).toBe('1')
  })

  it('returns empty docs when the request fails', async () => {
    process.env.CMS_URL = 'https://agency-cms-omega.vercel.app'
    process.env.CMS_TENANT_SLUG = 'cookie-banner'
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network')))
    await expect(cmsFind('pages')).resolves.toEqual({ docs: [] })
  })

  it('returns empty docs when the response is not ok', async () => {
    process.env.CMS_URL = 'https://agency-cms-omega.vercel.app'
    process.env.CMS_TENANT_SLUG = 'cookie-banner'
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: false, json: async () => ({}) })
    )
    await expect(cmsFind('posts')).resolves.toEqual({ docs: [] })
  })
})

describe('cms content mapping', () => {
  it('maps a published post without inventing body copy', () => {
    const post = mapCmsPost({
      slug: 'welcome',
      title: 'Welcome',
      excerpt: 'A short excerpt.',
      createdAt: '2026-08-01T00:00:00.000Z',
      updatedAt: '2026-08-02T00:00:00.000Z',
      content: null,
    })
    expect(post?.slug).toBe('welcome')
    expect(post?.description).toBe('A short excerpt.')
    expect(post?.contentHtml).toBe('')
  })

  it('renders lexical content and ignores empty pages', () => {
    expect(renderCmsRichText(null)).toBe('')
    expect(
      renderCmsRichText({
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [{ type: 'text', text: 'Hello CMS' }],
            },
          ],
        },
      })
    ).toBe('<p>Hello CMS</p>')
    expect(mapCmsPage({ slug: 'about' })).toBeNull()
    expect(mapCmsPage({ slug: 'about', title: 'About', content: null })?.contentHtml).toBe(
      ''
    )
  })

  it('only returns a featured video when enabled and a URL is present', () => {
    expect(
      mapFeaturedVideo({
        featuredVideoEnabled: true,
        featuredVideoUrl: null,
      })
    ).toBeNull()
    expect(
      mapFeaturedVideo({
        featuredVideoEnabled: false,
        featuredVideoUrl: 'https://example.com/video.mp4',
      })
    ).toBeNull()
    expect(
      mapFeaturedVideo({
        featuredVideoEnabled: true,
        featuredVideoUrl: 'https://example.com/video.mp4',
        featuredVideoTitle: 'Launch',
      })
    ).toEqual({ url: 'https://example.com/video.mp4', title: 'Launch' })
  })
})
