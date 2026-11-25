/**
 * @vitest-environment jsdom
 */
import { afterEach, describe, expect, it, vi } from 'vitest'

;(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true
import { createElement, type ReactElement } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { act } from 'react-dom/test-utils'
import { InstallStepCallout } from '@/components/banner/install-step-prompt'

describe('InstallStepCallout', () => {
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
  })

  async function render(node: ReactElement) {
    container = document.createElement('div')
    document.body.appendChild(container)
    root = createRoot(container)
    await act(async () => {
      root?.render(node)
    })
  }

  it('shows the hosted snippet and a copy button that uses the existing copy action', async () => {
    const onCopy = vi.fn()
    const onShowInstallStep = vi.fn()
    await render(
      createElement(InstallStepCallout, {
        snippet: '<script src="https://cookie-banner.ca/api/v1/banner.js?id=abc" async></script>',
        copied: false,
        onCopy,
        onShowInstallStep,
      }),
    )

    expect(container?.textContent).toContain('banner.js?id=abc')
    expect(container?.textContent).toContain('<head>')
    const copyButton = Array.from(container?.querySelectorAll('button') ?? []).find((button) =>
      button.textContent?.includes('Copy install snippet'),
    )
    expect(copyButton).toBeTruthy()
    await act(async () => {
      copyButton?.click()
    })
    expect(onCopy).toHaveBeenCalledTimes(1)

    const tips = Array.from(container?.querySelectorAll('button') ?? []).find((button) =>
      button.textContent?.includes('Where to paste it'),
    )
    await act(async () => {
      tips?.click()
    })
    expect(onShowInstallStep).toHaveBeenCalledTimes(1)
  })
})
