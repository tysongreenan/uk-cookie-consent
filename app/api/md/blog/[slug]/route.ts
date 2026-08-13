import { NextResponse } from 'next/server'
import { getPostSourceBySlug } from '@/lib/blog/blog'
import {
  formatMarkdownNotFound,
  formatPostAsAgentMarkdown,
  markdownHeaders,
} from '@/lib/blog/agent-markdown'

export const runtime = 'nodejs'

export async function GET(
  _request: Request,
  { params }: { params: { slug: string } }
) {
  const post = getPostSourceBySlug(params.slug)

  if (!post || !post.published) {
    return new NextResponse(formatMarkdownNotFound(params.slug), {
      status: 404,
      headers: markdownHeaders(),
    })
  }

  return new NextResponse(formatPostAsAgentMarkdown(post), {
    status: 200,
    headers: markdownHeaders(),
  })
}
