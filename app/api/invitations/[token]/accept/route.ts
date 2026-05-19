import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  (process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co"),
  (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || "placeholder-key")
)

// POST /api/invitations/[token]/accept - Accept invitation
export async function POST(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'You must be logged in to accept an invitation' },
        { status: 401 }
      )
    }

    // Get invitation details
    const { data: invitation, error: invitationError } = await supabase
      .from('TeamInvitation')
      .select(`
        *,
        Team!inner(
          id,
          name,
          owner_id
        )
      `)
      .eq('token', params.token)
      .single()

    if (invitationError || !invitation) {
      return NextResponse.json(
        { error: 'Invitation not found' },
        { status: 404 }
      )
    }

    // Check if invitation is expired
    if (new Date(invitation.expires_at) < new Date()) {
      return NextResponse.json(
        { error: 'Invitation has expired' },
        { status: 400 }
      )
    }

    // Check if invitation is already processed
    if (invitation.status !== 'pending') {
      return NextResponse.json(
        { error: 'Invitation has already been processed' },
        { status: 400 }
      )
    }

    // Verify the logged-in user's email matches the invitation email
    const userEmail = session.user.email?.toLowerCase()
    const inviteEmail = invitation.email?.toLowerCase()
    if (!userEmail || !inviteEmail || userEmail !== inviteEmail) {
      return NextResponse.json(
        {
          error: 'This invitation was sent to a different email address. Please sign in with the correct account.',
          emailMismatch: true
        },
        { status: 403 }
      )
    }

    // Check if user is already a member of this team
    const { data: existingMember } = await supabase
      .from('TeamMember')
      .select('id')
      .eq('team_id', invitation.team_id)
      .eq('user_id', session.user.id)
      .single()

    if (existingMember) {
      await supabase
        .from('TeamInvitation')
        .update({
          status: 'accepted',
          updated_at: new Date().toISOString()
        })
        .eq('id', invitation.id)

      const { error: switchError } = await supabase
        .from('User')
        .update({ currentTeamId: invitation.team_id })
        .eq('id', session.user.id)

      if (switchError) {
        console.error('Error switching existing member to invited workspace:', switchError)
        return NextResponse.json(
          { error: 'Failed to switch workspace' },
          { status: 500 }
        )
      }

      return NextResponse.json({
        success: true,
        message: 'You are already a member of this workspace. We switched you to it.',
        team: invitation.Team
      })
    }

    // Atomically claim the invitation to prevent race conditions
    // Only proceeds if status is still 'pending'
    const { data: claimed, error: claimError } = await supabase
      .from('TeamInvitation')
      .update({
        status: 'accepted',
        updated_at: new Date().toISOString()
      })
      .eq('id', invitation.id)
      .eq('status', 'pending')
      .select('id')
      .single()

    if (claimError || !claimed) {
      return NextResponse.json(
        { error: 'Invitation has already been processed' },
        { status: 400 }
      )
    }

    // Add user to team
    const { error: memberError } = await supabase
      .from('TeamMember')
      .insert({
        id: crypto.randomUUID(),
        team_id: invitation.team_id,
        user_id: session.user.id,
        role: invitation.role,
        invited_by: invitation.invited_by,
        joined_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })

    if (memberError) {
      // Roll back invitation status if member insert fails
      await supabase
        .from('TeamInvitation')
        .update({ status: 'pending', updated_at: new Date().toISOString() })
        .eq('id', invitation.id)

      console.error('Error adding user to team:', memberError)
      return NextResponse.json(
        { error: 'Failed to join workspace' },
        { status: 500 }
      )
    }

    // Auto-switch to the invited workspace so the user immediately
    // sees the team owner's plan and Pro features
    const { error: switchError } = await supabase
      .from('User')
      .update({ currentTeamId: invitation.team_id })
      .eq('id', session.user.id)

    if (switchError) {
      console.error('Error switching user to invited workspace:', switchError)
      return NextResponse.json(
        { error: 'Joined workspace, but failed to switch to it. Please use the workspace switcher.' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully joined the workspace!',
      team: invitation.Team
    })

  } catch (error) {
    console.error('Accept invitation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
