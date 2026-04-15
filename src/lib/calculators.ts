// Calculator engines for Exit Armor — severance estimator, runway scenarios,
// and supporting benchmarks. All pure functions, safe to unit-test.
//
// NOT financial or legal advice. Estimates are based on publicly available
// industry benchmarks from Paycor, Littler, SHRM, and BLS data. Actual
// outcomes depend on the specific employer, package, and negotiation.

import { STATES } from '../data/states';
import type { StateInfo } from '../data/states';

// ============================================================
// Severance estimator
// ============================================================

export type SeverLevel = 'ic' | 'senior-ic' | 'manager' | 'director' | 'vp' | 'exec';
export type CompanySize = '<100' | '100-500' | '500-5000' | '5000+';

export const LEVEL_OPTIONS: Array<{ id: SeverLevel; label: string; sub: string }> = [
  { id: 'ic', label: 'Individual contributor', sub: 'Associate, Analyst, Engineer I–II' },
  { id: 'senior-ic', label: 'Senior IC', sub: 'Senior, Lead, Staff, Principal' },
  { id: 'manager', label: 'Manager', sub: 'Team Lead, Manager, Senior Manager' },
  { id: 'director', label: 'Director', sub: 'Director, Senior Director' },
  { id: 'vp', label: 'VP', sub: 'VP, SVP, GM' },
  { id: 'exec', label: 'C-suite', sub: 'CEO, CFO, CTO, COO' },
];

export const SIZE_OPTIONS: Array<{ id: CompanySize; label: string }> = [
  { id: '<100', label: 'Under 100 employees' },
  { id: '100-500', label: '100–500 employees' },
  { id: '500-5000', label: '500–5,000 employees' },
  { id: '5000+', label: '5,000+ employees' },
];

// Weeks of severance per year of service — floor / target / ceiling by level
const LEVEL_MULT: Record<SeverLevel, { floor: number; target: number; ceiling: number; minWeeks: number }> = {
  'ic':        { floor: 1.0, target: 1.5, ceiling: 2.0, minWeeks: 2 },
  'senior-ic': { floor: 1.0, target: 2.0, ceiling: 3.0, minWeeks: 4 },
  'manager':   { floor: 1.5, target: 2.5, ceiling: 3.5, minWeeks: 4 },
  'director':  { floor: 2.0, target: 3.0, ceiling: 4.0, minWeeks: 8 },
  'vp':        { floor: 2.0, target: 4.0, ceiling: 6.0, minWeeks: 12 },
  'exec':      { floor: 4.0, target: 6.0, ceiling: 12.0, minWeeks: 24 },
};

// Company size adjustment: bigger / better-funded = higher package (more formal, more money, more liability-averse)
const SIZE_ADJ: Record<CompanySize, number> = {
  '<100': 0.85,
  '100-500': 1.0,
  '500-5000': 1.1,
  '5000+': 1.2,
};

export interface SeveranceInput {
  annualSalary: number;
  tenureYears: number;
  level: SeverLevel;
  companySize: CompanySize;
  stateCode: string;
  ageOver40: boolean;
  hasBonus: boolean;
  hasEquity: boolean;
  currentOfferWeeks: number;
}

export interface SeveranceAsk {
  id: string;
  title: string;
  dollarValue: number;
  rationale: string;
}

export interface SeveranceEstimate {
  floorWeeks: number;
  targetWeeks: number;
  ceilingWeeks: number;
  floorDollars: number;
  targetDollars: number;
  ceilingDollars: number;
  cobraValue: number;
  bonusValue: number;
  totalTargetValue: number;
  currentOfferDollars: number;
  gapToTarget: number;
  reviewWindowDays: number | null;
  asks: SeveranceAsk[];
  redFlags: string[];
  state: StateInfo | null;
}

