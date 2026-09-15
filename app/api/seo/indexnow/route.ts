import { NextRequest, NextResponse } from 'next/server'
import { getAllPosts } from '@/lib/blog/blog'
import { pingIndexNow } from '@/lib/seo/indexnow'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const adminToken = process.env.INDEXNOW_ADMIN_TOKEN
  const provided = req.headers.get('x-admin-token')
  if (!adminToken || provided !== adminToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.cookie-banner.ca'
  const body = (await req.json().catch(() => ({}))) as { urls?: string[] }

  const urls = body.urls && body.urls.length > 0
    ? body.urls
    : getAllPosts()
        .filter((p) => p.published && p.date)
        .map((p) => `${baseUrl}/blog/${p.slug}`)

  try {
    await pingIndexNow(urls)
    return NextResponse.json({ ok: true, submitted: urls.length })
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : 'unknown' },
      { status: 502 }
    )
  }
}
