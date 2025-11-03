import type { ReactNode } from "react";

export type ServiceItem = {
  id: string;
  k: string;
  icon: ReactNode;
  title: string;
  desc: string;
  outcomes: string[];
  bullets: string[];
  keywords: string;
  tag: string;
  gradient: string;
  chipBg: string;
};

export type ProcessStep = { t: string; d: string };

export const services: readonly ServiceItem[] = [
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
    outcomes: ["LCP  2.5s", "OWASP-aligned auth (OAuth/OIDC)", "Modular architecture + CI/CD"],
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
      "Research-driven UI/UXdiscovery, wireframes, design systems, and motion specs that improve conversion and usability.",
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

export const process: readonly ProcessStep[] = [
  { t: "Discover", d: "Align goals, success metrics, and constraints. Stakeholder interviews, analytics review, and a quick opportunity map." },
  { t: "Design", d: "Information architecture, wireframes, design tokens, interactive prototyping, and accessibility review." },
  { t: "Build",  d: "Incremental delivery with CI/CD, code review, automated tests, performance budgets, security hardening." },
  { t: "Scale",  d: "Observability, A/B testing, SEO & CRO, CDN/caching strategy, SLOs and on-call readiness." },
] as const;
