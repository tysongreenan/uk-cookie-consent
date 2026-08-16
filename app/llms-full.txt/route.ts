import { listCmsPosts } from '@/lib/cms-content'
import { markdownHeaders } from '@/lib/blog/agent-markdown'
import { renderLlmsTxt, siteBaseUrl } from '@/lib/seo/llms-catalog'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  const baseUrl = siteBaseUrl()
  const posts = await listCmsPosts()
  const parts = [renderLlmsTxt(baseUrl, posts)]

  for (const post of posts) {
    if (!post.contentHtml) continue
    parts.push(
      '',
      '---',
      '',
      `# ${post.title}`,
      '',
      post.description ? `> ${post.description}` : '',
      '',
      post.contentHtml.replace(/<[^>]+>/g, '').trim()
    )
  }

  return new Response(`${parts.filter((part) => part !== undefined).join('\n')}\n`, {
    headers: markdownHeaders(),
  })
}
