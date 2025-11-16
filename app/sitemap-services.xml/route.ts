import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/seo/siteMetadata";

const BASE = siteConfig.url;

const serviceEntries = [
  { path: "/service", changefreq: "monthly", priority: "0.9" },
  { path: "/id/service", changefreq: "monthly", priority: "0.7" },
];

export async function GET() {
  const xml = [
    "<?xml version=\"1.0\" encoding=\"UTF-8\"?>",
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...serviceEntries.map((entry) => {
      return [
        "  <url>",
        `    <loc>${BASE}${entry.path}</loc>`,
        `    <lastmod>${new Date().toISOString()}</lastmod>`,
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
