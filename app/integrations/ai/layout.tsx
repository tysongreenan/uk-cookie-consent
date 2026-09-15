import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Set up with AI — Cookie Banner MCP for Cursor, Claude & Windsurf',
  description:
    'Connect cookie-banner.ca to Claude Code, Cursor, Windsurf, or VS Code. The agent creates your consent banner, attaches GA4/GTM scripts, and pastes the header snippet.',
  keywords:
    'cookie banner mcp, set up with ai, cursor cookie consent, claude code mcp, windsurf mcp, ai cookie banner setup, cookie-banner mcp',
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
