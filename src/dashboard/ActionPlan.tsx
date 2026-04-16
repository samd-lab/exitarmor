// Printable personal playbook — the tangible deliverable a user takes away.
//
// Reads EVERY persistent storage key the app writes:
//   - profile              (exitarmor.v1.profile)
//   - severance.calc       (exitarmor.v1.severance.calc)
//   - budget.runway        (exitarmor.v1.budget.runway)
//   - cobra.inputs         (exitarmor.v1.cobra.inputs)
//   - offers.compare       (exitarmor.v1.offers.compare)
//   - stories.star         (exitarmor.v1.stories.star)
//   - state.selected       (exitarmor.v1.state.selected)
//   - progress             (exitarmor.v1.progress)  -- checklist completion map
//
// Each section renders conditionally: we only print what the user actually
// filled in. Empty calculators (still at defaults) are skipped so the PDF
// doesn't pad itself with generic junk. Users hit "Save as PDF" which just
// calls window.print() — no PDF library dependency.
//
// The @media print block in action-plan.css hides navigation chrome and
// tightens margins for clean 8.5x11 output. New sections all use
// page-break-inside: avoid so a section never splits mid-card.

import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { BrandMark } from '../components/BrandMark';
import { EMAIL_TEMPLATES } from '../data/emailTemplates';
import type { EmailTemplate } from '../data/emailTemplates';
import {
  DEFAULT_SEVERANCE_INPUT,
  calculateRunway,
  estimateSeverance,
  estimateUnemployment,
  money,
  runwayLabel,
} from '../lib/calculators';
import type { RunwayInput, SeveranceInput } from '../lib/calculators';
import { STATES, UI_DATA_AS_OF } from '../data/states';
import { FIRST_48_ITEMS, ITEMS_BY_MODULE, MODULES, RECOVERY_ITEMS } from '../data/modules';
import type { ModuleId } from '../data/modules';
import { countChecked, loadJSON, personalize } from '../lib/storage';
import type { ChecklistMap, UserProfile } from '../lib/storage';
import { EMPTY_PROFILE } from '../lib/storage';
import { usePageMeta } from '../lib/seo';
import {
  COBRA_ACA_DEFAULTS,
  estimateAca,
} from './modules/CobraVsAca';
import type { CobraAcaInputs } from './modules/CobraVsAca';
import './dashboard.css';
import './action-plan.css';

// ---------------------------------------------------------------------------
// Local defaults — must match the defaults used in each source module so we
// can tell when a user has actually touched a calculator vs when they haven't.
// ---------------------------------------------------------------------------

const DEFAULT_RUNWAY: RunwayInput = {
  rent: 1800,
  food: 600,
  insurance: 350,
  utilities: 220,
  debt: 400,
  other: 250,
  discretionary: 300,
  monthlyIncome: 0,
  savings: 12000,
};

interface Offer {
  label: string;
  baseWeeks: number;
  weeklyPay: number;
  cobraMonths: number;
  cobraMonthlyValue: number;
  bonusDollars: number;
  ptoDays: number;
  dailyRate: number;
  equityDollars: number;
  otherDollars: number;
  notes: string;
}

const EMPTY_OFFER = (label: string): Offer => ({
  label,
  baseWeeks: 0,
  weeklyPay: 0,
  cobraMonths: 0,
  cobraMonthlyValue: 0,
  bonusDollars: 0,
  ptoDays: 0,
  dailyRate: 0,
  equityDollars: 0,
  otherDollars: 0,
  notes: '',
});

const EMPTY_OFFERS: { a: Offer; b: Offer } = {
  a: EMPTY_OFFER('Offer A'),
  b: EMPTY_OFFER('Offer B'),
};

interface Story {
  id: string;
  title: string;
  situation: string;
  task: string;
  action: string;
  result: string;
}

const STORY_LABELS: Record<string, string> = {
  win: 'A big win',
  failure: 'A failure you recovered from',
  conflict: 'A conflict you handled',
  leadership: 'A leadership moment',
  'hard-work': 'A technical / craft deep-dive',
  teamwork: 'A cross-team / cross-functional win',
};

// ---------------------------------------------------------------------------
// Pure helpers — "did the user touch this calculator?" detection
// ---------------------------------------------------------------------------

function runwayIsCustomized(r: RunwayInput): boolean {
  const keys = Object.keys(DEFAULT_RUNWAY) as Array<keyof RunwayInput>;
  return keys.some((k) => r[k] !== DEFAULT_RUNWAY[k]);
}

function cobraIsCustomized(c: CobraAcaInputs): boolean {
  return (
    c.age !== COBRA_ACA_DEFAULTS.age ||
    c.income !== COBRA_ACA_DEFAULTS.income ||
    c.cobraMonthly !== COBRA_ACA_DEFAULTS.cobraMonthly ||
    c.household !== COBRA_ACA_DEFAULTS.household
  );
}

