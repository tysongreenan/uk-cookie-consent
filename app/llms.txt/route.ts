import { renderLlmsTxt } from '@/lib/seo/llms-catalog'
import { markdownHeaders } from '@/lib/blog/agent-markdown'

export const runtime = 'nodejs'
export const dynamic = 'force-static'

export async function GET() {
  return new Response(renderLlmsTxt(), {
    headers: markdownHeaders({ robots: 'index, follow' }),
  })
}
