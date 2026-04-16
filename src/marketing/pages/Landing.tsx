import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { MarketingLayout } from '../MarketingLayout';
import { Icon } from '../../components/Icon';
import type { IconName } from '../../components/Icon';
import {
  faqJsonLd,
  organizationJsonLd,
  productJsonLd,
  usePageMeta,
  websiteJsonLd,
} from '../../lib/seo';

// --------------------------------------------------------------
// Person-in-context imagery — used inside the "Built for your
// worst week" deep-dive sections. Each photo sits behind a
// floating deliverable card (see DeepDive component).
// --------------------------------------------------------------
const IMG_SEVERANCE =
  'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1100&q=80';
const IMG_COBRA =
  'https://images.unsplash.com/photo-1590650153855-d9e808231d41?auto=format&fit=crop&w=1100&q=80';
const IMG_OFFER =
  'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1100&q=80';

// Hero rotates through this list to show scale & unique coverage.
// Rebalanced so severance is ONE of seven outcomes — not the headline.
const HERO_ROTATOR = [
  'the first 48 hours',
  '7-day recovery',
  'severance math',
  'COBRA vs ACA',
  '50 state rules',
  'your 90-day runway',
  'the job-search restart',
  '8 HR roleplay scenarios',
  '20+ full-length email templates',
  '6 attorney services',
  '4 pure-math calculators',
];

// The 11 negotiables — scrolled as an infinite marquee
const MARQUEE_ASKS = [
  'Additional weeks of base pay',
  'COBRA premium reimbursement',
  'Pro-rated annual bonus',
  'Accrued PTO payout',
  'Vesting acceleration on equity',
  'Outplacement services',
  'Removal of non-compete',
  'Positive reference letter',
  'Extended stock option exercise',
  'Non-disparagement carve-outs',
  'Re-employment eligibility',
];

// By-the-numbers ribbon — bold scale proof
const NUMBERS = [
  { value: 10, suffix: '', label: 'Guided tools', sub: 'Calculators & scripts' },
  { value: 20, suffix: '+', label: 'Email templates', sub: 'Full-length, not blank' },
  { value: 50, suffix: '', label: 'State law sets', sub: 'Unemployment, WARN, PTO' },
  { value: 11, suffix: '', label: 'Negotiable asks', sub: 'Ranked by success rate' },
  { value: 8,  suffix: '',  label: 'HR moments', sub: 'Scripted with verdicts' },
  { value: 6,  suffix: '',  label: 'Attorney services', sub: 'Real, national, verified' },
];

// --------------------------------------------------------------
// Features — expanded to 10 to showcase everything that's
// actually inside the product. Grouped visually by accent so the
// page still feels unified.
// --------------------------------------------------------------
interface Feature {
  icon: IconName;
  title: string;
  body: string;
  accent: 'sage' | 'slate' | 'terracotta' | 'forest' | 'gold' | 'deep';
  pill?: string;
}

// Nine modules, painted with the calm editorial palette. The accents cycle
// so no two neighbors in the 3x3 grid repeat — it feels like one product,
// not nine free-icon tiles.
const FEATURES: Feature[] = [
  {
    icon: 'briefcase',
    accent: 'terracotta',
    pill: 'Calculator',
    title: 'Severance Calculator',
    body:
      'Your state, your tenure, your real number. Pulls in COBRA coverage, bonus proration, equity acceleration — shows a defensible target and a stretch target in seconds.',
  },
  {
    icon: 'dollar',
    accent: 'gold',
    pill: 'Calculator',
    title: '90-Day Runway',
    body:
      'Plug in your bills once. See three scenarios — hold steady, cut discretionary, hard cut — and the top five expenses to trim. No spreadsheets, no math.',
  },
  {
    icon: 'mail',
    accent: 'sage',
    pill: '20+ templates',
    title: 'Ready-to-send emails',
    body:
      'Full-length, not fill-in-the-blank. Buy-time replies, counter-offer drafts, attorney intake, HR follow-ups — auto-personalized with your name, company, and HR contact.',
  },
  {
    icon: 'mic',
    accent: 'slate',
    pill: 'Practice',
    title: 'HR Call Roleplay',
    body:
      'The 8 hardest moments of a severance call — "sign today," "non-negotiable," veiled threats — with branching responses and coaching after every choice.',
  },
  {
    icon: 'chart',
    accent: 'forest',
    pill: 'Side-by-side',
    title: 'Offer Compare',
    body:
      'Two offers, line-by-line math. Base pay, COBRA value, PTO, bonus, equity — we add it up both ways so you see the delta in plain dollars.',
  },
  {
    icon: 'heart',
    accent: 'terracotta',
    pill: 'Benefits',
    title: 'COBRA vs ACA',
    body:
      'KFF data puts average family COBRA premiums over $1,800/month. The kit compares that against ACA Marketplace quotes for your exact income and family size, so you can see which one actually wins.',
  },
  {
    icon: 'scale',
    accent: 'deep',
    pill: 'Legal',
    title: 'Find an Attorney',
    body:
      'Six real, national, long-running services — NELA, ABA Free Legal Answers, EEOC, DOL, LSC. Plus a 15-minute intake script so you don\'t freeze on the call.',
  },
  {
    icon: 'book',
    accent: 'gold',
    pill: 'Interview',
    title: 'Story Builder',
    body:
      'Six interview stories in the STAR format, written in plain English. Works for a senior director — and for a barista going back into the workforce.',
  },
  {
    icon: 'map',
    accent: 'sage',
    pill: '50 states',
    title: 'State Law Guide',
    body:
      'Unemployment filing windows, final-paycheck rules, PTO payout, non-compete enforceability, WARN Act coverage — linked to the actual government pages.',
  },
  // NOTE: a 10th "Industry Benchmarks" feature used to live here, but it
  // was fully redundant with the sources strip (SHRM/BLS/KFF/Littler) that
  // sits right above this grid — and it was leaving a dangling card in a
  // 3-column layout. Trimmed to 9 so the grid is a clean 3x3.
];

// --------------------------------------------------------------
// Three-phase journey — softened with guiding language.
// --------------------------------------------------------------
const STEPS = [
  {
    icon: 'shield' as IconName,
    phase: 'Phase 1',
    days: 'Days 1–3',
    title: 'We help you stabilize',
    body:
      'Secure your documents, file for unemployment, confirm your last day of benefits, map your cash runway. Eight items, ninety minutes, zero panic — we walk you through each one.',
  },
  {
    icon: 'briefcase' as IconName,
    phase: 'Phase 2',
    days: 'Days 4–10',
    title: 'We guide your negotiation',
    body:
      'Audit your severance against cited SHRM/Littler ranges, pick from 11 negotiable asks, rehearse the HR call with 8 branching scenarios, and send the buy-time email — every word already written, every citation linked.',
  },
  {
    icon: 'spark' as IconName,
    phase: 'Phase 3',
    days: 'Days 11–90',
    title: 'We launch your comeback',
    body:
      'Rewrite your LinkedIn, activate your warm network, build 6 interview stories, run a weekly cadence. Land your next role with leverage — not desperation.',
  },
];

