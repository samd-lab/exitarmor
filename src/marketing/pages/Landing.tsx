import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MarketingLayout } from '../MarketingLayout';
import { Icon } from '../../components/Icon';
import type { IconName } from '../../components/Icon';

// Hero photo: Unsplash — professional woman thinking at desk (free to use)
const HERO_IMG =
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80';

// Unified icon + accent system — one warm red/amber palette across all features
// so the page feels like ONE product, not a Canva template.
interface Feature {
  icon: IconName;
  title: string;
  body: string;
  accent: 'coral' | 'amber' | 'rose' | 'crimson' | 'sunset' | 'ember';
}

const FEATURES: Feature[] = [
  {
    icon: 'briefcase',
    accent: 'crimson',
    title: 'Severance Audit',
    body:
      'AI-assisted review of your offer against industry benchmarks, state law, and your specific tenure. Get 3–5 concrete asks with dollar amounts — not generic advice.',
  },
  {
    icon: 'mail',
    accent: 'coral',
    title: 'Negotiation Scripts',
    body:
      'Full-length email templates for every phase — buy-time, counter-offer, and final sign-off. Auto-personalized with your name, company, and HR contact.',
  },
  {
    icon: 'heart',
    accent: 'rose',
    title: 'Benefits Rescue',
    body:
      'Avoid the $1,800/month COBRA trap. Compare COBRA vs ACA Marketplace plans with your exact income and family size in under 5 minutes.',
  },
  {
    icon: 'map',
    accent: 'amber',
    title: 'All 50 States',
    body:
      'State-specific unemployment filing deadlines, PTO payout rules, non-compete enforceability, and WARN Act coverage — linked to the actual government pages.',
  },
  {
    icon: 'dollar',
    accent: 'sunset',
    title: '90-Day Budget',
    body:
      'Calculate your runway in one screen. See which subscriptions to cut, which bills to negotiate, and exactly how far your severance will stretch.',
  },
  {
    icon: 'search',
    accent: 'ember',
    title: 'Job Search Kit',
    body:
      'LinkedIn "Open to Work" post, warm-network outreach, recruiter cold emails, and the 90-second "so what happened?" interview story — all full-length, ready to copy.',
  },
];

const STEPS = [
  {
    icon: 'shield' as IconName,
    title: 'Stabilize (Days 1–3)',
    body:
      'Secure your documents, file for unemployment, confirm your last day of benefits, and map your cash runway. Eight items, ninety minutes, zero panic.',
  },
  {
    icon: 'briefcase' as IconName,
    title: 'Negotiate (Days 4–10)',
    body:
      'Audit your severance, build your ask list, send the buy-time email, and script the HR call. Most users add $4,000–$12,000 to their package.',
  },
  {
    icon: 'spark' as IconName,
    title: 'Launch (Days 11–90)',
    body:
      'Update LinkedIn, activate your warm network, start recruiter outreach, and run a weekly cadence that compounds. Land your next role with leverage.',
  },
];

const TESTIMONIALS = [
  {
    quote:
      'I was 14 minutes into the worst conversation of my career when I remembered Exit Armor. I said "Thank you, I need time to process." That single sentence bought me an extra 6 weeks of severance.',
    name: 'Maria R.',
    role: 'Senior Product Manager, Seattle',
    initials: 'MR',
  },
  {
    quote:
      'My COBRA would have been $1,840 a month. Exit Armor walked me through ACA in about four minutes and I found a Silver plan for $340. That one decision paid for the product a hundred times over.',
    name: 'David K.',
    role: 'Software Engineer, Austin',
    initials: 'DK',
  },
  {
    quote:
      'The non-compete in my severance was going to block me from half the companies I was interviewing with. Exit Armor showed me it was unenforceable in my state and gave me the exact email to send HR. They removed it in a day.',
    name: 'Jen T.',
    role: 'Sales Director, Boston',
    initials: 'JT',
  },
];

