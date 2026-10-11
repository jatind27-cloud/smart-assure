import type { Verdict } from "@/lib/job";

const STYLES: Record<
  Verdict,
  { bg: string; title: string }
> = {
  waterproofing: { bg: "#1E8E3E", title: "Waterproofing problem" },
  plumbing: { bg: "#B3261E", title: "Plumbing or drainage problem" },
  structural: { bg: "#F28C28", title: "Structural problem" },
};

// Full-width rounded banner: green, red or orange. An honest verdict is a
// feature — the red "not a waterproofing problem" uses the same component,
// so it reads as an equal outcome, not an error state.
export function VerdictBanner({
  verdict,
  sub,
}: {
  verdict: Verdict;
  sub: string;
}) {
  const s = STYLES[verdict];
  return (
    <div
      className="rounded-card px-5 py-4 text-white"
      style={{ background: s.bg }}
    >
      <div className="text-[19px] font-extrabold">{s.title}</div>
      <div className="mt-0.5 text-body text-white/90">{sub}</div>
    </div>
  );
}
