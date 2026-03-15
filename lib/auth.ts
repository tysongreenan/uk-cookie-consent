/**
 * Authentication Configuration
 * 
 * Workspace Creation Flow:
 * 1. Personal workspace is created during user registration (/api/auth/register) - SINGLE SOURCE OF TRUTH
 * 2. Auth flow retrieves existing workspace - DOES NOT CREATE new workspaces
 * 3. Banners route retrieves existing workspace - DOES NOT CREATE new workspaces  
 * 4. Users can be invited to additional workspaces via invitation system
 * 5. Users can switch between workspaces using workspace switcher
 * 
 * IMPORTANT: Only registration endpoint creates workspaces. All other endpoints only retrieve.
 */

import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcryptjs'

// Lazy initialization to avoid build-time errors
// Use service role key for server-side operations (bypasses RLS)
// This is safe because we authenticate via password verification before using it
function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
  
  if (!url || !key) {
    throw new Error('Supabase configuration is missing. Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables.')
  }
  
  return createClient(url, key)
}

// Enterprise-level session configuration
const SESSION_DURATION = {
  default: 24 * 60 * 60, // 24 hours
  rememberMe: 30 * 24 * 60 * 60, // 30 days
  updateAge: 60 * 60, // Update session every hour
}

export const authOptions: NextAuthOptions = {
  providers: [
    // Only add Google provider if credentials are configured
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
    GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
        ]
      : []),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        rememberMe: { label: 'Remember Me', type: 'checkbox' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          // Get Supabase client
          const supabase = getSupabaseClient()
          
          // Basic user query (only existing fields)
          const { data: user, error } = await supabase
            .from('User')
            .select('id, email, name, password, emailVerified, planTier')
            .eq('email', credentials.email.toLowerCase().trim())
            .single()

          if (error || !user) {
            console.warn(`Failed login attempt for email: ${credentials.email} - user not found`)
            return null
          }

          if (!user.password) {
            // User exists but signed up via Google OAuth — no password set
            console.warn(`Login attempt with password for OAuth-only account: ${credentials.email}`)
            throw new Error('This account uses Google Sign-In. Please click "Sign in with Google" instead.')
          }

          // Skip account lock check since field doesn't exist yet

          // Verify password
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          )

          if (!isPasswordValid) {
            // Skip login attempt tracking since fields don't exist yet
            console.warn(`Invalid password for email: ${credentials.email}`)
            return null
          }

          // Get user's current team and role
          console.log('🔍 Auth: Looking up team for user:', user.id)
          let { data: teamMember } = await supabase
            .from('TeamMember')
            .select('role, team_id')
            .eq('user_id', user.id)
            .order('joined_at', { ascending: false })
            .limit(1)
            .maybeSingle()
          
          console.log('🔍 Auth: TeamMember query result:', teamMember)

          // If user has no team, this should not happen for registered users
          if (!teamMember) {
            console.warn('❌ Auth: User has no workspace - this should not happen for registered users:', user.id)
            
            // As a fallback, check if workspace exists but query failed
            const { data: fallbackCheck } = await supabase
              .from('TeamMember')
              .select('team_id, role')
              .eq('user_id', user.id)
              .limit(1)
              .maybeSingle()
            
            if (fallbackCheck) {
              console.log('✅ Auth: Found workspace via fallback check:', fallbackCheck.team_id)
              teamMember = {
                role: fallbackCheck.role,
                team_id: fallbackCheck.team_id
              }
            } else {
              console.error('❌ Auth: No workspace found for user - they need to contact support')
            }
          }

          // Update last login time (only update existing fields)
          await supabase
            .from('User')
            .update({ 
              updatedAt: new Date().toISOString()
            })
            .eq('id', user.id)

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            rememberMe: credentials.rememberMe === 'true',
            currentTeamId: teamMember?.team_id || null,
            userRole: teamMember?.role || 'owner',
            planTier: user.planTier || 'free'
          }
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: SESSION_DURATION.default,
    updateAge: SESSION_DURATION.updateAge,
  },
  jwt: {
    maxAge: SESSION_DURATION.default,
  },
  callbacks: {
    signIn: async ({ user, account }) => {
      // Only handle OAuth providers (credentials are handled in authorize())
      if (account?.provider !== 'google') return true

      try {
        const supabase = getSupabaseClient()
        const email = user.email?.toLowerCase().trim()
        if (!email) return false

        // Check if user already exists
        const { data: existingUser } = await supabase
          .from('User')
          .select('id, name, planTier')
          .eq('email', email)
          .single()

        if (existingUser) {
          // Existing user — link account by updating profile with Google info if missing
          const updates: Record<string, any> = { updatedAt: new Date().toISOString() }
          if (!existingUser.name && user.name) updates.name = user.name
          if (user.image) updates.image = user.image

          await supabase
            .from('User')
            .update(updates)
            .eq('id', existingUser.id)

          // Look up their workspace
          const { data: teamMember } = await supabase
            .from('TeamMember')
            .select('role, team_id')
            .eq('user_id', existingUser.id)
            .order('joined_at', { ascending: false })
            .limit(1)
            .maybeSingle()

          // If user has no workspace (e.g., created via credentials but workspace creation failed), create one
          if (!teamMember) {
            console.log('Google OAuth: Existing user has no workspace, creating one:', existingUser.id)
            const teamId = crypto.randomUUID()
            const memberId = crypto.randomUUID()
            const firstName = (user.name || email.split('@')[0]).split(' ')[0]

            await supabase.from('Team').insert({
              id: teamId,
              name: `${firstName}'s Workspace`,
              owner_id: existingUser.id,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            })

            await supabase.from('TeamMember').insert({
              id: memberId,
              team_id: teamId,
              user_id: existingUser.id,
              role: 'owner',
              invited_by: existingUser.id,
              joined_at: new Date().toISOString(),
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            })

            ;(user as any).currentTeamId = teamId
            ;(user as any).userRole = 'owner'
          } else {
            ;(user as any).currentTeamId = teamMember.team_id
            ;(user as any).userRole = teamMember.role || 'owner'
          }

          // Attach workspace info so the jwt callback can read it
          ;(user as any).id = existingUser.id
          ;(user as any).planTier = existingUser.planTier || 'free'

          console.log('✅ Google OAuth: Linked to existing account:', email)
          return true
        }

        // New user — create account + personal workspace
        const userId = crypto.randomUUID()
        const teamId = crypto.randomUUID()
        const memberId = crypto.randomUUID()
        const displayName = user.name || email.split('@')[0]
        const firstName = displayName.split(' ')[0]

        // Create user
        const { error: insertError } = await supabase
          .from('User')
          .insert({
            id: userId,
            email,
            name: displayName,
            image: user.image || null,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          })

        if (insertError) {
          console.error('Google OAuth: Failed to create user:', insertError)
          return false
        }

        // Create personal workspace
        const { error: teamError } = await supabase
          .from('Team')
          .insert({
            id: teamId,
            name: `${firstName}'s Workspace`,
            owner_id: userId,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })

        if (!teamError) {
          // Add user as owner
          await supabase
            .from('TeamMember')
            .insert({
              id: memberId,
              team_id: teamId,
              user_id: userId,
              role: 'owner',
              invited_by: userId,
              joined_at: new Date().toISOString(),
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            })

          // Set current team
          await supabase
            .from('User')
            .update({ current_team_id: teamId })
            .eq('id', userId)
        } else {
          console.error('Google OAuth: Failed to create workspace:', teamError)
        }

        // Attach info for jwt callback
        ;(user as any).id = userId
        ;(user as any).currentTeamId = teamId
        ;(user as any).userRole = 'owner'
        ;(user as any).planTier = 'free'

        console.log('✅ Google OAuth: Created user + workspace for:', email)
        return true
      } catch (error) {
        console.error('Google OAuth signIn error:', error)
        return false
      }
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id
        token.iat = Math.floor(Date.now() / 1000) // Issued at
        token.rememberMe = (user as any).rememberMe || false
        token.currentTeamId = (user as any).currentTeamId || null
        token.userRole = (user as any).userRole || 'owner'
        token.planTier = (user as any).planTier || 'free'
      } else if (token.id) {
        // Refresh planTier from database on token rotation so upgrades take effect without re-login
        try {
          const supabase = getSupabaseClient()
          const { data } = await supabase
            .from('User')
            .select('planTier')
            .eq('id', token.id)
            .single()
          if (data?.planTier) {
            token.planTier = data.planTier
          }
        } catch {
          // Keep existing planTier on error
        }
      }
      return token
    },
    session: ({ session, token }) => {
      // Check if session is expired based on remember me setting
      const now = Math.floor(Date.now() / 1000);
      const tokenAge = now - (token.iat as number);
      const maxAge = (token.rememberMe as boolean) ? SESSION_DURATION.rememberMe : SESSION_DURATION.default;
      
      if (tokenAge > maxAge) {
        // Return a minimal session to avoid null return
        return {
          user: { id: '', email: '', name: '', image: null },
          expires: new Date().toISOString(),
        };
      }
      
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          currentTeamId: token.currentTeamId,
          userRole: token.userRole,
          planTier: token.planTier || 'free',
        },
        expires: new Date(Date.now() + maxAge * 1000).toISOString(),
      };
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
}
