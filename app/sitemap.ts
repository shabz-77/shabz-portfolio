import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://YOURDOMAIN.COM"; // <-- CHANGE THIS

  return [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/projects`, lastModified: new Date() },
    { url: `${base}/projects/automotive`, lastModified: new Date() },
    { url: `${base}/projects/livery`, lastModified: new Date() },
  ];
}
