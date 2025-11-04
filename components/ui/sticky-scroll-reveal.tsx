"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

type StickyContentItem = {
  title: string;
  description: string;
  content?: React.ReactNode;
  accent?: string;
};

export function StickyScroll({
  content,
  contentClassName,
}: {
  content: StickyContentItem[];
  contentClassName?: string;
}) {
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const beamRef = useRef<HTMLDivElement | null>(null);
  const [svgHeight, setSvgHeight] = useState(420);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const cardCount = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!cardCount) return;

    const breakpoints = content.map((_, i) => i / cardCount);
    let closestIndex = 0;

    breakpoints.forEach((bp, i) => {
      if (Math.abs(latest - bp) < Math.abs(latest - breakpoints[closestIndex])) {
        closestIndex = i;
      }
    });

    setActiveCard(closestIndex);
  });

  // ukur tinggi kolom kiri → panjang beam
  useEffect(() => {
    if (!beamRef.current) return;

    const update = () => {
      const h = beamRef.current?.offsetHeight ?? 0;
      setSvgHeight(Math.max(320, h + 120));
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [content.length]);

  const activeAccent = content[activeCard]?.accent ?? "#5227FF";

  // highlight orb yang bergerak
  const yHighlight = useSpring(
    useTransform(scrollYProgress, [0, 1], [40, svgHeight - 40]),
    { stiffness: 260, damping: 32, mass: 0.4 },
  );

  // node kecil per section
  const nodePositions = useMemo(() => {
    if (!cardCount || svgHeight <= 0) return [];
    const segment = svgHeight / (cardCount + 1);
    return content.map((_, idx) => segment * (idx + 1));
  }, [cardCount, svgHeight, content.length]);

  // parallax tilt untuk card kanan
  const cardTiltX = useTransform(scrollYProgress, [0, 1], [6, -6]);
  const cardTiltY = useTransform(scrollYProgress, [0, 1], [-4, 4]);
  const cardLift = useSpring(
    useTransform(scrollYProgress, [0, 1], [8, -8]),
    { stiffness: 180, damping: 26, mass: 0.5 },
  );

  return (
    <motion.div
      ref={ref}
      className="relative mx-auto flex w-full max-w-6xl flex-col justify-center gap-10 px-4 py-10 md:px-6 md:py-14 lg:flex-row"
    >
      {/* Glow dinamis belakang section */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-30"
        style={{
          backgroundImage: `
            radial-gradient(circle at 80% 20%, ${activeAccent}33, transparent 60%),
            radial-gradient(circle at 10% 90%, ${activeAccent}22, transparent 55%)
          `,
        }}
      />
      {/* soft angular wash */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20 opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(120deg, transparent 0, ${activeAccent}19 40%, transparent 80%)
          `,
        }}
        animate={{ opacity: [0.25, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* subtle glass grid */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(148,163,184,0.25) 1px, transparent 1px),linear-gradient(to bottom, rgba(148,163,184,0.25) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Beam di kiri teks (desktop only) */}
      {svgHeight > 0 && (
        <div className="pointer-events-none absolute left-0 top-10 hidden h-[calc(100%-5rem)] items-start md:flex lg:left-2">
          <svg
            viewBox={`0 0 48 ${svgHeight}`}
            width="48"
            height={svgHeight}
            aria-hidden="true"
          >
            <defs>
              <linearGradient
                id="sticky-beam-gradient"
                x1="0"
                x2="0"
                y1="0"
                y2={svgHeight}
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor={activeAccent} stopOpacity="0" />
                <stop offset="0.25" stopColor={activeAccent} stopOpacity="0.9" />
                <stop offset="0.75" stopColor={activeAccent} stopOpacity="0.9" />
                <stop offset="1" stopColor={activeAccent} stopOpacity="0" />
              </linearGradient>
              <radialGradient id="beam-orb-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={activeAccent} stopOpacity="0.9" />
                <stop offset="100%" stopColor={activeAccent} stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* outer glow track */}
            <motion.path
              d={`M 24 0 L 24 ${svgHeight}`}
              stroke={activeAccent}
              strokeWidth="6"
              strokeLinecap="round"
              strokeOpacity={0.12}
              filter="blur(8px)"
            />

            {/* base dotted line */}
            <path
              d={`M 24 0 L 24 ${svgHeight}`}
              stroke="rgba(148,163,184,0.35)"
              strokeWidth="1"
              strokeDasharray="4 6"
            />

            {/* gradient beam */}
            <motion.path
              d={`M 24 0 L 24 ${svgHeight}`}
              stroke="url(#sticky-beam-gradient)"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              style={{ pathLength: scrollYProgress }}
            />

            {/* node kecil tiap section */}
            {nodePositions.map((y, idx) => {
              const isActive = activeCard === idx;
              return (
                <g key={idx}>
                  {isActive && (
                    <motion.circle
                      cx="24"
                      cy={y}
                      r="14"
                      fill="url(#beam-orb-glow)"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0.25, 0.6, 0.25] }}
                      transition={{
                        duration: 2.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  )}
                  <motion.circle
                    cx="24"
                    cy={y}
                    r={isActive ? 4.2 : 2.5}
                    fill={isActive ? activeAccent : "rgba(148,163,184,0.7)"}
                    stroke="rgba(15,23,42,0.9)"
                    strokeWidth={isActive ? 1.6 : 1}
                    animate={{
                      opacity: isActive ? 1 : 0.6,
                      scale: isActive ? [1, 1.15, 1] : 1,
                    }}
                    transition={{
                      duration: isActive ? 1.4 : 0.3,
                      repeat: isActive ? Infinity : 0,
                      ease: "easeInOut",
                    }}
                  />
                </g>
              );
            })}

            {/* highlight orb */}
            <g>
              <motion.circle
                cx="24"
                r="7"
                fill={activeAccent}
                cy={yHighlight as any} // gunakan MotionValue langsung ke attribute
              />
              <motion.circle
                cx="24"
                r="18"
                cy={yHighlight as any}
                fill="url(#beam-orb-glow)"
              />
            </g>
          </svg>
        </div>
      )}

      {/* Kiri: teks scrollable */}
      <div
        ref={beamRef}
        className="relative flex-1 pl-0 md:pl-10 lg:pl-18"
      >
        <div className="max-w-2xl">
          {content.map((item, index) => {
            const isActive = activeCard === index;
            return (
              <div
                key={item.title + index}
                className={cn(
                  "my-12 md:my-16 rounded-2xl border transition-colors duration-300",
                  isActive
                    ? "border-white/12 bg-white/[0.03] -mx-3 px-3 py-3 md:-mx-4 md:px-4"
                    : "border-transparent",
                )}
              >
                <motion.h2
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  animate={{
                    opacity: isActive ? 1 : 0.4,
                    y: isActive ? 0 : 4,
                    scale: isActive ? 1 : 0.99,
                  }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="relative text-lg font-bold text-slate-50 md:text-3xl"
                >
                  {/* indikator kecil di kiri title */}
                  <span
                    className={cn(
                      "absolute -left-4 top-[0.45em] hidden h-[1px] w-5 bg-slate-500/40 md:inline-block",
                      isActive && "bg-slate-100",
                    )}
                  />
                  {item.title}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  animate={{
                    opacity: isActive ? 1 : 0.38,
                    y: isActive ? 0 : 3,
                  }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="mt-3 max-w-sm text-sm text-slate-300 md:mt-5 md:text-lg"
                >
                  {item.description}
                </motion.p>
              </div>
            );
          })}
          <div className="h-16" />
        </div>
      </div>

      {/* Kanan: card sticky dengan parallax tilt */}
      <motion.div
        style={{
          rotateX: cardTiltX,
          rotateY: cardTiltY,
          translateY: cardLift,
          transformPerspective: 900,
        }}
        className={cn(
          "mt-6 h-64 w-full lg:mt-0 lg:h-80 lg:w-[24rem] lg:sticky lg:top-28",
          contentClassName,
        )}
        aria-hidden
      >
        <div className="relative h-full w-full overflow-hidden rounded-3xl border border-white/14 bg-[#050508]/90 shadow-[0_24px_80px_rgba(0,0,0,0.65)] backdrop-blur-xl">
          {/* border / aura accent */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-px rounded-[22px] opacity-80"
            style={{
              backgroundImage: `
                radial-gradient(circle at 0% 0%, ${activeAccent}33, transparent 55%),
                radial-gradient(circle at 100% 100%, ${activeAccent}22, transparent 60%)
              `,
            }}
            animate={{ opacity: [0.5, 0.9, 0.6] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* diagonal stripes halus */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.18]"
            style={{
              backgroundImage:
                "linear-gradient(135deg, rgba(148,163,184,0.18) 0, transparent 40%, rgba(148,163,184,0.18) 60%, transparent 100%)",
              backgroundSize: "220% 220%",
            }}
            animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
          {/* inner subtle vignette */}
          <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_50%_0%,rgba(15,23,42,0.65),transparent_60%)]" />
          {/* konten card */}
          <div className="relative h-full w-full">
            {content[activeCard]?.content ?? null}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
