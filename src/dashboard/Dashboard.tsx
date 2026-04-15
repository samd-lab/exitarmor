import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ModuleId } from '../data/modules';
import { useChecklist, useProfile } from '../lib/storage';
import { Icon } from '../components/Icon';
import { Overview } from './Overview';
import { Sidebar } from './components/Sidebar';
import type { Route } from './components/Sidebar';
import { ProfilePanel } from './components/ProfilePanel';
import { First48Hours } from './modules/First48Hours';
import { Severance } from './modules/Severance';
import { StateResources } from './modules/StateResources';
import { CobraVsAca } from './modules/CobraVsAca';
import { Budget } from './modules/Budget';
import { JobSearch } from './modules/JobSearch';
import { RecoveryCompanion } from './modules/RecoveryCompanion';
import './dashboard.css';

interface Props {
  onStartAi: () => void;
}

export function Dashboard({ onStartAi }: Props) {
  const navigate = useNavigate();
  const [route, setRoute] = useState<Route>('overview');
  const { checked, toggle } = useChecklist('progress');
  const [profile, setProfile] = useProfile();
  const [profileOpen, setProfileOpen] = useState(false);

  const goOverview = () => setRoute('overview');
  const openModule = (id: ModuleId) => setRoute(id);
  const firstName = profile.name ? profile.name.split(' ')[0] : '';

  return (
    <div className="dash-shell">
      <Sidebar active={route} onChange={setRoute} onOpenProfile={() => setProfileOpen(true)} profileName={profile.name} />
      <main className="dash-main">
        <div className="dash-topbar">
          <div className="dash-topbar__greet">
            {firstName ? (
              <>
                <span>Welcome back,</span> <strong>{firstName}</strong>
              </>
            ) : (
              <>
                <span>Welcome to</span> <strong>Exit Armor</strong>
              </>
            )}
            <span className="dash-topbar__sub">Your 90-day plan is ready</span>
          </div>
          <div className="dash-topbar__actions">
            <span className="dash-pill">
              <Icon name="lock" size={14} /> Saved on this device
            </span>
            <button
              type="button"
              className="btn-pill btn-pill--ghost"
              onClick={() => setProfileOpen(true)}
            >
              <Icon name="user" size={14} />
              {profile.name ? 'Your Details' : 'Add Your Details'}
            </button>
            <button
              type="button"
              className="btn-pill btn-pill--primary"
              onClick={() => navigate('/action-plan')}
            >
              <Icon name="download" size={14} />
              Action Plan PDF
            </button>
            <button
              type="button"
              className="dash-ai-btn dash-ai-btn--soon"
              onClick={onStartAi}
              aria-label="Talk to AI — coming soon"
              title="Talk to AI — coming soon"
            >
              <span className="dash-ai-btn__dot dash-ai-btn__dot--soon" />
              <Icon name="mic" size={16} />
              Talk to AI
              <span className="dash-ai-btn__badge">Soon</span>
            </button>
          </div>
        </div>

        {route === 'overview' && (
          <Overview
            checked={checked}
            onToggle={toggle}
            onOpenModule={openModule}
            firstName={firstName}
          />
        )}
        {route === 'first-48' && (
          <First48Hours checked={checked} onToggle={toggle} onBack={goOverview} onOpenModule={openModule} />
        )}
        {route === 'severance' && (
          <Severance checked={checked} onToggle={toggle} onBack={goOverview} onOpenModule={openModule} />
        )}
        {route === 'state' && (
          <StateResources checked={checked} onToggle={toggle} onBack={goOverview} onOpenModule={openModule} />
        )}
        {route === 'cobra-aca' && (
          <CobraVsAca checked={checked} onToggle={toggle} onBack={goOverview} onOpenModule={openModule} />
        )}
        {route === 'budget' && (
          <Budget checked={checked} onToggle={toggle} onBack={goOverview} onOpenModule={openModule} />
        )}
        {route === 'job-search' && (
          <JobSearch checked={checked} onToggle={toggle} onBack={goOverview} onOpenModule={openModule} />
        )}
        {route === 'recovery-7day' && (
          <RecoveryCompanion checked={checked} onToggle={toggle} onBack={goOverview} onOpenModule={openModule} />
        )}
      </main>

      {profileOpen && (
        <ProfilePanel profile={profile} setProfile={setProfile} onClose={() => setProfileOpen(false)} />
      )}
    </div>
  );
}
