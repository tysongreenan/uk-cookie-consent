import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      name?: string | null
      image?: string | null
      currentTeamId?: string | null
      userRole?: string
    }
  }

  interface User {
    id: string
    email: string
    name?: string | null
    image?: string | null
    currentTeamId?: string | null
    userRole?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    currentTeamId?: string | null
    userRole?: string
    rememberMe?: boolean
  }
}