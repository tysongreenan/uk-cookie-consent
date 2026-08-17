import { describe, expect, it } from 'vitest'
import {
  buildInviteLink,
  invitationsFromApiResponse,
  mapInvitationRows,
} from './team-invitations'

describe('buildInviteLink', () => {
  it('builds an invite URL from the token, not a DB column', () => {
    expect(buildInviteLink('https://www.cookie-banner.ca', 'abc123')).toBe(
      'https://www.cookie-banner.ca/invite/abc123',
    )
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
