import { NextResponse } from 'next/server'

// GPC Support Resource per W3C spec Section 4
// Signals that this platform abides by GPC requests
export async function GET() {
  return NextResponse.json(
    {
      gpc: true,
      lastUpdate: '2026-03-20'
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=86400',
      }
    }
  )
}
