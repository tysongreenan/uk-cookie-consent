import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// POST /api/roadmap/vote - Vote on a roadmap item
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { roadmapItemId, action } = await request.json()

    if (!roadmapItemId || !action) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (action === 'vote') {
      // Check if user already voted
      const { data: existingVote, error: checkError } = await supabase
        .from('RoadmapVote')
        .select('id')
        .eq('userId', session.user.id)
        .eq('roadmapItemId', roadmapItemId)
        .single()

      if (checkError && checkError.code !== 'PGRST116') { // PGRST116 = no rows found
        console.error('Error checking existing vote:', checkError)
        return NextResponse.json({ error: 'Failed to check existing vote' }, { status: 500 })
      }

      if (existingVote) {
        return NextResponse.json({ error: 'Already voted on this item' }, { status: 400 })
      }

      // Add vote
      const { error: insertError } = await supabase
        .from('RoadmapVote')
        .insert({
          userId: session.user.id,
          roadmapItemId: roadmapItemId
        })

      if (insertError) {
        console.error('Error inserting vote:', insertError)
        return NextResponse.json({ error: 'Failed to vote' }, { status: 500 })
      }

    } else if (action === 'unvote') {
      // Remove vote
      const { error: deleteError } = await supabase
        .from('RoadmapVote')
        .delete()
        .eq('userId', session.user.id)
        .eq('roadmapItemId', roadmapItemId)

      if (deleteError) {
        console.error('Error deleting vote:', deleteError)
        return NextResponse.json({ error: 'Failed to remove vote' }, { status: 500 })
      }

    } else {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }

    // Get updated vote count
    const { data: voteCount, error: countError } = await supabase
      .from('RoadmapVote')
      .select('id', { count: 'exact' })
      .eq('roadmapItemId', roadmapItemId)

    if (countError) {
      console.error('Error getting vote count:', countError)
      return NextResponse.json({ error: 'Failed to get vote count' }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true, 
      voteCount: voteCount?.length || 0,
      userVoted: action === 'vote'
    })

  } catch (error) {
    console.error('Vote error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
