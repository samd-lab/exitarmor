import { useEffect } from 'react';
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
// Reduced Features for the "Severance Maximizer" Hook
// --------------------------------------------------------------
interface Feature {
  icon: IconName;
  title: string;
  body: string;
  accent: 'sage' | 'slate' | 'terracotta' | 'forest' | 'gold' | 'deep';
  pill?: string;
}

const SEVERANCE_FEATURES: Feature[] = [
  {
    icon: 'briefcase',
    accent: 'terracotta',
    pill: 'Audit',
    title: 'Severance Analyzer',
    body:
      'We check your tenure, state regulations, and unused PTO against Littler/SHRM benchmarks so you know exactly what is fair and what is legally missing.',
  },
  {
    icon: 'mail',
    accent: 'sage',
    pill: 'Templates',
    title: 'Ready-to-Send Scripts',
    body:
      'Don’t stare at a blank screen. Get full-length, legally-referenced counter-offer emails personalized automatically with your numbers and HR contact.',
  },
  {
    icon: 'heart',
    accent: 'gold',
    pill: 'Protection',
    title: 'Guard Your Benefits',
    body:
      'Before you sign away your healthcare, we run the math on COBRA premiums versus an ACA Marketplace quote for your exact income to find the cheapest coverage.',
  },
];

export default function LandingSeverance() {
  // Simple intersection observer animation hook
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
    description: "Don't sign that severance packet yet. Let our tool audit your offer and write your exact counter-offer script right now. $69 one-time.",
    path: '/severance',
    jsonLd: [
      organizationJsonLd(),
      websiteJsonLd(),
      productJsonLd(),
    ],
  });

  return (
    <MarketingLayout>
      {/* ========================================================
          HERO (Hyper-focused on Severance)
      ======================================================== */}
      <section className="mk-hero mk-hero--v2" style={{ paddingBottom: '6rem' }}>
        <div className="mk-hero__copy" style={{ margin: '0 auto', textAlign: 'center', maxWidth: '800px' }}>
          <div className="mk-hero__eyebrow reveal" style={{ margin: '0 auto 1.5rem', display: 'flex', justifyContent: 'center' }}>
            <span className="mk-hero__eyebrow-pulse" />
            The $69 Severance Maximizer Kit
          </div>
          <h1 className="reveal" style={{ fontSize: '4.2rem', lineHeight: 1.1, marginBottom: '1.5rem' }}>
            Don't sign your severance yet. <br />
            <span className="text-gradient">You are likely owed more.</span>
          </h1>
          <p className="mk-hero__lede reveal" style={{ fontSize: '1.25rem', maxWidth: '680px', margin: '0 auto 2rem' }}>
            HR is counting on your shock to get you to sign for the minimum. 
            Exit Armor audits your offer against state laws, calculates what you're actually owed, and gives you the exact email to ask for it.
          </p>
          <div className="mk-hero__cta-row reveal" style={{ display: 'flex', justifyContent: 'center', marginTop: '2.5rem' }}>
            <Link
              to="/checkout"
              className="btn btn-primary btn-glow"
              style={{ padding: '1.25rem 2.5rem', fontSize: '1.15rem' }}
            >
              Audit My Severance Offer &mdash; $69
              <Icon name="arrow" size={16} />
            </Link>
          </div>
          <div className="mk-hero__checks reveal" style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '2rem' }}>
            <span className="mk-hero__check"><Icon name="check" size={14}/> Instant Access</span>
            <span className="mk-hero__check"><Icon name="check" size={14}/> No Subscription</span>
            <span className="mk-hero__check"><Icon name="check" size={14}/> 7-Day Guarantee</span>
          </div>
          <p className="mk-hero__legal reveal" style={{ textAlign: 'center', marginTop: '2.5rem', color: '#10b981', fontWeight: 'bold' }}>
            <Icon name="spark" size={14} /> Plus Free Bonuses: 90-Day Budget Planner & Job Search Strategy included.
          </p>
        </div>
      </section>

      {/* ========================================================
          SOCIAL PROOF / PAIN CALLOUT
      ======================================================== */}
      <section className="mk-pain reveal" style={{ margin: '0 auto 6rem', maxWidth: '900px', textAlign: 'center' }}>
        <h2 className="mk-pain__title" style={{ fontSize: '2.5rem' }}>
          The average professional leaves <br/><span className="text-gradient">$2,000 to $8,000</span> on the table.
        </h2>
        <p className="mk-pain__lede" style={{ margin: '1.5rem auto 3rem', maxWidth: '700px' }}>
          They do it because they are scared, overwhelmed, and assume the first offer is final. 
          It almost never is. We give you the confidence, the math, and the scripts to push back safely.
        </p>
      </section>

      {/* ========================================================
          SIMPLIFIED FEATURES (The 3 Pillars)
      ======================================================== */}
      <section className="mk-section" style={{ background: 'rgba(255,255,255,0.02)', padding: '6rem 0' }}>
        <div className="mk-section__head" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2>How it works</h2>
        </div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '2rem', 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '0 2rem' 
        }}>
          {SEVERANCE_FEATURES.map((f, i) => (
            <div key={i} className="reveal" style={{ 
              background: '#13182b', 
              padding: '2.5rem', 
              borderRadius: '24px', 
              border: '1px solid rgba(255,255,255,0.06)' 
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ 
                  width: '48px', height: '48px', borderRadius: '12px', 
                  background: 'rgba(255,255,255,0.05)', display: 'flex', 
                  alignItems: 'center', justifyContent: 'center' 
                }}>
                  <Icon name={f.icon} size={24} />
                </div>
                <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'rgba(255,255,255,0.5)' }}>
                  {f.pill}
                </div>
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{f.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          BOTTOM CTA (No Pricing Tiers, Just $69)
      ======================================================== */}
      <section className="reveal" style={{ padding: '8rem 2rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>Ready to find your leverage?</h2>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.25rem', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
          Stop Googling at 2am. Get the exact numbers and scripts you need to protect yourself right now.
        </p>
        <Link
          to="/checkout"
          className="btn btn-primary btn-glow"
          style={{ padding: '1.25rem 3rem', fontSize: '1.25rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
        >
          Get The Severance Maximizer - $69
          <Icon name="arrow" size={20} />
        </Link>
        <p style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)' }}>
          Secure, one-time payment via Stripe. Fully confidential.
        </p>
      </section>
    </MarketingLayout>
  );
}
