// D:\zentra\app\(section)\service\page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Space_Grotesk, Inter } from "next/font/google";
import { motion, useScroll, useSpring } from "motion/react";
import LiquidEther from "@/components/LiquidEther";
import ScrollStack, { ScrollStackItem } from "@/components/ScrollStack";
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

// JSON-LD: WebPage + ItemList (services)
function JsonLd() {
  const services = [
    { name: "Web & Mobile Development", slug: "dev" },
    { name: "Product Design (UI/UX)", slug: "ux" },
    { name: "Headless Commerce", slug: "commerce" },
    { name: "Machine Learning & AI", slug: "ai" },
  ];

  const webpage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    inLanguage: "en",
    name:
      "Zentra Services — Web & Mobile Development, UI/UX Design, Headless Commerce, Machine Learning & AI",
    description:
      "Zentra designs and builds modern digital products: high-performance websites, mobile apps, conversion-focused headless commerce, and pragmatic machine learning with strong SEO and Core Web Vitals.",
    url: "https://example.com/service",
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://example.com" },
        { "@type": "ListItem", position: 2, name: "Services", item: "https://example.com/service" },
      ],
    },
  } as const;

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((s, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: s.name,
      url: `https://example.com/service#${s.slug}`,
    })),
  } as const;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webpage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
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

