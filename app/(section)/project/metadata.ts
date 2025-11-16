import type { Metadata } from "next";
import { BRAND_NAME, DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/seo/config";

const pageUrl = `${SITE_URL}/project`;
const title = "Portofolio Proyek IT & AI Semarang | Zentratech";
const description =
  "Lihat contoh proyek dashboard, aplikasi, dan solusi AI yang telah dibangun Zentratech untuk klien di Semarang dan Indonesia.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "portofolio Zentratech",
    "proyek IT Semarang",
    "software house Semarang",
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
        alt: "Portofolio proyek IT & AI Zentratech",
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
