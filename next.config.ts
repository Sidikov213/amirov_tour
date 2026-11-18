import type { NextConfig } from "next";

// Адреса экскурсий на старом сайте (Tilda) лежали в корне: /derbent, /gunib…
// Перенаправляем их на новые страницы, чтобы не потерять позиции в поиске и старые ссылки.
const OLD_SLUGS = ["kanonpremium", "sulakskijkanon", "derbent", "khunzakh", "kakhibgoor", "gunib", "korodaitesnina", "samurskiylesikhuchni", "kubachi", "harachi", "groznyy", "kezenojam", "benoi", "osetiya", "ingushetiya"];

const nextConfig: NextConfig = {
  async redirects() {
    return [
      ...OLD_SLUGS.map((s) => ({ source: `/${s}`, destination: `/tours/${s}`, permanent: true })),
      { source: "/ekskursii", destination: "/#tours", permanent: true },
    ];
  },
};

export default nextConfig;
