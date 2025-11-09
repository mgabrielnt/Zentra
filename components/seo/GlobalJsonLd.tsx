// D:\zentra\components\seo\GlobalJsonLd.tsx
const baseUrl = "https://www.zentratech.id";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Zentra",
  url: baseUrl,
  logo: `${baseUrl}/logoZentraFix.png`,
  sameAs: [
    "https://www.linkedin.com/company/zentra-consultant",
    "https://github.com/zentraconsultant",
    "https://www.instagram.com/zentra.consultant/"
  ]
} as const;

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Zentra Digital Product & AI Studio",
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
