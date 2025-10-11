import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import readingTime from 'reading-time'

const postsDirectory = path.join(process.cwd(), 'content/blog')

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  author: string
  image?: string
  tags: string[]
  content: string
  readingTime: string
  published: boolean
}

export interface BlogPostMetadata {
  slug: string
  title: string
  description: string
  date: string
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
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    // Convert markdown to HTML
    const processedContent = await remark()
      .use(html, { sanitize: false })
      .process(content)
    const contentHtml = processedContent.toString()

    const stats = readingTime(content)

    return {
      slug,
      title: data.title || '',
      description: data.description || '',
      date: data.date || '',
      author: data.author || 'Cookie Banner Team',
      image: data.image || '',
      tags: data.tags || [],
      content: contentHtml,
      readingTime: stats.text,
      published: data.published !== false,
    }
  } catch (error) {
    return null
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

