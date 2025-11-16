"use client";

import { Space_Grotesk, Inter } from "next/font/google";
import ProgressBar from "@/components/insight/ProgressBar";
import InsightHero from "@/components/insight/InsightHero";
import ArticleCard from "@/components/insight/ArticleCard";
import NewsletterCTA from "@/components/insight/NewsLetterCTA";
import { articles } from "@/components/insight/articlesData";
import { absoluteUrl, siteConfig } from "@/lib/seo/siteMetadata";

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

// JSON-LD for SEO
function JsonLd() {
  const baseUrl = siteConfig.url;
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Zentra Insights — Tech Articles & Trends",
    description:
      "Latest articles about technology trends, AI, web development, and digital innovation.",
    url: absoluteUrl("/insight"),
    inLanguage: siteConfig.defaultLocale,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: baseUrl,
      logo: absoluteUrl(siteConfig.logoPath),
    },
  } as const;

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
    />
  );
}

export default function InsightPage() {
  return (
    <main
      className={`min-h-screen bg-black ${inter.variable} ${spaceGrotesk.variable}`}
      aria-label="Zentra Insights"
    >
      <ProgressBar />
      <InsightHero />

      {/* Articles Grid */}
      <section className="relative bg-[#0B0B0B] px-6 py-20 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, index) => (
              <ArticleCard key={article.id} article={article} index={index} />
            ))}
          </div>
        </div>

        <NewsletterCTA />
      </section>

      <JsonLd />
    </main>
  );
}