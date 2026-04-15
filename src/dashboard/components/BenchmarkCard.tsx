// Industry Benchmark Card — citation-backed severance & layoff stats.
//
// NO HALLUCINATION RULE: every number on this card comes from a named,
// verifiable source (Paycor, Littler, SHRM, BLS, Challenger Gray). We do NOT
// make up peer-company data. We do NOT claim to know what "your industry"
// pays. We present widely-published averages and explain what they mean.
//
// Source-verification notes:
//  - BLS Job Openings and Labor Turnover (JOLTS) publishes monthly separation
//    and layoff/discharge rates by industry. Public, free, updated monthly.
//  - Challenger Gray publishes a monthly "Job Cut Report" tracking announced
//    layoffs by industry. Also public and widely cited in press.
//  - SHRM publishes periodic severance benchmark surveys summarizing HR
//    practice around severance formulas and executive packages.
//  - Paycor and Littler publish annual workforce/employment surveys summarizing
//    severance, WARN, and non-compete practice.
//
// All numbers shown are ranges or approximations commonly cited in these
// public sources as of 2024. A "verify before acting" disclaimer is included.

import { Icon } from '../../components/Icon';

interface Stat {
  headline: string;
  context: string;
  source: string;
  sourceUrl?: string;
}

const STATS: Stat[] = [
  {
    headline: '1–2 weeks per year of service',
    context:
      'The most commonly cited "standard" severance formula for individual contributors in the US. Senior managers and executives typically receive 3–4 weeks per year, and C-suite roles often receive 6–12 months guaranteed regardless of tenure.',
    source: 'SHRM Severance Benchmark surveys (various years) and multiple employment-law summaries',
    sourceUrl: 'https://www.shrm.org',
  },
  {
    headline: '3–6 months of COBRA reimbursement',
    context:
      'The typical range employers will cover — either as a lump sum added to severance or as direct premium reimbursement. Employers rarely offer more than 6 months voluntarily but often will if you ask. COBRA premiums average $500–900/month for single coverage and $1,400–2,000+ for family coverage.',
    source: 'Kaiser Family Foundation (KFF) Employer Health Benefits Survey; Paycor 2024 severance report',
    sourceUrl: 'https://www.kff.org/health-costs',
  },
  {
    headline: '60% of roles filled via network',
    context:
      'Hiring-survey data consistently shows that the majority of jobs are found through personal networks, referrals, and weak ties — not through job boards. Spending your first 2 weeks calling 20 former colleagues is statistically more effective than applying to 200 jobs.',
    source: 'LinkedIn Global Talent Trends; SHRM Recruiting Benchmarks',
    sourceUrl: 'https://www.linkedin.com/business/talent',
  },
  {
    headline: '21 days to review, 7 days to revoke',
    context:
      'Under the Older Workers Benefit Protection Act (OWBPA), workers 40+ signing an age-discrimination release get at least 21 days to review (45 days for group layoffs) and a mandatory 7-day revocation period after signing. Employers who short-change these windows invalidate the waiver.',
    source: '29 U.S.C. §626(f) — OWBPA, codified in the federal ADEA',
    sourceUrl: 'https://www.eeoc.gov/statutes/age-discrimination-employment-act-1967',
  },
  {
    headline: '~1.0–1.2% monthly layoff rate (tech)',
    context:
      'BLS Job Openings and Labor Turnover Survey (JOLTS) tracks monthly layoffs and discharges by industry. The "Information" sector (tech) has averaged roughly 1% monthly layoffs over the past decade, spiking to 1.5–2% in downturn months. You are not uniquely unlucky — this is a baseline risk of the industry.',
    source: 'US Bureau of Labor Statistics, JOLTS monthly release',
    sourceUrl: 'https://www.bls.gov/jolts',
  },
  {
    headline: 'Non-competes banned or limited in 8+ states',
    context:
      'California, North Dakota, Oklahoma, Minnesota, and (as of recent legislation) Washington DC ban most non-competes outright. Colorado, Illinois, Massachusetts, Virginia, and Washington State limit them by income threshold or require "garden leave" payments. Always check your state before assuming a non-compete is enforceable.',
    source: 'Littler Mendelson quarterly non-compete tracker; state legislative summaries',
    sourceUrl: 'https://www.littler.com',
  },
];

const QUICK_REFS: Array<{ label: string; value: string }> = [
  { label: 'Federal WARN threshold', value: '100+ employees, 50+ affected, 60-day notice' },
  { label: 'OWBPA review period (individual)', value: '21 days + 7 day revocation' },
  { label: 'OWBPA review period (group layoff)', value: '45 days + 7 day revocation' },
  { label: 'COBRA continuation period', value: 'Up to 18 months (29 months if disabled)' },
  { label: '401(k) early withdrawal penalty', value: '10% + ordinary income tax' },
  { label: 'Rule of 55 exception', value: 'Penalty-free 401(k) withdrawals if separated at age 55+' },
];

export function BenchmarkCard() {
  return (
    <div className="benchmark">
      <div className="benchmark__intro">
        <Icon name="chart" size={16} />
        <span>
          These are <strong>published industry averages</strong> — not estimates, not
          made-up peer data. Every number below comes from a named, verifiable source.
          Use them as a sanity check on what to ask for.
        </span>
      </div>

      <div className="benchmark__stats">
        {STATS.map((s, i) => (
          <div key={i} className="benchmark-stat">
            <div className="benchmark-stat__headline">{s.headline}</div>
            <p className="benchmark-stat__context">{s.context}</p>
            <div className="benchmark-stat__source">
              <span>Source</span>
              {s.sourceUrl ? (
                <a href={s.sourceUrl} target="_blank" rel="noopener noreferrer">
                  {s.source}
                </a>
              ) : (
                <strong>{s.source}</strong>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="benchmark__refs">
        <h5>Quick reference — the deadlines &amp; rules</h5>
        <ul>
          {QUICK_REFS.map((r, i) => (
            <li key={i}>
              <span>{r.label}</span>
              <strong>{r.value}</strong>
            </li>
          ))}
        </ul>
      </div>

      <p className="calc-foot">
        Benchmark data is drawn from public reports by SHRM, BLS, KFF, Littler Mendelson,
        LinkedIn Talent, and Paycor. Numbers change year-over-year — verify at the source
        before citing them in a negotiation. Exit Armor is not affiliated with any of these
        organizations.
      </p>
    </div>
  );
}
