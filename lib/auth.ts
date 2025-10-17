import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcryptjs'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Enterprise-level session configuration
const SESSION_DURATION = {
  default: 24 * 60 * 60, // 24 hours
  rememberMe: 30 * 24 * 60 * 60, // 30 days
  updateAge: 60 * 60, // Update session every hour
}

export const authOptions: NextAuthOptions = {
  providers: [
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
          const { data: teamMember } = await supabase
            .from('TeamMember')
            .select(`
              role,
              Team!inner(
                id,
                name
              )
            `)
            .eq('user_id', user.id)
            .eq('Team.owner_id', user.id)
            .single()

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
            currentTeamId: teamMember?.Team?.id || null,
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
