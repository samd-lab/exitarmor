import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { BrandMark } from '../components/BrandMark';
import './marketing.css';

interface Props {
  children: ReactNode;
}

export function MarketingLayout({ children }: Props) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <MarketingNav />
      <main style={{ flex: 1 }}>{children}</main>
      <MarketingFooter />
    </div>
  );
}

export function MarketingNav() {
  return (
    <nav className="mk-nav">
      <div className="mk-nav__inner">
        <Link to="/" className="mk-nav__logo">
          <span className="mk-nav__logo-mark">
            <BrandMark id="nav" size={30} />
          </span>
          EXIT ARMOR
        </Link>
        <div className="mk-nav__links">
          <Link to="/blog" className="mk-nav__link">Blog</Link>
          <Link to="/about" className="mk-nav__link">About</Link>
          <Link to="/contact" className="mk-nav__link">Contact</Link>
          {/* Primary nav CTA — lands on the /checkout interstitial,
              which hands off to Stripe. Interstitial adds trust signals
              (what's inside, guarantee, FAQ) before money changes hands. */}
          <Link to="/checkout" className="btn btn-primary mk-nav__cta">
            Get Started &mdash; $69
          </Link>
        </div>
      </div>
    </nav>
  );
}

export function MarketingFooter() {
  return (
    <footer className="mk-footer">
      <div className="mk-footer__grid">
        <div className="mk-footer__col">
          <div className="mk-nav__logo" style={{ marginBottom: '1rem' }}>
            <span className="mk-nav__logo-mark">
              <BrandMark id="footer" size={30} />
            </span>
            EXIT ARMOR
          </div>
          <p className="mk-footer__tagline">
            Your AI-powered layoff survival toolkit. Audit your severance, protect your
            benefits, and script your comeback &mdash; in the most stressful week of your
            career.
          </p>
        </div>
        <div className="mk-footer__col">
          <h4>Product</h4>
          <ul>
            <li><Link to="/checkout">Get the Kit</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </div>
        <div className="mk-footer__col">
          <h4>Resources</h4>
          <ul>
            <li><Link to="/blog/first-24-hours-after-layoff">First 24 Hours</Link></li>
            <li><Link to="/blog/severance-negotiation-11-asks">Severance Asks</Link></li>
            <li><Link to="/blog/cobra-vs-aca-2026">COBRA vs ACA</Link></li>
            <li><Link to="/blog/state-unemployment-filing-guide">State Filing Guide</Link></li>
          </ul>
        </div>
        <div className="mk-footer__col">
          <h4>Legal</h4>
          <ul>
            <li><Link to="/terms">Terms of Service</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/disclaimer">Disclaimer</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="mk-footer__legal">
        <span>&copy; {new Date().getFullYear()} Exit Armor. All rights reserved.</span>
        <span>Made for people in the hardest week of their career.</span>
      </div>
      <div className="mk-footer__disclaimer">
        Exit Armor is an AI-powered educational resource. Nothing on this website or in
        our product constitutes legal advice, financial advice, tax advice, or professional
        services of any kind. No attorney-client or professional relationship is created by
        use of this product. Information is general in nature and may not apply to your
        specific situation. Always consult a licensed professional before making legal or
        financial decisions. Exit Armor is not a law firm and does not provide legal
        representation.
      </div>
    </footer>
  );
}
