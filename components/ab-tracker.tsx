'use client'

import { useEffect } from 'react'
import posthog from 'posthog-js'

/**
 * A/B test tracker — sends events to both PostHog and Supabase.
 *
 * PostHog: $experiment_started event with feature flag tracking
 * Supabase: legacy ab_events table (kept for backward compatibility)
 */
export function ABTracker({ experiment, variant }: { experiment: string; variant: string }) {
  useEffect(() => {
    // PostHog A/B test tracking (only if user has consented to analytics)
    if (process.env.NEXT_PUBLIC_POSTHOG_KEY && posthog.has_opted_in_capturing()) {
      posthog.capture('$experiment_started', {
        experiment,
        variant,
        $feature_flag: experiment,
        $feature_flag_response: variant,
      })
    }

    // Legacy Supabase tracking (fire and forget)
    fetch('/api/analytics/ab', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ experiment, variant, event: 'pageview' }),
    }).catch(() => {})
  }, [experiment, variant])

  return null
}
