// Pre-filled script templates for common tracking tools
export interface ScriptTemplate {
  name: string
  category: 'strictly-necessary' | 'functionality' | 'tracking-performance' | 'targeting-advertising'
  description: string
  scriptCode: string
  instructions?: string
}

export const scriptTemplates: Record<string, ScriptTemplate> = {
  // Analytics & Performance
  'google-analytics-4': {
    name: 'Google Analytics 4',
    category: 'tracking-performance',
    description: 'Track website traffic and user behavior with Google Analytics 4',
    scriptCode: '',
    instructions: 'Go to Google Analytics → Admin → Data Streams → Select your stream → Copy the "Google tag" code and paste it below.'
  },
  
  'google-analytics-universal': {
    name: 'Google Analytics (Universal)',
    category: 'tracking-performance',
    description: 'Legacy Google Analytics tracking (Universal Analytics)',
    scriptCode: '',
    instructions: 'Go to Google Analytics → Admin → Tracking Info → Tracking Code → Copy the tracking code and paste it below.'
  },
  
  'microsoft-clarity': {
    name: 'Microsoft Clarity',
    category: 'tracking-performance',
    description: 'User behavior analytics with session recordings and heatmaps',
    scriptCode: '',
    instructions: 'Go to Microsoft Clarity → Settings → Setup → Copy the tracking code and paste it below.'
  },
  
  'hotjar': {
    name: 'Hotjar',
    category: 'tracking-performance',
    description: 'Heatmaps, session recordings, and user feedback',
    scriptCode: '',
    instructions: 'Go to Hotjar → Sites & Organizations → Tracking Code → Copy the tracking code and paste it below.'
  },
  
  // Advertising & Marketing
  'facebook-pixel': {
    name: 'Facebook Pixel',
    category: 'targeting-advertising',
    description: 'Facebook/Meta advertising and conversion tracking',
    scriptCode: '',
    instructions: 'Go to Facebook Events Manager → Data Sources → Select your pixel → Settings → Copy the pixel code and paste it below.'
  },
  
  'google-ads': {
    name: 'Google Ads',
    category: 'targeting-advertising',
    description: 'Google Ads conversion tracking',
    scriptCode: '',
    instructions: 'Go to Google Ads → Tools → Conversions → Select conversion action → Tag setup → Copy the global site tag and paste it below.'
  },
  
  'google-tag-manager': {
    name: 'Google Tag Manager',
    category: 'tracking-performance',
    description: 'Manage all your tracking scripts in one place',
    scriptCode: '',
    instructions: 'Go to Google Tag Manager → Admin → Install Google Tag Manager → Copy the <head> code and paste it below.'
  },
  
  'linkedin-insight': {
    name: 'LinkedIn Insight Tag',
    category: 'targeting-advertising',
    description: 'LinkedIn advertising and conversion tracking',
    scriptCode: '',
    instructions: 'Go to LinkedIn Campaign Manager → Account Assets → Insight Tag → Copy the insight tag code and paste it below.'
  },
  
  'tiktok-pixel': {
    name: 'TikTok Pixel',
    category: 'targeting-advertising',
    description: 'TikTok advertising and conversion tracking',
    scriptCode: '',
    instructions: 'Go to TikTok Ads Manager → Assets → Events → Web Events → Copy the pixel code and paste it below.'
  },
  
  // Functionality
  'intercom': {
    name: 'Intercom',
    category: 'functionality',
    description: 'Customer messaging and live chat',
    scriptCode: '',
    instructions: 'Go to Intercom → Settings → Installation → Web → Copy the code snippet and paste it below.'
  },
  
  'zendesk': {
    name: 'Zendesk Chat',
    category: 'functionality',
    description: 'Customer support live chat widget',
    scriptCode: '',
    instructions: 'Go to Zendesk → Admin → Channels → Web Widget → Copy the embed code and paste it below.'
  }
}

export function getTemplatesByCategory(category: ScriptTemplate['category']): ScriptTemplate[] {
  return Object.values(scriptTemplates).filter(template => template.category === category)
}

export function getTemplateByName(name: string): ScriptTemplate | undefined {
  return scriptTemplates[name]
}

export function getAllTemplateNames(): string[] {
  return Object.values(scriptTemplates).map(t => t.name)
}
