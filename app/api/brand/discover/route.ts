import { NextRequest, NextResponse } from 'next/server'

import { discoverBrand } from '@/lib/brand/discover'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const targetUrl = typeof body?.url === 'string' ? body.url : ''

    if (!targetUrl.trim()) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }

    const result = await discoverBrand(targetUrl)
    return NextResponse.json(result)
  } catch (error) {
    console.error('Brand discovery error:', error)
    const message = error instanceof Error ? error.message : 'Unexpected error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

