// ------------------------------------------------------------
// /breathe — the "calm entry" landing page
//
// Design philosophy:
//   * Above the fold is pure emotional decompression — no product,
//     no price, no feature grid. Just space, breath, and one
//     reframing truth: "you have time."
//   * Below the fold transitions into full credibility — mockups,
//     stats, feature cards, scenarios, source citations. The user
//     earned the detail by choosing to scroll.
//   * Hero = calm. Everything after = conviction.
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
import { captureReferral } from '../../lib/referral';

// ---- Scroll-reveal observer ----
function useReveal() {
  const observed = useRef(new Set<Element>());
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      document.querySelectorAll('.calm-reveal').forEach((el) => {
        (el as HTMLElement).style.opacity = '1';
        (el as HTMLElement).style.transform = 'none';
      });
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('calm-reveal--visible');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    );
    const els = document.querySelectorAll('.calm-reveal');
    els.forEach((el) => {
      observed.current.add(el);
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);
}

// ---- Animated stat counter ----
function StatCounter({ value, label, delay = 0 }: { value: number; label: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const dur = 1200;
        const tick = (now: number) => {
          const t = Math.min((now - start) / dur, 1);
          const ease = 1 - Math.pow(1 - t, 3);
          setDisplay(Math.round(ease * value));
          if (t < 1) requestAnimationFrame(tick);
        };
        setTimeout(() => requestAnimationFrame(tick), delay);
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, delay]);
  return (
    <div className="calm-stat calm-reveal" ref={ref}>
      <span className="calm-stat__num">{display}</span>
      <span className="calm-stat__label">{label}</span>
    </div>
  );
}

// ---- Breathing circle ----
function BreathCircle() {
  return (
    <div className="calm-breath" aria-hidden>
      <div className="calm-breath__ring calm-breath__ring--outer" />
      <div className="calm-breath__ring calm-breath__ring--inner" />
    </div>
  );
}

// ---- Feature card data ----
interface Feature {
  icon: IconName;
  title: string;
  body: string;
}
const FEATURES: Feature[] = [
  {
    icon: 'chart',
    title: 'Severance Calculator',
    body: 'Enter salary, tenure, state. See your offer vs. the SHRM/Littler benchmark — floor, target, and stretch numbers.',
  },
  {
    icon: 'list',
    title: '11 Negotiation Asks',
    body: 'From extended COBRA to equity acceleration to reference letters — each ask scripted, benchmarked, and ready to send.',
  },
  {
    icon: 'mail',
    title: '21 Email Templates',
    body: '13 severance + 8 job-search templates. Auto-filled from your profile. Copy, paste, send.',
  },
  {
    icon: 'heart',
    title: 'COBRA vs ACA Calculator',
    body: 'Side-by-side cost comparison. Finds the cheapest health coverage path for your age, income, and household.',
  },
  {
    icon: 'dollar',
    title: '90-Day Budget Planner',
    body: 'Three runway scenarios — current spend, discretionary cut, austerity. See exactly when the money runs out.',
  },
  {
    icon: 'map',
    title: '50-State Resource Hub',
    body: 'UI filing portals, PTO payout rules, non-compete enforceability, WARN Act thresholds — linked to actual statutes.',
  },
];

// ---- Scenario data ----
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
    body: 'Opens the kit Friday night. Runs the 50-state benchmark, drafts the soft-stall email, then the leverage ask with extended health and unvested equity as the top two items.',
  },
  {
    tag: 'People manager · East Coast',
    who: 'Director, 12 years',
    role: 'Severance window: 45 days',
    avatar: 'B',
    used: ['COBRA vs ACA', '90-day budget', 'Outplacement', 'Reference letter'],
    body: 'Uses the COBRA vs ACA calculator first — her family of four lands on an ACA Silver plan. Sends the benefits-focused counter with outplacement and reference language added.',
  },
  {
    tag: 'Already signed · Midwest',
    who: 'Product lead, 6 years',
    role: 'Signed last Friday',
    avatar: 'C',
    used: ['Unemployment', 'LinkedIn rewrite', 'Job-search emails', 'Budget'],
    body: 'The severance window closed — but the rest of the kit didn\'t. Files unemployment correctly, rewrites the LinkedIn headline, sends 8 warm-intro emails in one block.',
  },
];

