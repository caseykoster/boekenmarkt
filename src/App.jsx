import { useState, useEffect, useCallback } from 'react';
import PrepPage from './pages/PrepPage';
import PricingPage from './pages/PricingPage';
import DayOfPage from './pages/DayOfPage';
import TeamPage from './pages/TeamPage';

const TABS = [
  { id: 'prep',    icon: '📋', label: 'Prep',     Component: PrepPage },
  { id: 'dayof',   icon: '🗓️', label: 'Dag van',  Component: DayOfPage },
  { id: 'pricing', icon: '💰', label: 'Prijzen',  Component: PricingPage },
  { id: 'team',    icon: '👥', label: 'Team',     Component: TeamPage },
];

export default function App() {
  const [active, setActive] = useState('prep');
  const [toast, setToast] = useState(false);
  const toastTimer = { current: null };

  const flashToast = useCallback(() => {
    setToast(true);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(false), 1400);
  }, []);

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  const ActiveComponent = TABS.find(t => t.id === active)?.Component;

  return (
    <>
      <header className="app-header">
        <h1>📚 Boeken<span>markt</span></h1>
        <div className="date-badge">19 juni · 2 sessies</div>
      </header>

      <nav className="tabs">
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={active === tab.id ? 'active' : ''}
            onClick={() => setActive(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </nav>

      {ActiveComponent && <ActiveComponent onAction={flashToast} />}

      <div className={`toast ${toast ? 'show' : ''}`}>Opgeslagen ✓</div>
    </>
  );
}
