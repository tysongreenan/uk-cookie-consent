import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// GET /api/roadmap - Get roadmap items with user's vote status
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get roadmap items with vote counts
    const { data: roadmapItems, error: itemsError } = await supabase
      .from('RoadmapItemWithVotes')
      .select('*')
      .order('priority', { ascending: true })

    if (itemsError) {
      console.error('Error fetching roadmap items:', itemsError)
      return NextResponse.json({ error: 'Failed to fetch roadmap items' }, { status: 500 })
    }

    // Get user's votes
    const { data: userVotes, error: votesError } = await supabase
      .from('RoadmapVote')
      .select('roadmapItemId')
      .eq('userId', session.user.id)

    if (votesError) {
      console.error('Error fetching user votes:', votesError)
      return NextResponse.json({ error: 'Failed to fetch user votes' }, { status: 500 })
    }

    const userVotedItems = new Set(userVotes?.map(vote => vote.roadmapItemId) || [])

    // Combine roadmap items with user vote status
    const itemsWithUserVotes = roadmapItems?.map(item => ({
      ...item,
      userVoted: userVotedItems.has(item.id)
    })) || []

    return NextResponse.json({ items: itemsWithUserVotes })

  } catch (error) {
    console.error('Get roadmap error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
