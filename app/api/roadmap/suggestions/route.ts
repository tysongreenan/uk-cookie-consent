import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  (process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co"),
  (process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || "placeholder-key")
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
      .select('*')
      .eq('userId', session.user.id)
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
      // Return more detailed error message
      const errorMessage = error.message || error.details || 'Failed to create suggestion'
      const errorCode = error.code || 'UNKNOWN'
      
      // Check if table doesn't exist
      if (error.message?.includes('relation') && error.message?.includes('does not exist')) {
        return NextResponse.json({ 
          error: 'Database table not found. Please ensure the FeatureSuggestion table exists in your database.',
          details: error.message,
          code: 'TABLE_NOT_FOUND'
        }, { status: 500 })
      }
      
      // Check for permission issues
      if (error.code === '42501' || error.message?.includes('permission')) {
        return NextResponse.json({ 
          error: 'Permission denied. Please check database permissions.',
          details: error.message,
          code: 'PERMISSION_DENIED'
        }, { status: 500 })
      }
      
      return NextResponse.json({ 
        error: errorMessage,
        details: error.details || error.hint || '',
        code: errorCode
      }, { status: 500 })
    }

    return NextResponse.json({ suggestion })

  } catch (error) {
    console.error('Create suggestion error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
