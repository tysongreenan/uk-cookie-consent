import { describe, expect, it } from 'vitest'
import {
  builderProgress,
  shouldOpenInstallAfterFirstCreate,
  shouldPinInstallNav,
  shouldShowInstallCallout,
} from './first-banner-install'

describe('shouldOpenInstallAfterFirstCreate', () => {
  const ready = {
    bannerId: 'banner-1',
    explicitTab: null,
    userChoseTab: false,
    snippetAlreadyCopied: false,
  }

  it('opens install when the first banner is created and the person has not chosen a section', () => {
    expect(shouldOpenInstallAfterFirstCreate(ready)).toBe(true)
  })

  it('stays on the section they already opened', () => {
    expect(shouldOpenInstallAfterFirstCreate({ ...ready, userChoseTab: true })).toBe(false)
    expect(shouldOpenInstallAfterFirstCreate({ ...ready, explicitTab: 'compliance' })).toBe(false)
  })

  it('does not reopen install after the snippet was copied', () => {
    expect(shouldOpenInstallAfterFirstCreate({ ...ready, snippetAlreadyCopied: true })).toBe(false)
  })

  it('waits until a banner id exists', () => {
    expect(shouldOpenInstallAfterFirstCreate({ ...ready, bannerId: null })).toBe(false)
  })
})

describe('shouldShowInstallCallout', () => {
  it('keeps the snippet on configuration sections until it is copied', () => {
    expect(
      shouldShowInstallCallout({ hasBannerId: true, activeTab: 'compliance', snippetCopied: false }),
    ).toBe(true)
  })

  it('hides on the install step itself and after copy', () => {
    expect(shouldShowInstallCallout({ hasBannerId: true, activeTab: 'code', snippetCopied: false })).toBe(false)
    expect(
      shouldShowInstallCallout({ hasBannerId: true, activeTab: 'brand', snippetCopied: true }),
    ).toBe(false)
    expect(
      shouldShowInstallCallout({ hasBannerId: false, activeTab: 'compliance', snippetCopied: false }),
    ).toBe(false)
  })
})

describe('shouldPinInstallNav', () => {
  it('pins install above the other sections until the snippet is copied', () => {
    expect(shouldPinInstallNav({ hasBannerId: true, snippetCopied: false })).toBe(true)
    expect(shouldPinInstallNav({ hasBannerId: true, snippetCopied: true })).toBe(false)
    expect(shouldPinInstallNav({ hasBannerId: false, snippetCopied: false })).toBe(false)
  })
})

describe('builderProgress', () => {
  it('calls the install section the last step instead of step 12', () => {
    expect(builderProgress({ activeTab: 'code', snippetCopied: false })).toEqual({
      label: 'Install your banner',
      detail: 'Last step',
      percent: 100,
    })
  })

  it('keeps the numbered steps for configuration', () => {
    expect(builderProgress({ activeTab: 'compliance', snippetCopied: false }).label).toBe('Step 1 of 12')
    expect(builderProgress({ activeTab: 'code', snippetCopied: true }).label).toBe('Step 12 of 12')
  })
})
