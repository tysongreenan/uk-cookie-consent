import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createClient } from '@supabase/supabase-js'
import { UpdateTeamForm } from '@/types'
import { requireTeamPermission } from '@/lib/team-permissions'

// Use service role key for server-side operations (bypasses RLS)
// This is safe because we authenticate via NextAuth session before using it
const supabase = createClient(
  (process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co"),
  (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || "placeholder-key")
)

// GET /api/teams/[teamId] - Get team details
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

    // Check if user has permission to view team
    const permissionResult = await requireTeamPermission(
      session.user.id,
      teamId,
      'view'
    )

    if (!permissionResult.success) {
      return NextResponse.json(
        { error: permissionResult.error },
        { status: 403 }
      )
    }

    // Get team details
    const { data: team, error } = await supabase
      .from('Team')
      .select(`
        id,
        name,
        owner_id,
        created_at,
        updated_at,
        TeamMember!inner(
          role
        )
      `)
      .eq('id', teamId)
      .eq('TeamMember.user_id', session.user.id)
      .single()

    if (error || !team) {
      return NextResponse.json(
        { error: 'Team not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: {
        ...team,
        userRole: team.TeamMember[0]?.role
      }
    })

  } catch (error) {
    console.error('Get team error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PATCH /api/teams/[teamId] - Update team
export async function PATCH(
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
    const body: UpdateTeamForm = await request.json()

    // Check if user has permission to edit team (admin or owner)
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
    if (body.name !== undefined) {
      if (!body.name || body.name.trim().length === 0) {
        return NextResponse.json(
          { error: 'Team name cannot be empty' },
          { status: 400 }
        )
      }
    }

    // Update team
    const updateData: any = {
      updated_at: new Date().toISOString()
    }

    if (body.name !== undefined) {
      updateData.name = body.name.trim()
    }

    const { data: team, error } = await supabase
      .from('Team')
      .update(updateData)
      .eq('id', teamId)
      .select('id, name, owner_id, created_at, updated_at')
      .single()

    if (error) {
      console.error('Error updating team:', error)
      return NextResponse.json(
        { error: 'Failed to update team' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: team,
      message: 'Team updated successfully'
    })

  } catch (error) {
    console.error('Update team error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE /api/teams/[teamId] - Delete team (owner only)
export async function DELETE(
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

    // Check if user has permission to delete team (owner only)
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

    // Delete team (cascade will handle related records)
    const { error } = await supabase
      .from('Team')
      .delete()
      .eq('id', teamId)

    if (error) {
      console.error('Error deleting team:', error)
      return NextResponse.json(
        { error: 'Failed to delete team' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Team deleted successfully'
    })

  } catch (error) {
    console.error('Delete team error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
