'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Users, User, Mail, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import { toast } from 'react-hot-toast'
import Link from 'next/link'

interface InvitationData {
  id: string
  email: string
  role: string
  expiresAt: string
  status: string
  createdAt: string
  team: {
    id: string
    name: string
  }
  inviter: {
    id: string
    name: string
    email: string
  }
}

interface InvitePageProps {
  params: {
    token: string
  }
}

export default function InvitePage({ params }: InvitePageProps) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [invitation, setInvitation] = useState<InvitationData | null>(null)
  const [loading, setLoading] = useState(true)
  const [accepting, setAccepting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchInvitation()
  }, [params.token])

  const fetchInvitation = async () => {
    try {
      const response = await fetch(`/api/invitations/${params.token}`)
      const data = await response.json()

      if (data.success) {
        setInvitation(data.data)
      } else {
        setError(data.error || 'Invitation not found')
      }
    } catch (error) {
      console.error('Error fetching invitation:', error)
      setError('Failed to load invitation')
    } finally {
      setLoading(false)
    }
  }

  const acceptInvitation = async () => {
    if (!invitation) return

    setAccepting(true)
    try {
      const response = await fetch(`/api/invitations/${params.token}/accept`, {
        method: 'POST'
      })

      const data = await response.json()

      if (data.success) {
        toast.success(data.message)
        router.push('/dashboard')
      } else {
        toast.error(data.error || 'Failed to accept invitation')
      }
    } catch (error) {
      console.error('Error accepting invitation:', error)
      toast.error('Failed to accept invitation')
    } finally {
      setAccepting(false)
    }
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-blue-100 text-blue-800'
      case 'editor':
        return 'bg-green-100 text-green-800'
      case 'viewer':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatExpiryDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = date.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 0) {
      return 'Expired'
    } else if (diffDays === 0) {
      return 'Expires today'
    } else if (diffDays === 1) {
      return 'Expires tomorrow'
    } else {
      return `Expires in ${diffDays} days`
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading invitation...</p>
        </div>
      </div>
    )
  }

  if (error || !invitation) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <CardTitle className="text-xl">Invalid Invitation</CardTitle>
            <CardDescription>
              {error || 'This invitation link is invalid or has expired.'}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button asChild>
              <Link href="/">Go to Homepage</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const isExpired = new Date(invitation.expiresAt) < new Date()
  const isAlreadyAccepted = invitation.status === 'accepted'

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <CardTitle className="text-2xl">Team Invitation</CardTitle>
          <CardDescription>
            You've been invited to join a team
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {isExpired && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                This invitation has expired. Please contact the team owner for a new invitation.
              </AlertDescription>
            </Alert>
          )}

          {isAlreadyAccepted && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                You have already accepted this invitation.
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold">{invitation.team.name}</h3>
                <p className="text-sm text-gray-600">Team</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <User className="h-5 w-5 text-gray-600" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold">{invitation.inviter.name}</h3>
                <p className="text-sm text-gray-600">Invited you as</p>
                <Badge className={`mt-1 ${getRoleBadgeColor(invitation.role)}`}>
                  {invitation.role}
                </Badge>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-gray-600" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold">{invitation.email}</h3>
                <p className="text-sm text-gray-600">Email address</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-gray-600" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold">{formatExpiryDate(invitation.expiresAt)}</h3>
                <p className="text-sm text-gray-600">Invitation expires</p>
              </div>
            </div>
          </div>

          {session ? (
            // User is logged in
            <div className="space-y-3">
              {session.user.email?.toLowerCase() !== invitation.email.toLowerCase() ? (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    This invitation is for {invitation.email}, but you're signed in as {session.user.email}.
                    Please sign out and sign in with the correct account.
                  </AlertDescription>
                </Alert>
              ) : (
                <Button 
                  onClick={acceptInvitation}
                  disabled={accepting || isExpired || isAlreadyAccepted}
                  className="w-full"
                >
                  {accepting ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2" />
                      Joining Team...
                    </>
                  ) : (
                    `Join ${invitation.team.name}`
                  )}
                </Button>
              )}
            </div>
          ) : (
            // User is not logged in
            <div className="space-y-3">
              <Button asChild className="w-full">
                <Link href={`/auth/signup?invite=${params.token}`}>
                  Sign Up with {invitation.email}
                </Link>
              </Button>
              
              <div className="text-center">
                <span className="text-sm text-gray-600">Already have an account? </span>
                <Link 
                  href={`/auth/signin?invite=${params.token}`}
                  className="text-sm text-blue-600 hover:text-blue-500"
                >
                  Sign In
                </Link>
              </div>
            </div>
          )}

          <div className="text-center">
            <Link 
              href="/"
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              ← Back to Homepage
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