// ---- SVG avatar (reused from /severance) ----
function AvatarSvg({ variant }: { variant: 'A' | 'B' | 'C' }) {
  const palette = {
    A: { from: '#f4a261', to: '#c04a3c', id: 'calmAvA' },
    B: { from: '#7fb069', to: '#2a9d8f', id: 'calmAvB' },
    C: { from: '#d4a24c', to: '#9c5f8d', id: 'calmAvC' },
  }[variant];
  return (
    <svg className="calm-scenario__avatar" width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden>
      <defs>
        <linearGradient id={palette.id} x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor={palette.from} />
          <stop offset="1" stopColor={palette.to} />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="24" fill={`url(#${palette.id})`} />
      <circle cx="24" cy="19" r="7" fill="rgba(255,255,255,0.25)" />
      <ellipse cx="24" cy="38" rx="12" ry="10" fill="rgba(255,255,255,0.2)" />
    </svg>
  );
}

// ---- Calculator mockup ----
function CalcMockup() {
  return (
    <div className="calm-mockup" aria-hidden>
      <div className="calm-mockup__chrome">
        <span className="calm-mockup__dot" style={{ background: '#ff5f57' }} />
        <span className="calm-mockup__dot" style={{ background: '#febc2e' }} />
        <span className="calm-mockup__dot" style={{ background: '#28c840' }} />
        <span className="calm-mockup__url">exitarmor.app / severance-calculator</span>
      </div>
      <div className="calm-mockup__body">
        <div className="calm-mockup__label">YOUR PERSONALIZED ESTIMATE</div>
        <div className="calm-mockup__headline">Target severance package</div>
        <div className="calm-mockup__big">
          <strong>$24,704</strong>
          <span>7 weeks base + COBRA + pro-rata bonus</span>
        </div>
        <div className="calm-mockup__bar">
          <div className="calm-mockup__bar-track">
            <div className="calm-mockup__bar-fill" style={{ width: '56%' }} />
          </div>
          <div className="calm-mockup__bar-labels">
            <span>Offer $13,846</span>
            <span>Target $24,704</span>
          </div>
        </div>
        <div className="calm-mockup__rows">
          <div className="calm-mockup__row-item"><span>Base severance</span><strong>$16,154</strong></div>
          <div className="calm-mockup__row-item"><span>Pro-rata bonus</span><strong>$6,000</strong></div>
          <div className="calm-mockup__row-item"><span>COBRA coverage</span><strong>$2,550</strong></div>
        </div>
      </div>
    </div>
  );
}

