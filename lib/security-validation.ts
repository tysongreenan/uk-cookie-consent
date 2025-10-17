// Security validation utilities for team management and payments

import { createClient } from '@supabase/supabase-js'
import { TeamRole, TeamPermission, hasTeamPermission } from '@/types'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

/**
 * Validate team access with proper permission checking
 */
export async function validateTeamAccess(
  userId: string,
  teamId: string,
  requiredPermission: TeamPermission
): Promise<{ hasAccess: boolean; userRole?: TeamRole; error?: string }> {
  try {
    // First check if user is a member of the team
    const { data: member, error } = await supabase
      .from('TeamMember')
      .select('role')
      .eq('team_id', teamId)
      .eq('user_id', userId)
      .single()

    if (error || !member) {
      return {
        hasAccess: false,
        error: 'User is not a member of this team'
      }
    }

    // Check if user has the required permission
    const hasAccess = hasTeamPermission(member.role as TeamRole, requiredPermission)

    return {
      hasAccess,
      userRole: member.role as TeamRole
    }
  } catch (error) {
    console.error('Error validating team access:', error)
    return {
      hasAccess: false,
      error: 'Failed to validate team access'
    }
  }
}

/**
 * Validate team ownership
 */
export async function validateTeamOwnership(
  userId: string,
  teamId: string
): Promise<{ isOwner: boolean; error?: string }> {
  try {
    const { data: team, error } = await supabase
      .from('Team')
      .select('ownerId')
      .eq('id', teamId)
      .single()

    if (error || !team) {
      return {
        isOwner: false,
        error: 'Team not found'
      }
    }

    return {
      isOwner: team.ownerId === userId
    }
  } catch (error) {
    console.error('Error validating team ownership:', error)
    return {
      isOwner: false,
      error: 'Failed to validate team ownership'
    }
  }
}

/**
 * Validate email format and domain
 */
export function validateEmail(email: string): { valid: boolean; error?: string } {
  if (!email || typeof email !== 'string') {
    return { valid: false, error: 'Email is required' }
  }

  const trimmedEmail = email.trim().toLowerCase()
  
  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(trimmedEmail)) {
    return { valid: false, error: 'Invalid email format' }
  }

  // Check email length
  if (trimmedEmail.length > 254) {
    return { valid: false, error: 'Email too long' }
  }

  // Check for suspicious patterns
  if (trimmedEmail.includes('..') || trimmedEmail.startsWith('.') || trimmedEmail.endsWith('.')) {
    return { valid: false, error: 'Invalid email format' }
  }

  return { valid: true }
}

/**
 * Validate team name
 */
export function validateTeamName(name: string): { valid: boolean; error?: string } {
  if (!name || typeof name !== 'string') {
    return { valid: false, error: 'Team name is required' }
  }

  const trimmedName = name.trim()

  if (trimmedName.length === 0) {
    return { valid: false, error: 'Team name cannot be empty' }
  }

  if (trimmedName.length > 100) {
    return { valid: false, error: 'Team name too long (max 100 characters)' }
  }

  // Check for suspicious characters
  const suspiciousChars = /[<>\"'%;()&+]/
  if (suspiciousChars.test(trimmedName)) {
    return { valid: false, error: 'Team name contains invalid characters' }
  }

  return { valid: true }
}

/**
 * Validate invitation token
 */
export function validateInvitationToken(token: string): { valid: boolean; error?: string } {
  if (!token || typeof token !== 'string') {
    return { valid: false, error: 'Invitation token is required' }
  }

  // Check token format (should be UUID or similar)
  const tokenRegex = /^[a-f0-9-]{36}$/i
  if (!tokenRegex.test(token)) {
    return { valid: false, error: 'Invalid invitation token format' }
  }

  return { valid: true }
}

/**
 * Validate payment amount
 */
export function validatePaymentAmount(amount: number): { valid: boolean; error?: string } {
  const expectedAmount = 4899 // $48.99 in cents
  
  if (amount !== expectedAmount) {
    return {
      valid: false,
      error: `Invalid payment amount. Expected ${expectedAmount}, got ${amount}`
    }
  }

  return { valid: true }
}

/**
 * Rate limiting for team operations
 */
export class TeamRateLimit {
  private static limits = new Map<string, { count: number; resetTime: number }>()

  static checkLimit(key: string, maxRequests: number, windowMs: number): boolean {
    const now = Date.now()
    const limit = this.limits.get(key)

    if (!limit || now > limit.resetTime) {
      // Reset or create new limit
      this.limits.set(key, { count: 1, resetTime: now + windowMs })
      return true
    }

    if (limit.count >= maxRequests) {
      return false
    }

    limit.count++
    return true
  }

  static checkTeamCreation(userId: string): boolean {
    return this.checkLimit(`team_creation_${userId}`, 5, 60 * 60 * 1000) // 5 per hour
  }

  static checkInvitationCreation(teamId: string): boolean {
    return this.checkLimit(`invitations_${teamId}`, 50, 24 * 60 * 60 * 1000) // 50 per day
  }
}

/**
 * Security headers for API responses
 */
export const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://api.stripe.com;",
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
}

/**
 * Log security events
 */
export function logSecurityEvent(
  event: string,
  userId: string,
  details: Record<string, any>,
  severity: 'low' | 'medium' | 'high' | 'critical' = 'medium'
): void {
  console.log(`[SECURITY] ${severity.toUpperCase()}: ${event}`, {
    userId,
    timestamp: new Date().toISOString(),
    details,
    severity
  })

  // In production, this should send to a security monitoring service
  // like Sentry, DataDog, or a custom security dashboard
}