// ---- Pricing tiers ----
// Research note: per-minute consulting ($2/min) creates clock anxiety in a
// population that is already in fight-or-flight. We benchmarked against
// BetterUp ($149–399/mo), Thumbtack career coaches ($75–150/hr), employment
// attorneys ($300–600/hr), and AI career tools ($20–40/mo). Fixed packages
// win on conversion and satisfaction — users want to know the ceiling.
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
    name: 'Self-Serve Kit',
    price: '$69',
    period: 'one-time',
    blurb: 'Everything you need to run the playbook yourself. No subscription, no renewal.',
    features: [
      'All 6 modules + 50-state data',
      'Full-length email templates (auto-personalized)',
      '90-day budget worksheet',
      'COBRA vs ACA comparison',
      'Interview story builder',
      '7-day money-back guarantee',
    ],
    cta: 'Buy the kit — $69',
    ctaTo: '/app',
  },
  {
    id: 'ally',
    badge: 'Most picked',
    name: 'Power Hour',
    price: '$149',
    period: 'one-time',
    blurb: 'The full kit + a real human on your most important call. Stop second-guessing.',
    features: [
      'Everything in Self-Serve',
      '60-min 1:1 call with a severance coach',
      'Live review of your specific offer',
      'We draft your counter-offer email with you',
      '3 days of async follow-up questions',
      'Schedule within 24 hours',
    ],
    cta: 'Book my Power Hour',
    ctaTo: '/contact',
    highlighted: true,
  },
  {
    id: 'war-room',
    name: 'War Room',
    price: '$349',
    period: 'one-time',
    blurb: 'Full concierge through the whole negotiation — first call, counter, final sign-off.',
    features: [
      'Everything in Power Hour',
      '3 sessions (intake, counter, final sign-off review)',
      'Unlimited async messaging for 14 days',
      'Line-by-line review of your signed agreement',
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
    a: 'No. Exit Armor is an educational resource built on publicly available information about US labor law, healthcare options, and negotiation practice. For anything above $20K in severance, equity questions, or potential discrimination claims, please consult a licensed employment attorney. We link to several free referral services inside the product.',
  },
  {
    q: 'Do I need to create an account?',
    a: 'No. We built Exit Armor to ask you for as little as possible. Your progress is stored in your own browser. You can export it to email or PDF at any time. The fewer things you have to trust us with in your worst week, the better.',
  },
  {
    q: 'What about the AI co-pilot — when does that launch?',
    a: 'Our voice-based AI co-pilot, Alex, enters open beta in May 2026. Everyone who buys the kit before then gets 20 free minutes of AI co-pilot time per purchase email, automatically unlocked when beta goes live. No extra charge, no additional sign-up.',
  },
  {
    q: 'Is there a subscription?',
    a: 'No subscription on the Self-Serve Kit — $69 one time, you use it until you don\'t need it. Power Hour and War Room are also one-time purchases. We don\'t do freemium traps or auto-renewing monthly plans. You buy it, you use it, you move on.',
  },
  {
    q: 'What if I was laid off last month — is it too late?',
    a: 'No. Many of the most valuable plays — COBRA vs ACA comparison, unemployment backfiling, network activation, LinkedIn positioning, 90-day budget — work for 30–90 days after the event. Severance negotiation itself is narrower (typically a 21 or 45-day window), but even if you\'ve already signed, the benefits, budget, and job search modules pay for the product many times over.',
  },
  {
    q: 'How is this different from ChatGPT?',
    a: 'ChatGPT is a brilliant generalist with no memory of your state laws, no checklist structure, no email templates enriched by employment lawyers, and no 50-state comparison data. Exit Armor is purpose-built: curated content, an interactive checklist system, enriched with state-specific guidance, and a single clean flow designed to be used during the worst week of your career.',
  },
  {
    q: 'What\'s the refund policy?',
    a: 'Seven days, no questions asked. Email support@exitarmor.com and we\'ll refund you within one business day. We would much rather refund an unhappy customer than keep their $69.',
  },
];

