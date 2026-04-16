// Structured content for all dashboard modules.
// Source of truth for UI: titles, checklist items, accent colors, and copy.

import { STATES, type StateInfo } from './states';

export { STATES };
export type { StateInfo };

export type ModuleId =
  | 'first-48'
  | 'severance'
  | 'state'
  | 'cobra-aca'
  | 'budget'
  | 'job-search'
  | 'recovery-7day';

export type Phase = 'stabilize' | 'benefits' | 'finances' | 'job-search';

export interface ChecklistResource {
  label: string;
  url: string;
}

export interface ChecklistItem {
  id: string;
  label: string;
  detail?: string;
  day?: 'Day 1' | 'Day 2';
  why?: string;        // Why this matters
  how?: string;        // Step-by-step how to do it
  resources?: ChecklistResource[];
  warning?: string;    // Optional red-flag callout
  /** Optional jump link — renders a pill button on the checklist item
   *  that opens another module inside the dashboard (e.g. "Run the
   *  Calculator"). */
  jumpTo?: ModuleId;
  jumpLabel?: string;
}

export interface ModuleSpec {
  id: ModuleId;
  title: string;
  short: string;
  description: string;
  accent: string; // hex
  iconBg: string;
  phase: Phase;
  itemIds: string[];
}

// ---------- Modules ----------
export const MODULES: ModuleSpec[] = [
  {
    id: 'first-48',
    title: 'First 48-Hour Survival Checklist',
    short: 'First 48 Hours',
    description: 'Your critical first steps after a layoff — hour by hour.',
    // Crimson is reserved for urgency — First 48 is the ONLY module
    // that still uses it in the new calm palette.
    accent: '#c0392b',
    iconBg: 'linear-gradient(135deg, #c0392b, #8b1a23)',
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
    id: 'recovery-7day',
    title: '7-Day Recovery Companion',
    short: '7-Day Recovery',
    description: 'A guided first week — one small task at a time.',
    // Recovery is the CALMEST module — sage green.
    accent: '#5b7a6e',
    iconBg: 'linear-gradient(135deg, #5b7a6e, #86d0b0)',
    phase: 'stabilize',
    itemIds: [
      'rec-d1-breathe',
      'rec-d1-document',
      'rec-d1-tell-one-person',
      'rec-d2-file-ui',
      'rec-d2-freeze-credit',
      'rec-d3-health-decision',
      'rec-d3-cash-check',
      'rec-d4-counter-email',
      'rec-d4-owbpa',
      'rec-d5-network-list',
      'rec-d5-linkedin',
      'rec-d6-story',
      'rec-d6-references',
      'rec-d7-outreach',
      'rec-d7-reset',
    ],
  },
  {
    id: 'severance',
    title: 'Severance Preparation Kit',
    short: 'Severance Prep',
    description: 'Maximize your package with proven scripts & templates.',
    // Severance = warm terracotta — assertive but not alarm red.
    accent: '#c04a3c',
    iconBg: 'linear-gradient(135deg, #c04a3c, #d97757)',
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
    // State rules = editorial slate — feels like reference material.
    accent: '#4a5963',
    iconBg: 'linear-gradient(135deg, #4a5963, #2d3b44)',
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
    // Healthcare = forest green — health + positive outcome.
    accent: '#2d6a4f',
    iconBg: 'linear-gradient(135deg, #2d6a4f, #52b788)',
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
    // Budget = warm gold — money signal without bright amber noise.
    accent: '#d4a24c',
    iconBg: 'linear-gradient(135deg, #d4a24c, #b07c2a)',
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
    // Job search = deep sage — growth, forward motion, not panic.
    accent: '#3f5a50',
    iconBg: 'linear-gradient(135deg, #3f5a50, #5b7a6e)',
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

// ---------- Phases ----------
export interface PhaseSpec {
  id: Phase;
  step: number;
  label: string;
  sub: string;
  accent: string;
}

export const PHASES: PhaseSpec[] = [
  // Phase colors mirror the module palette above so the phase
  // rail and the module cards read as the same visual system.
  { id: 'stabilize', step: 1, label: 'Stabilize', sub: '48 Hours', accent: '#c0392b' },
  { id: 'benefits', step: 2, label: 'Secure Benefits', sub: 'Week 1', accent: '#2d6a4f' },
  { id: 'finances', step: 3, label: 'Protect Finances', sub: 'Week 2', accent: '#d4a24c' },
  { id: 'job-search', step: 4, label: 'Launch Job Search', sub: 'Week 3+', accent: '#3f5a50' },
];

// ---------- Enriched Checklists ----------
export const FIRST_48_ITEMS: ChecklistItem[] = [
  {
    id: '48-secure-data',
    day: 'Day 1',
    label: 'Secure personal data before access is cut',
    detail: 'Download pay stubs, W-2s, performance reviews, and contacts within the first hour.',
    why: 'Most companies disable email, VPN, and HRIS access within hours of a layoff notice — sometimes before you even leave the building. If you do not save your records now, you may never recover them. You will need pay stubs and W-2s for unemployment, COBRA, loan applications, and future references. Performance reviews are essential proof of your value when negotiating severance or explaining the layoff to future employers.',
    how: 'Step 1: Log into Workday/ADP/Gusto and download the last 12 months of pay stubs and your most recent W-2. Step 2: Take screenshots or PDF exports of every performance review, promotion letter, and recognition award. Step 3: Export your Outlook/Gmail contacts (you are entitled to your personal network, not proprietary client lists). Step 4: Save project samples, testimonials, and LinkedIn recommendations. Never take confidential company data, source code, or client lists — that creates legal exposure.',
    resources: [
      { label: 'IRS: Understanding your W-2', url: 'https://www.irs.gov/forms-pubs/about-form-w-2' },
      { label: 'LinkedIn connection export guide', url: 'https://www.linkedin.com/help/linkedin/answer/a566336' },
    ],
    warning: 'Do NOT take proprietary company documents, source code, client lists, or trade secrets. Stick to your own records.',
  },
  {
    id: '48-review-severance',
    day: 'Day 1',
    label: 'Review severance — DO NOT sign yet',
    detail: 'Under ADEA you typically have 21 days (45 if part of a group layoff, plus 7 to revoke) if you are 40+.',
    jumpTo: 'severance',
    jumpLabel: 'Open the Severance Prep module',
    why: 'Signing the severance agreement on the spot is the single biggest financial mistake laid-off workers make. You waive potential claims — age discrimination, ERISA violations, unpaid wages — in exchange for the stated severance. Once signed, it is very difficult to undo. The Older Workers Benefit Protection Act (OWBPA) gives workers 40+ a mandatory review window. Use every day of it.',
    how: 'Step 1: Read the entire document twice — pay special attention to the release of claims, non-compete, non-disparagement, and confidentiality sections. Step 2: Note the exact deadline to sign and the revocation window. Step 3: Do not sign and do not verbally agree. Say: "Thank you, I will review with my advisors and respond by [deadline]." Step 4: If the package is over $20K or involves complex equity, get a 15-minute consult with an employment attorney — most offer free initial reviews.',
    resources: [
      { label: 'EEOC: Understanding Waivers (ADEA)', url: 'https://www.eeoc.gov/laws/guidance/understanding-waivers-discrimination-claims-employee-severance-agreements' },
      { label: 'NELA: Find an employment attorney', url: 'https://www.nela.org/find-a-lawyer' },
    ],
    warning: 'Never sign in the termination meeting. The deadline is always at least 21 days out if you are 40+.',
  },
  {
    id: '48-check-health-end',
    day: 'Day 1',
    label: 'Confirm exact health insurance end date',
    detail: 'Know whether coverage ends immediately or at month-end so you can time COBRA/ACA correctly.',
    jumpTo: 'cobra-aca',
    jumpLabel: 'Compare COBRA vs ACA',
    why: 'Health coverage gaps are the fastest way to drain savings — a single ER visit during a gap can cost $5,000+. Some employers end coverage the day of termination; others run it to the end of the month. You have 60 days to elect COBRA retroactively, but that is a strategic decision, not a safety net — electing late means paying for gap coverage and leaves you exposed.',
    how: 'Step 1: Ask HR in writing (email is fine): "What is my last day of active health coverage?" Step 2: Download your insurance ID cards and benefits summary today. Step 3: Note the 60-day COBRA election window — it starts from either your coverage end date or when you receive the COBRA notice, whichever is later. Step 4: Also note the 60-day ACA Special Enrollment Period — loss of employer coverage is a qualifying life event.',
    resources: [
      { label: 'DOL: COBRA Continuation Coverage', url: 'https://www.dol.gov/general/topic/health-plans/cobra' },
      { label: 'Healthcare.gov: Special Enrollment', url: 'https://www.healthcare.gov/glossary/special-enrollment-period' },
    ],
  },
  {
    id: '48-cash-runway',
    day: 'Day 1',
    label: 'Calculate your 30-day cash runway',
    detail: 'Know your burn rate and how long current cash will last before you start cutting.',
    jumpTo: 'budget',
    jumpLabel: 'Run the Runway Calculator',
    why: 'You cannot plan if you do not know the numbers. Most people dramatically overestimate how long their savings will last because they forget recurring subscriptions, insurance, and taxes. Knowing the real number turns panic into a plan — and tells you how aggressively to negotiate severance and cut expenses.',
    how: 'Open the 90-Day Defense Budget module. Enter: rent/mortgage, utilities, food, transportation, debt minimums, insurance, childcare. Sum up liquid savings (checking, HYSA, accessible cash). Divide savings by monthly essentials. Under 3 months = aggressive action required. Over 6 months = you have room to negotiate without panic.',
  },
  {
    id: '48-file-unemployment',
    day: 'Day 2',
    label: 'File for unemployment benefits',
    detail: 'Most states do NOT backdate. File the same week you are notified.',
    jumpTo: 'state',
    jumpLabel: 'Open your State Resources',
    why: 'Unemployment insurance is money you are legally owed — it comes from taxes your employer paid, not from public assistance. Every week you delay is a week of benefits lost forever. Average US benefit is $385/week for up to 26 weeks — that is over $10,000 left on the table if you wait a month. Severance does NOT disqualify you in most states, though it may delay the start.',
    how: 'Go to the State Resources module and open your state DOL portal. Have ready: SSN, driver\'s license, employer name/address/dates, reason for separation ("laid off" or "lack of work"), last 18 months of wages. Answer honestly — lying is fraud. File even if you got severance; the agency will handle timing.',
    resources: [
      { label: 'CareerOneStop: State UI Offices', url: 'https://www.careeronestop.org/LocalHelp/UnemploymentBenefits' },
    ],
  },
  {
    id: '48-export-linkedin',
    day: 'Day 2',
    label: 'Export LinkedIn connections & recommendations',
    detail: 'Settings → Data Privacy → Get a copy of your data → Connections.',
    why: 'LinkedIn connections are portable — they are yours. Recommendations are harder to replace; if a former manager\'s profile changes or their account is deleted, recommendations can vanish. Exporting creates a permanent record for your own files.',
    how: 'On desktop LinkedIn: click Me → Settings & Privacy → Data Privacy → Get a copy of your data. Select "Connections" and "Recommendations" at minimum. The CSV arrives in 10-30 minutes. Save to your personal cloud drive.',
    resources: [
      { label: 'LinkedIn data export', url: 'https://www.linkedin.com/psettings/member-data' },
    ],
  },
  {
    id: '48-references',
    day: 'Day 2',
    label: 'Lock in 3–5 written references',
    detail: 'Ask managers, peers, and skip-level contacts for a short LinkedIn recommendation now.',
    why: 'Memories fade in 90 days. The people who loved your work will move on, change jobs, or forget specifics of your contributions. Getting written references now — while you are top of mind and while the context is fresh — dramatically increases quality and response rate. Written recommendations on LinkedIn are also permanent social proof for future recruiters.',
    how: 'Send a warm, brief message to 3-5 people: "Hi [Name], as you may have heard, my role was affected by recent cuts. I really valued working with you on [specific project]. Would you be willing to write a short LinkedIn recommendation based on that work? Happy to draft something you can edit if that\'s easier." Offer a template — people are busy. Follow up once at 5 days if no reply.',
  },
  {
    id: '48-notify-bank',
    day: 'Day 2',
    label: 'Call bank/lender — ask about hardship programs',
    detail: 'Many lenders offer no-cost forbearance for income-loss customers if you call early.',
    why: 'Forbearance programs are designed to be used — banks would rather pause your payments for 3 months than have you default. But they are only helpful if you call BEFORE you miss a payment. Once you are delinquent, it damages your credit and limits options. A single call can save your credit score and buy you 90 days of breathing room on your biggest monthly expense.',
    how: 'Call the 800-number on your statement. Say: "I was laid off from my job on [date]. Can you tell me what hardship or forbearance programs you offer for income-loss customers?" Ask about: payment deferrals, interest-only periods, loan modification, and whether it reports to credit bureaus. Get everything in writing before accepting.',
    resources: [
      { label: 'CFPB: Mortgage hardship options', url: 'https://www.consumerfinance.gov/ask-cfpb/what-should-i-do-if-i-cant-pay-my-mortgage-en-1853' },
    ],
  },
];

export const SEVERANCE_ITEMS: ChecklistItem[] = [
  {
    id: 'sev-benchmark',
    label: 'Benchmark your offer against industry standard',
    detail: 'Standard is 1–2 weeks per year of service. Senior leaders: 3–4 weeks per year.',
    why: 'You cannot negotiate a better deal if you do not know what "normal" looks like. Most companies start with a below-market offer assuming you will accept out of shock. Benchmarking arms you with specific data to push back on.',
    how: 'Calculate: (years of service) × (2 weeks of pay). Compare to the offered amount. If you are senior (Director+), multiply by 3. Add: bonus pro-ration, PTO payout, COBRA subsidy value. Most offers are $5,000-$15,000 below the negotiable ceiling.',
    resources: [
      { label: 'Levels.fyi severance benchmarks', url: 'https://www.levels.fyi' },
    ],
  },
  {
    id: 'sev-asks-list',
    label: 'Identify your top 3 asks',
    detail: 'Pick three: more pay, COBRA reimbursement, vesting, non-compete removal, outplacement.',
    why: 'Negotiating everything at once comes across as greedy and gives HR easy wins on small items. Concentrated asks (3 max) land better. Rank by your actual life needs: if you have 6 months savings, prioritize benefits; if you have 2 months, prioritize cash.',
    how: 'Rank the 11 negotiable items (see Asks tab) by impact on your situation. Pick the top 3. For each, write one sentence justifying it. Lead with your strongest ask in the first email.',
  },
  {
    id: 'sev-email-templates',
    label: 'Draft your negotiation emails',
    detail: 'Use the Soft Stall, Leverage Rebuttal, and Final Sign-off templates inside.',
    why: 'Email creates a written record, gives you time to think, and forces HR to escalate to decision-makers instead of dismissing you verbally. Negotiating over email (not on the phone) is a significant unfair advantage.',
    how: 'Open the Email Templates tab. Start with Soft Stall (buys time, sets up the negotiation). Follow with Leverage Rebuttal (makes the ask). Finish with Final Sign-off (protects you on execution). Copy, personalize, send.',
  },
  {
    id: 'sev-hr-script',
    label: 'Rehearse your HR pushback script',
    detail: 'Practice handling "this offer is non-negotiable" — it almost never is.',
    why: 'HR is trained to say "final offer" reflexively. Over 70% of severance offers are actually negotiable — especially for tenured employees and group layoffs. Practicing your response removes emotion from the conversation.',
    how: 'Prepare three sentences: (1) "I appreciate the offer and understand the constraints." (2) "Based on my X years and Y contributions, I am asking for [specific ask]." (3) "Who is the right person to approve this? I am happy to wait a few days for a response." Say this out loud three times. Stay calm, specific, and patient.',
  },
  {
    id: 'sev-rebuttal-ready',
    label: 'Send your formal counter-offer',
    detail: 'Send once you are calm, prepared, and within the review window.',
    why: 'Every day inside the review window is leverage. Send too early and HR thinks you were not serious; send too late and you miss the window. Mid-window (day 7-14 of a 21-day window) is the sweet spot.',
    how: 'Use the Leverage Rebuttal template. Be specific, quantified, and calm. CC the recruiter or manager if you have a positive relationship there. Give HR 3-5 business days to respond before following up.',
  },
  {
    id: 'sev-final-review',
    label: 'Attorney review (if package > $20K)',
    detail: 'Most employment attorneys offer free 15–30 minute consultations.',
    why: 'For any severance over $20,000 or any complex equity/non-compete situation, a $200-$500 attorney review is the best ROI money you will spend. They catch things you will not: hidden waivers, unusual clauses, vesting cliffs, state-specific protections.',
    how: 'Go to NELA (National Employment Lawyers Association) or your state bar referral service. Look for employment law attorneys offering free initial consultations. Send them: the agreement, your offer letter, last 3 pay stubs, and a 1-paragraph summary of the situation.',
    resources: [
      { label: 'NELA: National Employment Lawyers Association', url: 'https://www.nela.org/find-a-lawyer' },
      { label: 'American Bar Association: Free Legal Help', url: 'https://www.americanbar.org/groups/legal_services/flh-home' },
    ],
  },
];

export const STATE_ITEMS: ChecklistItem[] = [
  {
    id: 'state-unemployment-link',
    label: 'Bookmark your state unemployment portal',
    why: 'Every state has its own unemployment insurance (UI) portal with different rules, deadlines, and benefit amounts. Filing in the wrong portal or missing your state\'s specific deadline can delay benefits by weeks.',
    how: 'Select your state in the State Resources module. The direct portal link is provided. Bookmark it and create your account the same day you are laid off.',
  },
  {
    id: 'state-pto-rules',
    label: 'Confirm your state PTO payout rules',
    why: 'Some states (California, Massachusetts, Colorado) legally require PTO payout at termination — it is treated as earned wages. Other states defer to employer policy. Knowing the law means you can push back if HR tries to deny your accrued time.',
    how: 'Check the State Resources module\'s PTO Payout column for your state. If it says "Yes," your PTO must be paid out regardless of what HR claims.',
  },
  {
    id: 'state-warn-act',
    label: 'Check WARN Act eligibility',
    why: 'The federal WARN Act requires 60 days notice for layoffs of 50+ employees at plants of 100+ workers. Some states (NY, NJ, CA, IL) have stricter mini-WARN laws. If your employer failed to give proper notice, you may be owed back pay.',
    how: 'Determine: how many employees were affected? Is your site \u2265100 workers? Did you get 60+ days notice? If "50+", "yes", and "no" — you may have a WARN claim. Consult an attorney.',
    resources: [
      { label: 'DOL: WARN Act Advisor', url: 'https://webapps.dol.gov/elaws/eta/warn' },
    ],
  },
  {
    id: 'state-noncompete',
    label: 'Verify non-compete enforceability in your state',
    why: 'Non-competes are unenforceable in California, North Dakota, Minnesota (2023+), and DC. Many other states (IL, VA, WA, MD) restrict them by salary threshold. If your state does not enforce them, a non-compete clause in your severance is not a real constraint — but you can still negotiate its removal for leverage.',
    how: 'Check the State Resources module Non-Compete column. If your state does not enforce them, you can confidently demand removal. If enforceable, negotiate scope/duration down or demand "garden leave" payment.',
  },
  {
    id: 'state-tax-withholding',
    label: 'Understand state tax treatment of severance',
    why: 'Severance is taxed as ordinary income (federal + state). Lump sums often get 22% federal withholding, but your actual rate may be lower — meaning you may get money back at tax time. States with no income tax (TX, FL, WA, NV, TN, SD, WY, AK, NH) save you 5-10% compared to high-tax states.',
    how: 'Ask HR to withhold additional federal tax if your severance pushes you into a higher bracket. Set aside 30-35% of the gross for taxes in a separate account. Consult a CPA if severance exceeds $50K.',
  },
];

export const COBRA_ITEMS: ChecklistItem[] = [
  {
    id: 'health-cobra-window',
    label: 'Note your 60-day COBRA election window',
    detail: 'You have 60 days to elect COBRA and can backdate coverage to your termination date.',
    why: 'COBRA is expensive (100% of premium + 2% admin fee) but it preserves your existing network, deductible progress, and in-network specialists. The 60-day window is a strategic asset: you can wait 50 days to see if you need care, then elect retroactively if you did.',
    how: 'Find your COBRA notice (arrives within 44 days of termination). Note the election deadline. Do NOT elect immediately unless you have planned care. If you need coverage within 60 days, you can elect retroactively and it will cover you.',
    resources: [
      { label: 'DOL COBRA guide', url: 'https://www.dol.gov/agencies/ebsa/laws-and-regulations/laws/cobra' },
    ],
  },
  {
    id: 'health-aca-sep',
    label: 'Confirm your 60-day ACA Special Enrollment Period',
    detail: 'Loss of employer coverage triggers a 60-day window on healthcare.gov.',
    why: 'ACA marketplace plans often cost 40-70% less than COBRA for laid-off workers because of income-based subsidies. If your household income is under $60K single / $120K family, you likely qualify for substantial premium tax credits.',
    how: 'Go to healthcare.gov and complete a Marketplace application. Report "I lost my job-based coverage" and your estimated 2025 income (include severance and UI). The site will show plans with subsidies applied.',
    resources: [
      { label: 'Healthcare.gov', url: 'https://www.healthcare.gov' },
    ],
  },
  {
    id: 'health-cost-compare',
    label: 'Compare COBRA vs ACA monthly cost + network',
    detail: 'Use the built-in calculator.',
    why: 'Cost is not the only factor. COBRA preserves your current doctors, specialists, and deductible. ACA often costs less but may have narrower networks. Compare total-out-of-pocket, not just premiums.',
    how: 'Use the calculator in this module. Enter: age, household income, estimated COBRA monthly premium, household size. It estimates your ACA subsidized cost and recommends the better option.',
  },
  {
    id: 'health-decision',
    label: 'Make your enrollment decision',
    why: 'Waiting past 60 days means losing both options — COBRA and the ACA Special Enrollment Period. Gap coverage leaves you uninsured and one ER visit from financial ruin.',
    how: 'By day 45: pick COBRA or ACA. Elect before day 60. Keep the paperwork in a safe place.',
  },
];

export const BUDGET_ITEMS: ChecklistItem[] = [
  {
    id: 'bud-bleed-rate',
    label: 'Calculate your monthly bleed rate',
    why: 'The "bleed rate" is your essential monthly outflow minus any income (severance, UI, side gigs). This number tells you exactly how many months your savings will last. Without it, every financial decision is guesswork.',
    how: 'Use the calculator below. Add up rent/mortgage, utilities, groceries, transportation, insurance, and minimum debt payments. Subtract severance (spread over the months it covers) and UI. The result is your monthly bleed.',
  },
  {
    id: 'bud-expense-cuts',
    label: 'Cut subscriptions and non-essentials',
    why: 'The average American spends $200-$400/month on subscriptions they do not actively use (streaming, gym, apps, cloud storage, delivery services). Cutting these adds 1-2 months to your runway with zero quality-of-life impact.',
    how: 'Open your last 3 bank/credit card statements. List every recurring charge under $50. Cancel anything you have not used in 30 days. Downgrade streaming to one service. Pause gym if you are not going. Easy 2-3 month runway extension.',
    resources: [
      { label: 'Rocket Money (subscription cancellation)', url: 'https://www.rocketmoney.com' },
    ],
  },
  {
    id: 'bud-creditor-scripts',
    label: 'Call creditors for hardship deferral',
    why: 'Most lenders have formal hardship programs for customers with income loss — they are cheaper for the bank than a default. Programs include payment deferrals, interest-only periods, and waived late fees. But you must call BEFORE you miss a payment.',
    how: 'Call your mortgage, auto loan, credit card, and student loan servicers. Say: "I was laid off on [date]. Can you tell me about hardship programs available for income-loss customers?" Ask if it reports to credit bureaus — hardship programs typically do not affect your score if you stay current under the new terms.',
  },
  {
    id: 'bud-emergency-fund',
    label: 'Map your full cash runway in months',
    why: 'Once you have your bleed rate and total accessible cash, divide the two to get your runway in months. This number drives every other decision — how hard to negotiate severance, how aggressive to cut, and how fast you need to land a new job.',
    how: 'Runway = (liquid savings + severance after tax + expected UI) / monthly bleed. Under 3 months: emergency mode — cut aggressively, consider 401(k) loan NOT withdrawal. 3-6 months: breathing room — negotiate hard but do not panic. 6+ months: run a proper search without rushing.',
  },
  {
    id: 'bud-90-day-plan',
    label: 'Lock in your 90-day defense plan',
    why: 'Month 1: defense (cut, call creditors, secure benefits). Month 2: offense (job search at full intensity). Month 3: transition (interview pipeline converting). Having this framework keeps you from flailing.',
    how: 'Write your 90-day plan: Month 1 cuts + benefits enrolled, Month 2 target 50+ applications + 10 networking conversations, Month 3 final interviews + offer negotiation. Review weekly.',
  },
];

export const JOB_SEARCH_ITEMS: ChecklistItem[] = [
  {
    id: 'job-resume',
    label: 'Refresh your resume',
    why: 'Your current resume is probably 2-3 years stale and ATS-hostile. 75% of resumes are rejected by Applicant Tracking Systems before a human sees them. A quick refresh against modern ATS standards dramatically improves callback rates.',
    how: 'Use a clean single-column template (no tables, no graphics, no columns). Add metrics to every bullet: "Led team of 6" → "Led 6-person team that shipped $2M product in 4 months." Put your most recent role at top with reverse chronological. Save as PDF with your name: LastName_FirstName_Resume.pdf.',
    resources: [
      { label: 'Jobscan: ATS resume checker', url: 'https://www.jobscan.co' },
    ],
  },
  {
    id: 'job-linkedin',
    label: 'Update LinkedIn and turn on "Open to Work"',
    why: '77% of recruiters use LinkedIn as their primary sourcing tool. An outdated profile is worse than no profile. The "Open to Work" signal (visible to recruiters only) triples your inbound.',
    how: 'Update your headline to a role target, not a title: "Senior Product Manager open to Staff+ roles" not "Senior PM at Acme." Refresh your About section to 3-4 sentences. Turn on Open to Work in Settings (visible to recruiters only). Post a brief "I was impacted by recent layoffs" update — these posts regularly get 50-500+ engagements and drive real opportunities.',
  },
  {
    id: 'job-explain-layoff',
    label: 'Memorize your layoff explanation',
    why: 'Every interviewer will ask "Why did you leave your last role?" Fumbling this answer signals weakness. A calm, practiced 2-sentence response neutralizes it immediately.',
    how: 'Use this template: "My role was eliminated in [month] as part of [company-wide / department / org restructure] that affected [#] people. I\'m now focused on [target role] at companies solving [problem you care about]." Practice until it is automatic. Do NOT badmouth the employer, ever.',
  },
  {
    id: 'job-outreach',
    label: 'Send 10 warm-network outreach messages',
    why: '60-80% of hires happen through networks, not job boards. Your dormant network — old colleagues, classmates, former managers — is the highest-ROI activity in any job search. A single warm intro is worth 100 cold applications.',
    how: 'List 20 people who know your work. Pick 10 for week 1. Send this: "Hi [Name], hope you\'re well. Short update — my role at [Company] was affected last week, and I\'m in search mode for [target role]. I remember you really enjoyed [specific thing]. If you know of anyone open to a quick 15-min chat, I\'d be grateful for the intro." Do NOT ask for a job — ask for advice.',
  },
  {
    id: 'job-tracker',
    label: 'Set up your application tracker',
    why: 'Unorganized job searches fail. Without a tracker, you forget where you applied, miss follow-ups, and duplicate outreach. A simple spreadsheet triples your response rate by enabling systematic follow-up.',
    how: 'Create a Google Sheet with columns: Company, Role, Applied date, Source, Contact, Last touch, Status (Applied / Screen / Interview / Offer / Rejected), Notes. Update daily.',
    resources: [
      { label: 'Huntr: Free job tracker', url: 'https://huntr.co' },
    ],
  },
  {
    id: 'job-references',
    label: 'Confirm 3 professional references',
    why: 'Offers often move to reference check within 24 hours. Being caught flat-footed at that stage has killed deals for many candidates. Line them up before you need them.',
    how: 'Pick 3 people: 1 former manager, 1 peer, 1 direct report (if applicable). Call each: "I wanted to let you know I\'m in search mode and may list you as a reference. Is that OK? If so, what phone number and email should I use?" Send them a heads-up 24 hours before every reference call so they are prepared.',
  },
  {
    id: 'job-interview-prep',
    label: 'Practice your elevator pitch and STAR stories',
    why: 'Interview performance is 90% preparation, 10% talent. Strong candidates lose offers to weaker ones who prepared better. 2-3 hours of practice per week during a search is the highest-leverage activity.',
    how: 'Write 6 STAR stories (Situation, Task, Action, Result) covering: a big win, a failure you recovered from, a conflict, a leadership moment, a technical deep-dive, a cross-functional project. Practice them out loud until they flow. Use them to answer 80% of behavioral interview questions.',
    resources: [
      { label: 'Amazon Leadership Principles (widely used STAR framework)', url: 'https://www.amazon.jobs/content/en/our-workplace/leadership-principles' },
    ],
  },
];

// ---------- 7-Day Recovery Companion ----------
// Day-by-day tasks. Small, emotionally-aware, builds momentum through the
// hardest first week. Items reuse the same checklist state so progress
// contributes to the overall dashboard completion bar.
export const RECOVERY_ITEMS: ChecklistItem[] = [
  { id: 'rec-d1-breathe', label: 'Take 30 minutes to breathe — you do not have to decide anything today', detail: 'Day 1 · Before any paperwork.' },
  { id: 'rec-d1-document', label: 'Save pay stubs, W-2, and performance reviews to personal cloud', detail: 'Day 1 · Before access is cut.' },
  { id: 'rec-d1-tell-one-person', label: 'Tell one trusted person — out loud — what happened', detail: 'Day 1 · Saying it makes it real and smaller.' },
  { id: 'rec-d2-file-ui', label: 'File for unemployment in your state', detail: 'Day 2 · Most states do not backdate.', jumpTo: 'state', jumpLabel: 'Open State Resources' },
  { id: 'rec-d2-freeze-credit', label: 'Pause any non-essential autopay or freeze credit applications', detail: 'Day 2 · Cut one thing that felt reflexive.' },
  { id: 'rec-d3-health-decision', label: 'Pick a lane on health coverage (COBRA vs ACA)', detail: 'Day 3 · Use the calculator — do not elect yet unless urgent.', jumpTo: 'cobra-aca', jumpLabel: 'Compare COBRA vs ACA' },
  { id: 'rec-d3-cash-check', label: 'Run the runway calculator and look at the number', detail: 'Day 3 · The number is less scary than the uncertainty.', jumpTo: 'budget', jumpLabel: 'Run the Runway Calculator' },
  { id: 'rec-d4-counter-email', label: 'Draft your severance counter email — do not send yet', detail: 'Day 4 · Sleep on it.', jumpTo: 'severance', jumpLabel: 'Open Email Templates' },
  { id: 'rec-d4-owbpa', label: 'If 40+, write your review deadline on a sticky note', detail: 'Day 4 · 21 days (or 45 for group) is a lot of leverage.', jumpTo: 'severance', jumpLabel: 'Open Severance Prep' },
  { id: 'rec-d5-network-list', label: 'Write down 20 people who know your work', detail: 'Day 5 · Former bosses, peers, direct reports, classmates.', jumpTo: 'job-search', jumpLabel: 'Open Job Search Tools' },
  { id: 'rec-d5-linkedin', label: 'Turn on LinkedIn "Open to Work" (recruiters only)', detail: 'Day 5 · Triples your inbound. Update headline to target role.', jumpTo: 'job-search', jumpLabel: 'Open Job Search Tools' },
  { id: 'rec-d6-story', label: 'Practice your 2-sentence layoff story until it is boring', detail: 'Day 6 · "My role was eliminated as part of... I am now focused on..."', jumpTo: 'job-search', jumpLabel: 'Use the Story Builder' },
  { id: 'rec-d6-references', label: 'Ask 3 people for a LinkedIn recommendation', detail: 'Day 6 · Memory fades fast. Ask while the context is fresh.', jumpTo: 'severance', jumpLabel: 'Send the reference email' },
  { id: 'rec-d7-outreach', label: 'Send 5 warm-network "grabbing coffee?" messages', detail: 'Day 7 · Ask for advice, not a job. Advice leads to jobs.', jumpTo: 'job-search', jumpLabel: 'Open the warm-network template' },
  { id: 'rec-d7-reset', label: 'Plan one small good thing for tomorrow', detail: 'Day 7 · You finished the hardest week. Close it deliberately.' },
];

export const ITEMS_BY_MODULE: Record<ModuleId, ChecklistItem[]> = {
  'first-48': FIRST_48_ITEMS,
  severance: SEVERANCE_ITEMS,
  state: STATE_ITEMS,
  'cobra-aca': COBRA_ITEMS,
  budget: BUDGET_ITEMS,
  'job-search': JOB_SEARCH_ITEMS,
  'recovery-7day': RECOVERY_ITEMS,
};

export const TODAYS_ACTIONS = [
  { id: '48-review-severance', label: 'Review your severance agreement (DO NOT sign yet)' },
  { id: '48-file-unemployment', label: 'File for unemployment to lock in backpay' },
  { id: '48-check-health-end', label: 'Check your health insurance end date' },
  { id: '48-cash-runway', label: 'Calculate 30-day cash runway' },
];
