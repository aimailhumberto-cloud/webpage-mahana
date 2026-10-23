// Google Analytics 4 (GA4) & Attribution Utility for Casa Mahana

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const ATTRIBUTION_STORAGE_KEY = 'mahana_attribution_v1';
const TRACKED_PARAMS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'gclid',
  'fbclid',
  'ref'
];

export interface AttributionData {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string;
  fbclid?: string;
  ref?: string;
  initial_referrer?: string;
  landing_path?: string;
}

/**
 * Captures UTM / ad click parameters on page entry and persists them in sessionStorage
 * so attribution is preserved across SPA navigation and when redirecting to the PMS.
 */
export const captureAttributionParams = (): AttributionData => {
  if (typeof window === 'undefined') return {};

  try {
    const existingRaw = sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    const existing: AttributionData = existingRaw ? JSON.parse(existingRaw) : {};
    const searchParams = new URLSearchParams(window.location.search);

    let updated = false;

    if (!existing.landing_path) {
      existing.landing_path = window.location.pathname;
      updated = true;
    }

    if (!existing.initial_referrer && document.referrer) {
      try {
        const refUrl = new URL(document.referrer);
        if (!refUrl.hostname.includes('casamahana.com')) {
          existing.initial_referrer = refUrl.hostname;
          updated = true;
        }
      } catch {
        // Ignore invalid referrer URLs
      }
    }

    for (const key of TRACKED_PARAMS) {
      const val = searchParams.get(key);
      if (val) {
        (existing as Record<string, string>)[key] = val;
        updated = true;
      }
    }

    if (updated) {
      sessionStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(existing));
    }

    return existing;
  } catch {
    return {};
  }
};

export const getAttributionParams = (): AttributionData => {
  if (typeof window === 'undefined') return {};
  try {
    const raw = sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

/**
 * Sends a custom event to Google Analytics 4 (G-02NLS8E3LG)
 */
export const trackEvent = (eventName: string, params: Record<string, unknown> = {}): void => {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  try {
    const attribution = getAttributionParams();
    window.gtag('event', eventName, {
      ...attribution,
      page_path: window.location.pathname,
      ...params
    });
  } catch {
    // Fail silently if ad-blocker blocks gtag
  }
};

/**
 * Tracks virtual SPA pageviews on route changes
 */
export const trackPageView = (path: string, title?: string): void => {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  try {
    const attribution = getAttributionParams();
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title || document.title,
      page_location: window.location.href,
      ...attribution
    });
  } catch {
    // Ignore
  }
};

/**
 * Tracks when a visitor clicks a Booking CTA to jump to the PMS reservation system
 */
export const trackBookingIntent = (options: {
  planCode?: string;
  category?: string;
  source?: string;
  guests?: number;
  estimatedValue?: number;
} = {}): void => {
  const payload = {
    plan_code: options.planCode || 'general',
    item_category: options.category || 'General',
    source_component: options.source || window.location.pathname,
    guests: options.guests || 2,
    currency: 'USD',
    ...(options.estimatedValue ? { value: options.estimatedValue } : {})
  };

  // Standard GA4 ecommerce funnel event
  trackEvent('begin_checkout', payload);
  // Explicit easy-to-filter custom event in GA4
  trackEvent('click_reservar', payload);
};

/**
 * Tracks when a visitor clicks any WhatsApp CTA
 */
export const trackWhatsAppClick = (source: string, detail?: string): void => {
  const payload = {
    source_component: source,
    lead_detail: detail || 'consulta_whatsapp',
    method: 'WhatsApp'
  };

  trackEvent('generate_lead', payload);
  trackEvent('click_whatsapp', payload);
};

/**
 * Builds the full PMS reservation URL preserving selected planCode, category, guests, and UTM parameters
 */
export const buildPmsBookingUrl = (options: {
  search?: string;
  planCode?: string;
  category?: string;
  guests?: number;
} = {}): string => {
  const baseUrl = 'https://casa-mahana-pms.onrender.com/reservar';
  const params = new URLSearchParams(options.search || '');

  if (options.planCode && !params.has('plan')) {
    params.set('plan', options.planCode);
  }
  if (options.category && !params.has('category')) {
    params.set('category', options.category);
  }
  if (options.guests && !params.has('guests')) {
    params.set('guests', String(options.guests));
  }

  const attribution = getAttributionParams();
  for (const key of TRACKED_PARAMS) {
    const val = (attribution as Record<string, string | undefined>)[key];
    if (val && !params.has(key)) {
      params.set(key, val);
    }
  }

  const queryString = params.toString();
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
};
