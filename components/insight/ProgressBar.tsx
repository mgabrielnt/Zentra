"use client";

import { motion, useScroll, useSpring } from "motion/react";

export default function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { 
    stiffness: 220, 
    damping: 18, 
    mass: 0.2 
  });

  return (
    <motion.div
      style={{ scaleX: progress }}
      className="fixed left-0 right-0 top-0 z-50 h-[2px] origin-left bg-gradient-to-r from-fuchsia-500 via-purple-500 to-blue-500 transform-gpu will-change-transform"
      aria-hidden="true"
    />
  );
}