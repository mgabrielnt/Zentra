import type { Metadata } from "next";
import { BRAND_NAME, DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/seo/config";

const pageUrl = `${SITE_URL}/collaboration`;
const title = "Contact Zentratech | Start an IT & AI Consulting Project";
const description =
  "Fill out the collaboration form to plan IT consulting, software delivery, or applied AI initiatives with the Zentratech team.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "contact Zentratech",
    "IT consulting inquiry",
    "AI consulting contact",
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
        alt: "Zentratech collaboration form",
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
