// Blog posts for SEO and content marketing.
// Content is educational — not legal advice. Each post aligns to a product module.

export interface BlogPost {
  slug: string;
  title: string;
  summary: string;
  author: string;
  date: string; // ISO
  readMinutes: number;
  category: 'Severance' | 'Benefits' | 'Finances' | 'Job Search' | 'Legal';
  accent: string;
  body: string; // Markdown-ish (we render to simple HTML)
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'first-24-hours-after-layoff',
    title: 'The First 24 Hours After a Layoff: A Survival Playbook',
    summary: 'What to do — and what to avoid — in the first day after you are told your role is ending.',
    author: 'Exit Armor Team',
    date: '2026-03-02',
    readMinutes: 8,
    category: 'Severance',
    accent: '#f97316',
    body: `The first 24 hours after a layoff notice are the most important — and the most dangerous. The decisions you make today will shape your financial, legal, and professional standing for the next year. The problem is that you are in no state to be making decisions. You are exhausted, embarrassed, scared, and furious — sometimes all at once. This guide is designed to be read in that state and still be useful.

## Hour 1: Say as little as possible

When HR and your manager deliver the news, they will ask you to sign an NDA, acknowledge receipt of documents, or respond to the offer. Do not. The only acceptable response in this meeting is a neutral: "Thank you for letting me know. I need time to process this. I will respond in writing." Do not sign anything. Do not verbally agree to anything. Do not let them rush you. Most companies have a mandatory review window under the Older Workers Benefit Protection Act (21 days minimum if you are 40+, 45 days for group layoffs) — they cannot legally take that away.

## Hour 2-3: Save everything you are entitled to

Your access will be cut within hours — sometimes before you walk out. Before it is: download your last 12 months of pay stubs, your most recent W-2, every performance review on file, any written recognition or promotion letters, and export your personal contacts (Outlook, LinkedIn, Gmail). Take screenshots if you cannot download. What you should NOT take: company source code, client lists, confidential documents, or trade secrets. The line is clear — your own records are yours; company IP is not. Crossing that line gives them leverage to claw back severance or sue you. Stay on your side of it.

## Hour 4-8: Map your exposure

Before you panic, you need numbers. Pull your last three months of bank statements. Add up monthly rent/mortgage, utilities, food, insurance, and minimum debt payments — that is your essential burn. Add up your accessible cash — checking, HYSA, brokerage you could sell. Divide cash by burn. That number, in months, is your runway. Under 3 months = emergency mode. Over 6 months = you have time to negotiate. Most people are somewhere in between, and most people dramatically overestimate their position before they do this math.

## Hour 9-12: Tell your spouse or trusted confidant (and no one else yet)

Pick one person to carry this with you. A spouse, a sibling, a close friend. Tell them. Cry if you need to. Do NOT post on social media, LinkedIn, or in group chats yet — those posts are public forever and can kill future offers if framed wrong. Also do not tell your network yet — you will need them later, and the message is much stronger once you have a clear ask and a plan.

## Hour 13-24: Rest

Seriously. The single best thing you can do for the next 30 days of decisions is sleep a full night tonight. The severance deadline is at least 21 days out. Unemployment is still there tomorrow. The negotiation is better the day after tomorrow, when your cortisol is lower and your judgment is sharper. Eat a meal. Drink water. Take a shower. Go for a walk. Then sleep.

## What tomorrow looks like

Tomorrow is for filing unemployment, reviewing the severance document carefully, and sketching your plan. The day after is for benchmarking your offer. Day four is for drafting your negotiation email. Day five is for sending it. You have more time than you feel like you have. Use it.

The people who come out of a layoff well are not smarter or richer than the ones who come out badly. They are slower, calmer, and more systematic. The first 24 hours is where that starts.`,
  },
  {
    slug: 'severance-negotiation-11-asks',
    title: '11 Things You Can Negotiate in Any Severance Package',
    summary: 'Your severance offer is almost never "final." Here are 11 things that are actually on the table.',
    author: 'Exit Armor Team',
    date: '2026-03-05',
    readMinutes: 10,
    category: 'Severance',
    accent: '#8b5cf6',
    body: `HR will tell you the offer is non-negotiable. In our experience, over 70% of severance offers are negotiable — especially for tenured employees, senior roles, and group layoffs where the legal review burden is higher. The problem is most people do not know what they can ask for. Here are 11 things that are routinely negotiated, in rough order of how often they succeed.

## 1. Additional weeks of base pay

The easiest ask. Industry benchmark is 1-2 weeks per year of service (3-4 for senior leaders). If your offer is under that, ask to bring it up. Specific dollar asks — "I am requesting 4 additional weeks, representing 2 weeks per year of tenure" — work much better than vague ones.

## 2. COBRA premium reimbursement

Many companies will agree to 3 months of COBRA reimbursement — meaning they pay what you would have paid in employee contributions, not the full premium. This is often framed as "continuing your benefits through the transition" and is one of the easier asks because it is a small cost to them and a large benefit to you.

## 3. Pro-rated annual bonus

If you are laid off in Q2, Q3, or Q4 and would have been eligible for a bonus, ask for a pro-rata share. This is particularly successful if the company has a written bonus policy or a track record of paying departing employees. The counterargument ("you were not there at year-end") is weak if you worked 70% of the year.

## 4. Accrued PTO payout

In California, Massachusetts, Colorado, Louisiana, and several other states, this is legally required and not a negotiation at all — your PTO must be paid out as earned wages. In other states it depends on employer policy. Check your handbook; if it says PTO is paid out, insist on it.

## 5. Vesting acceleration on equity

This is the highest-dollar ask on the list for tech workers. If your next vesting cliff is within 3-6 months of your termination, ask for it to accelerate. Companies will usually do 50% — meaning they vest half of your next tranche early. For senior employees with large unvested grants, this can be worth more than the cash severance itself.

## 6. Extended exercise window for stock options

Standard option exercise windows are 90 days after termination — which is often not enough time to figure out if you can even afford to exercise, let alone execute a tax-optimized cashless exercise. Many companies will extend to 12 months on request. This is a zero-cost concession for the company and preserves significant optionality for you.

## 7. Removal of non-compete clause

Non-competes are unenforceable in California, North Dakota, Minnesota, and DC, and restricted by salary threshold in Illinois, Washington, Virginia, and Oregon. Even where they are enforceable, HR will often agree to remove them because they are expensive to litigate and rarely worth the fight. Ask to remove it entirely; at minimum, negotiate scope and duration down.

## 8. Positive reference letter in writing

Most companies will only confirm dates of employment and title — that is their liability-minimizing default. You can negotiate a written reference letter from your direct manager, or a commitment that the manager will serve as a personal reference. Get it in writing before you sign.

## 9. Outplacement or career coaching services

Large companies often have relationships with outplacement firms (Lee Hecht Harrison, Right Management) and can add 3-6 months of coaching to your package at no additional cost to them. Ask. The services are genuinely useful — resume reviews, interview coaching, access to job boards.

## 10. Confidentiality and non-disparagement carve-outs

Most severance agreements have mutual confidentiality clauses — but you should carve out the right to discuss your separation with your spouse, attorney, accountant, therapist, and prospective employers. You should also carve out protected activity under the NLRA and your right to file EEOC complaints. Employment lawyers routinely add these carve-outs.

## 11. Re-employment eligibility

Ask that you remain eligible for rehire. This matters when a new management team arrives and starts hiring back former employees — or when the company has a boomerang policy. It costs them nothing to say yes, and it preserves optionality for you.

## How to actually ask

The biggest mistake people make is asking for everything at once. Pick your top 3 asks, justify each one with data (tenure, benchmark, state law), and put them in a single email. Give HR 5 business days to respond. Stay calm, specific, and patient. If they push back, negotiate item by item — you are more likely to get 2 of 3 than 3 of 3, and that is a huge win compared to the starting offer.

The worst they can say is "no." The best they can say is "we can do 2 of 3" — and that 2-of-3 is often worth $10,000 to $50,000 over the starting offer. That is real money. Ask.`,
  },
  {
    slug: 'cobra-vs-aca-2026',
    title: 'COBRA vs ACA in 2026: Which Is Actually Cheaper?',
    summary: 'A practical guide to picking between COBRA and the ACA marketplace after a layoff.',
    author: 'Exit Armor Team',
    date: '2026-03-08',
    readMinutes: 9,
    category: 'Benefits',
    accent: '#ec4899',
    body: `After a layoff, most people have 60 days to make one of the most important financial decisions of the year: choose between COBRA (keep your old coverage) and the ACA marketplace (get a new plan with potential subsidies). The wrong choice costs thousands. Here is how to make the right one.

## What is COBRA, really?

COBRA is a federal law that gives you the right to continue your employer-sponsored health coverage for up to 18 months after termination, at your own expense. Your coverage does not change — same plan, same network, same deductible progress — but you pay the full premium, which typically means around $600-$2,500 per month depending on family size. That is the full premium the employer was paying plus a 2% administrative fee. It is expensive precisely because you are no longer subsidized.

## What is the ACA marketplace?

The ACA marketplace (healthcare.gov in most states) is a government-run exchange where you can buy individual or family health plans. Critically, losing your job is a qualifying life event that opens a 60-day Special Enrollment Period — you do not have to wait for open enrollment. ACA plans are often much cheaper than COBRA because of premium tax credits (subsidies) that scale with your income.

## The income threshold that changes everything

For 2026, if your household modified adjusted gross income falls roughly between 100% and 400% of the federal poverty level — around $15,000 to $60,000 single or $31,000 to $123,000 for a family of four — you qualify for substantial subsidies. Below 150% of FPL, you may qualify for plans as low as $0 premium. Above 400%, subsidies phase out (though the expansion from the Inflation Reduction Act has kept some subsidies in place through 2025).

Here is the key insight for laid-off workers: your income projection for the year is now much lower than it was. Severance counts as income, but if you will only work part of the year, your annualized income may drop enough to qualify for subsidies you never would have qualified for with a full year of salary. Run the numbers.

## When COBRA wins

COBRA is the right choice in three scenarios. First: you are mid-treatment for something serious (cancer, pregnancy, ongoing specialist care) and switching networks would disrupt your care. Second: you have already hit a large deductible this year and switching plans would reset it. Third: you are in a high-tax state and your household income is above 400% of FPL — the subsidies you would get through ACA are not enough to beat COBRA.

## When ACA wins

ACA is usually the right choice if your household income will be under about $100,000 for the year (including severance), you are reasonably healthy with no active treatment, and your current doctors are either flexible or available on marketplace plans. Most laid-off workers fit this profile.

## The 60-day strategy almost no one knows about

Here is a useful wrinkle: you have 60 days to elect COBRA, and if you elect it, it is retroactive to your termination date. That means you can wait up to 60 days to see if you need care. If nothing happens, you buy an ACA plan and save thousands. If you get hit by a bus on day 45, you elect COBRA retroactively and you are covered. This only works if you track the deadline carefully — miss day 60 and you lose both options.

## How to actually decide

Run both numbers on actual sites, not estimates. For COBRA, call HR and get the exact monthly premium (it will be on your COBRA notice, arriving within 44 days of termination). For ACA, go to healthcare.gov and complete a full application — enter your projected 2026 income, including any severance, UI benefits, and expected future employment. The site will show you plans with subsidies applied.

If ACA is more than about $150 cheaper per month, it is almost always the right call — that gap usually does not get closed by network differences. If they are within $100 of each other, choose based on network and deductible. If COBRA is clearly cheaper after subsidies, take it. Either way, do not miss the deadline.`,
  },
  {
    slug: 'state-unemployment-filing-guide',
    title: 'How to File for Unemployment in Your State (and Why Every Day Matters)',
    summary: 'A state-by-state overview of unemployment insurance, benefit amounts, and filing deadlines.',
    author: 'Exit Armor Team',
    date: '2026-03-10',
    readMinutes: 7,
    category: 'Benefits',
    accent: '#14b8a6',
    body: `The biggest myth about unemployment insurance is that it is "welfare." It is not. UI is money your employer paid into a state fund specifically for this purpose — it is earned insurance, not public assistance. If you are eligible and you do not file, you are leaving real money on the table.

## What you get (approximately)

The national average unemployment benefit is about $385 per week, but it varies wildly. Massachusetts and Washington pay over $1,000/week at the high end; Florida and Mississippi cap around $275. Benefits typically run for up to 26 weeks, though this too varies — Florida cuts off at 12 weeks when unemployment is low, while Massachusetts runs the full 26. Check your state\'s current max and duration when you file.

## Severance and UI — they are not mutually exclusive

In most states, severance does not disqualify you from UI benefits — it may just delay the start. For example, if you receive 8 weeks of severance and your state treats severance as "wages in lieu of notice," your UI payments will start after week 8. In some states (New Jersey, New York), severance is treated differently and may not delay benefits at all. File immediately regardless; the state will figure out timing.

## Why same-week filing matters

Most states do NOT backdate UI claims. If you wait two weeks to file, you lose two weeks of benefits — forever. For the average benefit, that is $770 gone. Some states have a one-week "waiting period" that does not pay out, but that starts the week you file, not the week you were laid off. File the same week. File the same day if you can.

## What you need to file

Gather these before you start the application: Social Security number, driver\'s license or state ID, your employer\'s name and address, your dates of employment, the reason for separation (use "laid off" or "lack of work"), and your wages for the last 18 months. Some states also want your bank details for direct deposit.

## The "reason for separation" field

This is the most important field on the whole application. The correct answer in a layoff situation is "laid off due to lack of work" or "job elimination." Do NOT say "fired," "quit," or "mutual agreement." Those phrases can delay or disqualify your claim. If there is any ambiguity, check with your state\'s UI office before submitting.

## Weekly certification

In every state, you have to recertify weekly to keep your benefits coming. You log in, answer questions about your job search activity, and confirm you are still looking. The system is designed to catch people who missed a week — so put a recurring calendar reminder for Sunday evening from the day you file. A single missed certification can break your claim.

## The work search requirement

Most states require you to perform and log a minimum number of job search activities per week (usually 3-5). Keep records: job titles, company names, dates you applied, methods used. You may be audited; people who cannot document their searches lose their benefits retroactively.

## Your state\'s specific portal

Every state has a different portal with different UX. The State Resources module in Exit Armor has direct links to all 50 state DOL portals, along with each state\'s specific quirks — New Jersey\'s mandatory severance rule, New York\'s 90-day WARN notice, Florida\'s short benefit duration, and the nine states with no state income tax on severance.

File today, not tomorrow.`,
  },
  {
    slug: '90-day-budget-layoff',
    title: 'The 90-Day Defense Budget: Stretching Your Runway After a Layoff',
    summary: 'How to cut expenses, call creditors, and extend your savings without killing your quality of life.',
    author: 'Exit Armor Team',
    date: '2026-03-12',
    readMinutes: 8,
    category: 'Finances',
    accent: '#10b981',
    body: `Most personal finance advice for laid-off workers is either panicked ("cut everything! sell your car!") or useless ("trim your latte budget"). Neither works. What works is a structured 90-day plan that moves from defense to offense, prioritizes the biggest line items, and preserves enough quality of life that you can actually job search effectively.

## Month 1: defense

The first 30 days are about reducing your outflow and protecting your credit. The three biggest levers are housing, subscriptions, and unsecured debt.

Housing: call your mortgage servicer or landlord. Most mortgage servicers have formal hardship programs — forbearance, payment deferral, or modification. They would rather pause your payments for 3 months than foreclose. Landlords are harder, but many will agree to a 30-day grace period if you ask in writing and before the rent is due. Get everything in writing.

Subscriptions: open your last 3 bank statements and flag every recurring charge under $100. Cancel anything you have not actively used in the last 30 days. Pause (do not cancel) anything you might return to — gym memberships, streaming services with good content libraries. The average household saves $150-$300/month on this alone.

Unsecured debt: call each credit card company and ask for a temporary rate reduction, payment deferral, or hardship program. They all have them. Most will not offer until you ask. Many will not ding your credit as long as you stay current under the modified terms.

## Month 2: offense

By the end of month 1 you should have a new, lower monthly burn — probably 20-40% below your pre-layoff number. Month 2 is when you shift from defense to job search. The budget supports the search: it buys you a clear head, removes financial panic from interviews, and lets you negotiate from a position of patience rather than desperation.

The key metric to watch in month 2 is not total savings left — it is "weeks of runway remaining." Calculate it weekly. If it starts declining faster than you expected, tighten further. If it is stable or growing (because your expense cuts outpaced your income drop), you have room to breathe.

## Month 3: transition

Month 3 is when most job searches start producing interviews. Your budget should be lean but sustainable. Avoid the two common mistakes here: (1) spending severance as it arrives (severance should be treated as 3-6 months of runway, not a windfall), and (2) tapping retirement accounts. A 401(k) early withdrawal costs 10% penalty plus ordinary income tax — easily 30-40% total destruction of the money. A 401(k) loan (if your plan allows one) is sometimes OK because you pay yourself back, but you lose the employer match and have to repay immediately if you take a new job. Neither is a good idea unless you are out of other options.

## What to protect at all costs

Three things are non-negotiable even in a tight budget: rent/mortgage (housing stability = mental stability = job search effectiveness), health insurance (one uninsured ER visit = $5,000-$50,000), and minimum debt payments (one missed payment can trigger default interest rates of 29% and tank your credit score for years).

## What can actually be cut

In rough order of lowest-pain to highest-pain: delivery apps ($200-$400/month for most people), unused subscriptions ($100-$200), dining out (huge variable), non-essential shopping, gym/wellness extras, vacation savings, transportation (one car vs two, transit instead of driving), kid activities (harder). The goal is to get your bleed rate down to a number your runway can absorb for 4-6 months — not zero. Total deprivation is unsustainable and wrecks your mental state, which wrecks your interviews.

## The calculator

Open the 90-Day Defense Budget module. Plug in your numbers. The calculator will tell you your monthly bleed rate and how many months your current cash will last. Use it weekly. Let the numbers drive the decisions.`,
  },
  {
    slug: 'adea-age-discrimination-severance',
    title: 'The ADEA 21-Day Rule: What Every 40+ Worker Needs to Know',
    summary: 'If you are 40 or older, federal law gives you extra time to review severance. Here is how to use it.',
    author: 'Exit Armor Team',
    date: '2026-03-15',
    readMinutes: 6,
    category: 'Legal',
    accent: '#ef4444',
    body: `The Older Workers Benefit Protection Act (OWBPA), an amendment to the Age Discrimination in Employment Act (ADEA), is one of the most underused legal protections in the US workforce. It gives workers 40 and older a set of specific, non-waivable rights when they are asked to sign a severance agreement. If you are in this group and you sign without using them, you are giving up real leverage.

## The 21-day (or 45-day) review window

If you are 40+ and you are asked to waive any age discrimination claims as part of severance (which is almost always the case — the agreement will include a broad release of claims), the law requires the employer to give you at least 21 days to review the agreement before signing. If the layoff is part of a group action — meaning two or more employees are being let go as part of the same reduction in force — the window extends to 45 days.

This is a floor, not a ceiling. Your employer can offer more. They cannot offer less. If the document they hand you says you must sign within 48 hours, that provision is unenforceable and the 21-day (or 45-day) window still applies. You should still acknowledge the offer, refuse to sign on the spot, and cite the OWBPA timeline in writing.

## The 7-day revocation window

After you sign, you have an additional 7 days to revoke your signature. During that week, if you change your mind — for any reason or no reason — you can rescind the agreement by sending written notice to the employer. The severance agreement is not effective until day 8. Employers cannot pay severance during the revocation period; they wait until it expires.

## What the employer must disclose in a group layoff

If your layoff is part of a group action, OWBPA requires the employer to give you two specific written disclosures. First: the job titles and ages of all employees eligible or selected for the program. Second: the job titles and ages of all employees in the same "decisional unit" who are not eligible or not selected. These disclosures let you and your attorney spot patterns that might suggest age discrimination — for example, if everyone laid off is over 50 while the retained workforce is under 40.

Most employees never look at these disclosures. They should. If the data shows a statistical skew toward older workers, that is a powerful piece of evidence if you decide to challenge the severance or pursue an age discrimination claim.

## What your release actually waives

A standard severance agreement will ask you to release "any and all claims" — age discrimination, disability discrimination, FMLA violations, wage and hour claims, ERISA claims, and state-law claims. Read the language carefully. Some claims cannot be waived even if you sign: workers\' compensation claims, unemployment benefits, and your right to file a charge with the EEOC (though you may waive your right to any individual recovery from that charge). Courts have also consistently held that you cannot waive claims that arise after the date you sign — only claims that exist as of signing.

## The realistic use of this time

Most 40+ workers who use the full 21 or 45 days end up in the same place: they sign the agreement. The review window is not primarily about deciding whether to sign — it is about deciding what to negotiate for before you sign. Every day inside the window is leverage. The employer wants closure; you want a better deal. Time is on your side.

During your window, do three things. First: get a 15-30 minute consultation with an employment attorney who specializes in severance review (NELA has a directory). This costs $0-$500 and is the best ROI money you can spend. Second: benchmark your offer against industry standards. Third: draft and send a counter-proposal mid-window.

## The most common mistake

The most common mistake 40+ workers make is signing on day 1 or day 2 "to get it over with." HR knows this tendency exists and counts on it. Signing immediately tells the employer you did not understand your rights, did not consult anyone, and did not think to negotiate. It often costs $5,000-$50,000 in foregone leverage. The emotional pull to just be done with it is real. Resist it. Sleep on it. Use your days.`,
  },
  {
    slug: 'linkedin-after-layoff',
    title: 'How to Announce Your Layoff on LinkedIn (and Actually Get Opportunities)',
    summary: 'A template and strategy for the LinkedIn post that gets 50,000 views instead of three likes.',
    author: 'Exit Armor Team',
    date: '2026-03-18',
    readMinutes: 6,
    category: 'Job Search',
    accent: '#0ea5e9',
    body: `Every laid-off worker wrestles with the same question in the first week: should I post about this on LinkedIn? The answer is yes — but how you post matters enormously. A well-framed post gets 100-500 comments and drives real inbound opportunities. A poorly framed one makes you look bitter and costs you interviews.

## Why to post

LinkedIn\'s algorithm rewards layoff posts. The platform sees high engagement on them (comments, support, congratulations when people land), and pushes them to extended networks. A layoff post reaches 10-50 times more people than a normal career update — which means your extended network, second-degree connections, and weak ties all see it. That is exactly where job leads come from.

More importantly: the post does the uncomfortable work for you. Instead of messaging 100 people individually and telling each of them you were laid off, you tell them all at once. It also gets in front of recruiters, whose daily workflow includes searching LinkedIn for "#opentowork" and recently affected candidates.

## Why to avoid the usual format

Most layoff posts make the same three mistakes: they are too long (500+ words), too emotional (lots of exclamation marks and self-pity), and too vague ("I am looking for my next opportunity where I can make an impact!"). That format gets 5 likes from close friends and nothing else.

The winning format is different: short, specific, and action-oriented. Here is the template.

## The template

"[Short announcement.] After [X years] at [Company], my role was impacted by the recent [round name / date / size] layoff. I am proud of what our team built — [one specific win, quantified if possible].

I am now exploring my next chapter. Specifically I am interested in:

→ [Target Role 1 — be specific, e.g., "Head of Product at Series B-C SaaS companies"]
→ [Target Role 2, if applicable]
→ [Location preferences: remote / [City] / open to relocation]

The fastest ways to help:
1. Intros to [specific type of person — e.g., "founders of consumer fintech companies building in NYC"]
2. Leads on open roles at [list 3-5 specific target companies]
3. Being liked/shared with your network (LinkedIn\'s algorithm rewards this)

Happy to reconnect properly with anyone I have lost touch with. Thank you to the team I\'m leaving — I will remember you all. And thank you in advance to this community."

## Why this format works

It is short (under 200 words). It is specific about what the person wants (target roles, specific asks). It makes it easy for random second-degree connections to help (share, like, send an intro). It is emotionally mature without being a downer (pride in the team, gratitude for the community). It does not trash the employer.

Most importantly, it gives strangers a reason to comment. Every comment amplifies the post. People love commenting when they can actually help — a specific ask like "leads on open roles at Plaid, Brex, or Ramp" gets 20 replies from people who know someone at one of those companies. A vague "looking for opportunities!" gets pity hearts.

## Turn on Open to Work (recruiters only)

Separately from your post, go into LinkedIn Settings and turn on "Open to Work." Set the visibility to "recruiters only" — this way it does not put a green banner on your profile but does make you visible in recruiter search filters for "open candidates." This roughly triples inbound from recruiters overnight.

## What to do after you post

Reply to every comment within the first 24 hours. Every reply keeps the post active in the feed algorithm longer, which means more reach. Thank people by name. Ask follow-up questions. When you get an intro offer, respond within an hour with your calendar availability. Speed signals you are serious and easy to work with — exactly what an opportunity-sender wants to feel before they stick their neck out.

## The second post, 30 days later

Thirty days in, post an update. Something like: "Month one update since being laid off. Grateful to [number] of you for coffee chats, intros, and advice. I am now in final rounds at two places and exploring three more. If anyone is connected to [very specific target you are still exploring], I would love one more intro. And to anyone reading this who was recently laid off — keep going. This network shows up." This post recharges the algorithm, maintains your visibility, and frames you as a person with momentum — which is the single most attractive quality to recruiters.`,
  },
  {
    slug: 'non-compete-enforceability-by-state',
    title: 'Non-Compete Clauses After a Layoff: What Is Actually Enforceable',
    summary: 'Non-competes are unenforceable in more states than most people realize. Here is the current landscape.',
    author: 'Exit Armor Team',
    date: '2026-03-22',
    readMinutes: 7,
    category: 'Legal',
    accent: '#8b5cf6',
    body: `If your severance agreement contains a non-compete clause, the first question to answer is whether it is even enforceable in your state. In several states, it is flatly banned. In several more, it is only enforceable under specific conditions. Signing without understanding the law in your state can cost you career flexibility you did not need to give up.

## States where non-competes are generally unenforceable

California has the most famous non-compete ban in the country, dating to 1872 (Business & Professions Code §16600). Any non-compete signed by a California employee is void on its face, with extremely narrow exceptions for business sale contexts. In 2023, California explicitly extended this to out-of-state agreements — meaning even if you signed a non-compete in another state and then moved to California, it is unenforceable once you are a California resident.

North Dakota has had a similar ban since 1865 (N.D.C.C. §9-08-06). Oklahoma restricts non-competes to non-solicitation of existing customers, not broad prohibitions on future work. Minnesota joined the list in 2023 — non-compete agreements signed on or after July 1, 2023 are unenforceable. The District of Columbia has also banned most non-competes for workers earning under about $150,000.

## States with salary-based restrictions

Several states allow non-competes but only above certain salary thresholds. In Illinois, the Freedom to Work Act prohibits non-competes for workers earning under $75,000. Washington State sets the threshold around $120,000 for employees (higher for contractors). Virginia banned non-competes for workers earning under about $73,000. Maryland restricts them for workers under $15/hour. Oregon limits non-compete duration to 12 months and requires a minimum salary threshold plus advance written notice.

These thresholds change frequently — check your state\'s current law before assuming the threshold that applied when you signed still applies today.

## States where non-competes are generally enforceable

Most remaining states allow non-competes if they are "reasonable" in scope, duration, and geography. "Reasonable" is a fact-specific inquiry decided case-by-case — a 12-month, same-city, same-industry non-compete for a senior executive is more likely to be enforced than a 3-year, nationwide, any-industry prohibition for an entry-level employee. In states like Texas, Florida, and Georgia, courts regularly enforce reasonable non-competes, but also regularly strike down overly broad ones (or "blue-pencil" them down to a reasonable scope).

## The Massachusetts garden leave rule

Massachusetts has a unique rule: non-competes signed after October 2018 require the employer to pay the employee at least 50% of their highest base salary during the non-compete period (so-called "garden leave"). This has dramatically reduced the use of non-competes in Massachusetts — most employers decided the 50% payment was not worth it.

## The FTC attempted ban

In April 2024, the Federal Trade Commission adopted a rule that would have banned nearly all non-compete agreements nationwide. That rule was blocked by a federal court in August 2024, and as of this writing, it is not in effect. The landscape is still state-by-state. Do not rely on federal action — check your state law.

## What this means for your severance

If your severance agreement includes a non-compete and you live in a state where they are unenforceable, the clause is essentially a scarecrow — it cannot legally bind you, but HR may hope you do not know that. You should still negotiate its removal for two reasons: (1) it makes the agreement cleaner and removes any risk of the employer pursuing you even in a losing case, and (2) it gives HR an easy concession to grant you, which builds good will for other asks.

If your state enforces non-competes, negotiate scope (specific competitors, not entire industry), duration (6 months, not 2 years), and geography (your metro area, not nationwide). If the employer will not budge, consider asking for "garden leave" — salary continuation during the non-compete period in exchange for compliance. Even states that don\'t legally require it will sometimes agree as a negotiation point.

## The bottom line

Never sign a non-compete without first checking your state\'s current law. Never assume an overly broad non-compete will be enforced — it probably will not, but you should still negotiate it down. And never let HR convince you the clause is "standard" and not up for discussion. It almost always is.`,
  },
  {
    slug: 'emergency-fund-after-layoff',
    title: 'Should You Tap Your 401(k) After a Layoff? The Math Says No',
    summary: 'Early 401(k) withdrawals cost more than most people realize. Here are the alternatives.',
    author: 'Exit Armor Team',
    date: '2026-03-25',
    readMinutes: 7,
    category: 'Finances',
    accent: '#10b981',
    body: `When runway gets tight after a layoff, the 401(k) balance starts looking very tempting. "I have $80,000 sitting right there. I just need $15,000 to get through three more months. What is the big deal?" The big deal is that tapping your 401(k) is almost always the wrong answer, and it is wrong by more than you think. Here is the math and the alternatives.

## The real cost of an early withdrawal

A 401(k) early withdrawal — taking money out before age 59½ — has three costs. First: a 10% IRS penalty on the withdrawn amount. Second: federal ordinary income tax on the full withdrawal, typically 22-32% depending on your bracket. Third: state income tax, typically 4-10% depending on where you live. Fourth (often forgotten): the lost future compound growth on the money you removed.

Add it up. On a $15,000 withdrawal, you might net $9,000 after federal penalty, federal tax, and state tax — meaning you paid $6,000 in fees and lost an additional $50,000+ in retirement growth over the next 30 years (at 7% average returns). A $15,000 problem today becomes a $56,000 problem at retirement. That is a bad trade.

## The CARES Act and COVID exceptions are mostly gone

During the pandemic, Congress passed CARES Act provisions that temporarily waived the 10% penalty and allowed spreading the tax burden over three years for coronavirus-related distributions. Those provisions have expired. There are still some hardship withdrawal exceptions, but they are narrow and most laid-off workers do not qualify.

## The 401(k) loan: better, but still not great

If your current or former plan allows 401(k) loans — many do not for terminated employees — you can borrow up to 50% of your vested balance or $50,000, whichever is less. You pay yourself back with interest over 5 years, and the interest goes into your own account. No taxes, no penalty, if you repay on schedule.

The catch: if you do not repay the loan by the tax deadline of the year following the year you took it (for terminated employees), the unpaid balance is treated as a deemed distribution — meaning you now owe the 10% penalty and full income tax on it. For most laid-off workers without a new job, this means a 401(k) loan just delays the withdrawal pain. Use it only if you are very confident you will be re-employed quickly at comparable income.

## Better options, in rough order

Before touching retirement, exhaust these in order:

(1) Emergency savings and taxable brokerage accounts. This is what they are for.

(2) Hardship programs with your creditors. Mortgage forbearance, credit card hardship plans, auto loan deferrals, and federal student loan income-driven repayment plans. These cost you zero in principal destruction. Call every creditor. Ask for hardship programs. Most will say yes.

(3) Roth IRA contribution withdrawals. If you have a Roth IRA, you can withdraw the contributions (not the earnings) at any time without tax or penalty. This is a little-known fact. It is different from a Roth 401(k). If you have a Roth IRA with $20,000 in contributions and $5,000 in earnings, you can take out the $20,000 without any tax hit.

(4) HSA balances. If you have a Health Savings Account, the money is yours forever and can be withdrawn for qualified medical expenses without tax. It cannot be used for general living expenses without tax and penalty, but it can cover any medical bills you have paid out of pocket over the years — keep your medical receipts, and you can reimburse yourself years later.

(5) Severance, if you have not burned through it. Severance is usually the last of your liquid cash before retirement funds, and it is taxed as ordinary income anyway, so using severance for living expenses is just using the cash for its intended purpose.

(6) A short-term personal loan or a 0% APR balance transfer credit card, if you have good credit. The math only works if you are confident you will repay within the 0% window (typically 12-18 months). If there is any doubt, skip this — credit card debt at 24-29% will destroy you.

## When tapping retirement is actually OK

There is one scenario where an early withdrawal is arguably defensible: your alternative is losing your home (foreclosure) or going bankrupt, and the amount of the withdrawal is enough to prevent that outcome. In those extreme cases, the math on "pay the penalty" vs "lose everything" favors paying the penalty. But that is a last-ditch scenario and it requires a conversation with a fee-only fiduciary financial advisor first, not a decision made at 11 pm on a Tuesday when you are panicking.

## The 90-day budget works precisely to avoid this

A structured 90-day budget — cut subscriptions, call creditors, stretch the runway, get UI and severance rolling — is designed to buy you the time you need without touching retirement. Most laid-off workers who feel like they need to tap 401(k) actually need to cut 15-25% of monthly expenses and call three creditors. That is far cheaper than a $6,000 penalty on a withdrawal.

Before you touch retirement, run the math. Usually it says don\'t.`,
  },
  {
    slug: 'interview-explaining-layoff',
    title: 'How to Explain Your Layoff in an Interview (Without Sounding Defensive)',
    summary: 'The two-sentence script that neutralizes "why did you leave your last job" and keeps momentum.',
    author: 'Exit Armor Team',
    date: '2026-03-28',
    readMinutes: 6,
    category: 'Job Search',
    accent: '#0ea5e9',
    body: `Every laid-off worker dreads the same interview moment: "So, why did you leave your last role?" The temptation is to over-explain, justify, or subtly blame the company. All three are mistakes. The winning move is a calm, specific, 15-second answer — rehearsed in advance — that neutralizes the question and lets you move on.

## The problem with the default answer

Most laid-off candidates default to some version of: "Well, the company had financial troubles and there was a layoff and unfortunately my role was eliminated, but I really enjoyed my time there and learned a lot and I am now looking for my next opportunity where I can grow." This is ninety words of hedging, and the interviewer glazes over by word twenty. Worse: it sounds defensive. An interviewer who hears too much explanation suspects something is off — even if the layoff was completely not your fault.

## What a great answer sounds like

Here is the template:

"My role was eliminated in [month] as part of a [company-wide / department-level / org restructure] that impacted [approximate number] people. I am now focused on [target role] at companies solving [problem you care about]. I am particularly interested in [this company] because [one specific reason about them]."

Three sentences. Under fifteen seconds. Let me break down why each piece works.

## "My role was eliminated"

Passive voice is your friend here. "Eliminated" is a neutral word — it says nothing about performance, fit, or politics. It strongly implies "this was about the role, not about me." Compare to "I was let go" (ambiguous — could be performance), "I was fired" (definitely not — fired implies cause), or "I left" (misleading — implies you had a choice). "My role was eliminated" is clean, honest, and neutral.

## "As part of a [bigger thing] that impacted [number] people"

This anchors the layoff as a systemic event, not an individual one. "Part of a company-wide layoff of 200 people" is very different from "they eliminated my role." The first is clearly a business decision; the second could be individual. Give the bigger context — it removes the implicit question of whether you specifically did something wrong.

## "I am now focused on [target role]"

Immediately pivot forward. Do not dwell. The interviewer wants to know you are not stuck processing the layoff — you are actively pursuing the next thing. Being specific about the target role ("Senior Product Manager roles in consumer SaaS") signals confidence and clarity.

## "At companies solving [problem you care about]"

This is your segue into why you are here, in this room, with this specific interviewer. It is your chance to show you care about more than just "a job" — you care about the problem space. Tailor this sentence to the company you are interviewing with.

## "I am particularly interested in [company] because..."

And now you are interviewing them, not the other way around. You have successfully moved the conversation from "why did you leave" to "why do I want to be here." The interviewer is now engaged in selling you on the company rather than probing your termination.

## What NOT to do

Do not badmouth the previous company, even if they deserve it. Do not blame specific people. Do not cry. Do not get defensive. Do not say "I needed a change" — it implies the layoff was half-mutual, which weakens your story. Do not volunteer more detail than asked. Do not call it a "workforce reduction" or "restructuring event" in corporate speak — it sounds like you are hiding something.

## What to do if they push

Some interviewers will push: "Was your performance a factor? Do you know why your role specifically was picked?" This is a legitimate question and has a clean answer: "No — it was about role overlap and priorities shifting, not performance. My last review was [strong / above target / on track], and my manager is serving as a reference. Happy to connect you with them if it would be helpful." This answer provides evidence (recent review), offers verification (reference), and closes the door on the performance question.

If the interviewer keeps pushing beyond this, that is a yellow flag about them — you should not apologize more than once for something that was not your fault.

## Practice until it is automatic

Write your exact three sentences today. Practice them out loud ten times. Record yourself on your phone. Listen back — do you sound calm or defensive? Clear or rambling? Forward-looking or stuck in the past? Keep practicing until the answer is automatic and you can deliver it without feeling anything. That automaticity is the goal — when the question comes in the interview, your mouth should already know the answer while your brain is free to watch the interviewer\'s reaction and pivot into the next part of the conversation.

This is not a speech about your career. It is a tiny gate you walk through on your way to the conversation you actually want to have. Make the gate small, clean, and rehearsed — and then walk through it.`,
  },
];

export const BLOG_BY_SLUG: Record<string, BlogPost> = Object.fromEntries(
  BLOG_POSTS.map((p) => [p.slug, p]),
);
