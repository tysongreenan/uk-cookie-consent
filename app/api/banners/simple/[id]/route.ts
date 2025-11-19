import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createClient } from '@supabase/supabase-js'

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

    // Get single banner by ID
    const { data, error } = await supabase.rpc('get_banners_simple', {
      user_id: session.user.id
    })

    if (error) {
      console.error('❌ Simple Get Single: Error fetching banner:', error)
      return NextResponse.json({ error: 'Failed to fetch banner' }, { status: 500 })
    }

    // Find the specific banner by ID
    const banner = data?.find((b: any) => b.id === params.id)
    
    if (!banner) {
      return NextResponse.json({ error: 'Banner not found' }, { status: 404 })
    }

    console.log('✅ Simple Get Single: Banner fetched successfully:', params.id)
    return NextResponse.json({ 
      success: true, 
      banner: banner
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

    const bannerData = await request.json()
    console.log('🎯 Simple Update: Banner data received:', JSON.stringify(bannerData).slice(0, 200))

    // Check if this is just a toggle request (only isActive field)
    if ('isActive' in bannerData && Object.keys(bannerData).length === 1) {
      // Check both SimpleBanners and ConsentBanner tables (for old banners)
      let bannerFound = false
      let bannerTable: 'SimpleBanners' | 'ConsentBanner' | null = null
      let currentState: boolean | null = null

      // First, try SimpleBanners (new system)
      const { data: userBanners, error: fetchError } = await supabase.rpc('get_banners_simple', {
        user_id: session.user.id
      })

      if (!fetchError && userBanners) {
        const existingBanner = userBanners.find((b: any) => b.id === params.id)
        if (existingBanner) {
          bannerFound = true
          bannerTable = 'SimpleBanners'
          currentState = existingBanner.isActive ?? true
        }
      }

      // If not found in SimpleBanners, check ConsentBanner (old system)
      if (!bannerFound) {
        // Get user's team to check ConsentBanner (session already available from above)
        const currentTeamId = session?.user?.currentTeamId

        if (currentTeamId) {
          const { data: consentBanner, error: consentError } = await supabase
            .from('ConsentBanner')
            .select('id, "isActive", Project!inner(teamId)')
            .eq('id', params.id)
            .eq('Project.teamId', currentTeamId)
            .maybeSingle()

          if (!consentError && consentBanner) {
            bannerFound = true
            bannerTable = 'ConsentBanner'
            currentState = consentBanner.isActive ?? false
          }
        }
      }

      if (!bannerFound) {
        console.error('❌ Simple Toggle: Banner not found in either table:', {
          bannerId: params.id,
          userId: session.user.id
        })
        return NextResponse.json({ 
          error: 'Banner not found',
          details: 'Banner does not exist or does not belong to this user',
          code: 'NOT_FOUND'
        }, { status: 404 })
      }

      console.log('✅ Simple Toggle: Banner found in', bannerTable, 'current state:', currentState, 'new state:', bannerData.isActive)

      // Update based on which table the banner is in
      if (bannerTable === 'SimpleBanners') {
        // Use RPC function for SimpleBanners
        const { data: rpcResult, error: rpcError } = await supabase.rpc('toggle_banner_active', {
          banner_id: params.id,
          user_id: session.user.id,
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
            details: 'Banner was not updated',
            code: 'NOT_FOUND'
          }, { status: 404 })
        }
      } else {
        // Direct update for ConsentBanner (old system)
        const { data: updateData, error: updateError } = await supabase
          .from('ConsentBanner')
          .update({ 
            isActive: bannerData.isActive,
            updatedAt: new Date().toISOString()
          })
          .eq('id', params.id)
          .select('id, "isActive"')
          .maybeSingle()

        if (updateError || !updateData) {
          console.error('❌ Simple Toggle: ConsentBanner update failed:', updateError)
          return NextResponse.json({ 
            error: 'Failed to toggle banner status',
            details: updateError?.message || 'Unknown error',
            code: updateError?.code
          }, { status: 500 })
        }
      }

      console.log('✅ Simple Toggle: Banner toggled successfully in', bannerTable)
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

    // Update banner using direct SQL to bypass RLS issues
    // Note: is_active parameter removed temporarily until SQL migration is run
    const { data, error } = await supabase.rpc('update_banner_simple', {
      banner_id: params.id,
      banner_name: bannerName,
      banner_config: bannerConfig,
      banner_code: code,
      user_id: session.user.id
    })

    if (error) {
      console.error('❌ Simple Update: Error updating banner:', error)
      return NextResponse.json({ error: 'Failed to update banner' }, { status: 500 })
    }

    console.log('✅ Simple Update: Banner updated successfully:', params.id)
    return NextResponse.json({ 
      success: true, 
      bannerId: params.id,
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

    // Delete banner using direct SQL to bypass RLS issues
    const { data, error } = await supabase.rpc('delete_banner_simple', {
      banner_id: params.id,
      user_id: session.user.id
    })

    if (error) {
      console.error('❌ Simple Delete: Error deleting banner:', error)
      return NextResponse.json({ error: 'Failed to delete banner' }, { status: 500 })
    }

    console.log('✅ Simple Delete: Banner deleted successfully:', params.id)
    return NextResponse.json({ 
      success: true, 
      message: 'Banner deleted successfully!' 
    })

  } catch (error) {
    console.error('❌ Simple Delete: Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
