import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createClient } from '@supabase/supabase-js'
import { bannerRateLimit } from '@/lib/rate-limit'
import { sanitizeBannerName, sanitizeBannerConfig } from '@/lib/sanitize'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(request: NextRequest) {
  try {
    // Check rate limit
    const rateLimitResult = await bannerRateLimit.check(request);
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please slow down.' },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': '10',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': rateLimitResult.resetTime.toString(),
            'Retry-After': Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000).toString(),
          }
        }
      );
    }

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

    // Sanitize input data
    const sanitizedName = sanitizeBannerName(bannerData.name);
    const sanitizedConfig = sanitizeBannerConfig(bannerData.config);

    if (!sanitizedName) {
      return NextResponse.json(
        { error: 'Invalid banner name' },
        { status: 400 }
      )
    }

    // Generate a secure ID
    const bannerId = crypto.randomUUID()

    // Save banner to database
    const { data: banner, error } = await supabase
      .from('ConsentBanner')
      .insert({
        id: bannerId,
        userId: session.user.id,
        name: sanitizedName,
        config: JSON.stringify(sanitizedConfig),
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
