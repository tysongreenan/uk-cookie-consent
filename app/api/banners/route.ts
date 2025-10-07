import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const bannerData = await request.json()
    
    // Validate required fields
    if (!bannerData.name || !bannerData.config) {
      return NextResponse.json(
        { error: 'Banner name and configuration are required' },
        { status: 400 }
      )
    }

    // Generate a simple ID
    const bannerId = 'banner_' + Math.random().toString(36).substr(2, 9)

    // Save banner to database
    const { data: banner, error } = await supabase
      .from('ConsentBanner')
      .insert({
        id: bannerId,
        userId: session.user.id,
        name: bannerData.name,
        config: JSON.stringify(bannerData.config),
        isActive: bannerData.isActive || false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
      .select('id, name, config, isActive, createdAt, updatedAt')
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to save banner' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      banner: {
        ...banner,
        config: JSON.parse(banner.config)
      }
    })

  } catch (error) {
    console.error('Save banner error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get all banners for the user
    const { data: banners, error } = await supabase
      .from('ConsentBanner')
      .select('id, name, config, isActive, createdAt, updatedAt')
      .eq('userId', session.user.id)
      .order('updatedAt', { ascending: false })

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch banners' },
        { status: 500 }
      )
    }

    // Parse config JSON for each banner
    const parsedBanners = banners.map(banner => ({
      ...banner,
      config: JSON.parse(banner.config)
    }))

    return NextResponse.json({
      success: true,
      banners: parsedBanners
    })

  } catch (error) {
    console.error('Fetch banners error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
