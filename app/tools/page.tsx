import type { Metadata } from "next"
import Link from "next/link"
import { absoluteUrl, ogImageUrl, siteName } from "@/lib/site"

const title = "Tools"
const description =
  "Small, useful browser tools by Dimitris Kountanis. Everything runs in your browser — nothing is ever stored."
const canonicalUrl = absoluteUrl("/tools")
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
    images: [{ url: image, width: 1920, height: 1080, alt: title }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [image],
  },
}

type Tool = {
  slug: string
  name: string
  description: string
  tag: string
}

const tools: Tool[] = [
  {
    slug: "md-to-pdf",
    name: "MD → PDF",
    description:
      "Paste or write markdown and download it as a styled PDF instantly. Runs entirely in your browser.",
    tag: "converter",
  },
]

export default function ToolsPage() {
  return (
    <section className="w-full">
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">tools</h1>
      <p className="text-neutral-600 dark:text-neutral-400 mb-8">
        Small, useful tools. Everything runs in the browser — nothing is ever stored.
      </p>
      <div className="flex flex-col space-y-3">
        {tools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="group flex flex-col gap-1 border border-neutral-200 dark:border-neutral-800 rounded-md p-5 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
          >
            <div className="flex items-center justify-between">
              <p className="font-semibold tracking-tight">{tool.name}</p>
              <span className="text-xs text-neutral-500 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800 px-2 py-0.5 rounded-full">
                {tool.tag}
              </span>
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {tool.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  )
}
