'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
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
import { ArrowLeft, User, Mail, Trash2, AlertTriangle } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'react-hot-toast'

export default function SettingsPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState('')

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
              <div className="text-sm text-muted-foreground">
                <p>Account created: {new Date().toLocaleDateString()}</p>
                <p>Last login: {new Date().toLocaleDateString()}</p>
              </div>
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
