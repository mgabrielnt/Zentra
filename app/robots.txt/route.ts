import { NextResponse } from "next/server";
import { SITE_URL } from "@/lib/seo/config";

const BASE = SITE_URL;

export async function GET() {
  const body = [
    "User-agent: *",
    "Allow: /",
    "",
    `Sitemap: ${BASE}/sitemap.xml`,
    `Sitemap: ${BASE}/sitemap-services.xml`,
    "",
  ].join("\n");

  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
