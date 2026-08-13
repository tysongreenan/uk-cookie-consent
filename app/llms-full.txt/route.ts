import { getAllPosts, getPostSourceBySlug } from '@/lib/blog/blog'
import { formatPostAsAgentMarkdown, markdownHeaders } from '@/lib/blog/agent-markdown'
import { renderLlmsTxt, siteBaseUrl } from '@/lib/seo/llms-catalog'

export const runtime = 'nodejs'
export const dynamic = 'force-static'

export async function GET() {
  const baseUrl = siteBaseUrl()
  const parts = [renderLlmsTxt(baseUrl)]

  for (const post of getAllPosts()) {
    const source = getPostSourceBySlug(post.slug)
    if (!source || !source.published) continue
    parts.push('', '---', '', formatPostAsAgentMarkdown(source, baseUrl).trimEnd())
  }

  return new Response(`${parts.join('\n')}\n`, {
    headers: markdownHeaders(),
  })
}
