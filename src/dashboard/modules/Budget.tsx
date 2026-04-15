import { useMemo } from 'react';
import { Icon } from '../../components/Icon';
import { BUDGET_ITEMS, MODULES } from '../../data/modules';
import { calculateRunway, money, runwayLabel } from '../../lib/calculators';
import type { RunwayInput } from '../../lib/calculators';
import { downloadChecklist } from '../../lib/exportChecklist';
import { countChecked, usePersistentState } from '../../lib/storage';
import type { ChecklistMap } from '../../lib/storage';
import { Checklist } from '../components/Checklist';
import { ModuleHeader } from '../components/ModuleHeader';

interface Props {
  checked: ChecklistMap;
  onToggle: (id: string) => void;
  onBack: () => void;
}

const DEFAULTS: RunwayInput = {
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

export function Budget({ checked, onToggle, onBack }: Props) {
  const module = MODULES.find((m) => m.id === 'budget')!;
  const [inputs, setInputs] = usePersistentState<RunwayInput>('budget.runway', DEFAULTS);

  const result = useMemo(() => calculateRunway(inputs), [inputs]);

  const totalItems = BUDGET_ITEMS.length;
  const done = countChecked(checked, BUDGET_ITEMS.map((i) => i.id));

  const update = (k: keyof RunwayInput, v: number) => setInputs({ ...inputs, [k]: v });

  return (
    <>
      <ModuleHeader
        module={module}
        iconName="dollar"
        onBack={onBack}
        onDownload={() => downloadChecklist(module.title, BUDGET_ITEMS, checked)}
      />

      <div className="privacy-note">
        <Icon name="lock" size={14} />
        Financial planning tool — not financial advice. Inputs stay only on this device.
      </div>

      <div className="module-page__layout">
        <div className="module-page__primary">
          <h4 style={{ fontFamily: 'var(--font-heading)', marginBottom: '0.5rem' }}>Essential monthly spend</h4>
          <div className="budget-grid">
            <BudgetField label="Rent / Mortgage" value={inputs.rent} onChange={(v) => update('rent', v)} />
            <BudgetField label="Food / Groceries" value={inputs.food} onChange={(v) => update('food', v)} />
            <BudgetField label="Insurance (health, auto)" value={inputs.insurance} onChange={(v) => update('insurance', v)} />
            <BudgetField label="Utilities" value={inputs.utilities} onChange={(v) => update('utilities', v)} />
            <BudgetField label="Minimum debt payments" value={inputs.debt} onChange={(v) => update('debt', v)} />
            <BudgetField label="Other essentials (childcare, transport)" value={inputs.other} onChange={(v) => update('other', v)} />
          </div>

          <h4 style={{ fontFamily: 'var(--font-heading)', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Discretionary spend</h4>
          <div className="budget-grid">
            <BudgetField
              label="Subscriptions, dining out, entertainment"
              value={inputs.discretionary}
              onChange={(v) => update('discretionary', v)}
            />
          </div>

          <h4 style={{ fontFamily: 'var(--font-heading)', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Income &amp; savings</h4>
          <div className="budget-grid">
            <BudgetField label="Monthly income (severance, side, UI)" value={inputs.monthlyIncome} onChange={(v) => update('monthlyIncome', v)} />
            <BudgetField label="Total liquid savings" value={inputs.savings} onChange={(v) => update('savings', v)} />
          </div>

          <h4 style={{ fontFamily: 'var(--font-heading)', marginTop: '1.8rem', marginBottom: '0.6rem' }}>Three runway scenarios</h4>
          <div className="runway-scenarios">
            <ScenarioCard tone="warn" scenario={result.scenarios.current} />
            <ScenarioCard tone="caution" scenario={result.scenarios.cutDiscretionary} />
            <ScenarioCard tone="good" scenario={result.scenarios.hardCut} />
          </div>

          {result.cuts.length > 0 && (
            <>
              <h4 style={{ fontFamily: 'var(--font-heading)', marginTop: '1.8rem', marginBottom: '0.6rem' }}>Top 5 cuts to extend your runway</h4>
              <ul className="runway-cuts">
                {result.cuts.map((c, i) => (
                  <li key={i}>
                    <span className="runway-cuts__label">{c.label}</span>
                    <span className="runway-cuts__value">{money(c.monthlySavings)}/mo</span>
                  </li>
                ))}
              </ul>
            </>
          )}

          <h4 style={{ fontFamily: 'var(--font-heading)', marginTop: '1.8rem', marginBottom: '0.5rem' }}>90-day defense checklist</h4>
          <Checklist items={BUDGET_ITEMS} checked={checked} onToggle={onToggle} />
        </div>

        <aside className="module-page__side">
          <div className="module-side-card">
            <h4>Your progress</h4>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ color: 'var(--d-text-muted)', fontSize: '0.85rem' }}>Steps complete</span>
              <strong style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem' }}>{done}/{totalItems}</strong>
            </div>
            <div style={{ height: 6, background: '#e5e7eb', borderRadius: 999, overflow: 'hidden' }}>
              <div style={{ width: `${(done / totalItems) * 100}%`, height: '100%', background: module.accent }} />
            </div>
          </div>
          <div className="module-side-card">
            <h4>Creditor scripts</h4>
            <p>"I've recently lost my job. I'd like to request a hardship program — a temporary reduced payment or deferral. What programs do you offer?"</p>
          </div>
          <div className="module-side-card">
            <h4>Don't cash out 401(k)</h4>
            <p>Early withdrawal triggers a 10% penalty plus income tax — typically 30–40% gone immediately. Roll to an IRA instead.</p>
          </div>
        </aside>
      </div>
    </>
  );
}

function ScenarioCard({
  tone,
  scenario,
}: {
  tone: 'warn' | 'caution' | 'good';
  scenario: { label: string; monthlyBleed: number; months: number; description: string };
}) {
  return (
    <div className={`runway-scenario runway-scenario--${tone}`}>
      <div className="runway-scenario__head">
        <span className="runway-scenario__label">{scenario.label}</span>
        <span className="runway-scenario__bleed">{money(scenario.monthlyBleed)}/mo bleed</span>
      </div>
      <div className="runway-scenario__months">{runwayLabel(scenario.months)}</div>
      <p className="runway-scenario__desc">{scenario.description}</p>
    </div>
  );
}

function BudgetField({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <div className="budget-input">
      <label>{label}</label>
      <input
        type="number"
        value={value}
        min={0}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
      />
    </div>
  );
}
