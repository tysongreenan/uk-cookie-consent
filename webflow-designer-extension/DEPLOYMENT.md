# 🚀 Deployment Guide - Webflow Designer Extension

## Your Extension Configuration

- **Extension Name**: Text Updater Extension
- **Client ID**: `3e646fc5c6056410a15ddcd6af1eb53e3724fc855387fe62e9aea287f859ee4f`
- **Extension URL**: `https://68eef6a74e7935c27e2272ac.webflow-ext.com`
- **Bundle File**: `bundle.zip` (ready for upload)

## Step-by-Step Deployment

### 1. Upload to Webflow Developer Portal
1. Go to [Webflow Developer Portal](https://developers.webflow.com/)
2. Navigate to your app dashboard
3. Find the "Extensions" or "Upload" section
4. Upload the `bundle.zip` file
5. Verify the upload was successful

### 2. Install in Webflow Designer
1. Open your Webflow Workspace
2. Go to **Workspace Settings** → **Apps & Integrations** → **Develop**
3. Find your app (search by client ID: `3e646fc5c6056410a15ddcd6af1eb53e3724fc855387fe62e9aea287f859ee4f`)
4. Click the **"Install"** button
5. Select the site where you want to install the extension
6. Complete the installation process

### 3. Test Your Extension
1. Open your test site in the **Webflow Designer**
2. Press **"E"** to open the app panel
3. Find your "Text Updater Extension" in the list
4. Click **"Launch development app"**
5. Select a text element on the page
6. Click the **"Lorem Ipsum"** button to test functionality

## Features to Test

✅ **Text Replacement**: Select a text element and click "Lorem Ipsum"  
✅ **Error Handling**: Try clicking without selecting an element  
✅ **UI Responsiveness**: Check the extension interface  
✅ **Integration**: Verify it works within the Webflow Designer  

## Troubleshooting

### Extension Not Appearing
- Refresh the Webflow Designer page
- Check that the extension is properly installed
- Verify the client ID matches your app

### Extension Not Working
- Ensure you've selected a text element
- Check browser console for any errors
- Verify the extension has proper permissions

### Upload Issues
- Make sure `bundle.zip` is not corrupted
- Check file size (should be around 2KB)
- Verify all required files are in the bundle

## Next Steps

Once deployed and tested:
1. **Publish to Marketplace** (optional)
2. **Add More Features** (custom text templates, batch operations)
3. **Gather User Feedback**
4. **Iterate and Improve**

## Support

- [Webflow Designer API Documentation](https://developers.webflow.com/designer/reference/introduction)
- [Webflow Developer Forums](https://discourse.webflow.com/c/publishing-help/api/29)
- [Extension Development Guide](https://developers.webflow.com/designer/docs/creating-your-first-designer-extension)
