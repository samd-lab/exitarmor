// All 50 US states + DC with labor/employment data relevant to layoffs.
// Sources: state DOL websites, BOLI/EDD/TWC portals, Paycor / Littler 2024 summaries.

export interface StateInfo {
  code: string;
  name: string;
  unemploymentUrl: string;
  ptoPayoutRequired: 'yes' | 'no' | 'conditional';
  warnThreshold: number; // employees at which mini-WARN applies
  noncompeteAllowed: boolean;
  notes: string;
}

export const STATES: StateInfo[] = [
  { code: 'AL', name: 'Alabama', unemploymentUrl: 'https://labor.alabama.gov/uc', ptoPayoutRequired: 'no', warnThreshold: 100, noncompeteAllowed: true, notes: 'Federal WARN applies (100+ employees). PTO payout depends on employer policy. Non-competes generally enforceable if reasonable.' },
  { code: 'AK', name: 'Alaska', unemploymentUrl: 'https://labor.alaska.gov/unemployment', ptoPayoutRequired: 'conditional', warnThreshold: 100, noncompeteAllowed: true, notes: 'No state income tax. PTO payout required if employer policy promises it.' },
  { code: 'AZ', name: 'Arizona', unemploymentUrl: 'https://des.az.gov/services/employment/unemployment-individual', ptoPayoutRequired: 'conditional', warnThreshold: 100, noncompeteAllowed: true, notes: 'Federal WARN only. Non-competes must be narrow in scope, time, geography.' },
  { code: 'AR', name: 'Arkansas', unemploymentUrl: 'https://www.dws.arkansas.gov', ptoPayoutRequired: 'no', warnThreshold: 100, noncompeteAllowed: true, notes: 'Federal WARN Act only. Check your employee handbook for PTO rules.' },
  { code: 'CA', name: 'California', unemploymentUrl: 'https://edd.ca.gov', ptoPayoutRequired: 'yes', warnThreshold: 75, noncompeteAllowed: false, notes: 'Non-competes banned. 3-day right to rescind severance if given under Business & Professions Code §16600. Mini-WARN at 75 employees. PTO must be paid out — it is treated as wages.' },
  { code: 'CO', name: 'Colorado', unemploymentUrl: 'https://cdle.colorado.gov', ptoPayoutRequired: 'yes', warnThreshold: 100, noncompeteAllowed: false, notes: 'Non-competes largely banned as of 2022 (HB22-1317). PTO must be paid out under Nieto v. Clark\'s Market.' },
  { code: 'CT', name: 'Connecticut', unemploymentUrl: 'https://www.ctdol.state.ct.us', ptoPayoutRequired: 'conditional', warnThreshold: 100, noncompeteAllowed: true, notes: 'Federal WARN only. PTO payout depends on policy. Non-competes enforceable if reasonable.' },
  { code: 'DE', name: 'Delaware', unemploymentUrl: 'https://ui.delawareworks.com', ptoPayoutRequired: 'conditional', warnThreshold: 100, noncompeteAllowed: true, notes: 'Federal WARN. PTO depends on employer policy.' },
  { code: 'DC', name: 'District of Columbia', unemploymentUrl: 'https://does.dc.gov', ptoPayoutRequired: 'yes', warnThreshold: 100, noncompeteAllowed: false, notes: 'Strong worker protections. Non-competes largely banned for most workers (2022). PTO must be paid out.' },
  { code: 'FL', name: 'Florida', unemploymentUrl: 'https://connect.myflorida.com', ptoPayoutRequired: 'no', warnThreshold: 100, noncompeteAllowed: true, notes: 'No state income tax. Lower max benefit ($275/week) than most states. Federal WARN applies. Non-competes broadly enforceable.' },
  { code: 'GA', name: 'Georgia', unemploymentUrl: 'https://dol.georgia.gov', ptoPayoutRequired: 'no', warnThreshold: 100, noncompeteAllowed: true, notes: 'Federal WARN Act applies. PTO payout depends on policy. Non-competes allowed if reasonable.' },
  { code: 'HI', name: 'Hawaii', unemploymentUrl: 'https://labor.hawaii.gov/ui', ptoPayoutRequired: 'conditional', warnThreshold: 50, noncompeteAllowed: true, notes: 'Hawaii has a 45-day Dislocated Workers Act (similar to WARN) at 50+ employees. Tech non-competes restricted.' },
  { code: 'ID', name: 'Idaho', unemploymentUrl: 'https://www.labor.idaho.gov', ptoPayoutRequired: 'no', warnThreshold: 100, noncompeteAllowed: true, notes: 'Federal WARN only.' },
  { code: 'IL', name: 'Illinois', unemploymentUrl: 'https://ides.illinois.gov', ptoPayoutRequired: 'yes', warnThreshold: 75, noncompeteAllowed: true, notes: 'Illinois WARN applies at 75 employees. Non-competes banned for workers earning under $75K (Freedom to Work Act). PTO must be paid out.' },
  { code: 'IN', name: 'Indiana', unemploymentUrl: 'https://www.in.gov/dwd', ptoPayoutRequired: 'conditional', warnThreshold: 100, noncompeteAllowed: true, notes: 'Federal WARN only. PTO payout depends on employer policy.' },
  { code: 'IA', name: 'Iowa', unemploymentUrl: 'https://workforce.iowa.gov', ptoPayoutRequired: 'conditional', warnThreshold: 25, noncompeteAllowed: true, notes: 'Iowa WARN at 25+ employees (stricter than federal). PTO depends on policy.' },
  { code: 'KS', name: 'Kansas', unemploymentUrl: 'https://www.getkansasbenefits.gov', ptoPayoutRequired: 'no', warnThreshold: 100, noncompeteAllowed: true, notes: 'Federal WARN only.' },
  { code: 'KY', name: 'Kentucky', unemploymentUrl: 'https://kewes.ky.gov', ptoPayoutRequired: 'conditional', warnThreshold: 100, noncompeteAllowed: true, notes: 'Federal WARN. Check employer policy for PTO.' },
  { code: 'LA', name: 'Louisiana', unemploymentUrl: 'https://www.louisianaworks.net', ptoPayoutRequired: 'yes', warnThreshold: 100, noncompeteAllowed: true, notes: 'PTO must be paid out — treated as earned wages under Louisiana law.' },
  { code: 'ME', name: 'Maine', unemploymentUrl: 'https://www.maine.gov/unemployment', ptoPayoutRequired: 'yes', warnThreshold: 100, noncompeteAllowed: true, notes: 'PTO payout required for employers with 11+ employees (as of 2023). Maine Severance Pay Law applies to plants with 100+ employees shutting down.' },
  { code: 'MD', name: 'Maryland', unemploymentUrl: 'https://www.dllr.state.md.us/employment', ptoPayoutRequired: 'conditional', warnThreshold: 50, noncompeteAllowed: true, notes: 'Voluntary Maryland Economic Stabilization Act recommends 90-day notice. Non-competes banned for employees earning <$15/hour.' },
  { code: 'MA', name: 'Massachusetts', unemploymentUrl: 'https://www.mass.gov/dua', ptoPayoutRequired: 'yes', warnThreshold: 100, noncompeteAllowed: true, notes: 'Vacation time is wages — must be paid out at termination. Non-competes require "garden leave" payment of 50% salary under 2018 law.' },
  { code: 'MI', name: 'Michigan', unemploymentUrl: 'https://www.michigan.gov/uia', ptoPayoutRequired: 'conditional', warnThreshold: 100, noncompeteAllowed: true, notes: 'Federal WARN only. PTO depends on employer policy.' },
  { code: 'MN', name: 'Minnesota', unemploymentUrl: 'https://www.uimn.org', ptoPayoutRequired: 'conditional', warnThreshold: 100, noncompeteAllowed: false, notes: 'Minnesota banned non-competes for agreements signed after July 1, 2023. Federal WARN applies.' },
  { code: 'MS', name: 'Mississippi', unemploymentUrl: 'https://mdes.ms.gov', ptoPayoutRequired: 'no', warnThreshold: 100, noncompeteAllowed: true, notes: 'Federal WARN only.' },
  { code: 'MO', name: 'Missouri', unemploymentUrl: 'https://uinteract.labor.mo.gov', ptoPayoutRequired: 'no', warnThreshold: 100, noncompeteAllowed: true, notes: 'Federal WARN only.' },
  { code: 'MT', name: 'Montana', unemploymentUrl: 'https://montanaworks.gov', ptoPayoutRequired: 'yes', warnThreshold: 100, noncompeteAllowed: true, notes: 'PTO must be paid out. Montana is the only state that is not at-will — Wrongful Discharge from Employment Act provides baseline protections.' },
  { code: 'NE', name: 'Nebraska', unemploymentUrl: 'https://dol.nebraska.gov', ptoPayoutRequired: 'yes', warnThreshold: 100, noncompeteAllowed: true, notes: 'PTO payout required. Federal WARN applies.' },
  { code: 'NV', name: 'Nevada', unemploymentUrl: 'https://ui.nv.gov', ptoPayoutRequired: 'no', warnThreshold: 50, noncompeteAllowed: true, notes: 'No state income tax. Nevada mini-WARN at 50 employees. Non-competes restricted for hourly workers.' },
  { code: 'NH', name: 'New Hampshire', unemploymentUrl: 'https://www.nhes.nh.gov', ptoPayoutRequired: 'conditional', warnThreshold: 100, noncompeteAllowed: true, notes: 'No state income tax. Federal WARN only.' },
  { code: 'NJ', name: 'New Jersey', unemploymentUrl: 'https://myunemployment.nj.gov', ptoPayoutRequired: 'conditional', warnThreshold: 50, noncompeteAllowed: true, notes: 'NJ WARN (Millville Dallas Airmotive Plant Job Loss Notification Act) requires 90-day notice + mandatory severance (1 week per year) at 50+ employees. Among the most worker-friendly laws in the US.' },
  { code: 'NM', name: 'New Mexico', unemploymentUrl: 'https://www.dws.state.nm.us', ptoPayoutRequired: 'conditional', warnThreshold: 100, noncompeteAllowed: true, notes: 'Federal WARN only.' },
  { code: 'NY', name: 'New York', unemploymentUrl: 'https://labor.ny.gov', ptoPayoutRequired: 'conditional', warnThreshold: 50, noncompeteAllowed: true, notes: 'NY WARN requires 90-day notice at 50+ employees (vs federal 60). PTO payout depends on employer policy. NY is actively debating non-compete bans.' },
  { code: 'NC', name: 'North Carolina', unemploymentUrl: 'https://des.nc.gov', ptoPayoutRequired: 'conditional', warnThreshold: 100, noncompeteAllowed: true, notes: 'Federal WARN only.' },
  { code: 'ND', name: 'North Dakota', unemploymentUrl: 'https://www.jobsnd.com', ptoPayoutRequired: 'conditional', warnThreshold: 100, noncompeteAllowed: false, notes: 'North Dakota has long banned non-competes (N.D.C.C. §9-08-06).' },
  { code: 'OH', name: 'Ohio', unemploymentUrl: 'https://unemployment.ohio.gov', ptoPayoutRequired: 'conditional', warnThreshold: 100, noncompeteAllowed: true, notes: 'Federal WARN only.' },
  { code: 'OK', name: 'Oklahoma', unemploymentUrl: 'https://oklahoma.gov/oesc', ptoPayoutRequired: 'conditional', warnThreshold: 100, noncompeteAllowed: true, notes: 'Federal WARN only. Non-competes restricted — cannot prevent future employment, only direct solicitation.' },
  { code: 'OR', name: 'Oregon', unemploymentUrl: 'https://unemployment.oregon.gov', ptoPayoutRequired: 'conditional', warnThreshold: 100, noncompeteAllowed: true, notes: 'Federal WARN. Non-competes restricted — limited to 12 months, minimum salary threshold, and written notice required.' },
  { code: 'PA', name: 'Pennsylvania', unemploymentUrl: 'https://www.uc.pa.gov', ptoPayoutRequired: 'no', warnThreshold: 100, noncompeteAllowed: true, notes: 'Federal WARN baseline. PTO payout depends on policy.' },
  { code: 'RI', name: 'Rhode Island', unemploymentUrl: 'https://dlt.ri.gov', ptoPayoutRequired: 'yes', warnThreshold: 100, noncompeteAllowed: true, notes: 'Vacation must be paid out for employers with 1+ year employees. Federal WARN applies.' },
  { code: 'SC', name: 'South Carolina', unemploymentUrl: 'https://dew.sc.gov', ptoPayoutRequired: 'no', warnThreshold: 100, noncompeteAllowed: true, notes: 'Federal WARN only.' },
  { code: 'SD', name: 'South Dakota', unemploymentUrl: 'https://dlr.sd.gov', ptoPayoutRequired: 'no', warnThreshold: 100, noncompeteAllowed: true, notes: 'No state income tax. Federal WARN only.' },
  { code: 'TN', name: 'Tennessee', unemploymentUrl: 'https://www.tn.gov/workforce', ptoPayoutRequired: 'no', warnThreshold: 50, noncompeteAllowed: true, notes: 'No state income tax. Tennessee mini-WARN at 50 employees (30-day notice).' },
  { code: 'TX', name: 'Texas', unemploymentUrl: 'https://twc.texas.gov', ptoPayoutRequired: 'no', warnThreshold: 100, noncompeteAllowed: true, notes: 'No state income tax. Federal WARN Act applies (100+ employees). Non-competes enforceable if reasonable in time, geography, and scope.' },
  { code: 'UT', name: 'Utah', unemploymentUrl: 'https://jobs.utah.gov/ui', ptoPayoutRequired: 'conditional', warnThreshold: 100, noncompeteAllowed: true, notes: 'Utah Post-Employment Restrictions Act limits non-competes to 1 year post-employment.' },
  { code: 'VT', name: 'Vermont', unemploymentUrl: 'https://labor.vermont.gov', ptoPayoutRequired: 'conditional', warnThreshold: 100, noncompeteAllowed: true, notes: 'Federal WARN only. Vermont is considering banning most non-competes.' },
  { code: 'VA', name: 'Virginia', unemploymentUrl: 'https://www.vec.virginia.gov', ptoPayoutRequired: 'conditional', warnThreshold: 100, noncompeteAllowed: true, notes: 'Non-competes banned for low-wage earners (<$73K as of 2024). Federal WARN applies.' },
  { code: 'WA', name: 'Washington', unemploymentUrl: 'https://esd.wa.gov', ptoPayoutRequired: 'no', warnThreshold: 100, noncompeteAllowed: true, notes: 'No state income tax. Non-competes restricted by salary threshold (~$120K for employees, ~$300K for contractors).' },
  { code: 'WV', name: 'West Virginia', unemploymentUrl: 'https://workforcewv.org', ptoPayoutRequired: 'conditional', warnThreshold: 100, noncompeteAllowed: true, notes: 'Federal WARN only.' },
  { code: 'WI', name: 'Wisconsin', unemploymentUrl: 'https://dwd.wisconsin.gov/ui', ptoPayoutRequired: 'conditional', warnThreshold: 50, noncompeteAllowed: true, notes: 'Wisconsin mini-WARN at 50 employees (60-day notice). PTO depends on policy.' },
  { code: 'WY', name: 'Wyoming', unemploymentUrl: 'https://www.wyomingworkforce.org', ptoPayoutRequired: 'no', warnThreshold: 100, noncompeteAllowed: true, notes: 'No state income tax. Federal WARN only.' },
];
