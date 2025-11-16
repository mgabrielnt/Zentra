import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/seo/siteMetadata";

const title = "Zentra Insights – Artikel Teknologi, AI, dan Pengembangan Produk";
const description =
  "Panduan dan opini tentang AI, pengembangan web, headless commerce, serta inovasi digital dari tim Zentratech.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: absoluteUrl("/insight"),
  },
  openGraph: {
    url: absoluteUrl("/insight"),
    type: "website",
    title,
    description,
    siteName: siteConfig.siteName,
    images: [absoluteUrl(siteConfig.logoPath)],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [absoluteUrl(siteConfig.logoPath)],
  },
};

export default function InsightLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
