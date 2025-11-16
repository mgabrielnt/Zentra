import type { Metadata } from "next";
import {
  getProjectContentById,
} from "@/data/project/waskita/content.project.data";
import { absoluteUrl, siteConfig } from "@/lib/seo/siteMetadata";

export async function generateMetadata({
  params,
}: {
  params: { details: string };
}): Promise<Metadata> {
  const project = getProjectContentById(params.details);

  if (!project) {
    return {
      title: "Project tidak ditemukan | Zentratech",
      robots: { index: false, follow: false },
    };
  }

  const url = absoluteUrl(`/project/${project.id}`);
  const title = `${project.title} | Portofolio Zentratech`;
  const description = project.description;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      images: [absoluteUrl(project.image || siteConfig.logoPath)],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl(project.image || siteConfig.logoPath)],
    },
  };
}

export default function ProjectDetailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
