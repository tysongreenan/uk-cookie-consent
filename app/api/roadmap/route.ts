import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export const dynamic = 'force-dynamic'

// GET /api/roadmap - Get roadmap items with user's vote status
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    // Provide default roadmap items if database tables don't exist yet
    const defaultItems = [
      {
        id: 1,
        title: 'Advanced Analytics Dashboard',
        description: 'Comprehensive analytics showing consent rates, user interactions, and conversion metrics.',
        category: 'analytics',
        status: 'planned',
        vote_count: 47,
        userVoted: false,
        priority: 1
      },
      {
        id: 2,
        title: 'Team Collaboration Features',
        description: 'Invite team members, assign roles, and collaborate on banner projects together.',
        category: 'collaboration',
        status: 'planned',
        vote_count: 32,
        userVoted: false,
        priority: 2
      },
      {
        id: 3,
        title: 'Multi-Language Support',
        description: 'Built-in translations for 20+ languages with automatic locale detection.',
        category: 'localization',
        status: 'in-progress',
        vote_count: 28,
        userVoted: false,
        priority: 3
      },
      {
        id: 4,
        title: 'Advanced Compliance Tools',
        description: 'Automated compliance checking, privacy policy generators, and legal document templates.',
        category: 'compliance',
        status: 'planned',
        vote_count: 41,
        userVoted: false,
        priority: 4
      },
      {
        id: 5,
        title: 'Custom CSS Editor',
        description: 'Advanced styling options with live preview and CSS customization.',
        category: 'design',
        status: 'planned',
        vote_count: 19,
        userVoted: false,
        priority: 5
      },
      {
        id: 6,
        title: 'A/B Testing Framework',
        description: 'Test different banner designs and messages to optimize conversion rates.',
        category: 'optimization',
        status: 'planned',
        vote_count: 35,
        userVoted: false,
        priority: 6
      }
    ]

    // Try to get roadmap items from database, fallback to default if tables don't exist
    try {
      const { data: roadmapItems, error: itemsError } = await supabase
        .from('RoadmapItemWithVotes')
        .select('*')
        .order('priority', { ascending: true })

      if (itemsError) {
        console.error('Error fetching roadmap items:', itemsError)
        // Return default items if database tables don't exist
        return NextResponse.json({ items: defaultItems })
      }

      // If user is authenticated, get their votes
      let userVotedItems = new Set<number>()
      if (session?.user?.id) {
        const { data: userVotes, error: votesError } = await supabase
          .from('RoadmapVote')
          .select('roadmapItemId')
          .eq('userId', session.user.id)

        if (!votesError && userVotes) {
          userVotedItems = new Set(userVotes.map(vote => vote.roadmapItemId))
        }
      }

      // Combine roadmap items with user vote status
      const itemsWithUserVotes = roadmapItems?.map(item => ({
        ...item,
        userVoted: userVotedItems.has(item.id)
      })) || []

      return NextResponse.json({ items: itemsWithUserVotes })

    } catch (dbError) {
      console.error('Database error, returning default items:', dbError)
      return NextResponse.json({ items: defaultItems })
    }

  } catch (error) {
    console.error('Get roadmap error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
