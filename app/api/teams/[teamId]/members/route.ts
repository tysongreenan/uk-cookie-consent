import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  (process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co"),
  (process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || "placeholder-key")
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

    // Get all team members with user details
    const { data: members, error } = await supabase
      .from('TeamMember')
      .select(`
        id,
        user_id,
        role,
        joined_at,
        User!inner(
          name,
          email,
          image
        )
      `)
      .eq('team_id', teamId)
      .order('joined_at', { ascending: true })

    if (error) {
      console.error('Error fetching team members:', error)
      return NextResponse.json({ error: 'Failed to fetch team members' }, { status: 500 })
    }

    // Transform the data to match our interface
    const transformedMembers = members.map(member => ({
      id: member.id,
      user_id: member.user_id,
      role: member.role,
      joined_at: member.joined_at,
      user: {
        name: member.User?.[0]?.name || null,
        email: member.User?.[0]?.email || '',
        image: member.User?.[0]?.image || null
      }
    }))

    return NextResponse.json({
      success: true,
      data: transformedMembers
    })
  } catch (error) {
    console.error('Error in GET /api/teams/[teamId]/members:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}