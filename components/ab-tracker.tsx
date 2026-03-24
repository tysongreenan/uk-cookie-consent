'use client'

import { useEffect } from 'react'

/**
 * Fires a server-side A/B test pageview event.
 * No cookies, no consent required — fully privacy-safe.
 */
export function ABTracker({ experiment, variant }: { experiment: string; variant: string }) {
  useEffect(() => {
    fetch('/api/analytics/ab', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ experiment, variant, event: 'pageview' }),
    }).catch(() => {}) // fire and forget
  }, [experiment, variant])

  return null
}
