// ============================================================
// Checkout — the pre-Stripe trust page.
//
// Purpose: a single-screen, calm, high-signal interstitial that
// sits between the marketing CTAs and Stripe. Users arrive here
// from "Get Started", read 30 seconds of clarity, and hand off
// to Stripe with zero doubt about what they're buying.
//
// Design language: matches the new calm palette (sage + warm
// off-white + terracotta CTA + forest guarantee). Deliberately
// restrained — no animations, no decorative nonsense, no
// competing CTAs. One button does one thing.
// ============================================================

import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { BrandMark } from '../../components/BrandMark';
import { SUPPORT_EMAIL } from '../../lib/config';
import { usePageMeta } from '../../lib/seo';
import { captureReferral, getCheckoutUrlWithRef } from '../../lib/referral';
import { usePricing } from '../../lib/usePricing';

// Tell TS about the global gtag loaded in index.html
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// ------------------------------------------------------------
// Content — all copy in one block so you can edit without
// hunting through JSX. Every bullet is a product fact, not a
// benefit claim, so the legal surface stays small.
// ------------------------------------------------------------
const INCLUDES = [
  {
    icon: '48',
    title: 'First 48-Hour Kit',
    detail: '8 hour-by-hour steps, tuned to the first two days.',
  },
  {
    icon: 'recovery',
    title: '7-Day Recovery Companion',
    detail: 'One small task per day. Gentle, not pushy.',
  },
  {
    icon: 'severance',
    title: 'Severance Prep Scripts',
    detail: '11 cited asks, HR roleplay, rebuttal templates.',
  },
  {
    icon: 'cobra',
    title: 'COBRA vs ACA Matrix',
    detail: 'Side-by-side decision, cited against KFF 2024.',
  },
  {
    icon: 'state',
    title: '50-State Rulebook',
    detail: 'Unemployment windows, WARN, non-compete, tax.',
  },
  {
    icon: 'budget',
    title: '90-Day Defense Budget',
    detail: 'Runway math, creditor scripts, emergency fund.',
  },
];

function buildFaq(priceLabel: string) {
  return [
    {
      q: 'What exactly do I get after I pay?',
      a: 'Instant access to all six tools above, a $0-to-launch checklist, plain-English explainers, and every template you see on the homepage. No login, no waiting list, no extra cost — the receipt from Stripe contains your access link.',
    },
    {
      q: 'Is this legal or financial advice?',
      a: 'No. Exit Armor is an educational resource. Everything is cited to public sources (SHRM, KFF, Littler, state DOLs), but decisions that affect your rights should be reviewed by a licensed professional in your state.',
    },
    {
      q: 'What if I change my mind?',
      a: `Seven-day money-back guarantee, no questions asked. Email ${SUPPORT_EMAIL} from the inbox on your Stripe receipt and we refund the full ${priceLabel}.`,
    },
    {
      q: 'Do I need an account?',
      a: 'No account, no password. Everything saves to your own browser. Stripe emails you a receipt; that receipt is your access.',
    },
  ];
}

// ------------------------------------------------------------
// Tiny inline icon set — kept here so this page has zero
// external asset deps. All strokes use currentColor so the
// calm palette inherits cleanly.
// ------------------------------------------------------------
function Icon({ name }: { name: string }) {
  const common = {
    width: 20,
    height: 20,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  switch (name) {
    case '48':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      );
    case 'recovery':
      return (
        <svg {...common}>
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      );
    case 'severance':
      return (
        <svg {...common}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="9" y1="14" x2="15" y2="14" />
        </svg>
      );
    case 'cobra':
      return (
        <svg {...common}>
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          <line x1="2" y1="12" x2="22" y2="12" />
        </svg>
      );
    case 'state':
      return (
        <svg {...common}>
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      );
    case 'budget':
      return (
        <svg {...common}>
          <line x1="12" y1="1" x2="12" y2="23" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      );
    case 'lock':
      return (
        <svg {...common}>
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      );
    case 'shield':
      return (
        <svg {...common}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <polyline points="9 12 11 14 15 10" />
        </svg>
      );
    case 'arrow':
      return (
        <svg {...common}>
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      );
    case 'chevron':
      return (
        <svg {...common}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      );
    default:
      return null;
  }
}

