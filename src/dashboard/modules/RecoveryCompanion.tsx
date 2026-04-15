// 7-Day Recovery Companion module.
//
// A guided first-week walkthrough that breaks the overwhelming aftermath of
// a layoff into small, emotionally-aware daily actions. Each task checkbox
// writes to the same 'progress' checklist store that powers the dashboard
// overall-completion bar, so progress here counts everywhere.
//
// The day groupings and copy come from data/modules.ts (RECOVERY_ITEMS).
// We read the detail's "Day N ·" prefix to bucket items into days so the
// structured data stays in one file.

import { Icon } from '../../components/Icon';
import { MODULES, RECOVERY_ITEMS } from '../../data/modules';
import type { ChecklistItem, ModuleId } from '../../data/modules';
import { countChecked } from '../../lib/storage';
import type { ChecklistMap } from '../../lib/storage';
import { ModuleHeader } from '../components/ModuleHeader';
import { RelatedTools } from '../components/RelatedTools';

interface Props {
  checked: ChecklistMap;
  onToggle: (id: string) => void;
  onBack: () => void;
  onOpenModule?: (id: ModuleId) => void;
}

interface DayGroup {
  day: number;
  title: string;
  theme: string;
  items: ChecklistItem[];
}

// Day metadata — the emotional arc of the first week.
const DAY_META: Array<{ day: number; title: string; theme: string }> = [
  { day: 1, title: 'Breathe. Document. Tell one person.', theme: 'Today is just about not making it worse.' },
  { day: 2, title: 'File for benefits. Pause reflexes.', theme: 'Lock in what you are owed.' },
  { day: 3, title: 'Know your numbers.', theme: 'Runway + health. The clarity is the relief.' },
  { day: 4, title: 'Draft your counter. Sleep on it.', theme: 'Every day of your review window is leverage.' },
  { day: 5, title: 'Start surfacing your network.', theme: '60% of jobs come from people who already know you.' },
  { day: 6, title: 'Rehearse your story. Line up references.', theme: 'The calmer you tell it, the more control you feel.' },
  { day: 7, title: 'Send the first 5. Close the week.', theme: 'Motion beats anxiety. Then rest.' },
];

function extractDay(detail?: string): number {
  if (!detail) return 0;
  const m = detail.match(/Day\s+(\d)/i);
  return m ? Number(m[1]) : 0;
}

function groupByDay(items: ChecklistItem[]): DayGroup[] {
  return DAY_META.map((meta) => ({
    ...meta,
    items: items.filter((i) => extractDay(i.detail) === meta.day),
  }));
}

export function RecoveryCompanion({ checked, onToggle, onBack, onOpenModule }: Props) {
  const module = MODULES.find((m) => m.id === 'recovery-7day')!;
  const groups = groupByDay(RECOVERY_ITEMS);

  const totalItems = RECOVERY_ITEMS.length;
  const done = countChecked(checked, RECOVERY_ITEMS.map((i) => i.id));
  const pct = totalItems === 0 ? 0 : Math.round((done / totalItems) * 100);

  return (
    <>
      <ModuleHeader module={module} iconName="calendar" onBack={onBack} />

      <div className="privacy-note">
        <Icon name="lock" size={14} />
        Progress saved on this device only. Small steps count — every box is a win.
      </div>

      <div className="recovery">
        {/* INTRO HERO */}
        <div className="recovery__intro">
          <h3>Your first week, one small thing at a time</h3>
          <p>
            The week after a layoff feels like too many decisions at once. This
            companion breaks it into 15 small steps across 7 days. You will not
            do them all perfectly — that is fine. Finishing half is still a
            week-one win.
          </p>
          <div className="recovery__progress">
            <div className="recovery__progress-head">
              <span>Week progress</span>
              <span><strong>{done}</strong> / {totalItems} · {pct}%</span>
            </div>
            <div className="recovery__progress-bar">
              <div className="recovery__progress-fill" style={{ width: `${pct}%` }} />
            </div>
          </div>
        </div>

        {/* DAYS */}
        <div className="recovery__days">
          {groups.map((g) => {
            const dayDone = countChecked(checked, g.items.map((i) => i.id));
            return (
              <div key={g.day} className="recovery-day">
                <div className="recovery-day__head">
                  <div className="recovery-day__badge">Day {g.day}</div>
                  <div className="recovery-day__title">
                    <h4>{g.title}</h4>
                    <p>{g.theme}</p>
                  </div>
                  <div className="recovery-day__done">
                    {dayDone}/{g.items.length} done
                  </div>
                </div>
                <ul className="recovery-day__tasks">
                  {g.items.map((item) => {
                    const isDone = !!checked[item.id];
                    return (
                      <li
                        key={item.id}
                        className={`recovery-task ${isDone ? 'recovery-task--done' : ''}`}
                      >
                        <input
                          type="checkbox"
                          checked={isDone}
                          onChange={() => onToggle(item.id)}
                          aria-label={item.label}
                        />
                        <div className="recovery-task__body">
                          <strong>{item.label}</strong>
                          {item.detail && <span>{item.detail}</span>}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>

        <p className="calc-foot" style={{ marginTop: '0.5rem' }}>
          You do not have to do this alone. If you need someone to talk to,
          scroll to the bottom of the dashboard for free 24/7 support lines.
        </p>

        {onOpenModule && (
          <div style={{ marginTop: '1.5rem', maxWidth: 520 }}>
            <RelatedTools currentRoute="recovery-7day" onOpen={onOpenModule} />
          </div>
        )}
      </div>
    </>
  );
}
