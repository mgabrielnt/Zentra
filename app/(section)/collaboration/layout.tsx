import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/seo/siteMetadata";

const title = "Kolaborasi dengan Zentratech – Konsultasi Produk Digital & AI";
const description =
  "Diskusikan kebutuhan website, aplikasi, dan solusi AI Anda melalui formulir kolaborasi resmi Zentratech.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl("/collaboration") },
  openGraph: {
    url: absoluteUrl("/collaboration"),
    type: "website",
    title,
    description,
    images: [absoluteUrl("/logoZentraFix.png")],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [absoluteUrl("/logoZentraFix.png")],
  },
  robots: { index: true, follow: true },
};

export default function CollaborationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
