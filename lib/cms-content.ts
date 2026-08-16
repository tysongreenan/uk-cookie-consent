import readingTime from 'reading-time'
import { cmsFindPublic } from '@/lib/cms'

export interface CmsPost {
  slug: string
  title: string
  description: string
  date: string
  updatedDate?: string
  author: string
  image?: string
  tags: string[]
  contentHtml: string
  readingTime: string
}

export interface CmsPage {
  slug: string
  title: string
  pageType?: string
  contentHtml: string
}

export interface CmsFeaturedVideo {
  url: string
  title?: string
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null
}

function asString(value: unknown): string {
  return typeof value === 'string' ? value : ''
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function lexicalText(node: unknown): string {
  const record = asRecord(node)
  if (!record) return ''
  if (typeof record.text === 'string') return record.text
  if (!Array.isArray(record.children)) return ''
  return record.children.map(lexicalText).join('')
}

function lexicalToHtml(node: unknown): string {
  const record = asRecord(node)
  if (!record) return ''

  const children = Array.isArray(record.children)
    ? record.children.map(lexicalToHtml).join('')
    : ''
  const text = typeof record.text === 'string' ? escapeHtml(record.text) : ''
  const type = asString(record.type)

  switch (type) {
    case 'root':
      return children
    case 'heading': {
      const tag = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(asString(record.tag))
        ? asString(record.tag)
        : 'h2'
      return `<${tag}>${children || text}</${tag}>`
    }
    case 'paragraph':
      return `<p>${children || text}</p>`
    case 'list': {
      const tag = record.listType === 'number' ? 'ol' : 'ul'
      return `<${tag}>${children}</${tag}>`
    }
    case 'listitem':
      return `<li>${children || text}</li>`
    case 'quote':
      return `<blockquote>${children || text}</blockquote>`
    case 'link': {
      const url = asString(record.url)
      if (!url || (!/^https?:\/\//i.test(url) && !url.startsWith('/'))) {
        return children || text
      }
      return `<a href="${escapeHtml(url)}">${children || text}</a>`
    }
    case 'linebreak':
      return '<br />'
    case 'text':
      return text
    default:
      return children || text
  }
}

/** Render CMS rich text without inventing copy. Empty or unknown shapes become ''. */
export function renderCmsRichText(content: unknown): string {
  if (content == null) return ''
  if (typeof content === 'string') {
    const trimmed = content.trim()
    if (!trimmed) return ''
    if (trimmed.startsWith('<')) return trimmed
    return `<p>${escapeHtml(trimmed).replace(/\n{2,}/g, '</p><p>').replace(/\n/g, '<br />')}</p>`
  }

  const record = asRecord(content)
  if (!record) return ''
  if (record.root) return lexicalToHtml(record.root)
  if (record.type === 'root') return lexicalToHtml(record)
  return ''
}

function mediaUrl(value: unknown): string | undefined {
  if (typeof value === 'string' && value.trim()) return value.trim()
  const record = asRecord(value)
  if (!record) return undefined
  const url = asString(record.url).trim()
  return url || undefined
}

function isoDate(value: unknown, fallback?: unknown): string {
  const raw = asString(value) || asString(fallback)
  if (!raw) return ''
  const date = new Date(raw)
  return Number.isNaN(date.getTime()) ? raw : date.toISOString()
}

export function mapCmsPost(doc: unknown): CmsPost | null {
  const record = asRecord(doc)
  if (!record) return null

  const slug = asString(record.slug).trim()
  const title = asString(record.title).trim()
  if (!slug || !title) return null

  const contentHtml = renderCmsRichText(record.content)
  const description = asString(record.excerpt).trim()
  const textForTiming = `${description} ${lexicalText(asRecord(record.content)?.root ?? record.content)}`.trim()

  return {
    slug,
    title,
    description,
    date: isoDate(record.createdAt, record.updatedAt),
    updatedDate: asString(record.updatedAt) ? isoDate(record.updatedAt) : undefined,
    author: asString(record.author).trim() || 'Cookie Banner Team',
    image: mediaUrl(record.heroImage),
    tags: Array.isArray(record.tags)
      ? record.tags.filter((tag): tag is string => typeof tag === 'string' && tag.trim() !== '')
      : [],
    contentHtml,
    readingTime: readingTime(textForTiming || title).text,
  }
}

export function mapCmsPage(doc: unknown): CmsPage | null {
  const record = asRecord(doc)
  if (!record) return null

  const slug = asString(record.slug).trim()
  const title = asString(record.title).trim()
  if (!slug || !title) return null

  return {
    slug,
    title,
    pageType: asString(record.pageType) || undefined,
    contentHtml: renderCmsRichText(record.content),
  }
}

export async function listCmsPosts(): Promise<CmsPost[]> {
  const { docs } = await cmsFindPublic('posts')
  return docs
    .map(mapCmsPost)
    .filter((post): post is CmsPost => post !== null)
    .sort((a, b) => (new Date(b.date).getTime() || 0) - (new Date(a.date).getTime() || 0))
}

export async function getCmsPostBySlug(slug: string): Promise<CmsPost | null> {
  const { docs } = await cmsFindPublic('posts', {
    'where[and][2][slug][equals]': slug,
    limit: '1',
  })
  return docs.length === 0 ? null : mapCmsPost(docs[0])
}

export async function getCmsPageBySlug(slug: string): Promise<CmsPage | null> {
  const { docs } = await cmsFindPublic('pages', {
    'where[and][2][slug][equals]': slug,
    limit: '1',
  })
  return docs.length === 0 ? null : mapCmsPage(docs[0])
}

export function mapFeaturedVideo(doc: unknown): CmsFeaturedVideo | null {
  const record = asRecord(doc)
  if (!record) return null
  if (record.featuredVideoEnabled !== true) return null
  const url = asString(record.featuredVideoUrl).trim()
  if (!url) return null
  const title = asString(record.featuredVideoTitle).trim()
  return title ? { url, title } : { url }
}

export async function getCmsFeaturedVideo(): Promise<CmsFeaturedVideo | null> {
  const { docs } = await cmsFindPublic('site-settings')
  return docs.length === 0 ? null : mapFeaturedVideo(docs[0])
}
