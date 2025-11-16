import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/seo/siteMetadata";

const title = "Tentang Zentratech – Studio Produk Digital & AI Indonesia";
const description =
  "Kenali tim Zentratech, studio digital Indonesia yang menggabungkan engineering, desain, dan AI untuk membangun produk yang berkelanjutan.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl("/aboutus") },
  openGraph: {
    url: absoluteUrl("/aboutus"),
    type: "profile",
    title,
    description,
    images: [absoluteUrl(siteConfig.logoPath)],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [absoluteUrl(siteConfig.logoPath)],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
