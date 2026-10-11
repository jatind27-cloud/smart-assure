import { JOB } from "@/lib/job";
import { PhoneFrame } from "@/components/PhoneFrame";
import { BottomTabBar } from "@/components/BottomTabBar";
import { SmartImage } from "@/components/SmartImage";
import { JobIdPill } from "@/components/JobIdPill";
import { TopBar, Card, Section, PrimaryButton, GhostButton } from "@/components/ui";
import { Phone, MessageSquare, FileWarning, Clock } from "lucide-react";

// A small help screen so the bottom tabs and the "ask us" buttons all land
// somewhere real during a demo.
export default function HelpScreen() {
  const faqs = [
    {
      q: "What if it leaks again?",
      a: `Raise a claim from your warranty page. We acknowledge in a day, re-inspect within three, and if the cause is ours we redo the work free. Cover runs to ${JOB.warranty.to}.`,
    },
    {
      q: "Why did I pay for the inspection?",
      a: `The ${JOB.inspectionFee} rupee visit pays for the diagnosis, including the chance that we tell you not to buy waterproofing. It comes straight off your repair bill.`,
    },
    {
      q: "Can I use my own contractor?",
      a: "You can, but the warranty covers work done by a certified partner using the specified system. We cannot stand behind an application we did not supervise.",
    },
    {
      q: "What happens in the rain?",
      a: "Coating needs four dry hours. If rain is forecast we move the day and tell you the same evening. The price does not change.",
    },
  ];

  return (
    <PhoneFrame>
      <TopBar title="Help" subtitle="We answer within the hour" back="/customer" right={<JobIdPill />} />

      <div className="flex-1 space-y-5 px-4 pb-5 pt-4">
        <Card pad="p-3">
          <div className="flex items-center gap-3">
            <SmartImage
              name={JOB.adviser.photo}
              alt={JOB.adviser.name}
              ratio="1 / 1"
              className="w-12"
              rounded="rounded-full"
            />
            <div className="min-w-0 flex-1">
              <div className="text-[13px] font-semibold text-ink">
                {JOB.adviser.name}
              </div>
              <div className="text-[11px] text-muted">
                {JOB.adviser.role} for {JOB.id}
              </div>
              <div className="mt-0.5 flex items-center gap-1 text-[10.5px] text-pass">
                <Clock size={10} /> Available now
              </div>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2.5">
            <PrimaryButton size="md">
              <Phone size={15} /> Call
            </PrimaryButton>
            <GhostButton size="md">
              <MessageSquare size={15} /> Message
            </GhostButton>
          </div>
        </Card>

        <GhostButton href="/customer/passport">
          <FileWarning size={15} /> Raise a warranty claim
        </GhostButton>

        <Section title="Common questions">
          <div className="space-y-2">
            {faqs.map((f) => (
              <Card key={f.q} pad="p-3">
                <div className="text-[12.5px] font-semibold text-ink">{f.q}</div>
                <p className="mt-1 text-[11.5px] leading-snug text-muted">{f.a}</p>
              </Card>
            ))}
          </div>
        </Section>
      </div>

      <BottomTabBar />
    </PhoneFrame>
  );
}
