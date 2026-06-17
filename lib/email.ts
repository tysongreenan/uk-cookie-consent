/**
 * Transactional email service using Resend
 *
 * All emails sent from the platform go through this module.
 * Requires RESEND_API_KEY and RESEND_FROM_EMAIL env vars.
 */

import { Resend } from 'resend'

function getResend() {
  const key = process.env.RESEND_API_KEY
  if (!key) {
    console.error('[EMAIL] RESEND_API_KEY not configured')
    return null
  }
  return new Resend(key)
}

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'Cookie Banner <onboarding@resend.dev>'

// ── Generic send ──────────────────────────────────────────────────────

interface SendEmailOptions {
  to: string
  subject: string
  html: string
  text?: string
}

export async function sendEmail(options: SendEmailOptions): Promise<boolean> {
  const resend = getResend()
  if (!resend) return false

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    })

    if (error) {
      console.error('[EMAIL] Send failed:', error)
      return false
    }

    return true
  } catch (err) {
    console.error('[EMAIL] Send error:', err)
    return false
  }
}

// ── Welcome email ─────────────────────────────────────────────────────

export async function sendWelcomeEmail(to: string, name: string, product: 'banner' | 'privacy') {
  const isBanner = product === 'banner'
  const dashboardUrl = isBanner ? 'https://cookie-banner.ca/dashboard' : 'https://cookie-banner.ca/dashboard/privacy'
  const productName = isBanner ? 'Cookie Banner' : 'Privacy Manager'

  return sendEmail({
    to,
    subject: `Welcome to ${productName}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 0;">
        <div style="background: #0E768C; padding: 24px 32px; border-radius: 12px 12px 0 0;">
          <h1 style="color: #fff; margin: 0; font-size: 20px;">Welcome to ${productName}</h1>
        </div>
        <div style="background: #fff; padding: 32px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
          <p style="color: #374151; font-size: 15px; line-height: 1.6; margin: 0 0 16px;">
            Hi ${name || 'there'},
          </p>
          <p style="color: #374151; font-size: 15px; line-height: 1.6; margin: 0 0 16px;">
            ${isBanner
              ? 'Your account is ready. You can now create your first cookie consent banner, set up analytics, and manage compliance for your websites.'
              : 'Your account is ready. Set up your privacy preferences, install the Chrome extension, and start browsing without cookie banner interruptions.'}
          </p>
          <a href="${dashboardUrl}" style="display: inline-block; background: #0E768C; color: #fff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">
            Go to Dashboard
          </a>
          ${!isBanner ? `
          <p style="color: #6b7280; font-size: 13px; line-height: 1.5; margin: 24px 0 0;">
            Next step: <a href="https://cookie-banner.ca/dashboard/privacy/settings" style="color: #0E768C;">Generate your API key</a> to connect the Chrome extension.
          </p>
          ` : ''}
        </div>
        <p style="color: #9ca3af; font-size: 12px; text-align: center; margin-top: 24px;">
          cookie-banner.ca — Cookie consent made simple
        </p>
      </div>
    `,
  })
}

// ── DSAR deadline reminder ────────────────────────────────────────────

export async function sendDSARDeadlineReminder(
  to: string,
  requestId: string,
  daysRemaining: number,
  subjectIdentifier: string
) {
  const isOverdue = daysRemaining < 0
  const urgency = isOverdue ? 'OVERDUE' : daysRemaining <= 3 ? 'URGENT' : 'Reminder'

  return sendEmail({
    to,
    subject: `[${urgency}] Data access request deadline — ${isOverdue ? 'overdue' : `${daysRemaining} days remaining`}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 0;">
        <div style="background: ${isOverdue ? '#dc2626' : daysRemaining <= 3 ? '#ea580c' : '#0E768C'}; padding: 24px 32px; border-radius: 12px 12px 0 0;">
          <h1 style="color: #fff; margin: 0; font-size: 20px;">
            ${isOverdue ? 'Data Request Overdue' : `${daysRemaining} Days Remaining`}
          </h1>
        </div>
        <div style="background: #fff; padding: 32px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
          <p style="color: #374151; font-size: 15px; line-height: 1.6; margin: 0 0 16px;">
            ${isOverdue
              ? 'A data access request has passed its 30-day deadline under Quebec Law 25. Respond immediately to avoid CAI penalties.'
              : `A data access request is due in ${daysRemaining} day${daysRemaining !== 1 ? 's' : ''}. Under Quebec Law 25, you must respond within 30 calendar days.`}
          </p>
          <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; margin: 0 0 20px;">
            <p style="color: #6b7280; font-size: 13px; margin: 0 0 4px;">Request ID</p>
            <p style="color: #111827; font-size: 14px; font-weight: 600; margin: 0 0 12px; font-family: monospace;">${requestId.slice(0, 12)}...</p>
            <p style="color: #6b7280; font-size: 13px; margin: 0 0 4px;">Subject</p>
            <p style="color: #111827; font-size: 14px; font-weight: 600; margin: 0; font-family: monospace;">${subjectIdentifier}</p>
          </div>
          <a href="https://cookie-banner.ca/dashboard/data-requests/${requestId}" style="display: inline-block; background: #0E768C; color: #fff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">
            View Request
          </a>
        </div>
        <p style="color: #9ca3af; font-size: 12px; text-align: center; margin-top: 24px;">
          cookie-banner.ca — Law 25 compliance tools
        </p>
      </div>
    `,
  })
}

// ── Team invitation email ─────────────────────────────────────────────

export async function sendTeamInvitationEmail(
  to: string,
  inviterName: string,
  teamName: string,
  inviteUrl: string
) {
  return sendEmail({
    to,
    subject: `${inviterName} invited you to ${teamName}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 0;">
        <div style="background: #0E768C; padding: 24px 32px; border-radius: 12px 12px 0 0;">
          <h1 style="color: #fff; margin: 0; font-size: 20px;">Team Invitation</h1>
        </div>
        <div style="background: #fff; padding: 32px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
          <p style="color: #374151; font-size: 15px; line-height: 1.6; margin: 0 0 16px;">
            <strong>${inviterName}</strong> has invited you to join <strong>${teamName}</strong> on cookie-banner.ca.
          </p>
          <a href="${inviteUrl}" style="display: inline-block; background: #0E768C; color: #fff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">
            Accept Invitation
          </a>
          <p style="color: #9ca3af; font-size: 12px; margin: 24px 0 0;">
            This invitation will expire in 7 days. If you didn't expect this email, you can ignore it.
          </p>
        </div>
      </div>
    `,
  })
}
