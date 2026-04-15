import { useEffect, useState } from 'react';
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
// Imagery — warm, professional, hopeful. Emotional faces that
// sell transformation (relief, confidence, clarity).
// --------------------------------------------------------------
const IMG_RUNWAY =
  'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=900&q=80';
const IMG_CALL =
  'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=900&q=80';
const IMG_SEARCH =
  'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80';

// Illustrative portraits — used only to convey the human scope
// of the situations the kit is built around. Not customers, not
// testimonials, not outcomes. Stock imagery under Unsplash license.
const FACES = [
  {
    src: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
    caption: 'Severance math, line by line',
    name: 'Situation we walk through',
  },
  {
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    caption: 'COBRA vs ACA, side by side',
    name: 'Situation we walk through',
  },
  {
    src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    caption: 'Non-compete, read in plain English',
    name: 'Situation we walk through',
  },
  {
    src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    caption: 'HR call, rehearsed before it happens',
    name: 'Situation we walk through',
  },
  {
    src: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80',
    caption: 'Job search, step by step',
    name: 'Situation we walk through',
  },
];

// Hero rotates through this list to show scale & unique coverage
const HERO_ROTATOR = [
  '50 state laws',
  '11 negotiable asks',
  '8 HR roleplay scenarios',
  '20+ email templates',
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
  accent: 'coral' | 'amber' | 'rose' | 'crimson' | 'sunset' | 'ember';
  pill?: string;
}

