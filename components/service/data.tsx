export type ServiceItem = {
  slug: "dev" | "ux" | "commerce" | "ai" | (string & {});
  title: string;
  name: string;
  description: string;
  points: string[];
  accent?: string;
  image: string;     // /public path
  imageAlt: string;
};

export const services: ServiceItem[] = [
  {
    slug: "dev",
    title: "Web & Mobile Development",
    name: "Web & Mobile Development",
    description:
      "Full-stack web & mobile development with modern stacks, performance budgets, and CI/CD.",
    points: [
      "Next.js / React / Node / PostgreSQL",
      "Native/Hybrid mobile (Expo/React Native)",
      "CI/CD, observability, error budgets",
    ],
    accent: "#7c4dff",
    image: "/images/services/dev.png",       // ⬅️ kembali ke PNG yang ada
    imageAlt: "High-performance web and mobile apps",
  },
  {
    slug: "ux",
    title: "Product Design (UI/UX)",
    name: "Product Design (UI/UX)",
    description:
      "User research, information architecture, design systems, and prototyping to drive conversion.",
    points: [
      "Design systems & accessibility",
      "Prototyping & usability testing",
      "Conversion-focused UI patterns",
    ],
    accent: "#ff9ffc",
    image: "/images/services/ux.png",
    imageAlt: "Design system and clean UI components",
  },
  {
    slug: "commerce",
    title: "Headless Commerce",
    name: "Headless Commerce",
    description:
      "Headless storefronts built for speed, SEO, and conversion with modern commerce APIs.",
    points: [
      "Headless storefront (Next.js)",
      "Payment & OMS integrations",
      "SEO & Core Web Vitals first",
    ],
    accent: "#b19eef",
    image: "/images/services/commerce.png",
    imageAlt: "Headless commerce storefront preview",
  },
  {
    slug: "ai",
    title: "Machine Learning & AI",
    name: "Machine Learning & AI",
    description:
      "Pragmatic ML/AI: data pipelines, model training, evaluation, and productionization with clear ROI.",
    points: ["Pipelines & feature store", "Training & evaluation", "Deploy & monitor"],
    accent: "#22d3ee",
    image: "/images/services/ai.png",
    imageAlt: "AI pipelines and monitoring dashboards",
  },
];
