'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Users, 
  UserPlus, 
  Settings, 
  MoreVertical, 
  Copy, 
  Trash2, 
  Shield,
  Crown,
  Edit,
  Eye,
  Clock,
  Mail,
  CheckCircle,
  XCircle
} from 'lucide-react'
import { toast } from 'react-hot-toast'
import { TeamMember, TeamInvitation, TeamRole, InvitationStatus } from '@/types'
import { InviteMemberModal } from '@/components/dashboard/invite-member-modal'
import { UpgradePrompt } from '@/components/dashboard/upgrade-prompt'
import { canAccessFeature } from '@/lib/plan-restrictions'

interface TeamMemberWithUser {
  id: string
  teamId: string
  userId: string
  role: TeamRole
  invitedBy?: string
  joinedAt: Date
  createdAt: Date
  updatedAt: Date
  user: {
    id: string
    name: string
    email: string
    image?: string
  }
}

interface TeamInvitationWithInviter {
  id: string
  teamId: string
  email: string
  role: Exclude<TeamRole, 'owner'>
  token: string
  invitedBy: string
  expiresAt: Date
  acceptedAt?: Date
  status: InvitationStatus
  createdAt: Date
  inviter: {
    id: string
    name: string
    email: string
  }
}

export default function TeamSettingsPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('members')
  const [loading, setLoading] = useState(true)
  const [members, setMembers] = useState<TeamMemberWithUser[]>([])
  const [invitations, setInvitations] = useState<TeamInvitationWithInviter[]>([])
  const [teamName, setTeamName] = useState('')
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [userPlan, setUserPlan] = useState<'free' | 'pro' | 'enterprise'>('free')
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    if (session?.user?.id) {
      fetchTeamData()
    }
  }, [session])

  const fetchTeamData = async () => {
    if (!session?.user?.currentTeamId) return

    try {
      // Fetch team details
      const teamResponse = await fetch(`/api/teams/${session.user.currentTeamId}`)
      const teamData = await teamResponse.json()
      
      if (teamData.success) {
        setTeamName(teamData.data.name)
      }

      // Fetch members
      const membersResponse = await fetch(`/api/teams/${session.user.currentTeamId}/members`)
      const membersData = await membersResponse.json()
      
      if (membersData.success) {
        setMembers(membersData.data || [])
      }

      // Fetch invitations
      const invitationsResponse = await fetch(`/api/teams/${session.user.currentTeamId}/invitations`)
      const invitationsData = await invitationsResponse.json()
      
      if (invitationsData.success) {
        setInvitations(invitationsData.data || [])
      }
    } catch (error) {
      console.error('Error fetching team data:', error)
      toast.error('Failed to load team data')
    } finally {
      setLoading(false)
    }
  }

  const updateMemberRole = async (memberId: string, newRole: TeamRole) => {
    try {
      const response = await fetch(`/api/teams/${session?.user?.currentTeamId}/members/${memberId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole })
      })

      const data = await response.json()

      if (data.success) {
        toast.success('Member role updated')
        fetchTeamData() // Refresh data
      } else {
        toast.error(data.error || 'Failed to update role')
      }
    } catch (error) {
      console.error('Error updating member role:', error)
      toast.error('Failed to update member role')
    }
  }

  const removeMember = async (memberId: string) => {
    if (!confirm('Are you sure you want to remove this member from the team?')) return

    try {
      const response = await fetch(`/api/teams/${session?.user?.currentTeamId}/members/${memberId}`, {
        method: 'DELETE'
      })

      const data = await response.json()

      if (data.success) {
        toast.success('Member removed from team')
        fetchTeamData() // Refresh data
      } else {
        toast.error(data.error || 'Failed to remove member')
      }
    } catch (error) {
      console.error('Error removing member:', error)
      toast.error('Failed to remove member')
    }
  }

  const revokeInvitation = async (invitationId: string) => {
    if (!confirm('Are you sure you want to revoke this invitation?')) return

    try {
      const response = await fetch(`/api/teams/${session?.user?.currentTeamId}/invitations/${invitationId}`, {
        method: 'DELETE'
      })

      const data = await response.json()

      if (data.success) {
        toast.success('Invitation revoked')
        fetchTeamData() // Refresh data
      } else {
        toast.error(data.error || 'Failed to revoke invitation')
      }
    } catch (error) {
      console.error('Error revoking invitation:', error)
      toast.error('Failed to revoke invitation')
    }
  }

  const copyInviteLink = async (token: string) => {
    const baseUrl = window.location.origin
    const inviteLink = `${baseUrl}/invite/${token}`
    
    try {
      await navigator.clipboard.writeText(inviteLink)
      toast.success('Invite link copied to clipboard')
    } catch (error) {
      console.error('Error copying to clipboard:', error)
      toast.error('Failed to copy invite link')
    }
  }

  const updateTeamName = async () => {
    if (!teamName.trim()) {
      toast.error('Team name cannot be empty')
      return
    }

    setUpdating(true)
    try {
      const response = await fetch(`/api/teams/${session?.user?.currentTeamId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: teamName.trim() })
      })

      const data = await response.json()

      if (data.success) {
        toast.success('Team name updated')
      } else {
        toast.error(data.error || 'Failed to update team name')
      }
    } catch (error) {
      console.error('Error updating team name:', error)
      toast.error('Failed to update team name')
    } finally {
      setUpdating(false)
    }
  }

  const getRoleIcon = (role: TeamRole) => {
    switch (role) {
      case 'owner':
        return <Crown className="h-4 w-4 text-purple-600" />
      case 'admin':
        return <Shield className="h-4 w-4 text-blue-600" />
      case 'editor':
        return <Edit className="h-4 w-4 text-green-600" />
      case 'viewer':
        return <Eye className="h-4 w-4 text-gray-600" />
      default:
        return <Users className="h-4 w-4 text-gray-600" />
    }
  }

  const getRoleBadgeColor = (role: TeamRole) => {
    switch (role) {
      case 'owner':
        return 'bg-purple-100 text-purple-800'
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = now.getTime() - date.getTime()
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) {
      return 'Today'
    } else if (diffDays === 1) {
      return 'Yesterday'
    } else if (diffDays < 7) {
      return `${diffDays} days ago`
    } else {
      return date.toLocaleDateString()
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

  const canManageMembers = ['owner', 'admin'].includes(session?.user?.userRole || '')
  const canManageTeam = ['owner', 'admin'].includes(session?.user?.userRole || '')
  const isOwner = session?.user?.userRole === 'owner'

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading team settings...</p>
        </div>
      </div>
    )
  }

  if (!canManageMembers) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Alert className="max-w-md">
          <XCircle className="h-4 w-4" />
          <AlertDescription>
            You don't have permission to manage team settings. Only team owners and admins can access this page.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Team Settings</h1>
        <p className="text-muted-foreground">
          Manage your team members, invitations, and team settings.
        </p>
      </div>

      {/* Plan Gate */}
      {!canAccessFeature(userPlan, 'hasTeamCollaboration') && (
        <UpgradePrompt 
          feature="Team Collaboration"
          description="Invite team members, set role-based permissions, and collaborate on banners"
          variant="banner"
        />
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="invitations">Invitations</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="members" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5" />
                    <span>Team Members</span>
                  </CardTitle>
                  <CardDescription>
                    Manage team members and their roles
                  </CardDescription>
                </div>
                <Button onClick={() => setShowInviteModal(true)}>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Invite Member
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {members.length === 0 ? (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No team members</h3>
                  <p className="text-gray-600 mb-4">Invite team members to get started.</p>
                  <Button onClick={() => setShowInviteModal(true)}>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Invite First Member
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {members.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                          <span className="text-sm font-medium">
                            {member.user.name?.charAt(0) || member.user.email.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{member.user.name || 'No name'}</span>
                            {getRoleIcon(member.role)}
                          </div>
                          <p className="text-sm text-gray-600">{member.user.email}</p>
                          <p className="text-xs text-gray-500">Joined {formatDate(member.joinedAt.toString())}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getRoleBadgeColor(member.role)}>
                          {member.role}
                        </Badge>
                        {isOwner && member.role !== 'owner' && (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => updateMemberRole(member.id, 'admin')}>
                                <Shield className="h-4 w-4 mr-2" />
                                Make Admin
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => updateMemberRole(member.id, 'editor')}>
                                <Edit className="h-4 w-4 mr-2" />
                                Make Editor
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => updateMemberRole(member.id, 'viewer')}>
                                <Eye className="h-4 w-4 mr-2" />
                                Make Viewer
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                onClick={() => removeMember(member.id)}
                                className="text-red-600"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Remove from Team
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invitations" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Mail className="h-5 w-5" />
                    <span>Pending Invitations</span>
                  </CardTitle>
                  <CardDescription>
                    Manage team invitations and invite links
                  </CardDescription>
                </div>
                <Button onClick={() => setShowInviteModal(true)}>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Invite Member
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {invitations.length === 0 ? (
                <div className="text-center py-8">
                  <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No pending invitations</h3>
                  <p className="text-gray-600 mb-4">Invite team members to get started.</p>
                  <Button onClick={() => setShowInviteModal(true)}>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Send First Invitation
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {invitations.map((invitation) => (
                    <div key={invitation.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                          <Mail className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{invitation.email}</span>
                            <Badge className={getRoleBadgeColor(invitation.role)}>
                              {invitation.role}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">
                            Invited by {invitation.inviter.name} • {formatDate(invitation.createdAt.toString())}
                          </p>
                          <p className="text-xs text-gray-500">
                            <Clock className="h-3 w-3 inline mr-1" />
                            {formatExpiryDate(invitation.expiresAt.toString())}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyInviteLink(invitation.token)}
                        >
                          <Copy className="h-4 w-4 mr-2" />
                          Copy Link
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => revokeInvitation(invitation.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Revoke
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>Team Settings</span>
              </CardTitle>
              <CardDescription>
                Manage your team's basic settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="team-name">Team Name</Label>
                <div className="flex space-x-2">
                  <Input
                    id="team-name"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="Enter team name"
                  />
                  <Button 
                    onClick={updateTeamName}
                    disabled={updating}
                  >
                    {updating ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </div>

              {isOwner && (
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-red-600 mb-4">Danger Zone</h3>
                  <div className="space-y-4">
                    <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                      <h4 className="font-medium text-red-800">Delete Team</h4>
                      <p className="text-sm text-red-600 mb-3">
                        Permanently delete this team and all associated data. This action cannot be undone.
                      </p>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Team
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {showInviteModal && (
        <InviteMemberModal
          onClose={() => setShowInviteModal(false)}
          onSuccess={() => {
            setShowInviteModal(false)
            fetchTeamData()
          }}
        />
      )}
    </div>
  )
}
