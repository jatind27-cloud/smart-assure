import { JOB } from "@/lib/job";
import { PhoneFrame } from "@/components/PhoneFrame";
import { BottomTabBar } from "@/components/BottomTabBar";
import { SmartImage } from "@/components/SmartImage";
import { TopBar, Card, Section, PrimaryButton, GhostButton, Pill } from "@/components/ui";
import {
  Droplet,
  Check,
  Share2,
  Download,
  ShieldCheck,
  Layers,
  UserCheck,
  Stethoscope,
  Droplets,
  CalendarClock,
  Home,
  ArrowRightLeft,
  FileText,
} from "lucide-react";

// Screen 6 — Water Protection Passport.
// The thing the homeowner keeps. It has to feel like a document worth keeping,
// so it is built as a certificate: sealed cover, before and after, every record
// on the job, and a code anyone can check — including a future buyer.
export default function PassportScreen() {
  const W = JOB.warranty;

  const records = [
    { icon: Stethoscope, k: "Diagnosis", v: "Signed verdict, 8 readings", sub: JOB.dates.inspection },
    { icon: Layers, k: "System used", v: JOB.material.product, sub: `Batch ${JOB.material.batch}` },
    { icon: UserCheck, k: "Who did the work", v: JOB.partner.name, sub: `${JOB.partner.tier} · ${JOB.partner.id}` },
    { icon: Check, k: "Hold points", v: "4 of 4 passed", sub: "Each with photos" },
    { icon: Droplets, k: "Water test", v: "Passed", sub: JOB.waterTest.date },
    { icon: FileText, k: "Photos on record", v: "34 images", sub: "Time-stamped" },
    { icon: CalendarClock, k: "Next check-up", v: JOB.dates.nextCheck, sub: "Free, we call you" },
    { icon: Home, k: "Covered area", v: `${JOB.site.surface}, ${JOB.site.area} sq ft`, sub: JOB.address.locality },
  ];

  return (
    <PhoneFrame>
      <TopBar title="Warranty" subtitle="Your protection record" back="/customer" />

      <div className="space-y-5 px-4 pb-5 pt-4">
        {/* ── The certificate ──────────────────────────────────────────── */}
        <div className="overflow-hidden rounded-sheet border border-border bg-white shadow-lg">
          {/* Cover */}
          <div
            className="relative px-5 pb-5 pt-6 text-white"
            style={{
              background:
                "radial-gradient(120% 90% at 85% 0%, #4B2A8C 0%, #2E1A5E 55%, #1B0F3B 100%)",
            }}
          >
            <Watermark />

            <div className="relative flex items-start justify-between">
              <div>
                <div className="flex items-center gap-1.5">
                  <Droplet size={15} className="text-sun-yellow" fill="#FFD23F" />
                  <span className="text-[11px] text-white/70">
                    SmartCare Assure
                  </span>
                </div>
                <h1 className="mt-2.5 text-[23px] font-extrabold leading-[1.1] tracking-tight">
                  Water Protection
                  <br />
                  Passport
                </h1>
                <div className="mt-2 h-0.5 w-10 rounded bg-sun-yellow" />
                <div className="mt-2.5 text-[11.5px] leading-snug text-white/75">
                  {JOB.address.line1}
                  <br />
                  {JOB.address.locality}, {JOB.address.city} {JOB.address.pin}
                </div>
              </div>
              <Seal years={W.tenorYears} />
            </div>

            {/* Cover facts */}
            <div className="relative mt-4 grid grid-cols-3 gap-2 border-t border-white/15 pt-3">
              {[
                { k: "Job", v: JOB.id },
                { k: "Issued", v: W.from },
                { k: "Valid till", v: W.to },
              ].map((f) => (
                <div key={f.k}>
                  <div className="text-[9.5px] text-white/50">{f.k}</div>
                  <div className="text-[11.5px] font-semibold tabular-nums">
                    {f.v}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Time remaining */}
          <div className="border-b border-border bg-lilac px-4 py-3">
            <div className="flex items-end justify-between">
              <div>
                <div className="text-[10.5px] text-muted">Cover remaining</div>
                <div className="text-[17px] font-extrabold leading-none text-deep-purple">
                  {W.yearsLeft} years {W.monthsLeft} months
                </div>
              </div>
              <Pill tone="green">
                <Check size={11} strokeWidth={3} /> Active
              </Pill>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white">
              <div
                className="h-full rounded-full bg-royal-purple"
                style={{
                  width: `${((W.yearsLeft * 12 + W.monthsLeft) / (W.tenorYears * 12)) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Before and after */}
          <div className="grid grid-cols-2 gap-px border-b-[3px] border-lilac bg-border">
            {[
              { n: "passport-before.jpg", l: "Before", d: JOB.dates.inspection, tone: "text-attention" },
              { n: "passport-after.jpg", l: "After", d: JOB.dates.handover, tone: "text-pass" },
            ].map((p) => (
              <div key={p.l} className="bg-white">
                <SmartImage
                  name={p.n}
                  alt={`${p.l} the work`}
                  ratio="4 / 3"
                  rounded="rounded-none"
                  className="w-full"
                />
                <div className="flex items-center justify-between px-2.5 py-1.5">
                  <span className={`text-[11px] font-semibold ${p.tone}`}>
                    {p.l}
                  </span>
                  <span className="text-[9.5px] text-muted">{p.d}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Records */}
          <div className="grid grid-cols-2 gap-px bg-border">
            {records.map((r) => {
              const Icon = r.icon;
              return (
                <div key={r.k} className="bg-white px-3 py-2.5">
                  <div className="flex items-center gap-1.5">
                    <Icon size={12} className="shrink-0 text-violet" />
                    <span className="text-[9.5px] text-muted">{r.k}</span>
                  </div>
                  <div className="mt-1 text-[12px] font-semibold leading-tight text-ink">
                    {r.v}
                  </div>
                  <div className="text-[9.5px] leading-tight text-muted">
                    {r.sub}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Verify */}
          <div className="flex items-center gap-3 border-t border-border bg-surface px-4 py-3">
            <QrBlock />
            <div className="min-w-0 flex-1">
              <div className="text-[11.5px] font-semibold text-ink">
                Anyone can check this
              </div>
              <p className="mt-0.5 text-[10.5px] leading-snug text-muted">
                Scan the code, or open
                <br />
                smartcareassure.in/verify/{JOB.id}
              </p>
            </div>
          </div>

          {/* Transfer note — this is what makes it worth keeping */}
          <div className="flex items-start gap-2 border-t border-border bg-white px-4 py-3">
            <ArrowRightLeft size={13} className="mt-0.5 shrink-0 text-royal-purple" />
            <p className="text-[10.5px] leading-snug text-muted">
              The remaining cover transfers with the house. If you sell, the new
              owner keeps the warranty and this record.
            </p>
          </div>
        </div>

        {/* ── Terms, in plain words ────────────────────────────────────── */}
        <Section title="What this warranty covers">
          <Card pad="p-3">
            <div className="flex gap-2">
              <ShieldCheck size={15} className="mt-0.5 shrink-0 text-pass" />
              <p className="text-[11.5px] leading-snug text-ink">{W.covers}</p>
            </div>
            <p className="mt-2 border-t border-border pt-2 text-[11.5px] leading-snug text-muted">
              {W.remedy} {W.cap}
            </p>
          </Card>
        </Section>

        <Section title="If you ever see a leak">
          <Card pad="p-3">
            <p className="text-[11.5px] text-muted">{JOB.claims.window}.</p>
            <div className="mt-2.5 space-y-2">
              {JOB.claims.steps.map((s, i) => (
                <div key={s.label} className="flex items-center gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-lilac text-[10px] font-bold text-royal-purple">
                    {i + 1}
                  </span>
                  <span className="flex-1 text-[12px] text-ink">{s.label}</span>
                  <span className="shrink-0 text-[10.5px] font-semibold text-muted">
                    {s.days}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </Section>

        <div className="space-y-2.5">
          <PrimaryButton href="/customer/help">Raise a claim</PrimaryButton>
          <div className="grid grid-cols-2 gap-2.5">
            <GhostButton size="md">
              <Share2 size={15} /> Share
            </GhostButton>
            <GhostButton size="md">
              <Download size={15} /> Save as PDF
            </GhostButton>
          </div>
        </div>
      </div>

      <BottomTabBar />
    </PhoneFrame>
  );
}

// Gold-rimmed seal, drawn rather than imported so it always prints crisply.
function Seal({ years }: { years: number }) {
  return (
    <div className="relative h-[72px] w-[72px] shrink-0">
      <svg viewBox="0 0 72 72" className="h-full w-full">
        <circle cx="36" cy="36" r="34" fill="none" stroke="#FFD23F" strokeWidth="1" opacity="0.5" />
        <circle cx="36" cy="36" r="30" fill="#FFD23F" opacity="0.1" />
        <circle
          cx="36"
          cy="36"
          r="30"
          fill="none"
          stroke="#FFD23F"
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-sun-yellow">
        <span className="text-[21px] font-extrabold leading-none">{years}</span>
        <span className="mt-0.5 text-[7.5px] font-semibold leading-tight">
          year cover
        </span>
      </div>
    </div>
  );
}

// Faint droplet field on the cover — texture without an image file.
function Watermark() {
  const drops = [
    [12, 60], [40, 78], [68, 52], [96, 84], [124, 58], [152, 80],
    [26, 100], [54, 118], [82, 96], [110, 124], [138, 100], [166, 120],
  ];
  return (
    <svg
      viewBox="0 0 180 140"
      className="pointer-events-none absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      {drops.map(([x, y], i) => (
        <path
          key={i}
          d={`M ${x} ${y} c 4 6 7 9 7 13 a 7 7 0 0 1 -14 0 c 0 -4 3 -7 7 -13 z`}
          fill="#FFFFFF"
          opacity="0.04"
        />
      ))}
    </svg>
  );
}

// A QR-shaped block. Deterministic, so the server and the browser draw the same
// thing. Swap for a real QR when the verify endpoint exists.
const QR = (() => {
  const n = 21;
  let seed = 127;
  const rand = () => ((seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648);
  const grid: boolean[][] = [];
  for (let y = 0; y < n; y++) {
    const row: boolean[] = [];
    for (let x = 0; x < n; x++) {
      const finder =
        (x < 7 && y < 7) || (x >= n - 7 && y < 7) || (x < 7 && y >= n - 7);
      row.push(finder ? false : rand() > 0.52);
    }
    grid.push(row);
  }
  return { n, grid };
})();

function QrBlock() {
  const { n, grid } = QR;
  const finders = [
    [0, 0],
    [n - 7, 0],
    [0, n - 7],
  ];
  return (
    <div className="shrink-0 rounded-lg border border-border bg-white p-1.5">
      <svg viewBox={`0 0 ${n} ${n}`} className="h-14 w-14">
        {grid.map((row, y) =>
          row.map((on, x) =>
            on ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="#2E1A5E" /> : null
          )
        )}
        {finders.map(([fx, fy], i) => (
          <g key={i}>
            <rect x={fx} y={fy} width="7" height="7" fill="#2E1A5E" />
            <rect x={fx + 1} y={fy + 1} width="5" height="5" fill="#FFFFFF" />
            <rect x={fx + 2} y={fy + 2} width="3" height="3" fill="#2E1A5E" />
          </g>
        ))}
      </svg>
    </div>
  );
}
