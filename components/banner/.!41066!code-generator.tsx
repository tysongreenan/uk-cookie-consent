'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Copy, Download, RefreshCw, Globe } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { BannerConfig } from '@/types'
import { 
  generateBannerHTML, 
  generateBannerCSS, 
  generateBannerJS, 
  generateConsentInitScript,
  generateConsentInitScript as generateConsentInitScriptUtil
} from '@/lib/banner-generator'

interface CodeGeneratorProps {
  config: BannerConfig
  bannerId?: string
  updatedAt?: string | Date // Not used for URL, but kept for potential future use
}

export function CodeGenerator({ config, bannerId, updatedAt }: CodeGeneratorProps) {
  const [activeTab, setActiveTab] = useState<'head' | 'body' | 'hosted'>('head')
  const [codeVersion, setCodeVersion] = useState(0)
  const [isGenerating, setIsGenerating] = useState(false)

  const regenerateCode = async () => {
    setIsGenerating(true)
    await new Promise(resolve => setTimeout(resolve, 500))
    setCodeVersion(prev => prev + 1)
    setIsGenerating(false)
    toast.success('Code regenerated successfully!')
  }

  const generateHeadCode = () => {
    const materialFontUrl = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=cookie,cookie_off&display=swap'

    return `<!-- 🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁🍁 -->
