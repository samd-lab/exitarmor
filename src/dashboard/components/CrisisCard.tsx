// Discreet mental health / crisis support linkout.
//
// VERY IMPORTANT: Exit Armor is NOT a mental health provider. This component
// ONLY provides links to established public resources. We deliberately do
// not offer advice, symptom screening, or anything that could be construed
// as clinical guidance. The disclaimer at the bottom makes our scope
// explicit for legal clarity.
//
// Layoffs are one of the top life stressors correlating with anxiety and
// depression; making these resources easy to find is a feel-loved gesture
// that costs nothing and helps the small percentage of users who need it.

import { Icon } from '../../components/Icon';

interface Resource {
  name: string;
  number: string;
  href: string;
  note: string;
}

const RESOURCES: Resource[] = [
  {
    name: '988 Suicide & Crisis Lifeline',
    number: 'Call or text 988',
    href: 'https://988lifeline.org',
    note: '24/7, free, confidential',
  },
  {
    name: 'SAMHSA National Helpline',
    number: '1-800-662-HELP (4357)',
    href: 'https://www.samhsa.gov/find-help/national-helpline',
    note: '24/7 treatment referral, English & Spanish',
  },
  {
    name: 'NAMI HelpLine',
    number: '1-800-950-NAMI (6264)',
    href: 'https://www.nami.org/help',
    note: 'Mon–Fri 10am–10pm ET, or text "HelpLine" to 62640',
  },
  {
    name: 'Crisis Text Line',
    number: 'Text HOME to 741741',
    href: 'https://www.crisistextline.org',
    note: '24/7 text support',
  },
];

export function CrisisCard() {
  return (
    <div className="crisis-card">
      <div className="crisis-card__head">
        <Icon name="heart" size={16} /> If you're struggling, you're not alone
      </div>
      <p className="crisis-card__body">
        Losing a job is one of life's most stressful events. If you're feeling
        overwhelmed, anxious, or hopeless, these free and confidential support
        lines are available 24/7. Reaching out is a sign of strength.
      </p>
      <ul className="crisis-card__list">
        {RESOURCES.map((r) => (
          <li key={r.name}>
            <div>
              <strong>{r.name}</strong>
              <div style={{ fontSize: '0.72rem', color: '#6b7280', marginTop: '2px' }}>
                {r.note}
              </div>
            </div>
            <a href={r.href} target="_blank" rel="noopener noreferrer">
              {r.number}
            </a>
          </li>
        ))}
      </ul>
      <p className="crisis-card__disclaimer">
        Exit Armor is not a mental health provider, crisis service, or medical
        resource. We link to established public hotlines only — we do not
        provide clinical advice, diagnosis, or treatment. If you are in
        immediate danger, call 911 or go to your nearest emergency room. If
        your employer offered an Employee Assistance Program (EAP), it
        typically includes free confidential counseling sessions.
      </p>
    </div>
  );
}
