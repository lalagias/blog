import type { Metadata } from "next"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { absoluteUrl, ogImageUrl, siteName } from "@/lib/site"

const title = "Projects"
const description = "Side projects and experiments from Dimitris Kountanis."
const canonicalUrl = absoluteUrl("/projects")
const image = ogImageUrl(title)

type Project = {
  name: string
  url: string
  domain: string
  status: "ongoing" | "abandoned"
  abandonedYear?: number
}

const projects: Project[] = [
  {
    name: "Avrae",
    url: "https://avrae.ai",
    domain: "avrae.ai",
    status: "ongoing",
  },
  {
    name: "Agentplex",
    url: "https://agentplex.sh",
    domain: "agentplex.sh",
    status: "ongoing",
  },
  {
    name: "HeyThatAd",
    url: "https://heythatad.com",
    domain: "heythatad.com",
    status: "abandoned",
    abandonedYear: 2025,
  },
  {
    name: "WhoIsAt",
    url: "https://whoisat.app",
    domain: "whoisat.app",
    status: "abandoned",
    abandonedYear: 2026,
  },
]

const sortedProjects = [...projects].sort((a, b) => {
  if (a.status === b.status) return 0
  return a.status === "ongoing" ? -1 : 1
})

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
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">projects</h1>
      <p className="text-neutral-600 dark:text-neutral-400 mb-8">
        Things I've built on the side. Some I'm still shipping, some I've walked away from.
      </p>
      <div className="flex flex-col space-y-4">
        {sortedProjects.map((project) => (
          <Link
            key={project.domain}
            href={project.url}
            className="flex items-center mb-4 border rounded-md p-5 border-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <p className="text-lg font-semibold">{project.name}</p>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 ml-2">{project.domain}</p>
            <Badge
              variant={project.status === "ongoing" ? "success" : "destructive"}
              className="ml-auto"
            >
              {project.status === "ongoing"
                ? "Ongoing"
                : `Abandoned · ${project.abandonedYear}`}
            </Badge>
          </Link>
        ))}
      </div>
    </section>
  )
}
