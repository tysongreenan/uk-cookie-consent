import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createClient } from '@supabase/supabase-js'
import { InviteMemberForm } from '@/types'
import { requireTeamPermission } from '@/lib/team-permissions'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// POST /api/teams/[teamId]/invitations - Create invitation
export async function POST(
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
    const body: InviteMemberForm = await request.json()

    // Check if user has permission to invite members
    const permissionResult = await requireTeamPermission(
      session.user.id,
      teamId,
      'admin'
    )

    if (!permissionResult.success) {
      return NextResponse.json(
        { error: permissionResult.error },
        { status: 403 }
      )
    }

    // Validate input
    if (!body.email || !body.email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      )
    }

    const validRoles = ['admin', 'editor', 'viewer']
    if (!body.role || !validRoles.includes(body.role)) {
      return NextResponse.json(
        { error: 'Invalid role' },
        { status: 400 }
      )
    }

    // Check if user is already a member
    const { data: existingMember } = await supabase
      .from('TeamMember')
      .select('id')
      .eq('team_id', teamId)
      .eq('user_id', (await supabase
        .from('User')
        .select('id')
        .eq('email', body.email.toLowerCase())
        .single()
      ).data?.id)
      .single()

    if (existingMember) {
      return NextResponse.json(
        { error: 'User is already a member of this team' },
        { status: 400 }
      )
    }

    // Check for existing pending invitation
    const { data: existingInvitation } = await supabase
      .from('TeamInvitation')
      .select('id')
      .eq('team_id', teamId)
      .eq('email', body.email.toLowerCase())
      .eq('status', 'pending')
      .single()

    if (existingInvitation) {
      return NextResponse.json(
        { error: 'Invitation already sent to this email' },
        { status: 400 }
      )
    }

    // Generate invitation token
    const token = crypto.randomUUID()
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 7) // 7 days from now

    // Create invitation
    const { data: invitation, error: inviteError } = await supabase
      .from('TeamInvitation')
      .insert({
        id: crypto.randomUUID(),
        team_id: teamId,
        email: body.email.toLowerCase(),
        role: body.role,
        token: token,
        invited_by: session.user.id,
        expires_at: expiresAt.toISOString(),
        status: 'pending',
        created_at: new Date().toISOString()
      })
      .select(`
        id,
        email,
        role,
        token,
        expires_at,
        created_at
      `)
      .single()

    if (inviteError) {
      console.error('Error creating invitation:', inviteError)
      return NextResponse.json(
        { error: 'Failed to create invitation' },
        { status: 500 }
      )
    }

    // Generate invite link
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
    const inviteLink = `${baseUrl}/invite/${token}`

    // TODO: Send email if sendEmail is true
    if (body.sendEmail !== false) {
      // This would integrate with your email service
      console.log(`Would send invitation email to ${body.email} with link: ${inviteLink}`)
    }

    return NextResponse.json({
      success: true,
      data: {
        ...invitation,
        inviteLink
      },
      message: 'Invitation created successfully'
    }, { status: 201 })

  } catch (error) {
    console.error('Create invitation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// GET /api/teams/[teamId]/invitations - List pending invitations
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

    // Check if user has permission to view invitations
    const permissionResult = await requireTeamPermission(
      session.user.id,
      teamId,
      'admin'
    )

    if (!permissionResult.success) {
      return NextResponse.json(
        { error: permissionResult.error },
        { status: 403 }
      )
    }

    // Get pending invitations
    const { data: invitations, error } = await supabase
      .from('TeamInvitation')
      .select(`
        id,
        email,
        role,
        token,
        status,
        expires_at,
        created_at,
        User!inner(
          id,
          name,
          email
        )
      `)
      .eq('team_id', teamId)
      .eq('status', 'pending')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching invitations:', error)
      return NextResponse.json(
        { error: 'Failed to fetch invitations' },
        { status: 500 }
      )
    }

    const formattedInvitations = invitations?.map(invitation => ({
      id: invitation.id,
      email: invitation.email,
      role: invitation.role,
      token: invitation.token,
      status: invitation.status,
      expiresAt: invitation.expires_at,
      createdAt: invitation.created_at,
      inviter: invitation.User
    })) || []

    return NextResponse.json({
      success: true,
      data: formattedInvitations
    })

  } catch (error) {
    console.error('Get invitations error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