export default function ServicePage() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 220, damping: 18, mass: 0.2 });

  // SERVICES content
  const services = [
    {
      id: "dev",
      k: "dev",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" className="opacity-80">
          <path d="M8 7l-4 5 4 5M16 7l4 5-4 5" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      ),
      title: "Web & Mobile Development",
      desc:
        "Custom websites and mobile apps with Next.js 16 & React Native, engineered for Core Web Vitals, security, and scale.",
      outcomes: ["LCP ≤ 2.5s", "OWASP-aligned auth (OAuth/OIDC)", "Modular architecture + CI/CD"],
      bullets: [
        "Modern stack: Next.js, React Native, Node, PostgreSQL/Prisma",
        "WCAG 2.2 AA accessibility, PWA-ready, technical SEO",
        "Testing/observability (Playwright, logs, traces), cloud-native infra",
      ],
      keywords:
        "custom software, web development, mobile app, next.js, react native, core web vitals, accessibility, ci/cd, security",
      tag: "Build",
      gradient: "from-indigo-500/20 via-fuchsia-500/10 to-transparent",
      chipBg: "bg-indigo-400/10 border-indigo-300/20 text-indigo-200",
    },
    {
      id: "ux",
      k: "ux",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" className="opacity-80">
          <path d="M4 7h16M4 12h10M4 17h7" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      ),
      title: "Product Design (UI/UX)",
      desc:
        "Research-driven UI/UX—discovery, wireframes, design systems, and motion specs that improve conversion and usability.",
      outcomes: ["Clear task flows", "Reusable tokens/components", "Frictionless hand-off to dev"],
      bullets: [
        "User research & JTBD, heuristic review, usability testing",
        "Design tokens, component library, accessibility by design",
        "Hi-fi prototypes, interaction/motion spec for engineers",
      ],
      keywords:
        "ui design, ux design, product design, design system, usability testing, prototype, accessibility",
      tag: "Design",
      gradient: "from-pink-500/20 via-purple-500/10 to-transparent",
      chipBg: "bg-pink-400/10 border-pink-300/20 text-pink-200",
    },
    {
      id: "commerce",
      k: "commerce",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" className="opacity-80">
          <path d="M6 6h12l-1 10H7L6 6zM9 6V5a3 3 0 016 0v1" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      ),
      title: "Headless Commerce",
      desc:
        "Conversion-focused headless storefronts with optimized checkout, subscriptions, and analytics for sustainable growth.",
      outcomes: ["Checkout optimization", "Abandoned cart recovery", "Scalable headless architecture"],
      bullets: [
        "Next.js + Shopify/Saleor/Medusa integrations",
        "Subscriptions, loyalty, promotions, and A/B testing",
        "OMS/WMS/ERP, large catalog performance, SEO for PDP/PLP",
      ],
      keywords:
        "ecommerce, headless commerce, shopify, saleor, medusa, conversion rate optimization, a/b testing, checkout optimization",
      tag: "Commerce",
      gradient: "from-cyan-500/20 via-sky-500/10 to-transparent",
      chipBg: "bg-cyan-400/10 border-cyan-300/20 text-cyan-200",
    },
    {
      id: "ai",
      k: "ai",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" className="opacity-80">
          <circle cx="12" cy="12" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l2.8 2.8M16.2 16.2L19 19M5 19l2.8-2.8M16.2 7.8L19 5" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      ),
      title: "Machine Learning & AI",
      desc:
        "Pragmatic ML/AI for automation and insight: RAG/NLP, recommendations, forecasting, and safe AI agents with guardrails.",
      outcomes: ["Faster processes", "Higher decision accuracy", "Realtime insights & monitoring"],
      bullets: [
        "Pipelines, feature store, training & MLOps (Airflow/DBT)",
        "LLM apps (RAG, function calling) with safety guardrails",
        "Dashboards, evals, human-in-the-loop; cost/perf monitoring",
      ],
      keywords:
        "machine learning, ai, rag, nlp, recommendation systems, forecasting, mlops, ai agents",
      tag: "AI",
      gradient: "from-amber-500/20 via-fuchsia-500/10 to-transparent",
      chipBg: "bg-amber-400/10 border-amber-300/20 text-amber-200",
    },
  ] as const;

  const process = [
    { t: "Discover", d: "Align goals, success metrics, and constraints. Stakeholder interviews, analytics review, and a quick opportunity map." },
    { t: "Design", d: "Information architecture, wireframes, design tokens, interactive prototyping, and accessibility review." },
    { t: "Build", d: "Incremental delivery with CI/CD, code review, automated tests, performance budgets, security hardening." },
    { t: "Scale", d: "Observability, A/B testing, SEO & CRO, CDN/caching strategy, SLOs and on-call readiness." },
  ] as const;

  return (
    <main
      className={`min-h-screen bg-black ${inter.variable} ${spaceGrotesk.variable}`}
      aria-label="Zentra Services"
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

        {/* Seam → ke section #0B0B0B */}
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

        {/* headline (ditarik lebih ke atas) */}
        <div className="relative z-10 mx-auto max-w-5xl px-6 pb-16 pt-10 md:pt-16 -mt-10 md:-mt-14 text-center">
          <Reveal>
            <h1 className="sr-only">
              Zentra Services: Web & Mobile Development, UI/UX Design, Headless Commerce, Machine Learning & AI
            </h1>
            <div aria-hidden="true" className="flex flex-col items-center gap-3">
              <LayoutTextFlip
                text="We build"
                words={[
                  "Web & Mobile Apps",
                  "UI/UX Systems",
                  "Headless Commerce",
                  "AI Solutions",
                ]}
                duration={2600}
              />
              <p className="font-inter text-base text-white/80 drop-shadow-[0_1px_0_rgba(0,0,0,0.35)]">
                From idea to impact — fast, secure, and measurable.
              </p>
            </div>
          </Reveal>

          {/* Shortcuts */}
          <Reveal delay={0.12}>
            <nav aria-label="Service shortcuts" className="mt-8 flex flex-wrap justify-center gap-3">
              {services.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur transition hover:scale-[1.02] hover:bg-white/10"
                >
                  {s.title}
                </a>
              ))}
            </nav>
          </Reveal>
        </div>
      </section>

      {/* ====================== SERVICES ====================== */}
      <section className="relative bg-[#0B0B0B] px-0 pb-28 pt-16">
        {/* seam dari hero → masuk ke #0B0B0B */}
        <div className="pointer-events-none absolute inset-x-0 -top-10 h-10 bg-gradient-to-t from-[#0B0B0B] to-transparent" />

        <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[42rem] -translate-x-1/2 rounded-full bg-purple-500/10 blur-3xl" />

        <div className="mx-auto max-w-5xl px-6">
          <Reveal>
            <p className="font-inter text-sm uppercase tracking-[0.2em] text-white/50">What We Do</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="mt-2 bg-gradient-to-b from-white to-white/70 bg-clip-text font-inter text-3xl font-semibold text-transparent md:text-5xl">
              End-to-end services for modern teams
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-4 max-w-3xl font-space-grotesk text-white/70">
              From discovery to delivery and scale-up—we unify strategy, design, and engineering for measurable outcomes.
            </p>
          </Reveal>
        </div>

        <div className="mx-auto mt-6 max-w-6xl">
          <ScrollStack
            useWindowScroll
            className="!overflow-visible !h-auto [contain:content]"
            itemDistance={160}
            itemScale={0.05}
            itemStackDistance={48}
            baseScale={0.9}
            rotationAmount={0.25}
            blurAmount={2}
          >
            {services.map((s) => (
              <ScrollStackItem
                key={s.k}
                itemClassName={`relative rounded-[40px] p-8 md:p-12 min-h-[24rem] md:min-h-[28rem]
                  border border-white/10 bg-[#0B0B0B]/70 backdrop-blur-xl transform-gpu will-change-transform
                  overflow-hidden
                  before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:bg-gradient-to-br ${s.gradient}
                  after:pointer-events-none after:absolute after:inset-0 after:rounded-[40px] after:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]`}
              >
                {/* Shine layer */}
                <div className="pointer-events-none absolute -top-1/3 left-1/2 h-[140%] w-[60%] -translate-x-1/2 rotate-[30deg] bg-gradient-to-b from-white/10 via-white/0 to-white/0 blur-2xl" />

                <article id={s.id} aria-labelledby={`${s.id}-title`} itemScope itemType="https://schema.org/Service">
                  <meta itemProp="serviceType" content={s.title} />
                  <meta itemProp="keywords" content={s.keywords} />

                  <header className="mb-6 flex items-center gap-3">
                    <span className={`rounded-full border px-2 py-0.5 text-xs ${s.chipBg}`}>{s.tag}</span>
                    <span className="text-xs text-white/50">Service</span>
                  </header>

                  <div className="flex items-start gap-4">
                    <div className="mt-1 text-white/80" aria-hidden="true">
                      {s.icon}
                    </div>
                    <div>
                      <h3
                        id={`${s.id}-title`}
                        className="font-inter text-3xl md:text-4xl font-semibold text-white tracking-tight"
                        itemProp="name"
                      >
                        {s.title}
                      </h3>
                      <p className="mt-3 max-w-3xl font-space-grotesk text-white/80" itemProp="description">
                        {s.desc}
                      </p>
                    </div>
                  </div>

                  {/* Outcomes */}
                  <ul className="mt-5 flex flex-wrap gap-2" itemProp="serviceOutput">
                    {s.outcomes.map((o) => (
                      <li key={o} className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs text-white/85">
                        {o}
                      </li>
                    ))}
                  </ul>

                  {/* Bullets */}
                  <ul className="mt-5 grid gap-2 pl-4 font-space-grotesk text-sm text-white/75 md:grid-cols-2">
                    {s.bullets.map((b) => (
                      <li key={b} className="list-disc">
                        {b}
                      </li>
                    ))}
                  </ul>

                  {/* Internal deep link */}
                  <div className="mt-6">
                    <Link
                      href={`/contact?ref=service-${s.id}`}
                      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/90 hover:bg-white/10"
                    >
                      Talk to an expert
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>

                  {/* Extra SEO copy (visually hidden) */}
                  <p className="sr-only">{s.title} by Zentra: {s.keywords}.</p>
                </article>
              </ScrollStackItem>
            ))}
          </ScrollStack>
        </div>

        {/* bottom seam → ke bg-black (Why Zentra) */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-black" />
      </section>

      {/* ====================== WHY ZENTRA ====================== */}
      <section className="relative bg-black">
        {/* top seam dari #0B0B0B */}
        <div className="pointer-events-none absolute inset-x-0 -top-8 h-8 bg-gradient-to-t from-black to-transparent" />
        <div className="mx-auto max-w-6xl px-6 py-16">
          <Reveal>
            <h2 className="bg-gradient-to-b from-white to-white/70 bg-clip-text font-inter text-3xl md:text-5xl font-semibold text-transparent">
              Why teams choose Zentra
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              { h: "Outcome-first", p: "Roadmaps tied to KPIs—speed, conversion, uptime, and cost. We ship measurable value." },
              { h: "Senior craftsmanship", p: "Design systems, clean architectures, and tests that scale—no demo-only code." },
              { h: "Performance & SEO", p: "Core Web Vitals targets, structured content, edge caching, and crawlability by design." },
            ].map((b) => (
              <Reveal key={b.h} delay={0.06}>
                <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur">
                  <h3 className="font-inter text-white text-xl">{b.h}</h3>
                  <p className="mt-2 text-white/70 font-space-grotesk">{b.p}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        {/* bottom seam → ke #0B0B0B */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-[#0B0B0B]" />
      </section>

      {/* ====================== PROCESS ====================== */}
      <section className="relative bg-[#0B0B0B]">
        {/* top seam dari black */}
        <div className="pointer-events-none absolute inset-x-0 -top-8 h-8 bg-gradient-to-t from-[#0B0B0B] to-transparent" />
        <div className="mx-auto max-w-6xl px-6 py-16">
          <Reveal>
            <h2 className="bg-gradient-to-b from-white to-white/70 bg-clip-text font-inter text-3xl md:text-5xl font-semibold text-transparent">
              How we work
            </h2>
          </Reveal>
          <ol className="mt-8 grid gap-4 md:grid-cols-4">
            {process.map((s, i) => (
              <li key={s.t} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                <div className="text-sm text-white/50">Step {i + 1}</div>
                <div className="mt-1 font-inter text-white text-xl">{s.t}</div>
                <p className="mt-2 text-white/70 font-space-grotesk">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
        {/* Seam ke latar belakang halaman (black) agar footer/akhir layar mulus */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-black" />
      </section>

      {/* JSON-LD */}
      <JsonLd />
    </main>
  );
}
