// D:\zentra\app\(section)\insight\page.tsx
import type { Metadata } from "next";
import {
  CANONICAL,
  SITE,
  BRAND,
  OG_IMG,
  primaryKeyword,
  secondaryKeywords,
  topics,
  industries,
  formats,
  news,
  articles,
  buildJsonLd,
} from "@/components/insight/insight-data";
import { HeroInsight } from "@/components/insight/HeroInsight";
import { NewsSection } from "@/components/insight/NewsSection";
import { ArticlesSection } from "@/components/insight/ArticlesSection";

/* -------------------------------------------------------
   SEO METADATA (server) — canonical + OG/Twitter
------------------------------------------------------- */
export const metadata: Metadata = {
  title: "IT Consulting Insights | News & Articles for CIOs | Zentra",
  description:
    "Vendor-neutral IT consulting insights for CIOs and business leaders. Read fresh news, deep articles, and playbooks on AI, cloud, cyber, and data. Subscribe today.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: "website",
    url: CANONICAL,
    title: "IT Consulting Insights — News & Articles for CIOs",
    description:
      "Fresh, vendor-neutral news and long-form guidance to move from strategy to impact.",
    images: [{ url: OG_IMG }],
  },
  twitter: {
    card: "summary_large_image",
    title: "IT Consulting Insights — News & Articles for CIOs",
    description:
      "Fresh, vendor-neutral news and long-form guidance to move from strategy to impact.",
    images: [OG_IMG],
    site: "@zentra",
  },
};

/* -------------------------------------------------------
   PAGE
------------------------------------------------------- */
export default function InsightsPage() {
  const jsonLd = buildJsonLd();

  return (
    <main className="relative bg-[#0B0B0B] text-white">
      <HeroInsight topics={topics} industries={industries} formats={formats} />

      <NewsSection items={news} />

      <ArticlesSection
        items={articles}
        primaryKeyword={primaryKeyword}
        secondaryKeywords={secondaryKeywords}
      />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}