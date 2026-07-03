import type { SupabaseClient } from '@supabase/supabase-js'

import { isTeamMember } from '@/lib/team-permissions'

export interface BannerAccessScope {
  userIds: string[]
  /** True when the requester is an active member of currentTeamId */
  isTeamWorkspace: boolean
}

/**
 * Returns user IDs whose banners the requester may access.
 * Personal workspace: own banners only.
 * Team workspace: all team members' banners, only if requester is still a member.
 */
export async function getBannerAccessScope(
  supabase: SupabaseClient,
  userId: string,
  currentTeamId: string | null | undefined
): Promise<BannerAccessScope> {
  if (!currentTeamId) {
    return { userIds: [userId], isTeamWorkspace: false }
  }

  const member = await isTeamMember(userId, currentTeamId)
  if (!member) {
    return { userIds: [userId], isTeamWorkspace: false }
  }

  const { data: members, error } = await supabase
    .from('TeamMember')
    .select('user_id')
    .eq('team_id', currentTeamId)

  if (error) {
    console.error('Error fetching team members for banner access:', error)
    return { userIds: [userId], isTeamWorkspace: false }
  }

  const ids = members?.map((m) => m.user_id).filter(Boolean) ?? []
  return {
    userIds: ids.length > 0 ? ids : [userId],
    isTeamWorkspace: true,
  }
}

/** @deprecated Use getBannerAccessScope — kept for call sites that only need IDs */
export async function getAccessibleUserIds(
  supabase: SupabaseClient,
  userId: string,
  currentTeamId: string | null | undefined
): Promise<string[]> {
  const scope = await getBannerAccessScope(supabase, userId, currentTeamId)
  return scope.userIds
}