function offerHasContent(o: Offer): boolean {
  return (
    o.baseWeeks > 0 ||
    o.weeklyPay > 0 ||
    o.cobraMonths > 0 ||
    o.cobraMonthlyValue > 0 ||
    o.bonusDollars > 0 ||
    o.ptoDays > 0 ||
    o.dailyRate > 0 ||
    o.equityDollars > 0 ||
    o.otherDollars > 0 ||
    (o.notes ?? '').trim().length > 0
  );
}

function storyWordCount(s: Story): number {
  return `${s.situation} ${s.task} ${s.action} ${s.result}`
    .split(/\s+/)
    .filter(Boolean).length;
}

function storyIsFilled(s: Story): boolean {
  return storyWordCount(s) >= 15;
}

function buildStoryAnswer(s: Story): string {
  const parts: string[] = [];
  if (s.situation.trim()) parts.push(s.situation.trim());
  if (s.task.trim()) parts.push(s.task.trim());
  if (s.action.trim()) parts.push(s.action.trim());
  if (s.result.trim()) parts.push(s.result.trim());
  return parts.join(' ');
}

// ---------------------------------------------------------------------------

export default function ActionPlan() {
  // Private, personalized printable. Never index.
  usePageMeta({
    title: 'Exit Armor — Action Plan',
    description: 'Private printable playbook. Not a public page.',
    path: '/action-plan',
    noindex: true,
  });

  const profile = loadJSON<UserProfile>('profile', EMPTY_PROFILE);
  const severanceInput = loadJSON<SeveranceInput>('severance.calc', DEFAULT_SEVERANCE_INPUT);
  const runwayInput = loadJSON<RunwayInput>('budget.runway', DEFAULT_RUNWAY);
  const cobraInput = loadJSON<CobraAcaInputs>('cobra.inputs', COBRA_ACA_DEFAULTS);
  const offers = loadJSON<{ a: Offer; b: Offer }>('offers.compare', EMPTY_OFFERS);
  const stories = loadJSON<Record<string, Story>>('stories.star', {});
  const altStateCode = loadJSON<string>('state.selected', severanceInput.stateCode);
  const progress = loadJSON<ChecklistMap>('progress', {});

  // Severance + runway + UI computations
  const severance = useMemo(() => estimateSeverance(severanceInput), [severanceInput]);
  const runway = useMemo(() => calculateRunway(runwayInput), [runwayInput]);
  const ui = useMemo(
    () => estimateUnemployment(severanceInput.annualSalary, severanceInput.stateCode),
    [severanceInput.annualSalary, severanceInput.stateCode]
  );

  // COBRA vs ACA computation
  const cobraAnnual = cobraInput.cobraMonthly * 12;
  const acaMonthly = useMemo(() => estimateAca(cobraInput), [cobraInput]);
  const acaAnnual = acaMonthly * 12;
  const cobraWinner: 'cobra' | 'aca' | 'tie' =
    acaAnnual < cobraAnnual ? 'aca' : acaAnnual > cobraAnnual ? 'cobra' : 'tie';
  const cobraDelta = Math.abs(cobraAnnual - acaAnnual);
  const showCobra = cobraIsCustomized(cobraInput);

  // Offer compare detection
  const hasOfferA = offerHasContent(offers.a);
  const hasOfferB = offerHasContent(offers.b);
  const showOffers = hasOfferA || hasOfferB;
  const totalA = useMemo(() => totalsFor(offers.a), [offers.a]);
  const totalB = useMemo(() => totalsFor(offers.b), [offers.b]);
  const offerDelta = totalB.grand - totalA.grand;

  // STAR stories — only the ones with meaningful content
  const filledStories = useMemo(
    () =>
      Object.values(stories)
        .filter((s): s is Story => !!s && typeof s === 'object')
        .filter(storyIsFilled),
    [stories]
  );

  // Checklist completion scorecard across all 7 modules
  const scorecard = useMemo(
    () =>
      MODULES.map((m) => {
        const items = ITEMS_BY_MODULE[m.id];
        const ids = items.map((i) => i.id);
        const done = countChecked(progress, ids);
        const remaining = items.filter((i) => !progress[i.id]);
        return {
          id: m.id,
          title: m.short,
          accent: m.accent,
          done,
          total: ids.length,
          pct: ids.length === 0 ? 0 : Math.round((done / ids.length) * 100),
          remaining,
        };
      }),
    [progress]
  );

  const totalChecklistItems = scorecard.reduce((acc, s) => acc + s.total, 0);
  const totalChecklistDone = scorecard.reduce((acc, s) => acc + s.done, 0);
  const overallPct =
    totalChecklistItems === 0
      ? 0
      : Math.round((totalChecklistDone / totalChecklistItems) * 100);

  // State reconciliation — if the user picked a different state in State
  // Resources than the one they used in the severance calc, flag it.
  const stateMismatch =
    altStateCode && altStateCode !== severanceInput.stateCode;
  const altState = stateMismatch
    ? STATES.find((s) => s.code === altStateCode) ?? null
    : null;

  // Itemized budget helpers
  const essentialsTotal =
    runwayInput.rent +
    runwayInput.food +
    runwayInput.insurance +
    runwayInput.utilities +
    runwayInput.debt +
    runwayInput.other;
  const budgetTotal = essentialsTotal + runwayInput.discretionary;

  // Core severance negotiation emails — the 3-step sequence most users
  // actually need. All personalized against the profile so the PDF is
  // copy-paste ready.
  const coreSeveranceIds = ['soft-stall', 'leverage', 'final-signoff'] as const;
  const coreSeveranceEmails = coreSeveranceIds
    .map((id) => EMAIL_TEMPLATES.find((t) => t.id === id))
    .filter((t): t is EmailTemplate => !!t)
    .map((t) => ({
      ...t,
      subject: personalize(t.subject, profile),
      body: personalize(t.body, profile),
    }));

  // Email library index — compact quick-reference listing of all 21
  // templates, split into severance and job-search lanes.
  const severanceLibrary = EMAIL_TEMPLATES.filter((t) => t.category === 'severance');
  const jobSearchLibrary = EMAIL_TEMPLATES.filter((t) => t.category === 'job-search');

  // First 48 Hours — group by Day 1 / Day 2 with checklist status
  const first48ByDay = useMemo(() => {
    const day1 = FIRST_48_ITEMS.filter((i) => i.day === 'Day 1');
    const day2 = FIRST_48_ITEMS.filter((i) => i.day === 'Day 2');
    const done1 = countChecked(progress, day1.map((i) => i.id));
    const done2 = countChecked(progress, day2.map((i) => i.id));
    return { day1, day2, done1, done2 };
  }, [progress]);

  // 7-Day Recovery — group by Day 1..Day 7 with checklist status. Days
  // are encoded in the `detail` field as "Day N · ..." so we parse them.
  const recoveryByDay = useMemo(() => {
    const buckets: Record<number, typeof RECOVERY_ITEMS> = {};
    for (const item of RECOVERY_ITEMS) {
      const match = item.detail?.match(/Day\s+(\d)/i);
      const day = match ? parseInt(match[1], 10) : 0;
      if (!buckets[day]) buckets[day] = [];
      buckets[day].push(item);
    }
    return [1, 2, 3, 4, 5, 6, 7].map((d) => {
      const items = buckets[d] ?? [];
      const done = countChecked(progress, items.map((i) => i.id));
      return { day: d, items, done };
    });
  }, [progress]);

  const today = new Date().toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const firstName = profile.name ? profile.name.split(' ')[0] : 'Your';
  const displayName = profile.name || 'Your Name';

  return (
    <div className="ap-shell">
      {/* TOOLBAR — hidden on print */}
      <div className="ap-toolbar no-print">
        <Link to="/app" className="btn-pill">
          <Icon name="arrow" size={14} /> Back to dashboard
        </Link>
        <div className="ap-toolbar__spacer" />
        <button
          type="button"
          className="btn-pill btn-pill--primary"
          onClick={() => window.print()}
        >
          <Icon name="download" size={14} /> Save as PDF
        </button>
      </div>

      <article className="ap-page">
        {/* HEADER */}
        <header className="ap-header">
          <div className="ap-brand">
            <div className="ap-brand__mark">
              <BrandMark id="ap" size={46} />
            </div>
            <div>
              <div className="ap-brand__name">Exit Armor</div>
              <div className="ap-brand__tag">Personal Severance Playbook</div>
            </div>
          </div>
          <div className="ap-header__meta">
            <div><strong>Prepared for:</strong> {displayName}</div>
            {profile.company && <div><strong>Company:</strong> {profile.company}</div>}
            {profile.role && <div><strong>Role:</strong> {profile.role}</div>}
            <div><strong>Date:</strong> {today}</div>
          </div>
        </header>

        {/* HERO SUMMARY */}
        <section className="ap-hero">
          <div className="ap-hero__card">
            <div className="ap-hero__label">Target package</div>
            <div className="ap-hero__value">{money(severance.totalTargetValue)}</div>
            <div className="ap-hero__sub">
              {severance.targetWeeks} weeks of base + COBRA + pro-rata bonus
            </div>
          </div>
          <div className="ap-hero__card">
            <div className="ap-hero__label">Range to negotiate</div>
            <div className="ap-hero__value">
              {money(severance.floorDollars)} – {money(severance.ceilingDollars)}
            </div>
            <div className="ap-hero__sub">
              Floor {severance.floorWeeks}w · Ceiling {severance.ceilingWeeks}w
            </div>
          </div>
          <div className="ap-hero__card">
            <div className="ap-hero__label">Runway today</div>
            <div className="ap-hero__value">
              {runwayLabel(runway.scenarios.current.months)}
            </div>
            <div className="ap-hero__sub">
              {money(runway.scenarios.current.monthlyBleed)}/mo bleed
            </div>
          </div>
          {severance.gapToTarget > 0 && (
            <div className="ap-hero__card ap-hero__card--warn">
              <div className="ap-hero__label">Gap to close</div>
              <div className="ap-hero__value">{money(severance.gapToTarget)}</div>
              <div className="ap-hero__sub">
                Current offer: {money(severance.currentOfferDollars)}
              </div>
            </div>
          )}
        </section>

        {/* PROGRESS SCORECARD */}
        <section className="ap-section">
          <h2 className="ap-section__title">Your checklist scorecard</h2>
          <p className="ap-section__sub">
            {totalChecklistDone} of {totalChecklistItems} items complete across 7
            modules · {overallPct}% overall
          </p>
          <div className="ap-score">
            {scorecard.map((s) => (
              <div key={s.id} className="ap-score__row">
                <div className="ap-score__label">{s.title}</div>
                <div className="ap-score__bar">
                  <span
                    style={{ width: `${s.pct}%`, background: s.accent }}
                    aria-hidden
                  />
                </div>
                <div className="ap-score__count">
                  <strong>{s.done}</strong>/<span>{s.total}</span>
                </div>
              </div>
            ))}
          </div>
          <OpenItems scorecard={scorecard} />
        </section>

        {/* TOP ASKS */}
        <section className="ap-section">
          <h2 className="ap-section__title">Your top {severance.asks.length} asks</h2>
          <p className="ap-section__sub">Ranked by dollar value. Lead with #1.</p>
          <ol className="ap-asks">
            {severance.asks.map((a, i) => (
              <li key={a.id}>
                <div className="ap-ask__num">{i + 1}</div>
                <div className="ap-ask__body">
                  <div className="ap-ask__head">
                    <strong>{a.title}</strong>
                    {a.dollarValue > 0 && (
                      <span className="ap-ask__amount">{money(a.dollarValue)}</span>
                    )}
                  </div>
                  <p>{a.rationale}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* FIRST 48 HOURS — tactical lane */}
        <section className="ap-section ap-section--page-break">
          <h2 className="ap-section__title">First 48 hours · tactical checklist</h2>
          <p className="ap-section__sub">
            The things that leak money or rights if you do not handle them in 48 hours.
            {first48ByDay.done1 + first48ByDay.done2} of{' '}
            {first48ByDay.day1.length + first48ByDay.day2.length} complete.
          </p>
          <div className="ap-days">
            <div className="ap-days__col">
              <div className="ap-days__head">
                <strong>Day 1</strong>
                <span>
                  {first48ByDay.done1}/{first48ByDay.day1.length} done
                </span>
              </div>
              <ul className="ap-days__list">
                {first48ByDay.day1.map((i) => (
                  <li key={i.id} className={progress[i.id] ? 'ap-days__item--done' : ''}>
                    <span className="ap-days__mark" aria-hidden>
                      {progress[i.id] ? '✓' : '○'}
                    </span>
                    <div>
                      <strong>{i.label}</strong>
                      {i.detail && <div className="ap-days__detail">{i.detail}</div>}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="ap-days__col">
              <div className="ap-days__head">
                <strong>Day 2</strong>
                <span>
                  {first48ByDay.done2}/{first48ByDay.day2.length} done
                </span>
              </div>
              <ul className="ap-days__list">
                {first48ByDay.day2.map((i) => (
                  <li key={i.id} className={progress[i.id] ? 'ap-days__item--done' : ''}>
                    <span className="ap-days__mark" aria-hidden>
                      {progress[i.id] ? '✓' : '○'}
                    </span>
                    <div>
                      <strong>{i.label}</strong>
                      {i.detail && <div className="ap-days__detail">{i.detail}</div>}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 7-DAY RECOVERY — emotional & cadence lane */}
        <section className="ap-section ap-section--page-break">
          <h2 className="ap-section__title">7-day recovery cadence</h2>
          <p className="ap-section__sub">
            The emotional &amp; cadence lane — runs alongside the tactical checklist for
            Days 1–2, then continues through Day 7. Pace, not panic.
          </p>
          <div className="ap-recovery">
            {recoveryByDay.map((d) => (
              <div key={d.day} className="ap-recovery__day">
                <div className="ap-recovery__head">
                  <strong>Day {d.day}</strong>
                  {d.items.length > 0 && (
                    <span>
                      {d.done}/{d.items.length} done
                    </span>
                  )}
                </div>
                {d.items.length === 0 ? (
                  <div className="ap-recovery__empty">—</div>
                ) : (
                  <ul className="ap-recovery__list">
                    {d.items.map((i) => (
                      <li key={i.id} className={progress[i.id] ? 'ap-recovery__item--done' : ''}>
                        <span className="ap-recovery__mark" aria-hidden>
                          {progress[i.id] ? '✓' : '○'}
                        </span>
                        <span>{i.label}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* RED FLAGS */}
        {severance.redFlags.length > 0 && (
          <section className="ap-section">
            <h2 className="ap-section__title">Watch-outs for your situation</h2>
            <ul className="ap-flags">
              {severance.redFlags.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </section>
        )}

        {/* STATE MISMATCH BANNER */}
        {stateMismatch && altState && (
          <section className="ap-section ap-section--compact">
            <div className="ap-state-mismatch">
              <Icon name="info" size={14} />
              <span>
                State mismatch: your severance calculator is set to{' '}
                <strong>{severance.state?.name ?? severanceInput.stateCode}</strong>,
                but your State Resources module is set to{' '}
                <strong>{altState.name}</strong>. Use the one that matches where
                you're physically working from.
              </span>
            </div>
          </section>
        )}

        {/* STATE */}
        {severance.state && (
          <section className="ap-section">
            <h2 className="ap-section__title">{severance.state.name} specifics</h2>
            <div className="ap-state">
              <div>
                <span>Non-competes</span>
                <strong>
                  {severance.state.noncompeteAllowed ? 'Allowed (with limits)' : 'Largely banned'}
                </strong>
              </div>
              <div>
                <span>PTO payout</span>
                <strong>
                  {severance.state.ptoPayoutRequired === 'yes'
                    ? 'Required'
                    : severance.state.ptoPayoutRequired === 'conditional'
                    ? 'Conditional'
                    : 'Not required'}
                </strong>
              </div>
              <div>
                <span>Mini-WARN</span>
                <strong>{severance.state.warnThreshold}+ employees</strong>
              </div>
              <div>
                <span>File for UI</span>
                <strong className="ap-state__link">{severance.state.unemploymentUrl}</strong>
              </div>
            </div>
            <p className="ap-state__notes">{severance.state.notes}</p>
          </section>
        )}

        {/* RUNWAY */}
        <section className="ap-section">
          <h2 className="ap-section__title">Your 90-day runway</h2>
          <div className="ap-runway">
            <div className="ap-runway__card">
              <span>Current spend</span>
              <strong>{runwayLabel(runway.scenarios.current.months)}</strong>
              <small>{money(runway.scenarios.current.monthlyBleed)}/mo</small>
            </div>
            <div className="ap-runway__card">
              <span>Discretionary cut</span>
              <strong>{runwayLabel(runway.scenarios.cutDiscretionary.months)}</strong>
              <small>{money(runway.scenarios.cutDiscretionary.monthlyBleed)}/mo</small>
            </div>
            <div className="ap-runway__card">
              <span>Austerity mode</span>
              <strong>{runwayLabel(runway.scenarios.hardCut.months)}</strong>
              <small>{money(runway.scenarios.hardCut.monthlyBleed)}/mo</small>
            </div>
          </div>
          {runway.cuts.length > 0 && (
            <ul className="ap-cuts">
              {runway.cuts.slice(0, 5).map((c, i) => (
                <li key={i}>
                  <span>{c.label}</span>
                  <strong>+{money(c.monthlySavings)}/mo</strong>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* DETAILED BUDGET */}
        {runwayIsCustomized(runwayInput) && (
          <section className="ap-section">
            <h2 className="ap-section__title">Your monthly budget, itemized</h2>
            <p className="ap-section__sub">
              Starting point: {money(budgetTotal)}/mo total · {money(essentialsTotal)}/mo
              essentials · savings on hand: {money(runwayInput.savings)}
            </p>
            <div className="ap-budget">
              <div className="ap-budget__col">
                <div className="ap-budget__colhead">Essentials</div>
                <BudgetRow label="Rent / mortgage" value={runwayInput.rent} />
                <BudgetRow label="Food & groceries" value={runwayInput.food} />
                <BudgetRow label="Health insurance" value={runwayInput.insurance} />
                <BudgetRow label="Utilities" value={runwayInput.utilities} />
                <BudgetRow label="Debt service" value={runwayInput.debt} />
                <BudgetRow label="Other essentials" value={runwayInput.other} />
                <div className="ap-budget__row ap-budget__row--total">
                  <span>Essentials total</span>
                  <strong>{money(essentialsTotal)}</strong>
                </div>
              </div>
              <div className="ap-budget__col">
                <div className="ap-budget__colhead">Flex &amp; income</div>
                <BudgetRow
                  label="Discretionary"
                  value={runwayInput.discretionary}
                  hint="First to cut"
                />
                <BudgetRow
                  label="Monthly income"
                  value={runwayInput.monthlyIncome}
                  hint="Severance, UI, partner, side"
                  tone="pos"
                />
                <BudgetRow label="Savings on hand" value={runwayInput.savings} tone="pos" />
                <div className="ap-budget__row ap-budget__row--total">
                  <span>Monthly bleed</span>
                  <strong>{money(runway.scenarios.current.monthlyBleed)}</strong>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* COBRA vs ACA DECISION */}
        {showCobra && (
          <section className="ap-section">
            <h2 className="ap-section__title">COBRA vs ACA decision</h2>
            <p className="ap-section__sub">
              Based on age {cobraInput.age}, expected income {money(cobraInput.income)},
              household size {cobraInput.household}.{' '}
              {cobraWinner === 'tie'
                ? 'Roughly equal cost.'
                : `${cobraWinner === 'aca' ? 'ACA' : 'COBRA'} is estimated ${money(
                    cobraDelta
                  )}/yr cheaper.`}
            </p>
            <div className="ap-cobra">
              <div
                className={`ap-cobra__card ${
                  cobraWinner === 'cobra' ? 'ap-cobra__card--winner' : ''
                }`}
              >
                <div className="ap-cobra__label">COBRA</div>
                <div className="ap-cobra__value">{money(cobraAnnual)}/yr</div>
                <div className="ap-cobra__sub">
                  {money(cobraInput.cobraMonthly)}/mo premium · same doctors
                </div>
              </div>
              <div className="ap-cobra__vs">vs</div>
              <div
                className={`ap-cobra__card ${
                  cobraWinner === 'aca' ? 'ap-cobra__card--winner' : ''
                }`}
              >
                <div className="ap-cobra__label">ACA Marketplace</div>
                <div className="ap-cobra__value">{money(acaAnnual)}/yr</div>
                <div className="ap-cobra__sub">
                  ~{money(acaMonthly)}/mo estimated w/ subsidies
                </div>
              </div>
            </div>
            <p className="ap-state__notes">
              Estimates only. Confirm exact COBRA premiums with your benefits admin
              and ACA pricing at healthcare.gov before electing.
            </p>
          </section>
        )}

        {/* OFFER COMPARE */}
        {showOffers && (
          <section className="ap-section">
            <h2 className="ap-section__title">Offer comparison</h2>
            <p className="ap-section__sub">
              Pure math on what you entered. A bigger number isn't always the better
              offer — non-competes, release language, and tax can all change real value.
            </p>
            <div className="ap-offers">
              <div className="ap-offers__summary">
                <div className="ap-offers__card">
                  <div className="ap-offers__name">{offers.a.label || 'Offer A'}</div>
                  <div className="ap-offers__total">{money(totalA.grand)}</div>
                </div>
                <div className="ap-offers__vs">vs</div>
                <div className="ap-offers__card">
                  <div className="ap-offers__name">{offers.b.label || 'Offer B'}</div>
                  <div className="ap-offers__total">{money(totalB.grand)}</div>
                </div>
                <div
                  className={`ap-offers__delta ${
                    offerDelta >= 0 ? 'ap-offers__delta--pos' : 'ap-offers__delta--neg'
                  }`}
                >
                  <span>Difference</span>
                  <strong>
                    {offerDelta >= 0 ? '+' : ''}
                    {money(offerDelta)}
                  </strong>
                </div>
              </div>
              <table className="ap-offers__table">
                <thead>
                  <tr>
                    <th></th>
                    <th>{offers.a.label || 'Offer A'}</th>
                    <th>{offers.b.label || 'Offer B'}</th>
                    <th>Difference</th>
                  </tr>
                </thead>
                <tbody>
                  <OfferTR label="Base pay" a={totalA.baseTotal} b={totalB.baseTotal} />
                  <OfferTR label="COBRA reimbursement" a={totalA.cobraTotal} b={totalB.cobraTotal} />
                  <OfferTR label="PTO payout" a={totalA.ptoTotal} b={totalB.ptoTotal} />
                  <OfferTR label="Pro-rata bonus" a={offers.a.bonusDollars} b={offers.b.bonusDollars} />
                  <OfferTR label="Equity / RSUs" a={offers.a.equityDollars} b={offers.b.equityDollars} />
                  <OfferTR label="Other" a={offers.a.otherDollars} b={offers.b.otherDollars} />
                  <tr className="ap-offers__grand">
                    <td>Grand total</td>
                    <td>{money(totalA.grand)}</td>
                    <td>{money(totalB.grand)}</td>
                    <td>
                      {offerDelta >= 0 ? '+' : ''}
                      {money(offerDelta)}
                    </td>
                  </tr>
                </tbody>
              </table>
              {(offers.a.notes || offers.b.notes) && (
                <div className="ap-offers__notes">
                  {offers.a.notes && (
                    <div>
                      <strong>{offers.a.label || 'Offer A'} notes:</strong> {offers.a.notes}
                    </div>
                  )}
                  {offers.b.notes && (
                    <div>
                      <strong>{offers.b.label || 'Offer B'} notes:</strong> {offers.b.notes}
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>
        )}

        {/* UNEMPLOYMENT BENEFITS */}
        {ui.state && ui.weeklyBenefit > 0 && (
          <section className="ap-section">
            <h2 className="ap-section__title">Your unemployment benefits</h2>
            <p className="ap-section__sub">
              Estimate for {ui.state.name} — verify at {ui.state.unemploymentUrl}
            </p>
            <div className="ap-runway">
              <div className="ap-runway__card">
                <span>Weekly benefit</span>
                <strong>{money(ui.weeklyBenefit)}</strong>
                <small>
                  {ui.cappedByState ? 'At state cap' : `~${Math.round(ui.replacementRate * 100)}% replacement`}
                </small>
              </div>
              <div className="ap-runway__card">
                <span>Max weeks</span>
                <strong>{ui.maxWeeks} weeks</strong>
                <small>Regular UI duration</small>
              </div>
              <div className="ap-runway__card">
                <span>Max total payout</span>
                <strong>{money(ui.totalMax)}</strong>
                <small>Weekly × max weeks</small>
              </div>
            </div>
            <p className="ap-state__notes">
              Estimate only — data vintage {UI_DATA_AS_OF}. Severance may delay or reduce
              benefits in some states. File the same week you're notified; most states do
              not backdate.
            </p>
          </section>
        )}

        {/* CORE SEVERANCE EMAILS — 3-step sequence, fully personalized */}
        {coreSeveranceEmails.length > 0 && (
          <section className="ap-section ap-section--page-break">
            <h2 className="ap-section__title">Core severance negotiation emails</h2>
            <p className="ap-section__sub">
              Three emails, sent in this order, do most of the work. All personalized and
              ready to copy. Swap in your specific asks from the list above before sending.
            </p>
            <div className="ap-emails">
              {coreSeveranceEmails.map((t, idx) => (
                <div key={t.id} className="ap-emailcard">
                  <div className="ap-emailcard__head">
                    <span className="ap-emailcard__step">Step {idx + 1}</span>
                    <strong>{t.title}</strong>
                  </div>
                  <div className="ap-emailcard__when">
                    <Icon name="calendar" size={12} /> {t.when}
                  </div>
                  <div className="ap-email">
                    <div className="ap-email__row">
                      <span>Subject</span>
                      <strong>{t.subject}</strong>
                    </div>
                    <pre className="ap-email__body">{t.body}</pre>
                  </div>
                  {t.notes && t.notes.length > 0 && (
                    <ul className="ap-emailcard__notes">
                      {t.notes.map((n, i) => (
                        <li key={i}>{n}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* EMAIL LIBRARY INDEX — all 21 templates as quick reference */}
        <section className="ap-section ap-section--page-break">
          <h2 className="ap-section__title">Email library index ({EMAIL_TEMPLATES.length} templates)</h2>
          <p className="ap-section__sub">
            Every template in the playbook — for every conversation you might need to have.
            Open the Email Library in the dashboard to copy the full personalized body.
          </p>

          <div className="ap-lib">
            <div className="ap-lib__lane">
              <div className="ap-lib__lanehead ap-lib__lanehead--sev">
                Severance &amp; negotiation · {severanceLibrary.length}
              </div>
              <ol className="ap-lib__list">
                {severanceLibrary.map((t) => (
                  <li key={t.id}>
                    <div className="ap-lib__title">
                      <span className="ap-lib__tag ap-lib__tag--sev">{t.tag}</span>
                      <strong>{t.title}</strong>
                    </div>
                    <div className="ap-lib__subject">Subject: {personalize(t.subject, profile)}</div>
                    <div className="ap-lib__when">{t.when}</div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="ap-lib__lane">
              <div className="ap-lib__lanehead ap-lib__lanehead--job">
                Job search &amp; interview · {jobSearchLibrary.length}
              </div>
              <ol className="ap-lib__list">
                {jobSearchLibrary.map((t) => (
                  <li key={t.id}>
                    <div className="ap-lib__title">
                      <span className="ap-lib__tag ap-lib__tag--job">{t.tag}</span>
                      <strong>{t.title}</strong>
                    </div>
                    <div className="ap-lib__subject">Subject: {personalize(t.subject, profile)}</div>
                    <div className="ap-lib__when">{t.when}</div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* STAR STORIES APPENDIX */}
        {filledStories.length > 0 && (
          <section className="ap-section ap-section--page-break">
            <h2 className="ap-section__title">Interview stories appendix</h2>
            <p className="ap-section__sub">
              {filledStories.length} drafted in STAR format. Read each one out loud once
              before the interview — don't memorize, just get the shape.
            </p>
            <div className="ap-stories">
              {filledStories.map((s) => {
                const label = STORY_LABELS[s.id] ?? s.title;
                const wc = storyWordCount(s);
                const answer = buildStoryAnswer(s);
                return (
                  <div key={s.id} className="ap-story">
                    <div className="ap-story__head">
                      <strong>{label}</strong>
                      <span className="ap-story__wc">{wc} words</span>
                    </div>
                    <p className="ap-story__answer">{answer}</p>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* FOOTER */}
        <footer className="ap-footer">
          <p>
            <strong>{firstName}</strong> — this is your playbook. Read it once through before the
            HR call, then keep it open in a second tab.
          </p>
          <p className="ap-footer__legal">
            Exit Armor is an educational resource. Nothing in this plan is legal, financial, or
            tax advice. For severance above $20K, equity questions, or potential discrimination
            claims, consult a licensed employment attorney.
          </p>
          <p className="ap-footer__brand">exitarmor.com · Generated {today}</p>
        </footer>
      </article>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function BudgetRow({
  label,
  value,
  hint,
  tone,
}: {
  label: string;
  value: number;
  hint?: string;
  tone?: 'pos' | 'neg';
}) {
  return (
    <div className={`ap-budget__row ${tone ? `ap-budget__row--${tone}` : ''}`}>
      <span>
        {label}
        {hint && <small>{hint}</small>}
      </span>
      <strong>{money(value)}</strong>
    </div>
  );
}

function OfferTR({ label, a, b }: { label: string; a: number; b: number }) {
  const diff = b - a;
  return (
    <tr>
      <td>{label}</td>
      <td>{money(a)}</td>
      <td>{money(b)}</td>
      <td className={diff === 0 ? '' : diff > 0 ? 'ap-offers__pos' : 'ap-offers__neg'}>
        {diff === 0 ? '—' : `${diff > 0 ? '+' : ''}${money(diff)}`}
      </td>
    </tr>
  );
}

function OpenItems({
  scorecard,
}: {
  scorecard: Array<{
    id: ModuleId;
    title: string;
    remaining: Array<{ id: string; label: string }>;
  }>;
}) {
  const modulesWithOpen = scorecard.filter((s) => s.remaining.length > 0);
  if (modulesWithOpen.length === 0) {
    return (
      <p className="ap-score__done">
        Everything checked. You've worked the full 46-item defense plan — take a
        breath.
      </p>
    );
  }
  const top = modulesWithOpen.slice(0, 3);
  return (
    <div className="ap-score__open">
      <div className="ap-score__openhead">Still open:</div>
      {top.map((m) => (
        <div key={m.id} className="ap-score__openmod">
          <strong>{m.title}</strong>
          <ul>
            {m.remaining.slice(0, 4).map((i) => (
              <li key={i.id}>{i.label}</li>
            ))}
            {m.remaining.length > 4 && (
              <li className="ap-score__more">
                +{m.remaining.length - 4} more in this module
              </li>
            )}
          </ul>
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Offer totals — mirrored from OfferCompare.tsx so ActionPlan is self-contained
// ---------------------------------------------------------------------------

interface OfferTotals {
  baseTotal: number;
  cobraTotal: number;
  ptoTotal: number;
  grand: number;
}

function totalsFor(o: Offer): OfferTotals {
  const baseTotal = o.baseWeeks * o.weeklyPay;
  const cobraTotal = o.cobraMonths * o.cobraMonthlyValue;
  const ptoTotal = o.ptoDays * o.dailyRate;
  const grand =
    baseTotal +
    cobraTotal +
    ptoTotal +
    o.bonusDollars +
    o.equityDollars +
    o.otherDollars;
  return { baseTotal, cobraTotal, ptoTotal, grand };
}
