# Email Authentication Setup

To use email-based authentication, you need to configure email settings in your `.env.local` file.

## Option 1: Gmail (Recommended for Development)

Add these lines to your `.env.local` file:

```env
# Email Configuration (Gmail)
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-email@gmail.com
EMAIL_SERVER_PASSWORD=your-app-password
EMAIL_FROM=your-email@gmail.com
```

### Gmail Setup:
1. Enable 2-factor authentication on your Gmail account
2. Generate an "App Password":
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
   - Use this password (not your regular Gmail password)

## Option 2: Other Email Providers

### Outlook/Hotmail:
```env
EMAIL_SERVER_HOST=smtp-mail.outlook.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-email@outlook.com
EMAIL_SERVER_PASSWORD=your-password
EMAIL_FROM=your-email@outlook.com
```

### Yahoo:
```env
EMAIL_SERVER_HOST=smtp.mail.yahoo.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-email@yahoo.com
EMAIL_SERVER_PASSWORD=your-app-password
EMAIL_FROM=your-email@yahoo.com
```

## Option 3: Development Mode (No Real Emails)

For development, you can use a service like Mailtrap or just see the email content in the console:

```env
# Development mode - emails will be logged to console
EMAIL_SERVER_HOST=localhost
EMAIL_SERVER_PORT=1025
EMAIL_SERVER_USER=
EMAIL_SERVER_PASSWORD=
EMAIL_FROM=noreply@localhost
```

## Testing Email Authentication

1. Add the email configuration to your `.env.local` file
2. Restart your development server: `npm run dev`
3. Go to http://localhost:3000/auth/signup
4. Enter your email address
5. Check your email for the sign-in link
6. Click the link to complete authentication

## Troubleshooting

- **"Invalid login"**: Check your email credentials
- **"Connection timeout"**: Verify SMTP settings
- **"Authentication failed"**: Use app passwords for Gmail/Yahoo
- **No emails received**: Check spam folder

## Production Setup

For production, consider using:
- **SendGrid** (recommended)
- **Mailgun**
- **Amazon SES**
- **Postmark**

These services provide better deliverability and analytics.
