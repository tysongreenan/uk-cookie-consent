import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// GET /api/debug/schema - Debug database schema (only for authenticated users)
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const debugInfo: {
      user: {
        id: string
        email: string | null | undefined
      }
      tables: { [key: string]: any }
      userProjects?: any
    } = {
      user: {
        id: session.user.id,
        email: session.user.email
      },
      tables: {}
    }

    // Check what tables exist and their structure
    const tables = ['User', 'Project', 'ConsentBanner']
    
    for (const tableName of tables) {
      try {
        // Try to get a sample record to see the structure
        const { data, error } = await supabase
          .from(tableName)
          .select('*')
          .limit(1)

        debugInfo.tables[tableName] = {
          exists: !error,
          error: error?.message,
          sampleData: data?.[0] || null
        }
      } catch (err) {
        debugInfo.tables[tableName] = {
          exists: false,
          error: err instanceof Error ? err.message : 'Unknown error'
        }
      }
    }

    // Try to get user's projects
    try {
      const { data: projects, error: projectError } = await supabase
        .from('Project')
        .select('*')
        .eq('userId', session.user.id)

      debugInfo.userProjects = {
        data: projects,
        error: projectError?.message
      }
    } catch (err) {
      debugInfo.userProjects = {
        error: err instanceof Error ? err.message : 'Unknown error'
      }
    }

    // Try to get user's banners
    try {
      const { data: banners, error: bannerError } = await supabase
        .from('ConsentBanner')
        .select('*')

      debugInfo.allBanners = {
        count: banners?.length || 0,
        data: banners?.slice(0, 2) || [], // First 2 banners as samples
        error: bannerError?.message
      }
    } catch (err) {
      debugInfo.allBanners = {
        error: err instanceof Error ? err.message : 'Unknown error'
      }
    }

    return NextResponse.json(debugInfo)

  } catch (error) {
    console.error('Debug schema error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
