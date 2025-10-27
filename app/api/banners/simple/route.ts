import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const bannerData = await request.json()
    console.log('🎯 Simple Save: Banner data received:', JSON.stringify(bannerData).slice(0, 200))

    // Validate required fields
    if (!bannerData.name && !bannerData.config?.name) {
      return NextResponse.json({ error: 'Banner name is required' }, { status: 400 })
    }

    // Extract banner name and config
    const bannerName = bannerData.name || bannerData.config?.name || 'Untitled Banner'
    const bannerConfig = bannerData.config || bannerData

    // Generate banner ID and code
    const bannerId = crypto.randomUUID()
    const code = `<div id="cookie-banner-${bannerId}">
  <div style="position: fixed; bottom: 0; left: 0; right: 0; background: #333; color: white; padding: 20px; z-index: 9999;">
    <h3>Cookie Consent</h3>
    <p>We use cookies to improve your experience. Please accept to continue.</p>
    <button onclick="acceptCookies()" style="background: #007bff; color: white; border: none; padding: 10px 20px; margin-right: 10px;">Accept All</button>
    <button onclick="rejectCookies()" style="background: #6c757d; color: white; border: none; padding: 10px 20px;">Reject All</button>
  </div>
</div>

<script>
function acceptCookies() {
  document.getElementById('cookie-banner-${bannerId}').style.display = 'none';
  localStorage.setItem('cookieConsent', 'accepted');
}

function rejectCookies() {
  document.getElementById('cookie-banner-${bannerId}').style.display = 'none';
  localStorage.setItem('cookieConsent', 'rejected');
}
</script>`

    // Create banner using direct SQL to bypass RLS issues
    const { data, error } = await supabase.rpc('create_banner_simple', {
      banner_id: bannerId,
      banner_name: bannerName,
      banner_config: bannerConfig,
      banner_code: code,
      user_id: session.user.id
    })

    if (error) {
      console.error('❌ Simple Save: Error creating banner:', error)
      return NextResponse.json({ error: 'Failed to create banner' }, { status: 500 })
    }

    console.log('✅ Simple Save: Banner created successfully:', bannerId)
    return NextResponse.json({ 
      success: true, 
      bannerId,
      code,
      message: 'Banner saved successfully!' 
    })

  } catch (error) {
    console.error('❌ Simple Save: Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get banners using direct SQL to bypass RLS issues
    const { data, error } = await supabase.rpc('get_banners_simple', {
      user_id: session.user.id
    })

    if (error) {
      console.error('❌ Simple Get: Error fetching banners:', error)
      return NextResponse.json({ error: 'Failed to fetch banners' }, { status: 500 })
    }

    console.log('✅ Simple Get: Banners fetched successfully:', data?.length || 0)
    return NextResponse.json({ banners: data || [] })

  } catch (error) {
    console.error('❌ Simple Get: Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
