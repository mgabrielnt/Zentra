// D:\zentra\middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl;

  // Kalau sudah HTTPS atau sedang di dev, biarkan saja
  const isDev = process.env.NODE_ENV === "development";
  const isHttps =
    request.headers.get("x-forwarded-proto") === "https" ||
    url.protocol === "https:";

  if (isDev || isHttps) {
    return NextResponse.next();
  }

  // Paksa redirect ke HTTPS (canonical domain)
  url.protocol = "https:";
  url.host = "zentratech.id"; // ganti kalau kamu mau pakai www

  return NextResponse.redirect(url, 301);
}

// Berlaku untuk semua path
export const config = {
  matcher: "/:path*",
};
