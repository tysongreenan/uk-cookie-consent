# Production Environment Variables

Copy these to Vercel dashboard > Settings > Environment Variables:

```
NEXTAUTH_URL=https://your-app-name.vercel.app
NEXTAUTH_SECRET=your-secret-key-here
SUPABASE_URL=your-supabase-project-url
SUPABASE_ANON_KEY=your-supabase-anon-key
DATABASE_URL=postgresql://postgres:[password]@[host]:5432/postgres
```

## How to get these values:

1. **NEXTAUTH_SECRET**: Run `openssl rand -base64 32` in terminal
2. **SUPABASE_URL**: From Supabase dashboard > Settings > API
3. **SUPABASE_ANON_KEY**: From Supabase dashboard > Settings > API
4. **DATABASE_URL**: From Supabase dashboard > Settings > Database
