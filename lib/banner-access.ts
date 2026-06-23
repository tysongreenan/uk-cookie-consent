import type { SupabaseClient } from '@supabase/supabase-js'

import { isTeamMember } from '@/lib/team-permissions'

/**
 * Returns user IDs whose banners the requester may access.
 * Personal workspace: own banners only.
 * Team workspace: all team members' banners, only if requester is still a member.
 */
export async function getAccessibleUserIds(
  supabase: SupabaseClient,
  userId: string,
  currentTeamId: string | null | undefined
): Promise<string[]> {
  if (!currentTeamId) return [userId]

  const member = await isTeamMember(userId, currentTeamId)
  if (!member) return [userId]

  const { data: members, error } = await supabase
    .from('TeamMember')
    .select('user_id')
    .eq('team_id', currentTeamId)

  if (error) {
    console.error('Error fetching team members for banner access:', error)
    return [userId]
  }

  const ids = members?.map((m) => m.user_id).filter(Boolean) ?? []
  return ids.length > 0 ? ids : [userId]
}