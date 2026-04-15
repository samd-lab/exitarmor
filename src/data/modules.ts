// Structured content for all 5 dashboard modules.
// Source of truth for UI: titles, checklist items, accent colors, and copy.
// Long-form prose still lives in /src/content/*.md for future render.

export type ModuleId =
  | 'first-48'
  | 'severance'
  | 'state'
  | 'cobra-aca'
  | 'budget'
  | 'job-search';

export type Phase = 'stabilize' | 'benefits' | 'finances' | 'job-search';

export interface ChecklistItem {
  id: string;
  label: string;
  detail?: string;
  day?: 'Day 1' | 'Day 2' | 'Day 3' | 'Day 4-7';
}

export interface ModuleSpec {
  id: ModuleId;
  title: string;
  short: string;
  description: string;
  accent: string; // hex
  iconBg: string;
  phase: Phase;
  itemIds: string[]; // ids of checklist items contributing to phase progress
}

// ---------- Modules ----------
export const MODULES: ModuleSpec[] = [
  {
    id: 'first-48',
    title: 'First 48-Hour Survival Checklist',
    short: 'First 48 Hours',
    description: 'Your critical first steps after a layoff — hour by hour.',
    accent: '#f97316',
    iconBg: 'linear-gradient(135deg, #fb923c, #ea580c)',
    phase: 'stabilize',
    itemIds: [
      '48-secure-data',
      '48-review-severance',
      '48-check-health-end',
      '48-cash-runway',
      '48-file-unemployment',
      '48-export-linkedin',
      '48-references',
      '48-notify-bank',
    ],
  },
  {
    id: 'severance',
    title: 'Severance Preparation Kit',
    short: 'Severance Prep',
    description: 'Maximize your package with proven scripts & templates.',
    accent: '#8b5cf6',
    iconBg: 'linear-gradient(135deg, #a78bfa, #7c3aed)',
    phase: 'benefits',
    itemIds: [
      'sev-benchmark',
      'sev-asks-list',
      'sev-email-templates',
      'sev-hr-script',
      'sev-rebuttal-ready',
      'sev-final-review',
    ],
  },
  {
    id: 'state',
    title: 'State-by-State Labor Resources',
    short: 'State Resources',
    description: 'Find exact rules, links, and benefits for your state.',
    accent: '#14b8a6',
    iconBg: 'linear-gradient(135deg, #2dd4bf, #0d9488)',
    phase: 'benefits',
    itemIds: [
      'state-unemployment-link',
      'state-pto-rules',
      'state-warn-act',
      'state-noncompete',
      'state-tax-withholding',
    ],
  },
  {
    id: 'cobra-aca',
    title: 'COBRA vs ACA Decision Matrix',
    short: 'COBRA vs ACA',
    description: 'Compare your health insurance options side-by-side.',
    accent: '#ec4899',
    iconBg: 'linear-gradient(135deg, #f472b6, #db2777)',
    phase: 'benefits',
    itemIds: [
      'health-cobra-window',
      'health-aca-sep',
      'health-cost-compare',
      'health-decision',
    ],
  },
  {
    id: 'budget',
    title: '90-Day Defense Budget',
    short: '90-Day Budget',
    description: 'Take control of your finances & extend your runway.',
    accent: '#10b981',
    iconBg: 'linear-gradient(135deg, #34d399, #059669)',
    phase: 'finances',
    itemIds: [
      'bud-bleed-rate',
      'bud-expense-cuts',
      'bud-creditor-scripts',
      'bud-emergency-fund',
      'bud-90-day-plan',
    ],
  },
  {
    id: 'job-search',
    title: 'Job Search Tools',
    short: 'Job Search',
    description: 'Get back to work faster with templates & trackers.',
    accent: '#0ea5e9',
    iconBg: 'linear-gradient(135deg, #38bdf8, #0284c7)',
    phase: 'job-search',
    itemIds: [
      'job-resume',
      'job-linkedin',
      'job-explain-layoff',
      'job-outreach',
      'job-tracker',
      'job-references',
      'job-interview-prep',
    ],
  },
];

// ---------- Phases (top progress strip) ----------
export interface PhaseSpec {
  id: Phase;
  step: number;
  label: string;
  sub: string;
  accent: string;
}

