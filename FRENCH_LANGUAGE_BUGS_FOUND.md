# 🐛 French Language Feature - Bugs Found & Fixes

## Critical Issues Discovered:

### ❌ **Bug #1: Interface Types Missing**
**Location:** `components/banner/code-generator.tsx` and `components/banner/banner-preview.tsx`

**Problem:** 
- The `BannerConfig` interface is missing the `language` and `footerLink` fields
- TypeScript won't catch errors when these fields are used
- This causes silent failures

**Fix Applied:** ✅
- Added `language: 'en' | 'fr' | 'auto'` to both interfaces
- Added `footerLink` object to branding section

---

### ⚠️ **Bug #2: Language Selection Not Applying Translations**
**Location:** `app/dashboard/builder/page.tsx`

**Problem:**
- When user selects a language, it only stores the setting
- It doesn't actually update the `config.text` fields with translated text
- User has to manually type French text even if they select "Français"

**Current Behavior:**
1. User selects "Français" from dropdown
2. Text fields still show English
3. User must manually translate every field

**Expected Behavior:**
1. User selects "Français" from dropdown
2. Text fields automatically populate with French translations
3. User can still edit if needed

**Fix Required:** 
- Add onChange handler to language selector that calls `applyTranslations()`
- Update all text fields when language changes

---

### ⚠️ **Bug #3: Auto-Detect Not Working in Generated Code**
**Location:** `components/banner/code-generator.tsx` - `generateJavaScript()`

**Problem:**
- Generated JavaScript uses hardcoded text from `config.text`
- If language is set to "auto", it doesn't detect browser language
- French users will see English banner even with "auto" selected

**Current Behavior:**
- Generated code: `<h3>We use cookies</h3>`
- Always shows config text, no detection

**Expected Behavior:**
- If `language: 'auto'`, inject detection code
- Detect browser language on page load
- Replace text dynamically based on language

**Fix Required:**
- Add language detection function to generated JavaScript
- Include both English and French translations in generated code
- Apply appropriate translation based on detected language

---

### ⚠️ **Bug #4: Footer Link Not Generated**
**Location:** `components/banner/code-generator.tsx` - `generateHTML()`

**Problem:**
- Footer link settings exist in config
- But generated HTML doesn't include the footer link code
- Floating button or inline snippet never gets generated

**Fix Required:**
- Add footer link generation to `generateHTML()`
- For floating: generate button element
- For inline: provide copy-paste snippet

---

## 🔧 Detailed Fixes Needed:

### Fix #1: Auto-Apply Translations When Language Changes

**File:** `app/dashboard/builder/page.tsx`

**Add this handler:**
```typescript
import { applyTranslations } from '@/lib/translations'

// In the component
const handleLanguageChange = (newLanguage: 'en' | 'fr' | 'auto') => {
  updateConfig('language', newLanguage)
  
  // If not auto, apply translations immediately
  if (newLanguage !== 'auto') {
    const translations = applyTranslations(newLanguage)
    updateConfig('text', translations)
  }
}
```

**Update the Select:**
```typescript
<Select 
  value={config.language} 
  onValueChange={handleLanguageChange}  // Changed from updateConfig
>
```

---

### Fix #2: Inject Language Detection into Generated Code

**File:** `components/banner/code-generator.tsx`

**Add to `generateJavaScript()`:**

