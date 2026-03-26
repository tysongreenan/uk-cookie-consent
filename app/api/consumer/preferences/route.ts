import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createClient } from '@supabase/supabase-js'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  )
}

const DEFAULT_PREFERENCES = {
  strictlyNecessary: 'accept',
  functionality: 'accept',
  analytics: 'reject',
  marketing: 'reject',
}

// GET /api/consumer/preferences — Get current preferences
export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = getSupabase()
  const { data } = await supabase
    .from('consumer_preferences')
    .select('*')
    .eq('user_id', session.user.id)
    .single()

  if (!data) {
    return NextResponse.json({
      preferences: DEFAULT_PREFERENCES,
      defaultAction: 'reject_all',
      autoApply: true,
      showNotification: false,
    })
  }

  return NextResponse.json({
    preferences: data.preferences,
    defaultAction: data.default_action,
    autoApply: data.auto_apply,
    showNotification: data.show_notification,
    updatedAt: data.updated_at,
  })
}

// PUT /api/consumer/preferences — Update preferences
export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const { preferences, defaultAction, autoApply, showNotification } = body

  if (!preferences || typeof preferences !== 'object') {
    return NextResponse.json({ error: 'Invalid preferences' }, { status: 400 })
  }

  const validActions = ['accept_all', 'reject_all', 'accept_essential', 'custom']
  if (defaultAction && !validActions.includes(defaultAction)) {
    return NextResponse.json({ error: 'Invalid defaultAction' }, { status: 400 })
  }

  const supabase = getSupabase()

  // Upsert preferences
  const { data, error } = await supabase
    .from('consumer_preferences')
    .upsert({
      user_id: session.user.id,
      preferences: {
        strictlyNecessary: 'accept', // Always accept — immutable
        functionality: preferences.functionality === 'accept' ? 'accept' : 'reject',
        analytics: preferences.analytics === 'accept' ? 'accept' : 'reject',
        marketing: preferences.marketing === 'accept' ? 'accept' : 'reject',
      },
      default_action: defaultAction || 'custom',
      auto_apply: autoApply !== false,
      show_notification: showNotification === true,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'user_id' })
    .select()
    .single()

  if (error) {
    console.error('[CONSUMER] Preferences upsert failed:', error)
    return NextResponse.json({ error: 'Failed to save preferences' }, { status: 500 })
  }

  // Activate consumer features if this is the user's first time
  await supabase
    .from('User')
    .update({ userType: 'both', updatedAt: new Date().toISOString() })
    .eq('id', session.user.id)
    .in('userType', ['business']) // Only upgrade business → both, don't downgrade

  return NextResponse.json({
    preferences: data.preferences,
    defaultAction: data.default_action,
    autoApply: data.auto_apply,
    showNotification: data.show_notification,
    updatedAt: data.updated_at,
  })
}
