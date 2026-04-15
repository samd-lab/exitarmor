import { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import './index.css';
import { Dashboard } from './dashboard/Dashboard';
import ActionPlan from './dashboard/ActionPlan';
import Landing from './marketing/pages/Landing';
import About from './marketing/pages/About';
import Contact from './marketing/pages/Contact';
import Disclaimer from './marketing/pages/Disclaimer';
import Terms from './marketing/pages/Terms';
import Privacy from './marketing/pages/Privacy';
import BlogIndex from './marketing/pages/BlogIndex';
import BlogPost from './marketing/pages/BlogPost';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/blog" element={<BlogIndex />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/app" element={<AppShell />} />
        <Route path="/action-plan" element={<ActionPlan />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

type AppView = 'consent' | 'dashboard';

function AppShell() {
  const navigate = useNavigate();
  const [view, setView] = useState<AppView>('consent');
  const [aiActive, setAiActive] = useState(false);

  return (
    <div className="app-container">
      {view === 'consent' && (
        <ConsentModal
          onAccept={() => setView('dashboard')}
          onCancel={() => navigate('/')}
        />
      )}
      {view === 'dashboard' && (
        <>
          <Dashboard onStartAi={() => setAiActive(true)} />
          {aiActive && <AiSessionModal onClose={() => setAiActive(false)} />}
        </>
      )}
    </div>
  );
}

function ConsentModal({ onAccept, onCancel }: { onAccept: () => void; onCancel: () => void }) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.8)',
        backdropFilter: 'blur(5px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
    >
      <div
        className="glass-panel animate-fade-in"
        style={{ maxWidth: '500px', padding: '2.5rem', width: '90%' }}
      >
        <h3 style={{ marginBottom: '1.5rem', color: 'var(--accent-secondary)' }}>Before We Begin</h3>
        <p
          style={{
            marginBottom: '1rem',
            color: 'var(--text-secondary)',
            fontSize: '0.95rem',
          }}
        >
          This session uses your voice input to generate a personalized action plan.
        </p>
        <div
          style={{
            background: 'rgba(0,0,0,0.3)',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '1.5rem',
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
          }}
        >
          <strong>Privacy &amp; Voice Data:</strong> Your voice is processed in real-time
          and is <strong>not stored</strong> after your session ends.
          <br />
          <br />
          <strong>Legal Disclaimer:</strong> I am an AI assistant, not a human lawyer.
          Everything I share is general educational information based on publicly
          available knowledge &mdash; not legal advice. Your situation may require a
          licensed employment attorney.
        </div>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
          <button className="btn btn-glass" onClick={onCancel}>Cancel</button>
          <button className="btn btn-primary" onClick={onAccept}>I Understand, Start Session</button>
        </div>
      </div>
    </div>
  );
}

function AiSessionModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(8, 10, 20, 0.78)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '1.5rem',
      }}
    >
      <div
        style={{
          background: '#0b0f1c',
          color: '#fff',
          borderRadius: 18,
          padding: '2.5rem',
          maxWidth: 460,
          width: '100%',
          textAlign: 'center',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
        }}
      >
        <div
          className="animate-pulse-glow"
          style={{
            width: 110,
            height: 110,
            borderRadius: '50%',
            background: 'rgba(230,57,70,0.12)',
            border: '2px solid rgba(230,57,70,0.4)',
            margin: '0 auto 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg
            width="44"
            height="44"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#e63946"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="9" y="2" width="6" height="12" rx="3" />
            <path d="M5 10v2a7 7 0 0 0 14 0v-2" />
            <line x1="12" y1="19" x2="12" y2="22" />
          </svg>
        </div>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', marginBottom: '0.5rem' }}>
          Alex is listening...
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
          Describe your situation. I'll ask 6 quick questions, then walk you through
          your personalized 48-hour action plan.
        </p>
        <p style={{ color: '#64748b', fontSize: '0.72rem', marginBottom: '1.5rem' }}>
          AI assistant &middot; Voice processed in real time &middot; Not stored
        </p>
        <button className="btn btn-glass" onClick={onClose}>End Session</button>
      </div>
    </div>
  );
}

export default App;
