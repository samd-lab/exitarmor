// Attorney Directory — safe, hallucination-free legal resource finder.
//
// LEGAL SAFETY POLICY:
// 1) We ONLY link to nationally known, verifiable resources that have
//    existed in their current form for years (NELA, ABA, EEOC, DOL).
// 2) We do NOT list specific attorneys, law firms, or fabricated state bar
//    URLs — those would rot and create liability.
// 3) We tell the user exactly what to do: (a) start at NELA for employment
//    lawyers, (b) use ABA's lookup for general lawyer referral, (c) file
//    with the EEOC/state DOL for discrimination claims.
// 4) Every resource below has been in operation for 10+ years and is
//    publicly documented. These are NOT invented.

import { Icon } from '../../components/Icon';

interface Resource {
  title: string;
  url: string;
  blurb: string;
  cost: string;
  when: string;
}

const RESOURCES: Resource[] = [
  {
    title: 'NELA — National Employment Lawyers Association',
    url: 'https://www.nela.org/find-a-lawyer',
    blurb:
      'The largest professional association of lawyers who represent WORKERS (not employers) in employment matters. Their "Find a Lawyer" directory covers all 50 states and is the gold standard for severance, wrongful termination, and discrimination cases.',
    cost: 'Free to search. First consult is typically free or low-cost (attorney discretion).',
    when: 'Start here for severance review, wrongful termination, non-compete disputes, discrimination, retaliation, or wage theft.',
  },
  {
    title: 'ABA Free Legal Answers',
    url: 'https://abafreelegalanswers.org',
    blurb:
      'American Bar Association program offering free brief legal advice online for people under a certain income threshold. Covers civil matters including employment and benefits. Staffed by volunteer attorneys.',
    cost: 'Free (income-qualified).',
    when: 'Good first stop if you cannot afford a paid consult and want a qualified attorney to answer a specific question.',
  },
  {
    title: 'ABA Lawyer Referral Directory',
    url: 'https://www.americanbar.org/groups/legal_services/flh-home/flh-lawyer-referral-directory',
    blurb:
      'Official American Bar Association list of lawyer referral services. Each state has at least one vetted referral service; most charge $20–50 for a 30-minute initial consult with a screened attorney.',
    cost: 'Usually $0–50 for the referral + 30 minutes.',
    when: 'Use this if NELA does not have a match in your area, or if you need a non-employment attorney.',
  },
  {
    title: 'EEOC — file a discrimination charge',
    url: 'https://www.eeoc.gov/filing-charge-discrimination',
    blurb:
      'The Equal Employment Opportunity Commission enforces federal laws against workplace discrimination (age, race, sex, disability, religion, national origin, genetic info). You generally must file a charge with the EEOC before suing under federal anti-discrimination law.',
    cost: 'Free. No lawyer required to file.',
    when:
      'If you suspect your layoff was selected based on age (40+), race, sex, pregnancy, disability, or any other protected class. STRICT DEADLINE: typically 180 or 300 days from the action.',
  },
  {
    title: 'US Department of Labor — Wage & Hour Division',
    url: 'https://www.dol.gov/agencies/whd/contact/local-offices',
    blurb:
      'The DOL\'s Wage and Hour Division enforces federal wage, overtime, and final-paycheck rules (FLSA, FMLA). Each district office handles complaints about unpaid wages, PTO not paid out, or misclassification.',
    cost: 'Free.',
    when: 'Unpaid final wages, unpaid overtime, unreimbursed expenses, or PTO payout your state requires.',
  },
  {
    title: 'Legal Services Corporation (LSC) — find free legal aid',
    url: 'https://www.lsc.gov/about-lsc/what-legal-aid/get-legal-help',
    blurb:
      'LSC funds civil legal aid organizations in every US state and territory. These local nonprofits provide FREE legal help to low-income Americans on issues including employment, benefits, and consumer matters.',
    cost: 'Free (income-qualified).',
    when: 'If paid counsel is out of reach. Especially useful for UI denials, benefits appeals, and non-severance employment disputes.',
  },
];

