import { useMemo } from 'react';
import { Icon } from '../../components/Icon';
import { COBRA_ITEMS, MODULES } from '../../data/modules';
import type { ModuleId } from '../../data/modules';
import { downloadChecklist } from '../../lib/exportChecklist';
import { countChecked, usePersistentState } from '../../lib/storage';
import type { ChecklistMap } from '../../lib/storage';
import { Checklist } from '../components/Checklist';
import { ModuleHeader } from '../components/ModuleHeader';
import { RelatedTools } from '../components/RelatedTools';

interface Props {
  checked: ChecklistMap;
  onToggle: (id: string) => void;
  onBack: () => void;
  onOpenModule?: (id: ModuleId) => void;
}

export interface CobraAcaInputs {
  age: number;
  income: number;
  cobraMonthly: number;
  household: number;
}

// Re-exported as the legacy local alias so the rest of the file stays untouched.
type Inputs = CobraAcaInputs;

export const COBRA_ACA_DEFAULTS: CobraAcaInputs = { age: 35, income: 60000, cobraMonthly: 650, household: 1 };
const DEFAULTS = COBRA_ACA_DEFAULTS;

export function CobraVsAca({ checked, onToggle, onBack, onOpenModule }: Props) {
  const module = MODULES.find((m) => m.id === 'cobra-aca')!;
  const [inputs, setInputs] = usePersistentState<Inputs>('cobra.inputs', DEFAULTS);

  const aca = useMemo(() => estimateAca(inputs), [inputs]);
  const cobraAnnual = inputs.cobraMonthly * 12;
  const acaAnnual = aca * 12;
  const better: 'cobra' | 'aca' | 'tie' = acaAnnual < cobraAnnual ? 'aca' : acaAnnual > cobraAnnual ? 'cobra' : 'tie';

  const total = COBRA_ITEMS.length;
  const done = countChecked(checked, COBRA_ITEMS.map((i) => i.id));

  const update = (k: keyof Inputs, v: number) => setInputs({ ...inputs, [k]: v });

  return (
    <>
      <ModuleHeader
        module={module}
        iconName="heart"
        onBack={onBack}
        onDownload={() => downloadChecklist(module.title, COBRA_ITEMS, checked)}
      />

      <div className="privacy-note">
        <Icon name="lock" size={14} />
        Cost estimates only. Confirm exact COBRA premiums with your benefits admin and
        ACA pricing at <a href="https://healthcare.gov" target="_blank" rel="noreferrer" style={{ color: '#075985', fontWeight: 600 }}>healthcare.gov</a>.
      </div>

      <div className="module-page__layout">
        <div className="module-page__primary">
          <h4 style={{ fontFamily: 'var(--font-heading)', marginBottom: '0.5rem' }}>Quick comparison</h4>
          <table className="matrix">
            <thead>
              <tr><th></th><th>COBRA (Employer Plan)</th><th>ACA Marketplace</th></tr>
            </thead>
            <tbody>
              <tr><td>Election window</td><td>60 days from coverage end</td><td>60 days SEP from job loss</td></tr>
              <tr><td>Coverage start</td><td>Retro to last day worked</td><td>Next month after enrollment</td></tr>
              <tr><td>Network</td><td>Same doctors, same plan</td><td>Plan-dependent</td></tr>
              <tr><td>Typical monthly cost</td><td>$450–$750 (single)</td><td>$0–$500 with subsidies</td></tr>
              <tr><td>Best when</td><td>Mid-treatment, short gap</td><td>Income drop, longer gap</td></tr>
            </tbody>
          </table>

          <h4 style={{ fontFamily: 'var(--font-heading)', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Cost calculator</h4>
          <div className="budget-grid">
            <div className="budget-input">
              <label>Your age</label>
              <input type="number" value={inputs.age} onChange={(e) => update('age', Number(e.target.value))} />
            </div>
            <div className="budget-input">
              <label>Expected annual income while job-searching ($)</label>
              <input type="number" value={inputs.income} onChange={(e) => update('income', Number(e.target.value))} />
            </div>
            <div className="budget-input">
              <label>COBRA monthly premium ($)</label>
              <input type="number" value={inputs.cobraMonthly} onChange={(e) => update('cobraMonthly', Number(e.target.value))} />
            </div>
            <div className="budget-input">
              <label>Household size</label>
              <input type="number" value={inputs.household} onChange={(e) => update('household', Number(e.target.value))} />
            </div>
          </div>

          <div className={`budget-result ${better === 'cobra' ? '' : ''}`}>
            <div>
              <div style={{ fontSize: '0.78rem', color: '#047857', textTransform: 'uppercase', letterSpacing: 1, fontWeight: 700 }}>
                Estimated annual cost
              </div>
              <div style={{ marginTop: 6, fontSize: '0.95rem', color: '#0f172a' }}>
                COBRA: <strong>${cobraAnnual.toLocaleString()}/yr</strong>
                {'  ·  '}
                ACA (estimated, with subsidies): <strong>${acaAnnual.toLocaleString()}/yr</strong>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.78rem', color: '#047857', textTransform: 'uppercase', letterSpacing: 1, fontWeight: 700 }}>
                Likely cheaper
              </div>
              <strong>{better === 'tie' ? 'Tie' : better.toUpperCase()}</strong>
            </div>
          </div>

          <h4 style={{ fontFamily: 'var(--font-heading)', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Decision checklist</h4>
          <Checklist items={COBRA_ITEMS} checked={checked} onToggle={onToggle} />
        </div>

        <aside className="module-page__side">
          <div className="module-side-card">
            <h4>Your progress</h4>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ color: 'var(--d-text-muted)', fontSize: '0.85rem' }}>Steps complete</span>
              <strong style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem' }}>{done}/{total}</strong>
            </div>
            <div style={{ height: 6, background: '#e5e7eb', borderRadius: 999, overflow: 'hidden' }}>
              <div style={{ width: `${(done / total) * 100}%`, height: '100%', background: module.accent }} />
            </div>
          </div>
          <div className="module-side-card">
            <h4>COBRA quick facts</h4>
            <p>You have 60 days to elect after coverage ends. Coverage is retroactive — no gap if you enroll within the window.</p>
          </div>
          <div className="module-side-card">
            <h4>ACA quick facts</h4>
            <p>Job loss = qualifying life event for a 60-day Special Enrollment Period. Premium tax credits scale with new (lower) income.</p>
          </div>

          {onOpenModule && <RelatedTools currentRoute="cobra-aca" onOpen={onOpenModule} />}
        </aside>
      </div>
    </>
  );
}

// Very rough ACA estimate. Educational approximation only.
export function estimateAca(i: Inputs): number {
  const fpl = 14580 + (i.household - 1) * 5140;
  const ratio = i.income / fpl;
  // Simplified subsidy curve (not actual KFF tables) — illustrative only.
  let monthly = 500;
  if (ratio < 1.5) monthly = 0;
  else if (ratio < 2.5) monthly = 75;
  else if (ratio < 3.5) monthly = 200;
  else if (ratio < 4.5) monthly = 350;
  else monthly = Math.max(450, monthly);
  // Age adjustment
  if (i.age >= 50) monthly += 100;
  if (i.age >= 60) monthly += 100;
  return monthly;
}
