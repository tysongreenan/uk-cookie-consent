import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { siteBaseUrl } from '@/lib/seo/llms-catalog'
import { yamlQuote } from '@/lib/blog/agent-markdown'
import { PAGE_MARKDOWN_KEYS, getPageMarkdownKey } from '@/lib/seo/markdown-routes'

export { getPageMarkdownKey }

export interface PageMarkdownSource {
  key: string
  path: string
  title: string
  description: string
  markdown: string
}

const pagesDirectory = path.join(process.cwd(), 'content/pages')

export function getPageSourceByKey(key: string): PageMarkdownSource | null {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(key)) {
    return null
  }

  const htmlPath = Object.entries(PAGE_MARKDOWN_KEYS).find(([, value]) => value === key)?.[0]
  if (!htmlPath) return null

  try {
    const fullPath = path.join(pagesDirectory, `${key}.md`)
    const pagesRoot = path.resolve(pagesDirectory)
    const resolved = path.resolve(fullPath)
    if (resolved !== pagesRoot && !resolved.startsWith(pagesRoot + path.sep)) {
      return null
    }
    if (!fs.existsSync(fullPath)) return null

    const { data, content } = matter(fs.readFileSync(fullPath, 'utf8'))
    return {
      key,
      path: htmlPath,
      title: typeof data.title === 'string' ? data.title : '',
      description: typeof data.description === 'string' ? data.description : '',
      markdown: content.replace(/^\uFEFF/, '').trim(),
    }
  } catch {
    return null
  }
}

export function formatPageAsAgentMarkdown(
  page: PageMarkdownSource,
  baseUrl = siteBaseUrl()
): string {
  const canonical = `${baseUrl}${page.path}`
  const lines = [
    '---',
    `title: ${yamlQuote(page.title)}`,
    `description: ${yamlQuote(page.description)}`,
    `canonical_url: ${canonical}`,
    `md_url: ${canonical}.md`,
    '---',
    '',
  ]

  const firstLine = page.markdown.split('\n', 1)[0] ?? ''
  const hasSameH1 = firstLine.startsWith('# ') && firstLine.slice(2).trim() === page.title
  if (!hasSameH1 && page.title) {
    lines.push(`# ${page.title}`, '')
  }
  if (page.description) {
    lines.push(`> ${page.description}`, '')
  }
  if (page.markdown) {
    lines.push(page.markdown, '')
  }

  return lines.join('\n')
}
