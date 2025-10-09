import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcryptjs'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          const { data: user, error } = await supabase
            .from('User')
            .select('id, email, name, password')
            .eq('email', credentials.email)
            .single()

          if (error || !user || !user.password) {
            return null
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          )

          if (!isPasswordValid) {
            return null
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
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
    maxAge: 24 * 60 * 60, // 24 hours
    updateAge: 60 * 60, // Update session every hour
  },
  jwt: {
    maxAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id
        token.iat = Math.floor(Date.now() / 1000) // Issued at
      }
      return token
    },
    session: ({ session, token }) => {
      // Check if session is expired
      const now = Math.floor(Date.now() / 1000);
      const tokenAge = now - (token.iat as number);
      
      if (tokenAge > 24 * 60 * 60) { // 24 hours
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
        },
      };
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
}
