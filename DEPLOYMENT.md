# 🚀 Vercel Deployment Guide

## Prerequisites
- GitHub repository: `tysongreenan/uk-cookie-consent`
- Vercel account (free tier works)
- Supabase project with database configured

## Step 1: Deploy to Vercel

1. **Go to [vercel.com](https://vercel.com)**
2. **Sign in with GitHub**
3. **Click "New Project"**
4. **Import from GitHub**: `tysongreenan/uk-cookie-consent`
5. **Select branch**: `develop`
6. **Framework**: Next.js (auto-detected)

## Step 2: Configure Environment Variables

In Vercel dashboard, go to **Settings > Environment Variables** and add:

### Required Variables:
```
NEXTAUTH_URL=https://your-app-name.vercel.app
NEXTAUTH_SECRET=your-secret-key-here
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-supabase-anon-key
DATABASE_URL=your-database-connection-string
```

### How to get these values:

**NEXTAUTH_SECRET**: Generate with:
```bash
openssl rand -base64 32
```

**SUPABASE_URL & SUPABASE_ANON_KEY**: From your Supabase project dashboard

**DATABASE_URL**: From your Supabase project settings (Database > Connection string)

## Step 3: Deploy

1. **Click "Deploy"**
2. **Wait for build to complete** (2-3 minutes)
3. **Your app will be live at**: `https://your-app-name.vercel.app`

## Step 4: Test Production

1. **Visit your live URL**
2. **Create an account**
3. **Build a cookie banner**
4. **Test the generated code**

## Step 5: Custom Domain (Optional)

1. **Go to Vercel dashboard**
2. **Settings > Domains**
3. **Add your custom domain**
4. **Update DNS records as instructed**

## Troubleshooting

### Build Errors:
- Check environment variables are set correctly
- Ensure all dependencies are in `package.json`
- Check build logs in Vercel dashboard

### Database Issues:
- Verify Supabase connection string
- Check RLS policies are enabled
- Ensure tables exist in Supabase

### Authentication Issues:
- Verify NEXTAUTH_URL matches your domain
- Check NEXTAUTH_SECRET is set
- Ensure Supabase auth is configured

## Production Checklist

- ✅ Environment variables configured
- ✅ Database tables created
- ✅ RLS policies enabled
- ✅ Build successful
- ✅ App loads without errors
- ✅ Authentication works
- ✅ Banner builder functions
- ✅ Code generation works

## Support

If you encounter issues:
1. Check Vercel build logs
2. Check Supabase logs
3. Test locally with production environment variables
4. Contact support with specific error messages

---

**Your cookie consent banner app will be live and ready to share!** 🎉
