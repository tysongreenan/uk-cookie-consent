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
    const currentTeamId = session?.user?.currentTeamId

    if (!currentTeamId) {
      return NextResponse.json(
        { error: 'No team selected' },
        { status: 400 }
      )
    }

    // Get team's projects
    const { data: projects, error: projectError } = await supabase
      .from('Project')
      .select('id')
      .eq('teamId', currentTeamId)

    if (projectError || !projects || projects.length === 0) {
      console.log('No projects found for team')
      return NextResponse.json({ banners: [] })
    }

    const projectIds = projects.map(p => p.id)
    
    // Get banners for these projects
    const { data: banners, error } = await supabase
      .from('ConsentBanner')
      .select(`
        id, name, config, isActive, createdAt, updatedAt,
        Project!inner(teamId)
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
    let currentTeamId = session?.user?.current_team_id
    let userRole = session?.user?.userRole

    // If user doesn't have a team, create one for them
    if (!currentTeamId && session?.user) {
      try {
        // Create a default team for the user
        const teamId = crypto.randomUUID()
        const memberId = crypto.randomUUID()
        
        const { data: team, error: teamError } = await supabase
          .from('Team')
          .insert({
            id: teamId,
            name: `${session.user.name || session.user.email}'s Team`,
            owner_id: session.user.id,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
          .select()
          .single()

        if (teamError) {
          console.error('Error creating team:', teamError)
          return NextResponse.json(
            { error: 'Failed to create team' },
            { status: 500 }
          )
        }

        // Add user as owner of the team
        const { error: memberError } = await supabase
          .from('TeamMember')
          .insert({
            id: memberId,
            team_id: team.id,
            user_id: session.user.id,
            role: 'owner',
            invited_by: session.user.id,
            joined_at: new Date().toISOString(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })

        if (memberError) {
          console.error('Error adding user as team member:', memberError)
          // Clean up the team if member creation fails
          await supabase.from('Team').delete().eq('id', team.id)
          return NextResponse.json(
            { error: 'Failed to add user to team' },
            { status: 500 }
          )
        }

        // Update user's current_team_id
        const { error: updateError } = await supabase
          .from('User')
          .update({ current_team_id: team.id })
          .eq('id', session.user.id)

        if (updateError) {
          console.error('Error updating user current_team_id:', updateError)
          // Don't fail the request for this
        }

        // Use the newly created team
        currentTeamId = team.id
        userRole = 'owner'
      } catch (error) {
        console.error('Error setting up team for user:', error)
        return NextResponse.json(
          { error: 'Failed to set up team' },
          { status: 500 }
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
      .eq('teamId', currentTeamId)
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
          teamId: currentTeamId,
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