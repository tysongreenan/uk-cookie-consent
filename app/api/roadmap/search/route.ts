import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Use service role key to bypass RLS for consistent reads
function getSupabaseClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
  )
}

export const dynamic = 'force-dynamic'

// GET /api/roadmap/search?q=query - Search existing roadmap items and suggestions
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('q')?.trim()

    if (!query || query.length < 2) {
      return NextResponse.json({
        roadmapItems: [],
        suggestions: [],
        message: 'Query must be at least 2 characters'
      })
    }

    // Sanitize query to prevent PostgREST filter injection
    // Remove characters that have special meaning in PostgREST filters
    const sanitized = query.replace(/[%,().*\\]/g, '').slice(0, 100)
    if (!sanitized) {
      return NextResponse.json({ roadmapItems: [], suggestions: [] })
    }

    const supabase = getSupabaseClient()
    // Search roadmap items (case-insensitive, partial match)
    const { data: roadmapItems, error: roadmapError } = await supabase
      .from('RoadmapItem')
      .select('id, title, description, category, status, priority')
      .or(`title.ilike.%${sanitized}%,description.ilike.%${sanitized}%`)
      .limit(5)

    // Search feature suggestions (case-insensitive, partial match)
    const { data: suggestions, error: suggestionsError } = await supabase
      .from('FeatureSuggestion')
      .select('id, title, description, category, status, votes')
      .or(`title.ilike.%${sanitized}%,description.ilike.%${sanitized}%`)
      .limit(5)

    if (roadmapError) {
      console.error('Error searching roadmap items:', roadmapError)
    }

    if (suggestionsError) {
      console.error('Error searching suggestions:', suggestionsError)
    }

    return NextResponse.json({
      roadmapItems: roadmapItems || [],
      suggestions: suggestions || [],
      query
    })

  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json({ 
      error: 'Internal server error',
      roadmapItems: [],
      suggestions: []
    }, { status: 500 })
  }
}

