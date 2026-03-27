import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createClient } from '@supabase/supabase-js'
import { canUseLayout } from '@/lib/plan-restrictions'
import { PlanTier } from '@/types'
import { logActivity, AuditAction } from '@/lib/audit-log'

// Lazy initialization to avoid build-time errors
function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  // Always use service role key for admin operations (bypasses RLS)
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
  
  if (!url || !key) {
    throw new Error('Supabase configuration is missing')
  }
  
  // Log which key we're using (for debugging - remove in production)
  if (process.env.NODE_ENV === 'development') {
    console.log('🔑 Using Supabase key:', key.startsWith('sb_secret') ? 'Service Role' : 'Anon Key')
  }
  
  return createClient(url, key)
}

// Force dynamic rendering
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

/**
 * Get the user IDs that the current user is allowed to access banners for.
 * If in a team workspace, returns all team member IDs. Otherwise just the user's own ID.
 */
async function getAccessibleUserIds(
  supabase: ReturnType<typeof getSupabaseClient>,
  userId: string,
  currentTeamId: string | null | undefined
): Promise<string[]> {
  if (!currentTeamId) return [userId]

  const { data: members, error } = await supabase
    .from('TeamMember')
    .select('user_id')
    .eq('team_id', currentTeamId)

  if (error) {
    console.error('Error fetching team members for banner access:', error)
    return [userId]
  }

  const ids = members?.map(m => m.user_id) || []
  return ids.length > 0 ? ids : [userId]
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get Supabase client
    const supabase = getSupabaseClient()
    const accessibleUserIds = await getAccessibleUserIds(supabase, session.user.id, session.user.currentTeamId)

    // Get single banner by ID, checking all accessible user IDs
    const { data: banner, error } = await supabase
      .from('SimpleBanners')
      .select('*')
      .eq('id', params.id)
      .in('userId', accessibleUserIds)
      .single()

    if (error || !banner) {
      return NextResponse.json({ error: 'Banner not found' }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      banner: { ...banner, isActive: banner.isActive ?? true }
    })

  } catch (error) {
    console.error('❌ Simple Get Single: Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
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

    // Get Supabase client
    const supabase = getSupabaseClient()
    const accessibleUserIds = await getAccessibleUserIds(supabase, session.user.id, session.user.currentTeamId)

    const bannerData = await request.json()

    // Check if this is just a toggle request (only isActive field)
    if ('isActive' in bannerData && Object.keys(bannerData).length === 1) {
      // Verify the banner belongs to an accessible user
      const { data: existingBanner } = await supabase
        .from('SimpleBanners')
        .select('id, isActive, userId')
        .eq('id', params.id)
        .in('userId', accessibleUserIds)
        .single()

      if (!existingBanner) {
        return NextResponse.json({
          error: 'Banner not found',
          code: 'NOT_FOUND'
        }, { status: 404 })
      }

      // Toggle using the banner owner's userId (RPC requires the owner)
      const { data: rpcResult, error: rpcError } = await supabase.rpc('toggle_banner_active', {
        banner_id: params.id,
        user_id: existingBanner.userId,
        is_active: bannerData.isActive
      })

      if (rpcError) {
        console.error('❌ Simple Toggle: RPC failed:', rpcError)
        return NextResponse.json({
          error: 'Failed to toggle banner status',
          details: rpcError?.message || 'Unknown error',
          code: rpcError?.code
        }, { status: 500 })
      }

      if (rpcResult === false) {
        return NextResponse.json({
          error: 'Banner not found',
          code: 'NOT_FOUND'
        }, { status: 404 })
      }

      return NextResponse.json({
        success: true,
        bannerId: params.id,
        isActive: bannerData.isActive,
        message: 'Banner status updated successfully!'
      })
    }

    // Extract banner name and config for full updates
    const bannerName = bannerData.name || bannerData.config?.name || 'Untitled Banner'
    const bannerConfig = bannerData.config || bannerData

    // Validate layout/position against user's plan
    const requestedLayout = bannerConfig.position
    if (requestedLayout) {
      const userTier = (session.user.planTier || 'free') as PlanTier
      if (!canUseLayout(userTier, requestedLayout)) {
        return NextResponse.json({
          error: `The "${requestedLayout}" layout is not available on your current plan. Upgrade to Pro to unlock all layouts.`,
          upgradeRequired: true
        }, { status: 403 })
      }
    }

    // Generate updated code
    const code = `<div id="cookie-banner-${params.id}">
  <div style="position: fixed; bottom: 0; left: 0; right: 0; background: #333; color: white; padding: 20px; z-index: 9999;">
    <h3>Cookie Consent</h3>
    <p>We use cookies to improve your experience. Please accept to continue.</p>
    <button onclick="acceptCookies()" style="background: #007bff; color: white; border: none; padding: 10px 20px; margin-right: 10px;">Accept All</button>
    <button onclick="rejectCookies()" style="background: #6c757d; color: white; border: none; padding: 10px 20px;">Reject All</button>
  </div>
</div>

<script>
function acceptCookies() {
  document.getElementById('cookie-banner-${params.id}').style.display = 'none';
  localStorage.setItem('cookieConsent', 'accepted');
}

function rejectCookies() {
  document.getElementById('cookie-banner-${params.id}').style.display = 'none';
  localStorage.setItem('cookieConsent', 'rejected');
}
</script>`

    // Verify banner is accessible (own or team member's)
    const { data: bannerToUpdate } = await supabase
      .from('SimpleBanners')
      .select('userId')
      .eq('id', params.id)
      .in('userId', accessibleUserIds)
      .single()

    if (!bannerToUpdate) {
      return NextResponse.json({ error: 'Banner not found' }, { status: 404 })
    }

    // Update banner using the banner owner's userId (RPC requires the owner)
    const { data, error } = await supabase.rpc('update_banner_simple', {
      banner_id: params.id,
      banner_name: bannerName,
      banner_config: bannerConfig,
      banner_code: code,
      user_id: bannerToUpdate.userId
    })

    if (error) {
      console.error('❌ Simple Update: Error updating banner:', error)
      return NextResponse.json({ error: 'Failed to update banner' }, { status: 500 })
    }

    // Fetch the updated banner to get the actual updatedAt timestamp from DB
    // This is critical for ETag-based cache invalidation to work correctly
    const { data: updatedBanner } = await supabase
      .from('SimpleBanners')
      .select('id, name, updatedAt')
      .eq('id', params.id)
      .single()

    console.log('✅ Simple Update: Banner updated:', params.id)
    logActivity(session.user.id, AuditAction.BANNER_UPDATE, request, { bannerId: params.id, bannerName })

    return NextResponse.json({
      success: true,
      bannerId: params.id,
      banner: updatedBanner ? {
        id: updatedBanner.id,
        name: updatedBanner.name,
        updatedAt: updatedBanner.updatedAt
      } : undefined,
      code,
      message: 'Banner updated successfully!'
    })

  } catch (error) {
    console.error('❌ Simple Update: Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
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

    // Get Supabase client
    const supabase = getSupabaseClient()
    const accessibleUserIds = await getAccessibleUserIds(supabase, session.user.id, session.user.currentTeamId)

    // Verify banner is accessible (own or team member's)
    const { data: bannerToDelete } = await supabase
      .from('SimpleBanners')
      .select('userId')
      .eq('id', params.id)
      .in('userId', accessibleUserIds)
      .single()

    if (!bannerToDelete) {
      return NextResponse.json({ error: 'Banner not found' }, { status: 404 })
    }

    // Delete banner using the banner owner's userId (RPC requires the owner)
    const { data, error } = await supabase.rpc('delete_banner_simple', {
      banner_id: params.id,
      user_id: bannerToDelete.userId
    })

    if (error) {
      console.error('❌ Simple Delete: Error deleting banner:', error)
      return NextResponse.json({ error: 'Failed to delete banner' }, { status: 500 })
    }

    console.log('✅ Simple Delete: Banner deleted successfully:', params.id)
    logActivity(session.user.id, AuditAction.BANNER_DELETE, request, { bannerId: params.id })

    return NextResponse.json({
      success: true,
      message: 'Banner deleted successfully!'
    })

  } catch (error) {
    console.error('❌ Simple Delete: Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
