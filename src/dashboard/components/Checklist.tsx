import { useState } from 'react';
import { Icon } from '../../components/Icon';
import { ITEMS_BY_MODULE } from '../../data/modules';
import type { ChecklistItem, ModuleId } from '../../data/modules';
import type { ChecklistMap } from '../../lib/storage';

interface Props {
  items: ChecklistItem[];
  checked: ChecklistMap;
  onToggle: (id: string) => void;
  /** Optional callback — when provided, items with a `jumpTo` field render
   *  a pill button that opens the target module. */
  onJumpTo?: (id: ModuleId) => void;
}

export function Checklist({ items, checked, onToggle, onJumpTo }: Props) {
  const [open, setOpen] = useState<Record<string, boolean>>({});

  const toggleOpen = (id: string) => setOpen((o) => ({ ...o, [id]: !o[id] }));

  return (
    <ul className="cklist">
      {items.map((it) => {
        const isDone = !!checked[it.id];
        const isOpen = !!open[it.id];
        const hasExpand = !!(it.why || it.how || (it.resources && it.resources.length) || it.warning);
        return (
          <li
            key={it.id}
            className={`cklist__item ${isDone ? 'cklist__item--done' : ''} ${hasExpand ? 'cklist__item--expandable' : ''}`}
          >
            <div className="cklist__row">
              <button
                type="button"
                className={`ck ${isDone ? 'ck--checked' : ''}`}
                onClick={() => onToggle(it.id)}
                aria-label={isDone ? 'Mark incomplete' : 'Mark complete'}
              >
                {isDone && <Icon name="check" size={12} />}
              </button>
              <div className="cklist__body">
                <div className="cklist__label">
                  {it.label}
                  {it.detail && <small>{it.detail}</small>}
                </div>
                <div className="cklist__actions">
                  {it.jumpTo && onJumpTo && (
                    <button
                      type="button"
                      className="cklist__jump"
                      onClick={() => onJumpTo(it.jumpTo!)}
                    >
                      <Icon name="arrow" size={12} />
                      {it.jumpLabel || 'Open tool'}
                    </button>
                  )}
                  {hasExpand && (
                    <button
                      type="button"
                      className="cklist__expand"
                      onClick={() => toggleOpen(it.id)}
                      aria-expanded={isOpen}
                    >
                      {isOpen ? 'Hide coaching' : 'Coach me through this'}
                      <span className={`cklist__chevron ${isOpen ? 'cklist__chevron--open' : ''}`}>&rsaquo;</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
            {hasExpand && isOpen && (
              <div className="cklist__expanded">
                {it.why && (
                  <div className="cklist__section">
                    <h5>Why this matters</h5>
                    <p>{it.why}</p>
                  </div>
                )}
                {it.how && (
                  <div className="cklist__section">
                    <h5>How to do it</h5>
                    <p>{it.how}</p>
                  </div>
                )}
                {it.warning && (
                  <div className="cklist__warning">
                    <Icon name="warn" size={14} />
                    <span>{it.warning}</span>
                  </div>
                )}
                {it.resources && it.resources.length > 0 && (
                  <div className="cklist__section">
                    <h5>Resources</h5>
                    <ul className="cklist__resources">
                      {it.resources.map((r) => (
                        <li key={r.url}>
                          <a href={r.url} target="_blank" rel="noreferrer">
                            <Icon name="arrow" size={12} /> {r.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

// Helper for module pages — picks items for that module
export function moduleItems(id: ModuleId) {
  return ITEMS_BY_MODULE[id];
}
