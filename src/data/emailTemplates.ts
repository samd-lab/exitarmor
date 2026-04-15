// Full-length negotiation and job-search email templates.
// Copy, personalize, send. Templates are auto-personalized using the
// user's profile (see lib/storage.ts > personalize()).

export interface EmailTemplate {
  id: string;
  title: string;
  tag: string;
  when: string;
  subject: string;
  body: string;
  notes: string[];
  category?: 'severance' | 'job-search';
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
    category: 'severance',
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
    category: 'severance',
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
    category: 'severance',
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
    category: 'job-search',
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
    category: 'job-search',
  },
  {
    id: 'explain-layoff',
    title: 'How to Explain Your Layoff (Interview / Elevator)',
    tag: 'Interview',
    when: 'Use when an interviewer or network contact asks "so what happened at [Company]?"',
    subject: 'The 90-second answer — spoken, not written',
    body: `(Speak this in 60–90 seconds. Do not read it aloud — internalize the structure and deliver it naturally.)

"My role at [Company] was eliminated in [month] as part of a [company-wide / department-level / org] restructure that impacted approximately [number] people across the [function / region / business unit]. The decision was driven by [publicly-known context — e.g., 'a shift from the consumer business toward enterprise', 'a broader reduction in force announced in the Q[X] earnings call', 'the consolidation of two teams after the acquisition']. It was a position-level decision, not a performance one — I was told directly by my manager that the team had been pleased with my work, and I left in good standing with a positive reference from [Manager Name].

I'm proud of what I accomplished in my [X years] there. The highlights I point to are [Specific Accomplishment #1 with a quantified outcome — e.g., 'leading the launch of [product] which generated $[X] in its first year'], [Specific Accomplishment #2 with a metric], and [Specific Accomplishment #3 — ideally one that involved cross-functional leadership or a hard problem solved]. Those three things are the clearest signal of what I can bring to my next role.

What I'm focused on now is [Target Role] at companies working on [Problem You Care About]. I'm particularly interested in [This Company] because [One Specific, Researched Reason — something from their engineering blog, a recent product launch, a values post from their CEO, a customer story]. I've been intentional about using this window to talk to people solving problems I find genuinely interesting, rather than spraying applications — and that's what brought me to this conversation."

(Stop. Let them respond. Do not keep talking.)`,
    notes: [
      '90 seconds is the target. Practice it out loud until it is automatic — you will be asked this every single interview.',
      'Three structural beats: (1) what happened + why it was not personal, (2) what you achieved there, (3) what you want next. Missing any beat weakens the story.',
      'Use passive voice for the layoff itself ("My role was eliminated") — it keeps the focus on the role, not on you.',
      'Always include publicly-known business context — it signals that you understand the business decision and are not bitter.',
      'Always name the manager and quality of the reference — it pre-empts the interviewer\'s unspoken concern ("was this a performance issue?").',
      'Three accomplishments, all quantified. Generic claims ("I built products") signal you don\'t remember specifics. Numbers signal you do.',
      'Target role + target company context + one specific reason you care about THIS company — this is what separates a pro from a panicked applicant.',
      'Never trash the employer, never sound angry, never use the words "let go" or "fired," never dwell. Forward momentum is the product.',
    ],
    category: 'job-search',
  },
  {
    id: 'linkedin-announcement',
    title: 'LinkedIn "Open to Work" Announcement Post',
    tag: 'Job Search',
    when: 'Post publicly on LinkedIn within 7–14 days of the layoff, once you have calmed down.',
    subject: 'LinkedIn post — public announcement',
    body: `After [X amazing years] at [Company], my role was eliminated last [week / month] as part of a broader restructure that impacted [number] roles across the [function / region]. I'm grateful for my time there and incredibly proud of what the team built together.

A few highlights I'll carry forward:

→ [Accomplishment #1 — quantified. e.g., "Led the launch of [product], which grew from 0 to [$X] ARR in [Y] months"]
→ [Accomplishment #2 — quantified. e.g., "Scaled the [team / function] from [X] to [Y] people while [specific hard thing]"]
→ [Accomplishment #3 — quantified. e.g., "Shipped [project] across [N] markets in [timeframe]"]

More than any of that, I'm grateful for the people — [Manager Name] who trusted me with [specific big thing], [Peer Name] who taught me [specific skill], and the rest of the [team name] team who showed up every day and made the work matter.

Now the forward look. I'm focused on finding my next chapter as a [Target Role] at a company solving [Problem Area]. Specifically, I'm interested in:

• Mission: companies tackling [specific space you care about — e.g., "climate, healthcare infrastructure, or developer tooling"]
• Stage: [Seed / Series A–B / growth / public] — where I can [bring X skill and learn Y]
• Location: [City, remote-first, or open]

If you know of roles that fit, or if you'd be open to a 20-minute conversation about your world, I'd be grateful for either. I'm not expecting anyone to find me a job — what I'm hoping for is advice, introductions, and the occasional "have you thought about ___?"

My resume is linked in my profile, and you can reach me at [Your Personal Email]. Thank you to everyone who has already reached out — it has meant more than I can say.

#OpenToWork #[YourFunction] #[YourIndustry]`,
    notes: [
      'Post publicly, not to "recruiters only" — the warm network reach is the whole point.',
      'Lead with gratitude, not grievance. Angry posts go viral for the wrong reasons and follow you for years.',
      'Three quantified accomplishments — not five, not one. Three is the magic number for scannability.',
      'Name 2–3 specific people you worked with. It generates warm comments and gets your post shown to their networks.',
      'Be specific about what you want next — mission, stage, location. Vague "open to opportunities" posts get vague responses.',
      'Explicitly lower the ask: "I\'m not expecting anyone to find me a job." This gets you 3x more responses than asking for a job.',
      'Include your personal email in the post. Do not make people DM you — friction kills intros.',
      'Use the #OpenToWork tag — LinkedIn\'s algorithm actively surfaces these posts to recruiters and 2nd-degree connections.',
    ],
    category: 'job-search',
  },

  // ============================================================
  // EXTENDED TEMPLATE LIBRARY
  // 14 more full-length emails covering the rest of the severance
  // and post-layoff job-search workflow. Each is personalised via
  // the same [bracketed placeholder] system the original 7 use.
  // ============================================================

  {
    id: 'reschedule-hr',
    title: 'Reschedule the HR Call — Give Yourself a Day',
    tag: 'Severance',
    when: 'Send within 2 hours of receiving an HR calendar invite to discuss severance.',
    subject: 'Rescheduling our [day] conversation',
    body: `Hi [HR Name],

Thanks for sending the invite for [day / time]. I'd like to move our conversation by 24 hours if possible — to [new day / time] or a similar slot that works for you.

I want to be fully prepared for the discussion and give your proposal the careful consideration it deserves. A short extra window lets me review the documents you sent, jot down my questions, and come to the call ready to have a productive conversation rather than a reactive one.

I'm flexible on the exact time — please pick whatever works on your end within the next [24–48] hours and I'll make it work.

Thank you for understanding,
[Your Name]
[Personal Email] | [Phone]`,
    notes: [
      'Buys you 24 hours without refusing the meeting — HR is almost always willing to reschedule by a day.',
      'Frames the delay as YOU being thorough, not YOU being combative.',
      'Uses personal email/phone — assume work access may be revoked at any moment.',
      'Never say "I want to talk to a lawyer first" here — it creates adversarial energy before the real conversation.',
    ],
    category: 'severance',
  },

  {
    id: 'doc-request',
    title: 'Document Pull — Get Everything You\'re Entitled To',
    tag: 'Severance',
    when: 'Send the same day you receive the initial severance offer.',
    subject: 'Requesting my personnel file and related documents',
    body: `Hi [HR Name],

In addition to the severance agreement itself, I'd like to formally request copies of the following documents before I make any decisions. Most of these I'm entitled to under [state] personnel-file access law, and the rest are simply what I'll need to evaluate the offer and plan for the transition.

1. My complete personnel file, including performance reviews, written commendations, warnings (if any), and compensation history
2. My most recent pay stubs and W-2s for the last two calendar years
3. A summary of my accrued but unused PTO balance as of my separation date
4. The current Summary Plan Description for my health insurance, 401(k), and any equity plan
5. The latest statement for my 401(k) and any equity / RSU / stock-option holdings with current vesting schedules
6. Any written materials describing the criteria used to select positions for this restructure (applies only if you received a group layoff notice under OWBPA)
7. A copy of any non-compete, non-solicitation, IP assignment, or arbitration agreement I previously signed

I'd appreciate these as PDF attachments to my [personal email] within [5 business days] if possible. If any of these are not available or are subject to a delay, please let me know which and why, and I'll work with that.

Thank you,
[Your Name]`,
    notes: [
      'Covers everything you are legally entitled to in one request — do not send separate emails for each item.',
      'References state personnel-file access law without naming a specific statute — lets HR confirm the jurisdiction themselves.',
      'Requests the OWBPA disclosure documents, which are mandatory in group layoffs of age 40+ employees.',
      'Asks for documents to be sent to your PERSONAL email — work access is often cut the same week.',
      'Sets a soft deadline ("5 business days") — prevents the request from falling off HR\'s to-do list.',
    ],
    category: 'severance',
  },

  {
    id: 'extra-weeks',
    title: 'Counter-offer: More Weeks of Pay',
    tag: 'Severance',
    when: 'Send as part of your full counter-proposal once you have benchmarked the offer.',
    subject: 'Severance proposal — additional weeks',
    body: `Hi [HR Name],

Thank you for the patience as I reviewed the package. I want to focus this note on a single topic — the severance weeks — and save the other items for a separate conversation so we can take each one in turn.

The current offer of [X weeks] of base pay represents approximately [Y weeks per year of service] for my [N] years at [Company]. I took some time to benchmark this against public SHRM 2024 data and against the separation terms that [Company] has historically offered at my level (based on conversations with former colleagues at similar tenure).

Based on that research, a severance package of [X+Z] weeks — representing [2] weeks per year of service — would align more closely with the standard benchmark and with how departing employees at my tenure have typically been treated. I'd like to formally request that increase.

I want to be clear about why I'm asking. This isn't about fairness in the abstract — it's about runway. At [X] weeks, my household has roughly [N months] of covered expenses. At [X+Z] weeks, that window extends to [N+2 months], which makes a meaningful difference in the kind of next role I can take (a considered one, versus the first one that makes an offer).

If additional weeks of base pay is not feasible, I'd welcome alternatives of roughly equivalent value — for example, [a lump-sum bonus payment / acceleration of my [next tranche] of equity / COBRA premium reimbursement for [3–6] months]. I'm open to whatever form works on your end.

Please let me know by [date — 3–5 business days out]. Thank you for considering it.

[Your Name]`,
    notes: [
      'Asks for ONE thing — additional weeks — and saves other asks for separate emails. Bundled asks are easier to decline.',
      'References SHRM as the benchmark source — it is the most-cited public data on severance practices.',
      'Explains the human impact (runway, quality of next role) — makes the ask hard to refuse without sounding inhumane.',
      'Offers 3 alternative forms of value — gives HR a path to say "yes, but differently" instead of flat no.',
      'Sets a 3–5 business day soft deadline so the request does not sit in a queue.',
    ],
    category: 'severance',
  },

  {
    id: 'cobra-reimbursement',
    title: 'Counter-offer: COBRA Premium Reimbursement',
    tag: 'Severance',
    when: 'Send as a standalone or bundled ask alongside the severance weeks request.',
    subject: 'Health benefits during the transition',
    body: `Hi [HR Name],

Separately from the severance-weeks discussion, I'd like to raise the question of health coverage during the transition.

Under the plan currently in force, my family's monthly COBRA premium would be approximately $[amount], based on the rate sheet included with the separation packet. KFF's 2024 Employer Health Benefits survey puts the national average family COBRA premium above $1,800/month, so this is broadly in line with the industry — but it's still a meaningful out-of-pocket cost during a period when I'll have no active income.

I'd like to request that [Company] reimburse my COBRA premiums for [3 / 6] months following my separation date, payable either as a lump sum at the time of separation or as monthly reimbursements on presentation of receipts. Total value would be approximately $[amount].

There are a few reasons this feels like the right conversation:

1. Continuity of care matters for my family. Two of our doctors are in-network only on this plan, and a mid-treatment switch would be disruptive.

2. COBRA reimbursement is one of the most common concessions in severance packages at my level — it appears in the majority of executive and senior-IC separations in SHRM's published benchmarks.

3. Relative to additional weeks of base pay, COBRA reimbursement is often less expensive for the employer while being more valuable to the employee in the short term.

If the preferred structure on your end is a lump-sum health-care stipend rather than a reimbursement, that works equally well for me — I can apply it to an ACA Marketplace plan if that turns out to be the better option for my situation.

Thank you for considering this. Happy to discuss on a call if it would be easier than email.

[Your Name]`,
    notes: [
      'Cites the KFF 2024 report — the authoritative public source on COBRA premium costs.',
      'Positions COBRA reimbursement as "less expensive for you, more valuable for me" — a true win-win frame.',
      'Offers a lump-sum stipend alternative — lets HR pick the structure that works on their side.',
      'Mentions specific continuity-of-care concerns — makes the ask feel personal and real, not mercenary.',
      'Can be sent alongside the weeks-of-pay ask or on its own. Standalone usually has a higher yes rate.',
    ],
    category: 'severance',
  },

  {
    id: 'noncompete-waiver',
    title: 'Non-Compete Waiver Request',
    tag: 'Severance',
    when: 'Send if the separation agreement contains a non-compete clause that would limit your job search.',
    subject: 'Non-compete clause — request for removal',
    body: `Hi [HR Name],

I want to raise one specific clause in the separation agreement for discussion: the non-compete in Section [X]. I'd like to request that it be removed from my agreement, and I want to explain why in a way I hope feels reasonable rather than confrontational.

As written, the clause would prohibit me from working for "any direct or indirect competitor" of [Company] for [X months] within [geographic scope]. Based on a plain reading, that covers nearly every company in my field in my metro area — which is also the industry in which I've built my career and the only realistic place for me to find a comparable next role.

A few considerations I'd ask you to weigh:

1. Enforceability. [State] courts have taken an increasingly narrow view of post-employment non-competes, particularly for individual-contributor and mid-level roles. The FTC's 2024 rule also signals a federal-level shift in the same direction. I believe the clause as written may not be enforceable against me, but rather than test that, I'd prefer we simply remove the friction now.

2. Confidentiality is unaffected. I fully intend to honor every confidentiality, IP-assignment, and non-solicitation obligation in the agreement. Those protect [Company]'s actual business interests. I'm not asking you to waive any of those.

3. Runway. Practically speaking, if I can't work in my field for [X months], I either take a role outside my skill set (bad for me) or I run out of money and fall back into distress (also bad for me, and ultimately worse for [Company]'s reputation among former employees).

I'd like to request the non-compete clause be struck from the agreement before I sign. I'm happy to sign an explicit acknowledgment that my confidentiality, IP, and non-solicitation obligations remain in full force, to make that symmetry clear on your end.

If there's a specific business concern driving the non-compete I'm not aware of, I'd welcome the chance to discuss it. If the preferred path is to narrow the clause rather than remove it — for example, limiting it to a specific named competitor or a 60-day window — I'm open to that as a compromise.

Thank you,
[Your Name]`,
    notes: [
      'References the FTC 2024 non-compete rule and state-level skepticism of non-competes — signals you know the legal landscape.',
      'Volunteers to keep confidentiality and non-solicitation — makes the waiver feel like a concession, not a capitulation.',
      'Frames the ask around runway and realistic job-search constraints, not legal technicalities.',
      'Offers a fallback compromise (narrow the clause) — rarely lands at "total removal" but often lands somewhere useful.',
      'HIGH-STAKES TEMPLATE. Review with an employment attorney before sending if your severance is >$20K or if the non-compete is unusually broad.',
    ],
    category: 'severance',
  },

  {
    id: 'equity-acceleration',
    title: 'Equity Vesting Acceleration Request',
    tag: 'Severance',
    when: 'Send if you have unvested equity / RSUs / options at the time of separation.',
    subject: 'Unvested equity — request for acceleration',
    body: `Hi [HR Name],

One item I'd like to raise separately is the treatment of my unvested equity.

Based on the equity statement dated [date], I currently hold the following unvested grants:

• [Grant #1]: [N] RSUs / options, next vesting date [date], value approximately $[amount]
• [Grant #2]: [N] RSUs / options, next vesting date [date], value approximately $[amount]
• [Grant #3]: [N] RSUs / options, next vesting date [date], value approximately $[amount]

Under the standard terms of the plan, all unvested grants would be forfeited on my separation date of [date]. I'd like to request that [Company] accelerate the vesting of [the next tranche / all tranches vesting within 90 days of my separation date] as part of the severance package.

A few reasons I'm raising this:

1. Timing. My separation date falls [N weeks / days] before my next scheduled vest of [Grant #X]. Under the current structure, I would lose the value of equity I've already earned in substance, simply because the calendar date lands on the wrong side of my last day.

2. Consistency. Based on [Company]'s public filings and conversations with former colleagues, partial acceleration appears to have been granted in several past separations at my level.

3. Alignment with the restructure rationale. The official reason given for the layoff is [position elimination / restructure / cost reduction], not performance. Accelerating the short-window vests acknowledges that the separation was a business decision unrelated to my contribution.

If full acceleration of all unvested grants is not feasible, I'd accept a more limited ask: acceleration of only [Grant #1, the next vest within 90 days], representing approximately $[amount] in value. That feels like a fair middle ground.

Happy to discuss on a call. Thank you for considering it.

[Your Name]`,
    notes: [
      'Lists each unvested grant explicitly — forces HR to actually look at your statement rather than dismiss in the abstract.',
      'Anchors the ask around calendar timing, which feels objectively unfair and is easier for HR to champion internally.',
      'Offers a scaled-back fallback (next-tranche only) — dramatically increases the chance of some acceleration.',
      'Never use this template without first reading your grant documents. Acceleration may already be automatic for "without cause" separations in many plans.',
      'If total unvested value is > $50K, strongly consider having an employment attorney review the ask before sending.',
    ],
    category: 'severance',
  },

  {
    id: 'reference-letter',
    title: 'Written Reference Letter Request',
    tag: 'Severance',
    when: 'Send to your direct manager (not HR) in the final week before signing the agreement.',
    subject: 'One favor before I go',
    body: `Hi [Manager Name],

I want to say thank you, properly, before we wrap up. Working with you over the last [N years] has been one of the best parts of my career. The thing I'm going to carry with me is [specific trait or moment — e.g., "how you handled the [project] launch when everything was on fire, and somehow still made room to coach me through the [specific situation]"]. That set a standard I'll try to live up to wherever I land next.

I have one small ask before I'm out. Would you be willing to write me a short reference letter — something I can share with recruiters and potential hiring managers? Two or three short paragraphs is all I'd need. Ideally it would cover:

1. How long we worked together and in what capacity
2. A brief description of 2–3 things I did well in the role (you know the highlights better than I could summarize them)
3. A plain recommendation for the kinds of roles you think I'd be a strong fit for next
4. Your contact information for anyone who wants to follow up

If it helps, I'm happy to draft something from scratch for you to edit — just say the word and I'll send a first draft this week. Otherwise, I'd be grateful for whatever you have time to write.

Whatever you can do, thank you. And please stay in touch — I mean that.

[Your Name]
[Personal Email] | [Phone] | [LinkedIn]`,
    notes: [
      'Goes to your manager, NOT to HR. HR reference letters are almost always neutral and legally cautious — manager letters are warm.',
      'Opens with a specific, earned compliment — shows this is not a form letter and makes the manager want to help.',
      'Offers to write a first draft — removes the biggest friction (busy managers never have time to start from scratch).',
      'Asks for 3 clear components — prevents you from getting a vague "I liked working with them" note that is useless.',
      'Collect the letter BEFORE your last day. Once you are off the system, the email you send will land in a blocked-sender folder.',
    ],
    category: 'severance',
  },

  {
    id: 'attorney-intake',
    title: 'Employment Attorney Intake Email',
    tag: 'Severance',
    when: 'Send to a prospective employment attorney when your severance is >$20K or you suspect discrimination.',
    subject: 'Potential severance review — intake',
    body: `Hi [Attorney Name / Firm],

I'm writing to request a short consultation on a severance agreement I was presented with on [date]. I understand you handle employment matters for individuals and I was referred to you by [NELA directory / a colleague / your website].

A few facts so you can triage:

• Employer: [Company Name], a [industry] company based in [City, State]. Approximate size: [N employees].
• My role: [Title], [function], [N years] of tenure. Reporting to [Manager Title], [reporting up to] [VP Title].
• Separation date: [date]
• Reason given: [position elimination / restructure / specific language from the letter]
• Severance offered: [X weeks] of base pay, totaling approximately $[amount], plus [COBRA / equity / other]
• Review window: [21 / 45] days, with [7] days to revoke after signing
• Agreement length: [N] pages

The specific questions I'd like to address in the consultation:

1. Is the severance offer in line with what you typically see for someone at my tenure and role in [state]?
2. Is there anything in the agreement I should push back on before signing? (I have noted [specific clauses of concern] myself.)
3. [Optional: Are there any facts about the circumstances of my layoff that would support a discrimination / retaliation / wrongful-termination claim worth exploring?]
4. What is your fee structure — flat, hourly, or contingency? Are there free or reduced-fee options for an initial review?

A PDF of the separation agreement is attached. I have NOT signed or returned it.

I'd prefer to keep the initial conversation brief — 30 minutes, ideally by phone — and can be available [weekday mornings / afternoons / any time] over the next [5] business days.

Thank you for considering my request. I appreciate your time.

Best regards,
[Your Name]
[Personal Email] | [Phone]`,
    notes: [
      'Opens with how you found the attorney — NELA (nela.org) and the ABA directory are the standard referral paths.',
      'Lists employer, role, tenure, and financial terms in scannable bullets — most attorneys spend less than 3 minutes on initial triage.',
      'Explicitly states you have not signed — protects your negotiating position and lets the attorney plan around your review window.',
      'Asks about fee structure upfront — normal and expected. Many employment attorneys offer free 30-minute intakes for individual matters.',
      'Do NOT send the signed agreement to multiple attorneys simultaneously — pick one at a time and give each a clear yes/no before moving on.',
    ],
    category: 'severance',
  },

  {
    id: 'outplacement',
    title: 'Outplacement Services Request',
    tag: 'Severance',
    when: 'Send if the severance package does not already include outplacement — or if the included service is limited.',
    subject: 'Outplacement support during the transition',
    body: `Hi [HR Name],

I noticed the separation package [does not include outplacement services / includes only a 30-day Lee Hecht Harrison self-service tier]. I'd like to request that [Company] extend [outplacement services / a more comprehensive outplacement tier] as part of the package.

Specifically, I'd like to request [3 / 6] months of one-on-one outplacement coaching at the [individual / executive] tier, delivered through either the vendor [Company] is already contracted with or a comparable service of [Company]'s choosing. Approximate value of that level of service is typically $[2,500–5,000], depending on vendor.

I'm raising this for two reasons:

1. Outplacement at this level is commonly offered in severance packages for employees at my tenure and role — it's not an unusual or expensive ask.

2. Realistically, individual outplacement has a materially better placement outcome than self-directed job search for someone transitioning from a long-tenured role. I'll work hard regardless, but the structured support measurably shortens the gap.

If the preferred structure on your end is a cash stipend I can apply to an outplacement service of my choosing, that works equally well — my estimate for a quality 3-month coaching engagement is approximately $[2,500].

Thank you for considering this,
[Your Name]`,
    notes: [
      'Outplacement is often the easiest ask to land — it is a line item HR already has a vendor for.',
      'Offers a cash-stipend alternative so you can pick the service that works for you (e.g., career coach vs. enterprise vendor).',
      'Cites realistic vendor pricing ($2,500–5,000) — prevents HR from coming back with a token $500 stipend.',
      'Frames the ask around placement outcomes, not entitlement — easier for HR to champion internally.',
      'Does NOT compete with your other asks (weeks, COBRA, equity) — outplacement comes out of a different budget line.',
    ],
    category: 'severance',
  },

  {
    id: 'unemployment-appeal',
    title: 'Unemployment Benefits Appeal / Clarification',
    tag: 'Severance',
    when: 'Send to your state unemployment office if your claim is delayed, denied, or marked as contested by the employer.',
    subject: 'Claim [claim number] — request for clarification',
    body: `To whom it may concern,

I am writing regarding my unemployment insurance claim, number [claim number], filed on [date] with the [State] [Department of Labor / Workforce Commission / Employment Security Department].

My employer, [Company Name], separated my position on [date] as part of a [layoff / reduction in force / position elimination]. I have attached a copy of the separation letter I received from my employer, which confirms the reason for separation.

I am writing because [my claim has been pending for longer than the expected processing window / my claim was denied / my claim status shows "employer contested"]. I would like to understand the status of my claim and, if necessary, respond to any information the employer has provided.

Specifically, I'd like to request the following:

1. Confirmation of the current status of my claim and the reason for any delay or denial
2. A copy of any statement my employer has submitted in response to this claim
3. An explanation of my appeal rights and the deadline to exercise them, if applicable
4. A clear list of any additional documentation I can provide to resolve the matter

For reference, my contact information is:

• Name: [Your Name]
• SSN (last 4): [xxxx]
• Claim number: [number]
• Separation date: [date]
• Employer: [Company Name]
• Phone: [Phone]
• Email: [Personal Email]

I am available by phone during normal business hours and can respond to any written request within 48 hours. Please let me know how you would like to proceed.

Thank you for your assistance.

Respectfully,
[Your Name]`,
    notes: [
      'Attach your separation letter. This is the single most important piece of evidence that you were laid off, not fired for cause.',
      'Do NOT include your full SSN in an email — last 4 digits only, and only if required by your state.',
      'Every state has a different appeals deadline — usually 10–30 days from the denial date. Check your state\'s specific window before sending.',
      'If the employer has contested your claim (rare for a layoff but common for performance-flagged separations), request their statement and respond to each specific claim individually.',
      'If the denial is upheld, the next step is usually a phone hearing — request one in writing and bring the separation letter, your performance reviews, and any written commendations.',
    ],
    category: 'severance',
  },

  {
    id: 'informational-interview',
    title: 'Informational Interview Request',
    tag: 'Job Search',
    when: 'Send to people 1–2 degrees removed from your warm network, at companies or roles you want to learn more about.',
    subject: 'A 20-minute conversation about [their company / their role]?',
    body: `Hi [Name],

I came across your profile through [specific path — e.g., "your post on [topic] in [publication]," "my former colleague [Name]," "a LinkedIn search for people who've made the jump from [Old Role] to [New Role]"]. I really admired [specific thing — a project, a post, a talk, a published essay], and I wanted to reach out directly.

Quick context: my role at [Company] was eliminated last month, and I'm using the current window to be deliberate about what I do next rather than applying everywhere at once. I'm particularly interested in [specific field / problem / company type] — which is why your path caught my attention.

I'm not writing to ask for a job, and I'm not expecting you to know of any openings. What I'm hoping for is 20 minutes of your time for an informational conversation, ideally on one of these topics:

1. How you think about [the specific skill / transition / decision I'm trying to make]
2. What you wish you'd known when you were in the seat I'm currently in
3. Who else in your network you think I should talk to — even just one or two names

I'm flexible on timing and happy to work around your calendar. Here's a link to my availability over the next two weeks: [Calendly link]. If none of those slots work, just reply with anything easier on your end and I'll make it happen.

Either way, thank you for considering it. I know how much these asks pile up, and I appreciate the time you took to read this.

Best,
[Your Name]
[LinkedIn] | [Personal Email]`,
    notes: [
      'Specifics in the first paragraph are what separate a cold ask from a mass blast. Name the post, the project, the essay.',
      'Explicit "not asking for a job" removes the defensive reflex and gets more yeses.',
      'Three very specific questions — NOT "pick your brain." "Pick your brain" is a signal that you have not thought about what you want.',
      'Always include a Calendly link — friction kills meetings.',
      '20 minutes is the magic number — long enough to be useful, short enough that busy people will say yes.',
    ],
    category: 'job-search',
  },

  {
    id: 'post-interview-thanks',
    title: 'Post-Interview Thank-You',
    tag: 'Interview',
    when: 'Send within 4 hours of every interview round — separate note to each person you met.',
    subject: 'Thanks for the conversation today',
    body: `Hi [Interviewer Name],

Thank you for the time this morning — I really enjoyed our conversation about [specific topic you discussed, e.g., "how your team is thinking about the [product area] roadmap for next year"]. Your framing on [specific insight they shared] in particular gave me something new to think about, and I appreciate that you went into that level of detail.

One thing I wanted to follow up on: when we were talking about [specific challenge they mentioned], I mentioned [a project / experience] briefly but didn't get to the details. To close the loop — the shortest version is [2–3 sentence elaboration with a concrete outcome, ideally quantified]. Happy to go deeper on that in a future conversation if it's useful.

A few things I'm taking away from our conversation:

1. [Specific insight about the company, role, or team that impressed you — shows you were paying attention]
2. [Specific way you think your background maps to a need they raised]
3. [A question or area you'd like to learn more about in a follow-up, if there is one]

I'm genuinely excited about the possibility of joining [Team / Company] and helping with [specific problem they mentioned]. If there's anything further you need from me in the meantime — a writing sample, a reference, a clarification on my background — just let me know.

Thank you again for your time.

Best regards,
[Your Name]
[Phone] | [LinkedIn] | [Personal Email]`,
    notes: [
      'Send within 4 hours. The best time is while you are still at the coffee shop right after the interview.',
      'SEPARATE note to each person — never CC or send a group thank-you. It signals you did not pay individual attention.',
      'Reference a specific topic from the conversation — proves you were present and listening.',
      'Use the note to close one loop (something you wish you had explained better). Hiring managers read these closely.',
      'Keep it under 250 words. Long thank-you notes read as needy. Short and specific reads as confident.',
    ],
    category: 'job-search',
  },

  {
    id: 'offer-negotiation',
    title: 'New Job Offer Negotiation',
    tag: 'Job Search',
    when: 'Send within 24 hours of receiving a written offer from a new employer.',
    subject: 'Re: offer for [Role] — a few items to discuss',
    body: `Hi [Recruiter / Hiring Manager Name],

Thank you so much for the offer — I'm genuinely excited about the opportunity to join [Company] and work with [Manager Name] on [specific thing]. I want to say that clearly up front, because what follows is a negotiation email, and I don't want the tone to be confused with hesitation about the role itself. I want this job.

I've reviewed the full offer carefully and I'd like to discuss three specific items before I sign:

1. Base salary. The offer is $[X]. Based on [specific market data you can cite: Levels.fyi for tech, BLS OES tables, Radford range, Glassdoor company-level data — name the source], the [50th / 75th] percentile for this role at this level in [city] is in the range of $[Y–Z]. Given my [N years] of experience and specifically my [quantified accomplishment most relevant to the role], I'd like to request a base of $[Y]. That would bring the offer in line with the benchmark and reflect the specific value I'd bring to the team.

2. Signing bonus / equity. [Optional section if relevant. Otherwise delete.] The current offer includes [$X signing bonus / N RSUs]. I'm coming off a layoff where I forfeited approximately $[unvested equity value] in unvested equity, and I'd like to request a signing bonus of $[amount] to partially offset that loss. I'm open to structuring it with a [12-month] clawback if I leave before the first anniversary — happy to discuss what structure works for your team.

3. Start date. The current offer shows a start date of [date]. I'd like to request [a week or two of additional time] before starting, to properly close out the current transition and arrive fresh. A start date of [new date] would work well for me, if it works for your team.

On everything else in the offer — vacation, benefits, the role scope, reporting structure — I am aligned and ready to sign once we can resolve these three items.

I'm happy to discuss any of this on a 15-minute call, which may be faster than email back-and-forth. My calendar is flexible over the next few days.

Thank you for considering this. I'm looking forward to joining the team.

Best regards,
[Your Name]`,
    notes: [
      'Always open with enthusiasm before negotiating. Tone matters. Recruiters kill offers over "difficult candidate" signals.',
      'Cite specific market-data sources. Levels.fyi for tech, BLS OES tables for almost any US role, Radford for executive comp.',
      'Ask for 3 things max. More than 3 and it reads as a wishlist, not a negotiation.',
      'Offer structural flexibility (clawback terms, timing) — gives the recruiter something to take back to finance.',
      'Offer a 15-minute call. Written negotiations escalate faster than voice ones. Voice lets both sides close gracefully.',
    ],
    category: 'job-search',
  },

  {
    id: 'cold-reengage',
    title: 'Warm-Network Re-Engagement',
    tag: 'Job Search',
    when: 'Send to contacts you have not spoken to in 12+ months who might be helpful.',
    subject: 'It has been a while — a quick update',
    body: `Hi [Name],

It has been far too long. I was thinking about you today because [specific, true reason — e.g., "I saw the [Company] news about [product launch] and remembered how often you talked about wanting to work on that problem," or "I came across an old email thread from the [Project] days and it reminded me how much I learned from you"]. I should have stayed in better touch — that's on me.

A quick update from my side: I spent the last [N years] at [Company], most recently as [Role]. In [month], my role was eliminated as part of a broader restructure. It caught me off guard, but I'm using the window to be deliberate about what comes next rather than rushing the decision.

The kind of role I'm focused on: [Target Role] at companies working on [Problem You Care About], ideally in [City / remote]. Specifically I'm drawn to [1–2 specific company types or characteristics that help them picture the right fit].

I'm not writing to ask for a job or introductions — I'd genuinely love to just catch up, hear what you're working on these days, and reconnect. If any of that happens to surface an idea or a name, great. If not, I'd still be glad to hear from you.

Would a 20-minute call in the next two or three weeks work? Here's my availability: [Calendly link]. Totally fine if the timing is bad — I'll ping you again in a month.

Either way, good to reach out. I hope you and [family / team / project] are well.

Best,
[Your Name]
[Phone] | [LinkedIn] | [Personal Email]`,
    notes: [
      'Never apologize for the long silence without a reason — it reads as guilt. The "specific reason I was thinking about you" framing does the apology work without being needy.',
      'State what happened (layoff) without dwelling — one sentence, neutral tone, then move on.',
      'Explicit "not asking for a job or intros" is load-bearing. People respond to warmth, not to wish-list requests.',
      'The Calendly + soft deadline ("I\'ll ping you again in a month") removes the response pressure without letting the thread die.',
      'Send in batches of 5–10 per day. More than that and the emails start feeling rushed and identical.',
    ],
    category: 'job-search',
  },
];
