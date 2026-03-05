# Vercel Environment Variables - Complete List

## 🔴 REQUIRED (Build will fail without these)

### NextAuth Configuration
```
NEXTAUTH_URL=https://your-app-name.vercel.app
NEXTAUTH_SECRET=[generate-with-openssl-rand-base64-32]
```

**How to get:**
- `NEXTAUTH_URL`: Your Vercel deployment URL (e.g., `https://uk-cookie-consent.vercel.app`)
- `NEXTAUTH_SECRET`: Run `openssl rand -base64 32` in your terminal

---

### Supabase Configuration
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your-anon-public-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

**How to get:**
1. Go to your Supabase project dashboard
2. Navigate to **Settings** → **API**
3. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`
   - **service_role key** (⚠️ Keep secret!) → `SUPABASE_SERVICE_ROLE_KEY`

---

### Base URL (for API endpoints and scripts)
```
NEXT_PUBLIC_BASE_URL=https://your-app-name.vercel.app
```

**Note:** Should match your `NEXTAUTH_URL` in production

---

## 🟡 OPTIONAL (Required only if using these features)

### Google OAuth (if using Google sign-in)
```
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

**How to get:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create OAuth 2.0 credentials
3. Add authorized redirect URI: `https://your-app-name.vercel.app/api/auth/callback/google`

---

### Stripe (if using payment/upgrade features)
```
STRIPE_SECRET_KEY=sk_live_... or sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

**How to get:**
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. **API Keys** → Copy Secret Key → `STRIPE_SECRET_KEY`
3. **Webhooks** → Add endpoint → Copy Signing Secret → `STRIPE_WEBHOOK_SECRET`

---

### Database (if using Prisma directly)
```
DATABASE_URL=postgresql://postgres:[password]@[host]:5432/postgres
```

**Note:** Usually not needed if you're using Supabase (which provides its own connection)

---

## 📋 Complete Vercel Setup Checklist

### Step 1: Go to Vercel Dashboard
1. Navigate to your project: https://vercel.com/dashboard
2. Click on your project
3. Go to **Settings** → **Environment Variables**

### Step 2: Add Required Variables
Add these **exactly as shown** (replace placeholder values):

```
NEXTAUTH_URL=https://your-app-name.vercel.app
NEXTAUTH_SECRET=[paste-output-from-openssl-rand-base64-32]
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_BASE_URL=https://your-app-name.vercel.app
```

### Step 3: Add Optional Variables (if needed)
If you're using Google OAuth or Stripe, add those as well.

### Step 4: Environment Selection
- **Production**: ✅ Check this (required)
- **Preview**: ✅ Check this (recommended)
- **Development**: ⚠️ Optional (only if deploying dev branches)

### Step 5: Redeploy
After adding variables, trigger a new deployment:
- Go to **Deployments** tab
- Click **Redeploy** on the latest deployment
- Or push a new commit to trigger automatic deployment

---

## 🔍 Verification

After deployment, verify your environment variables are working:

1. **Check build logs** - Should not show "supabaseKey is required" error
2. **Test authentication** - Try signing in
3. **Check browser console** - Should not show Supabase connection errors

---

## ⚠️ Common Issues

### Issue: Build still fails with "supabaseKey is required"
**Solution:** 
- Make sure variables are set for **Production** environment
- Variable names must match **exactly** (case-sensitive)
- Redeploy after adding variables

### Issue: App works but can't connect to database
**Solution:**
- Verify `NEXT_PUBLIC_SUPABASE_URL` is correct (no trailing slash)
- Verify `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY` is the **anon/public** key (not service_role)
- Check Supabase project is active and not paused

### Issue: Google OAuth not working
**Solution:**
- Verify redirect URI matches exactly: `https://your-app-name.vercel.app/api/auth/callback/google`
- Check `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are set
- Ensure OAuth consent screen is configured in Google Cloud Console

---

## 📝 Quick Reference

| Variable | Required | Used For | Example |
|----------|----------|----------|---------|
| `NEXTAUTH_URL` | ✅ Yes | NextAuth callbacks | `https://app.vercel.app` |
| `NEXTAUTH_SECRET` | ✅ Yes | JWT signing | `abc123...` (32+ chars) |
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ Yes | Database connection | `https://xxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY` | ✅ Yes | Database auth | `eyJhbGci...` |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ Yes | Admin operations | `eyJhbGci...` |
| `NEXT_PUBLIC_BASE_URL` | ✅ Yes | API endpoints | `https://app.vercel.app` |
| `GOOGLE_CLIENT_ID` | ⚠️ Optional | Google OAuth | `123456.apps.googleusercontent.com` |
| `GOOGLE_CLIENT_SECRET` | ⚠️ Optional | Google OAuth | `GOCSPX-...` |
| `STRIPE_SECRET_KEY` | ⚠️ Optional | Payments | `sk_live_...` |
| `STRIPE_WEBHOOK_SECRET` | ⚠️ Optional | Webhooks | `whsec_...` |
| `DATABASE_URL` | ⚠️ Optional | Prisma (if used) | `postgresql://...` |

---

## 🚀 Minimum Setup for Build Success

If you just want to fix the build error, you need **at minimum**:

```
NEXTAUTH_URL=https://your-app-name.vercel.app
NEXTAUTH_SECRET=[any-random-string-32-chars-minimum]
NEXT_PUBLIC_SUPABASE_URL=https://placeholder.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=placeholder-key
NEXT_PUBLIC_BASE_URL=https://your-app-name.vercel.app
```

⚠️ **Warning:** Using placeholder values will allow the build to succeed, but the app **will not function** at runtime. You must use real Supabase credentials for the app to work.

