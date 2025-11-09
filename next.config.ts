// D:\zentra\next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hapus seluruh konfigurasi i18n (App Router tidak mendukung next.config i18n)
  images: {
    formats: ["image/avif", "image/webp"],
    // cache panjang untuk aset gambar
    minimumCacheTTL: 31536000,
  },
  // Redirect kecil yang kita butuhkan
  async redirects() {
    return [
      // canonical home
      { source: "/home", destination: "/", permanent: true },

      // optional: kalau dulu pernah expose /en & /id sebagai halaman,
      // sekarang arahkan ke canonical. Nanti multibahasa pakai folder /en /id.
      { source: "/en", destination: "/", permanent: true },
      { source: "/id", destination: "/", permanent: false },

      // contoh legacy service anchor
      { source: "/services", destination: "/service", permanent: true },
    ];
  },
  // bisa tambahkan strict mode jika mau
  reactStrictMode: true,
};

export default nextConfig;
