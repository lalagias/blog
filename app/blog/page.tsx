import type { Metadata } from "next"
import { BlogPosts } from "@/components/posts"

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Thoughts on AI-native engineering, product development, fintech, and building in public.",
  alternates: {
    canonical: "/blog",
  },
}

export default async function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">my blog</h1>
      <BlogPosts />
    </section>
  )
}
