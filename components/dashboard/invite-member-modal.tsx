'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Copy,
  CheckCircle,
  XCircle,
  Shield,
  Edit,
  Eye,
  Send,
  Link as LinkIcon,
  Loader2
} from 'lucide-react'
import { toast } from 'react-hot-toast'
import { TeamRole } from '@/types'

interface InviteMemberModalProps {
  open?: boolean
  onClose: () => void
  onSuccess: () => void
}

type InviteResult = 'idle' | 'sent' | 'email_failed'

export function InviteMemberModal({ open = true, onClose, onSuccess }: InviteMemberModalProps) {
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<Exclude<TeamRole, 'owner'>>('editor')
  const [loading, setLoading] = useState(false)
  const [inviteLink, setInviteLink] = useState('')
  const [result, setResult] = useState<InviteResult>('idle')
  const [emailError, setEmailError] = useState('')

  // Reset state when modal reopens
  useEffect(() => {
    if (open) {
      setEmail('')
      setRole('editor')
      setInviteLink('')
      setResult('idle')
      setEmailError('')
      setLoading(false)
    }
  }, [open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email.trim() || !email.includes('@')) {
      toast.error('Please enter a valid email address')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/workspace/invitations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          role
        })
      })

      const data = await response.json()
      const link = data.data?.inviteLink as string | undefined

      if (data.success && data.emailSent && link) {
        setInviteLink(link)
        setResult('sent')
        toast.success('Invitation email sent')
        return
      }

      if (link) {
        setInviteLink(link)
        setEmailError(data.error || 'The invitation was saved, but we could not send the email.')
        setResult('email_failed')
        toast.error(data.error || 'Invitation email failed to send')
        return
      }

      toast.error(data.error || 'Failed to create invitation')
    } catch (error) {
      console.error('Error creating invitation:', error)
      toast.error('Failed to create invitation')
    } finally {
      setLoading(false)
    }
  }

  const copyInviteLink = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink)
      toast.success('Invite link copied to clipboard!')
    } catch (error) {
      console.error('Error copying to clipboard:', error)
      toast.error('Failed to copy invite link')
    }
  }

  const getRoleIcon = (role: TeamRole) => {
    switch (role) {
      case 'admin':
        return <Shield className="h-4 w-4 text-blue-600" />
      case 'editor':
        return <Edit className="h-4 w-4 text-green-600" />
      case 'viewer':
        return <Eye className="h-4 w-4 text-gray-600" />
      default:
        return <LinkIcon className="h-4 w-4 text-gray-600" />
    }
  }

  const getRoleBadgeColor = (role: TeamRole) => {
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

  const getRoleDescription = (role: TeamRole) => {
    switch (role) {
      case 'admin':
        return 'Can manage team members, invitations, and all banners'
      case 'editor':
        return 'Can create and edit banners, view analytics'
      case 'viewer':
        return 'Can view banners and analytics only'
      default:
        return ''
    }
  }

  if (result === 'sent' || result === 'email_failed') {
    const emailSent = result === 'sent'

    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              {emailSent ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <XCircle className="h-5 w-5 text-red-600" />
              )}
              <span>{emailSent ? 'Invitation email sent' : 'Invitation email failed'}</span>
            </DialogTitle>
            <DialogDescription>
              {emailSent
                ? `We emailed ${email} a link to join your workspace. The invite expires in 7 days.`
                : emailError}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div
              className={
                emailSent
                  ? 'p-4 bg-green-50 border border-green-200 rounded-lg'
                  : 'p-4 bg-red-50 border border-red-200 rounded-lg'
              }
            >
              <div className="flex items-center space-x-2 mb-2">
                {emailSent ? (
                  <Send className="h-4 w-4 text-green-600" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-600" />
                )}
                <span className={emailSent ? 'font-medium text-green-800' : 'font-medium text-red-800'}>
                  {email}
                </span>
                <Badge className={getRoleBadgeColor(role)}>
                  {role}
                </Badge>
              </div>
              <p className={emailSent ? 'text-sm text-green-700' : 'text-sm text-red-700'}>
                {emailSent
                  ? getRoleDescription(role)
                  : 'The invite was saved. Share the backup link below, or try sending again.'}
              </p>
            </div>

            <div className="space-y-2">
              <Label>{emailSent ? 'Backup invite link' : 'Invite link'}</Label>
              <div className="flex space-x-2">
                <Input
                  value={inviteLink}
                  readOnly
                  className="font-mono text-sm"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyInviteLink}
                  aria-label="Copy invite link"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-600">
                {emailSent
                  ? 'Copy this link if they do not receive the email.'
                  : 'Email was not sent. Copy this link and share it yourself.'}
              </p>
            </div>

            <Button onClick={onSuccess} className="w-full">
              {emailSent ? (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Done
                </>
              ) : (
                'Close'
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Send className="h-5 w-5" />
            <span>Invite Team Member</span>
          </DialogTitle>
          <DialogDescription>
            We will email them an invitation to join your workspace. The link expires in 7 days.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="colleague@company.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select value={role} onValueChange={(value: Exclude<TeamRole, 'owner'>) => setRole(value)}>
              <SelectTrigger id="role">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">
                  <div className="flex items-center space-x-2">
                    {getRoleIcon('admin')}
                    <div>
                      <div className="font-medium">Admin</div>
                      <div className="text-xs text-gray-600">Manage team and all banners</div>
                    </div>
                  </div>
                </SelectItem>
                <SelectItem value="editor">
                  <div className="flex items-center space-x-2">
                    {getRoleIcon('editor')}
                    <div>
                      <div className="font-medium">Editor</div>
                      <div className="text-xs text-gray-600">Create and edit banners</div>
                    </div>
                  </div>
                </SelectItem>
                <SelectItem value="viewer">
                  <div className="flex items-center space-x-2">
                    {getRoleIcon('viewer')}
                    <div>
                      <div className="font-medium">Viewer</div>
                      <div className="text-xs text-gray-600">View banners and analytics</div>
                    </div>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-600">
              {getRoleDescription(role)}
            </p>
          </div>

          <Alert>
            <Send className="h-4 w-4" />
            <AlertDescription>
              We will email the invitation from cookie-banner.ca. After it sends, you can also copy a backup link.
            </AlertDescription>
          </Alert>

          <div className="flex space-x-2">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Send invitation
                </>
              )}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
