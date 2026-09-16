'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { AgentLogo } from '@/components/integrations/agent-logos'
import {
  API_KEY_PLACEHOLDER,
  MCP_AGENTS,
  oneShotPrompt,
  type McpAgentId,
} from '@/lib/mcp-install'
import { cn } from '@/lib/utils'
import { Check, Copy } from 'lucide-react'

const CALLBACK = '?callbackUrl=%2Fintegrations%2Fai'

const STEPS = [
  { n: 1 as const, title: 'Connect your account' },
  { n: 2 as const, title: 'Add it to your editor' },
]

type StepN = 1 | 2

const iconMotion = {
  initial: { opacity: 0, scale: 0.25, filter: 'blur(4px)' },
  animate: { opacity: 1, scale: 1, filter: 'blur(0px)' },
  exit: { opacity: 0, scale: 0.25, filter: 'blur(4px)' },
  transition: { type: 'spring' as const, duration: 0.3, bounce: 0 },
}

function CopyGlyph({ copied }: { copied: boolean }) {
  return (
    <span className="relative inline-flex h-4 w-4">
      <AnimatePresence initial={false} mode="wait">
        <motion.span
          key={copied ? 'check' : 'copy'}
          className="absolute inset-0 flex items-center justify-center"
          {...iconMotion}
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

function StepMark({
  n,
  state,
}: {
  n: number
  state: 'done' | 'current' | 'upcoming'
}) {
  return (
    <span
      className={cn(
        'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold tabular-nums',
        state === 'done' && 'bg-primary text-primary-foreground',
        state === 'current' && 'bg-foreground text-background',
        state === 'upcoming' && 'border border-border bg-background text-muted-foreground'
      )}
    >
      {state === 'done' ? <Check className="h-4 w-4" strokeWidth={2.5} /> : n}
    </span>
  )
}

export function SetupWithAi() {
  const { data: session, status } = useSession()
  const reduceMotion = useReducedMotion()
  const [step, setStep] = useState<StepN>(1)
  const [agent, setAgent] = useState<McpAgentId>('claude-code')
  const [apiKey, setApiKey] = useState<string | null>(null)
  const [isCopying, setIsCopying] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [savedOnAccount, setSavedOnAccount] = useState(false)

  const selected = MCP_AGENTS.find((item) => item.id === agent) ?? MCP_AGENTS[0]
  const signedIn = Boolean(session?.user?.id)
  const email = session?.user?.email ?? 'your account'
  const prompt = useMemo(
    () => oneShotPrompt(agent, apiKey || API_KEY_PLACEHOLDER),
    [agent, apiKey]
  )
  const stepBodyMotion = reduceMotion
    ? { initial: { opacity: 1 }, animate: { opacity: 1 }, exit: { opacity: 1 } }
    : {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -6 },
        transition: { duration: 0.28, ease: [0.25, 0.4, 0.25, 1] as const },
      }

  const writeClipboard = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = value
      ta.setAttribute('readonly', '')
      ta.style.position = 'fixed'
      ta.style.left = '-9999px'
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      ta.remove()
    }
  }

  const mintKey = async (): Promise<string | null> => {
    if (apiKey) return apiKey
    const res = await fetch('/api/developer/api-keys', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: `Secret key · ${selected.name}` }),
    })
    const data = await res.json()
    if (!res.ok) {
      setError(data.message || data.error || 'Could not create an API key')
      return null
    }
    setApiKey(data.key)
    return data.key as string
  }

  const copyPrompt = async () => {
    if (!signedIn) return
    setIsCopying(true)
    setError(null)
    try {
      const key = await mintKey()
      if (!key) return
      await writeClipboard(oneShotPrompt(agent, key))
      setCopied(true)
      setSavedOnAccount(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setError('Could not copy the prompt')
    } finally {
      setIsCopying(false)
    }
  }

  return (
    <ol className="min-w-0 max-w-full">
      {STEPS.map((item, index) => {
        const state =
          step > item.n ? 'done' : step === item.n ? 'current' : 'upcoming'
        const isLast = index === STEPS.length - 1

        return (
          <li key={item.n} className="relative flex gap-4">
            {!isLast && (
              <span
                className={cn(
                  'pointer-events-none absolute left-4 top-8 bottom-0 w-px',
                  state === 'done' ? 'bg-primary/40' : 'bg-border'
                )}
                aria-hidden
              />
            )}

            <div className="relative z-10 pt-0.5">
              <StepMark n={item.n} state={state} />
            </div>

            <div className={cn('min-w-0 flex-1', isLast ? 'pb-0' : 'pb-8')}>
              {state === 'done' ? (
                <button
                  type="button"
                  onClick={() => setStep(item.n)}
                  className="flex w-full flex-col items-start rounded-lg py-0.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <span className="font-heading font-semibold">{item.title}</span>
                  <span className="mt-0.5 text-sm text-muted-foreground">
                    {item.n === 1 && `Signed in as ${email}`}
                  </span>
                </button>
              ) : (
                <h3
                  className={cn(
                    'font-heading font-semibold',
                    state === 'upcoming' && 'text-muted-foreground'
                  )}
                >
                  {item.title}
                </h3>
              )}

              <AnimatePresence initial={false} mode="wait">
                {state === 'current' && (
                  <motion.div
                    key={item.n}
                    className="mt-3 space-y-4"
                    {...stepBodyMotion}
                  >
                    {item.n === 1 && (
                      <StepAccount
                        status={status}
                        signedIn={signedIn}
                        email={email}
                        onContinue={() => setStep(2)}
                      />
                    )}
                    {item.n === 2 && (
                      <StepEditor
                        agent={agent}
                        selected={selected}
                        prompt={prompt}
                        hasKey={Boolean(apiKey)}
                        isCopying={isCopying}
                        copied={copied}
                        savedOnAccount={savedOnAccount}
                        error={error}
                        onAgent={setAgent}
                        onCopy={copyPrompt}
                      />
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </li>
        )
      })}
    </ol>
  )
}

function StepAccount({
  status,
  signedIn,
  email,
  onContinue,
}: {
  status: string
  signedIn: boolean
  email: string
  onContinue: () => void
}) {
  if (status === 'loading') {
    return <p className="text-sm text-muted-foreground">Checking your session…</p>
  }

  if (!signedIn) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground text-pretty">
          The agent has no login of its own. Sign in so the prompt we copy next can include a key tied to your cookie-banner.ca account. Anything it creates shows up in your dashboard.
        </p>
        <div className="flex flex-wrap gap-2">
          <Button asChild className="active:scale-[0.96] transition-transform">
            <Link href={`/auth/signin${CALLBACK}`}>Sign in</Link>
          </Button>
          <Button asChild variant="outline" className="active:scale-[0.96] transition-transform">
            <Link href={`/auth/signup${CALLBACK}`}>Create a free account</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground text-pretty">
        Signed in as <span className="text-foreground font-medium">{email}</span>. Next you pick an editor and copy one prompt — we mint the key into it when you copy.
      </p>
      <Button
        type="button"
        onClick={onContinue}
        className="active:scale-[0.96] transition-transform"
      >
        Continue
      </Button>
    </div>
  )
}

function StepEditor({
  agent,
  selected,
  prompt,
  hasKey,
  isCopying,
  copied,
  savedOnAccount,
  error,
  onAgent,
  onCopy,
}: {
  agent: McpAgentId
  selected: (typeof MCP_AGENTS)[number]
  prompt: string
  hasKey: boolean
  isCopying: boolean
  copied: boolean
  savedOnAccount: boolean
  error: string | null
  onAgent: (id: McpAgentId) => void
  onCopy: () => void
}) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground text-pretty">
        {selected.blurb} One copy. The key is minted into it.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {MCP_AGENTS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onAgent(item.id)}
            className={cn(
              'flex flex-col items-center gap-2 rounded-xl px-2 py-3 text-xs font-medium min-h-10 active:scale-[0.96] transition-[transform,box-shadow,background-color] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              agent === item.id
                ? 'bg-background text-foreground shadow-[0_8px_20px_-10px_rgba(0,0,0,0.25)]'
                : 'bg-muted/60 text-muted-foreground hover:text-foreground hover:bg-muted'
            )}
            aria-pressed={agent === item.id}
          >
            <AgentLogo id={item.id} size={28} />
            {item.name}
          </button>
        ))}
      </div>

      <div className="min-w-0 overflow-hidden rounded-xl bg-muted/50">
        <div className="flex items-center justify-between gap-2 px-3 py-1.5">
          <span className="text-xs font-medium text-muted-foreground truncate">
            {selected.name} prompt
          </span>
          <button
            type="button"
            onClick={onCopy}
            disabled={isCopying}
            className="inline-flex h-10 min-w-10 items-center justify-center gap-1.5 rounded-lg px-3 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-background/60 active:scale-[0.96] transition-[transform,background-color,color] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
            aria-label={copied ? 'Copied' : 'Copy setup prompt'}
          >
            {isCopying ? <Spinner /> : <CopyGlyph copied={copied} />}
            <span className="hidden sm:inline">
              {isCopying ? 'Minting…' : copied ? 'Copied' : 'Copy'}
            </span>
          </button>
        </div>
        <pre className="overflow-x-auto max-w-full px-4 pb-4 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap text-pretty">
          <code>{prompt}</code>
        </pre>
      </div>

      {!hasKey && (
        <p className="text-xs text-muted-foreground">
          The key is still a placeholder in the preview. Copying mints a real one for this account and puts it in the prompt.
        </p>
      )}
      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}

      <Button
        type="button"
        onClick={onCopy}
        disabled={isCopying}
        className="active:scale-[0.96] transition-transform"
      >
        {isCopying ? (
          <>
            <Spinner className="mr-2" />
            Minting key…
          </>
        ) : copied ? (
          'Copied — paste it in ' + selected.name
        ) : (
          'Copy prompt'
        )}
      </Button>

      {savedOnAccount && (
        <p className="text-sm text-muted-foreground text-pretty">
          Paste it into {selected.name} and send. That secret key is saved on your account — it stays there until you revoke it in{' '}
          <Link href="/dashboard/settings#developer" className="font-medium text-foreground underline-offset-4 hover:underline">
            Settings
          </Link>
          .
        </p>
      )}
    </div>
  )
}
