import { NextResponse } from "next/server";
import { SITE_URL } from "@/lib/seo/config";

const PAGES = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/service", changefreq: "monthly", priority: "0.9" },
  { path: "/project", changefreq: "monthly", priority: "0.8" },
  { path: "/insight", changefreq: "weekly", priority: "0.7" },
  { path: "/aboutus", changefreq: "yearly", priority: "0.6" },
  { path: "/collaboration", changefreq: "monthly", priority: "0.6" },
] as const;

export async function GET() {
  const lastmod = new Date().toISOString();
  const body = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${PAGES.map(
        (page) => `
          <url>
            <loc>${new URL(page.path, SITE_URL).href}</loc>
            <lastmod>${lastmod}</lastmod>
            <changefreq>${page.changefreq}</changefreq>
            <priority>${page.priority}</priority>
          </url>`
      ).join("\n")}
    </urlset>
  `.trim();

  return new NextResponse(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
