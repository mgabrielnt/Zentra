import { NextResponse } from "next/server";
import { SITE_URL } from "@/lib/seo/config";

const SERVICES = [
  { path: "/service", changefreq: "monthly", priority: "0.95" },
  { path: "/id/service", changefreq: "monthly", priority: "0.9" },
] as const;

export async function GET() {
  const lastmod = new Date().toISOString();
  const body = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${SERVICES.map(
        (service) => `
          <url>
            <loc>${new URL(service.path, SITE_URL).href}</loc>
            <lastmod>${lastmod}</lastmod>
            <changefreq>${service.changefreq}</changefreq>
            <priority>${service.priority}</priority>
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
