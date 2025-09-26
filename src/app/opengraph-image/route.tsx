import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET() {
  const text = 'AutoŻaba — Automatyczna tarcza prawna'
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
          color: '#0f172a',
          fontSize: 60,
          fontWeight: 700,
          padding: '40px',
          textAlign: 'center',
        }}
      >
        {text}
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
