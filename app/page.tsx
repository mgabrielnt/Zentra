import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/seo/siteMetadata";

const title = "Jasa Pengembangan Produk Digital & AI Indonesia | Zentratech";
const description =
  "Studio digital Indonesia yang membangun website, aplikasi headless commerce, dan solusi AI yang terukur untuk brand dan perusahaan di Asia Tenggara.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl("/") },
  openGraph: {
    url: absoluteUrl("/"),
    type: "website",
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

// Reuse halaman Home lama yang ada di /(section)/home/page.tsx agar canonical Home = "/"
export { default } from "./(section)/home/page";
