import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  (process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co"),
  (process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || "placeholder-key")
)

// GET /api/teams/[teamId]/invitations - Get pending invitations
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

    // Get pending invitations for this team
    const { data: invitations, error } = await supabase
      .from('TeamInvitation')
      .select(`
        id,
        email,
        role,
        status,
        created_at,
        expires_at,
        invite_link
      `)
      .eq('team_id', teamId)
      .in('status', ['pending', 'accepted', 'expired'])
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching invitations:', error)
      return NextResponse.json({ error: 'Failed to fetch invitations' }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      data: invitations
    })
  } catch (error) {
    console.error('Error in GET /api/teams/[teamId]/invitations:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}