// ------------------------------------------------------------
// Exit Armor — runtime config
// ------------------------------------------------------------
// Keep this file tiny and placeholder-friendly. Anything that
// might rotate (checkout URL, support email, contact channels)
// lives here so the components don't have to change.
// ------------------------------------------------------------

/**
 * Stripe Payment Link for the $69 Self-Serve Kit.
 *
 * HOW TO WIRE THIS UP (5 minutes in the Stripe dashboard):
 *   1. Stripe Dashboard → Payment Links → + New
 *   2. Product: "Exit Armor — Self-Serve Kit", price: $69 one-time (USD)
 *   3. After payment → "Don't show confirmation page, send to URL"
 *        URL: https://exitarmor.netlify.app/thanks
 *   4. Turn ON "Collect customer email" (Stripe emails the receipt automatically)
 *   5. Copy the generated payment link (format: https://buy.stripe.com/xxxxxxxxxx)
 *   6. Paste it below, replacing the placeholder, and push.
 *
 * Until you replace this, clicking any CTA opens a mailto as a safe fallback.
 */
export const STRIPE_PAYMENT_LINK =
  'https://buy.stripe.com/6oU4gz9qR8YJaZe5LEg7e00';

/** True while we're still on the placeholder — used to show a mailto fallback. */
export const IS_PAYMENT_LINK_LIVE = !STRIPE_PAYMENT_LINK.includes('REPLACE_WITH_REAL_LINK');

/** The URL a CTA should actually open. Falls back to a pre-filled mailto
 *  so we never ship a dead button. */
export const CHECKOUT_URL: string = IS_PAYMENT_LINK_LIVE
  ? STRIPE_PAYMENT_LINK
  : 'mailto:support@exitarmor.com?subject=I%20want%20the%20Exit%20Armor%20kit&body=Hi%20%E2%80%94%20please%20send%20me%20the%20Stripe%20checkout%20link%20for%20the%20%2469%20Self-Serve%20Kit.%20Thanks!';

/** Support email used in the Thanks page + FAQ. */
export const SUPPORT_EMAIL = 'support@exitarmor.com';
