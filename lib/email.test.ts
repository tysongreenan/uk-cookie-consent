import { afterEach, describe, expect, it, vi } from 'vitest'
import { sendTeamInvitationEmail } from './email'

describe('sendTeamInvitationEmail', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it('returns false without sending when RESEND_API_KEY is missing', async () => {
    vi.stubEnv('RESEND_API_KEY', '')
    const sent = await sendTeamInvitationEmail(
      'invitee@example.com',
      'Ada',
      'Acme Workspace',
      'https://www.cookie-banner.ca/invite/tok',
    )
    expect(sent).toBe(false)
  })
})
