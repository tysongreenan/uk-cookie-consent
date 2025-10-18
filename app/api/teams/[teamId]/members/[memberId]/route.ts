import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// PATCH /api/teams/[teamId]/members/[memberId] - Update member role
export async function PATCH(
  request: NextRequest,
  { params }: { params: { teamId: string; memberId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { teamId, memberId } = params
    const body = await request.json()
    const { role } = body

    if (!role || !['admin', 'editor', 'viewer'].includes(role)) {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 })
    }

    // Verify user is owner or admin of this team
    const { data: currentUserMember, error: memberError } = await supabase
      .from('TeamMember')
      .select('role')
      .eq('team_id', teamId)
      .eq('user_id', session.user.id)
      .single()

    if (memberError || !currentUserMember) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 })
    }

    if (!['owner', 'admin'].includes(currentUserMember.role)) {
      return NextResponse.json({ error: 'Only owners and admins can change member roles' }, { status: 403 })
    }

    // Get the member being updated
    const { data: targetMember, error: targetError } = await supabase
      .from('TeamMember')
      .select('role, user_id')
      .eq('id', memberId)
      .eq('team_id', teamId)
      .single()

    if (targetError || !targetMember) {
      return NextResponse.json({ error: 'Member not found' }, { status: 404 })
    }

    // Prevent changing owner role or removing the last owner
    if (targetMember.role === 'owner') {
      return NextResponse.json({ error: 'Cannot change owner role' }, { status: 400 })
    }

    // Update the member role
    const { error: updateError } = await supabase
      .from('TeamMember')
      .update({ 
        role,
        updated_at: new Date().toISOString()
      })
      .eq('id', memberId)

    if (updateError) {
      console.error('Error updating member role:', updateError)
      return NextResponse.json({ error: 'Failed to update member role' }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'Member role updated successfully'
    })
  } catch (error) {
    console.error('Error in PATCH /api/teams/[teamId]/members/[memberId]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE /api/teams/[teamId]/members/[memberId] - Remove member
export async function DELETE(
  request: NextRequest,
  { params }: { params: { teamId: string; memberId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { teamId, memberId } = params

    // Verify user is owner or admin of this team
    const { data: currentUserMember, error: memberError } = await supabase
      .from('TeamMember')
      .select('role')
      .eq('team_id', teamId)
      .eq('user_id', session.user.id)
      .single()

    if (memberError || !currentUserMember) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 })
    }

    if (!['owner', 'admin'].includes(currentUserMember.role)) {
      return NextResponse.json({ error: 'Only owners and admins can remove members' }, { status: 403 })
    }

    // Get the member being removed
    const { data: targetMember, error: targetError } = await supabase
      .from('TeamMember')
      .select('role, user_id')
      .eq('id', memberId)
      .eq('team_id', teamId)
      .single()

    if (targetError || !targetMember) {
      return NextResponse.json({ error: 'Member not found' }, { status: 404 })
    }

    // Prevent removing the owner
    if (targetMember.role === 'owner') {
      return NextResponse.json({ error: 'Cannot remove workspace owner' }, { status: 400 })
    }

    // Prevent removing yourself
    if (targetMember.user_id === session.user.id) {
      return NextResponse.json({ error: 'Cannot remove yourself from the workspace' }, { status: 400 })
    }

    // Remove the member
    const { error: deleteError } = await supabase
      .from('TeamMember')
      .delete()
      .eq('id', memberId)

    if (deleteError) {
      console.error('Error removing member:', deleteError)
      return NextResponse.json({ error: 'Failed to remove member' }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'Member removed successfully'
    })
  } catch (error) {
    console.error('Error in DELETE /api/teams/[teamId]/members/[memberId]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}