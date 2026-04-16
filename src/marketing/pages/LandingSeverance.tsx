// ------------------------------------------------------------
// /severance — split-test landing page
//
// Design brief:
//   * Single-purpose: sell the $69 Severance Maximizer angle
//   * Legally safe — no "you are owed", no fabricated dollar promises,
//     no guaranteed outcomes, no invented testimonials
//   * Capability-accurate — every feature number matches the dashboard
//     (21 emails = 13 severance + 8 job-search; 11 asks; 50-state rules;
//     COBRA vs ACA calculator; First 48 Hours; 7-Day Recovery; 90-day budget)
//   * Premium feel — layered gradients, glow CTA, reveal-on-scroll,
//     animated stat counter, floating receipt mockup, SVG portrait avatars
//   * Lean — ~6 sections, each earns its pixels
// ------------------------------------------------------------
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { MarketingLayout } from '../MarketingLayout';
import { Icon } from '../../components/Icon';
import type { IconName } from '../../components/Icon';
import {
  organizationJsonLd,
  productJsonLd,
  usePageMeta,
  websiteJsonLd,
} from '../../lib/seo';

// --------------------------------------------------------------
// Feature pillars — mapped 1:1 to the dashboard modules so nothing
// promised here fails to show up inside.
// --------------------------------------------------------------
interface Feature {
  icon: IconName;
  pill: string;
  title: string;
  body: string;
  accent: string;
}

const FEATURES: Feature[] = [
  {
    icon: 'scale',
    pill: 'Benchmark',
    title: '50-State Severance Rulebook',
    body:
      'Enter your tenure, title, and state. The kit compares your offer against SHRM and Littler industry benchmarks and shows what is standard, high, and below market — with links to the actual state statutes.',
    accent: 'terracotta',
  },
  {
    icon: 'list',
    pill: '11 Asks',
    title: 'The Negotiation Checklist',
    body:
      'Eleven specific asks HR is trained to say no to on reflex and yes to when framed correctly — extended health, unvested equity, outplacement, reference language, non-compete narrowing, and more.',
    accent: 'forest',
  },
  {
    icon: 'mail',
    pill: '21 Templates',
    title: 'Copy-Ready Email Library',
    body:
      'Thirteen severance emails (soft stall, leverage ask, final sign-off) plus eight job-search emails (reactivation, warm intro, interview prep). Auto-fills your name, numbers, and HR contact from your profile.',
    accent: 'sage',
  },
  {
    icon: 'heart',
    pill: 'Benefits',
    title: 'COBRA vs ACA Calculator',
    body:
      'KFF data puts average family COBRA near $1,800/month. Enter your household income and family size — the calculator tells you whether COBRA or an ACA Marketplace plan actually wins for your situation.',
    accent: 'gold',
  },
];

// Scenario cards — representative situations, not invented people.
// The main Landing follows the same pattern (no gimmick testimonials).
// The `used` chip row is factual product usage — NOT outcome numbers,
// so no fabricated dollar-amount promises end up on named faces.
interface Scenario {
  tag: string;
  who: string;
  role: string;
  avatar: 'A' | 'B' | 'C';
  used: string[];
  body: string;
}

const SCENARIOS: Scenario[] = [
  {
    tag: 'Senior IC · Tech · West Coast',
    who: 'Engineer, 8 years',
    role: 'Severance window: 21 days',
    avatar: 'A',
    used: ['Benchmark', '3 emails', 'Extended health', '11 Asks'],
    body:
      'Opens the kit Friday night. Runs the 50-state benchmark, drafts the soft-stall email, then the leverage ask with extended health and unvested equity framed as the top two items. Books a 20-minute attorney review from the free-legal-help list before signing.',
  },
  {
    tag: 'People manager · Mid-market · East Coast',
    who: 'Director, 12 years',
    role: 'Severance window: 45 days',
    avatar: 'B',
    used: ['COBRA vs ACA', '90-day budget', 'Outplacement', 'Reference letter'],
    body:
      'Uses the COBRA vs ACA calculator first — her family of four lands on an ACA Silver plan for six months. Sends the benefits-focused counter-offer, adds outplacement and reference language, then runs the 90-day budget planner while the response comes back.',
  },
  {
    tag: 'Already signed · Mid-career · Midwest',
    who: 'Product lead, 6 years',
    role: 'Signed last Friday',
    avatar: 'C',
    used: ['Unemployment', 'Network activation', 'LinkedIn rewrite', 'Job-search emails'],
    body:
      'The severance window closed — but the rest of the kit did not. Backfiles unemployment correctly on day one, rewrites the LinkedIn headline to read past the ATS, sends the 8 warm-intro emails in a single block, and opens the first-48-hours tactical list to keep momentum.',
  },
];

