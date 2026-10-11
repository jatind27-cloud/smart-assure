// A plain rounded phone outline in deep purple — no notch, no branding.
// On desktop it frames a 390-wide screen; on small viewports it goes
// full-bleed so you can demo from an actual phone.
export function PhoneFrame({
  children,
  scrollable = true,
}: {
  children: React.ReactNode;
  scrollable?: boolean;
}) {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-[390px] sm:w-[390px]">
        <div className="overflow-hidden rounded-[0px] border-0 sm:rounded-[40px] sm:border-[10px] sm:border-deep-purple sm:shadow-2xl">
          <div
            className={`no-scrollbar relative h-[100dvh] w-full bg-surface sm:h-[812px] ${
              scrollable ? "overflow-y-auto" : "overflow-hidden"
            }`}
          >
            {/* min-h-full lets a short screen still push its footer or tab
                bar to the bottom of the frame */}
            <div className="flex min-h-full flex-col">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
