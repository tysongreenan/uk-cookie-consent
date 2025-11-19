# 🚀 Quick Vercel Deployment Checklist

## Pre-Deployment (5 minutes)
- [ ] Go to [vercel.com](https://vercel.com) and sign in with GitHub
- [ ] Click "New Project" 
- [ ] Import `tysongreenan/uk-cookie-consent`
- [ ] Select `develop` branch
- [ ] Framework: Next.js (auto-detected)

## Environment Variables (10 minutes)
Add these in Vercel dashboard > Settings > Environment Variables:

### 1. Generate NEXTAUTH_SECRET:
```bash
openssl rand -base64 32
```

### 2. Get Supabase values:
- Go to your Supabase project dashboard
- Settings > API > Copy URL and anon key
- Settings > Database > Copy connection string

### 3. Add to Vercel (one by one):
- **NEXTAUTH_URL** = `https://your-app-name.vercel.app`
- **NEXTAUTH_SECRET** = `[generate-with-openssl-rand-base64-32]` (use command from step 1)
- **SUPABASE_URL** = `[from-supabase]`
- **NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY** = `[from-supabase]`
- **DATABASE_URL** = `[from-supabase]`

**Note**: Add these as Environment Variables, not as Secrets.

## Deploy (2 minutes)
- [ ] Click "Deploy" in Vercel
- [ ] Wait for build to complete
- [ ] Test your live URL

## Post-Deployment (5 minutes)
- [ ] Visit your live URL
- [ ] Create a test account
- [ ] Build a cookie banner
- [ ] Test code generation
- [ ] Share the URL! 🎉

## Your Live URL
Once deployed, your app will be available at:
`https://your-app-name.vercel.app`

**Total time: ~20 minutes to go live!** ⚡
