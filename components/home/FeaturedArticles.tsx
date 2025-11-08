"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import ArticleCard from "@/components/insight/ArticleCard";
import { articles } from "@/components/insight/articlesData";

interface FeaturedArticlesProps {
  limit?: number;
  showViewAll?: boolean;
}

export default function FeaturedArticles({
  limit = 3,
  showViewAll = true,
}: FeaturedArticlesProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const orbitRef = useRef<HTMLDivElement | null>(null);

  const featuredArticles = articles.slice(0, limit);
  if (!featuredArticles || featuredArticles.length === 0) return null;

  // Deteksi desktop (min-width: 768px)
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mq = window.matchMedia("(min-width: 768px)");

    const updateMatch = () => setIsDesktop(mq.matches);
    updateMatch();

    mq.addEventListener("change", updateMatch);
    return () => mq.removeEventListener("change", updateMatch);
  }, []);

  // Scroll-linked band (satu cluster)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 75%", "end 10%"],
  });

  const bandY = useTransform(scrollYProgress, [0, 1], [32, -12]);
  const bandRotateX = useTransform(scrollYProgress, [0, 1], [10, -5]);
  const bandRotateZ = useTransform(scrollYProgress, [0, 1], [-3, 2]);
  const bandScale = useTransform(scrollYProgress, [0, 1], [0.96, 1.02]);
  const headerY = useTransform(scrollYProgress, [0, 1], [12, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 1], [0.85, 1]);

  // GSAP: orbit / ring yang muter pelan
  useEffect(() => {
    if (!orbitRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(".insight-orbit", {
        rotate: 360,
        duration: 18,
        repeat: -1,
        ease: "none",
        transformOrigin: "50% 50%",
      });

      gsap.to(".insight-orbit-dot", {
        y: -6,
        repeat: -1,
        yoyo: true,
        duration: 1.4,
        ease: "sine.inOut",
        stagger: 0.25,
      });
    }, orbitRef);

    return () => ctx.revert();
  }, []);

  return (
    <motion.section
      ref={sectionRef}
      className="relative bg-[#050509] px-6 py-20 md:py-28"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Background & orbit */}
      <div
        ref={orbitRef}
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* glow utama */}
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-purple-500/30 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-sky-500/25 blur-3xl" />

        {/* orbit ring */}
        <div className="absolute left-1/2 top-1/3 h-40 w-40 -translate-x-1/2">
          <div className="insight-orbit relative h-full w-full rounded-full border border-white/10">
            <span className="insight-orbit-dot absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-purple-300 shadow-[0_0_16px_rgba(216,180,254,0.9)]" />
            <span className="insight-orbit-dot absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-sky-300 shadow-[0_0_16px_rgba(103,232,249,0.9)]" />
            <span className="insight-orbit-dot absolute left-1/2 bottom-0 h-2 w-2 -translate-x-1/2 rounded-full bg-fuchsia-300 shadow-[0_0_16px_rgba(244,114,182,0.9)]" />
          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* HEADER */}
        <motion.div
          style={{ y: headerY, opacity: headerOpacity }}
          className="mb-10 flex flex-col gap-3 md:mb-14 md:flex-row md:items-end md:justify-between"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-white/60">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
              Insights
            </div>
            <h2 className="mt-3 text-xl md:text-2xl lg:text-3xl font-semibold text-white">
              Latest thoughts from the studio.
            </h2>
            <p className="mt-2 max-w-xl text-xs md:text-sm text-white/65">
              We've identified three recent insights that are particularly
              pertinent to driving forward the product, engineering, and AI
              solutions you are building
            </p>
          </div>

          {showViewAll && (
            <div className="flex justify-center md:justify-end">
              <Link
                href="/insight"
                className="inline-flex items-center gap-2 rounded-full bg-purple-500/25 px-5 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-purple-50 backdrop-blur-sm hover:bg-purple-500/35"
              >
                View all insights
                <span className="text-xs">↗</span>
              </Link>
            </div>
          )}
        </motion.div>

        {/* BAND 3 KARTU – diagonal + 3D scroll */}
        <motion.div
          style={
            isDesktop
              ? {
                  y: bandY,
                  rotateX: bandRotateX,
                  rotateZ: bandRotateZ,
                  scale: bandScale,
                }
              : {}
          }
          className="relative mx-auto max-w-5xl md:perspective-[1400px]"
        >
          <div className="grid gap-5 md:grid-cols-3">
            {featuredArticles.map((article, index) => {
              // Posisi visual per kartu (kiri–tengah–kanan)
              const position =
                index === 0 ? "left" : index === 1 ? "center" : "right";

              let extraClasses = "";
              if (position === "left") {
                extraClasses =
                  "md:-translate-y-4 md:-rotate-2 md:scale-95 origin-bottom-right";
              } else if (position === "center") {
                extraClasses =
                  "md:translate-y-1 md:scale-105 origin-bottom md:z-10";
              } else {
                extraClasses =
                  "md:translate-y-5 md:rotate-2 md:scale-95 origin-bottom-left";
              }

              return (
                <motion.div
                  key={article.id}
                  className={`relative ${extraClasses}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    delay: index * 0.08,
                    duration: 0.5,
                    ease: "easeOut",
                  }}
                  whileHover={
                    isDesktop
                      ? {
                          y: -10,
                          rotateX: 6,
                          rotateY:
                            position === "left"
                              ? -4
                              : position === "right"
                              ? 4
                              : 0,
                          scale: position === "center" ? 1.06 : 1.03,
                        }
                      : {}
                  }
                >
                  {/* glow bawah tiap card */}
                  <div className="pointer-events-none absolute inset-0 translate-y-5 rounded-[1.8rem] bg-linear-to-b from-purple-500/20 via-transparent to-transparent blur-2xl opacity-70" />
                  <div className="relative">
                    <ArticleCard article={article} index={index} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
