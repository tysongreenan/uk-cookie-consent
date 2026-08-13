import { NextResponse } from 'next/server'
import { formatMarkdownNotFound, markdownHeaders } from '@/lib/blog/agent-markdown'
import { formatPageAsAgentMarkdown, getPageSourceByKey } from '@/lib/seo/page-markdown'

export const runtime = 'nodejs'

export async function GET(
  _request: Request,
  { params }: { params: { slug: string } }
) {
  const page = getPageSourceByKey(params.slug)
  if (!page) {
    return new NextResponse(formatMarkdownNotFound(params.slug), {
      status: 404,
      headers: markdownHeaders(),
    })
  }

  return new NextResponse(formatPageAsAgentMarkdown(page), {
    status: 200,
    headers: markdownHeaders(),
  })
}
