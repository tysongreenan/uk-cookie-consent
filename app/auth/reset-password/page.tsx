'use client'

import { Suspense, useState } from 'react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Lock, Eye, EyeOff, ArrowLeft, CheckCircle2, Shield } from 'lucide-react'

function ResetPasswordContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get('token') || ''
  const email = searchParams.get('email') || ''

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  if (!token || !email) {
    return (
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-6 text-center">
          <div className="rounded-lg border border-red-200 bg-red-50 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Invalid reset link</h2>
            <p className="text-gray-600 text-sm">
              This password reset link is invalid or has expired. Please request a new one.
            </p>
          </div>
          <Link href="/auth/forgot-password">
            <Button className="w-full">Request a new reset link</Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    setIsLoading(true)

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Something went wrong')
        return
      }

      setSuccess(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex-1 flex items-center justify-center p-8 bg-white">
      <div className="w-full max-w-md space-y-8">
        <div>
          <Link
            href="/auth/signin"
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to sign in
          </Link>

          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Choose a new password
          </h1>
          <p className="mt-2 text-gray-600">
            Enter your new password below. Make it strong and unique.
          </p>
        </div>

        {success ? (
          <div className="space-y-6">
            <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-center">
              <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Password updated</h2>
              <p className="text-gray-600 text-sm">
                Your password has been reset successfully. You can now sign in with your new password.
              </p>
            </div>
            <Button className="w-full h-12" onClick={() => router.push('/auth/signin')}>
              Sign in
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="password">New password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="At least 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 h-12"
                  required
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm new password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="confirm-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10 h-12"
                  required
                />
              </div>
            </div>

            <div className="text-xs text-gray-500 space-y-1">
              <p className={password.length >= 8 ? 'text-green-600' : ''}>
                {password.length >= 8 ? '✓' : '○'} At least 8 characters
              </p>
              <p className={/[A-Z]/.test(password) ? 'text-green-600' : ''}>
                {/[A-Z]/.test(password) ? '✓' : '○'} One uppercase letter
              </p>
              <p className={/[a-z]/.test(password) ? 'text-green-600' : ''}>
                {/[a-z]/.test(password) ? '✓' : '○'} One lowercase letter
              </p>
              <p className={/[0-9]/.test(password) ? 'text-green-600' : ''}>
                {/[0-9]/.test(password) ? '✓' : '○'} One number
              </p>
              <p className={password && confirmPassword && password === confirmPassword ? 'text-green-600' : ''}>
                {password && confirmPassword && password === confirmPassword ? '✓' : '○'} Passwords match
              </p>
            </div>

            <Button type="submit" className="w-full h-12" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                'Reset password'
              )}
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-zinc-900 flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-cyan-600/20" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

        <div className="relative z-10">
          <Link href="/">
            <img
              src="/logos/logo.svg"
              alt="Cookie Banner Logo"
              className="h-8 brightness-0 invert cursor-pointer hover:opacity-80 transition-opacity"
            />
          </Link>
        </div>

        <div className="relative z-10 max-w-lg">
          <h2 className="text-4xl font-bold leading-tight mb-6 text-white">
            Almost there
          </h2>
          <p className="text-zinc-300 text-lg mb-8">
            Choose a strong password to keep your account secure. You'll be back in your dashboard in no time.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-zinc-200">
              <Shield className="w-5 h-5 text-blue-400 flex-shrink-0" />
              <span>Your data is encrypted at rest</span>
            </div>
            <div className="flex items-center gap-3 text-zinc-200">
              <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0" />
              <span>Password hashed with bcrypt (12 rounds)</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex justify-between items-center text-zinc-400 text-sm">
          <p>© 2024 Cookie Banner. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-zinc-400 hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="text-zinc-400 hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <Suspense fallback={
        <div className="flex-1 flex items-center justify-center p-8 bg-white">
          <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
        </div>
      }>
        <ResetPasswordContent />
      </Suspense>
    </div>
  )
}
