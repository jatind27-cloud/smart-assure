// ───────────────────────────────────────────────────────────────────────────
// Mock operating data for the internal command centre.
// Hand-set numbers that hang together: the funnel adds up, the gates match the
// tables, and the three cities sit at three different stages of the rollout.
// Every screen that shows these marks them "Illustrative data".
// ───────────────────────────────────────────────────────────────────────────

export type CityId = "pune" | "nagpur" | "nashik";

export interface Gate {
  title: string;
  metric: string;
  value: number;
  unit: string;
  target: string;
  pass: boolean;
  note: string;
}

export interface City {
  id: CityId;
  name: string;
  stage: string;
  live: string;
  gates: Gate[];
  funnel: { label: string; count: number }[];
  jobsDone: number;
  breakeven: number;
  revenue: number;
  contribution: number;
  trend: number[];
  alerts: { level: "stop" | "warn" | "info"; text: string; when: string }[];
}

export const CITIES: City[] = [
  {
    id: "pune",
    name: "Pune",
    stage: "Pilot",
    live: "Live since Mar 2027",
    jobsDone: 103,
    breakeven: 135,
    revenue: 3180000,
    contribution: 412000,
    trend: [4, 6, 5, 9, 11, 14, 13, 18, 21, 24, 27, 31],
    gates: [
      {
        title: "Demand",
        metric: "Inspections that become jobs",
        value: 34,
        unit: "%",
        target: "Above 30%",
        pass: true,
        note: "190 inspections, 64 became jobs",
      },
      {
        title: "Quality",
        metric: "Jobs right the first time",
        value: 92,
        unit: "%",
        target: "Above 90%",
        pass: true,
        note: "8 of 103 needed a return visit",
      },
      {
        title: "Economics",
        metric: "Warranty and rework cost",
        value: 6,
        unit: "%",
        target: "Below 8% of revenue",
        pass: true,
        note: "₹1.9L against ₹31.8L revenue",
      },
      {
        title: "Capacity",
        metric: "Partner capacity used",
        value: 88,
        unit: "%",
        target: "Below 90%",
        pass: true,
        note: "12 active teams, 2 more certifying",
      },
    ],
    funnel: [
      { label: "Requests", count: 420 },
      { label: "Photo check", count: 365 },
      { label: "Inspections", count: 190 },
      { label: "Quotes", count: 150 },
      { label: "Jobs started", count: 118 },
      { label: "Water test passed", count: 110 },
      { label: "Warranty issued", count: 108 },
    ],
    alerts: [
      {
        level: "stop",
        text: "SCA-000311 water test failed twice. Rework approved, cause under review.",
        when: "2 h ago",
      },
      {
        level: "warn",
        text: "Hold point 3 pending over 24 h on 3 jobs at Sai Waterproofing Works.",
        when: "5 h ago",
      },
      {
        level: "warn",
        text: "Kothrud has 18 open requests and 2 free teams this week.",
        when: "Today",
      },
      {
        level: "info",
        text: "Two T2 applicators finished certification. Capacity up from Monday.",
        when: "Yesterday",
      },
    ],
  },
  {
    id: "nagpur",
    name: "Nagpur",
    stage: "Wave 2",
    live: "Live since Aug 2027",
    jobsDone: 41,
    breakeven: 120,
    revenue: 1190000,
    contribution: -84000,
    trend: [0, 0, 1, 3, 4, 6, 7, 9, 11, 12, 14, 16],
    gates: [
      {
        title: "Demand",
        metric: "Inspections that become jobs",
        value: 27,
        unit: "%",
        target: "Above 30%",
        pass: false,
        note: "81 inspections, 22 became jobs",
      },
      {
        title: "Quality",
        metric: "Jobs right the first time",
        value: 90,
        unit: "%",
        target: "Above 90%",
        pass: true,
        note: "4 of 41 needed a return visit",
      },
      {
        title: "Economics",
        metric: "Warranty and rework cost",
        value: 9,
        unit: "%",
        target: "Below 8% of revenue",
        pass: false,
        note: "₹1.1L against ₹11.9L revenue",
      },
      {
        title: "Capacity",
        metric: "Partner capacity used",
        value: 61,
        unit: "%",
        target: "Below 90%",
        pass: true,
        note: "5 active teams",
      },
    ],
    funnel: [
      { label: "Requests", count: 196 },
      { label: "Photo check", count: 164 },
      { label: "Inspections", count: 81 },
      { label: "Quotes", count: 58 },
      { label: "Jobs started", count: 44 },
      { label: "Water test passed", count: 41 },
      { label: "Warranty issued", count: 41 },
    ],
    alerts: [
      {
        level: "stop",
        text: "Economics gate failed. Rework cost at 9%. Hold further partner onboarding.",
        when: "Today",
      },
      {
        level: "warn",
        text: "Demand gate below target for the second month. Review pricing and leads.",
        when: "Today",
      },
      {
        level: "info",
        text: "Two partners moved from T1 to T2 after assessment.",
        when: "3 days ago",
      },
    ],
  },
  {
    id: "nashik",
    name: "Nashik",
    stage: "Wave 2",
    live: "Live since Sep 2027",
    jobsDone: 22,
    breakeven: 110,
    revenue: 624000,
    contribution: -131000,
    trend: [0, 0, 0, 0, 2, 3, 4, 5, 7, 8, 9, 11],
    gates: [
      {
        title: "Demand",
        metric: "Inspections that become jobs",
        value: 31,
        unit: "%",
        target: "Above 30%",
        pass: true,
        note: "45 inspections, 14 became jobs",
      },
      {
        title: "Quality",
        metric: "Jobs right the first time",
        value: 86,
        unit: "%",
        target: "Above 90%",
        pass: false,
        note: "3 of 22 needed a return visit",
      },
      {
        title: "Economics",
        metric: "Warranty and rework cost",
        value: 11,
        unit: "%",
        target: "Below 8% of revenue",
        pass: false,
        note: "₹69k against ₹6.2L revenue",
      },
      {
        title: "Capacity",
        metric: "Partner capacity used",
        value: 44,
        unit: "%",
        target: "Below 90%",
        pass: true,
        note: "3 active teams",
      },
    ],
    funnel: [
      { label: "Requests", count: 112 },
      { label: "Photo check", count: 94 },
      { label: "Inspections", count: 45 },
      { label: "Quotes", count: 31 },
      { label: "Jobs started", count: 24 },
      { label: "Water test passed", count: 22 },
      { label: "Warranty issued", count: 22 },
    ],
    alerts: [
      {
        level: "stop",
        text: "Quality gate failed at 86%. New partners need supervised jobs.",
        when: "Today",
      },
      {
        level: "warn",
        text: "One partner has two sent-back hold points this week.",
        when: "Yesterday",
      },
    ],
  },
];

