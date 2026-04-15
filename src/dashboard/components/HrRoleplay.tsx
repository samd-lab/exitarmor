// HR Roleplay — static branching "choose your own adventure" practice tool.
//
// NO AI. NO LLM. This is a pre-scripted decision tree covering the 8 most
// common HR replies during a severance negotiation call. The user clicks a
// scenario, reads what HR says, picks one of 2–3 responses, and sees:
//   - a coaching note on WHY that response works (or doesn't)
//   - a follow-up line they can actually say
//
// Designed for everyone — software engineers, carpenters, teachers, nurses.
// Plain English, no corporate jargon.
//
// All content is static and legally safe (educational, not legal advice).

import { useState } from 'react';
import { Icon } from '../../components/Icon';

interface Response {
  label: string;
  verdict: 'good' | 'ok' | 'bad';
  coaching: string;
  sayThis: string;
}

interface Scenario {
  id: string;
  hrLine: string;
  hrTone: string;
  context: string;
  responses: Response[];
}

const SCENARIOS: Scenario[] = [
  {
    id: 'sign-today',
    hrLine:
      '"We\'d like you to sign the agreement by end of day today so we can process your final check."',
    hrTone: 'Time-pressure play',
    context:
      'This is the most common pressure tactic. Federal law gives workers 40+ at least 21 days (45 for group layoffs) to review, plus a 7-day revocation window after signing. You never have to sign same-day.',
    responses: [
      {
        label: '"OK, I\'ll sign now to keep things moving."',
        verdict: 'bad',
        coaching:
          'Never sign on the first call. Once you sign, your leverage is gone. The 21-day review window (OWBPA) exists precisely so workers can think, consult, and negotiate.',
        sayThis:
          'Even if you feel pressured, pause. The offer is not going away — legally, they must honor the written review period.',
      },
      {
        label: '"I need time to review this. When is my actual deadline?"',
        verdict: 'good',
        coaching:
          'This forces HR to state the legal review period in writing. It signals you know your rights without being adversarial. Most HR reps will immediately back off the "today" ask.',
        sayThis:
          '"I appreciate the urgency, but I need to review this carefully. Can you confirm my review deadline in writing? I believe I have 21 days under OWBPA if I\'m 40 or older."',
      },
      {
        label: '"Can I get a one-week extension?"',
        verdict: 'ok',
        coaching:
          'Better than signing today, but you\'re leaving leverage on the table. You likely already have 21+ days by law — don\'t ask for what you already have. Use the full window.',
        sayThis:
          '"I\'ll review the packet and come back to you with any questions by [actual legal deadline]."',
      },
    ],
  },
  {
    id: 'non-negotiable',
    hrLine: '"The severance package is non-negotiable. This is our standard offer."',
    hrTone: 'Firm shut-down',
    context:
      'This is almost never true. "Standard" means "what we offer first." Most companies have a pre-approved ceiling (often 50–100% higher than the opening offer) that HR can reach without exec approval.',
    responses: [
      {
        label: '"OK, I understand. I\'ll sign as-is."',
        verdict: 'bad',
        coaching:
          'Accepting "non-negotiable" at face value costs the average worker several weeks of pay. Companies almost always have headroom. Your silence is worth money.',
        sayThis:
          'Even if they repeat "non-negotiable," you lose nothing by counter-offering in writing. The worst they can say is no.',
      },
      {
        label: '"I hear you. I\'d still like to submit a written counter for your team to review."',
        verdict: 'good',
        coaching:
          'Perfectly professional. You\'re not arguing on the call — you\'re moving the conversation to writing, where HR has to actually ask someone with authority. This alone often unlocks better terms.',
        sayThis:
          '"I understand that\'s your opening position. I\'ll put my counter in writing today so your team can review it. What\'s the best email to send it to?"',
      },
      {
        label: '"Can you at least throw in more COBRA coverage?"',
        verdict: 'ok',
        coaching:
          'Asking for one small thing verbally lets HR say "no" in 2 seconds. Always counter in writing with a bundle — easier to negotiate on multiple items than one.',
        sayThis:
          '"Rather than discuss piecemeal on the call, let me send a complete written counter."',
      },
    ],
  },
  {
    id: 'already-generous',
    hrLine:
      '"This package is already more generous than what we\'re giving most people. You should be grateful."',
    hrTone: 'Emotional pressure',
    context:
      'This is an emotional appeal designed to make you feel guilty for negotiating. Ignore the comparison. Your package should reflect YOUR tenure, contributions, and circumstances — not some average.',
    responses: [
      {
        label: '"You\'re right. I don\'t want to seem ungrateful."',
        verdict: 'bad',
        coaching:
          'This is exactly what the tactic is designed to produce. Gratitude is not a substitute for fair compensation. Every company expects people to negotiate — it\'s why they start low.',
        sayThis:
          'Never apologize for advocating for yourself. Professional negotiation is not ingratitude.',
      },
      {
        label: '"I appreciate that, and I\'m not comparing — I\'m asking about my specific situation."',
        verdict: 'good',
        coaching:
          'Polite, steady, redirects the conversation away from comparisons and back to your individual facts. This is the tone attorneys use.',
        sayThis:
          '"I do appreciate the offer. I\'m not trying to compare packages — I\'m looking at my specific tenure and contributions and asking whether there\'s room to discuss a few items."',
      },
      {
        label: '"Well, I know [coworker] got more than me."',
        verdict: 'bad',
        coaching:
          'Never use coworker comparisons. It makes HR defensive, might violate confidentiality clauses, and shifts the conversation to a fight you can\'t win.',
        sayThis:
          'Focus only on YOUR value, YOUR tenure, YOUR contributions. Never on what anyone else got.',
      },
    ],
  },
  {
    id: 'no-attorney',
    hrLine:
      '"You don\'t need a lawyer for this — it\'s a standard agreement. Bringing one will just slow things down."',
    hrTone: 'Discourage review',
    context:
      'A huge red flag. Any company discouraging legal review is usually hiding something — an aggressive non-compete, a broad non-disparagement clause, or a release of claims you shouldn\'t sign.',
    responses: [
      {
        label: '"OK, you\'re probably right. I\'ll skip the lawyer."',
        verdict: 'bad',
        coaching:
          'Never skip legal review on advice from the company asking you to sign. A 30-minute employment attorney consult is often free and can spot clauses that cost you tens of thousands.',
        sayThis:
          'Always get a second pair of eyes on an agreement you\'re signing away rights on.',
      },
      {
        label: '"I hear you, but I always have contracts reviewed — it\'s just how I do things."',
        verdict: 'good',
        coaching:
          'Frames legal review as a personal habit, not a hostile move. HR can\'t push back on "how you do things." NELA (nela.org) offers free referrals to employment attorneys.',
        sayThis:
          '"Thanks for the heads up, but I always have agreements reviewed. I\'ll get back to you once my attorney has seen it — shouldn\'t take more than a few days."',
      },
      {
        label: '"Are you saying I shouldn\'t get legal advice?"',
        verdict: 'ok',
        coaching:
          'Direct and confrontational. This puts HR on the defensive, which sometimes works but can also harden their position. The polite redirect usually works better.',
        sayThis:
          'Use this only if HR is being unusually aggressive. Otherwise lead with the professional redirect.',
      },
    ],
  },
  {
    id: 'noncompete',
    hrLine:
      '"The non-compete is standard for this role. Everyone signs it. You won\'t have any trouble finding work."',
    hrTone: 'Minimize the ask',
    context:
      'Non-competes are unenforceable or heavily restricted in California, Oklahoma, North Dakota, Minnesota, and increasingly in other states. Even where enforceable, you can almost always negotiate to narrow the scope, duration, or geography.',
    responses: [
      {
        label: '"I can sign it — I don\'t plan to work for a competitor anyway."',
        verdict: 'bad',
        coaching:
          'Even if you don\'t plan to, you might. Industries change. Ideal employers change. Signing a 2-year broad non-compete can cost you your next job.',
        sayThis:
          'Assume the non-compete will be enforced and review every word.',
      },
      {
        label: '"Can we shorten it to 6 months and narrow it to direct competitors only?"',
        verdict: 'good',
        coaching:
          'Specific, reasonable, and something HR can actually get approved. Narrowing scope (duration, geography, definition of "competitor") is almost always possible.',
        sayThis:
          '"I\'m happy to sign a non-compete, but I\'d like to discuss narrowing it — ideally 6 months instead of 2 years, and limited to direct competitors rather than the whole industry."',
      },
      {
        label: '"I\'ll have my attorney look at this clause specifically."',
        verdict: 'good',
        coaching:
          'If you\'re already getting legal review, flagging the non-compete specifically ensures your attorney pays extra attention. Especially important for senior roles and specialized industries.',
        sayThis:
          '"The non-compete is the one clause I\'d like my attorney to review in detail before I commit to anything."',
      },
    ],
  },
  {
    id: 'quick-sign-bonus',
    hrLine:
      '"If you sign in the next 48 hours, we can add an extra $2,000 as a quick-signing bonus."',
    hrTone: 'Sweetener to rush you',
    context:
      'Quick-signing bonuses are designed to make you skip review and negotiation. The "extra" is almost always less than what you could get by taking the full review window and counter-offering on bigger items.',
    responses: [
      {
        label: '"Sure, I\'ll take the $2K and sign now."',
        verdict: 'bad',
        coaching:
          'Classic mistake. $2,000 sounds nice until you realize a full counter-offer could get you 4+ additional weeks of pay, 3 months of COBRA, and a non-compete waiver — worth 10–20x the "bonus."',
        sayThis:
          'Think of the rush bonus as the price they\'re willing to pay to avoid negotiation. If they\'ll pay that to avoid it, imagine what they\'ll pay in it.',
      },
      {
        label: '"I appreciate that, but I\'m going to use my full review window."',
        verdict: 'good',
        coaching:
          'Polite decline. You\'re keeping the negotiation door open. The quick-sign bonus often reappears in the final offer anyway if you negotiate well.',
        sayThis:
          '"Thanks, I appreciate the offer. I\'m still going to take the time to review everything carefully. I\'ll come back to you with any questions by [deadline]."',
      },
      {
        label: '"Can I get the $2K AND still negotiate other things?"',
        verdict: 'ok',
        coaching:
          'Honest and direct, but it shows you\'re treating the bonus as leverage — HR may withdraw it entirely. Better to quietly decline and negotiate on merit.',
        sayThis:
          'Avoid this framing. Just take the time and counter in writing.',
      },
    ],
  },
  {
    id: 'performance-doubt',
    hrLine:
      '"Honestly, there have been some concerns about your performance — so the standard package is really the best we can do."',
    hrTone: 'Leverage removal',
    context:
      'A dangerous tactic — they\'re trying to make you feel like you don\'t deserve more. Unless there\'s a documented PIP or written warning in your file, ignore this. It\'s almost always a pressure line, not a fact.',
    responses: [
      {
        label: '"I didn\'t know there were concerns. Maybe I should just take what\'s offered."',
        verdict: 'bad',
        coaching:
          'They just got you to accept their framing. Don\'t. If concerns were real, you\'d have documentation. If there\'s no paper trail, this is a negotiation tactic, not a performance review.',
        sayThis:
          'Stay calm. Demand documentation before accepting the narrative.',
      },
      {
        label: '"Can you show me the documented concerns? I don\'t recall receiving any."',
        verdict: 'good',
        coaching:
          'Perfectly reasonable and very hard to dodge. If they can\'t produce documentation, the concern is manufactured. This also creates a record of what HR just said.',
        sayThis:
          '"I\'m surprised to hear that — I don\'t have any written feedback or performance warnings on file. Can you share the specific documentation so I can understand?"',
      },
      {
        label: '"That\'s ridiculous — I\'ve always gotten great reviews!"',
        verdict: 'bad',
        coaching:
          'Getting defensive reads as confirmation of a problem and hurts your standing. Stay calm, professional, and ask for the evidence instead.',
        sayThis:
          'Never get emotional on the call. Keep the tone flat and factual.',
      },
    ],
  },
  {
    id: 'walk-away',
    hrLine: '"If you don\'t sign, we can\'t guarantee any severance. Things could get messy."',
    hrTone: 'Veiled threat',
    context:
      'A significant escalation. This is close to the line of coercion. Document the call (date, time, exact wording). If you\'re in an at-will state with no contract, they may have some latitude — but threatening to withhold severance in retaliation for negotiating is legally risky for them.',
    responses: [
      {
        label: '"OK, OK, I\'ll sign."',
        verdict: 'bad',
        coaching:
          'This is exactly what they want. But the threat itself is a red flag — you now NEED to call an employment attorney. Many offer free 15-minute consults.',
        sayThis:
          'A threat to withhold legally-offered severance in retaliation for asking questions is the moment to escalate to an attorney.',
      },
      {
        label: '"I\'m going to end this call and review everything with my attorney."',
        verdict: 'good',
        coaching:
          'The right move. You\'re not escalating — you\'re protecting yourself. Document the exact wording of HR\'s threat immediately after the call. This could be significant if things go sideways.',
        sayThis:
          '"I think the best thing for both of us is for me to end this call, review the packet carefully, and follow up in writing after my attorney has reviewed it."',
      },
      {
        label: '"Is that a threat?"',
        verdict: 'ok',
        coaching:
          'Sometimes naming the tactic works — HR will often back off immediately because they don\'t want the call notes to look bad. But it can also escalate. Use only if you\'re comfortable being direct.',
        sayThis:
          '"I want to make sure I understand — are you saying the offer will change if I ask questions or consult an attorney? I\'d like that in writing."',
      },
    ],
  },
];

