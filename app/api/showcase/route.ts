import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

interface BannerConfig {
  branding?: {
    logo?: {
      url?: string
      enabled?: boolean
    }
  }
}

export async function GET(request: NextRequest) {
  try {
    // 1. Fetch ALL users (removed planTier: 'pro' check) with their projects and banners
    // Limiting to 50 most recent users to check for valid logos
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        projects: {
          where: {
            domain: {
              not: null, // Must have a domain
            },
          },
          select: {
            domain: true,
            consentBanners: {
              where: {
                isActive: true,
              },
              orderBy: {
                updatedAt: 'desc',
              },
              take: 1, // Only need the most recent active banner
              select: {
                config: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc', // Show most recent users first
      },
      take: 50,
    })

    // 2. Process and filter the results
    const showcaseItems = users
      .flatMap(user => {
        return user.projects.flatMap(project => {
          const banner = project.consentBanners[0]
          if (!banner || !banner.config) return []

          const config = banner.config as unknown as BannerConfig
          const logoUrl = config.branding?.logo?.url
          const logoEnabled = config.branding?.logo?.enabled

          // Must have a valid logo URL and be enabled
          if (!logoUrl || !logoEnabled || !project.domain) return []

          // Ensure domain has protocol
          let websiteUrl = project.domain
          if (!websiteUrl.startsWith('http')) {
            websiteUrl = `https://${websiteUrl}`
          }

          return {
            id: user.id,
            companyName: user.name || project.domain,
            logoUrl,
            websiteUrl,
          }
        })
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
