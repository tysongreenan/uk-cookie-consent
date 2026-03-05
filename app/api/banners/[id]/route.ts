import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createClient } from '@supabase/supabase-js'
import { migrateBannerConfig, needsMigration } from '@/lib/banner-migration'
import { invalidateBannerCache } from '@/lib/banner-cache'

const supabase = createClient(
  (process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co"),
  (process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || "placeholder-key")
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

    const currentTeamId = session.user.currentTeamId || (session.user as any).current_team_id
    if (!currentTeamId) {
      return NextResponse.json(
        { error: 'No team selected' },
        { status: 400 }
      )
    }

    // Get the banner and verify it belongs to user's team
    const { data: banner, error } = await supabase
      .from('ConsentBanner')
      .select(`
        id, name, config, isActive, createdAt, updatedAt,
        Project!inner(teamId)
      `)
      .eq('id', params.id)
      .eq('Project.teamId', currentTeamId)
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Banner not found' },
        { status: 404 }
      )
    }

    // Parse config and check if migration is needed
    const config = JSON.parse(banner.config)
    const migratedConfig = needsMigration(config) ? migrateBannerConfig(config) : config

    return NextResponse.json({
      success: true,
      banner: {
        ...banner,
        config: migratedConfig,
        needsMigration: needsMigration(config)
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
  return handleBannerUpdate(request, params.id)
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return handleBannerUpdate(request, params.id)
}

async function handleBannerUpdate(
  request: NextRequest,
  bannerId: string
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const currentTeamId = session.user.currentTeamId
    const userRole = session.user.userRole

    if (!currentTeamId) {
      return NextResponse.json(
        { error: 'No team selected' },
        { status: 400 }
      )
    }

    // Check if user has edit permission
    if (!['owner', 'admin', 'editor'].includes(userRole || '')) {
      return NextResponse.json(
        { error: 'Insufficient permissions to edit banners' },
        { status: 403 }
      )
    }

    const bannerData = await request.json()
    
    // Validate required fields
    if (!bannerData.name || !bannerData.config) {
      return NextResponse.json(
        { error: 'Banner name and configuration are required' },
        { status: 400 }
      )
    }

    // First get the banner to verify it belongs to user's team
    const { data: existingBanner, error: fetchError } = await supabase
      .from('ConsentBanner')
      .select(`
        id,
        Project!inner(teamId)
      `)
      .eq('id', bannerId)
      .eq('Project.teamId', currentTeamId)
      .single()

    if (fetchError || !existingBanner) {
      return NextResponse.json(
        { error: 'Banner not found or unauthorized' },
        { status: 404 }
      )
    }

    // Apply migration to config before saving
    const migratedConfig = needsMigration(bannerData.config) ? migrateBannerConfig(bannerData.config) : bannerData.config

    // Update banner in database
    const { data: banner, error } = await supabase
      .from('ConsentBanner')
      .update({
        name: bannerData.name,
        config: JSON.stringify(migratedConfig),
        isActive: bannerData.isActive || false,
        updatedAt: new Date().toISOString()
      })
      .eq('id', bannerId)
      .select('id, name, config, isActive, createdAt, updatedAt')
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to update banner' },
        { status: 500 }
      )
    }

    // Invalidate cache so changes appear immediately on live websites
    invalidateBannerCache(bannerId)
    console.log(`✅ Banner ${bannerId} updated and cache invalidated`)

    return NextResponse.json({
      success: true,
      banner: {
        ...banner,
        config: migratedConfig
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

    const currentTeamId = session.user.currentTeamId
    const userRole = session.user.userRole

    if (!currentTeamId) {
      return NextResponse.json(
        { error: 'No team selected' },
        { status: 400 }
      )
    }

    // Check if user has delete permission (admin or owner only)
    if (!['owner', 'admin'].includes(userRole || '')) {
      return NextResponse.json(
        { error: 'Insufficient permissions to delete banners' },
        { status: 403 }
      )
    }

    // First verify banner belongs to user's team before deleting
    const { data: existingBanner, error: fetchError } = await supabase
      .from('ConsentBanner')
      .select(`
        id,
        Project!inner(teamId)
      `)
      .eq('id', params.id)
      .eq('Project.teamId', currentTeamId)
      .single()

    if (fetchError || !existingBanner) {
      return NextResponse.json(
        { error: 'Banner not found or unauthorized' },
        { status: 404 }
      )
    }

    // Delete banner from database
    const { error } = await supabase
      .from('ConsentBanner')
      .delete()
      .eq('id', params.id)

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
