import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  (process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co"),
  (process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || "placeholder-key")
)

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id

    // Delete all user's banners first
    const { error: bannersError } = await supabase
      .from('ConsentBanner')
      .delete()
      .eq('userId', userId)

    if (bannersError) {
      console.error('Error deleting banners:', bannersError)
      return NextResponse.json({ error: 'Failed to delete banners' }, { status: 500 })
    }

    // Delete all user's projects
    const { error: projectsError } = await supabase
      .from('Project')
      .delete()
      .eq('userId', userId)

    if (projectsError) {
      console.error('Error deleting projects:', projectsError)
      return NextResponse.json({ error: 'Failed to delete projects' }, { status: 500 })
    }

    // Delete all user's logos
    const { error: logosError } = await supabase
      .from('UserLogo')
      .delete()
      .eq('userId', userId)

    if (logosError) {
      console.error('Error deleting logos:', logosError)
      return NextResponse.json({ error: 'Failed to delete logos' }, { status: 500 })
    }

    // Finally, delete the user account
    const { error: userError } = await supabase
      .from('User')
      .delete()
      .eq('id', userId)

    if (userError) {
      console.error('Error deleting user:', userError)
      return NextResponse.json({ error: 'Failed to delete user account' }, { status: 500 })
    }

    return NextResponse.json({ 
      message: 'Account and all associated data deleted successfully' 
    })

  } catch (error) {
    console.error('Error in delete account:', error)
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 })
  }
}
