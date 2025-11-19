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
            .select('id, email, name, password, emailVerified')
            .eq('email', credentials.email.toLowerCase().trim())
            .single()

          if (error || !user || !user.password) {
            // Log failed login attempt for security monitoring
            console.warn(`Failed login attempt for email: ${credentials.email}`)
            return null
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
            userRole: teamMember?.role || 'owner'
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
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id
        token.iat = Math.floor(Date.now() / 1000) // Issued at
        token.rememberMe = (user as any).rememberMe || false
        token.currentTeamId = (user as any).currentTeamId || null
        token.userRole = (user as any).userRole || 'owner'
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
