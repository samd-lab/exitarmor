import { useState } from 'react';
import './index.css';
import { Dashboard } from './dashboard/Dashboard';

type View = 'landing' | 'consent' | 'dashboard';

function App() {
  const [view, setView] = useState<View>('landing');
  const [aiActive, setAiActive] = useState(false);

  return (
    <div className="app-container">
      {view === 'landing' && <LandingPage onStart={() => setView('consent')} />}
      {view === 'consent' && (
        <ConsentModal
          onAccept={() => setView('dashboard')}
          onCancel={() => setView('landing')}
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

function LandingPage({ onStart }: { onStart: () => void }) {
  return (
    <>
      <nav className="nav-bar container">
        <div className="logo" style={{ fontWeight: 800, fontSize: '1.5rem', letterSpacing: '-1px' }}>
          EXIT ARMOR
        </div>
        <div className="nav-actions">
          <button className="btn btn-primary" onClick={onStart}>
            Get My Action Plan &mdash; $69
          </button>
        </div>
      </nav>

      <header
        className="hero container animate-fade-in"
        style={{ textAlign: 'center', paddingTop: '6rem', paddingBottom: '4rem' }}
      >
        <p
          className="eyebrow"
          style={{
            color: 'var(--text-muted)',
            fontSize: '0.85rem',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            marginBottom: '1rem',
          }}
        >
          AI-Powered Guidance &middot; Educational Resource &middot; Not a Human Advisor
        </p>
        <h1 style={{ fontSize: '4.5rem', marginBottom: '1.5rem', lineHeight: '1.1' }}>
          Don't Sign That <span className="text-gradient">Severance Letter</span> Yet.
        </h1>
        <p
          style={{
            fontSize: '1.25rem',
            color: 'var(--text-secondary)',
            maxWidth: '700px',
            margin: '0 auto 2.5rem',
          }}
        >
          Our Voice AI audits your offer, finds thousands in hidden leverage, and scripts
          your negotiation in 15 minutes. Don't leave money on the table in the most
          stressful week of your career.
        </p>
        <button
          className="btn btn-primary"
          onClick={onStart}
          style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}
        >
          Start My 20-Min Audit &mdash; $69
        </button>
        <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          &#10003; One-time payment. &#10003; Instant access. &#10003; 7-day money-back guarantee.
        </p>
      </header>

      <section className="container" style={{ padding: '4rem 0' }}>
        <div className="glass-panel" style={{ padding: '3rem', display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Shock is a Strategy.</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              HR is looking out for the company. They rely on you being too overwhelmed
              to negotiate. The $5,000 Gap: most professionals leave at least 2&ndash;4
              weeks of pay or COBRA coverage on the table simply because they didn't ask.
            </p>
            <p style={{ color: 'var(--text-secondary)' }}>
              Confidence on Demand: our AI doesn't just tell you what to say&mdash;it
              roleplays the call with you until you're ready.
            </p>
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="glass-panel" style={{ padding: '1.5rem' }}>
              <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>1. The Offer Audit</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Automated deep-dive into your specific severance package.
              </p>
            </div>
            <div className="glass-panel" style={{ padding: '1.5rem' }}>
              <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>2. The Leverage Report</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                PDF identifying 3&ndash;5 specific asks based on tenure and state law.
              </p>
            </div>
            <div className="glass-panel" style={{ padding: '1.5rem' }}>
              <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>3. Live Prep</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                20 minutes of private, voice-to-voice HR roleplay coaching.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer
        style={{
          borderTop: '1px solid var(--glass-border)',
          padding: '2rem 0',
          marginTop: '4rem',
          textAlign: 'center',
        }}
      >
        <div className="container">
          <p
            style={{
              color: 'var(--text-muted)',
              fontSize: '0.75rem',
              maxWidth: '800px',
              margin: '0 auto',
              lineHeight: '1.6',
            }}
          >
            FirstDayFired / Exit Armor is an AI-powered educational resource. Nothing on
            this website or in our product constitutes legal advice, financial advice,
            tax advice, or professional services of any kind. No attorney-client or
            professional relationship is created by use of this product. Information
            provided is general in nature and may not apply to your specific situation.
            Always consult a licensed professional before making legal or financial
            decisions. FirstDayFired is not a law firm and does not provide legal
            representation.
          </p>
        </div>
      </footer>
    </>
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
