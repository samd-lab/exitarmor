import { Icon } from '../../components/Icon';
import type { IconName } from '../../components/Icon';
import type { ModuleId } from '../../data/modules';

export type Route = 'overview' | ModuleId;

const NAV: Array<{ id: Route; label: string; icon: IconName }> = [
  { id: 'overview', label: 'Dashboard', icon: 'home' },
  { id: 'first-48', label: 'First 48 Hours', icon: 'shield' },
  { id: 'recovery-7day', label: '7-Day Recovery', icon: 'calendar' },
  { id: 'severance', label: 'Severance Prep', icon: 'briefcase' },
  { id: 'state', label: 'State Resources', icon: 'map' },
  { id: 'cobra-aca', label: 'COBRA vs ACA', icon: 'heart' },
  { id: 'budget', label: '90-Day Budget', icon: 'dollar' },
  { id: 'job-search', label: 'Job Search Tools', icon: 'search' },
];

interface Props {
  active: Route;
  onChange: (r: Route) => void;
  onOpenProfile?: () => void;
  profileName?: string;
}

export function Sidebar({ active, onChange, onOpenProfile, profileName }: Props) {
  const initials = profileName
    ? profileName
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((p) => p[0]?.toUpperCase() ?? '')
        .join('') || 'EA'
    : 'EA';

  return (
    <aside className="dash-sidebar">
      <div className="dash-sidebar__brand">
        <div className="dash-sidebar__logo">EA</div>
        <div>
          <div className="dash-sidebar__name">EXIT ARMOR</div>
          <div className="dash-sidebar__tag">Layoff Defense</div>
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
              <Icon name={item.icon} size={18} />
            </span>
            {item.label}
          </button>
        ))}
      </nav>

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
