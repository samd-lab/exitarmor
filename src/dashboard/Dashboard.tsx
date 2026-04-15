import { useState } from 'react';
import type { ModuleId } from '../data/modules';
import { useChecklist } from '../lib/storage';
import { Overview } from './Overview';
import { Sidebar } from './components/Sidebar';
import type { Route } from './components/Sidebar';
import { First48Hours } from './modules/First48Hours';
import { Severance } from './modules/Severance';
import { StateResources } from './modules/StateResources';
import { CobraVsAca } from './modules/CobraVsAca';
import { Budget } from './modules/Budget';
import { JobSearch } from './modules/JobSearch';
import './dashboard.css';

interface Props {
  onStartAi: () => void;
}

export function Dashboard({ onStartAi }: Props) {
  const [route, setRoute] = useState<Route>('overview');
  const { checked, toggle } = useChecklist('progress');

  const goOverview = () => setRoute('overview');
  const openModule = (id: ModuleId) => setRoute(id);

  return (
    <div className="dash-shell">
      <Sidebar active={route} onChange={setRoute} />
      <main className="dash-main">
        {route === 'overview' && (
          <Overview
            checked={checked}
            onToggle={toggle}
            onOpenModule={openModule}
            onStartAi={onStartAi}
          />
        )}
        {route === 'first-48' && (
          <First48Hours checked={checked} onToggle={toggle} onBack={goOverview} />
        )}
        {route === 'severance' && (
          <Severance checked={checked} onToggle={toggle} onBack={goOverview} />
        )}
        {route === 'state' && (
          <StateResources checked={checked} onToggle={toggle} onBack={goOverview} />
        )}
        {route === 'cobra-aca' && (
          <CobraVsAca checked={checked} onToggle={toggle} onBack={goOverview} />
        )}
        {route === 'budget' && (
          <Budget checked={checked} onToggle={toggle} onBack={goOverview} />
        )}
        {route === 'job-search' && (
          <JobSearch checked={checked} onToggle={toggle} onBack={goOverview} />
        )}
      </main>
    </div>
  );
}
