"use client";

import { useMemo, useState } from "react";
import {
  CITIES,
  ROUTING,
  HOLDS,
  REVIEWS,
  CLAIMS,
  PARTNERS,
  TABS,
  lakh,
  type CityId,
  type Tab,
} from "@/lib/mock";
import {
  LayoutGrid,
  Route,
  Lock,
  Search,
  FileWarning,
  Users,
  Droplet,
  Check,
  X,
  AlertTriangle,
  Info,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  ChevronDown,
} from "lucide-react";

// Screen 8 — The internal command centre.
// Six tabs, all live. Switch city at the top and every number, table and alert
// follows. This is where Asian Paints decides whether a city has earned the
// right to grow: four gates, and nothing scales until all four pass.
const TAB_ICONS = {
  "City overview": LayoutGrid,
  Routing: Route,
  "Hold points": Lock,
  Review: Search,
  Claims: FileWarning,
  Partners: Users,
} as const;

export default function CommandCentre() {
  const [tab, setTab] = useState<Tab>("City overview");
  const [cityId, setCityId] = useState<CityId>("pune");
  const city = CITIES.find((c) => c.id === cityId)!;

  // Tab badge counts, so the rail tells you where the work is
  const counts = useMemo(
    () => ({
      Routing: ROUTING.filter((r) => r.city === cityId).length,
      "Hold points": HOLDS.filter(
        (h) => h.city === cityId && h.state !== "Passed"
      ).length,
      Review: REVIEWS.filter((r) => r.city === cityId).length,
      Claims: CLAIMS.filter((c) => c.city === cityId && c.status !== "Reworked")
        .length,
      Partners: PARTNERS.filter((p) => p.city === cityId).length,
    }),
    [cityId]
  );

  return (
    <div className="min-h-[100dvh] bg-dark-bg text-white">
      <div className="mx-auto flex min-h-[100dvh] w-full max-w-[1500px] flex-col lg:flex-row">
        {/* ── Left rail ─────────────────────────────────────────────────── */}
        <aside className="shrink-0 border-b border-white/10 p-4 lg:w-[232px] lg:border-b-0 lg:border-r lg:p-5">
          <div className="mb-6 flex items-center gap-2">
            <Droplet size={18} className="text-sun-yellow" fill="#FFD23F" />
            <div>
              <div className="text-[13.5px] font-extrabold leading-none">
                SmartCare Assure
              </div>
              <div className="mt-0.5 text-[10px] text-white/45">
                Command centre
              </div>
            </div>
          </div>

          <nav className="flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
            {TABS.map((tname) => {
              const Icon = TAB_ICONS[tname];
              const on = tab === tname;
              const badge = counts[tname as keyof typeof counts];
              return (
                <button
                  key={tname}
                  onClick={() => setTab(tname)}
                  className={`flex shrink-0 items-center gap-2.5 rounded-lg px-3 py-2.5 text-[12.5px] transition ${
                    on
                      ? "bg-white/12 font-semibold text-white"
                      : "text-white/55 hover:bg-white/5 hover:text-white/80"
                  }`}
                >
                  <Icon size={16} className={on ? "text-sun-yellow" : ""} />
                  <span className="whitespace-nowrap">{tname}</span>
                  {badge ? (
                    <span
                      className={`ml-auto hidden rounded-full px-1.5 text-[10px] font-bold tabular-nums lg:block ${
                        on
                          ? "bg-sun-yellow text-deep-purple"
                          : "bg-white/10 text-white/60"
                      }`}
                    >
                      {badge}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>

          {/* Gate summary, visible on every tab */}
          <div className="mt-6 hidden rounded-xl border border-white/10 bg-white/5 p-3 lg:block">
            <div className="text-[10.5px] text-white/50">Gates passing</div>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-[22px] font-extrabold leading-none">
                {city.gates.filter((g) => g.pass).length}
              </span>
              <span className="text-[12px] text-white/50">
                of {city.gates.length}
              </span>
            </div>
            <div className="mt-2 flex gap-1">
              {city.gates.map((g) => (
                <div
                  key={g.title}
                  className="h-1.5 flex-1 rounded-full"
                  style={{ background: g.pass ? "#1E8E3E" : "#B3261E" }}
                  title={g.title}
                />
              ))}
            </div>
            <p className="mt-2 text-[10px] leading-snug text-white/45">
              {city.gates.every((g) => g.pass)
                ? "All gates pass. This city can take more partners."
                : "A gate is failing. Hold expansion here."}
            </p>
          </div>
        </aside>

        {/* ── Main ──────────────────────────────────────────────────────── */}
        <main className="min-w-0 flex-1 p-4 lg:p-7">
          {/* Header */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 p-1">
                {CITIES.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setCityId(c.id)}
                    className={`rounded-full px-3 py-1.5 text-[12.5px] font-semibold transition ${
                      c.id === cityId
                        ? "bg-sun-yellow text-deep-purple"
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
              <div>
                <div className="text-[17px] font-extrabold leading-none">
                  {city.name}
                </div>
                <div className="mt-1 text-[10.5px] text-white/50">
                  {city.stage} · {city.live}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10.5px] font-semibold text-white/70">
                Illustrative data
              </span>
              <button className="flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-[11.5px] text-white/70">
                <Clock size={12} /> Last 30 days
                <ChevronDown size={12} />
              </button>
            </div>
          </div>

          {tab === "City overview" && <Overview city={city} />}
          {tab === "Routing" && <RoutingTab cityId={cityId} />}
          {tab === "Hold points" && <HoldsTab cityId={cityId} />}
          {tab === "Review" && <ReviewTab cityId={cityId} />}
          {tab === "Claims" && <ClaimsTab cityId={cityId} />}
          {tab === "Partners" && <PartnersTab cityId={cityId} />}
        </main>
      </div>
    </div>
  );
}

// ── Shared chrome ──────────────────────────────────────────────────────────

function Panel({
  title,
  right,
  children,
  className = "",
}: {
  title?: string;
  right?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-card border border-white/10 bg-white/5 ${className}`}
    >
      {title && (
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
          <h2 className="text-[12.5px] font-semibold text-white/85">{title}</h2>
          {right}
        </div>
      )}
      {children}
    </section>
  );
}

function Th({ children, right = false }: { children: React.ReactNode; right?: boolean }) {
  return (
    <th
      className={`whitespace-nowrap px-3 py-2 text-[10px] font-semibold text-white/45 ${
        right ? "text-right" : "text-left"
      }`}
    >
      {children}
    </th>
  );
}

function Td({
  children,
  right = false,
  className = "",
}: {
  children: React.ReactNode;
  right?: boolean;
  className?: string;
}) {
  return (
    <td
      className={`whitespace-nowrap px-3 py-2.5 text-[11.5px] ${
        right ? "text-right" : ""
      } ${className}`}
    >
      {children}
    </td>
  );
}

function StateChip({
  label,
  tone,
}: {
  label: string;
  tone: "pass" | "stop" | "warn" | "mute";
}) {
  const map = {
    pass: "bg-pass/18 text-[#7BE49A]",
    stop: "bg-stop/22 text-[#FF9B93]",
    warn: "bg-attention/20 text-[#FFC27A]",
    mute: "bg-white/10 text-white/60",
  };
  return (
    <span
      className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold ${map[tone]}`}
    >
      {label}
    </span>
  );
}

// ── Tab 1: City overview ───────────────────────────────────────────────────

function Overview({ city }: { city: (typeof CITIES)[number] }) {
  const toBreakeven = city.breakeven - city.jobsDone;

  return (
    <div className="space-y-5">
      {/* Gates */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {city.gates.map((g) => (
          <div
            key={g.title}
            className="rounded-card border border-white/10 bg-white/5 p-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-semibold text-white/75">
                {g.title}
              </span>
              <StateChip
                label={g.pass ? "Pass" : "Fail"}
                tone={g.pass ? "pass" : "stop"}
              />
            </div>
            <Gauge value={g.value} unit={g.unit} pass={g.pass} />
            <div className="mt-2 text-[11px] leading-snug text-white/60">
              {g.metric}
            </div>
            <div className="mt-1 text-[10.5px] text-white/40">{g.target}</div>
            <div className="mt-2 border-t border-white/10 pt-2 text-[10.5px] text-white/50">
              {g.note}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        {/* Breakeven + money */}
        <Panel title="Path to breakeven" className="xl:col-span-2">
          <div className="p-4">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <div className="text-[28px] font-extrabold leading-none tabular-nums">
                  {city.jobsDone}
                </div>
                <div className="mt-1 text-[11px] text-white/50">
                  jobs completed of {city.breakeven} needed
                </div>
              </div>
              <div className="flex gap-5">
                <div>
                  <div className="text-[11px] text-white/45">Revenue</div>
                  <div className="text-[15px] font-bold tabular-nums">
                    {lakh(city.revenue)}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-white/45">Contribution</div>
                  <div
                    className="flex items-center gap-1 text-[15px] font-bold tabular-nums"
                    style={{ color: city.contribution >= 0 ? "#7BE49A" : "#FF9B93" }}
                  >
                    {city.contribution >= 0 ? (
                      <ArrowUpRight size={14} />
                    ) : (
                      <ArrowDownRight size={14} />
                    )}
                    {lakh(city.contribution)}
                  </div>
                </div>
              </div>
            </div>

            <div className="relative mt-4 h-3.5 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-sun-yellow"
                style={{
                  width: `${Math.min(
                    (city.jobsDone / city.breakeven) * 100,
                    100
                  )}%`,
                }}
              />
            </div>
            <div className="mt-2 text-[11px] text-white/50">
              {toBreakeven > 0
                ? `${toBreakeven} more jobs to cover city fixed cost`
                : "Past breakeven"}
            </div>

            {/* Trend */}
            <div className="mt-5 border-t border-white/10 pt-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[11.5px] font-semibold text-white/75">
                  Jobs completed per month
                </span>
                <span className="text-[10.5px] text-white/45">
                  Last 12 months
                </span>
              </div>
              <Bars data={city.trend} />
            </div>
          </div>
        </Panel>

        {/* Alerts */}
        <Panel title="Needs a decision today">
          <div className="divide-y divide-white/10">
            {city.alerts.map((a) => {
              const Icon =
                a.level === "stop"
                  ? AlertTriangle
                  : a.level === "warn"
                  ? Clock
                  : Info;
              const color =
                a.level === "stop"
                  ? "#FF9B93"
                  : a.level === "warn"
                  ? "#FFC27A"
                  : "#9FD0FF";
              return (
                <div key={a.text} className="flex gap-2.5 px-4 py-3">
                  <Icon size={14} className="mt-0.5 shrink-0" style={{ color }} />
                  <div className="min-w-0">
                    <p className="text-[11.5px] leading-snug text-white/85">
                      {a.text}
                    </p>
                    <div className="mt-1 text-[10px] text-white/40">{a.when}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </Panel>
      </div>

      {/* Funnel */}
      <Panel
        title="Funnel"
        right={
          <span className="text-[10.5px] text-white/45">
            Requests through to warranty
          </span>
        }
      >
        <div className="grid grid-cols-2 gap-px bg-white/10 sm:grid-cols-4 lg:grid-cols-7">
          {city.funnel.map((f, i) => {
            const prev = i > 0 ? city.funnel[i - 1].count : null;
            const drop = prev ? prev - f.count : 0;
            const keep = prev ? Math.round((f.count / prev) * 100) : 100;
            return (
              <div key={f.label} className="bg-dark-bg px-3 py-3">
                <div className="text-[19px] font-extrabold leading-none tabular-nums">
                  {f.count}
                </div>
                <div className="mt-1 text-[10.5px] text-white/55">{f.label}</div>
                {prev && (
                  <div className="mt-1.5 flex items-center gap-1 text-[10px]">
                    <span className="text-white/35">{keep}% kept</span>
                    <span className="text-[#FF9B93]">−{drop}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Panel>
    </div>
  );
}

function Gauge({
  value,
  unit,
  pass,
}: {
  value: number;
  unit: string;
  pass: boolean;
}) {
  const pct = Math.min(value, 100);
  const len = 157;
  return (
    <div className="relative mx-auto mt-3 h-[62px] w-[128px]">
      <svg viewBox="0 0 120 62" className="h-full w-full">
        <path
          d="M 10 58 A 50 50 0 0 1 110 58"
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="9"
          strokeLinecap="round"
        />
        <path
          d="M 10 58 A 50 50 0 0 1 110 58"
          fill="none"
          stroke={pass ? "#1E8E3E" : "#B3261E"}
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={`${(pct / 100) * len} ${len}`}
        />
      </svg>
      <div className="absolute inset-x-0 bottom-0 text-center">
        <span className="text-[21px] font-extrabold tabular-nums">
          {value}
          <span className="text-[13px]">{unit}</span>
        </span>
      </div>
    </div>
  );
}

function Bars({ data }: { data: number[] }) {
  const max = Math.max(...data, 1);
  const months = ["N", "D", "J", "F", "M", "A", "M", "J", "J", "A", "S", "O"];
  return (
    <div className="flex h-[78px] gap-1.5">
      {data.map((v, i) => (
        <div key={i} className="flex h-full flex-1 flex-col justify-end gap-1">
          <div
            className="w-full rounded-t"
            style={{
              height: Math.max((v / max) * 58, v > 0 ? 3 : 1),
              background: i === data.length - 1 ? "#FFD23F" : "#7A3FD1",
            }}
            title={`${v} jobs`}
          />
          <span className="text-center text-[8.5px] text-white/35">
            {months[i]}
          </span>
        </div>
      ))}
    </div>
  );
}

// ── Tab 2: Routing ─────────────────────────────────────────────────────────

function RoutingTab({ cityId }: { cityId: CityId }) {
  const [filter, setFilter] = useState<string>("All");
  const rows = ROUTING.filter((r) => r.city === cityId).filter(
    (r) => filter === "All" || r.route === filter
  );
  const filters = ["All", "Inspect", "Plumber", "Structural", "Self-serve"];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-1.5">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-3 py-1.5 text-[11.5px] font-semibold transition ${
              filter === f
                ? "bg-sun-yellow text-deep-purple"
                : "border border-white/15 text-white/60 hover:text-white"
            }`}
          >
            {f}
            {f !== "All" && (
              <span className="ml-1.5 text-[10px] opacity-60">
                {ROUTING.filter((r) => r.city === cityId && r.route === f).length}
              </span>
            )}
          </button>
        ))}
      </div>

      <Panel
        title="Live queue"
        right={
          <span className="text-[10.5px] text-white/45">
            AI routes, a technician confirms on site
          </span>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-white/10">
              <tr>
                <Th>Job</Th>
                <Th>Locality</Th>
                <Th>Surface</Th>
                <Th>What they reported</Th>
                <Th>Routed to</Th>
                <Th right>Confidence</Th>
                <Th>Assigned</Th>
                <Th right>Visit SLA</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.07]">
              {rows.map((r) => (
                <tr key={r.id} className="hover:bg-white/[0.04]">
                  <Td className="font-semibold tabular-nums">{r.id}</Td>
                  <Td>{r.locality}</Td>
                  <Td className="text-white/70">{r.surface}</Td>
                  <Td className="text-white/60">{r.symptom}</Td>
                  <Td>
                    <StateChip
                      label={r.route}
                      tone={
                        r.route === "Inspect"
                          ? "pass"
                          : r.route === "Structural"
                          ? "warn"
                          : "mute"
                      }
                    />
                  </Td>
                  <Td right>
                    <span
                      className="font-semibold tabular-nums"
                      style={{
                        color:
                          r.confidence >= 85
                            ? "#7BE49A"
                            : r.confidence >= 75
                            ? "#FFC27A"
                            : "#FF9B93",
                      }}
                    >
                      {r.confidence}%
                    </span>
                  </Td>
                  <Td
                    className={
                      r.partner === "Unassigned"
                        ? "text-[#FFC27A]"
                        : "text-white/70"
                    }
                  >
                    {r.partner}
                  </Td>
                  <Td right className={r.slaLate ? "text-[#FF9B93]" : "text-white/60"}>
                    {r.sla}
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
          {rows.length === 0 && (
            <div className="px-4 py-8 text-center text-[11.5px] text-white/40">
              Nothing in this bucket right now.
            </div>
          )}
        </div>
      </Panel>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          { k: "Routed without a visit", v: "22%", d: "Plumber or self-serve" },
          { k: "Average time to route", v: "4 min", d: "From photos received" },
          { k: "Routing overturned on site", v: "7%", d: "Technician disagreed" },
          { k: "Visits inside SLA", v: "91%", d: "Target 90%" },
        ].map((s) => (
          <div
            key={s.k}
            className="rounded-card border border-white/10 bg-white/5 p-3.5"
          >
            <div className="text-[19px] font-extrabold leading-none tabular-nums">
              {s.v}
            </div>
            <div className="mt-1.5 text-[11px] text-white/65">{s.k}</div>
            <div className="text-[10px] text-white/40">{s.d}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Tab 3: Hold points ─────────────────────────────────────────────────────

function HoldsTab({ cityId }: { cityId: CityId }) {
  const rows = HOLDS.filter((h) => h.city === cityId);
  const pending = rows.filter((r) => r.state === "Pending");
  const back = rows.filter((r) => r.state === "Sent back");

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          { k: "Pending now", v: pending.length, tone: "#FFC27A" },
          { k: "Sent back this week", v: back.length, tone: "#FF9B93" },
          { k: "Passed first time", v: "94%", tone: "#7BE49A" },
          { k: "Average time to pass", v: "6 h", tone: "#FFFFFF" },
        ].map((s) => (
          <div
            key={s.k}
            className="rounded-card border border-white/10 bg-white/5 p-3.5"
          >
            <div
              className="text-[22px] font-extrabold leading-none tabular-nums"
              style={{ color: s.tone }}
            >
              {s.v}
            </div>
            <div className="mt-1.5 text-[11px] text-white/60">{s.k}</div>
          </div>
        ))}
      </div>

      <Panel
        title="Every hold point on every open job"
        right={
          <span className="text-[10.5px] text-white/45">
            A job cannot move until its hold point passes
          </span>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-white/10">
              <tr>
                <Th>Job</Th>
                <Th>Hold point</Th>
                <Th>Step</Th>
                <Th>Who signs</Th>
                <Th>State</Th>
                <Th right>Waiting</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.07]">
              {rows.map((h) => (
                <tr key={h.job + h.hp} className="hover:bg-white/[0.04]">
                  <Td className="font-semibold tabular-nums">{h.job}</Td>
                  <Td>
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-sun-yellow text-[10px] font-bold text-deep-purple">
                      {h.hp}
                    </span>
                  </Td>
                  <Td className="text-white/70">{h.step}</Td>
                  <Td className="text-white/70">{h.partner}</Td>
                  <Td>
                    <StateChip
                      label={h.state}
                      tone={
                        h.state === "Passed"
                          ? "pass"
                          : h.state === "Sent back"
                          ? "stop"
                          : "warn"
                      }
                    />
                  </Td>
                  <Td
                    right
                    className={
                      parseInt(h.age) > 24 && h.age.includes("h")
                        ? "text-[#FF9B93]"
                        : "text-white/60"
                    }
                  >
                    {h.age}
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <Panel title="Why hold points get sent back">
        <div className="grid grid-cols-1 gap-px bg-white/10 sm:grid-cols-3">
          {[
            { r: "Photos unclear or missing", n: 41 },
            { r: "Surface prep not to spec", n: 34 },
            { r: "Wrong batch on site", n: 25 },
          ].map((x) => (
            <div key={x.r} className="bg-dark-bg p-4">
              <div className="text-[19px] font-extrabold tabular-nums">
                {x.n}%
              </div>
              <div className="mt-1 text-[11px] text-white/60">{x.r}</div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-violet"
                  style={{ width: `${x.n}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

// ── Tab 4: Review ──────────────────────────────────────────────────────────

function ReviewTab({ cityId }: { cityId: CityId }) {
  const rows = REVIEWS.filter((r) => r.city === cityId);
  const [decided, setDecided] = useState<Record<string, "tech" | "ai">>({});
  const left = rows.filter((r) => !decided[r.job]).length;

  return (
    <div className="space-y-4">
      <Panel
        title="Diagnoses a human has to settle"
        right={
          <span className="text-[10.5px] text-white/45">
            {left} of {rows.length} still open
          </span>
        }
      >
        <div className="p-4">
          <p className="mb-4 text-[11.5px] leading-snug text-white/55">
            Three things land here: the technician disagreed with the routing, the
            model was unsure, or the customer asked for a second opinion. A
            person decides, and the decision trains the next version.
          </p>

          {rows.length === 0 ? (
            <div className="py-6 text-center text-[11.5px] text-white/40">
              Nothing to review in this city.
            </div>
          ) : (
            <div className="space-y-3">
              {rows.map((r) => {
                const d = decided[r.job];
                return (
                  <div
                    key={r.job}
                    className="rounded-xl border border-white/10 bg-dark-bg p-3.5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className="text-[12.5px] font-semibold tabular-nums">
                          {r.job}
                        </span>
                        <StateChip
                          label={`${r.confidence}% confidence`}
                          tone={r.confidence >= 75 ? "warn" : "stop"}
                        />
                      </div>
                      {d && (
                        <StateChip
                          label={
                            d === "tech"
                              ? "Technician upheld"
                              : "Routing upheld"
                          }
                          tone="pass"
                        />
                      )}
                    </div>

                    <div className="mt-1.5 text-[11px] text-white/45">
                      {r.flag}
                    </div>

                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                      <div className="rounded-lg border border-white/10 bg-white/[0.04] p-2.5">
                        <div className="text-[10px] text-white/45">
                          The model routed it as
                        </div>
                        <div className="mt-0.5 text-[12px] font-semibold">
                          {r.aiSaid}
                        </div>
                      </div>
                      <div className="rounded-lg border border-white/10 bg-white/[0.04] p-2.5">
                        <div className="text-[10px] text-white/45">
                          The technician on site said
                        </div>
                        <div className="mt-0.5 text-[12px] font-semibold">
                          {r.techSaid}
                        </div>
                      </div>
                    </div>

                    {!d ? (
                      <div className="mt-3 flex flex-wrap gap-2">
                        <button
                          onClick={() =>
                            setDecided((p) => ({ ...p, [r.job]: "tech" }))
                          }
                          className="flex items-center gap-1.5 rounded-full bg-pass px-3.5 py-2 text-[11.5px] font-semibold text-white"
                        >
                          <Check size={13} strokeWidth={3} /> Go with the
                          technician
                        </button>
                        <button
                          onClick={() =>
                            setDecided((p) => ({ ...p, [r.job]: "ai" }))
                          }
                          className="flex items-center gap-1.5 rounded-full border border-white/20 px-3.5 py-2 text-[11.5px] font-semibold text-white/80"
                        >
                          <X size={13} strokeWidth={3} /> Keep the routing
                        </button>
                      </div>
                    ) : (
                      <div className="mt-3 flex items-center gap-1.5 text-[11px] text-[#7BE49A]">
                        <Check size={13} strokeWidth={3} />
                        Settled. Logged against {r.job} and sent to training.
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </Panel>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          { k: "Technician overruled the model", v: "7%", d: "Of all routed jobs" },
          { k: "Model overruled by review", v: "2%", d: "After a human looked" },
          { k: "Average time to settle", v: "9 h", d: "Target under 24 h" },
          { k: "Cases sent to training", v: "118", d: "Since the pilot began" },
        ].map((s) => (
          <div
            key={s.k}
            className="rounded-card border border-white/10 bg-white/5 p-3.5"
          >
            <div className="text-[19px] font-extrabold leading-none tabular-nums">
              {s.v}
            </div>
            <div className="mt-1.5 text-[11px] text-white/65">{s.k}</div>
            <div className="text-[10px] text-white/40">{s.d}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Tab 5: Claims ──────────────────────────────────────────────────────────

function ClaimsTab({ cityId }: { cityId: CityId }) {
  const rows = CLAIMS.filter((c) => c.city === cityId);
  const cost = rows.reduce((s, c) => s + c.cost, 0);
  const ours = rows.filter((c) =>
    ["Our workmanship", "Our diagnosis", "Product"].includes(c.cause)
  ).length;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          { k: "Claims raised", v: rows.length, d: "Last 60 days" },
          { k: "Cost of rework", v: lakh(cost), d: "Material and labour" },
          { k: "Our fault", v: `${ours} of ${rows.length}`, d: "Rest were excluded causes" },
          { k: "Average days to close", v: "11", d: "Promise is 15" },
        ].map((s) => (
          <div
            key={s.k}
            className="rounded-card border border-white/10 bg-white/5 p-3.5"
          >
            <div className="text-[20px] font-extrabold leading-none tabular-nums">
              {s.v}
            </div>
            <div className="mt-1.5 text-[11px] text-white/65">{s.k}</div>
            <div className="text-[10px] text-white/40">{s.d}</div>
          </div>
        ))}
      </div>

      <Panel
        title="Claims"
        right={
          <span className="text-[10.5px] text-white/45">
            Cause decided by re-inspection, not by the customer or the partner
          </span>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-white/10">
              <tr>
                <Th>Claim</Th>
                <Th>Job</Th>
                <Th>Raised</Th>
                <Th>Cause found</Th>
                <Th>Status</Th>
                <Th right>Cost</Th>
                <Th right>Days open</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.07]">
              {rows.map((c) => (
                <tr key={c.id} className="hover:bg-white/[0.04]">
                  <Td className="font-semibold tabular-nums">{c.id}</Td>
                  <Td className="tabular-nums text-white/70">{c.job}</Td>
                  <Td className="text-white/60">{c.raised}</Td>
                  <Td>
                    <StateChip
                      label={c.cause}
                      tone={
                        c.cause === "Not covered"
                          ? "mute"
                          : c.cause === "Under review"
                          ? "warn"
                          : "stop"
                      }
                    />
                  </Td>
                  <Td className="text-white/70">{c.status}</Td>
                  <Td right className="tabular-nums">
                    {c.cost ? lakh(c.cost) : "—"}
                  </Td>
                  <Td right className={c.days > 12 ? "text-[#FFC27A]" : "text-white/60"}>
                    {c.days}
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
          {rows.length === 0 && (
            <div className="px-4 py-8 text-center text-[11.5px] text-white/40">
              No claims in this city yet.
            </div>
          )}
        </div>
      </Panel>

      <Panel title="What claims are teaching us">
        <div className="grid grid-cols-1 gap-px bg-white/10 sm:grid-cols-3">
          {[
            {
              t: "Parapet joints",
              d: "Half of our workmanship claims start at a parapet. Tape is now mandatory on every terrace job, not optional.",
            },
            {
              t: "Monsoon starts",
              d: "Claims spike three weeks into the first rains. We now re-inspect jobs closed in the preceding month.",
            },
            {
              t: "New partners",
              d: "First ten jobs carry twice the claim rate. Those jobs are supervised in person from this month.",
            },
          ].map((x) => (
            <div key={x.t} className="bg-dark-bg p-4">
              <div className="text-[12.5px] font-semibold">{x.t}</div>
              <p className="mt-1 text-[11px] leading-snug text-white/55">
                {x.d}
              </p>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

// ── Tab 6: Partners ────────────────────────────────────────────────────────

function PartnersTab({ cityId }: { cityId: CityId }) {
  const rows = PARTNERS.filter((p) => p.city === cityId).sort(
    (a, b) => b.ftr - a.ftr
  );

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          { k: "Active partners", v: rows.filter((r) => r.state === "Active").length },
          { k: "On watch", v: rows.filter((r) => r.state === "Watch").length },
          { k: "Suspended", v: rows.filter((r) => r.state === "Suspended").length },
          {
            k: "Average capacity used",
            v:
              Math.round(rows.reduce((s, r) => s + r.used, 0) / (rows.length || 1)) +
              "%",
          },
        ].map((s) => (
          <div
            key={s.k}
            className="rounded-card border border-white/10 bg-white/5 p-3.5"
          >
            <div className="text-[22px] font-extrabold leading-none tabular-nums">
              {s.v}
            </div>
            <div className="mt-1.5 text-[11px] text-white/60">{s.k}</div>
          </div>
        ))}
      </div>

      <Panel
        title="Partner table"
        right={
          <span className="text-[10.5px] text-white/45">
            Easy to join, hard to stay. Tier decides what work you can take.
          </span>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-white/10">
              <tr>
                <Th>Partner</Th>
                <Th>ID</Th>
                <Th>Tier</Th>
                <Th right>Right first time</Th>
                <Th right>Jobs</Th>
                <Th right>Rating</Th>
                <Th>Capacity used</Th>
                <Th>Certified till</Th>
                <Th>State</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.07]">
              {rows.map((p) => (
                <tr key={p.id} className="hover:bg-white/[0.04]">
                  <Td className="font-semibold">{p.name}</Td>
                  <Td className="tabular-nums text-white/60">{p.id}</Td>
                  <Td>
                    <span className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-bold">
                      {p.tier}
                    </span>
                  </Td>
                  <Td right>
                    <span
                      className="font-semibold tabular-nums"
                      style={{
                        color:
                          p.ftr >= 92
                            ? "#7BE49A"
                            : p.ftr >= 85
                            ? "#FFC27A"
                            : "#FF9B93",
                      }}
                    >
                      {p.ftr}%
                    </span>
                  </Td>
                  <Td right className="tabular-nums text-white/70">
                    {p.jobs}
                  </Td>
                  <Td right className="tabular-nums text-white/70">
                    {p.rating}
                  </Td>
                  <Td>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${p.used}%`,
                            background: p.used > 88 ? "#F28C28" : "#7A3FD1",
                          }}
                        />
                      </div>
                      <span className="text-[10.5px] tabular-nums text-white/55">
                        {p.used}%
                      </span>
                    </div>
                  </Td>
                  <Td className="text-white/60">{p.certTill}</Td>
                  <Td>
                    <StateChip
                      label={p.state}
                      tone={
                        p.state === "Active"
                          ? "pass"
                          : p.state === "Watch"
                          ? "warn"
                          : "stop"
                      }
                    />
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <Panel title="The tier ladder">
        <div className="grid grid-cols-1 gap-px bg-white/10 sm:grid-cols-3">
          {[
            {
              t: "T1 Applicator",
              d: "Can execute a specified system under supervision. Cannot diagnose or quote.",
              n: "20 supervised jobs to move up",
            },
            {
              t: "T2 Certified applicator",
              d: "Can execute unsupervised and sign hold point 3. Still cannot diagnose.",
              n: "Right first time above 92% for 50 jobs",
            },
            {
              t: "T3 Diagnostic technician",
              d: "Can inspect, diagnose and sign hold point 1. Paid per diagnosis, not per sale.",
              n: "Assessment plus 100 signed diagnoses",
            },
          ].map((x) => (
            <div key={x.t} className="bg-dark-bg p-4">
              <div className="text-[12.5px] font-semibold">{x.t}</div>
              <p className="mt-1 text-[11px] leading-snug text-white/55">
                {x.d}
              </p>
              <div className="mt-2 text-[10.5px] text-sun-yellow">{x.n}</div>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
