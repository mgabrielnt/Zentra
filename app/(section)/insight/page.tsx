"use client";

import ProgressBar from "@/components/insight/ProgressBar";
import InsightHero from "@/components/insight/InsightHero";
import ArticleCard from "@/components/insight/ArticleCard";
import NewsletterCTA from "@/components/insight/NewsLetterCTA";
import { articles } from "@/components/insight/articlesData";
import { BRAND_NAME, SITE_URL } from "@/lib/seo/config";
import { Space_Grotesk, Inter } from "next/font/google";  // ← Tambahkan ini
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
  const pageUrl = `${SITE_URL}/insight`;
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${BRAND_NAME} Insights — IT & AI Consulting`,
    description:
      "Curated thoughts on IT consulting, software engineering, AI, and digital transformation from the Zentratech team.",
    inLanguage: "en",
    url: pageUrl,
    publisher: {
      "@type": "Organization",
      name: BRAND_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logoZentraFix.png`,
      },
    },
    blogPost: articles.map((article) => ({
      "@type": "BlogPosting",
      headline: article.title,
      datePublished: article.date,
      dateModified: article.date,
      description: article.excerpt,
      image: `${SITE_URL}${article.image}`,
      url: `${pageUrl}/${article.slug}`,
    })),
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
      aria-label="Zentratech insights"
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