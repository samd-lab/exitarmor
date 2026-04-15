// localStorage helpers — single source of truth for client-side persistence.
// IMPORTANT (per simplified architecture): we do NOT sync across devices.
// Always pair UI usage with the "Progress saved on this device" disclosure.

import { useCallback, useEffect, useState } from 'react';

const NS = 'exitarmor.v1';

function key(scope: string) {
  return `${NS}.${scope}`;
}

export function loadJSON<T>(scope: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key(scope));
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function saveJSON<T>(scope: string, value: T): void {
  try {
    localStorage.setItem(key(scope), JSON.stringify(value));
  } catch {
    /* quota / private mode — silently ignore */
  }
}

export function usePersistentState<T>(
  scope: string,
  initial: T
): [T, (next: T | ((prev: T) => T)) => void] {
  const [state, setState] = useState<T>(() => loadJSON(scope, initial));
  useEffect(() => {
    saveJSON(scope, state);
  }, [scope, state]);
  return [state, setState];
}

// Specialized helper for checklist modules.
export type ChecklistMap = Record<string, boolean>;

export function useChecklist(scope: string) {
  const [checked, setChecked] = usePersistentState<ChecklistMap>(scope, {});
  const toggle = useCallback(
    (id: string) => setChecked((prev) => ({ ...prev, [id]: !prev[id] })),
    [setChecked]
  );
  const reset = useCallback(() => setChecked({}), [setChecked]);
  return { checked, toggle, reset, setChecked };
}

export function countChecked(map: ChecklistMap, ids: string[]): number {
  return ids.reduce((acc, id) => acc + (map[id] ? 1 : 0), 0);
}

// ---------- User profile ----------
// Stored in localStorage only. Used to auto-fill template placeholders so
// users don't have to re-type [Your Name], [Company], etc. every time.
export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  targetRole: string;
  tenureYears: string;
  hrName: string;
  linkedinUrl: string;
}

export const EMPTY_PROFILE: UserProfile = {
  name: '',
  email: '',
  phone: '',
  company: '',
  role: '',
  targetRole: '',
  tenureYears: '',
  hrName: '',
  linkedinUrl: '',
};

export function useProfile() {
  return usePersistentState<UserProfile>('profile', EMPTY_PROFILE);
}

// Substitute [Placeholder] tokens in a template body with profile values.
// Unknown placeholders are left as-is so the user still sees them.
export function personalize(body: string, p: UserProfile): string {
  const map: Record<string, string> = {
    '[Your Name]': p.name,
    '[Your name]': p.name,
    '[Name]': p.name, // last-resort fallback (outreach templates override this)
    '[Your Personal Email]': p.email,
    '[Your Email]': p.email,
    '[Personal Email]': p.email,
    '[Your Phone]': p.phone,
    '[Phone]': p.phone,
    '[Company]': p.company,
    '[Previous Company]': p.company,
    '[Current Company]': p.company,
    '[Role]': p.role,
    '[Your Role]': p.role,
    '[Current Role]': p.role,
    '[Target Role]': p.targetRole,
    '[target role]': p.targetRole,
    '[Target role]': p.targetRole,
    '[X years]': p.tenureYears ? `${p.tenureYears} years` : '[X years]',
    '[N years]': p.tenureYears ? `${p.tenureYears} years` : '[N years]',
    '[HR Name]': p.hrName,
    '[LinkedIn URL]': p.linkedinUrl,
    '[URL]': p.linkedinUrl,
  };
  let out = body;
  for (const [token, value] of Object.entries(map)) {
    if (!value) continue;
    out = out.split(token).join(value);
  }
  return out;
}