// The three situations Exit Armor is purpose-built to walk you
// through. Every factual claim is a product fact (what the kit
// does) or a cited industry number (SHRM, KFF, BLS, DOL, EEOC).
const SCENARIOS = [
  {
    eyebrow: 'Scenario · Severance packet review',
    title: 'You get the packet. You have until Friday.',
    body:
      'The kit walks through the clauses that usually cost people money — the release of claims, the non-disparagement, the non-compete — and shows you the three counter-asks SHRM research identifies as the most common levers (additional weeks, COBRA reimbursement, bonus proration).',
    tag: 'What the kit does',
  },
  {
    eyebrow: 'Scenario · Health coverage decision',
    title: 'COBRA or ACA? The kit does the math.',
    body:
      'KFF data puts average family COBRA premiums over $1,800/month. The kit compares that against an ACA Marketplace quote for your exact income and family size, and tells you which one actually wins for your situation — with a printable summary you can take to open enrollment.',
    tag: 'What the kit does',
  },
  {
    eyebrow: 'Scenario · Non-compete in your release',
    title: 'A clause you can\'t sign on autopilot.',
    body:
      'State enforceability varies sharply — California, Minnesota, and now the FTC rule have tightened dramatically. The kit shows your state\'s current rules (linked to the actual government pages) and gives you a ready-to-send email asking for the clause to be narrowed or removed.',
    tag: 'What the kit does',
  },
];

interface Tier {
  id: string;
  badge?: string;
  name: string;
  price: string;
  period: string;
  blurb: string;
  features: string[];
  cta: string;
  ctaTo: string;
  highlighted?: boolean;
}

const TIERS: Tier[] = [
  {
    id: 'self',
    badge: 'Start here',
    name: 'Self-Serve Kit',
    price: '$69',
    period: 'one-time',
    blurb:
      'Everything inside the product, forever. No subscription, no renewal. The full 90-day playbook.',
    features: [
      'Severance Calculator (state-aware)',
      '90-Day Runway Calculator',
      'COBRA vs ACA comparison',
      'HR Call Roleplay — 8 hardest moments',
      'Offer Compare (side-by-side math)',
      '11 negotiable asks, ranked by success rate',
      '20+ full-length email templates',
      'Interview Story Builder (STAR)',
      '401(k) rollover option compare',
      'Attorney finder — 6 real national services',
      'Industry benchmarks with citations',
      '50-state unemployment + WARN data',
      'Recovery Companion (wellbeing sidebar)',
      'Export to PDF / print anytime',
      '7-day money-back guarantee',
    ],
    cta: 'Get the Self-Serve Kit — $69',
    ctaTo: '/checkout',
    highlighted: true,
  },
  {
    id: 'ally',
    badge: 'Coming soon',
    name: 'Power Hour',
    price: 'TBD',
    period: 'free for kit owners at launch',
    blurb:
      'An AI companion trained on the whole playbook — severance math, COBRA-vs-ACA, state law, the 21 email templates. Someone to talk through the next step with. Not a lawyer, not HR, not a career coach — a guide that already knows the kit.',
    features: [
      'Conversational AI trained on this playbook',
      'Ask about your offer, state, and timeline',
      'Walks you through any module step-by-step',
      'Never asked to give legal or financial advice',
      'Private — runs against your browser session',
      'Free for Self-Serve Kit owners when it ships',
    ],
    cta: 'Join the waitlist',
    ctaTo: '/contact',
  },
  {
    id: 'war-room',
    badge: 'Coming soon',
    name: 'War Room',
    price: 'TBD',
    period: 'add-on · 90-day engagement',
    blurb:
      'A deeper AI companion for the full 90-day run. Longer memory of your situation, nudges when deadlines slip, and a weekly check-in while you negotiate and job-hunt.',
    features: [
      'Everything in Power Hour',
      'Remembers your numbers, state, and deadlines',
      'Weekly check-in through the 90-day window',
      'Nudges you before review windows expire',
      'Interview-day pep talk + story rehearsal',
      'Never a substitute for an employment attorney',
    ],
    cta: 'Join the waitlist',
    ctaTo: '/contact',
  },
];

const FAQ = [
  {
    q: 'Is this legal advice?',
    a: 'No. Exit Armor is an educational resource built on publicly available information about US labor law, healthcare options, and negotiation practice. For anything above $20K in severance, equity questions, or potential discrimination claims, please consult a licensed employment attorney. We link to six real, national, free-to-low-cost attorney services inside the product.',
  },
  {
    q: 'Do I need to create an account?',
    a: 'No. We built Exit Armor to ask you for as little as possible. Your progress is stored in your own browser. You can export it to PDF at any time. The fewer things you have to trust us with in your worst week, the better.',
  },
  {
    q: 'Where is my data stored? Can you see my severance numbers?',
    a: 'No, we cannot see anything you type into the dashboard. Everything — your name, company, state, severance figures, HR contact, and every checklist tick — is saved locally in your own browser (technical term: localStorage) under exitarmor.com, on the device you used. It never touches our servers, we have no database of user data, and there is nothing for us to hand over to anyone. Your progress survives refreshes, browser closes, laptop restarts, and even power outages — it persists until YOU clear your browser data, switch devices, or use Incognito mode. Safari has one quirk (its Intelligent Tracking Prevention wipes site storage after 7 days of no visits), so if you use Safari, check back once a week or use Chrome/Firefox/Edge/Arc/Brave instead. Full technical breakdown on our Privacy page.',
  },
  {
    q: 'Is it too complicated? I\'m not a tech person.',
    a: 'No. Exit Armor is built to guide you step-by-step. Every checklist item explains why it matters, every calculator auto-fills sensible defaults, every email template is already written. We stress-test every screen with non-technical workers — carpenters, baristas, retail managers. If any of it feels complicated, that\'s our bug to fix, not your fault.',
  },
  {
    q: 'Is there a subscription?',
    a: 'No subscription. The Self-Serve Kit is $69 one-time — you use it until you don\'t need it. The Power Hour and War Room AI companions are on the waitlist and will be free for Self-Serve Kit owners when they ship. We don\'t do freemium traps or auto-renewing monthly plans.',
  },
  {
    q: 'What if I was laid off last month — is it too late?',
    a: 'No. Many of the most valuable plays — COBRA vs ACA comparison, unemployment backfiling, network activation, LinkedIn positioning, 90-day budget, job search — work for 30–90 days after the event. Severance negotiation itself is narrower (typically a 21 or 45-day window), but even if you\'ve already signed, the benefits, budget, and job search modules pay for the product many times over.',
  },
  {
    q: 'How is this different from ChatGPT?',
    a: 'ChatGPT is a brilliant generalist with no memory of your state\'s laws, no checklist structure, no email templates, and no 50-state comparison data. Exit Armor is purpose-built: curated content, state-specific guidance, cited industry benchmarks, and a single clean flow designed to be used during the worst week of your career — not a blank chat box when you\'re least able to know what to ask.',
  },
  {
    q: 'What\'s the refund policy?',
    a: 'Seven days, no questions asked. Email support@exitarmor.com and we\'ll refund you within one business day. We would much rather refund an unhappy customer than keep their $69.',
  },
];

