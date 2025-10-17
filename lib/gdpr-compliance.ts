// GDPR compliance utilities for team management and data protection

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export interface GDPRRequest {
  userId: string
  requestType: 'access' | 'rectification' | 'erasure' | 'portability'
  details?: string
  timestamp: Date
}

export interface DataRetentionPolicy {
  teamInactiveDays: number // Delete teams inactive for X days
  invitationExpiryDays: number // Delete expired invitations after X days
  auditLogRetentionDays: number // Keep audit logs for X days
}

const DEFAULT_RETENTION_POLICY: DataRetentionPolicy = {
  teamInactiveDays: 730, // 2 years
  invitationExpiryDays: 30, // 1 month
  auditLogRetentionDays: 2555 // 7 years
}

/**
 * Handle GDPR data access request
 */
export async function handleDataAccessRequest(userId: string): Promise<{
  success: boolean
  data?: any
  error?: string
}> {
  try {
    // Get all user data
    const { data: user, error: userError } = await supabase
      .from('User')
      .select('*')
      .eq('id', userId)
      .single()

    if (userError) {
      return { success: false, error: 'User not found' }
    }

    // Get team memberships
    const { data: teamMemberships } = await supabase
      .from('TeamMember')
      .select(`
        *,
        team:Team(*),
        inviter:User(id, name, email)
      `)
      .eq('userId', userId)

    // Get sent invitations
    const { data: sentInvitations } = await supabase
      .from('TeamInvitation')
      .select('*')
      .eq('invitedBy', userId)

    // Get received invitations
    const { data: receivedInvitations } = await supabase
      .from('TeamInvitation')
      .select(`
        *,
        team:Team(*),
        inviter:User(id, name, email)
      `)
      .eq('email', user.email)

    // Get banners/projects
    const { data: projects } = await supabase
      .from('Project')
      .select('*')
      .eq('userId', userId)

    const userData = {
      personalData: {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        planTier: user.planTier,
        upgradedAt: user.upgradedAt
      },
      teamMemberships,
      sentInvitations,
      receivedInvitations,
      projects
    }

    return { success: true, data: userData }

  } catch (error) {
    console.error('Error handling data access request:', error)
    return { success: false, error: 'Failed to retrieve user data' }
  }
}

/**
 * Handle GDPR data rectification request
 */
export async function handleDataRectificationRequest(
  userId: string,
  updates: Record<string, any>
): Promise<{ success: boolean; error?: string }> {
  try {
    // Validate allowed fields for rectification
    const allowedFields = ['name', 'email']
    const updateData: Record<string, any> = {}

    for (const [key, value] of Object.entries(updates)) {
      if (allowedFields.includes(key)) {
        updateData[key] = value
      }
    }

    if (Object.keys(updateData).length === 0) {
      return { success: false, error: 'No valid fields to update' }
    }

    // Update user data
    const { error: updateError } = await supabase
      .from('User')
      .update(updateData)
      .eq('id', userId)

    if (updateError) {
      return { success: false, error: 'Failed to update user data' }
    }

    return { success: true }

  } catch (error) {
    console.error('Error handling data rectification request:', error)
    return { success: false, error: 'Failed to update user data' }
  }
}

/**
 * Handle GDPR data erasure request (Right to be forgotten)
 */
export async function handleDataErasureRequest(userId: string): Promise<{
  success: boolean
  error?: string
}> {
  try {
    // Start transaction-like operations
    const operations = []

    // 1. Remove user from all teams
    operations.push(
      supabase.from('TeamMember').delete().eq('userId', userId)
    )

    // 2. Cancel all sent invitations
    operations.push(
      supabase
        .from('TeamInvitation')
        .update({ status: 'revoked' })
        .eq('invitedBy', userId)
    )

    // 3. Delete user's projects/banners
    operations.push(
      supabase.from('Project').delete().eq('userId', userId)
    )

    // 4. Delete user's logos
    operations.push(
      supabase.from('UserLogo').delete().eq('userId', userId)
    )

    // 5. Delete user account (cascade will handle related records)
    operations.push(
      supabase.from('User').delete().eq('id', userId)
    )

    // Execute all operations
    const results = await Promise.all(operations)
    
    // Check for errors
    for (const result of results) {
      if (result.error) {
        console.error('Error in data erasure:', result.error)
        return { success: false, error: 'Failed to delete all user data' }
      }
    }

    return { success: true }

  } catch (error) {
    console.error('Error handling data erasure request:', error)
    return { success: false, error: 'Failed to delete user data' }
  }
}

