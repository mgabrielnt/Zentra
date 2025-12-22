'use client';

import Link from "next/link";
import type { ReactNode } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import LiquidEther from "@/components/LiquidEther";
import DomeGallery from "@/components/aboutus/DomeGallery";
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
import { BRAND_NAME, PRIMARY_LOCATION, SITE_URL } from "@/lib/seo/config";

// NOTE: we intentionally DO NOT import next/font/google here to avoid loader/type mismatch.

function JsonLd() {
  const address = {
    "@type": "PostalAddress",
    addressLocality: PRIMARY_LOCATION.city,
    addressRegion: PRIMARY_LOCATION.region,
    addressCountry: PRIMARY_LOCATION.countryCode,
  } as const;

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}#organization`,
    name: BRAND_NAME,
    legalName: BRAND_NAME,
    url: SITE_URL,
    description:
      "Zentratech is a digital product, IT consulting, and AI studio focused on performant, accessible, and measurable outcomes. Zentratech combines expertise in AI engineering, web development, and IT consulting to help teams prototype and scale modern software.",
    logo: `${SITE_URL}/logoZentraFix.png`,
    foundingDate: "2022",
    sameAs: [
      "https://www.linkedin.com/company/zentra-consultant",
      "https://github.com/zentraconsultant",
      "https://www.instagram.com/zentra.consultant/",
    ],
    address,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        url: `${SITE_URL}/collaboration`,
        areaServed: "Worldwide",
        availableLanguage: ["en"],
      },
    ],
  } as const;

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}#website`,
    url: SITE_URL,
    name: BRAND_NAME,
    inLanguage: "en",
    potentialAction: [
      {
        "@type": "SearchAction",
        target: `${SITE_URL}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    ],
  } as const;

  const webpage = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${SITE_URL}/aboutus#webpage`,
    url: `${SITE_URL}/aboutus`,
    inLanguage: "en",
    isPartOf: {
      "@id": `${SITE_URL}#website`,
    },
    name: "About Zentratechs — Digital Product & AI Consulting Studio",
    description:
      "Learn about Zentratech, a Semarang, Indonesia-based studio helping teams launch high-performance digital products and AI solutions. Keywords: Zentratech, IT consultant, jasa pembuatan AI, jasa pembuatan web, digital product, AI engineering.",
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        {
          "@type": "ListItem",
          position: 2,
          name: "About",
          item: `${SITE_URL}/aboutus`,
        },
      ],
    },
  } as const;

  const service = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}#service`,
    name: BRAND_NAME,
    url: SITE_URL,
    description:
      "IT consulting, AI engineering, and digital product development services delivered by Zentratech.",
    areaServed: [
      {
        "@type": "City",
        name: PRIMARY_LOCATION.city,
        addressRegion: PRIMARY_LOCATION.region,
        addressCountry: PRIMARY_LOCATION.countryCode,
      },
      { "@type": "Country", name: PRIMARY_LOCATION.countryName },
    ],
    address,
  } as const;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webpage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }}
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
  const progress = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 18,
    mass: 0.2,
  });

  const stats = [
    { number: "20+", label: "Projects Delivered" },
    { number: "20+", label: "Happy Clients" },
    { number: "3+", label: "Years Experience" },
    { number: "100%", label: "Client Satisfaction" },
  ];

  return (
    <main
      // Use CSS variables (set in globals.css) to apply fonts site-wide.
      className="min-h-screen bg-black"
      aria-label="About Zentratech – Digital Product and AI Consulting Studio"
      style={{
        // primary family fallback order: Inter then Space Grotesk then system fallbacks
        fontFamily:
          "var(--font-inter), var(--font-space-grotesk), system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
      }}
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
          className="relative z-10 mx-auto mt-6 max-w-5xl px-6 pt-24 pb-16 text-center sm:pb-20 md:mt-10 md:pt-32 md:pb-24 lg:pb-32"
        >
          <Reveal>
            <h1 className="font-inter text-4xl font-semibold tracking-tight text-white md:text-5xl">
              About Zentratech
            </h1>
          </Reveal>
          <Reveal delay={0.04}>
            <div aria-hidden="true" className="mt-4 flex flex-col items-center gap-3">
              <LayoutTextFlip
                text="We are"
                words={["Innovators", "Craftspeople", "Problem solvers", "Dream builders"]}
                duration={2600}
              />
              <p className="font-inter text-base text-white/80 drop-shadow-[0_1px_0_rgba(0,0,0,0.35)]">
                Building digital products that drive real results.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="mx-auto mt-5 max-w-2xl font-space-grotesk text-sm text-white/70">
              Zentratech is a digital product, IT consulting, and AI studio that partners
              with ambitious teams to ship performant experiences, resilient platforms,
              and measurable business outcomes.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-3 max-w-2xl font-space-grotesk text-sm text-white/70">
              We are based in {PRIMARY_LOCATION.city}, {PRIMARY_LOCATION.countryName} and work with clients remotely worldwide.
            </p>
          </Reveal>

          {/* Tambahan SEO-friendly tanpa mengarah ke halaman layanan */}
          <Reveal delay={0.14}>
            <p className="mx-auto mt-4 max-w-2xl font-space-grotesk text-sm text-white/70">
              As an IT consultant and product studio, Zentratech blends software engineering,
              product design, and applied AI research to help teams explore new ideas. Our
              portfolio emphasizes practical outcomes — from prototype experiments in AI
              to scalable web platforms and integrations. Keywords we commonly align with
              include: Zentratech, IT consultant, jasa pembuatan AI, jasa pembuatan web,
              AI engineering, and web development.
            </p>
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
            <p className="font-inter text-sm uppercase tracking-[0.2em] text-white/50">
              Our Mission
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-4 bg-gradient-to-b from-white to-white/70 bg-clip-text font-inter text-3xl md:text-5xl font-semibold text-transparent">
              Make world-class digital products accessible to ambitious teams
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 font-space-grotesk text-lg text-white/70">
              We believe every business deserves products built with the same rigor as the tech
              giants—fast, secure, accessible, and data-driven. We are here to close that gap
              for ambitious brands everywhere.
            </p>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mx-auto mt-6 max-w-2xl font-space-grotesk text-base text-white/70">
              Our approach is research-driven and pragmatic. As an IT consultant and studio
              focused on both AI and web, we invest in clear engineering practices, observability,
              and user-centered design. That means combining experimentation in machine learning
              and AI with strong foundations in web architecture and platform engineering. This
              positioning lets Zentratech support discovery, prototyping, and long-term product
              craft without duplicating the detail found on our services pages.
            </p>
          </Reveal>
        </div>

        {/* bottom seam */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-black" />
      </section>

      {/* ====================== EXPERTISE (SEO-RICH, NON-SERVICE) ====================== */}
      <section className="relative bg-black px-6 py-16">
        <div className="mx-auto max-w-6xl text-center">
          <Reveal>
            <h3 className="text-center bg-gradient-to-b from-white to-white/70 bg-clip-text font-inter text-2xl md:text-3xl font-semibold text-transparent">
              Expertise & Focus
            </h3>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="mx-auto mt-4 max-w-3xl text-center font-space-grotesk text-white/70">
              Zentratech's work spans several domains that frequently overlap: applied AI
              research and prototyping (jasa pembuatan AI), modern web engineering and progressive
              web apps (jasa pembuatan web), platform reliability, and product strategy. We often
              act as technical partners or IT consultants during discovery and early product
              phases—helping teams make informed technical decisions while keeping product
              outcomes central.
            </p>
          </Reveal>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <Reveal delay={0.12}>
              <div className="rounded-2xl border border-white/10 p-6 text-left backdrop-blur-sm">
                <h4 className="font-inter text-lg font-semibold text-white">AI & Research</h4>
                <p className="mt-2 font-space-grotesk text-sm text-white/60">
                  Experimentation in models, data pipelines, and applied ML that lead to tangible
                  product improvements.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="rounded-2xl border border-white/10 p-6 text-left backdrop-blur-sm">
                <h4 className="font-inter text-lg font-semibold text-white">Web & Platforms</h4>
                <p className="mt-2 font-space-grotesk text-sm text-white/60">
                  Modern web apps, performance engineering, and long-running platform
                  architecture — built for scale and maintainability.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.20}>
              <div className="rounded-2xl border border-white/10 p-6 text-left backdrop-blur-sm">
                <h4 className="font-inter text-lg font-semibold text-white">Consulting & Strategy</h4>
                <p className="mt-2 font-space-grotesk text-sm text-white/60">
                  Practical IT consulting and technical leadership focused on prioritization,
                  technical debt, and measurable outcomes.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
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
              From concept to execution—moments that shaped who we are today at Zentratech.
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
