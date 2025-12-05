// metadata.ts
import type { Metadata } from "next";
import { BRAND_NAME, DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/seo/config";

const pageUrl = `${SITE_URL}/aboutus`;
const title =
  "Zentratech — Jasa IT Consultant, Pembuatan Website & AI Engineering | Semarang";
const description =
  "Zentratech (Semarang) — Jasa IT consultant, pembuatan website, dan layanan AI engineering untuk startup & enterprise. Bangun produk digital yang cepat, aman, dan terukur.";

export const metadata: Metadata = {
  title,
  description,
  // keywords membantu beberapa search engine; fokus pada longtail + lokasi
  keywords: [
    "Zentratech",
    "jasa it consultant",
    "jasa it consultant semarang",
    "konsultan IT",
    "jasa pembuatan website",
    "pembuatan website semarang",
    "jasa pembuatan AI",
    "AI engineering",
    "jasa pengembangan perangkat lunak",
    "digital product studio",
    "software development",
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
