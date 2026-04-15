import { Icon } from '../../components/Icon';

interface Props {
  step: number;
  done: number;
  total: number;
  accent: string;
}

export function PhaseRing({ step, done, total, accent }: Props) {
  const pct = total === 0 ? 0 : Math.min(1, done / total);
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - pct);
  const isDone = pct === 1;

  return (
    <div className="phase-ring">
      <svg className="phase-ring__svg" width="56" height="56">
        <circle
          className="phase-ring__track"
          cx="28"
          cy="28"
          r={radius}
          fill="none"
          strokeWidth="5"
        />
        <circle
          className="phase-ring__fill"
          cx="28"
          cy="28"
          r={radius}
          fill="none"
          strokeWidth="5"
          stroke={isDone ? '#16a34a' : accent}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className={`phase-ring__num ${isDone ? 'phase-ring__num--complete' : ''}`}>
        {isDone ? <Icon name="check" size={20} /> : step}
      </div>
    </div>
  );
}
