import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { MarketingLayout } from '../MarketingLayout';
import { Icon } from '../../components/Icon';
import { usePageMeta } from '../../lib/seo';
import { SUPPORT_EMAIL } from '../../lib/config';

// ------------------------------------------------------------
// /thanks — Stripe payment success landing page
// ------------------------------------------------------------
// Stripe is configured to redirect here after a successful
// payment. We don't actually verify the payment (no backend) —
// the page is a ceremonial receipt + a big door into the kit.
// Stripe handles the *real* email receipt automatically.
// ------------------------------------------------------------

function useAccessCode(): string {
  return useMemo(() => {
    // 6-char alphanumeric, uppercase — purely ceremonial. Doesn't unlock
    // anything, but gives buyers a tangible "thing" to hold onto and
    // screenshot. Regenerates on every mount (fresh tab = fresh code).
    const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // no ambiguous chars
    let out = '';
    for (let i = 0; i < 6; i += 1) {
      out += alphabet[Math.floor(Math.random() * alphabet.length)];
    }
    return `${out.slice(0, 3)}-${out.slice(3)}`;
  }, []);
}

export default function Thanks() {
  const code = useAccessCode();
  const [copied, setCopied] = useState(false);

  usePageMeta({
    title: 'You got the kit — Exit Armor',
    description:
      'Payment successful. Your Exit Armor kit is unlocked — open the dashboard and start your 90-day plan.',
    path: '/thanks',
    noindex: true,
  });

  const handleCopy = () => {
    try {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard not available — the code is still visible on screen */
    }
  };

  return (
    <MarketingLayout>
      <style>{CSS}</style>

      <section className="ty-hero" aria-label="Payment successful">
        <div className="ty-hero__bg" aria-hidden />

        <div className="ty-hero__inner">
          <span className="ty-eyebrow">
            <span className="ty-dot" /> Payment successful
          </span>

          <h1 className="ty-headline">
            You got the <span className="ty-headline__amount">kit</span>.
          </h1>

          <p className="ty-sub">
            Welcome to Exit Armor. Your receipt is on its way — Stripe emails it
            automatically. Everything inside the kit is yours, forever. No login,
            no subscription, no nonsense.
          </p>

          <div className="ty-code">
            <div className="ty-code__label">Your order code</div>
            <div className="ty-code__value-row">
              <code className="ty-code__value">{code}</code>
              <button type="button" className="ty-code__copy" onClick={handleCopy}>
                <Icon name={copied ? 'check' : 'download'} size={14} />
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
            <div className="ty-code__note">
              Also in your email receipt. Save it if it makes you feel better — but
              you don't need it to open the kit.
            </div>
          </div>

          <div className="ty-ctas">
            <Link to="/app" className="ty-cta ty-cta--primary">
              <Icon name="briefcase" size={16} />
              Open your kit
              <Icon name="arrow" size={14} />
            </Link>
            <Link to="/action-plan" className="ty-cta ty-cta--ghost">
              <Icon name="download" size={14} />
              Download the printable plan
            </Link>
          </div>

          <div className="ty-trust">
            <span>
              <Icon name="lock" size={12} /> Saved on your device — we never see your inputs
            </span>
            <span>
              <Icon name="shield" size={12} /> 7-day money-back guarantee
            </span>
          </div>
        </div>
      </section>

      <section className="ty-next">
        <div className="ty-next__head">
          <div className="ty-next__eyebrow">In the next 48 hours</div>
          <h2>Three things to do, in order.</h2>
          <p>
            The kit has a lot inside, but the first 48 hours are the highest-leverage
            window. Start here — everything else can wait until tomorrow.
          </p>
        </div>

        <div className="ty-steps">
          <div className="ty-step">
            <div className="ty-step__num">1</div>
            <div className="ty-step__copy">
              <h3>Don't sign anything yet.</h3>
              <p>
                Severance windows are negotiable, but only before you sign. The First
                48 Hours module in your kit shows you exactly what to say if HR is
                pressuring you for a same-day answer.
              </p>
              <Link to="/app" className="ty-step__link">
                First 48 Hours <Icon name="arrow" size={12} />
              </Link>
            </div>
          </div>

          <div className="ty-step">
            <div className="ty-step__num">2</div>
            <div className="ty-step__copy">
              <h3>Run the Severance Calculator.</h3>
              <p>
                Two minutes. State-aware, cited against SHRM 2024 and Littler. It
                drafts a defensible counter-offer you can paste into an email before
                dinner.
              </p>
              <Link to="/app" className="ty-step__link">
                Severance Calculator <Icon name="arrow" size={12} />
              </Link>
            </div>
          </div>

          <div className="ty-step">
            <div className="ty-step__num">3</div>
            <div className="ty-step__copy">
              <h3>File for unemployment today.</h3>
              <p>
                Most states backdate to the day you file, not the day you were laid
                off. Every day matters. The State Resources module has direct links
                and the exact wording that works.
              </p>
              <Link to="/app" className="ty-step__link">
                State Resources <Icon name="arrow" size={12} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="ty-support">
        <div className="ty-support__inner">
          <h3>Something wrong with your order?</h3>
          <p>
            If Stripe didn't send your receipt within 10 minutes, or anything feels
            off, email{' '}
            <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> and we'll fix it
            the same day. Seven-day money-back guarantee, no questions asked.
          </p>
        </div>
      </section>
    </MarketingLayout>
  );
}