// ── Routing queue ─────────────────────────────────────────────────────────
export interface RouteRow {
  id: string;
  city: CityId;
  locality: string;
  surface: string;
  symptom: string;
  route: "Inspect" | "Plumber" | "Structural" | "Self-serve";
  confidence: number;
  partner: string;
  sla: string;
  slaLate: boolean;
}

export const ROUTING: RouteRow[] = [
  { id: "SCA-000418", city: "pune", locality: "Kothrud", surface: "Terrace", symptom: "Ceiling patch after rain", route: "Inspect", confidence: 94, partner: "Sai Waterproofing", sla: "4 h left", slaLate: false },
  { id: "SCA-000417", city: "pune", locality: "Baner", surface: "Bathroom wall", symptom: "Damp outside bathroom", route: "Plumber", confidence: 88, partner: "Routed out", sla: "Done", slaLate: false },
  { id: "SCA-000416", city: "pune", locality: "Wakad", surface: "External wall", symptom: "Peeling paint, white powder", route: "Inspect", confidence: 79, partner: "Omkar Coatings", sla: "7 h left", slaLate: false },
  { id: "SCA-000415", city: "pune", locality: "Hadapsar", surface: "Basement", symptom: "Standing water in corner", route: "Structural", confidence: 72, partner: "Expert team", sla: "1 d left", slaLate: false },
  { id: "SCA-000414", city: "pune", locality: "Karve Nagar", surface: "Terrace", symptom: "Cracks, no leak yet", route: "Self-serve", confidence: 91, partner: "Product only", sla: "Done", slaLate: false },
  { id: "SCA-000413", city: "pune", locality: "Aundh", surface: "Balcony", symptom: "Water pooling", route: "Inspect", confidence: 85, partner: "Sai Waterproofing", sla: "2 h late", slaLate: true },
  { id: "SCA-000412", city: "pune", locality: "Kondhwa", surface: "Terrace", symptom: "Leak over bedroom", route: "Inspect", confidence: 96, partner: "Pune Seal Co", sla: "9 h left", slaLate: false },
  { id: "SCA-000411", city: "pune", locality: "Viman Nagar", surface: "Roof slab", symptom: "Drip during rain", route: "Inspect", confidence: 83, partner: "Unassigned", sla: "5 h left", slaLate: false },
  { id: "SCA-000409", city: "nagpur", locality: "Dharampeth", surface: "Terrace", symptom: "Patch spreading", route: "Inspect", confidence: 90, partner: "Vidarbha Proof", sla: "6 h left", slaLate: false },
  { id: "SCA-000408", city: "nagpur", locality: "Sadar", surface: "External wall", symptom: "Seepage at window", route: "Inspect", confidence: 76, partner: "Unassigned", sla: "3 h late", slaLate: true },
  { id: "SCA-000407", city: "nagpur", locality: "Manish Nagar", surface: "Bathroom", symptom: "Tiles loose, damp", route: "Plumber", confidence: 81, partner: "Routed out", sla: "Done", slaLate: false },
  { id: "SCA-000404", city: "nashik", locality: "College Road", surface: "Terrace", symptom: "Old coating peeling", route: "Inspect", confidence: 87, partner: "Godavari Works", sla: "8 h left", slaLate: false },
  { id: "SCA-000403", city: "nashik", locality: "Gangapur", surface: "Parapet", symptom: "Crack after summer", route: "Inspect", confidence: 74, partner: "Unassigned", sla: "1 d left", slaLate: false },
  { id: "SCA-000402", city: "nashik", locality: "Indira Nagar", surface: "Basement", symptom: "Wall damp year round", route: "Structural", confidence: 69, partner: "Expert team", sla: "2 d left", slaLate: false },
];

