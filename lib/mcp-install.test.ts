import { describe, expect, it } from 'vitest'
import {
  API_KEY_PLACEHOLDER,
  agentInstallSnippet,
  claudeMcpCommand,
  cursorDeeplink,
  mcpJsonConfig,
  SETUP_PROMPT,
  vscodeDeeplink,
} from './mcp-install'

describe('mcp install snippets', () => {
  it('builds an npx config that injects the API key', () => {
    const config = mcpJsonConfig('cb_testkey')
    expect(config.mcpServers['cookie-banner'].command).toBe('npx')
    expect(config.mcpServers['cookie-banner'].args).toEqual(['-y', '@cookie-banner/mcp'])
    expect(config.mcpServers['cookie-banner'].env.COOKIE_BANNER_API_KEY).toBe('cb_testkey')
  })

  it('uses a placeholder when no key is provided', () => {
    expect(agentInstallSnippet('other')).toContain(API_KEY_PLACEHOLDER)
    expect(claudeMcpCommand()).toContain(API_KEY_PLACEHOLDER)
  })

  it('builds Cursor and VS Code deeplinks', () => {
    expect(cursorDeeplink('cb_testkey')).toContain('cursor://anysphere.cursor-deeplink/mcp/install')
    expect(vscodeDeeplink('cb_testkey')).toContain('vscode:mcp/install?')
  })

  it('tells the agent to prefer setup_site and remove duplicate tags', () => {
    expect(SETUP_PROMPT).toContain('setup_site')
    expect(SETUP_PROMPT).toContain('Remove duplicate tracker tags')
  })
})
