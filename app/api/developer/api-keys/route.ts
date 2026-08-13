import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createClient } from '@supabase/supabase-js'
import { generateDeveloperApiKey } from '@/lib/developer-auth'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  )
}

// GET /api/developer/api-keys — list keys (never return hash)
export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = getSupabase()
  const { data, error } = await supabase
    .from('developer_api_keys')
    .select('id, name, prefix, last_used_at, expires_at, revoked_at, created_at')
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('[DEVELOPER] API keys fetch failed:', error)
    return NextResponse.json({ error: 'Failed to fetch API keys' }, { status: 500 })
  }

  return NextResponse.json({ keys: data || [] })
}

// POST /api/developer/api-keys — create key (raw shown once)
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json().catch(() => ({}))
  const name =
    (typeof body.name === 'string' && body.name.trim()) || 'MCP Server'

  const supabase = getSupabase()

  const { count } = await supabase
    .from('developer_api_keys')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', session.user.id)
    .is('revoked_at', null)

  if (count !== null && count >= 5) {
    return NextResponse.json(
      {
        error: 'max_keys',
        message: 'Maximum of 5 active developer API keys. Revoke one first.',
      },
      { status: 400 }
    )
  }

  const { raw, prefix, hash } = generateDeveloperApiKey()

  const { error } = await supabase.from('developer_api_keys').insert({
    user_id: session.user.id,
    name: name.slice(0, 80),
    prefix,
    key_hash: hash,
  })

  if (error) {
    console.error('[DEVELOPER] API key insert failed:', error)
    return NextResponse.json({ error: 'Failed to create API key' }, { status: 500 })
  }

  return NextResponse.json({
    key: raw,
    prefix,
    name,
    message:
      'Save this key now — it will not be shown again. Use it as COOKIE_BANNER_API_KEY for the MCP server.',
  })
}

// DELETE /api/developer/api-keys — revoke by id
export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json().catch(() => ({}))
  const id = typeof body.id === 'string' ? body.id : null
  if (!id) {
    return NextResponse.json({ error: 'id is required' }, { status: 400 })
  }

  const supabase = getSupabase()
  const { error } = await supabase
    .from('developer_api_keys')
    .update({ revoked_at: new Date().toISOString() })
    .eq('id', id)
    .eq('user_id', session.user.id)
    .is('revoked_at', null)

  if (error) {
    console.error('[DEVELOPER] API key revoke failed:', error)
    return NextResponse.json({ error: 'Failed to revoke API key' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
