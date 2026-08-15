import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import readingTime from 'reading-time'

// Simple slug function for headings
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim()
}

// Custom remark plugin to add IDs to headings
function remarkHeadingIds() {
  return (tree: any) => {
    const visit = (node: any) => {
      if (node.type === 'heading') {
        const text = node.children
          .filter((child: any) => child.type === 'text')
          .map((child: any) => child.value)
          .join('')
        
        if (text) {
          node.data = node.data || {}
          node.data.hProperties = node.data.hProperties || {}
          node.data.hProperties.id = slugify(text)
        }
      }
      
      if (node.children) {
        node.children.forEach(visit)
      }
    }
    
    visit(tree)
  }
}

const postsDirectory = path.join(process.cwd(), 'content/blog')

/** Published blog slugs are lowercase kebab-case. Rejects `.md` suffixes and path traversal. */
export function isValidBlogSlug(slug: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)
}

export interface BlogCtaLink {
  label: string
  href: string
}

export interface BlogHeroCta {
  primary: BlogCtaLink
  secondary?: BlogCtaLink
}

export interface BlogPostSource {
  slug: string
  title: string
  description: string
  date: string
  updatedDate?: string
  author: string
  tags: string[]
  published: boolean
  markdown: string
}

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  updatedDate?: string
  author: string
  image?: string
  tags: string[]
  keywords?: string[]
  content: string
  readingTime: string
  published: boolean
  canonical?: string
  schema?: any
  heroCta?: BlogHeroCta
}

/** Internal site paths only — rejects protocol-relative and external URLs. */
function isSafeInternalHref(href: string): boolean {
  return href.startsWith('/') && !href.startsWith('//') && !href.includes('\\')
}

function parseCtaLink(value: unknown): BlogCtaLink | null {
  if (!value || typeof value !== 'object') {
    return null
  }

  const link = value as { label?: unknown; href?: unknown }
  if (typeof link.label !== 'string' || typeof link.href !== 'string') {
    return null
  }

  const label = link.label.trim()
  const href = link.href.trim()
  if (!label || !isSafeInternalHref(href)) {
    return null
  }

  return { label, href }
}

/** Optional above-fold CTA from frontmatter. Missing or invalid data is ignored. */
export function parseHeroCta(value: unknown): BlogHeroCta | undefined {
  if (!value || typeof value !== 'object') {
    return undefined
  }

  const raw = value as { primary?: unknown; secondary?: unknown }
  const primary = parseCtaLink(raw.primary)
  if (!primary) {
    return undefined
  }

  const secondary = parseCtaLink(raw.secondary)
  return secondary ? { primary, secondary } : { primary }
}

export interface BlogPostMetadata {
  slug: string
  title: string
  description: string
  date: string
  updatedDate?: string
  author: string
  image?: string
  tags: string[]
  readingTime: string
  published: boolean
}

// Get all blog post slugs
export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => fileName.replace(/\.md$/, ''))
    .filter(isValidBlogSlug)
}

function readPostFile(slug: string): { data: Record<string, unknown>; content: string } | null {
  if (!isValidBlogSlug(slug)) {
    return null
  }

  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    const postsRoot = path.resolve(postsDirectory)
    const resolved = path.resolve(fullPath)
    if (resolved !== postsRoot && !resolved.startsWith(postsRoot + path.sep)) {
      return null
    }
    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    return { data, content }
  } catch {
    return null
  }
}

/** Raw markdown + frontmatter for agent-facing `.md` routes. Does not convert to HTML. */
export function getPostSourceBySlug(slug: string): BlogPostSource | null {
  const parsed = readPostFile(slug)
  if (!parsed) {
    return null
  }

  const { data, content } = parsed

  return {
    slug,
    title: typeof data.title === 'string' ? data.title : '',
    description: typeof data.description === 'string' ? data.description : '',
    date: typeof data.date === 'string' ? data.date : '',
    updatedDate: typeof data.updatedDate === 'string' ? data.updatedDate : undefined,
    author: typeof data.author === 'string' ? data.author : 'Cookie Banner Team',
    tags: Array.isArray(data.tags) ? data.tags.filter((tag): tag is string => typeof tag === 'string') : [],
    published: data.published !== false,
    markdown: content.replace(/^\uFEFF/, '').trim(),
  }
}

// Get all published posts metadata (for listing page)
export function getAllPosts(): BlogPostMetadata[] {
  const slugs = getAllPostSlugs()
  const posts = slugs
    .map((slug) => {
      const fullPath = path.join(postsDirectory, `${slug}.md`)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)
      
      const stats = readingTime(content)

      return {
        slug,
        title: data.title || '',
        description: data.description || '',
        date: data.date || '',
        updatedDate: data.updatedDate || undefined,
        author: data.author || 'Cookie Banner Team',
        image: data.image || '',
        tags: data.tags || [],
        readingTime: stats.text,
        published: data.published !== false,
      }
    })
    .filter((post) => post.published)
    .sort((a, b) => (new Date(b.date) > new Date(a.date) ? 1 : -1))

  return posts
}

// Get single post by slug
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const parsed = readPostFile(slug)
  if (!parsed) {
    return null
  }

  const { data, content } = parsed

  // Convert markdown to HTML with heading IDs
  const processedContent = await remark()
    .use(remarkHeadingIds)
    .use(html, { sanitize: false })
    .process(content)
  const contentHtml = processedContent.toString()

  const stats = readingTime(content)

  return {
    slug,
    title: typeof data.title === 'string' ? data.title : '',
    description: typeof data.description === 'string' ? data.description : '',
    date: typeof data.date === 'string' ? data.date : '',
    updatedDate: typeof data.updatedDate === 'string' ? data.updatedDate : undefined,
    author: typeof data.author === 'string' ? data.author : 'Cookie Banner Team',
    image: typeof data.image === 'string' ? data.image : '',
    tags: Array.isArray(data.tags) ? data.tags.filter((tag): tag is string => typeof tag === 'string') : [],
    content: contentHtml,
    readingTime: stats.text,
    published: data.published !== false,
    keywords: Array.isArray(data.keywords)
      ? data.keywords.filter((keyword): keyword is string => typeof keyword === 'string')
      : undefined,
    canonical: typeof data.canonical === 'string' ? data.canonical : undefined,
    schema: data.schema ?? null,
    heroCta: parseHeroCta(data.heroCta),
  }
}

// Get related posts by tags
export function getRelatedPosts(currentSlug: string, tags: string[], limit = 3): BlogPostMetadata[] {
  const allPosts = getAllPosts()
  
  return allPosts
    .filter((post) => post.slug !== currentSlug)
    .filter((post) => post.tags.some((tag) => tags.includes(tag)))
    .slice(0, limit)
}

