import { useMemo, useState } from 'react';
import { Icon } from '../../components/Icon';
import { FIRST_48_ITEMS, MODULES } from '../../data/modules';
import { downloadChecklist, mailtoChecklist } from '../../lib/exportChecklist';
import { countChecked } from '../../lib/storage';
import type { ChecklistMap } from '../../lib/storage';
import { Checklist } from '../components/Checklist';
import { ModuleHeader } from '../components/ModuleHeader';
import { RelatedTools } from '../components/RelatedTools';
import type { ModuleId } from '../../data/modules';

const DAYS = ['Day 1', 'Day 2'] as const;

interface Props {
  checked: ChecklistMap;
  onToggle: (id: string) => void;
  onBack: () => void;
  onOpenModule?: (id: ModuleId) => void;
}

export function First48Hours({ checked, onToggle, onBack, onOpenModule }: Props) {
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
              No actions for {day} — pick another day tab above.
            </p>
          ) : (
            <Checklist items={filtered} checked={checked} onToggle={onToggle} onJumpTo={onOpenModule} />
          )}
          <p style={{
            marginTop: '1.25rem',
            padding: '0.8rem 1rem',
            background: '#f0f9ff',
            border: '1px solid #bae6fd',
            borderRadius: 10,
            color: '#075985',
            fontSize: '0.82rem',
            lineHeight: 1.55,
          }}>
            <Icon name="info" size={13} style={{ verticalAlign: 'middle', marginRight: 4 }} />
            This is the <strong>tactical lane</strong> — the things that leak money or rights
            if you do not handle them in 48 hours. Run the <strong>7-Day Recovery Companion</strong>
            in parallel (sidebar): it is the <strong>emotional &amp; cadence lane</strong> for
            the same first few days, and then Days 3–7 that sit after this checklist is done.
          </p>
          {onOpenModule && (
            <div style={{ marginTop: '0.9rem' }}>
              <button
                type="button"
                className="btn-pill btn-pill--primary"
                onClick={() => onOpenModule('recovery-7day')}
              >
                <Icon name="calendar" size={14} /> Open the 7-Day Recovery Companion
              </button>
            </div>
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
              The first 48 hours are when most money is left on the table — missed
              unemployment filings, signed agreements, lost references. This is the
              tactical two-day sprint. Work Day 1 first, then Day 2. The emotional
              side of the same days runs in parallel in the 7-Day Recovery Companion.
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

          {onOpenModule && <RelatedTools currentRoute="first-48" onOpen={onOpenModule} />}
        </aside>
      </div>
    </>
  );
}
