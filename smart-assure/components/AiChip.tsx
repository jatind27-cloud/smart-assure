import { Bot } from "lucide-react";

// Labels AI-assisted CONTENT only. By design this component has no onClick and
// renders a <span>, never a <button> — the rule "AI never labels an action"
// is enforced here so no screen can accidentally break it.
export function AiChip({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-lilac px-2.5 py-1 text-[11px] font-semibold text-violet ${className}`}
    >
      <Bot size={12} strokeWidth={2} />
      AI-assisted
    </span>
  );
}
