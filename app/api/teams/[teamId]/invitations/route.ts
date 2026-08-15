import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  (process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co"),
  (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || "placeholder-key")
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

    if (!['owner', 'admin'].includes(teamMember.role)) {
      return NextResponse.json(
        { error: 'Only workspace owners and admins can view invitations.' },
        { status: 403 }
      )
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
        token
      `)
      .eq('team_id', teamId)
      .in('status', ['pending', 'accepted', 'expired'])
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching invitations:', error)
      return NextResponse.json({ error: 'Failed to fetch invitations' }, { status: 500 })
    }

    // Build the invite link from the token. The UI reads it as invite_link.
    const baseUrl = request.headers.get('origin') ||
                   process.env.NEXT_PUBLIC_BASE_URL ||
                   process.env.NEXTAUTH_URL ||
                   'http://localhost:3000'
    const data = (invitations || []).map(({ token, ...invitation }) => ({
      ...invitation,
      invite_link: `${baseUrl}/invite/${token}`,
    }))

    return NextResponse.json({
      success: true,
      data
    })
  } catch (error) {
    console.error('Error in GET /api/teams/[teamId]/invitations:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}