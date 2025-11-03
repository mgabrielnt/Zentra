// D:\zentra\components\insight\insight-data.ts

/* -------------------------------------------------------
   SEO BASE
------------------------------------------------------- */
export const CANONICAL = "https://www.zentra.tech/insights";
export const SITE = "https://www.zentra.tech";
export const BRAND = "Zentra";
export const OG_IMG = `${SITE}/images/og/insights.jpg`;

/* -------------------------------------------------------
   STATIC DATA (content & SEO cluster)
------------------------------------------------------- */
export const primaryKeyword = "IT consulting insights";

export const secondaryKeywords = [
  "enterprise IT strategy",
  "digital transformation",
  "cloud migration",
  "AI governance",
  "cybersecurity compliance",
  "data platform modernization",
  "DevOps best practices",
  "IT procurement",
  "software architecture patterns",
];

export const topics = [
  "AI Governance",
  "Cloud & DevOps",
  "Cybersecurity",
  "Data & Analytics",
  "Architecture",
  "Procurement",
  "Operating Model",
  "Emerging Tech",
];

export const industries = [
  "Financial Services",
  "Retail & CPG",
  "Healthcare",
  "Public Sector",
  "Manufacturing",
  "Telco",
];

export const formats = ["News", "Article", "Case Study"];

export const news = [
  {
    slug: "/insights/ai-governance/eu-ai-act-2025",
    title: "EU AI Act transparency milestones: what changes by Aug ’25",
    dek: "Key transparency and GPAI obligations begin in 2025—what to prepare now, and what can wait.",
    datePublished: "2025-11-03T10:30:00+07:00",
    image: "/images/insights/eu-ai-act.jpg",
    alt: "Policy portal highlighting AI transparency milestones and governance checkpoints.",
    section: "News",
  },
  {
    slug: "/insights/cybersecurity/cis-controls-81",
    title: "CIS Controls v8.1 adds “Govern”: implications for cloud",
    dek: "Why adding a “Govern” function shifts your backlog and metrics for cyber programs.",
    datePublished: "2025-10-28T09:05:00+07:00",
    image: "/images/insights/cis-81.jpg",
    alt: "Security architecture diagram mapped to pipelines and cloud services.",
    section: "News",
  },
  {
    slug: "/insights/cybersecurity/nis2-technical-guidance",
    title: "ENISA issues NIS2 technical guidance: priorities for 2026",
    dek: "Concrete risk-management measures to operationalize NIS2 in complex enterprises.",
    datePublished: "2025-10-15T14:20:00+07:00",
    image: "/images/insights/nis2.jpg",
    alt: "Cyber risk dashboard with prioritized safeguards and incident workflows.",
    section: "News",
  },
  {
    slug: "/insights/data-platforms/finops-2026",
    title: "Data platform costs: new levers for FinOps in 2026",
    dek: "Storage tiering, query governance, and serving patterns that cut spend without losing speed.",
    datePublished: "2025-10-05T11:10:00+07:00",
    image: "/images/insights/finops.jpg",
    alt: "Charts of storage, compute, and serving costs to optimize analytics platform spend.",
    section: "News",
  },
  {
    slug: "/insights/procurement/outcome-based-contracts",
    title: "Procurement playbook: outcome-based contracts gain traction",
    dek: "Buyers favor KPIs tied to adoption and value realization, not activity counts.",
    datePublished: "2025-09-29T16:00:00+07:00",
    image: "/images/insights/procurement.jpg",
    alt: "Contract with highlighted outcome KPIs and adoption metrics for staged payments.",
    section: "News",
  },
  {
    slug: "/insights/cloud-devops/latency-regionality",
    title: "Cloud regions & latency: when “local” beats “multi-region”",
    dek: "For regulated workloads, why proximity and data-residency can trump global footprints.",
    datePublished: "2025-09-20T08:45:00+07:00",
    image: "/images/insights/cloud-regions.jpg",
    alt: "Map of regional cloud zones with latency contours and residency considerations.",
    section: "News",
  },
];

export type NewsItem = (typeof news)[number];

