'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Palette, Code, Shield, Check, ArrowRight, Play, Zap, Clock, Globe, Copy } from 'lucide-react'

export function HowItWorksShowcase() {
  const [activeStep, setActiveStep] = useState(1)
  const [animationStep, setAnimationStep] = useState(0)
  const [copied, setCopied] = useState(false)
  const [showCodeEditor, setShowCodeEditor] = useState(false)

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-muted/30">
      <div className="container px-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="mb-4 font-heading text-3xl font-bold sm:text-4xl md:text-5xl">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to get your cookie banner live
            </p>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Coming soon - Interactive banner builder demo
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
