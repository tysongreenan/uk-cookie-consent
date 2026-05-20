'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { CheckCircle, XCircle, Loader2, Users, Calendar, Shield, LogIn, AlertTriangle } from 'lucide-react'

interface InvitationData {
  id: string
  team_id: string
  email: string
  role: string
  token: string
  expires_at: string
  status: string
  invited_by: string
  Team?: {
    id: string
    name: string
    owner_id: string
  }
  InvitedBy?: {
    id: string
    name: string
    email: string
  }
}

export default function InvitePage({ params }: { params: { token: string } }) {
  const { data: session, status: sessionStatus } = useSession()
  const [invitation, setInvitation] = useState<InvitationData | null>(null)
  const [loading, setLoading] = useState(true)
  const [accepting, setAccepting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [emailMismatch, setEmailMismatch] = useState(false)
  const [success, setSuccess] = useState(false)
  const [acceptedWorkspaceName, setAcceptedWorkspaceName] = useState<string | null>(null)
  const router = useRouter()

  const callbackUrl = encodeURIComponent(`/invite/${params.token}`)
  const isAuthenticated = sessionStatus === 'authenticated'
  const isAuthLoading = sessionStatus === 'loading'

  useEffect(() => {
    const fetchInvitation = async () => {
      try {
        const response = await fetch(`/api/invitations/${params.token}`)
        const data = await response.json()

        if (data.success) {
          setInvitation(data.invitation)
        } else {
          setError(data.error || 'Invitation not found')
        }
      } catch (err) {
        setError('Failed to load invitation')
      } finally {
        setLoading(false)
      }
    }

    fetchInvitation()
  }, [params.token])

  const handleAcceptInvitation = async () => {
    setAccepting(true)
    setEmailMismatch(false)
    try {
      const response = await fetch(`/api/invitations/${params.token}/accept`, {
        method: 'POST'
      })
      const data = await response.json()

      if (data.success) {
        const acceptedTeam = data.team || invitation?.Team
        const teamId = acceptedTeam?.id || invitation?.team_id
        const teamName = acceptedTeam?.name || invitation?.Team?.name || 'your new workspace'

        setAcceptedWorkspaceName(teamName)

        if (teamId && typeof window !== 'undefined') {
          localStorage.setItem('cookie-banner:new-workspace-joined', JSON.stringify({
            teamId,
            teamName,
            createdAt: Date.now()
          }))
        }

        setSuccess(true)
        setTimeout(() => {
          router.push('/dashboard')
        }, 3000)
      } else if (data.emailMismatch) {
        setEmailMismatch(true)
      } else {
        setError(data.error || 'Failed to accept invitation')
      }
    } catch (err) {
      setError('Failed to accept invitation')
    } finally {
      setAccepting(false)
    }
  }

  const handleSignOutAndRetry = async () => {
    await signOut({ callbackUrl: `/invite/${params.token}` })
  }

  const maskEmail = (email: string) => {
    const [local, domain] = email.split('@')
    if (!domain) return email
    const visible = local.slice(0, 2)
    return `${visible}${'*'.repeat(Math.max(local.length - 2, 1))}@${domain}`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const isExpired = invitation && new Date(invitation.expires_at) < new Date()

  if (loading || isAuthLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading invitation...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <CardTitle className="text-xl">Something Went Wrong</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push('/')} className="w-full">
              Go to Homepage
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <CardTitle className="text-xl">Welcome to the Team!</CardTitle>
            <CardDescription>
              You&apos;re now viewing {acceptedWorkspaceName || 'your new workspace'}.
              We&apos;ll highlight it in the dashboard workspace menu.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push('/dashboard')} className="w-full">
              Go to Dashboard
            </Button>
            <p className="text-xs text-gray-400 text-center mt-2">Redirecting automatically...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!invitation) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <CardTitle className="text-xl">Invalid Invitation</CardTitle>
            <CardDescription>The invitation link is invalid or has expired.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push('/')} className="w-full">
              Go to Homepage
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <Users className="h-12 w-12 text-blue-500 mx-auto mb-4" />
          <CardTitle className="text-2xl">Workspace Invitation</CardTitle>
          <CardDescription>
            You&apos;ve been invited to join a workspace
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Workspace Info */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Workspace Details</h3>
            <p className="text-blue-800">
              <strong>Workspace:</strong> {invitation.Team?.name || 'Unknown Workspace'}
            </p>
            <p className="text-blue-800">
              <strong>Invited by:</strong> {invitation.InvitedBy?.name || invitation.InvitedBy?.email || 'Unknown'}
            </p>
            <p className="text-blue-800">
              <strong>Your role:</strong> {invitation.role}
            </p>
          </div>

          {/* Expiration Info */}
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4" />
            <span>Expires on {formatDate(invitation.expires_at)}</span>
            {isExpired && (
              <Badge variant="destructive">Expired</Badge>
            )}
          </div>

          {/* Email mismatch warning — shown inline, not a dead end */}
          {emailMismatch && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <p className="mb-2">
                  This invitation was sent to <strong>{maskEmail(invitation.email)}</strong>.
                  You&apos;re currently signed in as <strong>{session?.user?.email}</strong>.
                </p>
                <p className="text-sm">
                  Please sign in with the email address that received this invitation.
                </p>
              </AlertDescription>
            </Alert>
          )}

          {/* Actions */}
          <div className="space-y-3">
            {isExpired ? (
              <div className="text-center">
                <p className="text-red-600 mb-4">This invitation has expired.</p>
                <Button onClick={() => router.push('/')} variant="outline" className="w-full">
                  Go to Homepage
                </Button>
              </div>
            ) : invitation.status !== 'pending' ? (
              <div className="text-center">
                <p className="text-gray-600 mb-4">This invitation has already been processed.</p>
                <Button onClick={() => router.push('/')} variant="outline" className="w-full">
                  Go to Homepage
                </Button>
              </div>
            ) : emailMismatch ? (
              <div className="space-y-3">
                <Button
                  onClick={handleSignOutAndRetry}
                  className="w-full"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In with a Different Account
                </Button>
                <Button
                  onClick={() => router.push('/')}
                  variant="outline"
                  className="w-full"
                >
                  Go to Homepage
                </Button>
              </div>
            ) : !isAuthenticated ? (
              <div className="space-y-3">
                <p className="text-sm text-gray-600 text-center">
                  You need to sign in to accept this invitation.
                </p>
                <Button
                  onClick={() => router.push(`/auth/signin?callbackUrl=${callbackUrl}`)}
                  className="w-full"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In to Accept
                </Button>
                <Button
                  onClick={() => router.push(`/auth/signup?callbackUrl=${callbackUrl}`)}
                  variant="outline"
                  className="w-full"
                >
                  Create an Account
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <Button
                  onClick={handleAcceptInvitation}
                  disabled={accepting}
                  className="w-full"
                >
                  {accepting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Accepting...
                    </>
                  ) : (
                    'Accept Invitation'
                  )}
                </Button>
                <Button
                  onClick={() => router.push('/')}
                  variant="outline"
                  className="w-full"
                >
                  Not Now
                </Button>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="text-xs text-gray-500 text-center">
            By accepting this invitation, you&apos;ll gain access to collaborate on banners and projects in this workspace.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
