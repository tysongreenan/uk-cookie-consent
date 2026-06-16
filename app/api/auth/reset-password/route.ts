import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import crypto from 'crypto'
import bcrypt from 'bcryptjs'
import { passwordResetSubmitRateLimit } from '@/lib/rate-limit'
import { sanitizeEmail, validatePassword } from '@/lib/sanitize'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  )
}

export async function POST(request: NextRequest) {
  try {
    const { token, email, password } = await request.json()

    if (!token || typeof token !== 'string' || token.length > 128) {
      return NextResponse.json({ error: 'Reset token is required' }, { status: 400 })
    }

    const cleanEmail = sanitizeEmail(typeof email === 'string' ? email : '')
    if (!cleanEmail) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 })
    }

    const passwordCheck = validatePassword(password)
    if (!passwordCheck.valid) {
      return NextResponse.json({ error: passwordCheck.errors[0] }, { status: 400 })
    }

    // Rate-limit AFTER input validation so a user's own password typo (400)
    // doesn't consume an attempt. Uses a dedicated bucket so requesting reset
    // emails never blocks the actual submit.
    const rateLimitResult = await passwordResetSubmitRateLimit.check(request)
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    const supabase = getSupabase()

    // Look up user by email, then verify token with timing-safe comparison
    const { data: user, error: userError } = await supabase
      .from('User')
      .select('id, resetToken, resetTokenExpiresAt')
      .eq('email', cleanEmail)
      .single()

    if (userError || !user) {
      return NextResponse.json({ error: 'Invalid or expired reset link' }, { status: 400 })
    }

    // Timing-safe token comparison to prevent timing attacks
    if (!user.resetToken || user.resetToken.length !== token.length) {
      return NextResponse.json({ error: 'Invalid or expired reset link' }, { status: 400 })
    }
    const tokensMatch = crypto.timingSafeEqual(
      Buffer.from(user.resetToken, 'utf-8'),
      Buffer.from(token, 'utf-8')
    )
    if (!tokensMatch) {
      return NextResponse.json({ error: 'Invalid or expired reset link' }, { status: 400 })
    }

    // Check expiry
    if (!user.resetTokenExpiresAt || new Date(user.resetTokenExpiresAt) < new Date()) {
      // Clear expired token
      await supabase
        .from('User')
        .update({ resetToken: null, resetTokenExpiresAt: null })
        .eq('id', user.id)
      return NextResponse.json({ error: 'This reset link has expired. Please request a new one.' }, { status: 400 })
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Update password and clear the token
    const { error: updateError } = await supabase
      .from('User')
      .update({
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiresAt: null,
      })
      .eq('id', user.id)

    if (updateError) {
      console.error('[RESET-PASSWORD] Update failed:', updateError)
      return NextResponse.json({ error: 'Failed to update password' }, { status: 500 })
    }

    return NextResponse.json({ message: 'Password updated successfully' })
  } catch (error) {
    console.error('[RESET-PASSWORD] Error:', error)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
