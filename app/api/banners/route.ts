import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createClient } from '@supabase/supabase-js'
import jwt from 'jsonwebtoken'

// Use service role key for server-side operations (bypasses RLS)
// This is safe because we authenticate via NextAuth session before using it
const supabase = createClient(
  (process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co"),
  (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || "placeholder-key")
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

// GET /api/banners - Get team's banners
export async function GET(request: NextRequest) {
  try {
    const user = await getUser(request)
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get user's current team from session
    const session = await getServerSession(authOptions)
    let currentTeamId = session?.user?.currentTeamId || (session?.user as any)?.current_team_id

    console.log('🔍 Banners: User session:', session?.user?.id, 'currentTeamId:', currentTeamId)

    // If user doesn't have a team, this should not happen for registered users
    if (!currentTeamId && session?.user) {
      console.warn('❌ Banners: User has no workspace - this should not happen for registered users:', session.user.id)
      
      // Check if workspace exists in database but session is not updated
      const { data: existingTeamMember } = await supabase
        .from('TeamMember')
        .select('team_id, role')
        .eq('user_id', session.user.id)
        .limit(1)
        .maybeSingle()
      
      if (existingTeamMember) {
        console.log('✅ Banners: Found existing workspace in database:', existingTeamMember.team_id)
        // Update the user's current_team_id in the database
        await supabase
          .from('User')
          .update({ current_team_id: existingTeamMember.team_id })
          .eq('id', session.user.id)
        
        currentTeamId = existingTeamMember.team_id
        console.log('✅ Banners: Updated user current_team_id to:', currentTeamId)
      } else {
        console.error('❌ Banners: No workspace found for user - they need to contact support')
        return NextResponse.json(
          { error: 'No workspace found. Please contact support.' },
          { status: 400 }
        )
      }
    }

    // Get user's own projects (workspace owner) and projects where user is a collaborator
    const { data: ownProjects, error: ownProjectError } = await supabase
      .from('Project')
      .select('id')
      .eq('team_id', currentTeamId)

    // Also get projects where user is a team member (collaborator)
    const { data: memberProjects, error: memberProjectError } = await supabase
      .from('TeamMember')
      .select(`
        team_id,
        Team!inner(
          Project(id)
        )
      `)
      .eq('user_id', session?.user?.id)

    const allProjectIds = new Set<string>()
    
    // Add user's own projects (workspace owner)
    if (ownProjects) {
      ownProjects.forEach(p => allProjectIds.add(p.id))
    }
    
    // Add projects where user is a collaborator
    if (memberProjects) {
      memberProjects.forEach(mp => {
        if (mp.Team && Array.isArray(mp.Team)) {
          mp.Team.forEach(team => {
            if (team.Project && Array.isArray(team.Project)) {
              team.Project.forEach(project => allProjectIds.add(project.id))
            }
          })
        }
      })
    }

    if (ownProjectError || memberProjectError) {
      console.error('Error fetching projects:', ownProjectError || memberProjectError)
      return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
    }

    if (allProjectIds.size === 0) {
      console.log('No projects found for user')
      return NextResponse.json({ banners: [] })
    }

    const projectIds = Array.from(allProjectIds)
    
    // Get banners for these projects
    const { data: banners, error } = await supabase
      .from('ConsentBanner')
      .select(`
        id, name, config, isActive, createdAt, updatedAt,
        Project!inner(team_id)
      `)
      .in('projectId', projectIds)
      .order('createdAt', { ascending: false })

    if (error) {
      console.error('Error fetching banners:', error)
      
      // If we still have an error, return empty array instead of failing
      // This allows the dashboard to load even if there are database issues
      return NextResponse.json({ banners: [] })
    }

    // Transform banners to match Webflow extension format
    const transformedBanners = (banners || []).map(banner => {
      // Parse config if it's a JSON string
      let config = banner.config || {}
      if (typeof config === 'string') {
        try {
          config = JSON.parse(config)
        } catch (error) {
          console.error('Error parsing banner config:', error)
          config = {}
        }
      }

      return {
        id: banner.id,
        name: banner.name,
        config: config, // Include the parsed config for migration checks
        title: config.title || config.text?.title || 'We use cookies',
        message: config.message || config.text?.message || 'This website uses cookies to enhance your browsing experience.',
        primaryColor: config.primaryColor || config.colors?.button || '#0073e6',
        textColor: config.textColor || config.colors?.text || '#ffffff',
        acceptButton: config.acceptText || config.text?.acceptButton || 'Accept All',
        preferencesButton: config.preferencesText || config.text?.preferencesButton || 'Cookie Settings',
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

    // Check if user has permission to create banners (edit permission)
    const session = await getServerSession(authOptions)
    let currentTeamId = (session?.user as any)?.current_team_id
    let userRole = session?.user?.userRole

    // If user doesn't have a team, this should not happen for registered users
    if (!currentTeamId && session?.user) {
      console.warn('❌ Banners POST: User has no workspace - this should not happen for registered users:', session.user.id)
      
      // Check if workspace exists in database but session is not updated
      const { data: existingTeamMember } = await supabase
        .from('TeamMember')
        .select('team_id, role')
        .eq('user_id', session.user.id)
        .limit(1)
        .maybeSingle()
      
      if (existingTeamMember) {
        console.log('✅ Banners POST: Found existing workspace in database:', existingTeamMember.team_id)
        // Update the user's current_team_id in the database
        await supabase
          .from('User')
          .update({ current_team_id: existingTeamMember.team_id })
          .eq('id', session.user.id)
        
        currentTeamId = existingTeamMember.team_id
        userRole = existingTeamMember.role
        console.log('✅ Banners POST: Updated user current_team_id to:', currentTeamId)
      } else {
        console.error('❌ Banners POST: No workspace found for user - they need to contact support')
        return NextResponse.json(
          { error: 'No workspace found. Please contact support.' },
          { status: 400 }
        )
      }
    }

    // Check if user has edit permission
    if (!['owner', 'admin', 'editor'].includes(userRole || '')) {
      return NextResponse.json(
        { error: 'Insufficient permissions to create banners' },
        { status: 403 }
      )
    }

    const bannerData = await request.json()
    
    // Validate required fields
    if (!bannerData.name) {
      return NextResponse.json(
        { error: 'Banner name is required' },
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

    // First, get or create a project for this team
    let projectId: string
    const { data: existingProject, error: projectError } = await supabase
      .from('Project')
      .select('id')
      .eq('team_id', currentTeamId)
      .single()

    if (projectError || !existingProject) {
      // Create a new project if none exists
      projectId = crypto.randomUUID()
      const { error: createProjectError } = await supabase
        .from('Project')
        .insert({
          id: projectId,
          name: 'Team Cookie Banners',
          userId: user.userId,
          team_id: currentTeamId,
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