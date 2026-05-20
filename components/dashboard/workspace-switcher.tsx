'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
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
  LogOut,
  X
} from 'lucide-react'
import { toast } from 'react-hot-toast'

const NEW_WORKSPACE_NOTICE_KEY = 'cookie-banner:new-workspace-joined'
const WORKSPACE_NOTICE_DISMISSED_PREFIX = 'cookie-banner:workspace-notice-dismissed:'
const WORKSPACE_NOTICE_MAX_AGE = 7 * 24 * 60 * 60 * 1000

interface Workspace {
  id: string
  name: string
  userRole: string
  joinedAt: string
  owner_id: string
}

export function WorkspaceSwitcher() {
  const { data: session, update } = useSession()
  const [workspaces, setWorkspaces] = useState<Workspace[]>([])
  const [loading, setLoading] = useState(true)
  const [switching, setSwitching] = useState(false)
  const [workspaceNotice, setWorkspaceNotice] = useState<{
    teamId: string
    teamName: string
    joinedFromInvite: boolean
  } | null>(null)
  const userPlan = (session?.user?.planTier || 'free') as string
  const isPro = userPlan !== 'free'

  useEffect(() => {
    if (session?.user?.id) {
      fetchWorkspaces()
    }
  }, [session?.user?.id])

  const fetchWorkspaces = async () => {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000)
      const response = await fetch('/api/teams', { signal: controller.signal })
      clearTimeout(timeoutId)
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error('Failed to fetch workspaces:', {
          status: response.status,
          statusText: response.statusText,
          error: errorData.error || 'Unknown error',
          details: errorData.details
        })
        toast.error(errorData.error || 'Failed to load workspaces')
        return
      }
      
      const data = await response.json()
      
      if (data.success) {
        setWorkspaces(data.data || [])
      } else {
        console.error('Failed to fetch workspaces:', data.error)
        toast.error(data.error || 'Failed to load workspaces')
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

        // Update the session JWT with the new team ID, then full reload
        await update()
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
        // Refetch workspaces so local state reflects the change
        await fetchWorkspaces()
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

  // Other workspaces are all workspaces except the current one
  const otherWorkspaces = workspaces.filter(w => w.id !== currentWorkspace?.id)

  useEffect(() => {
    if (!currentWorkspace || loading) return

    try {
      const dismissedKey = `${WORKSPACE_NOTICE_DISMISSED_PREFIX}${currentWorkspace.id}`
      const rawNotice = localStorage.getItem(NEW_WORKSPACE_NOTICE_KEY)
      let nextNotice: typeof workspaceNotice = null

      if (rawNotice) {
        const parsed = JSON.parse(rawNotice) as {
          teamId?: string
          teamName?: string
          createdAt?: number
        }
        const isFresh = typeof parsed.createdAt === 'number' &&
          Date.now() - parsed.createdAt < WORKSPACE_NOTICE_MAX_AGE

        if (!isFresh) {
          localStorage.removeItem(NEW_WORKSPACE_NOTICE_KEY)
        } else if (parsed.teamId === currentWorkspace.id) {
          nextNotice = {
            teamId: currentWorkspace.id,
            teamName: parsed.teamName || currentWorkspace.name,
            joinedFromInvite: true
          }
        }
      }

      if (!nextNotice && currentWorkspace.userRole !== 'owner' && !localStorage.getItem(dismissedKey)) {
        nextNotice = {
          teamId: currentWorkspace.id,
          teamName: currentWorkspace.name,
          joinedFromInvite: false
        }
      }

      setWorkspaceNotice(nextNotice)
    } catch (error) {
      console.error('Error loading workspace notice:', error)
      setWorkspaceNotice(null)
    }
  }, [currentWorkspace?.id, currentWorkspace?.name, currentWorkspace?.userRole, loading])

  const dismissWorkspaceNotice = () => {
    if (!workspaceNotice) return

    try {
      localStorage.removeItem(NEW_WORKSPACE_NOTICE_KEY)
      localStorage.setItem(`${WORKSPACE_NOTICE_DISMISSED_PREFIX}${workspaceNotice.teamId}`, 'true')
    } catch (error) {
      console.error('Error dismissing workspace notice:', error)
    }

    setWorkspaceNotice(null)
  }

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
    <div className="space-y-2">
      {workspaceNotice && (
        <div className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900 shadow-sm">
          <div className="flex items-start gap-2">
            <div className="min-w-0 flex-1">
              <div className="font-semibold leading-snug">
                {workspaceNotice.joinedFromInvite ? `Joined ${workspaceNotice.teamName}` : `Viewing ${workspaceNotice.teamName}`}
              </div>
              <div className="mt-0.5 leading-snug text-amber-800">
                This is the workspace connected to the team plan.
              </div>
            </div>
            <button
              type="button"
              onClick={dismissWorkspaceNotice}
              className="rounded p-0.5 text-amber-700 hover:bg-amber-100 hover:text-amber-900"
              aria-label="Dismiss workspace notice"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full justify-between overflow-hidden">
            <div className="flex items-center min-w-0">
              <Building2 className="h-4 w-4 mr-2 shrink-0" />
              <span className="truncate">{currentWorkspace?.name || 'Select Workspace'}</span>
              {workspaceNotice?.joinedFromInvite && (
                <Badge className="ml-1.5 bg-emerald-600 text-white text-[10px] px-1.5 py-0 border-0 font-semibold tracking-wide shrink-0">
                  NEW
                </Badge>
              )}
              {isPro && <Badge className="ml-1.5 bg-amber-500 text-white text-[10px] px-1.5 py-0 border-0 font-semibold tracking-wide shrink-0" aria-label="Pro plan workspace">PRO</Badge>}
            </div>
            <ChevronDown className="h-4 w-4 ml-1 shrink-0" />
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
                  <div className="flex items-center gap-1.5">
                    <span className="font-medium truncate">{currentWorkspace.name}</span>
                    {workspaceNotice?.joinedFromInvite && (
                      <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 text-[10px] px-1.5 py-0">
                        NEW
                      </Badge>
                    )}
                  </div>
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
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
