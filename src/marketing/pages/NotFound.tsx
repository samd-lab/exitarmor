import { Link } from 'react-router-dom';
import { MarketingLayout } from '../MarketingLayout';
import { usePageMeta } from '../../lib/seo';

// Hard 404 — we can't return a real 404 status from a Netlify-hosted SPA,
// but we CAN set robots=noindex,nofollow and emit a clear signal to humans.
// Netlify's _redirects rewrites unknown paths to index.html (200), so this
// is the best SPAs can do without SSR.
export default function NotFound() {
  usePageMeta({
    title: 'Page not found — Exit Armor',
    description:
      'The page you are looking for does not exist. Browse the Exit Armor blog or head back to the severance playbook.',
    path: '/404',
    noindex: true,
  });

  return (
    <MarketingLayout>
      <article className="mk-doc" style={{ textAlign: 'center', paddingTop: '4rem' }}>
        <p className="mk-doc__eyebrow" style={{ color: '#e63946' }}>
          404
        </p>
        <h1>This page took a severance package.</h1>
        <p className="mk-doc__lede" style={{ maxWidth: 560, margin: '0 auto 2rem' }}>
          The URL you followed no longer exists, or never did. No panic — the rest of
          Exit Armor is still here, and so is your 90-day playbook.
        </p>

        <div
          style={{
            display: 'flex',
            gap: '0.8rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginTop: '1.5rem',
          }}
        >
          <Link to="/" className="btn btn-primary" style={{ padding: '0.9rem 1.6rem' }}>
            Back to home
          </Link>
          <Link to="/blog" className="btn btn-glass" style={{ padding: '0.9rem 1.6rem' }}>
            Read the blog
          </Link>
          <Link to="/app" className="btn btn-glass" style={{ padding: '0.9rem 1.6rem' }}>
            Open the playbook
          </Link>
        </div>

        <div style={{ marginTop: '3rem', color: '#64748b', fontSize: '0.9rem' }}>
          <p>Popular links:</p>
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <li>
              <Link to="/blog/first-24-hours-after-layoff">First 24 Hours</Link>
            </li>
            <li>
              <Link to="/blog/severance-negotiation-11-asks">Severance Asks</Link>
            </li>
            <li>
              <Link to="/blog/cobra-vs-aca-2026">COBRA vs ACA</Link>
            </li>
            <li>
              <Link to="/blog/state-unemployment-filing-guide">State Filing Guide</Link>
            </li>
          </ul>
        </div>
      </article>
    </MarketingLayout>
  );
}
