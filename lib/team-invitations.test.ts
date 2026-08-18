import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  buildInviteLink,
  invitationApiPayload,
  invitationApiStatus,
  invitationEmailOutcome,
  inviteEmailDisplayNames,
  invitationsFromApiResponse,
  mapInvitationRows,
  publicInviteBaseUrl,
} from './team-invitations'

describe('buildInviteLink', () => {
  it('builds an invite URL from the token, not a DB column', () => {
    expect(buildInviteLink('https://www.cookie-banner.ca', 'abc123')).toBe(
      'https://www.cookie-banner.ca/invite/abc123',
    )
  })
})

describe('publicInviteBaseUrl', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it('prefers NEXT_PUBLIC_BASE_URL over the request origin', () => {
    vi.stubEnv('NEXT_PUBLIC_BASE_URL', 'https://www.cookie-banner.ca/')
    vi.stubEnv('NEXTAUTH_URL', 'https://preview.example')
    expect(publicInviteBaseUrl('http://localhost:3000')).toBe('https://www.cookie-banner.ca')
  })

  it('falls back to the request origin, then production', () => {
    vi.stubEnv('NEXT_PUBLIC_BASE_URL', '')
    vi.stubEnv('NEXTAUTH_URL', '')
    expect(publicInviteBaseUrl('https://www.cookie-banner.ca')).toBe('https://www.cookie-banner.ca')
    expect(publicInviteBaseUrl(null)).toBe('https://www.cookie-banner.ca')
  })
})

describe('inviteEmailDisplayNames', () => {
  it('uses the inviter name and team name when present', () => {
    expect(
      inviteEmailDisplayNames({
        inviterName: ' Hugh ',
        inviterEmail: 'hugh@example.com',
        teamName: ' Acme ',
      }),
    ).toEqual({ inviterName: 'Hugh', teamName: 'Acme' })
  })

  it('falls back to email / a workspace when names are missing', () => {
    expect(
      inviteEmailDisplayNames({
        inviterName: '  ',
        inviterEmail: 'hugh@example.com',
        teamName: null,
      }),
    ).toEqual({ inviterName: 'hugh@example.com', teamName: 'a workspace' })
  })
})

describe('invitationEmailOutcome', () => {
  it('treats a sent email as success', () => {
    expect(invitationEmailOutcome(true)).toEqual({
      success: true,
      emailSent: true,
      message: 'Invitation email sent. You can also copy the invite link as a backup.',
    })
  })

  it('does not claim success when mail failed, and keeps the invite visible', () => {
    const outcome = invitationEmailOutcome(false)
    expect(outcome.success).toBe(false)
    expect(outcome.emailSent).toBe(false)
    expect(outcome.error).toMatch(/could not send the email/i)
  })
})

describe('invitationApiPayload', () => {
  it('includes the backup link after a successful send', () => {
    const payload = invitationApiPayload({
      invitation: { id: 'inv-1' },
      inviteLink: 'https://www.cookie-banner.ca/invite/tok-1',
      emailSent: true,
    })
    expect(payload.success).toBe(true)
    expect(payload.emailSent).toBe(true)
    expect(payload.data.inviteLink).toBe('https://www.cookie-banner.ca/invite/tok-1')
    expect(payload.data.shareableLink).toBe(payload.data.inviteLink)
  })

  it('still returns the link when email fails so the inviter is not left empty-handed', () => {
    const payload = invitationApiPayload({
      invitation: { id: 'inv-1' },
      inviteLink: 'https://www.cookie-banner.ca/invite/tok-1',
      emailSent: false,
    })
    expect(payload.success).toBe(false)
    expect(payload.emailSent).toBe(false)
    expect(payload.data.inviteLink).toContain('/invite/tok-1')
  })
})

describe('invitationApiStatus', () => {
  it('uses 201 for a newly created invite that emailed', () => {
    expect(invitationApiStatus(true, true)).toBe(201)
  })

  it('uses 200 when resending an existing invite that emailed', () => {
    expect(invitationApiStatus(true, false)).toBe(200)
  })

  it('uses 503 when the invite exists but mail failed', () => {
    expect(invitationApiStatus(false, true)).toBe(503)
    expect(invitationApiStatus(false, false)).toBe(503)
  })
})

describe('mapInvitationRows', () => {
  it('returns an empty list when there are no rows', () => {
    expect(mapInvitationRows([], 'https://www.cookie-banner.ca')).toEqual([])
    expect(mapInvitationRows(null, 'https://www.cookie-banner.ca')).toEqual([])
  })

  it('maps token to invite_link', () => {
    const mapped = mapInvitationRows(
      [
        {
          id: 'inv-1',
          email: 'teammate@example.com',
          role: 'editor',
          status: 'pending',
          created_at: '2026-08-12T00:00:00.000Z',
          expires_at: '2026-08-19T00:00:00.000Z',
          token: 'tok-1',
        },
      ],
      'https://www.cookie-banner.ca',
    )
    expect(mapped[0]?.invite_link).toBe('https://www.cookie-banner.ca/invite/tok-1')
  })

  it('omits the invite link (bearer token) for non-admin viewers', () => {
    const mapped = mapInvitationRows(
      [
        {
          id: 'inv-1',
          email: 'teammate@example.com',
          role: 'editor',
          status: 'pending',
          created_at: '2026-08-12T00:00:00.000Z',
          expires_at: '2026-08-19T00:00:00.000Z',
          token: 'tok-1',
        },
      ],
      'https://www.cookie-banner.ca',
      { includeLink: false },
    )
    expect(mapped[0]?.invite_link).toBeUndefined()
    expect(JSON.stringify(mapped)).not.toContain('tok-1')
  })
})

describe('invitationsFromApiResponse', () => {
  it('treats a successful empty list as a normal empty state', () => {
    expect(
      invitationsFromApiResponse({
        ok: true,
        status: 200,
        body: { success: true, data: [] },
      }),
    ).toEqual({
      invitations: [],
      showErrorToast: false,
      emptyReason: 'none',
    })
  })

  it('does not toast when a logged-in member cannot view invites', () => {
    expect(
      invitationsFromApiResponse({
        ok: false,
        status: 403,
        body: { error: 'Only workspace owners and admins can view invitations.' },
      }),
    ).toEqual({
      invitations: [],
      showErrorToast: false,
      emptyReason: 'forbidden',
    })
  })

  it('stays quiet on an expired session — the members fetch surfaces it', () => {
    expect(
      invitationsFromApiResponse({
        ok: false,
        status: 401,
        body: { error: 'Unauthorized' },
      }),
    ).toEqual({
      invitations: [],
      showErrorToast: false,
      emptyReason: 'unauthenticated',
    })
  })

  it('toasts only on unexpected server failures', () => {
    expect(
      invitationsFromApiResponse({
        ok: false,
        status: 500,
        body: { error: 'Failed to fetch invitations' },
      }),
    ).toEqual({
      invitations: [],
      showErrorToast: true,
      emptyReason: 'error',
    })
  })
})
