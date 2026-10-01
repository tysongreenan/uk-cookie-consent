import { beforeEach, describe, expect, it, vi } from 'vitest'

import type { HeadlessScanResult } from '../scan-website-headless'
import { INCOMPLETE_SCAN_MESSAGE } from '../scan-completion'

vi.mock('../scan-website-headless', () => ({
  scanWithBrowser: vi.fn(),
}))

import { isIncompleteScan, scanWebsite } from '../scan-website'
import { scanWithBrowser } from '../scan-website-headless'

const scanWithBrowserMock = vi.mocked(scanWithBrowser)

function headless(overrides: Partial<HeadlessScanResult> = {}): HeadlessScanResult {
  return {
    cookies: [],
    loadedScripts: [],
    thirdPartyRequests: [],
    consentBanner: { detected: false, vendor: null },
    consentAccepted: { vendor: null, attempted: false },
    privacyPolicyUrl: null,
    frenchLanguage: { available: false, signals: [] },
    finalUrl: 'https://example.com/',
    ourBannerId: null,
    httpStatus: 200,
    pageTitle: 'Example',
    visibleTextLength: 2400,
    ...overrides,
  }
}

describe('scanWebsite incomplete loads', () => {
  beforeEach(() => {
    scanWithBrowserMock.mockReset()
  })

  it('does not grade an Access Denied document', async () => {
    scanWithBrowserMock.mockResolvedValue(headless({
      httpStatus: 403,
      pageTitle: 'Access Denied',
      visibleTextLength: 180,
      finalUrl: 'https://www.restoreuk.org.uk/',
    }))

    const result = await scanWebsite('https://restoreuk.org.uk')

    expect(isIncompleteScan(result)).toBe(true)
    if (!isIncompleteScan(result)) return
    expect(result.reason).toBe('blocked')
    expect(result.message).toBe(INCOMPLETE_SCAN_MESSAGE)
    expect(result).not.toHaveProperty('overallGrade')
  })

  it('does not grade a browser failure or a page that is too small to judge', async () => {
    scanWithBrowserMock.mockRejectedValue(new Error('page.goto: net::ERR_CONNECTION_RESET'))
    const dropped = await scanWebsite('https://ukfinance.org.uk')
    expect(isIncompleteScan(dropped) && dropped.reason).toBe('unreachable')

    scanWithBrowserMock.mockRejectedValue(new Error("browserType.launch: Executable doesn't exist"))
    const crashed = await scanWebsite('https://jmlsg.org.uk')
    expect(isIncompleteScan(crashed) && crashed.reason).toBe('browser_failed')

    scanWithBrowserMock.mockResolvedValue(headless({
      pageTitle: '',
      visibleTextLength: 8,
    }))
    const empty = await scanWebsite('https://example.com')
    expect(isIncompleteScan(empty) && empty.reason).toBe('empty')
  })

  it('grades a loaded page, including one with nothing to consent to, and repeats that grade', async () => {
    const loaded = headless({
      pageTitle: 'A real site with no trackers',
      visibleTextLength: 2200,
    })
    scanWithBrowserMock.mockResolvedValue(loaded)

    const first = await scanWebsite('https://example.com')
    const second = await scanWebsite('https://example.com')

    expect(isIncompleteScan(first)).toBe(false)
    expect(isIncompleteScan(second)).toBe(false)
    if (isIncompleteScan(first) || isIncompleteScan(second)) return
    expect(first.overallGrade).toBe('D')
    expect(first.overallScore).toBe(64)
    expect(first.cookies).toHaveLength(0)
    expect(second.overallGrade).toBe(first.overallGrade)
    expect(second.overallScore).toBe(first.overallScore)
  })
})
