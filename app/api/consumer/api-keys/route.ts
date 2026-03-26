import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createClient } from '@supabase/supabase-js'
import { generateApiKey } from '@/lib/consumer-auth'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  )
}

// GET /api/consumer/api-keys — List API keys (prefix + metadata only, never the hash)
export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = getSupabase()
  const { data, error } = await supabase
    .from('consumer_api_keys')
    .select('id, name, prefix, last_used_at, expires_at, revoked_at, created_at')
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('[CONSUMER] API keys fetch failed:', error)
    return NextResponse.json({ error: 'Failed to fetch API keys' }, { status: 500 })
  }

  return NextResponse.json({ keys: data || [] })
}

// POST /api/consumer/api-keys — Generate a new API key
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json().catch(() => ({}))
  const name = (typeof body.name === 'string' && body.name.trim()) || 'Chrome Extension'

  const supabase = getSupabase()

  // Check active key count (max 3 per user)
  const { count } = await supabase
    .from('consumer_api_keys')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', session.user.id)
    .is('revoked_at', null)

  if (count !== null && count >= 3) {
    return NextResponse.json(
      { error: 'max_keys', message: 'Maximum of 3 active API keys. Revoke an existing key first.' },
      { status: 400 }
    )
  }

  // Generate key
  const { raw, prefix, hash } = generateApiKey()

  const { error } = await supabase
    .from('consumer_api_keys')
    .insert({
      user_id: session.user.id,
      name: name.slice(0, 50),
      prefix,
      key_hash: hash,
    })

  if (error) {
    console.error('[CONSUMER] API key insert failed:', error)
    return NextResponse.json({ error: 'Failed to create API key' }, { status: 500 })
  }

  // Activate consumer features if this is the user's first time
  await supabase
    .from('User')
    .update({ userType: 'both', updatedAt: new Date().toISOString() })
    .eq('id', session.user.id)
    .in('userType', ['business'])

  // Return raw key — THIS IS THE ONLY TIME IT'S SHOWN
  return NextResponse.json({
    key: raw,
    prefix,
    name,
    message: 'Save this key now. It will not be shown again.',
  })
}

// DELETE /api/consumer/api-keys — Revoke a key
export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const keyId = searchParams.get('id')

  if (!keyId) {
    return NextResponse.json({ error: 'Missing key ID' }, { status: 400 })
  }

  const supabase = getSupabase()
  const { error } = await supabase
    .from('consumer_api_keys')
    .update({ revoked_at: new Date().toISOString() })
    .eq('id', keyId)
    .eq('user_id', session.user.id) // Ensure user owns this key
    .is('revoked_at', null)

  if (error) {
    console.error('[CONSUMER] API key revoke failed:', error)
    return NextResponse.json({ error: 'Failed to revoke key' }, { status: 500 })
  }

  return NextResponse.json({ revoked: true })
}
