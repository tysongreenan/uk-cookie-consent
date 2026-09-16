import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { AgentLogo } from '@/components/integrations/agent-logos'
import type { McpAgentId } from '@/lib/mcp-install'

function IntegrationCard({
  children,
  className,
  featured = false,
}: {
  children: ReactNode
  className?: string
  featured?: boolean
}) {
  return (
    <div
      className={cn(
        'relative z-10 flex size-14 items-center justify-center rounded-xl bg-background shadow-[0_8px_24px_-12px_rgba(0,0,0,0.22)] outline outline-1 outline-black/10 sm:size-[4.25rem]',
        featured &&
          'size-[4.25rem] shadow-[0_16px_32px_-12px_rgba(14,118,140,0.38)] sm:size-24',
        className
      )}
    >
      {children}
    </div>
  )
}

const ORBIT: { id: McpAgentId; label: string; x: number; y: number }[] = [
  { id: 'claude-code', label: 'Claude', x: 20, y: 20 },
  { id: 'cursor', label: 'Cursor', x: 80, y: 20 },
  { id: 'grok', label: 'Grok', x: 20, y: 80 },
  { id: 'chatgpt', label: 'ChatGPT', x: 80, y: 80 },
]

/** 21st integrations-5 orbit + incident.io constellation. Cookie is the hub. */
export function McpHero() {
  return (
    <div className="group relative mx-auto aspect-square w-full max-w-[220px] sm:max-w-[360px]">
      <div
        aria-hidden
        className="absolute inset-[10%] rounded-full opacity-70 [background-image:linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(closest-side,black,transparent)]"
      />

      <div
        aria-hidden
        className="absolute inset-[4%] rounded-full border border-border/80 bg-gradient-to-b from-primary/12 to-transparent to-45%"
      />
      <div
        aria-hidden
        className="absolute inset-[22%] rounded-full border border-border/60 bg-gradient-to-b from-primary/8 to-transparent to-45%"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-[4%] rounded-full border-t border-primary/40 bg-gradient-to-b from-primary/20 to-transparent to-25% opacity-0 transition-opacity duration-500 motion-safe:group-hover:animate-spin motion-safe:group-hover:opacity-100 [animation-duration:8s]"
      />

      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        aria-hidden
      >
        <line x1="20" y1="20" x2="50" y2="50" className="stroke-primary/30" strokeWidth="0.7" />
        <line x1="80" y1="20" x2="50" y2="50" className="stroke-primary/30" strokeWidth="0.7" />
        <line x1="20" y1="80" x2="50" y2="50" className="stroke-primary/30" strokeWidth="0.7" />
        <line x1="80" y1="80" x2="50" y2="50" className="stroke-primary/30" strokeWidth="0.7" />
      </svg>

      {ORBIT.map((item) => (
        <div
          key={item.id}
          className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${item.x}%`, top: `${item.y}%` }}
        >
          <IntegrationCard>
            <AgentLogo id={item.id} size={28} />
            <span className="sr-only">{item.label}</span>
          </IntegrationCard>
        </div>
      ))}

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <IntegrationCard featured>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/favicon.svg"
            alt="Cookie Banner"
            className="h-8 w-auto sm:h-11"
          />
        </IntegrationCard>
      </div>
    </div>
  )
}
