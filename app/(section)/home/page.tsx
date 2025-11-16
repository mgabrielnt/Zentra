"use client";

import { useEffect, useState, useRef } from "react";
import { Space_Grotesk, Inter } from "next/font/google";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import LiquidEther from "@/components/LiquidEther";
import TextType from "@/components/TextType";
import { ServiceStrip } from "@/components/home/ServiceStrip";
import FeaturedArticles from "@/components/home/FeaturedArticles";
import AboutCTASection from "@/components/home/AboutCTASection";
import ProjectHome from "@/components/home/ProjectHome";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const scrollHintRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window === "undefined") return;
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // GSAP: animasi CTA hero
  useEffect(() => {
    if (!ctaRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".hero-cta", {
        y: 24,
        opacity: 0,
        stagger: 0.12,
        duration: 0.7,
        ease: "power3.out",
        delay: 0.3,
      });
    }, ctaRef);

    return () => ctx.revert();
  }, []);

  // GSAP: scroll hint bounce
  useEffect(() => {
    if (!scrollHintRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(".scroll-dot", {
        y: 8,
        repeat: -1,
        yoyo: true,
        duration: 0.8,
        ease: "power1.inOut",
      });
    }, scrollHintRef);

    return () => ctx.revert();
  }, []);

  const liquidProps = isMobile
    ? {
        resolution: 0.2,
        isViscous: false,
        iterationsViscous: 0,
        iterationsPoisson: 10,
        dt: 0.02,
        mouseForce: 40,
        cursorSize: 80,
        autoSpeed: 0.25,
      }
    : {
        resolution: 0.4,
        isViscous: true,
        iterationsViscous: 18,
        iterationsPoisson: 24,
        dt: 0.014,
        mouseForce: 100,
        cursorSize: 100,
        autoSpeed: 0.5,
      };

  return (
    <main
      className={`min-h-screen bg-black ${inter.variable} ${spaceGrotesk.variable}`}
    >
      {/* HERO */}
      <motion.section
        className="relative flex min-h-screen items-center overflow-hidden"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        {/* background linear */}
        <div className="pointer-events-none absolute inset-0 bg-black">
          <div className="absolute inset-0 bg-linear-radial from-purple-900/55 via-black to-black" />
        </div>

        {/* floating glows */}
        <motion.div
          className="pointer-events-none absolute -left-32 top-10 h-64 w-64 rounded-full bg-purple-500/35 blur-3xl"
          animate={{ y: [0, -18, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-fuchsia-500/30 blur-3xl"
          animate={{ y: [0, 22, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* liquid ether */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <LiquidEther
            colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
            autoDemo={true}
            mouseForce={liquidProps.mouseForce}
            cursorSize={liquidProps.cursorSize}
            resolution={liquidProps.resolution}
            isViscous={liquidProps.isViscous}
            iterationsViscous={liquidProps.iterationsViscous}
            iterationsPoisson={liquidProps.iterationsPoisson}
            dt={liquidProps.dt}
            autoSpeed={liquidProps.autoSpeed}
          />
        </div>

        {/* content */}
        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-20 md:flex-row md:items-center md:justify-between md:px-6 lg:px-8">
          {/* left */}
          <motion.div
            className="max-w-xl text-center md:text-left"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-4 py-1 text-[11px] font-medium uppercase tracking-[0.24em] text-white/65 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Digital product & AI studio
            </div>

            <div className="mb-6 space-y-3">
              <h1 className="font-inter text-4xl font-semibold tracking-tight text-white md:text-5xl lg:text-6xl">
                IT consulting & AI studio for modern teams
              </h1>
              <TextType
                as="p"
                aria-hidden="true"
                role="presentation"
                className="inline-block font-inter text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl"
                text="You imagine. We build."
                typingSpeed={80}
                deletingSpeed={50}
                pauseDuration={2000}
                loop={true}
                showCursor={true}
                cursorCharacter="|"
                cursorClassName="text-purple-400"
              />
            </div>

            <p className="mb-3 font-space-grotesk text-xs font-light uppercase tracking-[0.22em] text-white/75 md:text-sm">
              WEB DEVELOPMENT · UI/UX DESIGN · AI ENGINEER
            </p>

            <p className="mb-8 max-w-xl text-sm text-white/70 md:text-base">
              We embed with your product, design, and engineering leaders to
              architect, build, and scale web, product, and AI experiences that
              stay fast, secure, and tied to business metrics.
            </p>
          </motion.div>

          {/* right abstract card */}
          <motion.div
            className="mx-auto w-full max-w-md md:max-w-sm lg:max-w-md"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.25, duration: 0.7, ease: "easeOut" }}
          >
            <motion.div
              className="relative"
              whileHover={{ rotateX: 6, rotateY: -8, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 130, damping: 16 }}
            >
              <div className="absolute -inset-1 rounded-3xl bg-linear-to-br from-purple-500/70 via-fuchsia-400/40 to-cyan-400/60 opacity-40 blur-xl" />
              <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-linear-to-b from-white/10 via-black/75 to-black/95 p-5 shadow-[0_0_120px_rgba(124,58,237,0.5)] backdrop-blur-2xl">
                {/* top bar */}
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-400/90" />
                    <span className="h-2 w-2 rounded-full bg-amber-300/80" />
                    <span className="h-2 w-2 rounded-full bg-rose-400/80" />
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] text-white/40">
                    <span className="h-1 w-8 rounded-full bg-white/20" />
                    <span>Studio view</span>
                  </div>
                </div>

                {/* 3 modules */}
                <div className="grid grid-cols-3 gap-3 text-[11px]">
                  <motion.div
                    className="relative overflow-hidden rounded-2xl border border-purple-400/50 bg-purple-500/15 px-2.5 py-3"
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 200, damping: 18 }}
                  >
                    <div className="mb-2 h-1.5 w-8 rounded-full bg-purple-200/80" />
                    <div className="space-y-1.5">
                      <div className="h-1 w-full rounded-full bg-purple-200/50" />
                      <div className="h-1 w-3/4 rounded-full bg-purple-200/30" />
                      <div className="h-1 w-2/3 rounded-full bg-purple-200/20" />
                    </div>
                    <div className="pointer-events-none absolute -right-6 -top-4 h-10 w-10 rounded-full bg-purple-400/30 blur-xl" />
                  </motion.div>

                  <motion.div
                    className="relative overflow-hidden rounded-2xl border border-fuchsia-400/50 bg-fuchsia-500/15 px-2.5 py-3"
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.03 }}
                  >
                    <div className="mb-2 h-1.5 w-7 rounded-full bg-fuchsia-200/80" />
                    <div className="space-y-1.5">
                      <div className="flex gap-1.5">
                        <div className="h-5 flex-1 rounded-xl bg-fuchsia-300/30" />
                        <div className="h-5 flex-1 rounded-xl bg-fuchsia-200/20" />
                      </div>
                      <div className="h-1 w-4/5 rounded-full bg-fuchsia-100/25" />
                    </div>
                    <div className="pointer-events-none absolute -left-4 bottom-0 h-10 w-10 rounded-full bg-fuchsia-400/25 blur-xl" />
                  </motion.div>

                  <motion.div
                    className="relative overflow-hidden rounded-2xl border border-cyan-400/60 bg-cyan-500/12 px-2.5 py-3"
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.06 }}
                  >
                    <div className="mb-2 h-1.5 w-9 rounded-full bg-cyan-200/80" />
                    <div className="space-y-1.5">
                      <div className="h-6 w-full rounded-xl border border-cyan-200/30 bg-black/30" />
                      <div className="flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-300/70" />
                        <span className="h-1 w-10 rounded-full bg-cyan-200/40" />
                      </div>
                    </div>
                    <div className="pointer-events-none absolute right-0 bottom-0 h-9 w-9 rounded-full bg-cyan-400/25 blur-xl" />
                  </motion.div>
                </div>

                {/* bottom graph */}
                <div className="relative mt-6 h-20 overflow-hidden rounded-2xl border border-white/12 bg-linear-to-r from-white/5 via-black/60 to-black/90 px-3 py-3">
                  <div className="absolute left-3 right-3 top-1/2 h-px bg-linear-to-r from-transparent via-white/35 to-transparent" />
                  <motion.div
                    className="absolute left-6 top-3 h-2 w-2 rounded-full bg-purple-300 shadow-[0_0_18px_rgba(216,180,254,0.9)]"
                    animate={{ y: [0, 10, -4, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.div
                    className="absolute left-1/2 top-6 h-2 w-2 rounded-full bg-fuchsia-300 shadow-[0_0_18px_rgba(244,114,182,0.9)]"
                    animate={{ y: [4, -6, 8, 4] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.div
                    className="absolute right-7 top-4 h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(103,232,249,0.9)]"
                    animate={{ y: [-2, 7, -5, -2] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  />

                  <div className="absolute inset-0 opacity-60">
                    <div className="absolute bottom-2 left-4 h-6 w-8 rounded-xl bg-linear-to-t from-purple-400/50 to-transparent" />
                    <div className="absolute bottom-1 left-20 h-8 w-9 rounded-xl bg-linear-to-t from-fuchsia-400/40 to-transparent" />
                    <div className="absolute bottom-3 left-36 h-5 w-7 rounded-xl bg-linear-to-t from-sky-400/40 to-transparent" />
                    <div className="absolute bottom-1 right-6 h-7 w-10 rounded-xl bg-linear-to-t from-emerald-400/40 to-transparent" />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* scroll hint */}
        <div
          ref={scrollHintRef}
          className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center"
        >
          <div className="flex items-center gap-2 text-[11px] text-white/45">
            <div className="flex h-9 w-5 items-center justify-center rounded-full border border-white/20 bg-white/5">
              <span className="scroll-dot block h-2 w-1 rounded-full bg-white/70" />
            </div>
            <span className="hidden sm:inline">Scroll to explore the studio</span>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-b from-transparent via-black/40 to-black" />
      </motion.section>

      {/* ✅ PROJECTS - Ditambahkan di sini sebelum Services */}
      <ProjectHome />

      {/* SERVICES */}
      <ServiceStrip />

      {/* INSIGHTS */}
      <FeaturedArticles />

      {/* ABOUT + COLLAB CTA */}
      <AboutCTASection />
    </main>
  );
}