import { describe, expect, it } from 'vitest'
import { isGonePath } from './gone-paths'

describe('isGonePath', () => {
  it('returns 410 for the unpublished writing guide and empty core web vitals post', () => {
    expect(isGonePath('/blog/BLOG_WRITING_GUIDE')).toBe(true)
    expect(isGonePath('/blog/blog_writing_guide')).toBe(true)
    expect(isGonePath('/blog/BLOG_WRITING_GUIDE/')).toBe(true)
    expect(isGonePath('/blog/core-web-vitals-cookie-consent')).toBe(true)
  })

  it('returns 410 for malformed /& and /$ crawls', () => {
    expect(isGonePath('/&')).toBe(true)
    expect(isGonePath('/$')).toBe(true)
    expect(isGonePath('/%26')).toBe(true)
  })

  it('leaves real pages alone', () => {
    expect(isGonePath('/')).toBe(false)
    expect(isGonePath('/blog/cookie-consent-canada-guide-2026')).toBe(false)
    expect(isGonePath('/privacy-policy')).toBe(false)
    expect(isGonePath('/compliance')).toBe(false)
  })
})
