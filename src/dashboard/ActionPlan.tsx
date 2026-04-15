// Printable 1-page Action Plan — the tangible deliverable a user takes away.
//
// Reads everything from localStorage (profile + severance.calc + budget.runway)
// and renders a print-optimized layout. Users hit "Save as PDF" which just
// calls window.print() — no PDF library dependency.
//
// The @media print block in dashboard.css hides navigation chrome and
// tightens margins for clean 8.5x11 output.

import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { EMAIL_TEMPLATES } from '../data/emailTemplates';
import {
  DEFAULT_SEVERANCE_INPUT,
  calculateRunway,
  estimateSeverance,
  estimateUnemployment,
  money,
  runwayLabel,
} from '../lib/calculators';
import type { RunwayInput, SeveranceInput } from '../lib/calculators';
import { UI_DATA_AS_OF } from '../data/states';
import { loadJSON, personalize } from '../lib/storage';
import type { UserProfile } from '../lib/storage';
import { EMPTY_PROFILE } from '../lib/storage';
import './dashboard.css';
import './action-plan.css';

const DEFAULT_RUNWAY: RunwayInput = {
  rent: 1800,
  food: 600,
  insurance: 350,
  utilities: 220,
  debt: 400,
  other: 250,
  discretionary: 300,
  monthlyIncome: 0,
  savings: 12000,
};

