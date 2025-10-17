import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createClient } from '@supabase/supabase-js'
import { UpdateMemberRoleForm } from '@/types'
import { requireTeamPermission } from '@/lib/team-permissions'

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
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { teamId, memberId } = params
    const body: UpdateMemberRoleForm = await request.json()

    // Check if user has permission to manage members (owner only)
    const permissionResult = await requireTeamPermission(
      session.user.id,
      teamId,
      'owner'
    )

    if (!permissionResult.success) {
      return NextResponse.json(
        { error: permissionResult.error },
        { status: 403 }
      )
    }

    // Validate role
    const validRoles = ['owner', 'admin', 'editor', 'viewer']
    if (!body.role || !validRoles.includes(body.role)) {
      return NextResponse.json(
        { error: 'Invalid role' },
        { status: 400 }
      )
    }

    // Get current member details
    const { data: currentMember, error: memberError } = await supabase
      .from('TeamMember')
      .select('user_id, role')
      .eq('id', memberId)
      .eq('team_id', teamId)
      .single()

    if (memberError || !currentMember) {
      return NextResponse.json(
        { error: 'Member not found' },
        { status: 404 }
      )
    }

    // Prevent changing owner role
    if (currentMember.role === 'owner') {
      return NextResponse.json(
        { error: 'Cannot change owner role' },
        { status: 400 }
      )
    }

    // Update member role
    const { data: updatedMember, error: updateError } = await supabase
      .from('TeamMember')
      .update({
        role: body.role,
        updated_at: new Date().toISOString()
      })
      .eq('id', memberId)
      .eq('team_id', teamId)
      .select(`
        id,
        role,
        joined_at,
        User!inner(
          id,
          name,
          email
        )
      `)
      .single()

    if (updateError) {
      console.error('Error updating member role:', updateError)
      return NextResponse.json(
        { error: 'Failed to update member role' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: {
        id: updatedMember.id,
        role: updatedMember.role,
        joinedAt: updatedMember.joined_at,
        user: updatedMember.User
      },
      message: 'Member role updated successfully'
    })

  } catch (error) {
    console.error('Update member role error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
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
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { teamId, memberId } = params

    // Check if user has permission to manage members (admin or owner)
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

    // Get current member details
    const { data: currentMember, error: memberError } = await supabase
      .from('TeamMember')
      .select('user_id, role')
      .eq('id', memberId)
      .eq('team_id', teamId)
      .single()

    if (memberError || !currentMember) {
      return NextResponse.json(
        { error: 'Member not found' },
        { status: 404 }
      )
    }

    // Prevent removing owner
    if (currentMember.role === 'owner') {
      return NextResponse.json(
        { error: 'Cannot remove team owner' },
        { status: 400 }
      )
    }

    // Prevent removing yourself if you're the only admin
    if (currentMember.user_id === session.user.id) {
      // Check if there are other admins/owners
      const { data: otherAdmins, error: adminError } = await supabase
        .from('TeamMember')
        .select('id')
        .eq('team_id', teamId)
        .eq('user_id', session.user.id)
        .in('role', ['owner', 'admin'])
        .neq('id', memberId)

      if (adminError || !otherAdmins || otherAdmins.length === 0) {
        return NextResponse.json(
          { error: 'Cannot remove yourself - you are the only admin' },
          { status: 400 }
        )
      }
    }

    // Remove member
    const { error: deleteError } = await supabase
      .from('TeamMember')
      .delete()
      .eq('id', memberId)
      .eq('team_id', teamId)

    if (deleteError) {
      console.error('Error removing member:', deleteError)
      return NextResponse.json(
        { error: 'Failed to remove member' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Member removed successfully'
    })

  } catch (error) {
    console.error('Remove member error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
