'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface AnnouncementContextType {
  isVisible: boolean
  setIsVisible: (visible: boolean) => void
}

const AnnouncementContext = createContext<AnnouncementContextType | undefined>(undefined)

export function AnnouncementProvider({ children }: { children: ReactNode }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user has dismissed this before
    const dismissed = localStorage.getItem('update-announcement-dismissed')
    if (dismissed !== 'true') {
      // Show announcement after 2 seconds
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleSetVisible = (visible: boolean) => {
    setIsVisible(visible)
    if (!visible) {
      localStorage.setItem('update-announcement-dismissed', 'true')
    }
  }

  return (
    <AnnouncementContext.Provider value={{ isVisible, setIsVisible: handleSetVisible }}>
      {children}
    </AnnouncementContext.Provider>
  )
}

export function useAnnouncement() {
  const context = useContext(AnnouncementContext)
  if (context === undefined) {
    throw new Error('useAnnouncement must be used within an AnnouncementProvider')
  }
  return context
}
