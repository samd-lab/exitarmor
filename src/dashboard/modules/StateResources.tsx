import { Icon } from '../../components/Icon';
import { MODULES, STATE_ITEMS, STATES } from '../../data/modules';
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

export function StateResources({ checked, onToggle, onBack }: Props) {
  const module = MODULES.find((m) => m.id === 'state')!;
  const [stateCode, setStateCode] = usePersistentState<string>('state.selected', 'CA');
  const state = STATES.find((s) => s.code === stateCode) ?? STATES[0];

  const total = STATE_ITEMS.length;
  const done = countChecked(checked, STATE_ITEMS.map((i) => i.id));

  return (
    <>
      <ModuleHeader
        module={module}
        iconName="map"
        onBack={onBack}
        onDownload={() => downloadChecklist(`${module.title} — ${state.name}`, STATE_ITEMS, checked)}
      />

      <div className="privacy-note">
        <Icon name="lock" size={14} />
        Coverage for all 50 US states + DC. Always verify deadlines on your state's
        Department of Labor website before taking action.
      </div>

      <div className="module-page__layout">
        <div className="module-page__primary">
          <div className="state-picker">
            <label htmlFor="state-select" style={{ fontSize: '0.85rem', color: 'var(--d-text-muted)', fontWeight: 600 }}>
              Your state:
            </label>
            <select
              id="state-select"
              value={stateCode}
              onChange={(e) => setStateCode(e.target.value)}
            >
              {STATES.map((s) => (
                <option key={s.code} value={s.code}>{s.name}</option>
              ))}
            </select>
            <a
              href={state.unemploymentUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-pill"
              style={{ textDecoration: 'none' }}
            >
              <Icon name="arrow" size={14} /> Open {state.code} unemployment portal
            </a>
          </div>

          <div className="state-info-grid">
            <div className="state-info-card">
              <div className="state-info-card__label">PTO Payout</div>
              <div className="state-info-card__value">
                {state.ptoPayoutRequired === 'yes' ? 'Required' : state.ptoPayoutRequired === 'no' ? 'Not required' : 'Conditional'}
              </div>
            </div>
            <div className="state-info-card">
              <div className="state-info-card__label">WARN Threshold</div>
              <div className="state-info-card__value">{state.warnThreshold}+ employees</div>
            </div>
            <div className="state-info-card">
              <div className="state-info-card__label">Non-Compete</div>
              <div className="state-info-card__value">{state.noncompeteAllowed ? 'Permitted' : 'Restricted / banned'}</div>
            </div>
            <div className="state-info-card">
              <div className="state-info-card__label">Filing portal</div>
              <div className="state-info-card__value" style={{ fontSize: '0.85rem', wordBreak: 'break-all' }}>
                {state.unemploymentUrl.replace('https://', '')}
              </div>
            </div>
          </div>

          <div style={{ background: 'var(--d-surface-soft)', border: '1px solid var(--d-border)', borderRadius: 12, padding: '1rem 1.1rem', marginBottom: '1.2rem' }}>
            <h4 style={{ fontFamily: 'var(--font-heading)', marginBottom: '0.4rem' }}>Notes for {state.name}</h4>
            <p style={{ fontSize: '0.9rem', color: 'var(--d-text-muted)', margin: 0, lineHeight: 1.6 }}>
              {state.notes}
            </p>
          </div>

          <h4 style={{ fontFamily: 'var(--font-heading)', marginBottom: '0.5rem' }}>Your state-action checklist</h4>
          <Checklist items={STATE_ITEMS} checked={checked} onToggle={onToggle} />
        </div>

        <aside className="module-page__side">
          <div className="module-side-card">
            <h4>{state.name} progress</h4>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ color: 'var(--d-text-muted)', fontSize: '0.85rem' }}>Steps complete</span>
              <strong style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem' }}>{done}/{total}</strong>
            </div>
            <div style={{ height: 6, background: '#e5e7eb', borderRadius: 999, overflow: 'hidden' }}>
              <div style={{ width: `${(done / total) * 100}%`, height: '100%', background: module.accent }} />
            </div>
          </div>
          <div className="module-side-card">
            <h4>Federal baseline</h4>
            <p>WARN Act covers companies with 100+ employees doing mass layoffs (50+ employees or 33% of workforce) — 60 days notice or pay-in-lieu.</p>
          </div>
          <div className="module-side-card">
            <h4>Filing tip</h4>
            <p>When filing, always say "laid off" or "position eliminated" — never anything that sounds like misconduct.</p>
          </div>
        </aside>
      </div>
    </>
  );
}
