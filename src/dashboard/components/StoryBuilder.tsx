// Interview Story Builder — STAR-format fill-in worksheet.
//
// Designed to work for ANY worker — software engineer, carpenter, barista,
// paralegal. No jargon. No AI. Just a simple guided form that turns a raw
// memory into a clean interview answer.
//
// How it's non-technical-friendly:
//  - Plain-English prompts ("What was the problem?") not "Situation/Task"
//  - Example answers shown in each field's placeholder
//  - A live preview stitches the fields into a finished paragraph
//  - One-click "Copy finished answer" — no Word-doc gymnastics
//
// Stores up to 6 stories in localStorage. User picks which one they're
// editing from a tab strip. All stateful, nothing leaves the device.

import { useState } from 'react';
import { Icon } from '../../components/Icon';
import { usePersistentState } from '../../lib/storage';

export interface Story {
  id: string;
  title: string;
  situation: string; // What was happening? Who/where/when?
  task: string;      // What did you need to do? What was the goal?
  action: string;    // What did YOU do, step by step?
  result: string;    // What changed? Numbers, feedback, outcome.
}

const STORY_SLOTS: Array<{ id: string; label: string; prompt: string }> = [
  { id: 'win',        label: 'A big win',              prompt: 'A time you delivered real results — a project, a save, a breakthrough.' },
  { id: 'failure',    label: 'A failure you recovered from', prompt: 'Something that went wrong and how you fixed it or learned from it.' },
  { id: 'conflict',   label: 'A conflict you handled', prompt: 'A disagreement with a coworker, customer, or boss — and how it got resolved.' },
  { id: 'leadership', label: 'A leadership moment',    prompt: 'A time you took charge — even informally — and got others moving.' },
  { id: 'hard-work',  label: 'A technical / craft deep-dive', prompt: 'A time you solved a hard problem in your craft — coding, carpentry, cooking, whatever you do.' },
  { id: 'teamwork',   label: 'A cross-team / cross-functional win', prompt: 'A time you worked with people outside your usual group to get something done.' },
];

const EMPTY_STORY = (id: string, title: string): Story => ({
  id,
  title,
  situation: '',
  task: '',
  action: '',
  result: '',
});

const INITIAL_STORIES: Record<string, Story> = Object.fromEntries(
  STORY_SLOTS.map((s) => [s.id, EMPTY_STORY(s.id, s.label)])
);

function buildAnswer(s: Story): string {
  const parts: string[] = [];
  if (s.situation.trim()) parts.push(s.situation.trim());
  if (s.task.trim()) parts.push(s.task.trim());
  if (s.action.trim()) parts.push(s.action.trim());
  if (s.result.trim()) parts.push(s.result.trim());
  return parts.join(' ');
}

export function StoryBuilder() {
  const [stories, setStories] = usePersistentState<Record<string, Story>>(
    'stories.star',
    INITIAL_STORIES
  );
  const [activeId, setActiveId] = useState<string>(STORY_SLOTS[0].id);
  const [copied, setCopied] = useState(false);

  const slot = STORY_SLOTS.find((s) => s.id === activeId)!;
  const story = stories[activeId] ?? EMPTY_STORY(slot.id, slot.label);
  const answer = buildAnswer(story);

  const update = <K extends keyof Story>(k: K, v: Story[K]) => {
    setStories({
      ...stories,
      [activeId]: { ...story, [k]: v },
    });
  };

  const copy = () => {
    navigator.clipboard?.writeText(answer);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const completedCount = Object.values(stories).filter((s) => buildAnswer(s).length > 40).length;

  return (
    <div className="story">
      <div className="story__intro">
        <Icon name="spark" size={16} />
        <span>
          Write <strong>6 short stories</strong> from your work life. Every interview
          will reach for one of these. The form below walks you through each one — no
          jargon, no fluff.{' '}
          <strong>{completedCount}/6</strong> drafted so far.
        </span>
      </div>

      <div className="story__tabs">
        {STORY_SLOTS.map((s) => {
          const hasContent = buildAnswer(stories[s.id] ?? EMPTY_STORY(s.id, s.label)).length > 40;
          return (
            <button
              key={s.id}
              type="button"
              className={`story__tab ${activeId === s.id ? 'story__tab--active' : ''} ${hasContent ? 'story__tab--done' : ''}`}
              onClick={() => setActiveId(s.id)}
            >
              {hasContent && <Icon name="check" size={12} />}
              {s.label}
            </button>
          );
        })}
      </div>

      <div className="story__form">
        <p className="story__prompt">{slot.prompt}</p>

        <StoryField
          label="1. What was happening?"
          hint="Set the scene. Who, where, when. Keep it short — one or two sentences."
          placeholder="e.g. Last summer I was running the deli counter on Saturday, our busiest day, and the bread delivery didn't show up..."
          value={story.situation}
          onChange={(v) => update('situation', v)}
        />
        <StoryField
          label="2. What did you need to do?"
          hint="What was the goal? What was at stake?"
          placeholder="e.g. We had 40+ sandwich orders on the rail and only half a loaf left. I had to figure out how to keep the line moving without losing customers."
          value={story.task}
          onChange={(v) => update('task', v)}
        />
        <StoryField
          label="3. What did YOU do? (be specific)"
          hint="This is the part they care about most. Use 'I' not 'we'. Walk through the steps."
          placeholder="e.g. I called the bakery next door and asked if they'd sell us 10 loaves at wholesale. I ran over, paid out of the till, and was back in 8 minutes..."
          value={story.action}
          onChange={(v) => update('action', v)}
        />
        <StoryField
          label="4. What was the result?"
          hint="Numbers if you have them. Feedback from a boss or customer works too."
          placeholder="e.g. Zero walkouts, finished the rush clean, and my manager put me on Saturday lead shifts from then on. We used that bakery as backup for two more years."
          value={story.result}
          onChange={(v) => update('result', v)}
        />

        <div className="story__preview">
          <div className="story__preview-label">
            <Icon name="list" size={14} /> Your finished answer
          </div>
          {answer ? (
            <p className="story__preview-text">{answer}</p>
          ) : (
            <p className="story__preview-empty">
              Fill in the fields above — your answer will appear here, ready to copy.
            </p>
          )}
          {answer && (
            <div className="story__actions">
              <span className="story__wordcount">
                {answer.split(/\s+/).filter(Boolean).length} words · aim for 90–150
              </span>
              <button type="button" className="btn-pill" onClick={copy}>
                <Icon name="download" size={14} />
                {copied ? 'Copied!' : 'Copy finished answer'}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="story__tips">
        <h5>How to deliver this in the interview</h5>
        <ul>
          <li>Read it out loud 3 times. Don't memorize — just get the shape.</li>
          <li>In the interview, start with "Sure, let me tell you about..." and tell it like a story.</li>
          <li>If they want more detail, they'll ask. Short &amp; clean beats long &amp; rambling.</li>
        </ul>
      </div>
    </div>
  );
}

function StoryField({
  label,
  hint,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  hint: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="story-field">
      <label>{label}</label>
      <div className="story-field__hint">{hint}</div>
      <textarea
        rows={3}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
