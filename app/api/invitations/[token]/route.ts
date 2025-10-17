import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// GET /api/invitations/[token] - Get invitation details (public)
export async function GET(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  try {
    const { token } = params

    // Get invitation details
    const { data: invitation, error } = await supabase
      .from('TeamInvitation')
      .select(`
        id,
        email,
        role,
        expires_at,
        status,
        created_at,
        Team!inner(
          id,
          name
        ),
        User!inner(
          id,
          name,
          email
        )
      `)
      .eq('token', token)
      .single()

    if (error || !invitation) {
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

    return NextResponse.json({
      success: true,
      data: {
        id: invitation.id,
        email: invitation.email,
        role: invitation.role,
        expiresAt: invitation.expires_at,
        status: invitation.status,
        createdAt: invitation.created_at,
        team: invitation.Team,
        inviter: invitation.User
      }
    })

  } catch (error) {
    console.error('Get invitation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
