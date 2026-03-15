import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createClient } from '@supabase/supabase-js'
import { canAccessFeature } from '@/lib/plan-restrictions'
import type { PlanTier } from '@/lib/plan-restrictions'
import path from 'path'

const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/gif', 'image/webp']
const MAX_SIZE = 2 * 1024 * 1024 // 2MB

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const userTier = ((session.user as any).planTier || 'free') as PlanTier
  if (!canAccessFeature(userTier, 'hasImageUpload')) {
    return NextResponse.json(
      { error: 'Image upload requires a Pro plan.' },
      { status: 403 }
    )
  }

  const formData = await request.formData()
  const file = formData.get('file') as File | null
  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: 'Invalid file type. Allowed: PNG, JPEG, GIF, WebP.' }, { status: 400 })
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: 'File too large (max 2MB)' }, { status: 400 })
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const safeExt = path.extname(file.name).replace(/[^a-zA-Z0-9.]/g, '') || '.bin'
  const filePath = `${session.user.id}/${Date.now()}${safeExt}`

  const buffer = Buffer.from(await file.arrayBuffer())
  const { data, error } = await supabase.storage
    .from('logos')
    .upload(filePath, buffer, {
      contentType: file.type,
      upsert: false,
    })

  if (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }

  const { data: { publicUrl } } = supabase.storage
    .from('logos')
    .getPublicUrl(data.path)

  return NextResponse.json({ url: publicUrl })
}
