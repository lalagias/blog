import type { Metadata } from "next"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { absoluteUrl, ogImageUrl, siteName } from "@/lib/site"

const title = "Build in Public"
const description = "Side projects, experiments, and build-in-public notes from Dimitris Kountanis."
const canonicalUrl = absoluteUrl("/build-in-public")
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
    <section className="w-full">
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">build in public</h1>
      <p className="text-neutral-600 dark:text-neutral-400 mb-8">
        Following the vibe coding and build in public trends, I will share all my projects here.
        Maybe this is a good way to keep myself accountable and to get feedback from the community.
        Or just a journal of my projects. I'm not sure yet.
      </p>
      <div className="flex flex-col space-y-4">
        <Link
          href="https://heythatad.com"
          className="flex items-center mb-4 border rounded-md p-5 border-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        >
          <p className="text-lg font-semibold">HeyThatAd</p>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 ml-2">heythatad.com</p>
          <Badge variant="destructive" className="ml-auto">
            Abandoned
          </Badge>
        </Link>
        <Link
          href="https://whoisat.app"
          className="flex items-center mb-4 border rounded-md p-5 border-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        >
          <p className="text-lg font-semibold">WhoIsAt</p>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 ml-2">whoisat.app</p>
          <Badge variant="destructive" className="ml-auto">
            Abandoned
          </Badge>
        </Link>
        <Link
          href="https://avrae.ai"
          className="flex items-center mb-4 border rounded-md p-5 border-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        >
          <p className="text-lg font-semibold">Avrae</p>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 ml-2">avrae.ai</p>
          <Badge variant="success" className="ml-auto">
            On going
          </Badge>
        </Link>
      </div>
    </section>
  )
}