export function estimateSeverance(input: SeveranceInput): SeveranceEstimate {
  const mult = LEVEL_MULT[input.level];
  const sizeAdj = SIZE_ADJ[input.companySize];
  const weeklyPay = input.annualSalary / 52;

  const floorWeeks = Math.max(mult.minWeeks, Math.round(input.tenureYears * mult.floor * sizeAdj));
  const targetWeeks = Math.max(mult.minWeeks + 2, Math.round(input.tenureYears * mult.target * sizeAdj));
  const ceilingWeeks = Math.max(mult.minWeeks + 4, Math.round(input.tenureYears * mult.ceiling * sizeAdj));

  const floorDollars = Math.round(floorWeeks * weeklyPay);
  const targetDollars = Math.round(targetWeeks * weeklyPay);
  const ceilingDollars = Math.round(ceilingWeeks * weeklyPay);

  // COBRA reimbursement ask: ~$700/mo individual, ~$1,800/mo family. Use $850 blended, 3 months.
  const cobraValue = 850 * 3;

  // Pro-rata bonus: assume 10% target bonus, prorated to half the year
  const bonusValue = input.hasBonus ? Math.round(input.annualSalary * 0.1 * 0.5) : 0;

  const totalTargetValue = targetDollars + cobraValue + bonusValue;
  const currentOfferDollars = Math.round((input.currentOfferWeeks || 0) * weeklyPay);
  const gapToTarget = Math.max(0, totalTargetValue - currentOfferDollars);

  // OWBPA review window: 21 days if 40+ (individual), 45 days if group termination.
  // We can only know individual here — assume 21 as the safer baseline.
  const reviewWindowDays = input.ageOver40 ? 21 : null;

  // State lookup
  const state = STATES.find((s) => s.code === input.stateCode) || null;

  // Build the top 3 asks, sorted by dollar value
  const asks: SeveranceAsk[] = [];

  // Ask 1: Close the gap on base severance
  if (targetDollars > currentOfferDollars) {
    asks.push({
      id: 'base-pay',
      title: `${targetWeeks - input.currentOfferWeeks} more weeks of base pay`,
      dollarValue: targetDollars - currentOfferDollars,
      rationale: `Your current offer is ${input.currentOfferWeeks} weeks. Industry benchmark for a ${LEVEL_OPTIONS.find((l) => l.id === input.level)?.label} with ${input.tenureYears} years at a ${SIZE_OPTIONS.find((s) => s.id === input.companySize)?.label.toLowerCase()} company is ${targetWeeks} weeks (target) to ${ceilingWeeks} weeks (ceiling).`,
    });
  }

  // Ask 2: COBRA reimbursement
  asks.push({
    id: 'cobra',
    title: '3 months of COBRA premium reimbursement',
    dollarValue: cobraValue,
    rationale: `COBRA typically runs $700–$1,800/month. A 3-month reimbursement is a standard concession and softens the benefits cliff. At ~$850/mo blended, this is ~$${cobraValue.toLocaleString()} of real value with essentially zero cost to the company.`,
  });

  // Ask 3: Pro-rata bonus
  if (input.hasBonus) {
    asks.push({
      id: 'bonus',
      title: 'Pro-rated annual bonus',
      dollarValue: bonusValue,
      rationale: `If you have an annual bonus on your offer letter and you worked through Q2/Q3, asking for a pro-rata payout is standard. At a 10% target bonus prorated to half-year, that's ~$${bonusValue.toLocaleString()}.`,
    });
  }

  // Ask 4: Remove non-compete (if state allows)
  if (state && state.noncompeteAllowed && input.level !== 'ic') {
    asks.push({
      id: 'noncompete',
      title: 'Remove the non-compete clause',
      dollarValue: 0,
      rationale: `${state.name} allows non-competes, but they're routinely dropped in exchange for confidentiality + non-solicit. Worth nothing to them (they're already protected by NDA), worth a lot to you (unblocks half the companies you'd interview with).`,
    });
  } else if (state && !state.noncompeteAllowed) {
    asks.push({
      id: 'noncompete-void',
      title: `Confirm non-compete is void under ${state.name} law`,
      dollarValue: 0,
      rationale: `${state.name} has largely banned non-competes. If your offer still contains one, ask HR to strike it or add a carve-out stating it's unenforceable in your state.`,
    });
  }

  // Ask 5: Equity — vesting acceleration or extended exercise window
  if (input.hasEquity) {
    asks.push({
      id: 'equity',
      title: 'Extended stock option exercise window (12+ months)',
      dollarValue: 0,
      rationale: 'Default ISO exercise window is 90 days post-termination. Ask for 12 months (standard for well-run companies). Costs them nothing, keeps your upside alive.',
    });
  }

  // Sort by dollar value desc (but keep 0-valued asks at the end in their current order)
  asks.sort((a, b) => b.dollarValue - a.dollarValue);

  // Red flags
  const redFlags: string[] = [];
  if (input.currentOfferWeeks > 0 && input.currentOfferWeeks < floorWeeks) {
    redFlags.push(
      `Your offer of ${input.currentOfferWeeks} weeks is below the market floor (${floorWeeks} weeks) for your level and tenure. You have leverage — don't sign yet.`
    );
  }
  if (input.ageOver40) {
    redFlags.push(
      'You are 40+, so OWBPA protections apply: you have a minimum 21-day review window (45 days for group terminations) and a 7-day revocation period after signing.'
    );
  }
  if (state && state.ptoPayoutRequired === 'yes') {
    redFlags.push(
      `${state.name} requires PTO payout at termination — confirm your accrued hours are being paid out separate from severance, not rolled in.`
    );
  }
  if (input.annualSalary >= 150000) {
    redFlags.push(
      'Above ~$150K base, an employment attorney review typically pays for itself 10x over. Many offer free 15-minute consults through state bar referral services.'
    );
  }

  return {
    floorWeeks,
    targetWeeks,
    ceilingWeeks,
    floorDollars,
    targetDollars,
    ceilingDollars,
    cobraValue,
    bonusValue,
    totalTargetValue,
    currentOfferDollars,
    gapToTarget,
    reviewWindowDays,
    asks: asks.slice(0, 5),
    redFlags,
    state,
  };
}

