import type { Metadata } from "next";
import { BRAND_NAME, DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/seo/config";

const pageUrl = `${SITE_URL}/aboutus`;
const title = "Tentang Zentratech – Konsultan IT & AI Semarang";
const description =
  "Kenali Zentratech (Zentra), konsultan IT dan studio AI dari Semarang yang membantu bisnis Indonesia membangun produk digital berkinerja tinggi.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "tentang Zentratech",
    "konsultan IT Semarang",
    "studio AI Indonesia",
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
        alt: "Tentang Zentratech Semarang",
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
