import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title') || 'Cookie Banner Generator'
  const description = searchParams.get('description') || 'PIPEDA, Law 25 & GDPR Compliant'

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '60px 80px',
          backgroundColor: '#ffffff',
          fontFamily: 'system-ui',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: '#0E768C',
              letterSpacing: '-0.02em',
            }}
          >
            cookie-banner.ca
          </div>
          <div
            style={{
              fontSize: 52,
              fontWeight: 700,
              color: '#1a1a1a',
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              maxWidth: '85%',
            }}
          >
            {title}
          </div>
          {description && (
            <div
              style={{
                fontSize: 24,
                color: '#6b6b6b',
                lineHeight: 1.4,
                maxWidth: '75%',
              }}
            >
              {description}
            </div>
          )}
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 60,
            right: 80,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: 16,
            color: '#999',
          }}
        >
          Free Cookie Consent Generator for Canada
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
