import { NextRequest, NextResponse } from 'next/server'
import { requireConsumerApiKey, CORS_HEADERS } from '@/lib/consumer-auth'

// GET /api/v1/consumer/ping — Health check + tier verification
export async function GET(request: NextRequest) {
  const auth = await requireConsumerApiKey(request)
  if (auth instanceof NextResponse) return auth

  return NextResponse.json(
    {
      status: 'ok',
      tier: auth.consumerTier,
      serverTime: new Date().toISOString(),
    },
    { headers: CORS_HEADERS }
  )
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS })
}
