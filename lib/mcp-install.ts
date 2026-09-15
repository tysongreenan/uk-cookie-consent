export const MCP_PACKAGE = '@cookie-banner/mcp'
export const MCP_SERVER_NAME = 'cookie-banner'
export const API_KEY_PLACEHOLDER = 'cb_YOUR_KEY_HERE'

export type McpAgentId = 'claude-code' | 'cursor' | 'windsurf' | 'vscode' | 'other'

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
    blurb: 'One CLI command. Works in the terminal and VS Code extension.',
    configFile: '.mcp.json (project) or claude mcp add',
  },
  {
    id: 'cursor',
    name: 'Cursor',
    blurb: 'Add the server, then ask the agent to set up cookie consent.',
    configFile: 'Cursor Settings → MCP',
  },
  {
    id: 'windsurf',
    name: 'Windsurf',
    blurb: 'Paste the JSON into the Windsurf MCP config.',
    configFile: '~/.codeium/windsurf/mcp_config.json',
  },
  {
    id: 'vscode',
    name: 'VS Code',
    blurb: 'Copilot / any MCP-capable VS Code agent.',
    configFile: '.vscode/mcp.json',
  },
  {
    id: 'other',
    name: 'Other MCP client',
    blurb: 'Cline, Continue, Zed, or any client that speaks MCP.',
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
    case 'vscode':
      return formatJson(vscodeMcpConfig(apiKey))
    default:
      return formatJson(mcpJsonConfig(apiKey))
  }
}

export const SETUP_PROMPT = `Set up cookie-banner.ca on this website.

1. Use the cookie-banner MCP tools (prefer setup_site).
2. Name the banner after this site. Use GDPR if the audience is EU, CCPA for California, otherwise PIPEDA.
3. Search this repo for existing tracker IDs (G-…, GTM-…, Meta pixel, Clarity, Hotjar, LinkedIn, TikTok) and pass them as scripts.
4. Add the returned install snippet to the site header before other third-party tags:
   - Next.js App Router: app/layout.tsx with next/script strategy="beforeInteractive"
   - WordPress: WPCode or header.php
   - Shopify: theme.liquid before </head>
5. Remove duplicate tracker tags from the header so they only load through the banner after consent.
6. Reply with the banner id, which scripts you attached, and the file you edited.`
