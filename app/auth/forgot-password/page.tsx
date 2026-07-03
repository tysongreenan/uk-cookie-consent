'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Mail, ArrowLeft, CheckCircle2, Shield } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Something went wrong')
        return
      }

      setSent(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

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
            Forgot your password?
          </h2>
          <p className="text-zinc-300 text-lg mb-8">
            No worries — it happens to the best of us. Enter your email and we'll send you a link to reset it.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-zinc-200">
              <Shield className="w-5 h-5 text-blue-400 flex-shrink-0" />
              <span>Secure, time-limited reset link</span>
            </div>
            <div className="flex items-center gap-3 text-zinc-200">
              <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0" />
              <span>Link expires in 1 hour</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex justify-between items-center text-zinc-400 text-sm">
          <p>© 2026 Cookie Banner. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-zinc-400 hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="text-zinc-400 hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
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
              Reset your password
            </h1>
            <p className="mt-2 text-gray-600">
              Enter your email address and we'll send you a reset link.
            </p>
          </div>

          {sent ? (
            <div className="space-y-6">
              <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-center">
                <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Check your email</h2>
                <p className="text-gray-600 text-sm">
                  If an account exists for <strong>{email}</strong>, you'll receive a password reset link shortly. The link expires in 1 hour.
                </p>
              </div>

              <div className="text-center space-y-3">
                <p className="text-sm text-gray-500">
                  Didn't receive an email? Check your spam folder or try again.
                </p>
                <Button
                  variant="outline"
                  onClick={() => setSent(false)}
                  className="w-full"
                >
                  Try again
                </Button>
                <Button variant="ghost" asChild className="w-full">
                  <Link href="/auth/signin">
                    Back to sign in
                  </Link>
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12"
                    required
                    autoFocus
                  />
                </div>
              </div>

              <Button type="submit" className="w-full h-12" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  'Send reset link'
                )}
              </Button>

              <p className="text-center text-sm text-gray-500">
                Remember your password?{' '}
                <Link href="/auth/signin" className="font-medium text-blue-600 hover:text-blue-500">
                  Sign in
                </Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
