// D:\zentra\components\seo\GlobalJsonLd.tsx
import { absoluteUrl, siteConfig } from "@/lib/seo/siteMetadata";

const baseUrl = siteConfig.url;

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  legalName: siteConfig.legalName,
  url: baseUrl,
  logo: absoluteUrl(siteConfig.logoPath),
  sameAs: [
    siteConfig.socials.linkedin,
    siteConfig.socials.github,
    siteConfig.socials.instagram,
  ].filter(Boolean),
} as const;

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: `${siteConfig.name} ${siteConfig.tagline}`,
  url: baseUrl,
  inLanguage: siteConfig.defaultLocale,
  potentialAction: {
    "@type": "SearchAction",
    target: `${baseUrl}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
} as const;

export default function GlobalJsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
