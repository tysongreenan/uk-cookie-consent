import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createClient } from '@supabase/supabase-js'
import { isTeamMember } from '@/lib/team-permissions'

// Use service role key for server-side operations (bypasses RLS)
// This is safe because we authenticate via NextAuth session before using it
const supabase = createClient(
  (process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co"),
  (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || "placeholder-key")
)

// POST /api/user/switch-team - Switch user's current team
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { teamId } = body

    if (!teamId) {
      return NextResponse.json(
        { error: 'Team ID is required' },
        { status: 400 }
      )
    }

    // Check if user is a member of the target team
    const isMember = await isTeamMember(session.user.id, teamId)
    if (!isMember) {
      return NextResponse.json(
        { error: 'You are not a member of this team' },
        { status: 403 }
      )
    }

    // Update user's current team
    const { error } = await supabase
      .from('User')
      .update({ current_team_id: teamId })
      .eq('id', session.user.id)

    if (error) {
      console.error('Error switching team:', error)
      return NextResponse.json(
        { error: 'Failed to switch team' },
        { status: 500 }
      )
    }

    // Get team details for response
    const { data: team, error: teamError } = await supabase
      .from('Team')
      .select('id, name')
      .eq('id', teamId)
      .single()

    if (teamError) {
      console.error('Error fetching team details:', teamError)
      return NextResponse.json(
        { error: 'Failed to fetch team details' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: {
        teamId: team.id,
        teamName: team.name
      },
      message: `Switched to ${team.name}`
    })

  } catch (error) {
    console.error('Switch team error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
