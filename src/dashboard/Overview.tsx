import { Icon } from '../components/Icon';
import {
  MODULES,
  PHASES,
  TODAYS_ACTIONS,
  ITEMS_BY_MODULE,
} from '../data/modules';
import type { ModuleId, Phase } from '../data/modules';
import { countChecked } from '../lib/storage';
import type { ChecklistMap } from '../lib/storage';
import { Checklist } from './components/Checklist';
import { PhaseRing } from './components/PhaseRing';

interface Props {
  checked: ChecklistMap;
  onToggle: (id: string) => void;
  onOpenModule: (id: ModuleId) => void;
  onStartAi: () => void;
}

function phaseTotals(phase: Phase) {
  const ids = MODULES.filter((m) => m.phase === phase).flatMap((m) => m.itemIds);
  return ids;
}

export function Overview({ checked, onToggle, onOpenModule, onStartAi }: Props) {
  const allIds = MODULES.flatMap((m) => m.itemIds);
  const overall = allIds.length === 0 ? 0 : Math.round((countChecked(checked, allIds) / allIds.length) * 100);

  return (
    <>
      <div className="dash-topbar">
        <div className="dash-greeting">
          <h1>Welcome back. Your 90-day plan is ready.</h1>
          <p>Follow your step-by-step system to protect your income, benefits, and future.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.7rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <span className="dash-pill">
            <Icon name="lock" size={14} /> Progress saved on this device
          </span>
          <button type="button" className="dash-ai-btn" onClick={onStartAi}>
            <span className="dash-ai-btn__dot" />
            <Icon name="mic" size={16} />
            Talk to AI Assistant
          </button>
        </div>
      </div>

      {/* Phase progress strip */}
      <section className="dash-phases" aria-label="Your 4-step plan">
        {PHASES.map((p) => {
          const ids = phaseTotals(p.id);
          const done = countChecked(checked, ids);
          return (
            <div key={p.id} className="dash-phase">
              <PhaseRing step={p.step} done={done} total={ids.length} accent={p.accent} />
              <div>
                <div className="dash-phase__label">Step {p.step}</div>
                <div className="dash-phase__title">{p.label}</div>
                <div className="dash-phase__sub">
                  {done}/{ids.length} completed · {p.sub}
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Module cards */}
      <section className="dash-modules" aria-label="Modules">
        {MODULES.filter((m) => m.id !== 'job-search').map((m) => {
          const items = ITEMS_BY_MODULE[m.id];
          const done = countChecked(checked, items.map((i) => i.id));
          const pct = items.length === 0 ? 0 : Math.round((done / items.length) * 100);
          return (
            <button
              key={m.id}
              type="button"
              className="module-card"
              onClick={() => onOpenModule(m.id)}
            >
              <span className="module-card__icon" style={{ background: m.iconBg }}>
                <Icon name={iconForModule(m.id)} size={22} />
              </span>
              <h3 className="module-card__title">{m.title}</h3>
              <p className="module-card__desc">{m.description}</p>
              <div className="module-card__meta">
                <div className="module-card__progress">
                  <div className="module-card__bar">
                    <span style={{ width: `${pct}%`, background: m.accent }} />
                  </div>
                  <span>{done}/{items.length}</span>
                </div>
                <span className="module-card__cta">
                  Open <Icon name="arrow" size={14} />
                </span>
              </div>
            </button>
          );
        })}
      </section>

      {/* Bottom row: Today's Actions + AI + Progress */}
      <section className="dash-row-3">
        <div className="panel">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <h3 className="panel__title" style={{ margin: 0 }}>Today's Recommended Actions</h3>
            <button type="button" className="btn-pill" onClick={() => onOpenModule('first-48')}>
              View all <Icon name="arrow" size={12} />
            </button>
          </div>
          <Checklist
            items={TODAYS_ACTIONS.map((a) => ({ id: a.id, label: a.label }))}
            checked={checked}
            onToggle={onToggle}
          />
        </div>

        <div className="panel panel--accent ai-panel">
          <h3 className="panel__title">Talk to Your AI Assistant</h3>
          <p className="panel__sub" style={{ margin: 0 }}>
            Get personalized guidance, ask questions, rehearse HR conversations.
            20 minutes included with your plan.
          </p>
          <button type="button" className="ai-panel__cta" onClick={onStartAi}>
            <Icon name="mic" size={16} />
            Start 20-Min AI Call
          </button>
          <div className="ai-panel__note">
            AI-powered · Educational only · Not a human advisor
          </div>
        </div>

        <div className="panel">
          <h3 className="panel__title">Your Progress</h3>
          <div className="progress-panel__overall">
            <span style={{ color: 'var(--d-text-muted)', fontSize: '0.85rem' }}>Overall completion</span>
            <b>{overall}%</b>
          </div>
          <div style={{ height: 6, background: '#e5e7eb', borderRadius: 999, overflow: 'hidden', marginBottom: '0.9rem' }}>
            <div style={{ width: `${overall}%`, height: '100%', background: 'linear-gradient(90deg,#f97316,#10b981)', transition: 'width 0.4s ease' }} />
          </div>
          {MODULES.filter((m) => m.id !== 'job-search').map((m) => {
            const items = ITEMS_BY_MODULE[m.id];
            const done = countChecked(checked, items.map((i) => i.id));
            return (
              <div className="progress-panel__row" key={m.id}>
                <span style={{ color: 'var(--d-text-muted)' }}>{m.short}</span>
                <strong>{done}/{items.length}</strong>
              </div>
            );
          })}
        </div>
      </section>

      {/* Bonus job-search row */}
      <section className="dash-modules" style={{ gridTemplateColumns: '1fr' }}>
        {(() => {
          const m = MODULES.find((x) => x.id === 'job-search')!;
          const items = ITEMS_BY_MODULE[m.id];
          const done = countChecked(checked, items.map((i) => i.id));
          const pct = Math.round((done / items.length) * 100);
          return (
            <button
              type="button"
              className="module-card"
              onClick={() => onOpenModule(m.id)}
              style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', alignItems: 'center', gap: '1.2rem' }}
            >
              <span className="module-card__icon" style={{ background: m.iconBg, marginBottom: 0 }}>
                <Icon name="search" size={22} />
              </span>
              <div style={{ textAlign: 'left' }}>
                <h3 className="module-card__title" style={{ marginBottom: '0.2rem' }}>
                  {m.title} <span style={{ color: 'var(--d-text-muted)', fontWeight: 500, fontSize: '0.85rem' }}>· Bonus</span>
                </h3>
                <p className="module-card__desc" style={{ marginBottom: 0 }}>{m.description}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <div className="module-card__bar" style={{ width: 100 }}>
                  <span style={{ width: `${pct}%`, background: m.accent }} />
                </div>
                <span style={{ fontSize: '0.85rem', color: 'var(--d-text-muted)', fontWeight: 600 }}>
                  {done}/{items.length}
                </span>
                <Icon name="arrow" size={16} />
              </div>
            </button>
          );
        })()}
      </section>

      <p className="legal-strip">
        Exit Armor is an AI-powered educational resource. Nothing here constitutes legal,
        financial, or tax advice. Always consult a licensed professional before making
        decisions that affect your legal rights or financial situation.
      </p>
    </>
  );
}

function iconForModule(id: ModuleId): import('../components/Icon').IconName {
  switch (id) {
    case 'first-48': return 'shield';
    case 'severance': return 'briefcase';
    case 'state': return 'map';
    case 'cobra-aca': return 'heart';
    case 'budget': return 'dollar';
    case 'job-search': return 'search';
  }
}
