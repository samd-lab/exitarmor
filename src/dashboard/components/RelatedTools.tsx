import type { ReactElement } from 'react';
import type { ModuleId } from '../../data/modules';
import type { Route } from './Sidebar';

// ---------------------------------------------------------------------------
// Custom SVG icons — drawn specifically for Exit Armor's tools.
// All use currentColor so the CSS layer can paint them in a single accent
// (amber on ink) for an editorial, restrained premium look.
// ---------------------------------------------------------------------------

function IconSeveranceCalc() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="4" y="3" width="16" height="18" rx="2.5" />
      <rect x="7" y="6" width="10" height="4" rx="0.8" />
      <path d="M10 8.2h0.01" />
      <circle cx="8.5" cy="13.5" r="0.9" />
      <circle cx="12" cy="13.5" r="0.9" />
      <circle cx="15.5" cy="13.5" r="0.9" />
      <circle cx="8.5" cy="17" r="0.9" />
      <circle cx="12" cy="17" r="0.9" />
      <circle cx="15.5" cy="17" r="0.9" />
    </svg>
  );
}

function IconFirst48() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="13" r="8" />
      <path d="M12 9v4l2.6 2" />
      <path d="M9 2h6" />
      <path d="M12 2v2" />
      <path d="M19.5 5.5l1.2-1.2" />
    </svg>
  );
}

function IconRecovery7() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 3v4" />
      <path d="M16 3v4" />
      <path d="M7.5 14.5l1.6 1.6 3.4-3.4" />
      <path d="M14 17h4" />
    </svg>
  );
}

function IconCobraAca() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 3l7 3v5c0 4.8-3.1 8.7-7 10-3.9-1.3-7-5.2-7-10V6l7-3z" />
      <path d="M12 9.6c-.9-1.5-3.6-1.2-3.6 1 0 2 3.6 4 3.6 4s3.6-2 3.6-4c0-2.2-2.7-2.5-3.6-1z" />
    </svg>
  );
}

function IconBudget90() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 20h18" />
      <path d="M3 20V8" />
      <rect x="6" y="13" width="3" height="7" rx="0.5" />
      <rect x="11" y="10" width="3" height="10" rx="0.5" />
      <rect x="16" y="6" width="3" height="14" rx="0.5" />
      <path d="M4 6l5-3 4 2 6-4" />
    </svg>
  );
}

function IconStateLaw() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 21s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z" />
      <circle cx="12" cy="9" r="2.5" />
      <path d="M9.5 12.5h5" />
    </svg>
  );
}

function IconJobStory() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M6 3h9l4 4v14H6z" />
      <path d="M15 3v4h4" />
      <path d="M9 12h6" />
      <path d="M9 15.5h6" />
      <path d="M9 19l2 1.5L14 17" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Tool catalogue — every entry is a real destination the user can jump to.
// ---------------------------------------------------------------------------

type ToolKey = ModuleId;

interface Tool {
  key: ToolKey;
  label: string;
  blurb: string;
  Icon: () => ReactElement;
}

const TOOLS: Record<ToolKey, Tool> = {
  severance: {
    key: 'severance',
    label: 'Severance Calculator',
    blurb: '11 asks, ranked floor → stretch',
    Icon: IconSeveranceCalc,
  },
  'first-48': {
    key: 'first-48',
    label: 'First 48 Hours',
    blurb: 'Day-by-day critical actions',
    Icon: IconFirst48,
  },
  'recovery-7day': {
    key: 'recovery-7day',
    label: '7-Day Recovery',
    blurb: 'Week-one wellbeing cadence',
    Icon: IconRecovery7,
  },
  'cobra-aca': {
    key: 'cobra-aca',
    label: 'COBRA vs ACA',
    blurb: 'Keep coverage without overpaying',
    Icon: IconCobraAca,
  },
  budget: {
    key: 'budget',
    label: '90-Day Runway',
    blurb: 'Bills, creditors, cash plan',
    Icon: IconBudget90,
  },
  state: {
    key: 'state',
    label: 'State Resources',
    blurb: 'Your state\u2019s unemployment rules',
    Icon: IconStateLaw,
  },
  'job-search': {
    key: 'job-search',
    label: 'Job Search Tools',
    blurb: 'Story, resume, outreach scripts',
    Icon: IconJobStory,
  },
};

// ---------------------------------------------------------------------------
// Contextual mapping — which tools to surface on each page.
// Current module is always filtered out, and we cap the list so the aside
// stays airy. Order is deliberate: most relevant first.
// ---------------------------------------------------------------------------

const CONTEXT_TOOLS: Record<Route, ToolKey[]> = {
  overview: ['severance', 'first-48', 'cobra-aca', 'budget'],
  'first-48': ['severance', 'cobra-aca', 'state', 'recovery-7day'],
  'recovery-7day': ['job-search', 'budget', 'cobra-aca', 'severance'],
  severance: ['budget', 'cobra-aca', 'job-search', 'state'],
  state: ['severance', 'cobra-aca', 'budget', 'first-48'],
  'cobra-aca': ['severance', 'budget', 'state', 'first-48'],
  budget: ['severance', 'cobra-aca', 'job-search', 'state'],
  'job-search': ['severance', 'recovery-7day', 'budget', 'state'],
  'email-library': ['severance', 'job-search', 'first-48', 'recovery-7day'],
};

interface Props {
  currentRoute: Route;
  onOpen: (route: ModuleId) => void;
  title?: string;
}

export function RelatedTools({ currentRoute, onOpen, title = 'You might also need' }: Props) {
  const keys = (CONTEXT_TOOLS[currentRoute] || [])
    .filter((k) => k !== currentRoute)
    .slice(0, 4);

  if (keys.length === 0) return null;

  return (
    <div className="related-tools" aria-label={title}>
      <div className="related-tools__header">
        <h4 className="related-tools__title">{title}</h4>
        <span className="related-tools__sub">Jump to the tool</span>
      </div>
      <div className="related-tools__list">
        {keys.map((k) => {
          const t = TOOLS[k];
          if (!t) return null;
          return (
            <button
              key={t.key}
              type="button"
              className="related-tile"
              onClick={() => onOpen(t.key)}
            >
              <span className="related-tile__icon">
                <t.Icon />
              </span>
              <span className="related-tile__text">
                <strong>{t.label}</strong>
                <span>{t.blurb}</span>
              </span>
              <span className="related-tile__arrow" aria-hidden>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="M13 6l6 6-6 6" />
                </svg>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
