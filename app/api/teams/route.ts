import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createClient } from '@supabase/supabase-js'
import { CreateTeamForm } from '@/types'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// POST /api/teams - Create a new team
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body: CreateTeamForm = await request.json()
    
    if (!body.name || body.name.trim().length === 0) {
      return NextResponse.json(
        { error: 'Team name is required' },
        { status: 400 }
      )
    }

    const teamId = crypto.randomUUID()
    const memberId = crypto.randomUUID()

    // Create team and add user as owner in a transaction
    const { data: team, error: teamError } = await supabase
      .from('Team')
      .insert({
        id: teamId,
        name: body.name.trim(),
        owner_id: session.user.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select('id, name, owner_id, created_at, updated_at')
      .single()

    if (teamError) {
      console.error('Error creating team:', teamError)
      return NextResponse.json(
        { error: 'Failed to create team' },
        { status: 500 }
      )
    }

    // Add user as team owner
    const { error: memberError } = await supabase
      .from('TeamMember')
      .insert({
        id: memberId,
        team_id: teamId,
        user_id: session.user.id,
        role: 'owner',
        invited_by: session.user.id,
        joined_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })

    if (memberError) {
      console.error('Error adding team owner:', memberError)
      // Clean up the team if member creation fails
      await supabase.from('Team').delete().eq('id', teamId)
      return NextResponse.json(
        { error: 'Failed to add team owner' },
        { status: 500 }
      )
    }

    // Set as user's current team
    const { error: updateError } = await supabase
      .from('User')
      .update({ current_team_id: teamId })
      .eq('id', session.user.id)

    if (updateError) {
      console.error('Error updating user current team:', updateError)
      // Don't fail the request for this
    }

    return NextResponse.json({
      success: true,
      data: team,
      message: 'Team created successfully'
    }, { status: 201 })

  } catch (error) {
    console.error('Create team error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// GET /api/teams - Get user's teams
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { data: teams, error } = await supabase
      .from('TeamMember')
      .select(`
        role,
        joined_at,
        Team!inner(
          id,
          name,
          owner_id,
          created_at,
          updated_at
        )
      `)
      .eq('user_id', session.user.id)
      .order('joined_at', { ascending: false })

    if (error) {
      console.error('Error fetching teams:', error)
      return NextResponse.json(
        { error: 'Failed to fetch teams' },
        { status: 500 }
      )
    }

    const formattedTeams = teams?.map(member => ({
      ...member.Team,
      userRole: member.role,
      joinedAt: member.joined_at
    })) || []

    return NextResponse.json({
      success: true,
      data: formattedTeams
    })

  } catch (error) {
    console.error('Get teams error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
