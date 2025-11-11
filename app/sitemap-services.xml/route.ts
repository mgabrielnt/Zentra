// D:\zentra\app\sitemap-services.xml\route.ts
import { NextResponse } from "next/server";
import { services } from "@/components/service/data";

const BASE = "https://zentratech.id"; // ✅ samakan dengan robots/layout

export async function GET() {
  const lastmod = new Date().toISOString();

  const urls = [
    {
      loc: `${BASE}/service`,
      hreflang: {
        en: `${BASE}/service`,
        id: `${BASE}/id/service`,
      },
    },
    {
      loc: `${BASE}/id/service`,
      hreflang: {
        en: `${BASE}/service`,
        id: `${BASE}/id/service`,
      },
    },
    // Optional: expose topical CTA for discovery
    ...services.map((s) => ({
      loc: `${BASE}/collaboration?topic=${encodeURIComponent(s.slug)}`,
      hreflang: null,
    })),
  ];

  const xml = `
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  ${urls
    .map(
      (u: any) => `
    <url>
      <loc>${u.loc}</loc>
      <lastmod>${lastmod}</lastmod>
      ${
        u.hreflang
          ? `
      <xhtml:link rel="alternate" hreflang="en" href="${u.hreflang.en}" />
      <xhtml:link rel="alternate" hreflang="id" href="${u.hreflang.id}" />
      <xhtml:link rel="alternate" hreflang="x-default" href="${u.hreflang.en}" />
      `
          : ""
      }
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>`
    )
    .join("")}
</urlset>`.trim();

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
