import { Link } from 'react-router-dom';
import { MarketingLayout } from '../MarketingLayout';

export default function About() {
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
          In 2023, our founder was laid off from a senior role at a tech company. The
          meeting lasted 14 minutes. By the end of the day, he was staring at a 28-page
          separation agreement with a 21-day review window, a non-compete clause he
          didn't understand, and a COBRA notice that mentioned a 60-day deadline but
          didn't explain what would happen if he missed it.
        </p>
        <p>
          He did what most people do: he called three friends who had been laid off
          before him. Each one told him a story he wished he'd heard earlier &mdash; about
          the severance weeks they didn't know they could ask for, the COBRA months they
          paid out of pocket when ACA would have been cheaper, the references they never
          got in writing and later regretted.
        </p>
        <p>
          He ended up negotiating an extra 6 weeks of severance and 3 months of COBRA
          reimbursement. Not because he was a brilliant negotiator &mdash; but because he
          finally knew what to ask for. The whole conversation took 20 minutes.
        </p>
        <p>
          Exit Armor is the tool he wished existed in those 14 minutes.
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
          Exit Armor is built by a small, distributed team of product designers,
          engineers, and former HR operators. We've been on both sides of the separation
          conversation. We've read the playbooks that HR teams use, and we've rewritten
          them into the playbook you should have.
        </p>
        <p>
          We work in public. Every piece of content on this site is sourced from state
          Department of Labor websites, federal agency publications (EEOC, DOL, IRS,
          HHS), and well-established employment law commentary. If you ever spot
          something inaccurate, please <Link to="/contact">tell us</Link>. We fix errors
          within 48 hours.
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
          <Link to="/app" className="btn btn-primary">Launch Exit Armor &mdash; $69</Link>
        </div>
      </article>
    </MarketingLayout>
  );
}
