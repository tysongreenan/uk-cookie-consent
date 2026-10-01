/**
 * @vitest-environment jsdom
 *
 * App error boundaries catch React render crashes before they become window
 * errors, so PostHog exception autocapture never records them. These tests
 * lock in an explicit captureException call.
 */
import { afterEach, describe, expect, it, vi } from 'vitest'

globalThis.IS_REACT_ACT_ENVIRONMENT = true
import { createElement, type ReactElement } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { act } from 'react-dom/test-utils'

const captureException = vi.hoisted(() => vi.fn())
const sentryCapture = vi.hoisted(() => vi.fn())

vi.mock('@/lib/analytics', () => ({
  captureException,
}))

vi.mock('@sentry/nextjs', () => ({
  captureException: sentryCapture,
}))

vi.mock('next/error', () => ({
  default: function NextError() {
    return null
  },
}))

import RouteError from '@/app/error'
import GlobalError from '@/app/global-error'
import { AnnouncementErrorBoundary } from '@/components/landing/announcement-error-boundary'

function Boom(): never {
  throw new Error('announcement render failed')
}

describe('client error boundaries report to PostHog', () => {
  let root: Root | undefined
  let container: HTMLDivElement | undefined

  afterEach(() => {
    if (root) {
      act(() => {
        root?.unmount()
      })
    }
    container?.remove()
    root = undefined
    container = undefined
    captureException.mockClear()
    sentryCapture.mockClear()
  })

  async function render(node: ReactElement) {
    container = document.createElement('div')
    document.body.appendChild(container)
    root = createRoot(container)
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})
    await act(async () => {
      root?.render(node)
    })
    consoleError.mockRestore()
  }

  it('reports route errors from app/error.tsx', async () => {
    const error = Object.assign(new Error('route crashed'), { digest: 'digest-1' })

    await render(createElement(RouteError, { error, reset: () => {} }))

    expect(sentryCapture).toHaveBeenCalledWith(error)
    expect(captureException).toHaveBeenCalledWith(error, {
      context: 'app_error_boundary',
      digest: 'digest-1',
    })
  })

  it('reports root crashes from app/global-error.tsx', async () => {
    const error = new Error('root crashed')

    await render(createElement(GlobalError, { error }))

    expect(sentryCapture).toHaveBeenCalledWith(error)
    expect(captureException).toHaveBeenCalledWith(error, {
      context: 'global_error_boundary',
    })
  })

  it('reports announcement crashes that the boundary otherwise swallows', async () => {
    await render(
      createElement(AnnouncementErrorBoundary, null, createElement(Boom))
    )

    expect(container?.textContent).toBe('')
    expect(captureException).toHaveBeenCalledWith(expect.any(Error), {
      context: 'announcement_error_boundary',
    })
    expect((captureException.mock.calls[0]?.[0] as Error).message).toBe(
      'announcement render failed'
    )
  })
})
