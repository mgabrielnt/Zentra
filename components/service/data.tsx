export type ServiceItem = {
  id: string;
  title: string;
  label: string;
  description: string;
  accent: string;
  image: string;
};

export const services: ServiceItem[] = [
  {
    id: "dev",
    title: "Web & Mobile Development",
    label: "Product engineering",
    description:
      "We design, build, and operate web & mobile apps with clean architecture, CI/CD, and observability baked in—ready for the next feature wave.",
    accent: "#38bdf8", // cyan
    image: "/images/services/dev.png",
  },
  {
    id: "ux",
    title: "Product Design (UI/UX)",
    label: "Design systems",
    description:
      "We turn fuzzy requirements into clear journeys, components, and prototypes that ship smoothly and move your product metrics.",
    accent: "#f97316", // orange
    image: "/images/services/ux.png",
  },
  {
    id: "commerce",
    title: "Headless Commerce",
    label: "Revenue engines",
    description:
      "We build headless commerce stacks tuned for conversion, page speed, and operations so growth and merchandising can iterate safely.",
    accent: "#22c55e", // green
    image: "/images/services/commerce.png",
  },
  {
    id: "ai",
    title: "Machine Learning & AI",
    label: "Applied AI",
    description:
      "We add pragmatic AI—recommendations, copilots, fraud detection—into your existing products with governance and MLOps in place.",
    accent: "#a855f7", // purple
    image: "/images/services/ai.png",
  },
];
