# Database Password Change Instructions

## 🚨 CRITICAL SECURITY UPDATE

Your database password is currently exposed in the codebase. Follow these steps to secure it:

### Step 1: Change Supabase Database Password
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project (from your Supabase dashboard)
3. Go to **Settings** → **Database**
4. Click **Reset Database Password**
5. Generate a new secure password (save it securely!)

### Step 2: Update Environment Variables
After changing the password, update these files:

#### Production Environment (Vercel/Netlify/etc.):
```
DATABASE_URL="postgresql://postgres:YOUR_NEW_PASSWORD@db.[your-project-ref].supabase.co:5432/postgres"
DIRECT_URL="postgresql://postgres:YOUR_NEW_PASSWORD@db.[your-project-ref].supabase.co:5432/postgres"
```

#### Local Development (.env.local):
```
DATABASE_URL="postgresql://postgres:YOUR_NEW_PASSWORD@db.[your-project-ref].supabase.co:5432/postgres"
DIRECT_URL="postgresql://postgres:YOUR_NEW_PASSWORD@db.[your-project-ref].supabase.co:5432/postgres"
```

### Step 3: Test Connection
After updating, test that your app still connects to the database.

### Step 4: Remove Old Password
Once confirmed working, the old password will be invalidated automatically.

## 🔐 Password Requirements
- Minimum 16 characters
- Mix of uppercase, lowercase, numbers, and symbols
- Use a password manager to generate and store

## ⚠️ IMPORTANT
- Never commit database credentials to version control
- Use environment variables for all sensitive data
- Rotate passwords regularly
