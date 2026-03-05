# Webflow Designer Extension - Cookie Banner Generator

A Webflow Designer Extension that allows you to create GDPR-compliant cookie consent banners directly within the Webflow Designer environment.

## Features

- **User Authentication**: Sign in with your existing cookie banner account
- **Live Banner Preview**: See your banner design in real-time as you customize it
- **Full Customization**: Colors, text, buttons, position, and more
- **Code Generation**: Generate production-ready banner code
- **Direct Integration**: Insert banner code directly into Webflow elements
- **Account Sync**: Connect to your existing banner projects and settings

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

This will serve your extension on `http://localhost:1337` and enable live development.

## Installation in Webflow

### Your Extension Details:
- **Client ID**: `3e646fc5c6056410a15ddcd6af1eb53e3724fc855387fe62e9aea287f859ee4f`
- **Extension URL**: `https://68eef6a74e7935c27e2272ac.webflow-ext.com`

### Deployment Steps:
1. **Upload Bundle**: Upload the `bundle.zip` file to your Webflow app in the Developer Portal
2. **Install Extension**: In your Webflow Workspace Settings, navigate to "Apps & Integrations" > "Develop"
3. **Find Your App**: Look for your app using the client ID above
4. **Install**: Click "Install" and follow the instructions to install the extension to your test site
5. **Test**: Open your test site in the Webflow Designer
6. **Launch**: Press "E" to open the app panel, find your app and click "Launch development app"

## Usage

1. **Sign In**: Use your existing cookie banner account credentials
2. **Customize**: Adjust colors, text, position, and button labels
3. **Preview**: See your banner design update in real-time
4. **Generate**: Create production-ready code for your banner
5. **Insert**: Add the banner code directly to your Webflow project

## Project Structure

```
webflow-designer-extension/
├── public/                 # Files served by the extension
│   ├── index.html         # Main HTML file
│   ├── index.js           # Compiled JavaScript
│   └── styles.css         # CSS styles
├── src/                   # Source code
│   └── index.ts           # TypeScript source
├── package.json           # Dependencies and scripts
├── webflow.json          # Extension configuration
├── tsconfig.json         # TypeScript configuration
├── webpack.config.js     # Webpack configuration
└── README.md             # This file
```

## Development

- The extension uses TypeScript for better development experience
- Webpack compiles TypeScript to JavaScript in the public folder
- Changes to source files will be automatically compiled when using `npm run watch-webpack`

## Next Steps

- Explore the [Webflow Designer API documentation](https://developers.webflow.com/designer/reference/introduction)
- Build and publish your extension to the Webflow Marketplace
- Add more functionality like custom text templates or batch operations
