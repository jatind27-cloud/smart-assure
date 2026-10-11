"use client";

import { useState } from "react";
import { JOB, rupees } from "@/lib/job";
import { PhoneFrame } from "@/components/PhoneFrame";
import { JobIdPill } from "@/components/JobIdPill";
import { HoldPointLock } from "@/components/HoldPointLock";
import { SmartImage } from "@/components/SmartImage";
import { TopBar, Card, Section, Pill, Row } from "@/components/ui";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Check,
  MapPin,
  Pencil,
  ShieldCheck,
  Smartphone,
  Banknote,
  CreditCard,
  SplitSquareHorizontal,
  Phone,
  X,
  CalendarClock,
  ArrowRight,
} from "lucide-react";

// Screen 4 — Your price, and the approval that unlocks the job.
// Hold point 2: nothing starts until the homeowner has seen the exclusions and
// ticked both boxes. Payment choices sit on the same screen, because "how do I
// pay" is the question that actually stalls a booking.
export default function QuoteScreen() {
  const [scope, setScope] = useState(false);
  const [exclusions, setExclusions] = useState(false);
  const [approved, setApproved] = useState(false);
  const [pay, setPay] = useState("upi");

  const credit = JOB.inspectionFee;
  const payable = JOB.quoteTotal - credit;
  const canApprove = scope && exclusions;

  const methods = [
    {
      id: "upi",
      icon: Smartphone,
      label: "UPI",
      detail: "GPay, PhonePe, Paytm or any UPI app",
      tag: "Most used",
    },
    {
      id: "pod",
      icon: SplitSquareHorizontal,
      label: "Pay as the work finishes",
      detail: "20% now, 40% after prep, 40% after the water test",
      tag: "No extra cost",
    },
    {
      id: "cash",
      icon: Banknote,
      label: "Cash on completion",
      detail: "Pay the supervisor, receipt on the spot",
    },
    {
      id: "card",
      icon: CreditCard,
      label: "Card or EMI",
      detail: "3, 6 or 9 months, bank charges apply",
    },
  ];

  return (
    <PhoneFrame>
      <TopBar
        title="Your price"
        subtitle={`Valid till ${JOB.quoteValidTill}`}
        back="/customer/verdict"
        right={<JobIdPill />}
      />

      <div className="space-y-4 px-4 pb-6 pt-4">
        {/* Headline price */}
        <Card pad="p-3.5">
          <div className="flex items-end justify-between">
            <div>
              <div className="text-[11px] text-muted">Total for the job</div>
              <div className="text-[26px] font-extrabold leading-none text-ink">
                {rupees(JOB.quoteTotal)}
              </div>
              <div className="mt-1 text-[11px] text-muted">
                All material and labour, taxes included
              </div>
            </div>
            <div className="text-right">
              <Pill tone="green">Fixed price</Pill>
              <div className="mt-1.5 flex items-center justify-end gap-1 text-[11px] text-muted">
                <CalendarClock size={12} />
                {JOB.quoteDurationDays} days
              </div>
            </div>
          </div>
        </Card>

        {/* Where the work happens */}
        <Card pad="p-3">
          <div className="flex items-start gap-2.5">
            <MapPin size={16} className="mt-0.5 shrink-0 text-royal-purple" />
            <div className="min-w-0 flex-1">
              <div className="text-[11px] text-muted">Work address</div>
              <div className="text-[12.5px] font-semibold leading-snug text-ink">
                {JOB.address.line1}
              </div>
              <div className="text-[12px] text-ink">
                {JOB.address.locality}, {JOB.address.city} {JOB.address.pin}
              </div>
              <div className="mt-1 text-[11px] text-muted">
                {JOB.site.surface}, {JOB.site.area} sq ft · {JOB.customer.name} ·{" "}
                {JOB.customer.phone}
              </div>
            </div>
            <button className="flex shrink-0 items-center gap-1 text-[11.5px] font-semibold text-royal-purple">
              <Pencil size={12} /> Change
            </button>
          </div>
        </Card>

        {/* The lines */}
        <Section title="What you are paying for">
          <Card pad="p-3">
            <div className="divide-y divide-border">
              {JOB.quoteLines.map((l) => (
                <div key={l.label} className="flex gap-3 py-2 first:pt-0 last:pb-0">
                  <div className="min-w-0 flex-1">
                    <div className="text-[12.5px] font-semibold leading-tight text-ink">
                      {l.label}
                    </div>
                    <div className="text-[11px] leading-snug text-muted">
                      {l.detail}
                    </div>
                    <div className="mt-0.5 text-[10.5px] text-muted">{l.qty}</div>
                  </div>
                  <div className="shrink-0 text-[12.5px] font-semibold tabular-nums text-ink">
                    {rupees(l.amount)}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-2.5 space-y-0.5 border-t border-border pt-2.5">
              <Row k="Job total" v={rupees(JOB.quoteTotal)} />
              <div className="flex items-center justify-between gap-3 py-1">
                <span className="text-[12.5px] text-pass">
                  Inspection fee you already paid
                </span>
                <span className="text-[12.5px] font-semibold tabular-nums text-pass">
                  − {rupees(credit)}
                </span>
              </div>
              <div className="mt-1 flex items-center justify-between gap-3 border-t border-border pt-2">
                <span className="text-[13px] font-semibold text-ink">
                  You pay
                </span>
                <span className="text-[17px] font-extrabold tabular-nums text-ink">
                  {rupees(payable)}
                </span>
              </div>
            </div>
          </Card>
        </Section>

        {/* Material being used */}
        <Card pad="p-2.5">
          <div className="flex items-center gap-3">
            <SmartImage
              name={JOB.material.photo}
              alt={JOB.material.product}
              ratio="1 / 1"
              className="w-14"
              rounded="rounded-lg"
            />
            <div className="min-w-0 flex-1">
              <div className="text-[12.5px] font-semibold text-ink">
                {JOB.material.product}
              </div>
              <div className="text-[11px] text-muted">
                {JOB.material.packs} · {JOB.material.coverage}
              </div>
              <div className="mt-0.5 text-[10.5px] text-muted">
                Batch {JOB.material.batch}, delivered sealed to your door
              </div>
            </div>
          </div>
        </Card>

        {/* Payment */}
        <Section title="How you want to pay">
          <div className="space-y-2">
            {methods.map((m) => {
              const Icon = m.icon;
              const on = pay === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setPay(m.id)}
                  className={`flex w-full items-center gap-2.5 rounded-card border p-2.5 text-left transition ${
                    on ? "border-royal-purple bg-lilac" : "border-border bg-white"
                  }`}
                >
                  <span
                    className="flex shrink-0 items-center justify-center rounded-full border-2"
                    style={{
                      width: 18,
                      height: 18,
                      borderColor: on ? "#4B2A8C" : "#D9CDEE",
                      background: on ? "#4B2A8C" : "transparent",
                    }}
                  >
                    {on && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                  </span>
                  <Icon
                    size={17}
                    className={on ? "text-royal-purple" : "text-muted"}
                  />
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-1.5">
                      <span className="text-[12.5px] font-semibold text-ink">
                        {m.label}
                      </span>
                      {m.tag && <Pill tone="green">{m.tag}</Pill>}
                    </span>
                    <span className="block text-[11px] leading-snug text-muted">
                      {m.detail}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Milestone breakdown, shown for every method so the schedule is clear */}
          <Card className="mt-2.5" pad="p-3">
            <div className="text-[11px] text-muted">Payment schedule</div>
            <div className="mt-2 space-y-2">
              {JOB.milestones.map((m, i) => {
                const amt = i === 0 ? m.amount - credit : m.amount;
                return (
                  <div key={m.label} className="flex items-center gap-2.5">
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                        m.paid
                          ? "bg-pass text-white"
                          : "bg-lilac-2 text-royal-purple"
                      }`}
                    >
                      {m.paid ? <Check size={11} strokeWidth={3} /> : m.pct / 10}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[12px] font-semibold leading-tight text-ink">
                        {m.label}
                      </span>
                      <span className="block text-[10.5px] text-muted">
                        {m.pct}% · {m.due}
                        {i === 0 && " · inspection credit applied"}
                      </span>
                    </span>
                    <span className="shrink-0 text-right">
                      <span className="block text-[12px] font-semibold tabular-nums text-ink">
                        {rupees(amt)}
                      </span>
                      {m.paid && (
                        <span className="block text-[9.5px] font-semibold text-pass">
                          Paid
                        </span>
                      )}
                    </span>
                  </div>
                );
              })}
            </div>
          </Card>
        </Section>

        {/* Warranty */}
        <Card className="bg-lilac" pad="p-3">
          <div className="flex items-center gap-2">
            <ShieldCheck size={17} className="shrink-0 text-royal-purple" />
            <span className="text-[13px] font-semibold text-ink">
              {JOB.warranty.tenorYears}-year warranty from handover
            </span>
          </div>
          <p className="mt-1.5 text-[11.5px] leading-snug text-muted">
            {JOB.warranty.covers} {JOB.warranty.remedy}
          </p>
        </Card>

        {/* Not covered — never hidden behind a tap */}
        <Section title="What the warranty does not cover">
          <Card pad="p-3">
            <div className="space-y-2">
              {JOB.notCovered.map((n) => (
                <div key={n.item} className="flex gap-2.5">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-stop/10">
                    <X size={10} strokeWidth={3} className="text-stop" />
                  </span>
                  <div>
                    <span className="text-[12px] font-semibold text-ink">
                      {n.item}
                    </span>
                    <span className="block text-[10.5px] text-muted">
                      {n.note}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Section>

        {/* Adviser */}
        <Card pad="p-2.5">
          <div className="flex items-center gap-3">
            <SmartImage
              name={JOB.adviser.photo}
              alt={JOB.adviser.name}
              ratio="1 / 1"
              className="w-11"
              rounded="rounded-full"
            />
            <div className="min-w-0 flex-1">
              <div className="text-[12.5px] font-semibold text-ink">
                {JOB.adviser.name}
              </div>
              <div className="text-[11px] text-muted">
                {JOB.adviser.role} for this job
              </div>
            </div>
            <button className="flex shrink-0 items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-[11.5px] font-semibold text-royal-purple">
              <Phone size={13} /> Call
            </button>
          </div>
        </Card>

        {/* Hold point 2 */}
        <div className="space-y-2">
          <TickRow
            on={scope}
            onClick={() => !approved && setScope(!scope)}
            label="I approve this scope and price"
          />
          <TickRow
            on={exclusions}
            onClick={() => !approved && setExclusions(!exclusions)}
            label="I have read what the warranty does not cover"
          />
        </div>

        <div className="flex items-center gap-2.5">
          <HoldPointLock number={2} passed={approved} size={38} />
          {approved ? (
            <Link
              href="/customer/progress"
              className="flex h-[48px] flex-1 items-center justify-center gap-2 rounded-full bg-pass text-[14.5px] font-semibold text-white"
            >
              Approved · see progress
              <ArrowRight size={16} />
            </Link>
          ) : (
            <button
              onClick={() => canApprove && setApproved(true)}
              disabled={!canApprove}
              className="flex h-[48px] flex-1 items-center justify-center rounded-full bg-royal-purple text-[14.5px] font-semibold text-white transition disabled:opacity-40"
            >
              Approve and book
            </button>
          )}
        </div>

        {approved && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-card bg-pass/8 px-3 py-2.5 text-center"
          >
            <div className="text-[12px] font-semibold text-pass">
              Hold point 2 passed
            </div>
            <div className="text-[10.5px] text-muted">
              Work starts {JOB.dates.workStart}. Material is dispatched to your
              address the evening before.
            </div>
          </motion.div>
        )}
      </div>
    </PhoneFrame>
  );
}

function TickRow({
  on,
  onClick,
  label,
}: {
  on: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-2.5 rounded-card border p-3 text-left transition ${
        on ? "border-royal-purple bg-lilac" : "border-border bg-white"
      }`}
    >
      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 ${
          on ? "border-royal-purple bg-royal-purple" : "border-border bg-white"
        }`}
      >
        {on && <Check size={13} strokeWidth={3} className="text-white" />}
      </span>
      <span className="text-[12.5px] leading-snug text-ink">{label}</span>
    </button>
  );
}
