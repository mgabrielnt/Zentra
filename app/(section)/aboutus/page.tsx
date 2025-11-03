"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Space_Grotesk, Inter } from "next/font/google";
import { motion, useScroll, useSpring } from "motion/react";
import LiquidEther from "@/components/LiquidEther";
import DomeGallery from "@/components/aboutus/DomeGallery";

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
      // Add your social media URLs here
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

  const milestones = [
    { year: "2020", event: "Founded with a mission to democratize world-class digital products" },
    { year: "2021", event: "Launched 20+ projects across ecommerce, SaaS, and fintech" },
    { year: "2022", event: "Expanded to AI/ML services and headless commerce specialization" },
    { year: "2023", event: "Achieved 100% client retention rate with measurable impact" },
    { year: "2024", event: "Grew team to 50+ experts across design, engineering, and product" },
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

        {/* brand row */}
        <div className="relative z-10 flex items-center gap-3 px-6 pt-16 md:pt-24">
          <Image
            src="/logo_zentra.png"
            alt="Zentra logo"
            width={48}
            height={48}
            className="h-12 w-12 drop-shadow-[0_0_10px_rgba(128,90,213,0.5)]"
            priority
          />
          <span className="font-inter text-2xl font-bold tracking-tight text-white">Zentra.</span>
        </div>

        {/* headline */}
        <div className="relative z-10 mx-auto max-w-5xl px-6 pb-20 pt-16 md:pt-24 text-center">
          <Reveal>
            <h1 className="bg-gradient-to-b from-white via-white to-white/70 bg-clip-text font-inter text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-transparent">
              We build digital products
              <br />
              that drive real results
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mx-auto mt-6 max-w-2xl font-space-grotesk text-lg text-white/80 drop-shadow-[0_1px_0_rgba(0,0,0,0.35)]">
              Zentra is a modern digital studio focused on measurable outcomes. We combine
              strategic thinking, craft, and engineering excellence to ship products that perform.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
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
      <section className="relative bg-[#0B0B0B] px-6 py-20 md:py-32">
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
              giants—fast, secure, accessible, and data-driven. We're here to close that gap.
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

      {/* ====================== MILESTONES ====================== */}
      <section className="relative bg-[#0B0B0B] px-6 py-20 pb-32">
        {/* top seam */}
        <div className="pointer-events-none absolute inset-x-0 -top-8 h-8 bg-gradient-to-t from-[#0B0B0B] to-transparent" />

        <div className="mx-auto max-w-4xl">
          <Reveal>
            <h2 className="bg-gradient-to-b from-white to-white/70 bg-clip-text font-inter text-3xl md:text-5xl font-semibold text-transparent">
              Milestones
            </h2>
          </Reveal>

          <div className="mt-12 space-y-8">
            {milestones.map((m, i) => (
              <Reveal key={m.year} delay={i * 0.06}>
                <div className="flex gap-6 border-l-2 border-purple-500/30 pl-6">
                  <div className="shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-purple-500/30 bg-purple-500/10 font-inter text-sm font-bold text-purple-300">
                      {m.year}
                    </div>
                  </div>
                  <div className="pt-2">
                    <p className="font-space-grotesk text-lg text-white/90">{m.event}</p>
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