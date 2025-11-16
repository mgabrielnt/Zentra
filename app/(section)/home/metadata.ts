import type { Metadata } from "next";
import { BRAND_NAME, DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/seo/config";

const pageUrl = SITE_URL;
const title = "IT Consulting, AI Engineering & Product Studio | Zentratech";
const description =
  "Zentratech helps digital teams ship resilient web platforms, applied AI solutions, and headless commerce builds with measurable impact.";

// SEO: homepage stakes the brand on core consulting and delivery themes.
export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "IT consulting services",
    "AI consulting company",
    "custom software development",
    "Zentratech",
  ],
  alternates: { canonical: pageUrl },
  openGraph: {
    type: "website",
    url: pageUrl,
    title,
    description,
    siteName: BRAND_NAME,
    images: [
      {
        url: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
        width: 1200,
        height: 630,
        alt: "Zentratech IT and AI consulting studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [`${SITE_URL}${DEFAULT_OG_IMAGE}`],
  },
};