export const PHASES: PhaseSpec[] = [
  { id: 'stabilize', step: 1, label: 'Stabilize', sub: '48 Hours', accent: '#f97316' },
  { id: 'benefits', step: 2, label: 'Secure Benefits', sub: 'Week 1', accent: '#8b5cf6' },
  { id: 'finances', step: 3, label: 'Protect Finances', sub: 'Week 2', accent: '#10b981' },
  { id: 'job-search', step: 4, label: 'Launch Job Search', sub: 'Week 3+', accent: '#0ea5e9' },
];

// ---------- Checklists ----------
export const FIRST_48_ITEMS: ChecklistItem[] = [
  { id: '48-secure-data', day: 'Day 1', label: 'Secure personal data', detail: 'Download pay stubs, W-2s, performance reviews & contacts before access is cut.' },
  { id: '48-review-severance', day: 'Day 1', label: 'Review severance — DO NOT sign yet', detail: 'You typically have 21 days (45 if part of a group, 7 to revoke) under ADEA if you are 40+.' },
  { id: '48-check-health-end', day: 'Day 1', label: 'Check exact health insurance end date', detail: 'Find out when employer coverage stops so you can act inside the 60-day COBRA window.' },
  { id: '48-cash-runway', day: 'Day 1', label: 'Calculate 30-day cash runway', detail: 'Open the 90-Day Budget to size up your essential vs. cuttable expenses.' },
  { id: '48-file-unemployment', day: 'Day 2', label: 'File for unemployment', detail: 'Most states do not backdate — file the same week. Use the State Resources module for your link.' },
  { id: '48-export-linkedin', day: 'Day 2', label: 'Export LinkedIn connections', detail: 'Settings → Data Privacy → Get a copy of your data → Connections.' },
  { id: '48-references', day: 'Day 3', label: 'Lock in references', detail: 'Ask 3–5 managers/peers for written references before they forget you.' },
  { id: '48-notify-bank', day: 'Day 3', label: 'Notify bank — ask about hardship programs', detail: 'Many lenders offer no-cost forbearance for income-loss customers if you call early.' },
];

export const SEVERANCE_ITEMS: ChecklistItem[] = [
  { id: 'sev-benchmark', label: 'Benchmark your offer', detail: 'Standard is 1–2 weeks per year of service. Compare against your tenure.' },
  { id: 'sev-asks-list', label: 'Identify your top 3 asks', detail: 'PTO, COBRA reimbursement, vesting acceleration, non-compete removal, outplacement.' },
  { id: 'sev-email-templates', label: 'Draft request email', detail: 'Soft Stall → Leverage Rebuttal → Final Sign-off (templates inside).' },
  { id: 'sev-hr-script', label: 'Rehearse HR script', detail: 'Practice handling "this is non-negotiable" pushback.' },
  { id: 'sev-rebuttal-ready', label: 'Send rebuttal', detail: 'Send the formal counter once you are calm and prepared.' },
  { id: 'sev-final-review', label: 'Final review with attorney (if >$20K)', detail: 'Most employment attorneys offer free 15–30 min consultations.' },
];

export const STATE_ITEMS: ChecklistItem[] = [
  { id: 'state-unemployment-link', label: 'Bookmark your state unemployment portal' },
  { id: 'state-pto-rules', label: 'Confirm state PTO payout rules' },
  { id: 'state-warn-act', label: 'Check WARN Act eligibility' },
  { id: 'state-noncompete', label: 'Verify non-compete enforceability in your state' },
  { id: 'state-tax-withholding', label: 'Note state tax treatment of severance' },
];

export const COBRA_ITEMS: ChecklistItem[] = [
  { id: 'health-cobra-window', label: 'Note your COBRA election window (60 days)' },
  { id: 'health-aca-sep', label: 'Confirm ACA Special Enrollment Period (60 days)' },
  { id: 'health-cost-compare', label: 'Compare COBRA vs ACA monthly cost' },
  { id: 'health-decision', label: 'Make your enrollment decision' },
];

export const BUDGET_ITEMS: ChecklistItem[] = [
  { id: 'bud-bleed-rate', label: 'Calculate your monthly bleed rate' },
  { id: 'bud-expense-cuts', label: 'Cut subscriptions & non-essentials' },
  { id: 'bud-creditor-scripts', label: 'Call creditors — request hardship deferral' },
  { id: 'bud-emergency-fund', label: 'Map your full cash runway in months' },
  { id: 'bud-90-day-plan', label: 'Lock in your 90-day defense plan' },
];