// ------------------------------------------------------------
// FAQ accordion — one open at a time, keyboard-accessible.
// ------------------------------------------------------------
function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <div className="co-faq">
      {items.map((item, i) => {
        const open = openIdx === i;
        return (
          <div key={i} className={`co-faq__item ${open ? 'is-open' : ''}`}>
            <button
              type="button"
              className="co-faq__q"
              aria-expanded={open}
              onClick={() => setOpenIdx(open ? null : i)}
            >
              <span>{item.q}</span>
              <span className="co-faq__chev" aria-hidden>
                <Icon name="chevron" />
              </span>
            </button>
            {open && <div className="co-faq__a">{item.a}</div>}
          </div>
        );
      })}
    </div>
  );
}

// ============================================================
// Page
// ============================================================
export default function Checkout() {
  const pricing = usePricing();

  usePageMeta({
    title: `Checkout — Exit Armor · ${pricing.label} one-time`,
    description:
      "You're 60 seconds from your 90-day layoff playbook. Secure checkout via Stripe, 7-day money-back, instant receipt.",
    path: '/checkout',
    noindex: true,
  });

  // Capture ref SYNCHRONOUSLY before building the Stripe URL — if an
  // affiliate shares /checkout?ref=CODE directly, the ref must be in
  // localStorage before the useMemo below reads it. This is safe to
  // call during render (pure localStorage read/write, no side effects).
  captureReferral();

  // Build the Stripe Payment Link with the affiliate's ref code
  // appended as client_reference_id. If no ref, returns base URL.
  const checkoutHref = useMemo(
    () => getCheckoutUrlWithRef(pricing.stripeLink),
    [pricing.stripeLink],
  );

  const faq = useMemo(() => buildFaq(pricing.label), [pricing.label]);

  // Google Ads / GA4 event — fires once when the checkout page mounts.
  // "cart_page_view" = add-to-cart analog for a single-product site.
  // If you later get a full Google Ads conversion snippet with a
  // send_to like 'AW-11033587773/XXX', add it to the params object.
  useEffect(() => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'cart_page_view', {
        price_cohort: pricing.id,
        value: pricing.price,
        currency: 'USD',
      });
    }
  }, [pricing.id, pricing.price]);

  return (
    <>
      <div className="co-root">
        {/* ---- Slim nav so the page doesn't feel orphaned ---- */}
        <header className="co-nav">
          <Link to="/" className="co-nav__back" aria-label="Back to home">
            <span aria-hidden>&larr;</span>
            Back
          </Link>
          <Link to="/" className="co-nav__brand" aria-label="Exit Armor home">
            <BrandMark id="co-nav" size={28} />
            EXIT ARMOR
          </Link>
          <div className="co-nav__spacer" aria-hidden />
        </header>

        <main className="co-main">
          {/* ---- Short, calm headline ---- */}
          <div className="co-intro">
            <div className="co-eyebrow">You're 60 seconds away</div>
            <h1 className="co-headline">
              One decision away from a plan,
              <br />
              instead of a blank browser tab.
            </h1>
            <p className="co-lede">
              Educational kit. One-time {pricing.label}. Seven-day money-back. No account,
              no subscription, no waiting list.
            </p>
          </div>

          {/* ---- Order card (the only thing that matters) ---- */}
          <section className="co-card" aria-label="Order summary">
            <div className="co-card__header">
              <div className="co-card__product">
                <div className="co-card__eyebrow">Exit Armor</div>
                <div className="co-card__title">The 90-Day Playbook</div>
              </div>
              <div className="co-card__price">
                <div className="co-card__price-amt">{pricing.label}</div>
                <div className="co-card__price-sub">one-time</div>
              </div>
            </div>

            <div className="co-card__rule" />

            <ul className="co-includes">
              {INCLUDES.map((it) => (
                <li key={it.title} className="co-includes__item">
                  <span className="co-includes__icon">
                    <Icon name={it.icon} />
                  </span>
                  <span className="co-includes__text">
                    <strong>{it.title}</strong>
                    <em>{it.detail}</em>
                  </span>
                </li>
              ))}
            </ul>

            <div className="co-card__rule" />

            <a
              href={checkoutHref}
              className="co-cta"
              // No onClick analytics yet — GA4 will capture the
              // outbound link automatically via gtag enhanced measurement.
            >
              Continue to secure checkout
              <Icon name="arrow" />
            </a>

            <div className="co-trust">
              <span className="co-trust__item">
                <Icon name="lock" />
                Secure by Stripe
              </span>
              <span className="co-trust__dot" aria-hidden>
                &middot;
              </span>
              <span className="co-trust__item">
                <Icon name="shield" />
                7-day money-back
              </span>
              <span className="co-trust__dot" aria-hidden>
                &middot;
              </span>
              <span className="co-trust__item">Receipt emailed instantly</span>
            </div>
          </section>

          {/* ---- Tiny FAQ — collapsed by default except #1 ---- */}
          <section className="co-faq-wrap" aria-label="Frequently asked">
            <h2 className="co-faq-title">Quick answers</h2>
            <Faq items={faq} />
          </section>

          <p className="co-fine">
            Exit Armor is an educational resource built on cited public sources
            (SHRM, KFF, Littler, state labor departments). It is not legal,
            financial, or medical advice. Always consult a licensed professional
            for decisions that affect your rights.
          </p>
        </main>
      </div>

      <style>{CSS}</style>
    </>
  );
}

