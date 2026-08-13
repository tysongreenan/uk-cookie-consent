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

    // Fallback if database tables don't exist yet
    const defaultItems = [
      {
        id: 1,
        title: 'Latest Release: Build Stability & Consent Banner Reliability',
        description:
          'Upgraded to Next.js 14.2.5, wrapped auth + builder flows in Suspense, and hardened the optimized banner generator so deployments stay green and performance improvements reach production.',
        category: 'release',
        status: 'completed',
        vote_count: 0,
        userVoted: false,
        priority: 1,
        voters: [],
      },
    ]

    const supabase = getSupabaseClient()
    try {
      // Query base table (not RoadmapItemWithVotes) — that view left-joins per-user
      // votes and duplicates rows when an item has multiple voters.
      const { data: roadmapItems, error: itemsError } = await supabase
        .from('RoadmapItem')
        .select('id, title, description, category, status, priority, createdAt, updatedAt')
        .order('priority', { ascending: true })

      if (itemsError) {
        console.error('Error fetching roadmap items:', itemsError)
        return NextResponse.json({ items: defaultItems })
      }

      const { data: allVotes, error: votesError } = await supabase
        .from('RoadmapVote')
        .select('roadmapItemId, userId, User:userId(name, image)')

      const voterMap = new Map<number, { name: string; image: string | null }[]>()
      const voteCountMap = new Map<number, number>()
      const userVotedItems = new Set<number>()

      if (!votesError && allVotes) {
        for (const vote of allVotes) {
          voteCountMap.set(
            vote.roadmapItemId,
            (voteCountMap.get(vote.roadmapItemId) || 0) + 1
          )

          if (session?.user?.id && vote.userId === session.user.id) {
            userVotedItems.add(vote.roadmapItemId)
          }

          const user = vote.User as { name?: string; image?: string | null } | null
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

      const itemsWithUserVotes =
        roadmapItems?.map((item) => ({
          ...item,
          vote_count: voteCountMap.get(item.id) || 0,
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
