import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createClient } from '@supabase/supabase-js'

// Use service role key to bypass RLS — auth is handled by NextAuth session check
function getSupabaseClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
  )
}

export const dynamic = 'force-dynamic'

// GET /api/roadmap - Get roadmap items with user's vote status
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    // Provide default roadmap items if database tables don't exist yet
    const defaultItems = [
      {
        id: 1,
        title: 'Latest Release: Build Stability & Consent Banner Reliability',
        description: 'Upgraded to Next.js 14.2.5, wrapped auth + builder flows in Suspense, and hardened the optimized banner generator so deployments stay green and performance improvements reach production.',
        category: 'release',
        status: 'shipped',
        vote_count: 0,
        userVoted: false,
        priority: 1
      }
    ]

    // Try to get roadmap items from database, fallback to default if tables don't exist
    const supabase = getSupabaseClient()
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

      // Get all votes with voter info (name + image from User table)
      const { data: allVotes, error: votesError } = await supabase
        .from('RoadmapVote')
        .select('roadmapItemId, userId, User:userId(name, image)')

      // Build voter map: roadmapItemId -> array of { name, image }
      const voterMap = new Map<number, { name: string; image: string | null }[]>()
      let userVotedItems = new Set<number>()

      if (!votesError && allVotes) {
        for (const vote of allVotes) {
          if (session?.user?.id && vote.userId === session.user.id) {
            userVotedItems.add(vote.roadmapItemId)
          }
          const user = vote.User as any
          if (user?.name) {
            if (!voterMap.has(vote.roadmapItemId)) {
              voterMap.set(vote.roadmapItemId, [])
            }
            voterMap.get(vote.roadmapItemId)!.push({
              name: user.name,
              image: user.image || null,
            })
          }
        }
      }

      // Combine roadmap items with user vote status and voters
      const itemsWithUserVotes = roadmapItems?.map(item => ({
        ...item,
        userVoted: userVotedItems.has(item.id),
        voters: voterMap.get(item.id) || [],
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
