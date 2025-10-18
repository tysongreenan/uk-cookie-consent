'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, XCircle, Loader2, Users, Calendar, Shield } from 'lucide-react'

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
  const [invitation, setInvitation] = useState<InvitationData | null>(null)
  const [loading, setLoading] = useState(true)
  const [accepting, setAccepting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

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
    try {
      const response = await fetch(`/api/invitations/${params.token}/accept`, {
        method: 'POST'
      })
      const data = await response.json()

    if (data.success) {
      setSuccess(true)
      // Redirect to dashboard after 3 seconds to show success message
      setTimeout(() => {
        router.push('/dashboard')
      }, 3000)
    } else {
        setError(data.error || 'Failed to accept invitation')
      }
    } catch (err) {
      setError('Failed to accept invitation')
    } finally {
      setAccepting(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const isExpired = invitation && new Date(invitation.expires_at) < new Date()

  if (loading) {
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
            <CardTitle className="text-xl">Invitation Not Found</CardTitle>
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
              You've successfully joined the workspace. You can switch to this workspace using the workspace switcher in the dashboard header.
            </CardDescription>
          </CardHeader>
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
            You've been invited to join a workspace
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

          {/* Status */}
          <div className="flex items-center gap-2 text-sm">
            <Shield className="h-4 w-4" />
            <span>Status: </span>
            <Badge variant={invitation.status === 'pending' ? 'default' : 'secondary'}>
              {invitation.status}
            </Badge>
          </div>

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
                  Decline
                </Button>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="text-xs text-gray-500 text-center">
            By accepting this invitation, you'll gain access to collaborate on banners and projects in this workspace.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}