```javascript
// Add at the top of the generated function
var TRANSLATIONS = {
  en: {
    title: "${config.text.title}",
    message: "${config.text.message}",
    acceptButton: "${config.text.acceptButton}",
    rejectButton: "${config.text.rejectButton}",
    preferencesButton: "${config.text.preferencesButton}"
  },
  fr: {
    title: "Nous utilisons des cookies",
    message: "Ce site web utilise des cookies pour améliorer votre expérience de navigation et fournir du contenu personnalisé.",
    acceptButton: "Accepter tout",
    rejectButton: "Rejeter",
    preferencesButton: "Préférences"
  }
};

function detectLanguage() {
  ${config.language === 'auto' ? `
  var browserLang = navigator.language || navigator.userLanguage;
  return browserLang.toLowerCase().startsWith('fr') ? 'fr' : 'en';
  ` : `
  return '${config.language}';
  `}
}

function applyTranslations() {
  var lang = detectLanguage();
  var trans = TRANSLATIONS[lang] || TRANSLATIONS.en;
  
  document.getElementById('cookie-title').textContent = trans.title;
  document.getElementById('cookie-message').textContent = trans.message;
  document.getElementById('cookie-accept-btn').textContent = trans.acceptButton;
  document.getElementById('cookie-reject-btn').textContent = trans.rejectButton;
  if (document.getElementById('cookie-preferences-btn')) {
    document.getElementById('cookie-preferences-btn').textContent = trans.preferencesButton;
  }
}

// Call on init
applyTranslations();
```

---

### Fix #3: Generate Footer Link HTML

**File:** `components/banner/code-generator.tsx`

**Add to `generateHTML()` (after main banner div):**

```typescript
${config.branding.footerLink.enabled && config.branding.footerLink.position === 'floating' ? `
<!-- Floating Cookie Settings Button -->
<div id="cookie-settings-float" style="
  position: fixed;
  ${config.branding.footerLink.floatingPosition === 'bottom-right' ? 'bottom: 20px; right: 20px;' : 'bottom: 20px; left: 20px;'}
  z-index: 999999;
  background: ${config.colors.button};
  color: ${config.colors.buttonText};
  padding: 10px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-family: inherit;
  font-size: 14px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  display: none;
">
  ${config.branding.footerLink.text}
</div>
` : ''}
```

**Add to `generateJavaScript()` in init():**

```javascript
// Show footer link after consent is given
if (existingConsent) {
  loadScripts(existingConsent);
  var floatBtn = document.getElementById('cookie-settings-float');
  if (floatBtn) {
    floatBtn.style.display = 'block';
    floatBtn.onclick = function() {
      banner.style.display = 'block';
    };
  }
  return;
}
```

---

## ✅ Fixes Already Applied:

1. ✅ Added `language` field to type definitions
2. ✅ Added `footerLink` field to type definitions
3. ✅ Created translation utility functions
4. ✅ Added language selector UI in builder
5. ✅ Added footer link settings UI

---

## 🚨 Remaining Work:

1. ⚠️ **Apply translations when language changes** (Fix #1)
2. ⚠️ **Inject language detection into generated code** (Fix #2)
3. ⚠️ **Generate footer link HTML** (Fix #3)
4. ⚠️ **Test with French browser**
5. ⚠️ **Test with English browser**
6. ⚠️ **Test manual language selection**

---

## 🧪 Testing Checklist:

### Test Language Selection:
- [ ] Select "English" → Text fields show English
- [ ] Select "Français" → Text fields show French
- [ ] Select "Auto-detect" → No change (user keeps current text)
- [ ] Change language → Preview updates immediately

### Test Generated Code:
- [ ] Language "en" → Banner always shows English
- [ ] Language "fr" → Banner always shows French  
- [ ] Language "auto" with French browser → Banner shows French
- [ ] Language "auto" with English browser → Banner shows English

### Test Footer Link:
- [ ] Enable floating button → Button appears in preview
- [ ] Enable inline → HTML snippet is shown
- [ ] Click floating button → Banner reopens
- [ ] Position changes → Button moves correctly

---

## 📊 Impact:

**Without Fixes:**
- ❌ French language feature doesn't actually work
- ❌ Users can't easily create French banners
- ❌ Auto-detect is non-functional
- ❌ Footer link never appears

**With Fixes:**
- ✅ One-click French banner creation
- ✅ Auto-detect works for Canadian sites
- ✅ Quebec Law 25 compliant
- ✅ Better UX with footer link

---

**Priority:** 🔴 **CRITICAL**  
**Estimated Fix Time:** 2-3 hours  
**User Impact:** HIGH (feature doesn't work as advertised)

