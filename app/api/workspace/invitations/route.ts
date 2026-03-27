import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createClient } from '@supabase/supabase-js'
import { canAccessFeature } from '@/lib/plan-restrictions'
import { PlanTier } from '@/types'

const supabase = createClient(
  (process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co"),
  (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || "placeholder-key")
)

// POST /api/workspace/invitations - Create a workspace invitation
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
    const { email, role = 'editor' } = body

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email address is required' },
        { status: 400 }
      )
    }

    // Validate role — only allow non-owner roles
    const VALID_INVITE_ROLES = ['admin', 'editor', 'viewer']
    if (!VALID_INVITE_ROLES.includes(role)) {
      return NextResponse.json(
        { error: 'Invalid role. Must be admin, editor, or viewer.' },
        { status: 400 }
      )
    }

    // Check if user has Pro plan
    const userPlan = (session.user.planTier || 'free') as PlanTier
    if (!canAccessFeature(userPlan, 'hasTeamCollaboration')) {
      return NextResponse.json(
        { 
          error: 'Workspace invitations require a Pro plan. Please upgrade to invite collaborators.',
          upgradeRequired: true,
          feature: 'Workspace Collaboration'
        },
        { status: 403 }
      )
    }

    // Generate unique invite token
    const token = crypto.randomUUID()
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 7) // 7 days from now

    // Get or create user's team/workspace
    let teamId = session.user.currentTeamId || (session.user as any)?.current_team_id
    
    if (!teamId) {
      // User should already have a workspace from registration
      // If not, they need to create one first or contact support
      return NextResponse.json(
        { error: 'No workspace found. Please refresh your session or contact support.' },
        { status: 400 }
      )
    }

    // Check workspace member limit (max 5 people)
    const { count: memberTotal, error: countError } = await supabase
      .from('TeamMember')
      .select('*', { count: 'exact', head: true })
      .eq('team_id', teamId)

    if (countError) {
      console.error('Error checking member count:', countError)
      return NextResponse.json(
        { error: 'Failed to check workspace capacity' },
        { status: 500 }
      )
    }

    if (memberTotal != null && memberTotal >= 5) {
      return NextResponse.json(
        { error: 'Workspace is at capacity (maximum 5 members). Upgrade to invite more collaborators.' },
        { status: 400 }
      )
    }

    // Check if the invitee is already a member of this workspace (by email)
    const normalizedEmail = email.trim().toLowerCase()
    const { data: existingMember } = await supabase
      .from('TeamMember')
      .select('id, User!inner(email)')
      .eq('team_id', teamId)
      .eq('User.email', normalizedEmail)
      .single()

    if (existingMember) {
      return NextResponse.json(
        { error: 'This person is already a member of your workspace.' },
        { status: 400 }
      )
    }

    // Check for existing pending invitation for this email in this team
    const { data: existingInvite } = await supabase
      .from('TeamInvitation')
      .select('id, token, expires_at')
      .eq('team_id', teamId)
      .eq('email', normalizedEmail)
      .eq('status', 'pending')
      .gt('expires_at', new Date().toISOString())
      .single()

    if (existingInvite) {
      // Return the existing invite link instead of creating a duplicate
      const baseUrl = request.headers.get('origin') ||
                     process.env.NEXT_PUBLIC_BASE_URL ||
                     process.env.NEXTAUTH_URL ||
                     'http://localhost:3000'
      const inviteLink = `${baseUrl}/invite/${existingInvite.token}`

      return NextResponse.json({
        success: true,
        data: {
          invitation: existingInvite,
          inviteLink,
          shareableLink: inviteLink
        },
        message: 'A pending invitation already exists for this email. Here is the existing invite link.'
      }, { status: 200 })
    }

    // Create invitation record
    const { data: invitation, error: invitationError } = await supabase
      .from('TeamInvitation')
      .insert({
        id: crypto.randomUUID(),
        team_id: teamId,
        email: normalizedEmail,
        role,
        token,
        invited_by: session.user.id,
        expires_at: expiresAt.toISOString(),
        created_at: new Date().toISOString()
      })
      .select()
      .single()

    if (invitationError) {
      console.error('Error creating invitation:', invitationError)
      return NextResponse.json(
        { error: 'Failed to create invitation' },
        { status: 500 }
      )
    }

    // Generate invite link - prioritize request origin for local development
    const baseUrl = request.headers.get('origin') || 
                   process.env.NEXT_PUBLIC_BASE_URL || 
                   process.env.NEXTAUTH_URL || 
                   'http://localhost:3000'
    const inviteLink = `${baseUrl}/invite/${token}`
    
    return NextResponse.json({
      success: true,
      data: {
        invitation,
        inviteLink,
        shareableLink: inviteLink
      },
      message: 'Invitation link created successfully! Share this link with your collaborator.'
    }, { status: 201 })

  } catch (error) {
    console.error('Workspace invitation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
