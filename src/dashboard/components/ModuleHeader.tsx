import { Icon } from '../../components/Icon';
import type { IconName } from '../../components/Icon';
import type { ModuleSpec } from '../../data/modules';

interface Props {
  module: ModuleSpec;
  iconName: IconName;
  onBack: () => void;
  onDownload?: () => void;
}

export function ModuleHeader({ module, iconName, onBack, onDownload }: Props) {
  return (
    <div className="module-page__head">
      <div className="module-page__title-wrap">
        <div className="module-page__icon" style={{ background: module.iconBg }}>
          <Icon name={iconName} size={26} />
        </div>
        <div>
          <h2 className="module-page__title">{module.title}</h2>
          <p className="module-page__sub">{module.description}</p>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button type="button" className="btn-ghost-back" onClick={onBack}>
          <Icon name="arrow" size={14} style={{ transform: 'rotate(180deg)' }} />
          Back
        </button>
        {onDownload && (
          <button type="button" className="btn-pill" onClick={onDownload}>
            <Icon name="download" size={14} /> Download checklist
          </button>
        )}
      </div>
    </div>
  );
}