// ================================================================
// MAIN COMPONENT
// ================================================================
export default function LandingCalm() {
  usePageMeta({
    title: 'Exit Armor — Take a Breath',
    description:
      'Just got laid off? You have more time and leverage than you think. A step-by-step severance playbook — when you\'re ready.',
    path: '/breathe',
    jsonLd: [websiteJsonLd(), organizationJsonLd(), productJsonLd()],
  });

  useEffect(() => { captureReferral(); }, []);
  useReveal();

  return (
    <MarketingLayout>
      {/* ============================================
          SECTION 1 — THE BREATHING ROOM (untouched)
          Pure decompression. No product. No price.
          ============================================ */}
      <section className="calm-hero">
        <BreathCircle />
        <div className="calm-hero__content">
          <h1 className="calm-hero__headline">
            You just got laid off.
            <br />
            <span className="calm-hero__soft">Here&rsquo;s the first thing to know:</span>
          </h1>
          <p className="calm-hero__anchor">You have time.</p>
          <p className="calm-hero__sub">
            Your severance agreement comes with a legal review window &mdash;
            21&nbsp;days minimum, 45&nbsp;if you&rsquo;re&nbsp;40&nbsp;or&nbsp;older.
            <br />
            Nothing needs to happen tonight.
          </p>
          <div className="calm-hero__scroll" aria-hidden>
            <span>When you&rsquo;re ready</span>
            <svg width="16" height="24" viewBox="0 0 16 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 4v16M2 14l6 6 6-6" />
            </svg>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 2 — THE REFRAME + STATS
          Three truths, then hard numbers to back them.
          ============================================ */}
      <section className="calm-reframe">
        <div className="calm-reframe__inner">
          <div className="calm-reveal calm-reframe__item">
            <p className="calm-reframe__statement">
              The first offer is almost never the final offer.
            </p>
            <cite className="calm-reframe__cite">SHRM 2024 Employer Survey</cite>
          </div>
          <div className="calm-reveal calm-reframe__item" style={{ transitionDelay: '0.15s' }}>
            <p className="calm-reframe__statement">
              Most people don&rsquo;t negotiate because they don&rsquo;t know what&rsquo;s negotiable.
            </p>
            <cite className="calm-reframe__cite">Littler Employer Report</cite>
          </div>
          <div className="calm-reveal calm-reframe__item" style={{ transitionDelay: '0.3s' }}>
            <p className="calm-reframe__statement">
              Beyond base pay, there are 11 items commonly left on the table &mdash;
              COBRA, equity acceleration, outplacement, non-compete scope, and more.
            </p>
            <cite className="calm-reframe__cite">SHRM · BLS · KFF benchmark data</cite>
          </div>
        </div>

        {/* Stat counters — visual weight */}
        <div className="calm-stats">
          <StatCounter value={50} label="states covered" delay={0} />
          <StatCounter value={21} label="email templates" delay={150} />
          <StatCounter value={11} label="negotiation asks" delay={300} />
        </div>
      </section>

      {/* ============================================
          SECTION 3 — THE PATH + CALCULATOR MOCKUP
          Three steps on the left, mockup on the right.
          ============================================ */}
      <section className="calm-path">
        <div className="calm-path__inner">
          <div className="calm-path__content">
            <h2 className="calm-reveal calm-path__heading">
              Three steps. At your own pace.
            </h2>

            <div className="calm-reveal calm-path__step">
              <span className="calm-path__num">1</span>
              <div>
                <h3 className="calm-path__step-title">Know your number</h3>
                <p className="calm-path__step-body">
                  Enter your salary, tenure, and state. See what people in your
                  situation typically receive &mdash; benchmarked against published
                  SHRM, Littler, and Paycor data.
                </p>
              </div>
            </div>

            <div className="calm-reveal calm-path__step" style={{ transitionDelay: '0.12s' }}>
              <span className="calm-path__num">2</span>
              <div>
                <h3 className="calm-path__step-title">Build your ask</h3>
                <p className="calm-path__step-body">
                  Pick from 11&nbsp;negotiable items most people don&rsquo;t know
                  exist. Draft the counter-email using templates that cite the
                  benchmark they&rsquo;re based on.
                </p>
              </div>
            </div>

            <div className="calm-reveal calm-path__step" style={{ transitionDelay: '0.24s' }}>
              <span className="calm-path__num">3</span>
              <div>
                <h3 className="calm-path__step-title">Send it &mdash; or talk to someone first</h3>
                <p className="calm-path__step-body">
                  Use the email as-is, or bring it to a free 15-minute attorney
                  consult from the built-in legal directory.
                </p>
              </div>
            </div>
          </div>

          {/* Calculator mockup — visual proof */}
          <div className="calm-reveal calm-path__mockup">
            <CalcMockup />
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 4 — FEATURE GRID (6 cards)
          What's actually inside the kit.
          ============================================ */}
      <section className="calm-features">
        <div className="calm-features__inner">
          <div className="mk-section__head calm-reveal" style={{ maxWidth: 720, margin: '0 auto 2.5rem', textAlign: 'center' }}>
            <p className="calm-features__eyebrow">What&rsquo;s inside the $69 kit</p>
            <h2 className="calm-features__heading">
              Six tools. One playbook. No guesswork.
            </h2>
          </div>
          <div className="calm-feature-grid">
            {FEATURES.map((f, i) => (
              <div key={f.title} className="calm-feature-card calm-reveal" style={{ transitionDelay: `${i * 70}ms` }}>
                <div className="calm-feature-card__icon">
                  <Icon name={f.icon} size={22} />
                </div>
                <h3 className="calm-feature-card__title">{f.title}</h3>
                <p className="calm-feature-card__body">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 5 — SCENARIOS
          Representative situations showing the kit in use.
          ============================================ */}
      <section className="calm-scenarios">
        <div className="calm-scenarios__inner">
          <div className="mk-section__head calm-reveal" style={{ maxWidth: 720, margin: '0 auto 2.5rem', textAlign: 'center' }}>
            <p className="calm-features__eyebrow">Three typical weekends inside the kit</p>
            <h2 className="calm-features__heading">
              What it looks like when the panic ends.
            </h2>
            <p className="calm-scenarios__note">
              Representative situations, not customer quotes. Every claim is a product
              fact or a cited source. Outcomes vary.
            </p>
          </div>
          <div className="calm-scenario-grid">
            {SCENARIOS.map((s) => (
              <div key={s.who} className="calm-scenario calm-reveal">
                <AvatarSvg variant={s.avatar} />
                <div className="calm-scenario__tag">
                  <Icon name="info" size={12} /> {s.tag}
                </div>
                <div className="calm-scenario__who">{s.who}</div>
                <div className="calm-scenario__role">{s.role}</div>
                <div className="calm-scenario__chips">
                  {s.used.map((u) => (
                    <span key={u} className="calm-scenario__chip">
                      <Icon name="check" size={10} /> {u}
                    </span>
                  ))}
                </div>
                <p className="calm-scenario__body">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 6 — PRODUCT + PRICE + CTA
          ============================================ */}
      <section className="calm-product">
        <div className="calm-product__inner">
          <p className="calm-product__eyebrow">Everything above</p>
          <h2 className="calm-product__price">
            $69 <span className="calm-product__once">one time</span>
          </h2>
          <p className="calm-product__detail">
            No subscription. No account. No upsell emails.
            <br />
            Instant access to your personalized playbook.
          </p>

          <div className="calm-product__highlights">
            <div className="calm-product__hl">
              <Icon name="shield" size={18} />
              <span>7-day money-back guarantee</span>
            </div>
            <div className="calm-product__hl">
              <Icon name="lock" size={18} />
              <span>Saved on your device &mdash; we never see your data</span>
            </div>
            <div className="calm-product__hl">
              <Icon name="scale" size={18} />
              <span>Free legal-help directory with intake script</span>
            </div>
          </div>

          <Link to="/checkout" className="btn btn-primary btn-glow calm-product__cta">
            Get Your Playbook &mdash; $69
            <Icon name="arrow" size={16} />
          </Link>

          <p className="calm-product__fine">
            Secure Stripe checkout · Instant access · Not legal or financial advice
          </p>
        </div>
      </section>

      {/* ============================================
          SECTION 7 — SOURCE STRIP
          Credibility through transparency.
          ============================================ */}
      <section className="calm-sources">
        <div className="calm-sources__inner calm-reveal">
          <p className="calm-sources__label">Every number in the kit is cited from</p>
          <div className="calm-sources__list">
            <span>SHRM</span>
            <span>Bureau of Labor Statistics</span>
            <span>Littler Mendelson</span>
            <span>Kaiser Family Foundation</span>
            <span>Paycor</span>
            <span>EEOC</span>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 8 — FAQ
          ============================================ */}
      <section className="calm-faq">
        <div className="calm-faq__inner">
          <h2 className="calm-reveal calm-faq__heading">Common questions</h2>
          <div className="calm-reveal calm-faq__item">
            <h3 className="calm-faq__q">Is this legal advice?</h3>
            <p className="calm-faq__a">
              No. Exit Armor is educational guidance built on publicly available
              data from SHRM, BLS, Littler, and KFF. For offers above $20K or
              complex situations, the kit includes a directory of employment
              attorneys who offer free 15-minute consults.
            </p>
          </div>
          <div className="calm-reveal calm-faq__item" style={{ transitionDelay: '0.1s' }}>
            <h3 className="calm-faq__q">I already signed. Can this still help?</h3>
            <p className="calm-faq__a">
              Yes. The kit includes a 90-day budget planner, COBRA vs ACA
              calculator, job-search templates, and a 7-day emotional recovery
              companion. Severance is just one module.
            </p>
          </div>
          <div className="calm-reveal calm-faq__item" style={{ transitionDelay: '0.2s' }}>
            <h3 className="calm-faq__q">What if I just need five minutes of help right now?</h3>
            <p className="calm-faq__a">
              Start with our free blog: the{' '}
              <Link to="/blog/first-24-hours-after-layoff">First 24&nbsp;Hours guide</Link>{' '}
              covers every critical step from the moment you&rsquo;re walked out.
              The kit picks up where the blog leaves off.
            </p>
          </div>
          <div className="calm-reveal calm-faq__item" style={{ transitionDelay: '0.3s' }}>
            <h3 className="calm-faq__q">What&rsquo;s the refund policy?</h3>
            <p className="calm-faq__a">
              Seven days, no questions asked. Email support@exitarmor.com and we
              refund within one business day.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================
          FINAL CTA + CLOSING LINE
          ============================================ */}
      <section className="calm-final">
        <div className="calm-final__inner calm-reveal">
          <h2 className="calm-final__title">
            Stop Googling at 2&nbsp;a.m.
            <br />
            <span className="text-gradient">Start planning at your own pace.</span>
          </h2>
          <p className="calm-final__sub">
            $69 once. Instant access. Everything above is inside the moment you check out.
          </p>
          <Link to="/checkout" className="btn btn-primary btn-glow calm-product__cta">
            Get The Playbook &mdash; $69
            <Icon name="arrow" size={16} />
          </Link>
          <p className="calm-product__fine">
            Secure Stripe checkout · 7-day refund · Not legal or financial advice
          </p>
        </div>
      </section>

      <section className="calm-close">
        <p className="calm-reveal calm-close__line">
          Built by someone who&rsquo;s been through it.
          <br />
          No investor money. No gimmick testimonials. No&nbsp;AI&#8209;generated&nbsp;advice.
        </p>
      </section>
    </MarketingLayout>
  );
}
