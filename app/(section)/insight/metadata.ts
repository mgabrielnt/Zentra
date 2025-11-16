import type { Metadata } from "next";
import { BRAND_NAME, DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/seo/config";

const pageUrl = `${SITE_URL}/insight`;
const title = "Insight Transformasi Digital & AI | Zentratech Semarang";
const description =
  "Wawasan seputar konsultasi IT, pengembangan software, dan AI dari tim Zentratech untuk membantu bisnis Indonesia.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "insight IT Semarang",
    "blog AI Indonesia",
    "transformasi digital",
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
        alt: "Zentratech insight IT & AI Semarang",
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
