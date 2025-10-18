import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// DELETE /api/teams/[teamId]/invitations/[invitationId] - Cancel invitation
export async function DELETE(
  request: NextRequest,
  { params }: { params: { teamId: string; invitationId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { teamId, invitationId } = params

    // Verify user is owner or admin of this team
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
      return NextResponse.json({ error: 'Only owners and admins can cancel invitations' }, { status: 403 })
    }

    // Check if invitation exists and belongs to this team
    const { data: invitation, error: invitationError } = await supabase
      .from('TeamInvitation')
      .select('id, status')
      .eq('id', invitationId)
      .eq('team_id', teamId)
      .single()

    if (invitationError || !invitation) {
      return NextResponse.json({ error: 'Invitation not found' }, { status: 404 })
    }

    // Only allow cancelling pending invitations
    if (invitation.status !== 'pending') {
      return NextResponse.json({ error: 'Can only cancel pending invitations' }, { status: 400 })
    }

    // Delete the invitation
    const { error: deleteError } = await supabase
      .from('TeamInvitation')
      .delete()
      .eq('id', invitationId)

    if (deleteError) {
      console.error('Error cancelling invitation:', deleteError)
      return NextResponse.json({ error: 'Failed to cancel invitation' }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'Invitation cancelled successfully'
    })
  } catch (error) {
    console.error('Error in DELETE /api/teams/[teamId]/invitations/[invitationId]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
