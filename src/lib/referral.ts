// ------------------------------------------------------------
// Referral / affiliate tracking — dead simple, no backend.
//
// Flow:
//   1. Affiliate shares exitarmor.co/?ref=sarah
//   2. Landing page (or any page) calls captureReferral() on mount
//   3. If ?ref= is in the URL, we stash it in localStorage
//   4. Checkout page calls getCheckoutUrlWithRef(baseUrl) which
//      appends ?client_reference_id=sarah to the Stripe Payment Link
//   5. Stripe records the ref code on the payment — visible in the
//      dashboard, exportable, filterable.
//
// Stripe Payment Links support client_reference_id as a query
// parameter. Max 200 chars, alphanumeric + dashes. We sanitize.
//
// The ref code persists for 30 days (localStorage timestamp check).
// If the visitor comes back via a different affiliate link, the
// newer one wins (last-touch attribution).
// ------------------------------------------------------------

const STORAGE_KEY = 'exitarmor.v1.ref';
const STORAGE_TS_KEY = 'exitarmor.v1.ref.ts';
const MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

/**
 * Sanitize a ref code — alphanumeric, dashes, underscores only.
 * Stripe's client_reference_id is max 200 chars.
 */
function sanitize(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, '')
    .slice(0, 100);
}

/**
 * Call on any page mount (Landing, blog posts, etc.).
 * Reads ?ref= from the current URL. If present, stores it.
 * If absent, does nothing (keeps any previously stored ref).
 */
export function captureReferral(): void {
  try {
    const params = new URLSearchParams(window.location.search);
    const raw = params.get('ref');
    if (!raw) return;

    const code = sanitize(raw);
    if (!code) return;

    localStorage.setItem(STORAGE_KEY, code);
    localStorage.setItem(STORAGE_TS_KEY, String(Date.now()));
  } catch {
    // Private mode, localStorage blocked — silently skip.
  }
}

/**
 * Read the stored referral code, if any and not expired.
 */
export function getReferralCode(): string | null {
  try {
    const code = localStorage.getItem(STORAGE_KEY);
    const ts = localStorage.getItem(STORAGE_TS_KEY);
    if (!code || !ts) return null;

    // Expire after 30 days — stale refs shouldn't attribute.
    const age = Date.now() - Number(ts);
    if (age > MAX_AGE_MS) {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(STORAGE_TS_KEY);
      return null;
    }

    return code;
  } catch {
    return null;
  }
}

/**
 * Given the base Stripe Payment Link URL, append the referral
 * code as client_reference_id if one is stored.
 *
 * Example:
 *   getCheckoutUrlWithRef('https://buy.stripe.com/abc')
 *   → 'https://buy.stripe.com/abc?client_reference_id=sarah'
 *
 * If no referral code exists, returns the URL unchanged.
 */
export function getCheckoutUrlWithRef(baseUrl: string): string {
  const ref = getReferralCode();
  if (!ref) return baseUrl;

  // Stripe Payment Links accept client_reference_id as a query param.
  const separator = baseUrl.includes('?') ? '&' : '?';
  return `${baseUrl}${separator}client_reference_id=${encodeURIComponent(ref)}`;
}
