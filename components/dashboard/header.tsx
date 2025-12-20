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
  ChevronDown as ChevronDown,
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
import { Badge } from '@/components/ui/badge'
import { InviteMemberModal } from './invite-member-modal'
import { canAccessFeature } from '@/lib/plan-restrictions'

interface HeaderProps {}

export function DashboardHeader({}: HeaderProps) {
  const { data: session } = useSession()
  const { theme, setTheme } = useTheme()
  const [notifications] = useState(3) // Mock notification count
  const [showInviteModal, setShowInviteModal] = useState(false)
  
  // Check if user has Pro plan (temporarily set to 'pro' for testing)
  const userPlan = 'pro' // TODO: Get actual user plan from database
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
            <Link href="/roadmap">
              <Bell className="h-5 w-5" />
              {notifications > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {notifications}
                </Badge>
              )}
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
              disabled
              title="Upgrade to Pro to invite collaborators"
            >
              <UserPlus className="h-5 w-5" />
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
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
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
