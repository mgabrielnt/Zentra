import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/seo/siteMetadata";

const title = "Portofolio Proyek Digital & AI | Zentratech";
const description =
  "Lihat studi kasus dashboard, aplikasi web, landing page, dan sistem AI yang dibangun tim Zentratech.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl("/project") },
  openGraph: {
    url: absoluteUrl("/project"),
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

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
