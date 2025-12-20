'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Mail, Check } from '@phosphor-icons/react'

export function EmailSignup() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    
    // Here you would typically send the email to your backend
    console.log('Email signup:', email)
    setSubmitted(true)
    
    // Reset after 3 seconds
    setTimeout(() => {
      setSubmitted(false)
      setEmail('')
    }, 3000)
  }

  if (submitted) {
    return (
      <Card className="border-2 border-green-200 bg-green-50">
        <CardContent className="p-6 text-center">
          <Check className="h-8 w-8 text-green-600 mx-auto mb-3" />
          <h3 className="font-semibold text-green-800 mb-2">Thanks for subscribing!</h3>
          <p className="text-green-700 text-sm">
            We'll send you updates on Canadian privacy law changes and cookie banner best practices.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Mail className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Stay Updated on Privacy Law Changes</h3>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4">
          Get notified when Canadian privacy laws change and receive our latest compliance guides.
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1"
            required
          />
          <Button type="submit" className="bg-primary hover:bg-primary/90">
            Subscribe
          </Button>
        </form>
        
        <p className="text-xs text-muted-foreground mt-3">
          No spam. Unsubscribe anytime. We respect your privacy.
        </p>
      </CardContent>
    </Card>
  )
}
