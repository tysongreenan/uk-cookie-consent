import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createClient } from '@supabase/supabase-js'
import { requireTeamPermission } from '@/lib/team-permissions'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// GET /api/teams/[teamId]/members - List team members
export async function GET(
  request: NextRequest,
  { params }: { params: { teamId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { teamId } = params

    // Check if user has permission to view team members
    const permissionResult = await requireTeamPermission(
      session.user.id,
      teamId,
      'view'
    )

    if (!permissionResult.success) {
      return NextResponse.json(
        { error: permissionResult.error },
        { status: 403 }
      )
    }

    // Get team members with user details
    const { data: members, error } = await supabase
      .from('TeamMember')
      .select(`
        id,
        role,
        joined_at,
        created_at,
        User!inner(
          id,
          name,
          email,
          image
        )
      `)
      .eq('team_id', teamId)
      .order('joined_at', { ascending: false })

    if (error) {
      console.error('Error fetching team members:', error)
      return NextResponse.json(
        { error: 'Failed to fetch team members' },
        { status: 500 }
      )
    }

    const formattedMembers = members?.map(member => ({
      id: member.id,
      role: member.role,
      joinedAt: member.joined_at,
      createdAt: member.created_at,
      user: member.User
    })) || []

    return NextResponse.json({
      success: true,
      data: formattedMembers
    })

  } catch (error) {
    console.error('Get team members error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
