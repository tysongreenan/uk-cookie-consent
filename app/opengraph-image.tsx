import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Cookie Banner Generator — Free & GDPR Compliant'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a2a2e 50%, #0e768b 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 80px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Logo mark */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #2d5660, #0e768b)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              color: 'white',
              fontWeight: 700,
            }}
          >
            CB
          </div>
          <span style={{ color: '#94a3b8', fontSize: '24px', letterSpacing: '0.05em' }}>
            cookie-banner.ca
          </span>
        </div>

        {/* Main title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <h1
            style={{
              fontSize: '64px',
              fontWeight: 800,
              color: 'white',
              textAlign: 'center',
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            Cookie Banner Generator
          </h1>
          <p
            style={{
              fontSize: '32px',
              color: '#0e768b',
              fontWeight: 600,
              margin: 0,
            }}
          >
            Start Free
          </p>
        </div>

        {/* Compliance badges */}
        <div
          style={{
            display: 'flex',
            gap: '16px',
            marginTop: '40px',
          }}
        >
          {['GDPR', 'PIPEDA', 'CCPA', 'Law 25'].map((law) => (
            <div
              key={law}
              style={{
                padding: '10px 24px',
                borderRadius: '999px',
                border: '1px solid rgba(14, 118, 139, 0.4)',
                background: 'rgba(14, 118, 139, 0.15)',
                color: '#7dd3e8',
                fontSize: '20px',
                fontWeight: 600,
              }}
            >
              {law}
            </div>
          ))}
        </div>

        {/* Tagline */}
        <p
          style={{
            color: '#64748b',
            fontSize: '20px',
            marginTop: '32px',
            textAlign: 'center',
          }}
        >
          Works on WordPress, Shopify, Webflow & any site — No coding needed
        </p>
      </div>
    ),
    { ...size }
  )
}
