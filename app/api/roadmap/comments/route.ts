import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || 'placeholder-key'
)

export const dynamic = 'force-dynamic'

// GET /api/roadmap/comments?roadmapItemId=123 - Get comments for a roadmap item
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const roadmapItemId = searchParams.get('roadmapItemId')

    if (!roadmapItemId) {
      return NextResponse.json({ error: 'roadmapItemId is required' }, { status: 400 })
    }

    // Fetch all comments for this item with user info
    const { data: comments, error } = await supabase
      .from('RoadmapComment')
      .select('*')
      .eq('roadmapItemId', parseInt(roadmapItemId))
      .order('createdAt', { ascending: true })

    if (error) {
      console.error('Error fetching comments:', error)
      return NextResponse.json({ comments: [] })
    }

    // Fetch user names for all comments
    const userIds = Array.from(new Set((comments || []).map(c => c.userId)))
    let userMap: Record<string, string> = {}

    if (userIds.length > 0) {
      const { data: users } = await supabase
        .from('User')
        .select('id, name, email')
        .in('id', userIds)

      if (users) {
        userMap = Object.fromEntries(
          users.map(u => [u.id, u.name || u.email?.split('@')[0] || 'Anonymous'])
        )
      }
    }

    // Build threaded structure
    const commentsWithUsers = (comments || []).map(c => ({
      ...c,
      userName: userMap[c.userId] || 'Anonymous'
    }))

    // Organize into threads: top-level comments with nested replies
    const topLevel = commentsWithUsers.filter(c => !c.parentId)
    const replies = commentsWithUsers.filter(c => c.parentId)

    const threaded = topLevel.map(comment => ({
      ...comment,
      replies: replies.filter(r => r.parentId === comment.id)
    }))

    return NextResponse.json({ comments: threaded })
  } catch (error) {
    console.error('Get comments error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/roadmap/comments - Add a comment or reply
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { roadmapItemId, content, parentId } = await request.json()

    if (!roadmapItemId || !content?.trim()) {
      return NextResponse.json({ error: 'roadmapItemId and content are required' }, { status: 400 })
    }

    // Determine if this is an admin reply
    const isAdminReply = (session.user as any).userRole === 'owner'

    const { data: comment, error } = await supabase
      .from('RoadmapComment')
      .insert({
        roadmapItemId,
        userId: session.user.id,
        parentId: parentId || null,
        content: content.trim(),
        isAdminReply
      })
      .select('*')
      .single()

    if (error) {
      console.error('Error creating comment:', error)
      return NextResponse.json({ error: 'Failed to post comment' }, { status: 500 })
    }

    // Attach user name to response
    const userName = session.user.name || session.user.email?.split('@')[0] || 'Anonymous'

    return NextResponse.json({
      comment: {
        ...comment,
        userName,
        replies: []
      }
    })
  } catch (error) {
    console.error('Create comment error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
