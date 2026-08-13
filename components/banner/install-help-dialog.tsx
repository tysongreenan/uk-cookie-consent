'use client'

import { useEffect, useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { captureEvent } from '@/lib/analytics'
import { copyToClipboard } from '@/lib/utils'
import { markInstallHelpShown, markInstallSnippetCopied, recordHostedSnippetCopy } from '@/lib/install-snippet'

type InstallHelpState = {
  open: boolean
  snippet: string
}

let helpState: InstallHelpState = { open: false, snippet: '' }
const listeners = new Set<() => void>()

function emitHelpState() {
  listeners.forEach((listener) => listener())
}

function openInstallHelp(snippet: string) {
  helpState = { open: true, snippet }
  emitHelpState()
}

function closeInstallHelp() {
  if (!helpState.open) return
  helpState = { ...helpState, open: false }
  emitHelpState()
}

function useInstallHelpState(): InstallHelpState {
  const [state, setState] = useState<InstallHelpState>(helpState)

  useEffect(() => {
    const sync = () => setState({ ...helpState })
    listeners.add(sync)
    sync()
    return () => {
      listeners.delete(sync)
    }
  }, [])

  return state
}

/**
 * Copy the hosted install snippet. First copy in the tab keeps the existing
 * toast. Second+ copy opens the install-help dialog instead of another toast.
 */
export async function copyHostedSnippet(options: {
  snippet: string
  bannerId?: string | null
  source: string
  planTier?: string
  alreadyCopied?: boolean
}): Promise<{ showedHelp: boolean }> {
  if (!options.alreadyCopied) {
    await copyToClipboard(options.snippet)
  }
  if (options.bannerId) {
    markInstallSnippetCopied(options.bannerId)
  }

  const record = recordHostedSnippetCopy()
  captureEvent('install_snippet_copied', {
    banner_id: options.bannerId || null,
    snippet_type: 'hosted',
    plan_tier: options.planTier || 'free',
    source: options.source,
  })

  if (record.shouldShowInstallHelp && listeners.size > 0) {
    toast.dismiss()
    if (markInstallHelpShown()) {
      captureEvent('install_help_shown', {
        banner_id: options.bannerId || null,
        source: options.source,
        copy_count: record.copyCount,
      })
    }
    openInstallHelp(options.snippet)
    return { showedHelp: true }
  }

  return { showedHelp: false }
}

export function InstallHelpDialog() {
  const state = useInstallHelpState()
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!state.open) {
      setCopied(false)
    }
  }, [state.open])

  const handleCopy = async () => {
    try {
      await copyToClipboard(state.snippet)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 3000)
    } catch {
      toast.error('Could not copy. Select the snippet and copy it yourself.')
    }
  }

  return (
    <Dialog
      open={state.open}
      onOpenChange={(open) => {
        if (!open) closeInstallHelp()
      }}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Here&apos;s how to install it</DialogTitle>
          <DialogDescription>
            Paste this snippet in your site&apos;s HTML <code className="rounded bg-muted px-1">&lt;head&gt;</code>.
            Save, then reload your site and look for the banner.
          </DialogDescription>
        </DialogHeader>
        <pre className="max-h-40 overflow-x-auto whitespace-pre-wrap break-all rounded-md border bg-muted/50 p-3 text-xs">
          <code>{state.snippet}</code>
        </pre>
        <DialogFooter className="gap-2 sm:justify-between">
          <Button type="button" onClick={handleCopy}>
            {copied ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="mr-2 h-4 w-4" />
                Copy snippet
              </>
            )}
          </Button>
          <Button type="button" variant="outline" onClick={closeInstallHelp}>
            Got it
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
