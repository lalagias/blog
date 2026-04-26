import { getBlogPosts } from "@/app/blog/utils"
import { absoluteUrl } from "@/lib/site"

export default async function sitemap() {
  const blogs = getBlogPosts().map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.metadata.publishedAt).toISOString(),
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  // Base routes
  const routes = ["", "/blog", "/work", "/consulting", "/build-in-public"].map((route) => ({
    url: absoluteUrl(route || "/"),
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly",
    priority: route === "" ? 1.0 : 0.9,
  }))

  return [...routes, ...blogs]
}