export const JOB_SEARCH_ITEMS: ChecklistItem[] = [
  { id: 'job-resume', label: 'Refresh resume' },
  { id: 'job-linkedin', label: 'Update LinkedIn — turn on "Open to Work"' },
  { id: 'job-explain-layoff', label: 'Memorize your layoff explanation script' },
  { id: 'job-outreach', label: 'Send 10 warm-network outreach messages' },
  { id: 'job-tracker', label: 'Set up application tracker' },
  { id: 'job-references', label: 'Confirm 3 references' },
  { id: 'job-interview-prep', label: 'Practice elevator pitch' },
];

export const ITEMS_BY_MODULE: Record<ModuleId, ChecklistItem[]> = {
  'first-48': FIRST_48_ITEMS,
  severance: SEVERANCE_ITEMS,
  state: STATE_ITEMS,
  'cobra-aca': COBRA_ITEMS,
  budget: BUDGET_ITEMS,
  'job-search': JOB_SEARCH_ITEMS,
};

// Today's recommended actions — small curated subset surfaced on Overview
export const TODAYS_ACTIONS = [
  { id: '48-review-severance', label: 'Review your severance agreement (DO NOT sign yet)' },
  { id: '48-file-unemployment', label: 'File for unemployment to lock in backpay' },
  { id: '48-check-health-end', label: 'Check your health insurance end date' },
  { id: '48-cash-runway', label: 'Calculate 30-day cash runway' },
];

// ---------- States (subset for top-10 + sensible defaults) ----------
export interface StateInfo {
  code: string;
  name: string;
  unemploymentUrl: string;
  ptoPayoutRequired: 'yes' | 'no' | 'conditional';
  warnThreshold: number; // employees
  noncompeteAllowed: boolean;
  notes: string;
}

export const STATES: StateInfo[] = [
  { code: 'CA', name: 'California', unemploymentUrl: 'https://edd.ca.gov', ptoPayoutRequired: 'yes', warnThreshold: 75, noncompeteAllowed: false, notes: '3-day right to rescind a severance release. Mini-WARN at 75 employees.' },
  { code: 'NY', name: 'New York', unemploymentUrl: 'https://labor.ny.gov', ptoPayoutRequired: 'conditional', warnThreshold: 50, noncompeteAllowed: true, notes: '90-day NY WARN notice (vs federal 60). PTO payout depends on employer policy.' },
  { code: 'TX', name: 'Texas', unemploymentUrl: 'https://twc.texas.gov', ptoPayoutRequired: 'no', warnThreshold: 100, noncompeteAllowed: true, notes: 'No state income tax. Federal WARN Act applies (100+ employees).' },
  { code: 'FL', name: 'Florida', unemploymentUrl: 'https://connect.myflorida.com', ptoPayoutRequired: 'no', warnThreshold: 100, noncompeteAllowed: true, notes: 'Lower max benefit than most states. Federal WARN applies.' },
  { code: 'IL', name: 'Illinois', unemploymentUrl: 'https://ides.illinois.gov', ptoPayoutRequired: 'yes', warnThreshold: 75, noncompeteAllowed: true, notes: 'Illinois WARN at 75 employees. Strong biometric (BIPA) protections.' },
  { code: 'WA', name: 'Washington', unemploymentUrl: 'https://esd.wa.gov', ptoPayoutRequired: 'no', warnThreshold: 100, noncompeteAllowed: true, notes: 'No state income tax. Non-competes restricted by salary threshold.' },
  { code: 'MA', name: 'Massachusetts', unemploymentUrl: 'https://www.mass.gov/dua', ptoPayoutRequired: 'yes', warnThreshold: 100, noncompeteAllowed: true, notes: 'Vacation time is treated as wages — must be paid out at termination.' },
  { code: 'CO', name: 'Colorado', unemploymentUrl: 'https://cdle.colorado.gov', ptoPayoutRequired: 'yes', warnThreshold: 100, noncompeteAllowed: false, notes: 'Non-competes largely banned (2022). PTO must be paid out.' },
  { code: 'GA', name: 'Georgia', unemploymentUrl: 'https://dol.georgia.gov', ptoPayoutRequired: 'no', warnThreshold: 100, noncompeteAllowed: true, notes: 'Federal WARN Act applies. PTO payout depends on policy.' },
  { code: 'PA', name: 'Pennsylvania', unemploymentUrl: 'https://www.uc.pa.gov', ptoPayoutRequired: 'no', warnThreshold: 100, noncompeteAllowed: true, notes: 'Federal WARN Act baseline. Confirm policy for PTO payout.' },
];
