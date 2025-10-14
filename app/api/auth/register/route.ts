import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { createClient } from '@supabase/supabase-js'
import { authRateLimit } from '@/lib/rate-limit'
import { sanitizeEmail, sanitizeUserName, validatePassword } from '@/lib/sanitize'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(request: NextRequest) {
  try {
    // Check rate limit
    const rateLimitResult = await authRateLimit.check(request);
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { error: 'Too many registration attempts. Please try again later.' },
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

    const { email, name, password, bannerConfig } = await request.json()

    // Sanitize and validate input
    const sanitizedEmail = sanitizeEmail(email);
    const sanitizedName = name ? sanitizeUserName(name) : '';
    const passwordValidation = validatePassword(password);

    if (!sanitizedEmail) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      )
    }

    if (!passwordValidation.valid) {
      return NextResponse.json(
        { error: passwordValidation.errors.join('. ') },
        { status: 400 }
      )
    }

    // Check if user already exists
    const { data: existingUser, error: checkError } = await supabase
      .from('User')
      .select('id')
      .eq('email', sanitizedEmail)
      .single()

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Generate a secure ID
    const userId = crypto.randomUUID()

    // Create user
    const { data: user, error: insertError } = await supabase
      .from('User')
      .insert({
        id: userId,
        email: sanitizedEmail,
        name: sanitizedName || null,
        password: hashedPassword,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
      .select('id, email, name, createdAt')
      .single()

    if (insertError) {
      console.error('Insert error:', insertError)
      return NextResponse.json(
        { error: 'Failed to create account. Please try again.' },
        { status: 500 }
      )
    }

    // Create banner if bannerConfig is provided
    if (bannerConfig) {
      try {
        const bannerId = crypto.randomUUID()
        // Convert demo script format to dashboard format
        const trackingScripts = (bannerConfig.trackingScripts || []).map(script => ({
          ...script,
          category: 'tracking-performance',
          enabled: true
        }))
        
        const advertisingScripts = (bannerConfig.advertisingScripts || []).map(script => ({
          ...script,
          category: 'targeting-advertising',
          enabled: true
        }))

        const bannerConfigJson = {
          theme: bannerConfig.theme || 'modern',
          position: bannerConfig.position || 'bottom',
          language: bannerConfig.language || 'en',
          title: bannerConfig.title || 'We use cookies',
          message: bannerConfig.message || 'This website uses cookies to enhance your experience.',
          acceptText: bannerConfig.accept || 'Accept',
          rejectText: bannerConfig.reject || 'Decline',
          scripts: {
            strictlyNecessary: [],
            functionality: [],
            trackingPerformance: trackingScripts,
            targetingAdvertising: advertisingScripts
          }
        }

        const { error: bannerError } = await supabase
          .from('ConsentBanner')
          .insert({
            id: bannerId,
            userId: user.id,
            name: `${bannerConfig.website || 'My Website'} Cookie Banner`,
            config: bannerConfigJson,
            isActive: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          })

        if (bannerError) {
          console.error('Banner creation error:', bannerError)
        } else {
          console.log('✅ Banner created successfully for user:', user.id)
        }
      } catch (error) {
        console.error('Banner creation error:', error)
        // Don't fail the registration if banner creation fails
      }
    }

    return NextResponse.json({
      success: true,
      user,
      message: 'Account created successfully'
    })

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
