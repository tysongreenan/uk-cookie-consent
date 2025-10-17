// Secure team API route with comprehensive security validation
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createClient } from '@supabase/supabase-js'
import { 
  validateTeamAccess, 
  validateTeamOwnership, 
  validateEmail, 
  validateTeamName,
  TeamRateLimit,
  SECURITY_HEADERS,
  logSecurityEvent
} from '@/lib/security-validation'
import { TeamPermission } from '@/types'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

/**
 * Secure GET team details
 */
export async function secureGetTeam(
  request: NextRequest,
  teamId: string
): Promise<NextResponse> {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      logSecurityEvent('unauthorized_team_access', 'anonymous', { teamId })
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401, headers: SECURITY_HEADERS }
      )
    }

    // Validate team access
    const accessCheck = await validateTeamAccess(
      session.user.id,
      teamId,
      'view'
    )

    if (!accessCheck.hasAccess) {
      logSecurityEvent('unauthorized_team_access', session.user.id, { 
        teamId, 
        error: accessCheck.error 
      })
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403, headers: SECURITY_HEADERS }
      )
    }

    // Fetch team details
    const { data: team, error } = await supabase
      .from('Team')
      .select(`
        id,
        name,
        ownerId,
        createdAt,
        updatedAt,
        members:TeamMember(
          id,
          role,
          joinedAt,
          user:User(id, name, email)
        )
      `)
      .eq('id', teamId)
      .single()

    if (error || !team) {
      logSecurityEvent('team_not_found', session.user.id, { teamId })
      return NextResponse.json(
        { error: 'Team not found' },
        { status: 404, headers: SECURITY_HEADERS }
      )
    }

    return NextResponse.json(
      { success: true, data: team },
      { headers: SECURITY_HEADERS }
    )

  } catch (error) {
    console.error('Error in secureGetTeam:', error)
    logSecurityEvent('team_api_error', 'system', { 
      error: error instanceof Error ? error.message : 'Unknown error' 
    })
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: SECURITY_HEADERS }
    )
  }
}

/**
 * Secure PATCH team details
 */
export async function secureUpdateTeam(
  request: NextRequest,
  teamId: string
): Promise<NextResponse> {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401, headers: SECURITY_HEADERS }
      )
    }

    // Validate team ownership
    const ownershipCheck = await validateTeamOwnership(session.user.id, teamId)
    if (!ownershipCheck.isOwner) {
      logSecurityEvent('unauthorized_team_update', session.user.id, { 
        teamId,
        error: ownershipCheck.error 
      })
      return NextResponse.json(
        { error: 'Only team owners can update team details' },
        { status: 403, headers: SECURITY_HEADERS }
      )
    }

    const body = await request.json()
    const { name } = body

    // Validate team name
    const nameValidation = validateTeamName(name)
    if (!nameValidation.valid) {
      return NextResponse.json(
        { error: nameValidation.error },
        { status: 400, headers: SECURITY_HEADERS }
      )
    }

    // Update team
    const { error: updateError } = await supabase
      .from('Team')
      .update({ 
        name: name.trim(),
        updatedAt: new Date().toISOString()
      })
      .eq('id', teamId)
      .eq('ownerId', session.user.id) // Double-check ownership

    if (updateError) {
      logSecurityEvent('team_update_failed', session.user.id, { 
        teamId, 
        error: updateError.message 
      })
      return NextResponse.json(
        { error: 'Failed to update team' },
        { status: 500, headers: SECURITY_HEADERS }
      )
    }

    logSecurityEvent('team_updated', session.user.id, { teamId, newName: name })
    return NextResponse.json(
      { success: true, message: 'Team updated successfully' },
      { headers: SECURITY_HEADERS }
    )

  } catch (error) {
    console.error('Error in secureUpdateTeam:', error)
    logSecurityEvent('team_update_error', 'system', { 
      error: error instanceof Error ? error.message : 'Unknown error' 
    })
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: SECURITY_HEADERS }
    )
  }
}

/**
 * Secure DELETE team
 */
