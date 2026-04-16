import { Link } from 'react-router-dom';
import { MarketingLayout } from '../MarketingLayout';
import { breadcrumbJsonLd, organizationJsonLd, usePageMeta } from '../../lib/seo';

export default function About() {
  usePageMeta({
    title: 'About Exit Armor — Built for the hardest week of your career',
    description:
      'Why we built Exit Armor: a calm, research-backed 90-day layoff survival kit for anyone facing a severance packet, COBRA election, or unemployment filing.',
    path: '/about',
    jsonLd: [
      organizationJsonLd(),
      breadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
      ]),
    ],
  });

  return (
    <MarketingLayout>
      <article className="mk-doc">
        <p className="mk-doc__eyebrow">About Us</p>
        <h1>We built this for the hardest week of your career.</h1>
        <p className="mk-doc__lede">
          Exit Armor exists because nobody teaches you what to do in the first 48 hours
          after a layoff. HR is trained. You aren't. That gap costs professionals
          thousands of dollars every year. We're trying to close it.
        </p>

        <h2>Why Exit Armor exists</h2>
        <p>
          Every year, roughly two million Americans are handed a severance packet with a
          deadline. The meeting lasts 15 minutes. By the end of that day, they are
          staring at a 20-to-40-page separation agreement, a review window, a
          non-compete clause nobody explained, and a COBRA notice with a 60-day ticking
          deadline. Almost nobody has seen any of it before.
        </p>
        <p>
          The people who come through it best are almost always the ones who happen to
          know someone who went through it six months earlier &mdash; a friend who quietly
          tells them about the severance weeks they did not know they could ask for, the
          COBRA months they paid out of pocket when ACA would have been cheaper, the
          references they forgot to lock in and later regretted. That friend is the
          difference between an offer accepted in shock and an offer negotiated with
          information.
        </p>
        <p>
          We built Exit Armor to be that friend &mdash; at a one-time price instead of a
          favor owed. The kit is a calm, research-backed walkthrough of the entire 90-day
          window after a layoff, built on publicly-sourced data from SHRM, BLS, KFF,
          state Departments of Labor, and well-established employment-law practice. No
          invented case studies, no fake founders, no war stories.
        </p>

        <h2>Our principles</h2>
        <h3>1. Information over drama</h3>
        <p>
          Being laid off is emotional. But emotion won't negotiate your severance. We
          keep our content calm, specific, and actionable &mdash; no motivational
          speeches, no war stories, no fluff. Just the checklist, the numbers, and the
          exact words to say.
        </p>

        <h3>2. Education, not advice</h3>
        <p>
          We are not lawyers, financial planners, or tax advisors. Exit Armor is an
          educational resource built on publicly available information about US labor
          law, healthcare options, and negotiation practices. For high-stakes decisions
          &mdash; severance packages over $20K, potential discrimination claims, equity
          vesting questions &mdash; we always recommend consulting a licensed attorney or
          financial professional.
        </p>

        <h3>3. Your privacy is the point</h3>
        <p>
          We never ask you to create an account. We never collect your severance
          documents. Your progress lives in your browser's local storage &mdash; and if
          you want, you can export it to email or PDF and delete it from our product at
          any time. The fewer things you have to trust us with in your worst week, the
          better.
        </p>

        <h3>4. One price. No upsell.</h3>
        <p>
          Exit Armor is a one-time $69 purchase. Not a subscription. Not a freemium
          trap. Not an aggressive email sequence. You buy it once, you use it until you
          don't need it anymore, and then you (hopefully) forget about us. We believe
          that's the right relationship between a product and someone who's navigating a
          layoff.
        </p>

        <h2>Who we are</h2>
        <p>
          Exit Armor is built by a small, distributed team that includes product and
          design people, a former recruiter, and friends of ours who have been through
          recent layoffs in tech, retail, and healthcare. We are not a law firm and we
          are not trying to become one. We read the playbooks that HR and legal teams
          use every day and we rewrote them into a plain-English walkthrough anyone can
          follow in the worst week of their career.
        </p>
        <p>
          We work in public. Every factual claim inside the product is sourced from a
          state Department of Labor page, a federal agency (EEOC, DOL, IRS, HHS), a
          major HR-industry survey (SHRM, KFF), or well-established employment-law
          commentary. Every citation is linked inline. If you ever spot something
          inaccurate, please <Link to="/contact">tell us</Link>. We fix errors within
          48 hours.
        </p>

        <h2>Who we are not</h2>
        <p>
          We are not a law firm. We are not a recruiting agency. We are not a career
          coaching service. We don't take a cut of your severance. We don't sell your
          data. We don't run ads. The only thing we sell is Exit Armor itself, and the
          only thing we ask in return is that if it helped, you tell one friend who gets
          laid off next.
        </p>

        <div className="mk-doc__cta">
          <h3>Ready when you are.</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            Your 72-hour survival plan is 3 clicks away.
          </p>
          <Link to="/checkout" className="btn btn-primary">Get the kit &mdash; $69</Link>
        </div>
      </article>
    </MarketingLayout>
  );
}
