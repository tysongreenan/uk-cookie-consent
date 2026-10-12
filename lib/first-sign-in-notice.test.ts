import { describe, expect, it } from 'vitest'
import { shouldShowFirstSignInNotice } from './first-sign-in-notice'
import { PRODUCT_NEWS } from './product-news'

const news = {
  id: '2026-10-consent-logs',
  title: 'Consent logs',
  body: 'Pro Annual can store the choice a visitor made.',
}

describe('shouldShowFirstSignInNotice', () => {
  it('stays hidden when nothing is new', () => {
    expect(PRODUCT_NEWS).toBeNull()
    expect(
      shouldShowFirstSignInNotice({
        userId: 'user_1',
        news: PRODUCT_NEWS,
        seen: false,
        openThisSession: false,
      })
    ).toBe(false)
  })

  it('stays hidden for a signed-out visitor', () => {
    expect(
      shouldShowFirstSignInNotice({
        userId: null,
        news,
        seen: false,
        openThisSession: false,
      })
    ).toBe(false)
  })

  it('shows once on the first sign-in after real news', () => {
    expect(
      shouldShowFirstSignInNotice({
        userId: 'user_1',
        news,
        seen: false,
        openThisSession: false,
      })
    ).toBe(true)
  })

  it('stays on screen for the rest of that first visit', () => {
    expect(
      shouldShowFirstSignInNotice({
        userId: 'user_1',
        news,
        seen: true,
        openThisSession: true,
      })
    ).toBe(true)
  })

  it('hides on the next sign-in', () => {
    expect(
      shouldShowFirstSignInNotice({
        userId: 'user_1',
        news,
        seen: true,
        openThisSession: false,
      })
    ).toBe(false)
  })
})
