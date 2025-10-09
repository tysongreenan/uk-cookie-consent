// Input sanitization utilities

export interface SanitizationOptions {
  maxLength?: number;
  allowedTags?: string[];
  stripHtml?: boolean;
  trim?: boolean;
}

/**
 * Sanitize text input to prevent XSS and injection attacks
 */
export function sanitizeText(input: string, options: SanitizationOptions = {}): string {
  const {
    maxLength = 1000,
    allowedTags = [],
    stripHtml = true,
    trim = true
  } = options;

  if (!input || typeof input !== 'string') {
    return '';
  }

  let sanitized = input;

  // Trim whitespace
  if (trim) {
    sanitized = sanitized.trim();
  }

  // Remove or escape HTML tags
  if (stripHtml) {
    // Remove all HTML tags
    sanitized = sanitized.replace(/<[^>]*>/g, '');
  } else if (allowedTags.length > 0) {
    // Only allow specific tags
    const allowedTagsRegex = allowedTags.join('|');
    sanitized = sanitized.replace(
      new RegExp(`<(?!\/?(?:${allowedTagsRegex})\\b)[^>]*>`, 'gi'),
      ''
    );
  }

  // Escape special characters
  sanitized = sanitized
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');

  // Limit length
  if (sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength);
  }

  return sanitized;
}

/**
 * Sanitize banner name
 */
export function sanitizeBannerName(name: string): string {
  return sanitizeText(name, {
    maxLength: 100,
    stripHtml: true,
    trim: true
  });
}

/**
 * Sanitize banner configuration object
 */
export function sanitizeBannerConfig(config: any): any {
  if (!config || typeof config !== 'object') {
    return {};
  }

  const sanitized: any = {};

  // Sanitize text fields
  if (config.title) {
    sanitized.title = sanitizeText(config.title, { maxLength: 200 });
  }

  if (config.message) {
    sanitized.message = sanitizeText(config.message, { maxLength: 500 });
  }

  if (config.acceptButton) {
    sanitized.acceptButton = sanitizeText(config.acceptButton, { maxLength: 50 });
  }

  if (config.rejectButton) {
    sanitized.rejectButton = sanitizeText(config.rejectButton, { maxLength: 50 });
  }

  if (config.preferencesButton) {
    sanitized.preferencesButton = sanitizeText(config.preferencesButton, { maxLength: 50 });
  }

  // Sanitize colors (hex validation)
  if (config.colors) {
    sanitized.colors = {};
    
    if (config.colors.background && /^#[0-9A-F]{6}$/i.test(config.colors.background)) {
      sanitized.colors.background = config.colors.background;
    }
    
    if (config.colors.text && /^#[0-9A-F]{6}$/i.test(config.colors.text)) {
      sanitized.colors.text = config.colors.text;
    }
    
    if (config.colors.button && /^#[0-9A-F]{6}$/i.test(config.colors.button)) {
      sanitized.colors.button = config.colors.button;
    }
    
    if (config.colors.buttonText && /^#[0-9A-F]{6}$/i.test(config.colors.buttonText)) {
      sanitized.colors.buttonText = config.colors.buttonText;
    }
    
    if (config.colors.link && /^#[0-9A-F]{6}$/i.test(config.colors.link)) {
      sanitized.colors.link = config.colors.link;
    }
  }

  // Sanitize position
  if (config.position && ['top', 'bottom', 'center'].includes(config.position)) {
    sanitized.position = config.position;
  }

  // Sanitize boolean values
  if (typeof config.isActive === 'boolean') {
    sanitized.isActive = config.isActive;
  }

  if (typeof config.showPreferences === 'boolean') {
    sanitized.showPreferences = config.showPreferences;
  }

  return sanitized;
}

/**
 * Validate email format
 */
export function sanitizeEmail(email: string): string {
  if (!email || typeof email !== 'string') {
    return '';
  }

  const sanitized = email.trim().toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  return emailRegex.test(sanitized) ? sanitized : '';
}

/**
 * Validate and sanitize password
 */
export function validatePassword(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!password || typeof password !== 'string') {
    errors.push('Password is required');
    return { valid: false, errors };
  }

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  if (password.length > 128) {
    errors.push('Password must be less than 128 characters');
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Sanitize user name
 */
export function sanitizeUserName(name: string): string {
  return sanitizeText(name, {
    maxLength: 100,
    stripHtml: true,
    trim: true
  });
}