// ── Hold points ───────────────────────────────────────────────────────────
export interface HoldRow {
  job: string;
  city: CityId;
  hp: 1 | 2 | 3 | 4;
  step: string;
  partner: string;
  state: "Passed" | "Pending" | "Sent back";
  age: string;
}

export const HOLDS: HoldRow[] = [
  { job: "SCA-000127", city: "pune", hp: 4, step: "Water test", partner: "Sai Waterproofing", state: "Pending", age: "3 h" },
  { job: "SCA-000392", city: "pune", hp: 3, step: "Surface prep", partner: "Sai Waterproofing", state: "Pending", age: "27 h" },
  { job: "SCA-000388", city: "pune", hp: 3, step: "Surface prep", partner: "Omkar Coatings", state: "Sent back", age: "31 h" },
  { job: "SCA-000386", city: "pune", hp: 1, step: "Diagnosis", partner: "Pune Seal Co", state: "Passed", age: "2 d" },
  { job: "SCA-000381", city: "pune", hp: 4, step: "Water test", partner: "Pune Seal Co", state: "Passed", age: "2 d" },
  { job: "SCA-000377", city: "pune", hp: 2, step: "Quote approval", partner: "Customer", state: "Pending", age: "14 h" },
  { job: "SCA-000374", city: "pune", hp: 3, step: "Surface prep", partner: "Sai Waterproofing", state: "Pending", age: "26 h" },
  { job: "SCA-000361", city: "nagpur", hp: 4, step: "Water test", partner: "Vidarbha Proof", state: "Sent back", age: "19 h" },
  { job: "SCA-000359", city: "nagpur", hp: 1, step: "Diagnosis", partner: "Vidarbha Proof", state: "Passed", age: "3 d" },
  { job: "SCA-000357", city: "nagpur", hp: 3, step: "Surface prep", partner: "Nag Shield", state: "Pending", age: "8 h" },
  { job: "SCA-000342", city: "nashik", hp: 3, step: "Surface prep", partner: "Godavari Works", state: "Sent back", age: "22 h" },
  { job: "SCA-000339", city: "nashik", hp: 4, step: "Water test", partner: "Godavari Works", state: "Sent back", age: "2 d" },
];

