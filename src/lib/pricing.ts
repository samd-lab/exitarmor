// ------------------------------------------------------------
// Exit Armor — A/B pricing test
// ------------------------------------------------------------
// Splits visitors into pricing cohorts on first visit.
// The cohort sticks via localStorage so the same person always
// sees the same price. Every CTA, checkout page, and GA4 event
// reads from this module.
//
// Weights: $19 = 50%, $29 = 30%, $69 = 20%
//
// To end the test: export a single PRICE_COHORTS entry and
// set its weight to 100, or just hard-code getActivePricing()
// to return a fixed cohort.
// ------------------------------------------------------------

export interface PriceCohort {
  /** Cohort identifier for analytics */
  id: 'price_19' | 'price_29' | 'price_69';
  /** Display price in dollars */
  price: number;
  /** Formatted string like "$19" */
  label: string;
  /** Stripe Payment Link for this price point */
  stripeLink: string;
  /** Weight 0–100 for random assignment */
  weight: number;
}

// ⚠️  REPLACE the $19 and $29 Stripe links with real ones.
//    The $69 link is already live.
const COHORTS: PriceCohort[] = [
  {
    id: 'price_19',
    price: 19,
    label: '$19',
    stripeLink: 'https://buy.stripe.com/bJecN51Yp5Mx6IY2zsg7e02',
    weight: 50,
  },
  {
    id: 'price_29',
    price: 29,
    label: '$29',
    stripeLink: 'https://buy.stripe.com/00wdR99qR6QB4AQfmeg7e01',
    weight: 30,
  },
  {
    id: 'price_69',
    price: 69,
    label: '$69',
    stripeLink: 'https://buy.stripe.com/6oU4gz9qR8YJaZe5LEg7e00',
    weight: 20,
  },
];

const STORAGE_KEY = 'exitarmor.v1.priceCohort';

/**
 * Weighted random selection. Rolls a number 0–99 and walks the
 * weight buckets. With 50/30/20 weights:
 *   0–49  → $19
 *   50–79 → $29
 *   80–99 → $69
 */
function pickCohort(): PriceCohort {
  const roll = Math.floor(Math.random() * 100);
  let cumulative = 0;
  for (const c of COHORTS) {
    cumulative += c.weight;
    if (roll < cumulative) return c;
  }
  // Fallback (should never hit if weights sum to 100)
  return COHORTS[COHORTS.length - 1];
}

/**
 * Get the active pricing cohort for this visitor.
 * Assigns on first call, then reads from localStorage forever.
 */
export function getActivePricing(): PriceCohort {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const match = COHORTS.find((c) => c.id === stored);
      if (match) return match;
      // Stored value doesn't match any current cohort — re-roll.
    }
  } catch {
    // localStorage blocked — pick fresh every time (acceptable).
  }

  const chosen = pickCohort();

  try {
    localStorage.setItem(STORAGE_KEY, chosen.id);
  } catch {
    // Can't persist — visitor may see a different price on reload.
    // Rare edge case, not worth blocking on.
  }

  return chosen;
}

/**
 * Build the checkout URL for the active cohort, with referral
 * code appended if one exists.
 */
export function getCohortCheckoutUrl(): string {
  const cohort = getActivePricing();
  const base = cohort.stripeLink;

  // If Stripe link isn't set yet, fall back to mailto
  if (base.includes('REPLACE_WITH_')) {
    return `mailto:support@exitarmor.com?subject=I%20want%20the%20Exit%20Armor%20kit%20(${cohort.label})&body=Hi%20%E2%80%94%20please%20send%20me%20the%20checkout%20link.%20Thanks!`;
  }

  return base;
}
