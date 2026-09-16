import { describe, expect, it } from 'vitest'
import {
  API_KEY_PLACEHOLDER,
  agentInstallSnippet,
  claudeMcpCommand,
  grokMcpCommand,
  mcpJsonConfig,
  MCP_AGENTS,
  maskDeveloperKeyPrefix,
  oneShotPrompt,
  SETUP_PROMPT,
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
    expect(grokMcpCommand()).toContain(API_KEY_PLACEHOLDER)
  })

  it('lists Claude, Cursor, Grok, ChatGPT, then Other', () => {
    expect(MCP_AGENTS.map((a) => a.id)).toEqual([
      'claude-code',
      'cursor',
      'grok',
      'chatgpt',
      'other',
    ])
  })

  it('masks a stored prefix as a secret key', () => {
    expect(maskDeveloperKeyPrefix('cb_abcdefgh')).toBe('cb_••••efgh')
  })

  it('packs install + key + setup_site into one prompt', () => {
    const prompt = oneShotPrompt('claude-code', 'cb_testkey')
    expect(prompt).toContain('cb_testkey')
    expect(prompt).toContain('claude mcp add')
    expect(prompt).toContain('setup_site')
    expect(prompt).toContain('search_domain')
    expect(prompt).toContain('logo_url')
    expect(prompt).toContain('Remove duplicate tracker tags')
    expect(SETUP_PROMPT).toContain('setup_site')
    expect(SETUP_PROMPT).toContain('search_domain')
  })
})
