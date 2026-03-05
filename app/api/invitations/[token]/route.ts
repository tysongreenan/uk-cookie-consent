import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  (process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co"),
  (process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || "placeholder-key")
)

// GET /api/invitations/[token] - Get invitation details
export async function GET(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  try {
    const { data: invitation, error } = await supabase
      .from('TeamInvitation')
      .select(`
        *,
        Team!inner(
          id,
          name,
          owner_id
        ),
        InvitedBy:User!TeamInvitation_invited_by_fkey(
          id,
          name,
          email
        )
      `)
      .eq('token', params.token)
      .single()

    if (error) {
      console.error('Error fetching invitation:', error)
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

    // Check if invitation is already accepted
    if (invitation.status !== 'pending') {
      return NextResponse.json(
        { error: 'Invitation has already been processed' },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      invitation
    })

  } catch (error) {
    console.error('Get invitation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}