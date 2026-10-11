"use client";

import { useEffect, useRef, useState } from "react";
import { ImageIcon } from "lucide-react";

// Every photo in the app goes through here.
//
// Images live in /public/images. That folder ships EMPTY — drop your photos in
// using the exact file names listed in IMAGES.md and they appear automatically.
// Until then each slot renders a tidy labelled placeholder showing the file
// name it wants, so the prototype never looks broken in front of a jury.
export function SmartImage({
  name,
  alt,
  ratio = "4 / 3",
  className = "",
  rounded = "rounded-xl",
  children,
  dim = false,
}: {
  name: string;
  alt: string;
  ratio?: string;
  className?: string;
  rounded?: string;
  children?: React.ReactNode;
  dim?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const [narrow, setNarrow] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // These pages are prerendered, so a missing file usually fails to load
    // before React attaches onError. Check the element once on mount too,
    // or the browser's broken-image icon stays on screen.
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);

    // In a small slot — an avatar, a thumbnail — the file name will not fit,
    // so the placeholder drops to just the icon.
    const box = boxRef.current;
    if (box && box.clientWidth < 78) setNarrow(true);
  }, []);

  return (
    <div
      ref={boxRef}
      className={`relative shrink-0 overflow-hidden bg-lilac-2 ${rounded} ${className}`}
      style={{ aspectRatio: ratio }}
    >
      {failed ? (
        <div className="flex h-full w-full flex-col items-center justify-center gap-1 px-1 text-center">
          <ImageIcon
            size={narrow ? 14 : 16}
            strokeWidth={2}
            className="text-violet/70"
          />
          {!narrow && (
            <>
              <span className="break-all text-[8px] font-semibold leading-tight text-muted">
                {name}
              </span>
              <span className="text-[8px] text-muted/60">{ratio}</span>
            </>
          )}
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={imgRef}
          src={`/images/${name}`}
          alt={alt}
          onError={() => setFailed(true)}
          className="h-full w-full object-cover text-[0px]"
        />
      )}
      {/* The scrim renders whether or not the photo is in yet, so white text
          laid over this slot stays readable either way. */}
      {dim && (
        <div className="absolute inset-0 bg-gradient-to-t from-deep-purple/75 via-deep-purple/15 to-transparent" />
      )}
      {children}
    </div>
  );
}

// A photo with a time stamp burned into the corner — used wherever the app
// shows evidence on the record.
export function EvidencePhoto({
  name,
  alt,
  time,
  caption,
  ratio = "4 / 3",
  className = "",
}: {
  name: string;
  alt: string;
  time: string;
  caption?: string;
  ratio?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <SmartImage name={name} alt={alt} ratio={ratio}>
        <span className="absolute bottom-1 right-1 rounded bg-deep-purple/85 px-1.5 py-0.5 text-[9px] font-semibold tabular-nums text-white">
          {time}
        </span>
      </SmartImage>
      {caption && (
        <div className="mt-1 text-[10px] leading-tight text-muted">{caption}</div>
      )}
    </div>
  );
}
