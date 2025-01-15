import { getBlogPosts } from "app/blog/utils";

export const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://dkountanis.xyz";

export default async function sitemap() {

  let blogs = getBlogPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.metadata.publishedAt).toISOString(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Base routes
  const routes = ["", "/blog", "/work"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  return [...routes, ...blogs];
}
