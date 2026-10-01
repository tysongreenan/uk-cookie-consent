'use client'

import * as Sentry from '@sentry/nextjs'
import NextError from 'next/error'
import { useEffect } from 'react'
import { captureException } from '@/lib/analytics'

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string }
}) {
  useEffect(() => {
    Sentry.captureException(error)
    // Replaces the root layout, so this is the last chance to record the crash.
    captureException(error, {
      context: 'global_error_boundary',
      ...(error.digest ? { digest: error.digest } : {}),
    })
  }, [error])

  return (
    <html>
      <body>
        <NextError statusCode={0} />
      </body>
    </html>
  )
}
