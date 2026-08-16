import { listCmsPosts } from '@/lib/cms-content'
import { renderSitemapMd } from '@/lib/seo/llms-catalog'
import { markdownHeaders } from '@/lib/blog/agent-markdown'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  const posts = await listCmsPosts()
  return new Response(renderSitemapMd(undefined, posts), {
    headers: markdownHeaders({ robots: 'index, follow' }),
  })
}
