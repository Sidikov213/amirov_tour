import type { MetadataRoute } from "next";
import { TOURS } from "@/lib/tours";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://amirov-tour.ru";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE, changeFrequency: "weekly", priority: 1 },
    ...TOURS.map((t) => ({ url: `${SITE}/tours/${t.slug}`, changeFrequency: "weekly" as const, priority: 0.8 })),
  ];
}
