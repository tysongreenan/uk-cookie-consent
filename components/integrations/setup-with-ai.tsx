'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import {
  API_KEY_PLACEHOLDER,
  MCP_AGENTS,
  SETUP_PROMPT,
  agentInstallSnippet,
  claudeMcpCommand,
  cursorDeeplink,
  type McpAgentId,
  vscodeDeeplink,
} from '@/lib/mcp-install'
import { Check, Copy, ExternalLink, Key, Terminal } from 'lucide-react'

export function SetupWithAi() {
  const { data: session, status } = useSession()
  const [agent, setAgent] = useState<McpAgentId>('claude-code')
  const [apiKey, setApiKey] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState<'config' | 'prompt' | 'key' | null>(null)

  const keyForSnippets = apiKey || API_KEY_PLACEHOLDER
  const snippet = useMemo(
    () => agentInstallSnippet(agent, keyForSnippets),
    [agent, keyForSnippets]
  )

  const signedIn = Boolean(session?.user?.id)
  const callback = '?callbackUrl=%2Fintegrations%2Fai'

  const copy = async (value: string, which: 'config' | 'prompt' | 'key') => {
    await navigator.clipboard.writeText(value)
    setCopied(which)
    setTimeout(() => setCopied(null), 2000)
  }

  const generateKey = async () => {
    setIsCreating(true)
    setError(null)
    try {
      const res = await fetch('/api/developer/api-keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Set up with AI' }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.message || data.error || 'Could not create an API key')
        return
      }
      setApiKey(data.key)
    } catch {
      setError('Could not create an API key')
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <div className="rounded-2xl border border-border bg-background shadow-sm overflow-hidden">
      <div className="border-b border-border bg-muted/40 px-5 py-4 sm:px-6">
        <p className="text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground">
          Connect your coding agent
        </p>
        <h2 className="font-heading text-xl sm:text-2xl font-semibold mt-1">
          Three steps, then hand it to the agent
        </h2>
      </div>

      <div className="p-5 sm:p-6 space-y-8">
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-background text-xs font-semibold">
              1
            </span>
            <h3 className="font-heading font-semibold">Get a developer key</h3>
          </div>
          {status === 'loading' ? (
            <p className="text-sm text-muted-foreground">Checking your session…</p>
          ) : !signedIn ? (
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <p className="text-sm text-muted-foreground flex-1">
                Sign in so we can mint a <code className="text-xs bg-muted px-1 py-0.5 rounded">cb_</code> key for the MCP server.
              </p>
              <div className="flex gap-2">
                <Button asChild>
                  <Link href={`/auth/signin${callback}`}>Sign in</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href={`/auth/signup${callback}`}>Create a free account</Link>
                </Button>
              </div>
            </div>
          ) : apiKey ? (
            <div className="rounded-lg border border-amber-200 bg-amber-50 dark:bg-amber-950/30 dark:border-amber-900 p-4 space-y-2">
              <p className="text-sm font-medium text-amber-900 dark:text-amber-200 flex items-center gap-2">
                <Key className="h-4 w-4" />
                Save this key now — it will not be shown again
              </p>
              <div className="flex items-center gap-2">
                <code className="flex-1 text-xs break-all bg-background border rounded px-2 py-1.5">
                  {apiKey}
                </code>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => copy(apiKey, 'key')}
                >
                  {copied === 'key' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <p className="text-sm text-muted-foreground flex-1">
                Signed in as {session?.user?.email}. Generate a key to fill the config below.
              </p>
              <Button type="button" onClick={generateKey} disabled={isCreating}>
                {isCreating ? 'Creating…' : 'Generate API key'}
              </Button>
            </div>
          )}
          {error && <p className="text-sm text-red-600">{error}</p>}
        </section>

        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-background text-xs font-semibold">
              2
            </span>
            <h3 className="font-heading font-semibold">Connect the MCP</h3>
          </div>

          <div className="flex flex-wrap gap-2">
            {MCP_AGENTS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setAgent(item.id)}
                className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                  agent === item.id
                    ? 'border-foreground bg-foreground text-background'
                    : 'border-border bg-background text-foreground hover:bg-muted'
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          <p className="text-sm text-muted-foreground">
            {MCP_AGENTS.find((item) => item.id === agent)?.blurb} Config file:{' '}
            <span className="font-mono text-xs">
              {MCP_AGENTS.find((item) => item.id === agent)?.configFile}
            </span>
          </p>

          <div className="relative">
            <pre className="overflow-x-auto rounded-lg bg-[#141413] text-[#faf9f5] p-4 text-xs sm:text-sm leading-relaxed">
              <code>{snippet}</code>
            </pre>
            <Button
              type="button"
              size="sm"
              variant="secondary"
              className="absolute top-3 right-3"
              onClick={() => copy(snippet, 'config')}
            >
              {copied === 'config' ? (
                <Check className="h-4 w-4 mr-1" />
              ) : (
                <Copy className="h-4 w-4 mr-1" />
              )}
              Copy
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {agent === 'claude-code' && (
              <Button type="button" variant="outline" size="sm" onClick={() => copy(claudeMcpCommand(keyForSnippets), 'config')}>
                <Terminal className="h-4 w-4 mr-1" />
                Copy CLI command
              </Button>
            )}
            {agent === 'cursor' && (
              <Button asChild size="sm">
                <a href={cursorDeeplink(keyForSnippets)}>
                  Add to Cursor
                  <ExternalLink className="h-4 w-4 ml-1" />
                </a>
              </Button>
            )}
            {agent === 'vscode' && (
              <Button asChild size="sm">
                <a href={vscodeDeeplink(keyForSnippets)}>
                  Add to VS Code
                  <ExternalLink className="h-4 w-4 ml-1" />
                </a>
              </Button>
            )}
          </div>
        </section>

        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-background text-xs font-semibold">
              3
            </span>
            <h3 className="font-heading font-semibold">Paste this prompt</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            After the MCP is connected, give your agent this job. It will create the banner in your account, attach any trackers it finds, and write the header snippet into the repo.
          </p>
          <div className="relative">
            <pre className="overflow-x-auto rounded-lg border bg-muted/40 p-4 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
              <code>{SETUP_PROMPT}</code>
            </pre>
            <Button
              type="button"
              size="sm"
              variant="secondary"
              className="absolute top-3 right-3"
              onClick={() => copy(SETUP_PROMPT, 'prompt')}
            >
              {copied === 'prompt' ? (
                <Check className="h-4 w-4 mr-1" />
              ) : (
                <Copy className="h-4 w-4 mr-1" />
              )}
              Copy prompt
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}
