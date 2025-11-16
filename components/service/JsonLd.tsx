"use client";

import { BRAND_NAME, PRIMARY_LOCATION, SITE_URL } from "@/lib/seo/config";

export default function JsonLd() {
  const services = [
    { name: "Web & Mobile Development", slug: "dev" },
    { name: "Product Design (UI/UX)", slug: "ux" },
    { name: "Headless Commerce", slug: "commerce" },
    { name: "Machine Learning & AI", slug: "ai" },
  ] as const;

  const baseUrl = SITE_URL;

  const webpage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    inLanguage: "en",
    name:
      "Zentra Services  Web & Mobile Development, UI/UX Design, Headless Commerce, Machine Learning & AI",
    description:
      "Zentra designs and builds modern digital products: high-performance websites, mobile apps, conversion-focused headless commerce, and pragmatic machine learning with strong SEO and Core Web Vitals.",
    url: `${baseUrl}/service`,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
        { "@type": "ListItem", position: 2, name: "Services", item: `${baseUrl}/service` },
      ],
    },
  } as const;

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((s, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: s.name,
      url: `${baseUrl}/service#${s.slug}`,
    })),
  } as const;

  const professionalService = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${BRAND_NAME} IT & AI Consulting`,
    url: baseUrl,
    areaServed: [
      {
        "@type": "City",
        name: PRIMARY_LOCATION.city,
        addressRegion: PRIMARY_LOCATION.region,
        addressCountry: PRIMARY_LOCATION.countryCode,
      },
      { "@type": "Country", name: "Indonesia" },
    ],
    serviceType: services.map((service) => service.name),
    availableLanguage: ["en", "id"],
  } as const;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webpage) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalService) }}
      />
    </>
  );
}
