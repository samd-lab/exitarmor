// Offer Compare — side-by-side 2-offer comparison.
//
// Zero hallucination policy: everything shown is pure math on user input.
// We don't fetch cost-of-living data, we don't estimate taxes, we don't
// recommend one offer over the other. We total what the user tells us
// and show the delta. Every calculation is transparent.
//
// Use case: worker has a current package + a counter-offer, OR two
// competing severance offers from the same company (rare), OR comparing
// their current compensation to a new job offer post-layoff.

import { useState, useMemo } from 'react';
import { Icon } from '../../components/Icon';
import { usePersistentState } from '../../lib/storage';
import { money } from '../../lib/calculators';

interface Offer {
  label: string;
  baseWeeks: number;
  weeklyPay: number;
  cobraMonths: number;
  cobraMonthlyValue: number;
  bonusDollars: number;
  ptoDays: number;
  dailyRate: number;
  equityDollars: number;
  otherDollars: number;
  notes: string;
}

const EMPTY_OFFER = (label: string): Offer => ({
  label,
  baseWeeks: 0,
  weeklyPay: 0,
  cobraMonths: 0,
  cobraMonthlyValue: 0,
  bonusDollars: 0,
  ptoDays: 0,
  dailyRate: 0,
  equityDollars: 0,
  otherDollars: 0,
  notes: '',
});

const INITIAL_OFFERS: { a: Offer; b: Offer } = {
  a: EMPTY_OFFER('Offer A'),
  b: EMPTY_OFFER('Offer B'),
};

interface Totals {
  baseTotal: number;
  cobraTotal: number;
  ptoTotal: number;
  grand: number;
}

function totalsFor(o: Offer): Totals {
  const baseTotal = o.baseWeeks * o.weeklyPay;
  const cobraTotal = o.cobraMonths * o.cobraMonthlyValue;
  const ptoTotal = o.ptoDays * o.dailyRate;
  const grand = baseTotal + cobraTotal + ptoTotal + o.bonusDollars + o.equityDollars + o.otherDollars;
  return { baseTotal, cobraTotal, ptoTotal, grand };
}

