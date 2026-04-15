import { useState } from 'react';
import { Icon } from '../../components/Icon';
import { EMAIL_TEMPLATES } from '../../data/emailTemplates';
import { MODULES, SEVERANCE_ITEMS } from '../../data/modules';
import { downloadChecklist } from '../../lib/exportChecklist';
import { countChecked, personalize, useProfile } from '../../lib/storage';
import type { ChecklistMap } from '../../lib/storage';
import { Checklist } from '../components/Checklist';
import { ModuleHeader } from '../components/ModuleHeader';
import { SeveranceCalculator } from '../components/SeveranceCalculator';

const SEV_TEMPLATES = EMAIL_TEMPLATES.filter((t) => t.category === 'severance');

const NEGOTIABLES = [
  'Additional weeks of base pay',
  'COBRA premium reimbursement (3–6 months)',
  'Pro-rated annual bonus',
  'Accrued PTO payout (state-dependent)',
  'Vesting acceleration on equity',
  'Outplacement / career coaching services',
  'Removal of non-compete clause',
  'Positive reference letter (in writing)',
  'Extended exercise window for stock options',
  'Confidentiality / non-disparagement carve-outs',
  'Re-employment eligibility',
];

interface Props {
  checked: ChecklistMap;
  onToggle: (id: string) => void;
  onBack: () => void;
}

export function Severance({ checked, onToggle, onBack }: Props) {
  const module = MODULES.find((m) => m.id === 'severance')!;
  const [tab, setTab] = useState<'overview' | 'calculator' | 'asks' | 'templates'>('calculator');
  const [activeTpl, setActiveTpl] = useState<string>(SEV_TEMPLATES[0]?.id ?? '');
  const [copied, setCopied] = useState<string | null>(null);
  const [profile] = useProfile();
  const total = SEVERANCE_ITEMS.length;
  const done = countChecked(checked, SEVERANCE_ITEMS.map((i) => i.id));

  const current = SEV_TEMPLATES.find((t) => t.id === activeTpl) ?? SEV_TEMPLATES[0];
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
        iconName="briefcase"
        onBack={onBack}
        onDownload={() => downloadChecklist(module.title, SEVERANCE_ITEMS, checked)}
      />

      <div className="privacy-note">
        <Icon name="lock" size={14} />
        Educational guidance only — for offers above $20K, an employment attorney can
        review in a free 15-minute consult.
      </div>

      <div className="module-page__layout">
        <div className="module-page__primary">
          <div className="day-tabs">
            <button type="button" className={`day-tab ${tab === 'calculator' ? 'day-tab--active' : ''}`} onClick={() => setTab('calculator')}>Calculator</button>
            <button type="button" className={`day-tab ${tab === 'overview' ? 'day-tab--active' : ''}`} onClick={() => setTab('overview')}>Checklist</button>
            <button type="button" className={`day-tab ${tab === 'asks' ? 'day-tab--active' : ''}`} onClick={() => setTab('asks')}>11 Negotiable Asks</button>
            <button type="button" className={`day-tab ${tab === 'templates' ? 'day-tab--active' : ''}`} onClick={() => setTab('templates')}>Email Templates</button>
          </div>

          {tab === 'calculator' && <SeveranceCalculator />}
          {tab === 'overview' && <Checklist items={SEVERANCE_ITEMS} checked={checked} onToggle={onToggle} />}

          {tab === 'asks' && (
            <ul className="cklist">
              {NEGOTIABLES.map((n, i) => (
                <li key={i} className="cklist__item">
                  <div className="cklist__row">
                    <span className="ck ck--checked"><Icon name="check" size={12} /></span>
                    <span className="cklist__label">{n}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {tab === 'templates' && current && (
            <div className="tpl">
              <div className="privacy-note" style={{ marginBottom: '1rem' }}>
                <Icon name="user" size={14} />
                Fill in <strong>Your Details</strong> (top of the page) and every template
                will auto-fill your name, company, HR contact, and tenure.
              </div>
              <div className="tpl__tabs">
                {SEV_TEMPLATES.map((t) => (
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
                  <strong>When to send:</strong> {current.when}
                </div>
                <div className="tpl__subject">
                  <span className="tpl__subject-label">Subject</span>
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
                    {copied === current.id ? 'Copied!' : 'Copy full email'}
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
            <h4>Industry benchmark</h4>
            <p>1–2 weeks of pay per year of service is the typical range. Senior leaders often receive 3–4 weeks per year.</p>
          </div>
          <div className="module-side-card">
            <h4>HR script preview</h4>
            <p>
              "I appreciate the offer. Given my tenure and recent contributions, I would
              like to discuss a few specific adjustments before I sign — could we book
              15 minutes this week?"
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
