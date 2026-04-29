// ------------------------------------------------------------
// React hook for the A/B pricing cohort.
// Memoizes on first call so every component in the same render
// tree sees the same price. Safe to call from any component.
// ------------------------------------------------------------

import { useMemo } from 'react';
import { getActivePricing, type PriceCohort } from './pricing';

export function usePricing(): PriceCohort {
  return useMemo(() => getActivePricing(), []);
}