// ── Review queue: where a human overrules the machine ─────────────────────
export interface ReviewRow {
  job: string;
  city: CityId;
  aiSaid: string;
  techSaid: string;
  confidence: number;
  flag: string;
}

export const REVIEWS: ReviewRow[] = [
  { job: "SCA-000415", city: "pune", aiSaid: "Waterproofing, basement", techSaid: "Structural movement", confidence: 72, flag: "Technician disagreed with the routing" },
  { job: "SCA-000411", city: "pune", aiSaid: "Waterproofing, roof slab", techSaid: "Plumbing leak", confidence: 83, flag: "Technician disagreed with the routing" },
  { job: "SCA-000398", city: "pune", aiSaid: "Waterproofing, terrace", techSaid: "Waterproofing, terrace", confidence: 51, flag: "Low confidence, photos unclear" },
  { job: "SCA-000393", city: "pune", aiSaid: "Self-serve, product only", techSaid: "Needs inspection", confidence: 64, flag: "Customer asked for a second opinion" },
  { job: "SCA-000408", city: "nagpur", aiSaid: "Waterproofing, external wall", techSaid: "Plumbing leak", confidence: 76, flag: "Third disagreement for this partner this month" },
  { job: "SCA-000403", city: "nashik", aiSaid: "Waterproofing, parapet", techSaid: "Waterproofing, parapet", confidence: 58, flag: "Low confidence, single photo" },
];

// ── Claims ────────────────────────────────────────────────────────────────
export interface ClaimRow {
  id: string;
  job: string;
  city: CityId;
  raised: string;
  cause: "Our workmanship" | "Our diagnosis" | "Product" | "Not covered" | "Under review";
  status: "Reworked" | "Re-inspecting" | "Declined" | "Acknowledged";
  cost: number;
  days: number;
}

export const CLAIMS: ClaimRow[] = [
  { id: "CLM-0042", job: "SCA-000311", city: "pune", raised: "9 Oct", cause: "Under review", status: "Re-inspecting", cost: 0, days: 2 },
  { id: "CLM-0041", job: "SCA-000288", city: "pune", raised: "28 Sep", cause: "Our workmanship", status: "Reworked", cost: 18400, days: 13 },
  { id: "CLM-0040", job: "SCA-000274", city: "pune", raised: "21 Sep", cause: "Not covered", status: "Declined", cost: 0, days: 6 },
  { id: "CLM-0039", job: "SCA-000259", city: "pune", raised: "12 Sep", cause: "Our diagnosis", status: "Reworked", cost: 31000, days: 15 },
  { id: "CLM-0038", job: "SCA-000241", city: "nagpur", raised: "6 Sep", cause: "Our workmanship", status: "Reworked", cost: 22600, days: 12 },
  { id: "CLM-0037", job: "SCA-000233", city: "nagpur", raised: "2 Sep", cause: "Product", status: "Reworked", cost: 14800, days: 11 },
  { id: "CLM-0036", job: "SCA-000219", city: "nashik", raised: "25 Aug", cause: "Our workmanship", status: "Reworked", cost: 26500, days: 14 },
  { id: "CLM-0035", job: "SCA-000204", city: "nashik", raised: "18 Aug", cause: "Not covered", status: "Declined", cost: 0, days: 4 },
];

