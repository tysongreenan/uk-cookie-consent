export type InvitationRow = {
  id: string
  email: string
  role: string
  status: string
  created_at: string
  expires_at: string
  token: string
}

export type MappedInvitation = {
  id: string
  email: string
  role: string
  status: string
  created_at: string
  expires_at: string
  invite_link: string
}

export function buildInviteLink(baseUrl: string, token: string): string {
  const origin = (baseUrl || 'https://www.cookie-banner.ca').replace(/\/$/, '')
  return `${origin}/invite/${token}`
}

export function mapInvitationRows(
  rows: InvitationRow[] | null | undefined,
  baseUrl: string,
): MappedInvitation[] {
  return (rows || []).map((row) => ({
    id: row.id,
    email: row.email,
    role: row.role,
    status: row.status,
    created_at: row.created_at,
    expires_at: row.expires_at,
    invite_link: buildInviteLink(baseUrl, row.token),
  }))
}

export type InvitationsFetchResult = {
  invitations: MappedInvitation[]
  showErrorToast: boolean
  emptyReason: 'none' | 'forbidden' | 'no-workspace' | 'error' | null
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

  if (response.status === 401) {
    return { invitations: [], showErrorToast: false, emptyReason: 'forbidden' }
  }

  if (response.status === 403 || response.status === 404) {
    return { invitations: [], showErrorToast: false, emptyReason: 'forbidden' }
  }

  return { invitations: [], showErrorToast: true, emptyReason: 'error' }
}
