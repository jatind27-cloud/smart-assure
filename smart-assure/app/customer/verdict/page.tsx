import { JOB } from "@/lib/job";
import { PhoneFrame } from "@/components/PhoneFrame";
import { JobIdPill } from "@/components/JobIdPill";
import { SmartImage } from "@/components/SmartImage";
import { SignedByRow } from "@/components/SignedByRow";
import { HoldPointLock } from "@/components/HoldPointLock";
import {
  TopBar,
  Card,
  Section,
  PrimaryButton,
  GhostButton,
  Pill,
  Meter,
} from "@/components/ui";
import {
  Droplet,
  AlertCircle,
  Check,
  X,
  Download,
  MessageCircle,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

// Screen 3 — Your verdict.
// One verdict, stated in the homeowner's words before the trade words: water is
// getting in through the terrace. Everything under it exists to answer "do I
// believe this?" — the readings, the photos, what was ruled out, and the name
// and face of the person who signed it.
export default function VerdictScreen() {
  const high = JOB.readings.filter((r) => r.high).length;

  return (
    <PhoneFrame>
      <TopBar
        title="Your verdict"
        subtitle={`Inspected ${JOB.dates.inspection}`}
        back="/customer/triage"
        right={<JobIdPill />}
      />

      <div className="space-y-5 px-4 pb-6 pt-4">
        {/* The verdict itself */}
        <div className="overflow-hidden rounded-card bg-pass">
          <div className="px-4 py-4 text-white">
            <div className="flex items-center gap-1.5">
              <Droplet size={15} className="text-white" fill="white" />
              <span className="text-[11.5px] font-semibold text-white/85">
                Waterproofing problem
              </span>
            </div>
            <h1 className="mt-1.5 text-[20px] font-extrabold leading-tight">
              {JOB.verdictHeadline}
            </h1>
            <p className="mt-2 text-[12.5px] leading-snug text-white/90">
              {JOB.verdictPlain}
            </p>
          </div>
          <div className="flex items-center gap-2 bg-white/15 px-4 py-2.5">
            <Check size={14} strokeWidth={3} className="shrink-0 text-white" />
            <span className="text-[11.5px] text-white">
              We can fix this, and it carries a {JOB.warranty.tenorYears}-year
              written warranty.
            </span>
          </div>
        </div>

        {/* The inspection */}
        <Card pad="p-0" className="overflow-hidden">
          <SmartImage
            name="tech-onsite.jpg"
            alt="Technician taking moisture readings on the terrace"
            ratio="16 / 9"
            rounded="rounded-none"
            className="w-full"
            dim
          >
            <div className="absolute bottom-2.5 left-3 right-3 flex items-end justify-between">
              <div className="text-white">
                <div className="text-[12.5px] font-semibold">
                  {JOB.site.surface}, {JOB.site.area} sq ft
                </div>
                <div className="text-[10.5px] text-white/80">
                  {JOB.site.property} · {JOB.site.age} · {JOB.site.lastTreated}
                </div>
              </div>
              <Pill tone="white">90 min on site</Pill>
            </div>
          </SmartImage>
        </Card>

        {/* Readings */}
        <Section
          title="Moisture readings"
          action={
            <span className="text-[11.5px] text-muted">
              {JOB.readingNormal}
            </span>
          }
        >
          <Card pad="p-3">
            <div className="grid grid-cols-4 gap-2">
              {JOB.readings.map((r) => (
                <div
                  key={r.id}
                  className={`rounded-lg border px-1.5 py-2 text-center ${
                    r.high
                      ? "border-attention/40 bg-attention/10"
                      : "border-border bg-surface"
                  }`}
                >
                  <div
                    className={`text-[15px] font-extrabold leading-none tabular-nums ${
                      r.high ? "text-attention" : "text-water"
                    }`}
                  >
                    {r.pct}%
                  </div>
                  <div className="mt-1 text-[9px] text-muted">Point {r.id}</div>
                  <div className="mt-1.5">
                    <Meter pct={r.pct} tone={r.high ? "attention" : "water"} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-start gap-2 border-t border-border pt-2.5">
              <AlertCircle size={14} className="mt-0.5 shrink-0 text-attention" />
              <p className="text-[11.5px] leading-snug text-muted">
                {high} of {JOB.readings.length} points are well above normal, and
                all three sit along the north parapet. That is the line water is
                travelling along.
              </p>
            </div>
          </Card>
        </Section>

        {/* Findings with photos */}
        <Section title="What the technician found">
          <div className="space-y-2.5">
            {JOB.findings.map((f) => (
              <Card key={f.title} pad="p-2.5">
                <div className="flex gap-3">
                  <SmartImage
                    name={f.photo}
                    alt={f.title}
                    ratio="1 / 1"
                    className="w-20"
                    rounded="rounded-lg"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="mb-1">
                      {f.flag === "cause" ? (
                        <Pill tone="orange">This is the cause</Pill>
                      ) : (
                        <Pill tone="green">Checked, not a problem</Pill>
                      )}
                    </div>
                    <div className="text-[12.5px] font-semibold leading-tight text-ink">
                      {f.title}
                    </div>
                    <p className="mt-1 text-[11.5px] leading-snug text-muted">
                      {f.note}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Section>

        {/* What was ruled out — the honest part, kept as evidence */}
        <Section title="What we ruled out">
          <Card pad="p-3">
            <div className="space-y-2.5">
              {JOB.ruledOut.map((r) => (
                <div key={r.cause} className="flex gap-2.5">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-stop/10">
                    <X size={12} strokeWidth={3} className="text-stop" />
                  </span>
                  <div>
                    <div className="text-[12.5px] font-semibold text-ink">
                      {r.cause}
                    </div>
                    <p className="text-[11.5px] leading-snug text-muted">
                      {r.why}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-3 border-t border-border pt-2.5 text-[11px] leading-snug text-muted">
              Ruling these out is the reason the visit costs anything. If one of
              them had been the cause, we would have told you to call a plumber
              or an engineer and sold you nothing.
            </p>
          </Card>
        </Section>

        {/* The plan */}
        <Section title="What we will do about it">
          <Card pad="p-3">
            <div className="space-y-3">
              {JOB.recommendedSystem.map((s, i) => (
                <div key={s.step} className="flex gap-2.5">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-royal-purple text-[11px] font-extrabold text-white">
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-[12.5px] font-semibold text-ink">
                      {s.step}
                    </div>
                    <p className="text-[11.5px] leading-snug text-muted">
                      {s.why}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-2 rounded-lg bg-lilac px-2.5 py-2">
              <ShieldCheck size={15} className="shrink-0 text-royal-purple" />
              <span className="text-[11.5px] leading-snug text-ink">
                All three together are what the warranty covers. One without the
                others is not a system.
              </span>
            </div>
          </Card>
        </Section>

        {/* Signed by a person */}
        <SignedByRow />

        <div className="flex items-center gap-2.5 rounded-card bg-pass/8 px-3 py-2.5">
          <HoldPointLock number={1} passed size={30} />
          <div>
            <div className="text-[12px] font-semibold text-pass">
              Hold point 1 passed
            </div>
            <div className="text-[10.5px] text-muted">
              {JOB.holdPoints[0].label} · {JOB.holdPoints[0].at}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2.5">
          <PrimaryButton href="/customer/quote">
            See your price
            <ArrowRight size={16} />
          </PrimaryButton>
          <div className="grid grid-cols-2 gap-2.5">
            <GhostButton size="md">
              <Download size={15} /> Report
            </GhostButton>
            <GhostButton size="md" href="/customer/help">
              <MessageCircle size={15} /> Ask us
            </GhostButton>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