export default function ActionPlan() {
  const profile = loadJSON<UserProfile>('profile', EMPTY_PROFILE);
  const severanceInput = loadJSON<SeveranceInput>('severance.calc', DEFAULT_SEVERANCE_INPUT);
  const runwayInput = loadJSON<RunwayInput>('budget.runway', DEFAULT_RUNWAY);

  const severance = useMemo(() => estimateSeverance(severanceInput), [severanceInput]);
  const runway = useMemo(() => calculateRunway(runwayInput), [runwayInput]);
  const ui = useMemo(
    () => estimateUnemployment(severanceInput.annualSalary, severanceInput.stateCode),
    [severanceInput.annualSalary, severanceInput.stateCode]
  );

  const counterTemplate = EMAIL_TEMPLATES.find((t) => t.id === 'leverage');
  const counterSubject = counterTemplate ? personalize(counterTemplate.subject, profile) : '';
  const counterBody = counterTemplate ? personalize(counterTemplate.body, profile) : '';

  const today = new Date().toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const firstName = profile.name ? profile.name.split(' ')[0] : 'Your';
  const displayName = profile.name || 'Your Name';

  return (
    <div className="ap-shell">
      {/* TOOLBAR — hidden on print */}
      <div className="ap-toolbar no-print">
        <Link to="/app" className="btn-pill">
          <Icon name="arrow" size={14} /> Back to dashboard
        </Link>
        <div className="ap-toolbar__spacer" />
        <button
          type="button"
          className="btn-pill btn-pill--primary"
          onClick={() => window.print()}
        >
          <Icon name="download" size={14} /> Save as PDF
        </button>
      </div>

      <article className="ap-page">
        {/* HEADER */}
        <header className="ap-header">
          <div className="ap-brand">
            <div className="ap-brand__mark">EA</div>
            <div>
              <div className="ap-brand__name">Exit Armor</div>
              <div className="ap-brand__tag">Personalized Severance Action Plan</div>
            </div>
          </div>
          <div className="ap-header__meta">
            <div><strong>Prepared for:</strong> {displayName}</div>
            {profile.company && <div><strong>Company:</strong> {profile.company}</div>}
            <div><strong>Date:</strong> {today}</div>
          </div>
        </header>

        {/* HERO SUMMARY */}
        <section className="ap-hero">
          <div className="ap-hero__card">
            <div className="ap-hero__label">Target package</div>
            <div className="ap-hero__value">{money(severance.totalTargetValue)}</div>
            <div className="ap-hero__sub">
              {severance.targetWeeks} weeks of base + COBRA + pro-rata bonus
            </div>
          </div>
          <div className="ap-hero__card">
            <div className="ap-hero__label">Range to negotiate</div>
            <div className="ap-hero__value">
              {money(severance.floorDollars)} – {money(severance.ceilingDollars)}
            </div>
            <div className="ap-hero__sub">
              Floor {severance.floorWeeks}w · Ceiling {severance.ceilingWeeks}w
            </div>
          </div>
          <div className="ap-hero__card">
            <div className="ap-hero__label">Runway today</div>
            <div className="ap-hero__value">
              {runwayLabel(runway.scenarios.current.months)}
            </div>
            <div className="ap-hero__sub">
              {money(runway.scenarios.current.monthlyBleed)}/mo bleed
            </div>
          </div>
          {severance.gapToTarget > 0 && (
            <div className="ap-hero__card ap-hero__card--warn">
              <div className="ap-hero__label">Gap to close</div>
              <div className="ap-hero__value">{money(severance.gapToTarget)}</div>
              <div className="ap-hero__sub">
                Current offer: {money(severance.currentOfferDollars)}
              </div>
            </div>
          )}
        </section>

        {/* TOP ASKS */}
        <section className="ap-section">
          <h2 className="ap-section__title">Your top {severance.asks.length} asks</h2>
          <p className="ap-section__sub">Ranked by dollar value. Lead with #1.</p>
          <ol className="ap-asks">
            {severance.asks.map((a, i) => (
              <li key={a.id}>
                <div className="ap-ask__num">{i + 1}</div>
                <div className="ap-ask__body">
                  <div className="ap-ask__head">
                    <strong>{a.title}</strong>
                    {a.dollarValue > 0 && (
                      <span className="ap-ask__amount">{money(a.dollarValue)}</span>
                    )}
                  </div>
                  <p>{a.rationale}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* RED FLAGS */}
        {severance.redFlags.length > 0 && (
          <section className="ap-section">
            <h2 className="ap-section__title">Watch-outs for your situation</h2>
            <ul className="ap-flags">
              {severance.redFlags.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </section>
        )}

        {/* STATE */}
        {severance.state && (
          <section className="ap-section">
            <h2 className="ap-section__title">{severance.state.name} specifics</h2>
            <div className="ap-state">
              <div>
                <span>Non-competes</span>
                <strong>
                  {severance.state.noncompeteAllowed ? 'Allowed (with limits)' : 'Largely banned'}
                </strong>
              </div>
              <div>
                <span>PTO payout</span>
                <strong>
                  {severance.state.ptoPayoutRequired === 'yes'
                    ? 'Required'
                    : severance.state.ptoPayoutRequired === 'conditional'
                    ? 'Conditional'
                    : 'Not required'}
                </strong>
              </div>
              <div>
                <span>Mini-WARN</span>
                <strong>{severance.state.warnThreshold}+ employees</strong>
              </div>
              <div>
                <span>File for UI</span>
                <strong className="ap-state__link">{severance.state.unemploymentUrl}</strong>
              </div>
            </div>
            <p className="ap-state__notes">{severance.state.notes}</p>
          </section>
        )}

        {/* RUNWAY */}
        <section className="ap-section">
          <h2 className="ap-section__title">Your 90-day runway</h2>
          <div className="ap-runway">
            <div className="ap-runway__card">
              <span>Current spend</span>
              <strong>{runwayLabel(runway.scenarios.current.months)}</strong>
              <small>{money(runway.scenarios.current.monthlyBleed)}/mo</small>
            </div>
            <div className="ap-runway__card">
              <span>Discretionary cut</span>
              <strong>{runwayLabel(runway.scenarios.cutDiscretionary.months)}</strong>
              <small>{money(runway.scenarios.cutDiscretionary.monthlyBleed)}/mo</small>
            </div>
            <div className="ap-runway__card">
              <span>Austerity mode</span>
              <strong>{runwayLabel(runway.scenarios.hardCut.months)}</strong>
              <small>{money(runway.scenarios.hardCut.monthlyBleed)}/mo</small>
            </div>
          </div>
          {runway.cuts.length > 0 && (
            <ul className="ap-cuts">
              {runway.cuts.slice(0, 5).map((c, i) => (
                <li key={i}>
                  <span>{c.label}</span>
                  <strong>+{money(c.monthlySavings)}/mo</strong>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* UNEMPLOYMENT BENEFITS */}
        {ui.state && ui.weeklyBenefit > 0 && (
          <section className="ap-section">
            <h2 className="ap-section__title">Your unemployment benefits</h2>
            <p className="ap-section__sub">
              Estimate for {ui.state.name} — verify at {ui.state.unemploymentUrl}
            </p>
            <div className="ap-runway">
              <div className="ap-runway__card">
                <span>Weekly benefit</span>
                <strong>{money(ui.weeklyBenefit)}</strong>
                <small>
                  {ui.cappedByState ? 'At state cap' : `~${Math.round(ui.replacementRate * 100)}% replacement`}
                </small>
              </div>
              <div className="ap-runway__card">
                <span>Max weeks</span>
                <strong>{ui.maxWeeks} weeks</strong>
                <small>Regular UI duration</small>
              </div>
              <div className="ap-runway__card">
                <span>Max total payout</span>
                <strong>{money(ui.totalMax)}</strong>
                <small>Weekly × max weeks</small>
              </div>
            </div>
            <p className="ap-state__notes">
              Estimate only — data vintage {UI_DATA_AS_OF}. Severance may delay or reduce
              benefits in some states. File the same week you're notified; most states do
              not backdate.
            </p>
          </section>
        )}

        {/* COUNTER EMAIL */}
        {counterTemplate && (
          <section className="ap-section ap-section--page-break">
            <h2 className="ap-section__title">Your counter-offer email</h2>
            <p className="ap-section__sub">
              Personalized and ready to send. Swap in your specific asks from the list above.
            </p>
            <div className="ap-email">
              <div className="ap-email__row">
                <span>Subject</span>
                <strong>{counterSubject}</strong>
              </div>
              <pre className="ap-email__body">{counterBody}</pre>
            </div>
          </section>
        )}

        {/* FOOTER */}
        <footer className="ap-footer">
          <p>
            <strong>{firstName}</strong> — this is your playbook. Read it once through before the
            HR call, then keep it open in a second tab.
          </p>
          <p className="ap-footer__legal">
            Exit Armor is an educational resource. Nothing in this plan is legal, financial, or
            tax advice. For severance above $20K, equity questions, or potential discrimination
            claims, consult a licensed employment attorney.
          </p>
          <p className="ap-footer__brand">exitarmor.com · Generated {today}</p>
        </footer>
      </article>
    </div>
  );
}
