import { useMemo } from 'react';
import { Icon } from '../../components/Icon';
import { BUDGET_ITEMS, MODULES } from '../../data/modules';
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

interface BudgetInputs {
  rent: number;
  food: number;
  insurance: number;
  utilities: number;
  debt: number;
  other: number;
  monthlyIncome: number;
  savings: number;
}

const DEFAULTS: BudgetInputs = {
  rent: 1800,
  food: 600,
  insurance: 350,
  utilities: 220,
  debt: 400,
  other: 250,
  monthlyIncome: 0,
  savings: 12000,
};

export function Budget({ checked, onToggle, onBack }: Props) {
  const module = MODULES.find((m) => m.id === 'budget')!;
  const [inputs, setInputs] = usePersistentState<BudgetInputs>('budget.inputs', DEFAULTS);

  const essential = inputs.rent + inputs.food + inputs.insurance + inputs.utilities + inputs.debt;
  const total = essential + inputs.other;
  const bleed = Math.max(0, total - inputs.monthlyIncome);
  const months = bleed === 0 ? Infinity : inputs.savings / bleed;

  const totalItems = BUDGET_ITEMS.length;
  const done = countChecked(checked, BUDGET_ITEMS.map((i) => i.id));

  const update = (k: keyof BudgetInputs, v: number) => setInputs({ ...inputs, [k]: v });

  const runwayLabel = useMemo(() => {
    if (months === Infinity) return 'Income covers expenses';
    if (months >= 6) return `${months.toFixed(1)} months — strong`;
    if (months >= 3) return `${months.toFixed(1)} months — cautious`;
    return `${months.toFixed(1)} months — extend runway`;
  }, [months]);

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
        Financial planning tool — not financial advice. Inputs are stored only on this device.
      </div>

      <div className="module-page__layout">
        <div className="module-page__primary">
          <h4 style={{ fontFamily: 'var(--font-heading)', marginBottom: '0.5rem' }}>Monthly expenses</h4>
          <div className="budget-grid">
            <BudgetField label="Rent / Mortgage" value={inputs.rent} onChange={(v) => update('rent', v)} />
            <BudgetField label="Food / Groceries" value={inputs.food} onChange={(v) => update('food', v)} />
            <BudgetField label="Insurance (health, auto)" value={inputs.insurance} onChange={(v) => update('insurance', v)} />
            <BudgetField label="Utilities" value={inputs.utilities} onChange={(v) => update('utilities', v)} />
            <BudgetField label="Minimum debt payments" value={inputs.debt} onChange={(v) => update('debt', v)} />
            <BudgetField label="Other essentials" value={inputs.other} onChange={(v) => update('other', v)} />
          </div>

          <h4 style={{ fontFamily: 'var(--font-heading)', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Income & savings</h4>
          <div className="budget-grid">
            <BudgetField label="Monthly income (severance, side, UI)" value={inputs.monthlyIncome} onChange={(v) => update('monthlyIncome', v)} />
            <BudgetField label="Total liquid savings" value={inputs.savings} onChange={(v) => update('savings', v)} />
          </div>

          <div className={`budget-result ${months < 3 ? 'warn' : ''}`}>
            <div>
              <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: 1, fontWeight: 700, color: months < 3 ? '#b91c1c' : '#047857' }}>
                Monthly bleed rate
              </div>
              <div style={{ marginTop: 6, fontSize: '0.95rem', color: '#0f172a' }}>
                Total essentials: <strong>${total.toLocaleString()}</strong> · Income: <strong>${inputs.monthlyIncome.toLocaleString()}</strong>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: 1, fontWeight: 700, color: months < 3 ? '#b91c1c' : '#047857' }}>
                Runway
              </div>
              <strong>${bleed.toLocaleString()}/mo · {runwayLabel}</strong>
            </div>
          </div>

          <h4 style={{ fontFamily: 'var(--font-heading)', marginTop: '1.5rem', marginBottom: '0.5rem' }}>90-day defense checklist</h4>
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
