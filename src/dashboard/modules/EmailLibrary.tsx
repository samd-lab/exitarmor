// Email Library — a single index of every template in the kit.
//
// The Severance and Job Search modules each have their own templates tab,
// but users kept asking "where are the 20 email templates?" — the answer
// was buried two clicks deep. This module is the flat browsable catalogue
// that points people into the right sub-module to actually send.
//
// No checklist here, no progress. Just discovery + jump-to.

import { useMemo, useState } from 'react';
import { Icon } from '../../components/Icon';
import { EMAIL_TEMPLATES } from '../../data/emailTemplates';
import type { EmailTemplate } from '../../data/emailTemplates';
import type { ModuleId } from '../../data/modules';

interface Props {
  onBack: () => void;
  /** Wider signature — we pass an optional tab hint so clicking
   *  "Open in Severance" lands on the Emails tab, not Calculator. */
  onOpenModule: (id: ModuleId, opts?: { tab?: string }) => void;
}

type Filter = 'all' | 'severance' | 'job-search';

const FILTER_LABELS: Record<Filter, string> = {
  'all': 'All templates',
  'severance': 'Severance negotiation',
  'job-search': 'Job search & interviews',
};

export function EmailLibrary({ onBack, onOpenModule }: Props) {
  const [filter, setFilter] = useState<Filter>('all');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return EMAIL_TEMPLATES.filter((t) => {
      if (filter !== 'all' && t.category !== filter) return false;
      if (!q) return true;
      return (
        t.title.toLowerCase().includes(q) ||
        t.subject.toLowerCase().includes(q) ||
        t.when.toLowerCase().includes(q) ||
        t.tag.toLowerCase().includes(q)
      );
    });
  }, [filter, query]);

  const severanceCount = EMAIL_TEMPLATES.filter((t) => t.category === 'severance').length;
  const jobSearchCount = EMAIL_TEMPLATES.filter((t) => t.category === 'job-search').length;
  const total = EMAIL_TEMPLATES.length;

  return (
    <>
      <div className="module-page__head">
        <div className="module-page__title-wrap">
          <div
            className="module-page__icon"
            style={{ background: 'linear-gradient(135deg, #e0f2fe, #dbeafe)' }}
          >
            <Icon name="mail" size={26} />
          </div>
          <div>
            <h2 className="module-page__title">Email Library</h2>
            <p className="module-page__sub">
              Every template in the kit — {total} copy-ready emails for severance,
              networking, and interviews.
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button type="button" className="btn-ghost-back" onClick={onBack}>
            <Icon name="arrow" size={14} style={{ transform: 'rotate(180deg)' }} />
            Back
          </button>
        </div>
      </div>

      <div className="privacy-note">
        <Icon name="lock" size={14} />
        Templates are copy-and-personalize. Every send keeps the paper trail on your side.
      </div>

      <div className="emaillib">
        <div className="emaillib__filters">
          <div className="day-tabs">
            <button
              type="button"
              className={`day-tab ${filter === 'all' ? 'day-tab--active' : ''}`}
              onClick={() => setFilter('all')}
            >
              <Icon name="mail" size={13} /> All
              <span className="day-tab__count">{total}</span>
            </button>
            <button
              type="button"
              className={`day-tab ${filter === 'severance' ? 'day-tab--active' : ''}`}
              onClick={() => setFilter('severance')}
            >
              <Icon name="briefcase" size={13} /> Severance
              <span className="day-tab__count">{severanceCount}</span>
            </button>
            <button
              type="button"
              className={`day-tab ${filter === 'job-search' ? 'day-tab--active' : ''}`}
              onClick={() => setFilter('job-search')}
            >
              <Icon name="search" size={13} /> Job Search
              <span className="day-tab__count">{jobSearchCount}</span>
            </button>
          </div>
          <div className="emaillib__search">
            <Icon name="search" size={14} />
            <input
              type="search"
              placeholder="Search by title, subject, or situation..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search templates"
            />
          </div>
        </div>

        <div className="emaillib__results">
          <span>
            Showing <strong>{filtered.length}</strong> of {total} templates
            {filter !== 'all' && <> · filter: {FILTER_LABELS[filter]}</>}
          </span>
        </div>

        {filtered.length === 0 ? (
          <div className="emaillib__empty">
            <Icon name="info" size={18} />
            <p>No templates match your search. Try a different keyword or clear the filter.</p>
          </div>
        ) : (
          <div className="emaillib__grid">
            {filtered.map((t) => (
              <EmailCard key={t.id} template={t} onOpenModule={onOpenModule} />
            ))}
          </div>
        )}

        <p className="calc-foot" style={{ marginTop: '1.25rem' }}>
          Want to personalize with your name and numbers? Fill out your profile in the
          sidebar footer — templates auto-fill from there.
        </p>
      </div>
    </>
  );
}

function EmailCard({
  template,
  onOpenModule,
}: {
  template: EmailTemplate;
  onOpenModule: (id: ModuleId, opts?: { tab?: string }) => void;
}) {
  const targetModule: ModuleId =
    template.category === 'job-search' ? 'job-search' : 'severance';
  const targetLabel =
    template.category === 'job-search' ? 'Open in Job Search' : 'Open in Severance';
  // Severance module has 8 tabs — always land on "Emails" when jumping
  // from the Email Library, otherwise user hits Calculator and wonders
  // where their template went. Job Search module shows templates by
  // default, so no tab hint needed there.
  const targetTab = template.category === 'job-search' ? undefined : 'templates';

  return (
    <div className="emailcard">
      <div className="emailcard__head">
        <span className={`emailcard__tag emailcard__tag--${template.category ?? 'severance'}`}>
          {template.tag}
        </span>
      </div>
      <h4 className="emailcard__title">{template.title}</h4>
      <p className="emailcard__when">
        <Icon name="calendar" size={12} /> {template.when}
      </p>
      <div className="emailcard__subject">
        <span className="emailcard__subject-label">Subject</span>
        <span className="emailcard__subject-text">{template.subject}</span>
      </div>
      <button
        type="button"
        className="emailcard__jump"
        onClick={() => onOpenModule(targetModule, targetTab ? { tab: targetTab } : undefined)}
      >
        <Icon name="arrow" size={12} />
        {targetLabel}
      </button>
    </div>
  );
}
