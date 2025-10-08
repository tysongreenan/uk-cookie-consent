# Cookie Consent Builder

A modern web application for creating and managing professional cookie consent banners. Built with Next.js 14, TypeScript, and Tailwind CSS.

<!-- Production deployment ready - all TypeScript errors resolved -->

## Features

- 🎨 **Visual Banner Builder** - Drag-and-drop interface with live preview
- 🎯 **Code Generator** - Generate clean, embeddable HTML/JS code
- 📊 **Analytics Dashboard** - Track consent rates and user interactions
- 🛡️ **GDPR Compliant** - Built-in compliance with privacy regulations
- 🔧 **Script Management** - Manage Google Analytics, Facebook Pixel, and more
- 🌍 **Multi-language Support** - Support for multiple languages
- 🎨 **Logo Upload** - Add your company logo to banners
- 🔗 **Privacy Policy Integration** - Easy privacy policy link management

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: NextAuth.js
- **UI Components**: Radix UI, shadcn/ui
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cookie-consent-builder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Fill in your environment variables:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/cookie_consent_builder"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   ```

4. **Set up the database**
   ```bash
   npx prisma db push
   npx prisma generate
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/                    # Next.js 14 app directory
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard pages
│   ├── auth/              # Authentication pages
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── landing/          # Landing page components
│   └── dashboard/        # Dashboard components
├── lib/                  # Utility functions
├── prisma/               # Database schema
├── types/                # TypeScript type definitions
└── public/               # Static assets
```

## Database Schema

The application uses the following main entities:

- **Users** - User accounts and authentication
- **Projects** - User projects/websites
- **ConsentBanners** - Cookie consent banner configurations
- **TrackingScripts** - Tracking scripts (GA, Facebook, etc.)
- **BannerAnalytics** - Analytics data for banners
- **UserLogos** - Uploaded user logos

## API Endpoints

- `GET /api/projects` - Get user projects
- `POST /api/projects` - Create new project
- `GET /api/banners` - Get project banners
- `POST /api/banners` - Create new banner
- `GET /api/scripts` - Get tracking scripts
- `POST /api/scripts` - Add tracking script
- `GET /api/analytics` - Get banner analytics

## Banner Configuration

Banners are configured using a JSON structure that includes:

```typescript
interface BannerConfig {
  position: 'top' | 'bottom' | 'floating'
  theme: 'light' | 'dark' | 'custom'
  colors: {
    background: string
    text: string
    button: string
    // ... more color options
  }
  text: {
    title: string
    message: string
    acceptButton: string
    // ... more text options
  }
  branding: {
    logo: {
      enabled: boolean
      url: string
      position: 'left' | 'right' | 'center' | 'hidden'
    }
    privacyPolicy: {
      url: string
      text: string
      openInNewTab: boolean
    }
  }
  // ... more configuration options
}
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@cookieconsentbuilder.com or join our Discord community.

## Roadmap

- [ ] A/B testing for banners
- [ ] White-label options
- [ ] API access for developers
- [ ] Advanced analytics
- [ ] Team collaboration features
- [ ] Custom consent frameworks
