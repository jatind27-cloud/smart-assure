import Link from "next/link";
import { JOB, rupees } from "@/lib/job";
import { PhoneFrame } from "@/components/PhoneFrame";
import { BottomTabBar } from "@/components/BottomTabBar";
import { SmartImage } from "@/components/SmartImage";
import { Card, Section, Pill, Stars } from "@/components/ui";
import {
  MapPin,
  ChevronDown,
  Bell,
  Search,
  CloudRain,
  ArrowRight,
  ShieldCheck,
  Users,
  CheckCircle2,
  Camera,
  Stamp,
  Hammer,
  FileCheck,
  ChevronRight,
} from "lucide-react";

// Screen 1 — Home.
// The homeowner arrives with a problem, not a product in mind. So the screen
// opens with their locality and a row of problems to point at, and only then
// offers the three things we can do about it, named in plain words.
export default function CustomerHome() {
  const L = JOB.locality;

  const problems = [
    { label: "Patch on the ceiling", img: "problem-ceiling.jpg", common: true },
    { label: "Damp or peeling wall", img: "problem-wall.jpg" },
    { label: "Terrace or roof leak", img: "problem-terrace.jpg" },
    { label: "Damp near a bathroom", img: "problem-bathroom.jpg" },
  ];

  const plans = [
    {
      name: "Find the problem",
      sub: "Assure Check",
      price: `${rupees(JOB.inspectionFee)} visit`,
      note: "Credited to your repair",
      body: "A technician inspects, takes moisture readings and gives you a signed verdict in writing.",
      icon: Search,
      href: "/customer/triage",
      cta: "Book a check",
      highlight: true,
    },
    {
      name: "Fix a leak",
      sub: "Assure Fix",
      price: "From ₹85 / sq ft",
      note: "5-year warranty",
      body: "We repair the cause, not the stain. Fixed price before we start, photos at every step.",
      icon: Hammer,
      href: "/customer/triage",
      cta: "Get a price",
    },
    {
      name: "Protect before the rains",
      sub: "Assure Protect",
      price: "From ₹62 / sq ft",
      note: "Yearly check-up included",
      body: "For surfaces that are still dry. A coating now costs less than a repair later.",
      icon: ShieldCheck,
      href: "/customer/triage",
      cta: "See plans",
    },
  ];

  const how = [
    { icon: Camera, t: "Send photos", d: "Free, 2 minutes" },
    { icon: Stamp, t: "Get a verdict", d: "Signed, in writing" },
    { icon: Hammer, t: "Watch the work", d: "Photos every day" },
    { icon: FileCheck, t: "Keep the proof", d: "5-year warranty" },
  ];

  return (
    <PhoneFrame>
      {/* Locality bar — where you are decides who can come and when */}
      <div className="sticky top-0 z-20 bg-deep-purple px-4 pb-3 pt-3.5 text-white">
        <div className="flex items-start gap-2">
          <MapPin size={17} className="mt-0.5 shrink-0 text-sun-yellow" />
          <button className="min-w-0 flex-1 text-left">
            <div className="text-[10.5px] leading-none text-white/60">
              Service at
            </div>
            <div className="mt-0.5 flex items-center gap-1">
              <span className="truncate text-[14px] font-semibold">
                {JOB.address.locality}, {JOB.address.city} {JOB.address.pin}
              </span>
              <ChevronDown size={14} className="shrink-0 text-white/70" />
            </div>
          </button>
          <button className="relative mt-0.5 shrink-0">
            <Bell size={18} className="text-white/85" />
            <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-sun-yellow" />
          </button>
        </div>

        {/* Search */}
        <div className="mt-3 flex items-center gap-2 rounded-full bg-white px-3.5 py-2.5">
          <Search size={16} className="shrink-0 text-muted" />
          <span className="truncate text-[13px] text-muted">
            Tell us what you can see
          </span>
        </div>

        {/* Locality facts, the Blinkit trick: make the service feel nearby */}
        <div className="mt-3 flex items-center gap-3 text-[11px] text-white/80">
          <span className="flex items-center gap-1">
            <Users size={12} className="text-sun-yellow" />
            {L.teamsNearby} teams in {JOB.address.locality}
          </span>
          <span className="h-3 w-px bg-white/20" />
          <span>Next visit {L.nextSlot.toLowerCase()}</span>
        </div>
      </div>

      {/* Monsoon strip */}
      <div className="flex items-center gap-2 bg-sun-yellow px-4 py-2">
        <CloudRain size={15} className="shrink-0 text-deep-purple" />
        <span className="text-[11.5px] font-semibold text-deep-purple">
          {L.monsoonDaysLeft} rainy days still forecast in {JOB.address.city}
        </span>
      </div>

      <div className="space-y-5 px-4 pb-5 pt-4">
        {/* The job already running — the first thing she wants on opening */}
        <Link href="/customer/progress" className="block">
          <Card className="border-royal-purple/30 bg-lilac" pad="p-3">
            <div className="flex items-center gap-2.5">
              <SmartImage
                name="progress-coat1.jpg"
                alt="Work on your terrace today"
                ratio="1 / 1"
                className="w-14"
                rounded="rounded-lg"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <Pill tone="green">In progress</Pill>
                  <span className="text-[10.5px] text-muted">{JOB.id}</span>
                </div>
                <div className="mt-1 truncate text-[13.5px] font-semibold text-ink">
                  Terrace waterproofing, day {JOB.progress.day} of{" "}
                  {JOB.quoteDurationDays}
                </div>
                <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white">
                  <div
                    className="h-full rounded-full bg-royal-purple"
                    style={{ width: `${JOB.progress.pct}%` }}
                  />
                </div>
                <div className="mt-1 text-[10.5px] text-muted">
                  Second coat tomorrow morning, then the water test
                </div>
              </div>
              <ChevronRight size={18} className="shrink-0 text-royal-purple" />
            </div>
          </Card>
        </Link>

        {/* Enter through the problem */}
        <Section
          title="What can you see?"
          action={
            <Link href="/customer/triage" className="text-[12px] font-semibold text-royal-purple">
              Something else
            </Link>
          }
        >
          <div className="grid grid-cols-2 gap-2.5">
            {problems.map((p) => (
              <Link
                key={p.label}
                href="/customer/triage"
                className="overflow-hidden rounded-card border border-border bg-white"
              >
                <div className="relative">
                  <SmartImage
                    name={p.img}
                    alt={p.label}
                    ratio="16 / 10"
                    rounded="rounded-none"
                    className="w-full"
                  />
                  {p.common && (
                    <span className="absolute left-1.5 top-1.5 rounded-full bg-sun-yellow px-1.5 py-0.5 text-[9px] font-semibold text-deep-purple">
                      Most common
                    </span>
                  )}
                </div>
                <div className="px-2.5 py-2 text-[12px] font-semibold leading-tight text-ink">
                  {p.label}
                </div>
              </Link>
            ))}
          </div>
        </Section>

        {/* The three things we can do, in plain words */}
        <Section title="How we can help">
          <div className="space-y-2.5">
            {plans.map((p) => {
              const Icon = p.icon;
              return (
                <Link key={p.name} href={p.href} className="block">
                  <Card
                    className={p.highlight ? "border-royal-purple/40" : ""}
                    pad="p-3"
                  >
                    <div className="flex gap-3">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                          p.highlight ? "bg-royal-purple" : "bg-lilac"
                        }`}
                      >
                        <Icon
                          size={19}
                          className={
                            p.highlight ? "text-white" : "text-royal-purple"
                          }
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline justify-between gap-2">
                          <span className="text-[14px] font-semibold text-ink">
                            {p.name}
                          </span>
                          <span className="shrink-0 text-[12px] font-semibold text-royal-purple">
                            {p.price}
                          </span>
                        </div>
                        <div className="text-[10.5px] text-muted">
                          {p.sub} · {p.note}
                        </div>
                        <p className="mt-1.5 text-[12px] leading-snug text-muted">
                          {p.body}
                        </p>
                        <div className="mt-2 flex items-center gap-1 text-[12px] font-semibold text-royal-purple">
                          {p.cta}
                          <ArrowRight size={13} />
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </Section>

        {/* Trust strip */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { big: L.jobsDone.toLocaleString("en-IN"), small: `jobs in ${JOB.address.city}` },
            { big: `${L.rating}★`, small: `${L.ratingCount} ratings` },
            { big: `${JOB.warranty.tenorYears} yr`, small: "written warranty" },
          ].map((s) => (
            <div
              key={s.small}
              className="rounded-card border border-border bg-white px-2 py-2.5 text-center"
            >
              <div className="text-[17px] font-extrabold leading-none text-deep-purple">
                {s.big}
              </div>
              <div className="mt-1 text-[10px] leading-tight text-muted">
                {s.small}
              </div>
            </div>
          ))}
        </div>

        {/* How it works */}
        <Section title="How it works">
          <div className="grid grid-cols-4 gap-1.5">
            {how.map((h) => {
              const Icon = h.icon;
              return (
                <div
                  key={h.t}
                  className="rounded-card border border-border bg-white px-1.5 py-2.5 text-center"
                >
                  <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-lilac">
                    <Icon size={17} className="text-royal-purple" />
                  </div>
                  <div className="mt-1.5 text-[10.5px] font-semibold leading-tight text-ink">
                    {h.t}
                  </div>
                  <div className="text-[9px] leading-tight text-muted">{h.d}</div>
                </div>
              );
            })}
          </div>
        </Section>

        {/* Neighbours — proof from the same pin code */}
        <Section
          title={`Homes near ${JOB.address.locality}`}
          action={
            <span className="text-[12px] text-muted">
              {L.rating} out of 5
            </span>
          }
        >
          <div className="space-y-2">
            {L.neighbours.map((n) => (
              <Card key={n.name} pad="p-3">
                <div className="flex items-center justify-between">
                  <span className="text-[12.5px] font-semibold text-ink">
                    {n.name}, {n.where}
                  </span>
                  <Stars n={n.stars} />
                </div>
                <p className="mt-1 text-[12px] leading-snug text-muted">
                  {n.text}
                </p>
                <div className="mt-1.5 flex items-center gap-1 text-[10px] text-muted">
                  <CheckCircle2 size={11} className="text-pass" />
                  Verified job · {n.when}
                </div>
              </Card>
            ))}
          </div>
        </Section>

        <p className="px-2 text-center text-[11px] leading-snug text-muted">
          If your problem is not waterproofing, we will tell you and charge you
          nothing for the visit.
        </p>
      </div>

      <BottomTabBar />
    </PhoneFrame>
  );
}
