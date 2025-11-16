import type { Metadata } from "next";
import { BRAND_NAME, DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/seo/config";

const pageUrl = `${SITE_URL}/insight`;
const title = "Digital Transformation & AI Insights | Zentratech";
const description =
  "Articles on IT consulting, software engineering, and applied AI from the Zentratech team.";

export const metadata: Metadata = {
  title,
  description,
  keywords: ["IT consulting insights", "AI consulting blog", "digital transformation"],
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
        alt: "Zentratech IT and AI insights",
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
