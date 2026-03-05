# 📊 Track Your Cookie Banner with Google Tag Manager

## Overview

Want to track how your cookie banner is performing? Use Google Tag Manager to monitor acceptance rates, user preferences, and more - all in YOUR Google Analytics, no external tracking needed.

---

## 🎯 What You Can Track:

- **Banner Views:** How many visitors see your cookie banner
- **Accept Rate:** % of users who accept all cookies
- **Reject Rate:** % of users who reject cookies
- **Preferences Opened:** How many users customize preferences
- **Category Preferences:** Which cookie categories users accept most
- **Time to Decision:** How long users take to decide

---

## 🚀 Quick Setup (5 Minutes):

### **Step 1: Add Data Layer Events to Your Banner**

When you generate your cookie banner code, add these tracking events to the JavaScript:

```javascript
// After accepting cookies
acceptBtn.onclick = function() {
  // Your existing code
  saveConsent({ essential: true, functionality: true, analytics: true, marketing: true });
  banner.style.display = 'none';
  
  // ADD THIS: Track accept event
  if (window.dataLayer) {
    window.dataLayer.push({
      'event': 'cookie_consent',
      'consent_action': 'accept_all',
      'consent_categories': 'all'
    });
  }
};

// After rejecting cookies
rejectBtn.onclick = function() {
  // Your existing code
  saveConsent({ essential: true, functionality: false, analytics: false, marketing: false });
  banner.style.display = 'none';
  
  // ADD THIS: Track reject event
  if (window.dataLayer) {
    window.dataLayer.push({
      'event': 'cookie_consent',
      'consent_action': 'reject_all',
      'consent_categories': 'essential_only'
    });
  }
};

// After customizing preferences
savePrefsBtn.onclick = function() {
  var func = document.getElementById('cookie-func-toggle');
  var analytics = document.getElementById('cookie-analytics-toggle');
  var marketing = document.getElementById('cookie-marketing-toggle');
  
  // Your existing code
  saveConsent({
    essential: true,
    functionality: func ? func.checked : false,
    analytics: analytics ? analytics.checked : false,
    marketing: marketing ? marketing.checked : false
  });
  banner.style.display = 'none';
  
  // ADD THIS: Track custom preferences
  if (window.dataLayer) {
    window.dataLayer.push({
      'event': 'cookie_consent',
      'consent_action': 'customize',
      'consent_functionality': func ? func.checked : false,
      'consent_analytics': analytics ? analytics.checked : false,
      'consent_marketing': marketing ? marketing.checked : false
    });
  }
};
```

---

### **Step 2: Create GTM Trigger**

1. Go to **Google Tag Manager**
2. Click **Triggers** → **New**
3. **Trigger Configuration:**
   - Trigger Type: **Custom Event**
   - Event Name: `cookie_consent`
4. **Save** as "Cookie Consent Event"

---

### **Step 3: Create GA4 Event Tag**

1. Go to **Tags** → **New**
2. **Tag Configuration:**
   - Tag Type: **Google Analytics: GA4 Event**
   - Event Name: `cookie_consent_interaction`
   - Event Parameters:
     - `consent_action`: `{{consent_action}}`
     - `consent_categories`: `{{consent_categories}}`
3. **Triggering:** Select "Cookie Consent Event" trigger
4. **Save** and **Submit**

---

### **Step 4: View Your Data**

Go to **Google Analytics** → **Reports** → **Events**

Look for: `cookie_consent_interaction`

**You'll see:**
- Total banner interactions
- Accept vs Reject breakdown
- Custom preference selections
- Conversion funnel

---

## 📊 Example Reports You Can Build:

### **1. Acceptance Rate Report**

**Metric:** % of visitors who accept cookies

```
Total "cookie_consent" events: 1,000
Accept events: 730
Reject events: 180
Customize events: 90

Acceptance Rate: 73%
```

### **2. Category Preference Report**

**Metric:** Which cookie categories users accept

```
Analytics cookies accepted: 85%
Marketing cookies accepted: 45%
Functionality cookies accepted: 92%
```

### **3. Time to Decision**

**Metric:** How long until users decide

```
Average time to decision: 12 seconds
Immediate accepts: 45%
Views preferences first: 22%
```

---

## 🎯 Advanced Tracking (Optional):

### **Track Preferences Changes:**

```javascript
// When user reopens banner from footer link
window.showCookiePreferences = function() {
  var banner = document.getElementById('cookie-consent-banner');
  if (banner) {
    banner.style.display = 'block';
    
    // Track preference changes
    if (window.dataLayer) {
      window.dataLayer.push({
        'event': 'cookie_consent_reopen',
        'consent_action': 'change_preferences'
      });
    }
  }
};
```

### **Track by Device:**

```javascript
// Add device info
if (window.dataLayer) {
  window.dataLayer.push({
    'event': 'cookie_consent',
    'consent_action': 'accept_all',
    'device_type': window.innerWidth < 768 ? 'mobile' : 'desktop'
  });
}
```

---

## 📋 Complete Implementation Checklist:

