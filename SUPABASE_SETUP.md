# Supabase Setup Guide

This guide will help you set up Supabase for the Cookie Consent Builder application.

## 1. Get Your Supabase Database Password

1. Go to your Supabase project dashboard: https://supabase.com/dashboard
2. Navigate to **Settings** → **Database**
3. Find the **Connection string** section
4. Copy the password from the connection string (it's the part after `postgres:` and before `@`)

## 2. Update Your Environment Variables

In your `env.local` file, replace `[YOUR-PASSWORD]` with your actual Supabase database password:

```env
DATABASE_URL="postgresql://postgres:YOUR_ACTUAL_PASSWORD@db.bamunfrbhopzrjobowfx.supabase.co:5432/postgres"
DIRECT_URL="postgresql://postgres:YOUR_ACTUAL_PASSWORD@db.bamunfrbhopzrjobowfx.supabase.co:5432/postgres"
```

## 3. Set Up the Database Schema

Run the following commands to create the database tables:

```bash
# Generate Prisma client
npx prisma generate

# Push the schema to your Supabase database
npx prisma db push

# (Optional) Open Prisma Studio to view your data
npx prisma studio
```

## 4. Enable Row Level Security (RLS)

In your Supabase dashboard:

1. Go to **Authentication** → **Policies**
2. Enable RLS for the following tables:
   - `User`
   - `Project`
   - `ConsentBanner`
   - `TrackingScript`
   - `BannerAnalytics`
   - `UserLogo`

## 5. Set Up Storage for Logo Uploads

1. Go to **Storage** in your Supabase dashboard
2. Create a new bucket called `user-logos`
3. Set the bucket to **Public**
4. Configure the following policies:

```sql
-- Allow users to upload their own logos
CREATE POLICY "Users can upload their own logos" ON storage.objects
FOR INSERT WITH CHECK (auth.uid()::text = (storage.foldername(name))[1]);

-- Allow users to view their own logos
CREATE POLICY "Users can view their own logos" ON storage.objects
FOR SELECT USING (auth.uid()::text = (storage.foldername(name))[1]);

-- Allow users to delete their own logos
CREATE POLICY "Users can delete their own logos" ON storage.objects
FOR DELETE USING (auth.uid()::text = (storage.foldername(name))[1]);
```

## 6. Configure Authentication

1. Go to **Authentication** → **Settings**
2. Add your domain to **Site URL**: `http://localhost:3000` (for development)
3. Add redirect URLs:
   - `http://localhost:3000/api/auth/callback/google`
   - `http://localhost:3000/api/auth/callback/github`

## 7. Set Up OAuth Providers (Optional)

### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Client Secret to your `env.local`

### GitHub OAuth
1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Create a new OAuth App
3. Set Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
4. Copy Client ID and Client Secret to your `env.local`

## 8. Test Your Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Visit `http://localhost:3000`
3. Try signing up/signing in
4. Check your Supabase dashboard to see if data is being created

## Troubleshooting

### Connection Issues
- Make sure your database password is correct
- Check that your Supabase project is active
- Verify the connection string format

### Authentication Issues
- Ensure OAuth redirect URLs are correctly configured
- Check that your OAuth app credentials are valid
- Verify that RLS policies are set up correctly

### Storage Issues
- Make sure the `user-logos` bucket exists and is public
- Check that storage policies are configured correctly
- Verify file size limits (default is 50MB)

## Production Deployment

When deploying to production:

1. Update your environment variables with production URLs
2. Add your production domain to Supabase authentication settings
3. Update OAuth redirect URLs for production
4. Consider setting up custom domains for your Supabase project
