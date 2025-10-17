import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { createClient } from '@supabase/supabase-js'
import { authRateLimit } from '@/lib/rate-limit'
import { sanitizeEmail } from '@/lib/sanitize'
import { logLoginAttempt, logAccountLockout, securityMonitor } from '@/lib/security-monitor'
import jwt from 'jsonwebtoken'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(request: NextRequest) {
  try {
    // Get client IP and user agent for security monitoring
    const forwarded = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const cfConnectingIp = request.headers.get('cf-connecting-ip');
    const ip = forwarded?.split(',')[0] || realIp || cfConnectingIp || 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Check rate limit
    const rateLimitResult = await authRateLimit.check(request);
    if (!rateLimitResult.allowed) {
      // Log suspicious activity
      securityMonitor.logEvent({
        type: 'suspicious_activity',
        ip,
        userAgent,
        details: { reason: 'rate_limit_exceeded' },
        severity: 'medium'
      });

      return NextResponse.json(
        { error: 'Too many login attempts. Please try again later.' },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': '5',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': rateLimitResult.resetTime.toString(),
            'Retry-After': Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000).toString(),
          }
        }
      );
    }

    const { email, password } = await request.json()

    // Sanitize input
    const sanitizedEmail = sanitizeEmail(email);

    if (!sanitizedEmail) {
      logLoginAttempt(email || 'invalid', ip, userAgent, false);
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      )
    }

    if (!password) {
      logLoginAttempt(sanitizedEmail, ip, userAgent, false);
      return NextResponse.json(
        { error: 'Password is required' },
        { status: 400 }
      )
    }

    // Get user from database
    const { data: user, error } = await supabase
      .from('User')
      .select('id, email, name, password')
      .eq('email', sanitizedEmail)
      .single()

    if (error || !user) {
      logLoginAttempt(sanitizedEmail, ip, userAgent, false);
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Check for suspicious activity before processing
    if (securityMonitor.detectSuspiciousActivity(ip, sanitizedEmail)) {
      logAccountLockout(sanitizedEmail, ip, userAgent, 'suspicious_activity_detected');
      return NextResponse.json(
        { error: 'Account temporarily locked due to suspicious activity. Please try again later.' },
        { status: 423 }
      )
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      logLoginAttempt(sanitizedEmail, ip, userAgent, false);
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user.id,
        email: user.email,
        name: user.name 
      },
      process.env.NEXTAUTH_SECRET!,
      { expiresIn: '24h' }
    )

    // Log successful login
    logLoginAttempt(sanitizedEmail, ip, userAgent, true);

    // Return user data and token (without password)
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      },
      token,
      message: 'Login successful'
    })

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
