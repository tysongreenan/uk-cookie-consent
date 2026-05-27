'use client';
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dynamic = void 0;
exports.default = BannerBuilderPage;
exports.dynamic = 'force-dynamic';
var react_1 = require("react");
var react_2 = require("next-auth/react");
var navigation_1 = require("next/navigation");
var button_1 = require("@/components/ui/button");
var card_1 = require("@/components/ui/card");
var input_1 = require("@/components/ui/input");
var tabs_1 = require("@/components/ui/tabs");
var label_1 = require("@/components/ui/label");
var switch_1 = require("@/components/ui/switch");
var select_1 = require("@/components/ui/select");
var lucide_react_1 = require("lucide-react");
var link_1 = require("next/link");
var banner_preview_1 = require("@/components/banner/banner-preview");
var code_generator_1 = require("@/components/banner/code-generator");
var badge_1 = require("@/components/ui/badge");
var alert_1 = require("@/components/ui/alert");
var react_hot_toast_1 = require("react-hot-toast");
var translations_1 = require("@/lib/translations");
var script_templates_1 = require("@/lib/script-templates");
var banner_migration_1 = require("@/lib/banner-migration");
var compliance_selector_1 = require("@/components/banner/compliance-selector");
var banner_templates_1 = require("@/lib/banner-templates");
var upgrade_prompt_1 = require("@/components/dashboard/upgrade-prompt");
var plan_restrictions_1 = require("@/lib/plan-restrictions");
var tooltip_1 = require("@/components/ui/tooltip");
var color_picker_1 = require("@/components/ui/color-picker");
var slider_1 = require("@/components/ui/slider");
var contrast_badge_1 = require("@/components/ui/contrast-badge");
var tcf_config_panel_1 = require("@/components/banner/tcf-config-panel");
var color_presets_1 = require("@/lib/color-presets");
var font_presets_1 = require("@/lib/font-presets");
var script_scanner_import_1 = require("@/components/banner/script-scanner-import");
var import_candidates_1 = require("@/lib/scripts/import-candidates");
// Helper function to generate inline footer link HTML
function generateInlineFooterLinkHTML(footerLink) {
    var _a, _b, _c, _d;
    var text = footerLink.text || 'Cookie Settings';
    var linkType = ((_a = footerLink.inlineStyle) === null || _a === void 0 ? void 0 : _a.linkType) || 'plain';
    var includeIcon = ((_b = footerLink.inlineStyle) === null || _b === void 0 ? void 0 : _b.includeIcon) || false;
    var includeLogo = ((_c = footerLink.inlineStyle) === null || _c === void 0 ? void 0 : _c.includeLogo) || false;
    var customClass = ((_d = footerLink.inlineStyle) === null || _d === void 0 ? void 0 : _d.customClass) || '';
    var html = '';
    switch (linkType) {
        case 'plain':
            html = "<a href=\"#\" onclick=\"window.showCookiePreferences?.(); return false;\" class=\"cookie-settings-link".concat(customClass ? ' ' + customClass : '', "\">").concat(text, "</a>");
            break;
        case 'button':
            html = "<button onclick=\"window.showCookiePreferences?.(); return false;\" class=\"cookie-settings-btn".concat(customClass ? ' ' + customClass : '', "\" style=\"background: #3b82f6; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;\">").concat(text, "</button>");
            break;
        case 'icon-text':
            var icon = includeIcon ? '🍪 ' : '';
            html = "<a href=\"#\" onclick=\"window.showCookiePreferences?.(); return false;\" class=\"cookie-settings-link".concat(customClass ? ' ' + customClass : '', "\">").concat(icon).concat(text, "</a>");
            break;
        case 'custom':
            var customIcon = includeIcon ? '🍪 ' : '';
            var customLogo = includeLogo ? '<img src="YOUR_LOGO_URL" alt="Logo" style="height: 16px; margin-right: 4px;" />' : '';
            html = "<a href=\"#\" onclick=\"window.showCookiePreferences?.(); return false;\" class=\"cookie-settings-link".concat(customClass ? ' ' + customClass : '', "\">").concat(customLogo).concat(customIcon).concat(text, "</a>");
            break;
        default:
            html = "<a href=\"#\" onclick=\"window.showCookiePreferences?.(); return false;\" class=\"cookie-settings-link\">".concat(text, "</a>");
    }
    return html;
}
// Helper functions for live preview
function generateFloatingButtonPreviewStyles(config) {
    var _a, _b, _c, _d;
    var floatingStyle = ((_b = (_a = config.branding) === null || _a === void 0 ? void 0 : _a.footerLink) === null || _b === void 0 ? void 0 : _b.floatingStyle) || {};
    var shape = floatingStyle.shape || 'pill';
    var size = floatingStyle.size || 'small';
    var showText = (_c = floatingStyle.showText) !== null && _c !== void 0 ? _c : true;
    var useCustomColors = floatingStyle.useCustomColors || false;
    var customColors = floatingStyle.customColors || {};
    // Size mapping
    var sizeMap = {
        small: { width: '40px', height: '40px', padding: '8px', fontSize: '12px' },
        medium: { width: '48px', height: '48px', padding: '12px', fontSize: '14px' },
        large: { width: '56px', height: '56px', padding: '16px', fontSize: '16px' }
    };
    var sizeConfig = sizeMap[size] || sizeMap.small;
    // Shape-based styles
    var borderRadius = '4px';
    if (shape === 'circle') {
        borderRadius = '50%';
    }
    else if (shape === 'pill') {
        borderRadius = '20px';
    }
    // Colors
    var backgroundColor = useCustomColors && customColors.background
        ? customColors.background
        : ((_d = config.branding) === null || _d === void 0 ? void 0 : _d.primaryColor) || '#3b82f6';
    var textColor = useCustomColors && customColors.text
        ? customColors.text
        : '#ffffff';
    var borderColor = useCustomColors && customColors.border
        ? customColors.border
        : backgroundColor;
    return {
        backgroundColor: backgroundColor,
        color: textColor,
        border: "1px solid ".concat(borderColor),
        borderRadius: borderRadius,
        padding: showText ? sizeConfig.padding : '8px',
        width: showText ? 'auto' : sizeConfig.width,
        height: showText ? 'auto' : sizeConfig.height,
        minWidth: showText ? 'auto' : sizeConfig.width,
        minHeight: showText ? 'auto' : sizeConfig.height,
        fontSize: sizeConfig.fontSize,
        fontWeight: '500',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        cursor: 'pointer',
        userSelect: 'none',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
        transition: 'all 0.2s ease',
        gap: '6px'
    };
}
function generateFloatingButtonPreviewContent(config) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    var floatingStyle = ((_b = (_a = config.branding) === null || _a === void 0 ? void 0 : _a.footerLink) === null || _b === void 0 ? void 0 : _b.floatingStyle) || {};
    var shape = floatingStyle.shape || 'pill';
    var showText = (_c = floatingStyle.showText) !== null && _c !== void 0 ? _c : true;
    var text = ((_e = (_d = config.branding) === null || _d === void 0 ? void 0 : _d.footerLink) === null || _e === void 0 ? void 0 : _e.text) || 'Cookie Settings';
    var hasLogo = ((_g = (_f = config.branding) === null || _f === void 0 ? void 0 : _f.logo) === null || _g === void 0 ? void 0 : _g.enabled) && ((_j = (_h = config.branding) === null || _h === void 0 ? void 0 : _h.logo) === null || _j === void 0 ? void 0 : _j.url);
    // Check consent state for icon
    var consentState = typeof window !== 'undefined'
        ? localStorage.getItem('cookie-consent-preview-state') || 'accepted'
        : 'accepted';
    var hasAcceptedNonEssential = consentState === 'accepted';
    // Cookie icons (matching the code generator)
    var cookieAcceptedIcon = (<svg width="16" height="16" viewBox="0 -960 960 960" fill="currentColor">
      <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-75 29-147t81-128.5q52-56.5 125-91T475-881q21 0 43 2t45 7q-9 45 6 85t45 66.5q30 26.5 71.5 36.5t85.5-5q-26 59 7.5 113t99.5 56q1 11 1.5 20.5t.5 20.5q0 82-31.5 154.5t-85.5 127q-54 54.5-127 86T480-80Zm-60-480q25 0 42.5-17.5T480-620q0-25-17.5-42.5T420-680q-25 0-42.5 17.5T360-620q0 25 17.5 42.5T420-560Zm-80 200q25 0 42.5-17.5T400-420q0-25-17.5-42.5T340-480q-25 0-42.5 17.5T280-420q0 25-17.5 42.5T340-360Zm260 40q17 0 28.5-11.5T640-360q0-17-11.5-28.5T600-400q-17 0-28.5 11.5T560-360q0 17 11.5 28.5T600-320ZM480-160q122 0 216.5-84T800-458q-50-22-78.5-60T683-603q-77-11-132-66t-68-132q-80-2-140.5 29t-101 79.5Q201-644 180.5-587T160-480q0 133 93.5 226.5T480-160Zm0-324Z"/>
    </svg>);
    var cookieRejectedIcon = (<svg width="16" height="16" viewBox="0 -960 960 960" fill="currentColor">
      <path d="m815-260-58-58q18-31 29-66.5t14-73.5q-50-22-78.5-60T683-603q-77-11-132-66t-68-132q-49-2-90 10t-76 33l-57-57q61-42 137.5-58.5T563-872q-9 45 6 84.5t45 66.5q30 27 71 37t86-5q-31 69 11 118t96 51q8 72-9.5 138T815-260ZM340-360q-25 0-42.5-17.5T280-420q0-25-17.5-42.5T340-480q25 0 42.5 17.5T400-420q0 25-17.5 42.5T340-360ZM819-28 701-146q-48 32-103.5 49T480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-62 17-117.5T146-701L27-820l57-57L876-85l-57 57ZM480-160q45 0 85.5-12t76.5-33L205-642q-21 36-33 76.5T160-480q0 133 93.5 226.5T480-160Zm-56-264Zm135-137Z"/>
    </svg>);
    var cookieIcon = (<span id="cookie-icon">
      {hasAcceptedNonEssential ? cookieAcceptedIcon : cookieRejectedIcon}
    </span>);
    if (shape === 'circle') {
        // Circle always shows only cookie icon (not logo) for dynamic state changes
        return cookieIcon;
    }
    // Pill and square: show logo when available and text is enabled
    if (showText && hasLogo) {
        return (<>
        <img src={config.branding.logo.url} alt="Logo" style={{ width: '16px', height: '16px', objectFit: 'contain' }}/>
        <span>{text}</span>
      </>);
    }
    if (showText) {
        return (<>
        {cookieIcon}
        <span>{text}</span>
      </>);
    }
    // No text - show only icon
    return cookieIcon;
}
var defaultConfig = {
    version: '2.1.0',
    lastUpdated: new Date().toISOString(),
    compliance: {
        framework: 'pipeda',
        requiresExplicitConsent: false,
        requiresOptIn: false,
        requiresGranularConsent: false,
        requiresPrivacyPolicy: true,
        requiresDataRetentionPolicy: false,
        maxPenalty: 'Reputation damage and Privacy Commissioner findings',
        consentExpiry: 24,
    },
    integrations: {
        googleAnalytics: {
            enabled: false,
            measurementId: '',
            trackConsentEvents: true,
            trackImpressions: true,
            anonymizeIp: true
        }
    },
    name: 'My Cookie Banner',
    position: 'bottom',
    theme: 'dark',
    language: 'auto',
    colors: {
        background: '#1f2937',
        text: '#ffffff',
        button: '#3b82f6',
        buttonText: '#ffffff',
        link: '#60a5fa'
    },
    text: {
        title: 'We use cookies',
        message: 'This website uses cookies to enhance your browsing experience and provide personalized content.',
        acceptButton: 'Accept All',
        rejectButton: 'Reject',
        preferencesButton: 'Preferences'
    },
    behavior: {
        autoShow: true,
        dismissOnScroll: false,
        showPreferences: true,
        cookieExpiry: 182,
        buttonLayout: 'standard',
        showRejectButton: true
    },
    branding: {
        logo: {
            enabled: false,
            url: '',
            position: 'left',
            maxWidth: 120,
            maxHeight: 40
        },
        privacyPolicy: {
            url: '',
            text: 'Privacy Policy',
            openInNewTab: true,
            required: false
        },
        footerLink: {
            enabled: true,
            text: 'Cookie Settings',
            position: 'floating',
            floatingPosition: 'bottom-left',
            style: 'floating',
            floatingStyle: {
                shape: 'pill',
                size: 'small',
                showText: true,
                useCustomColors: false
            },
            inlineStyle: {
                linkType: 'plain',
                includeIcon: false,
                includeLogo: false
            }
        },
        showPoweredBy: true
    },
    layout: {
        width: 'full',
        customWidth: 400,
        maxWidth: 1200,
        borderRadius: 8,
        padding: 20,
        margin: 20,
        shadow: 'medium',
        animation: 'fade'
    },
    scripts: {
        strictlyNecessary: [
            {
                id: 'session-management',
                name: 'Session Management',
                category: 'strictly-necessary',
                scriptCode: "// Essential session management\nif (!sessionStorage.getItem('sessionId')) {\n  sessionStorage.setItem('sessionId', Date.now().toString());\n}",
                enabled: true
            }
        ],
        functionality: [],
        trackingPerformance: [],
        targetingAdvertising: []
    },
    advanced: {
        googleConsentMode: true,
        customCSS: '',
        customJS: '',
        performance: {
            deferNonCriticalScripts: true,
            useRequestIdleCallback: true,
            lazyLoadAnalytics: true,
            inlineCriticalCSS: true
        }
    }
};
// Common script database for autocomplete
var COMMON_SCRIPTS = {
    'strictly-necessary': [
        'Session Management',
        'Security Headers',
        'CSRF Protection',
        'Authentication',
        'Load Balancing',
        'Cookie Consent',
        'GDPR Compliance',
        'SSL Certificate',
        'Firewall Protection',
        'Rate Limiting'
    ],
    'functionality': [
        'User Preferences',
        'Language Selection',
        'Theme Settings',
        'Form Validation',
        'Local Storage',
        'Shopping Cart',
        'User Authentication',
        'Search Functionality',
        'Notifications',
        'Accessibility Tools'
    ],
    'tracking-performance': [
        'Google Analytics',
        'Google Analytics 4',
        'Microsoft Clarity',
        'Hotjar',
        'Mixpanel',
        'Amplitude',
        'Segment',
        'PostHog',
        'Plausible',
        'Fathom Analytics',
        'Adobe Analytics',
        'Piwik Pro',
        'Matomo',
        'Snowplow',
        'Heap Analytics',
        'Kissmetrics',
        'Crazy Egg',
        'FullStory',
        'LogRocket',
        'Sentry',
        'New Relic',
        'DataDog',
        'Cloudflare Analytics',
        'Vercel Analytics',
        'Netlify Analytics'
    ],
    'targeting-advertising': [
        'Facebook Pixel',
        'Google Ads',
        'Google Tag Manager',
        'LinkedIn Insight Tag',
        'Twitter Pixel',
        'Pinterest Tag',
        'TikTok Pixel',
        'Snapchat Pixel',
        'Pinterest Conversion',
        'Bing Ads',
        'YouTube Analytics',
        'Instagram Pixel',
        'Reddit Pixel',
        'Quora Pixel',
        'Outbrain Pixel',
        'Taboola Pixel',
        'Criteo Pixel',
        'The Trade Desk',
        'Amazon DSP',
        'Google Marketing Platform',
        'Adobe Experience Platform',
        'Salesforce Marketing Cloud',
        'HubSpot Tracking',
        'Mailchimp Tracking',
        'Klaviyo Tracking',
        'Intercom',
        'Zendesk Chat',
        'Drift',
        'Crisp',
        'Tidio',
        'LiveChat',
        'Olark',
        'Freshchat'
    ]
};
// Smart input component with autocomplete
var SmartScriptInput = function (_a) {
    var value = _a.value, onChange = _a.onChange, category = _a.category, _b = _a.placeholder, placeholder = _b === void 0 ? "Script name" : _b;
    var _c = (0, react_1.useState)(false), showSuggestions = _c[0], setShowSuggestions = _c[1];
    var _d = (0, react_1.useState)([]), filteredScripts = _d[0], setFilteredScripts = _d[1];
    var typingTimeoutRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(function () {
        // Clear existing timeout
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }
        // Only show suggestions after user stops typing for 300ms
        if (value.trim() && value.length >= 2) {
            typingTimeoutRef.current = setTimeout(function () {
                var suggestions = COMMON_SCRIPTS[category].filter(function (script) {
                    return script.toLowerCase().includes(value.toLowerCase()) &&
                        script.toLowerCase() !== value.toLowerCase();
                });
                console.log("Autocomplete for ".concat(category, ":"), { value: value, suggestions: suggestions });
                setFilteredScripts(suggestions);
                setShowSuggestions(suggestions.length > 0);
            }, 300);
        }
        else {
            setShowSuggestions(false);
            setFilteredScripts([]);
        }
        // Cleanup timeout on unmount
        return function () {
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
            }
        };
    }, [value, category]);
    return (<div className="relative">
      <input_1.Input value={value} onChange={function (e) { return onChange(e.target.value); }} onFocus={function () {
            // Only show suggestions on focus if we already have filtered results
            if (value.trim() && value.length >= 2 && filteredScripts.length > 0) {
                setShowSuggestions(true);
            }
        }} onBlur={function () { return setTimeout(function () { return setShowSuggestions(false); }, 150); }} placeholder={placeholder} className="font-medium border-0 p-0 h-auto"/>
      {showSuggestions && filteredScripts.length > 0 && value.trim() && (<div className="absolute top-full left-0 right-0 z-50 bg-popover border rounded-md shadow-lg mt-1 max-h-32 overflow-y-auto">
          {filteredScripts.map(function (script, index) { return (<button key={index} className="w-full text-left px-3 py-2 hover:bg-muted text-sm" onMouseDown={function (e) {
                    e.preventDefault();
                    onChange(script);
                    setShowSuggestions(false);
                }}>
              {script}
            </button>); })}
        </div>)}
    </div>);
};
function BannerBuilderContent() {
    var _this = this;
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37, _38, _39, _40, _41, _42, _43, _44, _45, _46, _47, _48, _49, _50, _51, _52, _53, _54, _55, _56, _57, _58, _59, _60, _61, _62, _63, _64, _65, _66, _67, _68, _69, _70, _71, _72, _73, _74, _75, _76, _77, _78, _79, _80, _81, _82, _83, _84, _85, _86, _87, _88, _89, _90, _91, _92, _93, _94, _95, _96, _97, _98, _99, _100, _101, _102, _103, _104, _105, _106, _107, _108, _109, _110, _111, _112, _113, _114, _115, _116, _117, _118, _119, _120, _121, _122, _123, _124, _125, _126, _127, _128, _129, _130, _131, _132, _133, _134, _135;
    var session = (0, react_2.useSession)().data;
    var router = (0, navigation_1.useRouter)();
    var searchParams = (0, navigation_1.useSearchParams)();
    var _136 = (0, react_1.useState)(defaultConfig), config = _136[0], setConfig = _136[1];
    var _137 = (0, react_1.useState)(false), isLoading = _137[0], setIsLoading = _137[1];
    var _138 = (0, react_1.useState)('compliance'), activeTab = _138[0], setActiveTab = _138[1];
    var _139 = (0, react_1.useState)(false), isEditing = _139[0], setIsEditing = _139[1];
    var _140 = (0, react_1.useState)(null), bannerId = _140[0], setBannerId = _140[1];
    var _141 = (0, react_1.useState)(null), bannerUpdatedAt = _141[0], setBannerUpdatedAt = _141[1];
    var _142 = (0, react_1.useState)(false), isLoadingBanner = _142[0], setIsLoadingBanner = _142[1];
    var _143 = (0, react_1.useState)('free'), userPlan = _143[0], setUserPlan = _143[1];
    var _144 = (0, react_1.useState)(''), brandImportUrl = _144[0], setBrandImportUrl = _144[1];
    var _145 = (0, react_1.useState)(false), isDiscoveringBrand = _145[0], setIsDiscoveringBrand = _145[1];
    var _146 = (0, react_1.useState)(null), brandDiscovery = _146[0], setBrandDiscovery = _146[1];
    var _147 = (0, react_1.useState)(null), brandDiscoveryError = _147[0], setBrandDiscoveryError = _147[1];
    var _148 = (0, react_1.useState)(null), detectedCmpVendor = _148[0], setDetectedCmpVendor = _148[1];
    var loadedBannerRef = (0, react_1.useRef)(null);
    var _149 = (0, react_1.useState)(false), isDirty = _149[0], setIsDirty = _149[1];
    (0, react_1.useEffect)(function () {
        var _a;
        if (!session) {
            router.push('/auth/signin');
        }
        else {
            var planTier = (((_a = session.user) === null || _a === void 0 ? void 0 : _a.planTier) || 'free');
            setUserPlan(planTier);
        }
    }, [session, router]);
    (0, react_1.useEffect)(function () {
        var editId = searchParams.get('id') || searchParams.get('edit');
        // Only load if we have an ID, session, and haven't already loaded this banner
        if (editId && session && loadedBannerRef.current !== editId) {
            loadedBannerRef.current = editId;
            loadBannerForEdit(editId);
        }
    }, [searchParams, session]);
    // Warn user about unsaved changes before leaving the page
    (0, react_1.useEffect)(function () {
        var handleBeforeUnload = function (e) {
            if (isDirty) {
                e.preventDefault();
                e.returnValue = '';
            }
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return function () { return window.removeEventListener('beforeunload', handleBeforeUnload); };
    }, [isDirty]);
    var loadBannerForEdit = function (id) { return __awaiter(_this, void 0, void 0, function () {
        var response, data, originalConfig, needsUpdate, bannerConfig, migrationNotes, error_1, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setIsLoadingBanner(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 12, 13, 14]);
                    return [4 /*yield*/, fetch("/api/banners/simple/".concat(id))];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = (_a.sent());
                    if (!(response.ok && data.banner)) return [3 /*break*/, 10];
                    originalConfig = data.banner.config;
                    needsUpdate = (0, banner_migration_1.needsMigration)(originalConfig);
                    bannerConfig = originalConfig;
                    if (!needsUpdate) return [3 /*break*/, 8];
                    // Migrate to latest version
                    bannerConfig = (0, banner_migration_1.migrateBannerConfig)(originalConfig);
                    migrationNotes = (0, banner_migration_1.getMigrationNotes)(originalConfig.version || '1.0.0', bannerConfig.version);
                    // Show migration notification
                    react_hot_toast_1.toast.success("\uD83C\uDF89 Banner updated with new features! ".concat(migrationNotes.length > 0 ? migrationNotes[0] : 'Enhanced preferences modal added.'), { duration: 6000 });
                    _a.label = 4;
                case 4:
                    _a.trys.push([4, 6, , 7]);
                    return [4 /*yield*/, fetch("/api/banners/simple/".concat(id), {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                name: data.banner.name,
                                config: bannerConfig,
                                isActive: data.banner.isActive
                            })
                        })];
                case 5:
                    _a.sent();
                    return [3 /*break*/, 7];
                case 6:
                    error_1 = _a.sent();
                    console.error('Failed to save migrated banner:', error_1);
                    return [3 /*break*/, 7];
                case 7: return [3 /*break*/, 9];
                case 8:
                    // Even if migration didn't run, ensure new fields exist
                    // This handles cases where banners might be at 2.1.0 but missing buttonLayout
                    if (!bannerConfig.behavior) {
                        bannerConfig.behavior = {
                            autoShow: true,
                            dismissOnScroll: false,
                            showPreferences: true,
                            cookieExpiry: 182,
                            buttonLayout: 'standard',
                            showRejectButton: true
                        };
                    }
                    else {
                        // Ensure new fields exist on existing behavior object
                        if (bannerConfig.behavior.buttonLayout === undefined) {
                            bannerConfig.behavior.buttonLayout = 'standard';
                        }
                        if (bannerConfig.behavior.showRejectButton === undefined) {
                            bannerConfig.behavior.showRejectButton = true;
                        }
                    }
                    _a.label = 9;
                case 9:
                    setConfig(bannerConfig);
                    setIsEditing(true);
                    setBannerId(id);
                    // Store updatedAt for cache-busting in script URLs
                    setBannerUpdatedAt(data.banner.updatedAt ? new Date(data.banner.updatedAt) : new Date());
                    react_hot_toast_1.toast.success("Loaded \"".concat(data.banner.name, "\" for editing"));
                    return [3 /*break*/, 11];
                case 10:
                    console.error('Failed to load banner:', data.error);
                    react_hot_toast_1.toast.error(data.error || 'Failed to load banner for editing');
                    router.push('/dashboard/builder');
                    _a.label = 11;
                case 11: return [3 /*break*/, 14];
                case 12:
                    error_2 = _a.sent();
                    console.error('Error loading banner:', error_2);
                    react_hot_toast_1.toast.error('Failed to load banner for editing');
                    router.push('/dashboard/builder');
                    return [3 /*break*/, 14];
                case 13:
                    setIsLoadingBanner(false);
                    return [7 /*endfinally*/];
                case 14: return [2 /*return*/];
            }
        });
    }); };
    var updateConfig = function (section, updates) {
        setIsDirty(true);
        setConfig(function (prev) {
            var _a, _b;
            var currentValue = prev[section];
            // If the current value is a primitive (string, number, boolean) or null/undefined,
            // replace it directly with the new value
            if (typeof currentValue !== 'object' || currentValue === null) {
                return __assign(__assign({}, prev), (_a = {}, _a[section] = updates, _a));
            }
            // If the current value is an object, merge the updates
            return __assign(__assign({}, prev), (_b = {}, _b[section] = __assign(__assign({}, currentValue), updates), _b));
        });
    };
    var applyColorUpdates = function (updates) {
        setConfig(function (prev) { return (__assign(__assign({}, prev), { theme: 'custom', colors: __assign(__assign({}, prev.colors), updates) })); });
        setIsDirty(true);
    };
    var applyColorRole = function (role, value) {
        var _a;
        applyColorUpdates((_a = {}, _a[role] = value, _a));
        react_hot_toast_1.toast.success("Applied ".concat(role, " color"));
    };
    var applyBrandPalette = function () {
        if (!(brandDiscovery === null || brandDiscovery === void 0 ? void 0 : brandDiscovery.suggestions))
            return;
        applyColorUpdates(brandDiscovery.suggestions);
        react_hot_toast_1.toast.success('Brand palette applied');
    };
    var applyBrandLogo = function (logo) {
        setConfig(function (prev) { return (__assign(__assign({}, prev), { branding: __assign(__assign({}, prev.branding), { logo: __assign(__assign({}, prev.branding.logo), { enabled: true, url: logo.url }) }) })); });
        react_hot_toast_1.toast.success('Brand logo applied');
    };
    var handleScannerImport = function (scripts, summary) {
        if (scripts.length === 0) {
            (0, react_hot_toast_1.toast)('No scripts selected for import.', { icon: 'ℹ️' });
            return;
        }
        setConfig(function (prev) {
            var nextScripts = {
                strictlyNecessary: __spreadArray([], prev.scripts.strictlyNecessary, true),
                functionality: __spreadArray([], prev.scripts.functionality, true),
                trackingPerformance: __spreadArray([], prev.scripts.trackingPerformance, true),
                targetingAdvertising: __spreadArray([], prev.scripts.targetingAdvertising, true),
            };
            scripts.forEach(function (script) {
                var key = (0, import_candidates_1.categoryToConfigKey)(script.category);
                nextScripts[key] = __spreadArray(__spreadArray([], nextScripts[key], true), [script], false);
            });
            return __assign(__assign({}, prev), { scripts: nextScripts });
        });
        setIsDirty(true);
        react_hot_toast_1.toast.success("Imported ".concat(summary.imported, " script").concat(summary.imported === 1 ? '' : 's', " into your banner."));
        summary.warnings.slice(0, 3).forEach(function (warning) {
            (0, react_hot_toast_1.toast)(warning, { icon: '!', duration: 6000 });
        });
    };
    var handleUseDetectedPrivacyPolicy = function (url) {
        setConfig(function (prev) { return (__assign(__assign({}, prev), { branding: __assign(__assign({}, prev.branding), { privacyPolicy: __assign(__assign({}, prev.branding.privacyPolicy), { url: url }) }) })); });
        setIsDirty(true);
        react_hot_toast_1.toast.success('Detected privacy policy applied');
    };
    var handleBuilderScanComplete = function (result) {
        setDetectedCmpVendor(result.consentBanner.detected ? result.consentBanner.vendor : null);
    };
    var handleBrandImport = function () { return __awaiter(_this, void 0, void 0, function () {
        var response, data, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!brandImportUrl.trim()) {
                        setBrandDiscoveryError('Enter a website URL to import brand colors.');
                        return [2 /*return*/];
                    }
                    setIsDiscoveringBrand(true);
                    setBrandDiscoveryError(null);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    return [4 /*yield*/, fetch('/api/brand/discover', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ url: brandImportUrl.trim() })
                        })];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    if (!response.ok) {
                        setBrandDiscoveryError(data.error || 'Unable to discover brand details.');
                        return [2 /*return*/];
                    }
                    setBrandDiscovery(data);
                    if (data.suggestions) {
                        applyColorUpdates(data.suggestions);
                    }
                    react_hot_toast_1.toast.success('Brand colors applied');
                    return [3 /*break*/, 6];
                case 4:
                    error_3 = _a.sent();
                    setBrandDiscoveryError(error_3.message);
                    return [3 /*break*/, 6];
                case 5:
                    setIsDiscoveringBrand(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    var handleComplianceFrameworkChange = function (framework) {
        var template = (0, banner_templates_1.getBannerTemplate)(framework);
        // Only update compliance settings and required behavior changes
        // Preserve user's colors, text, and other customizations
        setConfig(function (prev) { return (__assign(__assign({}, prev), { compliance: template.compliance, behavior: __assign(__assign({}, prev.behavior), { showPreferences: template.compliance.requiresGranularConsent, cookieExpiry: template.compliance.consentExpiry }) })); });
        react_hot_toast_1.toast.success("Switched to ".concat(framework.toUpperCase(), " compliance framework"));
    };
    var handleLanguageChange = function (newLanguage) {
        if (newLanguage === 'auto') {
            setConfig(function (prev) { return (__assign(__assign({}, prev), { language: 'auto' })); });
        }
        else {
            var translations_2 = (0, translations_1.applyTranslations)(newLanguage);
            setConfig(function (prev) { return (__assign(__assign({}, prev), { language: newLanguage, text: translations_2 })); });
            var langNames = { en: 'English', es: 'Spanish', fr: 'French', de: 'German', pt: 'Portuguese', ja: 'Japanese', zh: 'Chinese', ko: 'Korean', ar: 'Arabic', hi: 'Hindi', nl: 'Dutch', sv: 'Swedish', nb: 'Norwegian', da: 'Danish', it: 'Italian', fi: 'Finnish' };
            react_hot_toast_1.toast.success("Banner text updated to ".concat(langNames[newLanguage]));
        }
    };
    var handleThemeChange = function (theme) {
        // Check if user has custom colors that differ from default light/dark themes
        if (theme !== 'custom') {
            var lightDefaults = { background: '#ffffff', text: '#1f2937', button: '#3b82f6', buttonText: '#ffffff', link: '#1d4ed8' };
            var darkDefaults = { background: '#1f2937', text: '#ffffff', button: '#3b82f6', buttonText: '#ffffff', link: '#60a5fa' };
            var currentColors_1 = config.colors;
            var isDefaultLight = Object.entries(lightDefaults).every(function (_a) {
                var k = _a[0], v = _a[1];
                return currentColors_1[k] === v;
            });
            var isDefaultDark = Object.entries(darkDefaults).every(function (_a) {
                var k = _a[0], v = _a[1];
                return currentColors_1[k] === v;
            });
            if (!isDefaultLight && !isDefaultDark) {
                if (!window.confirm('Switching themes will reset your custom colors. Continue?')) {
                    return;
                }
            }
        }
        setIsDirty(true);
        setConfig(function (prev) { return (__assign(__assign({}, prev), { theme: theme, colors: theme === 'light' ? {
                background: '#ffffff',
                text: '#1f2937',
                button: '#3b82f6',
                buttonText: '#ffffff',
                link: '#1d4ed8'
            } : theme === 'dark' ? {
                background: '#1f2937',
                text: '#ffffff',
                button: '#3b82f6',
                buttonText: '#ffffff',
                link: '#60a5fa'
            } : prev.colors })); });
    };
    var _150 = (0, react_1.useState)(false), isPushing = _150[0], setIsPushing = _150[1];
    var handleSave = function () { return __awaiter(_this, void 0, void 0, function () {
        var url, method, configWithVersion, response, data, error_4;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    setIsLoading(true);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, 5, 6]);
                    url = isEditing ? "/api/banners/simple/".concat(bannerId) : '/api/banners/simple';
                    method = isEditing ? 'PUT' : 'POST';
                    configWithVersion = __assign(__assign({}, config), { version: '2.1.0', lastUpdated: new Date().toISOString() });
                    return [4 /*yield*/, fetch(url, {
                            method: method,
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                name: config.name,
                                config: configWithVersion,
                                isActive: true
                            }),
                        })];
                case 2:
                    response = _b.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _b.sent();
                    if (response.ok) {
                        // Update local config with the version
                        setConfig(configWithVersion);
                        // Update timestamp for cache-busting
                        if ((_a = data.banner) === null || _a === void 0 ? void 0 : _a.updatedAt) {
                            setBannerUpdatedAt(new Date(data.banner.updatedAt));
                        }
                        else {
                            setBannerUpdatedAt(new Date());
                        }
                        setIsDirty(false);
                        react_hot_toast_1.toast.success(isEditing ? 'Banner updated successfully!' : 'Banner saved successfully!');
                        if (!isEditing) {
                            // For new banners, stay in the builder so users can copy the hosted
                            // replacement script and finish switching from their old CMP.
                            if (data.bannerId) {
                                setBannerId(data.bannerId);
                                setIsEditing(true);
                                setActiveTab('code');
                                router.replace("/dashboard/builder?id=".concat(data.bannerId));
                            }
                        }
                        else {
                            // For updated banners, stay on the page but show success
                            console.log('Banner updated successfully:', data.banner);
                        }
                    }
                    else {
                        console.error('Save/Update error:', data.error);
                        react_hot_toast_1.toast.error(data.error || 'Failed to save banner');
                    }
                    return [3 /*break*/, 6];
                case 4:
                    error_4 = _b.sent();
                    console.error('Save error:', error_4);
                    react_hot_toast_1.toast.error('Failed to save banner');
                    return [3 /*break*/, 6];
                case 5:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    var handlePushLive = function () { return __awaiter(_this, void 0, void 0, function () {
        var configWithVersion, response, data, baseUrl, error_5;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!isEditing || !bannerId) {
                        react_hot_toast_1.toast.error('Please save the banner first');
                        return [2 /*return*/];
                    }
                    setIsPushing(true);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 7, 8, 9]);
                    configWithVersion = __assign(__assign({}, config), { version: '2.1.0', lastUpdated: new Date().toISOString() });
                    return [4 /*yield*/, fetch("/api/banners/simple/".concat(bannerId), {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                name: config.name,
                                config: configWithVersion,
                                isActive: true
                            }),
                        })];
                case 2:
                    response = _b.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _b.sent();
                    if (!response.ok) return [3 /*break*/, 5];
                    setConfig(configWithVersion);
                    // Update timestamp for cache-busting - this will update the script URL automatically
                    if ((_a = data.banner) === null || _a === void 0 ? void 0 : _a.updatedAt) {
                        setBannerUpdatedAt(new Date(data.banner.updatedAt));
                    }
                    else {
                        setBannerUpdatedAt(new Date());
                    }
                    baseUrl = process.env.NEXT_PUBLIC_BASE_URL || window.location.origin;
                    return [4 /*yield*/, fetch("".concat(baseUrl, "/api/v1/banner.js?id=").concat(bannerId, "&nocache=true"), {
                            cache: 'no-store'
                        })];
                case 4:
                    _b.sent();
                    setIsDirty(false);
                    react_hot_toast_1.toast.success(<div>
            <strong>Changes pushed live!</strong>
            <p className="text-sm mt-1">The script URL has been updated with a new cache-busting parameter.</p>
            <p className="text-sm mt-1">Browsers will automatically fetch the latest version.</p>
            <p className="text-xs mt-1 text-muted-foreground">If you see old content, hard refresh (Ctrl+Shift+R).</p>
          </div>, { duration: 6000 });
                    return [3 /*break*/, 6];
                case 5:
                    react_hot_toast_1.toast.error(data.error || 'Failed to push changes');
                    _b.label = 6;
                case 6: return [3 /*break*/, 9];
                case 7:
                    error_5 = _b.sent();
                    console.error('Push live error:', error_5);
                    react_hot_toast_1.toast.error('Failed to push changes live');
                    return [3 /*break*/, 9];
                case 8:
                    setIsPushing(false);
                    return [7 /*endfinally*/];
                case 9: return [2 /*return*/];
            }
        });
    }); };
    var isStepComplete = function (step) {
        var _a, _b, _c, _d;
        switch (step) {
            case 'compliance':
                return false; // Always has defaults, no meaningful completion to show
            case 'brand':
                return (config.colors.background !== '#1f2937' ||
                    config.colors.text !== '#f9fafb' ||
                    config.colors.button !== '#3b82f6' ||
                    config.colors.buttonText !== '#ffffff' ||
                    config.colors.link !== '#60a5fa');
            case 'design':
                return (config.position !== 'bottom' ||
                    config.layout.borderRadius !== 8 ||
                    config.layout.padding !== 20 ||
                    config.layout.margin !== 20);
            case 'content':
                return config.text.title !== 'We use cookies';
            case 'scripts':
                return (config.scripts.strictlyNecessary.some(function (s) { return s.scriptCode; }) ||
                    config.scripts.functionality.some(function (s) { return s.scriptCode; }) ||
                    config.scripts.trackingPerformance.some(function (s) { return s.scriptCode; }) ||
                    config.scripts.targetingAdvertising.some(function (s) { return s.scriptCode; }));
            case 'cookie-settings':
                return ((_b = (_a = config.branding) === null || _a === void 0 ? void 0 : _a.footerLink) === null || _b === void 0 ? void 0 : _b.enabled) === true;
            case 'behavior':
                return false; // Always has defaults, no meaningful completion to show
            case 'analytics':
                return !!((_d = (_c = config.integrations) === null || _c === void 0 ? void 0 : _c.googleAnalytics) === null || _d === void 0 ? void 0 : _d.measurementId);
            case 'code':
                return false; // Always available, no meaningful completion to show
            default:
                return false;
        }
    };
    if (!session) {
        return (<div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading...</p>
        </div>
      </div>);
    }
    if (isLoadingBanner) {
        return (<div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading banner for editing...</p>
        </div>
      </div>);
    }
    return (<div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button_1.Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-foreground">
                <link_1.default href="/dashboard">
                  <lucide_react_1.ArrowLeft className="h-4 w-4"/>
                </link_1.default>
              </button_1.Button>
              <div className="h-6 w-px bg-border"></div>
                <div className="flex items-center gap-1.5">
                  <input_1.Input value={config.name} onChange={function (e) { setIsDirty(true); setConfig(function (prev) { return (__assign(__assign({}, prev), { name: e.target.value })); }); }} placeholder="Banner name" className="text-lg font-semibold border-0 p-0 h-auto bg-transparent focus:bg-background focus:border focus:px-2 focus:py-1 focus:rounded"/>
                  <lucide_react_1.Pencil className="h-3.5 w-3.5 text-muted-foreground"/>
                </div>
            </div>
            <div className="flex items-center space-x-2">
              <button_1.Button onClick={handleSave} disabled={isLoading} size="sm">
                <lucide_react_1.Save className="h-4 w-4"/>
                {isLoading ? 'Saving...' : 'Save Draft'}
              </button_1.Button>
              {isEditing && (<button_1.Button onClick={handlePushLive} disabled={isPushing || isLoading} size="sm" className="bg-green-600 hover:bg-green-700">
                  {isPushing ? (<>
                      <lucide_react_1.Loader2 className="h-4 w-4 animate-spin"/>
                      Pushing...
                    </>) : (<>
                      <lucide_react_1.Rocket className="h-4 w-4"/>
                      Push Live
                    </>)}
                </button_1.Button>)}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Configuration Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-2">
              <div className="sticky top-6">
                {/* Progress */}
                <div className="mb-6">
                  {(function () {
            var stepOrder = ['compliance', 'brand', 'design', 'content', 'language', 'scripts', 'cookie-settings', 'behavior', 'geo-targeting', 'analytics', 'code'];
            var idx = Math.max(0, stepOrder.indexOf(activeTab));
            var total = stepOrder.length;
            var pct = Math.round(((idx + 1) / total) * 100);
            return (<div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-muted-foreground">Step {idx + 1} of {total}</span>
                        <span className="text-xs text-muted-foreground">{pct}%</span>
                      </div>);
        })()}
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full transition-all duration-300" style={{
            width: "".concat((function () {
                var stepOrder = ['compliance', 'brand', 'design', 'content', 'language', 'scripts', 'cookie-settings', 'behavior', 'geo-targeting', 'analytics', 'code'];
                var idx = Math.max(0, stepOrder.indexOf(activeTab));
                return Math.round(((idx + 1) / stepOrder.length) * 100);
            })(), "%")
        }}></div>
                  </div>
                </div>

                {/* Navigation Menu */}
                <nav className="space-y-1">
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    Configuration Steps
                  </div>
                  
                  <button onClick={function () { return setActiveTab('compliance'); }} className={"w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-colors ".concat(activeTab === 'compliance'
            ? 'bg-primary text-primary-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground hover:bg-muted')}>
                    <lucide_react_1.Shield className="h-4 w-4"/>
                    <span className="flex-1 text-left">Compliance</span>
                    {isStepComplete('compliance') && <span className="w-1.5 h-1.5 rounded-full bg-green-500"/>}
                  </button>
                  
                  <button onClick={function () { return setActiveTab('brand'); }} className={"w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-colors ".concat(activeTab === 'brand'
            ? 'bg-primary text-primary-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground hover:bg-muted')}>
                    <lucide_react_1.Palette className="h-4 w-4"/>
                    <span className="flex-1 text-left">Brand</span>
                    {isStepComplete('brand') && <span className="w-1.5 h-1.5 rounded-full bg-green-500"/>}
                  </button>

                  <button onClick={function () { return setActiveTab('design'); }} className={"w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-colors ".concat(activeTab === 'design'
            ? 'bg-primary text-primary-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground hover:bg-muted')}>
                    <lucide_react_1.PanelTop className="h-4 w-4"/>
                    <span className="flex-1 text-left">Layout</span>
                    {isStepComplete('design') && <span className="w-1.5 h-1.5 rounded-full bg-green-500"/>}
                  </button>
                  
                  <button onClick={function () { return setActiveTab('content'); }} className={"w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-colors ".concat(activeTab === 'content'
            ? 'bg-primary text-primary-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground hover:bg-muted')}>
                    <lucide_react_1.Type className="h-4 w-4"/>
                    <span className="flex-1 text-left">Content</span>
                    {isStepComplete('content') && <span className="w-1.5 h-1.5 rounded-full bg-green-500"/>}
                  </button>
                  
                  <button onClick={function () { return setActiveTab('language'); }} className={"w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-colors ".concat(activeTab === 'language'
            ? 'bg-primary text-primary-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground hover:bg-muted')}>
                    <lucide_react_1.Globe className="h-4 w-4"/>
                    <span className="flex-1 text-left">Language</span>
                    {config.language !== 'auto' && <span className="w-1.5 h-1.5 rounded-full bg-green-500"/>}
                  </button>

                  <button onClick={function () { return setActiveTab('scripts'); }} className={"w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-colors ".concat(activeTab === 'scripts'
            ? 'bg-primary text-primary-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground hover:bg-muted')}>
                    <lucide_react_1.Code className="h-4 w-4"/>
                    <span className="flex-1 text-left">Scripts</span>
                    {isStepComplete('scripts') && <span className="w-1.5 h-1.5 rounded-full bg-green-500"/>}
                  </button>
                  
                  <button onClick={function () { return setActiveTab('cookie-settings'); }} className={"w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-colors ".concat(activeTab === 'cookie-settings'
            ? 'bg-primary text-primary-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground hover:bg-muted')}>
                    <lucide_react_1.Settings className="h-4 w-4"/>
                    <span className="flex-1 text-left">Cookie Settings</span>
                    {isStepComplete('cookie-settings') && <span className="w-1.5 h-1.5 rounded-full bg-green-500"/>}
                  </button>
                  
                  <button onClick={function () { return setActiveTab('behavior'); }} className={"w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-colors ".concat(activeTab === 'behavior'
            ? 'bg-primary text-primary-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground hover:bg-muted')}>
                    <lucide_react_1.SlidersHorizontal className="h-4 w-4"/>
                    <span className="flex-1 text-left">Behavior</span>
                    {isStepComplete('behavior') && <span className="w-1.5 h-1.5 rounded-full bg-green-500"/>}
                  </button>
                  
                  <button onClick={function () { return setActiveTab('geo-targeting'); }} className={"w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-colors ".concat(activeTab === 'geo-targeting'
            ? 'bg-primary text-primary-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground hover:bg-muted')}>
                    <lucide_react_1.Globe className="h-4 w-4"/>
                    <span className="flex-1 text-left">Geo-Targeting</span>
                    {((_b = (_a = config.geoRules) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0) > 0 && <span className="w-1.5 h-1.5 rounded-full bg-green-500"/>}
                  </button>

                  <button onClick={function () { return setActiveTab('analytics'); }} className={"w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-colors ".concat(activeTab === 'analytics'
            ? 'bg-primary text-primary-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground hover:bg-muted')}>
                    <lucide_react_1.BarChart3 className="h-4 w-4"/>
                    <span className="flex-1 text-left">Analytics</span>
                    {isStepComplete('analytics') && <span className="w-1.5 h-1.5 rounded-full bg-green-500"/>}
                  </button>
                  
                  <button onClick={function () { return setActiveTab('code'); }} className={"w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-colors ".concat(activeTab === 'code'
            ? 'bg-primary text-primary-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground hover:bg-muted')}>
                    <lucide_react_1.Code className="h-4 w-4"/>
                    <span className="flex-1 text-left">Code</span>
                    {isStepComplete('code') && <span className="w-1.5 h-1.5 rounded-full bg-green-500"/>}
                  </button>
                </nav>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-6">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-foreground capitalize">
                  {activeTab === 'compliance' ? 'Choose Compliance Framework' :
            activeTab === 'brand' ? 'Brand & Colors' :
                activeTab === 'design' ? 'Layout & Spacing' :
                    activeTab === 'content' ? 'Set Text & Messages' :
                        activeTab === 'scripts' ? 'Configure Tracking Scripts' :
                            activeTab === 'cookie-settings' ? 'Cookie Settings Management' :
                                activeTab === 'behavior' ? 'Set Banner Behavior' :
                                    activeTab === 'geo-targeting' ? 'Geo-Targeting Rules' :
                                        activeTab === 'analytics' ? 'Analytics Integration' : 'Get Your Code'}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {activeTab === 'compliance' ? 'Select the privacy law that applies to your website. This will configure your banner\'s requirements and legal text.' :
            activeTab === 'brand' ? 'Import your brand, choose colors, fonts, and logo for your cookie consent banner.' :
                activeTab === 'design' ? 'Configure position, layout, spacing, and animation settings.' :
                    activeTab === 'content' ? 'Set the text, messages, and button labels for your banner.' :
                        activeTab === 'scripts' ? 'Configure tracking scripts and cookie categories.' :
                            activeTab === 'cookie-settings' ? 'Configure how users can manage their cookie preferences after initial consent.' :
                                activeTab === 'behavior' ? 'Set how your banner behaves and interacts with users.' :
                                    activeTab === 'geo-targeting' ? 'Show different consent behavior based on visitor location. Requires Pro plan.' :
                                        activeTab === 'analytics' ? 'Configure Google Analytics 4 integration and tracking settings.' :
                                            'Copy the code below and paste it into your website to activate your cookie banner.'}
                </p>
              </div>
              
              <tabs_1.Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">

              {/* Compliance Tab */}
              <tabs_1.TabsContent value="compliance" className="space-y-6" id="compliance-panel" role="tabpanel" aria-labelledby="compliance-tab">
                <compliance_selector_1.ComplianceSelector selectedFramework={config.compliance.framework} onFrameworkChange={handleComplianceFrameworkChange}/>
                
                {/* Button Layout Section */}
                <card_1.Card className="border-l-4 border-l-green-500">
                  <card_1.CardHeader>
                    <card_1.CardTitle className="flex items-center gap-2">
                      <lucide_react_1.Settings className="h-5 w-5"/>
                      Button Layout
                    </card_1.CardTitle>
                    <card_1.CardDescription>
                      Choose which buttons appear on your banner. Some layouts may not meet all compliance requirements.
                    </card_1.CardDescription>
                  </card_1.CardHeader>
                  <card_1.CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Standard Layout */}
                      <div className={"p-4 rounded-lg border-2 cursor-pointer transition-all ".concat((config.behavior.buttonLayout || 'standard') === 'standard'
            ? 'border-primary bg-primary/5'
            : 'border-border hover:border-muted-foreground/50')} onClick={function () { return setConfig(function (prev) { return (__assign(__assign({}, prev), { behavior: __assign(__assign({}, prev.behavior), { buttonLayout: 'standard', showRejectButton: true }) })); }); }}>
                        <div className="font-medium mb-1">Standard</div>
                        <div className="text-sm text-muted-foreground mb-3">Accept + Reject + Customize</div>
                        <div className="flex flex-wrap gap-1">
                          <badge_1.Badge variant="default" className="text-xs">Accept</badge_1.Badge>
                          <badge_1.Badge variant="outline" className="text-xs">Reject</badge_1.Badge>
                          <badge_1.Badge variant="secondary" className="text-xs">Customize</badge_1.Badge>
                        </div>
                        <div className="mt-2 text-xs text-green-600">✓ GDPR Compliant</div>
                      </div>
                      
                      {/* Soft Consent Layout */}
                      <div className={"p-4 rounded-lg border-2 cursor-pointer transition-all ".concat(config.behavior.buttonLayout === 'soft-consent'
            ? 'border-primary bg-primary/5'
            : 'border-border hover:border-muted-foreground/50')} onClick={function () { return setConfig(function (prev) { return (__assign(__assign({}, prev), { behavior: __assign(__assign({}, prev.behavior), { buttonLayout: 'soft-consent', showRejectButton: false, showPreferences: true }) })); }); }}>
                        <div className="font-medium mb-1">Soft Consent</div>
                        <div className="text-sm text-muted-foreground mb-3">Accept + Customize only</div>
                        <div className="flex flex-wrap gap-1">
                          <badge_1.Badge variant="default" className="text-xs">Accept</badge_1.Badge>
                          <badge_1.Badge variant="secondary" className="text-xs">Customize</badge_1.Badge>
                        </div>
                        <div className="mt-2 text-xs text-amber-600">⚠ No reject button — may fail GDPR</div>
                      </div>
                      
                      {/* Accept Only Layout */}
                      <div className={"p-4 rounded-lg border-2 cursor-pointer transition-all ".concat(config.behavior.buttonLayout === 'accept-only'
            ? 'border-primary bg-primary/5'
            : 'border-border hover:border-muted-foreground/50')} onClick={function () { return setConfig(function (prev) { return (__assign(__assign({}, prev), { behavior: __assign(__assign({}, prev.behavior), { buttonLayout: 'accept-only', showRejectButton: false, showPreferences: false }) })); }); }}>
                        <div className="font-medium mb-1">Accept Only</div>
                        <div className="text-sm text-muted-foreground mb-3">Just the Accept button</div>
                        <div className="flex flex-wrap gap-1">
                          <badge_1.Badge variant="default" className="text-xs">Accept</badge_1.Badge>
                        </div>
                        <div className="mt-2 text-xs text-red-600">⚠ May not be compliant</div>
                      </div>
                    </div>
                    
                    {/* Compliance Warning */}
                    {config.compliance.framework === 'gdpr' && config.behavior.buttonLayout !== 'standard' && (<alert_1.Alert>
                        <lucide_react_1.Info className="h-4 w-4"/>
                        <alert_1.AlertDescription>
                          GDPR requires an easy way to reject cookies. Consider using "Standard" layout for full compliance.
                        </alert_1.AlertDescription>
                      </alert_1.Alert>)}
                    
                    {/* Manual Toggle Override */}
                    <div className="pt-4 border-t space-y-3">
                      <div className="text-sm font-medium text-muted-foreground">Manual Controls</div>
                      <div className="flex items-center justify-between">
                        <div>
                          <label_1.Label htmlFor="show-reject">Show Reject Button</label_1.Label>
                        </div>
                        <switch_1.Switch id="show-reject" checked={config.behavior.showRejectButton !== false} onCheckedChange={function (checked) { return setConfig(function (prev) { return (__assign(__assign({}, prev), { behavior: __assign(__assign({}, prev.behavior), { showRejectButton: checked, buttonLayout: checked ? 'standard' : (prev.behavior.showPreferences ? 'soft-consent' : 'accept-only') }) })); }); }}/>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <label_1.Label htmlFor="show-preferences">Show Customize Button</label_1.Label>
                        </div>
                        <switch_1.Switch id="show-preferences" checked={config.behavior.showPreferences} onCheckedChange={function (checked) { return setConfig(function (prev) { return (__assign(__assign({}, prev), { behavior: __assign(__assign({}, prev.behavior), { showPreferences: checked, buttonLayout: prev.behavior.showRejectButton !== false
                    ? 'standard'
                    : (checked ? 'soft-consent' : 'accept-only') }) })); }); }}/>
                      </div>
                    </div>
                  </card_1.CardContent>
                </card_1.Card>

                {/* Browser Privacy Signals (GPC) */}
                <card_1.Card className="border-l-4 border-l-blue-500">
                  <card_1.CardHeader>
                    <card_1.CardTitle className="flex items-center gap-2">
                      <lucide_react_1.Shield className="h-5 w-5"/>
                      Browser Privacy Signals
                    </card_1.CardTitle>
                    <card_1.CardDescription>
                      Respect Global Privacy Control (GPC) — a browser signal that tells websites not to sell or share personal data.
                    </card_1.CardDescription>
                  </card_1.CardHeader>
                  <card_1.CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Auto-detect (free, default) */}
                      <div className={"p-4 rounded-lg border-2 cursor-pointer transition-all ".concat((((_c = config.behavior.gpc) === null || _c === void 0 ? void 0 : _c.mode) || 'auto') === 'auto'
            ? 'border-primary bg-primary/5'
            : 'border-border hover:border-muted-foreground/50')} onClick={function () { return setConfig(function (prev) { return (__assign(__assign({}, prev), { behavior: __assign(__assign({}, prev.behavior), { gpc: { enabled: true, mode: 'auto' } }) })); }); }}>
                        <div className="font-medium mb-1">Auto-detect</div>
                        <div className="text-sm text-muted-foreground mb-2">
                          Automatically detect and respect GPC signals. Marketing cookies are blocked when GPC is active.
                        </div>
                        <badge_1.Badge variant="secondary" className="text-xs">Free</badge_1.Badge>
                        <div className="mt-2 text-xs text-green-600">Recommended — CCPA compliant</div>
                      </div>

                      {/* Disabled (Pro only) */}
                      <div className={"p-4 rounded-lg border-2 transition-all ".concat((((_d = config.behavior.gpc) === null || _d === void 0 ? void 0 : _d.mode) || 'auto') === 'off'
            ? 'border-primary bg-primary/5'
            : 'border-border hover:border-muted-foreground/50', " ").concat(((_e = session === null || session === void 0 ? void 0 : session.user) === null || _e === void 0 ? void 0 : _e.planTier) === 'free' ? 'opacity-60' : 'cursor-pointer')} onClick={function () {
            var _a;
            if (((_a = session === null || session === void 0 ? void 0 : session.user) === null || _a === void 0 ? void 0 : _a.planTier) === 'free')
                return;
            setConfig(function (prev) { return (__assign(__assign({}, prev), { behavior: __assign(__assign({}, prev.behavior), { gpc: { enabled: false, mode: 'off' } }) })); });
        }}>
                        <div className="font-medium mb-1">Disabled</div>
                        <div className="text-sm text-muted-foreground mb-2">
                          Ignore GPC browser signals. Not recommended — may violate CCPA requirements.
                        </div>
                        <badge_1.Badge variant="outline" className="text-xs">Pro</badge_1.Badge>
                        {((_f = session === null || session === void 0 ? void 0 : session.user) === null || _f === void 0 ? void 0 : _f.planTier) === 'free' && (<div className="mt-3">
                            <upgrade_prompt_1.UpgradePrompt feature="GPC Configuration" description="Configure GPC behavior. Auto-detect is free and recommended for compliance."/>
                          </div>)}
                      </div>
                    </div>

                    <alert_1.Alert>
                      <lucide_react_1.Info className="h-4 w-4"/>
                      <alert_1.AlertDescription className="text-sm">
                        When GPC is detected, visitors see a slim acknowledgment bar confirming their privacy signal is respected. Marketing/targeting cookie toggles are locked off in the preferences modal. Visitors can still manually override if they choose.
                      </alert_1.AlertDescription>
                    </alert_1.Alert>
                  </card_1.CardContent>
                </card_1.Card>

                {/* Framework Comparison */}
                <card_1.Card>
                  <card_1.CardHeader>
                    <card_1.CardTitle>Framework Comparison</card_1.CardTitle>
                    <card_1.CardDescription>
                      Quick comparison of key differences between compliance frameworks
                    </card_1.CardDescription>
                  </card_1.CardHeader>
                  <card_1.CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2">Requirement</th>
                            <th className="text-center py-2">PIPEDA</th>
                            <th className="text-center py-2">GDPR</th>
                            <th className="text-center py-2">CCPA</th>
                            <th className="text-center py-2">Custom</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="py-2">Consent Type</td>
                            <td className="text-center py-2">
                              <badge_1.Badge variant="outline" className="text-xs">Opt-out</badge_1.Badge>
                            </td>
                            <td className="text-center py-2">
                              <badge_1.Badge variant="outline" className="text-xs">Opt-in</badge_1.Badge>
                            </td>
                            <td className="text-center py-2">
                              <badge_1.Badge variant="outline" className="text-xs">Opt-out</badge_1.Badge>
                            </td>
                            <td className="text-center py-2">
                              <badge_1.Badge variant="outline" className="text-xs">Opt-in</badge_1.Badge>
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2">Granular Controls</td>
                            <td className="text-center py-2">
                              <badge_1.Badge variant="secondary" className="text-xs">Optional</badge_1.Badge>
                            </td>
                            <td className="text-center py-2">
                              <badge_1.Badge variant="default" className="text-xs">Required</badge_1.Badge>
                            </td>
                            <td className="text-center py-2">
                              <badge_1.Badge variant="default" className="text-xs">Required</badge_1.Badge>
                            </td>
                            <td className="text-center py-2">
                              <badge_1.Badge variant="default" className="text-xs">Required</badge_1.Badge>
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="py-2">Max Penalty</td>
                            <td className="text-center py-2 text-xs">Reputation</td>
                            <td className="text-center py-2 text-xs">€20M</td>
                            <td className="text-center py-2 text-xs">$7,500</td>
                            <td className="text-center py-2 text-xs">Varies</td>
                          </tr>
                          <tr>
                            <td className="py-2">Consent Expiry</td>
                            <td className="text-center py-2 text-xs">24 months</td>
                            <td className="text-center py-2 text-xs">12 months</td>
                            <td className="text-center py-2 text-xs">12 months</td>
                            <td className="text-center py-2 text-xs">12 months</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </card_1.CardContent>
                </card_1.Card>
              </tabs_1.TabsContent>

              {/* Brand Tab */}
              <tabs_1.TabsContent value="brand" className="space-y-6" id="brand-panel" role="tabpanel" aria-labelledby="brand-tab">

                  {/* Brand Import */}
                  <card_1.Card className="border-l-4 border-l-amber-500">
                    <card_1.CardHeader>
                      <card_1.CardTitle>Brand Import</card_1.CardTitle>
                    </card_1.CardHeader>
                    <card_1.CardContent className="space-y-6">
                      <div className="space-y-3">
                        <label_1.Label htmlFor="brand-import" className="text-sm font-medium">Import from Website</label_1.Label>
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                          <input_1.Input id="brand-import" placeholder="https://example.com" value={brandImportUrl} onChange={function (e) { return setBrandImportUrl(e.target.value); }} className="flex-1" inputMode="url" autoCapitalize="none" autoCorrect="off"/>
                          <button_1.Button onClick={handleBrandImport} disabled={isDiscoveringBrand}>
                            {isDiscoveringBrand ? 'Importing...' : 'Import Brand'}
                          </button_1.Button>
                        </div>
                        {brandDiscoveryError && (<p className="text-sm text-red-500">{brandDiscoveryError}</p>)}
                      </div>

                      {brandDiscovery && (<div className="space-y-4 rounded-lg border bg-muted/40 p-4">
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-green-500"/>
                            <p className="text-sm font-medium">Colors imported from {brandDiscovery.url}</p>
                          </div>

                          {brandDiscovery.warnings.length > 0 && (<ul className="space-y-1 text-xs text-amber-600">
                              {brandDiscovery.warnings.map(function (warning, index) { return (<li key={index}>Warning: {warning}</li>); })}
                            </ul>)}

                          {(function () {
                var fonts = brandDiscovery.fonts;
                return fonts && fonts.length > 0 && (<div className="space-y-2">
                                <p className="text-sm font-semibold">Detected fonts</p>
                                <div className="flex flex-wrap gap-2">
                                  {fonts.map(function (font, index) { return (<button_1.Button key={index} size="sm" variant="outline" onClick={function () {
                            updateConfig('fontFamily', font.family);
                            react_hot_toast_1.toast.success("Applied font: ".concat(font.family));
                        }} className="text-xs">
                                    <span style={{ fontFamily: font.family }}>{font.family}</span>
                                  </button_1.Button>); })}
                              </div>
                            </div>);
            })()}

                          {brandDiscovery.logo && (<div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={brandDiscovery.logo.url} alt="Detected brand logo" className="h-16 w-16 rounded border bg-muted object-contain p-2"/>
                              <div className="flex-1 space-y-1">
                                <p className="text-sm font-medium">Detected logo</p>
                                <p className="text-xs text-muted-foreground">Source: {brandDiscovery.logo.source}</p>
                                <div className="flex gap-2">
                                  <button_1.Button size="sm" onClick={function () { return applyBrandLogo(brandDiscovery.logo); }}>Use Logo</button_1.Button>
                                  <button_1.Button size="sm" variant="outline" asChild>
                                    <a href={brandDiscovery.logo.url} target="_blank" rel="noopener noreferrer">Open logo</a>
                                  </button_1.Button>
                                </div>
                              </div>
                            </div>)}
                        </div>)}
                    </card_1.CardContent>
                  </card_1.Card>

                  {/* Theme & Colors */}
                  <card_1.Card>
                    <card_1.CardHeader>
                      <card_1.CardTitle>Theme & Colors</card_1.CardTitle>
                    </card_1.CardHeader>
                    <card_1.CardContent className="space-y-6">
                      <div>
                        <label_1.Label htmlFor="theme" className="text-sm font-medium">Theme</label_1.Label>
                        <select_1.Select value={config.theme} onValueChange={handleThemeChange}>
                          <select_1.SelectTrigger className="mt-1">
                            <select_1.SelectValue />
                          </select_1.SelectTrigger>
                          <select_1.SelectContent>
                            <select_1.SelectItem value="light">Light</select_1.SelectItem>
                            <select_1.SelectItem value="dark">Dark</select_1.SelectItem>
                            <select_1.SelectItem value="custom">Custom</select_1.SelectItem>
                          </select_1.SelectContent>
                        </select_1.Select>
                      </div>

                      {/* Palette Presets */}
                      <div className="space-y-2">
                        <label_1.Label className="text-sm font-medium">Palette Presets</label_1.Label>
                        <div className="flex flex-wrap gap-2">
                          {color_presets_1.COLOR_PRESETS.map(function (preset) { return (<button key={preset.name} type="button" title={preset.name} className="group relative flex flex-col w-10 h-12 rounded-md overflow-hidden border-2 border-transparent hover:border-primary transition-colors cursor-pointer" onClick={function () {
                applyColorUpdates(preset.colors);
                updateConfig('theme', 'custom');
                react_hot_toast_1.toast.success("Applied \"".concat(preset.name, "\" palette"));
            }}>
                              <div className="flex-1" style={{ backgroundColor: preset.colors.background }}/>
                              <div className="flex-1" style={{ backgroundColor: preset.colors.button }}/>
                              <div className="flex-1" style={{ backgroundColor: preset.colors.text }}/>
                              <span className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors">
                              </span>
                            </button>); })}
                        </div>
                      </div>

                      {/* Brand Colors (shown after import) */}
                      {brandDiscovery && brandDiscovery.colors.length > 0 && (<div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <label_1.Label className="text-sm font-medium">Brand Colors</label_1.Label>
                            <button_1.Button size="sm" variant="ghost" className="text-xs h-6" onClick={applyBrandPalette}>Reset to suggested</button_1.Button>
                          </div>
                          <p className="text-xs text-muted-foreground">Pick a color from your brand, then click any color field below to fine-tune.</p>
                          <div className="space-y-2">
                            {([
                { role: 'background', label: 'Background' },
                { role: 'text', label: 'Text' },
                { role: 'button', label: 'Accept Button' },
                { role: 'buttonText', label: 'Button Text' },
                { role: 'link', label: 'Preferences Link' },
            ]).map(function (_a) {
                var role = _a.role, label = _a.label;
                return (<div key={role} className="flex items-center gap-3">
                                <span className="text-xs w-28 text-muted-foreground">{label}</span>
                                <div className="flex gap-1">
                                  {brandDiscovery.colors.slice(0, 8).map(function (color) { return (<button key={color.hex} onClick={function () { return applyColorRole(role, color.hex); }} className={"h-6 w-6 rounded border-2 transition-all hover:scale-110 ".concat(config.colors[role] === color.hex ? 'border-primary ring-1 ring-primary' : 'border-transparent hover:border-muted-foreground/40')} style={{ backgroundColor: color.hex }} title={"".concat(color.hex, " \u2192 ").concat(label)}/>); })}
                                </div>
                                <div className="flex items-center gap-1 text-xs font-mono text-muted-foreground">
                                  <div className="h-3 w-3 rounded-sm border" style={{ backgroundColor: config.colors[role] }}/>
                                  {config.colors[role]}
                                </div>
                              </div>);
            })}
                          </div>
                        </div>)}

                      {/* Color Pickers with Contrast Badges */}
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <label_1.Label className="text-sm font-medium">Background</label_1.Label>
                            </div>
                            <color_picker_1.ColorPicker value={config.colors.background} onChange={function (color) { return updateConfig('colors', { background: color }); }}/>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <label_1.Label className="text-sm font-medium">Text</label_1.Label>
                              <contrast_badge_1.ContrastBadge foreground={config.colors.text} background={config.colors.background}/>
                            </div>
                            <color_picker_1.ColorPicker value={config.colors.text} onChange={function (color) { return updateConfig('colors', { text: color }); }}/>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <label_1.Label className="text-sm font-medium">Button</label_1.Label>
                            </div>
                            <color_picker_1.ColorPicker value={config.colors.button} onChange={function (color) { return updateConfig('colors', { button: color }); }}/>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <label_1.Label className="text-sm font-medium">Button Text</label_1.Label>
                              <contrast_badge_1.ContrastBadge foreground={config.colors.buttonText} background={config.colors.button}/>
                            </div>
                            <color_picker_1.ColorPicker value={config.colors.buttonText} onChange={function (color) { return updateConfig('colors', { buttonText: color }); }}/>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <label_1.Label className="text-sm font-medium">Link</label_1.Label>
                            <contrast_badge_1.ContrastBadge foreground={config.colors.link} background={config.colors.background}/>
                          </div>
                          <color_picker_1.ColorPicker value={config.colors.link} onChange={function (color) { return updateConfig('colors', { link: color }); }}/>
                        </div>

                        {/* Reject Button Colors */}
                        {config.behavior.showRejectButton !== false && (<div className="space-y-3 pt-3 border-t">
                            <label_1.Label className="text-sm font-medium">Reject Button Colors</label_1.Label>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label_1.Label className="text-xs">Reject Button Background</label_1.Label>
                                <color_picker_1.ColorPicker value={config.colors.rejectButton || 'transparent'} onChange={function (color) { return updateConfig('colors', { rejectButton: color }); }}/>
                              </div>
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <label_1.Label className="text-xs">Reject Button Text</label_1.Label>
                                  <contrast_badge_1.ContrastBadge foreground={config.colors.rejectButtonText || config.colors.text} background={config.colors.rejectButton && config.colors.rejectButton !== 'transparent' ? config.colors.rejectButton : config.colors.background}/>
                                </div>
                                <color_picker_1.ColorPicker value={config.colors.rejectButtonText || config.colors.text} onChange={function (color) { return updateConfig('colors', { rejectButtonText: color }); }}/>
                              </div>
                            </div>
                          </div>)}
                      </div>

                      {/* Floating Button Custom Colors */}
                      {((_j = (_h = (_g = config.branding) === null || _g === void 0 ? void 0 : _g.footerLink) === null || _h === void 0 ? void 0 : _h.floatingStyle) === null || _j === void 0 ? void 0 : _j.useCustomColors) && (<div className="space-y-3 pt-3 border-t">
                          <label_1.Label className="text-sm font-medium">Floating Button Colors</label_1.Label>
                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <label_1.Label className="text-xs">Background</label_1.Label>
                              <color_picker_1.ColorPicker value={((_o = (_m = (_l = (_k = config.branding) === null || _k === void 0 ? void 0 : _k.footerLink) === null || _l === void 0 ? void 0 : _l.floatingStyle) === null || _m === void 0 ? void 0 : _m.customColors) === null || _o === void 0 ? void 0 : _o.background) || '#6b7280'} onChange={function (color) {
                var _a, _b, _c, _d, _e, _f;
                return updateConfig('branding', {
                    footerLink: __assign(__assign({}, (((_a = config.branding) === null || _a === void 0 ? void 0 : _a.footerLink) || {})), { floatingStyle: __assign(__assign({}, (((_c = (_b = config.branding) === null || _b === void 0 ? void 0 : _b.footerLink) === null || _c === void 0 ? void 0 : _c.floatingStyle) || {})), { customColors: __assign(__assign({}, (((_f = (_e = (_d = config.branding) === null || _d === void 0 ? void 0 : _d.footerLink) === null || _e === void 0 ? void 0 : _e.floatingStyle) === null || _f === void 0 ? void 0 : _f.customColors) || {})), { background: color }) }) })
                });
            }}/>
                            </div>
                            <div>
                              <label_1.Label className="text-xs">Text</label_1.Label>
                              <color_picker_1.ColorPicker value={((_s = (_r = (_q = (_p = config.branding) === null || _p === void 0 ? void 0 : _p.footerLink) === null || _q === void 0 ? void 0 : _q.floatingStyle) === null || _r === void 0 ? void 0 : _r.customColors) === null || _s === void 0 ? void 0 : _s.text) || '#ffffff'} onChange={function (color) {
                var _a, _b, _c, _d, _e, _f;
                return updateConfig('branding', {
                    footerLink: __assign(__assign({}, (((_a = config.branding) === null || _a === void 0 ? void 0 : _a.footerLink) || {})), { floatingStyle: __assign(__assign({}, (((_c = (_b = config.branding) === null || _b === void 0 ? void 0 : _b.footerLink) === null || _c === void 0 ? void 0 : _c.floatingStyle) || {})), { customColors: __assign(__assign({}, (((_f = (_e = (_d = config.branding) === null || _d === void 0 ? void 0 : _d.footerLink) === null || _e === void 0 ? void 0 : _e.floatingStyle) === null || _f === void 0 ? void 0 : _f.customColors) || {})), { text: color }) }) })
                });
            }}/>
                            </div>
                            <div>
                              <label_1.Label className="text-xs">Border</label_1.Label>
                              <color_picker_1.ColorPicker value={((_w = (_v = (_u = (_t = config.branding) === null || _t === void 0 ? void 0 : _t.footerLink) === null || _u === void 0 ? void 0 : _u.floatingStyle) === null || _v === void 0 ? void 0 : _v.customColors) === null || _w === void 0 ? void 0 : _w.border) || '#6b7280'} onChange={function (color) {
                var _a, _b, _c, _d, _e, _f;
                return updateConfig('branding', {
                    footerLink: __assign(__assign({}, (((_a = config.branding) === null || _a === void 0 ? void 0 : _a.footerLink) || {})), { floatingStyle: __assign(__assign({}, (((_c = (_b = config.branding) === null || _b === void 0 ? void 0 : _b.footerLink) === null || _c === void 0 ? void 0 : _c.floatingStyle) || {})), { customColors: __assign(__assign({}, (((_f = (_e = (_d = config.branding) === null || _d === void 0 ? void 0 : _d.footerLink) === null || _e === void 0 ? void 0 : _e.floatingStyle) === null || _f === void 0 ? void 0 : _f.customColors) || {})), { border: color }) }) })
                });
            }}/>
                            </div>
                          </div>
                        </div>)}
                    </card_1.CardContent>
                  </card_1.Card>

                  {/* Typography */}
                  <card_1.Card>
                    <card_1.CardHeader>
                      <card_1.CardTitle>Typography</card_1.CardTitle>
                    </card_1.CardHeader>
                    <card_1.CardContent className="space-y-4">
                      <div className="rounded-lg border border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/40 px-4 py-3">
                        <p className="text-sm font-medium text-green-900 dark:text-green-300">Your banner inherits fonts from your website</p>
                        <p className="text-xs text-green-800 dark:text-green-400 mt-1">No fonts are loaded from Google or any third-party server — fully GDPR compliant by default.</p>
                      </div>
                      <div>
                        <label_1.Label htmlFor="font-family" className="text-sm font-medium">Fallback Font</label_1.Label>
                        <select_1.Select value={config.fontFamily || 'inherit'} onValueChange={function (value) { return updateConfig('fontFamily', value === 'inherit' ? '' : value); }}>
                          <select_1.SelectTrigger className="mt-1">
                            <select_1.SelectValue placeholder="Inherit from website (recommended)"/>
                          </select_1.SelectTrigger>
                          <select_1.SelectContent>
                            <select_1.SelectItem value="inherit">Inherit from website (recommended)</select_1.SelectItem>
                            {font_presets_1.FONT_PRESETS.filter(function (f) { return f.value; }).map(function (font) { return (<select_1.SelectItem key={font.value} value={font.value}>
                                {font.name}
                              </select_1.SelectItem>); })}
                          </select_1.SelectContent>
                        </select_1.Select>
                        <p className="text-xs text-muted-foreground mt-1">
                          {config.fontFamily
            ? "Fallback: \"".concat(config.fontFamily, "\" \u2014 used only if your site's font fails to load.")
            : 'Only change this if your website font fails to load on the banner.'}
                        </p>
                      </div>
                    </card_1.CardContent>
                  </card_1.Card>

                  {/* Logo */}
                  <card_1.Card>
                    <card_1.CardHeader>
                      <card_1.CardTitle>Logo</card_1.CardTitle>
                    </card_1.CardHeader>
                    <card_1.CardContent className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <switch_1.Switch id="logo-enabled-brand" checked={config.branding.logo.enabled} onCheckedChange={function (checked) { return updateConfig('branding', {
            logo: __assign(__assign({}, config.branding.logo), { enabled: checked })
        }); }}/>
                        <label_1.Label htmlFor="logo-enabled-brand">Enable Logo</label_1.Label>
                      </div>

                      {config.branding.logo.enabled && (<div className="space-y-4">
                          {/* Drag and drop zone */}
                          <div>
                            <label_1.Label className="text-sm font-medium">Upload Logo</label_1.Label>
                            <div className={"mt-2 relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ".concat(config.branding.logo.url
                ? 'border-primary/30 bg-primary/5'
                : 'border-muted-foreground/25 hover:border-primary/50')} onDragOver={function (e) {
                e.preventDefault();
                e.stopPropagation();
                e.currentTarget.classList.add('border-primary', 'bg-primary/10');
            }} onDragLeave={function (e) {
                e.preventDefault();
                e.stopPropagation();
                e.currentTarget.classList.remove('border-primary', 'bg-primary/10');
            }} onDrop={function (e) { return __awaiter(_this, void 0, void 0, function () {
                var file, formData, res, data, err_1;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            e.preventDefault();
                            e.stopPropagation();
                            e.currentTarget.classList.remove('border-primary', 'bg-primary/10');
                            file = (_a = e.dataTransfer.files) === null || _a === void 0 ? void 0 : _a[0];
                            if (!file || !file.type.startsWith('image/'))
                                return [2 /*return*/];
                            formData = new FormData();
                            formData.append('file', file);
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 4, , 5]);
                            return [4 /*yield*/, fetch('/api/upload/logo', { method: 'POST', body: formData })];
                        case 2:
                            res = _b.sent();
                            return [4 /*yield*/, res.json()];
                        case 3:
                            data = _b.sent();
                            if (data.url) {
                                updateConfig('branding', { logo: __assign(__assign({}, config.branding.logo), { url: data.url }) });
                                react_hot_toast_1.toast.success('Logo uploaded');
                            }
                            else {
                                react_hot_toast_1.toast.error(data.error || 'Upload failed');
                            }
                            return [3 /*break*/, 5];
                        case 4:
                            err_1 = _b.sent();
                            react_hot_toast_1.toast.error('Upload failed');
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/];
                    }
                });
            }); }}>
                              {config.branding.logo.url ? (<div className="flex flex-col items-center gap-3">
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img src={config.branding.logo.url} alt="Logo preview" className="max-w-32 max-h-16 object-contain" onError={function (e) { e.currentTarget.style.display = 'none'; }}/>
                                  <button_1.Button variant="ghost" size="sm" onClick={function (e) {
                    e.stopPropagation();
                    updateConfig('branding', { logo: __assign(__assign({}, config.branding.logo), { url: '' }) });
                }}>
                                    <lucide_react_1.X className="h-4 w-4 mr-1"/>
                                    Remove
                                  </button_1.Button>
                                </div>) : (<label className="cursor-pointer flex flex-col items-center gap-2">
                                  <lucide_react_1.Upload className="h-8 w-8 text-muted-foreground"/>
                                  <span className="text-sm text-muted-foreground">Drag & drop your logo, or click to browse</span>
                                  <input type="file" accept="image/*" className="hidden" onChange={function (e) { return __awaiter(_this, void 0, void 0, function () {
                    var file, formData, res, data, err_2;
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
                                if (!file)
                                    return [2 /*return*/];
                                formData = new FormData();
                                formData.append('file', file);
                                _b.label = 1;
                            case 1:
                                _b.trys.push([1, 4, , 5]);
                                return [4 /*yield*/, fetch('/api/upload/logo', { method: 'POST', body: formData })];
                            case 2:
                                res = _b.sent();
                                return [4 /*yield*/, res.json()];
                            case 3:
                                data = _b.sent();
                                if (data.url) {
                                    updateConfig('branding', { logo: __assign(__assign({}, config.branding.logo), { url: data.url }) });
                                    react_hot_toast_1.toast.success('Logo uploaded');
                                }
                                else {
                                    react_hot_toast_1.toast.error(data.error || 'Upload failed');
                                }
                                return [3 /*break*/, 5];
                            case 4:
                                err_2 = _b.sent();
                                react_hot_toast_1.toast.error('Upload failed');
                                return [3 /*break*/, 5];
                            case 5: return [2 /*return*/];
                        }
                    });
                }); }}/>
                                </label>)}
                            </div>
                          </div>

                          <div>
                            <label_1.Label htmlFor="logo-url-brand">Or Logo URL</label_1.Label>
                            <input_1.Input id="logo-url-brand" value={config.branding.logo.url} onChange={function (e) { return updateConfig('branding', {
                logo: __assign(__assign({}, config.branding.logo), { url: e.target.value })
            }); }} placeholder="https://example.com/logo.png"/>
                          </div>

                          <div>
                            <label_1.Label htmlFor="logo-position-brand">Logo Position</label_1.Label>
                            <select_1.Select value={config.branding.logo.position} onValueChange={function (value) { return updateConfig('branding', {
                logo: __assign(__assign({}, config.branding.logo), { position: value })
            }); }}>
                              <select_1.SelectTrigger>
                                <select_1.SelectValue />
                              </select_1.SelectTrigger>
                              <select_1.SelectContent>
                                <select_1.SelectItem value="left">Left</select_1.SelectItem>
                                <select_1.SelectItem value="right">Right</select_1.SelectItem>
                                <select_1.SelectItem value="center">Center</select_1.SelectItem>
                                <select_1.SelectItem value="hidden">Hidden</select_1.SelectItem>
                              </select_1.SelectContent>
                            </select_1.Select>
                          </div>
                        </div>)}
                    </card_1.CardContent>
                  </card_1.Card>

              </tabs_1.TabsContent>

              {/* Design/Layout Tab */}
              <tabs_1.TabsContent value="design" className="space-y-6" id="design-panel" role="tabpanel" aria-labelledby="design-tab">

                {/* Layout Settings */}
                  <card_1.Card className="border-l-4 border-l-blue-500">
                    <card_1.CardHeader>
                      <card_1.CardTitle>Layout & Spacing</card_1.CardTitle>
                    </card_1.CardHeader>
                    <card_1.CardContent className="space-y-6">
                      {/* Position Settings */}
                      <div className="space-y-3">
                        <label_1.Label htmlFor="position" className="text-sm font-medium">Position</label_1.Label>
                        <select_1.Select value={config.position} onValueChange={function (value) { return updateConfig('position', value); }}>
                          <select_1.SelectTrigger>
                            <select_1.SelectValue />
                          </select_1.SelectTrigger>
                          <select_1.SelectContent>
                            {/* Standard layouts (Free) */}
                            <select_1.SelectItem value="top">Top Bar (Full Width)</select_1.SelectItem>
                            <select_1.SelectItem value="bottom">Bottom Bar (Full Width)</select_1.SelectItem>
                            <select_1.SelectItem value="floating-bottom-right">Floating - Bottom Right</select_1.SelectItem>
                            <select_1.SelectItem value="floating-bottom-left">Floating - Bottom Left</select_1.SelectItem>
                            <select_1.SelectItem value="floating-top-right">Floating - Top Right</select_1.SelectItem>
                            <select_1.SelectItem value="floating-top-left">Floating - Top Left</select_1.SelectItem>
                            
                            {/* Pro layouts */}
                            {(0, plan_restrictions_1.canAccessFeature)(userPlan, 'hasCustomLayouts') ? (<>
                                <select_1.SelectItem value="modal-center">Modal - Center</select_1.SelectItem>
                                <select_1.SelectItem value="modal-bottom">Modal - Bottom</select_1.SelectItem>
                                <select_1.SelectItem value="modal-top">Modal - Top</select_1.SelectItem>
                                <select_1.SelectItem value="slide-in-right">Slide In - Right</select_1.SelectItem>
                                <select_1.SelectItem value="slide-in-left">Slide In - Left</select_1.SelectItem>
                                <select_1.SelectItem value="slide-in-top">Slide In - Top</select_1.SelectItem>
                                <select_1.SelectItem value="slide-in-bottom">Slide In - Bottom</select_1.SelectItem>
                              </>) : (<>
                                <select_1.SelectItem value="modal-center" disabled>Modal - Center (Pro)</select_1.SelectItem>
                                <select_1.SelectItem value="modal-bottom" disabled>Modal - Bottom (Pro)</select_1.SelectItem>
                                <select_1.SelectItem value="modal-top" disabled>Modal - Top (Pro)</select_1.SelectItem>
                                <select_1.SelectItem value="slide-in-right" disabled>Slide In - Right (Pro)</select_1.SelectItem>
                                <select_1.SelectItem value="slide-in-left" disabled>Slide In - Left (Pro)</select_1.SelectItem>
                                <select_1.SelectItem value="slide-in-top" disabled>Slide In - Top (Pro)</select_1.SelectItem>
                                <select_1.SelectItem value="slide-in-bottom" disabled>Slide In - Bottom (Pro)</select_1.SelectItem>
                              </>)}
                          </select_1.SelectContent>
                        </select_1.Select>
                        {!(0, plan_restrictions_1.canAccessFeature)(userPlan, 'hasCustomLayouts') && (<upgrade_prompt_1.UpgradePrompt feature="Custom Layouts" description="Modal, slide-in, and other advanced layouts" variant="inline"/>)}
                      </div>

                      {/* Width Settings */}
                      <div className="space-y-3">
                        <label_1.Label htmlFor="width" className="text-sm font-medium">Width</label_1.Label>
                      <div className="grid grid-cols-2 gap-4">
                        <select_1.Select value={config.layout.width} onValueChange={function (value) { return updateConfig('layout', __assign(__assign({}, config.layout), { width: value })); }}>
                          <select_1.SelectTrigger>
                            <select_1.SelectValue />
                          </select_1.SelectTrigger>
                          <select_1.SelectContent>
                            <select_1.SelectItem value="full">Full Width</select_1.SelectItem>
                            <select_1.SelectItem value="container">Container Width</select_1.SelectItem>
                            <select_1.SelectItem value="custom">Custom Width</select_1.SelectItem>
                          </select_1.SelectContent>
                        </select_1.Select>
                        
                        {config.layout.width === 'custom' && (<div>
                            <input_1.Input id="custom-width" type="number" value={config.layout.customWidth || 400} onChange={function (e) { return updateConfig('layout', __assign(__assign({}, config.layout), { customWidth: parseInt(e.target.value) || 400 })); }} placeholder="400"/>
                          </div>)}
                      </div>
                    </div>

                    {/* Spacing Settings */}
                    <div className="space-y-5">
                      <label_1.Label className="text-sm font-medium">Spacing & Effects</label_1.Label>

                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <label_1.Label htmlFor="border-radius" className="text-xs">Border Radius</label_1.Label>
                            <span className="text-xs text-muted-foreground font-mono">{config.layout.borderRadius}px</span>
                          </div>
                          <slider_1.Slider id="border-radius" min={0} max={32} step={1} value={[config.layout.borderRadius]} onValueChange={function (_a) {
        var value = _a[0];
        return updateConfig('layout', __assign(__assign({}, config.layout), { borderRadius: value }));
    }}/>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <label_1.Label htmlFor="padding" className="text-xs">Padding</label_1.Label>
                            <span className="text-xs text-muted-foreground font-mono">{config.layout.padding}px</span>
                          </div>
                          <slider_1.Slider id="padding" min={0} max={48} step={1} value={[config.layout.padding]} onValueChange={function (_a) {
        var value = _a[0];
        return updateConfig('layout', __assign(__assign({}, config.layout), { padding: value }));
    }}/>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <label_1.Label htmlFor="margin" className="text-xs">Margin</label_1.Label>
                            <span className="text-xs text-muted-foreground font-mono">{config.layout.margin}px</span>
                          </div>
                          <slider_1.Slider id="margin" min={0} max={48} step={1} value={[config.layout.margin]} onValueChange={function (_a) {
        var value = _a[0];
        return updateConfig('layout', __assign(__assign({}, config.layout), { margin: value }));
    }}/>
                        </div>
                      </div>

                      <div>
                        <label_1.Label htmlFor="shadow" className="text-xs">Shadow</label_1.Label>
                        <select_1.Select value={config.layout.shadow} onValueChange={function (value) { return updateConfig('layout', __assign(__assign({}, config.layout), { shadow: value })); }}>
                          <select_1.SelectTrigger className="mt-1">
                            <select_1.SelectValue />
                          </select_1.SelectTrigger>
                          <select_1.SelectContent>
                            <select_1.SelectItem value="none">None</select_1.SelectItem>
                            <select_1.SelectItem value="small">Small</select_1.SelectItem>
                            <select_1.SelectItem value="medium">Medium</select_1.SelectItem>
                            <select_1.SelectItem value="large">Large</select_1.SelectItem>
                          </select_1.SelectContent>
                        </select_1.Select>
                      </div>
                    </div>

                    {/* Animation */}
                    <div className="space-y-3">
                      <label_1.Label htmlFor="animation" className="text-sm font-medium">Animation</label_1.Label>
                      <select_1.Select value={config.layout.animation} onValueChange={function (value) { return updateConfig('layout', __assign(__assign({}, config.layout), { animation: value })); }}>
                        <select_1.SelectTrigger>
                          <select_1.SelectValue />
                        </select_1.SelectTrigger>
                        <select_1.SelectContent>
                          <select_1.SelectItem value="none">None</select_1.SelectItem>
                          <select_1.SelectItem value="fade">Fade In</select_1.SelectItem>
                          <select_1.SelectItem value="slide">Slide In</select_1.SelectItem>
                          <select_1.SelectItem value="bounce">Bounce</select_1.SelectItem>
                          <select_1.SelectItem value="pulse">Pulse</select_1.SelectItem>
                        </select_1.SelectContent>
                      </select_1.Select>
                    </div>
                  </card_1.CardContent>
                </card_1.Card>

              </tabs_1.TabsContent>

              {/* Language Tab */}
              <tabs_1.TabsContent value="language" className="space-y-6" id="language-panel" role="tabpanel" aria-labelledby="language-tab">
                <card_1.Card className="border-l-4 border-l-purple-500">
                  <card_1.CardHeader>
                    <card_1.CardTitle>Banner Language</card_1.CardTitle>
                    <card_1.CardDescription>
                      Your banner auto-translates into 16 languages. Buttons, text, cookie categories — everything switches to the visitor&apos;s language.
                    </card_1.CardDescription>
                  </card_1.CardHeader>
                  <card_1.CardContent className="space-y-4">
                    <div>
                      <label_1.Label htmlFor="language">Language Mode</label_1.Label>
                      <select_1.Select value={config.language} onValueChange={handleLanguageChange}>
                        <select_1.SelectTrigger>
                          <select_1.SelectValue />
                        </select_1.SelectTrigger>
                        <select_1.SelectContent>
                          <select_1.SelectItem value="auto">Auto-detect (Recommended)</select_1.SelectItem>
                          <select_1.SelectItem value="en">English</select_1.SelectItem>
                          <select_1.SelectItem value="es">Español (Spanish)</select_1.SelectItem>
                          <select_1.SelectItem value="fr">Français (French)</select_1.SelectItem>
                          <select_1.SelectItem value="de">Deutsch (German)</select_1.SelectItem>
                          <select_1.SelectItem value="pt">Português (Portuguese)</select_1.SelectItem>
                          <select_1.SelectItem value="ja">日本語 (Japanese)</select_1.SelectItem>
                          <select_1.SelectItem value="zh">中文 (Chinese)</select_1.SelectItem>
                          <select_1.SelectItem value="ko">한국어 (Korean)</select_1.SelectItem>
                          <select_1.SelectItem value="ar">العربية (Arabic)</select_1.SelectItem>
                          <select_1.SelectItem value="hi">हिन्दी (Hindi)</select_1.SelectItem>
                          <select_1.SelectItem value="nl">Nederlands (Dutch)</select_1.SelectItem>
                          <select_1.SelectItem value="sv">Svenska (Swedish)</select_1.SelectItem>
                          <select_1.SelectItem value="nb">Norsk (Norwegian)</select_1.SelectItem>
                          <select_1.SelectItem value="da">Dansk (Danish)</select_1.SelectItem>
                          <select_1.SelectItem value="it">Italiano (Italian)</select_1.SelectItem>
                          <select_1.SelectItem value="fi">Suomi (Finnish)</select_1.SelectItem>
                        </select_1.SelectContent>
                      </select_1.Select>
                      <p className="text-xs text-muted-foreground mt-2">
                        {config.language === 'auto' && 'Language will be detected from the visitor\'s browser. Supports 16 languages.'}
                        {config.language === 'en' && 'Banner will always show in English.'}
                        {config.language === 'fr' && 'La banni\u00e8re sera toujours affich\u00e9e en fran\u00e7ais.'}
                        {config.language === 'es' && 'El banner siempre se mostrar\u00e1 en espa\u00f1ol.'}
                        {config.language === 'de' && 'Das Banner wird immer auf Deutsch angezeigt.'}
                        {config.language === 'pt' && 'O banner ser\u00e1 sempre exibido em portugu\u00eas.'}
                        {config.language === 'ja' && '\u30d0\u30ca\u30fc\u306f\u5e38\u306b\u65e5\u672c\u8a9e\u3067\u8868\u793a\u3055\u308c\u307e\u3059\u3002'}
                        {config.language === 'zh' && '\u6a2a\u5e45\u5c06\u59cb\u7ec8\u4ee5\u4e2d\u6587\u663e\u793a\u3002'}
                        {config.language === 'ko' && '\ubc30\ub108\uac00 \ud56d\uc0c1 \ud55c\uad6d\uc5b4\ub85c \ud45c\uc2dc\ub429\ub2c8\ub2e4.'}
                        {config.language === 'ar' && '\u0633\u064a\u062a\u0645 \u0639\u0631\u0636 \u0627\u0644\u0634\u0639\u0627\u0631 \u062f\u0627\u0626\u0645\u064b\u0627 \u0628\u0627\u0644\u0644\u063a\u0629 \u0627\u0644\u0639\u0631\u0628\u064a\u0629.'}
                        {config.language === 'hi' && '\u092c\u0948\u0928\u0930 \u0939\u092e\u0947\u0936\u093e \u0939\u093f\u0928\u094d\u0926\u0940 \u092e\u0947\u0902 \u092a\u094d\u0930\u0926\u0930\u094d\u0936\u093f\u0924 \u0939\u094b\u0917\u093e\u0964'}
                        {config.language === 'nl' && 'Het banner wordt altijd in het Nederlands weergegeven.'}
                        {config.language === 'sv' && 'Bannern visas alltid p\u00e5 svenska.'}
                        {config.language === 'nb' && 'Banneret vises alltid p\u00e5 norsk.'}
                        {config.language === 'da' && 'Banneret vises altid p\u00e5 dansk.'}
                        {config.language === 'it' && 'Il banner verr\u00e0 sempre visualizzato in italiano.'}
                        {config.language === 'fi' && 'Banneri n\u00e4ytet\u00e4\u00e4n aina suomeksi.'}
                      </p>
                    </div>

                    {/* Language preview */}
                    <div className="border border-border rounded-lg p-4 bg-muted/30">
                      <p className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wide">Translation Preview</p>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {[
            { code: 'en', label: 'English', sample: 'We use cookies' },
            { code: 'es', label: 'Español', sample: 'Usamos cookies' },
            { code: 'fr', label: 'Français', sample: 'Nous utilisons des cookies' },
            { code: 'de', label: 'Deutsch', sample: 'Wir verwenden Cookies' },
            { code: 'pt', label: 'Português', sample: 'Utilizamos cookies' },
            { code: 'ja', label: '日本語', sample: 'Cookieの使用について' },
            { code: 'zh', label: '中文', sample: '我们使用Cookie' },
            { code: 'ko', label: '한국어', sample: '쿠키를 사용합니다' },
            { code: 'ar', label: 'العربية', sample: 'نستخدم ملفات تعريف الارتباط' },
            { code: 'hi', label: '\u0939\u093f\u0928\u094d\u0926\u0940', sample: '\u0939\u092e \u0915\u0941\u0915\u0940\u091c\u093c \u0915\u093e \u0909\u092a\u092f\u094b\u0917 \u0915\u0930\u0924\u0947 \u0939\u0948\u0902' },
            { code: 'nl', label: 'Nederlands', sample: 'Wij gebruiken cookies' },
            { code: 'sv', label: 'Svenska', sample: 'Vi anv\u00e4nder cookies' },
            { code: 'nb', label: 'Norsk', sample: 'Vi bruker informasjonskapsler' },
            { code: 'da', label: 'Dansk', sample: 'Vi bruger cookies' },
            { code: 'it', label: 'Italiano', sample: 'Utilizziamo i cookie' },
            { code: 'fi', label: 'Suomi', sample: 'K\u00e4yt\u00e4mme ev\u00e4steit\u00e4' },
        ].map(function (lang) { return (<div key={lang.code} className={"p-2 rounded border transition-colors ".concat(config.language === lang.code || (config.language === 'auto')
                ? 'border-primary/50 bg-primary/5'
                : 'border-border')}>
                            <span className="font-medium">{lang.label}</span>
                            <p className="text-muted-foreground mt-0.5" dir={lang.code === 'ar' ? 'rtl' : undefined}>{lang.sample}</p>
                          </div>); })}
                      </div>
                    </div>
                  </card_1.CardContent>
                </card_1.Card>
              </tabs_1.TabsContent>

              {/* Content Tab */}
              <tabs_1.TabsContent value="content" className="space-y-6" id="content-panel" role="tabpanel" aria-labelledby="content-tab">

                <card_1.Card>
                  <card_1.CardHeader>
                    <card_1.CardTitle>Banner Text</card_1.CardTitle>
                  </card_1.CardHeader>
                  <card_1.CardContent className="space-y-6">
                    <div className="space-y-3">
                      <label_1.Label htmlFor="title" className="text-sm font-medium">Title</label_1.Label>
                      <input_1.Input id="title" value={config.text.title} onChange={function (e) { return updateConfig('text', { title: e.target.value }); }} placeholder="We use cookies" className="mt-1"/>
                    </div>
                    
                    <div className="space-y-3">
                      <label_1.Label htmlFor="message" className="text-sm font-medium">Message</label_1.Label>
                      <textarea id="message" value={config.text.message} onChange={function (e) { return updateConfig('text', { message: e.target.value }); }} placeholder="This website uses cookies to enhance your browsing experience and provide personalized content." className="w-full h-20 p-3 border rounded-md resize-none"/>
                    </div>

                    <div className="space-y-3">
                      <label_1.Label className="text-sm font-medium">Button Text</label_1.Label>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label_1.Label htmlFor="accept-text" className="text-xs">Accept Button</label_1.Label>
                          <input_1.Input id="accept-text" value={config.text.acceptButton} onChange={function (e) { return updateConfig('text', { acceptButton: e.target.value }); }} placeholder="Accept All" className="mt-1"/>
                        </div>
                        <div>
                          <label_1.Label htmlFor="reject-text" className="text-xs">Reject Button</label_1.Label>
                          <input_1.Input id="reject-text" value={config.text.rejectButton} onChange={function (e) { return updateConfig('text', { rejectButton: e.target.value }); }} placeholder="Reject" className="mt-1"/>
                        </div>
                        <div className="relative">
                          <div className="flex items-center space-x-1 mb-1">
                            <label_1.Label htmlFor="preferences-text" className="text-xs">Preferences Button</label_1.Label>
                          </div>
                          <input_1.Input id="preferences-text" value={config.text.preferencesButton} onChange={function (e) { return updateConfig('text', { preferencesButton: e.target.value }); }} placeholder="Preferences" className="mt-1 border-purple-200 focus:border-purple-400 focus:ring-purple-200"/>
                        </div>
                      </div>
                    </div>
                  </card_1.CardContent>
                </card_1.Card>

                <card_1.Card>
                  <card_1.CardHeader>
                    <card_1.CardTitle>Privacy Policy & Branding</card_1.CardTitle>
                  </card_1.CardHeader>
                  <card_1.CardContent className="space-y-4">
                    <div>
                      <label_1.Label htmlFor="privacy-url">Privacy Policy URL</label_1.Label>
                      <input_1.Input id="privacy-url" value={config.branding.privacyPolicy.url} onChange={function (e) { return updateConfig('branding', {
            privacyPolicy: __assign(__assign({}, config.branding.privacyPolicy), { url: e.target.value })
        }); }} placeholder="https://example.com/privacy-policy"/>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t">
                      <div>
                        <label_1.Label htmlFor="remove-branding">Remove &quot;Powered by&quot; branding</label_1.Label>
                        <p className="text-xs text-muted-foreground">Hide the cookie-banner.ca attribution</p>
                      </div>
                      {(0, plan_restrictions_1.canAccessFeature)(userPlan, 'hasBrandingRemoval') ? (<switch_1.Switch id="remove-branding" checked={config.branding.showPoweredBy === false} onCheckedChange={function (checked) { return updateConfig('branding', {
                showPoweredBy: !checked
            }); }}/>) : (<upgrade_prompt_1.UpgradePrompt feature="Remove Branding" description="Hide the 'Powered by cookie-banner.ca' attribution" variant="inline"/>)}
                    </div>
                  </card_1.CardContent>
                </card_1.Card>

              </tabs_1.TabsContent>

              {/* Cookie Settings Tab */}
        <tabs_1.TabsContent value="cookie-settings" className="space-y-6" id="cookie-settings-panel" role="tabpanel" aria-labelledby="cookie-settings-tab">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Configuration Panel */}
            <div className="space-y-6">
              <card_1.Card className="border-l-4 border-l-orange-500">
                <card_1.CardHeader>
                  <card_1.CardTitle>Cookie Settings Management</card_1.CardTitle>
                  <card_1.CardDescription>
                    Configure how users can manage their cookie preferences after initial consent. Choose between a floating button or inline footer link.
                  </card_1.CardDescription>
                </card_1.CardHeader>
                <card_1.CardContent className="space-y-6">
                    {(<div className="space-y-6">
                        {/* Style Selection */}
                        <div>
                          <label_1.Label htmlFor="cookie-settings-style">Display Style</label_1.Label>
                          <select_1.Select value={((_y = (_x = config.branding) === null || _x === void 0 ? void 0 : _x.footerLink) === null || _y === void 0 ? void 0 : _y.style) || 'floating'} onValueChange={function (value) {
                var _a, _b, _c, _d, _e;
                return updateConfig('branding', {
                    footerLink: __assign(__assign(__assign(__assign({}, (((_a = config.branding) === null || _a === void 0 ? void 0 : _a.footerLink) || {})), { style: value }), (value === 'floating' && !((_c = (_b = config.branding) === null || _b === void 0 ? void 0 : _b.footerLink) === null || _c === void 0 ? void 0 : _c.floatingStyle) ? {
                        floatingStyle: {
                            shape: 'pill',
                            size: 'small',
                            showText: true,
                            useCustomColors: false
                        }
                    } : {})), (value === 'inline' && !((_e = (_d = config.branding) === null || _d === void 0 ? void 0 : _d.footerLink) === null || _e === void 0 ? void 0 : _e.inlineStyle) ? {
                        inlineStyle: {
                            linkType: 'plain',
                            includeIcon: false,
                            includeLogo: false
                        }
                    } : {}))
                });
            }}>
                            <select_1.SelectTrigger>
                              <select_1.SelectValue />
                            </select_1.SelectTrigger>
                            <select_1.SelectContent>
                              <select_1.SelectItem value="floating">Floating Button (Recommended)</select_1.SelectItem>
                              <select_1.SelectItem value="inline">Inline Footer Link</select_1.SelectItem>
                              <select_1.SelectItem value="both">Both Options</select_1.SelectItem>
                            </select_1.SelectContent>
                          </select_1.Select>
                        </div>

                        {/* Floating Button Configuration */}
                        {(((_0 = (_z = config.branding) === null || _z === void 0 ? void 0 : _z.footerLink) === null || _0 === void 0 ? void 0 : _0.style) === 'floating' || ((_2 = (_1 = config.branding) === null || _1 === void 0 ? void 0 : _1.footerLink) === null || _2 === void 0 ? void 0 : _2.style) === 'both') && (<div className="space-y-4 p-4 border rounded-lg bg-muted/30">
                            <h4 className="font-medium flex items-center">
                              <lucide_react_1.Settings className="h-4 w-4 mr-2"/>
                              Floating Button Settings
                            </h4>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label_1.Label htmlFor="floating-text">Button Text</label_1.Label>
                                <input_1.Input id="floating-text" value={((_4 = (_3 = config.branding) === null || _3 === void 0 ? void 0 : _3.footerLink) === null || _4 === void 0 ? void 0 : _4.text) || 'Cookie Settings'} onChange={function (e) {
                    var _a;
                    return updateConfig('branding', {
                        footerLink: __assign(__assign({}, (((_a = config.branding) === null || _a === void 0 ? void 0 : _a.footerLink) || {})), { text: e.target.value })
                    });
                }} placeholder="Cookie Settings"/>
                              </div>
                              
                              <div>
                                <label_1.Label htmlFor="floating-position">Position</label_1.Label>
                                <select_1.Select value={((_6 = (_5 = config.branding) === null || _5 === void 0 ? void 0 : _5.footerLink) === null || _6 === void 0 ? void 0 : _6.floatingPosition) || 'bottom-left'} onValueChange={function (value) {
                    var _a;
                    return updateConfig('branding', {
                        footerLink: __assign(__assign({}, (((_a = config.branding) === null || _a === void 0 ? void 0 : _a.footerLink) || {})), { floatingPosition: value })
                    });
                }}>
                                  <select_1.SelectTrigger>
                                    <select_1.SelectValue />
                                  </select_1.SelectTrigger>
                                  <select_1.SelectContent>
                                    <select_1.SelectItem value="bottom-left">Bottom Left</select_1.SelectItem>
                                    <select_1.SelectItem value="bottom-right">Bottom Right</select_1.SelectItem>
                                  </select_1.SelectContent>
                                </select_1.Select>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label_1.Label htmlFor="floating-shape">Shape</label_1.Label>
                                <select_1.Select value={((_9 = (_8 = (_7 = config.branding) === null || _7 === void 0 ? void 0 : _7.footerLink) === null || _8 === void 0 ? void 0 : _8.floatingStyle) === null || _9 === void 0 ? void 0 : _9.shape) || 'pill'} onValueChange={function (value) {
                    var _a, _b, _c;
                    return updateConfig('branding', {
                        footerLink: __assign(__assign({}, (((_a = config.branding) === null || _a === void 0 ? void 0 : _a.footerLink) || {})), { floatingStyle: __assign(__assign({}, (((_c = (_b = config.branding) === null || _b === void 0 ? void 0 : _b.footerLink) === null || _c === void 0 ? void 0 : _c.floatingStyle) || {})), { shape: value }) })
                    });
                }}>
                                  <select_1.SelectTrigger>
                                    <select_1.SelectValue />
                                  </select_1.SelectTrigger>
                                  <select_1.SelectContent>
                                    <select_1.SelectItem value="circle">Circle (Icon Only)</select_1.SelectItem>
                                    <select_1.SelectItem value="pill">Pill (Icon + Text)</select_1.SelectItem>
                                    <select_1.SelectItem value="square">Square (Icon + Text)</select_1.SelectItem>
                                  </select_1.SelectContent>
                                </select_1.Select>
                              </div>
                              
                              <div>
                                <label_1.Label htmlFor="floating-size">Size</label_1.Label>
                                <select_1.Select value={((_12 = (_11 = (_10 = config.branding) === null || _10 === void 0 ? void 0 : _10.footerLink) === null || _11 === void 0 ? void 0 : _11.floatingStyle) === null || _12 === void 0 ? void 0 : _12.size) || 'small'} onValueChange={function (value) {
                    var _a, _b, _c;
                    return updateConfig('branding', {
                        footerLink: __assign(__assign({}, (((_a = config.branding) === null || _a === void 0 ? void 0 : _a.footerLink) || {})), { floatingStyle: __assign(__assign({}, (((_c = (_b = config.branding) === null || _b === void 0 ? void 0 : _b.footerLink) === null || _c === void 0 ? void 0 : _c.floatingStyle) || {})), { size: value }) })
                    });
                }}>
                                  <select_1.SelectTrigger>
                                    <select_1.SelectValue />
                                  </select_1.SelectTrigger>
                                  <select_1.SelectContent>
                                    <select_1.SelectItem value="small">Small (40px)</select_1.SelectItem>
                                    <select_1.SelectItem value="medium">Medium (48px)</select_1.SelectItem>
                                    <select_1.SelectItem value="large">Large (56px)</select_1.SelectItem>
                                  </select_1.SelectContent>
                                </select_1.Select>
                              </div>
                            </div>

                            <div className="flex items-center space-x-2">
                              <switch_1.Switch id="floating-show-text" checked={(_16 = (_15 = (_14 = (_13 = config.branding) === null || _13 === void 0 ? void 0 : _13.footerLink) === null || _14 === void 0 ? void 0 : _14.floatingStyle) === null || _15 === void 0 ? void 0 : _15.showText) !== null && _16 !== void 0 ? _16 : true} onCheckedChange={function (checked) {
                    var _a, _b, _c;
                    return updateConfig('branding', {
                        footerLink: __assign(__assign({}, (((_a = config.branding) === null || _a === void 0 ? void 0 : _a.footerLink) || {})), { floatingStyle: __assign(__assign({}, (((_c = (_b = config.branding) === null || _b === void 0 ? void 0 : _b.footerLink) === null || _c === void 0 ? void 0 : _c.floatingStyle) || {})), { showText: checked }) })
                    });
                }}/>
                              <label_1.Label htmlFor="floating-show-text">Show text with icon</label_1.Label>
                            </div>

                            <div className="flex items-center space-x-2">
                              <switch_1.Switch id="floating-custom-colors" checked={(_20 = (_19 = (_18 = (_17 = config.branding) === null || _17 === void 0 ? void 0 : _17.footerLink) === null || _18 === void 0 ? void 0 : _18.floatingStyle) === null || _19 === void 0 ? void 0 : _19.useCustomColors) !== null && _20 !== void 0 ? _20 : false} onCheckedChange={function (checked) {
                    var _a, _b, _c;
                    return updateConfig('branding', {
                        footerLink: __assign(__assign({}, (((_a = config.branding) === null || _a === void 0 ? void 0 : _a.footerLink) || {})), { floatingStyle: __assign(__assign({}, (((_c = (_b = config.branding) === null || _b === void 0 ? void 0 : _b.footerLink) === null || _c === void 0 ? void 0 : _c.floatingStyle) || {})), { useCustomColors: checked }) })
                    });
                }}/>
                              <label_1.Label htmlFor="floating-custom-colors">Use custom colors (otherwise matches banner button)</label_1.Label>
                            </div>

                            {((_23 = (_22 = (_21 = config.branding) === null || _21 === void 0 ? void 0 : _21.footerLink) === null || _22 === void 0 ? void 0 : _22.floatingStyle) === null || _23 === void 0 ? void 0 : _23.useCustomColors) && (<div className="grid grid-cols-3 gap-4">
                                <div>
                                  <label_1.Label className="text-xs">Background</label_1.Label>
                                  <color_picker_1.ColorPicker value={((_27 = (_26 = (_25 = (_24 = config.branding) === null || _24 === void 0 ? void 0 : _24.footerLink) === null || _25 === void 0 ? void 0 : _25.floatingStyle) === null || _26 === void 0 ? void 0 : _26.customColors) === null || _27 === void 0 ? void 0 : _27.background) || '#6b7280'} onChange={function (color) {
                        var _a, _b, _c, _d, _e, _f;
                        return updateConfig('branding', {
                            footerLink: __assign(__assign({}, (((_a = config.branding) === null || _a === void 0 ? void 0 : _a.footerLink) || {})), { floatingStyle: __assign(__assign({}, (((_c = (_b = config.branding) === null || _b === void 0 ? void 0 : _b.footerLink) === null || _c === void 0 ? void 0 : _c.floatingStyle) || {})), { customColors: __assign(__assign({}, (((_f = (_e = (_d = config.branding) === null || _d === void 0 ? void 0 : _d.footerLink) === null || _e === void 0 ? void 0 : _e.floatingStyle) === null || _f === void 0 ? void 0 : _f.customColors) || {})), { background: color }) }) })
                        });
                    }}/>
                                </div>
                                <div>
                                  <label_1.Label className="text-xs">Text</label_1.Label>
                                  <color_picker_1.ColorPicker value={((_31 = (_30 = (_29 = (_28 = config.branding) === null || _28 === void 0 ? void 0 : _28.footerLink) === null || _29 === void 0 ? void 0 : _29.floatingStyle) === null || _30 === void 0 ? void 0 : _30.customColors) === null || _31 === void 0 ? void 0 : _31.text) || '#ffffff'} onChange={function (color) {
                        var _a, _b, _c, _d, _e, _f;
                        return updateConfig('branding', {
                            footerLink: __assign(__assign({}, (((_a = config.branding) === null || _a === void 0 ? void 0 : _a.footerLink) || {})), { floatingStyle: __assign(__assign({}, (((_c = (_b = config.branding) === null || _b === void 0 ? void 0 : _b.footerLink) === null || _c === void 0 ? void 0 : _c.floatingStyle) || {})), { customColors: __assign(__assign({}, (((_f = (_e = (_d = config.branding) === null || _d === void 0 ? void 0 : _d.footerLink) === null || _e === void 0 ? void 0 : _e.floatingStyle) === null || _f === void 0 ? void 0 : _f.customColors) || {})), { text: color }) }) })
                        });
                    }}/>
                                </div>
                                <div>
                                  <label_1.Label className="text-xs">Border</label_1.Label>
                                  <color_picker_1.ColorPicker value={((_35 = (_34 = (_33 = (_32 = config.branding) === null || _32 === void 0 ? void 0 : _32.footerLink) === null || _33 === void 0 ? void 0 : _33.floatingStyle) === null || _34 === void 0 ? void 0 : _34.customColors) === null || _35 === void 0 ? void 0 : _35.border) || '#6b7280'} onChange={function (color) {
                        var _a, _b, _c, _d, _e, _f;
                        return updateConfig('branding', {
                            footerLink: __assign(__assign({}, (((_a = config.branding) === null || _a === void 0 ? void 0 : _a.footerLink) || {})), { floatingStyle: __assign(__assign({}, (((_c = (_b = config.branding) === null || _b === void 0 ? void 0 : _b.footerLink) === null || _c === void 0 ? void 0 : _c.floatingStyle) || {})), { customColors: __assign(__assign({}, (((_f = (_e = (_d = config.branding) === null || _d === void 0 ? void 0 : _d.footerLink) === null || _e === void 0 ? void 0 : _e.floatingStyle) === null || _f === void 0 ? void 0 : _f.customColors) || {})), { border: color }) }) })
                        });
                    }}/>
                                </div>
                              </div>)}
                          </div>)}

                        {/* Inline Footer Link Configuration */}
                        {(((_37 = (_36 = config.branding) === null || _36 === void 0 ? void 0 : _36.footerLink) === null || _37 === void 0 ? void 0 : _37.style) === 'inline' || ((_39 = (_38 = config.branding) === null || _38 === void 0 ? void 0 : _38.footerLink) === null || _39 === void 0 ? void 0 : _39.style) === 'both') && (<div className="space-y-4 p-4 border rounded-lg bg-muted/30">
                            <h4 className="font-medium flex items-center">
                              <lucide_react_1.Type className="h-4 w-4 mr-2"/>
                              Inline Footer Link Settings
                            </h4>
                            
                            <div className="space-y-4">
                              <div>
                                <label_1.Label htmlFor="inline-link-type">Link Style</label_1.Label>
                                <select_1.Select value={((_42 = (_41 = (_40 = config.branding) === null || _40 === void 0 ? void 0 : _40.footerLink) === null || _41 === void 0 ? void 0 : _41.inlineStyle) === null || _42 === void 0 ? void 0 : _42.linkType) || 'plain'} onValueChange={function (value) {
                    var _a, _b, _c;
                    return updateConfig('branding', {
                        footerLink: __assign(__assign({}, (((_a = config.branding) === null || _a === void 0 ? void 0 : _a.footerLink) || {})), { inlineStyle: __assign(__assign({}, (((_c = (_b = config.branding) === null || _b === void 0 ? void 0 : _b.footerLink) === null || _c === void 0 ? void 0 : _c.inlineStyle) || {})), { linkType: value }) })
                    });
                }}>
                                  <select_1.SelectTrigger>
                                    <select_1.SelectValue />
                                  </select_1.SelectTrigger>
                                  <select_1.SelectContent>
                                    <select_1.SelectItem value="plain">Plain Text Link</select_1.SelectItem>
                                    <select_1.SelectItem value="button">Button Style</select_1.SelectItem>
                                    <select_1.SelectItem value="icon-text">Icon + Text</select_1.SelectItem>
                                    <select_1.SelectItem value="custom">Custom Styled</select_1.SelectItem>
                                  </select_1.SelectContent>
                                </select_1.Select>
                              </div>

                              <div className="flex items-center space-x-2">
                                <switch_1.Switch id="inline-include-icon" checked={(_46 = (_45 = (_44 = (_43 = config.branding) === null || _43 === void 0 ? void 0 : _43.footerLink) === null || _44 === void 0 ? void 0 : _44.inlineStyle) === null || _45 === void 0 ? void 0 : _45.includeIcon) !== null && _46 !== void 0 ? _46 : false} onCheckedChange={function (checked) {
                    var _a, _b, _c;
                    return updateConfig('branding', {
                        footerLink: __assign(__assign({}, (((_a = config.branding) === null || _a === void 0 ? void 0 : _a.footerLink) || {})), { inlineStyle: __assign(__assign({}, (((_c = (_b = config.branding) === null || _b === void 0 ? void 0 : _b.footerLink) === null || _c === void 0 ? void 0 : _c.inlineStyle) || {})), { includeIcon: checked }) })
                    });
                }}/>
                                <label_1.Label htmlFor="inline-include-icon">Include cookie icon</label_1.Label>
                              </div>

                              <div className="flex items-center space-x-2">
                                <switch_1.Switch id="inline-include-logo" checked={(_50 = (_49 = (_48 = (_47 = config.branding) === null || _47 === void 0 ? void 0 : _47.footerLink) === null || _48 === void 0 ? void 0 : _48.inlineStyle) === null || _49 === void 0 ? void 0 : _49.includeLogo) !== null && _50 !== void 0 ? _50 : false} onCheckedChange={function (checked) {
                    var _a, _b, _c;
                    return updateConfig('branding', {
                        footerLink: __assign(__assign({}, (((_a = config.branding) === null || _a === void 0 ? void 0 : _a.footerLink) || {})), { inlineStyle: __assign(__assign({}, (((_c = (_b = config.branding) === null || _b === void 0 ? void 0 : _b.footerLink) === null || _c === void 0 ? void 0 : _c.inlineStyle) || {})), { includeLogo: checked }) })
                    });
                }}/>
                                <label_1.Label htmlFor="inline-include-logo">Include your logo (if uploaded)</label_1.Label>
                              </div>

                              {((_53 = (_52 = (_51 = config.branding) === null || _51 === void 0 ? void 0 : _51.footerLink) === null || _52 === void 0 ? void 0 : _52.inlineStyle) === null || _53 === void 0 ? void 0 : _53.linkType) === 'custom' && (<div>
                                  <label_1.Label htmlFor="inline-custom-class">Custom CSS Class</label_1.Label>
                                  <input_1.Input id="inline-custom-class" value={((_56 = (_55 = (_54 = config.branding) === null || _54 === void 0 ? void 0 : _54.footerLink) === null || _55 === void 0 ? void 0 : _55.inlineStyle) === null || _56 === void 0 ? void 0 : _56.customClass) || ''} onChange={function (e) {
                        var _a, _b, _c;
                        return updateConfig('branding', {
                            footerLink: __assign(__assign({}, (((_a = config.branding) === null || _a === void 0 ? void 0 : _a.footerLink) || {})), { inlineStyle: __assign(__assign({}, (((_c = (_b = config.branding) === null || _b === void 0 ? void 0 : _b.footerLink) === null || _c === void 0 ? void 0 : _c.inlineStyle) || {})), { customClass: e.target.value }) })
                        });
                    }} placeholder="my-custom-cookie-link"/>
                                </div>)}

                              {/* Generated HTML Preview */}
                              <div className="mt-4 p-4 bg-muted rounded-lg">
                                <p className="text-sm font-medium mb-2">Generated HTML for your footer:</p>
                                <code className="block p-3 bg-background rounded text-xs overflow-x-auto">
                                  {generateInlineFooterLinkHTML(((_57 = config.branding) === null || _57 === void 0 ? void 0 : _57.footerLink) || {})}
                                </code>
                                <p className="text-xs text-muted-foreground mt-2">
                                  Copy this code and paste it into your website footer where you want the link to appear.
                                </p>
                              </div>
                            </div>
                          </div>)}
                      </div>)}
                  </card_1.CardContent>
                </card_1.Card>
              </div>

              {/* Live Preview Panel */}
              <div className="space-y-6">
                <card_1.Card>
                  <card_1.CardHeader>
                    <card_1.CardTitle>Live Preview</card_1.CardTitle>
                    <card_1.CardDescription>
                      See how your cookie settings will look on your website
                    </card_1.CardDescription>
                  </card_1.CardHeader>
                  <card_1.CardContent>
                    <div className="space-y-6">
                      {/* Floating Button Preview */}
                      {(((_59 = (_58 = config.branding) === null || _58 === void 0 ? void 0 : _58.footerLink) === null || _59 === void 0 ? void 0 : _59.style) === 'floating' || ((_61 = (_60 = config.branding) === null || _60 === void 0 ? void 0 : _60.footerLink) === null || _61 === void 0 ? void 0 : _61.style) === 'both') && (<div className="space-y-3">
                          <h4 className="text-sm font-medium">Floating Button Preview</h4>
                          <div className="relative border-2 border-dashed border-border rounded-lg p-8 bg-muted/50 min-h-[200px]">
                            <div className="text-center text-sm text-muted-foreground mb-4">
                              Your website content would appear here
                            </div>
                            
                            {/* Floating Button Preview */}
                            <div className="inline-block cursor-pointer transition-all duration-200 hover:scale-105" style={__assign(__assign({}, generateFloatingButtonPreviewStyles(config)), { position: 'relative', top: 'auto', left: 'auto', right: 'auto', bottom: 'auto', transform: 'none', margin: '0 auto' })} onClick={function () {
                // Toggle consent state for preview
                var currentState = localStorage.getItem('cookie-consent-preview-state') || 'accepted';
                var newState = currentState === 'accepted' ? 'rejected' : 'accepted';
                localStorage.setItem('cookie-consent-preview-state', newState);
                // Force re-render by updating a dummy state
                setConfig(__assign({}, config));
            }}>
                              {generateFloatingButtonPreviewContent(config)}
                            </div>
                            
                            <div className="text-center mt-4">
                              <button_1.Button variant="outline" size="sm" onClick={function () {
                var currentState = localStorage.getItem('cookie-consent-preview-state') || 'accepted';
                var newState = currentState === 'accepted' ? 'rejected' : 'accepted';
                localStorage.setItem('cookie-consent-preview-state', newState);
                setConfig(__assign({}, config));
            }}>
                                Toggle Consent State
                              </button_1.Button>
                            </div>
                          </div>
                        </div>)}

                      {/* Inline Footer Link Preview */}
                      {(((_63 = (_62 = config.branding) === null || _62 === void 0 ? void 0 : _62.footerLink) === null || _63 === void 0 ? void 0 : _63.style) === 'inline' || ((_65 = (_64 = config.branding) === null || _64 === void 0 ? void 0 : _64.footerLink) === null || _65 === void 0 ? void 0 : _65.style) === 'both') && (<div className="space-y-3">
                          <h4 className="text-sm font-medium">Inline Footer Link Preview</h4>
                          <div className="border border-border rounded-lg p-4 bg-muted/50">
                            <div className="text-xs text-muted-foreground mb-2">Footer area:</div>
                            <div className="inline-block" dangerouslySetInnerHTML={{
                __html: generateInlineFooterLinkHTML((_66 = config.branding) === null || _66 === void 0 ? void 0 : _66.footerLink)
            }}/>
                          </div>
                        </div>)}

                      {/* HTML Snippet Preview */}
                      {(((_68 = (_67 = config.branding) === null || _67 === void 0 ? void 0 : _67.footerLink) === null || _68 === void 0 ? void 0 : _68.style) === 'inline' || ((_70 = (_69 = config.branding) === null || _69 === void 0 ? void 0 : _69.footerLink) === null || _70 === void 0 ? void 0 : _70.style) === 'both') && (<div className="space-y-3">
                          <h4 className="text-sm font-medium">Generated HTML Snippet</h4>
                          <div className="bg-gray-900 text-gray-100 p-3 rounded-lg text-xs font-mono overflow-x-auto">
                            <pre>{generateInlineFooterLinkHTML((_71 = config.branding) === null || _71 === void 0 ? void 0 : _71.footerLink)}</pre>
                          </div>
                          <button_1.Button variant="outline" size="sm" onClick={function () {
                var _a;
                navigator.clipboard.writeText(generateInlineFooterLinkHTML((_a = config.branding) === null || _a === void 0 ? void 0 : _a.footerLink));
                react_hot_toast_1.toast.success('Copied to clipboard!');
            }}>
                            Copy HTML Snippet
                          </button_1.Button>
                        </div>)}

                      {!((_73 = (_72 = config.branding) === null || _72 === void 0 ? void 0 : _72.footerLink) === null || _73 === void 0 ? void 0 : _73.style) && (<div className="text-center text-muted-foreground py-8">
                          <lucide_react_1.Settings className="h-8 w-8 mx-auto mb-2 opacity-50"/>
                          <p>Select a display style to see preview</p>
                        </div>)}
                    </div>
                  </card_1.CardContent>
                </card_1.Card>
              </div>
            </div>
          </tabs_1.TabsContent>

          {/* Scripts Tab */}
              <tabs_1.TabsContent value="scripts" className="space-y-6" id="scripts-panel" role="tabpanel" aria-labelledby="scripts-tab">
                <script_scanner_import_1.ScriptScannerImport currentScripts={config.scripts} privacyPolicyUrl={(_75 = (_74 = config.branding) === null || _74 === void 0 ? void 0 : _74.privacyPolicy) === null || _75 === void 0 ? void 0 : _75.url} onImport={handleScannerImport} onUsePrivacyPolicy={handleUseDetectedPrivacyPolicy} onScanComplete={handleBuilderScanComplete}/>

                <card_1.Card>
                  <card_1.CardHeader>
                    <card_1.CardTitle>Tracking Scripts</card_1.CardTitle>
                  </card_1.CardHeader>
                  <card_1.CardContent className="space-y-6">
                    {/* Strictly Necessary Scripts */}
                    <div>
                      <h4 className="font-medium mb-3 flex items-center">
                        <lucide_react_1.Shield className="mr-2 h-4 w-4 text-green-600"/>
                        Strictly Necessary Scripts
                        {config.scripts.strictlyNecessary.filter(function (s) { return s.enabled && s.scriptCode.trim(); }).length > 0 && (<badge_1.Badge variant="default" className="ml-2">
                            {config.scripts.strictlyNecessary.filter(function (s) { return s.enabled && s.scriptCode.trim(); }).length}
                          </badge_1.Badge>)}
                      </h4>
                      <div className="space-y-3">
                        {config.scripts.strictlyNecessary.map(function (script, index) { return (<div key={script.id} className="border rounded-lg">
                            <div className="flex items-center justify-between p-3">
                              <div className="flex items-center space-x-3">
                                <SmartScriptInput value={script.name} onChange={function (value) {
                var newScripts = __spreadArray([], config.scripts.strictlyNecessary, true);
                newScripts[index].name = value;
                setConfig(function (prev) { return (__assign(__assign({}, prev), { scripts: __assign(__assign({}, prev.scripts), { strictlyNecessary: newScripts }) })); });
            }} category="strictly-necessary" placeholder="Script name"/>
                                {script.scriptCode.trim() && (<badge_1.Badge variant={script.enabled ? "default" : "secondary"}>
                                    {script.enabled ? 'Active' : 'Inactive'}
                                  </badge_1.Badge>)}
                              </div>
                              <div className="flex items-center space-x-2">
                                {script.scriptCode.trim() ? (script.enabled ? (<div className="flex items-center space-x-1 text-green-600 text-sm font-medium">
                                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                      <span>Live</span>
                                    </div>) : (<button_1.Button size="sm" variant="outline" onClick={function () {
                    var newScripts = __spreadArray([], config.scripts.strictlyNecessary, true);
                    newScripts[index].enabled = true;
                    setConfig(function (prev) { return (__assign(__assign({}, prev), { scripts: __assign(__assign({}, prev.scripts), { strictlyNecessary: newScripts }) })); });
                    react_hot_toast_1.toast.success("\"".concat(script.name || 'Script', "\" added to generated code!"));
                }}>
                                      Add Script
                                    </button_1.Button>)) : null}
                                <button_1.Button variant="ghost" size="sm" onClick={function () {
                var newScripts = config.scripts.strictlyNecessary.filter(function (_, i) { return i !== index; });
                setConfig(function (prev) { return (__assign(__assign({}, prev), { scripts: __assign(__assign({}, prev.scripts), { strictlyNecessary: newScripts }) })); });
            }}>
                                  <lucide_react_1.Trash2 className="h-4 w-4"/>
                                </button_1.Button>
                              </div>
                            </div>
                            {script.scriptCode.trim() && (<div className="px-3 pb-3 space-y-3">
                                <div>
                                  <label_1.Label className="text-xs text-muted-foreground mb-1 block">
                                    {script.name.toLowerCase().includes('google tag manager') || script.name.toLowerCase().includes('gtm')
                    ? 'Head Code (Step 1: Paste in <head> section)'
                    : 'Script Code'}
                                  </label_1.Label>
                                  <textarea value={script.scriptCode} onChange={function (e) {
                    var newScripts = __spreadArray([], config.scripts.strictlyNecessary, true);
                    newScripts[index].scriptCode = e.target.value;
                    setConfig(function (prev) { return (__assign(__assign({}, prev), { scripts: __assign(__assign({}, prev.scripts), { strictlyNecessary: newScripts }) })); });
                }} placeholder="Paste your script code here..." className="w-full h-20 p-2 text-xs font-mono border rounded resize-none"/>
                                </div>
                                {(script.name.toLowerCase().includes('google tag manager') ||
                    script.name.toLowerCase().includes('gtm') ||
                    script.bodyCode) && (<div>
                                    <label_1.Label className="text-xs text-muted-foreground mb-1 block">
                                      {script.name.toLowerCase().includes('google tag manager') || script.name.toLowerCase().includes('gtm')
                        ? 'Body Code (Step 2: Paste after <body> tag - Required for GTM)'
                        : 'Body Code (placed after <body> tag) - Optional'}
                                    </label_1.Label>
                                    {(script.name.toLowerCase().includes('google tag manager') || script.name.toLowerCase().includes('gtm')) && (<p className="text-xs text-amber-600 mb-2 flex items-center">
                                        <lucide_react_1.Info className="h-3 w-3 mr-1"/>
                                        Google Tag Manager requires both Head and Body codes to work properly
                                      </p>)}
                                    <textarea value={script.bodyCode || ''} onChange={function (e) {
                        var newScripts = __spreadArray([], config.scripts.strictlyNecessary, true);
                        newScripts[index].bodyCode = e.target.value;
                        setConfig(function (prev) { return (__assign(__assign({}, prev), { scripts: __assign(__assign({}, prev.scripts), { strictlyNecessary: newScripts }) })); });
                    }} placeholder={script.name.toLowerCase().includes('google tag manager') || script.name.toLowerCase().includes('gtm')
                        ? 'Paste your GTM noscript code here (starts with <noscript><iframe...)'
                        : 'Paste your <body> script code here...'} className="w-full h-20 p-2 text-xs font-mono border rounded resize-none"/>
                                  </div>)}
                              </div>)}
                            {!script.scriptCode.trim() && (<div className="px-3 pb-3 space-y-3">
                                <div>
                                  <label_1.Label className="text-xs text-muted-foreground mb-1 block">
                                    {script.name.toLowerCase().includes('google tag manager') || script.name.toLowerCase().includes('gtm')
                    ? 'Head Code (Step 1: Paste in <head> section)'
                    : 'Script Code'}
                                  </label_1.Label>
                                  <textarea value={script.scriptCode} onChange={function (e) {
                    var newScripts = __spreadArray([], config.scripts.strictlyNecessary, true);
                    newScripts[index].scriptCode = e.target.value;
                    setConfig(function (prev) { return (__assign(__assign({}, prev), { scripts: __assign(__assign({}, prev.scripts), { strictlyNecessary: newScripts }) })); });
                }} placeholder={script.name.toLowerCase().includes('google tag manager') || script.name.toLowerCase().includes('gtm')
                    ? 'Paste your GTM <script> code here...'
                    : 'Paste your script code here...'} className="w-full h-20 p-2 text-xs font-mono border rounded resize-none"/>
                                </div>
                                {(script.name.toLowerCase().includes('google tag manager') ||
                    script.name.toLowerCase().includes('gtm')) && (<div>
                                    <label_1.Label className="text-xs text-muted-foreground mb-1 block">
                                      Body Code (Step 2: Paste after &lt;body&gt; tag - Required for GTM)
                                    </label_1.Label>
                                    <p className="text-xs text-amber-600 mb-2 flex items-center">
                                      <lucide_react_1.Info className="h-3 w-3 mr-1"/>
                                      Google Tag Manager requires both Head and Body codes to work properly
                                    </p>
                                    <textarea value={script.bodyCode || ''} onChange={function (e) {
                        var newScripts = __spreadArray([], config.scripts.strictlyNecessary, true);
                        newScripts[index].bodyCode = e.target.value;
                        setConfig(function (prev) { return (__assign(__assign({}, prev), { scripts: __assign(__assign({}, prev.scripts), { strictlyNecessary: newScripts }) })); });
                    }} placeholder="Paste your GTM noscript code here (starts with <noscript><iframe...)" className="w-full h-20 p-2 text-xs font-mono border rounded resize-none"/>
                                  </div>)}
                              </div>)}
                          </div>); })}
                        <button_1.Button variant="outline" size="sm" onClick={function () {
            var newScript = {
                id: "strict-".concat(Date.now()),
                name: '',
                category: 'strictly-necessary',
                scriptCode: '',
                enabled: true
            };
            setConfig(function (prev) { return (__assign(__assign({}, prev), { scripts: __assign(__assign({}, prev.scripts), { strictlyNecessary: __spreadArray(__spreadArray([], prev.scripts.strictlyNecessary, true), [newScript], false) }) })); });
        }}>
                          <lucide_react_1.Plus className="mr-2 h-4 w-4"/>
                          Add Strictly Necessary Script
                        </button_1.Button>
                      </div>
                    </div>

                    {/* Functionality Scripts */}
                    <div>
                      <h4 className="font-medium mb-3 flex items-center">
                        <lucide_react_1.Settings className="mr-2 h-4 w-4 text-blue-600"/>
                        Functionality Scripts
                        {config.scripts.functionality.filter(function (s) { return s.enabled && s.scriptCode.trim(); }).length > 0 && (<badge_1.Badge variant="default" className="ml-2">
                            {config.scripts.functionality.filter(function (s) { return s.enabled && s.scriptCode.trim(); }).length}
                          </badge_1.Badge>)}
                      </h4>
                      <div className="space-y-3">
                        {config.scripts.functionality.map(function (script, index) {
            var _a;
            return (<div key={script.id} className="border rounded-lg">
                            <div className="flex items-center justify-between p-3">
                              <div className="flex items-center space-x-3">
                                <SmartScriptInput value={script.name} onChange={function (value) {
                    var newScripts = __spreadArray([], config.scripts.functionality, true);
                    newScripts[index].name = value;
                    setConfig(function (prev) { return (__assign(__assign({}, prev), { scripts: __assign(__assign({}, prev.scripts), { functionality: newScripts }) })); });
                }} category="functionality" placeholder="Script name"/>
                                {script.scriptCode.trim() && (<badge_1.Badge variant={script.enabled ? "default" : "secondary"}>
                                    {script.enabled ? 'Active' : 'Inactive'}
                                  </badge_1.Badge>)}
                              </div>
                              <div className="flex items-center space-x-2">
                                {script.scriptCode.trim() ? (script.enabled ? (<div className="flex items-center space-x-1 text-green-600 text-sm font-medium">
                                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                      <span>Live</span>
                                    </div>) : (<button_1.Button size="sm" variant="outline" onClick={function () {
                        var newScripts = __spreadArray([], config.scripts.functionality, true);
                        newScripts[index].enabled = true;
                        setConfig(function (prev) { return (__assign(__assign({}, prev), { scripts: __assign(__assign({}, prev.scripts), { functionality: newScripts }) })); });
                        react_hot_toast_1.toast.success("\"".concat(script.name || 'Script', "\" added to generated code!"));
                    }}>
                                      Add Script
                                    </button_1.Button>)) : null}
                                <button_1.Button variant="ghost" size="sm" onClick={function () {
                    var newScripts = config.scripts.functionality.filter(function (_, i) { return i !== index; });
                    setConfig(function (prev) { return (__assign(__assign({}, prev), { scripts: __assign(__assign({}, prev.scripts), { functionality: newScripts }) })); });
                }}>
                                  <lucide_react_1.Trash2 className="h-4 w-4"/>
                                </button_1.Button>
                              </div>
                            </div>
                            <div className="px-3 pb-3 space-y-3">
                              {!script.scriptCode.trim() && (<div className="p-3 bg-muted/50 rounded-lg border">
                                  <label_1.Label className="text-xs font-medium mb-2 block">💬 What functionality are you adding?</label_1.Label>
                                  <select_1.Select onValueChange={function (templateKey) {
                        var template = script_templates_1.scriptTemplates[templateKey];
                        if (template) {
                            var newScripts_1 = __spreadArray([], config.scripts.functionality, true);
                            newScripts_1[index].name = template.name;
                            setConfig(function (prev) { return (__assign(__assign({}, prev), { scripts: __assign(__assign({}, prev.scripts), { functionality: newScripts_1 }) })); });
                        }
                    }}>
                                    <select_1.SelectTrigger className="text-xs h-9">
                                      <select_1.SelectValue placeholder="Select tool (Intercom, Zendesk, etc.)"/>
                                    </select_1.SelectTrigger>
                                    <select_1.SelectContent>
                                      {Object.entries(script_templates_1.scriptTemplates)
                        .filter(function (_a) {
                        var _ = _a[0], template = _a[1];
                        return template.category === 'functionality';
                    })
                        .map(function (_a) {
                        var key = _a[0], template = _a[1];
                        return (<select_1.SelectItem key={key} value={key} className="text-xs">
                                            {template.name}
                                          </select_1.SelectItem>);
                    })}
                                    </select_1.SelectContent>
                                  </select_1.Select>
                                  {script.name && script_templates_1.scriptTemplates[Object.keys(script_templates_1.scriptTemplates).find(function (k) { return script_templates_1.scriptTemplates[k].name === script.name; }) || ''] && (<div className="mt-3 p-3 bg-primary/5 border border-primary/20 rounded text-xs space-y-2">
                                      <p className="font-medium text-primary">
                                        📍 Where to find your {script.name} code:
                                      </p>
                                      <p className="text-muted-foreground">
                                        {(_a = script_templates_1.scriptTemplates[Object.keys(script_templates_1.scriptTemplates).find(function (k) { return script_templates_1.scriptTemplates[k].name === script.name; }) || '']) === null || _a === void 0 ? void 0 : _a.instructions}
                                      </p>
                                      <p className="text-muted-foreground">
                                        Copy the tracking code and paste it in the box below.
                                      </p>
                                    </div>)}
                                </div>)}
                              
                              <div>
                                <label_1.Label className="text-xs font-medium mb-2 block">
                                  {script.scriptCode.trim() ? 'Script Code:' : 'Paste your script code here:'}
                                </label_1.Label>
                                <textarea value={script.scriptCode} onChange={function (e) {
                    var newScripts = __spreadArray([], config.scripts.functionality, true);
                    newScripts[index].scriptCode = e.target.value;
                    setConfig(function (prev) { return (__assign(__assign({}, prev), { scripts: __assign(__assign({}, prev.scripts), { functionality: newScripts }) })); });
                }} placeholder={"Paste your ".concat(script.name || 'functionality', " code here...")} className="w-full h-32 p-3 text-xs font-mono border rounded resize-none focus:ring-2 focus:ring-primary"/>
                              </div>
                            </div>
                          </div>);
        })}
                        <button_1.Button variant="outline" size="sm" onClick={function () {
            var newScript = {
                id: "func-".concat(Date.now()),
                name: '',
                category: 'functionality',
                scriptCode: '',
                enabled: true
            };
            setConfig(function (prev) { return (__assign(__assign({}, prev), { scripts: __assign(__assign({}, prev.scripts), { functionality: __spreadArray(__spreadArray([], prev.scripts.functionality, true), [newScript], false) }) })); });
        }}>
                          <lucide_react_1.Plus className="mr-2 h-4 w-4"/>
                          Add Functionality Script
                        </button_1.Button>
                      </div>
                    </div>

                    {/* Tracking & Performance Scripts */}
                    <div>
                      <h4 className="font-medium mb-3 flex items-center">
                        <lucide_react_1.BarChart3 className="mr-2 h-4 w-4 text-yellow-600"/>
                        Tracking & Performance Scripts
                        {config.scripts.trackingPerformance.filter(function (s) { return s.enabled && s.scriptCode.trim(); }).length > 0 && (<badge_1.Badge variant="default" className="ml-2">
                            {config.scripts.trackingPerformance.filter(function (s) { return s.enabled && s.scriptCode.trim(); }).length}
                          </badge_1.Badge>)}
                      </h4>
                      <div className="space-y-3">
                        {config.scripts.trackingPerformance.map(function (script, index) {
            var _a;
            return (<div key={script.id} className="border rounded-lg">
                            <div className="flex items-center justify-between p-3">
                              <div className="flex items-center space-x-3">
                                <SmartScriptInput value={script.name} onChange={function (value) {
                    var newScripts = __spreadArray([], config.scripts.trackingPerformance, true);
                    newScripts[index].name = value;
                    setConfig(function (prev) { return (__assign(__assign({}, prev), { scripts: __assign(__assign({}, prev.scripts), { trackingPerformance: newScripts }) })); });
                }} category="tracking-performance" placeholder="Script name"/>
                                {script.scriptCode.trim() && (<badge_1.Badge variant={script.enabled ? "default" : "secondary"}>
                                    {script.enabled ? 'Active' : 'Inactive'}
                                  </badge_1.Badge>)}
                              </div>
                              <div className="flex items-center space-x-2">
                                {script.scriptCode.trim() ? (script.enabled ? (<div className="flex items-center space-x-1 text-green-600 text-sm font-medium">
                                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                      <span>Live</span>
                                    </div>) : (<button_1.Button size="sm" variant="outline" onClick={function () {
                        var newScripts = __spreadArray([], config.scripts.trackingPerformance, true);
                        newScripts[index].enabled = true;
                        setConfig(function (prev) { return (__assign(__assign({}, prev), { scripts: __assign(__assign({}, prev.scripts), { trackingPerformance: newScripts }) })); });
                        react_hot_toast_1.toast.success("\"".concat(script.name || 'Script', "\" added to generated code!"));
                    }}>
                                      Add Script
                                    </button_1.Button>)) : null}
                                <button_1.Button variant="ghost" size="sm" onClick={function () {
                    var newScripts = config.scripts.trackingPerformance.filter(function (_, i) { return i !== index; });
                    setConfig(function (prev) { return (__assign(__assign({}, prev), { scripts: __assign(__assign({}, prev.scripts), { trackingPerformance: newScripts }) })); });
                }}>
                                  <lucide_react_1.Trash2 className="h-4 w-4"/>
                                </button_1.Button>
                              </div>
                            </div>
                            <div className="px-3 pb-3 space-y-3">
                              {!script.scriptCode.trim() && (<div className="p-3 bg-muted/50 rounded-lg border">
                                  <label_1.Label className="text-xs font-medium mb-2 block">📊 What are you tracking?</label_1.Label>
                                  <select_1.Select onValueChange={function (templateKey) {
                        var template = script_templates_1.scriptTemplates[templateKey];
                        if (template) {
                            var newScripts_2 = __spreadArray([], config.scripts.trackingPerformance, true);
                            newScripts_2[index].name = template.name;
                            setConfig(function (prev) { return (__assign(__assign({}, prev), { scripts: __assign(__assign({}, prev.scripts), { trackingPerformance: newScripts_2 }) })); });
                        }
                    }}>
                                    <select_1.SelectTrigger className="text-xs h-9">
                                      <select_1.SelectValue placeholder="Select tool (Google Analytics, Hotjar, etc.)"/>
                                    </select_1.SelectTrigger>
                                    <select_1.SelectContent>
                                      {Object.entries(script_templates_1.scriptTemplates)
                        .filter(function (_a) {
                        var _ = _a[0], template = _a[1];
                        return template.category === 'tracking-performance';
                    })
                        .map(function (_a) {
                        var key = _a[0], template = _a[1];
                        return (<select_1.SelectItem key={key} value={key} className="text-xs">
                                            {template.name}
                                          </select_1.SelectItem>);
                    })}
                                    </select_1.SelectContent>
                                  </select_1.Select>
                                  {script.name && script_templates_1.scriptTemplates[Object.keys(script_templates_1.scriptTemplates).find(function (k) { return script_templates_1.scriptTemplates[k].name === script.name; }) || ''] && (<div className="mt-3 p-3 bg-primary/5 border border-primary/20 rounded text-xs space-y-2">
                                      <p className="font-medium text-primary">
                                        📍 Where to find your {script.name} code:
                                      </p>
                                      <p className="text-muted-foreground">
                                        {(_a = script_templates_1.scriptTemplates[Object.keys(script_templates_1.scriptTemplates).find(function (k) { return script_templates_1.scriptTemplates[k].name === script.name; }) || '']) === null || _a === void 0 ? void 0 : _a.instructions}
                                      </p>
                                      <p className="text-muted-foreground">
                                        Copy the tracking code and paste it in the box below.
                                      </p>
                                    </div>)}
                                </div>)}
                              
                              <div>
                                <label_1.Label className="text-xs font-medium mb-2 block">
                                  {script.name.toLowerCase().includes('google tag manager') || script.name.toLowerCase().includes('gtm')
                    ? 'Head Code (Step 1: Paste in <head> section)'
                    : (script.scriptCode.trim() ? 'Script Code:' : 'Paste your tracking code here:')}
                                </label_1.Label>
                                <textarea value={script.scriptCode} onChange={function (e) {
                    var newScripts = __spreadArray([], config.scripts.trackingPerformance, true);
                    newScripts[index].scriptCode = e.target.value;
                    setConfig(function (prev) { return (__assign(__assign({}, prev), { scripts: __assign(__assign({}, prev.scripts), { trackingPerformance: newScripts }) })); });
                }} placeholder={script.name.toLowerCase().includes('google tag manager') || script.name.toLowerCase().includes('gtm')
                    ? 'Paste your GTM <script> code here...'
                    : "Paste your ".concat(script.name || 'tracking', " code here...")} className="w-full h-32 p-3 text-xs font-mono border rounded resize-none focus:ring-2 focus:ring-primary"/>
                              </div>
                              
                              {(script.name.toLowerCase().includes('google tag manager') ||
                    script.name.toLowerCase().includes('gtm') ||
                    script.bodyCode) && (<div>
                                  <label_1.Label className="text-xs font-medium mb-2 block">
                                    {script.name.toLowerCase().includes('google tag manager') || script.name.toLowerCase().includes('gtm')
                        ? 'Body Code (Step 2: Paste after <body> tag - Required for GTM)'
                        : 'Body Code (placed after <body> tag) - Optional'}
                                  </label_1.Label>
                                  {(script.name.toLowerCase().includes('google tag manager') || script.name.toLowerCase().includes('gtm')) && (<p className="text-xs text-amber-600 mb-2 flex items-center">
                                      <lucide_react_1.Info className="h-3 w-3 mr-1"/>
                                      Google Tag Manager requires both Head and Body codes to work properly
                                    </p>)}
                                  <textarea value={script.bodyCode || ''} onChange={function (e) {
                        var newScripts = __spreadArray([], config.scripts.trackingPerformance, true);
                        newScripts[index].bodyCode = e.target.value;
                        setConfig(function (prev) { return (__assign(__assign({}, prev), { scripts: __assign(__assign({}, prev.scripts), { trackingPerformance: newScripts }) })); });
                    }} placeholder={script.name.toLowerCase().includes('google tag manager') || script.name.toLowerCase().includes('gtm')
                        ? 'Paste your GTM noscript code here (starts with <noscript><iframe...)'
                        : 'Paste your <body> script code here...'} className="w-full h-32 p-3 text-xs font-mono border rounded resize-none focus:ring-2 focus:ring-primary"/>
                                </div>)}
                            </div>
                          </div>);
        })}
                        <button_1.Button variant="outline" size="sm" onClick={function () {
            var newScript = {
                id: "tracking-".concat(Date.now()),
                name: '',
                category: 'tracking-performance',
                scriptCode: '',
                enabled: true
            };
            setConfig(function (prev) { return (__assign(__assign({}, prev), { scripts: __assign(__assign({}, prev.scripts), { trackingPerformance: __spreadArray(__spreadArray([], prev.scripts.trackingPerformance, true), [newScript], false) }) })); });
        }}>
                          <lucide_react_1.Plus className="mr-2 h-4 w-4"/>
                          Add Tracking Script
                        </button_1.Button>
                      </div>
                    </div>

                    {/* Targeting & Advertising Scripts */}
                    <div>
                      <h4 className="font-medium mb-3 flex items-center">
                        <lucide_react_1.Target className="mr-2 h-4 w-4 text-red-600"/>
                        Targeting & Advertising Scripts
                        {config.scripts.targetingAdvertising.filter(function (s) { return s.enabled && s.scriptCode.trim(); }).length > 0 && (<badge_1.Badge variant="default" className="ml-2">
                            {config.scripts.targetingAdvertising.filter(function (s) { return s.enabled && s.scriptCode.trim(); }).length}
                          </badge_1.Badge>)}
                      </h4>
                      <div className="space-y-3">
                        {config.scripts.targetingAdvertising.map(function (script, index) {
            var _a;
            return (<div key={script.id} className="border rounded-lg">
                            <div className="flex items-center justify-between p-3">
                              <div className="flex items-center space-x-3">
                                <SmartScriptInput value={script.name} onChange={function (value) {
                    var newScripts = __spreadArray([], config.scripts.targetingAdvertising, true);
                    newScripts[index].name = value;
                    setConfig(function (prev) { return (__assign(__assign({}, prev), { scripts: __assign(__assign({}, prev.scripts), { targetingAdvertising: newScripts }) })); });
                }} category="targeting-advertising" placeholder="Script name"/>
                                {script.scriptCode.trim() && (<badge_1.Badge variant={script.enabled ? "default" : "secondary"}>
                                    {script.enabled ? 'Active' : 'Inactive'}
                                  </badge_1.Badge>)}
                              </div>
                              <div className="flex items-center space-x-2">
                                {script.scriptCode.trim() ? (script.enabled ? (<div className="flex items-center space-x-1 text-green-600 text-sm font-medium">
                                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                      <span>Live</span>
                                    </div>) : (<button_1.Button size="sm" variant="outline" onClick={function () {
                        var newScripts = __spreadArray([], config.scripts.targetingAdvertising, true);
                        newScripts[index].enabled = true;
                        setConfig(function (prev) { return (__assign(__assign({}, prev), { scripts: __assign(__assign({}, prev.scripts), { targetingAdvertising: newScripts }) })); });
                        react_hot_toast_1.toast.success("\"".concat(script.name || 'Script', "\" added to generated code!"));
                    }}>
                                      Add Script
                                    </button_1.Button>)) : null}
                                <button_1.Button variant="ghost" size="sm" onClick={function () {
                    var newScripts = config.scripts.targetingAdvertising.filter(function (_, i) { return i !== index; });
                    setConfig(function (prev) { return (__assign(__assign({}, prev), { scripts: __assign(__assign({}, prev.scripts), { targetingAdvertising: newScripts }) })); });
                }}>
                                  <lucide_react_1.Trash2 className="h-4 w-4"/>
                                </button_1.Button>
                              </div>
                            </div>
                            <div className="px-3 pb-3 space-y-3">
                              {!script.scriptCode.trim() && (<div className="p-3 bg-muted/50 rounded-lg border">
                                  <label_1.Label className="text-xs font-medium mb-2 block">🎯 What are you advertising with?</label_1.Label>
                                  <select_1.Select onValueChange={function (templateKey) {
                        var template = script_templates_1.scriptTemplates[templateKey];
                        if (template) {
                            var newScripts_3 = __spreadArray([], config.scripts.targetingAdvertising, true);
                            newScripts_3[index].name = template.name;
                            setConfig(function (prev) { return (__assign(__assign({}, prev), { scripts: __assign(__assign({}, prev.scripts), { targetingAdvertising: newScripts_3 }) })); });
                        }
                    }}>
                                    <select_1.SelectTrigger className="text-xs h-9">
                                      <select_1.SelectValue placeholder="Select tool (Facebook Pixel, Google Ads, etc.)"/>
                                    </select_1.SelectTrigger>
                                    <select_1.SelectContent>
                                      {Object.entries(script_templates_1.scriptTemplates)
                        .filter(function (_a) {
                        var _ = _a[0], template = _a[1];
                        return template.category === 'targeting-advertising';
                    })
                        .map(function (_a) {
                        var key = _a[0], template = _a[1];
                        return (<select_1.SelectItem key={key} value={key} className="text-xs">
                                            {template.name}
                                          </select_1.SelectItem>);
                    })}
                                    </select_1.SelectContent>
                                  </select_1.Select>
                                  {script.name && script_templates_1.scriptTemplates[Object.keys(script_templates_1.scriptTemplates).find(function (k) { return script_templates_1.scriptTemplates[k].name === script.name; }) || ''] && (<div className="mt-3 p-3 bg-primary/5 border border-primary/20 rounded text-xs space-y-2">
                                      <p className="font-medium text-primary">
                                        📍 Where to find your {script.name} code:
                                      </p>
                                      <p className="text-muted-foreground">
                                        {(_a = script_templates_1.scriptTemplates[Object.keys(script_templates_1.scriptTemplates).find(function (k) { return script_templates_1.scriptTemplates[k].name === script.name; }) || '']) === null || _a === void 0 ? void 0 : _a.instructions}
                                      </p>
                                      <p className="text-muted-foreground">
                                        Copy the tracking code and paste it in the box below.
                                      </p>
                                    </div>)}
                                </div>)}
                              
                              <div>
                                <label_1.Label className="text-xs font-medium mb-2 block">
                                  {script.scriptCode.trim() ? 'Script Code:' : 'Paste your tracking code here:'}
                                </label_1.Label>
                                <textarea value={script.scriptCode} onChange={function (e) {
                    var newScripts = __spreadArray([], config.scripts.targetingAdvertising, true);
                    newScripts[index].scriptCode = e.target.value;
                    setConfig(function (prev) { return (__assign(__assign({}, prev), { scripts: __assign(__assign({}, prev.scripts), { targetingAdvertising: newScripts }) })); });
                }} placeholder={"Paste your ".concat(script.name || 'advertising', " code here...")} className="w-full h-32 p-3 text-xs font-mono border rounded resize-none focus:ring-2 focus:ring-primary"/>
                              </div>
                            </div>
                          </div>);
        })}
                        <button_1.Button variant="outline" size="sm" onClick={function () {
            var newScript = {
                id: "targeting-".concat(Date.now()),
                name: '',
                category: 'targeting-advertising',
                scriptCode: '',
                enabled: true
            };
            setConfig(function (prev) { return (__assign(__assign({}, prev), { scripts: __assign(__assign({}, prev.scripts), { targetingAdvertising: __spreadArray(__spreadArray([], prev.scripts.targetingAdvertising, true), [newScript], false) }) })); });
        }}>
                          <lucide_react_1.Plus className="mr-2 h-4 w-4"/>
                          Add Advertising Script
                        </button_1.Button>
                      </div>
                    </div>
                  </card_1.CardContent>
                </card_1.Card>
              </tabs_1.TabsContent>

              {/* Behavior Tab */}
              <tabs_1.TabsContent value="behavior" className="space-y-6" id="behavior-panel" role="tabpanel" aria-labelledby="behavior-tab">
                <card_1.Card className="relative border-l-4 border-l-cyan-500">
                  <card_1.CardHeader>
                    <div className="flex items-center justify-between">
                      <card_1.CardTitle>Banner Behavior</card_1.CardTitle>
                    </div>
                  </card_1.CardHeader>
                  <card_1.CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <switch_1.Switch id="auto-show" checked={config.behavior.autoShow} onCheckedChange={function (checked) { return updateConfig('behavior', { autoShow: checked }); }}/>
                      <label_1.Label htmlFor="auto-show">Auto-show banner</label_1.Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <switch_1.Switch id="dismiss-scroll" checked={config.behavior.dismissOnScroll} onCheckedChange={function (checked) { return updateConfig('behavior', { dismissOnScroll: checked }); }}/>
                      <label_1.Label htmlFor="dismiss-scroll">Dismiss on scroll</label_1.Label>
                    </div>

                    <div className="relative p-3 rounded-lg bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30 border border-purple-100 dark:border-purple-800">
                      <div className="absolute top-2 right-2">
                      </div>
                      <div className="flex items-center space-x-2 pr-16">
                        <switch_1.Switch id="show-preferences" checked={config.behavior.showPreferences} onCheckedChange={function (checked) { return updateConfig('behavior', { showPreferences: checked }); }}/>
                        <label_1.Label htmlFor="show-preferences" className="font-medium">
                          Show preferences button
                        </label_1.Label>
                      </div>
                      <p className="text-xs text-purple-600 dark:text-purple-400 mt-2 ml-6">
                        ✨ Enables the advanced preferences modal with cookie category toggles
                      </p>
                    </div>

                    <div>
                      <label_1.Label htmlFor="cookie-expiry">Cookie Expiry (days)</label_1.Label>
                      <input_1.Input id="cookie-expiry" type="number" value={config.behavior.cookieExpiry} onChange={function (e) { return updateConfig('behavior', { cookieExpiry: parseInt(e.target.value) }); }} min="1" max="365"/>
                    </div>
                  </card_1.CardContent>
                </card_1.Card>
              </tabs_1.TabsContent>

              {/* Geo-Targeting Tab */}
              <tabs_1.TabsContent value="geo-targeting" className="space-y-6" id="geo-targeting-panel" role="tabpanel" aria-labelledby="geo-targeting-tab">
                {!(0, plan_restrictions_1.canAccessFeature)(userPlan, 'hasGeoTargeting') ? (<upgrade_prompt_1.UpgradePrompt feature="Geo-Targeting" description="Show different consent behavior based on visitor location. Perfect for Quebec Law 25 compliance."/>) : (<>
                    <card_1.Card className="relative border-l-4 border-l-emerald-500">
                      <card_1.CardHeader>
                        <div className="flex items-center justify-between">
                          <card_1.CardTitle className="flex items-center gap-2">
                            <lucide_react_1.Globe className="h-5 w-5"/>
                            Geo-Targeting Rules
                          </card_1.CardTitle>
                          <button_1.Button variant="outline" size="sm" onClick={function () {
                var newRule = {
                    id: crypto.randomUUID(),
                    name: '',
                    country: 'CA',
                    region: '',
                    enabled: true,
                    overrides: {
                        requiresOptIn: true,
                        showRejectButton: true,
                        dismissOnScroll: false,
                        language: 'auto'
                    }
                };
                setConfig(function (prev) { return (__assign(__assign({}, prev), { geoRules: __spreadArray(__spreadArray([], (prev.geoRules || []), true), [newRule], false) })); });
            }}>
                            <lucide_react_1.Plus className="h-4 w-4 mr-1"/> Add Rule
                          </button_1.Button>
                        </div>
                        <card_1.CardDescription>
                          Show different consent behavior based on visitor location. Uses server-side IP detection via Vercel for accurate geo-targeting.
                        </card_1.CardDescription>
                      </card_1.CardHeader>
                      <card_1.CardContent className="space-y-4">
                        {/* Quebec Law 25 Preset */}
                        {!(config.geoRules || []).some(function (r) { return r.country === 'CA' && r.region === 'QC'; }) && (<alert_1.Alert className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30">
                            <alert_1.AlertDescription className="flex items-center justify-between">
                              <span className="text-sm text-amber-900 dark:text-amber-200">
                                <strong>Quebec Law 25</strong> requires strict opt-in consent with French language support.
                              </span>
                              <button_1.Button variant="outline" size="sm" className="ml-4 shrink-0" onClick={function () {
                    var quebecRule = {
                        id: crypto.randomUUID(),
                        name: 'Quebec - Law 25',
                        country: 'CA',
                        region: 'QC',
                        enabled: true,
                        overrides: {
                            requiresOptIn: true,
                            showRejectButton: true,
                            dismissOnScroll: false,
                            language: 'fr'
                        }
                    };
                    setConfig(function (prev) { return (__assign(__assign({}, prev), { geoRules: __spreadArray(__spreadArray([], (prev.geoRules || []), true), [quebecRule], false) })); });
                }}>
                                Add Quebec Rule
                              </button_1.Button>
                            </alert_1.AlertDescription>
                          </alert_1.Alert>)}

                        {(!config.geoRules || config.geoRules.length === 0) && (<div className="text-center py-8 text-muted-foreground">
                            <lucide_react_1.Globe className="h-10 w-10 mx-auto mb-3 opacity-30"/>
                            <p className="text-sm">No geo-targeting rules configured.</p>
                            <p className="text-xs mt-1">Your banner will show the same behavior to all visitors.</p>
                          </div>)}

                        {(config.geoRules || []).map(function (rule, index) {
                var isDuplicate = (config.geoRules || []).some(function (other) {
                    return other.id !== rule.id && other.country === rule.country && (other.region || '') === (rule.region || '');
                });
                return (<card_1.Card key={rule.id} className={"border ".concat(isDuplicate ? 'border-amber-400' : '')}>
                            <card_1.CardContent className="pt-4 space-y-4">
                              {isDuplicate && (<alert_1.Alert className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30 py-2">
                                  <alert_1.AlertDescription className="text-xs text-amber-700 dark:text-amber-300">
                                    Duplicate rule — another rule targets the same country/region. Only the first matching rule will apply.
                                  </alert_1.AlertDescription>
                                </alert_1.Alert>)}
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <switch_1.Switch checked={rule.enabled} onCheckedChange={function (checked) {
                        setConfig(function (prev) { return (__assign(__assign({}, prev), { geoRules: (prev.geoRules || []).map(function (r) {
                                return r.id === rule.id ? __assign(__assign({}, r), { enabled: checked }) : r;
                            }) })); });
                    }}/>
                                  <input_1.Input value={rule.name} onChange={function (e) {
                        setConfig(function (prev) { return (__assign(__assign({}, prev), { geoRules: (prev.geoRules || []).map(function (r) {
                                return r.id === rule.id ? __assign(__assign({}, r), { name: e.target.value }) : r;
                            }) })); });
                    }} placeholder="Rule name (e.g., Quebec - Law 25)" className="max-w-[250px]"/>
                                </div>
                                <button_1.Button variant="ghost" size="sm" onClick={function () {
                        setConfig(function (prev) { return (__assign(__assign({}, prev), { geoRules: (prev.geoRules || []).filter(function (r) { return r.id !== rule.id; }) })); });
                    }}>
                                  <lucide_react_1.Trash2 className="h-4 w-4 text-destructive"/>
                                </button_1.Button>
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label_1.Label>Country</label_1.Label>
                                  <select_1.Select value={rule.country} onValueChange={function (value) {
                        setConfig(function (prev) { return (__assign(__assign({}, prev), { geoRules: (prev.geoRules || []).map(function (r) {
                                return r.id === rule.id ? __assign(__assign({}, r), { country: value, region: '' }) : r;
                            }) })); });
                    }}>
                                    <select_1.SelectTrigger><select_1.SelectValue /></select_1.SelectTrigger>
                                    <select_1.SelectContent>
                                      <select_1.SelectItem value="CA">Canada</select_1.SelectItem>
                                      <select_1.SelectItem value="US">United States</select_1.SelectItem>
                                      <select_1.SelectItem value="GB">United Kingdom</select_1.SelectItem>
                                      <select_1.SelectItem value="DE">Germany</select_1.SelectItem>
                                      <select_1.SelectItem value="FR">France</select_1.SelectItem>
                                      <select_1.SelectItem value="AU">Australia</select_1.SelectItem>
                                    </select_1.SelectContent>
                                  </select_1.Select>
                                </div>
                                <div>
                                  <label_1.Label>Region (optional)</label_1.Label>
                                  {rule.country === 'CA' ? (<select_1.Select value={rule.region || '__none__'} onValueChange={function (value) {
                            setConfig(function (prev) { return (__assign(__assign({}, prev), { geoRules: (prev.geoRules || []).map(function (r) {
                                    return r.id === rule.id ? __assign(__assign({}, r), { region: value === '__none__' ? '' : value }) : r;
                                }) })); });
                        }}>
                                      <select_1.SelectTrigger><select_1.SelectValue /></select_1.SelectTrigger>
                                      <select_1.SelectContent>
                                        <select_1.SelectItem value="__none__">All regions</select_1.SelectItem>
                                        <select_1.SelectItem value="QC">Quebec</select_1.SelectItem>
                                        <select_1.SelectItem value="ON">Ontario</select_1.SelectItem>
                                        <select_1.SelectItem value="BC">British Columbia</select_1.SelectItem>
                                        <select_1.SelectItem value="AB">Alberta</select_1.SelectItem>
                                        <select_1.SelectItem value="SK">Saskatchewan</select_1.SelectItem>
                                        <select_1.SelectItem value="MB">Manitoba</select_1.SelectItem>
                                        <select_1.SelectItem value="NB">New Brunswick</select_1.SelectItem>
                                        <select_1.SelectItem value="NS">Nova Scotia</select_1.SelectItem>
                                        <select_1.SelectItem value="PE">Prince Edward Island</select_1.SelectItem>
                                        <select_1.SelectItem value="NL">Newfoundland and Labrador</select_1.SelectItem>
                                      </select_1.SelectContent>
                                    </select_1.Select>) : (<input_1.Input value={rule.region || ''} onChange={function (e) {
                            setConfig(function (prev) { return (__assign(__assign({}, prev), { geoRules: (prev.geoRules || []).map(function (r) {
                                    return r.id === rule.id ? __assign(__assign({}, r), { region: e.target.value.toUpperCase().slice(0, 3) }) : r;
                                }) })); });
                        }} placeholder="e.g., CA, NY, TX" maxLength={3}/>)}
                                </div>
                              </div>

                              <div className="space-y-3 pt-2 border-t">
                                <label_1.Label className="text-xs font-semibold uppercase text-muted-foreground">Overrides for this region</label_1.Label>

                                <div className="flex items-center justify-between">
                                  <div>
                                    <label_1.Label className="text-sm">Require strict opt-in</label_1.Label>
                                    <p className="text-xs text-muted-foreground">Hides close button, forces explicit accept/reject</p>
                                  </div>
                                  <switch_1.Switch checked={rule.overrides.requiresOptIn} onCheckedChange={function (checked) {
                        setConfig(function (prev) { return (__assign(__assign({}, prev), { geoRules: (prev.geoRules || []).map(function (r) {
                                return r.id === rule.id ? __assign(__assign({}, r), { overrides: __assign(__assign(__assign({}, r.overrides), { requiresOptIn: checked }), (checked ? { showRejectButton: true, dismissOnScroll: false } : {})) }) : r;
                            }) })); });
                    }}/>
                                </div>

                                <div className="flex items-center justify-between">
                                  <div>
                                    <label_1.Label className="text-sm">Show reject button</label_1.Label>
                                    <p className="text-xs text-muted-foreground">Always show reject option for this region</p>
                                  </div>
                                  <switch_1.Switch checked={rule.overrides.showRejectButton} disabled={rule.overrides.requiresOptIn} onCheckedChange={function (checked) {
                        setConfig(function (prev) { return (__assign(__assign({}, prev), { geoRules: (prev.geoRules || []).map(function (r) {
                                return r.id === rule.id ? __assign(__assign({}, r), { overrides: __assign(__assign({}, r.overrides), { showRejectButton: checked }) }) : r;
                            }) })); });
                    }}/>
                                </div>

                                <div className="flex items-center justify-between">
                                  <div>
                                    <label_1.Label className="text-sm">Allow dismiss on scroll</label_1.Label>
                                    <p className="text-xs text-muted-foreground">Let visitors dismiss banner by scrolling</p>
                                  </div>
                                  <switch_1.Switch checked={rule.overrides.dismissOnScroll} disabled={rule.overrides.requiresOptIn} onCheckedChange={function (checked) {
                        setConfig(function (prev) { return (__assign(__assign({}, prev), { geoRules: (prev.geoRules || []).map(function (r) {
                                return r.id === rule.id ? __assign(__assign({}, r), { overrides: __assign(__assign({}, r.overrides), { dismissOnScroll: checked }) }) : r;
                            }) })); });
                    }}/>
                                </div>

                                <div>
                                  <label_1.Label className="text-sm">Language override</label_1.Label>
                                  <select_1.Select value={rule.overrides.language || 'auto'} onValueChange={function (value) {
                        setConfig(function (prev) { return (__assign(__assign({}, prev), { geoRules: (prev.geoRules || []).map(function (r) {
                                return r.id === rule.id ? __assign(__assign({}, r), { overrides: __assign(__assign({}, r.overrides), { language: value }) }) : r;
                            }) })); });
                    }}>
                                    <select_1.SelectTrigger className="w-[180px]"><select_1.SelectValue /></select_1.SelectTrigger>
                                    <select_1.SelectContent>
                                      <select_1.SelectItem value="auto">Auto-detect</select_1.SelectItem>
                                      <select_1.SelectItem value="en">English</select_1.SelectItem>
                                      <select_1.SelectItem value="es">Spanish</select_1.SelectItem>
                                      <select_1.SelectItem value="fr">French</select_1.SelectItem>
                                      <select_1.SelectItem value="de">German</select_1.SelectItem>
                                      <select_1.SelectItem value="pt">Portuguese</select_1.SelectItem>
                                      <select_1.SelectItem value="ja">Japanese</select_1.SelectItem>
                                      <select_1.SelectItem value="zh">Chinese</select_1.SelectItem>
                                      <select_1.SelectItem value="ko">Korean</select_1.SelectItem>
                                      <select_1.SelectItem value="ar">Arabic</select_1.SelectItem>
                                      <select_1.SelectItem value="hi">Hindi</select_1.SelectItem>
                                      <select_1.SelectItem value="nl">Dutch</select_1.SelectItem>
                                      <select_1.SelectItem value="sv">Swedish</select_1.SelectItem>
                                      <select_1.SelectItem value="nb">Norwegian</select_1.SelectItem>
                                      <select_1.SelectItem value="da">Danish</select_1.SelectItem>
                                      <select_1.SelectItem value="it">Italian</select_1.SelectItem>
                                      <select_1.SelectItem value="fi">Finnish</select_1.SelectItem>
                                    </select_1.SelectContent>
                                  </select_1.Select>
                                </div>
                              </div>
                            </card_1.CardContent>
                          </card_1.Card>);
            })}
                      </card_1.CardContent>
                    </card_1.Card>

                    <alert_1.Alert>
                      <lucide_react_1.Info className="h-4 w-4"/>
                      <alert_1.AlertDescription className="text-xs">
                        Geo-targeting uses Vercel&apos;s server-side IP detection headers. Rules are matched from most specific (country + region) to least specific (country only). When no rule matches, your default banner behavior is used. In local development, geo headers are not available so rules will not match.
                      </alert_1.AlertDescription>
                    </alert_1.Alert>
                  </>)}
              </tabs_1.TabsContent>

              {/* Performance Tab */}
              <tabs_1.TabsContent value="performance" className="space-y-6">
                <card_1.Card>
                  <card_1.CardHeader>
                    <card_1.CardTitle className="flex items-center">
                      <lucide_react_1.BarChart3 className="mr-2 h-5 w-5"/>
                      Performance Optimization
                    </card_1.CardTitle>
                  </card_1.CardHeader>
                  <card_1.CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <label_1.Label htmlFor="defer-scripts" className="text-sm font-medium">
                            Defer Non-Critical Scripts
                          </label_1.Label>
                          <p className="text-xs text-muted-foreground">
                            Load analytics and marketing scripts after page load
                          </p>
                        </div>
                        <switch_1.Switch id="defer-scripts" checked={(_77 = (_76 = config.advanced.performance) === null || _76 === void 0 ? void 0 : _76.deferNonCriticalScripts) !== null && _77 !== void 0 ? _77 : true} onCheckedChange={function (checked) {
            return updateConfig('advanced', {
                performance: __assign(__assign({}, (config.advanced.performance || {})), { deferNonCriticalScripts: checked })
            });
        }}/>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <label_1.Label htmlFor="idle-callback" className="text-sm font-medium">
                            Use RequestIdleCallback
                          </label_1.Label>
                          <p className="text-xs text-muted-foreground">
                            Load scripts during browser idle time for better performance
                          </p>
                        </div>
                        <switch_1.Switch id="idle-callback" checked={(_79 = (_78 = config.advanced.performance) === null || _78 === void 0 ? void 0 : _78.useRequestIdleCallback) !== null && _79 !== void 0 ? _79 : true} onCheckedChange={function (checked) {
            return updateConfig('advanced', {
                performance: __assign(__assign({}, (config.advanced.performance || {})), { useRequestIdleCallback: checked })
            });
        }}/>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <label_1.Label htmlFor="lazy-analytics" className="text-sm font-medium">
                            Lazy Load Analytics
                          </label_1.Label>
                          <p className="text-xs text-muted-foreground">
                            Delay analytics scripts until user interaction
                          </p>
                        </div>
                        <switch_1.Switch id="lazy-analytics" checked={(_81 = (_80 = config.advanced.performance) === null || _80 === void 0 ? void 0 : _80.lazyLoadAnalytics) !== null && _81 !== void 0 ? _81 : true} onCheckedChange={function (checked) {
            return updateConfig('advanced', {
                performance: __assign(__assign({}, (config.advanced.performance || {})), { lazyLoadAnalytics: checked })
            });
        }}/>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <label_1.Label htmlFor="inline-css" className="text-sm font-medium">
                            Inline Critical CSS
                          </label_1.Label>
                          <p className="text-xs text-muted-foreground">
                            Prevent render-blocking by inlining banner styles
                          </p>
                        </div>
                        <switch_1.Switch id="inline-css" checked={(_83 = (_82 = config.advanced.performance) === null || _82 === void 0 ? void 0 : _82.inlineCriticalCSS) !== null && _83 !== void 0 ? _83 : true} onCheckedChange={function (checked) {
            return updateConfig('advanced', {
                performance: __assign(__assign({}, (config.advanced.performance || {})), { inlineCriticalCSS: checked })
            });
        }}/>
                      </div>
                    </div>

                    <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
                      <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-2">Performance Benefits</h4>
                      <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
                        <li>• <strong>Faster LCP:</strong> Deferred scripts don't block page rendering</li>
                        <li>• <strong>Better INP:</strong> Scripts load during idle time</li>
                        <li>• <strong>Reduced CLS:</strong> Inline CSS prevents layout shifts</li>
                        <li>• <strong>Improved TTFB:</strong> Non-blocking script loading</li>
                      </ul>
                    </div>
                  </card_1.CardContent>
                </card_1.Card>
              </tabs_1.TabsContent>

              {/* Advanced Tab */}
              <tabs_1.TabsContent value="advanced" className="space-y-6">
                <card_1.Card>
                  <card_1.CardHeader>
                    <card_1.CardTitle>Advanced Settings</card_1.CardTitle>
                  </card_1.CardHeader>
                  <card_1.CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <switch_1.Switch id="google-consent" checked={config.advanced.googleConsentMode} onCheckedChange={function (checked) { return updateConfig('advanced', { googleConsentMode: checked }); }}/>
                      <label_1.Label htmlFor="google-consent">Enable Google Consent Mode v2</label_1.Label>
                    </div>

                    {/* Google Analytics 4 Configuration */}
                    <div className="space-y-4 p-4 border rounded-lg bg-blue-50 dark:bg-blue-950/30 dark:border-blue-800">
                      <div className="flex items-center gap-2">
                        <lucide_react_1.BarChart3 className="w-5 h-5 text-blue-600 dark:text-blue-400"/>
                        <h3 className="font-semibold text-blue-900 dark:text-blue-300">Google Analytics 4</h3>
                      </div>

                      {!(0, plan_restrictions_1.canAccessFeature)(userPlan, 'hasGA4Integration') ? (<upgrade_prompt_1.UpgradePrompt feature="GA4 Integration" description="Connect Google Analytics 4 to track consent events and impressions" variant="inline"/>) : (<>
                      <div className="flex items-center space-x-2">
                        <switch_1.Switch id="ga4-enabled" checked={(_86 = (_85 = (_84 = config.integrations) === null || _84 === void 0 ? void 0 : _84.googleAnalytics) === null || _85 === void 0 ? void 0 : _85.enabled) !== null && _86 !== void 0 ? _86 : false} onCheckedChange={function (checked) {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j;
                return updateConfig('integrations', __assign(__assign({}, config.integrations), { googleAnalytics: __assign(__assign({}, (_a = config.integrations) === null || _a === void 0 ? void 0 : _a.googleAnalytics), { enabled: checked, measurementId: ((_c = (_b = config.integrations) === null || _b === void 0 ? void 0 : _b.googleAnalytics) === null || _c === void 0 ? void 0 : _c.measurementId) || '', trackConsentEvents: (_f = (_e = (_d = config.integrations) === null || _d === void 0 ? void 0 : _d.googleAnalytics) === null || _e === void 0 ? void 0 : _e.trackConsentEvents) !== null && _f !== void 0 ? _f : true, anonymizeIp: (_j = (_h = (_g = config.integrations) === null || _g === void 0 ? void 0 : _g.googleAnalytics) === null || _h === void 0 ? void 0 : _h.anonymizeIp) !== null && _j !== void 0 ? _j : true }) }));
            }}/>
                        <label_1.Label htmlFor="ga4-enabled">Enable GA4 Tracking</label_1.Label>
                      </div>

                      {((_89 = (_88 = (_87 = config.integrations) === null || _87 === void 0 ? void 0 : _87.googleAnalytics) === null || _88 === void 0 ? void 0 : _88.enabled) !== null && _89 !== void 0 ? _89 : false) && (<div className="space-y-3 pl-6">
                          <div>
                            <label_1.Label htmlFor="ga4-measurement-id" className="text-sm font-medium">
                              Measurement ID
                            </label_1.Label>
                            <input_1.Input id="ga4-measurement-id" placeholder="G-XXXXXXXXXX" value={(_92 = (_91 = (_90 = config.integrations) === null || _90 === void 0 ? void 0 : _90.googleAnalytics) === null || _91 === void 0 ? void 0 : _91.measurementId) !== null && _92 !== void 0 ? _92 : ''} onChange={function (e) {
                    var _a;
                    return updateConfig('integrations', __assign(__assign({}, config.integrations), { googleAnalytics: __assign(__assign({}, (_a = config.integrations) === null || _a === void 0 ? void 0 : _a.googleAnalytics), { measurementId: e.target.value.toUpperCase() }) }));
                }} className="font-mono mt-1"/>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <switch_1.Switch id="ga4-track-events" checked={(_95 = (_94 = (_93 = config.integrations) === null || _93 === void 0 ? void 0 : _93.googleAnalytics) === null || _94 === void 0 ? void 0 : _94.trackConsentEvents) !== null && _95 !== void 0 ? _95 : true} onCheckedChange={function (checked) {
                    var _a;
                    return updateConfig('integrations', __assign(__assign({}, config.integrations), { googleAnalytics: __assign(__assign({}, (_a = config.integrations) === null || _a === void 0 ? void 0 : _a.googleAnalytics), { trackConsentEvents: checked }) }));
                }}/>
                              <label_1.Label htmlFor="ga4-track-events" className="text-sm">
                                Track Consent Events
                              </label_1.Label>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <switch_1.Switch id="ga4-track-impressions" checked={(_98 = (_97 = (_96 = config.integrations) === null || _96 === void 0 ? void 0 : _96.googleAnalytics) === null || _97 === void 0 ? void 0 : _97.trackImpressions) !== null && _98 !== void 0 ? _98 : true} onCheckedChange={function (checked) {
                    var _a;
                    return updateConfig('integrations', __assign(__assign({}, config.integrations), { googleAnalytics: __assign(__assign({}, (_a = config.integrations) === null || _a === void 0 ? void 0 : _a.googleAnalytics), { trackImpressions: checked }) }));
                }}/>
                              <label_1.Label htmlFor="ga4-track-impressions" className="text-sm">
                                Track Banner Impressions
                              </label_1.Label>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <switch_1.Switch id="ga4-anonymize-ip" checked={(_101 = (_100 = (_99 = config.integrations) === null || _99 === void 0 ? void 0 : _99.googleAnalytics) === null || _100 === void 0 ? void 0 : _100.anonymizeIp) !== null && _101 !== void 0 ? _101 : true} onCheckedChange={function (checked) {
                    var _a;
                    return updateConfig('integrations', __assign(__assign({}, config.integrations), { googleAnalytics: __assign(__assign({}, (_a = config.integrations) === null || _a === void 0 ? void 0 : _a.googleAnalytics), { anonymizeIp: checked }) }));
                }}/>
                              <label_1.Label htmlFor="ga4-anonymize-ip" className="text-sm">
                                Anonymize IP Addresses
                              </label_1.Label>
                            </div>
                          </div>
                        </div>)}
                      </>)}
                    </div>

                    {/* IAB TCF 2.2 */}
                    <div className="space-y-4 p-4 border rounded-lg bg-purple-50 dark:bg-purple-950/30 dark:border-purple-800">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <lucide_react_1.Shield className="w-5 h-5 text-purple-600 dark:text-purple-400"/>
                          <div>
                            <h3 className="font-semibold text-purple-900 dark:text-purple-300">IAB TCF 2.2</h3>
                            <p className="text-xs text-muted-foreground">Transparency & Consent Framework for ad tech compliance</p>
                          </div>
                        </div>
                        {!(0, plan_restrictions_1.canAccessFeature)(userPlan, 'hasTcfSupport') && (<badge_1.Badge variant="secondary" className="text-xs">Pro</badge_1.Badge>)}
                      </div>

                      {!(0, plan_restrictions_1.canAccessFeature)(userPlan, 'hasTcfSupport') ? (<upgrade_prompt_1.UpgradePrompt feature="IAB TCF 2.2" description="Enable IAB Transparency & Consent Framework for programmatic advertising compliance" variant="inline"/>) : (<tcf_config_panel_1.TCFConfigPanel config={((_102 = config.integrations) === null || _102 === void 0 ? void 0 : _102.tcf) || {
                enabled: false,
                cmpId: 0,
                cmpVersion: 1,
                publisherCountryCode: 'CA',
                purposeIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                specialFeatureIds: [],
                vendorIds: [],
                publisherRestrictions: [],
                showVendorList: true,
                storeConsentGlobally: false,
            }} onChange={function (tcfUpdates) {
                var _a;
                return updateConfig('integrations', __assign(__assign({}, config.integrations), { tcf: __assign(__assign({}, (_a = config.integrations) === null || _a === void 0 ? void 0 : _a.tcf), tcfUpdates) }));
            }}/>)}
                    </div>

                    <div>
                      <label_1.Label htmlFor="custom-css">Custom CSS</label_1.Label>
                      <textarea id="custom-css" className="w-full h-32 p-3 border rounded-md font-mono text-sm" value={config.advanced.customCSS} onChange={function (e) { return updateConfig('advanced', { customCSS: e.target.value }); }} placeholder="/* Custom CSS styles */"/>
                    </div>

                    <div>
                      <label_1.Label htmlFor="custom-js">Custom JavaScript</label_1.Label>
                      <textarea id="custom-js" className="w-full h-32 p-3 border rounded-md font-mono text-sm" value={config.advanced.customJS} onChange={function (e) { return updateConfig('advanced', { customJS: e.target.value }); }} placeholder="// Custom JavaScript code"/>
                    </div>
                  </card_1.CardContent>
                </card_1.Card>
              </tabs_1.TabsContent>

              {/* Analytics Tab */}
              <tabs_1.TabsContent value="analytics" className="space-y-6" id="analytics-panel" role="tabpanel" aria-labelledby="analytics-tab">
                {/* GA4 Events Reference */}
                <card_1.Card className="border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-950/30 dark:to-indigo-950/30 border-l-4 border-l-rose-500">
                  <card_1.CardHeader className="pb-3">
                    <card_1.CardTitle className="flex items-center text-base">
                      <lucide_react_1.Info className="mr-2 h-4 w-4 text-blue-600"/>
                      Events Sent to Google Analytics 4
                    </card_1.CardTitle>
                    <card_1.CardDescription>
                      Hover over each event to see what it tracks. These fire automatically when visitors interact with your banner.
                    </card_1.CardDescription>
                  </card_1.CardHeader>
                  <card_1.CardContent>
                    <div className="flex flex-wrap gap-2">
                      <tooltip_1.Tooltip>
                        <tooltip_1.TooltipTrigger asChild>
                          <span className="inline-flex items-center gap-1.5 cursor-help text-xs font-semibold bg-green-100 dark:bg-green-950/50 text-green-800 dark:text-green-300 px-2.5 py-1.5 rounded-md border border-green-200 dark:border-green-800 hover:bg-green-150 transition-colors">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500"/>
                            cookie_consent
                          </span>
                        </tooltip_1.TooltipTrigger>
                        <tooltip_1.TooltipContent side="bottom" className="max-w-xs">
                          <p className="font-semibold mb-1">Consent Decision</p>
                          <p className="text-xs">Fires when a user clicks Accept All, Reject All, or dismisses the banner. Includes <code className="bg-muted px-1 rounded text-[10px]">event_label: accept | reject | dismiss</code> so you can measure opt-in vs opt-out rates.</p>
                        </tooltip_1.TooltipContent>
                      </tooltip_1.Tooltip>
                      <tooltip_1.Tooltip>
                        <tooltip_1.TooltipTrigger asChild>
                          <span className="inline-flex items-center gap-1.5 cursor-help text-xs font-semibold bg-purple-100 dark:bg-purple-950/50 text-purple-800 dark:text-purple-300 px-2.5 py-1.5 rounded-md border border-purple-200 dark:border-purple-800 hover:bg-purple-150 transition-colors">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-500"/>
                            banner_impression
                          </span>
                        </tooltip_1.TooltipTrigger>
                        <tooltip_1.TooltipContent side="bottom" className="max-w-xs">
                          <p className="font-semibold mb-1">Banner View</p>
                          <p className="text-xs">Fires each time the consent banner is shown to a visitor. Divide accepts by impressions to get your consent rate.</p>
                        </tooltip_1.TooltipContent>
                      </tooltip_1.Tooltip>
                      <tooltip_1.Tooltip>
                        <tooltip_1.TooltipTrigger asChild>
                          <span className="inline-flex items-center gap-1.5 cursor-help text-xs font-semibold bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 px-2.5 py-1.5 rounded-md border border-amber-200 dark:border-amber-800 hover:bg-amber-150 transition-colors">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"/>
                            cookie_consent_update
                          </span>
                        </tooltip_1.TooltipTrigger>
                        <tooltip_1.TooltipContent side="bottom" className="max-w-xs">
                          <p className="font-semibold mb-1">Consent Mode v2 Update</p>
                          <p className="text-xs">Pushed to the dataLayer when preferences change. Includes <code className="bg-muted px-1 rounded text-[10px]">analytics_storage</code>, <code className="bg-muted px-1 rounded text-[10px]">ad_storage</code>, and <code className="bg-muted px-1 rounded text-[10px]">ad_personalization</code> status. Works with Google Consent Mode v2.</p>
                        </tooltip_1.TooltipContent>
                      </tooltip_1.Tooltip>
                    </div>
                    <p className="text-xs text-muted-foreground mt-3">
                      All events work with GA4 Explorations, Audiences, and Looker Studio.
                    </p>
                  </card_1.CardContent>
                </card_1.Card>

                {!(0, plan_restrictions_1.canAccessFeature)(userPlan, 'hasGA4Integration') ? (<upgrade_prompt_1.UpgradePrompt feature="GA4 Analytics Integration" description="Connect Google Analytics 4 to track the events above automatically" variant="card"/>) : (<card_1.Card>
                  <card_1.CardHeader>
                    <card_1.CardTitle className="flex items-center">
                      <lucide_react_1.BarChart3 className="mr-2 h-5 w-5"/>
                      Analytics Configuration
                    </card_1.CardTitle>
                    <card_1.CardDescription>
                      View and verify your Google Analytics 4 integration settings
                    </card_1.CardDescription>
                  </card_1.CardHeader>
                  <card_1.CardContent className="space-y-6">
                    {/* GA4 Status */}
                    <div className={"p-4 rounded-lg border ".concat(((_104 = (_103 = config.integrations) === null || _103 === void 0 ? void 0 : _103.googleAnalytics) === null || _104 === void 0 ? void 0 : _104.measurementId) ? 'bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-950/30 dark:to-green-950/30 border-green-200 dark:border-green-800' : 'bg-gradient-to-r from-blue-50 to-muted dark:from-blue-950/30 dark:to-muted border-border')}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={"w-3 h-3 rounded-full ".concat(((_106 = (_105 = config.integrations) === null || _105 === void 0 ? void 0 : _105.googleAnalytics) === null || _106 === void 0 ? void 0 : _106.measurementId) ? 'bg-green-500' : 'bg-yellow-500')}></div>
                          <div>
                            <h3 className="font-semibold text-foreground">Google Analytics 4</h3>
                            <p className="text-sm text-muted-foreground">
                              {((_108 = (_107 = config.integrations) === null || _107 === void 0 ? void 0 : _107.googleAnalytics) === null || _108 === void 0 ? void 0 : _108.measurementId)
                ? '✅ Configured and ready'
                : '⚠️ Add your Measurement ID below'}
                            </p>
                          </div>
                        </div>
                        <badge_1.Badge variant={((_110 = (_109 = config.integrations) === null || _109 === void 0 ? void 0 : _109.googleAnalytics) === null || _110 === void 0 ? void 0 : _110.measurementId) ? 'default' : 'secondary'}>
                          {((_112 = (_111 = config.integrations) === null || _111 === void 0 ? void 0 : _111.googleAnalytics) === null || _112 === void 0 ? void 0 : _112.measurementId) ? 'Configured' : 'Not Set'}
                        </badge_1.Badge>
                      </div>
                    </div>

                    {/* GA4 Configuration Input */}
                    <div className="space-y-4">
                      <div>
                        <label_1.Label htmlFor="ga4-measurement-id" className="text-sm font-medium">
                          Measurement ID
                        </label_1.Label>
                        <div className="flex items-center space-x-2 mt-1">
                          <input_1.Input id="ga4-measurement-id" placeholder="G-XXXXXXXXXX" value={((_114 = (_113 = config.integrations) === null || _113 === void 0 ? void 0 : _113.googleAnalytics) === null || _114 === void 0 ? void 0 : _114.measurementId) || ''} onChange={function (e) {
                var _a, _b, _c, _d, _e, _f, _g;
                return updateConfig('integrations', __assign(__assign({}, config.integrations), { googleAnalytics: __assign(__assign({}, (_a = config.integrations) === null || _a === void 0 ? void 0 : _a.googleAnalytics), { enabled: e.target.value.trim().length > 0, measurementId: e.target.value.toUpperCase(), trackConsentEvents: (_d = (_c = (_b = config.integrations) === null || _b === void 0 ? void 0 : _b.googleAnalytics) === null || _c === void 0 ? void 0 : _c.trackConsentEvents) !== null && _d !== void 0 ? _d : true, anonymizeIp: (_g = (_f = (_e = config.integrations) === null || _e === void 0 ? void 0 : _e.googleAnalytics) === null || _f === void 0 ? void 0 : _f.anonymizeIp) !== null && _g !== void 0 ? _g : true }) }));
            }} className="font-mono"/>
                          <button_1.Button variant="outline" size="sm" onClick={function () {
                var _a, _b;
                var measurementId = ((_b = (_a = config.integrations) === null || _a === void 0 ? void 0 : _a.googleAnalytics) === null || _b === void 0 ? void 0 : _b.measurementId) || '';
                if (measurementId) {
                    navigator.clipboard.writeText(measurementId);
                    react_hot_toast_1.toast.success('Measurement ID copied to clipboard!');
                }
                else {
                    react_hot_toast_1.toast.error('No Measurement ID to copy');
                }
            }} disabled={!((_116 = (_115 = config.integrations) === null || _115 === void 0 ? void 0 : _115.googleAnalytics) === null || _116 === void 0 ? void 0 : _116.measurementId)}>
                            <lucide_react_1.Code className="h-4 w-4 mr-1"/>
                            Copy
                          </button_1.Button>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Enter your Google Analytics 4 Measurement ID (starts with G-)
                        </p>
                      </div>

                      {/* Advanced Settings */}
                      <div className="space-y-3">
                        <label_1.Label className="text-sm font-medium">Advanced Settings</label_1.Label>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center space-x-2">
                            <switch_1.Switch id="ga4-track-events" checked={(_119 = (_118 = (_117 = config.integrations) === null || _117 === void 0 ? void 0 : _117.googleAnalytics) === null || _118 === void 0 ? void 0 : _118.trackConsentEvents) !== null && _119 !== void 0 ? _119 : true} onCheckedChange={function (checked) {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
                return updateConfig('integrations', __assign(__assign({}, config.integrations), { googleAnalytics: __assign(__assign({}, (_a = config.integrations) === null || _a === void 0 ? void 0 : _a.googleAnalytics), { enabled: (_d = (_c = (_b = config.integrations) === null || _b === void 0 ? void 0 : _b.googleAnalytics) === null || _c === void 0 ? void 0 : _c.enabled) !== null && _d !== void 0 ? _d : false, measurementId: ((_f = (_e = config.integrations) === null || _e === void 0 ? void 0 : _e.googleAnalytics) === null || _f === void 0 ? void 0 : _f.measurementId) || '', trackConsentEvents: checked, trackImpressions: (_j = (_h = (_g = config.integrations) === null || _g === void 0 ? void 0 : _g.googleAnalytics) === null || _h === void 0 ? void 0 : _h.trackImpressions) !== null && _j !== void 0 ? _j : true, anonymizeIp: (_m = (_l = (_k = config.integrations) === null || _k === void 0 ? void 0 : _k.googleAnalytics) === null || _l === void 0 ? void 0 : _l.anonymizeIp) !== null && _m !== void 0 ? _m : true }) }));
            }}/>
                            <label_1.Label htmlFor="ga4-track-events" className="text-sm">
                              Track Consent Events
                            </label_1.Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <switch_1.Switch id="ga4-track-impressions-2" checked={(_122 = (_121 = (_120 = config.integrations) === null || _120 === void 0 ? void 0 : _120.googleAnalytics) === null || _121 === void 0 ? void 0 : _121.trackImpressions) !== null && _122 !== void 0 ? _122 : true} onCheckedChange={function (checked) {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
                return updateConfig('integrations', __assign(__assign({}, config.integrations), { googleAnalytics: __assign(__assign({}, (_a = config.integrations) === null || _a === void 0 ? void 0 : _a.googleAnalytics), { enabled: (_d = (_c = (_b = config.integrations) === null || _b === void 0 ? void 0 : _b.googleAnalytics) === null || _c === void 0 ? void 0 : _c.enabled) !== null && _d !== void 0 ? _d : false, measurementId: ((_f = (_e = config.integrations) === null || _e === void 0 ? void 0 : _e.googleAnalytics) === null || _f === void 0 ? void 0 : _f.measurementId) || '', trackConsentEvents: (_j = (_h = (_g = config.integrations) === null || _g === void 0 ? void 0 : _g.googleAnalytics) === null || _h === void 0 ? void 0 : _h.trackConsentEvents) !== null && _j !== void 0 ? _j : true, trackImpressions: checked, anonymizeIp: (_m = (_l = (_k = config.integrations) === null || _k === void 0 ? void 0 : _k.googleAnalytics) === null || _l === void 0 ? void 0 : _l.anonymizeIp) !== null && _m !== void 0 ? _m : true }) }));
            }}/>
                            <label_1.Label htmlFor="ga4-track-impressions-2" className="text-sm">
                              Track Banner Impressions
                            </label_1.Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <switch_1.Switch id="ga4-anonymize-ip" checked={(_125 = (_124 = (_123 = config.integrations) === null || _123 === void 0 ? void 0 : _123.googleAnalytics) === null || _124 === void 0 ? void 0 : _124.anonymizeIp) !== null && _125 !== void 0 ? _125 : true} onCheckedChange={function (checked) {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
                return updateConfig('integrations', __assign(__assign({}, config.integrations), { googleAnalytics: __assign(__assign({}, (_a = config.integrations) === null || _a === void 0 ? void 0 : _a.googleAnalytics), { enabled: (_d = (_c = (_b = config.integrations) === null || _b === void 0 ? void 0 : _b.googleAnalytics) === null || _c === void 0 ? void 0 : _c.enabled) !== null && _d !== void 0 ? _d : false, measurementId: ((_f = (_e = config.integrations) === null || _e === void 0 ? void 0 : _e.googleAnalytics) === null || _f === void 0 ? void 0 : _f.measurementId) || '', trackConsentEvents: (_j = (_h = (_g = config.integrations) === null || _g === void 0 ? void 0 : _g.googleAnalytics) === null || _h === void 0 ? void 0 : _h.trackConsentEvents) !== null && _j !== void 0 ? _j : true, trackImpressions: (_m = (_l = (_k = config.integrations) === null || _k === void 0 ? void 0 : _k.googleAnalytics) === null || _l === void 0 ? void 0 : _l.trackImpressions) !== null && _m !== void 0 ? _m : true, anonymizeIp: checked }) }));
            }}/>
                            <label_1.Label htmlFor="ga4-anonymize-ip" className="text-sm">
                              Anonymize IP Addresses
                            </label_1.Label>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Generated Code Preview */}
                    <div>
                      <label_1.Label className="text-sm font-medium mb-2 block">Generated Code Preview</label_1.Label>
                      <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                        <div className="text-green-400 mb-2"> // Main Banner Script</div>
        // Main Banner Script</div>
                        <div className="text-blue-400">{"<script src=\"".concat(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000', "/api/v1/banner.js?id=").concat(bannerId || ((_126 = session === null || session === void 0 ? void 0 : session.user) === null || _126 === void 0 ? void 0 : _126.id), "\"></script>")}</div>
                        
                        {((_128 = (_127 = config.integrations) === null || _127 === void 0 ? void 0 : _127.googleAnalytics) === null || _128 === void 0 ? void 0 : _128.measurementId) && (<>
                            <div className="text-green-400 mt-4 mb-2"> // Google Analytics 4 Integration</div>
            // Google Analytics 4 Integration</div>
                            <div className="text-yellow-400">{"<script async src=\"https://www.googletagmanager.com/gtag/js?id=".concat(config.integrations.googleAnalytics.measurementId, "\"></script>")}</div>
                            <div className="text-purple-400">{"<script>gtag('config', '".concat(config.integrations.googleAnalytics.measurementId, "');</script>")}</div>
                          </>)}
                        
                        {config.scripts && (<>
                            <div className="text-green-400 mt-4 mb-2"> // Custom Scripts</div>
            // Custom Scripts</div>
                            {((_129 = config.scripts.strictlyNecessary) === null || _129 === void 0 ? void 0 : _129.filter(function (s) { return s.enabled && s.scriptCode.trim(); }).length) > 0 && (<div className="text-blue-400"> // Strictly Necessary: {config.scripts.strictlyNecessary.filter(s => s.enabled && s.scriptCode.trim()).length} scripts</div>
                // Strictly Necessary: {config.scripts.strictlyNecessary.filter(function (s) { return s.enabled && s.scriptCode.trim(); }).length} scripts</div>)}
                            {((_130 = config.scripts.trackingPerformance) === null || _130 === void 0 ? void 0 : _130.filter(function (s) { return s.enabled && s.scriptCode.trim(); }).length) > 0 && (<div className="text-yellow-400"> // Tracking/Performance: {config.scripts.trackingPerformance.filter(s => s.enabled && s.scriptCode.trim()).length} scripts</div>
                // Tracking/Performance: {config.scripts.trackingPerformance.filter(function (s) { return s.enabled && s.scriptCode.trim(); }).length} scripts</div>)}
                            {((_131 = config.scripts.functionality) === null || _131 === void 0 ? void 0 : _131.filter(function (s) { return s.enabled && s.scriptCode.trim(); }).length) > 0 && (<div className="text-purple-400"> // Functionality: {config.scripts.functionality.filter(s => s.enabled && s.scriptCode.trim()).length} scripts</div>
                // Functionality: {config.scripts.functionality.filter(function (s) { return s.enabled && s.scriptCode.trim(); }).length} scripts</div>)}
                            {((_132 = config.scripts.targetingAdvertising) === null || _132 === void 0 ? void 0 : _132.filter(function (s) { return s.enabled && s.scriptCode.trim(); }).length) > 0 && (<div className="text-red-400"> // Targeting/Advertising: {config.scripts.targetingAdvertising.filter(s => s.enabled && s.scriptCode.trim()).length} scripts</div>
                // Targeting/Advertising: {config.scripts.targetingAdvertising.filter(function (s) { return s.enabled && s.scriptCode.trim(); }).length} scripts</div>)}
                          </>)}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="text-sm text-muted-foreground">
                        {((_134 = (_133 = config.integrations) === null || _133 === void 0 ? void 0 : _133.googleAnalytics) === null || _134 === void 0 ? void 0 : _134.measurementId)
                ? 'Your GA4 integration is configured and will track consent events.'
                : 'Enter your GA4 Measurement ID above to enable tracking.'}
                      </div>
                      <button_1.Button variant="outline" asChild>
                        <link_1.default href="/dashboard/integrations">
                          <lucide_react_1.Settings className="h-4 w-4 mr-2"/>
                          Advanced Settings
                        </link_1.default>
                      </button_1.Button>
                    </div>
                  </card_1.CardContent>
                </card_1.Card>)}
              </tabs_1.TabsContent>

              {/* Code Tab */}
              <tabs_1.TabsContent value="code" className="space-y-6" id="code-panel" role="tabpanel" aria-labelledby="code-tab">
                <card_1.Card>
                  <card_1.CardHeader>
                    <card_1.CardTitle className="flex items-center">
                      <lucide_react_1.Code className="mr-2 h-5 w-5"/>
                      Implementation Code
                    </card_1.CardTitle>
                    <card_1.CardDescription>
                      Copy and paste this code into your website to activate your cookie banner
                    </card_1.CardDescription>
                  </card_1.CardHeader>
                  <card_1.CardContent>
                    <code_generator_1.CodeGenerator config={config} bannerId={bannerId || undefined} planTier={((_135 = session === null || session === void 0 ? void 0 : session.user) === null || _135 === void 0 ? void 0 : _135.planTier) || 'free'} detectedCmpVendor={detectedCmpVendor || undefined}/>
                  </card_1.CardContent>
                </card_1.Card>
              </tabs_1.TabsContent>
              </tabs_1.Tabs>
            </div>

            {/* Live Preview Area */}
            <div className="lg:col-span-4">
              <div className="sticky top-6">
                <card_1.Card>
                  <card_1.CardHeader>
                    <div className="flex items-center justify-between">
                      <card_1.CardTitle className="flex items-center">
                        <lucide_react_1.Eye className="mr-2 h-5 w-5"/>
                        Live Preview
                      </card_1.CardTitle>
                    </div>
                    {config.behavior.showPreferences && (<card_1.CardDescription className="text-purple-600 dark:text-purple-400">
                        ✨ Try clicking the "Preferences" button to see the new modal!
                      </card_1.CardDescription>)}
                  </card_1.CardHeader>
                  <card_1.CardContent>
                    {/* Browser Chrome Frame */}
                    <div className="border rounded-lg overflow-hidden">
                      <div className="bg-muted rounded-t-lg px-3 py-2 flex items-center gap-2 border-b">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-red-400"/>
                          <span className="w-2 h-2 rounded-full bg-yellow-400"/>
                          <span className="w-2 h-2 rounded-full bg-green-400"/>
                        </div>
                        <div className="flex-1 mx-2 bg-muted-foreground/15 rounded-md px-3 py-1 text-xs text-muted-foreground text-center truncate">
                          yoursite.com
                        </div>
                      </div>
                      <div className="bg-white rounded-b-lg min-h-[300px] relative overflow-hidden">
                        <banner_preview_1.BannerPreview config={config}/>
                      </div>
                    </div>
                  </card_1.CardContent>
                </card_1.Card>
              </div>
            </div>
          </div>

        </main>
    </div>);
}
function BannerBuilderPage() {
    return (<react_1.Suspense fallback={<div className="flex h-screen items-center justify-center text-muted-foreground">Loading builder...</div>}>
      <BannerBuilderContent />
    </react_1.Suspense>);
}
