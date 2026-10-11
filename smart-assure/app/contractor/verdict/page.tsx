"use client";

import { useState } from "react";
import { JOB } from "@/lib/job";
import { STRINGS, LANGS, type Lang } from "@/lib/i18n";
import { PhoneFrame } from "@/components/PhoneFrame";
import { SmartImage } from "@/components/SmartImage";
import { AiChip } from "@/components/AiChip";
import { HoldPointLock } from "@/components/HoldPointLock";
import { motion } from "framer-motion";
import {
  Droplet,
  Wrench,
  Building,
  Check,
  Camera,
  Gauge,
  Pencil,
  Phone,
  Briefcase,
  ListChecks,
  Wallet,
  LifeBuoy,
  AlertTriangle,
  Send,
  IndianRupee,
  ChevronRight,
} from "lucide-react";

// Screen 7 — The contractor's app. A different app from the customer's one:
// its own shell, its own bottom bar, and its own language.
//
// The person holding this phone is an applicator or technician on a roof. So:
// three big buttons, icons that mean something without reading, and the whole
// interface in the language they chose. It opens in Hindi.
type Pick = "water" | "plumb" | "struct" | null;

export default function ContractorApp() {
  const [lang, setLang] = useState<Lang>("hi");
  const [pick, setPick] = useState<Pick>("water");
  const [signed, setSigned] = useState(false);
  const t = STRINGS[lang];

  const options = [
    {
      key: "water" as const,
      icon: Droplet,
      label: t.vWater,
      sub: t.vWaterSub,
      bg: "#1E8E3E",
    },
    {
      key: "plumb" as const,
      icon: Wrench,
      label: t.vPlumb,
      sub: t.vPlumbSub,
      bg: "#B3261E",
    },
    {
      key: "struct" as const,
      icon: Building,
      label: t.vStruct,
      sub: t.vStructSub,
      bg: "#F28C28",
    },
  ];

  return (
    <PhoneFrame>
      {/* ── Contractor header. Dark, so nobody confuses the two apps. ──── */}
      <div className="sticky top-0 z-20 bg-deep-purple px-4 pb-3 pt-3.5">
        <div className="flex items-center gap-2.5">
          <SmartImage
            name="contractor-portrait.jpg"
            alt={JOB.technician.name}
            ratio="1 / 1"
            className="w-10"
            rounded="rounded-full"
          />
          <div className="min-w-0 flex-1">
            <div className="truncate text-[14px] font-semibold text-white">
              {JOB.technician.name}
            </div>
            <div className="flex items-center gap-1.5">
              <span className="rounded bg-sun-yellow px-1.5 py-0.5 text-[9.5px] font-bold text-deep-purple">
                {t.tierBadge}
              </span>
              <span className="text-[10px] text-white/60">{t.appName}</span>
            </div>
          </div>
          <button className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10">
            <Phone size={16} className="text-white" />
          </button>
        </div>

        {/* Language switch — the first control on the screen, by design */}
        <div className="mt-3 flex gap-1 rounded-full bg-white/10 p-1">
          {LANGS.map((l) => (
            <button
              key={l.code}
              onClick={() => setLang(l.code)}
              className={`flex-1 rounded-full py-1.5 text-[12px] font-semibold transition ${
                lang === l.code
                  ? "bg-sun-yellow text-deep-purple"
                  : "text-white/70"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4 px-4 pb-6 pt-4">
        {/* Job card */}
        <div className="rounded-card border border-border bg-white p-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10.5px] text-muted">{t.jobId}</div>
              <div className="text-[15px] font-extrabold tabular-nums text-ink">
                {JOB.id}
              </div>
            </div>
            <div className="text-right">
              <div className="text-[11px] text-muted">{t.stepLabel}</div>
              <div className="text-[12px] font-semibold text-royal-purple">
                {t.terrace}
              </div>
            </div>
          </div>
          <div className="mt-2.5 flex items-center gap-3 border-t border-border pt-2.5">
            <span className="flex items-center gap-1 text-[11px] text-muted">
              <Camera size={13} className="text-royal-purple" /> {t.photosTaken}
            </span>
            <span className="flex items-center gap-1 text-[11px] text-muted">
              <Gauge size={13} className="text-royal-purple" /> {t.readingsTaken}
            </span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 rounded-lg bg-attention/10 px-2 py-1.5">
            <AlertTriangle size={12} className="shrink-0 text-attention" />
            <span className="text-[11px] font-semibold text-attention">
              {t.highPoints}
            </span>
          </div>
        </div>

        {/* The one question this screen asks */}
        <div>
          <h1 className="text-[19px] font-extrabold leading-tight text-ink">
            {t.chooseVerdict}
          </h1>
          <p className="mt-1 text-[12px] leading-snug text-muted">
            {t.chooseOne}
          </p>
        </div>

        {/* Three big targets */}
        <div className="space-y-2.5">
          {options.map((o) => {
            const Icon = o.icon;
            const on = pick === o.key;
            return (
              <button
                key={o.key}
                onClick={() => !signed && setPick(o.key)}
                className="flex w-full items-center gap-3 rounded-card p-3 text-left transition"
                style={{
                  background: on ? o.bg : "#FFFFFF",
                  border: `1.5px solid ${on ? o.bg : "#D9CDEE"}`,
                  boxShadow: on ? "0 6px 18px -8px rgba(0,0,0,0.5)" : "none",
                }}
              >
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                  style={{
                    background: on ? "rgba(255,255,255,0.18)" : "#F1EAFB",
                  }}
                >
                  <Icon size={22} className={on ? "text-white" : "text-royal-purple"} />
                </span>
                <span className="min-w-0 flex-1">
                  <span
                    className={`block text-[15px] font-extrabold leading-tight ${
                      on ? "text-white" : "text-ink"
                    }`}
                  >
                    {o.label}
                  </span>
                  <span
                    className={`mt-0.5 block text-[11.5px] leading-snug ${
                      on ? "text-white/85" : "text-muted"
                    }`}
                  >
                    {o.sub}
                  </span>
                </span>
                <span
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2"
                  style={{
                    borderColor: on ? "rgba(255,255,255,0.8)" : "#D9CDEE",
                    background: on ? "#FFFFFF" : "transparent",
                  }}
                >
                  {on && (
                    <Check size={14} strokeWidth={3} style={{ color: o.bg }} />
                  )}
                </span>
              </button>
            );
          })}
        </div>

        {/* What follows depends on the verdict */}
        {pick === "struct" && (
          <div className="rounded-card border-[1.5px] border-attention bg-attention/10 p-3">
            <div className="flex items-center gap-2">
              <AlertTriangle size={17} className="shrink-0 text-attention" />
              <span className="text-[14px] font-extrabold text-attention">
                {t.quoteBlocked}
              </span>
            </div>
            <p className="mt-1.5 text-[12px] leading-snug text-ink">
              {t.blockedWhy}
            </p>
            <button className="mt-3 flex h-[46px] w-full items-center justify-center gap-2 rounded-full bg-attention text-[14px] font-semibold text-white">
              <Send size={16} /> {t.sendToCoe}
            </button>
          </div>
        )}

        {pick === "plumb" && (
          <div className="rounded-card border-[1.5px] border-stop bg-stop/8 p-3">
            <div className="text-[14px] font-extrabold text-stop">
              {t.noSale}
            </div>
            <p className="mt-1 text-[12px] leading-snug text-ink">
              {t.noSaleWhy}
            </p>
            <div className="mt-2.5 flex items-center gap-2 rounded-lg bg-white px-2.5 py-2">
              <IndianRupee size={14} className="shrink-0 text-pass" />
              <span className="text-[11.5px] font-semibold text-pass">
                {t.payPerJob} · {t.honestBonus}
              </span>
            </div>
          </div>
        )}

        {pick === "water" && (
          <div className="rounded-card border border-border bg-white p-3">
            <div className="flex items-center justify-between">
              <span className="text-[13.5px] font-semibold text-ink">
                {t.suggested}
              </span>
              <AiChip />
            </div>
            <p className="mt-1 text-[11px] text-muted">{t.aiSuggest}</p>
            <div className="mt-2.5 space-y-1.5">
              {t.systemSteps.map((step, i) => (
                <div
                  key={step}
                  className="flex items-center gap-2.5 rounded-lg bg-surface px-2.5 py-2"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-royal-purple text-[11px] font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="flex-1 text-[12.5px] font-semibold text-ink">
                    {step}
                  </span>
                  <Pencil size={14} className="shrink-0 text-muted" />
                </div>
              ))}
            </div>
            <p className="mt-2 text-[11px] text-muted">{t.checkEdit}</p>
          </div>
        )}

        {/* Signature */}
        {pick !== "struct" && (
          <div className="rounded-card border border-border bg-white p-3">
            <div className="text-[13px] font-semibold text-ink">
              {t.signTitle}
            </div>
            <div className="mt-2 flex h-[72px] items-center justify-center rounded-lg border border-dashed border-border bg-surface">
              {signed ? (
                <motion.span
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="signature-stroke text-[30px] text-deep-purple"
                >
                  {JOB.technician.name.split(" ")[0]}
                </motion.span>
              ) : (
                <span className="text-[11.5px] text-muted">{t.signHint}</span>
              )}
            </div>
            <div className="mt-2 text-[10.5px] text-muted">
              {JOB.technician.name} · {t.certNo} {JOB.technician.certificate}
            </div>

            <div className="mt-3 flex items-center gap-2.5">
              <HoldPointLock number={1} passed={signed} size={40} />
              <button
                onClick={() => setSigned(true)}
                disabled={signed}
                className={`flex h-[50px] flex-1 items-center justify-center gap-2 rounded-full text-[14.5px] font-extrabold transition ${
                  signed
                    ? "bg-pass text-white"
                    : "bg-sun-yellow text-deep-purple"
                }`}
              >
                {signed ? (
                  <>
                    <Check size={18} strokeWidth={3} /> {t.signedButton}
                  </>
                ) : (
                  t.signButton
                )}
              </button>
            </div>

            {signed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-2.5 rounded-lg bg-pass/10 px-2.5 py-2 text-center"
              >
                <div className="text-[12px] font-extrabold text-pass">
                  {t.holdPassed}
                </div>
                <div className="text-[10.5px] text-muted">{t.customerSees}</div>
              </motion.div>
            )}
          </div>
        )}

        {/* Call for help — always within reach on a roof */}
        <button className="flex w-full items-center gap-2.5 rounded-card border border-border bg-white p-3 text-left">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-lilac">
            <Phone size={16} className="text-royal-purple" />
          </span>
          <span className="flex-1 text-[13px] font-semibold text-ink">
            {t.callSupervisor}
          </span>
          <ChevronRight size={16} className="shrink-0 text-muted" />
        </button>
      </div>

      {/* Contractor's own bottom bar — five jobs-to-be-done, not the
          customer's four */}
      <nav className="sticky bottom-0 z-20 grid grid-cols-4 border-t border-border bg-deep-purple px-1 py-2">
        {[
          { icon: Briefcase, label: t.jobs, on: true },
          { icon: ListChecks, label: t.checklist },
          { icon: Wallet, label: t.earnings },
          { icon: LifeBuoy, label: t.help },
        ].map((b) => {
          const Icon = b.icon;
          return (
            <div
              key={b.label}
              className="flex flex-col items-center gap-0.5 py-0.5"
            >
              <Icon
                size={19}
                strokeWidth={b.on ? 2.4 : 1.9}
                className={b.on ? "text-sun-yellow" : "text-white/55"}
              />
              <span
                className={`text-[9.5px] ${
                  b.on ? "font-semibold text-sun-yellow" : "text-white/55"
                }`}
              >
                {b.label}
              </span>
            </div>
          );
        })}
      </nav>
    </PhoneFrame>
  );
}
