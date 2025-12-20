'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { ChevronDown, Users, Plus, Settings } from '@phosphor-icons/react'
import { toast } from 'react-hot-toast'
import { Team } from '@/types'

interface TeamWithRole extends Team {
  userRole: string
  joinedAt: string
}

export function TeamSwitcher() {
  const { data: session, update } = useSession()
  const router = useRouter()
  const [teams, setTeams] = useState<TeamWithRole[]>([])
  const [loading, setLoading] = useState(true)
  const [switching, setSwitching] = useState(false)

  useEffect(() => {
    if (session?.user?.id) {
      fetchUserTeams()
    }
  }, [session])

  const fetchUserTeams = async () => {
    try {
      const response = await fetch('/api/teams')
      const data = await response.json()
      
      if (data.success) {
        setTeams(data.data || [])
      } else {
        console.error('Failed to fetch teams:', data.error)
        setTeams([])
      }
    } catch (error) {
      console.error('Error fetching teams:', error)
      setTeams([])
    } finally {
      setLoading(false)
    }
  }

  const switchTeam = async (teamId: string) => {
    if (teamId === session?.user?.currentTeamId) return

    setSwitching(true)
    try {
      const response = await fetch('/api/user/switch-team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ teamId })
      })

      const data = await response.json()

      if (data.success) {
        // Update the session with new team info
        await update()
        toast.success(data.message)
        // Refresh the page to update all team-scoped data
        router.refresh()
      } else {
        toast.error(data.error || 'Failed to switch team')
      }
    } catch (error) {
      console.error('Error switching team:', error)
      toast.error('Failed to switch team')
    } finally {
      setSwitching(false)
    }
  }

  const getRoleBadgeColor = (role: string) => {
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

  const getCurrentTeam = () => {
    return teams.find(team => team.id === session?.user?.currentTeamId)
  }

  const currentTeam = getCurrentTeam()

  if (loading) {
    return (
      <div className="flex items-center space-x-2 px-3 py-2">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600"></div>
        <span className="text-sm text-gray-500">Loading teams...</span>
      </div>
    )
  }

  if (!currentTeam) {
    return (
      <div className="flex items-center space-x-2 px-3 py-2">
        <Users className="h-4 w-4 text-gray-400" />
        <span className="text-sm text-gray-500">No workspace selected</span>
      </div>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="w-full justify-between px-3 py-2 h-auto"
          disabled={switching}
        >
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <div className="flex flex-col items-start">
              <span className="text-sm font-medium">{currentTeam.name}</span>
              <Badge 
                variant="secondary" 
                className={`text-xs ${getRoleBadgeColor(currentTeam.userRole)}`}
              >
                {currentTeam.userRole}
              </Badge>
            </div>
          </div>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="start" className="w-64">
        <div className="px-2 py-1.5">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Switch Team
          </p>
        </div>
        
        {teams.map((team) => (
          <DropdownMenuItem
            key={team.id}
            onClick={() => switchTeam(team.id)}
            className="flex items-center justify-between px-2 py-2"
            disabled={switching}
          >
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span className="text-sm">{team.name}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Badge 
                variant="secondary" 
                className={`text-xs ${getRoleBadgeColor(team.userRole)}`}
              >
                {team.userRole}
              </Badge>
              {team.id === session?.user?.currentTeamId && (
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
              )}
            </div>
          </DropdownMenuItem>
        ))}
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem
          onClick={() => router.push('/dashboard/team')}
          className="flex items-center space-x-2 px-2 py-2"
        >
          <Settings className="h-4 w-4" />
          <span className="text-sm">Team Settings</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem
          onClick={() => router.push('/dashboard/team?tab=create')}
          className="flex items-center space-x-2 px-2 py-2"
        >
          <Plus className="h-4 w-4" />
          <span className="text-sm">Create New Team</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