export function OfferCompare() {
  const [offers, setOffers] = usePersistentState<{ a: Offer; b: Offer }>(
    'offers.compare',
    INITIAL_OFFERS
  );
  const [active, setActive] = useState<'a' | 'b'>('a');

  const totalsA = useMemo(() => totalsFor(offers.a), [offers.a]);
  const totalsB = useMemo(() => totalsFor(offers.b), [offers.b]);
  const delta = totalsB.grand - totalsA.grand;

  const update = <K extends keyof Offer>(which: 'a' | 'b', key: K, value: Offer[K]) => {
    setOffers({ ...offers, [which]: { ...offers[which], [key]: value } });
  };

  const current = offers[active];
  const totals = active === 'a' ? totalsA : totalsB;

  const num = (v: number) => (v === 0 ? '' : v);
  const parseNum = (s: string) => {
    const n = Number(s);
    return Number.isFinite(n) && n >= 0 ? n : 0;
  };

  return (
    <div className="compare">
      <div className="compare__intro">
        <Icon name="scale" size={16} />
        <span>
          Total up two packages side-by-side. Everything below is pure math on what
          you type — no estimates, no magic.{' '}
          <strong>We don't recommend one over the other</strong> — that depends on your
          tax situation, tenure, and plans.
        </span>
      </div>

      {/* Summary strip */}
      <div className="compare__summary">
        <div className="compare__summary-card">
          <div className="compare__summary-label">{offers.a.label || 'Offer A'}</div>
          <div className="compare__summary-value">{money(totalsA.grand)}</div>
        </div>
        <div className="compare__summary-vs">vs</div>
        <div className="compare__summary-card">
          <div className="compare__summary-label">{offers.b.label || 'Offer B'}</div>
          <div className="compare__summary-value">{money(totalsB.grand)}</div>
        </div>
        <div className={`compare__delta ${delta >= 0 ? 'compare__delta--pos' : 'compare__delta--neg'}`}>
          <span>Difference</span>
          <strong>
            {delta >= 0 ? '+' : ''}{money(delta)}
          </strong>
        </div>
      </div>

      {/* Tabs: A / B */}
      <div className="compare__tabs">
        <button
          type="button"
          className={`compare__tab ${active === 'a' ? 'compare__tab--active' : ''}`}
          onClick={() => setActive('a')}
        >
          Edit {offers.a.label || 'Offer A'}
        </button>
        <button
          type="button"
          className={`compare__tab ${active === 'b' ? 'compare__tab--active' : ''}`}
          onClick={() => setActive('b')}
        >
          Edit {offers.b.label || 'Offer B'}
        </button>
      </div>

      <div className="compare__form">
        <div className="compare__row">
          <label>Label</label>
          <input
            type="text"
            value={current.label}
            onChange={(e) => update(active, 'label', e.target.value)}
            placeholder="e.g. Original offer, Counter, New job"
          />
        </div>

        <div className="compare__group">
          <div className="compare__group-title">Severance pay</div>
          <div className="compare__row compare__row--split">
            <div>
              <label>Weeks of base pay</label>
              <input
                type="number"
                min="0"
                value={num(current.baseWeeks)}
                onChange={(e) => update(active, 'baseWeeks', parseNum(e.target.value))}
                placeholder="e.g. 8"
              />
            </div>
            <div>
              <label>Your weekly pay ($)</label>
              <input
                type="number"
                min="0"
                value={num(current.weeklyPay)}
                onChange={(e) => update(active, 'weeklyPay', parseNum(e.target.value))}
                placeholder="e.g. 2500"
              />
            </div>
            <div className="compare__subtotal">
              = {money(totals.baseTotal)}
            </div>
          </div>
        </div>

        <div className="compare__group">
          <div className="compare__group-title">Health coverage</div>
          <div className="compare__row compare__row--split">
            <div>
              <label>COBRA months covered</label>
              <input
                type="number"
                min="0"
                value={num(current.cobraMonths)}
                onChange={(e) => update(active, 'cobraMonths', parseNum(e.target.value))}
                placeholder="e.g. 3"
              />
            </div>
            <div>
              <label>Monthly premium ($)</label>
              <input
                type="number"
                min="0"
                value={num(current.cobraMonthlyValue)}
                onChange={(e) => update(active, 'cobraMonthlyValue', parseNum(e.target.value))}
                placeholder="e.g. 850"
              />
            </div>
            <div className="compare__subtotal">
              = {money(totals.cobraTotal)}
            </div>
          </div>
        </div>

        <div className="compare__group">
          <div className="compare__group-title">PTO payout</div>
          <div className="compare__row compare__row--split">
            <div>
              <label>PTO days</label>
              <input
                type="number"
                min="0"
                value={num(current.ptoDays)}
                onChange={(e) => update(active, 'ptoDays', parseNum(e.target.value))}
                placeholder="e.g. 12"
              />
            </div>
            <div>
              <label>Daily rate ($)</label>
              <input
                type="number"
                min="0"
                value={num(current.dailyRate)}
                onChange={(e) => update(active, 'dailyRate', parseNum(e.target.value))}
                placeholder="e.g. 500"
              />
            </div>
            <div className="compare__subtotal">
              = {money(totals.ptoTotal)}
            </div>
          </div>
        </div>

        <div className="compare__group">
          <div className="compare__group-title">Other line items</div>
          <div className="compare__row compare__row--split">
            <div>
              <label>Pro-rata bonus ($)</label>
              <input
                type="number"
                min="0"
                value={num(current.bonusDollars)}
                onChange={(e) => update(active, 'bonusDollars', parseNum(e.target.value))}
                placeholder="e.g. 5000"
              />
            </div>
            <div>
              <label>Equity accel / RSU value ($)</label>
              <input
                type="number"
                min="0"
                value={num(current.equityDollars)}
                onChange={(e) => update(active, 'equityDollars', parseNum(e.target.value))}
                placeholder="e.g. 10000"
              />
            </div>
            <div>
              <label>Other ($)</label>
              <input
                type="number"
                min="0"
                value={num(current.otherDollars)}
                onChange={(e) => update(active, 'otherDollars', parseNum(e.target.value))}
                placeholder="outplacement, etc."
              />
            </div>
          </div>
        </div>

        <div className="compare__row">
          <label>Notes (clauses, strings, gotchas)</label>
          <textarea
            rows={2}
            value={current.notes}
            onChange={(e) => update(active, 'notes', e.target.value)}
            placeholder="e.g. Includes 2-year non-compete in 5 states. Release of all claims required."
          />
        </div>
      </div>

      {/* Line-by-line table */}
      <div className="compare__table">
        <div className="compare__thead">
          <div></div>
          <div>{offers.a.label || 'Offer A'}</div>
          <div>{offers.b.label || 'Offer B'}</div>
          <div>Difference</div>
        </div>
        <CompareRow label="Base pay" a={totalsA.baseTotal} b={totalsB.baseTotal} />
        <CompareRow label="COBRA reimbursement" a={totalsA.cobraTotal} b={totalsB.cobraTotal} />
        <CompareRow label="PTO payout" a={totalsA.ptoTotal} b={totalsB.ptoTotal} />
        <CompareRow label="Pro-rata bonus" a={offers.a.bonusDollars} b={offers.b.bonusDollars} />
        <CompareRow label="Equity value" a={offers.a.equityDollars} b={offers.b.equityDollars} />
        <CompareRow label="Other" a={offers.a.otherDollars} b={offers.b.otherDollars} />
        <div className="compare__total">
          <div>Grand total</div>
          <div>{money(totalsA.grand)}</div>
          <div>{money(totalsB.grand)}</div>
          <div className={delta >= 0 ? 'compare__total-pos' : 'compare__total-neg'}>
            {delta >= 0 ? '+' : ''}{money(delta)}
          </div>
        </div>
      </div>

      <div className="compare__foot">
        <Icon name="info" size={14} />
        <span>
          This tool does math, not advice. A bigger number is not always the better offer —
          non-competes, release-of-claims language, vesting dates, and tax treatment can all
          change the real value. For offers above $20K, have an employment attorney review.
        </span>
      </div>
    </div>
  );
}

function CompareRow({ label, a, b }: { label: string; a: number; b: number }) {
  const diff = b - a;
  return (
    <div className="compare__trow">
      <div>{label}</div>
      <div>{money(a)}</div>
      <div>{money(b)}</div>
      <div className={diff === 0 ? '' : diff > 0 ? 'compare__trow-pos' : 'compare__trow-neg'}>
        {diff === 0 ? '—' : `${diff > 0 ? '+' : ''}${money(diff)}`}
      </div>
    </div>
  );
}
