"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useMotionTemplate,
  AnimatePresence,
  MotionValue,
} from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const beamRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardFrameRef = useRef<HTMLDivElement | null>(null);

  const [svgHeight, setSvgHeight] = useState(420);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const cardCount = content.length || 1;

  // Card kanan mengikuti blok teks aktif
  const cardY = useSpring(0, {
    stiffness: 170,
    damping: 26,
    mass: 0.4,
  });

  useEffect(() => {
    if (!cardCount) return;

    const handleScroll = () => {
      const viewportCenter = window.innerHeight / 2;
      let closestIndex = 0;
      let smallestDistance = Infinity;

      itemRefs.current.forEach((el, index) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const distance = Math.abs(center - viewportCenter);

        if (distance < smallestDistance) {
          smallestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveCard(closestIndex);

      const first = itemRefs.current[0];
      const active = itemRefs.current[closestIndex];
      const isDesktop = window.innerWidth >= 1024;

      if (isDesktop && first && active) {
        const firstRect = first.getBoundingClientRect();
        const activeRect = active.getBoundingClientRect();
        const diff = activeRect.top - firstRect.top;
        cardY.set(diff);
      } else {
        cardY.set(0);
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [cardCount, cardY]);

  // Tinggi beam = tinggi kolom kiri (supaya nggak jebol)
  useEffect(() => {
    if (!beamRef.current) return;

    const updateHeight = () => {
      const h = beamRef.current?.offsetHeight ?? 0;
      setSvgHeight(Math.max(260, h));
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [cardCount]);

  const activeAccent = content[activeCard]?.accent ?? "#6366F1";

  // Posisi node di beam
  const nodePositions = useMemo(() => {
    if (!cardCount || svgHeight <= 0) return [];
    if (cardCount === 1) return [svgHeight / 2];

    const start = 40;
    const end = svgHeight - 40;
    const segment = (end - start) / (cardCount - 1);

    return Array.from({ length: cardCount }, (_, idx) => start + segment * idx);
  }, [cardCount, svgHeight]);

  // Orb highlight
  const yHighlight: MotionValue<number> = useSpring(40, {
    stiffness: 260,
    damping: 32,
    mass: 0.4,
  });

  useEffect(() => {
    if (!nodePositions.length) return;
    const y =
      nodePositions[activeCard] ?? nodePositions[nodePositions.length - 1];
    yHighlight.set(y);
  }, [activeCard, nodePositions, yHighlight]);

  // Parallax & mouse tilt card kanan
  const scrollTiltX = useTransform(scrollYProgress, [0, 1], [6, -6]);
  const scrollTiltY = useTransform(scrollYProgress, [0, 1], [-4, 4]);
  const cardGlowOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.35, 0.9, 0.45],
  );

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const mouseTiltX = useTransform(mouseY, [0, 1], [10, -10]);
  const mouseTiltY = useTransform(mouseX, [0, 1], [-10, 10]);

  const tiltX = useTransform(
    [scrollTiltX, mouseTiltX],
    ([sx, mx]: number[]) => sx + mx * 0.7,
  );

  const tiltY = useTransform(
    [scrollTiltY, mouseTiltY],
    ([sy, my]: number[]) => sy + my * 0.7,
  );

  const spotlightX = useTransform(mouseX, [0, 1], ["0%", "100%"]);
  const spotlightY = useTransform(mouseY, [0, 1], ["0%", "100%"]);
  const spotlightBG = useMotionTemplate`
    radial-gradient(circle at ${spotlightX} ${spotlightY},
      rgba(255,255,255,0.17),
      transparent 60%)
  `;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  // GSAP intro + breathing glow
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      // fade-in section
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      // stagger teks kiri
      const items = itemRefs.current.filter(
        (el): el is HTMLDivElement => !!el,
      );
      if (items.length) {
        gsap.from(items, {
          opacity: 0,
          y: 24,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        });
      }

      // breathing glow card frame
      if (cardFrameRef.current) {
        gsap.to(cardFrameRef.current, {
          boxShadow: "0 0 45px rgba(129,140,248,0.7)",
          duration: 2.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [content.length]);

  return (
    <motion.div
      ref={sectionRef}
      className="relative mx-auto flex w-full max-w-6xl flex-col justify-center gap-10 px-4 py-10 md:px-6 md:py-14 lg:flex-row"
    >
      {/* Background */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-30"
        style={{
          backgroundImage: `
            radial-gradient(circle at 80% 5%, ${activeAccent}33, transparent 55%),
            radial-gradient(circle at 10% 85%, ${activeAccent}22, transparent 55%)
          `,
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(120deg, transparent 0, rgba(148,163,184,0.16) 40%, transparent 82%)",
        }}
        animate={{ opacity: [0.22, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.13]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(148,163,184,0.22) 1px, transparent 1px),linear-gradient(to bottom, rgba(148,163,184,0.22) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Light beam – di-clip supaya nggak lewat atas/bawah */}
      {svgHeight > 0 && (
        <div className="pointer-events-none absolute inset-y-10 left-0 hidden w-12 overflow-hidden md:flex lg:left-2">
          <svg
            viewBox={`0 0 48 ${svgHeight}`}
            className="h-full w-full"
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
              strokeWidth={6}
              strokeLinecap="round"
              strokeOpacity={0.12}
              filter="blur(8px)"
            />
            {/* dotted base line */}
            <path
              d={`M 24 0 L 24 ${svgHeight}`}
              stroke="rgba(148,163,184,0.4)"
              strokeWidth={1}
              strokeDasharray="4 6"
            />
            {/* gradient beam */}
            <motion.path
              d={`M 24 0 L 24 ${svgHeight}`}
              stroke="url(#sticky-beam-gradient)"
              strokeWidth={2}
              strokeLinecap="round"
              style={{ pathLength: scrollYProgress }}
            />
            {/* nodes */}
            {nodePositions.map((y, idx) => {
              const isActive = activeCard === idx;
              return (
                <g key={idx}>
                  {isActive && (
                    <motion.circle
                      cx={24}
                      cy={y}
                      r={14}
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
                    cx={24}
                    cy={y}
                    r={isActive ? 4.2 : 2.5}
                    fill={isActive ? activeAccent : "rgba(148,163,184,0.7)"}
                    stroke="rgba(15,23,42,0.9)"
                    strokeWidth={isActive ? 1.6 : 1}
                    animate={{
                      opacity: isActive ? 1 : 0.6,
                      scale: isActive ? [1, 1.12, 1] : 1,
                    }}
                    transition={{
                      duration: isActive ? 1.3 : 0.25,
                      repeat: isActive ? Infinity : 0,
                      ease: "easeInOut",
                    }}
                  />
                </g>
              );
            })}
            {/* orb highlight */}
            <g>
              <motion.circle
                cx={24}
                r={7}
                fill={activeAccent}
                cy={yHighlight}
              />
              <motion.circle
                cx={24}
                r={18}
                fill="url(#beam-orb-glow)"
                cy={yHighlight}
              />
            </g>
          </svg>
        </div>
      )}

      {/* Kiri: teks */}
      <div ref={beamRef} className="relative flex-1 pl-0 md:pl-10 lg:pl-18">
        <div className="max-w-2xl">
          {content.map((item, index) => {
            const isActive = activeCard === index;
            return (
              <div
                key={item.title + index}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
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
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="relative text-lg font-bold text-slate-50 md:text-3xl"
                >
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
                  transition={{ duration: 0.25, ease: "easeOut" }}
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

      {/* Kanan: card */}
      <motion.div
        ref={cardFrameRef}
        style={{
          y: cardY,
          rotateX: tiltX,
          rotateY: tiltY,
          transformPerspective: 900,
        }}
        className={cn(
          "mt-6 h-64 w-full lg:mt-0 lg:h-80 lg:w-[24rem]",
          contentClassName,
        )}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative h-full w-full overflow-hidden rounded-3xl border border-white/14 bg-[#050508]/95 shadow-[0_28px_90px_rgba(0,0,0,0.7)] backdrop-blur-xl">
          {/* aura accent */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-px rounded-[22px]"
            style={{
              opacity: cardGlowOpacity,
              backgroundImage: `
                radial-gradient(circle at 0% 0%, ${activeAccent}3d, transparent 55%),
                radial-gradient(circle at 100% 100%, ${activeAccent}26, transparent 60%)
              `,
            }}
          />
          {/* spotlight mouse */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[22px] opacity-100 mix-blend-screen"
            style={{ backgroundImage: spotlightBG }}
          />
          {/* stripes */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.18]"
            style={{
              backgroundImage:
                "linear-gradient(135deg, rgba(148,163,184,0.18) 0, transparent 45%, rgba(148,163,184,0.16) 70%, transparent 100%)",
              backgroundSize: "220% 220%",
            }}
            animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          />
          {/* vignette */}
          <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_50%_0%,rgba(15,23,42,0.7),transparent_60%)]" />

          {/* konten card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCard}
              className="relative h-full w-full"
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -18, scale: 0.98 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              {content[activeCard]?.content ?? null}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
