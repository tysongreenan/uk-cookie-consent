import { createClient } from '@supabase/supabase-js'
import { TeamRole, TeamPermission, hasTeamPermission } from '@/types'

// Use service role key for server-side operations (bypasses RLS)
// This is safe because callers authenticate via NextAuth session before using these functions
const supabase = createClient(
  (process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co"),
  (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || "placeholder-key")
)

export interface TeamPermissionResult {
  hasPermission: boolean
  userRole?: TeamRole
  teamId?: string
  error?: string
}

/**
 * Check if a user has the required permission for a team
 */
export async function checkTeamPermission(
  userId: string,
  teamId: string,
  requiredPermission: TeamPermission
): Promise<TeamPermissionResult> {
  try {
    // Get user's role in the team
    const { data: member, error } = await supabase
      .from('TeamMember')
      .select('role')
      .eq('team_id', teamId)
      .eq('user_id', userId)
      .single()

    if (error || !member) {
      return {
        hasPermission: false,
        error: 'User is not a member of this team'
      }
    }

    const hasPermission = hasTeamPermission(member.role as TeamRole, requiredPermission)

    return {
      hasPermission,
      userRole: member.role as TeamRole,
      teamId
    }
  } catch (error) {
    console.error('Error checking team permission:', error)
    return {
      hasPermission: false,
      error: 'Failed to check team permission'
    }
  }
}

/**
 * Check if a user is a member of a team
 */
export async function isTeamMember(
  userId: string,
  teamId: string
): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('TeamMember')
      .select('id')
      .eq('team_id', teamId)
      .eq('user_id', userId)
      .single()

    return !error && !!data
  } catch (error) {
    console.error('Error checking team membership:', error)
    return false
  }
}

/**
 * Get user's role in a team
 */
export async function getUserTeamRole(
  userId: string,
  teamId: string
): Promise<TeamRole | null> {
  try {
    const { data, error } = await supabase
      .from('TeamMember')
      .select('role')
      .eq('team_id', teamId)
      .eq('user_id', userId)
      .single()

    if (error || !data) {
      return null
    }

    return data.role as TeamRole
  } catch (error) {
    console.error('Error getting user team role:', error)
    return null
  }
}

/**
 * Get all teams a user belongs to
 */
export async function getUserTeams(userId: string) {
  try {
    const { data: memberships, error } = await supabase
      .from('TeamMember')
      .select('team_id, role, joined_at')
      .eq('user_id', userId)
      .order('joined_at', { ascending: false })

    if (error) {
      console.error('Error getting user teams:', error)
      return []
    }

    const teamIds = (memberships || []).map(member => member.team_id).filter(Boolean)
    if (teamIds.length === 0) return []

    const { data: teams, error: teamsError } = await supabase
      .from('Team')
      .select('id, name, owner_id, created_at, updated_at')
      .in('id', teamIds)

    if (teamsError) {
      console.error('Error getting team details:', teamsError)
      return []
    }

    const teamsById = new Map((teams || []).map(team => [team.id, team]))

    return (memberships || [])
      .map(member => {
        const team = teamsById.get(member.team_id)
        if (!team) return null

        return {
          ...team,
          userRole: member.role,
          joinedAt: member.joined_at
        }
      })
      .filter(Boolean)
  } catch (error) {
    console.error('Error getting user teams:', error)
    return []
  }
}

/**
 * Get team members with their user details
 */
export async function getTeamMembers(teamId: string) {
  try {
    const { data: members, error } = await supabase
      .from('TeamMember')
      .select('id, user_id, role, joined_at, created_at')
      .eq('team_id', teamId)
      .order('joined_at', { ascending: false })

    if (error) {
      console.error('Error getting team members:', error)
      return []
    }

    const userIds = (members || []).map(member => member.user_id).filter(Boolean)
    const { data: users, error: usersError } = userIds.length > 0
      ? await supabase
        .from('User')
        .select('id, name, email, image')
        .in('id', userIds)
      : { data: [], error: null }

    if (usersError) {
      console.error('Error getting team member users:', usersError)
      return []
    }

    const usersById = new Map((users || []).map(user => [user.id, user]))

    return (members || []).map(member => ({
      id: member.id,
      role: member.role,
      joinedAt: member.joined_at,
      createdAt: member.created_at,
      user: usersById.get(member.user_id) || null
    }))
  } catch (error) {
    console.error('Error getting team members:', error)
    return []
  }
}