const WHEN_TO_HIRE: Array<{ title: string; detail: string }> = [
  {
    title: 'Severance offer above $20,000',
    detail:
      'The cost of a 1-hour review ($300–500) is small compared to what a well-reviewed counter-offer can unlock. Attorneys routinely find 20–40% in additional value.',
  },
  {
    title: 'You are 40 years or older',
    detail:
      'OWBPA compliance is technical — missing the 21-day (or 45-day) review window, or the 7-day revocation period, can invalidate your waiver. An attorney catches this in minutes.',
  },
  {
    title: 'You believe you were laid off for a discriminatory reason',
    detail:
      'Age, race, sex, pregnancy, disability, religion, national origin, or retaliation for protected activity (whistleblowing, FMLA, workers\' comp). Time limits for filing are short.',
  },
  {
    title: 'You have a non-compete, non-solicit, or aggressive IP clause',
    detail:
      'A 2-year broad non-compete can cost you your next job. An attorney can usually negotiate it narrower or help you understand if it\'s even enforceable in your state.',
  },
  {
    title: 'You have equity, deferred comp, or a bonus in dispute',
    detail:
      'Vesting acceleration, stock option exercise windows, and deferred compensation (409A) are technical. Getting the language right matters.',
  },
  {
    title: 'HR has threatened to withhold severance if you negotiate',
    detail:
      'That is a significant escalation. Document the exact wording, date, and time. Call an attorney the same day — this is often unlawful retaliation.',
  },
];

export function AttorneyDirectory() {
  return (
    <div className="attorney">
      <div className="attorney__intro">
        <Icon name="scale" size={16} />
        <span>
          Exit Armor is NOT a law firm and CANNOT give you legal advice. Below are six free
          or low-cost ways to get a real attorney in front of your situation. Every link below
          points to a nationally recognized, long-running service — we do not fabricate local
          referrals.
        </span>
      </div>

      <h4 className="attorney__section-title">Free &amp; low-cost legal resources</h4>
      <div className="attorney__list">
        {RESOURCES.map((r) => (
          <a
            key={r.url}
            href={r.url}
            target="_blank"
            rel="noopener noreferrer"
            className="attorney-card"
          >
            <div className="attorney-card__head">
              <h5>{r.title}</h5>
              <span className="attorney-card__link">
                Open <Icon name="arrow" size={12} />
              </span>
            </div>
            <p className="attorney-card__blurb">{r.blurb}</p>
            <div className="attorney-card__meta">
              <div>
                <span>Cost</span>
                <strong>{r.cost}</strong>
              </div>
              <div>
                <span>When to use</span>
                <strong>{r.when}</strong>
              </div>
            </div>
          </a>
        ))}
      </div>

      <h4 className="attorney__section-title">When hiring an attorney is worth it</h4>
      <ul className="attorney__when">
        {WHEN_TO_HIRE.map((w, i) => (
          <li key={i}>
            <div className="attorney__when-bullet">
              <Icon name="check" size={12} />
            </div>
            <div>
              <strong>{w.title}</strong>
              <p>{w.detail}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="attorney__script">
        <h5>How to open a free 15-minute consult</h5>
        <p className="attorney__script-intro">
          Most employment attorneys offer a free 15-minute intake call. Here's a script
          that gets you to the answer fast:
        </p>
        <pre className="attorney__script-text">{`"Hi, I'm [name]. I was laid off on [date] from [company].
I was offered a severance package of [$X] with a [X]-day
deadline to sign. I'm concerned about:

  1. [Specific clause — e.g. the 2-year non-compete]
  2. [Specific ask — e.g. whether my 21-day window applies]
  3. [Optional — e.g. possible age-based selection]

Could you tell me if this is the kind of case your firm
reviews, and what a flat-fee review would cost?"`}</pre>
      </div>

      <p className="calc-foot">
        None of the resources above are affiliated with Exit Armor. We link to them because
        they are the most reliable, long-running public services for workers. Nothing on
        this page is legal advice.
      </p>
    </div>
  );
}
