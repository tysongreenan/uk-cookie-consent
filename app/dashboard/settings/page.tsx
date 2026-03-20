'use client'

import { useSession, signOut } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { ArrowLeft, User, Mail, Trash2, AlertTriangle, CreditCard, ExternalLink, Crown, FileText, Download } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'react-hot-toast'

export default function SettingsPage() {
  const { data: session } = useSession()
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState('')
  const [isLoadingPortal, setIsLoadingPortal] = useState(false)
  const [invoices, setInvoices] = useState<Array<{
    id: string
    number: string | null
    amount: number
    currency: string
    status: string | null
    created: number
    pdf: string | null
    hosted_url: string | null
  }>>([])
  const [isLoadingInvoices, setIsLoadingInvoices] = useState(false)
  const [invoiceError, setInvoiceError] = useState(false)

  const planTier = session?.user?.planTier || 'free'

  useEffect(() => {
    if (planTier !== 'free') {
      setIsLoadingInvoices(true)
      setInvoiceError(false)
      fetch('/api/stripe/invoices')
        .then((res) => {
          if (!res.ok) throw new Error('Failed to fetch invoices')
          return res.json()
        })
        .then((data) => setInvoices(data.invoices || []))
        .catch(() => setInvoiceError(true))
        .finally(() => setIsLoadingInvoices(false))
    }
  }, [planTier])

  const handleManageBilling = async () => {
    setIsLoadingPortal(true)
    try {
      const response = await fetch('/api/stripe/portal', { method: 'POST' })
      const data = await response.json()
      if (response.ok && data.url) {
        window.location.href = data.url
      } else {
        toast.error(data.error || 'Failed to open billing portal')
      }
    } catch (error) {
      toast.error('Failed to open billing portal')
    } finally {
      setIsLoadingPortal(false)
    }
  }

  const handleDeleteAccount = async () => {
    if (deleteConfirm !== 'DELETE') {
      toast.error('Please type "DELETE" to confirm')
      return
    }

    setIsDeleting(true)
    try {
      const response = await fetch('/api/user/delete', {
        method: 'DELETE',
      })

      const data = await response.json()

      if (response.ok) {
        toast.success('Account deleted successfully')
        signOut({ callbackUrl: '/' })
      } else {
        toast.error(data.error || 'Failed to delete account')
      }
    } catch (error) {
      console.error('Error deleting account:', error)
      toast.error('Failed to delete account')
    } finally {
      setIsDeleting(false)
    }
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <div className="h-6 w-px bg-border"></div>
            <h1 className="text-2xl font-bold">Account Settings</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl space-y-6">
          {/* Account Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                Account Information
              </CardTitle>
              <CardDescription>
                Your account details and information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={session.user?.name || ''}
                  disabled
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={session.user?.email || ''}
                  disabled
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          {/* Plan & Billing */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="mr-2 h-5 w-5" />
                Plan & Billing
              </CardTitle>
              <CardDescription>
                Manage your subscription and view invoices
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg border bg-muted/30">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-lg capitalize">{planTier} Plan</span>
                    {planTier === 'pro' && <Crown className="h-4 w-4 text-amber-500" />}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {planTier === 'free'
                      ? '1 banner, 6 layouts, powered-by branding'
                      : 'Unlimited banners, 13 layouts, no branding, GA4 analytics'}
                  </p>
                </div>
                {planTier === 'free' && (
                  <Button asChild>
                    <Link href="/upgrade">Upgrade to Pro</Link>
                  </Button>
                )}
              </div>

              {planTier !== 'free' && (
                <Button
                  variant="outline"
                  onClick={handleManageBilling}
                  disabled={isLoadingPortal}
                >
                  {isLoadingPortal ? (
                    'Opening...'
                  ) : (
                    <>
                      Manage Billing & Invoices
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              )}

              {/* Invoices */}
              {planTier !== 'free' && (
                <div className="pt-2">
                  <h4 className="font-medium text-sm flex items-center gap-2 mb-3">
                    <FileText className="h-4 w-4" />
                    Invoices & Receipts
                  </h4>
                  {isLoadingInvoices ? (
                    <div className="text-sm text-muted-foreground">Loading invoices...</div>
                  ) : invoiceError ? (
                    <div className="text-sm text-red-600">Failed to load invoices. You can view them in the billing portal above.</div>
                  ) : invoices.length === 0 ? (
                    <div className="text-sm text-muted-foreground">No invoices yet</div>
                  ) : (
                    <div className="space-y-2">
                      {invoices.map((inv) => (
                        <div
                          key={inv.id}
                          className="flex items-center justify-between p-3 rounded-lg border bg-muted/20"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">
                                {inv.number || 'Invoice'}
                              </span>
                              <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                                inv.status === 'paid'
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-yellow-100 text-yellow-700'
                              }`}>
                                {inv.status || 'pending'}
                              </span>
                            </div>
                            <div className="text-xs text-muted-foreground mt-0.5">
                              {new Date(inv.created * 1000).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })}
                              {' · '}
                              {new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: inv.currency,
                              }).format(inv.amount / 100)}
                            </div>
                          </div>
                          <div className="flex items-center gap-1 ml-2">
                            {inv.hosted_url && (
                              <Button variant="ghost" size="sm" asChild>
                                <a href={inv.hosted_url} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="h-3.5 w-3.5" />
                                </a>
                              </Button>
                            )}
                            {inv.pdf && (
                              <Button variant="ghost" size="sm" asChild>
                                <a href={inv.pdf} target="_blank" rel="noopener noreferrer">
                                  <Download className="h-3.5 w-3.5" />
                                </a>
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Sign Out */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="mr-2 h-5 w-5" />
                Session Management
              </CardTitle>
              <CardDescription>
                Manage your current session
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" onClick={() => signOut()}>
                Sign Out
              </Button>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="flex items-center text-red-600">
                <AlertTriangle className="mr-2 h-5 w-5" />
                Danger Zone
              </CardTitle>
              <CardDescription>
                Irreversible and destructive actions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <h4 className="font-medium text-red-800 mb-2">Delete Account</h4>
                <p className="text-sm text-red-700 mb-4">
                  Once you delete your account, there is no going back. This will permanently delete:
                </p>
                <ul className="text-sm text-red-700 list-disc list-inside mb-4">
                  <li>All your cookie consent banners</li>
                  <li>All your project configurations</li>
                  <li>All your account data</li>
                </ul>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="delete-confirm" className="text-red-800">
                      Type "DELETE" to confirm:
                    </Label>
                    <Input
                      id="delete-confirm"
                      value={deleteConfirm}
                      onChange={(e) => setDeleteConfirm(e.target.value)}
                      placeholder="DELETE"
                      className="mt-1"
                    />
                  </div>
                  
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="destructive"
                        disabled={deleteConfirm !== 'DELETE'}
                        className="w-full sm:w-auto"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Account
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete your account
                          and remove all your data from our servers. You will lose:
                          <br /><br />
                          • All your cookie consent banners<br />
                          • All your project configurations<br />
                          • All your account data<br /><br />
                          This action is irreversible.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleDeleteAccount}
                          disabled={isDeleting}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          {isDeleting ? 'Deleting...' : 'Yes, delete my account'}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
