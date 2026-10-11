// ───────────────────────────────────────────────────────────────────────────
// THE SPINE: one Job ID, one job, read by every screen.
// No screen hardcodes a number — everything comes from here, so the Job ID,
// the amounts, the dates and the hold points read the same everywhere.
// ───────────────────────────────────────────────────────────────────────────

export type Verdict = "waterproofing" | "plumbing" | "structural";

export interface QuoteLine {
  label: string;
  detail: string;
  qty: string;
  amount: number;
}

export interface HoldPoint {
  number: 1 | 2 | 3 | 4;
  step: string;
  label: string;
  passed: boolean;
  signedBy?: string;
  at?: string;
}

export const JOB = {
  id: "SCA-000127",

  // ── Customer and site ───────────────────────────────────────────────────
  customer: {
    name: "Ananya Rao",
    first: "Ananya",
    phone: "+91 98XXX 41207",
  },
  address: {
    line1: "Flat 2, Shreeniwas, Lane 6",
    locality: "Kothrud",
    city: "Pune",
    pin: "411038",
    short: "Kothrud, Pune",
  },
  site: {
    surface: "Terrace",
    area: 280,
    property: "Independent house, 2 floors",
    age: "11 years old",
    lastTreated: "Never treated",
  },
  symptom: "Damp patch on the ceiling below, appears after rain",

  // ── Money ───────────────────────────────────────────────────────────────
  inspectionFee: 500,
  quoteTotal: 30000,
  quoteDurationDays: 3,
  quoteValidTill: "21 Jul 2027",
  quoteLines: [
    {
      label: "Surface preparation",
      detail: "Clean, grind and open up the cracks",
      qty: "280 sq ft",
      amount: 5600,
    },
    {
      label: "Crack repair",
      detail: "Polymer sealant at the parapet joint",
      qty: "18 running ft",
      amount: 2400,
    },
    {
      label: "Roof tape at the parapet joint",
      detail: "Reinforced tape over the treated joint",
      qty: "18 running ft",
      amount: 4000,
    },
    {
      label: "SmartCare Damp Proof, two coats",
      detail: "Elastomeric coating, 1.2 mm dry film",
      qty: "280 sq ft",
      amount: 11000,
    },
    {
      label: "Certified execution and supervision",
      detail: "T2 applicator team and site supervisor",
      qty: "3 days",
      amount: 7000,
    },
  ] as QuoteLine[],

  // What the customer pays, when
  milestones: [
    { label: "On booking", pct: 20, amount: 6000, due: "Today", paid: true },
    {
      label: "After surface prep is approved",
      pct: 40,
      amount: 12000,
      due: "Day 1",
      paid: true,
    },
    {
      label: "After the water test passes",
      pct: 40,
      amount: 12000,
      due: "Day 3",
      paid: false,
    },
  ],

  // ── People ──────────────────────────────────────────────────────────────
  technician: {
    name: "Imran Shaikh",
    tier: "T3 Diagnostic Technician",
    certificate: "WA-T3-0412",
    photo: "tech-portrait.jpg",
    jobs: 412,
    rating: 4.9,
    years: 7,
  },
  partner: {
    name: "Sai Waterproofing Works",
    id: "AP-2291",
    tier: "T2 Certified Applicator",
    lead: "Ravi Pawar",
    jobs: 188,
    rating: 4.8,
  },
  adviser: {
    name: "Kavya Nair",
    role: "Service adviser",
    photo: "adviser-portrait.jpg",
  },
  supervisor: { name: "Deepak Joshi", role: "Site supervisor" },

  // ── Diagnosis ───────────────────────────────────────────────────────────
  verdict: "waterproofing" as Verdict,
  verdictHeadline: "Water is getting in through the terrace",
  verdictPlain:
    "Rain is entering through cracks at the parapet joint on your terrace and travelling down into the ceiling below.",

  // Readings, laid out as the terrace grid the technician walked
  readings: [
    { id: 1, pct: 12, high: false },
    { id: 2, pct: 71, high: true },
    { id: 3, pct: 16, high: false },
    { id: 4, pct: 14, high: false },
    { id: 5, pct: 68, high: true },
    { id: 6, pct: 19, high: false },
    { id: 7, pct: 74, high: true },
    { id: 8, pct: 15, high: false },
  ],
  readingNormal: "Under 20% is normal",

  findings: [
    {
      title: "Cracks up to 2 mm at the parapet joint",
      note: "Three spots along the north parapet. This is where water enters.",
      photo: "evidence-parapet.jpg",
      flag: "cause" as const,
    },
    {
      title: "Slope towards the drain is adequate",
      note: "Water runs off correctly. The slope is not the problem.",
      photo: "evidence-slope.jpg",
      flag: "ok" as const,
    },
    {
      title: "No plumbing line runs under the patch",
      note: "Checked the slab below. The damp is not coming from a pipe.",
      photo: "evidence-ceiling.jpg",
      flag: "ok" as const,
    },
  ],

  // What was ruled out, and why — the honest-verdict story, on one screen
  ruledOut: [
    {
      cause: "A plumbing leak",
      why: "No pipe runs above or near the patch, and the damp dries out between rains.",
    },
    {
      cause: "Structural movement",
      why: "No cracks run through the slab, and the parapet is plumb.",
    },
    {
      cause: "Rising damp from below",
      why: "The patch is on the top-floor ceiling, two floors above ground.",
    },
  ],

  recommendedSystem: [
    {
      step: "Fill the cracks",
      why: "Closes the path water is using today",
    },
    {
      step: "Tape the parapet joint",
      why: "The joint moves with heat, so it needs a flexible bridge",
    },
    {
      step: "Two coats of SmartCare Damp Proof",
      why: "Seals the whole terrace, not just the cracks",
    },
  ],

  // ── Material ────────────────────────────────────────────────────────────
  material: {
    product: "SmartCare Damp Proof",
    batch: "DP-0727-18",
    photo: "product-dampproof.jpg",
    packs: "4 × 20 kg",
    coverage: "1.2 mm dry film, two coats",
    delivered: "21 Jul 2027, 08:40",
  },

  // ── The ten steps ───────────────────────────────────────────────────────
  steps: [
    { name: "Request raised", done: true, on: "14 Jul" },
    { name: "Photo check", done: true, on: "14 Jul" },
    { name: "Site inspection", done: true, on: "16 Jul" },
    { name: "Verdict and plan", done: true, on: "16 Jul" },
    { name: "Quote approved", done: true, on: "18 Jul" },
    { name: "Material delivered", done: true, on: "21 Jul" },
    { name: "Work in progress", done: false, on: "21–23 Jul", active: true },
    { name: "Water test", done: false, on: "23 Jul" },
    { name: "Warranty issued", done: false, on: "23 Jul" },
    { name: "Yearly check-up", done: false, on: "Jul 2028" },
  ],

  holdPoints: [
    {
      number: 1,
      step: "Verdict and plan",
      label: "Diagnosis signed by a certified technician",
      passed: true,
      signedBy: "Imran Shaikh",
      at: "16 Jul, 11:42",
    },
    {
      number: 2,
      step: "Quote approved",
      label: "You approve the scope and what is not covered",
      passed: true,
      signedBy: "Ananya Rao",
      at: "18 Jul, 19:08",
    },
    {
      number: 3,
      step: "Work in progress",
      label: "Surface prep approved before any coating goes on",
      passed: true,
      signedBy: "Deepak Joshi",
      at: "21 Jul, 16:30",
    },
    {
      number: 4,
      step: "Water test",
      label: "Supervisor signs off after the water test",
      passed: false,
    },
  ] as HoldPoint[],

  // ── Progress report ─────────────────────────────────────────────────────
  progress: {
    day: 2,
    pct: 68,
    weather: "Light rain expected after 4 pm",
    todayPlan: [
      { task: "Roof tape along the north parapet", done: true, at: "10:20" },
      { task: "First coat, full terrace", done: true, at: "14:05" },
      { task: "Second coat, full terrace", done: false, at: "Tomorrow, 09:00" },
    ],
    photos: [
      {
        name: "progress-prep.jpg",
        caption: "Surface prepared",
        time: "Day 1, 09:12",
      },
      {
        name: "progress-crackfill.jpg",
        caption: "Cracks filled",
        time: "Day 1, 11:40",
      },
      {
        name: "progress-tape.jpg",
        caption: "Parapet taped",
        time: "Day 2, 10:20",
      },
      {
        name: "progress-coat1.jpg",
        caption: "First coat on",
        time: "Day 2, 14:05",
      },
    ],
    recheck: { before: 71, after: 34, at: "Day 2, 15:50" },
  },

  // ── Verification and warranty ───────────────────────────────────────────
  waterTest: {
    passed: true,
    date: "23 Jul 2027",
    detail: "Terrace ponded for 24 hours. Ceiling below stayed dry.",
    photo: "progress-watertest.jpg",
  },
  warranty: {
    tenorYears: 5,
    from: "23 Jul 2027",
    to: "23 Jul 2032",
    yearsLeft: 4,
    monthsLeft: 9,
    covers:
      "Water coming through the treated area, where the cause is our product, our workmanship or our diagnosis.",
    remedy: "We re-inspect and redo the work. Material and labour included.",
    cap: "Cover is capped at the job value.",
  },
  notCovered: [
    { item: "Plumbing and drainage leaks", note: "A different trade fixes these" },
    { item: "Structural movement", note: "Needs a structural engineer first" },
    { item: "Damage you or a third party cause", note: "Drilling, digging, new fittings" },
    { item: "Blocked drains", note: "Keep the outlets clear" },
  ],
  claims: {
    window: "Raise a claim within 30 days of noticing a leak",
    steps: [
      { label: "We acknowledge", days: "1 day" },
      { label: "We re-inspect", days: "3 days" },
      { label: "Verdict on the cause", days: "7 days" },
      { label: "Rework finished", days: "15 days" },
    ],
  },

  dates: {
    raised: "14 Jul 2027",
    inspection: "16 Jul 2027",
    inspectionTime: "11:42",
    approved: "18 Jul 2027",
    workStart: "21 Jul 2027",
    handover: "23 Jul 2027",
    nextCheck: "Jul 2028",
  },

  // ── Locality colour, Blinkit-style ──────────────────────────────────────
  locality: {
    teamsNearby: 12,
    jobsDone: 1248,
    rating: 4.8,
    ratingCount: 963,
    nextSlot: "Today, 4–6 pm",
    monsoonDaysLeft: 38,
    neighbours: [
      {
        name: "Rohit K.",
        where: "Kothrud",
        when: "2 weeks ago",
        stars: 5,
        text: "They told us our bathroom leak was a plumbing issue and charged nothing for the visit. Did not try to sell us a coating.",
      },
      {
        name: "Sunita M.",
        where: "Karve Nagar",
        when: "1 month ago",
        stars: 5,
        text: "Terrace done before the rains. The photo updates every evening were the best part.",
      },
      {
        name: "Imtiaz S.",
        where: "Erandwane",
        when: "6 weeks ago",
        stars: 4,
        text: "Work was clean and the water test gave us confidence. Took a day longer than promised.",
      },
    ],
  },
} as const;

export function rupees(n: number): string {
  return "₹" + n.toLocaleString("en-IN");
}