export const articles = [
  {
    slug: "/insights/ai-governance/nist-iso-42001-operationalization",
    title: "Operationalizing AI Governance with NIST AI RMF + ISO 42001",
    dek: "Map strategy to controls, then to platform guardrails and change-management.",
    author: "A. Rahman",
    lastUpdated: "2025-10-30",
    wordCount: 1950,
    image: "/images/insights/ai-governance.jpg",
    alt: "AI governance controls mapped to CI/CD guardrails and model oversight.",
    section: "Article",
  },
  {
    slug: "/insights/cloud-devops/strangler-fig-modernization",
    title: "Cloud Modernization Without Rewrites: The Strangler Fig Playbook",
    dek: "Carve-out services, event seams, and traffic-shaping to de-risk modernization.",
    author: "N. Tambun",
    lastUpdated: "2025-10-24",
    wordCount: 1600,
    image: "/images/insights/strangler-fig.jpg",
    alt: "Incremental carve-outs and event seams from monolith to cloud.",
    section: "Article",
  },
  {
    slug: "/insights/cybersecurity/cis-controls-devops",
    title: "Security That Ships: Using CIS Controls v8.1 in DevOps",
    dek: "Convert controls into pipelines, SLOs, and runbooks teams actually use.",
    author: "S. Widjaja",
    lastUpdated: "2025-10-18",
    wordCount: 1700,
    image: "/images/insights/cis-devops.jpg",
    alt: "DevOps pipeline view with security checks and automated evidence collection.",
    section: "Article",
  },
  {
    slug: "/insights/data-platforms/data-products-funding",
    title: "Data Products, Not Data Lakes: Funding Models That Work",
    dek: "Product ownership, SLAs, and value streams for analytics that pay back.",
    author: "L. Chen",
    lastUpdated: "2025-10-10",
    wordCount: 2100,
    image: "/images/insights/data-products.jpg",
    alt: "Product canvas for analytics with clear SLAs, owners, and value streams.",
    section: "Article",
  },
  {
    slug: "/insights/procurement/outcome-based-it-procurement",
    title: "From RFP to Results: Outcome-Based IT Procurement",
    dek: "Tie payments to adoption, business KPIs, and time-to-value.",
    author: "M. Santoso",
    lastUpdated: "2025-09-30",
    wordCount: 1500,
    image: "/images/insights/procurement-ob.jpg",
    alt: "Payment milestones aligned to measurable business outcomes and adoption curves.",
    section: "Article",
  },
  {
    slug: "/insights/architecture/hexagonal-event-driven",
    title: "Architecting for Change: Hexagonal + Event-Driven Patterns",
    dek: "Ports/adapters and events for evolvable, testable systems at scale.",
    author: "R. Kurnia",
    lastUpdated: "2025-09-22",
    wordCount: 1800,
    image: "/images/insights/hexagonal-events.jpg",
    alt: "Ports and adapters with event streams enabling evolvable system boundaries.",
    section: "Article",
  },
];

export type ArticleItem = (typeof articles)[number];

/* -------------------------------------------------------
   HELPERS + JSON-LD
------------------------------------------------------- */
const wordsToAbout = (t: string) => {
  if (t.toLowerCase().includes("ai")) return ["IT consulting insights", "AI governance"];
  if (t.toLowerCase().includes("cloud")) return ["IT consulting insights", "Cloud"];
  if (t.toLowerCase().includes("cis")) return ["IT consulting insights", "Cybersecurity"];
  if (t.toLowerCase().includes("nis2")) return ["IT consulting insights", "NIS2"];
  if (t.toLowerCase().includes("data")) return ["IT consulting insights", "Data analytics"];
  if (t.toLowerCase().includes("procurement"))
    return ["IT consulting insights", "Procurement"];
  if (t.toLowerCase().includes("architect"))
    return ["IT consulting insights", "Architecture"];
  return ["IT consulting insights"];
};

export function buildJsonLd() {
  const webpageId = `${CANONICAL}#webpage`;
  const listItems = [
    ...news.map((n) => ({
      "@type": "NewsArticle",
      "@id": `${SITE}${n.slug}`,
      headline: n.title,
      description: n.dek,
      author: { "@type": "Person", name: "Editorial Board" },
      datePublished: n.datePublished,
      dateModified: n.datePublished,
      image: `${SITE}${n.image}`,
      inLanguage: "en",
      articleSection: "News",
      isPartOf: { "@id": webpageId },
      about: wordsToAbout(n.title),
      wordCount: 320,
      mainEntityOfPage: `${SITE}${n.slug}`,
    })),
    ...articles.map((a) => ({
      "@type": "BlogPosting",
      "@id": `${SITE}${a.slug}`,
      headline: a.title,
      description: a.dek,
      author: { "@type": "Person", name: a.author },
      datePublished: `${a.lastUpdated}T09:00:00+07:00`,
      dateModified: `${a.lastUpdated}T09:00:00+07:00`,
      image: `${SITE}${a.image}`,
      inLanguage: "en",
      articleSection: "Article",
      isPartOf: { "@id": webpageId },
      about: wordsToAbout(a.title),
      wordCount: a.wordCount,
      mainEntityOfPage: `${SITE}${a.slug}`,
    })),
  ].slice(0, 12);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE}/#org`,
        name: BRAND,
        url: SITE,
        logo: `${SITE}/static/logo.png`,
        sameAs: [
          "https://www.linkedin.com/company/zentra",
          "https://x.com/zentra",
        ],
      },
      {
        "@type": "WebPage",
        "@id": webpageId,
        url: CANONICAL,
        name: "Insights | Zentra",
        isPartOf: { "@id": `${SITE}/#org` },
        description:
          "Vendor-neutral IT consulting insights for CIOs and business leaders—fresh news and deep articles on AI, cloud, cybersecurity, and data.",
        inLanguage: "en",
        breadcrumb: { "@id": `${CANONICAL}#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${CANONICAL}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: "Insights", item: CANONICAL },
        ],
      },
      {
        "@type": "ItemList",
        "@id": `${CANONICAL}#index`,
        name: "Zentra Insights — News & Articles",
        itemListOrder: "http://schema.org/ItemListOrderDescending",
        numberOfItems: listItems.length,
        itemListElement: listItems,
      },
    ],
  };
}
