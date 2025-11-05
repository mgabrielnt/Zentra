"use client";

import Image from "next/image";
import Link from "next/link";
import { Space_Grotesk, Inter } from "next/font/google";
import { motion, useScroll, useSpring } from "motion/react";
import LiquidEther from "@/components/LiquidEther";
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

// Reveal animation
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
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

// Article data
const articles = [
  {
    id: 1,
    slug: "ai-agents-2025",
    title: "AI Agents: The Next Revolution in Enterprise Automation",
    excerpt: "Exploring how autonomous AI agents are transforming business operations and decision-making in 2025.",
    date: "2025-11-01",
    category: "Artificial Intelligence",
    image: "/images/insight/1.png",
    readTime: "8 min read"
  },
  {
    id: 2,
    slug: "quantum-computing-breakthrough",
    title: "Quantum Computing Achieves Commercial Viability",
    excerpt: "Major tech companies announce breakthrough in error correction, bringing quantum computing to mainstream applications.",
    date: "2025-10-28",
    category: "Quantum Computing",
    image: "/images/insight/2.png",
    readTime: "6 min read"
  },
  {
    id: 3,
    slug: "web-assembly-future",
    title: "WebAssembly 2.0: Redefining Web Performance",
    excerpt: "How the latest WebAssembly update is enabling near-native performance for complex web applications.",
    date: "2025-10-25",
    category: "Web Development",
    image: "/images/insight/3.png",
    readTime: "7 min read"
  },
  {
    id: 4,
    slug: "edge-computing-iot",
    title: "Edge Computing Powers Next-Gen IoT Solutions",
    excerpt: "Understanding the shift from cloud-centric to edge-first architectures in IoT ecosystems.",
    date: "2025-10-20",
    category: "Cloud & Edge",
    image: "/images/insight/4.png",
    readTime: "9 min read"
  },
  {
    id: 5,
    slug: "sustainable-tech-practices",
    title: "Green Code: Sustainable Development Practices",
    excerpt: "Best practices for reducing carbon footprint in software development and data center operations.",
    date: "2025-10-15",
    category: "Sustainability",
    image: "/images/insight/5.png",
    readTime: "5 min read"
  },
  {
    id: 6,
    slug: "blockchain-real-world",
    title: "Blockchain Beyond Crypto: Real-World Applications",
    excerpt: "How blockchain technology is solving practical problems in supply chain, healthcare, and identity verification.",
    date: "2025-10-10",
    category: "Blockchain",
    image: "/images/insight/6.png",
    readTime: "10 min read"
  }
];

// JSON-LD for SEO
function JsonLd() {
  const webpage = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Zentra Insights — Tech Articles & Trends",
    description: "Latest articles about technology trends, AI, web development, and digital innovation.",
    url: "https://example.com/insight",
    publisher: {
      "@type": "Organization",
      name: "Zentra",
      logo: "https://example.com/logo_zentra.png"
    }
  } as const;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(webpage) }}
    />
  );
}

// Article Card
function ArticleCard({ article, index }: { article: typeof articles[0]; index: number }) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
      }}
      className="will-change-transform"
    >
      <Link href={`/insight/${article.slug}`} className="group block h-full">
        <div className="h-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-purple-500/30 hover:bg-white/10 hover:shadow-[0_0_40px_rgba(168,85,247,0.25)]">
          
          {/* === IMAGE SECTION === */}
          <div className="relative aspect-[16/9] overflow-hidden rounded-t-2xl">
            <motion.div
              className="absolute inset-0"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
                priority
              />
            </motion.div>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

            {/* Shine effect */}
            <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1200ms]" />
            </div>

            {/* Category badge */}
            <div className="absolute bottom-3 left-3">
              <span className="inline-block rounded-full bg-purple-500/90 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                {article.category}
              </span>
            </div>
          </div>

          {/* === CONTENT === */}
          <div className="p-6">
            <div className="flex items-center gap-3 text-xs text-white/50">
              <time dateTime={article.date}>{formatDate(article.date)}</time>
              <span>•</span>
              <span>{article.readTime}</span>
            </div>

            <h3 className="mt-3 font-inter text-xl font-semibold text-white transition-colors group-hover:text-purple-300">
              {article.title}
            </h3>

            <p className="mt-2 font-space-grotesk text-sm leading-relaxed text-white/70">
              {article.excerpt}
            </p>

            <div className="mt-4 flex items-center gap-2 text-sm font-medium text-purple-400 transition-all group-hover:gap-3">
              <span>Read article</span>
              <motion.svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </motion.svg>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export default function InsightPage() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 220, damping: 18, mass: 0.2 });

  return (
    <main
      className={`min-h-screen bg-black ${inter.variable} ${spaceGrotesk.variable}`}
      aria-label="Zentra Insights"
    >
      {/* Top progress bar */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed left-0 right-0 top-0 z-50 h-[2px] origin-left bg-gradient-to-r from-fuchsia-500 via-purple-500 to-blue-500 transform-gpu will-change-transform"
        aria-hidden="true"
      />

      {/* ====================== HERO ====================== */}
      <section className="relative isolate overflow-hidden [--seam:#0B0B0B]">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,black_0%,black_76%,transparent_100%)] [mask-repeat:no-repeat] [mask-size:100%_100%]">
            <LiquidEther
              colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
              mouseForce={100}
              cursorSize={100}
              autoDemo
            />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,rgba(124,58,237,0.35)_0%,rgba(0,0,0,0)_60%)]" />
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-[color:var(--seam)]"
        />

        <div className="relative z-10 mx-auto max-w-5xl px-6 pb-24 sm:pb-32 md:pb-40 lg:pb-56 pt-24 md:pt-32 mt-6 md:mt-10 text-center">
          <Reveal>
            <h1 className="sr-only">
              Zentra Insights: Latest Technology Trends, AI, Web Development, and Innovation Articles
            </h1>
            <div aria-hidden="true" className="flex flex-col items-center gap-3">
              <LayoutTextFlip
                text="Insights on"
                words={[
                  "AI & Automation",
                  "Web Development",
                  "Cloud & Edge",
                  "Sustainability",
                  "Blockchain",
                  "Quantum Computing"
                ]}
                duration={2600}
              />
              <p className="font-inter text-base text-white/80 drop-shadow-[0_1px_0_rgba(0,0,0,0.35)]">
                Deep dives into emerging tech, best practices, and innovation.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ====================== ARTICLES GRID ====================== */}
      <section className="relative bg-[#0B0B0B] px-6 py-20 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, index) => (
              <ArticleCard key={article.id} article={article} index={index} />
            ))}
          </div>
        </div>

        {/* Newsletter CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
          className="mx-auto mt-20 max-w-2xl text-center"
        >
          <div className="rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-500/10 to-blue-500/10 p-8 backdrop-blur">
            <h2 className="font-inter text-2xl font-semibold text-white">Stay Updated</h2>
            <p className="mt-2 font-space-grotesk text-white/70">
              Get the latest insights delivered to your inbox monthly.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="rounded-full border border-white/20 bg-white/5 px-6 py-3 font-space-grotesk text-sm text-white placeholder:text-white/40 backdrop-blur focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
              />
              <button className="rounded-full bg-purple-500 px-6 py-3 text-sm font-medium text-white transition hover:bg-purple-600 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                Subscribe
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      <JsonLd />
    </main>
  );
}