/**
 * Handle GDPR data portability request
 */
export async function handleDataPortabilityRequest(userId: string): Promise<{
  success: boolean
  data?: any
  error?: string
}> {
  try {
    // Get comprehensive user data for export
    const accessResult = await handleDataAccessRequest(userId)
    
    if (!accessResult.success) {
      return accessResult
    }

    // Format data for portability (JSON format)
    const portableData = {
      exportDate: new Date().toISOString(),
      userData: accessResult.data,
      format: 'JSON',
      version: '1.0'
    }

    return { success: true, data: portableData }

  } catch (error) {
    console.error('Error handling data portability request:', error)
    return { success: false, error: 'Failed to export user data' }
  }
}

/**
 * Implement data retention policy
 */
export async function enforceDataRetentionPolicy(
  policy: DataRetentionPolicy = DEFAULT_RETENTION_POLICY
): Promise<{ success: boolean; deletedCount: number; error?: string }> {
  try {
    let deletedCount = 0
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - policy.teamInactiveDays)

    // Delete inactive teams
    const { data: inactiveTeams } = await supabase
      .from('Team')
      .select('id')
      .lt('updatedAt', cutoffDate.toISOString())

    if (inactiveTeams && inactiveTeams.length > 0) {
      const { error: deleteError } = await supabase
        .from('Team')
        .delete()
        .lt('updatedAt', cutoffDate.toISOString())

      if (!deleteError) {
        deletedCount += inactiveTeams.length
      }
    }

    // Delete expired invitations
    const invitationCutoff = new Date()
    invitationCutoff.setDate(invitationCutoff.getDate() - policy.invitationExpiryDays)

    const { data: expiredInvitations } = await supabase
      .from('TeamInvitation')
      .select('id')
      .lt('expiresAt', invitationCutoff.toISOString())
      .eq('status', 'expired')

    if (expiredInvitations && expiredInvitations.length > 0) {
      const { error: deleteError } = await supabase
        .from('TeamInvitation')
        .delete()
        .lt('expiresAt', invitationCutoff.toISOString())
        .eq('status', 'expired')

      if (!deleteError) {
        deletedCount += expiredInvitations.length
      }
    }

    return { success: true, deletedCount }

  } catch (error) {
    console.error('Error enforcing data retention policy:', error)
    return { success: false, deletedCount: 0, error: 'Failed to enforce retention policy' }
  }
}

/**
 * Log GDPR requests for compliance tracking
 */
export async function logGDPRRequest(request: GDPRRequest): Promise<void> {
  try {
    // In production, this should be stored in a secure audit log
    console.log('[GDPR] Request logged:', {
      userId: request.userId,
      type: request.requestType,
      timestamp: request.timestamp,
      details: request.details
    })

    // Store in database for audit trail
    await supabase.from('GDPRRequests').insert({
      userId: request.userId,
      requestType: request.requestType,
      details: request.details,
      timestamp: request.timestamp.toISOString(),
      status: 'processed'
    })

  } catch (error) {
    console.error('Error logging GDPR request:', error)
  }
}

/**
 * Check if user has given consent for data processing
 */
export async function checkDataProcessingConsent(
  userId: string,
  purpose: 'team_invitation' | 'analytics' | 'marketing'
): Promise<boolean> {
  try {
    const { data: consent } = await supabase
      .from('DataProcessingConsent')
      .select('consentGiven')
      .eq('userId', userId)
      .eq('purpose', purpose)
      .eq('active', true)
      .single()

    return consent?.consentGiven || false

  } catch (error) {
    console.error('Error checking data processing consent:', error)
    return false
  }
}

/**
 * Record data processing consent
 */
export async function recordDataProcessingConsent(
  userId: string,
  purpose: 'team_invitation' | 'analytics' | 'marketing',
  consentGiven: boolean,
  consentMethod: 'explicit' | 'opt_in' | 'opt_out'
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from('DataProcessingConsent')
      .insert({
        userId,
        purpose,
        consentGiven,
        consentMethod,
        timestamp: new Date().toISOString(),
        active: true
      })

    if (error) {
      return { success: false, error: 'Failed to record consent' }
    }

    return { success: true }

  } catch (error) {
    console.error('Error recording data processing consent:', error)
    return { success: false, error: 'Failed to record consent' }
  }
}
