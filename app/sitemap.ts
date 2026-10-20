import type { MetadataRoute } from "next";
import { BILLS } from "@/lib/bills";

const base = process.env.NEXT_PUBLIC_SITE_URL
  ? `https://${process.env.NEXT_PUBLIC_SITE_URL.replace(/^https?:\/\//, "")}`
  : process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/asks", "/act", "/incidents", ...BILLS.map((b) => `/bills/${b.slug}`)];
  return pages.map((path) => ({ url: `${base}${path}`, lastModified: new Date() }));
}
