// SEO: Shared Organization + Website schema to help Google understand the brand footprint.
import { BRAND_NAME, SITE_URL } from "@/lib/seo/config";

const baseUrl = SITE_URL;

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: BRAND_NAME,
  url: baseUrl,
  logo: `${baseUrl}/logoZentraFix.png`,
  sameAs: [
    "https://www.linkedin.com/company/zentra-consultant",
    "https://github.com/zentraconsultant",
    "https://www.instagram.com/zentra.consultant/",
  ],
  // TODO (SEO): Tambahkan alamat lengkap ketika sudah siap untuk sinyal LocalBusiness yang lebih kuat.
} as const;

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: `${BRAND_NAME} Digital Product & AI Studio`,
  url: baseUrl,
  inLanguage: "en",
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
