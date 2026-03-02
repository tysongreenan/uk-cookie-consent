import { NextRequest, NextResponse } from 'next/server'

function isDevelopment() {
  return process.env.NODE_ENV !== 'production'
}

export async function GET(request: NextRequest) {
  // Development only - return 404 in production
  if (!isDevelopment()) {
    return NextResponse.json(
      { error: 'Not found' },
      { status: 404 }
    )
  }

  return NextResponse.json({
    message: 'Simple API is working!',
    timestamp: new Date().toISOString()
  })
}

export async function POST(request: NextRequest) {
  // Development only - return 404 in production
  if (!isDevelopment()) {
    return NextResponse.json(
      { error: 'Not found' },
      { status: 404 }
    )
  }

  const data = await request.json()
  return NextResponse.json({
    message: 'Simple API POST is working!',
    received: data,
    timestamp: new Date().toISOString()
  })
}
