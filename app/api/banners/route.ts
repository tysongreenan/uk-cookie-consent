import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import jwt from 'jsonwebtoken'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Helper function to verify JWT token
async function verifyToken(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }

  const token = authHeader.substring(7)
  try {
    const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET!) as any
    return decoded
  } catch (error) {
    return null
  }
}

// GET /api/banners - Get user's banners
export async function GET(request: NextRequest) {
  try {
    const user = await verifyToken(request)
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { data: banners, error } = await supabase
      .from('ConsentBanner')
      .select('id, name, config, isActive, createdAt, updatedAt')
      .eq('userId', user.userId)
      .order('createdAt', { ascending: false })

    if (error) {
      console.error('Error fetching banners:', error)
      return NextResponse.json(
        { error: 'Failed to fetch banners' },
        { status: 500 }
      )
    }

    // Transform banners to match Webflow extension format
    const transformedBanners = banners.map(banner => {
      const config = banner.config || {}
      return {
        id: banner.id,
        name: banner.name,
        title: config.title || 'We use cookies',
        message: config.message || 'This website uses cookies to enhance your browsing experience.',
        primaryColor: config.primaryColor || '#0073e6',
        textColor: config.textColor || '#ffffff',
        acceptButton: config.acceptText || 'Accept All',
        preferencesButton: config.preferencesText || 'Cookie Settings',
        position: config.position || 'bottom',
        theme: config.theme || 'dark',
        isActive: banner.isActive,
        createdAt: banner.createdAt,
        updatedAt: banner.updatedAt
      }
    })

    return NextResponse.json(transformedBanners)

  } catch (error) {
    console.error('Get banners error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/banners - Create a new banner
export async function POST(request: NextRequest) {
  try {
    const user = await verifyToken(request)
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const bannerData = await request.json()
    
    // Validate required fields
    if (!bannerData.title || !bannerData.message) {
      return NextResponse.json(
        { error: 'Title and message are required' },
        { status: 400 }
      )
    }

    const bannerId = crypto.randomUUID()
    
    // Transform Webflow extension format to internal format
    const config = {
      theme: bannerData.theme || 'dark',
      position: bannerData.position || 'bottom',
      title: bannerData.title,
      message: bannerData.message,
      acceptText: bannerData.acceptButton || 'Accept All',
      preferencesText: bannerData.preferencesButton || 'Cookie Settings',
      primaryColor: bannerData.primaryColor || '#0073e6',
      textColor: bannerData.textColor || '#ffffff',
      language: 'en',
      scripts: {
        strictlyNecessary: [],
        functionality: [],
        trackingPerformance: [],
        targetingAdvertising: []
      }
    }

    const { data: banner, error } = await supabase
      .from('ConsentBanner')
      .insert({
        id: bannerId,
        userId: user.userId,
        name: `${bannerData.title} Banner`,
        config: config,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
      .select('id, name, config, isActive, createdAt, updatedAt')
      .single()

    if (error) {
      console.error('Error creating banner:', error)
      return NextResponse.json(
        { error: 'Failed to create banner' },
        { status: 500 }
      )
    }

    // Return in Webflow extension format
    const transformedBanner = {
      id: banner.id,
      name: banner.name,
      title: config.title,
      message: config.message,
      primaryColor: config.primaryColor,
      textColor: config.textColor,
      acceptButton: config.acceptText,
      preferencesButton: config.preferencesText,
      position: config.position,
      theme: config.theme,
      isActive: banner.isActive,
      createdAt: banner.createdAt,
      updatedAt: banner.updatedAt
    }

    return NextResponse.json(transformedBanner, { status: 201 })

  } catch (error) {
    console.error('Create banner error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}