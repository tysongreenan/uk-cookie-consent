/**
 * @vitest-environment jsdom
 *
 * Regression for React minified error #310 ("Rendered more hooks than during
 * the previous render"). UpdateAnnouncement lives in the root layout, so it
 * stays mounted across client navigations. It used to return early on
 * /tools/cookie-scanner before useEffect; leaving that page (Pricing, Sign up,
 * home) then called an extra hook and crashed the tree.
 */
import { afterEach, describe, expect, it, vi } from 'vitest'

globalThis.IS_REACT_ACT_ENVIRONMENT = true
import { createElement, type ReactNode } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { act } from 'react-dom/test-utils'

const pathState = vi.hoisted(() => ({ current: '/tools/cookie-scanner' }))

vi.mock('next/navigation', () => ({
  usePathname: () => pathState.current,
}))

vi.mock('next/link', () => ({
  default: ({ children }: { children?: ReactNode }) => children ?? null,
}))

vi.mock('framer-motion', () => {
  const React = require('react') as typeof import('react')
  const stub = ({ children }: { children?: ReactNode }) =>
    React.createElement('div', null, children)
  return {
    AnimatePresence: ({ children }: { children?: ReactNode }) => children ?? null,
    motion: new Proxy(
      {},
      {
        get: () => stub,
      }
    ),
  }
})

vi.mock('@/lib/announcement-context', () => ({
  useAnnouncement: () => ({
    isVisible: true,
    setIsVisible: () => {},
  }),
}))

import { UpdateAnnouncement } from '@/components/landing/update-announcement'

const BANNER_TEXT = 'Major Update: v2.0.1 is Here!'

describe('UpdateAnnouncement hook order across scanner navigation', () => {
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
    vi.useRealTimers()
  })

  async function mountAt(path: string) {
    vi.useFakeTimers()
    pathState.current = path
    container = document.createElement('div')
    document.body.appendChild(container)
    root = createRoot(container)
    await act(async () => {
      root?.render(createElement(UpdateAnnouncement))
    })
  }

  async function navigateTo(path: string) {
    pathState.current = path
    await act(async () => {
      root?.render(createElement(UpdateAnnouncement))
    })
  }

  it('keeps a stable hook count from the scanner to Pricing, Sign up, and home', async () => {
    const errors: string[] = []
    const spy = vi.spyOn(console, 'error').mockImplementation((...args: unknown[]) => {
      errors.push(args.map(String).join(' '))
    })

    await mountAt('/tools/cookie-scanner')
    expect(container?.textContent).not.toContain(BANNER_TEXT)

    await navigateTo('/pricing')
    expect(container?.textContent).toContain(BANNER_TEXT)

    await navigateTo('/auth/signup')
    expect(container?.textContent).toContain(BANNER_TEXT)

    await navigateTo('/')
    expect(container?.textContent).toContain(BANNER_TEXT)

    await navigateTo('/tools/cookie-scanner')
    expect(container?.textContent).not.toContain(BANNER_TEXT)

    spy.mockRestore()
    const logged = errors.join('\n')
    expect(logged).not.toMatch(/Rendered more hooks than during the previous render/)
    expect(logged).not.toMatch(/Minified React error #310/)
  })
})
