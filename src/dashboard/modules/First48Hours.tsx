import { useMemo, useState } from 'react';
import { Icon } from '../../components/Icon';
import { FIRST_48_ITEMS, MODULES } from '../../data/modules';
import { downloadChecklist, mailtoChecklist } from '../../lib/exportChecklist';
import { countChecked } from '../../lib/storage';
import type { ChecklistMap } from '../../lib/storage';
import { Checklist } from '../components/Checklist';
import { ModuleHeader } from '../components/ModuleHeader';

const DAYS = ['Day 1', 'Day 2', 'Day 3', 'Day 4-7'] as const;

interface Props {
  checked: ChecklistMap;
  onToggle: (id: string) => void;
  onBack: () => void;
}

export function First48Hours({ checked, onToggle, onBack }: Props) {
  const module = MODULES.find((m) => m.id === 'first-48')!;
  const [day, setDay] = useState<typeof DAYS[number]>('Day 1');

  const filtered = useMemo(() => FIRST_48_ITEMS.filter((it) => (it.day || 'Day 1') === day), [day]);
  const total = FIRST_48_ITEMS.length;
  const done = countChecked(checked, FIRST_48_ITEMS.map((i) => i.id));
  const pct = Math.round((done / total) * 100);

  return (
    <>
      <ModuleHeader
        module={module}
        iconName="shield"
        onBack={onBack}
        onDownload={() => downloadChecklist(module.title, FIRST_48_ITEMS, checked)}
      />

      <div className="privacy-note">
        <Icon name="lock" size={14} />
        Progress is saved on this device. Switching devices? Use Download or Email below.
      </div>

      <div className="module-page__layout">
        <div className="module-page__primary">
          <div className="day-tabs">
            {DAYS.map((d) => (
              <button
                key={d}
                type="button"
                className={`day-tab ${day === d ? 'day-tab--active' : ''}`}
                onClick={() => setDay(d)}
              >
                {d}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <p style={{ color: 'var(--d-text-muted)', fontSize: '0.9rem' }}>
              Coming soon — actions for {day}. In the meantime, focus on the earlier days.
            </p>
          ) : (
            <Checklist items={filtered} checked={checked} onToggle={onToggle} />
          )}

          <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button type="button" className="btn-pill" onClick={() => downloadChecklist(module.title, FIRST_48_ITEMS, checked)}>
              <Icon name="download" size={14} /> Download My Checklist
            </button>
            <button type="button" className="btn-pill" onClick={() => mailtoChecklist(module.title, FIRST_48_ITEMS, checked)}>
              <Icon name="mail" size={14} /> Email My Progress
            </button>
          </div>
        </div>

        <aside className="module-page__side">
          <div className="module-side-card">
            <h4>Overall progress</h4>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ color: 'var(--d-text-muted)', fontSize: '0.85rem' }}>Completed</span>
              <strong style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem' }}>{done}/{total}</strong>
            </div>
            <div style={{ height: 6, background: '#e5e7eb', borderRadius: 999, overflow: 'hidden' }}>
              <div style={{ width: `${pct}%`, height: '100%', background: module.accent, transition: 'width 0.4s ease' }} />
            </div>
          </div>

          <div className="module-side-card">
            <h4>What this module covers</h4>
            <p>
              The first 48 hours after a layoff are when most money is left on the
              table — missed unemployment filings, signed agreements, lost references.
              Work through Day 1 first, then continue into Day 2 and 3.
            </p>
          </div>

          <div className="module-side-card" style={{ background: '#fff7ed', borderColor: '#fed7aa' }}>
            <h4 style={{ color: '#9a3412' }}>
              <Icon name="warn" size={14} style={{ verticalAlign: 'middle', marginRight: 4 }} />
              Don't sign anything yet
            </h4>
            <p>
              If you are 40+, federal ADEA law gives you 21 days to review (45 if part of
              a group layoff) and 7 days to revoke after signing. Use that time.
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
