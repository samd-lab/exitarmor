import { Icon } from '../../components/Icon';
import type { IconName } from '../../components/Icon';
import { BrandMark } from '../../components/BrandMark';
import type { ModuleId } from '../../data/modules';

export type Route = 'overview' | ModuleId | 'email-library';

const NAV: Array<{ id: Route; label: string; icon: IconName }> = [
  { id: 'overview', label: 'Dashboard', icon: 'home' },
  { id: 'first-48', label: 'First 48 Hours', icon: 'shield' },
  { id: 'recovery-7day', label: '7-Day Recovery', icon: 'calendar' },
  { id: 'severance', label: 'Severance Prep', icon: 'briefcase' },
  { id: 'state', label: 'State Resources', icon: 'map' },
  { id: 'cobra-aca', label: 'COBRA vs ACA', icon: 'heart' },
  { id: 'budget', label: '90-Day Budget', icon: 'dollar' },
  { id: 'job-search', label: 'Job Search Tools', icon: 'search' },
  { id: 'email-library', label: 'Email Library', icon: 'mail' },
];

interface Props {
  active: Route;
  onChange: (r: Route) => void;
  onOpenProfile?: () => void;
  profileName?: string;
  progress?: { pct: number; done: number; total: number };
}

export function Sidebar({ active, onChange, onOpenProfile, profileName, progress }: Props) {
  const initials = profileName
    ? profileName
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((p) => p[0]?.toUpperCase() ?? '')
        .join('') || 'EA'
    : 'EA';

  const pct = progress?.pct ?? 0;
  const done = progress?.done ?? 0;
  const total = progress?.total ?? 0;

  return (
    <aside className="dash-sidebar">
      <div className="dash-sidebar__brand">
        <div className="dash-sidebar__logo" aria-hidden>
          <BrandMark id="sidebar" size={36} />
        </div>
        <div>
          <div className="dash-sidebar__name">EXIT ARMOR</div>
          <div className="dash-sidebar__tag">Layoff Defense</div>
        </div>
      </div>

      {/* Personalized progress ring instead of marketing stats */}
      <div className="dash-sidebar__progress" aria-label="Your plan progress">
        <div className="dash-sidebar__progress-head">
          <span className="dash-sidebar__progress-eyebrow">Your plan</span>
          <strong className="dash-sidebar__progress-pct">{pct}%</strong>
        </div>
        <div className="dash-sidebar__progress-bar">
          <span style={{ width: `${pct}%` }} />
        </div>
        <div className="dash-sidebar__progress-sub">
          {done}/{total} tasks complete
        </div>
      </div>

      <div className="dash-sidebar__section">Your Survival Kit</div>
      <nav className="dash-sidebar__nav" aria-label="Modules">
        {NAV.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`dash-nav-item ${active === item.id ? 'dash-nav-item--active' : ''}`}
            onClick={() => onChange(item.id)}
          >
            <span className="dash-nav-item__icon">
              <Icon name={item.icon} size={22} />
            </span>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="dash-sidebar__trust" aria-label="Privacy">
        <Icon name="lock" size={12} />
        <span>Saved on this device</span>
      </div>

      <button
        type="button"
        className="dash-sidebar__footer dash-sidebar__footer--button"
        onClick={onOpenProfile}
      >
        <div className="dash-avatar">{initials}</div>
        <div className="dash-sidebar__footer-text">
          <strong>{profileName || 'Your Details'}</strong>
          <span>{profileName ? 'Edit profile' : 'Tap to personalize templates'}</span>
        </div>
        <span className="dash-sidebar__footer-icon">
          <Icon name="settings" size={14} />
        </span>
      </button>
    </aside>
  );
}
