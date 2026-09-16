import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Set up with AI — Cookie Banner MCP for Claude, Cursor, Grok & ChatGPT',
  description:
    'Connect cookie-banner.ca to Claude Code, Cursor, Grok, or ChatGPT. Copy one prompt — we mint a key into it. The agent creates your consent banner and pastes the header snippet.',
  keywords:
    'cookie banner mcp, set up with ai, cursor cookie consent, claude code mcp, grok mcp, chatgpt mcp, ai cookie banner setup, cookie-banner mcp',
  openGraph: {
    title: 'Set up with AI — Cookie Banner MCP',
    description:
      'Connect your coding agent. It creates the banner, attaches tracking scripts, and installs the header snippet.',
    type: 'article',
  },
  alternates: {
    canonical: '/integrations/ai',
  },
}

export default function AiIntegrationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