// Default severance input — sensible middle-of-the-road profile
export const DEFAULT_SEVERANCE_INPUT: SeveranceInput = {
  annualSalary: 120000,
  tenureYears: 3,
  level: 'senior-ic',
  companySize: '500-5000',
  stateCode: 'CA',
  ageOver40: false,
  hasBonus: true,
  hasEquity: false,
  currentOfferWeeks: 6,
};

// ============================================================
// Runway scenarios
// ============================================================

export interface RunwayInput {
  rent: number;
  food: number;
  insurance: number;
  utilities: number;
  debt: number;
  other: number;
  discretionary: number; // subscriptions, dining out, entertainment — separated from essentials
  monthlyIncome: number; // severance, UI, partner income, side
  savings: number;
}

export interface RunwayScenario {
  label: string;
  monthlyBleed: number;
  months: number;
  description: string;
}

export interface RunwayResult {
  scenarios: {
    current: RunwayScenario;
    cutDiscretionary: RunwayScenario;
    hardCut: RunwayScenario;
  };
  cuts: Array<{ label: string; monthlySavings: number }>;
  totalEssentials: number;
}

export function calculateRunway(input: RunwayInput): RunwayResult {
  const essentials = input.rent + input.food + input.insurance + input.utilities + input.debt + input.other;
  const total = essentials + input.discretionary;

  const bleedCurrent = Math.max(0, total - input.monthlyIncome);
  const bleedNoDiscr = Math.max(0, essentials - input.monthlyIncome);
  // Hard cut: 15% off food, 25% off utilities, 100% discretionary, 50% other
  const hardEssentials =
    input.rent +
    input.food * 0.85 +
    input.insurance +
    input.utilities * 0.75 +
    input.debt +
    input.other * 0.5;
  const bleedHard = Math.max(0, hardEssentials - input.monthlyIncome);

  const monthsOf = (bleed: number) => (bleed === 0 ? Infinity : input.savings / bleed);

  const scenarios = {
    current: {
      label: 'Current spend',
      monthlyBleed: Math.round(bleedCurrent),
      months: monthsOf(bleedCurrent),
      description: 'No changes — this is your runway if you keep living the same way.',
    },
    cutDiscretionary: {
      label: 'Discretionary cut',
      monthlyBleed: Math.round(bleedNoDiscr),
      months: monthsOf(bleedNoDiscr),
      description: 'Kill all discretionary spend — streaming, dining out, subscriptions, impulse buys.',
    },
    hardCut: {
      label: 'Austerity mode',
      monthlyBleed: Math.round(bleedHard),
      months: monthsOf(bleedHard),
      description: '15% off food, 25% off utilities (lower thermostat), slash "other" by half, zero discretionary.',
    },
  };

  // Top 5 cuts, sorted by monthly savings
  const cuts: Array<{ label: string; monthlySavings: number }> = [
    { label: 'Pause all streaming + subscriptions', monthlySavings: Math.round(input.discretionary * 0.35) },
    { label: 'Cook at home 6 nights/wk (save 25% on food)', monthlySavings: Math.round(input.food * 0.25) },
    { label: 'Cancel gym → free bodyweight / park', monthlySavings: Math.round(input.other * 0.15) },
    { label: 'Call creditors for hardship deferral', monthlySavings: Math.round(input.debt * 0.3) },
    { label: 'Lower thermostat + reduce driving', monthlySavings: Math.round(input.utilities * 0.2) },
  ]
    .filter((c) => c.monthlySavings > 0)
    .sort((a, b) => b.monthlySavings - a.monthlySavings);

  return {
    scenarios,
    cuts,
    totalEssentials: Math.round(essentials),
  };
}