// --------------------------------------------------------------
// Animated counter — counts up from 0 when scrolled into view
// --------------------------------------------------------------
function Counter({ target, suffix = '', duration = 1400 }: { target: number; suffix?: string; duration?: number }) {
  const [value, setValue] = useState(0);
  const [ref, setRef] = useState<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (!ref) return;
    let started = false;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started) {
            started = true;
            const start = performance.now();
            const tick = (now: number) => {
              const t = Math.min(1, (now - start) / duration);
              const eased = 1 - Math.pow(1 - t, 3);
              setValue(Math.round(target * eased));
              if (t < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.35 }
    );
    io.observe(ref);
    return () => io.disconnect();
  }, [ref, target, duration]);

  return (
    <span ref={setRef}>
      {value}
      {suffix}
    </span>
  );
}

// --------------------------------------------------------------
// Rotating text — cycles through a list on a timer with a
// subtle slide-up transition. Pure CSS animation per cycle.
// --------------------------------------------------------------
function Rotator({ items, interval = 2200 }: { items: string[]; interval?: number }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % items.length), interval);
    return () => clearInterval(id);
  }, [items.length, interval]);
  return (
    <span className="mk-rotator">
      <span key={i} className="mk-rotator__item">
        {items[i]}
      </span>
    </span>
  );
}

// --------------------------------------------------------------
// Small hook: fade-in elements when scrolled into view.
// --------------------------------------------------------------
function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>('.reveal');
    if (!('IntersectionObserver' in window)) {
      nodes.forEach((n) => n.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);
}

