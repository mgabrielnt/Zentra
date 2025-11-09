import { NextResponse } from "next/server";

const BASE = "https://www.zentratech.id";

export async function GET() {
  const lastmod = new Date().toISOString();

  const indexXml = `
    <?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <sitemap>
        <loc>${BASE}/sitemap-services.xml</loc>
        <lastmod>${lastmod}</lastmod>
      </sitemap>
    </sitemapindex>
  `.trim();

  return new NextResponse(indexXml, {
    headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