export function runwayLabel(months: number): string {
  if (!isFinite(months)) return 'Income covers expenses';
  if (months >= 6) return `${months.toFixed(1)} months — strong`;
  if (months >= 3) return `${months.toFixed(1)} months — cautious`;
  if (months >= 1.5) return `${months.toFixed(1)} months — tight`;
  return `${months.toFixed(1)} months — urgent`;
}

// ============================================================
// Formatting helpers
// ============================================================

export function money(n: number): string {
  return `$${Math.round(n).toLocaleString()}`;
}

export function moneyRange(lo: number, hi: number): string {
  return `${money(lo)} – ${money(hi)}`;
}

// ============================================================
// Unemployment insurance estimator
// ============================================================
//
// Returns an APPROXIMATE weekly benefit and total max payout for a user's
// state. The formula is deliberately simple: most states replace ~50% of a
// worker's high-quarter wages up to the state cap, so we use 50% of weekly
// wages capped at the state max. Duration uses the state's typical max
// weeks. This is intentionally conservative — some states include
// dependency allowances or high-quarter bonuses we don't model.
//
// EVERY result must be surfaced in the UI alongside:
//   - A link to the state's DOL portal for the authoritative number
//   - The UI_DATA_AS_OF vintage label from states.ts
//   - A disclaimer that this is an estimate, not a benefits determination

export interface UnemploymentEstimate {
  state: StateInfo | null;
  weeklyBenefit: number;
  totalMax: number;
  maxWeeks: number;
  cappedByState: boolean; // true if state cap is binding, false if wages were lower than cap
  replacementRate: number; // actual % of prior weekly wages this represents
}

export function estimateUnemployment(
  annualSalary: number,
  stateCode: string
): UnemploymentEstimate {
  const state = STATES.find((s) => s.code === stateCode) || null;
  if (!state || annualSalary <= 0) {
    return {
      state,
      weeklyBenefit: 0,
      totalMax: 0,
      maxWeeks: state?.maxWeeks ?? 0,
      cappedByState: false,
      replacementRate: 0,
    };
  }

  const weeklyWage = annualSalary / 52;
  // Most states target ~50% replacement of prior wages. A few (MA, WA, NJ)
  // use a higher formula, but the state cap almost always dominates for
  // salaried workers, so this simplification is safe on the low side.
  const fiftyPercent = weeklyWage * 0.5;
  const rawBenefit = Math.min(fiftyPercent, state.maxWeeklyBenefit);
  const weeklyBenefit = Math.round(rawBenefit);
  const totalMax = Math.round(weeklyBenefit * state.maxWeeks);
  const cappedByState = fiftyPercent > state.maxWeeklyBenefit;
  const replacementRate = weeklyWage > 0 ? weeklyBenefit / weeklyWage : 0;

  return {
    state,
    weeklyBenefit,
    totalMax,
    maxWeeks: state.maxWeeks,
    cappedByState,
    replacementRate,
  };
}
