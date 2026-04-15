import { Link } from 'react-router-dom';
import { MarketingLayout } from '../MarketingLayout';
import { breadcrumbJsonLd, usePageMeta } from '../../lib/seo';

export default function Privacy() {
  usePageMeta({
    title: 'Privacy Policy — Exit Armor',
    description:
      'What we collect, what we don’t, and why. Exit Armor stores your checklist progress locally in your browser, not on our servers.',
    path: '/privacy',
    jsonLd: breadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Privacy Policy', path: '/privacy' },
    ]),
  });

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

        <h2>Your data, in technical detail</h2>
        <p>
          Because we know "it stays on your device" can sound vague, here is exactly
          what that means &mdash; every field, every lifecycle, every edge case.
        </p>

        <h3>What we store, and where</h3>
        <p>
          Everything you type into Exit Armor &mdash; your name, company, role, target
          role, tenure, phone, email, HR contact, LinkedIn URL, severance numbers,
          budget entries, selected state, and every checklist tick &mdash; is saved to
          your browser's built-in <strong>localStorage</strong> database under keys
          prefixed with <code>exitarmor.v1.*</code>. localStorage is a per-origin
          (meaning per-website) key-value store that your browser manages on your
          behalf. Nothing about it travels over the network. When you mark an item
          complete, your browser writes to its local disk. When you reload the page,
          your browser reads from its local disk. Our servers are never involved.
        </p>
        <p>
          You can verify this yourself. Open your browser's DevTools (F12 on most
          browsers), click the Application or Storage tab, and look under localStorage
          for <code>exitarmor.com</code>. Everything Exit Armor remembers about you is
          there, in plain text, and you can delete any single key at any time.
        </p>

        <h3>What <em>survives</em></h3>
        <ul>
          <li><strong>Page refresh or navigation.</strong> Yes.</li>
          <li><strong>Closing the tab or window.</strong> Yes.</li>
          <li><strong>Quitting and reopening the browser.</strong> Yes.</li>
          <li><strong>Restarting your laptop or desktop.</strong> Yes. localStorage is written to the browser's on-disk profile, not to memory, so a normal shutdown, a crash, a forced reboot, or a power outage does not lose your data. As long as the disk is intact, the data is intact.</li>
          <li><strong>System updates and browser updates.</strong> Yes, with rare exceptions where a browser changes its storage format &mdash; which hasn't happened in any major browser in years.</li>
          <li><strong>Going offline.</strong> Yes. Exit Armor works fully offline once the page has loaded, because nothing round-trips to our servers.</li>
        </ul>

        <h3>What <em>clears</em> your data</h3>
        <p>
          The following things will delete your Exit Armor progress. Some are your
          choice; some are your browser's policy. None of them involve us.
        </p>
        <ul>
          <li>
            <strong>You clear browsing data.</strong> Any time you (or someone with
            access to your device) clears "cached images and files," "cookies and
            other site data," or "site data" for <code>exitarmor.com</code>, your
            progress is gone. Some privacy extensions and "one-click cleaner" tools do
            this automatically &mdash; check their settings.
          </li>
          <li>
            <strong>You use Incognito / Private / InPrivate mode.</strong> In private
            browsing, localStorage is scoped to the private session only. The moment
            you close the last private window, everything is deleted. If you want your
            progress to persist, use a normal (non-private) window.
          </li>
          <li>
            <strong>You switch browsers or devices.</strong> localStorage is scoped
            per browser, per device, per user profile. Progress you saved in Chrome on
            your laptop is not readable by Safari on your laptop, Chrome on a
            different laptop, or the same Chrome under a different user profile.
            There is no cloud sync.
          </li>
          <li>
            <strong>Safari's Intelligent Tracking Prevention (ITP).</strong> This is
            the one to know about. On Safari (macOS and iOS), Apple's ITP policy
            automatically deletes script-writable storage &mdash; including
            localStorage &mdash; for any site you haven't interacted with in{' '}
            <strong>7 days</strong>. If you use Safari, buy Exit Armor, and then
            don't visit the site again for a week, your progress will be wiped. The
            fix is simple: open the dashboard once a week, or use a non-Safari
            browser (Chrome, Firefox, Edge, Arc, Brave) where this policy does not
            apply.
          </li>
          <li>
            <strong>Storage quota pressure.</strong> Browsers reserve a small amount
            of disk for every site (usually 5&ndash;10 MB for localStorage, sometimes
            more). If your disk fills up to a critical level, or if you've visited
            thousands of sites and your browser decides to reclaim space, it may evict
            the oldest or least-used origin storage. Exit Armor uses a few kilobytes,
            so this is extremely unlikely unless your disk is almost full.
          </li>
          <li>
            <strong>Browser profile deletion or corruption.</strong> If you delete
            your browser user profile, factory-reset your device, or your browser's
            on-disk profile database is corrupted by a hardware failure or a force-
            quit during a write, localStorage for all sites is affected, including
            Exit Armor.
          </li>
          <li>
            <strong>You explicitly reset it inside Exit Armor.</strong> Where we
            surface a "Clear progress" or "Start over" button, clicking it removes
            exactly the keys you'd expect and nothing else.
          </li>
        </ul>

        <h3>What does <em>not</em> clear your data</h3>
        <ul>
          <li>
            A power outage, sudden shutdown, or crash while you're <em>reading</em>.
            localStorage writes are committed to disk synchronously; any data saved
            before the event is safe.
          </li>
          <li>
            Logging out of your operating system account (as long as you log back
            into the same user profile).
          </li>
          <li>
            Putting the laptop to sleep, closing the lid, or letting the battery die
            &mdash; once you reopen and relaunch the browser, the data is still there.
          </li>
          <li>
            A Wi-Fi or internet outage. Exit Armor does not need to contact our
            servers to remember what you've entered.
          </li>
          <li>
            An Exit Armor product update. We use versioned keys (<code>exitarmor.v1</code>),
            so if we ever need to change the format we migrate your data forward
            rather than wipe it.
          </li>
        </ul>

        <h3>How to back up your progress</h3>
        <p>
          Because your data is local, you are the only one who can preserve it. Two
          practical options:
        </p>
        <ul>
          <li>
            <strong>Generate the Action Plan PDF.</strong> The Action Plan view
            compiles everything you've entered &mdash; numbers, asks, state, runway,
            counter-offer email &mdash; into a single printable 1-page document. Hit
            "Save as PDF" whenever you make a meaningful change and store the PDF
            somewhere safe (email to yourself, save to Dropbox, print a copy).
          </li>
          <li>
            <strong>Export raw data from DevTools.</strong> Advanced users can copy
            the JSON values under <code>exitarmor.v1.*</code> directly out of the
            Application/Storage panel and paste them into a text file.
          </li>
        </ul>
        <p>
          We're working on an in-product "Export / Import" button that does this in
          one click. Until then, the PDF is the fastest durable backup.
        </p>

        <h3>Why we designed it this way</h3>
        <p>
          It would be cheaper and easier for us to put all of this in a server-side
          database. We chose not to. People using Exit Armor are, by definition,
          having a bad week &mdash; and the last thing they need is another company
          they don't know holding a file on their severance numbers, their HR
          contact, and their state of residence. Local-only storage means we can't
          hand your data to a law-firm discovery request, a hacker who breaches us,
          an advertiser who offers us money, or an AI model we're training. There's
          nothing to hand over.
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
