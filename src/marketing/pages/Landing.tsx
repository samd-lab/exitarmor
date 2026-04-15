import { Link } from 'react-router-dom';
import { MarketingLayout } from '../MarketingLayout';

// Hero photo: Unsplash — professional woman thinking at desk (free to use)
const HERO_IMG =
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80';

const FEATURES = [
  {
    icon: 'S',
    color: '#f97316',
    title: 'Severance Audit',
    body:
      'AI-powered review of your severance offer against industry benchmarks, state law, and your specific tenure. Get 3–5 specific asks with dollar amounts.',
  },
  {
    icon: 'N',
    color: '#8b5cf6',
    title: 'Negotiation Scripts',
    body:
      'Copy-paste email templates and live voice-coached HR scripts. Practice the call until your voice stops shaking.',
  },
  {
    icon: 'B',
    color: '#10b981',
    title: 'Benefits Rescue',
    body:
      'Avoid the COBRA trap. Compare COBRA vs ACA Marketplace plans with your exact income and family size in under 5 minutes.',
  },
  {
    icon: '50',
    color: '#3b82f6',
    title: 'All 50 States',
    body:
      'State-specific unemployment filing deadlines, PTO payout rules, non-compete enforcement, and WARN Act coverage — down to the link.',
  },
  {
    icon: '$',
    color: '#f59e0b',
    title: '90-Day Budget',
    body:
      'Calculate your runway in one screen. See which subscriptions to cut, which bills to call about, and exactly how far your severance will stretch.',
  },
  {
    icon: 'J',
    color: '#ec4899',
    title: 'Job Search Kit',
    body:
      'LinkedIn "Open to Work" scripts, warm network outreach templates, recruiter cold emails, and a weekly cadence that actually lands interviews.',
  },
];

const STEPS = [
  {
    title: 'Stabilize (Days 1–3)',
    body:
      'Secure your documents, file for unemployment, confirm your last day of benefits, and map your cash runway. Eight items, ninety minutes, zero panic.',
  },
  {
    title: 'Negotiate (Days 4–10)',
    body:
      'Audit your severance, build your ask list, send the buy-time email, and script the HR call. Most users add $4,000–$12,000 to their package.',
  },
  {
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
    q: 'Is this a subscription?',
    a: 'No — Exit Armor is a one-time $69 purchase. No renewals, no freemium trap, no upsell emails. You buy it once, you use it until you don\'t need it, and then you forget about us.',
  },
  {
    q: 'What if I was laid off last month — is it too late?',
    a: 'No. Many of the most valuable plays in Exit Armor — COBRA vs ACA comparison, unemployment backfiling, network activation, LinkedIn positioning, 90-day budget — work for 30–90 days after the event. Severance negotiation itself is narrower (typically a 21 or 45-day window), but even if you\'ve already signed, the benefits, budget, and job search modules pay for the product many times over.',
  },
  {
    q: 'How is this different from ChatGPT?',
    a: 'ChatGPT is a brilliant generalist with no memory of your state laws, no checklist structure, no email templates designed by employment lawyers, and no 50-state comparison data. Exit Armor is a purpose-built product: curated content, an interactive checklist system, enriched with state-specific guidance, and a single clean flow designed to be used during the worst week of your career.',
  },
  {
    q: 'What\'s the refund policy?',
    a: 'Seven days, no questions asked. Email support@exitarmor.com and we\'ll refund you within one business day. We would much rather refund an unhappy customer than keep their $69.',
  },
];

export default function Landing() {
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
            Exit Armor is the AI-powered layoff survival kit that audits your offer,
            rescues your benefits, and scripts your comeback. In 20 minutes, you'll
            know exactly what to ask for and how to say it.
          </p>
          <div className="mk-hero__cta-row">
            <Link to="/app" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.05rem' }}>
              Start My 20-Min Audit &mdash; $69
            </Link>
            <Link to="/blog" className="btn btn-glass" style={{ padding: '1rem 2rem', fontSize: '1.05rem' }}>
              Read the Playbook
            </Link>
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
              $4,200 — $11,800 added to package
            </div>
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
            <div key={f.title} className="mk-feature">
              <div
                className="mk-feature__icon"
                style={{ background: `linear-gradient(135deg, ${f.color}, ${f.color}cc)` }}
              >
                {f.icon}
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
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
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
