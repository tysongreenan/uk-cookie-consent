# Vercel Environment Variables - Copy & Paste Ready

## 📋 Instructions
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Copy each variable below (one at a time)
3. Paste into Vercel
4. Select environments: **Production** ✅, **Preview** ✅
5. Click "Save"
6. Redeploy your application

---

## 🔴 REQUIRED Variables

### 1. Supabase Configuration
```
NEXT_PUBLIC_SUPABASE_URL
```
Value:
```
https://bamunfrbhopzrjobowfx.supabase.co
```

---

```
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
```
Value:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhbXVuZnJiaG9wenJqb2Jvd2Z4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk4MjUxNzIsImV4cCI6MjA3NTQwMTE3Mn0.nehyh5Mv_2LEs__45Ys6cnRoa8xeRkPo0swesXDCkyc
```

---

```
SUPABASE_SERVICE_ROLE_KEY
```
Value:
```
sb_secret_I8bupz3lhrPKSDeo2oTq_g_Izyksayc
```

---

### 2. NextAuth Configuration
```
NEXTAUTH_URL
```
Value:
```
https://www.cookie-banner.ca
```

---

```
NEXTAUTH_SECRET
```
Value:
```
eyfPsm9Es79RLP+uvYj6WpgNQ6W38Bi+Kw5xbcc2x+M=
```

---

### 3. Base URL
```
NEXT_PUBLIC_BASE_URL
```
Value:
```
https://www.cookie-banner.ca
```

---

## 🟡 OPTIONAL Variables (Already Configured)

### Google OAuth
```
GOOGLE_CLIENT_ID
```
Value:
```
36669271302-3olmooik0hqt5u37arip5k3b0e5kph77.apps.googleusercontent.com
```

---

```
GOOGLE_CLIENT_SECRET
```
Value:
```
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
```

---

### Database URLs (Optional - if using Prisma)
```
DATABASE_URL
```
Value:
```
postgresql://postgres:Onelife4002001!@db.bamunfrbhopzrjobowfx.supabase.co:5432/postgres
```

---

```
DIRECT_URL
```
Value:
```
postgresql://postgres:Onelife4002001!@db.bamunfrbhopzrjobowfx.supabase.co:5432/postgres
```

---

## ✅ Quick Copy Format (for bulk import)

If Vercel supports bulk import, use this format:

```
NEXT_PUBLIC_SUPABASE_URL=https://bamunfrbhopzrjobowfx.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhbXVuZnJiaG9wenJqb2Jvd2Z4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk4MjUxNzIsImV4cCI6MjA3NTQwMTE3Mn0.nehyh5Mv_2LEs__45Ys6cnRoa8xeRkPo0swesXDCkyc
SUPABASE_SERVICE_ROLE_KEY=sb_secret_I8bupz3lhrPKSDeo2oTq_g_Izyksayc
NEXTAUTH_URL=https://www.cookie-banner.ca
NEXTAUTH_SECRET=eyfPsm9Es79RLP+uvYj6WpgNQ6W38Bi+Kw5xbcc2x+M=
NEXT_PUBLIC_BASE_URL=https://www.cookie-banner.ca
GOOGLE_CLIENT_ID=36669271302-3olmooik0hqt5u37arip5k3b0e5kph77.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
DATABASE_URL=postgresql://postgres:Onelife4002001!@db.bamunfrbhopzrjobowfx.supabase.co:5432/postgres
DIRECT_URL=postgresql://postgres:Onelife4002001!@db.bamunfrbhopzrjobowfx.supabase.co:5432/postgres
```

---

## 🔍 Verification Checklist

After adding all variables:
- [ ] All 9 variables are added
- [ ] Production environment is selected ✅
- [ ] Preview environment is selected ✅
- [ ] No trailing spaces in values
- [ ] No quotes around values (Vercel adds them automatically)
- [ ] Redeploy triggered

---

## 📝 Notes

- **Never commit this file** - it contains sensitive credentials
- If your Vercel URL is different from `cookie-banner.ca`, update `NEXTAUTH_URL` and `NEXT_PUBLIC_BASE_URL` accordingly
- Make sure Google OAuth redirect URI matches: `https://www.cookie-banner.ca/api/auth/callback/google`
- If you have a different Vercel URL, add it to Google Cloud Console redirect URIs

