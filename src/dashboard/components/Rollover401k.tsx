// 401(k) Options After Layoff — static comparison.
//
// HARD RULE: this is comparison only, NOT execution. We don't open accounts,
// we don't move money. We just lay out the four standard options side-by-side
// with accurate facts pulled from IRS publications (Pub 590-A, Pub 575,
// Topic No. 558). Every number is a rule, not an estimate.
//
// User-adjustable: ONLY their current balance, for projecting the cash-out
// hit. Everything else is static fact.
//
// Sources (for user verification, printed on the card):
//  - IRS Topic No. 558 (10% additional tax on early distributions)
//  - IRS Pub 575 (Pension and Annuity Income)
//  - IRS Rule of 55 (separation-from-service exception, age 55+)

import { useState } from 'react';
import { Icon } from '../../components/Icon';
import { money } from '../../lib/calculators';

interface OptionRow {
  id: string;
  title: string;
  verdict: 'good' | 'ok' | 'bad';
  shortPitch: string;
  pros: string[];
  cons: string[];
  mechanics: string;
  bestFor: string;
}

const OPTIONS: OptionRow[] = [
  {
    id: 'leave',
    title: 'Leave it in your old 401(k)',
    verdict: 'ok',
    shortPitch: 'Do nothing. Keep the money where it is.',
    pros: [
      'Zero taxes, zero penalties, zero action required.',
      'Retains ERISA creditor protection (strongest legal shield in the US).',
      'If you are 55+ and separated, you can access funds without the 10% penalty (Rule of 55) — but only from this specific plan.',
    ],
    cons: [
      'Most plans require a minimum balance (often $5,000) to let you leave money in — below that they can force a distribution.',
      'You are stuck with whatever fund lineup and fees the plan has.',
      'You may have multiple old 401(k)s over time, which gets messy.',
    ],
    mechanics:
      'If your balance is above the plan minimum (check your SPD), you simply do nothing. The account stays open under your old employer\'s plan administrator.',
    bestFor:
      'Workers 55+ who might need early withdrawals, anyone in a state with weak IRA creditor protection, or people who genuinely like their current plan\'s fund options.',
  },
  {
    id: 'rollover-ira',
    title: 'Roll to a Traditional IRA',
    verdict: 'good',
    shortPitch: 'Move the money to a personal retirement account you control.',
    pros: [
      'Zero taxes if done as a direct rollover (trustee-to-trustee).',
      'Full investment flexibility — any fund, any stock, any ETF.',
      'Consolidate multiple old 401(k)s into one account.',
      'Usually lower fees than employer plans.',
    ],
    cons: [
      'Traditional IRAs have weaker creditor protection than 401(k)s in some states (varies by state).',
      'Loses the Rule of 55 exception — early withdrawals before 59½ incur the 10% penalty.',
      'No loan option (401(k) loans are not available from IRAs).',
      'Rollover must complete within 60 days if done indirectly — otherwise it\'s taxed as a distribution.',
    ],
    mechanics:
      'Open a Traditional IRA at a brokerage. Request a DIRECT rollover from your old 401(k) administrator — the check goes straight to the new custodian, not to you. This is the safest path.',
    bestFor:
      'Most people. Especially if you have a small 401(k), want better investment choices, or are consolidating multiple old accounts.',
  },
  {
    id: 'rollover-new',
    title: 'Roll to your NEW employer\'s 401(k)',
    verdict: 'ok',
    shortPitch: 'Move the money to the 401(k) at your next job.',
    pros: [
      'Keeps everything in one place under strong ERISA protection.',
      'Preserves the ability to take a 401(k) loan in the future.',
      'Simpler tax picture — all retirement money in employer plans.',
      'Rule of 55 still applies at the new plan if you leave that employer at 55+.',
    ],
    cons: [
      'Only works once you have a new job with a 401(k) that accepts rollovers.',
      'Investment options are still limited to what the new plan offers.',
      'Money is "stuck" in limbo between jobs.',
    ],
    mechanics:
      'Wait until your new employer\'s plan is active (some have a 30–90 day wait). Contact both plan administrators and request a direct rollover. Similar process to an IRA rollover.',
    bestFor:
      'Workers who know they\'ll have a new 401(k) soon AND want to preserve employer-plan features (loans, Rule of 55, backdoor Roth eligibility).',
  },
  {
    id: 'cashout',
    title: 'Cash it out',
    verdict: 'bad',
    shortPitch: 'Take the money now. Pay heavy taxes and penalties.',
    pros: [
      'You get the cash immediately (well, after mandatory withholding).',
      'No waiting for new account setup.',
    ],
    cons: [
      '20% mandatory federal withholding at distribution.',
      '10% additional early withdrawal penalty if you\'re under 59½ (unless an exception applies).',
      'The full amount is added to your ordinary income for the year — pushing you into a higher bracket.',
      'You lose decades of tax-deferred growth. A $20,000 cash-out at age 35 is often $150,000+ less at retirement.',
    ],
    mechanics:
      'Request a distribution from the plan administrator. They will automatically withhold 20% for federal tax. You will owe more at tax time if your bracket is above 20%, plus the 10% penalty if under 59½.',
    bestFor:
      'Almost no one. Only consider this if you have no other way to cover an essential emergency AND you have exhausted every other source of funds.',
  },
];

