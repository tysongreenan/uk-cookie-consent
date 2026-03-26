'use client'

import { TeamSettings } from '@/components/dashboard/team-settings'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function TeamSettingsPage() {
  const router = useRouter()

  return (
    <div className="container mx-auto py-6">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => router.back()}
        className="mb-4"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>
      <TeamSettings />
    </div>
  )
}
