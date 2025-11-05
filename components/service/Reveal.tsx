"use client";

import { motion, useInView } from "motion/react";
import { useRef, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
  /** 
   * "mount"  → animasi sekali saat komponen muncul (tanpa menunggu scroll).
   * "scroll" → animasi saat elemen masuk viewport (default, kalau mau efek on-scroll).
   */
  mode?: "mount" | "scroll";
};

export default function Reveal({
  children,
  delay = 0,
  className = "",
  y = 20,
  mode = "scroll",
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-10% 0px -10% 0px", // sedikit buffer supaya gampang kepicu
  });

  const shouldShow = mode === "mount" ? true : isInView;

  return (
    <motion.div
      ref={mode === "scroll" ? ref : undefined}
      initial={{ opacity: 0, y }}
      animate={shouldShow ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
