// ------------------------------------------------------------
// /breathe — the "calm entry" landing page
//
// Design philosophy:
//   * Above the fold is pure emotional decompression — no product,
//     no price, no feature grid. Just space, breath, and one
//     reframing truth: "you have time."
//   * The scroll is the user choosing to move forward. Each section
//     adds one idea at a time, never a wall of information.
//   * The product reveal comes late, after the user's mental model
//     has shifted from "I'm being discarded" to "this is a
//     negotiation and I have leverage."
//   * Total length: ~5 viewport heights. Deliberately minimal.
//   * Only one color accent on the page: the CTA button at the end.
//     Everything else is text on dark backgrounds.
// ------------------------------------------------------------
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MarketingLayout } from '../MarketingLayout';
import {
  organizationJsonLd,
  productJsonLd,
  usePageMeta,
  websiteJsonLd,
} from '../../lib/seo';
import { captureReferral } from '../../lib/referral';

// ---- Scroll-reveal observer (reused from other landings) ----
function useReveal() {
  const observed = useRef(new Set<Element>());
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      // Show everything immediately for reduced-motion users
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

// ---- Slow pulse animation for the breathing circle ----
function BreathCircle() {
  return (
    <div className="calm-breath" aria-hidden>
      <div className="calm-breath__ring calm-breath__ring--outer" />
      <div className="calm-breath__ring calm-breath__ring--inner" />
    </div>
  );
}

// ---- Main component ----
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
          SECTION 1 — THE BREATHING ROOM
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
          SECTION 2 — THE REFRAME
          Three truths that shift their mental model from
          "be grateful" to "this is a negotiation."
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
      </section>

      {/* ============================================
          SECTION 3 — THE PATH
          Three steps, vertical, clean. Feels like a
          path forward, not a feature comparison.
          ============================================ */}
      <section className="calm-path">
        <div className="calm-path__inner">
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
                SHRM, Littler, and Paycor data. Not guesses. Not AI estimates.
                The actual published ranges.
              </p>
            </div>
          </div>

          <div className="calm-reveal calm-path__step" style={{ transitionDelay: '0.12s' }}>
            <span className="calm-path__num">2</span>
            <div>
              <h3 className="calm-path__step-title">Build your ask</h3>
              <p className="calm-path__step-body">
                Pick from 11&nbsp;negotiable items most people don&rsquo;t know
                exist. Draft the counter-email using templates that have been
                tested across every major industry. Each template cites the
                benchmark it&rsquo;s based on.
              </p>
            </div>
          </div>

          <div className="calm-reveal calm-path__step" style={{ transitionDelay: '0.24s' }}>
            <span className="calm-path__num">3</span>
            <div>
              <h3 className="calm-path__step-title">Send it &mdash; or talk to someone first</h3>
              <p className="calm-path__step-body">
                Use the email as-is, or bring it to a free 15-minute attorney
                consult from the built-in legal directory. Either way,
                you&rsquo;ll know you didn&rsquo;t leave anything behind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          SECTION 4 — THE PRODUCT REVEAL
          This is the first time they see a price.
          Light background shift signals arrival.
          ============================================ */}
      <section className="calm-reveal calm-product">
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

          <ul className="calm-product__proof">
            <li>50-state severance benchmarks from published SHRM, Littler &amp; BLS data</li>
            <li>21 email templates — customized to your state and situation</li>
            <li>COBRA vs ACA calculator to pick the cheapest health coverage path</li>
            <li>90-day budget planner with three runway scenarios</li>
            <li>7-day refund if it&rsquo;s not what you need</li>
          </ul>

          <Link to="/checkout" className="btn btn-primary btn-glow calm-product__cta">
            Get Your Playbook &mdash; $69
          </Link>

          <p className="calm-product__fine">
            Secure Stripe checkout · Instant access · Not legal or financial advice
          </p>
        </div>
      </section>

      {/* ============================================
          SECTION 5 — THE SAFETY NET
          Compact FAQ for the still-hesitant.
          ============================================ */}
      <section className="calm-faq">
        <div className="calm-faq__inner">
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
        </div>
      </section>

      {/* ============================================
          QUIET CLOSING LINE
          ============================================ */}
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
