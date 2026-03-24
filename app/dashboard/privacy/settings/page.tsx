'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import {
  Key, Copy, CheckCircle, Trash2, Plus, Puzzle, Download, AlertTriangle, Shield,
} from 'lucide-react'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { Breadcrumbs } from '@/components/dashboard/breadcrumbs'
import { toast } from 'react-hot-toast'

interface ApiKeyEntry {
  id: string
  name: string
  prefix: string
  last_used_at: string | null
  revoked_at: string | null
  created_at: string
}

function relativeTime(dateStr: string | null): string {
  if (!dateStr) return 'Never'
  const diff = Date.now() - new Date(dateStr).getTime()
  const minutes = Math.floor(diff / 60000)
  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

export default function ExtensionSettingsPage() {
  const { data: session } = useSession()
  const [keys, setKeys] = useState<ApiKeyEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [newKey, setNewKey] = useState<string | null>(null)
  const [newKeyName, setNewKeyName] = useState('Chrome Extension')
  const [copied, setCopied] = useState(false)
  const [savedConfirmed, setSavedConfirmed] = useState(false)
  const [revokeTarget, setRevokeTarget] = useState<ApiKeyEntry | null>(null)

  useEffect(() => {
    if (!session?.user?.id) return
    fetchKeys()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session])

  async function fetchKeys() {
    try {
      const res = await fetch('/api/consumer/api-keys')
      if (res.ok) {
        const data = await res.json()
        setKeys(data.keys || [])
      }
    } catch (error) {
      console.error('Error fetching API keys:', error)
    } finally {
      setLoading(false)
    }
  }

  async function generateKey() {
    setGenerating(true)
    try {
      const res = await fetch('/api/consumer/api-keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newKeyName }),
      })
      const data = await res.json()
      if (res.ok) {
        setNewKey(data.key)
        setSavedConfirmed(false)
        setCopied(false)
        fetchKeys()
      } else {
        toast.error(data.message || 'Failed to generate key')
      }
    } catch {
      toast.error('Failed to generate key')
    } finally {
      setGenerating(false)
    }
  }

  async function revokeKey(keyId: string) {
    try {
      const res = await fetch(`/api/consumer/api-keys?id=${keyId}`, { method: 'DELETE' })
      if (res.ok) {
        toast.success('API key revoked')
        fetchKeys()
      }
    } catch {
      toast.error('Failed to revoke key')
    }
    setRevokeTarget(null)
  }

  function copyToClipboard() {
    if (!newKey) return
    navigator.clipboard.writeText(newKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  }

  const activeKeys = keys.filter(k => !k.revoked_at)
  const revokedKeys = keys.filter(k => k.revoked_at)

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="relative mx-auto h-10 w-10">
            <div className="absolute inset-0 rounded-full border-2 border-muted" />
            <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-primary" />
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-2xl mx-auto space-y-8">
        <Breadcrumbs items={[{ label: 'My Privacy' }, { label: 'Extension Settings' }]} />

        <div>
          <h1 className="text-2xl font-bold tracking-tight">Extension Settings</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage your Chrome extension connection and API keys.</p>
        </div>

        {/* Extension Connection */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <Puzzle className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-base">Chrome Extension</CardTitle>
                <CardDescription className="text-xs">
                  {activeKeys.length > 0
                    ? `Connected with ${activeKeys.length} active key${activeKeys.length > 1 ? 's' : ''}`
                    : 'Not connected — generate an API key to get started'}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {activeKeys.length > 0 ? (
              <div className="flex items-center gap-2 text-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span className="text-muted-foreground">
                  Last used {relativeTime(activeKeys.reduce((latest, k) =>
                    !latest || (k.last_used_at && k.last_used_at > latest) ? k.last_used_at : latest, null as string | null
                  ))}
                </span>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                The Chrome extension is coming soon. Generate an API key now so you&apos;re ready when it launches.
              </p>
            )}
          </CardContent>
        </Card>

        {/* API Keys */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">API Keys</CardTitle>
                <CardDescription className="text-xs">Generate keys to connect your Chrome extension. Max 3 active keys.</CardDescription>
              </div>
              {activeKeys.length < 3 && (
                <Button size="sm" onClick={() => { setNewKey(null); generateKey() }} disabled={generating}>
                  <Plus className="h-4 w-4 mr-1" />
                  {generating ? 'Generating...' : 'Generate Key'}
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {activeKeys.length === 0 && !newKey && (
              <div className="text-center py-8 text-muted-foreground">
                <Key className="h-8 w-8 mx-auto mb-2 opacity-30" />
                <p className="text-sm">No API keys yet. Generate one to connect the extension.</p>
              </div>
            )}

            {activeKeys.map(key => (
              <div key={key.id} className="flex items-center justify-between p-3 rounded-lg border border-border">
                <div className="flex items-center gap-3">
                  <Key className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{key.name}</p>
                    <p className="text-xs text-muted-foreground font-mono">{key.prefix}****</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground hidden sm:inline">
                    {key.last_used_at ? `Used ${relativeTime(key.last_used_at)}` : 'Never used'}
                  </span>
                  <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" onClick={() => setRevokeTarget(key)}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            ))}

            {revokedKeys.length > 0 && (
              <details className="mt-4">
                <summary className="text-xs text-muted-foreground cursor-pointer hover:text-foreground">
                  {revokedKeys.length} revoked key{revokedKeys.length > 1 ? 's' : ''}
                </summary>
                <div className="mt-2 space-y-2">
                  {revokedKeys.map(key => (
                    <div key={key.id} className="flex items-center gap-3 p-2 rounded-lg bg-muted/30 opacity-50">
                      <Key className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xs font-mono">{key.prefix}****</span>
                      <Badge variant="outline" className="text-[10px]">Revoked</Badge>
                    </div>
                  ))}
                </div>
              </details>
            )}
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Data Management</CardTitle>
            <CardDescription className="text-xs">Export or delete your privacy data.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button variant="outline" size="sm" asChild>
              <a href="/api/consumer/export" download>
                <Download className="h-4 w-4 mr-2" />
                Export my data
              </a>
            </Button>
          </CardContent>
        </Card>

        {/* New Key Dialog */}
        <AlertDialog open={!!newKey} onOpenChange={(open) => { if (!open && savedConfirmed) setNewKey(null) }}>
          <AlertDialogContent className="max-w-md">
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Save your API key
              </AlertDialogTitle>
              <AlertDialogDescription>
                This key will only be shown once. Copy it and paste it into the Chrome extension settings.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <div className="my-4 p-4 bg-muted/50 border border-border rounded-lg font-mono text-sm break-all select-all">
              {newKey}
            </div>

            <Button variant="outline" className="w-full" onClick={copyToClipboard}>
              {copied ? (
                <><CheckCircle className="h-4 w-4 mr-2 text-green-500" /> Copied!</>
              ) : (
                <><Copy className="h-4 w-4 mr-2" /> Copy to clipboard</>
              )}
            </Button>

            <label className="flex items-center gap-2 mt-3 text-sm cursor-pointer">
              <input type="checkbox" checked={savedConfirmed} onChange={(e) => setSavedConfirmed(e.target.checked)} className="rounded" />
              I have saved my API key
            </label>

            <AlertDialogFooter className="mt-2">
              <AlertDialogAction disabled={!savedConfirmed} onClick={() => setNewKey(null)}>
                Done
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Revoke Confirmation */}
        <AlertDialog open={!!revokeTarget} onOpenChange={(open) => { if (!open) setRevokeTarget(null) }}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                Revoke API Key
              </AlertDialogTitle>
              <AlertDialogDescription>
                This will immediately disconnect the Chrome extension using key <span className="font-mono">{revokeTarget?.prefix}****</span>. You&apos;ll need to generate a new key and re-enter it in the extension.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90" onClick={() => revokeTarget && revokeKey(revokeTarget.id)}>
                Revoke Key
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </DashboardLayout>
  )
}
