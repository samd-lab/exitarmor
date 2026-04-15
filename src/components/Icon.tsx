// Lightweight inline icon set. Every icon is drawn on a 24x24 viewBox with a
// 1.6 stroke so they read as a single, refined family — inspired by the
// lucrovox / vettedvitals editorial aesthetic. All strokes use `currentColor`,
// so callers control tint via CSS `color`.
//
// Why not lucide-react? We pinned the dep early and kept missing it on a few
// icons we care about (`spark`, `home`, etc.), so this file is the one source
// of truth for every glyph the marketing site and the dashboard use.

import React from 'react';

type Props = React.SVGProps<SVGSVGElement> & {
  name: IconName;
  size?: number;
  /** Optional stroke override. Defaults to 1.6 for an editorial, thin-stroke
   *  look. Bump to 2 for small sizes or dense UI rows. */
  strokeWidth?: number;
};

const paths: Record<string, React.ReactNode> = {
  home: (
    <>
      <path d="M3.5 11.2 12 4l8.5 7.2" />
      <path d="M5.5 10.2V20h5v-6h3v6h5V10.2" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3.5 4.5 6.5v5.2c0 4.5 3 8.3 7.5 9.3 4.5-1 7.5-4.8 7.5-9.3V6.5L12 3.5Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="7.5" width="18" height="12.5" rx="2" />
      <path d="M8.5 7.5V6a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v1.5" />
      <path d="M3 13h18" />
    </>
  ),
  map: (
    <>
      <path d="m9 4-6 2.5V20l6-2.5 6 2.5 6-2.5V4l-6 2.5L9 4Z" />
      <path d="M9 4v13.5" />
      <path d="M15 6.5V20" />
    </>
  ),
  heart: (
    <path d="M12 20s-7-4.5-9.2-9A5 5 0 0 1 12 5.5a5 5 0 0 1 9.2 5.5C19 15.5 12 20 12 20Z" />
  ),
  dollar: (
    <>
      <path d="M12 3v18" />
      <path d="M16.5 6.5c-1-1.2-2.5-1.8-4.5-1.8-3 0-5 1.4-5 3.6s2 3.2 5 3.8c3 .6 5 1.6 5 3.8s-2 3.6-5 3.6c-2 0-3.5-.6-4.5-1.8" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20.5 20.5-4.3-4.3" />
    </>
  ),
  mic: (
    <>
      <rect x="9" y="2.5" width="6" height="12" rx="3" />
      <path d="M5 11v1.2A7 7 0 0 0 19 12.2V11" />
      <path d="M12 19.2V22" />
      <path d="M8.5 22h7" />
    </>
  ),
  check: <path d="m5 12.5 4.5 4.5L19.5 7" />,
  arrow: (
    <>
      <path d="M4.5 12h15" />
      <path d="m13 5.5 6.5 6.5L13 18.5" />
    </>
  ),
  download: (
    <>
      <path d="M12 3.5v12.5" />
      <path d="m6.5 10.5 5.5 5.5 5.5-5.5" />
      <path d="M4.5 20.5h15" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="m3.5 7 8 5.3a1 1 0 0 0 1 0L20.5 7" />
    </>
  ),
  warn: (
    <>
      <path d="M12 3.5 2.5 20.5h19L12 3.5Z" />
      <path d="M12 10v4.5" />
      <circle cx="12" cy="17.5" r="0.7" fill="currentColor" stroke="none" />
    </>
  ),
  help: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.9.5-1 1-1 1.7" />
      <circle cx="12" cy="17" r="0.7" fill="currentColor" stroke="none" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8.5" r="3.8" />
      <path d="M4.5 20.5c0-3.8 3.4-6.5 7.5-6.5s7.5 2.7 7.5 6.5" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.5 12a7.5 7.5 0 0 0-.1-1.3l2-1.5-2-3.4-2.4.9a7 7 0 0 0-2.2-1.3l-.4-2.6h-4l-.4 2.6a7 7 0 0 0-2.2 1.3L5.6 6 3.6 9.2l2 1.5A7.5 7.5 0 0 0 5.5 12c0 .4 0 .9.1 1.3l-2 1.5 2 3.4 2.4-.9c.7.5 1.4 1 2.2 1.3l.4 2.6h4l.4-2.6c.8-.3 1.5-.8 2.2-1.3l2.4.9 2-3.4-2-1.5c.1-.4.1-.9.1-1.3Z" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 3v4" />
      <path d="M16 3v4" />
    </>
  ),
  spark: (
    <>
      <path d="M12 3v4" />
      <path d="M12 17v4" />
      <path d="M3 12h4" />
      <path d="M17 12h4" />
      <path d="M12 7a5 5 0 0 0 5 5 5 5 0 0 0-5 5 5 5 0 0 0-5-5 5 5 0 0 0 5-5Z" />
    </>
  ),
  list: (
    <>
      <path d="M9 6.5h12" />
      <path d="M9 12h12" />
      <path d="M9 17.5h12" />
      <circle cx="4.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="4.5" cy="12" r="1" fill="currentColor" stroke="none" />
      <circle cx="4.5" cy="17.5" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  lock: (
    <>
      <rect x="4" y="11" width="16" height="9.5" rx="2" />
      <path d="M7.5 11V7.5a4.5 4.5 0 0 1 9 0V11" />
      <circle cx="12" cy="15.5" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  refresh: (
    <>
      <path d="M3 12a9 9 0 0 1 15.5-6.3" />
      <path d="M18.5 3v3.2h-3.2" />
      <path d="M21 12a9 9 0 0 1-15.5 6.3" />
      <path d="M5.5 21v-3.2h3.2" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v6" />
      <circle cx="12" cy="7.5" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  alert: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v6" />
      <circle cx="12" cy="16.5" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  // The balance / scale icon — redrawn as a proper two-pan scale. Used for
  // the "Find an Attorney" card and any legal-coded surface in the app.
  scale: (
    <>
      <path d="M12 3v18" />
      <path d="M5.5 20.5h13" />
      <path d="M5 6.5h14" />
      <path d="m6 6.5-3 6a4 4 0 0 0 6 0l-3-6Z" />
      <path d="m18 6.5-3 6a4 4 0 0 0 6 0l-3-6Z" />
    </>
  ),
  book: (
    <>
      <path d="M5 4.5h9.5a3.5 3.5 0 0 1 3.5 3.5v11.5" />
      <path d="M5 4.5v15a3 3 0 0 0 3 3h10" />
      <path d="M5 4.5a2.5 2.5 0 0 0 0 5h9.5" />
      <path d="M10 9.5v8" />
    </>
  ),
  chart: (
    <>
      <path d="M4 20.5h16" />
      <rect x="5.5" y="12" width="3" height="8.5" rx="0.6" />
      <rect x="10.5" y="7.5" width="3" height="13" rx="0.6" />
      <rect x="15.5" y="15" width="3" height="5.5" rx="0.6" />
    </>
  ),
};

export type IconName = keyof typeof paths;

export function Icon({ name, size = 20, strokeWidth = 1.6, ...rest }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}
