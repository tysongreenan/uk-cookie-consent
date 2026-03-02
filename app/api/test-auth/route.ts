import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(request: NextRequest) {
  // Development only - return 404 in production
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { error: 'Not found' },
      { status: 404 }
    )
  }

  try {
    const session = await getServerSession(authOptions)

    return NextResponse.json({
      success: true,
      session: session ? {
        user: session.user,
        expires: session.expires
      } : null,
      message: session ? 'User is authenticated' : 'No active session'
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