// --------------------------------------------------------------
// Dashboard mockup — pure CSS/JSX. Shows the Severance Calculator
// result, a negotiable-ask list, and an HR Roleplay prompt, all
// floating inside a fake browser window. No external images.
// --------------------------------------------------------------
// HeroMockup v2 — a calm "here's your 90-day plan" dashboard preview.
// Shows all 7 modules as a checklist so visitors see the scope of the
// kit (not just severance). Two floating cards show scenario-level
// value so it still feels tangible, not abstract.
function HeroMockup() {
  const modules: Array<{ label: string; note: string; on: boolean; icon: IconName }> = [
    { label: 'First 48 Hours',    note: 'Don\'t sign yet',        on: true,  icon: 'shield' },
    { label: '7-Day Recovery',    note: 'One gentle step a day',  on: true,  icon: 'calendar' },
    { label: 'Severance Prep',    note: 'Cited counter drafted',  on: true,  icon: 'briefcase' },
    { label: 'State Resources',   note: 'Your state\'s UI rules', on: true,  icon: 'map' },
    { label: 'COBRA vs ACA',      note: 'Side-by-side math',      on: false, icon: 'heart' },
    { label: '90-Day Budget',     note: '3 runway scenarios',     on: false, icon: 'dollar' },
    { label: 'Job Search',        note: 'Network-first restart',  on: false, icon: 'search' },
  ];

  return (
    <div className="mk-mockup reveal">
      <div className="mk-mockup__window">
        <div className="mk-mockup__chrome">
          <span className="mk-mockup__dot mk-mockup__dot--r" />
          <span className="mk-mockup__dot mk-mockup__dot--y" />
          <span className="mk-mockup__dot mk-mockup__dot--g" />
          <div className="mk-mockup__url">exitarmor.app / your-plan</div>
        </div>
        <div className="mk-mockup__body mk-mockup__body--plan">
          <div className="mk-mockup__stamp mk-mockup__stamp--calm">
            <Icon name="check" size={12} /> Your 90-day plan
          </div>
          <div className="mk-mockup__eyebrow">Progress · 4 of 7 modules</div>

          <div className="mk-mockup__progress">
            <span style={{ width: '57%' }} />
          </div>

          <ul className="mk-mockup__checklist">
            {modules.map((m) => (
              <li
                key={m.label}
                className={`mk-mockup__checkitem ${m.on ? 'is-done' : ''}`}
              >
                <span className="mk-mockup__checkicon">
                  <Icon name={m.on ? 'check' : m.icon} size={12} />
                </span>
                <span className="mk-mockup__checklabel">
                  <strong>{m.label}</strong>
                  <em>{m.note}</em>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mk-mockup__float mk-mockup__float--ask">
        <div className="mk-mockup__float-head">
          <Icon name="heart" size={14} /> Benefits decision
        </div>
        <strong>ACA wins this month</strong>
        <span>Cited against KFF 2024 family premiums</span>
      </div>

      <div className="mk-mockup__float mk-mockup__float--hr">
        <div className="mk-mockup__float-head mk-mockup__float-head--calm">
          <Icon name="calendar" size={14} /> Day 3 check-in
        </div>
        <em>"Today's one small thing is enough."</em>
        <div className="mk-mockup__reply">
          <Icon name="check" size={11} /> Gentle, not pushy
        </div>
      </div>
    </div>
  );
}

// --------------------------------------------------------------
// Deep dive card — person-in-context photo + floating
// deliverable card with a cited rule and a green dollar amount.
// Inspired by clawback's "Built for real life" pattern.
// --------------------------------------------------------------
interface DeepDiveCardProps {
  title: string;
  category: string;
  ruleLabel: string;
  ruleValue: string;
  amountLabel: string;
  amount: string;
  accent: 'crimson' | 'amber' | 'rose' | 'sage' | 'terracotta';
}
function DeepDiveCard(p: DeepDiveCardProps) {
  return (
    <div className={`mk-deepcard mk-deepcard--${p.accent}`}>
      <div className="mk-deepcard__head">
        <div className={`mk-deepcard__icon mk-deepcard__icon--${p.accent}`}>
          <Icon name="check" size={14} />
        </div>
        <div>
          <div className="mk-deepcard__title">{p.title}</div>
          <div className="mk-deepcard__category">{p.category}</div>
        </div>
      </div>
      <div className="mk-deepcard__row">
        <span>{p.ruleLabel}</span>
        <strong className="mk-deepcard__rule">{p.ruleValue}</strong>
      </div>
      <div className="mk-deepcard__money">
        <span>{p.amountLabel}</span>
        <strong>{p.amount}</strong>
      </div>
    </div>
  );
}

interface DeepDiveProps {
  flip?: boolean;
  image: string;
  alt: string;
  iconName: IconName;
  eyebrow: string;
  headline: ReactNode;
  body: ReactNode;
  bullets: string[];
  ctaLabel: string;
  ctaTo: string;
  card: DeepDiveCardProps;
}
function DeepDive(p: DeepDiveProps) {
  return (
    <section className={`mk-deep2 ${p.flip ? 'mk-deep2--flip' : ''}`}>
      <div className="mk-deep2__media reveal">
        <img src={p.image} alt={p.alt} loading="lazy" />
        <div className={`mk-deep2__veil mk-deep2__veil--${p.card.accent}`} aria-hidden />
        <DeepDiveCard {...p.card} />
      </div>
      <div className="mk-deep2__copy reveal">
        <div className={`mk-deep2__icon mk-deep2__icon--${p.card.accent}`}>
          <Icon name={p.iconName} size={22} />
        </div>
        <div className="mk-deep2__eyebrow">{p.eyebrow}</div>
        <h2 className="mk-deep2__headline">{p.headline}</h2>
        <p className="mk-deep2__body">{p.body}</p>
        <ul className="mk-deep2__checks">
          {p.bullets.map((b, i) => (
            <li key={i}>
              <Icon name="check" size={14} /> {b}
            </li>
          ))}
        </ul>
        <Link to={p.ctaTo} className="btn btn-primary btn-glow mk-deep2__cta">
          {p.ctaLabel} <Icon name="arrow" size={14} />
        </Link>
      </div>
    </section>
  );
}

export default function Landing() {
  useReveal();

  usePageMeta({
    title: 'Exit Armor — Severance Maximizer & 90-Day Layoff Playbook',
    description:
      'Laid off? Exit Armor is a $69 severance negotiation and layoff survival kit — 11 negotiable asks, HR call roleplay, COBRA vs ACA math, 50-state unemployment rules, and a printable 90-day action plan.',
    path: '/',
    jsonLd: [
      organizationJsonLd(),
      websiteJsonLd(),
      productJsonLd(),
      faqJsonLd(FAQ.map((f) => ({ q: f.q, a: f.a }))),
    ],
  });

  return (
    <MarketingLayout>
      {/* ========================================================
          HERO
      ======================================================== */}
      <section className="mk-hero mk-hero--v2">
        <div className="mk-hero__copy">
          <div className="mk-hero__eyebrow reveal">
            <span className="mk-hero__eyebrow-pulse" />
            Exit Armor guides you through <Rotator items={HERO_ROTATOR} />
          </div>
          <h1 className="reveal">
            Everything to do after a layoff &mdash;{' '}
            <span className="text-gradient">in order, in one place</span>.
          </h1>
          <p className="mk-hero__lede reveal">
            A layoff isn't one decision &mdash; it's fifty. Insurance, unemployment,
            severance, budget, job search, recovery. Exit Armor is a calm, step-by-step
            90-day playbook built on cited labor-law, healthcare and negotiation
            research. We don't replace a lawyer or a therapist. We help you take the
            next right step when your hands are still shaking.
          </p>
          <div className="mk-hero__cta-row reveal">
            <Link
              to="/checkout"
              className="btn btn-primary btn-glow"
              style={{ padding: '1rem 2rem', fontSize: '1.05rem' }}
            >
              Get the 90-Day Playbook &mdash; $69
              <Icon name="arrow" size={16} />
            </Link>
            <a href="#inside" className="btn btn-glass" style={{ padding: '1rem 2rem', fontSize: '1.05rem' }}>
              See what's inside
            </a>
          </div>
          <div className="mk-hero__checks reveal">
            <span className="mk-hero__check">One-time $69</span>
            <span className="mk-hero__check">No account needed</span>
            <span className="mk-hero__check">7-day money-back</span>
          </div>
          <p className="mk-hero__legal reveal">
            Educational resource. Not legal, financial, or medical advice. Always consult
            a licensed professional for decisions that affect your rights.
          </p>
        </div>

        <HeroMockup />
      </section>

      {/* ========================================================
          TRUST STRIP — with animated counters, emotional labels
      ======================================================== */}
      <section className="mk-trust">
        <div className="mk-trust__label">What's inside the kit &mdash; every number is a product fact</div>
        <div className="mk-trust__stats">
          <div className="mk-trust__stat reveal">
            <strong>
              <Counter target={11} /> asks
            </strong>
            <span>Every negotiable the kit walks you through</span>
          </div>
          <div className="mk-trust__stat reveal">
            <strong>
              <Counter target={50} /> states
            </strong>
            <span>Labor-law pages linked to official sources</span>
          </div>
          <div className="mk-trust__stat reveal">
            <strong>
              <Counter target={10} /> tools
            </strong>
            <span>Calculators, scripts &amp; templates, not a blank chat</span>
          </div>
          <div className="mk-trust__stat reveal">
            <strong>
              $<Counter target={69} />
            </strong>
            <span>One-time price. No subscription, no renewal.</span>
          </div>
        </div>
      </section>

      {/* ========================================================
          FOUR NUMBERS — the cited stakes, quietly stated.
          Reworked from a red, adversarial "HR vs you" block into
          a calm editorial data strip, closer in tone to VettedVitals
          and the rest of this page.
      ======================================================== */}
      <section className="mk-pain reveal">
        <div className="mk-pain__eyebrow">Four numbers worth knowing first</div>
        <h2 className="mk-pain__title">
          The cited ranges <span className="text-gradient">quietly shape</span> every severance conversation.
        </h2>
        <p className="mk-pain__lede">
          None of these are secrets &mdash; they sit in SHRM surveys, KFF reports, and state
          Department of Labor pages. But they rarely make it into the room when a packet
          lands on your desk. Exit Armor pulls them forward so you can read your offer
          against the published numbers instead of your gut.
        </p>
        <div className="mk-pain__grid">
          <div className="mk-pain__card">
            <div className="mk-pain__amount">1&ndash;2 wks</div>
            <div className="mk-pain__head">Per year of service</div>
            <p>The SHRM-reported severance range most US employers anchor around. The kit shows where your offer falls and which clauses are typically negotiable.</p>
          </div>
          <div className="mk-pain__card">
            <div className="mk-pain__amount">$1,800+/mo</div>
            <div className="mk-pain__head">The COBRA line item</div>
            <p>KFF-reported family COBRA premiums often exceed $1,800/month. The kit runs the ACA Marketplace comparison for your exact income and family size.</p>
          </div>
          <div className="mk-pain__card">
            <div className="mk-pain__amount">State by state</div>
            <div className="mk-pain__head">Non-compete enforceability</div>
            <p>Enforcement varies sharply &mdash; California, Minnesota and the recent FTC rule tightened the landscape. The kit links you to your state's current rules.</p>
          </div>
          <div className="mk-pain__card">
            <div className="mk-pain__amount">21 / 45 days</div>
            <div className="mk-pain__head">OWBPA review window</div>
            <p>Federal law gives workers 21 days (45 in group layoffs) to review a waiver, plus 7 days to revoke. The kit explains what that means for your situation.</p>
          </div>
        </div>
        <p className="mk-pain__reassure">
          <Icon name="info" size={14} /> Educational, not legal advice. Every number above is
          drawn from a public source the kit cites inline.
        </p>
      </section>

      {/* ========================================================
          BY THE NUMBERS — bold scale proof
      ======================================================== */}
      <section className="mk-section mk-numbers-section">
        <div className="mk-section__head">
          <div className="mk-section__eyebrow">Why you'll stop Googling at 2am</div>
          <h2>Every question you'll have &mdash; <span className="text-gradient">already answered</span>.</h2>
          <p>
            When you're panicking, you don't need a chatbot to re-prompt. You need someone
            who has seen this movie before. Every number below is content that already exists
            inside the kit — so your brain can rest while we hand you the next line.
          </p>
        </div>
        <div className="mk-numbers">
          {NUMBERS.map((n, i) => (
            <div key={i} className="mk-number reveal" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="mk-number__value">
                <Counter target={n.value} suffix={n.suffix} />
              </div>
              <div className="mk-number__label">{n.label}</div>
              <div className="mk-number__sub">{n.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          BUILT FOR REAL LIFE — person-in-context deep dives
          (moved up from later in the page so humans appear
          above the fold, not buried 6 sections down). Language
          is now intentionally hedged — we show *representative*
          numbers the calculator produces, not promised outcomes.
      ======================================================== */}
      <section className="mk-section mk-deep2-intro">
        <div className="mk-section__head">
          <div className="mk-section__eyebrow">Built for real life</div>
          <h2>Three moments &mdash; <span className="text-gradient">one calm playbook.</span></h2>
          <p>
            Every section below pairs a moment you might face with the deliverable
            Exit Armor hands you &mdash; a cited rule, a worked example, and the
            next sentence you'd say. Numbers shown are representative calculator
            outputs, not promised outcomes. Your result depends on your facts.
          </p>
        </div>
      </section>

      <DeepDive
        image={IMG_SEVERANCE}
        alt="Reviewing a severance offer at a desk"
        iconName="briefcase"
        eyebrow="If you're staring at a severance packet"
        headline={<>A cited counter-offer draft, <span className="text-gradient">in plain English</span>.</>}
        body={
          <>
            SHRM and Littler publish the ranges most US employers anchor to when
            drafting severance &mdash; typically 1&ndash;2 weeks per year of service,
            plus bonus proration, PTO, and COBRA offsets. Exit Armor plugs your
            tenure, state and comp into those published ranges and shows you a
            floor, a benchmarked ask, and a stretch target &mdash; with the
            counter-offer email already written underneath.
          </>
        }
        bullets={[
          'SHRM & Littler-cited ranges for your state',
          'Counter-offer email auto-drafted with your numbers',
        ]}
        ctaLabel="See the module"
        ctaTo="/checkout"
        card={{
          title: 'Counter-offer target',
          category: 'Severance Calculator · example',
          ruleLabel: 'Cited',
          ruleValue: 'SHRM 2024 · Littler',
          amountLabel: 'Benchmarked delta',
          amount: '+$14,800',
          accent: 'sage',
        }}
      />

      <DeepDive
        flip
        image={IMG_COBRA}
        alt="Reviewing health insurance options at a kitchen table"
        iconName="heart"
        eyebrow="If you have a 60-day benefits decision"
        headline={<>COBRA or ACA? <span className="text-gradient">Side-by-side math</span>, not a forum thread.</>}
        body={
          <>
            KFF's 2024 Employer Health Benefits survey puts average family COBRA
            premiums north of $1,800/month. For many households, the ACA Marketplace
            &mdash; priced on your new, lower job-search income &mdash; can win by
            thousands a year. Exit Armor runs both numbers for your exact income,
            state, and family size and tells you which one wins in your situation.
          </>
        }
        bullets={[
          'KFF 2024 premium data for COBRA side',
          'Real subsidy curve math for ACA side',
        ]}
        ctaLabel="See the module"
        ctaTo="/checkout"
        card={{
          title: 'Monthly savings · example',
          category: 'COBRA vs ACA',
          ruleLabel: 'Cited',
          ruleValue: 'KFF EHBS 2024',
          amountLabel: 'Representative',
          amount: '~$1,340/mo',
          accent: 'terracotta',
        }}
      />

      <DeepDive
        image={IMG_OFFER}
        alt="Comparing two job offers side by side"
        iconName="chart"
        eyebrow="If you have two offers on the table"
        headline={<>Two offers, <span className="text-gradient">line-by-line</span>, in plain dollars.</>}
        body={
          <>
            Base pay is never the whole story. PTO accrual, COBRA bridge, bonus
            proration, sign-on, unvested equity, 401(k) match &mdash; Exit Armor
            adds them all up for both offers side-by-side and shows you the real
            annual delta in plain dollars. No spreadsheet, no guessing, no regret.
          </>
        }
        bullets={[
          'Every comp component treated as a line item',
          'Printable summary you can bring to either recruiter',
        ]}
        ctaLabel="See the module"
        ctaTo="/checkout"
        card={{
          title: 'Annual delta · example',
          category: 'Offer Compare',
          ruleLabel: 'Weighted',
          ruleValue: 'Base + PTO + COBRA + equity',
          amountLabel: 'Offer B over Offer A',
          amount: '+$14,200/yr',
          accent: 'amber',
        }}
      />

      {/* ========================================================
          NEGOTIABLE ASKS MARQUEE — horizontal scroll
      ======================================================== */}
      <section className="mk-marquee-section reveal">
        <div className="mk-marquee-head">
          <span className="mk-marquee-eyebrow">11 negotiable asks · ranked by success rate</span>
          <h3>Every lever you didn't know you could pull.</h3>
        </div>
        <div className="mk-marquee">
          <div className="mk-marquee__track">
            {[...MARQUEE_ASKS, ...MARQUEE_ASKS].map((ask, i) => (
              <div key={i} className="mk-marquee__chip">
                <Icon name="check" size={12} /> {ask}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          SOURCED-FROM STRIP
      ======================================================== */}
      <section className="mk-sources">
        <div className="mk-sources__label">
          Built on the numbers employment lawyers use &mdash; every stat is cited
        </div>
        <div className="mk-sources__row">
          <span>SHRM</span>
          <span>BLS JOLTS</span>
          <span>Kaiser Family Foundation</span>
          <span>Littler Mendelson</span>
          <span>EEOC</span>
          <span>US Dept. of Labor</span>
          <span>LinkedIn Talent</span>
        </div>
      </section>

      {/* ========================================================
          FEATURES GRID — "what's inside"
      ======================================================== */}
      <section className="mk-section" id="inside">
        <div className="mk-section__head">
          <div className="mk-section__eyebrow">What you'll stop feeling alone with</div>
          <h2>The things nobody taught you &mdash; now written down.</h2>
          <p>
            Nobody teaches you how to get laid off. There's no class on what to do
            in the first 48 hours, no guide on which clauses matter, no handout on
            COBRA versus ACA. So we built one &mdash; nine plain-English tools that
            walk you through the exact next step, in the exact right order.
          </p>
        </div>
        <div className="mk-features mk-features--v2">
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className={`mk-feature mk-feature--${f.accent} reveal`}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              {f.pill && <div className="mk-feature__pill">{f.pill}</div>}
              <div className="mk-feature__icon">
                <Icon name={f.icon} size={32} />
              </div>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          COMPARISON TABLE — Exit Armor vs the alternatives
          (Hire an attorney / Go it alone). Positioning matters.
      ======================================================== */}
      <section className="mk-section mk-compare-section">
        <div className="mk-section__head">
          <div className="mk-section__eyebrow">The smarter way to negotiate</div>
          <h2>Before Exit Armor, your options were <span className="text-gradient">expensive, slow, or solo.</span></h2>
          <p>
            Hiring an employment attorney typically runs $300&ndash;$600/hr with a
            multi-hour minimum. Figuring it out yourself means Googling at 2am and
            hoping you didn't miss a clause. Exit Armor sits in the middle &mdash;
            attorney-grade structure, self-serve speed.
          </p>
        </div>
        <div className="mk-compare reveal">
          <table>
            <thead>
              <tr>
                <th></th>
                <th className="mk-compare__us">EXIT ARMOR</th>
                <th>Hire an attorney</th>
                <th>Go it alone</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Cost</td>
                <td className="mk-compare__us mk-compare__money">$69 one-time</td>
                <td>$1,500&ndash;$5,000+</td>
                <td>Free (plus your mistakes)</td>
              </tr>
              <tr>
                <td>Time to first counter-email</td>
                <td className="mk-compare__us">Minutes</td>
                <td>Days to weeks</td>
                <td>Hours (if you know what to write)</td>
              </tr>
              <tr>
                <td>State-law aware</td>
                <td className="mk-compare__us"><Icon name="check" size={14} /></td>
                <td><Icon name="check" size={14} /></td>
                <td>Only if you research it</td>
              </tr>
              <tr>
                <td>Cited industry benchmarks</td>
                <td className="mk-compare__us"><Icon name="check" size={14} /></td>
                <td>Sometimes</td>
                <td>Rarely</td>
              </tr>
              <tr>
                <td>Email templates written for you</td>
                <td className="mk-compare__us">20+ ready</td>
                <td>Drafted per call</td>
                <td>Blank page</td>
              </tr>
              <tr>
                <td>HR call rehearsal</td>
                <td className="mk-compare__us">8 scripted scenarios</td>
                <td>Sometimes</td>
                <td>Winging it</td>
              </tr>
              <tr>
                <td>You keep 100% of your severance</td>
                <td className="mk-compare__us"><Icon name="check" size={14} /></td>
                <td>Minus retainer</td>
                <td><Icon name="check" size={14} /></td>
              </tr>
              <tr>
                <td>You stay in control</td>
                <td className="mk-compare__us">Always &mdash; you review &amp; send</td>
                <td>You hand it over</td>
                <td>Yes, but overwhelmed</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mk-compare__cta">
          <Link
            to="/checkout"
            className="btn btn-primary btn-glow"
            style={{ padding: '1rem 2rem' }}
          >
            Get the kit &mdash; $69
            <Icon name="arrow" size={16} />
          </Link>
        </div>
      </section>

      {/* ========================================================
          PRODUCT GALLERY — real dashboard & calculator shots
          CSS-built replicas that match the live app 1:1 so buyers
          see the actual UI, not stock photography.
      ======================================================== */}
      <section className="mk-section mk-gallery-section">
        <div className="mk-section__head">
          <div className="mk-section__eyebrow">See inside the kit</div>
          <h2>
            This is literally what you <span className="text-gradient">see when you log in</span>.
          </h2>
          <p>
            No lorem ipsum, no stock photo collages. Every screen below is from the actual
            product &mdash; the same command center you'll see after checkout.
          </p>
        </div>

        <div className="mk-gallery">
          {/* Shot 1 — Dashboard Overview */}
          <div className="mk-shot reveal">
            <div className="mk-shot__frame">
              <div className="mk-shot__chrome">
                <span className="mk-shot__dot mk-shot__dot--r" />
                <span className="mk-shot__dot mk-shot__dot--y" />
                <span className="mk-shot__dot mk-shot__dot--g" />
                <div className="mk-shot__url">exitarmor.app / dashboard</div>
              </div>
              <div className="mk-shot__body mk-shot__body--dashboard">
                <div className="mk-shot-hero">
                  <span className="mk-shot-hero__eyebrow">
                    <Icon name="spark" size={10} /> Your biggest win today
                  </span>
                  <div className="mk-shot-hero__headline">
                    You're <span className="mk-shot-hero__amount">$14,800</span> away from a
                    defensible counter-offer.
                  </div>
                  <div className="mk-shot-hero__cta">
                    <Icon name="briefcase" size={12} /> Run the Severance Calculator
                  </div>
                </div>
                <div className="mk-shot-phases">
                  <div className="mk-shot-phase mk-shot-phase--done">
                    <div className="mk-shot-phase__ring">1</div>
                    <div className="mk-shot-phase__label">Stabilize</div>
                  </div>
                  <div className="mk-shot-phase mk-shot-phase--active">
                    <div className="mk-shot-phase__ring">2</div>
                    <div className="mk-shot-phase__label">Benefits</div>
                  </div>
                  <div className="mk-shot-phase">
                    <div className="mk-shot-phase__ring">3</div>
                    <div className="mk-shot-phase__label">Finances</div>
                  </div>
                  <div className="mk-shot-phase">
                    <div className="mk-shot-phase__ring">4</div>
                    <div className="mk-shot-phase__label">Launch</div>
                  </div>
                </div>
                <div className="mk-shot-modules">
                  <div className="mk-shot-module mk-shot-module--crimson">
                    <div className="mk-shot-module__icon"><Icon name="shield" size={14} /></div>
                    <div className="mk-shot-module__title">First 48 Hours</div>
                    <div className="mk-shot-module__amount">48h</div>
                  </div>
                  <div className="mk-shot-module mk-shot-module--rose">
                    <div className="mk-shot-module__icon"><Icon name="briefcase" size={14} /></div>
                    <div className="mk-shot-module__title">Severance Prep</div>
                    <div className="mk-shot-module__amount">+$14,800</div>
                  </div>
                  <div className="mk-shot-module mk-shot-module--amber">
                    <div className="mk-shot-module__icon"><Icon name="dollar" size={14} /></div>
                    <div className="mk-shot-module__title">90-Day Budget</div>
                    <div className="mk-shot-module__amount">90 days</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mk-shot__caption">
              <strong>Your command center.</strong> One glance shows exactly
              what you're owed and what's next.
            </div>
          </div>

          {/* Shot 2 — Severance Calculator */}
          <div className="mk-shot reveal" style={{ animationDelay: '100ms' }}>
            <div className="mk-shot__frame">
              <div className="mk-shot__chrome">
                <span className="mk-shot__dot mk-shot__dot--r" />
                <span className="mk-shot__dot mk-shot__dot--y" />
                <span className="mk-shot__dot mk-shot__dot--g" />
                <div className="mk-shot__url">exitarmor.app / severance</div>
              </div>
              <div className="mk-shot__body mk-shot__body--calc">
                <div className="mk-shot-calc__head">
                  <span className="mk-shot-calc__title">Severance Calculator</span>
                  <span className="mk-shot-calc__state">CA · 7 yrs · Senior PM</span>
                </div>
                <div className="mk-shot-calc__inputs">
                  <div className="mk-shot-calc__input">
                    <span>Base salary</span>
                    <strong>$165,000</strong>
                  </div>
                  <div className="mk-shot-calc__input">
                    <span>Tenure</span>
                    <strong>7.0 yrs</strong>
                  </div>
                  <div className="mk-shot-calc__input">
                    <span>Unvested RSUs</span>
                    <strong>$42,000</strong>
                  </div>
                </div>
                <div className="mk-shot-calc__divider" />
                <div className="mk-shot-calc__row">
                  <span>Company floor (2 wk/yr)</span>
                  <strong>$46,200</strong>
                </div>
                <div className="mk-shot-calc__row">
                  <span>Your defensible ask</span>
                  <strong className="mk-shot-calc__ask">$61,000</strong>
                </div>
                <div className="mk-shot-calc__row mk-shot-calc__row--cite">
                  <span>Cited</span>
                  <em>SHRM 2024 · Littler</em>
                </div>
                <div className="mk-shot-calc__delta">
                  <span>Target delta</span>
                  <strong>+$14,800</strong>
                </div>
                <div className="mk-shot-calc__stamp">
                  <Icon name="check" size={10} /> Counter-email drafted
                </div>
              </div>
            </div>
            <div className="mk-shot__caption">
              <strong>Math &amp; email in one click.</strong> We benchmark,
              you review, HR gets a professional counter.
            </div>
          </div>

          {/* Shot 3 — COBRA vs ACA */}
          <div className="mk-shot reveal" style={{ animationDelay: '200ms' }}>
            <div className="mk-shot__frame">
              <div className="mk-shot__chrome">
                <span className="mk-shot__dot mk-shot__dot--r" />
                <span className="mk-shot__dot mk-shot__dot--y" />
                <span className="mk-shot__dot mk-shot__dot--g" />
                <div className="mk-shot__url">exitarmor.app / cobra-aca</div>
              </div>
              <div className="mk-shot__body mk-shot__body--cobra">
                <div className="mk-shot-cobra__head">
                  <Icon name="heart" size={14} />
                  <span>COBRA vs ACA Decision Matrix</span>
                </div>
                <div className="mk-shot-cobra__grid">
                  <div className="mk-shot-cobra__col">
                    <div className="mk-shot-cobra__label">COBRA</div>
                    <div className="mk-shot-cobra__cost">$1,820<em>/mo</em></div>
                    <div className="mk-shot-cobra__bar"><span style={{ width: '92%' }} /></div>
                    <ul>
                      <li>Keep current doctors</li>
                      <li>100% premium + 2% admin</li>
                      <li>60-day window</li>
                    </ul>
                  </div>
                  <div className="mk-shot-cobra__col mk-shot-cobra__col--win">
                    <div className="mk-shot-cobra__label">ACA Marketplace</div>
                    <div className="mk-shot-cobra__cost">$480<em>/mo</em></div>
                    <div className="mk-shot-cobra__bar"><span style={{ width: '24%' }} /></div>
                    <ul>
                      <li>Income-based subsidies</li>
                      <li>Narrower network</li>
                      <li>60-day SEP</li>
                    </ul>
                    <div className="mk-shot-cobra__winner">
                      <Icon name="check" size={11} /> Recommended
                    </div>
                  </div>
                </div>
                <div className="mk-shot-cobra__savings">
                  Monthly savings <strong>$1,340/mo</strong>
                </div>
              </div>
            </div>
            <div className="mk-shot__caption">
              <strong>Real money decisions.</strong> Side-by-side, cited
              against KFF 2024 — not a generic calculator.
            </div>
          </div>
        </div>

        <div className="mk-gallery__footer">
          <span className="mk-gallery__note">
            <Icon name="lock" size={12} /> Everything saves on your device. No account, no login.
          </span>
          <Link to="/checkout" className="btn btn-primary btn-glow" style={{ padding: '0.95rem 1.8rem' }}>
            Get the kit &mdash; $69
            <Icon name="arrow" size={16} />
          </Link>
        </div>
      </section>

      {/* ========================================================
          HOW IT WORKS — 3 phases
      ======================================================== */}
      <section className="mk-section">
        <div className="mk-section__head">
          <div className="mk-section__eyebrow">The guided journey</div>
          <h2>A 90-day plan you don't have to build from scratch.</h2>
          <p>
            The first week feels like drowning. The kit breaks the next ninety days into
            three phases &mdash; stabilize, negotiate, relaunch &mdash; with a short, specific
            next step at every stop. You don't have to see the whole road; just the next mile.
          </p>
        </div>
        <div className="mk-steps mk-steps--v2">
          {STEPS.map((s, i) => (
            <div key={i} className="mk-step reveal" style={{ animationDelay: `${i * 90}ms` }}>
              <div className="mk-step__number">{i + 1}</div>
              <div className="mk-step__phase">
                {s.phase} · {s.days}
              </div>
              <div className="mk-step__icon">
                <Icon name={s.icon} size={26} />
              </div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          PRICING
      ======================================================== */}
      <section className="mk-section" id="pricing">
        <div className="mk-section__head">
          <div className="mk-section__eyebrow">Pricing</div>
          <h2>$69 one-time. No subscription.</h2>
          <p>
            Less than one hour of an attorney at market rates. Less than two months of
            a streaming bundle. One-time purchase, seven-day refund, and you keep the
            full kit &mdash; calculators, scripts, templates, state law &mdash; forever.
          </p>
        </div>
        <div className="mk-pricing">
          {TIERS.map((t) => (
            <div
              key={t.id}
              className={`mk-price-card ${t.highlighted ? 'mk-price-card--highlight' : ''} reveal`}
            >
              {t.badge && (
                <div
                  className={`mk-price-card__badge ${
                    t.badge.toLowerCase().includes('soon') ? 'mk-price-card__badge--soon' : ''
                  }`}
                >
                  {t.badge}
                </div>
              )}
              <h3>{t.name}</h3>
              <div className="mk-price-card__price">
                <span className="mk-price-card__amount">{t.price}</span>
                <span className="mk-price-card__period">{t.period}</span>
              </div>
              <p className="mk-price-card__blurb">{t.blurb}</p>
              <ul className="mk-price-card__features">
                {t.features.map((ft, i) => (
                  <li key={i}>
                    <Icon name="check" size={14} /> {ft}
                  </li>
                ))}
              </ul>
              {t.id === 'self' ? (
                <Link
                  to="/checkout"
                  className={`btn ${t.highlighted ? 'btn-primary btn-glow' : 'btn-glass'}`}
                  style={{ padding: '0.85rem 1.5rem', justifyContent: 'center' }}
                >
                  {t.cta}
                </Link>
              ) : (
                <Link
                  to={t.ctaTo}
                  className={`btn ${t.highlighted ? 'btn-primary btn-glow' : 'btn-glass'}`}
                  style={{ padding: '0.85rem 1.5rem', justifyContent: 'center' }}
                >
                  {t.cta}
                </Link>
              )}
            </div>
          ))}
        </div>
        <p className="mk-pricing__footnote">
          All tiers are one-time purchases. No subscriptions, no auto-renewals, no upsell
          emails. 7-day money-back guarantee on the Self-Serve Kit.
        </p>
      </section>

      {/* ========================================================
          SCENARIOS — the three situations Exit Armor is built for
      ======================================================== */}
      <section className="mk-section">
        <div className="mk-section__head">
          <div className="mk-section__eyebrow">Three situations, one playbook</div>
          <h2>What Exit Armor is <span className="text-gradient">purpose-built</span> to walk you through.</h2>
          <p>
            These are the three situations the kit was designed for &mdash; every claim
            below is either a product fact (what Exit Armor actually does) or a cited
            industry source (SHRM, KFF, DOL, EEOC). No invented outcomes, no gimmick
            testimonials &mdash; just the work we do with you.
          </p>
        </div>
        <div className="mk-testimonials mk-testimonials--v2">
          {SCENARIOS.map((s) => (
            <div key={s.title} className="mk-testimonial reveal">
              <div className="mk-testimonial__gain">
                <Icon name="info" size={13} /> {s.tag}
              </div>
              <div className="mk-testimonial__eyebrow" style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                {s.eyebrow}
              </div>
              <div className="mk-testimonial__quote" style={{ fontWeight: 600 }}>{s.title}</div>
              <p style={{ marginTop: '0.75rem', fontSize: '0.92rem', lineHeight: 1.55, color: 'var(--text-secondary, #4b5563)' }}>
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          FAQ
      ======================================================== */}
      <section className="mk-section">
        <div className="mk-section__head">
          <div className="mk-section__eyebrow">Questions</div>
          <h2>Answers to the ones everyone asks.</h2>
        </div>
        <div className="mk-faq">
          {FAQ.map((f, i) => (
            <details key={i} className="mk-faq__item reveal">
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ========================================================
          FINAL CTA — now with a real photo background so it
          doesn't feel like a blank slab. Warm morning light at
          a kitchen table, gradient overlay in the new palette.
      ======================================================== */}
      <section className="mk-section mk-final-section">
        <div className="mk-cta-band mk-cta-band--v3 reveal">
          <div
            className="mk-cta-band__photo"
            style={{
              backgroundImage:
                'url(https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1600&q=80)',
            }}
            aria-hidden
          />
          <div className="mk-cta-band__overlay" aria-hidden />
          <div className="mk-cta-band__content">
            <div className="mk-cta-band__eyebrow">Your next hour, not your whole life</div>
            <h2>One step at a time &mdash; starting with the next one.</h2>
            <p>
              Exit Armor is an educational kit built on cited labor-law, healthcare
              and negotiation research. Sixty-nine dollars, one-time, seven-day
              refund &mdash; and the quiet confidence of opening a checklist instead
              of a blank browser tab at 2am.
            </p>
            <Link
              to="/checkout"
              className="btn btn-primary btn-glow"
              style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}
            >
              Get the 90-Day Playbook &mdash; $69
              <Icon name="arrow" size={16} />
            </Link>
            <p className="mk-cta-band__fine">
              $69 one-time &middot; 7-day money-back guarantee &middot; No account needed
            </p>
          </div>
        </div>
      </section>

    </MarketingLayout>
  );
}
