// D:\zentra\app\robots.txt\route.ts
import { NextResponse } from "next/server";

const BASE = "https://zentratech.id"; // ✅ pakai domain kanonik

export async function GET() {
  const body = [
    "User-agent: *",
    "Allow: /",
    "",
    // Sitemap utama
    `Sitemap: ${BASE}/sitemap.xml`,
    `Sitemap: ${BASE}/sitemap-services.xml`,
    "",
    // (opsional, tidak dipakai Google tapi oke buat yang lain)
    "Host: zentratech.id",
  ].join("\n");

  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
