import type { Metadata } from "next"
import { BlogPosts } from "@/components/posts"
import { absoluteUrl, ogImageUrl, siteName } from "@/lib/site"

const title = "Blog"
const description =
  "Thoughts on AI-native engineering, product development, fintech, and building in public."
const canonicalUrl = absoluteUrl("/blog")
const image = ogImageUrl(title)

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    title,
    description,
    url: canonicalUrl,
    siteName,
    type: "website",
    images: [
      {
        url: image,
        width: 1920,
        height: 1080,
        alt: title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [image],
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