const FEATURES: Feature[] = [
  {
    icon: 'briefcase',
    accent: 'crimson',
    pill: 'Calculator',
    title: 'Severance Calculator',
    body:
      'Your state, your tenure, your real number. Pulls in COBRA coverage, bonus proration, equity acceleration — shows a defensible target and a stretch target in seconds.',
  },
  {
    icon: 'dollar',
    accent: 'sunset',
    pill: 'Calculator',
    title: '90-Day Runway',
    body:
      'Plug in your bills once. See three scenarios — hold steady, cut discretionary, hard cut — and the top five expenses to trim. No spreadsheets, no math.',
  },
  {
    icon: 'mail',
    accent: 'coral',
    pill: '20+ templates',
    title: 'Ready-to-send emails',
    body:
      'Full-length, not fill-in-the-blank. Buy-time replies, counter-offer drafts, attorney intake, HR follow-ups — auto-personalized with your name, company, and HR contact.',
  },
  {
    icon: 'mic',
    accent: 'ember',
    pill: 'Practice',
    title: 'HR Call Roleplay',
    body:
      'The 8 hardest moments of a severance call — "sign today," "non-negotiable," veiled threats — with branching responses and coaching after every choice.',
  },
  {
    icon: 'chart',
    accent: 'amber',
    pill: 'Side-by-side',
    title: 'Offer Compare',
    body:
      'Two offers, line-by-line math. Base pay, COBRA value, PTO, bonus, equity — we add it up both ways so you see the delta in plain dollars.',
  },
  {
    icon: 'heart',
    accent: 'rose',
    pill: 'Benefits',
    title: 'COBRA vs ACA',
    body:
      'KFF data puts average family COBRA premiums over $1,800/month. The kit compares that against ACA Marketplace quotes for your exact income and family size, so you can see which one actually wins.',
  },
  {
    icon: 'scale',
    accent: 'crimson',
    pill: 'Legal',
    title: 'Find an Attorney',
    body:
      'Six real, national, long-running services — NELA, ABA Free Legal Answers, EEOC, DOL, LSC. Plus a 15-minute intake script so you don\'t freeze on the call.',
  },
  {
    icon: 'book',
    accent: 'coral',
    pill: 'Interview',
    title: 'Story Builder',
    body:
      'Six interview stories in the STAR format, written in plain English. Works for a senior director — and for a barista going back into the workforce.',
  },
  {
    icon: 'map',
    accent: 'amber',
    pill: '50 states',
    title: 'State Law Guide',
    body:
      'Unemployment filing windows, final-paycheck rules, PTO payout, non-compete enforceability, WARN Act coverage — linked to the actual government pages.',
  },
  {
    icon: 'info',
    accent: 'sunset',
    pill: 'Citations',
    title: 'Industry Benchmarks',
    body:
      'Every number we show is sourced — SHRM, BLS, KFF, Littler, LinkedIn Talent. No made-up peer data. You can cite them in your negotiation.',
  },
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

// Example scenarios the kit is designed to walk users through.
// These are illustrative — not customer testimonials. Every
// factual claim in them is a product fact (what Exit Armor does)
// or a cited industry number (SHRM, KFF, BLS, DOL, EEOC).
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
    ctaTo: '/app',
    highlighted: true,
  },
  {
    id: 'ally',
    name: 'Power Hour',
    price: '$149',
    period: 'one-time',
    blurb: 'The kit + a real human on your most important call. For when you want a second set of eyes.',
    features: [
      'Everything in Self-Serve Kit',
      '60-min 1:1 call with a severance coach',
      'Live review of your specific offer',
      'We draft your counter-offer with you',
      '3 days of async follow-up questions',
      'Schedule within 24 hours',
    ],
    cta: 'Book my Power Hour',
    ctaTo: '/contact',
  },
  {
    id: 'war-room',
    name: 'War Room',
    price: '$349',
    period: 'one-time',
    blurb: 'Full concierge through the entire negotiation — first call, counter, final sign-off.',
    features: [
      'Everything in Power Hour',
      '3 sessions (intake, counter, sign-off)',
      'Unlimited async messaging for 14 days',
      'Line-by-line review of your agreement',
      'Attorney referral if your case needs it',
      'Priority scheduling',
    ],
    cta: 'Start a War Room',
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
    a: 'No subscription on the Self-Serve Kit — $69 one-time, you use it until you don\'t need it. Power Hour and War Room are also one-time purchases. We don\'t do freemium traps or auto-renewing monthly plans.',
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
function HeroMockup() {
  return (
    <div className="mk-mockup reveal">
      <div className="mk-mockup__window">
        <div className="mk-mockup__chrome">
          <span className="mk-mockup__dot mk-mockup__dot--r" />
          <span className="mk-mockup__dot mk-mockup__dot--y" />
          <span className="mk-mockup__dot mk-mockup__dot--g" />
          <div className="mk-mockup__url">exitarmor.app / severance</div>
        </div>
        <div className="mk-mockup__body">
          <div className="mk-mockup__eyebrow">Severance Calculator &middot; illustrative</div>
          <div className="mk-mockup__headline">Three cited ranges</div>
          <div className="mk-mockup__big">
            <strong>Floor &middot; Ask &middot; Stretch</strong>
            <span>Tenure, state, COBRA, bonus, PTO &mdash; each a line item</span>
          </div>
          <div className="mk-mockup__bar">
            <div className="mk-mockup__bar-fill" />
            <div className="mk-mockup__bar-labels">
              <span>Company floor</span>
              <span>Your ask</span>
              <span>Stretch</span>
            </div>
          </div>
          <div className="mk-mockup__row">
            <div className="mk-mockup__chip mk-mockup__chip--on">
              <Icon name="check" size={11} /> Non-compete reviewed
            </div>
            <div className="mk-mockup__chip mk-mockup__chip--on">
              <Icon name="check" size={11} /> COBRA vs ACA
            </div>
            <div className="mk-mockup__chip">Bonus proration</div>
          </div>
        </div>
      </div>

      <div className="mk-mockup__float mk-mockup__float--ask">
        <div className="mk-mockup__float-head">
          <Icon name="briefcase" size={14} /> 11 negotiables
        </div>
        <strong>Ranked &amp; scripted</strong>
        <span>Every ask has a pre-written email</span>
      </div>

      <div className="mk-mockup__float mk-mockup__float--hr">
        <div className="mk-mockup__float-head mk-mockup__float-head--warn">
          <Icon name="alert" size={14} /> HR Roleplay
        </div>
        <em>"This offer is non-negotiable."</em>
        <div className="mk-mockup__reply">
          <Icon name="check" size={11} /> 4 coached replies
        </div>
      </div>
    </div>
  );
}

// --------------------------------------------------------------
// A compact mockup used inside deep-dive sections.
// --------------------------------------------------------------
function MiniMockup({
  title,
  lines,
  accent,
}: {
  title: string;
  lines: { label: string; value: string; strong?: boolean }[];
  accent: 'crimson' | 'amber' | 'rose';
}) {
  return (
    <div className={`mk-mini mk-mini--${accent}`}>
      <div className="mk-mini__head">{title}</div>
      {lines.map((l, i) => (
        <div key={i} className={`mk-mini__row ${l.strong ? 'mk-mini__row--strong' : ''}`}>
          <span>{l.label}</span>
          <strong>{l.value}</strong>
        </div>
      ))}
    </div>
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
            Exit Armor covers <Rotator items={HERO_ROTATOR} />
          </div>
          <h1 className="reveal">
            Don't read your severance packet <span className="text-gradient">alone at 11pm</span>.
          </h1>
          <p className="mk-hero__lede reveal">
            Your hands are shaking. HR wants an answer by Friday. You're reading a 14-page
            severance packet with no idea which clauses matter. Exit Armor is an educational
            kit built on cited labor-law, healthcare and negotiation research — so you can
            walk into that meeting with a plan instead of a panic attack.
          </p>
          <div className="mk-hero__cta-row reveal">
            <Link to="/app" className="btn btn-primary btn-glow" style={{ padding: '1rem 2rem', fontSize: '1.05rem' }}>
              Get My Playbook &mdash; $69
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
          PAIN CALLOUT — what's actually at stake
      ======================================================== */}
      <section className="mk-pain reveal">
        <div className="mk-pain__eyebrow">Here's what's actually at stake</div>
        <h2 className="mk-pain__title">
          HR is counting on you to be <span className="text-gradient">too overwhelmed</span> to fight back.
        </h2>
        <p className="mk-pain__lede">
          Not because they're cruel — because that's how companies minimize severance costs.
          The people who wrote your packet are trained to settle. You aren't. Every day you
          spend panicking, Googling, and second-guessing is a day HR banks on.
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
            <p>Federal law gives workers 40+ 21 days (45 in group layoffs) to review a waiver, plus 7 days to revoke. The kit explains what that means for your situation.</p>
          </div>
        </div>
        <p className="mk-pain__reassure">
          <Icon name="shield" size={14} /> Exit Armor exists so none of these happen to you.
          We walk beside you through every clause, every number, every conversation.
        </p>
      </section>

      {/* ========================================================
          REAL FACES BAND — emotional social proof
      ======================================================== */}
      <section className="mk-faces reveal">
        <div className="mk-faces__label">
          The kinds of situations Exit Armor is built around &mdash; illustrative, stock imagery
        </div>
        <div className="mk-faces__row">
          {FACES.map((f) => (
            <figure key={f.src} className="mk-face">
              <img src={f.src} alt={f.name} />
              <figcaption>
                <strong>{f.caption}</strong>
                <span>{f.name}</span>
              </figcaption>
            </figure>
          ))}
        </div>
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
            Nobody teaches you how to get laid off. There's no class on severance negotiation,
            no guide on what to say when HR stares at you across a Zoom. So we built one.
            Ten tools, all in plain English, all walking you through the exact next step.
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
          DEEP DIVE 1 — Severance Calculator
      ======================================================== */}
      <section className="mk-deep">
        <div className="mk-deep__media reveal">
          <img src={IMG_RUNWAY} alt="Reviewing severance documents and numbers" />
          <MiniMockup
            title="Severance Calculator · illustrative"
            accent="crimson"
            lines={[
              { label: 'Cited range', value: 'SHRM / Littler' },
              { label: 'Line items', value: '6 line items', strong: true },
              { label: 'State-aware', value: 'All 50' },
              { label: 'Output', value: 'Floor / Ask / Stretch' },
            ]}
          />
        </div>
        <div className="mk-deep__copy reveal">
          <div className="mk-deep__eyebrow">See the full picture before you reply</div>
          <h2>Three numbers, <span className="text-gradient">one defensible ask.</span></h2>
          <p>
            SHRM and Littler publish the ranges most US employers use when structuring
            severance — typically 1&ndash;2 weeks per year of service, plus bonus proration,
            COBRA reimbursement, and PTO payout. The Severance Calculator plugs your tenure,
            state and comp into those published ranges and shows you three numbers: a
            floor, a defensible ask, and a stretch target &mdash; with every citation linked.
          </p>
          <ul className="mk-deep__checks">
            <li><Icon name="check" size={14} /> See your offer against cited SHRM ranges, not gut feel</li>
            <li><Icon name="check" size={14} /> COBRA, bonus proration, PTO and equity treated as line items</li>
            <li><Icon name="check" size={14} /> State-aware &mdash; links to the actual government pages</li>
            <li><Icon name="check" size={14} /> Every citation real &mdash; SHRM, BLS, KFF, DOL, EEOC</li>
          </ul>
        </div>
      </section>

      {/* ========================================================
          DEEP DIVE 2 — HR Roleplay
      ======================================================== */}
      <section className="mk-deep mk-deep--flip">
        <div className="mk-deep__copy reveal">
          <div className="mk-deep__eyebrow">The 8 sentences HR learns in negotiation training</div>
          <h2>When HR says "non-negotiable," <span className="text-gradient">do you have a reply?</span></h2>
          <p>
            "This offer is non-negotiable." "We need your signature by Friday." "Bringing an
            attorney will only complicate things." These aren't questions — they're pressure
            tactics, and each one has a reply that holds your package together and a reply
            that costs you thousands. Exit Armor rehearses all eight with you, in private,
            before the real call.
          </p>
          <ul className="mk-deep__checks">
            <li><Icon name="check" size={14} /> Hear the exact lines HR will try on you</li>
            <li><Icon name="check" size={14} /> See which replies protect your money and which surrender it</li>
            <li><Icon name="check" size={14} /> Walk into the real call calm, not shaking</li>
            <li><Icon name="check" size={14} /> Nothing to memorize — it's all scripted for you</li>
          </ul>
        </div>
        <div className="mk-deep__media reveal">
          <img src={IMG_CALL} alt="Preparing for a difficult work phone call" />
          <MiniMockup
            title="HR Roleplay · Scenario 3"
            accent="rose"
            lines={[
              { label: 'HR said', value: '"Non-negotiable"' },
              { label: 'Reply options', value: '4 coached', strong: true },
              { label: 'Verdicts', value: 'Green / Amber / Red' },
              { label: 'Coaching notes', value: 'After every choice' },
            ]}
          />
        </div>
      </section>

      {/* ========================================================
          DEEP DIVE 3 — Attorney directory + benchmarks
      ======================================================== */}
      <section className="mk-deep">
        <div className="mk-deep__media reveal">
          <img src={IMG_SEARCH} alt="Research team reviewing legal resources" />
          <MiniMockup
            title="Find an Attorney"
            accent="amber"
            lines={[
              { label: 'NELA directory', value: 'Free search' },
              { label: 'EEOC filing', value: '180–300 days' },
              { label: 'ABA Free Legal', value: 'Income-qualified' },
              { label: 'LSC legal aid', value: 'Free' },
            ]}
          />
        </div>
        <div className="mk-deep__copy reveal">
          <div className="mk-deep__eyebrow">You don't need a $500/hr lawyer. Yet.</div>
          <h2>Six places to get real legal help &mdash; <span className="text-gradient">most of them free.</span></h2>
          <p>
            Most people never call a lawyer because they assume it's $500 an hour and they
            can't justify it. So they sign. Exit Armor shows you the six national services
            that real employment lawyers point workers to — NELA, ABA Free Legal Answers, EEOC,
            LSC — and hands you a 15-minute intake script so you don't freeze on the first call.
          </p>
          <ul className="mk-deep__checks">
            <li><Icon name="check" size={14} /> Know exactly when a lawyer is worth the call</li>
            <li><Icon name="check" size={14} /> Know exactly when you can handle it yourself</li>
            <li><Icon name="check" size={14} /> Stop worrying you're about to miss a discrimination claim</li>
            <li><Icon name="check" size={14} /> Every resource verifiable &mdash; no invented local firms</li>
          </ul>
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
              {t.badge && <div className="mk-price-card__badge">{t.badge}</div>}
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
              <Link
                to={t.ctaTo}
                className={`btn ${t.highlighted ? 'btn-primary btn-glow' : 'btn-glass'}`}
                style={{ padding: '0.85rem 1.5rem', justifyContent: 'center' }}
              >
                {t.cta}
              </Link>
            </div>
          ))}
        </div>
        <p className="mk-pricing__footnote">
          All tiers are one-time purchases. No subscriptions, no auto-renewals, no upsell
          emails. 7-day money-back guarantee on the Self-Serve Kit.
        </p>
      </section>

      {/* ========================================================
          SCENARIOS — illustrative, clearly framed as examples
      ======================================================== */}
      <section className="mk-section">
        <div className="mk-section__head">
          <div className="mk-section__eyebrow">Example scenarios the kit walks through</div>
          <h2>Three situations Exit Armor is built to handle.</h2>
          <p>
            Exit Armor is a new product and we don't publish customer testimonials.
            Instead, here are three of the most common situations the kit is designed
            to walk users through &mdash; every claim below is either a product fact
            (what Exit Armor does) or a cited industry source (SHRM, KFF, DOL).
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
          FINAL CTA
      ======================================================== */}
      <section className="mk-section">
        <div className="mk-cta-band mk-cta-band--v2 reveal">
          <div className="mk-cta-band__glow" />
          <h2>Walk into that meeting with a plan, not a panic.</h2>
          <p>
            Exit Armor is an educational kit built on cited labor-law, healthcare and
            negotiation research. Sixty-nine dollars, one-time, seven-day refund &mdash;
            and the quiet confidence of reading your severance with a checklist instead
            of a blank stare.
          </p>
          <Link to="/app" className="btn btn-primary btn-glow" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
            Start My Playbook &mdash; $69
            <Icon name="arrow" size={16} />
          </Link>
          <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            $69 one-time &middot; 7-day money-back guarantee &middot; No account needed
          </p>
        </div>
      </section>

    </MarketingLayout>
  );
}
