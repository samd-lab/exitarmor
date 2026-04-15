// Personalized severance estimator UI.
//
// Reads/writes calculator inputs to localStorage under 'severance.calc' so
// they survive refreshes and are available to the Action Plan page.
//
// All math lives in src/lib/calculators.ts — this file is pure presentation.

import { useMemo } from 'react';
import { Icon } from '../../components/Icon';
import { STATES, UI_DATA_AS_OF } from '../../data/states';
import {
  DEFAULT_SEVERANCE_INPUT,
  LEVEL_OPTIONS,
  SIZE_OPTIONS,
  estimateSeverance,
  estimateUnemployment,
  money,
  moneyRange,
} from '../../lib/calculators';
import type {
  CompanySize,
  SeverLevel,
  SeveranceInput,
} from '../../lib/calculators';
import { usePersistentState, useProfile } from '../../lib/storage';

export function SeveranceCalculator() {
  const [profile] = useProfile();
  const [input, setInput] = usePersistentState<SeveranceInput>(
    'severance.calc',
    {
      ...DEFAULT_SEVERANCE_INPUT,
      // If profile has tenure years, seed it on first run
      tenureYears: profile.tenureYears
        ? Number(profile.tenureYears) || DEFAULT_SEVERANCE_INPUT.tenureYears
        : DEFAULT_SEVERANCE_INPUT.tenureYears,
    }
  );

  const result = useMemo(() => estimateSeverance(input), [input]);
  const ui = useMemo(
    () => estimateUnemployment(input.annualSalary, input.stateCode),
    [input.annualSalary, input.stateCode]
  );

  const update = <K extends keyof SeveranceInput>(k: K, v: SeveranceInput[K]) =>
    setInput({ ...input, [k]: v });

  // Progress to target — 0-100%
  const pctOfTarget =
    result.totalTargetValue > 0
      ? Math.min(100, Math.round((result.currentOfferDollars / result.totalTargetValue) * 100))
      : 0;
  const atOrAboveTarget = result.currentOfferDollars >= result.totalTargetValue;

  return (
    <div className="calc">
      {/* PREMIUM HERO */}
      <div className="calc-hero">
        <div className="calc-hero__body">
          <span className="calc-hero__eyebrow">
            <Icon name="spark" size={12} /> Personalized estimate
          </span>
          <h3 className="calc-hero__title">
            Your target severance package
          </h3>
          <p className="calc-hero__sub">
            Based on Paycor, Littler, and SHRM public benchmark data for your
            level, tenure, and company size. Everything below updates live as
            you edit. Nothing leaves your device.
          </p>
        </div>
        <div className="calc-hero__card">
          <div className="calc-hero__card-label">Total target value</div>
          <div className="calc-hero__card-value">{money(result.totalTargetValue)}</div>
          <div className="calc-hero__card-sub">
            {result.targetWeeks} weeks base + COBRA
            {result.bonusValue > 0 && ' + pro-rata bonus'}
          </div>
        </div>
      </div>

      {/* INPUTS */}
      <div className="calc-form">
        <div className="calc-field">
          <label>Annual base salary</label>
          <div className="calc-field__prefix">
            <span>$</span>
            <input
              type="number"
              min={0}
              step={1000}
              value={input.annualSalary}
              onChange={(e) => update('annualSalary', Number(e.target.value) || 0)}
            />
          </div>
        </div>

        <div className="calc-field">
          <label>Tenure (years of service)</label>
          <input
            type="number"
            min={0}
            step={0.5}
            value={input.tenureYears}
            onChange={(e) => update('tenureYears', Number(e.target.value) || 0)}
          />
        </div>

        <div className="calc-field">
          <label>Your level</label>
          <select
            value={input.level}
            onChange={(e) => update('level', e.target.value as SeverLevel)}
          >
            {LEVEL_OPTIONS.map((l) => (
              <option key={l.id} value={l.id}>
                {l.label} — {l.sub}
              </option>
            ))}
          </select>
        </div>

        <div className="calc-field">
          <label>Company size</label>
          <select
            value={input.companySize}
            onChange={(e) => update('companySize', e.target.value as CompanySize)}
          >
            {SIZE_OPTIONS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        <div className="calc-field">
          <label>State (for non-compete, PTO &amp; UI rules)</label>
          <select
            value={input.stateCode}
            onChange={(e) => update('stateCode', e.target.value)}
          >
            {STATES.map((s) => (
              <option key={s.code} value={s.code}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <div className="calc-field">
          <label>Weeks of severance in your current offer</label>
          <input
            type="number"
            min={0}
            step={1}
            value={input.currentOfferWeeks}
            onChange={(e) =>
              update('currentOfferWeeks', Number(e.target.value) || 0)
            }
          />
        </div>

        <div className="calc-toggles">
          <label className="calc-toggle">
            <input
              type="checkbox"
              checked={input.ageOver40}
              onChange={(e) => update('ageOver40', e.target.checked)}
            />
            <span>I'm 40 or older (OWBPA protections apply)</span>
          </label>
          <label className="calc-toggle">
            <input
              type="checkbox"
              checked={input.hasBonus}
              onChange={(e) => update('hasBonus', e.target.checked)}
            />
            <span>I have an annual bonus on my offer letter</span>
          </label>
          <label className="calc-toggle">
            <input
              type="checkbox"
              checked={input.hasEquity}
              onChange={(e) => update('hasEquity', e.target.checked)}
            />
            <span>I have unvested equity / stock options</span>
          </label>
        </div>
      </div>

      {/* RESULTS */}
      <div className="calc-results">
        <h4 className="calc-results__title">
          Your personalized estimate
        </h4>
        <div className="calc-bands">
          <div className="calc-band calc-band--floor">
            <div className="calc-band__label">Floor</div>
            <div className="calc-band__amount">{money(result.floorDollars)}</div>
            <div className="calc-band__weeks">{result.floorWeeks} weeks</div>
            <div className="calc-band__hint">Bare-minimum market rate</div>
          </div>
          <div className="calc-band calc-band--target">
            <div className="calc-band__label">Target</div>
            <div className="calc-band__amount">{money(result.targetDollars)}</div>
            <div className="calc-band__weeks">{result.targetWeeks} weeks</div>
            <div className="calc-band__hint">What to ask for</div>
          </div>
          <div className="calc-band calc-band--ceiling">
            <div className="calc-band__label">Ceiling</div>
            <div className="calc-band__amount">{money(result.ceilingDollars)}</div>
            <div className="calc-band__weeks">{result.ceilingWeeks} weeks</div>
            <div className="calc-band__hint">Best case with leverage</div>
          </div>
        </div>

        {/* Progress-to-target bar (premium polish) */}
        {result.currentOfferDollars > 0 && (
          <div className="calc-progress">
            <div className="calc-progress__head">
              <span className="calc-progress__label">
                Your offer vs. target package
              </span>
              <span className="calc-progress__pct">{pctOfTarget}%</span>
            </div>
            <div className="calc-progress__bar">
              <div
                className={`calc-progress__fill ${atOrAboveTarget ? 'calc-progress__fill--good' : ''}`}
                style={{ width: `${pctOfTarget}%` }}
              />
            </div>
            <div className="calc-progress__foot">
              <span>Offer {money(result.currentOfferDollars)}</span>
              <span>Target {money(result.totalTargetValue)}</span>
            </div>
          </div>
        )}

        <div className="calc-totalrow">
          <div>
            <div className="calc-totalrow__label">Total target package</div>
            <div className="calc-totalrow__value">
              {money(result.totalTargetValue)}
            </div>
            <div className="calc-totalrow__detail">
              {money(result.targetDollars)} base
              {result.bonusValue > 0 && ` + ${money(result.bonusValue)} pro-rata bonus`}
              {` + ${money(result.cobraValue)} COBRA`}
            </div>
          </div>
          {result.gapToTarget > 0 ? (
            <div className="calc-totalrow__gap">
              <div className="calc-totalrow__label">Gap to target</div>
              <div className="calc-totalrow__value calc-totalrow__value--warn">
                {money(result.gapToTarget)}
              </div>
              <div className="calc-totalrow__detail">
                Your current offer: {money(result.currentOfferDollars)}
              </div>
            </div>
          ) : (
            <div className="calc-totalrow__gap">
              <div className="calc-totalrow__label">Current offer</div>
              <div className="calc-totalrow__value calc-totalrow__value--good">
                {money(result.currentOfferDollars)}
              </div>
              <div className="calc-totalrow__detail">
                You're at or above target — still ask for the non-base items.
              </div>
            </div>
          )}
        </div>

        {/* UNEMPLOYMENT ESTIMATE — feeds from state dropdown above */}
        {ui.state && ui.weeklyBenefit > 0 && (
          <div className="calc-ui">
            <h4 className="calc-ui__title">
              <Icon name="dollar" size={16} />
              Your estimated unemployment benefits in {ui.state.name}
            </h4>
            <div className="calc-ui__grid">
              <div className="calc-ui__cell">
                <div className="calc-ui__cell-label">Weekly benefit</div>
                <div className="calc-ui__cell-value">{money(ui.weeklyBenefit)}</div>
                <div className="calc-ui__cell-sub">
                  {ui.cappedByState ? `Capped at ${ui.state.name}'s max` : `~${Math.round(ui.replacementRate * 100)}% wage replacement`}
                </div>
              </div>
              <div className="calc-ui__cell">
                <div className="calc-ui__cell-label">Max duration</div>
                <div className="calc-ui__cell-value">{ui.maxWeeks} weeks</div>
                <div className="calc-ui__cell-sub">Typical regular UI max</div>
              </div>
              <div className="calc-ui__cell">
                <div className="calc-ui__cell-label">Max total payout</div>
                <div className="calc-ui__cell-value calc-ui__cell-value--big">{money(ui.totalMax)}</div>
                <div className="calc-ui__cell-sub">Weekly × max weeks</div>
              </div>
            </div>
            <p className="calc-ui__foot">
              Verify your exact amount at your state DOL portal:{' '}
              <a href={ui.state.unemploymentUrl} target="_blank" rel="noopener noreferrer">
                {ui.state.unemploymentUrl}
              </a>
            </p>
            <div className="calc-ui__disclaimer">
              <strong>Estimate only.</strong> Uses 50% of weekly wages capped at {ui.state.name}'s
              maximum weekly benefit of {money(ui.state.maxWeeklyBenefit)}. Your actual benefit
              depends on your high-quarter wages, dependents, and severance offset rules. Severance
              pay may delay or reduce benefits in some states — check your state's rules before
              filing. Data vintage: <strong>{UI_DATA_AS_OF}</strong>. Not a benefits determination.
            </div>
          </div>
        )}

        {result.asks.length > 0 && (
          <>
            <h4 className="calc-results__title" style={{ marginTop: '1.4rem' }}>
              Your top {result.asks.length} asks, ranked by dollar value
            </h4>
            <ol className="calc-asks">
              {result.asks.map((a, i) => (
                <li key={a.id} className="calc-ask">
                  <div className="calc-ask__num">{i + 1}</div>
                  <div className="calc-ask__body">
                    <div className="calc-ask__head">
                      <strong>{a.title}</strong>
                      {a.dollarValue > 0 && (
                        <span className="calc-ask__amount">{money(a.dollarValue)}</span>
                      )}
                    </div>
                    <p>{a.rationale}</p>
                  </div>
                </li>
              ))}
            </ol>
          </>
        )}

        {result.redFlags.length > 0 && (
          <div className="calc-flags">
            <div className="calc-flags__title">
              <Icon name="shield" size={16} /> Watch-outs for your situation
            </div>
            <ul>
              {result.redFlags.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>
        )}

        {result.state && (
          <div className="calc-state">
            <div className="calc-state__title">
              <Icon name="map" size={16} /> {result.state.name} specifics
            </div>
            <div className="calc-state__grid">
              <div>
                <span>Non-competes</span>
                <strong>
                  {result.state.noncompeteAllowed ? 'Allowed (with limits)' : 'Largely banned'}
                </strong>
              </div>
              <div>
                <span>PTO payout required</span>
                <strong>
                  {result.state.ptoPayoutRequired === 'yes'
                    ? 'Yes'
                    : result.state.ptoPayoutRequired === 'conditional'
                    ? 'Conditional'
                    : 'No'}
                </strong>
              </div>
              <div>
                <span>Mini-WARN threshold</span>
                <strong>{result.state.warnThreshold}+ employees</strong>
              </div>
            </div>
            <p className="calc-state__notes">{result.state.notes}</p>
          </div>
        )}

        <p className="calc-foot">
          Not legal or financial advice. Estimate based on public benchmarks. Typical range for your
          profile: <strong>{moneyRange(result.floorDollars, result.ceilingDollars)}</strong>.
        </p>
      </div>
    </div>
  );
}