// ============================================================
// Styles — all scoped under .co-root so nothing leaks.
// ============================================================
const CSS = `
.co-root {
  min-height: 100vh;
  background:
    radial-gradient(circle at 15% -10%, rgba(91, 122, 110, 0.18), transparent 55%),
    radial-gradient(circle at 110% 20%, rgba(192, 74, 60, 0.12), transparent 50%),
    linear-gradient(180deg, #0f1619 0%, #0a1013 100%);
  color: #f1ede3;
  display: flex;
  flex-direction: column;
  font-family: var(--font-body);
}

/* ---- Nav ---- */
.co-nav {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 1.2rem 1.5rem;
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
}
.co-nav__back {
  justify-self: start;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: #a8b0b6;
  text-decoration: none;
  font-size: 0.88rem;
  font-weight: 500;
  padding: 0.4rem 0.6rem;
  border-radius: 8px;
  transition: color 0.15s ease, background 0.15s ease;
}
.co-nav__back:hover {
  color: #f1ede3;
  background: rgba(255, 255, 255, 0.04);
}
.co-nav__brand {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  color: #f1ede3;
  text-decoration: none;
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 0.95rem;
  letter-spacing: 0.06em;
}
.co-nav__spacer { justify-self: end; }

/* ---- Main ---- */
.co-main {
  flex: 1;
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
  padding: 2rem 1.5rem 4rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
}

/* ---- Intro ---- */
.co-intro { text-align: center; }
.co-eyebrow {
  display: inline-block;
  padding: 0.4rem 0.9rem;
  background: rgba(91, 122, 110, 0.22);
  border: 1px solid rgba(168, 201, 186, 0.36);
  color: #c6e1d4;
  border-radius: 999px;
  font-family: var(--font-heading);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 1.1rem;
}
.co-headline {
  font-family: var(--font-heading);
  font-size: clamp(1.7rem, 4vw, 2.3rem);
  line-height: 1.18;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin: 0 0 1rem;
  color: #fbf9f2;
}
.co-lede {
  font-size: 0.95rem;
  line-height: 1.65;
  color: #c2c9cc;
  max-width: 520px;
  margin: 0 auto;
}

/* ---- Order card ---- */
.co-card {
  background:
    linear-gradient(180deg, rgba(253, 252, 247, 0.98), rgba(246, 241, 231, 0.95));
  color: #1b2328;
  border: 1px solid rgba(91, 122, 110, 0.28);
  border-radius: 22px;
  padding: 2rem 1.8rem 1.9rem;
  box-shadow:
    0 40px 80px -30px rgba(0, 0, 0, 0.55),
    0 0 0 1px rgba(255, 255, 255, 0.04) inset;
  position: relative;
}
.co-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 22px;
  background: linear-gradient(
    135deg,
    rgba(91, 122, 110, 0.08),
    transparent 35%
  );
  pointer-events: none;
}

.co-card__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.1rem;
  position: relative;
}
.co-card__eyebrow {
  font-family: var(--font-heading);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #5b7a6e;
  margin-bottom: 0.25rem;
}
.co-card__title {
  font-family: var(--font-heading);
  font-size: 1.35rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: #1b2328;
  line-height: 1.15;
}
.co-card__price { text-align: right; flex-shrink: 0; }
.co-card__price-amt {
  font-family: var(--font-heading);
  font-size: 2rem;
  font-weight: 800;
  color: #2d3b44;
  line-height: 1;
  letter-spacing: -0.02em;
}
.co-card__price-sub {
  font-size: 0.72rem;
  font-weight: 600;
  color: #6b7680;
  margin-top: 0.2rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.co-card__rule {
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(45, 59, 68, 0.18),
    transparent
  );
  margin: 1.1rem 0;
  position: relative;
}

/* ---- Includes list ---- */
.co-includes {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.85rem 1.1rem;
  position: relative;
}
.co-includes__item {
  display: flex;
  align-items: flex-start;
  gap: 0.65rem;
  min-width: 0;
}
.co-includes__icon {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border-radius: 9px;
  background: linear-gradient(135deg, #5b7a6e, #3f5a50);
  color: #fdfcf7;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px -4px rgba(63, 90, 80, 0.55);
}
.co-includes__text {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  min-width: 0;
}
.co-includes__text strong {
  font-family: var(--font-heading);
  font-size: 0.82rem;
  font-weight: 700;
  color: #1b2328;
  letter-spacing: -0.005em;
  line-height: 1.2;
}
.co-includes__text em {
  font-style: normal;
  font-size: 0.73rem;
  color: #5b6670;
  line-height: 1.35;
}

/* ---- CTA button ---- */
.co-cta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  width: 100%;
  padding: 1.05rem 1.5rem;
  border-radius: 14px;
  background: linear-gradient(135deg, #c04a3c 0%, #a93d30 100%);
  color: #fff;
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 1.02rem;
  letter-spacing: 0.01em;
  text-decoration: none;
  border: none;
  cursor: pointer;
  box-shadow:
    0 8px 24px -6px rgba(192, 74, 60, 0.55),
    0 0 0 1px rgba(255, 255, 255, 0.12) inset;
  transition: transform 0.15s ease, box-shadow 0.2s ease, background 0.2s ease;
  position: relative;
}
.co-cta:hover {
  transform: translateY(-1px);
  background: linear-gradient(135deg, #d97757 0%, #c04a3c 100%);
  box-shadow:
    0 14px 32px -6px rgba(192, 74, 60, 0.68),
    0 0 0 1px rgba(255, 255, 255, 0.18) inset;
}
.co-cta:active { transform: translateY(0); }

/* ---- Trust strip under CTA ---- */
.co-trust {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  margin-top: 1rem;
  flex-wrap: wrap;
  font-size: 0.74rem;
  color: #5b6670;
  position: relative;
}
.co-trust__item {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-weight: 500;
}
.co-trust__item svg {
  width: 14px;
  height: 14px;
  color: #2d6a4f;
}
.co-trust__dot { color: #c2c9cc; }

/* ---- FAQ ---- */
.co-faq-wrap {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}
.co-faq-title {
  font-family: var(--font-heading);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #8a9197;
  margin: 0 0 0.2rem;
  text-align: center;
}

.co-faq { display: flex; flex-direction: column; gap: 0.5rem; }

.co-faq__item {
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 12px;
  overflow: hidden;
  transition: border-color 0.15s ease, background 0.15s ease;
}
.co-faq__item.is-open {
  border-color: rgba(91, 122, 110, 0.35);
  background: rgba(91, 122, 110, 0.06);
}
.co-faq__q {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  background: none;
  border: none;
  padding: 0.95rem 1.1rem;
  color: #f1ede3;
  font-family: var(--font-heading);
  font-size: 0.92rem;
  font-weight: 600;
  text-align: left;
  cursor: pointer;
  letter-spacing: -0.005em;
}
.co-faq__chev {
  color: #8a9197;
  display: inline-flex;
  transition: transform 0.2s ease;
  flex-shrink: 0;
}
.co-faq__item.is-open .co-faq__chev {
  transform: rotate(180deg);
  color: #86d0b0;
}
.co-faq__a {
  padding: 0 1.1rem 1rem;
  color: #c2c9cc;
  font-size: 0.85rem;
  line-height: 1.6;
}

/* ---- Fine print ---- */
.co-fine {
  text-align: center;
  font-size: 0.72rem;
  color: #6b7680;
  line-height: 1.6;
  max-width: 560px;
  margin: 0 auto;
  opacity: 0.8;
}

/* ---- Mobile ---- */
@media (max-width: 640px) {
  .co-main { padding: 1.4rem 1rem 3rem; gap: 1.8rem; }
  .co-card { padding: 1.5rem 1.3rem 1.5rem; border-radius: 18px; }
  .co-card__header { flex-direction: column; align-items: flex-start; gap: 0.4rem; }
  .co-card__price { text-align: left; display: flex; align-items: baseline; gap: 0.5rem; }
  .co-card__price-amt { font-size: 1.7rem; }
  .co-card__price-sub { margin-top: 0; }
  .co-includes { grid-template-columns: 1fr; gap: 0.75rem; }
  .co-cta { font-size: 0.95rem; padding: 0.95rem 1.2rem; }
  .co-trust { flex-direction: column; gap: 0.3rem; }
  .co-trust__dot { display: none; }
  .co-headline { font-size: 1.55rem; }
  .co-nav { padding: 1rem 1rem; }
}
`;
