import { JOB } from "@/lib/job";
import { SmartImage } from "@/components/SmartImage";
import { Stars } from "@/components/ui";
import { BadgeCheck } from "lucide-react";

// The counterweight to the AI chip. Wherever the model stops, a person signs:
// face, name, tier, certificate number, signature and the time it was signed.
export function SignedByRow({
  time,
  caption = "Verdict signed by",
}: {
  time?: string;
  caption?: string;
}) {
  const t = JOB.technician;
  return (
    <div className="rounded-card border border-border bg-white p-3.5">
      <div className="text-[11px] text-muted">{caption}</div>
      <div className="mt-2 flex items-center gap-3">
        <SmartImage
          name={t.photo}
          alt={t.name}
          ratio="1 / 1"
          className="w-12"
          rounded="rounded-full"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1">
            <span className="truncate text-[14px] font-semibold text-ink">
              {t.name}
            </span>
            <BadgeCheck size={14} className="shrink-0 text-royal-purple" />
          </div>
          <div className="text-[11.5px] text-muted">{t.tier}</div>
          <div className="mt-0.5 flex items-center gap-1.5">
            <Stars n={t.rating} size={10} />
            <span className="text-[10px] text-muted">
              {t.rating} · {t.jobs} jobs · {t.years} years
            </span>
          </div>
        </div>
        <div className="shrink-0 text-right">
          <div className="signature-stroke text-[22px] leading-none text-deep-purple">
            {t.name.split(" ")[0]}
          </div>
          <div className="mt-1 text-[9.5px] leading-tight text-muted">
            Cert {t.certificate}
            <br />
            {time ?? `${JOB.dates.inspection}, ${JOB.dates.inspectionTime}`}
          </div>
        </div>
      </div>
    </div>
  );
}
