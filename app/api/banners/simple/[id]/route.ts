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
      // First, verify the banner exists and belongs to the user
      const { data: existingBanner, error: checkError } = await supabase
        .from('SimpleBanners')
        .select('id, "userId", "isActive"')
        .eq('id', params.id)
        .single()

      if (checkError || !existingBanner) {
        console.error('❌ Simple Toggle: Banner not found:', {
          error: checkError,
          bannerId: params.id,
          userId: session.user.id
        })
        return NextResponse.json({ 
          error: 'Banner not found',
          details: checkError?.message || 'Banner does not exist',
          code: checkError?.code || 'NOT_FOUND'
        }, { status: 404 })
      }

      // Verify banner belongs to user
      if (existingBanner.userId !== session.user.id) {
        console.error('❌ Simple Toggle: Banner does not belong to user:', {
          bannerUserId: existingBanner.userId,
          sessionUserId: session.user.id,
          bannerId: params.id
        })
        return NextResponse.json({ 
          error: 'Unauthorized',
          details: 'Banner does not belong to this user'
        }, { status: 403 })
      }

      console.log('✅ Simple Toggle: Banner found, current state:', existingBanner.isActive, 'new state:', bannerData.isActive)

      // Try RPC function first
      const { data: rpcData, error: rpcError } = await supabase.rpc('toggle_banner_active', {
        banner_id: params.id,
        user_id: session.user.id,
        is_active: bannerData.isActive
      })

      // If RPC fails, fallback to direct update
      if (rpcError) {
        console.warn('⚠️ Simple Toggle: RPC failed, trying direct update:', {
          error: rpcError,
          message: rpcError?.message,
          code: rpcError?.code,
          details: rpcError?.details,
          hint: rpcError?.hint
        })
        
        // Try direct update using service role (should bypass RLS)
        // Use maybeSingle() instead of single() to avoid PGRST204 when no rows match
        const { data: updateData, error: updateError } = await supabase
          .from('SimpleBanners')
          .update({ 
            "isActive": bannerData.isActive,
            "updatedAt": new Date().toISOString()
          })
          .eq('id', params.id)
          .eq('userId', session.user.id)
          .select('id, "isActive"')
          .maybeSingle()

        if (updateError || !updateData) {
          console.error('❌ Simple Toggle: Direct update also failed:', {
            error: updateError,
            message: updateError?.message,
            code: updateError?.code,
            details: updateError?.details,
            hint: updateError?.hint,
            bannerId: params.id,
            userId: session.user.id,
            existingBanner: existingBanner
          })
          return NextResponse.json({ 
            error: 'Failed to toggle banner status',
            details: updateError?.message || rpcError?.message || 'Unknown error',
            code: updateError?.code || rpcError?.code
          }, { status: 500 })
        }

        console.log('✅ Simple Toggle: Banner toggled via direct update:', params.id)
        return NextResponse.json({ 
          success: true, 
          bannerId: params.id,
          isActive: updateData.isActive,
          message: 'Banner status updated successfully!' 
        })
      }

      console.log('✅ Simple Toggle: Banner toggled successfully via RPC:', params.id)
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
