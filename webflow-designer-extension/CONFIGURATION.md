# 🔧 Configuration Guide - Cookie Banner Webflow Extension

## API Integration Setup

To connect your Webflow extension to your existing cookie banner app, you need to update the API configuration.

### 1. API Base URL (Already Configured ✅)

The extension is already configured to use your domain:
```javascript
const API_BASE_URL = 'https://www.cookie-banner.ca';
```

✅ **No changes needed** - the extension is ready to connect to your live platform!

### 2. API Endpoints (All Created ✅)

I've created all the required API endpoints for you:

#### Authentication Endpoints ✅
- ✅ `POST /api/auth/signin` - User login (created)
- ✅ `POST /api/auth/register` - User registration (already existed)

#### Banner Management Endpoints ✅
- ✅ `GET /api/banners` - Get user's banners (created)
- ✅ `POST /api/banners` - Create/save banner configuration (created)
- ✅ `GET /api/banners/{id}/code` - Get generated code for a banner (created)

### 3. API Response Formats

#### Login Response
```json
{
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "User Name"
  },
  "token": "jwt_token_here"
}
```

#### Banner Configuration
```json
{
  "id": "banner_id",
  "title": "We use cookies",
  "message": "This website uses cookies...",
  "primaryColor": "#0073e6",
  "textColor": "#ffffff",
  "acceptButton": "Accept All",
  "preferencesButton": "Cookie Settings",
  "position": "bottom",
  "theme": "dark"
}
```

#### Code Generation Response
```json
{
  "code": "<!-- Generated cookie banner HTML/JS code -->"
}
```

### 4. CORS Configuration

Make sure your main app allows CORS requests from Webflow extensions:

```javascript
// In your Next.js API routes
export const config = {
  api: {
    responseLimit: false,
  },
}

// Add CORS headers
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
```

### 5. Environment Variables

Ensure these environment variables are set in your main app:
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`

### 6. Testing the Integration

1. Deploy your updated extension bundle to Webflow
2. Test login with existing user credentials
3. Create a new banner configuration
4. Generate and copy the code
5. Verify the code works when inserted into a Webflow element

### 7. Troubleshooting

**Extension shows "Login failed"**
- Check API_BASE_URL is correct
- Verify your main app is deployed and accessible
- Check CORS configuration

**Code generation fails**
- Ensure `/api/banners` endpoint exists and works
- Check authentication token is valid
- Verify banner configuration format matches expected schema

**Preview not updating**
- Check browser console for JavaScript errors
- Verify all form elements have correct IDs
- Ensure event listeners are properly attached

## Next Steps

Once configured:
1. Upload the new `bundle.zip` to Webflow Developer Portal
2. Test the complete flow: login → customize → generate → insert
3. Gather user feedback and iterate
4. Consider adding more features like banner templates, analytics, etc.
