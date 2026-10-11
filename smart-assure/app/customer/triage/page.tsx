"use client";

import { useState } from "react";
import { JOB, rupees } from "@/lib/job";
import { PhoneFrame } from "@/components/PhoneFrame";
import { SmartImage } from "@/components/SmartImage";
import { AiChip } from "@/components/AiChip";
import { JobIdPill } from "@/components/JobIdPill";
import { TopBar, Card, PrimaryButton, Pill } from "@/components/ui";
import {
  Check,
  Camera,
  Plus,
  Home,
  Building2,
  Clock,
  CalendarCheck,
  IndianRupee,
  Stethoscope,
  Ruler,
  FileSignature,
  Info,
} from "lucide-react";

// Screen 2 — The free photo check.
// Five steps. The homeowner answers three sets of questions and sends three
// photos; the model reads them and routes the job. It never diagnoses — the
// last card says so in as many words, and the diagnosis is a site visit.
export default function TriageWizard() {
  const [step, setStep] = useState(0);

  // step 1
  const [where, setWhere] = useState<string | null>(null);
  const [property, setProperty] = useState<string | null>(null);
  // step 2
  const [photos, setPhotos] = useState<string[]>([]);
  // step 3
  const [signs, setSigns] = useState<string[]>([]);
  // step 4
  const [when, setWhen] = useState<string | null>(null);
  const [since, setSince] = useState<string | null>(null);
  // step 5
  const [slot, setSlot] = useState<string | null>(null);

  const PHOTOS = [
    { key: "patch", label: "The damp patch", img: "triage-patch.jpg", hint: "Stand close, keep it in focus" },
    { key: "wide", label: "The whole room", img: "triage-wide.jpg", hint: "Step back so we see where it sits" },
    { key: "above", label: "The surface above", img: "triage-surface-above.jpg", hint: "Terrace, balcony or the floor above" },
  ];

  const steps = [
    { n: "Where", ok: !!where && !!property },
    { n: "Photos", ok: photos.length === 3 },
    { n: "Signs", ok: signs.length > 0 },
    { n: "When", ok: !!when && !!since },
    { n: "Visit", ok: !!slot },
  ];

  const canNext = steps[step].ok;

  const toggle = (arr: string[], v: string, set: (x: string[]) => void) =>
    set(arr.includes(v) ? arr.filter((a) => a !== v) : [...arr, v]);

  return (
    <PhoneFrame>
      <TopBar
        title="Free photo check"
        subtitle={`Step ${step + 1} of 5 · no charge`}
        back={step === 0 ? "/customer" : undefined}
        right={
          step > 0 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="text-[12.5px] font-semibold text-royal-purple"
            >
              Back
            </button>
          ) : undefined
        }
      />

      {/* Step rail */}
      <div className="flex gap-1 bg-white px-4 pb-3">
        {steps.map((s, i) => (
          <div key={s.n} className="flex-1">
            <div
              className={`h-1 rounded-full ${
                i < step ? "bg-pass" : i === step ? "bg-royal-purple" : "bg-lilac-2"
              }`}
            />
            <div
              className={`mt-1 text-[9.5px] ${
                i === step ? "font-semibold text-ink" : "text-muted"
              }`}
            >
              {s.n}
            </div>
          </div>
        ))}
      </div>

      <div className="flex-1 px-4 pb-8 pt-4">
        {/* ── Step 1: where ─────────────────────────────────────────────── */}
        {step === 0 && (
          <div className="space-y-5">
            <Ask
              title="Where is the problem?"
              note="This decides which kind of technician comes."
            />
            <div className="grid grid-cols-2 gap-2">
              {[
                "Terrace or roof",
                "Ceiling, top floor",
                "Internal wall",
                "External wall",
                "Bathroom area",
                "Basement",
                "Balcony",
                "Water tank",
              ].map((w) => (
                <Choice
                  key={w}
                  on={where === w}
                  onClick={() => setWhere(w)}
                  label={w}
                />
              ))}
            </div>

            <Ask title="What kind of home?" />
            <div className="grid grid-cols-2 gap-2">
              {[
                { l: "Independent house", i: Home },
                { l: "Flat in a building", i: Building2 },
              ].map((p) => {
                const Icon = p.i;
                return (
                  <button
                    key={p.l}
                    onClick={() => setProperty(p.l)}
                    className={`flex items-center gap-2 rounded-card border px-3 py-3 text-left text-[12.5px] font-semibold transition ${
                      property === p.l
                        ? "border-royal-purple bg-lilac text-royal-purple"
                        : "border-border bg-white text-ink"
                    }`}
                  >
                    <Icon size={17} />
                    {p.l}
                  </button>
                );
              })}
            </div>

            <Card className="bg-lilac" pad="p-3">
              <div className="flex gap-2">
                <Info size={15} className="mt-0.5 shrink-0 text-royal-purple" />
                <p className="text-[11.5px] leading-snug text-muted">
                  Your answers so far point at a {where ? where.toLowerCase() : "surface"} on an
                  11-year-old house in {JOB.address.locality}. We already know the rainfall
                  and the common faults for this area.
                </p>
              </div>
            </Card>
          </div>
        )}

        {/* ── Step 2: photos ────────────────────────────────────────────── */}
        {step === 1 && (
          <div className="space-y-4">
            <Ask
              title="Send us three photos"
              note="Tap each one to add it from your camera or gallery."
            />
            <div className="space-y-2.5">
              {PHOTOS.map((p, i) => {
                const added = photos.includes(p.key);
                return (
                  <button
                    key={p.key}
                    onClick={() =>
                      toggle(photos, p.key, setPhotos)
                    }
                    className={`flex w-full items-center gap-3 rounded-card border p-2.5 text-left transition ${
                      added ? "border-pass bg-pass/5" : "border-border bg-white"
                    }`}
                  >
                    {added ? (
                      <SmartImage
                        name={p.img}
                        alt={p.label}
                        ratio="1 / 1"
                        className="w-16"
                        rounded="rounded-lg"
                      />
                    ) : (
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border border-dashed border-border bg-surface">
                        <Plus size={20} className="text-muted" />
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[13px] font-semibold text-ink">
                          {i + 1}. {p.label}
                        </span>
                        {added && (
                          <Check size={14} strokeWidth={3} className="text-pass" />
                        )}
                      </div>
                      <div className="text-[11px] text-muted">{p.hint}</div>
                      {added && (
                        <div className="mt-1 flex items-center gap-1 text-[10px] text-pass">
                          <Camera size={10} /> Added just now
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {photos.length === 3 && (
              <Card pad="p-3">
                <AiChip />
                <p className="mt-2 text-[12.5px] leading-snug text-ink">
                  I can see a damp patch roughly two feet across, with white
                  powder at its edges and paint lifting below it. The surface
                  above looks like an open terrace.
                </p>
                <p className="mt-2 text-[11px] leading-snug text-muted">
                  Two more questions and I can tell you who should come.
                </p>
              </Card>
            )}
          </div>
        )}

        {/* ── Step 3: signs ─────────────────────────────────────────────── */}
        {step === 2 && (
          <div className="space-y-4">
            <Ask
              title="What else can you see?"
              note="Pick everything that applies. There is no wrong answer."
            />
            <div className="space-y-2">
              {[
                { l: "A damp or discoloured patch", d: "Brown, grey or darker than the wall" },
                { l: "Paint peeling or bubbling", d: "Flakes come off when you touch it" },
                { l: "White powder on the surface", d: "Chalky, wipes off, comes back" },
                { l: "Cracks you can see", d: "Hairline or wider" },
                { l: "Water dripping", d: "Drops form and fall" },
                { l: "Black spots or smell", d: "Mould, musty smell in the room" },
              ].map((s) => {
                const on = signs.includes(s.l);
                return (
                  <button
                    key={s.l}
                    onClick={() => toggle(signs, s.l, setSigns)}
                    className={`flex w-full items-start gap-2.5 rounded-card border p-3 text-left transition ${
                      on ? "border-royal-purple bg-lilac" : "border-border bg-white"
                    }`}
                  >
                    <span
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 ${
                        on
                          ? "border-royal-purple bg-royal-purple"
                          : "border-border bg-white"
                      }`}
                    >
                      {on && <Check size={13} strokeWidth={3} className="text-white" />}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[13px] font-semibold text-ink">
                        {s.l}
                      </span>
                      <span className="block text-[11px] text-muted">{s.d}</span>
                    </span>
                  </button>
                );
              })}
            </div>
            {signs.length > 0 && (
              <div className="flex items-center gap-2 text-[11.5px] text-muted">
                <Check size={14} className="text-pass" />
                {signs.length} selected. White powder usually means water has
                been moving through the slab for a while.
              </div>
            )}
          </div>
        )}

        {/* ── Step 4: when ──────────────────────────────────────────────── */}
        {step === 3 && (
          <div className="space-y-5">
            <Ask
              title="When do you notice it?"
              note="This is what separates a roof leak from a pipe leak."
            />
            <div className="space-y-2">
              {[
                { l: "Only after it rains", d: "Dries up in a few days" },
                { l: "Worse after rain, never fully dry", d: "Always a little damp" },
                { l: "All year round, rain or not", d: "No link to the weather" },
              ].map((w) => (
                <Choice
                  key={w.l}
                  on={when === w.l}
                  onClick={() => setWhen(w.l)}
                  label={w.l}
                  detail={w.d}
                  wide
                />
              ))}
            </div>

            <Ask title="How long has it been there?" />
            <div className="grid grid-cols-3 gap-2">
              {["Under a month", "1 to 6 months", "Over 6 months"].map((s) => (
                <Choice
                  key={s}
                  on={since === s}
                  onClick={() => setSince(s)}
                  label={s}
                />
              ))}
            </div>

            {when === "Only after it rains" && (
              <Card className="bg-lilac" pad="p-3">
                <div className="flex gap-2">
                  <Info size={15} className="mt-0.5 shrink-0 text-royal-purple" />
                  <p className="text-[11.5px] leading-snug text-muted">
                    Damp that follows the rain and then dries points away from
                    plumbing. A technician still has to confirm it on site.
                  </p>
                </div>
              </Card>
            )}
          </div>
        )}

        {/* ── Step 5: result and booking ────────────────────────────────── */}
        {step === 4 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[16px] font-semibold text-ink">
                Your next step
              </span>
              <JobIdPill />
            </div>

            <div className="flex gap-2">
              {PHOTOS.map((p) => (
                <SmartImage
                  key={p.key}
                  name={p.img}
                  alt={p.label}
                  ratio="1 / 1"
                  className="w-full"
                  rounded="rounded-lg"
                />
              ))}
            </div>

            <Card pad="p-3">
              <AiChip />
              <p className="mt-2 text-[13px] font-semibold leading-snug text-ink">
                This looks like water entering through the terrace above.
              </p>
              <p className="mt-1.5 text-[12px] leading-snug text-muted">
                It needs someone on the roof with a moisture meter. I have put
                you with a diagnostic technician rather than an applicator, so
                nobody quotes you before the cause is known.
              </p>
              <div className="mt-2.5 border-t border-border pt-2.5">
                <p className="text-[11px] leading-snug text-muted">
                  This is routing, not a diagnosis. The verdict comes from a
                  certified technician on site and is signed by name.
                </p>
              </div>
            </Card>

            {/* What happens at the visit */}
            <Card pad="p-3">
              <div className="text-[13px] font-semibold text-ink">
                What happens at the visit
              </div>
              <div className="mt-2 space-y-2">
                {[
                  { i: Ruler, t: "Eight moisture readings across the terrace" },
                  { i: Stethoscope, t: "Checks that rule plumbing and structure in or out" },
                  { i: FileSignature, t: "A written verdict, signed, before anyone quotes" },
                ].map((r) => {
                  const Icon = r.i;
                  return (
                    <div key={r.t} className="flex items-start gap-2">
                      <Icon size={15} className="mt-0.5 shrink-0 text-royal-purple" />
                      <span className="text-[12px] leading-snug text-ink">
                        {r.t}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-2.5 flex items-center gap-2 border-t border-border pt-2.5">
                <IndianRupee size={14} className="text-royal-purple" />
                <span className="text-[12px] text-ink">
                  {rupees(JOB.inspectionFee)} for the visit
                </span>
                <Pill tone="green">Credited to your repair</Pill>
              </div>
            </Card>

            {/* Slot picker */}
            <div>
              <div className="mb-2 flex items-center gap-1.5">
                <Clock size={14} className="text-royal-purple" />
                <span className="text-[13px] font-semibold text-ink">
                  Pick a time
                </span>
              </div>
              <div className="space-y-2">
                {[
                  { l: "Today, 4 to 6 pm", d: `${JOB.technician.name} · 2.4 km away`, fast: true },
                  { l: "Tomorrow, 9 to 11 am", d: "First visit of the day" },
                  { l: "Tomorrow, 4 to 6 pm", d: "After work hours" },
                ].map((s) => (
                  <button
                    key={s.l}
                    onClick={() => setSlot(s.l)}
                    className={`flex w-full items-center gap-2.5 rounded-card border p-3 text-left transition ${
                      slot === s.l
                        ? "border-royal-purple bg-lilac"
                        : "border-border bg-white"
                    }`}
                  >
                    <span
                      className={`flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full border-2 ${
                        slot === s.l
                          ? "border-royal-purple bg-royal-purple"
                          : "border-border"
                      }`}
                      style={{ width: 18, height: 18 }}
                    >
                      {slot === s.l && (
                        <span className="h-1.5 w-1.5 rounded-full bg-white" />
                      )}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[12.5px] font-semibold text-ink">
                        {s.l}
                      </span>
                      <span className="block text-[11px] text-muted">{s.d}</span>
                    </span>
                    {s.fast && <Pill tone="yellow">Soonest</Pill>}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-center text-[11px] leading-snug text-muted">
              If the technician finds this is not a waterproofing problem, the
              visit is free and we tell you who to call instead.
            </p>
          </div>
        )}
      </div>

      {/* Sticky action */}
      <div className="sticky bottom-0 border-t border-border bg-white/97 px-4 py-3 backdrop-blur">
        {step < 4 ? (
          <PrimaryButton onClick={() => canNext && setStep(step + 1)} disabled={!canNext}>
            {step === 1 && photos.length < 3
              ? `Add ${3 - photos.length} more photo${3 - photos.length > 1 ? "s" : ""}`
              : "Continue"}
          </PrimaryButton>
        ) : (
          <PrimaryButton href="/customer/verdict" disabled={!slot}>
            <CalendarCheck size={17} />
            {slot ? "Confirm the visit" : "Pick a time to continue"}
          </PrimaryButton>
        )}
      </div>
    </PhoneFrame>
  );
}

function Ask({ title, note }: { title: string; note?: string }) {
  return (
    <div>
      <h2 className="text-[17px] font-semibold leading-tight text-ink">
        {title}
      </h2>
      {note && <p className="mt-1 text-[12px] text-muted">{note}</p>}
    </div>
  );
}

function Choice({
  on,
  onClick,
  label,
  detail,
  wide = false,
}: {
  on: boolean;
  onClick: () => void;
  label: string;
  detail?: string;
  wide?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-card border px-3 py-2.5 text-left transition ${
        on ? "border-royal-purple bg-lilac" : "border-border bg-white"
      } ${wide ? "w-full" : ""}`}
    >
      <span
        className={`block text-[12.5px] font-semibold leading-tight ${
          on ? "text-royal-purple" : "text-ink"
        }`}
      >
        {label}
      </span>
      {detail && (
        <span className="mt-0.5 block text-[11px] text-muted">{detail}</span>
      )}
    </button>
  );
}
