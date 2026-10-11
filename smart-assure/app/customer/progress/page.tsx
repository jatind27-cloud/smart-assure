import { JOB } from "@/lib/job";
import { PhoneFrame } from "@/components/PhoneFrame";
import { JobIdPill } from "@/components/JobIdPill";
import { BottomTabBar } from "@/components/BottomTabBar";
import { SmartImage, EvidencePhoto } from "@/components/SmartImage";
import { HoldPointLock } from "@/components/HoldPointLock";
import { TopBar, Card, Section, Pill, Meter, GhostButton } from "@/components/ui";
import {
  Check,
  CloudRain,
  Clock,
  TrendingDown,
  Package,
  HardHat,
  Phone,
  AlertTriangle,
  Droplets,
  ShieldCheck,
} from "lucide-react";

// Screen 5 — Progress report.
// Not a status page: a report, issued daily, that a homeowner could forward to
// anyone. Every claim on it is backed by a time-stamped photo or a reading.
export default function ProgressReport() {
  const P = JOB.progress;
  const lockByStep = Object.fromEntries(JOB.holdPoints.map((h) => [h.step, h]));

  return (
    <PhoneFrame>
      <TopBar
        title="Progress report"
        subtitle={`Day ${P.day} of ${JOB.quoteDurationDays} · updated today, 4:12 pm`}
        back="/customer"
        right={<JobIdPill />}
      />

      <div className="space-y-5 px-4 pb-5 pt-4">
        {/* Report header */}
        <Card pad="p-3.5">
          <div className="flex items-center gap-4">
            <Ring pct={P.pct} />
            <div className="min-w-0 flex-1">
              <div className="text-[14px] font-semibold leading-tight text-ink">
                Terrace waterproofing
              </div>
              <div className="text-[11.5px] text-muted">
                {JOB.site.area} sq ft · {JOB.address.locality}
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-1.5">
                <Pill tone="green">On schedule</Pill>
                <Pill tone="lilac">Finishes {JOB.dates.handover}</Pill>
              </div>
            </div>
          </div>
          <div className="mt-3 flex items-start gap-2 border-t border-border pt-2.5">
            <CloudRain size={14} className="mt-0.5 shrink-0 text-water" />
            <p className="text-[11.5px] leading-snug text-muted">
              {P.weather}. The coating needs four dry hours, so the second coat
              is scheduled for tomorrow morning instead of this evening.
            </p>
          </div>
        </Card>

        {/* Today */}
        <Section
          title={`Day ${P.day}, what was done`}
          action={
            <span className="text-[11.5px] text-muted">
              {P.todayPlan.filter((t) => t.done).length} of {P.todayPlan.length}
            </span>
          }
        >
          <Card pad="p-3">
            <div className="space-y-2.5">
              {P.todayPlan.map((t) => (
                <div key={t.task} className="flex items-center gap-2.5">
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                      t.done ? "bg-pass" : "border-2 border-border bg-white"
                    }`}
                  >
                    {t.done && (
                      <Check size={12} strokeWidth={3} className="text-white" />
                    )}
                  </span>
                  <span
                    className={`flex-1 text-[12.5px] ${
                      t.done ? "text-ink" : "text-muted"
                    }`}
                  >
                    {t.task}
                  </span>
                  <span className="shrink-0 text-[10.5px] tabular-nums text-muted">
                    {t.at}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </Section>

        {/* Evidence */}
        <Section
          title="Photos on record"
          action={
            <span className="text-[11.5px] text-muted">
              {P.photos.length} today
            </span>
          }
        >
          <div className="grid grid-cols-2 gap-2.5">
            {P.photos.map((p) => (
              <EvidencePhoto
                key={p.name}
                name={p.name}
                alt={p.caption}
                time={p.time.split(", ")[1]}
                caption={`${p.caption} · ${p.time.split(",")[0]}`}
              />
            ))}
          </div>
        </Section>

        {/* The number that proves it is working */}
        <Section title="Is it working?">
          <Card pad="p-3">
            <div className="flex items-center gap-2">
              <TrendingDown size={15} className="shrink-0 text-pass" />
              <span className="text-[12.5px] font-semibold text-ink">
                Moisture at the worst point is coming down
              </span>
            </div>
            <div className="mt-3 space-y-2.5">
              <div>
                <div className="mb-1 flex items-center justify-between text-[11px]">
                  <span className="text-muted">Before work started</span>
                  <span className="font-semibold tabular-nums text-attention">
                    {P.recheck.before}%
                  </span>
                </div>
                <Meter pct={P.recheck.before} tone="attention" />
              </div>
              <div>
                <div className="mb-1 flex items-center justify-between text-[11px]">
                  <span className="text-muted">Re-checked {P.recheck.at}</span>
                  <span className="font-semibold tabular-nums text-pass">
                    {P.recheck.after}%
                  </span>
                </div>
                <Meter pct={P.recheck.after} tone="pass" />
              </div>
            </div>
            <p className="mt-2.5 border-t border-border pt-2.5 text-[11px] leading-snug text-muted">
              Under 20% is normal. The reading keeps falling as the slab dries,
              and the water test on day 3 is the real proof.
            </p>
          </Card>
        </Section>

        {/* Material actually used */}
        <Card pad="p-2.5">
          <div className="flex items-center gap-3">
            <SmartImage
              name={JOB.material.photo}
              alt={JOB.material.product}
              ratio="1 / 1"
              className="w-12"
              rounded="rounded-lg"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <Package size={13} className="shrink-0 text-royal-purple" />
                <span className="text-[12.5px] font-semibold text-ink">
                  {JOB.material.product}
                </span>
              </div>
              <div className="text-[11px] text-muted">
                Batch {JOB.material.batch} · 3 of 4 packs opened
              </div>
              <div className="mt-0.5 text-[10.5px] text-muted">
                Nothing is substituted on site. The batch is on your warranty.
              </div>
            </div>
          </div>
        </Card>

        {/* Who is on site */}
        <Section title="Who is working on your home">
          <Card pad="p-2.5">
            <div className="flex items-center gap-3">
              <SmartImage
                name="partner-team.jpg"
                alt={JOB.partner.name}
                ratio="1 / 1"
                className="w-12"
                rounded="rounded-full"
              />
              <div className="min-w-0 flex-1">
                <div className="text-[12.5px] font-semibold text-ink">
                  {JOB.partner.name}
                </div>
                <div className="text-[11px] text-muted">
                  {JOB.partner.tier} · ID {JOB.partner.id}
                </div>
                <div className="mt-0.5 text-[10.5px] text-muted">
                  Team lead {JOB.partner.lead} · supervised by{" "}
                  {JOB.supervisor.name}
                </div>
              </div>
              <button className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-lilac">
                <Phone size={14} className="text-royal-purple" />
              </button>
            </div>
          </Card>
        </Section>

        {/* The ten steps and the four locks */}
        <Section title="Where the job stands">
          <Card pad="p-3">
            <div className="relative">
              <div className="absolute bottom-3 left-[11px] top-3 w-px bg-border" />
              <div className="space-y-0.5">
                {JOB.steps.map((s) => {
                  const lock = lockByStep[s.name];
                  const active = "active" in s && s.active;
                  return (
                    <div key={s.name} className="relative flex items-center gap-2.5 py-1">
                      <span
                        className={`z-10 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full ${
                          s.done
                            ? "bg-royal-purple text-white"
                            : active
                            ? "border-[2.5px] border-royal-purple bg-white"
                            : "border-2 border-border bg-white"
                        }`}
                      >
                        {s.done && <Check size={12} strokeWidth={3} />}
                      </span>
                      <span
                        className={`flex-1 text-[12px] ${
                          active
                            ? "font-semibold text-ink"
                            : s.done
                            ? "text-ink"
                            : "text-muted"
                        }`}
                      >
                        {s.name}
                      </span>
                      <span className="shrink-0 text-[10px] text-muted">
                        {s.on}
                      </span>
                      {lock && (
                        <HoldPointLock
                          number={lock.number}
                          passed={lock.passed}
                          size={22}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-3 space-y-1.5 border-t border-border pt-2.5">
              {JOB.holdPoints.map((h) => (
                <div key={h.number} className="flex items-start gap-2">
                  {h.passed ? (
                    <Check size={12} strokeWidth={3} className="mt-0.5 shrink-0 text-pass" />
                  ) : (
                    <Clock size={12} className="mt-0.5 shrink-0 text-muted" />
                  )}
                  <span className="text-[10.5px] leading-snug text-muted">
                    <span className="font-semibold text-ink">
                      Hold point {h.number}
                    </span>{" "}
                    {h.label}
                    {h.passed ? ` — ${h.signedBy}, ${h.at}` : " — not yet due"}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </Section>

        {/* What happens next */}
        <Section title="What happens next">
          <Card pad="p-3">
            <div className="space-y-2.5">
              {[
                {
                  i: Droplets,
                  t: "Tomorrow, 9 am",
                  d: "Second coat across the full terrace",
                },
                {
                  i: Droplets,
                  t: "Tomorrow, 2 pm",
                  d: "Terrace flooded for the 24-hour water test",
                },
                {
                  i: ShieldCheck,
                  t: JOB.dates.handover,
                  d: "Supervisor signs off, warranty and passport issued",
                },
              ].map((n) => {
                const Icon = n.i;
                return (
                  <div key={n.t} className="flex gap-2.5">
                    <Icon size={15} className="mt-0.5 shrink-0 text-royal-purple" />
                    <div>
                      <div className="text-[12px] font-semibold text-ink">
                        {n.t}
                      </div>
                      <div className="text-[11px] leading-snug text-muted">
                        {n.d}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </Section>

        <GhostButton size="md" href="/customer/help">
          <AlertTriangle size={14} /> Something looks wrong on site
        </GhostButton>

        <div className="flex items-center justify-center gap-1.5 text-[10.5px] text-muted">
          <HardHat size={12} />
          Report issued automatically every evening at 7 pm
        </div>
      </div>

      <BottomTabBar />
    </PhoneFrame>
  );
}

// Progress ring
function Ring({ pct }: { pct: number }) {
  const r = 26;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative h-[68px] w-[68px] shrink-0">
      <svg viewBox="0 0 68 68" className="h-full w-full -rotate-90">
        <circle cx="34" cy="34" r={r} fill="none" stroke="#E6DCF7" strokeWidth="7" />
        <circle
          cx="34"
          cy="34"
          r={r}
          fill="none"
          stroke="#4B2A8C"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={`${(pct / 100) * c} ${c}`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[17px] font-extrabold leading-none text-ink">
          {pct}%
        </span>
        <span className="text-[8.5px] text-muted">done</span>
      </div>
    </div>
  );
}
