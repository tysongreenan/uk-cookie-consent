import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// Legacy banners route — the ConsentBanner, Project, Team, and TeamMember tables
// no longer exist. This route returns empty results so the frontend degrades gracefully.
// All banner operations now go through /api/banners/simple/.

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Return empty banners — legacy tables no longer exist
    return NextResponse.json({ banners: [] })
  } catch (error) {
    console.error('Legacy banners GET error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Legacy creation is no longer supported — redirect users to SimpleBanners
    return NextResponse.json(
      { error: 'This endpoint is deprecated. Please use /api/banners/simple to create banners.' },
      { status: 410 }
    )
  } catch (error) {
    console.error('Legacy banners POST error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