// ------------------------------------------------------------
// Scoped CSS — lives with the component so we don't pollute
// marketing.css. Palette matches the dash hero (crimson / amber
// / emerald green).
// ------------------------------------------------------------

const CSS = `
.ty-hero {
  position: relative;
  padding: 4.5rem 1.25rem 3.5rem;
  text-align: center;
  overflow: hidden;
  isolation: isolate;
}
.ty-hero__bg {
  position: absolute;
  inset: -10% -5% -5%;
  background:
    radial-gradient(circle at 20% 20%, rgba(230, 57, 70, 0.18), transparent 55%),
    radial-gradient(circle at 80% 30%, rgba(245, 158, 11, 0.18), transparent 55%),
    radial-gradient(circle at 50% 95%, rgba(16, 185, 129, 0.14), transparent 60%),
    linear-gradient(180deg, #0b0f1c 0%, #14102a 55%, #1f0b1f 100%);
  z-index: -1;
  border-radius: 28px;
  box-shadow: 0 40px 100px rgba(8, 10, 20, 0.35);
}
.ty-hero__inner {
  max-width: 720px;
  margin: 0 auto;
  color: #f8fafc;
}
.ty-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.9rem;
  border-radius: 999px;
  background: rgba(16, 185, 129, 0.15);
  border: 1px solid rgba(16, 185, 129, 0.45);
  color: #6ee7b7;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 1.4rem;
}
.ty-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.25);
  animation: tyPulse 2s ease-in-out infinite;
}
@keyframes tyPulse {
  0%, 100% { box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.25); }
  50% { box-shadow: 0 0 0 6px rgba(16, 185, 129, 0.08); }
}
.ty-headline {
  font-family: var(--font-heading);
  font-size: clamp(2.4rem, 5vw, 3.6rem);
  line-height: 1.05;
  margin: 0 0 1rem;
  color: #fff;
  letter-spacing: -0.02em;
}
.ty-headline__amount {
  background: linear-gradient(120deg, #34d399 0%, #10b981 50%, #059669 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 0 40px rgba(16, 185, 129, 0.2);
}
.ty-sub {
  font-size: 1.05rem;
  line-height: 1.6;
  color: #cbd5e1;
  max-width: 560px;
  margin: 0 auto 2rem;
}
.ty-code {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 18px;
  padding: 1.25rem 1.5rem;
  max-width: 440px;
  margin: 0 auto 2rem;
  backdrop-filter: blur(8px);
}
.ty-code__label {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #94a3b8;
  margin-bottom: 0.55rem;
}
.ty-code__value-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.6rem;
}
.ty-code__value {
  font-family: 'JetBrains Mono', 'Menlo', 'Consolas', monospace;
  font-size: 1.7rem;
  font-weight: 700;
  color: #fbbf24;
  letter-spacing: 0.18em;
  text-shadow: 0 0 30px rgba(251, 191, 36, 0.25);
}
.ty-code__copy {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.45rem 0.85rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.16);
  color: #e2e8f0;
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s ease, transform 0.15s ease;
}
.ty-code__copy:hover {
  background: rgba(255, 255, 255, 0.14);
  transform: translateY(-1px);
}
.ty-code__note {
  font-size: 0.78rem;
  color: #94a3b8;
  line-height: 1.5;
  text-align: left;
}
.ty-ctas {
  display: flex;
  justify-content: center;
  gap: 0.8rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
}
.ty-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.95rem 1.7rem;
  border-radius: 999px;
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.ty-cta--primary {
  background: linear-gradient(135deg, #ef4b5a 0%, #e63946 50%, #d62839 100%);
  color: #fff;
  box-shadow: 0 18px 45px rgba(230, 57, 70, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.08);
}
.ty-cta--primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 24px 55px rgba(230, 57, 70, 0.55), 0 0 0 1px rgba(255, 255, 255, 0.12);
}
.ty-cta--ghost {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.16);
  color: #e2e8f0;
}
.ty-cta--ghost:hover {
  background: rgba(255, 255, 255, 0.12);
  transform: translateY(-1px);
}
.ty-trust {
  display: flex;
  justify-content: center;
  gap: 1.4rem;
  flex-wrap: wrap;
  color: #94a3b8;
  font-size: 0.8rem;
}
.ty-trust span {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}

.ty-next {
  max-width: 1040px;
  margin: 4rem auto 2rem;
  padding: 0 1.25rem;
}
.ty-next__head {
  text-align: center;
  max-width: 640px;
  margin: 0 auto 2.5rem;
}
.ty-next__eyebrow {
  display: inline-block;
  padding: 0.35rem 0.85rem;
  border-radius: 999px;
  background: rgba(230, 57, 70, 0.1);
  color: #e63946;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 0.8rem;
}
.ty-next h2 {
  font-family: var(--font-heading);
  font-size: clamp(1.7rem, 3vw, 2.2rem);
  line-height: 1.15;
  margin: 0 0 0.6rem;
  color: #0f172a;
  letter-spacing: -0.01em;
}
.ty-next__head p {
  font-size: 1rem;
  line-height: 1.6;
  color: #64748b;
  margin: 0;
}
.ty-steps {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.1rem;
}
.ty-step {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 18px;
  padding: 1.4rem 1.3rem 1.3rem;
  display: flex;
  gap: 1rem;
  box-shadow: 0 2px 14px rgba(15, 23, 42, 0.04);
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}
.ty-step:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 32px rgba(15, 23, 42, 0.08);
}
.ty-step__num {
  flex: 0 0 auto;
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background: linear-gradient(135deg, #ef4b5a, #e63946);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 1rem;
  box-shadow: 0 6px 14px rgba(230, 57, 70, 0.3);
}
.ty-step__copy h3 {
  font-family: var(--font-heading);
  font-size: 1.05rem;
  margin: 0 0 0.35rem;
  color: #0f172a;
}
.ty-step__copy p {
  font-size: 0.88rem;
  line-height: 1.55;
  color: #64748b;
  margin: 0 0 0.7rem;
}
.ty-step__link {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.82rem;
  font-weight: 600;
  color: #e63946;
  text-decoration: none;
}
.ty-step__link:hover { text-decoration: underline; }

.ty-support {
  max-width: 720px;
  margin: 1rem auto 4rem;
  padding: 0 1.25rem;
}
.ty-support__inner {
  background: #fff7ed;
  border: 1px solid #fed7aa;
  border-radius: 16px;
  padding: 1.4rem 1.6rem;
  text-align: center;
}
.ty-support__inner h3 {
  font-family: var(--font-heading);
  font-size: 1.05rem;
  margin: 0 0 0.45rem;
  color: #9a3412;
}
.ty-support__inner p {
  font-size: 0.9rem;
  line-height: 1.55;
  color: #7c2d12;
  margin: 0;
}
.ty-support__inner a {
  color: #c2410c;
  font-weight: 600;
  text-decoration: underline;
}

@media (max-width: 820px) {
  .ty-steps { grid-template-columns: 1fr; }
  .ty-hero { padding: 3rem 1rem 2.5rem; }
  .ty-ctas { flex-direction: column; align-items: stretch; }
  .ty-cta { justify-content: center; }
}
`;
