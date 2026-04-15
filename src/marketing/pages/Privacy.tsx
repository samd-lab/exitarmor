import { Link } from 'react-router-dom';
import { MarketingLayout } from '../MarketingLayout';

export default function Privacy() {
  return (
    <MarketingLayout>
      <article className="mk-doc">
        <p className="mk-doc__eyebrow">Legal</p>
        <h1>Privacy Policy.</h1>
        <p className="mk-doc__lede">
          We built Exit Armor to ask you for as little personal information as
          possible. This page explains what we collect, what we don't, and why. Last
          updated: April 15, 2026.
        </p>

        <h2>The short version</h2>
        <ul>
          <li>Your checklist progress is stored in your browser, not on our servers.</li>
          <li>We do not require you to create an account.</li>
          <li>We do not sell your data. We do not run third-party advertising.</li>
          <li>We collect only what we need to process payments, deliver access, and improve the product.</li>
          <li>You can request deletion of any information we hold about you at any time.</li>
        </ul>

        <h2>What we collect</h2>
        <h3>1. Account and purchase information</h3>
        <p>
          When you purchase Exit Armor, our payment processor (currently Stripe)
          collects your name, email address, and billing information. We receive a
          confirmation from Stripe with your name, email, and purchase details. We do
          not receive or store your full credit card number, CVV, or banking
          information &mdash; that data lives with Stripe and is handled according to
          their privacy policy.
        </p>

        <h3>2. Checklist and module progress</h3>
        <p>
          When you use the Exit Armor dashboard, your checklist progress (which items
          you have marked complete, your selected state, budget entries you type in,
          and similar) is saved to your own browser using a feature called
          localStorage. This information lives on your device &mdash; not on our
          servers. We cannot see it, read it, or recover it. If you clear your browser
          data, switch devices, or use incognito mode, your progress will not carry
          over. That is a trade-off we made on purpose: the less of your situation we
          hold, the less risk to you.
        </p>

        <h3>3. Voice data (if you use voice features)</h3>
        <p>
          If you use our optional voice-based AI coaching feature, your voice is
          streamed in real time to our AI provider for transcription and response. It
          is not recorded or stored by Exit Armor. The transcription is used only for
          the duration of your session and is then discarded. We do not retain voice
          recordings, transcripts, or any derived data after your session ends.
        </p>

        <h3>4. Contact form and support emails</h3>
        <p>
          If you email us or submit the contact form, we receive your name, email
          address, and the contents of your message. We use this to reply and to
          improve the product. We do not share support communications with any third
          party except as required by law.
        </p>

        <h3>5. Website analytics</h3>
        <p>
          We use privacy-focused, cookieless analytics to understand which pages are
          visited, how long visitors stay, and which referral sources bring the most
          traffic. Our analytics provider does not collect personally identifying
          information and does not use cross-site tracking cookies.
        </p>

        <h2>What we do not collect</h2>
        <ul>
          <li>We do not collect your severance documents.</li>
          <li>We do not collect Social Security numbers, passport numbers, or government IDs.</li>
          <li>We do not collect bank account numbers, credit card numbers, or tax information.</li>
          <li>We do not fingerprint your browser or track you across other websites.</li>
          <li>We do not build advertising profiles.</li>
        </ul>

        <h2>Cookies</h2>
        <p>
          We use a small number of essential cookies: one to remember that you have
          accepted our disclaimer, one to associate your session with your purchase,
          and one to remember your preferred UI theme. We do not use advertising
          cookies, social media cookies, or third-party tracking cookies. Our
          analytics provider is cookieless.
        </p>

        <h2>How we use your information</h2>
        <p>
          We use the information we collect to: (1) process your purchase and deliver
          access to the product, (2) provide customer support, (3) improve the
          content and usability of Exit Armor, (4) notify you of material product
          updates if you opted in, and (5) comply with legal obligations.
        </p>
        <p>
          We do not use your information to train AI models, and we do not share it
          with AI providers beyond what is strictly necessary to provide you the
          coaching feature in real time.
        </p>

        <h2>How we share your information</h2>
        <p>
          We share information with a small number of service providers strictly on a
          need-to-know basis: our payment processor (Stripe), our email delivery
          provider, our hosting provider, and our optional voice-AI partner. Each of
          these providers is bound by contract to handle your data securely and to
          use it only to deliver services to Exit Armor.
        </p>
        <p>
          We do not sell, rent, or trade your personal information to any third party.
          We will disclose information if required by subpoena, court order, or other
          valid legal process &mdash; and when we can legally do so, we will notify
          you before complying.
        </p>

        <h2>Your rights</h2>
        <p>
          Depending on where you live, you may have the right to access, correct,
          delete, or port the personal information we hold about you, and to withdraw
          consent or object to certain uses. To exercise these rights, email
          <a href="mailto:privacy@exitarmor.com"> privacy@exitarmor.com</a>. We will
          respond within 30 days. Because we store so little information on our
          servers, most deletion requests can be completed immediately.
        </p>

        <h2>Children</h2>
        <p>
          Exit Armor is not intended for children. We do not knowingly collect
          information from anyone under the age of 16. If you believe we have
          collected information from a minor, please contact us and we will delete it
          immediately.
        </p>

        <h2>Security</h2>
        <p>
          We use standard industry practices to protect the information we collect,
          including TLS encryption in transit, encrypted storage, and strict access
          controls on our internal systems. No system is perfectly secure, however,
          and we cannot guarantee absolute security. We reduce your risk by holding as
          little data as possible.
        </p>

        <h2>International users</h2>
        <p>
          Exit Armor is operated from the United States and is primarily intended for
          users located in the United States. If you access the product from outside
          the US, please be aware that information you submit may be processed in the
          US, where privacy laws may differ from those of your country.
        </p>

        <h2>Changes to this policy</h2>
        <p>
          We may update this Privacy Policy from time to time. When we do, we will
          update the "last updated" date above. For material changes, we will post a
          notice inside the product so you can review the updates before they take
          effect.
        </p>

        <h2>Contact us</h2>
        <p>
          Questions about this Privacy Policy? Email{' '}
          <a href="mailto:privacy@exitarmor.com">privacy@exitarmor.com</a> or use our{' '}
          <Link to="/contact">contact form</Link>.
        </p>
      </article>
    </MarketingLayout>
  );
}
