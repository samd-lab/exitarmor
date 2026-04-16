import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
import Checkout from './marketing/pages/Checkout';
import Thanks from './marketing/pages/Thanks';
import NotFound from './marketing/pages/NotFound';
import LandingSeverance from './marketing/pages/LandingSeverance';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/severance" element={<LandingSeverance />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/blog" element={<BlogIndex />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/app" element={<AppShell />} />
        <Route path="/action-plan" element={<ActionPlan />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/thanks" element={<Thanks />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

function AppShell() {
  const [aiComingSoon, setAiComingSoon] = useState(false);

  return (
    <div className="app-container">
      <Dashboard onStartAi={() => setAiComingSoon(true)} />
      {aiComingSoon && <AiComingSoonModal onClose={() => setAiComingSoon(false)} />}
    </div>
  );
}

function AiComingSoonModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(8, 10, 20, 0.72)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '1.5rem',
      }}
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'linear-gradient(160deg, #0b0f1c 0%, #1a1230 55%, #2a0f2a 100%)',
          color: '#fff',
          borderRadius: 20,
          padding: '2.5rem 2rem 2rem',
          maxWidth: 460,
          width: '100%',
          textAlign: 'center',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 40px 90px rgba(0,0,0,0.55)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: -80,
            left: -80,
            width: 240,
            height: 240,
            background: 'radial-gradient(circle at center, rgba(230,57,70,0.35), transparent 65%)',
            filter: 'blur(20px)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            width: 86,
            height: 86,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(230,57,70,0.25), rgba(245,158,11,0.2))',
            border: '2px solid rgba(245,158,11,0.5)',
            margin: '0 auto 1.3rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="2" width="6" height="12" rx="3" />
            <path d="M5 10v2a7 7 0 0 0 14 0v-2" />
            <line x1="12" y1="19" x2="12" y2="22" />
          </svg>
        </div>
        <div style={{
          display: 'inline-block',
          padding: '0.3rem 0.75rem',
          background: 'rgba(245,158,11,0.15)',
          border: '1px solid rgba(245,158,11,0.4)',
          color: '#fcd34d',
          borderRadius: 999,
          fontSize: '0.72rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          marginBottom: '0.8rem',
          position: 'relative',
          zIndex: 1,
        }}>
          Coming end of May
        </div>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', margin: '0 0 0.7rem', position: 'relative', zIndex: 1 }}>
          Talk-to-AI is almost here.
        </h3>
        <p style={{ color: '#cbd5e1', fontSize: '0.92rem', marginBottom: '1.2rem', lineHeight: 1.6, position: 'relative', zIndex: 1 }}>
          A voice-guided walkthrough of your severance, negotiation, and 90-day plan —
          built on top of the same content that's already inside your dashboard.
        </p>
        <p style={{
          color: '#fbbf24',
          fontSize: '0.88rem',
          marginBottom: '1.8rem',
          fontWeight: 600,
          position: 'relative',
          zIndex: 1,
        }}>
          Free for everyone who owns the kit at launch.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: '#fff',
              padding: '0.7rem 1.6rem',
              borderRadius: 999,
              fontFamily: 'var(--font-heading)',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: 'pointer',
            }}
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
