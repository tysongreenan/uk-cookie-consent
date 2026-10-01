'use client'

import { Component, type ReactNode } from 'react'
import { captureException } from '@/lib/analytics'

type Props = { children: ReactNode }
type State = { hasError: boolean }

/** Isolates announcement render errors so they cannot white-screen the app. */
export class AnnouncementErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error): void {
    // This boundary returns null, so app/error.tsx never mounts and PostHog
    // autocapture never sees the render crash (e.g. React #310).
    captureException(error, { context: 'announcement_error_boundary' })
  }

  render() {
    if (this.state.hasError) return null
    return this.props.children
  }
}
