'use client'

export const dynamic = 'force-dynamic'

import { Suspense, useState, useEffect } from 'react'
import Image from 'next/image'
import { signIn, getSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Eye, EyeSlash as EyeOff, CircleNotch as CircleNotch as Loader2, Lock, Envelope as Mail, ArrowRight, Shield, CheckCircle } from '@phosphor-icons/react'
import { toast } from 'react-hot-toast'

function SignInContent() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [error, setError] = useState('')
  
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'

  useEffect(() => {
    // Check if user is already signed in
    getSession().then((session) => {
      if (session) {
        router.push(callbackUrl)
      }
    })
  }, [router, callbackUrl])

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true)
    try {
      await signIn('google', { callbackUrl })
    } catch (error) {
      console.error('Google sign in error:', error)
      setError('An error occurred during Google sign in.')
      setIsGoogleLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const result = await signIn('credentials', {
        email,
        password,
        rememberMe: rememberMe.toString(),
        redirect: false,
        callbackUrl,
      })

      if (result?.error) {
        if (result.error === 'CredentialsSignin') {
          setError('Invalid email or password. Please try again.')
        } else if (result.error.includes('locked')) {
          setError('Account temporarily locked due to too many failed attempts. Please try again in 15 minutes.')
        } else {
          setError('An error occurred during sign in. Please try again.')
        }
      } else if (result?.ok) {
        toast.success('Welcome back!')
        router.push(callbackUrl)
        router.refresh()
      }
    } catch (error) {
      console.error('Sign in error:', error)
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex">
      {/* Left Side - Enterprise Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-zinc-900 text-white p-12 flex-col justify-between relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image 
            src="/images/auth/office.jpg" 
            alt="Modern office collaboration" 
            fill
            priority
            sizes="50vw"
            className="object-cover opacity-40"
            quality={75}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/60 via-zinc-900/60 to-zinc-900/90"></div>
        </div>
        
        {/* Logo Area */}
        <div className="relative z-10">
          <Link href="/">
            <img 
              src="/logos/logo.svg" 
              alt="Cookie Banner Logo" 
              className="h-8 brightness-0 invert cursor-pointer hover:opacity-80 transition-opacity"
            />
          </Link>
        </div>

        {/* Main Content */}
        <div className="relative z-10 max-w-lg">
          <h2 className="text-4xl font-bold leading-tight mb-6 text-white">
            Compliance made simple for enterprise
          </h2>
          <p className="text-zinc-300 text-lg mb-8">
            Join thousands of companies using our platform to manage cookie consent and protect user privacy across the globe.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-zinc-200">
              <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0" />
              <span>GDPR, CCPA, & ePrivacy compliant</span>
            </div>
            <div className="flex items-center gap-3 text-zinc-200">
              <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0" />
              <span>Automated cookie scanning</span>
            </div>
            <div className="flex items-center gap-3 text-zinc-200">
              <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0" />
              <span>Enterprise-grade security</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 flex justify-between items-center text-zinc-400 text-sm">
          <p className="text-zinc-400">© 2024 Cookie Banner. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-zinc-400 hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="text-zinc-400 hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Welcome back</h1>
            <p className="mt-2 text-gray-600">
              Enter your details to access your account
            </p>
          </div>

          <div className="space-y-6">
            {/* Google Sign In */}
            <Button
              variant="outline"
              className="w-full h-12 font-medium border-gray-200 hover:bg-gray-50 hover:text-gray-900 relative"
              onClick={handleGoogleSignIn}
              disabled={isLoading || isGoogleLoading}
            >
              {isGoogleLoading ? (
                <CircleNotch as Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <div className="flex items-center justify-center gap-3">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  <span>Sign in with Google</span>
                </div>
              )}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm uppercase">
                <span className="bg-white px-2 text-gray-500">Or continue with email</span>
              </div>
            </div>

            {error && (
              <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-900">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-11 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                    required
                    disabled={isLoading || isGoogleLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link 
                    href="/auth/forgot-password" 
                    className="text-sm font-medium text-blue-600 hover:text-blue-500"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 h-11 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                    required
                    disabled={isLoading || isGoogleLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    disabled={isLoading || isGoogleLoading}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="remember-me"
                  checked={rememberMe}
                  onCheckedChange={setRememberMe}
                  disabled={isLoading || isGoogleLoading}
                />
                <Label htmlFor="remember-me" className="font-normal text-gray-600">
                  Remember for 30 days
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full h-11 bg-zinc-900 hover:bg-zinc-800 text-white transition-colors"
                disabled={isLoading || isGoogleLoading}
              >
                {isLoading ? (
                  <CircleNotch as Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <div className="flex items-center gap-2">
                    <span>Sign in</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </Button>
            </form>

            <p className="text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link href="/auth/signup" className="font-medium text-blue-600 hover:text-blue-500">
                Sign up for free
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center"><CircleNotch as Loader2 className="w-8 h-8 animate-spin text-gray-400" /></div>}>
      <SignInContent />
    </Suspense>
  )
}
