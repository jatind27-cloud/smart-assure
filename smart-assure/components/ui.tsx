"use client";

import Link from "next/link";
import { ChevronLeft, Star } from "lucide-react";

// ── Containers ────────────────────────────────────────────────────────────

export function Card({
  children,
  className = "",
  pad = "p-3.5",
}: {
  children: React.ReactNode;
  className?: string;
  pad?: string;
}) {
  return (
    <div
      className={`rounded-card border border-border bg-white ${pad} ${className}`}
    >
      {children}
    </div>
  );
}

// Section heading. Sentence case, with an optional action on the right —
// no tracked-out capitals, because a homeowner is reading this, not a designer.
export function Section({
  title,
  action,
  children,
  className = "",
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={className}>
      <div className="mb-2 flex items-baseline justify-between">
        <h2 className="text-[15px] font-semibold text-ink">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

// ── App bars ──────────────────────────────────────────────────────────────

export function TopBar({
  title,
  subtitle,
  back,
  right,
}: {
  title: string;
  subtitle?: string;
  back?: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="sticky top-0 z-20 flex items-center gap-2.5 border-b border-border bg-white/95 px-4 py-3 backdrop-blur">
      {back && (
        <Link
          href={back}
          className="-ml-1.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-ink hover:bg-lilac"
          aria-label="Back"
        >
          <ChevronLeft size={20} />
        </Link>
      )}
      <div className="min-w-0 flex-1">
        <div className="truncate text-[16px] font-semibold leading-tight text-ink">
          {title}
        </div>
        {subtitle && (
          <div className="truncate text-[11.5px] text-muted">{subtitle}</div>
        )}
      </div>
      {right}
    </div>
  );
}

// ── Buttons ───────────────────────────────────────────────────────────────

export function PrimaryButton({
  children,
  href,
  onClick,
  disabled = false,
  tone = "purple",
  size = "lg",
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  tone?: "purple" | "yellow" | "green";
  size?: "lg" | "md";
}) {
  const h = size === "lg" ? "h-[48px] text-[14.5px]" : "h-[40px] text-[13.5px]";
  const color =
    tone === "yellow"
      ? "bg-sun-yellow text-deep-purple"
      : tone === "green"
      ? "bg-pass text-white"
      : "bg-royal-purple text-white";
  const cls = `flex ${h} w-full items-center justify-center gap-2 rounded-full font-semibold transition active:scale-[0.99] disabled:opacity-40 ${color}`;

  if (href && !disabled)
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  return (
    <button onClick={onClick} disabled={disabled} className={cls}>
      {children}
    </button>
  );
}

export function GhostButton({
  children,
  href,
  onClick,
  size = "lg",
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  size?: "lg" | "md";
}) {
  const h = size === "lg" ? "h-[46px] text-[14.5px]" : "h-[38px] text-[13px]";
  const cls = `flex ${h} w-full items-center justify-center gap-2 rounded-full border border-border bg-white font-semibold text-royal-purple transition active:scale-[0.99]`;
  if (href)
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  return (
    <button onClick={onClick} className={cls}>
      {children}
    </button>
  );
}

// ── Small parts ───────────────────────────────────────────────────────────

export function Pill({
  children,
  tone = "lilac",
}: {
  children: React.ReactNode;
  tone?: "lilac" | "green" | "yellow" | "red" | "orange" | "white" | "ghost";
}) {
  const map: Record<string, string> = {
    lilac: "bg-lilac text-royal-purple",
    green: "bg-pass/12 text-pass",
    yellow: "bg-sun-yellow text-deep-purple",
    red: "bg-stop/12 text-stop",
    orange: "bg-attention/15 text-attention",
    white: "bg-white text-deep-purple",
    ghost: "bg-white/12 text-white",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-semibold ${map[tone]}`}
    >
      {children}
    </span>
  );
}

export function Stars({ n, size = 11 }: { n: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          className={
            i <= Math.round(n) ? "fill-sun-yellow text-sun-yellow" : "text-border"
          }
        />
      ))}
    </span>
  );
}

// A labelled bar, used for moisture readings and capacity.
export function Meter({
  pct,
  tone = "water",
}: {
  pct: number;
  tone?: "water" | "attention" | "pass" | "purple";
}) {
  const bg = {
    water: "#3D8FDC",
    attention: "#F28C28",
    pass: "#1E8E3E",
    purple: "#4B2A8C",
  }[tone];
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-lilac-2">
      <div
        className="h-full rounded-full"
        style={{ width: `${Math.min(pct, 100)}%`, background: bg }}
      />
    </div>
  );
}

// Key-value row, for dense spec lists.
export function Row({
  k,
  v,
  strong = false,
}: {
  k: string;
  v: React.ReactNode;
  strong?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-3 py-1">
      <span className="text-[12.5px] text-muted">{k}</span>
      <span
        className={`text-right text-[12.5px] ${
          strong ? "font-semibold text-ink" : "text-ink"
        }`}
      >
        {v}
      </span>
    </div>
  );
}