const VERDICT_STYLES: Record<Response['verdict'], { label: string; color: string }> = {
  good: { label: 'Strong move', color: '#047857' },
  ok: { label: 'Okay, but...', color: '#b45309' },
  bad: { label: 'Costs you money', color: '#b91c1c' },
};

export function HrRoleplay() {
  const [activeId, setActiveId] = useState<string>(SCENARIOS[0].id);
  const [pickedIdx, setPickedIdx] = useState<number | null>(null);

  const scenario = SCENARIOS.find((s) => s.id === activeId) ?? SCENARIOS[0];
  const picked = pickedIdx !== null ? scenario.responses[pickedIdx] : null;

  const pickScenario = (id: string) => {
    setActiveId(id);
    setPickedIdx(null);
  };

  return (
    <div className="roleplay">
      <div className="roleplay__intro">
        <Icon name="mic" size={16} />
        <span>
          Practice the 8 hardest moments of an HR severance call. Pick a scenario, read what HR
          says, and see how different responses play out.{' '}
          <strong>No AI, no recording, nothing leaves your device.</strong>
        </span>
      </div>

      <div className="roleplay__scenarios">
        {SCENARIOS.map((s, i) => (
          <button
            key={s.id}
            type="button"
            className={`roleplay__chip ${activeId === s.id ? 'roleplay__chip--active' : ''}`}
            onClick={() => pickScenario(s.id)}
          >
            <span className="roleplay__chip-num">{i + 1}</span>
            <span>{s.hrTone}</span>
          </button>
        ))}
      </div>

      <div className="roleplay__card">
        <div className="roleplay__hr">
          <div className="roleplay__hr-label">HR says:</div>
          <p className="roleplay__hr-line">{scenario.hrLine}</p>
          <div className="roleplay__context">
            <Icon name="info" size={12} />
            <span>{scenario.context}</span>
          </div>
        </div>

        <div className="roleplay__prompt">
          <strong>How do you respond?</strong>
        </div>

        <div className="roleplay__options">
          {scenario.responses.map((r, i) => (
            <button
              key={i}
              type="button"
              className={`roleplay__option ${pickedIdx === i ? 'roleplay__option--picked' : ''}`}
              onClick={() => setPickedIdx(i)}
            >
              <span className="roleplay__option-letter">{String.fromCharCode(65 + i)}</span>
              <span>{r.label}</span>
            </button>
          ))}
        </div>

        {picked && (
          <div className={`roleplay__result roleplay__result--${picked.verdict}`}>
            <div
              className="roleplay__verdict"
              style={{ color: VERDICT_STYLES[picked.verdict].color }}
            >
              <Icon
                name={picked.verdict === 'good' ? 'check' : picked.verdict === 'ok' ? 'info' : 'alert'}
                size={14}
              />
              {VERDICT_STYLES[picked.verdict].label}
            </div>
            <p className="roleplay__coaching">{picked.coaching}</p>
            <div className="roleplay__say">
              <div className="roleplay__say-label">What to actually say:</div>
              <p className="roleplay__say-line">{picked.sayThis}</p>
            </div>
          </div>
        )}
      </div>

      <p className="calc-foot">
        These scripts are educational, not legal advice. For serious situations — threats, age
        discrimination, or offers above $20K — consult a licensed employment attorney before
        signing anything.
      </p>
    </div>
  );
}
