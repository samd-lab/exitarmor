import { Icon } from '../../components/Icon';
import type { UserProfile } from '../../lib/storage';

interface Props {
  profile: UserProfile;
  setProfile: (next: UserProfile | ((prev: UserProfile) => UserProfile)) => void;
  onClose: () => void;
}

const FIELDS: Array<{ key: keyof UserProfile; label: string; placeholder: string; hint?: string }> = [
  { key: 'name', label: 'Your full name', placeholder: 'Alex Rivera' },
  { key: 'email', label: 'Personal email', placeholder: 'alex@example.com', hint: 'Used in templates — never your work email.' },
  { key: 'phone', label: 'Phone', placeholder: '(555) 123-4567' },
  { key: 'company', label: 'Previous company', placeholder: 'Acme Corp' },
  { key: 'role', label: 'Your most recent role', placeholder: 'Senior Product Manager' },
  { key: 'tenureYears', label: 'Years of tenure', placeholder: '4' },
  { key: 'hrName', label: 'HR contact name', placeholder: 'Jordan Lee', hint: 'Who you\'re negotiating with — used in severance emails.' },
  { key: 'targetRole', label: 'Target role', placeholder: 'Director of Product', hint: 'What you\'re searching for next.' },
  { key: 'linkedinUrl', label: 'LinkedIn profile URL', placeholder: 'linkedin.com/in/...' },
];

export function ProfilePanel({ profile, setProfile, onClose }: Props) {
  const update = (key: keyof UserProfile, value: string) =>
    setProfile((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="profile-overlay" role="dialog" aria-modal="true">
      <div className="profile-modal">
        <div className="profile-modal__header">
          <div>
            <h3>Your Details</h3>
            <p>Stored only in your browser. Auto-fills the <code>[placeholders]</code> in every email template across Exit Armor.</p>
          </div>
          <button type="button" className="profile-modal__close" onClick={onClose} aria-label="Close">
            &times;
          </button>
        </div>

        <div className="profile-modal__privacy">
          <Icon name="lock" size={14} />
          <span>
            This data never leaves your device. Exit Armor has no account system, no
            server, and no database. Clear your browser and it's gone.
          </span>
        </div>

        <div className="profile-modal__grid">
          {FIELDS.map((f) => (
            <label key={f.key} className="profile-field">
              <span className="profile-field__label">{f.label}</span>
              <input
                type="text"
                value={profile[f.key]}
                onChange={(e) => update(f.key, e.target.value)}
                placeholder={f.placeholder}
              />
              {f.hint && <small className="profile-field__hint">{f.hint}</small>}
            </label>
          ))}
        </div>

        <div className="profile-modal__footer">
          <button
            type="button"
            className="btn-pill btn-pill--ghost"
            onClick={() => {
              if (confirm('Clear all your details? This cannot be undone.')) {
                setProfile({
                  name: '', email: '', phone: '', company: '', role: '',
                  targetRole: '', tenureYears: '', hrName: '', linkedinUrl: '',
                });
              }
            }}
          >
            Clear all
          </button>
          <button type="button" className="btn-pill btn-pill--primary" onClick={onClose}>
            <Icon name="check" size={14} /> Save &amp; close
          </button>
        </div>
      </div>
    </div>
  );
}
