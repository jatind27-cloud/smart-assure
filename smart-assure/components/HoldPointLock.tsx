"use client";

import { Lock, Check } from "lucide-react";
import { motion } from "framer-motion";

// Yellow circle, numbered 1–4. Locked = lock icon. Passed = green tick.
export function HoldPointLock({
  number,
  passed,
  size = 36,
}: {
  number: 1 | 2 | 3 | 4;
  passed: boolean;
  size?: number;
}) {
  return (
    <motion.span
      initial={false}
      animate={{ scale: passed ? [1, 1.12, 1] : 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="relative inline-flex shrink-0 items-center justify-center rounded-full"
      style={{
        width: size,
        height: size,
        background: passed ? "#1E8E3E" : "#FFD23F",
      }}
    >
      {passed ? (
        <Check size={size * 0.5} strokeWidth={3} className="text-white" />
      ) : (
        <Lock size={size * 0.42} strokeWidth={2.5} className="text-deep-purple" />
      )}
      <span
        className="absolute -right-1 -top-1 flex items-center justify-center rounded-full bg-deep-purple text-[10px] font-extrabold text-white"
        style={{ width: size * 0.42, height: size * 0.42 }}
      >
        {number}
      </span>
    </motion.span>
  );
}
