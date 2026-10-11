"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight, Grid3x3, Eye, EyeOff } from "lucide-react";

// Storyboard order — the eight screens as they appear in the presentation,
// plus the two interaction/edge screens worth demoing.
const ORDER = [
  "/customer", // 1  Home
  "/customer/triage", // 2  Free photo check
  "/customer/verdict", // 3  Verdict
  "/customer/quote", // 4  Price and approval
  "/customer/progress", // 5  Progress report
  "/customer/passport", // 6  Passport
  "/contractor/verdict", // 7  Contractor app
  "/command", // 8  Command centre
];

export function DemoNav() {
  const router = useRouter();
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);

  const idx = ORDER.indexOf(pathname);

  // The showcase board is its own thing — no floating controls there.
  const onBoard = pathname === "/";

  const go = useCallback(
    (delta: number) => {
      if (idx === -1) return;
      const next = ORDER[(idx + delta + ORDER.length) % ORDER.length];
      router.push(next);
    },
    [idx, router]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key.toLowerCase() === "h") setHidden((h) => !h);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  if (onBoard) return null;

  if (hidden) {
    return (
      <button
        onClick={() => setHidden(false)}
        className="fixed bottom-4 left-4 z-50 hidden h-9 w-9 items-center justify-center rounded-full bg-deep-purple/70 text-white shadow-lg sm:flex"
        title="Show demo controls (H)"
      >
        <Eye size={18} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 hidden items-center gap-0.5 rounded-full bg-deep-purple/95 px-1.5 py-1.5 text-white shadow-xl backdrop-blur sm:flex">
      <button
        onClick={() => router.push("/")}
        className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-white/10"
        title="Showcase board"
      >
        <Grid3x3 size={16} />
      </button>
      <div className="mx-0.5 h-4 w-px bg-white/20" />
      <button
        onClick={() => go(-1)}
        className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-white/10"
        title="Previous (←)"
      >
        <ChevronLeft size={18} />
      </button>
      <span className="min-w-[38px] text-center text-[11px] font-semibold tabular-nums">
        {idx === -1 ? "—" : `${idx + 1} / ${ORDER.length}`}
      </span>
      <button
        onClick={() => go(1)}
        className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-white/10"
        title="Next (→)"
      >
        <ChevronRight size={18} />
      </button>
      <div className="mx-0.5 h-4 w-px bg-white/20" />
      <button
        onClick={() => setHidden(true)}
        className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-white/10"
        title="Hide for screenshots (H)"
      >
        <EyeOff size={16} />
      </button>
    </div>
  );
}
