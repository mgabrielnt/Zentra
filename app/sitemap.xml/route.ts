import { NextResponse } from "next/server";
import { articles } from "@/components/insight/articlesData";
import { getAllProjects } from "@/data/project/waskita/content.project.data";
import { siteConfig } from "@/lib/seo/siteMetadata";

const BASE = siteConfig.url;

type SitemapEntry = {
  path: string;
  changefreq: string;
  priority: string;
  lastmod?: string;
};

const staticEntries: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/aboutus", changefreq: "monthly", priority: "0.7" },
  { path: "/service", changefreq: "monthly", priority: "0.9" },
  { path: "/id/service", changefreq: "monthly", priority: "0.7" },
  { path: "/project", changefreq: "monthly", priority: "0.8" },
  { path: "/insight", changefreq: "weekly", priority: "0.8" },
  { path: "/collaboration", changefreq: "monthly", priority: "0.6" },
];

export async function GET() {
  const insightEntries: SitemapEntry[] = articles.map((article) => ({
    path: `/insight/${article.slug}`,
    changefreq: "monthly",
    priority: "0.6",
    lastmod: article.date,
  }));

  const projectEntries: SitemapEntry[] = getAllProjects().map((project) => ({
    path: `/project/${project.id}`,
    changefreq: "monthly",
    priority: "0.6",
  }));

  const allEntries = [...staticEntries, ...insightEntries, ...projectEntries];

  const xml = [
    "<?xml version=\"1.0\" encoding=\"UTF-8\"?>",
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...allEntries.map((entry) => {
      const lastmod = entry.lastmod ?? new Date().toISOString();
      return [
        "  <url>",
        `    <loc>${BASE}${entry.path}</loc>`,
        `    <lastmod>${lastmod}</lastmod>`,
        `    <changefreq>${entry.changefreq}</changefreq>`,
        `    <priority>${entry.priority}</priority>`,
        "  </url>",
      ].join("\n");
    }),
    "</urlset>",
  ].join("\n");

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
