import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private/",
    },
    sitemap: "https://dkountanis.xyz/sitemap.xml",
    // Custom field for AI crawlers
    other: {
      "X-Llms-Txt": "https://dkountanis.xyz/llms.txt",
    },
  }
}