- [ ] Add dataLayer.push() to accept button
- [ ] Add dataLayer.push() to reject button  
- [ ] Add dataLayer.push() to save preferences button
- [ ] Create GTM custom event trigger
- [ ] Create GA4 event tag
- [ ] Set up GTM variables (consent_action, consent_categories)
- [ ] Test in GTM Preview mode
- [ ] Publish GTM container
- [ ] View events in GA4

---

## 🎁 Bonus: Pre-Built GTM Setup

### **Copy-Paste GTM Variables:**

**Variable 1: consent_action**
- Variable Type: Data Layer Variable
- Data Layer Variable Name: `consent_action`

**Variable 2: consent_categories**
- Variable Type: Data Layer Variable
- Data Layer Variable Name: `consent_categories`

**Variable 3: consent_functionality**
- Variable Type: Data Layer Variable
- Data Layer Variable Name: `consent_functionality`

**Variable 4: consent_analytics**
- Variable Type: Data Layer Variable  
- Data Layer Variable Name: `consent_analytics`

**Variable 5: consent_marketing**
- Variable Type: Data Layer Variable
- Data Layer Variable Name: `consent_marketing`

---

## ✅ Benefits of This Approach:

### **For Users:**
- ✅ Track in THEIR Google Analytics (they own the data)
- ✅ No external calls to your server (fast, private)
- ✅ Works with existing GTM setup
- ✅ Standard GTM practice (not unusual)
- ✅ Free (no extra tools needed)

### **For You:**
- ✅ No server costs (they handle tracking)
- ✅ No privacy concerns (not YOUR tracking)
- ✅ No legal liability (they own the data)
- ✅ Adds value (helpful documentation)
- ✅ Ethical (transparent, user-controlled)

---

## 🚀 How to Offer This:

### **Option 1: Add to Generated Code as Comments**

```javascript
// ====================================
// OPTIONAL: TRACK BANNER PERFORMANCE
// ====================================
// Uncomment the code below to track banner interactions in YOUR Google Analytics.
// This sends events to YOUR Google Tag Manager - not our servers.
// 
// if (window.dataLayer) {
//   window.dataLayer.push({
//     'event': 'cookie_consent',
//     'consent_action': 'accept_all'
//   });
// }
// 
// See full setup guide: https://cookie-banner.ca/docs/gtm-tracking
```

### **Option 2: Add Checkbox in Builder**

```
Advanced Settings:
☑️ Include GTM tracking code (optional)
   Track banner performance in YOUR Google Analytics
```

If checked, auto-includes dataLayer.push() events

### **Option 3: Documentation Only**

Create a blog post / docs page:
- "How to Track Your Cookie Banner Performance with GTM"
- Step-by-step instructions
- Users manually add if they want

---

## 💡 Recommended Approach:

### **Add GTM Tracking as OPTIONAL Feature:**

**In Advanced Settings Tab:**
```
Card: "Analytics Tracking (Optional)"
Description: "Add Google Tag Manager tracking to monitor banner 
             performance in YOUR Google Analytics. No data sent 
             to our servers - you own all the data."

☑️ Enable GTM Tracking
   
When enabled, we'll include dataLayer.push() events in your 
generated code. You'll need Google Tag Manager installed on 
your website.

[Learn how to set up GTM tracking →]
```

**Generated Code (If Enabled):**
```javascript
// Track in YOUR Google Tag Manager
if (window.dataLayer) {
  window.dataLayer.push({
    'event': 'cookie_consent',
    'consent_action': 'accept_all'
  });
}
```

---

## ✅ Implementation Plan:

### **Quick (1 Hour):**
1. Add checkbox in Advanced tab: "Enable GTM Tracking"
2. When checked, inject dataLayer.push() in generated code
3. Add link to documentation
4. Create GTM setup guide (blog post or docs page)

### **Code Changes:**
```typescript
// In types/index.ts
advanced: {
  googleConsentMode: boolean
  gtmTracking: boolean  // NEW
  customCSS: string
  customJS: string
}

// In code generator
if (config.advanced.gtmTracking) {
  // Add dataLayer.push() to all button handlers
}
```

---

## 🎯 User Flow:

```
User creates banner
  ↓
Goes to Advanced tab
  ↓
Sees: "☑️ Enable GTM Tracking"
  ↓
Checks box
  ↓
Generates code
  ↓
Code includes dataLayer.push()
  ↓
User deploys to website
  ↓
User sets up GTM trigger (following your guide)
  ↓
User sees events in THEIR Google Analytics
  ↓
User owns all the data, no calls to your server!
```

---

## ✅ Perfect Solution!

**This approach:**
- ✅ Gives users analytics (what they want)
- ✅ No external calls to your server (privacy-friendly)
- ✅ No cost increase for you (they use their GTM)
- ✅ No legal liability (they own the data)
- ✅ Adds value (helpful feature)
- ✅ Ethical and transparent

**Should I implement this GTM tracking feature now?** It would take about 1 hour and would be a great value-add! 🚀

