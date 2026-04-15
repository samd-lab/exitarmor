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
