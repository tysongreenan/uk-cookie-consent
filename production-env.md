# Production Environment Variables

Copy these to Vercel dashboard > Settings > Environment Variables:

```
NEXTAUTH_URL=https://your-app-name.vercel.app
NEXTAUTH_SECRET=[generate-with-openssl-rand-base64-32]
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
DATABASE_URL=postgresql://postgres:[password]@[host]:5432/postgres
```

## How to get these values:

1. **NEXTAUTH_SECRET**: Run `openssl rand -base64 32` in terminal
2. **NEXT_PUBLIC_SUPABASE_URL**: From Supabase dashboard > Settings > API
3. **NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY**: From Supabase dashboard > Settings > API (anon/public key)
4. **SUPABASE_SERVICE_ROLE_KEY**: From Supabase dashboard > Settings > API (service_role key - keep secret!)
5. **DATABASE_URL**: From Supabase dashboard > Settings > Database
