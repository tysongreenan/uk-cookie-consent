'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Copy, 
  ExternalLink,
  Eye,
  Settings
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import { NewBadge } from '@/components/ui/new-badge'
import { needsMigration } from '@/lib/banner-migration'
import { BannerPreview } from '@/components/banner/banner-preview'

interface Banner {
  id: string
  name: string
  config: any
  isActive: boolean
  createdAt: string
  updatedAt: string
}

interface BannerCardProps {
  banner: Banner
  onToggle: (id: string, isActive: boolean) => void
  onDelete: (id: string) => void
  onCopy: (id: string) => void
  onCopyEmbed?: (id: string) => void
}

export function BannerCard({ banner, onToggle, onDelete, onCopy, onCopyEmbed }: BannerCardProps) {
  const isUpdated = needsMigration(banner.config)
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const getStatusColor = (isActive: boolean) => {
    return isActive ? 'bg-green-500' : 'bg-gray-400'
  }

  const getStatusText = (isActive: boolean) => {
    return isActive ? 'Active' : 'Inactive'
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 border-border/50 hover:border-border">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
                {banner.name}
              </CardTitle>
              {isUpdated && <NewBadge variant="sparkle" size="sm" />}
            </div>
            <CardDescription className="text-sm">
              Created {formatDate(banner.createdAt)}
            </CardDescription>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${getStatusColor(banner.isActive)}`} />
              <span className="text-xs text-muted-foreground">
                {getStatusText(banner.isActive)}
              </span>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={`/dashboard/builder?id=${banner.id}`}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Banner
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onCopy(banner.id)}>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Static Code
                </DropdownMenuItem>
                {onCopyEmbed && (
                  <DropdownMenuItem onClick={() => onCopyEmbed(banner.id)}>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Embed Code
                    <NewBadge variant="sparkle" className="ml-2" />
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem>
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Live
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={() => onDelete(banner.id)}
                  className="text-red-600 focus:text-red-600"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-4">
          {/* Banner Preview */}
          <div className="aspect-video bg-muted/50 rounded-lg border border-border/50 overflow-hidden">
            {banner.config && typeof banner.config === 'object' ? (
              <div className="h-full w-full">
                <BannerPreview config={banner.config} />
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-12 h-12 bg-muted-foreground/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
                    <Settings className="w-6 h-6 text-muted-foreground/50" />
                  </div>
                  <p className="text-xs text-muted-foreground">Banner Preview</p>
                </div>
              </div>
            )}
          </div>

          {/* Banner Info */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <p className="text-muted-foreground">Position</p>
              <p className="font-medium capitalize">
                {banner.config?.position || 'Bottom'}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Theme</p>
              <p className="font-medium capitalize">
                {banner.config?.theme || 'Dark'}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-2">
              <Switch
                checked={banner.isActive}
                onCheckedChange={(checked) => onToggle(banner.id, checked)}
                className="data-[state=checked]:bg-primary"
              />
              <span className="text-sm text-muted-foreground">
                {banner.isActive ? 'Enabled' : 'Disabled'}
              </span>
            </div>
            
            <Button size="sm" asChild>
              <Link href={`/dashboard/builder?id=${banner.id}`}>
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
