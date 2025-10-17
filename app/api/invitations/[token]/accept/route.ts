import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// POST /api/invitations/[token]/accept - Accept invitation
export async function POST(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  try {
    const { token } = params
    const session = await getServerSession(authOptions)

    // Get invitation details
    const { data: invitation, error: inviteError } = await supabase
      .from('TeamInvitation')
      .select(`
        id,
        team_id,
        email,
        role,
        invited_by,
        expires_at,
        status,
        Team!inner(
          id,
          name
        )
      `)
      .eq('token', token)
      .single()

    if (inviteError || !invitation) {
      return NextResponse.json(
        { error: 'Invitation not found' },
        { status: 404 }
      )
    }

    // Check if invitation is expired
    const now = new Date()
    const expiresAt = new Date(invitation.expires_at)
    
    if (now > expiresAt) {
      // Mark as expired
      await supabase
        .from('TeamInvitation')
        .update({ status: 'expired' })
        .eq('id', invitation.id)
      
      return NextResponse.json(
        { error: 'Invitation has expired' },
        { status: 410 }
      )
    }

    // Check if invitation is already accepted or revoked
    if (invitation.status !== 'pending') {
      return NextResponse.json(
        { error: `Invitation has been ${invitation.status}` },
        { status: 410 }
      )
    }

    // If user is not logged in, redirect to signup with token
    if (!session?.user?.id) {
      return NextResponse.json({
        success: false,
        redirect: `/auth/signup?invite=${token}`,
        message: 'Please sign up or sign in to accept the invitation'
      })
    }

    // Check if user email matches invitation email
    if (session.user.email?.toLowerCase() !== invitation.email.toLowerCase()) {
      return NextResponse.json(
        { error: 'This invitation is for a different email address' },
        { status: 400 }
      )
    }

    // Check if user is already a member of the team
    const { data: existingMember } = await supabase
      .from('TeamMember')
      .select('id')
      .eq('team_id', invitation.team_id)
      .eq('user_id', session.user.id)
      .single()

    if (existingMember) {
      return NextResponse.json(
        { error: 'You are already a member of this team' },
        { status: 400 }
      )
    }

    // Add user to team
    const memberId = crypto.randomUUID()
    const { error: memberError } = await supabase
      .from('TeamMember')
      .insert({
        id: memberId,
        team_id: invitation.team_id,
        user_id: session.user.id,
        role: invitation.role,
        invited_by: invitation.invited_by,
        joined_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })

    if (memberError) {
      console.error('Error adding user to team:', memberError)
      return NextResponse.json(
        { error: 'Failed to join team' },
        { status: 500 }
      )
    }

    // Mark invitation as accepted
    const { error: acceptError } = await supabase
      .from('TeamInvitation')
      .update({
        status: 'accepted',
        accepted_at: new Date().toISOString()
      })
      .eq('id', invitation.id)

    if (acceptError) {
      console.error('Error marking invitation as accepted:', acceptError)
      // Don't fail the request for this
    }

    // Set as user's current team
    const { error: updateError } = await supabase
      .from('User')
      .update({ current_team_id: invitation.team_id })
      .eq('id', session.user.id)

    if (updateError) {
      console.error('Error updating user current team:', updateError)
      // Don't fail the request for this
    }

    return NextResponse.json({
      success: true,
      data: {
        teamId: invitation.team_id,
        teamName: invitation.Team[0]?.name || 'Unknown Team',
        role: invitation.role
      },
      message: `Successfully joined ${invitation.Team[0]?.name || 'Unknown Team'} as ${invitation.role}`
    })

  } catch (error) {
    console.error('Accept invitation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
