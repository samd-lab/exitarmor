import { Link } from 'react-router-dom';
import { MarketingLayout } from '../MarketingLayout';

export default function Disclaimer() {
  return (
    <MarketingLayout>
      <article className="mk-doc">
        <p className="mk-doc__eyebrow">Important notice</p>
        <h1>Disclaimer.</h1>
        <p className="mk-doc__lede">
          Exit Armor is an AI-powered educational resource. It is not a substitute for
          licensed legal, financial, tax, or medical advice. Please read this page
          carefully before relying on anything you read in our product or on this site.
        </p>

        <h2>No professional advice</h2>
        <p>
          Nothing on this website or in the Exit Armor product constitutes legal advice,
          financial advice, tax advice, or medical advice. The content is general in
          nature, based on publicly available information, and may not reflect recent
          changes in the law, regulatory guidance, or your specific factual
          circumstances.
        </p>
        <p>
          We are not lawyers, accountants, financial advisors, insurance brokers, or
          human resources professionals, and we are not holding ourselves out as such.
          No attorney-client relationship, fiduciary relationship, or any other
          professional relationship is created by your use of Exit Armor, by your
          purchase of the product, or by any communication you have with us.
        </p>

        <h2>Use at your own risk</h2>
        <p>
          You are solely responsible for any decisions you make based on information
          from Exit Armor. The checklists, templates, scripts, state summaries, and
          negotiation suggestions are offered as educational starting points only. You
          should consult a licensed professional &mdash; ideally an employment attorney
          in your state &mdash; before signing a separation agreement, filing a legal
          claim, making a healthcare coverage decision, or taking any other action with
          legal or financial consequences.
        </p>

        <h2>State-specific information</h2>
        <p>
          Exit Armor includes summaries of labor and employment law across all 50 US
          states and the District of Columbia. These summaries are high-level,
          plain-language descriptions intended for general orientation. State law
          varies, changes, and is often interpreted differently by different courts.
          Our summaries cannot anticipate every fact pattern, and they are not kept
          current in real time. Always verify deadlines, dollar thresholds, and legal
          requirements with your state's Department of Labor, workforce agency, or a
          licensed attorney in your jurisdiction before taking action.
        </p>

        <h2>No guarantees on outcomes</h2>
        <p>
          Exit Armor does not guarantee any particular outcome &mdash; including the
          amount of severance you will receive, the length of time you will be
          unemployed, the results of a negotiation, the success of an unemployment
          claim, the enforceability or unenforceability of any contract clause, or the
          cost or availability of any healthcare coverage. Your results depend on many
          factors outside our control: your specific employer, your tenure, your role,
          your state, your negotiation skills, the broader labor market, and the
          particular facts of your situation.
        </p>

        <h2>AI-generated guidance</h2>
        <p>
          Portions of Exit Armor may use artificial intelligence to personalize
          checklists, draft correspondence, or answer follow-up questions. AI systems
          can make mistakes, omit material information, hallucinate facts, or produce
          content that sounds confident but is wrong. You must independently verify any
          AI-generated output before relying on it. Do not submit any communication
          drafted by AI &mdash; whether for HR, unemployment agencies, or legal
          counterparties &mdash; without reading it carefully and, where appropriate,
          having it reviewed by a licensed attorney.
        </p>

        <h2>Time-sensitive deadlines</h2>
        <p>
          Many of the legal and financial processes discussed in Exit Armor have strict
          deadlines &mdash; for example, the 21 or 45-day review window under the Older
          Workers Benefit Protection Act, the 60-day COBRA election window, state-level
          unemployment filing deadlines, and statutes of limitations for discrimination
          claims. Missing these deadlines can permanently waive your rights. Do not
          rely on Exit Armor alone to track these deadlines. Confirm every date with
          the actual source document you received from your employer and, if
          appropriate, with a licensed attorney.
        </p>

        <h2>Third-party links and resources</h2>
        <p>
          Exit Armor links to government websites, nonprofit resources, and commercial
          services operated by third parties. We are not responsible for the content,
          accuracy, privacy practices, or availability of any third-party site or
          service. A link is not an endorsement.
        </p>

        <h2>Limitation of liability</h2>
        <p>
          To the fullest extent permitted by law, Exit Armor and its operators shall
          not be liable for any direct, indirect, incidental, special, consequential,
          or punitive damages arising from your use of, or inability to use, the
          product or website, including but not limited to lost severance, lost wages,
          missed deadlines, adverse legal outcomes, or emotional distress.
        </p>

        <h2>When in doubt, ask a human</h2>
        <p>
          If you are navigating a severance offer above $20,000, a potential
          discrimination or retaliation claim, equity worth more than a few thousand
          dollars, an employer accused of WARN Act violations, or any situation
          involving disability, FMLA, workers' compensation, or harassment: please
          consult a licensed employment attorney. Many state bar associations offer
          free lawyer referral services, and organizations like the National Employment
          Lawyers Association (NELA) maintain directories of attorneys who offer free
          initial consultations. Exit Armor links to several of these resources inside
          the product.
        </p>

        <p style={{ marginTop: '3rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          By using Exit Armor, you acknowledge that you have read, understood, and
          agreed to this disclaimer. See our <Link to="/terms">Terms of Service</Link>{' '}
          and <Link to="/privacy">Privacy Policy</Link> for more details.
        </p>
      </article>
    </MarketingLayout>
  );
}
