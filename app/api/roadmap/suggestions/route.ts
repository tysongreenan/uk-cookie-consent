import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// GET /api/roadmap/suggestions - Get feature suggestions
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: suggestions, error } = await supabase
      .from('FeatureSuggestion')
      .select(`
        *,
        SuggestionVote!inner(count)
      `)
      .order('votes', { ascending: false })
      .order('createdAt', { ascending: false })

    if (error) {
      console.error('Error fetching suggestions:', error)
      return NextResponse.json({ error: 'Failed to fetch suggestions' }, { status: 500 })
    }

    return NextResponse.json({ suggestions })

  } catch (error) {
    console.error('Get suggestions error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/roadmap/suggestions - Submit a feature suggestion
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { title, description, category } = await request.json()

    if (!title || !description) {
      return NextResponse.json({ error: 'Title and description are required' }, { status: 400 })
    }

    const { data: suggestion, error } = await supabase
      .from('FeatureSuggestion')
      .insert({
        userId: session.user.id,
        title: title.trim(),
        description: description.trim(),
        category: category?.trim() || null,
        status: 'pending'
      })
      .select('*')
      .single()

    if (error) {
      console.error('Error creating suggestion:', error)
      return NextResponse.json({ error: 'Failed to create suggestion' }, { status: 500 })
    }

    return NextResponse.json({ suggestion })

  } catch (error) {
    console.error('Create suggestion error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
