import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const HELP_DIR = path.join(process.cwd(), 'content/help')
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export type HelpCategoryIcon = 'rocket' | 'sliders' | 'wrench' | 'credit-card'

export interface HelpCategory {
  slug: string
  title: string
  description: string
  icon: HelpCategoryIcon
  /** Section headings shown on the category page, in display order */
  sections: string[]
}

// Categories with no articles are hidden everywhere, so a category can be
// declared here before its first article is written.
export const HELP_CATEGORIES: HelpCategory[] = [
  {
    slug: 'getting-started',
    title: 'Getting started',
    description: 'Create your banner and add it to your website.',
    icon: 'rocket',
    sections: ['Installation'],
  },
  {
    slug: 'using-your-banner',
    title: 'Using your banner',
    description: 'Customize how your banner looks and behaves for visitors.',
    icon: 'sliders',
    sections: ['Visitor experience'],
  },
  {
    slug: 'troubleshooting',
    title: 'Troubleshooting',
    description: 'Fix a banner that is missing, unstyled, or not updating.',
    icon: 'wrench',
    sections: ['Display problems', 'Updates and caching'],
  },
  {
    slug: 'account-and-billing',
    title: 'Account & billing',
    description: 'Plans, invoices, and managing your account.',
    icon: 'credit-card',
    sections: ['Billing'],
  },
]

export interface HelpArticleMeta {
  slug: string
  title: string
  description: string
  category: string
  section: string
  order: number
  updated: string
  popular: boolean
  /** Extra search terms that don't belong in the title or description */
  keywords: string
}

export interface HelpArticle extends HelpArticleMeta {
  contentHtml: string
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

// Give h2/h3 headings ids so support replies can deep-link to a step
function remarkHeadingIds() {
  return (tree: any) => {
    const visit = (node: any) => {
      if (node.type === 'heading') {
        const text = node.children
          .filter((child: any) => child.type === 'text' || child.type === 'inlineCode')
          .map((child: any) => child.value)
          .join('')
        if (text) {
          node.data = node.data || {}
          node.data.hProperties = node.data.hProperties || {}
          node.data.hProperties.id = slugify(text)
        }
      }
      if (node.children) node.children.forEach(visit)
    }
    visit(tree)
  }
}

function readArticleFile(slug: string): { data: Record<string, unknown>; content: string } | null {
  if (!SLUG_PATTERN.test(slug)) return null
  const fullPath = path.join(HELP_DIR, `${slug}.md`)
  if (!fs.existsSync(fullPath)) return null
  const { data, content } = matter(fs.readFileSync(fullPath, 'utf8'))
  return { data, content }
}

function toMeta(slug: string, data: Record<string, unknown>): HelpArticleMeta {
  return {
    slug,
    title: String(data.title || slug),
    description: String(data.description || ''),
    category: String(data.category || ''),
    section: String(data.section || ''),
    order: typeof data.order === 'number' ? data.order : 999,
    updated: data.updated instanceof Date ? data.updated.toISOString().slice(0, 10) : String(data.updated || ''),
    popular: data.popular === true,
    keywords: String(data.keywords || ''),
  }
}

export function getAllHelpArticles(): HelpArticleMeta[] {
  if (!fs.existsSync(HELP_DIR)) return []
  return fs
    .readdirSync(HELP_DIR)
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.replace(/\.md$/, ''))
    .map((slug) => {
      const file = readArticleFile(slug)
      return file ? toMeta(slug, file.data) : null
    })
    .filter((a): a is HelpArticleMeta => a !== null && Boolean(getHelpCategory(a.category)))
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title))
}

export async function getHelpArticle(category: string, slug: string): Promise<HelpArticle | null> {
  const file = readArticleFile(slug)
  if (!file) return null
  const meta = toMeta(slug, file.data)
  if (meta.category !== category || !getHelpCategory(category)) return null
  const processed = await remark().use(remarkHeadingIds).use(html).process(file.content)
  return { ...meta, contentHtml: processed.toString() }
}

export function getHelpCategory(slug: string): HelpCategory | undefined {
  return HELP_CATEGORIES.find((c) => c.slug === slug)
}

export function getArticlesInCategory(category: string): HelpArticleMeta[] {
  return getAllHelpArticles().filter((a) => a.category === category)
}

/** Categories that have at least one article, with their counts */
export function getActiveHelpCategories(): (HelpCategory & { articleCount: number })[] {
  const articles = getAllHelpArticles()
  return HELP_CATEGORIES.map((c) => ({
    ...c,
    articleCount: articles.filter((a) => a.category === c.slug).length,
  })).filter((c) => c.articleCount > 0)
}

export function helpArticlePath(article: Pick<HelpArticleMeta, 'category' | 'slug'>): string {
  return `/help/${article.category}/${article.slug}`
}

/** Search index shared by every help page's search box */
export function getHelpSearchItems() {
  return getAllHelpArticles().map((a) => ({
    title: a.title,
    description: a.description,
    keywords: a.keywords,
    href: helpArticlePath(a),
    categoryTitle: getHelpCategory(a.category)?.title || '',
  }))
}
