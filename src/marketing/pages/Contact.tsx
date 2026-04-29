import { useState } from 'react';
import { MarketingLayout } from '../MarketingLayout';
import { breadcrumbJsonLd, usePageMeta } from '../../lib/seo';
import { usePricing } from '../../lib/usePricing';

export default function Contact() {
  const pricing = usePricing();
  const [sent, setSent] = useState(false);
  usePageMeta({
    title: 'Contact Exit Armor — Support, corrections & press',
    description:
      'Questions, refund requests, corrections, or press inquiries for Exit Armor. Humans read every message — replies within 24 hours on business days.',
    path: '/contact',
    jsonLd: breadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Contact', path: '/contact' },
    ]),
  });

  return (
    <MarketingLayout>
      <article className="mk-doc">
        <p className="mk-doc__eyebrow">Contact</p>
        <h1>We read every message.</h1>
        <p className="mk-doc__lede">
          Questions about the product? Corrections to our content? Have a story that
          could help someone else? We want to hear it. Our inbox is monitored by humans,
          not bots &mdash; expect a reply within 24 hours on business days.
        </p>

        <h2>Quick ways to reach us</h2>
        <p>
          <strong>Support &amp; refunds:</strong> <a href="mailto:support@exitarmor.com">support@exitarmor.com</a><br />
          <strong>Content corrections:</strong> <a href="mailto:corrections@exitarmor.com">corrections@exitarmor.com</a><br />
          <strong>Press:</strong> <a href="mailto:press@exitarmor.com">press@exitarmor.com</a><br />
          <strong>Partnerships:</strong> <a href="mailto:hello@exitarmor.com">hello@exitarmor.com</a>
        </p>

        <h2>Or use the form</h2>
        {sent ? (
          <div
            style={{
              padding: '2rem',
              background: 'rgba(34, 197, 94, 0.1)',
              border: '1px solid rgba(34, 197, 94, 0.3)',
              borderRadius: '14px',
              color: '#22c55e',
              textAlign: 'center',
            }}
          >
            <h3 style={{ color: '#22c55e', marginBottom: '0.5rem' }}>Thanks &mdash; message received.</h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              We'll reply within 24 business hours. If it's urgent, email
              support@exitarmor.com directly.
            </p>
          </div>
        ) : (
          <form
            className="mk-form"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <label>
              Your name
              <input type="text" name="name" required placeholder="Alex Rivera" />
            </label>
            <label>
              Email address
              <input type="email" name="email" required placeholder="alex@example.com" />
            </label>
            <label>
              What's this about?
              <input type="text" name="subject" required placeholder="e.g. Correction on Illinois non-compete post" />
            </label>
            <label>
              Message
              <textarea name="message" required placeholder="Tell us everything..." />
            </label>
            <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
              Send message
            </button>
          </form>
        )}

        <h2 style={{ marginTop: '3rem' }}>Want a refund?</h2>
        <p>
          We offer a 7-day, no-questions-asked money-back guarantee. Email
          support@exitarmor.com from the address you used at checkout and we'll process
          it within one business day. If it's been longer than 7 days and you still feel
          the product didn't serve you, write to us anyway &mdash; we'd rather refund an
          unhappy customer than keep {pricing.label}.
        </p>

        <h2>Found an error?</h2>
        <p>
          Labor law changes. State DOL websites get reorganized. Non-compete statutes
          get amended. If something in Exit Armor is out of date or wrong, please email
          corrections@exitarmor.com with the specific page and what's incorrect. We'll
          verify it, fix it within 48 hours, and credit you (anonymously or by name) in
          our changelog.
        </p>
      </article>
    </MarketingLayout>
  );
}
