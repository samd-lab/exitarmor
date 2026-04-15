// Privacy trust card shown on the dashboard overview.
//
// Intentionally framed as a feature, not a limitation: we keep everything
// the user types locally so we never have to store, share, or monetize it.
// Greets the user by first name to make it feel personal.

interface Props {
  firstName?: string;
}

export function PrivacyBadge({ firstName }: Props) {
  const greeting = firstName ? `Hi ${firstName} —` : 'A quick note —';

  return (
    <section className="privacy-badge" aria-label="Your privacy">
      <div className="privacy-badge__icon" aria-hidden="true">
        <PrivacyShieldLockIcon />
      </div>

      <div className="privacy-badge__body">
        <div className="privacy-badge__eyebrow">
          <span className="privacy-badge__dot" />
          Private by design
        </div>
        <h3 className="privacy-badge__title">
          {greeting} your data never leaves this device.
        </h3>
        <p className="privacy-badge__copy">
          Everything you enter — your name, your company, your severance numbers,
          your state — is stored only in <strong>this browser, on this device</strong>.
          It's never uploaded to our servers, never sold, never shared, never used
          to train anything. We built Exit Armor this way on purpose: we think the
          last thing someone going through a layoff needs is another company
          holding their personal information.
        </p>

        <ul className="privacy-badge__pills">
          <li>
            <PillCheck /> No account required
          </li>
          <li>
            <PillCheck /> No tracking of your answers
          </li>
          <li>
            <PillCheck /> No data sold, ever
          </li>
          <li>
            <PillCheck /> Yours to clear anytime
          </li>
        </ul>

        <p className="privacy-badge__footnote">
          Your progress persists across refreshes, browser restarts, and even laptop
          reboots — but it lives <em>only</em> on this device. If you clear your
          browser data or switch devices, you'll start fresh. That's a trade we're
          proud to make.
        </p>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------

// Shield with integrated padlock — custom SVG, not an icon-font mark.
// Tapered shield in ink, amber ascent chevron behind it (brand-consistent
// with BrandMark), and a gold padlock in front to signal "data is locked
// to you."
function PrivacyShieldLockIcon() {
  return (
    <svg
      width="72"
      height="72"
      viewBox="0 0 72 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="pb-shield" x1="36" y1="4" x2="36" y2="68" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#1e293b" />
          <stop offset="0.55" stopColor="#0f172a" />
          <stop offset="1" stopColor="#020617" />
        </linearGradient>
        <linearGradient id="pb-chevron" x1="36" y1="22" x2="36" y2="50" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fbbf24" />
          <stop offset="1" stopColor="#f59e0b" />
        </linearGradient>
        <linearGradient id="pb-lock" x1="36" y1="30" x2="36" y2="58" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fde68a" />
          <stop offset="1" stopColor="#f59e0b" />
        </linearGradient>
        <radialGradient id="pb-glow" cx="0.5" cy="0.42" r="0.7">
          <stop offset="0" stopColor="#fbbf24" stopOpacity="0.35" />
          <stop offset="1" stopColor="#fbbf24" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Soft glow */}
      <circle cx="36" cy="34" r="30" fill="url(#pb-glow)" />

      {/* Shield */}
      <path
        d="M36 4 L62 12 V32 C62 47 52 59 36 66 C20 59 10 47 10 32 V12 Z"
        fill="url(#pb-shield)"
        stroke="#334155"
        strokeWidth="1"
      />

      {/* Ascent chevron (subtle brand tie) */}
      <path
        d="M18 46 L36 26 L54 46"
        stroke="url(#pb-chevron)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.35"
      />

      {/* Padlock body */}
      <rect
        x="24"
        y="36"
        width="24"
        height="18"
        rx="3"
        fill="url(#pb-lock)"
        stroke="#78350f"
        strokeWidth="0.75"
      />

      {/* Padlock shackle */}
      <path
        d="M28 36 V30 A8 8 0 0 1 44 30 V36"
        stroke="#fde68a"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />

      {/* Keyhole */}
      <circle cx="36" cy="43" r="2" fill="#78350f" />
      <rect x="35" y="43" width="2" height="6" rx="0.5" fill="#78350f" />
    </svg>
  );
}

function PillCheck() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M2 6.5 L5 9.2 L10 3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
