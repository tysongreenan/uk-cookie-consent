import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
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

// Helper function to get user from either session or JWT token
async function getUser(request: NextRequest) {
  // Try NextAuth session first (for dashboard)
  const session = await getServerSession(authOptions)
  if (session?.user?.id) {
    return { userId: session.user.id, source: 'session' }
  }

  // Fallback to JWT token (for Webflow extension)
  const jwtUser = await verifyToken(request)
  if (jwtUser?.userId) {
    return { userId: jwtUser.userId, source: 'jwt' }
  }

  return null
}

// GET /api/banners - Get user's banners
export async function GET(request: NextRequest) {
  try {
    const user = await getUser(request)
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Try to query banners directly first (in case they have userId field)
    let { data: banners, error } = await supabase
      .from('ConsentBanner')
      .select('id, name, config, isActive, createdAt, updatedAt, userId')
      .eq('userId', user.userId)
      .order('createdAt', { ascending: false })

    // If that fails, try to get all banners and filter by project ownership
    if (error && error.code === 'PGRST116') {
      console.log('No userId field, trying alternative approach...')
      
      // Get user's projects first
      const { data: projects, error: projectError } = await supabase
        .from('Project')
        .select('id')
        .eq('userId', user.userId)

      if (projectError || !projects || projects.length === 0) {
        console.log('No projects found for user')
        banners = []
        error = null
      } else {
        const projectIds = projects.map(p => p.id)
        
        // Get banners for these projects
        const result = await supabase
          .from('ConsentBanner')
          .select('id, name, config, isActive, createdAt, updatedAt, projectId')
          .in('projectId', projectIds)
          .order('createdAt', { ascending: false })
        
        banners = result.data
        error = result.error
      }
    }

    if (error) {
      console.error('Error fetching banners:', error)
      
      // If we still have an error, return empty array instead of failing
      // This allows the dashboard to load even if there are database issues
      return NextResponse.json({ banners: [] })
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

    return NextResponse.json({ banners: transformedBanners })

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
    const user = await getUser(request)
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

    // First, get or create a project for this user
    let projectId: string
    const { data: existingProject, error: projectError } = await supabase
      .from('Project')
      .select('id')
      .eq('userId', user.userId)
      .single()

    if (projectError || !existingProject) {
      // Create a new project if none exists
      projectId = crypto.randomUUID()
      const { error: createProjectError } = await supabase
        .from('Project')
        .insert({
          id: projectId,
          name: 'My Cookie Banners',
          userId: user.userId,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        })

      if (createProjectError) {
        console.error('Error creating project:', createProjectError)
        return NextResponse.json(
          { error: 'Failed to create project' },
          { status: 500 }
        )
      }
    } else {
      projectId = existingProject.id
    }

    // Generate basic code for the banner
    const code = `<div id="cookie-banner-${bannerId}">
  <div class="cookie-banner-content">
    <h3>${config.title}</h3>
    <p>${config.message}</p>
    <button onclick="acceptCookies('${bannerId}')">${config.acceptText}</button>
    <button onclick="showPreferences('${bannerId}')">${config.preferencesText}</button>
  </div>
</div>
<script>
function acceptCookies(bannerId) {
  document.getElementById('cookie-banner-' + bannerId).style.display = 'none';
  // Add your cookie acceptance logic here
}
function showPreferences(bannerId) {
  // Add your preferences modal logic here
}
</script>`

    const { data: banner, error } = await supabase
      .from('ConsentBanner')
      .insert({
        id: bannerId,
        projectId: projectId,
        name: `${bannerData.title} Banner`,
        config: config,
        code: code,
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