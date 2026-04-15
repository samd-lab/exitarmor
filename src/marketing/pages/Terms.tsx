import { Link } from 'react-router-dom';
import { MarketingLayout } from '../MarketingLayout';

export default function Terms() {
  return (
    <MarketingLayout>
      <article className="mk-doc">
        <p className="mk-doc__eyebrow">Legal</p>
        <h1>Terms of Service.</h1>
        <p className="mk-doc__lede">
          These Terms of Service govern your use of Exit Armor. By purchasing or using
          the product, you agree to these terms. Last updated: April 15, 2026.
        </p>

        <h2>1. Who we are</h2>
        <p>
          Exit Armor is an online, AI-powered educational resource that helps
          individuals navigate the first weeks after a US-based layoff or termination.
          Exit Armor is operated by its publishers ("we," "us," or "Exit Armor"). We
          are not a law firm. We do not provide legal, financial, tax, or medical
          advice.
        </p>

        <h2>2. What you're buying</h2>
        <p>
          For a one-time fee of $69 (or such other amount we may publish on our pricing
          page), you receive access to the Exit Armor web product. Your purchase
          includes the full checklist set, state-specific resources, email templates,
          benefits guidance, and any educational content we have published at the time
          of purchase, along with any updates we release during the 12 months following
          your purchase.
        </p>

        <h2>3. License</h2>
        <p>
          We grant you a limited, non-exclusive, non-transferable, revocable license to
          use Exit Armor for your personal, non-commercial use. You may not resell,
          sublicense, republish, or redistribute Exit Armor content, in whole or in
          part, without our prior written permission. Screenshots shared privately
          between friends or on social media for personal commentary are fine.
        </p>

        <h2>4. Refunds</h2>
        <p>
          We offer a 7-day, no-questions-asked refund policy. If you are not satisfied
          with Exit Armor for any reason, email support@exitarmor.com within 7 days of
          purchase and we will refund you in full. After 7 days, refund decisions are
          at our discretion &mdash; but we will generally err on the side of refunding
          anyone who felt the product did not serve them.
        </p>

        <h2>5. Acceptable use</h2>
        <p>You agree not to:</p>
        <ul>
          <li>Use Exit Armor in any way that violates applicable law;</li>
          <li>Attempt to reverse engineer, decompile, or otherwise extract our source code;</li>
          <li>Scrape, crawl, or otherwise harvest content from the product beyond what is necessary for your personal use;</li>
          <li>Misrepresent Exit Armor as legal advice or as authored by a licensed attorney;</li>
          <li>Use the product to harass, intimidate, or retaliate against any employer, coworker, or third party.</li>
        </ul>

        <h2>6. Your responsibility</h2>
        <p>
          You are solely responsible for how you use Exit Armor and for any decisions
          you make based on its content. Please see our <Link to="/disclaimer">Disclaimer</Link>{' '}
          for a fuller explanation of what Exit Armor is not. In short: Exit Armor is
          not a replacement for a licensed employment attorney or a licensed financial
          professional, and we strongly recommend you consult one for any high-stakes
          decisions.
        </p>

        <h2>7. No professional relationship</h2>
        <p>
          No attorney-client relationship, no fiduciary relationship, and no
          professional services relationship of any kind is formed by your purchase of
          Exit Armor, your use of the product, or any communication you have with us
          via email, chat, or any other channel.
        </p>

        <h2>8. Intellectual property</h2>
        <p>
          All content in Exit Armor &mdash; including checklists, templates, state
          summaries, blog posts, designs, and source code &mdash; is owned by Exit
          Armor or our licensors and is protected by US and international copyright
          law. Our name and logo are trademarks of Exit Armor. You may not use our
          trademarks without our prior written permission.
        </p>

        <h2>9. Limitation of liability</h2>
        <p>
          To the fullest extent permitted by applicable law, Exit Armor shall not be
          liable for any indirect, incidental, special, consequential, or punitive
          damages, or for any loss of profits, revenues, data, or opportunities, arising
          out of or in connection with your use of the product. In no event shall our
          aggregate liability to you for any claim arising out of or relating to the
          product exceed the amount you paid for Exit Armor in the 12 months preceding
          the claim.
        </p>

        <h2>10. Disclaimer of warranties</h2>
        <p>
          Exit Armor is provided "as is" and "as available," without warranties of any
          kind, whether express or implied, including but not limited to warranties of
          merchantability, fitness for a particular purpose, non-infringement, or
          accuracy of content. We make no warranty that the product will be
          uninterrupted, error-free, or free of harmful components.
        </p>

        <h2>11. Indemnification</h2>
        <p>
          You agree to indemnify and hold harmless Exit Armor and its operators from
          any claims, damages, liabilities, or expenses arising from your use of the
          product in violation of these Terms or applicable law.
        </p>

        <h2>12. Termination</h2>
        <p>
          We may suspend or terminate your access to Exit Armor if you violate these
          Terms. You may stop using the product at any time. Termination does not
          automatically entitle you to a refund, but we will consider refund requests
          made in good faith outside of our standard 7-day window.
        </p>

        <h2>13. Changes to these Terms</h2>
        <p>
          We may update these Terms from time to time. When we do, we will update the
          "last updated" date at the top of this page and, for material changes, post a
          notice in the product. Your continued use of Exit Armor after the updated
          Terms take effect constitutes your acceptance of the revised Terms.
        </p>

        <h2>14. Governing law</h2>
        <p>
          These Terms are governed by the laws of the State of Delaware, without regard
          to conflict-of-laws principles. Any disputes arising out of these Terms or
          your use of Exit Armor shall be resolved exclusively in the state or federal
          courts located in Delaware, and you consent to the jurisdiction of those
          courts.
        </p>

        <h2>15. Contact us</h2>
        <p>
          Questions about these Terms? Email us at{' '}
          <a href="mailto:support@exitarmor.com">support@exitarmor.com</a> or use our{' '}
          <Link to="/contact">contact form</Link>.
        </p>
      </article>
    </MarketingLayout>
  );
}