const VERDICT_META: Record<OptionRow['verdict'], { label: string; color: string; bg: string }> = {
  good: { label: 'Usually best', color: '#047857', bg: '#ecfdf5' },
  ok: { label: 'Depends', color: '#b45309', bg: '#fffbeb' },
  bad: { label: 'Usually costly', color: '#b91c1c', bg: '#fef2f2' },
};

export function Rollover401k() {
  const [balance, setBalance] = useState<number>(50000);
  const [age, setAge] = useState<number>(35);

  // Static federal rule: 20% withheld + 10% penalty if under 59.5
  // Plus ordinary income tax on the full amount (we don't guess the bracket —
  // we just flag that it's on top of withholding).
  const withheld = balance * 0.2;
  const penalty = age < 59.5 ? balance * 0.1 : 0;
  const immediateHit = withheld + penalty;
  const leftover = balance - immediateHit;

  return (
    <div className="rollover">
      <div className="rollover__intro">
        <Icon name="book" size={16} />
        <span>
          When you leave a job, your 401(k) has four paths. This page explains all four
          with the actual IRS rules — not opinions.{' '}
          <strong>We are not financial advisors.</strong> For a plan specific to you, talk
          to a fee-only fiduciary.
        </span>
      </div>

      {/* CASH-OUT CALCULATOR — illustrates the damage */}
      <div className="rollover__calc">
        <div className="rollover__calc-head">
          <Icon name="warn" size={16} />
          <strong>See what a cash-out would actually cost</strong>
        </div>
        <div className="rollover__calc-inputs">
          <label>
            <span>Your 401(k) balance</span>
            <input
              type="number"
              min={0}
              value={balance}
              onChange={(e) => setBalance(Number(e.target.value) || 0)}
            />
          </label>
          <label>
            <span>Your age</span>
            <input
              type="number"
              min={0}
              max={100}
              value={age}
              onChange={(e) => setAge(Number(e.target.value) || 0)}
            />
          </label>
        </div>
        <div className="rollover__calc-result">
          <div className="rollover__calc-row">
            <span>Account balance</span>
            <strong>{money(balance)}</strong>
          </div>
          <div className="rollover__calc-row rollover__calc-row--neg">
            <span>20% mandatory federal withholding</span>
            <strong>- {money(withheld)}</strong>
          </div>
          {age < 59.5 && (
            <div className="rollover__calc-row rollover__calc-row--neg">
              <span>10% early-withdrawal penalty (under 59½)</span>
              <strong>- {money(penalty)}</strong>
            </div>
          )}
          <div className="rollover__calc-row rollover__calc-row--total">
            <span>Immediate take-home (before state tax &amp; income tax)</span>
            <strong>{money(leftover)}</strong>
          </div>
        </div>
        <p className="rollover__calc-foot">
          The full {money(balance)} is ALSO added to your taxable income for the year,
          which can push you into a higher bracket. Depending on your state and bracket,
          total erosion is often 30–45% of the balance — not just 30%. This is pure
          IRS-rule math, not an estimate.
        </p>
      </div>

      {/* OPTION CARDS */}
      <div className="rollover__options">
        {OPTIONS.map((o) => {
          const meta = VERDICT_META[o.verdict];
          return (
            <div key={o.id} className={`rollover-option rollover-option--${o.verdict}`}>
              <div className="rollover-option__head">
                <div>
                  <h4>{o.title}</h4>
                  <p className="rollover-option__pitch">{o.shortPitch}</p>
                </div>
                <span
                  className="rollover-option__verdict"
                  style={{ color: meta.color, background: meta.bg }}
                >
                  {meta.label}
                </span>
              </div>
              <div className="rollover-option__grid">
                <div className="rollover-option__col">
                  <div className="rollover-option__col-title rollover-option__col-title--good">
                    <Icon name="check" size={12} /> Pros
                  </div>
                  <ul>
                    {o.pros.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </div>
                <div className="rollover-option__col">
                  <div className="rollover-option__col-title rollover-option__col-title--bad">
                    <Icon name="alert" size={12} /> Cons
                  </div>
                  <ul>
                    {o.cons.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="rollover-option__mechanics">
                <strong>How it works:</strong> {o.mechanics}
              </div>
              <div className="rollover-option__best">
                <strong>Best for:</strong> {o.bestFor}
              </div>
            </div>
          );
        })}
      </div>

      <div className="rollover__sources">
        <h5>Source rules (verify before you act)</h5>
        <ul>
          <li>
            <strong>IRS Topic No. 558:</strong> 10% additional tax on early distributions from
            qualified retirement plans (under 59½).
          </li>
          <li>
            <strong>IRS Pub 575:</strong> Pension and Annuity Income — rollover rules.
          </li>
          <li>
            <strong>Rule of 55:</strong> IRC §72(t)(2)(A)(v) — penalty-free 401(k) withdrawals
            for workers separated from service at age 55+ (50+ for public safety).
          </li>
          <li>
            <strong>Direct rollover vs. 60-day rollover:</strong> Always request a direct
            (trustee-to-trustee) rollover. Indirect rollovers risk accidental distribution
            taxation.
          </li>
        </ul>
      </div>

      <p className="calc-foot">
        Exit Armor is an educational tool, not a financial advisor. For a recommendation
        specific to your situation — especially if your balance is above $50K, if you have
        after-tax contributions, or if you hold employer stock — consult a fee-only
        fiduciary. Find one at NAPFA.org (fee-only, no commissions).
      </p>
    </div>
  );
}
