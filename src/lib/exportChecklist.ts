// Print-to-PDF + email export for cross-device escape hatch.
// Per architecture decision: progress lives in localStorage; users can
// download/email a snapshot to keep continuity.

import type { ChecklistItem } from '../data/modules';
import type { ChecklistMap } from './storage';

export function downloadChecklist(title: string, items: ChecklistItem[], checked: ChecklistMap) {
  const html = renderHtml(title, items, checked);
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${title.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}.html`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function mailtoChecklist(title: string, items: ChecklistItem[], checked: ChecklistMap) {
  const lines = items.map((it) => `${checked[it.id] ? '[x]' : '[ ]'} ${it.label}`);
  const body = encodeURIComponent(
    `Exit Armor — ${title}\n\nProgress snapshot:\n\n${lines.join('\n')}\n\nGenerated ${new Date().toLocaleString()}`
  );
  window.location.href = `mailto:?subject=${encodeURIComponent('Exit Armor — ' + title)}&body=${body}`;
}

function renderHtml(title: string, items: ChecklistItem[], checked: ChecklistMap) {
  const rows = items
    .map(
      (it) => `
      <li>
        <span class="${checked[it.id] ? 'd' : ''}">${escape(it.label)}</span>
        ${it.detail ? `<small>${escape(it.detail)}</small>` : ''}
      </li>`
    )
    .join('');
  return `<!doctype html>
<html><head><meta charset="utf-8"><title>Exit Armor — ${escape(title)}</title>
<style>
  body { font-family: -apple-system, Segoe UI, Roboto, sans-serif; max-width: 720px; margin: 2rem auto; padding: 0 1.5rem; color: #0f172a; }
  h1 { color: #b91c1c; }
  ul { list-style: none; padding: 0; }
  li { padding: 0.6rem 0; border-bottom: 1px solid #e5e7eb; }
  small { display: block; color: #64748b; margin-top: 0.2rem; }
  .d { text-decoration: line-through; color: #94a3b8; }
  footer { margin-top: 2rem; font-size: 0.8rem; color: #94a3b8; }
</style></head><body>
<h1>EXIT ARMOR — ${escape(title)}</h1>
<p>Progress snapshot generated ${escape(new Date().toLocaleString())}.</p>
<ul>${rows}</ul>
<footer>Educational resource — not legal, financial, or tax advice.</footer>
</body></html>`;
}

function escape(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
}
