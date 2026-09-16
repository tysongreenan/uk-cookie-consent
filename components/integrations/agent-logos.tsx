import type { McpAgentId } from '@/lib/mcp-install'

const SRC: Partial<Record<McpAgentId, { src: string; alt: string }>> = {
  'claude-code': { src: '/logos/agents/claude.svg', alt: 'Claude' },
  cursor: { src: '/logos/agents/cursor.svg', alt: 'Cursor' },
  grok: { src: '/logos/agents/grok.svg', alt: 'Grok' },
  chatgpt: { src: '/logos/agents/openai.svg', alt: 'ChatGPT' },
}

export function AgentLogo({
  id,
  size = 20,
}: {
  id: McpAgentId
  size?: number
}) {
  const logo = SRC[id]
  if (!logo) {
    return (
      <svg
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill="currentColor"
        aria-hidden
        className="text-foreground"
      >
        <circle cx="6" cy="12" r="1.8" />
        <circle cx="12" cy="12" r="1.8" />
        <circle cx="18" cy="12" r="1.8" />
      </svg>
    )
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={logo.src}
      alt=""
      width={size}
      height={size}
      className="object-contain"
      style={{ width: size, height: size }}
    />
  )
}
