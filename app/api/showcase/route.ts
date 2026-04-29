import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase-admin'

export const dynamic = 'force-dynamic'

interface BannerConfig {
  branding?: {
    logo?: {
      url?: string
      enabled?: boolean
    }
  }
}

interface ShowcaseUser {
  id: string
  name: string | null
}

interface ShowcaseProject {
  id: string
  userId: string
  domain: string | null
}

interface ShowcaseBanner {
  projectId: string
  config: BannerConfig | null
}

export async function GET(request: NextRequest) {
  try {
    const supabase = getSupabaseAdmin()

    // Fetch the most recent users first, then resolve their projects and latest active banners.
    const { data: users, error: usersError } = await supabase
      .from('User')
      .select('id, name')
      .order('createdAt', { ascending: false })
      .limit(50)

    if (usersError) {
      throw usersError
    }

    const userList = (users || []) as ShowcaseUser[]
    const userIds = userList.map((user) => user.id)

    if (userIds.length === 0) {
      return NextResponse.json({ items: [] })
    }

    const { data: projects, error: projectsError } = await supabase
      .from('Project')
      .select('id, userId, domain')
      .in('userId', userIds)
      .not('domain', 'is', null)
      .limit(5000)

    if (projectsError) {
      throw projectsError
    }

    const projectList = (projects || []) as ShowcaseProject[]
    const projectIds = projectList.map((project) => project.id)

    if (projectIds.length === 0) {
      return NextResponse.json({ items: [] })
    }

    const { data: banners, error: bannersError } = await supabase
      .from('ConsentBanner')
      .select('projectId, config')
      .in('projectId', projectIds)
      .eq('isActive', true)
      .order('updatedAt', { ascending: false })
      .limit(5000)

    if (bannersError) {
      throw bannersError
    }

    const latestBannerByProject = new Map<string, ShowcaseBanner>()
    for (const banner of (banners || []) as ShowcaseBanner[]) {
      if (!latestBannerByProject.has(banner.projectId)) {
        latestBannerByProject.set(banner.projectId, banner)
      }
    }

    const userById = new Map(userList.map((user) => [user.id, user]))

    const showcaseItems = projectList
      .flatMap((project) => {
        const banner = latestBannerByProject.get(project.id)
        if (!banner?.config || !project.domain) return []

        const logoUrl = banner.config.branding?.logo?.url
        const logoEnabled = banner.config.branding?.logo?.enabled

        if (!logoUrl || !logoEnabled) return []

        let websiteUrl = project.domain
        if (!websiteUrl.startsWith('http')) {
          websiteUrl = `https://${websiteUrl}`
        }

        return {
          companyName: userById.get(project.userId)?.name || project.domain,
          logoUrl,
          websiteUrl,
        }
      })
      // Remove duplicates (by logo URL or website)
      .filter((item, index, self) => 
        index === self.findIndex((t) => (
          t.websiteUrl === item.websiteUrl
        ))
      )
      // Limit to 20 items for the marquee
      .slice(0, 20)

    return NextResponse.json({ items: showcaseItems })
  } catch (error) {
    console.error('Error fetching showcase items:', error)
    return NextResponse.json({ 
      items: [], 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}
