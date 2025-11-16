import type { Metadata } from "next";
import { BRAND_NAME, DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/seo/config";

const pageUrl = `${SITE_URL}/aboutus`;
const title = "About Zentratech – IT & AI Consulting Studio in Semarang, Indonesia";
const description =
  "Meet Zentratech, an IT consulting and AI studio from Semarang, Indonesia focused on performant digital products, AI delivery, and measurable results.";

export const metadata: Metadata = {
  title,
  description,
  keywords: ["about Zentratech", "IT consulting studio", "AI consulting"],
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
        alt: "About the Zentratech IT and AI consulting studio",
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
