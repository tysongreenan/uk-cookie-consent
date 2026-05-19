import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  (process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co"),
  (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || "placeholder-key")
)

// GET /api/teams/[teamId]/members - Get team members
export async function GET(
  request: NextRequest,
  { params }: { params: { teamId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { teamId } = params

    // Verify user is a member of this team
    const { data: teamMember, error: memberError } = await supabase
      .from('TeamMember')
      .select('role')
      .eq('team_id', teamId)
      .eq('user_id', session.user.id)
      .single()

    if (memberError || !teamMember) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 })
    }

    // Get all team members first. Avoid a joined Supabase relation query here:
    // if PostgREST cannot infer the User relation, the dashboard gets a 500.
    const { data: members, error } = await supabase
      .from('TeamMember')
      .select('id, user_id, role, joined_at')
      .eq('team_id', teamId)
      .order('joined_at', { ascending: true })

    if (error) {
      console.error('Error fetching team members:', error)
      return NextResponse.json({ error: 'Failed to fetch team members' }, { status: 500 })
    }

    const userIds = (members || []).map(member => member.user_id).filter(Boolean)
    const { data: users, error: usersError } = userIds.length > 0
      ? await supabase
          .from('User')
          .select('id, name, email, image')
          .in('id', userIds)
      : { data: [], error: null }

    if (usersError) {
      console.error('Error fetching team member users:', usersError)
      return NextResponse.json({ error: 'Failed to fetch team member users' }, { status: 500 })
    }

    const usersById = new Map((users || []).map(user => [user.id, user]))

    // Transform the data to match our interface
    const transformedMembers = (members || []).map(member => {
      const user = usersById.get(member.user_id)

      return {
        id: member.id,
        user_id: member.user_id,
        role: member.role,
        joined_at: member.joined_at,
        user: {
          name: user?.name || null,
          email: user?.email || '',
          image: user?.image || null
        }
      }
    })

    return NextResponse.json({
      success: true,
      data: transformedMembers
    })
  } catch (error) {
    console.error('Error in GET /api/teams/[teamId]/members:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
