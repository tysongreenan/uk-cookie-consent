import { getAuthor } from '@/lib/authors'
import type { BlogPostSource } from '@/lib/blog/blog'

const SITE_URL = 'https://www.cookie-banner.ca'

export function yamlQuote(value: string): string {
  if (value === '') return '""'
  if (
    /[:#{}[\],&*?|>!%@`'"]/.test(value) ||
    /\s/.test(value) ||
    /^-/.test(value)
  ) {
    return JSON.stringify(value)
  }
  return value
}

export function markdownHeaders(options?: { robots?: string }): HeadersInit {
  return {
    'Content-Type': 'text/markdown; charset=utf-8',
    'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    Vary: 'Accept',
    // Blog .md copies stay noindex so HTML remains the canonical search result.
    'X-Robots-Tag': options?.robots ?? 'noindex, follow',
  }
}

export function formatPostAsAgentMarkdown(
  post: BlogPostSource,
  baseUrl = process.env.NEXT_PUBLIC_BASE_URL || SITE_URL
): string {
  const canonical = `${baseUrl}/blog/${post.slug}`
  const author = getAuthor(post.author)
  const lastUpdated = post.updatedDate || post.date

  const lines = [
    '---',
    `title: ${yamlQuote(post.title)}`,
    `description: ${yamlQuote(post.description)}`,
    `canonical_url: ${canonical}`,
    `md_url: ${canonical}.md`,
  ]

  if (post.date) {
    lines.push(`date_published: ${post.date}`)
  }
  if (lastUpdated) {
    lines.push(`last_updated: ${lastUpdated}`)
  }
  lines.push(`author: ${yamlQuote(author.name)}`)

  if (post.tags.length > 0) {
    lines.push('tags:')
    for (const tag of post.tags) {
      lines.push(`  - ${yamlQuote(tag)}`)
    }
  }

  lines.push('---', '')

  const firstLine = post.markdown.split('\n', 1)[0] ?? ''
  const hasSameH1 = firstLine.startsWith('# ') && firstLine.slice(2).trim() === post.title
  if (!hasSameH1 && post.title) {
    lines.push(`# ${post.title}`, '')
  }
  if (post.description) {
    lines.push(`> ${post.description}`, '')
  }
  if (post.markdown) {
    lines.push(post.markdown, '')
  }

  return lines.join('\n')
}

export function formatMarkdownNotFound(pathOrSlug: string, baseUrl = process.env.NEXT_PUBLIC_BASE_URL || SITE_URL): string {
  const path = pathOrSlug.startsWith('/') ? pathOrSlug : `/blog/${pathOrSlug}`
  return [
    '# Not found',
    '',
    `No published markdown at \`${path}\`.`,
    '',
    `See [llms.txt](${baseUrl}/llms.txt) for available pages.`,
    '',
  ].join('\n')
}
