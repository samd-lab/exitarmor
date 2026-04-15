import { Icon } from '../../components/Icon';
import { ITEMS_BY_MODULE } from '../../data/modules';
import type { ChecklistItem, ModuleId } from '../../data/modules';
import type { ChecklistMap } from '../../lib/storage';

interface Props {
  items: ChecklistItem[];
  checked: ChecklistMap;
  onToggle: (id: string) => void;
}

export function Checklist({ items, checked, onToggle }: Props) {
  return (
    <ul className="cklist">
      {items.map((it) => {
        const isDone = !!checked[it.id];
        return (
          <li
            key={it.id}
            className={`cklist__item ${isDone ? 'cklist__item--done' : ''}`}
            onClick={() => onToggle(it.id)}
          >
            <span className={`ck ${isDone ? 'ck--checked' : ''}`}>
              {isDone && <Icon name="check" size={12} />}
            </span>
            <span className="cklist__label">
              {it.label}
              {it.detail && <small>{it.detail}</small>}
            </span>
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
