"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Space_Grotesk, Inter } from "next/font/google";
import { motion, useScroll, useSpring } from "motion/react";
import LiquidEther from "@/components/LiquidEther";
import DomeGallery from "@/components/aboutus/DomeGallery";
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";

// Fonts
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

// JSON-LD: Organization
function JsonLd() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Zentra",
    description:
      "Zentra designs and builds modern digital products with focus on performance, accessibility, and measurable business outcomes.",
    url: "https://example.com",
    logo: "https://example.com/logo_zentra.png",
    foundingDate: "2020",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      url: "https://example.com/contact",
    },
    sameAs: [
      "https://linkedin.com/company/zentra",
      "https://twitter.com/zentra",
    ],
  } as const;

  const webpage = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Zentra — Modern Digital Product Studio",
    description:
      "Learn about Zentra's mission to build fast, secure, and measurable digital products. Meet our team and discover our values.",
    url: "https://example.com/aboutus",
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://example.com" },
        { "@type": "ListItem", position: 2, name: "About Us", item: "https://example.com/aboutus" },
      ],
    },
  } as const;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webpage) }}
      />
    </>
  );
}

// Reveal helper
function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -42 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

export default function AboutUsPage() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 220, damping: 18, mass: 0.2 });

  const stats = [
    { number: "20+", label: "Projects Delivered" },
    { number: "20+", label: "Happy Clients" },
    { number: "3+", label: "Years Experience" },
    { number: "100%", label: "Client Satisfaction" },
  ];

  return (
    <main
      className={`min-h-screen bg-black ${inter.variable} ${spaceGrotesk.variable}`}
      aria-label="About Zentra"
    >
      {/* Top progress bar */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed left-0 right-0 top-0 z-50 h-[2px] origin-left bg-gradient-to-r from-fuchsia-500 via-purple-500 to-blue-500 transform-gpu will-change-transform"
        aria-hidden="true"
      />

      {/* ====================== HERO ====================== */}
      <section className="relative isolate overflow-hidden [--seam:#0B0B0B]">
        {/* LiquidEther + fade bottom */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,black_0%,black_76%,transparent_100%)] [mask-repeat:no-repeat] [mask-size:100%_100%]">
            <LiquidEther
              colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
              mouseForce={100}
              cursorSize={100}
              autoDemo
            />
          </div>
          {/* Radial glow */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,rgba(124,58,237,0.35)_0%,rgba(0,0,0,0)_60%)]" />
        </div>

        {/* Seam */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-[color:var(--seam)]"
        />

        {/* Headline */}
        <div
          className="relative z-10 mx-auto max-w-5xl px-6 
               pb-16 sm:pb-20 md:pb-24 lg:pb-32
               pt-24 md:pt-32
               mt-6 md:mt-10 
               text-center"
        >
          <Reveal>
            <h1 className="sr-only">
              About Zentra: We are innovators, craftspeople, and problem solvers building digital products that drive real results
            </h1>
            <div aria-hidden="true" className="flex flex-col items-center gap-3">
              <LayoutTextFlip
                text="We are"
                words={[
                  "Innovators",
                  "Craftspeople",
                  "Problem Solvers",
                  "Dream Builders",
                ]}
                duration={2600}
              />
              <p className="font-inter text-base text-white/80 drop-shadow-[0_1px_0_rgba(0,0,0,0.35)]">
                Building digital products that drive real results.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/collaboration"
                className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
              >
                Start a project
              </Link>
              <Link
                href="/service"
                className="rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium text-white backdrop-blur transition hover:bg-white/10"
              >
                Our services
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ====================== MISSION ====================== */}
      <section className="relative bg-[#0B0B0B] px-6 pt-20 pb-20 md:pt-32 md:pb-32">
        {/* top seam */}
        <div className="pointer-events-none absolute inset-x-0 -top-10 h-10 bg-gradient-to-t from-[#0B0B0B] to-transparent" />

        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <p className="font-inter text-sm uppercase tracking-[0.2em] text-white/50">Our Mission</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-4 bg-gradient-to-b from-white to-white/70 bg-clip-text font-inter text-3xl md:text-5xl font-semibold text-transparent">
              Make world-class digital products accessible to ambitious teams
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 font-space-grotesk text-lg text-white/70">
              We believe every business deserves products built with the same rigor as the tech
              giants—fast, secure, accessible, and data-driven. Were here to close that gap.
            </p>
          </Reveal>
        </div>

        {/* bottom seam */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-black" />
      </section>

      {/* ====================== DOME GALLERY ====================== */}
      <section className="relative bg-black">
        {/* top seam */}
        <div className="pointer-events-none absolute inset-x-0 -top-8 h-8 bg-gradient-to-t from-black to-transparent" />

        <div className="mx-auto max-w-6xl px-6 py-16">
          <Reveal>
            <h2 className="text-center bg-gradient-to-b from-white to-white/70 bg-clip-text font-inter text-3xl md:text-5xl font-semibold text-transparent">
              Our Journey
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="mx-auto mt-4 max-w-2xl text-center font-space-grotesk text-white/70">
              From concept to execution—moments that shaped who we are today.
            </p>
          </Reveal>
        </div>

        {/* DomeGallery Container */}
        <div className="relative h-[70vh] md:h-[80vh] w-full">
          <DomeGallery />
        </div>

        {/* bottom seam */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-[#0B0B0B]" />
      </section>

      {/* ====================== STATS ====================== */}
      <section className="relative bg-[#0B0B0B] px-6 py-20 pb-32">
        {/* top seam */}
        <div className="pointer-events-none absolute inset-x-0 -top-8 h-8 bg-gradient-to-t from-[#0B0B0B] to-transparent" />

        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="text-center bg-gradient-to-b from-white to-white/70 bg-clip-text font-inter text-3xl md:text-5xl font-semibold text-transparent">
              By the Numbers
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="mx-auto mt-4 max-w-2xl text-center font-space-grotesk text-white/70">
              Our track record speaks for itself—delivering excellence across every project.
            </p>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.08}>
                <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-8 text-center backdrop-blur-sm transition-all hover:border-purple-500/30 hover:bg-white/10">
                  {/* Glow effect on hover */}
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100">
                    <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-transparent" />
                  </div>
                  
                  <div className="relative">
                    <div className="bg-gradient-to-b from-white to-purple-200 bg-clip-text font-inter text-5xl md:text-6xl font-bold text-transparent">
                      {stat.number}
                    </div>
                    <div className="mt-3 font-space-grotesk text-sm uppercase tracking-wider text-white/60">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* JSON-LD */}
      <JsonLd />
    </main>
  );
}