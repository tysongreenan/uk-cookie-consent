import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { hostedInstallSnippet, markInstallHelpShown, recordHostedSnippetCopy } from './install-snippet'

function createMemoryStorage(): Storage {
  const map = new Map<string, string>()
  return {
    get length() {
      return map.size
    },
    clear: () => map.clear(),
    getItem: (key: string) => (map.has(key) ? map.get(key)! : null),
    setItem: (key: string, value: string) => {
      map.set(key, String(value))
    },
    removeItem: (key: string) => {
      map.delete(key)
    },
    key: (index: number) => [...map.keys()][index] ?? null,
  }
}

describe('hostedInstallSnippet', () => {
  it('returns a one-line async script tag for paid/no-branding installs', () => {
    const snippet = hostedInstallSnippet('banner-123')
    expect(snippet).toContain('/api/v1/banner.js?id=banner-123')
    expect(snippet.startsWith('<script src="')).toBe(true)
    expect(snippet.endsWith('async></script>')).toBe(true)
    expect(snippet).not.toContain('<noscript>')
  })

  it('adds the noscript attribution line when branding is shown', () => {
    const snippet = hostedInstallSnippet('banner-123', { showBranding: true })
    expect(snippet).toContain('async></script>')
    expect(snippet).toContain('<noscript>')
    expect(snippet).toContain('cookie-banner.ca/?ref=banner')
  })
})

describe('recordHostedSnippetCopy', () => {
  beforeEach(() => {
    vi.stubGlobal('window', { sessionStorage: createMemoryStorage() })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('keeps first copy on the existing toast path', () => {
    const first = recordHostedSnippetCopy()
    expect(first).toEqual({
      copyCount: 1,
      shouldShowInstallHelp: false,
    })
  })

  it('asks for install help on the second copy in the same session', () => {
    recordHostedSnippetCopy()
    const second = recordHostedSnippetCopy()
    expect(second).toEqual({
      copyCount: 2,
      shouldShowInstallHelp: true,
    })
  })

  it('keeps asking for the same help on a third copy', () => {
    recordHostedSnippetCopy()
    recordHostedSnippetCopy()
    const third = recordHostedSnippetCopy()
    expect(third).toEqual({
      copyCount: 3,
      shouldShowInstallHelp: true,
    })
  })

  it('tracks install_help_shown only the first time help is shown', () => {
    expect(markInstallHelpShown()).toBe(true)
    expect(markInstallHelpShown()).toBe(false)
  })
})
