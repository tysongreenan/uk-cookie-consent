/**
 * Detects the likely compliance framework based on a URL's TLD.
 */

const TLD_TO_FRAMEWORK: Record<string, 'gdpr' | 'ccpa' | 'pipeda' | 'lgpd'> = {
  // GDPR — EU/EEA member states and associated countries
  uk: 'gdpr',
  eu: 'gdpr',
  de: 'gdpr',
  fr: 'gdpr',
  it: 'gdpr',
  es: 'gdpr',
  nl: 'gdpr',
  be: 'gdpr',
  at: 'gdpr',
  ch: 'gdpr',
  ie: 'gdpr',
  pt: 'gdpr',
  pl: 'gdpr',
  cz: 'gdpr',
  se: 'gdpr',
  no: 'gdpr',
  dk: 'gdpr',
  fi: 'gdpr',

  // CCPA — United States
  us: 'ccpa',

  // PIPEDA — Canada
  ca: 'pipeda',

  // LGPD — Brazil
  br: 'lgpd',
};

const DEFAULT_FRAMEWORK: 'gdpr' = 'gdpr';

function normalizeUrl(url: string): string {
  let trimmed = url.trim();
  if (!/^https?:\/\//i.test(trimmed)) {
    trimmed = `https://${trimmed}`;
  }
  return trimmed;
}

function extractTldParts(hostname: string): string[] {
  const parts = hostname.toLowerCase().replace(/\.$/, '').split('.');
  if (parts.length < 2) return parts;

  // Return last two parts to handle country-code SLDs like .co.uk
  return parts.slice(-2);
}

export function detectFrameworkFromUrl(
  url: string
): 'gdpr' | 'ccpa' | 'pipeda' | 'lgpd' {
  try {
    const normalized = normalizeUrl(url);
    const { hostname } = new URL(normalized);
    const tldParts = extractTldParts(hostname);

    // Check each part from right to left (TLD first, then SLD)
    for (let i = tldParts.length - 1; i >= 0; i--) {
      const match = TLD_TO_FRAMEWORK[tldParts[i]];
      if (match) return match;
    }

    return DEFAULT_FRAMEWORK;
  } catch {
    return DEFAULT_FRAMEWORK;
  }
}
