import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  (process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co"),
  process.env.SUPABASE_SERVICE_ROLE_KEY || (process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || "placeholder-key")
)

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get banner code using direct SQL to bypass RLS issues
    const { data, error } = await supabase.rpc('get_banner_code_simple', {
      banner_id: params.id,
      user_id: session.user.id
    })

    if (error) {
      console.error('❌ Simple Code: Error fetching banner code:', error)
      return NextResponse.json({ error: 'Failed to fetch banner code' }, { status: 500 })
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ error: 'Banner not found' }, { status: 404 })
    }

    console.log('✅ Simple Code: Banner code fetched successfully:', params.id)
    return NextResponse.json({ 
      code: data[0].code,
      name: data[0].name
    })

  } catch (error) {
    console.error('❌ Simple Code: Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
