import Link from "next/link";
import { JobIdPill } from "@/components/JobIdPill";
import { Droplet, ArrowRight, MousePointerClick } from "lucide-react";

// The launcher. Eight screens in the order they are presented, each with the
// question it has to answer and the line to say over it.
const STORYBOARD = [
  {
    n: 1,
    screen: "Home",
    app: "Customer app",
    href: "/customer",
    moment: null,
    answers: "A homeowner arrives with a stain, not a product in mind",
    line: "It opens with her locality and the problem she can see.",
  },
  {
    n: 2,
    screen: "Free photo check",
    app: "Customer app",
    href: "/customer/triage",
    moment: null,
    answers: "What the machine is allowed to do",
    line: "Five steps, three photos. It routes the job. It does not diagnose.",
    click: "Walk all five steps",
  },
  {
    n: 3,
    screen: "Your verdict",
    app: "Customer app",
    href: "/customer/verdict",
    moment: "Diagnosis",
    answers: "Do I believe this verdict?",
    line: "Readings, photos, what we ruled out, and the name of who signed it.",
  },
  {
    n: 4,
    screen: "Your price",
    app: "Customer app",
    href: "/customer/quote",
    moment: "Purchase",
    answers: "Is this fair, and how do I pay?",
    line: "Exclusions and payment options before she commits, not after.",
    click: "Tick both boxes and approve",
  },
  {
    n: 5,
    screen: "Progress report",
    app: "Customer app",
    href: "/customer/progress",
    moment: "Execution",
    answers: "Was it actually done right?",
    line: "A daily report she could forward to anyone.",
  },
  {
    n: 6,
    screen: "Water Protection Passport",
    app: "Customer app",
    href: "/customer/passport",
    moment: "After",
    answers: "Will they stand behind it?",
    line: "One record, and it transfers with the house.",
  },
  {
    n: 7,
    screen: "Verdict and signature",
    app: "Contractor app",
    href: "/contractor/verdict",
    moment: null,
    answers: "Why would a contractor tell the truth?",
    line: "His language, three buttons, and the same pay either way.",
    click: "Switch language, then sign",
  },
  {
    n: 8,
    screen: "Command centre",
    app: "Internal",
    href: "/command",
    moment: null,
    answers: "When does this earn the right to scale?",
    line: "Four gates per city. We grow only what passes.",
    click: "Every tab and city works",
  },
];

export default function Showcase() {
  return (
    <main className="min-h-[100dvh] bg-surface">
      <header className="hero-curve bg-deep-purple px-6 py-10 text-white sm:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center gap-2 text-[12.5px] text-white/70">
            <Droplet size={15} className="text-sun-yellow" fill="#FFD23F" />
            SmartCare Assure
            <span className="text-white/40">by Asian Paints</span>
          </div>
          <h1 className="mt-4 max-w-3xl text-[30px] font-extrabold leading-[1.1] tracking-tight sm:text-[40px]">
            Find the real problem. Fix it right. Stay dry.
          </h1>
          <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-white/80">
            One job, five interfaces, one record. The model routes the work and a
            certified person signs it. Below are the eight screens of the demo,
            in the order they tell the story.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <JobIdPill />
            <span className="text-[12.5px] text-white/60">
              Every screen is the same job, so the numbers match everywhere.
            </span>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-10 sm:px-10">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STORYBOARD.map((s) => (
            <Link
              key={s.n}
              href={s.href}
              className="group flex flex-col rounded-card border border-border bg-white p-5 transition hover:border-royal-purple hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-deep-purple text-[12px] font-extrabold text-white">
                  {s.n}
                </span>
                {s.moment && (
                  <span className="rounded-full bg-sun-yellow px-2.5 py-1 text-[10px] font-semibold text-deep-purple">
                    {s.moment}
                  </span>
                )}
              </div>
              <div className="mt-4 text-[11px] font-semibold text-violet">
                {s.app}
              </div>
              <div className="mt-0.5 text-[15px] font-semibold leading-tight text-ink">
                {s.screen}
              </div>
              <p className="mt-2 flex-1 text-[12.5px] leading-snug text-muted">
                {s.answers}
              </p>
              <p className="mt-3 border-t border-border pt-3 text-[12.5px] italic leading-snug text-ink">
                “{s.line}”
              </p>
              {s.click && (
                <div className="mt-2.5 flex items-center gap-1.5 text-[11px] font-semibold text-pass">
                  <MousePointerClick size={12} />
                  {s.click}
                </div>
              )}
              <div className="mt-3 flex items-center gap-1 text-[12.5px] font-semibold text-royal-purple">
                Open screen
                <ArrowRight
                  size={14}
                  className="transition group-hover:translate-x-0.5"
                />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 rounded-card border border-border bg-white px-5 py-4">
          <div className="text-[13px] font-semibold text-ink">
            Before you screenshot
          </div>
          <p className="mt-1.5 text-[12.5px] leading-relaxed text-muted">
            Photos go in <code className="rounded bg-lilac px-1 py-0.5 text-[11.5px] text-royal-purple">public/images</code>{" "}
            using the file names in IMAGES.md; any photo you have not added yet
            shows a small labelled placeholder. On any screen, the arrow keys move
            through the storyboard and{" "}
            <kbd className="rounded border border-border px-1.5 py-0.5 text-[11px]">H</kbd>{" "}
            hides the floating controls.
          </p>
        </div>
      </section>
    </main>
  );
}