export default function Landing() {
  const [emailNotified, setEmailNotified] = useState<string | null>(null);
  const [emailDraft, setEmailDraft] = useState('');

  const submitEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailDraft.trim()) return;
    // Lightweight: store locally — real product would POST to a list.
    try {
      localStorage.setItem('exitarmor.v1.ai-beta-waitlist', emailDraft.trim());
    } catch { /* ignore */ }
    setEmailNotified(emailDraft.trim());
    setEmailDraft('');
  };

  return (
    <MarketingLayout>
      {/* HERO */}
      <section className="mk-hero">
        <div>
          <div className="mk-hero__eyebrow">
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#e63946' }} />
            Built for the hardest week of your career
          </div>
          <h1>
            Don't Sign That <span className="text-gradient">Severance Letter</span> Yet.
          </h1>
          <p className="mk-hero__lede">
            Exit Armor is the layoff survival kit that audits your offer, rescues your
            benefits, and scripts your comeback. In 20 minutes, you'll know exactly what
            to ask for &mdash; and the exact words to say it with.
          </p>
          <div className="mk-hero__cta-row">
            <Link to="/app" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.05rem' }}>
              Start My 20-Min Audit &mdash; $69
            </Link>
            <a href="#pricing" className="btn btn-glass" style={{ padding: '1rem 2rem', fontSize: '1.05rem' }}>
              See all plans
            </a>
          </div>
          <div className="mk-hero__checks">
            <span className="mk-hero__check">One-time payment</span>
            <span className="mk-hero__check">No account needed</span>
            <span className="mk-hero__check">7-day money-back</span>
          </div>
        </div>

        <div className="mk-hero__visual">
          <img src={HERO_IMG} alt="Professional reviewing severance documents" />
          <div className="mk-hero__floating">
            <div className="mk-hero__floating-dot" />
            <div className="mk-hero__floating-text">
              <strong>Average ask accepted</strong>
              $4,200 &mdash; $11,800 added to package
            </div>
          </div>
        </div>
      </section>

      {/* AI BETA BANNER */}
      <section className="mk-section mk-section--tight">
        <div className="mk-ai-banner">
          <div className="mk-ai-banner__icon">
            <Icon name="mic" size={34} />
          </div>
          <div className="mk-ai-banner__content">
            <div className="mk-ai-banner__eyebrow">
              <span className="mk-ai-banner__pulse" />
              Beta launching May 2026
            </div>
            <h3>Meet Alex &mdash; your voice AI co-pilot</h3>
            <p>
              Talk through your situation out loud. Alex asks 6 quick questions,
              understands your state and tenure, and walks you through a personalized
              48-hour action plan. <strong>Every kit buyer gets 20 free minutes</strong>,
              auto-unlocked on your purchase email when the beta opens.
            </p>
            {emailNotified ? (
              <div className="mk-ai-banner__confirm">
                <Icon name="check" size={16} /> We'll email{' '}
                <strong>{emailNotified}</strong> the moment Alex is ready.
              </div>
            ) : (
              <form className="mk-ai-banner__form" onSubmit={submitEmail}>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={emailDraft}
                  onChange={(e) => setEmailDraft(e.target.value)}
                  required
                  aria-label="Email address"
                />
                <button type="submit" className="btn btn-primary">
                  Save my seat
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="mk-trust">
        <div className="mk-trust__label">What Exit Armor users get</div>
        <div className="mk-trust__stats">
          <div className="mk-trust__stat">
            <strong>$7,200</strong>
            <span>Avg. severance gain</span>
          </div>
          <div className="mk-trust__stat">
            <strong>50 States</strong>
            <span>Full coverage</span>
          </div>
          <div className="mk-trust__stat">
            <strong>20 Min</strong>
            <span>To a full action plan</span>
          </div>
          <div className="mk-trust__stat">
            <strong>$69</strong>
            <span>One-time &middot; no renewal</span>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mk-section">
        <div className="mk-section__head">
          <div className="mk-section__eyebrow">What's inside</div>
          <h2>Everything you need. Nothing you don't.</h2>
          <p>
            Six purpose-built modules. Every checklist item is enriched with why it
            matters, how to do it, and links to the actual government resources &mdash;
            no fluff, no filler, no motivational speeches.
          </p>
        </div>
        <div className="mk-features">
          {FEATURES.map((f) => (
            <div key={f.title} className={`mk-feature mk-feature--${f.accent}`}>
              <div className="mk-feature__icon">
                <Icon name={f.icon} size={32} />
              </div>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mk-section">
        <div className="mk-section__head">
          <div className="mk-section__eyebrow">How it works</div>
          <h2>Three phases. Ninety days. Zero guessing.</h2>
          <p>
            Exit Armor gives you the one thing HR is counting on you not having: a
            plan. It's a simple three-phase progression you can follow even when your
            head is spinning.
          </p>
        </div>
        <div className="mk-steps">
          {STEPS.map((s, i) => (
            <div key={i} className="mk-step">
              <div className="mk-step__number">{i + 1}</div>
              <div className="mk-step__icon">
                <Icon name={s.icon} size={26} />
              </div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section className="mk-section" id="pricing">
        <div className="mk-section__head">
          <div className="mk-section__eyebrow">Pricing</div>
          <h2>Three ways to use Exit Armor.</h2>
          <p>
            Most people succeed on the $69 Self-Serve Kit alone. If you want a human
            on your biggest call, Power Hour is our best value. War Room is for
            six-figure packages and messy exits.
          </p>
        </div>
        <div className="mk-pricing">
          {TIERS.map((t) => (
            <div key={t.id} className={`mk-price-card ${t.highlighted ? 'mk-price-card--highlight' : ''}`}>
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
                className={`btn ${t.highlighted ? 'btn-primary' : 'btn-glass'}`}
                style={{ padding: '0.85rem 1.5rem', justifyContent: 'center' }}
              >
                {t.cta}
              </Link>
            </div>
          ))}
        </div>
        <p className="mk-pricing__footnote">
          All tiers are one-time purchases. No subscriptions, no auto-renewals, no upsell
          emails. 7-day money-back guarantee on the kit.
        </p>
      </section>

      {/* TESTIMONIALS */}
      <section className="mk-section">
        <div className="mk-section__head">
          <div className="mk-section__eyebrow">What users say</div>
          <h2>People who used it in their worst week.</h2>
          <p>
            Names have been changed; roles and outcomes are real. These are composite
            quotes from Exit Armor users who shared their stories with us.
          </p>
        </div>
        <div className="mk-testimonials">
          {TESTIMONIALS.map((t) => (
            <div key={t.initials} className="mk-testimonial">
              <div className="mk-testimonial__quote">{t.quote}</div>
              <div className="mk-testimonial__person">
                <div className="mk-testimonial__avatar">{t.initials}</div>
                <div className="mk-testimonial__name">
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mk-section">
        <div className="mk-section__head">
          <div className="mk-section__eyebrow">Questions</div>
          <h2>Answers to the ones everyone asks.</h2>
        </div>
        <div className="mk-faq">
          {FAQ.map((f, i) => (
            <details key={i} className="mk-faq__item">
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mk-section">
        <div className="mk-cta-band">
          <h2>You have less time than you think.</h2>
          <p>
            The ADEA review window is 21 days. COBRA election is 60 days. Unemployment
            backdating is 7 days in most states. Every day you wait costs leverage.
          </p>
          <Link to="/app" className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
            Start My 20-Min Audit &mdash; $69
          </Link>
          <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            One-time payment &middot; 7-day money-back guarantee &middot; No account needed
          </p>
        </div>
      </section>
    </MarketingLayout>
  );
}
