'use client'

import { useState } from 'react'
import { Sidebar } from './sidebar'
import { DashboardHeader } from './header'
import { cn } from '@/lib/utils'

interface DashboardLayoutProps {
  children: React.ReactNode
  className?: string
}

export function DashboardLayout({ children, className }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader 
        onMenuToggle={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
      />
      
      <div className="flex">
        {/* Sidebar */}
        <div className={cn(
          'transition-all duration-300 ease-in-out',
          isSidebarOpen ? 'w-64' : 'w-0 overflow-hidden'
        )}>
          <div className="fixed left-0 top-16 bottom-0 w-64 bg-background border-r border-border z-30">
            <Sidebar />
          </div>
        </div>

        {/* Main Content */}
        <main className={cn(
          'flex-1 transition-all duration-300 ease-in-out',
          isSidebarOpen ? 'ml-64' : 'ml-0',
          className
        )}>
          {children}
        </main>
      </div>
    </div>
  )
}
