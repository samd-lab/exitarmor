import { Icon } from '../../components/Icon';
import { JOB_SEARCH_ITEMS, MODULES } from '../../data/modules';
import { downloadChecklist } from '../../lib/exportChecklist';
import { countChecked } from '../../lib/storage';
import type { ChecklistMap } from '../../lib/storage';
import { Checklist } from '../components/Checklist';
import { ModuleHeader } from '../components/ModuleHeader';

interface Props {
  checked: ChecklistMap;
  onToggle: (id: string) => void;
  onBack: () => void;
}

const TEMPLATES = [
  { title: 'How to Explain Your Layoff', body: 'My role was eliminated as part of a broader restructuring at [Company]. I\'m now focused on finding a [target role] where I can [bring X skill / impact].' },
  { title: 'Outreach Message — Warm Network', body: 'Hi [Name], hope you\'re well. Quick update: I was laid off from [Company] last week and I\'m now looking for [target role] opportunities. If you know anyone hiring or have any advice, I\'d really appreciate it.' },
  { title: 'Recruiter Cold Outreach', body: 'Hi [Name], I noticed you\'re recruiting for [role] at [Company]. With [X years] in [domain] and recent experience [specific accomplishment], I\'d love to learn more — would a 15-min call work this week?' },
];

export function JobSearch({ checked, onToggle, onBack }: Props) {
  const module = MODULES.find((m) => m.id === 'job-search')!;
  const total = JOB_SEARCH_ITEMS.length;
  const done = countChecked(checked, JOB_SEARCH_ITEMS.map((i) => i.id));

  return (
    <>
      <ModuleHeader
        module={module}
        iconName="search"
        onBack={onBack}
        onDownload={() => downloadChecklist(module.title, JOB_SEARCH_ITEMS, checked)}
      />

      <div className="module-page__layout">
        <div className="module-page__primary">
          <h4 style={{ fontFamily: 'var(--font-heading)', marginBottom: '0.5rem' }}>Your job-search checklist</h4>
          <Checklist items={JOB_SEARCH_ITEMS} checked={checked} onToggle={onToggle} />

          <h4 style={{ fontFamily: 'var(--font-heading)', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Outreach templates</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {TEMPLATES.map((t, i) => (
              <div key={i} style={{ background: 'var(--d-surface-soft)', border: '1px solid var(--d-border)', borderRadius: 12, padding: '1rem 1.1rem' }}>
                <h4 style={{ fontFamily: 'var(--font-heading)', marginBottom: '0.4rem', fontSize: '0.95rem' }}>{t.title}</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--d-text)', lineHeight: 1.6, margin: 0 }}>{t.body}</p>
                <button
                  type="button"
                  className="btn-pill"
                  style={{ marginTop: '0.7rem' }}
                  onClick={() => navigator.clipboard?.writeText(t.body)}
                >
                  <Icon name="download" size={14} /> Copy
                </button>
              </div>
            ))}
          </div>
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
            <h4>First 7 days</h4>
            <p>Update LinkedIn → enable "Open to work" (recruiters only) → reach 10 warm contacts → apply to 5 high-fit roles.</p>
          </div>
        </aside>
      </div>
    </>
  );
}
