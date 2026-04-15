// Full-length negotiation email templates.
// Copy, personalize, send.

export interface EmailTemplate {
  id: string;
  title: string;
  tag: string;
  when: string;
  subject: string;
  body: string;
  notes: string[];
}

export const EMAIL_TEMPLATES: EmailTemplate[] = [
  {
    id: 'soft-stall',
    title: 'Soft Stall — Buy Time',
    tag: 'Step 1',
    when: 'Send within 24 hours of receiving the severance offer.',
    subject: 'Following up on our conversation today',
    body: `Hi [HR Name],

Thank you for walking me through the separation package this morning. I know these conversations are not easy on either side, and I appreciate the respect you showed in how you handled it.

I want to make sure I fully understand every element before making a decision — the release of claims, the non-compete and non-disparagement language, the COBRA timing, and the equity treatment all deserve a careful read. To that end, I'd like to request the following:

1. A PDF copy of the complete separation agreement (including any exhibits or attachments referenced in the body)
2. Confirmation of the exact date my health benefits end
3. A copy of my most recent performance review and any written commendations on file
4. Confirmation of my final paycheck amount, including any accrued and unused PTO

Please consider this email confirmation that I have not yet accepted the terms of the severance offer. I understand I have [21 / 45] days to review under the Older Workers Benefit Protection Act, and I intend to use that time carefully.

Could we schedule a brief 20-minute call later this week once I've had a chance to review everything? I'll come prepared with specific questions so we can use the time efficiently.

Thank you again for your help during this transition.

Best regards,
[Your Name]
[Your Personal Email]
[Your Phone]`,
    notes: [
      'Sent via email — creates a paper trail and prevents "I never said that" claims later.',
      'Explicitly references OWBPA review window. Signals you know your rights without being aggressive.',
      'Requests documents you are legally entitled to — HR cannot refuse.',
      'Uses personal email/phone — work email may be disabled any moment.',
    ],
  },
  {
    id: 'leverage',
    title: 'Leverage Rebuttal — Ask for More',
    tag: 'Step 2',
    when: 'Send 5-10 days after the initial offer, once you have reviewed and benchmarked.',
    subject: 'Response to separation package — proposed adjustments',
    body: `Hi [HR Name],

Thank you for providing the documents and taking the time to answer my questions on our call last [day]. I've now had a chance to review the full agreement with [my advisor / an employment attorney / careful consideration], and I'd like to respond formally.

I want to start by saying I remain grateful for my time at [Company]. I joined in [month/year], led [brief description of biggest contribution], and am proud of what the team accomplished together — including [specific project], [specific metric], and [specific recognition]. I've always tried to represent the company well, and that will continue after my departure.

That said, after reviewing the offer against industry benchmarks and my specific circumstances, I'd like to respectfully request the following adjustments:

1. Additional severance pay. The offered [X weeks] represents approximately [Y weeks per year of service]. Given my tenure of [N years] and the standard benchmark of 2 weeks per year for my level, I'd request an increase to [X + Z] weeks. This addresses the gap between the offer and market standard.

2. COBRA premium reimbursement. Rather than bearing the full ~$[amount]/month cost myself, I'd request 3 months of COBRA premium reimbursement. This is a common concession in severance packages for tenured employees and represents approximately $[amount] in value.

3. Removal of the non-compete clause. As written, the non-compete would limit my ability to work in my field for [X months]. Given that [state] [does not enforce / narrowly enforces] non-competes for roles like mine, and given my need to replace my income quickly, I'd request this clause be removed entirely. I'm happy to maintain the confidentiality and non-solicitation obligations — those I fully support.

I want to be clear: I'm not looking to make this difficult, and I understand there may be constraints I'm not aware of. I'm asking because I believe these are reasonable and in line with how [Company] has treated departing employees at my level historically.

If any of these are not feasible, I'd welcome a counter-proposal. I'm also happy to discuss on a call if that's easier than email.

Please let me know by [date — give 3-5 business days]. I want to resolve this well within my review window so we can both move forward.

Thank you for considering this,
[Your Name]`,
    notes: [
      'Leads with gratitude and specific accomplishments — frames you as reasonable, not adversarial.',
      'Makes 3 specific, quantified asks — never ambiguous.',
      'Justifies each ask with data (tenure, benchmark, state law).',
      'Offers flexibility on the most contentious item (keeps confidentiality, asks to drop non-compete).',
      'Sets a soft deadline — pressures them to act without being aggressive.',
    ],
  },
  {
    id: 'final-signoff',
    title: 'Final Sign-off — Protect Yourself',
    tag: 'Step 3',
    when: 'Send once you have reached verbal agreement on the final terms, before signing.',
    subject: 'Ready to sign — final confirmations needed',
    body: `Hi [HR Name],

Thank you for working with me on the final terms. I appreciate your flexibility on [the adjustments / the timeline / the additional weeks] — it makes a meaningful difference for my family during this transition.

Before I sign and return the agreement, I want to confirm a few items in writing so we're fully aligned:

1. Final severance amount: [$X], payable as [lump sum on [date] / bi-weekly through [date]], less applicable tax withholding.

2. Health benefits: My employer-sponsored coverage will end on [date]. I'll receive my official COBRA notice within 44 days of that date. [Company will / will not] reimburse COBRA premiums for [X] months following the end of active coverage.

3. Accrued PTO: [X] hours of unused PTO will be paid out on my final paycheck, per [state / company policy].

4. Non-compete: The non-compete clause in Section [X] has been [removed / modified to apply only to [specific scope]]. I remain bound by the confidentiality and non-solicitation clauses in Sections [Y] and [Z].

5. Reference: [Company] agrees to provide a neutral reference confirming my dates of employment and title, and [Manager name] has agreed to serve as a personal reference for me.

6. Return of property: I will return [laptop, badge, etc.] via [method] by [date]. Please confirm the return address.

7. Final paycheck: I will receive my final regular paycheck for [pay period] on [date], separate from severance.

Once I have written confirmation of the above (a short reply email is fine), I will sign and return the agreement within 24 hours.

Thank you again for handling this professionally. I wish [Company] well.

Best regards,
[Your Name]`,
    notes: [
      'Locks in every verbal promise in writing — if it is not in email, it did not happen.',
      'Covers all seven critical items: severance $, benefits, PTO, non-compete, reference, property return, final paycheck.',
      'Offers quick execution ("within 24 hours") in exchange for confirmation.',
      'Closes graciously — you never know when you\'ll cross paths again.',
    ],
  },
  {
    id: 'warm-network',
    title: 'Warm Network Outreach',
    tag: 'Job Search',
    when: 'Send to 10 warm contacts within the first week.',
    subject: 'Quick update and a small ask',
    body: `Hi [Name],

Hope you're doing well. It's been a while — I think the last time we caught up was [specific context: that conference / the [Company] project / your promotion].

Short update from my side: my role at [Company] was eliminated last [week/month] as part of a larger restructure. Not a total shock given the market, but still a tough moment. I'm now focused on finding my next chapter, ideally in [target area — e.g., "senior product roles at mission-driven consumer companies"].

I'm reaching out because I always valued your perspective — and honestly, I trust your network. I'm not asking for a job, and I don't expect you to have one. What would really help is 15 minutes on a call where I could:

1. Tell you what I'm looking for in specific terms
2. Hear your honest read on who in your network might be open to a quick intro conversation
3. Ask your advice on [specific question relevant to them — e.g., "how the [X] market is looking right now"]

If you have 15 minutes in the next couple of weeks, I'd be grateful. I'm flexible on timing — here's my calendar: [Calendly link]. No hard feelings if the timing doesn't work, and either way I hope our paths cross again soon.

Thanks for considering it,
[Your Name]
[Phone] | [LinkedIn]`,
    notes: [
      'Opens with specific memory — shows this is not a mass blast.',
      'Explicit "not asking for a job" — lowers pressure and gets more yeses.',
      'Asks for 15 minutes, not an hour — respects their time.',
      'Includes a Calendly link — removes scheduling friction.',
      'Positions you as seeking advice + intros, not a handout.',
    ],
  },
  {
    id: 'recruiter-cold',
    title: 'Recruiter Cold Outreach',
    tag: 'Job Search',
    when: 'Send to recruiters at target companies within 2 weeks.',
    subject: '[Target Role] — [X years] experience, open to discussing',
    body: `Hi [Recruiter Name],

I saw that [Company] is hiring for [Specific Role] — I'm writing to introduce myself directly and see if you'd be open to a quick conversation.

Quick context on me:
• [X years] in [function/industry], most recently as [Role] at [Previous Company]
• Led [biggest accomplishment — quantified — e.g., "a team of 8 that shipped a product generating $5M ARR in year one"]
• Background strengths: [skill 1], [skill 2], [skill 3]
• [Specific reason I care about your company — e.g., "I've been following your work on [product] for a year — it's exactly the kind of problem I want to work on next"]

A few things that are probably relevant:
• I'm fully based in [city] / open to relocation / open to remote
• My target comp range is [$X-Y] base + [equity expectations if relevant]
• I'm available to start within [timeline], and I have the time right now to interview properly
• I was recently impacted by a layoff at [Previous Company] — happy to explain the context if it's helpful

If [Role] is still open and you think there's fit, I'd welcome a 20-minute intro call. If not, I'd still appreciate any feedback on how my background maps to other openings you have or may have soon.

Resume attached. LinkedIn: [URL].

Thanks for considering,
[Your Name]
[Phone]`,
    notes: [
      'Specific role in the subject line — not "job inquiry."',
      'Bulleted quick-scan format — recruiters skim; they don\'t read paragraphs.',
      'Quantified accomplishments — numbers stand out.',
      'Proactively addresses logistics (location, comp, timeline) — removes objections.',
      'Mentions the layoff briefly and framed positively — gets ahead of any Google search.',
    ],
  },
];
