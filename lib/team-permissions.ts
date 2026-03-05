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
    const { data, error } = await supabase
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
      .eq('user_id', userId)
      .order('joined_at', { ascending: false })

    if (error) {
      console.error('Error getting user teams:', error)
      return []
    }

    return data?.map(member => ({
      ...member.Team,
      userRole: member.role,
      joinedAt: member.joined_at
    })) || []
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
    const { data, error } = await supabase
      .from('TeamMember')
      .select(`
        id,
        role,
        joined_at,
        created_at,
        User!inner(
          id,
          name,
          email,
          image
        )
      `)
      .eq('team_id', teamId)
      .order('joined_at', { ascending: false })

    if (error) {
      console.error('Error getting team members:', error)
      return []
    }

    return data?.map(member => ({
      id: member.id,
      role: member.role,
      joinedAt: member.joined_at,
      createdAt: member.created_at,
      user: member.User
    })) || []
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
    const { data, error } = await supabase
      .from('TeamInvitation')
      .select(`
        id,
        email,
        role,
        token,
        status,
        expires_at,
        created_at,
        User!inner(
          id,
          name,
          email
        )
      `)
      .eq('team_id', teamId)
      .eq('status', 'pending')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error getting team invitations:', error)
      return []
    }

    return data?.map(invitation => ({
      id: invitation.id,
      email: invitation.email,
      role: invitation.role,
      token: invitation.token,
      status: invitation.status,
      expiresAt: invitation.expires_at,
      createdAt: invitation.created_at,
      inviter: invitation.User
    })) || []
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
