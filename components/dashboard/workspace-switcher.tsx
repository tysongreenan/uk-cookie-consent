'use client'

import { useState, useEffect } from 'react'
import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { 
  Building2, 
  ChevronDown, 
  Check, 
  Users, 
  Crown,
  Edit,
  Eye,
  Loader2,
  LogOut
} from 'lucide-react'
import { toast } from 'react-hot-toast'

interface Workspace {
  id: string
  name: string
  userRole: string
  joinedAt: string
  owner_id: string
}

export function WorkspaceSwitcher() {
  const { data: session } = useSession()
  const router = useRouter()
  const [workspaces, setWorkspaces] = useState<Workspace[]>([])
  const [loading, setLoading] = useState(true)
  const [switching, setSwitching] = useState(false)

  useEffect(() => {
    fetchWorkspaces()
  }, [])

  const fetchWorkspaces = async () => {
    try {
      const response = await fetch('/api/teams')
      const data = await response.json()
      
      if (data.success) {
        setWorkspaces(data.data || [])
      } else {
        console.error('Failed to fetch workspaces:', data.error)
        toast.error('Failed to load workspaces')
      }
    } catch (error) {
      console.error('Error fetching workspaces:', error)
      toast.error('Failed to load workspaces')
    } finally {
      setLoading(false)
    }
  }

  const switchWorkspace = async (workspaceId: string) => {
    if (workspaceId === session?.user?.currentTeamId) {
      return // Already on this workspace
    }

    setSwitching(true)
    try {
      const response = await fetch('/api/user/switch-team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ teamId: workspaceId })
      })

      const data = await response.json()

      if (data.success) {
        toast.success(`Switched to ${data.data.teamName}`)
        
        // Refresh session to get updated currentTeamId
        await signIn('credentials', { redirect: false })
        
        // Reload page to fetch new workspace data
        router.refresh()
        window.location.reload()
      } else {
        toast.error(data.error || 'Failed to switch workspace')
      }
    } catch (error) {
      console.error('Error switching workspace:', error)
      toast.error('Failed to switch workspace')
    } finally {
      setSwitching(false)
    }
  }

  const leaveWorkspace = async (workspaceId: string) => {
    if (!confirm('Are you sure you want to leave this workspace? You will lose access to all banners in this workspace.')) {
      return
    }

    try {
      const response = await fetch(`/api/teams/${workspaceId}/leave`, {
        method: 'POST'
      })

      const data = await response.json()

      if (response.ok && data.success) {
        toast.success('Left workspace successfully')
        // Refresh the page to update workspace list
        router.refresh()
      } else {
        toast.error(data.error || 'Failed to leave workspace')
      }
    } catch (error) {
      console.error('Error leaving workspace:', error)
      toast.error('Failed to leave workspace')
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'owner':
        return <Crown className="h-4 w-4 text-yellow-600" />
      case 'admin':
        return <Building2 className="h-4 w-4 text-blue-600" />
      case 'editor':
        return <Edit className="h-4 w-4 text-green-600" />
      case 'viewer':
        return <Eye className="h-4 w-4 text-gray-600" />
      default:
        return <Users className="h-4 w-4 text-gray-600" />
    }
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'owner':
        return 'bg-yellow-100 text-yellow-800'
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

  // Determine current workspace: use currentTeamId if set, otherwise use the user's personal workspace (where they are owner)
  const currentWorkspace = workspaces.find(w => w.id === session?.user?.currentTeamId) || 
                          workspaces.find(w => w.userRole === 'owner')
  
  // Other workspaces are those where user is not the owner
  const otherWorkspaces = workspaces.filter(w => w.userRole !== 'owner')

  if (loading) {
    return (
      <Button variant="outline" disabled>
        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        <span className="hidden sm:inline">Loading...</span>
      </Button>
    )
  }

  if (workspaces.length === 0) {
    return (
      <Button variant="outline" disabled>
        <Building2 className="h-4 w-4 mr-2" />
        <span className="hidden sm:inline">Loading Workspaces...</span>
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="min-w-0">
          <Building2 className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline truncate max-w-32">
                {currentWorkspace?.name || 'Select Workspace'}
              </span>
          <ChevronDown className="h-4 w-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-64">
        <DropdownMenuLabel>Switch Workspace</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {/* Current Workspace */}
        {currentWorkspace && (
          <DropdownMenuItem 
            className="cursor-default"
            disabled
          >
            <div className="flex items-center w-full">
              <Check className="h-4 w-4 mr-2 text-green-600" />
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{currentWorkspace.name}</div>
                <div className="text-xs text-muted-foreground">Current workspace</div>
              </div>
              <Badge className={getRoleBadgeColor(currentWorkspace.userRole)}>
                {currentWorkspace.userRole}
              </Badge>
            </div>
          </DropdownMenuItem>
        )}

        {otherWorkspaces.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Other Workspaces</DropdownMenuLabel>
          </>
        )}

        {/* Other Workspaces */}
        {otherWorkspaces.map((workspace) => (
          <DropdownMenuItem
            key={workspace.id}
            onClick={() => switchWorkspace(workspace.id)}
            disabled={switching}
            className="cursor-pointer"
          >
            <div className="flex items-center w-full">
              {getRoleIcon(workspace.userRole)}
              <div className="flex-1 min-w-0 ml-2">
                <div className="font-medium truncate">{workspace.name}</div>
                <div className="text-xs text-muted-foreground">
                  Joined {new Date(workspace.joinedAt).toLocaleDateString()}
                </div>
              </div>
              <Badge className={getRoleBadgeColor(workspace.userRole)}>
                {workspace.userRole}
              </Badge>
            </div>
          </DropdownMenuItem>
        ))}

        {/* Leave Workspace Option - only show if not owner of current workspace */}
        {currentWorkspace && currentWorkspace.userRole !== 'owner' && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => leaveWorkspace(currentWorkspace.id)}
              className="cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Leave this workspace
            </DropdownMenuItem>
          </>
        )}

        {workspaces.length === 0 && (
          <DropdownMenuItem disabled>
            <div className="text-center text-muted-foreground py-2">
              No workspaces available
            </div>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
