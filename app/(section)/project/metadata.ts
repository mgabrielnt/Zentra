import type { Metadata } from "next";
import { BRAND_NAME, DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/seo/config";

const pageUrl = `${SITE_URL}/project`;
const title = "Digital Product & AI Project Portfolio | Zentratech";
const description =
  "Explore dashboards, applications, and AI initiatives delivered by Zentratech for enterprise and growth-stage teams.";

export const metadata: Metadata = {
  title,
  description,
  keywords: ["Zentratech portfolio", "digital product case studies", "AI project examples"],
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
        alt: "Zentratech digital product and AI project portfolio",
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
