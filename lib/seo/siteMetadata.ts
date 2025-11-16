export const siteConfig = {
  name: "Zentratech",
  shortName: "Zentra",
  legalName: "Zentratech",
  tagline: "Digital Product & AI Studio Indonesia",
  description:
    "Zentratech (Zentra) is a digital product and AI studio from Indonesia that designs high-performance web and mobile experiences, headless commerce platforms, and pragmatic machine learning solutions.",
  url: "https://zentratech.id",
  defaultLocale: "en",
  alternateLocale: "id-ID",
  siteName: "Zentratech",
  keywords: [
    "Zentratech",
    "Zentra",
    "Zentratech Indonesia",
    "digital product studio",
    "digital product studio Indonesia",
    "AI development Indonesia",
    "web development agency",
    "web development Indonesia",
    "mobile app development",
    "UI UX design",
    "headless commerce",
    "machine learning consulting",
  ],
  logoPath: "/logoZentraFix.png",
  socials: {
    linkedin: "https://www.linkedin.com/company/zentra-consultant",
    github: "https://github.com/zentraconsultant",
    instagram: "https://www.instagram.com/zentra.consultant/",
  },
} as const;

export const metadataBaseUrl = new URL(siteConfig.url);

export const absoluteUrl = (path = "/") =>
  new URL(path, siteConfig.url).toString();
