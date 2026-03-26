import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import crypto from 'crypto'
import { passwordResetRateLimit } from '@/lib/rate-limit'
import { sanitizeEmail } from '@/lib/sanitize'
import { sendEmail } from '@/lib/email'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  )
}

export async function POST(request: NextRequest) {
  try {
    const rateLimitResult = await passwordResetRateLimit.check(request)
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const cleanEmail = sanitizeEmail(typeof body.email === 'string' ? body.email : '')

    if (!cleanEmail) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 })
    }

    const supabase = getSupabase()

    // Look up user — but always return success to prevent email enumeration
    const { data: user } = await supabase
      .from('User')
      .select('id, name, email')
      .eq('email', cleanEmail)
      .single()

    if (user) {
      // Generate a secure token
      const token = crypto.randomBytes(32).toString('hex')
      const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString() // 1 hour

      // Store the token
      await supabase
        .from('User')
        .update({
          resetToken: token,
          resetTokenExpiresAt: expiresAt,
        })
        .eq('id', user.id)

      // Send the email
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.cookie-banner.ca'
      const resetUrl = `${baseUrl}/auth/reset-password?token=${token}&email=${encodeURIComponent(cleanEmail)}`

      await sendEmail({
        to: cleanEmail,
        subject: 'Reset your password — Cookie Banner',
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 0;">
            <div style="background: #0E768C; padding: 24px 32px; border-radius: 12px 12px 0 0;">
              <h1 style="color: #fff; margin: 0; font-size: 20px;">Reset Your Password</h1>
            </div>
            <div style="background: #fff; padding: 32px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
              <p style="color: #374151; font-size: 15px; line-height: 1.6; margin: 0 0 16px;">
                Hi ${user.name || 'there'},
              </p>
              <p style="color: #374151; font-size: 15px; line-height: 1.6; margin: 0 0 24px;">
                We received a request to reset your password. Click the button below to choose a new password. This link expires in 1 hour.
              </p>
              <a href="${resetUrl}" style="display: inline-block; background: #0E768C; color: #fff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">
                Reset Password
              </a>
              <p style="color: #9ca3af; font-size: 13px; line-height: 1.5; margin: 24px 0 0;">
                If you didn't request this, you can safely ignore this email. Your password won't change.
              </p>
            </div>
            <p style="color: #9ca3af; font-size: 12px; text-align: center; margin-top: 24px;">
              cookie-banner.ca — Cookie consent made simple
            </p>
          </div>
        `,
      })
    }

    // Always return success to prevent email enumeration
    return NextResponse.json({
      message: 'If an account with that email exists, we sent a password reset link.',
    })
  } catch (error) {
    console.error('[FORGOT-PASSWORD] Error:', error)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
