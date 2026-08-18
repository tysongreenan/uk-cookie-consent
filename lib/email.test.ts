import { afterEach, describe, expect, it, vi } from 'vitest'

const { sendMock } = vi.hoisted(() => ({
  sendMock: vi.fn(),
}))

vi.mock('resend', () => ({
  Resend: class {
    emails = { send: sendMock }
  },
}))

describe('sendTeamInvitationEmail', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
    sendMock.mockReset()
  })

  it('returns false without sending when RESEND_API_KEY is missing', async () => {
    vi.stubEnv('RESEND_API_KEY', '')
    const { sendTeamInvitationEmail } = await import('./email')
    const sent = await sendTeamInvitationEmail(
      'invitee@example.com',
      'Ada',
      'Acme Workspace',
      'https://www.cookie-banner.ca/invite/tok',
    )
    expect(sent).toBe(false)
    expect(sendMock).not.toHaveBeenCalled()
  })
})

describe('sendEmail', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
    sendMock.mockReset()
  })

  it('defaults From and sets Reply-To to support@cookie-banner.ca', async () => {
    vi.resetModules()
    vi.stubEnv('RESEND_API_KEY', 're_test')
    vi.stubEnv('RESEND_FROM_EMAIL', '')
    sendMock.mockResolvedValue({ data: { id: 'email_1' }, error: null })

    const { sendEmail } = await import('./email')
    const sent = await sendEmail({
      to: 'user@example.com',
      subject: 'Test',
      html: '<p>Test</p>',
    })

    expect(sent).toBe(true)
    expect(sendMock).toHaveBeenCalledWith(
      expect.objectContaining({
        from: 'Cookie Banner <support@cookie-banner.ca>',
        replyTo: 'support@cookie-banner.ca',
        to: 'user@example.com',
        subject: 'Test',
      }),
    )
  })
})
