import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
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

    const bannerData = await request.json()
    console.log('🎯 Simple Update: Banner data received:', JSON.stringify(bannerData).slice(0, 200))

    // Check if this is just a toggle request (only isActive field)
    if ('isActive' in bannerData && Object.keys(bannerData).length === 1) {
      // Use dedicated toggle function
      const { data, error } = await supabase.rpc('toggle_banner_active', {
        banner_id: params.id,
        user_id: session.user.id,
        is_active: bannerData.isActive
      })

      if (error) {
        console.error('❌ Simple Toggle: Error toggling banner:', error)
        return NextResponse.json({ error: 'Failed to toggle banner status' }, { status: 500 })
      }

      console.log('✅ Simple Toggle: Banner toggled successfully:', params.id)
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
    const { data, error } = await supabase.rpc('update_banner_simple', {
      banner_id: params.id,
      banner_name: bannerName,
      banner_config: bannerConfig,
      banner_code: code,
      user_id: session.user.id,
      is_active: bannerData.isActive !== undefined ? bannerData.isActive : null
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
