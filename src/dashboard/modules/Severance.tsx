import { useState } from 'react';
import { Icon } from '../../components/Icon';
import { MODULES, SEVERANCE_ITEMS } from '../../data/modules';
import { downloadChecklist } from '../../lib/exportChecklist';
import { countChecked } from '../../lib/storage';
import type { ChecklistMap } from '../../lib/storage';
import { Checklist } from '../components/Checklist';
import { ModuleHeader } from '../components/ModuleHeader';

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

const TEMPLATES = [
  {
    id: 'soft-stall',
    title: 'Soft Stall — Buy Time',
    body:
      'Hi [HR Name], thank you for walking me through the package today. I want to make sure I fully understand everything before signing. ' +
      'Could we set up a brief 15-minute call later this week so I can ask a few clarifying questions? In the meantime, please consider this email confirmation that I have not yet accepted the terms.',
  },
  {
    id: 'leverage',
    title: 'Leverage Rebuttal — Ask for More',
    body:
      'Hi [HR Name], after reviewing the offer, I want to thank you for putting it together. Given my [X years] of tenure, my recent contributions to [project], and the standard severance benchmark of 2 weeks per year of service, I would like to formally request: ' +
      '(1) [N] additional weeks of pay, (2) COBRA reimbursement for 3 months, and (3) accelerated vesting of my next equity tranche. I am happy to discuss on a call.',
  },
  {
    id: 'final-signoff',
    title: 'Final Sign-off — Protect Yourself',
    body:
      'Hi [HR Name], I am ready to move forward, but before I sign, please confirm in writing that: ' +
      '(1) the non-compete clause has been removed, (2) my final paycheck includes accrued PTO payout, and (3) I will receive a positive reference upon request. Once I have that confirmation, I will sign and return.',
  },
];

interface Props {
  checked: ChecklistMap;
  onToggle: (id: string) => void;
  onBack: () => void;
}

export function Severance({ checked, onToggle, onBack }: Props) {
  const module = MODULES.find((m) => m.id === 'severance')!;
  const [tab, setTab] = useState<'overview' | 'asks' | 'templates'>('overview');
  const total = SEVERANCE_ITEMS.length;
  const done = countChecked(checked, SEVERANCE_ITEMS.map((i) => i.id));

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
            <button type="button" className={`day-tab ${tab === 'overview' ? 'day-tab--active' : ''}`} onClick={() => setTab('overview')}>Overview</button>
            <button type="button" className={`day-tab ${tab === 'asks' ? 'day-tab--active' : ''}`} onClick={() => setTab('asks')}>11 Negotiable Asks</button>
            <button type="button" className={`day-tab ${tab === 'templates' ? 'day-tab--active' : ''}`} onClick={() => setTab('templates')}>Email Templates</button>
          </div>

          {tab === 'overview' && <Checklist items={SEVERANCE_ITEMS} checked={checked} onToggle={onToggle} />}

          {tab === 'asks' && (
            <ul className="cklist">
              {NEGOTIABLES.map((n, i) => (
                <li key={i} className="cklist__item">
                  <span className="ck ck--checked"><Icon name="check" size={12} /></span>
                  <span className="cklist__label">{n}</span>
                </li>
              ))}
            </ul>
          )}

          {tab === 'templates' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {TEMPLATES.map((t) => (
                <div key={t.id} style={{ background: 'var(--d-surface-soft)', border: '1px solid var(--d-border)', borderRadius: 12, padding: '1rem 1.1rem' }}>
                  <h4 style={{ fontFamily: 'var(--font-heading)', marginBottom: '0.5rem' }}>{t.title}</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--d-text)', lineHeight: 1.6, margin: 0 }}>{t.body}</p>
                  <button
                    type="button"
                    className="btn-pill"
                    style={{ marginTop: '0.7rem' }}
                    onClick={() => navigator.clipboard?.writeText(t.body)}
                  >
                    <Icon name="download" size={14} /> Copy template
                  </button>
                </div>
              ))}
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