/**
 * Get pending invitations for a team
 */
export async function getTeamInvitations(teamId: string) {
  try {
    const { data: invitations, error } = await supabase
      .from('TeamInvitation')
      .select('id, email, role, token, status, expires_at, created_at, invited_by')
      .eq('team_id', teamId)
      .eq('status', 'pending')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error getting team invitations:', error)
      return []
    }

    const inviterIds = (invitations || []).map(invitation => invitation.invited_by).filter(Boolean)
    const { data: inviters, error: invitersError } = inviterIds.length > 0
      ? await supabase
        .from('User')
        .select('id, name, email')
        .in('id', inviterIds)
      : { data: [], error: null }

    if (invitersError) {
      console.error('Error getting invitation inviters:', invitersError)
      return []
    }

    const invitersById = new Map((inviters || []).map(inviter => [inviter.id, inviter]))

    return (invitations || []).map(invitation => ({
      id: invitation.id,
      email: invitation.email,
      role: invitation.role,
      token: invitation.token,
      status: invitation.status,
      expiresAt: invitation.expires_at,
      createdAt: invitation.created_at,
      inviter: invitersById.get(invitation.invited_by) || null
    }))
  } catch (error) {
    console.error('Error getting team invitations:', error)
    return []
  }
}

/**
 * Check if user can perform action on team
 */
export async function canPerformTeamAction(
  userId: string,
  teamId: string,
  action: 'view' | 'edit' | 'delete' | 'invite' | 'manage_members' | 'billing'
): Promise<boolean> {
  const permissionMap: Record<string, TeamPermission> = {
    view: 'view',
    edit: 'edit',
    delete: 'delete',
    invite: 'admin',
    manage_members: 'admin',
    billing: 'admin'
  }

  const requiredPermission = permissionMap[action]
  if (!requiredPermission) {
    return false
  }

  const result = await checkTeamPermission(userId, teamId, requiredPermission)
  return result.hasPermission
}

async function getPlanForUser(userId: string): Promise<{ planTier: string; featureFreezeDate: string | null }> {
  const { data: user, error } = await supabase
    .from('User')
    .select('planTier')
    .eq('id', userId)
    .single()

  if (error) {
    console.error('[PLAN] Failed to resolve plan tier:', error)
    return { planTier: 'free', featureFreezeDate: null }
  }

  let featureFreezeDate: string | null = null

  try {
    const { data: freezeData, error: freezeError } = await supabase
      .from('User')
      .select('featureFreezeDate')
      .eq('id', userId)
      .single()

    if (!freezeError) {
      featureFreezeDate = freezeData?.featureFreezeDate || null
    }
  } catch {
    featureFreezeDate = null
  }

  return {
    planTier: user?.planTier || 'free',
    featureFreezeDate,
  }
}

/**
 * Resolve the effective plan tier and freeze date for a user in a team workspace.
 * When the user is in someone else's workspace, returns the team owner's plan.
 */
export async function resolveEffectivePlan(
  userId: string,
  currentTeamId: string | null | undefined
): Promise<{ planTier: string; featureFreezeDate: string | null }> {
  if (!currentTeamId) {
    return getPlanForUser(userId)
  }

  try {
    const { data: team } = await supabase
      .from('Team')
      .select('owner_id')
      .eq('id', currentTeamId)
      .single()

    const lookupUserId = team?.owner_id && team.owner_id !== userId
      ? team.owner_id
      : userId

    return getPlanForUser(lookupUserId)
  } catch (error) {
    console.error('[PLAN] Failed to resolve team owner plan:', error)
    return { planTier: 'free', featureFreezeDate: null }
  }
}

/**
 * Middleware helper for API routes
 */
export async function requireTeamPermission(
  userId: string,
  teamId: string,
  requiredPermission: TeamPermission
): Promise<{ success: boolean; error?: string; userRole?: TeamRole }> {
  const result = await checkTeamPermission(userId, teamId, requiredPermission)
  
  if (!result.hasPermission) {
    return {
      success: false,
      error: result.error || 'Insufficient permissions'
    }
  }

  return {
    success: true,
    userRole: result.userRole
  }
}
