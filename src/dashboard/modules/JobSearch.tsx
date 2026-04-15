import { useState } from 'react';
import { Icon } from '../../components/Icon';
import { EMAIL_TEMPLATES } from '../../data/emailTemplates';
import { JOB_SEARCH_ITEMS, MODULES } from '../../data/modules';
import type { ModuleId } from '../../data/modules';
import { downloadChecklist } from '../../lib/exportChecklist';
import { countChecked, personalize, useProfile } from '../../lib/storage';
import type { ChecklistMap } from '../../lib/storage';
import { Checklist } from '../components/Checklist';
import { ModuleHeader } from '../components/ModuleHeader';
import { StoryBuilder } from '../components/StoryBuilder';
import { RelatedTools } from '../components/RelatedTools';

interface Props {
  checked: ChecklistMap;
  onToggle: (id: string) => void;
  onBack: () => void;
  onOpenModule?: (id: ModuleId) => void;
}

const JOB_TEMPLATES = EMAIL_TEMPLATES.filter((t) => t.category === 'job-search');

export function JobSearch({ checked, onToggle, onBack, onOpenModule }: Props) {
  const module = MODULES.find((m) => m.id === 'job-search')!;
  const [profile] = useProfile();
  const [activeTpl, setActiveTpl] = useState<string>(JOB_TEMPLATES[0]?.id ?? '');
  const [copied, setCopied] = useState<string | null>(null);

  const total = JOB_SEARCH_ITEMS.length;
  const done = countChecked(checked, JOB_SEARCH_ITEMS.map((i) => i.id));

  const current = JOB_TEMPLATES.find((t) => t.id === activeTpl) ?? JOB_TEMPLATES[0];
  const body = current ? personalize(current.body, profile) : '';
  const subject = current ? personalize(current.subject, profile) : '';

  const copy = (id: string, text: string) => {
    navigator.clipboard?.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <>
      <ModuleHeader
        module={module}
        iconName="search"
        onBack={onBack}
        onDownload={() => downloadChecklist(module.title, JOB_SEARCH_ITEMS, checked)}
      />

      <div className="privacy-note">
        <Icon name="lock" size={14} />
        Tip: fill in <strong>Your Details</strong> (top-right of the dashboard) and every
        template below will auto-fill your name, company, and target role.
      </div>

      <div className="module-page__layout">
        <div className="module-page__primary">
          <h4 style={{ fontFamily: 'var(--font-heading)', marginBottom: '0.5rem' }}>Your job-search checklist</h4>
          <Checklist items={JOB_SEARCH_ITEMS} checked={checked} onToggle={onToggle} />

          <h4 style={{ fontFamily: 'var(--font-heading)', marginTop: '2rem', marginBottom: '0.75rem' }}>
            Outreach &amp; interview templates
          </h4>
          {current && (
            <div className="tpl">
              <div className="tpl__tabs">
                {JOB_TEMPLATES.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    className={`tpl__tab ${activeTpl === t.id ? 'tpl__tab--active' : ''}`}
                    onClick={() => setActiveTpl(t.id)}
                  >
                    <span className="tpl__tag">{t.tag}</span>
                    <span>{t.title}</span>
                  </button>
                ))}
              </div>
              <div className="tpl__body">
                <div className="tpl__meta">
                  <strong>When to use:</strong> {current.when}
                </div>
                <div className="tpl__subject">
                  <span className="tpl__subject-label">Subject / format</span>
                  <span>{subject}</span>
                </div>
                <pre className="tpl__pre">{body}</pre>
                <div className="tpl__actions">
                  <button
                    type="button"
                    className="btn-pill"
                    onClick={() => copy(current.id, `Subject: ${subject}\n\n${body}`)}
                  >
                    <Icon name="download" size={14} />{' '}
                    {copied === current.id ? 'Copied!' : 'Copy full template'}
                  </button>
                </div>
                <div className="tpl__notes">
                  <h5>Why this works</h5>
                  <ul>
                    {current.notes.map((n, i) => (
                      <li key={i}>{n}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          <h4 style={{ fontFamily: 'var(--font-heading)', marginTop: '2rem', marginBottom: '0.25rem' }}>
            Interview story builder
          </h4>
          <p style={{ margin: 0, color: 'var(--d-text-muted)', fontSize: '0.88rem', lineHeight: 1.5 }}>
            Every interview pulls from the same 5–6 stories. Draft them once, use them forever.
            Works for any job — tech, trades, retail, healthcare. No jargon.
          </p>
          <StoryBuilder />
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
          <div className="module-side-card">
            <h4>The 90-second answer</h4>
            <p>Every interview will ask what happened. Practice the "How to Explain Your Layoff" template out loud until it is automatic.</p>
          </div>

          {onOpenModule && <RelatedTools currentRoute="job-search" onOpen={onOpenModule} />}
        </aside>
      </div>
    </>
  );
}
