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

/** Stable public origin for emailed accept links — env first, not the dashboard Origin. */
export function publicInviteBaseUrl(requestOrigin?: string | null): string {
  return (
    process.env.NEXT_PUBLIC_BASE_URL ||
    process.env.NEXTAUTH_URL ||
    requestOrigin ||
    'https://www.cookie-banner.ca'
  ).replace(/\/$/, '')
}

export function inviteEmailDisplayNames(input: {
  inviterName?: string | null
  inviterEmail?: string | null
  teamName?: string | null
}): { inviterName: string; teamName: string } {
  const inviterName = (input.inviterName || '').trim() || input.inviterEmail || 'A teammate'
  const teamName = (input.teamName || '').trim() || 'a workspace'
  return { inviterName, teamName }
}

export type InvitationEmailOutcome = {
  success: boolean
  emailSent: boolean
  message?: string
  error?: string
}

export function invitationEmailOutcome(emailSent: boolean): InvitationEmailOutcome {
  if (emailSent) {
    return {
      success: true,
      emailSent: true,
      message: 'Invitation email sent. You can also copy the invite link as a backup.',
    }
  }

  return {
    success: false,
    emailSent: false,
    error:
      'The invitation was saved, but we could not send the email. Copy the invite link below and share it yourself, or try again.',
  }
}

export function invitationApiPayload(input: {
  invitation: unknown
  inviteLink: string
  emailSent: boolean
}): InvitationEmailOutcome & {
  data: {
    invitation: unknown
    inviteLink: string
    shareableLink: string
    emailSent: boolean
  }
} {
  const outcome = invitationEmailOutcome(input.emailSent)
  return {
    ...outcome,
    data: {
      invitation: input.invitation,
      inviteLink: input.inviteLink,
      shareableLink: input.inviteLink,
      emailSent: input.emailSent,
    },
  }
}

/** 201 for a new invite that emailed; 200 for a resend that emailed; 503 if mail failed. */
export function invitationApiStatus(emailSent: boolean, created: boolean): number {
  if (!emailSent) return 503
  return created ? 201 : 200
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
