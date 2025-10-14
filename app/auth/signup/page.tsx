'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'
import { Mail, Lock, User, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function SignUpPage() {
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  // Pre-fill email from query parameter or banner config
  useEffect(() => {
    const emailParam = searchParams.get('email')
    if (emailParam) {
      setEmail(decodeURIComponent(emailParam))
    } else {
      // Check for banner config in localStorage
      const bannerConfig = localStorage.getItem('bannerConfig')
      if (bannerConfig) {
        try {
          const config = JSON.parse(bannerConfig)
          if (config.email) {
            setEmail(config.email)
          }
        } catch (error) {
          console.error('Error parsing banner config:', error)
        }
      }
    }
  }, [searchParams])

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setIsLoading(false)
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      setIsLoading(false)
      return
    }

    try {
      // Get banner config from localStorage if available
      let bannerConfig = null
      if (typeof window !== 'undefined') {
        const storedConfig = localStorage.getItem('bannerConfig')
        if (storedConfig) {
          try {
            bannerConfig = JSON.parse(storedConfig)
          } catch (error) {
            console.error('Error parsing banner config:', error)
          }
        }
      }

      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name,
          password,
          bannerConfig, // Include banner configuration
        }),
      })

      const data = await response.json()

      if (response.ok) {
        // Clear banner config from localStorage after successful signup
        if (typeof window !== 'undefined') {
          localStorage.removeItem('bannerConfig')
        }
        
        // Automatically sign in the user
        const signInResult = await signIn('credentials', {
          email,
          password,
          redirect: false,
        })

        if (signInResult?.ok) {
          router.push('/dashboard?message=Welcome! Your account has been created and you are now signed in.')
        } else {
          // If auto sign-in fails, redirect to sign-in page
          router.push('/auth/signin?message=Account created successfully. Please sign in.')
        }
      } else {
        setError(data.error || 'Failed to create account')
      }
    } catch (error) {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const [isFromLanding, setIsFromLanding] = useState(false)

  // Check if user is coming from landing page
  useEffect(() => {
    const emailParam = searchParams.get('email')
    const hasBannerConfig = typeof window !== 'undefined' && localStorage.getItem('bannerConfig')
    setIsFromLanding(!!emailParam || !!hasBannerConfig)
  }, [searchParams])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          {isFromLanding && (
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              <span>Almost there! Just a few more details...</span>
            </div>
          )}
              <div className="mx-auto mb-4">
                <img 
                  src="/logos/logo.svg" 
                  alt="Cookie Banner Generator" 
                  width="180"
                  height="48"
                  className="h-12 w-auto mx-auto"
                />
              </div>
              <CardTitle className="text-2xl font-bold">Create your account</CardTitle>
              <CardDescription>
                {isFromLanding 
                  ? 'Join the first 1,000 and get lifetime free access' 
                  : 'Get started with Cookie Banner Generator today'}
              </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
              {error}
            </div>
          )}

          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full"
              />
            </div>
            <div>
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
              />
            </div>
            <div>
              <PasswordInput
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full"
              />
            </div>
            <div>
              <PasswordInput
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full"
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              <User className="mr-2 h-4 w-4" />
              {isLoading ? 'Creating account...' : 'Create account'}
            </Button>
          </form>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">Already have an account? </span>
            <Link href="/auth/signin" className="text-primary hover:underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
