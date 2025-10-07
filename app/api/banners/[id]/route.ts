import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get the specific banner
    const { data: banner, error } = await supabase
      .from('ConsentBanner')
      .select('id, name, config, isActive, createdAt, updatedAt')
      .eq('id', params.id)
      .eq('userId', session.user.id)
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Banner not found' },
        { status: 404 }
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
    console.error('Fetch banner error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    // Update banner in database
    const { data: banner, error } = await supabase
      .from('ConsentBanner')
      .update({
        name: bannerData.name,
        config: JSON.stringify(bannerData.config),
        isActive: bannerData.isActive || false,
        updatedAt: new Date().toISOString()
      })
      .eq('id', params.id)
      .eq('userId', session.user.id)
      .select('id, name, config, isActive, createdAt, updatedAt')
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to update banner' },
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
    console.error('Update banner error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Delete banner from database
    const { error } = await supabase
      .from('ConsentBanner')
      .delete()
      .eq('id', params.id)
      .eq('userId', session.user.id)

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to delete banner' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Banner deleted successfully'
    })

  } catch (error) {
    console.error('Delete banner error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
