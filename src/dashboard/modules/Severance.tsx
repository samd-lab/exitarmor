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
import { HrRoleplay } from '../components/HrRoleplay';
import { OfferCompare } from '../components/OfferCompare';
import { AttorneyDirectory } from '../components/AttorneyDirectory';
import { BenchmarkCard } from '../components/BenchmarkCard';
import { RelatedTools } from '../components/RelatedTools';
import type { ModuleId } from '../../data/modules';

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
  onOpenModule?: (id: ModuleId) => void;
}

export function Severance({ checked, onToggle, onBack, onOpenModule }: Props) {
  const module = MODULES.find((m) => m.id === 'severance')!;
  const [tab, setTab] = useState<'overview' | 'calculator' | 'asks' | 'templates' | 'roleplay' | 'compare' | 'attorney' | 'benchmarks'>('calculator');
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
          {/* 3-stage severance workflow. Tabs are split into "Understand",
              "Decide", "Act" so the user sees the order instead of a wall
              of 8 equal chips. Icons make each tab scannable without
              reading the label. */}
          <div className="sev-workflow">
            <div className="sev-workflow__group">
              <span className="sev-workflow__eyebrow">1 · Understand</span>
              <div className="sev-workflow__tabs">
                <button type="button" className={`sev-tab ${tab === 'calculator' ? 'sev-tab--active' : ''}`} onClick={() => setTab('calculator')}>
                  <Icon name="dollar" size={14} /> Calculator
                </button>
                <button type="button" className={`sev-tab ${tab === 'benchmarks' ? 'sev-tab--active' : ''}`} onClick={() => setTab('benchmarks')}>
                  <Icon name="chart" size={14} /> Benchmarks
                </button>
                <button type="button" className={`sev-tab ${tab === 'compare' ? 'sev-tab--active' : ''}`} onClick={() => setTab('compare')}>
                  <Icon name="scale" size={14} /> Offer Compare
                </button>
              </div>
            </div>
            <div className="sev-workflow__group">
              <span className="sev-workflow__eyebrow">2 · Decide</span>
              <div className="sev-workflow__tabs">
                <button type="button" className={`sev-tab ${tab === 'overview' ? 'sev-tab--active' : ''}`} onClick={() => setTab('overview')}>
                  <Icon name="check" size={14} /> Checklist
                </button>
                <button type="button" className={`sev-tab ${tab === 'asks' ? 'sev-tab--active' : ''}`} onClick={() => setTab('asks')}>
                  <Icon name="list" size={14} /> 11 Asks
                </button>
              </div>
            </div>
            <div className="sev-workflow__group">
              <span className="sev-workflow__eyebrow">3 · Act</span>
              <div className="sev-workflow__tabs">
                <button type="button" className={`sev-tab ${tab === 'templates' ? 'sev-tab--active' : ''}`} onClick={() => setTab('templates')}>
                  <Icon name="mail" size={14} /> Emails <span className="sev-tab__count">21</span>
                </button>
                <button type="button" className={`sev-tab ${tab === 'roleplay' ? 'sev-tab--active' : ''}`} onClick={() => setTab('roleplay')}>
                  <Icon name="mic" size={14} /> HR Roleplay
                </button>
                <button type="button" className={`sev-tab ${tab === 'attorney' ? 'sev-tab--active' : ''}`} onClick={() => setTab('attorney')}>
                  <Icon name="scale" size={14} /> Attorney
                </button>
              </div>
            </div>
          </div>

          {tab === 'calculator' && <SeveranceCalculator />}
          {tab === 'overview' && <Checklist items={SEVERANCE_ITEMS} checked={checked} onToggle={onToggle} />}
          {tab === 'roleplay' && <HrRoleplay />}
          {tab === 'compare' && <OfferCompare />}
          {tab === 'attorney' && <AttorneyDirectory />}
          {tab === 'benchmarks' && <BenchmarkCard />}

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
            <h4>Industry benchmarks</h4>
            <p>1–2 weeks of pay per year of service is the typical range. Senior leaders often receive 3–4 weeks per year.</p>
            <button type="button" className="btn-pill btn-pill--ghost" style={{ marginTop: '0.5rem' }} onClick={() => setTab('benchmarks')}>
              See all citations <Icon name="arrow" size={12} />
            </button>
          </div>
          <div className="module-side-card">
            <h4>Rehearse the HR call</h4>
            <p>
              Practice the 8 hardest moments of a severance call — time pressure,
              "non-negotiable," veiled threats. Branching scripts, no AI.
            </p>
            <button type="button" className="btn-pill btn-pill--ghost" style={{ marginTop: '0.5rem' }} onClick={() => setTab('roleplay')}>
              Open HR Roleplay <Icon name="arrow" size={12} />
            </button>
          </div>

          {onOpenModule && <RelatedTools currentRoute="severance" onOpen={onOpenModule} />}
        </aside>
      </div>
    </>
  );
}
