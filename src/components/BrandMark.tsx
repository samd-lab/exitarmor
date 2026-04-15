// Exit Armor brand mark — tapered shield + amber ascent chevron + red ignition dot.
// Reusable across marketing nav, dashboard sidebar, footer, and PDF header.
//
// Use a unique `id` per render when mounting multiple marks on one page so the
// gradient ids don't collide across SVG roots.

interface Props {
  size?: number;
  id?: string;
  className?: string;
}

export function BrandMark({ size = 34, id = 'ea', className }: Props) {
  const shieldId = `${id}-shield`;
  const chevronId = `${id}-chevron`;

  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id={shieldId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1f2a44" />
          <stop offset="1" stopColor="#080c18" />
        </linearGradient>
        <linearGradient id={chevronId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fcd34d" />
          <stop offset="1" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
      <path
        d="M32 4 L56 12 V32 C56 44 45 54 32 60 C19 54 8 44 8 32 V12 Z"
        fill={`url(#${shieldId})`}
        stroke="#e63946"
        strokeWidth="2.2"
      />
      <path
        d="M16 42 L32 22 L48 42"
        fill="none"
        stroke={`url(#${chevronId})`}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="32" cy="15" r="2.8" fill="#e63946" />
    </svg>
  );
}
