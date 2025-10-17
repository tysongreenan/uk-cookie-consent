'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
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
  Mail, 
  Copy, 
  CheckCircle, 
  XCircle, 
  Shield, 
  Edit, 
  Eye,
  Send,
  Link as LinkIcon
} from 'lucide-react'
import { toast } from 'react-hot-toast'
import { TeamRole } from '@/types'

interface InviteMemberModalProps {
  onClose: () => void
  onSuccess: () => void
}

export function InviteMemberModal({ onClose, onSuccess }: InviteMemberModalProps) {
  const { data: session } = useSession()
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<Exclude<TeamRole, 'owner'>>('editor')
  const [sendEmail, setSendEmail] = useState(true)
  const [loading, setLoading] = useState(false)
  const [inviteLink, setInviteLink] = useState('')
  const [inviteSent, setInviteSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email.trim() || !email.includes('@')) {
      toast.error('Please enter a valid email address')
      return
    }

    if (!session?.user?.currentTeamId) {
      toast.error('No team selected')
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`/api/teams/${session.user.currentTeamId}/invitations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          role,
          sendEmail
        })
      })

      const data = await response.json()

      if (data.success) {
        setInviteLink(data.data.inviteLink)
        setInviteSent(true)
        toast.success('Invitation created successfully!')
      } else {
        toast.error(data.error || 'Failed to create invitation')
      }
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
        return <Mail className="h-4 w-4 text-gray-600" />
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

  if (inviteSent) {
    return (
      <Dialog open onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span>Invitation Sent!</span>
            </DialogTitle>
            <DialogDescription>
              The invitation has been created successfully.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Mail className="h-4 w-4 text-green-600" />
                <span className="font-medium text-green-800">{email}</span>
                <Badge className={getRoleBadgeColor(role)}>
                  {role}
                </Badge>
              </div>
              <p className="text-sm text-green-700">
                {getRoleDescription(role)}
              </p>
            </div>

            <div className="space-y-2">
              <Label>Invite Link</Label>
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
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-600">
                Share this link with {email} to join your team
              </p>
            </div>

            <div className="flex space-x-2">
              <Button onClick={onSuccess} className="flex-1">
                <CheckCircle className="h-4 w-4 mr-2" />
                Done
              </Button>
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Mail className="h-5 w-5" />
            <span>Invite Team Member</span>
          </DialogTitle>
          <DialogDescription>
            Send an invitation to join your team with a specific role.
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
              <SelectTrigger>
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

          <div className="flex items-center space-x-2">
            <Switch
              id="send-email"
              checked={sendEmail}
              onCheckedChange={setSendEmail}
            />
            <Label htmlFor="send-email" className="text-sm">
              Send email invitation
            </Label>
          </div>

          {!sendEmail && (
            <Alert>
              <LinkIcon className="h-4 w-4" />
              <AlertDescription>
                An invite link will be generated that you can share manually.
              </AlertDescription>
            </Alert>
          )}

          <div className="flex space-x-2">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2" />
                  Creating...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Send Invitation
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