// ── Partners ──────────────────────────────────────────────────────────────
export interface PartnerRow {
  name: string;
  id: string;
  city: CityId;
  tier: "T1" | "T2" | "T3";
  ftr: number;
  jobs: number;
  rating: number;
  used: number;
  certTill: string;
  state: "Active" | "Watch" | "Suspended";
}

export const PARTNERS: PartnerRow[] = [
  { name: "Sai Waterproofing Works", id: "AP-2291", city: "pune", tier: "T2", ftr: 94, jobs: 188, rating: 4.8, used: 92, certTill: "Mar 2028", state: "Active" },
  { name: "Pune Seal Co", id: "AP-2104", city: "pune", tier: "T3", ftr: 96, jobs: 241, rating: 4.9, used: 86, certTill: "Jan 2029", state: "Active" },
  { name: "Omkar Coatings", id: "AP-2388", city: "pune", tier: "T2", ftr: 88, jobs: 96, rating: 4.5, used: 74, certTill: "Nov 2027", state: "Watch" },
  { name: "Shivneri Applicators", id: "AP-2417", city: "pune", tier: "T1", ftr: 85, jobs: 38, rating: 4.3, used: 61, certTill: "Aug 2028", state: "Watch" },
  { name: "Deccan Drywall", id: "AP-2455", city: "pune", tier: "T1", ftr: 91, jobs: 27, rating: 4.6, used: 48, certTill: "Sep 2028", state: "Active" },
  { name: "Mula Mutha Services", id: "AP-2461", city: "pune", tier: "T2", ftr: 93, jobs: 64, rating: 4.7, used: 80, certTill: "Feb 2029", state: "Active" },
  { name: "Vidarbha Proof", id: "AP-3012", city: "nagpur", tier: "T2", ftr: 89, jobs: 74, rating: 4.4, used: 70, certTill: "Dec 2027", state: "Watch" },
  { name: "Nag Shield", id: "AP-3044", city: "nagpur", tier: "T1", ftr: 92, jobs: 31, rating: 4.6, used: 55, certTill: "Jun 2028", state: "Active" },
  { name: "Orange City Coat", id: "AP-3061", city: "nagpur", tier: "T1", ftr: 79, jobs: 18, rating: 3.9, used: 40, certTill: "Jul 2028", state: "Suspended" },
  { name: "Godavari Works", id: "AP-4008", city: "nashik", tier: "T1", ftr: 83, jobs: 22, rating: 4.1, used: 52, certTill: "Oct 2028", state: "Watch" },
  { name: "Trimbak Proofing", id: "AP-4019", city: "nashik", tier: "T2", ftr: 94, jobs: 16, rating: 4.8, used: 38, certTill: "Apr 2029", state: "Active" },
  { name: "Panchavati Seal", id: "AP-4031", city: "nashik", tier: "T1", ftr: 88, jobs: 9, rating: 4.4, used: 30, certTill: "May 2029", state: "Active" },
];

export const TABS = [
  "City overview",
  "Routing",
  "Hold points",
  "Review",
  "Claims",
  "Partners",
] as const;

export type Tab = (typeof TABS)[number];

export function lakh(n: number): string {
  if (Math.abs(n) >= 100000) return "₹" + (n / 100000).toFixed(1) + "L";
  if (Math.abs(n) >= 1000) return "₹" + Math.round(n / 1000) + "k";
  return "₹" + n;
}
