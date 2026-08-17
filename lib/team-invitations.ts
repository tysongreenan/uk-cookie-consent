export type InvitationRow = {
  id: string
  email: string
  role: string
  status: string
  created_at: string
  expires_at: string
  token: string
}

export type InvitationStatus = 'pending' | 'accepted' | 'expired'

export type MappedInvitation = {
  id: string
  email: string
  role: string
  status: InvitationStatus
  created_at: string
  expires_at: string
  /** Only present for owners/admins — the link embeds the bearer token. */
  invite_link?: string
}

export function buildInviteLink(baseUrl: string, token: string): string {
  const origin = (baseUrl || 'https://www.cookie-banner.ca').replace(/\/$/, '')
  return `${origin}/invite/${token}`
}

export function mapInvitationRows(
  rows: InvitationRow[] | null | undefined,
  baseUrl: string,
  options?: { includeLink?: boolean },
): MappedInvitation[] {
  const includeLink = options?.includeLink !== false
  return (rows || []).map((row) => ({
    id: row.id,
    email: row.email,
    role: row.role,
    // The query filters on these three statuses, so the cast is safe.
    status: row.status as InvitationStatus,
    created_at: row.created_at,
    expires_at: row.expires_at,
    ...(includeLink ? { invite_link: buildInviteLink(baseUrl, row.token) } : {}),
  }))
}

export type InvitationsFetchResult = {
  invitations: MappedInvitation[]
  showErrorToast: boolean
  emptyReason: 'none' | 'forbidden' | 'unauthenticated' | 'no-workspace' | 'error' | null
}

/**
 * Team Settings should treat “no invites / no permission / no workspace”
 * as an empty state. Only unexpected server failures toast.
 */
export function invitationsFromApiResponse(response: {
  ok: boolean
  status: number
  body?: { success?: boolean; data?: MappedInvitation[]; error?: string } | null
}): InvitationsFetchResult {
  if (response.ok && response.body?.success) {
    const invitations = Array.isArray(response.body.data) ? response.body.data : []
    return {
      invitations,
      showErrorToast: false,
      emptyReason: invitations.length === 0 ? 'none' : null,
    }
  }

  // Expired session: the members fetch in the same effect already surfaces
  // this, so the invitations card stays a quiet empty state.
  if (response.status === 401) {
    return { invitations: [], showErrorToast: false, emptyReason: 'unauthenticated' }
  }

  if (response.status === 403 || response.status === 404) {
    return { invitations: [], showErrorToast: false, emptyReason: 'forbidden' }
  }

  return { invitations: [], showErrorToast: true, emptyReason: 'error' }
}
