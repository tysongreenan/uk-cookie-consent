export const MCP_PACKAGE = '@cookie-banner/mcp'
export const MCP_SERVER_NAME = 'cookie-banner'
export const API_KEY_PLACEHOLDER = 'cb_YOUR_KEY_HERE'

/** Settings display: cb_abcdefgh → cb_••••efgh. Raw secret is never stored. */
export function maskDeveloperKeyPrefix(prefix: string): string {
  if (!prefix.startsWith('cb_') || prefix.length < 7) return 'cb_••••'
  return `cb_••••${prefix.slice(-4)}`
}

export type McpAgentId = 'claude-code' | 'cursor' | 'grok' | 'chatgpt' | 'other'

export interface McpAgent {
  id: McpAgentId
  name: string
  blurb: string
  configFile: string
}

export const MCP_AGENTS: McpAgent[] = [
  {
    id: 'claude-code',
    name: 'Claude Code',
    blurb: 'Paste one prompt. Claude adds the MCP, then sets up the banner.',
    configFile: 'claude mcp add',
  },
  {
    id: 'cursor',
    name: 'Cursor',
    blurb: 'Paste one prompt. Cursor adds the MCP, then sets up the banner.',
    configFile: 'Cursor Settings → MCP',
  },
  {
    id: 'grok',
    name: 'Grok',
    blurb: 'Paste one prompt. Grok adds the MCP, then sets up the banner.',
    configFile: 'grok mcp add',
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    blurb: 'Works in Codex. Paste one prompt; it writes the config and sets up the banner.',
    configFile: '~/.codex/config.toml',
  },
  {
    id: 'other',
    name: 'Other',
    blurb: 'Windsurf, Cline, Continue, Zed — paste one prompt with the JSON config.',
    configFile: 'your MCP config file',
  },
]

export function mcpServerBlock(apiKey = API_KEY_PLACEHOLDER) {
  return {
    command: 'npx',
    args: ['-y', MCP_PACKAGE],
    env: {
      COOKIE_BANNER_API_KEY: apiKey,
    },
  }
}

export function mcpJsonConfig(apiKey = API_KEY_PLACEHOLDER) {
  return {
    mcpServers: {
      [MCP_SERVER_NAME]: mcpServerBlock(apiKey),
    },
  }
}

export function vscodeMcpConfig(apiKey = API_KEY_PLACEHOLDER) {
  return {
    servers: {
      [MCP_SERVER_NAME]: mcpServerBlock(apiKey),
    },
  }
}

export function formatJson(value: unknown): string {
  return JSON.stringify(value, null, 2)
}

export function claudeMcpCommand(apiKey = API_KEY_PLACEHOLDER): string {
  return `claude mcp add ${MCP_SERVER_NAME} -e COOKIE_BANNER_API_KEY=${apiKey} -- npx -y ${MCP_PACKAGE}`
}

export function grokMcpCommand(apiKey = API_KEY_PLACEHOLDER): string {
  return `grok mcp add ${MCP_SERVER_NAME} -e COOKIE_BANNER_API_KEY=${apiKey} -- npx -y ${MCP_PACKAGE}`
}

export function chatgptCodexToml(apiKey = API_KEY_PLACEHOLDER): string {
  return `[mcp_servers.${MCP_SERVER_NAME}]
command = "npx"
args = ["-y", "${MCP_PACKAGE}"]
env = { COOKIE_BANNER_API_KEY = "${apiKey}" }`
}

function toBase64(value: string): string {
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(value).toString('base64')
  }
  return btoa(value)
}

export function cursorDeeplink(apiKey = API_KEY_PLACEHOLDER): string {
  const config = toBase64(JSON.stringify(mcpServerBlock(apiKey)))
  return `cursor://anysphere.cursor-deeplink/mcp/install?name=${MCP_SERVER_NAME}&config=${config}`
}

export function vscodeDeeplink(apiKey = API_KEY_PLACEHOLDER): string {
  const payload = {
    name: MCP_SERVER_NAME,
    ...mcpServerBlock(apiKey),
  }
  return `vscode:mcp/install?${encodeURIComponent(JSON.stringify(payload))}`
}

export function agentInstallSnippet(agent: McpAgentId, apiKey = API_KEY_PLACEHOLDER): string {
  switch (agent) {
    case 'claude-code':
      return claudeMcpCommand(apiKey)
    case 'grok':
      return grokMcpCommand(apiKey)
    case 'chatgpt':
      return chatgptCodexToml(apiKey)
    default:
      return formatJson(mcpJsonConfig(apiKey))
  }
}

export const SETUP_PROMPT = `Then set up cookie-banner.ca on this website.

1. Use the cookie-banner MCP tools (prefer setup_site).
2. Name the banner after this site. Use GDPR if the audience is EU, CCPA for California, otherwise PIPEDA.
3. Call search_domain on the live site URL (from the repo, env, or package.json homepage). Pass search_domain.logo.url into setup_site as logo_url so the banner uses the real mark. If search_domain has no logo, look in this repo (favicon, apple-touch-icon, public/logo.svg) and use that file's public URL. Also pass the returned brand colors (background, text, button).
4. Search this repo for existing tracker IDs (G-…, GTM-…, Meta pixel, Clarity, Hotjar, LinkedIn, TikTok) and pass them as scripts.
5. Add the returned install snippet to the site header before other third-party tags:
   - Next.js App Router: app/layout.tsx with next/script strategy="beforeInteractive"
   - WordPress: WPCode or header.php
   - Shopify: theme.liquid before </head>
6. Remove duplicate tracker tags from the header so they only load through the banner after consent.
7. Reply with the banner id, the logo you used, which scripts you attached, and the file you edited.`

function installBlock(agent: McpAgentId, apiKey: string): string {
  switch (agent) {
    case 'claude-code':
      return `Run this command, then continue in this chat:\n\n${claudeMcpCommand(apiKey)}`
    case 'cursor':
      return `Add this MCP server in Cursor Settings → MCP, or write it to .cursor/mcp.json, then continue:\n\n${formatJson(mcpJsonConfig(apiKey))}`
    case 'grok':
      return `Run this command, then continue in this chat:\n\n${grokMcpCommand(apiKey)}`
    case 'chatgpt':
      return `If you are Codex, add this to ~/.codex/config.toml, then continue. ChatGPT on the web cannot run a local MCP — use Codex, Claude Code, Cursor, or Grok instead.\n\n${chatgptCodexToml(apiKey)}`
    default:
      return `Add this to your MCP config (Windsurf, Cline, Continue, Zed, …), then continue:\n\n${formatJson(mcpJsonConfig(apiKey))}`
  }
}

/** One paste: mint-ready key + how to connect the MCP + the setup job. */
export function oneShotPrompt(agent: McpAgentId, apiKey = API_KEY_PLACEHOLDER): string {
  return `Install cookie-banner.ca on this website.

Use this developer API key. It authenticates as me — banners you create show up in my dashboard. Do not put it in git.

COOKIE_BANNER_API_KEY=${apiKey}

${installBlock(agent, apiKey)}

${SETUP_PROMPT}`
}
