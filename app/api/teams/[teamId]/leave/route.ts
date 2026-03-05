import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  (process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co"),
  (process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || "placeholder-key")
)

// POST /api/teams/[teamId]/leave - Leave a workspace
export async function POST(
  request: NextRequest,
  { params }: { params: { teamId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { teamId } = params

    // Get user's role in this team
    const { data: teamMember, error: memberError } = await supabase
      .from('TeamMember')
      .select('role, user_id')
      .eq('team_id', teamId)
      .eq('user_id', session.user.id)
      .single()

    if (memberError || !teamMember) {
      return NextResponse.json({ error: 'You are not a member of this workspace' }, { status: 404 })
    }

    // Prevent owners from leaving their own workspace
    if (teamMember.role === 'owner') {
      return NextResponse.json({ 
        error: 'Workspace owners cannot leave their own workspace. Transfer ownership first or delete the workspace.' 
      }, { status: 400 })
    }

    // Check if this is the user's current workspace
    if (session.user.currentTeamId === teamId) {
      // Find another workspace to switch to (preferably their personal workspace)
      const { data: otherTeams, error: otherTeamsError } = await supabase
        .from('TeamMember')
        .select(`
          team_id,
          role,
          Team!inner(
            id,
            name,
            owner_id
          )
        `)
        .eq('user_id', session.user.id)
        .neq('team_id', teamId)

      if (otherTeamsError || !otherTeams || otherTeams.length === 0) {
        return NextResponse.json({ 
          error: 'You cannot leave your only workspace. Create a personal workspace first.' 
        }, { status: 400 })
      }

      // Switch to another workspace (preferably personal workspace)
      const personalWorkspace = otherTeams.find(t => t.Team[0]?.owner_id === session.user.id)
      const targetWorkspace = personalWorkspace || otherTeams[0]

      // Update user's current_team_id
      const { error: updateError } = await supabase
        .from('User')
        .update({ current_team_id: targetWorkspace.team_id })
        .eq('id', session.user.id)

      if (updateError) {
        console.error('Error updating user current_team_id:', updateError)
        return NextResponse.json({ error: 'Failed to switch workspace' }, { status: 500 })
      }
    }

    // Remove user from team
    const { error: deleteError } = await supabase
      .from('TeamMember')
      .delete()
      .eq('team_id', teamId)
      .eq('user_id', session.user.id)

    if (deleteError) {
      console.error('Error removing user from team:', deleteError)
      return NextResponse.json({ error: 'Failed to leave workspace' }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully left the workspace'
    })
  } catch (error) {
    console.error('Error in POST /api/teams/[teamId]/leave:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
