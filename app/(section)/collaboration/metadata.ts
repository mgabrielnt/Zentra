import type { Metadata } from "next";
import { BRAND_NAME, DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/seo/config";

const pageUrl = `${SITE_URL}/collaboration`;
const title = "Hubungi Konsultan IT & AI Zentratech Semarang";
const description =
  "Isi formulir kolaborasi untuk menjadwalkan sesi konsultasi IT, pengembangan software, atau inisiatif AI bersama tim Zentratech.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "hubungi Zentratech",
    "kolaborasi IT Semarang",
    "konsultan AI Semarang",
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
        alt: "Form kolaborasi Zentratech",
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
