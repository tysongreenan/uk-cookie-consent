// GDPR compliance API endpoints
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { 
  handleDataAccessRequest,
  handleDataRectificationRequest,
  handleDataErasureRequest,
  handleDataPortabilityRequest,
  logGDPRRequest
} from '@/lib/gdpr-compliance'
import { SECURITY_HEADERS } from '@/lib/security-validation'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401, headers: SECURITY_HEADERS }
      )
    }

    // Handle data access request
    const result = await handleDataAccessRequest(session.user.id)
    
    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 400, headers: SECURITY_HEADERS }
      )
    }

    // Log the request
    await logGDPRRequest({
      userId: session.user.id,
      requestType: 'access',
      timestamp: new Date()
    })

    return NextResponse.json(
      { success: true, data: result.data },
      { headers: SECURITY_HEADERS }
    )

  } catch (error) {
    console.error('Error in GDPR data access:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: SECURITY_HEADERS }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401, headers: SECURITY_HEADERS }
      )
    }

    const body = await request.json()
    const { updates } = body

    if (!updates || typeof updates !== 'object') {
      return NextResponse.json(
        { error: 'Invalid update data' },
        { status: 400, headers: SECURITY_HEADERS }
      )
    }

    // Handle data rectification request
    const result = await handleDataRectificationRequest(session.user.id, updates)
    
    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 400, headers: SECURITY_HEADERS }
      )
    }

    // Log the request
    await logGDPRRequest({
      userId: session.user.id,
      requestType: 'rectification',
      details: JSON.stringify(updates),
      timestamp: new Date()
    })

    return NextResponse.json(
      { success: true, message: 'Data updated successfully' },
      { headers: SECURITY_HEADERS }
    )

  } catch (error) {
    console.error('Error in GDPR data rectification:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: SECURITY_HEADERS }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401, headers: SECURITY_HEADERS }
      )
    }

    // Handle data erasure request (Right to be forgotten)
    const result = await handleDataErasureRequest(session.user.id)
    
    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 400, headers: SECURITY_HEADERS }
      )
    }

    // Log the request
    await logGDPRRequest({
      userId: session.user.id,
      requestType: 'erasure',
      timestamp: new Date()
    })

    return NextResponse.json(
      { success: true, message: 'Data deleted successfully' },
      { headers: SECURITY_HEADERS }
    )

  } catch (error) {
    console.error('Error in GDPR data erasure:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: SECURITY_HEADERS }
    )
  }
}
