import type { Metadata } from "next";
import { BRAND_NAME, DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/seo/config";

const pageUrl = SITE_URL;
const title = "Konsultan IT & AI Semarang untuk Bisnis | Zentratech";
const description =
  "Zentratech membantu perusahaan di Semarang dan Indonesia merancang website, aplikasi, serta solusi AI yang cepat dan terukur.";

// SEO: Home metadata menegaskan kombinasi brand + keyword lokasi.
export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "konsultan IT Semarang",
    "konsultan AI Semarang",
    "software house Semarang",
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
        alt: "Zentratech IT & AI consultant Semarang",
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
