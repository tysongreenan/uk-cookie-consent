import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
  process.env.SUPABASE_SERVICE_KEY || 'placeholder-key'
)

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params
    
    // Fetch user's banner configuration from ConsentBanner table
    const { data: banners, error } = await supabase
      .from('ConsentBanner')
      .select(`
        id,
        name,
        config,
        "isActive",
        Project!inner(
          userId
        )
      `)
      .eq('Project.userId', userId)
      .eq('isActive', true)
      .limit(1)
    
    if (error || !banners || banners.length === 0) {
      return NextResponse.json(
        { error: 'Configuration not found' },
        { status: 404 }
      )
    }
    
    const banner = banners[0]
    const config = typeof banner.config === 'string' 
      ? JSON.parse(banner.config) 
      : banner.config
    
    // Return sanitized config (don't expose sensitive data)
    return NextResponse.json({
      id: banner.id,
      name: banner.name,
      colors: config.colors || {
        background: '#ffffff',
        text: '#333333',
        acceptButton: '#007bff',
        rejectButton: '#6c757d'
      },
      text: config.text || {
        message: 'We use cookies to enhance your browsing experience.',
        acceptButton: 'Accept All',
        rejectButton: 'Reject All'
      },
      position: config.position || 'bottom',
      scripts: config.scripts || [],
      compliance: config.compliance || { framework: 'gdpr' },
      integrations: config.integrations || {}
    })
  } catch (error) {
    console.error('Config fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
