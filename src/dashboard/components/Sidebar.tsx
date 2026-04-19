import { useEffect, useState } from 'react';
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

/** Breakpoint must match the @media in dashboard.css. */
const MOBILE_BP = 980;

interface Props {
  active: Route;
  onChange: (r: Route) => void;
  onOpenProfile?: () => void;
  profileName?: string;
  progress?: { pct: number; done: number; total: number };
}

export function Sidebar({ active, onChange, onOpenProfile, profileName, progress }: Props) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= MOBILE_BP : false
  );

  // Track viewport width so we can conditionally render the drawer vs sidebar
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BP}px)`);
    const handle = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(e.matches);
      if (!e.matches) setDrawerOpen(false); // close drawer when resizing to desktop
    };
    handle(mq); // initial
    mq.addEventListener('change', handle);
    return () => mq.removeEventListener('change', handle);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

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

  const handleNavClick = (id: Route) => {
    onChange(id);
    if (isMobile) {
      setDrawerOpen(false);
      // Scroll to top of content so user sees the new module
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  };

  const handleProfileClick = () => {
    onOpenProfile?.();
    if (isMobile) setDrawerOpen(false);
  };

  // Find active label for the mobile top bar
  const activeLabel = NAV.find((n) => n.id === active)?.label ?? 'Dashboard';

  // ----- Shared sidebar content (rendered both inside desktop aside AND mobile drawer) -----
  const sidebarContent = (
    <>
      <div className="dash-sidebar__brand">
        <div className="dash-sidebar__logo" aria-hidden>
          <BrandMark id="sidebar" size={36} />
        </div>
        <div>
          <div className="dash-sidebar__name">EXIT ARMOR</div>
          <div className="dash-sidebar__tag">Layoff Defense</div>
        </div>
      </div>

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
            onClick={() => handleNavClick(item.id)}
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
        onClick={handleProfileClick}
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
    </>
  );

  // ============ MOBILE: top bar + slide-over drawer ============
  if (isMobile) {
    return (
      <>
        {/* Sticky mobile top bar */}
        <div className="dash-mobile-bar">
          <button
            type="button"
            className="dash-mobile-bar__hamburger"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
          >
            <span /><span /><span />
          </button>
          <div className="dash-mobile-bar__label">{activeLabel}</div>
          <div className="dash-mobile-bar__logo" aria-hidden>
            <BrandMark id="mobile" size={26} />
          </div>
        </div>

        {/* Backdrop */}
        {drawerOpen && (
          <div
            className="dash-drawer-backdrop"
            onClick={() => setDrawerOpen(false)}
            aria-hidden
          />
        )}

        {/* Drawer */}
        <aside className={`dash-sidebar dash-drawer ${drawerOpen ? 'dash-drawer--open' : ''}`}>
          <button
            type="button"
            className="dash-drawer__close"
            onClick={() => setDrawerOpen(false)}
            aria-label="Close menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          {sidebarContent}
        </aside>
      </>
    );
  }

  // ============ DESKTOP: normal sidebar ============
  return <aside className="dash-sidebar">{sidebarContent}</aside>;
}