export async function secureDeleteTeam(
  request: NextRequest,
  teamId: string
): Promise<NextResponse> {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401, headers: SECURITY_HEADERS }
      )
    }

    // Validate team ownership
    const ownershipCheck = await validateTeamOwnership(session.user.id, teamId)
    if (!ownershipCheck.isOwner) {
      logSecurityEvent('unauthorized_team_deletion', session.user.id, { 
        teamId,
        error: ownershipCheck.error 
      })
      return NextResponse.json(
        { error: 'Only team owners can delete teams' },
        { status: 403, headers: SECURITY_HEADERS }
      )
    }

    // Check rate limiting
    if (!TeamRateLimit.checkTeamCreation(session.user.id)) {
      return NextResponse.json(
        { error: 'Too many team operations. Please try again later.' },
        { status: 429, headers: SECURITY_HEADERS }
      )
    }

    // Delete team (cascade will handle related records)
    const { error: deleteError } = await supabase
      .from('Team')
      .delete()
      .eq('id', teamId)
      .eq('ownerId', session.user.id) // Double-check ownership

    if (deleteError) {
      logSecurityEvent('team_deletion_failed', session.user.id, { 
        teamId, 
        error: deleteError.message 
      })
      return NextResponse.json(
        { error: 'Failed to delete team' },
        { status: 500, headers: SECURITY_HEADERS }
      )
    }

    logSecurityEvent('team_deleted', session.user.id, { teamId })
    return NextResponse.json(
      { success: true, message: 'Team deleted successfully' },
      { headers: SECURITY_HEADERS }
    )

  } catch (error) {
    console.error('Error in secureDeleteTeam:', error)
    logSecurityEvent('team_delete_error', 'system', { 
      error: error instanceof Error ? error.message : 'Unknown error' 
    })
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: SECURITY_HEADERS }
    )
  }
}

/**
 * Secure team member management
 */
export async function secureManageTeamMember(
  request: NextRequest,
  teamId: string,
  memberId: string,
  action: 'update' | 'remove'
): Promise<NextResponse> {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401, headers: SECURITY_HEADERS }
      )
    }

    // Validate team access (admin or owner required)
    const accessCheck = await validateTeamAccess(
      session.user.id,
      teamId,
      'admin'
    )

    if (!accessCheck.hasAccess) {
      logSecurityEvent('unauthorized_member_management', session.user.id, { 
        teamId, 
        memberId, 
        action,
        error: accessCheck.error 
      })
      return NextResponse.json(
        { error: 'Insufficient permissions' },
        { status: 403, headers: SECURITY_HEADERS }
      )
    }

    // Prevent self-removal for owners
    if (action === 'remove' && memberId === session.user.id) {
      const ownershipCheck = await validateTeamOwnership(session.user.id, teamId)
      if (ownershipCheck.isOwner) {
        return NextResponse.json(
          { error: 'Team owners cannot remove themselves' },
          { status: 400, headers: SECURITY_HEADERS }
        )
      }
    }

    // Perform the action
    if (action === 'update') {
      const body = await request.json()
      const { role } = body

      // Validate role
      if (!['admin', 'editor', 'viewer'].includes(role)) {
        return NextResponse.json(
          { error: 'Invalid role' },
          { status: 400, headers: SECURITY_HEADERS }
        )
      }

      const { error: updateError } = await supabase
        .from('TeamMember')
        .update({ role })
        .eq('id', memberId)
        .eq('teamId', teamId)

      if (updateError) {
        return NextResponse.json(
          { error: 'Failed to update member role' },
          { status: 500, headers: SECURITY_HEADERS }
        )
      }

      logSecurityEvent('member_role_updated', session.user.id, { 
        teamId, 
        memberId, 
        newRole: role 
      })
    } else if (action === 'remove') {
      const { error: deleteError } = await supabase
        .from('TeamMember')
        .delete()
        .eq('id', memberId)
        .eq('teamId', teamId)

      if (deleteError) {
        return NextResponse.json(
          { error: 'Failed to remove member' },
          { status: 500, headers: SECURITY_HEADERS }
        )
      }

      logSecurityEvent('member_removed', session.user.id, { 
        teamId, 
        memberId 
      })
    }

    return NextResponse.json(
      { success: true },
      { headers: SECURITY_HEADERS }
    )

  } catch (error) {
    console.error('Error in secureManageTeamMember:', error)
    logSecurityEvent('team_member_management_error', 'system', { 
      error: error instanceof Error ? error.message : 'Unknown error' 
    })
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: SECURITY_HEADERS }
    )
  }
}
