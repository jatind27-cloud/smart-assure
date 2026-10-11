"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ClipboardList, BadgeCheck, LifeBuoy } from "lucide-react";

const TABS = [
  { label: "Home", icon: Home, href: "/customer" },
  { label: "My job", icon: ClipboardList, href: "/customer/progress" },
  { label: "Warranty", icon: BadgeCheck, href: "/customer/passport" },
  { label: "Help", icon: LifeBuoy, href: "/customer/help" },
];

export function BottomTabBar() {
  const pathname = usePathname();
  return (
    <nav className="sticky bottom-0 z-20 grid shrink-0 grid-cols-4 border-t border-border bg-white/97 px-1 py-1.5 backdrop-blur">
      {TABS.map((t) => {
        const Icon = t.icon;
        const on = pathname === t.href;
        return (
          <Link
            key={t.label}
            href={t.href}
            className="flex flex-col items-center gap-0.5 rounded-lg py-1"
          >
            <Icon
              size={19}
              strokeWidth={on ? 2.4 : 1.9}
              className={on ? "text-royal-purple" : "text-muted"}
            />
            <span
              className={`text-[9.5px] ${
                on ? "font-semibold text-royal-purple" : "text-muted"
              }`}
            >
              {t.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
