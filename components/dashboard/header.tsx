'use client'

import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { 
  Bell, 
  Moon, 
  Sun, 
  User, 
  Settings, 
  LogOut, 
  ChevronDown,
  UserPlus
} from 'lucide-react'
import { useTheme } from 'next-themes'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { InviteMemberModal } from './invite-member-modal'
import { canAccessFeature } from '@/lib/plan-restrictions'
import { PlanTier } from '@/types'

interface HeaderProps {}

export function DashboardHeader({}: HeaderProps) {
  const { data: session } = useSession()
  const { theme, setTheme } = useTheme()
  const [showInviteModal, setShowInviteModal] = useState(false)
  
  const userPlan = (session?.user?.planTier || 'free') as PlanTier
  const canInvite = canAccessFeature(userPlan, 'hasTeamCollaboration')

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' })
  }

  return (
    <header className="w-full border-b border-border bg-background">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Left side - empty since workspace switcher is now in sidebar */}
        <div></div>

        {/* Right side - Notifications, Invite, Theme, User */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative" asChild>
            <Link href="/roadmap" title="Product updates">
              <Bell className="h-5 w-5" />
            </Link>
          </Button>

          {/* Invite Button */}
          {canInvite ? (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowInviteModal(true)}
              title="Invite collaborators to your workspace"
            >
              <UserPlus className="h-5 w-5" />
            </Button>
          ) : (
            <Button 
              variant="ghost" 
              size="sm" 
              asChild
              title="Upgrade to Pro to invite collaborators"
            >
              <Link href="/upgrade">
                <UserPlus className="h-5 w-5" />
              </Link>
            </Button>
          )}

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2 px-2">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-primary-foreground" />
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium">
                    {session?.user?.name || 'User'}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {session?.user?.email}
                  </p>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <InviteMemberModal 
          onClose={() => setShowInviteModal(false)}
          onSuccess={() => setShowInviteModal(false)}
        />
      )}
    </header>
  )
}