export default function LandingSeverance() {
  // -------- reveal-on-scroll -----------------
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

  usePageMeta({
    title: 'Exit Armor — Severance Maximizer Kit',
    description:
      "Don't sign your severance yet. Audit the offer against 50-state benchmarks, run COBRA vs ACA, and send a research-backed counter-offer email in 48 hours. $69 one-time.",
    path: '/severance',
    jsonLd: [organizationJsonLd(), websiteJsonLd(), productJsonLd()],
  });

  return (
    <MarketingLayout>
      {/* ================================================================
          HERO
      ================================================================ */}
      <section className="mk-hero mk-hero--v2 sev-hero" style={{ paddingBottom: '5rem' }}>
        <div className="mk-hero__copy sev-hero__copy">
          <div className="mk-hero__eyebrow reveal">
            <span className="mk-hero__eyebrow-pulse" />
            The $69 Severance Maximizer Kit
          </div>
          <h1 className="reveal sev-hero__title">
            Don't sign your severance yet.
            <br />
            <span className="text-gradient">Most people leave money on the table.</span>
          </h1>
          <p className="mk-hero__lede reveal sev-hero__lede">
            HR handed you a 21 or 45-day window and hoped the shock would make you sign fast.
            Exit Armor audits the offer against 50-state benchmarks, runs the COBRA vs ACA math,
            and hands you the exact counter-offer email to send &mdash; all in under an hour.
          </p>
          <div className="mk-hero__cta-row reveal sev-hero__cta-row">
            <Link to="/checkout" className="btn btn-primary btn-glow sev-hero__cta">
              Audit My Severance Offer &mdash; $69
              <Icon name="arrow" size={16} />
            </Link>
          </div>
          <div className="mk-hero__checks reveal sev-hero__checks">
            <span className="mk-hero__check">
              <Icon name="check" size={14} /> Instant access
            </span>
            <span className="mk-hero__check">
              <Icon name="check" size={14} /> No subscription
            </span>
            <span className="mk-hero__check">
              <Icon name="check" size={14} /> 7-day refund
            </span>
          </div>
          <p className="reveal sev-hero__bonus">
            <Icon name="spark" size={14} />
            Bundled: 90-day budget planner, job-search playbook, and a free-legal-help directory.
          </p>
        </div>

        {/* Animated floating receipt — stands in for a dashboard mockup
            but specific to the severance-maximizer pitch */}
        <div className="sev-hero__mockup reveal" aria-hidden>
          <SeveranceReceipt />
        </div>
      </section>

      {/* ================================================================
          PAIN + STAT STRIP
      ================================================================ */}
      <section className="mk-section sev-stats-section">
        <div className="mk-section__head reveal" style={{ maxWidth: 820, margin: '0 auto 2.5rem', textAlign: 'center' }}>
          <div className="mk-section__eyebrow">The quiet math of the first offer</div>
          <h2>
            Severance is <span className="text-gradient">negotiable more often than people think.</span>
          </h2>
          <p>
            Most professionals sign the first draft because they're scared, overwhelmed, and assume
            the number is fixed. Industry coverage by SHRM, Littler, and the EEOC tells a different
            story: the first offer is usually a starting point, and the cost to HR of a clean,
            professional counter is almost always lower than the cost of a messy exit.
          </p>
        </div>
        <div className="sev-stats">
          <StatCounter value={50} suffix="" label="states covered" sublabel="severance, UI, and non-compete rules linked to the actual statutes" delay={0} />
          <StatCounter value={21} suffix="" label="copy-ready emails" sublabel="13 severance + 8 job-search templates, auto-filled from your profile" delay={150} />
          <StatCounter value={11} suffix="" label="negotiation asks" sublabel="from extended health to reference language — framed, scripted, benchmarked" delay={300} />
        </div>
        <p className="sev-stats__caveat">
          Not legal advice. Outcomes vary. The kit gives you the framework and the language &mdash;
          you decide what to send.
        </p>
      </section>

      {/* ================================================================
          FEATURE PILLARS (4 cards, accurate to the dashboard)
      ================================================================ */}
      <section className="mk-section sev-features-section">
        <div className="mk-section__head reveal" style={{ maxWidth: 820, margin: '0 auto 3rem', textAlign: 'center' }}>
          <div className="mk-section__eyebrow">What's inside the $69 kit</div>
          <h2>
            Four tools that turn shock into <span className="text-gradient">a plan on paper.</span>
          </h2>
        </div>
        <div className="sev-grid">
          {FEATURES.map((f, i) => (
            <div key={f.title} className={`sev-card reveal sev-card--${f.accent}`} style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="sev-card__icon">
                <Icon name={f.icon} size={22} />
              </div>
              <div className="sev-card__pill">{f.pill}</div>
              <h3 className="sev-card__title">{f.title}</h3>
              <p className="sev-card__body">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================================
          HOW IT WORKS (3 steps)
      ================================================================ */}
      <section className="mk-section sev-steps-section">
        <div className="mk-section__head reveal" style={{ maxWidth: 820, margin: '0 auto 3rem', textAlign: 'center' }}>
          <div className="mk-section__eyebrow">From draft to sent in 48 hours</div>
          <h2>
            Three steps. No <span className="text-gradient">guesswork.</span>
          </h2>
        </div>
        <div className="sev-steps">
          <StepCard
            n={1}
            icon="dollar"
            title="Pay $69 once"
            body="Stripe checkout, instant access, no subscription, no upsell emails. 7-day refund if the kit isn't for you."
          />
          <StepCard
            n={2}
            icon="chart"
            title="Run the audit"
            body="Drop your numbers into the calculator. See your offer next to the 50-state benchmark. Pick your top 3 asks from the 11-item checklist."
          />
          <StepCard
            n={3}
            icon="mail"
            title="Send the email"
            body="Copy one of the 13 severance templates. Your name, HR contact, and numbers auto-fill. Paste into your mail client. Done."
          />
        </div>
      </section>

      {/* ================================================================
          SCENARIOS (not testimonials — representative situations)
      ================================================================ */}
      <section className="mk-section sev-scenarios-section">
        <div className="mk-section__head reveal" style={{ maxWidth: 820, margin: '0 auto 3rem', textAlign: 'center' }}>
          <div className="mk-section__eyebrow">Two typical weekends inside the kit</div>
          <h2>
            What it looks like when <span className="text-gradient">the panic ends.</span>
          </h2>
          <p>
            Representative situations, not real customer quotes. Every claim is either a product
            fact (what the kit does) or a cited source (SHRM, KFF, DOL, EEOC). Outcomes vary.
          </p>
        </div>
        <div className="sev-scenarios">
          {SCENARIOS.map((s) => (
            <div key={s.who} className="sev-scenario reveal">
              <AvatarSvg variant={s.avatar} />
              <div className="sev-scenario__tag">
                <Icon name="info" size={12} /> {s.tag}
              </div>
              <div className="sev-scenario__who">{s.who}</div>
              <div className="sev-scenario__role">{s.role}</div>
              <div className="sev-scenario__used">
                {s.used.map((u) => (
                  <span key={u} className="sev-scenario__chip">
                    <Icon name="check" size={10} /> {u}
                  </span>
                ))}
              </div>
              <p className="sev-scenario__body">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================================
          FAQ (3 tight Q's — directly addresses the conversion objections)
      ================================================================ */}
      <section className="mk-section sev-faq-section">
        <div className="mk-section__head reveal" style={{ maxWidth: 820, margin: '0 auto 3rem', textAlign: 'center' }}>
          <div className="mk-section__eyebrow">Before you check out</div>
          <h2>
            The three questions <span className="text-gradient">everyone asks.</span>
          </h2>
        </div>
        <div className="mk-faq sev-faq">
          <details className="mk-faq__item reveal">
            <summary>Is this legal advice?</summary>
            <p>
              No. Exit Armor is an educational kit with benchmarks, scripts, and checklists built
              on cited industry sources (SHRM, Littler, KFF, EEOC, DOL). It does not replace a
              lawyer. The kit also includes a free-legal-help directory (NELA, ABA Free Legal
              Answers, EEOC, DOL, LSC) with a 15-minute intake script for the call.
            </p>
          </details>
          <details className="mk-faq__item reveal">
            <summary>What if I already signed?</summary>
            <p>
              Most of the kit still pays for itself: COBRA vs ACA, unemployment backfiling,
              LinkedIn positioning, the 90-day budget, and the 21 emails keep working for 30 to 90
              days after the event. Severance negotiation itself is the narrow part &mdash; but
              the rest is the wider part.
            </p>
          </details>
          <details className="mk-faq__item reveal">
            <summary>What's the refund policy?</summary>
            <p>
              Seven days, no questions asked. Email support@exitarmor.com and we refund within one
              business day. We would rather refund an unhappy customer than keep their $69.
            </p>
          </details>
        </div>
      </section>

      {/* ================================================================
          FINAL CTA
      ================================================================ */}
      <section className="mk-section sev-final">
        <div className="sev-final__card reveal">
          <div className="sev-final__eyebrow">
            <span className="mk-hero__eyebrow-pulse" /> The window is short. The kit is not.
          </div>
          <h2 className="sev-final__title">
            Stop Googling at 2 a.m.
            <br />
            <span className="text-gradient">Start auditing at 10 a.m.</span>
          </h2>
          <p className="sev-final__lede">
            $69 once. Instant access. Everything above is inside the moment you check out &mdash;
            benchmarks, templates, calculator, 90-day budget, job search, legal-help directory.
          </p>
          <Link to="/checkout" className="btn btn-primary btn-glow sev-final__cta">
            Get The Severance Maximizer Kit &mdash; $69
            <Icon name="arrow" size={18} />
          </Link>
          <p className="sev-final__foot">
            Secure Stripe checkout · 7-day refund · Not legal or financial advice
          </p>
        </div>
      </section>
    </MarketingLayout>
  );
}

// ================================================================
// STAT COUNTER — animates from 0 → target when it enters viewport
// ================================================================
function StatCounter({
  value,
  suffix,
  label,
  sublabel,
  delay = 0,
}: {
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
  delay?: number;
}) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const fired = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const node = ref.current;
    if (!('IntersectionObserver' in window)) {
      setDisplay(value);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !fired.current) {
            fired.current = true;
            const start = performance.now() + delay;
            const duration = 1200;
            const step = (now: number) => {
              const t = Math.min(1, Math.max(0, (now - start) / duration));
              // easeOutCubic for a premium feel
              const eased = 1 - Math.pow(1 - t, 3);
              setDisplay(Math.round(value * eased));
              if (t < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
            io.unobserve(node);
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [value, delay]);

  return (
    <div ref={ref} className="sev-stat reveal">
      <div className="sev-stat__number">
        {display}
        {suffix}
      </div>
      <div className="sev-stat__label">{label}</div>
      <div className="sev-stat__sublabel">{sublabel}</div>
    </div>
  );
}

// ================================================================
// STEP CARD — numbered 1/2/3 with icon + hover lift
// ================================================================
function StepCard({
  n,
  icon,
  title,
  body,
}: {
  n: number;
  icon: IconName;
  title: string;
  body: string;
}) {
  return (
    <div className="sev-step reveal">
      <div className="sev-step__num">{n}</div>
      <div className="sev-step__icon">
        <Icon name={icon} size={20} />
      </div>
      <h3 className="sev-step__title">{title}</h3>
      <p className="sev-step__body">{body}</p>
    </div>
  );
}

// ================================================================
// SVG AVATAR — two abstract portraits so scenarios feel human
// without fabricating real customer photos. Pure inline SVG,
// no copyrighted imagery.
// ================================================================
function AvatarSvg({ variant }: { variant: 'A' | 'B' | 'C' }) {
  const palette = {
    A: { from: '#f4a261', to: '#c04a3c', id: 'sevAvA' },
    B: { from: '#7fb069', to: '#2a9d8f', id: 'sevAvB' },
    C: { from: '#d4a24c', to: '#9c5f8d', id: 'sevAvC' },
  }[variant];
  return (
    <svg className="sev-avatar" viewBox="0 0 80 80" aria-hidden>
      <defs>
        <linearGradient id={palette.id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={palette.from} />
          <stop offset="100%" stopColor={palette.to} />
        </linearGradient>
      </defs>
      <circle cx="40" cy="40" r="40" fill={`url(#${palette.id})`} />
      <circle cx="40" cy="32" r="12" fill="#fff" opacity="0.95" />
      <path d="M18 72 C22 56, 58 56, 62 72 Z" fill="#fff" opacity="0.95" />
    </svg>
  );
}

// ================================================================
// RECEIPT-STYLE HERO MOCKUP — animated "offer audit" visual.
// Three rows tick in with a subtle float, CTA strip at the bottom.
// Fully CSS-driven so it respects prefers-reduced-motion.
// ================================================================
function SeveranceReceipt() {
  return (
    <div className="sev-receipt">
      <div className="sev-receipt__chrome">
        <span className="sev-receipt__dot sev-receipt__dot--r" />
        <span className="sev-receipt__dot sev-receipt__dot--y" />
        <span className="sev-receipt__dot sev-receipt__dot--g" />
        <span className="sev-receipt__url">exitarmor.co / severance-audit</span>
      </div>
      <div className="sev-receipt__body">
        <div className="sev-receipt__eyebrow">Offer audit — your 12-year tenure, CA</div>
        <div className="sev-receipt__headline">
          Benchmarked against SHRM &amp; Littler data.
        </div>

        <div className="sev-receipt__row sev-receipt__row--1">
          <div className="sev-receipt__label">Base severance</div>
          <div className="sev-receipt__bar">
            <span className="sev-receipt__bar-fill sev-receipt__bar-fill--low" />
          </div>
          <div className="sev-receipt__tag sev-receipt__tag--low">Below market</div>
        </div>

        <div className="sev-receipt__row sev-receipt__row--2">
          <div className="sev-receipt__label">Extended health (COBRA)</div>
          <div className="sev-receipt__bar">
            <span className="sev-receipt__bar-fill sev-receipt__bar-fill--mid" />
          </div>
          <div className="sev-receipt__tag sev-receipt__tag--mid">Standard</div>
        </div>

        <div className="sev-receipt__row sev-receipt__row--3">
          <div className="sev-receipt__label">Unvested equity</div>
          <div className="sev-receipt__bar">
            <span className="sev-receipt__bar-fill sev-receipt__bar-fill--high" />
          </div>
          <div className="sev-receipt__tag sev-receipt__tag--high">High leverage</div>
        </div>

        <div className="sev-receipt__ask">
          <Icon name="mail" size={13} />
          <span>Draft counter-offer email &mdash; ready to copy</span>
          <span className="sev-receipt__pulse" />
        </div>
      </div>
    </div>
  );
}
