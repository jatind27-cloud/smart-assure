import { Camera } from "lucide-react";

// A photo thumbnail with a time stamp. We don't ship real site photos, so each
// tile is a soft lilac placeholder with a caption + time stamp — enough to read
// as "evidence on record" in the demo.
export function EvidenceTile({
  caption,
  time,
  size = 76,
}: {
  caption: string;
  time: string;
  size?: number;
}) {
  return (
    <div
      className="relative overflow-hidden rounded-xl border-[1.5px] border-border bg-lilac-2"
      style={{ width: size, height: size }}
    >
      <div className="flex h-full w-full flex-col items-center justify-center gap-1 px-1 text-center">
        <Camera size={18} strokeWidth={2} className="text-violet" />
        <span className="text-[9px] font-semibold leading-tight text-muted">
          {caption}
        </span>
      </div>
      <span className="absolute bottom-1 right-1 rounded bg-deep-purple/80 px-1 text-[8px] font-semibold text-white">
        {time}
      </span>
    </div>
  );
}
