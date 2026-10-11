import { JOB } from "@/lib/job";

export function JobIdPill({
  prefix = "",
  className = "",
}: {
  prefix?: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full bg-sun-yellow px-3 py-1 text-[12px] font-semibold text-deep-purple ${className}`}
    >
      {prefix}
      {JOB.id}
    </span>
  );
}
