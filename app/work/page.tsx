import type { Metadata } from "next"
import { absoluteUrl, ogImageUrl, siteName } from "@/lib/site"

const title = "Work"
const description =
  "A summary of Dimitris Kountanis' work leading product engineering, fintech platforms, and AI-native teams."
const canonicalUrl = absoluteUrl("/work")
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

export default function WorkPage() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">my work</h1>
      <div className="prose prose-neutral dark:prose-invert">
        <p className="text-base leading-6 text-grey-400 mb-4">
          On a mission to build exceptional fintech products through AI-native engineering and lead
          teams into the new era of software development. Here's a summary of my work so far.
        </p>
        <hr className="my-6 border-neutral-100 dark:border-neutral-800" />
        <h2 className="font-medium text-xl tracking-tighter">Native Teams</h2>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm">
          Front End Engineer, Head of Front End, VP of Product Engineering
        </p>
        <p className="text-base leading-6 text-grey-400 mb-4">
          Embracing risk and growth, I relocated to Lisbon as a junior engineer during the height of
          COVID-19. This leap of faith outside my comfort zone rewarded me with remarkable career
          growth and invaluable experiences.
        </p>
        <ul>
          <li className="text-base leading-6 text-grey-400 mb-4">
            2019 - 1 Year before launching Native Teams: My work spanned across diverse areas,
            including live streaming platforms, cloud storage solutions, and note-taking apps.
            During this covid period, I gained extensive experience in building dashboards, landing
            pages, and crafting user interfaces, which laid the groundwork for identifying an
            opportunity to launch Native Teams.
          </li>
          <li className="text-base leading-6 text-grey-400 mb-4">
            2020 - 2022: Took over landing pages and the first dashboards while we were in search of
            PMF. This was the hardest time as the only focus was navigating the ambiguity of the
            product and determining the best options to focus on, juggling between marketing and
            platform development.
          </li>
          <li className="text-base leading-6 text-grey-400 mb-4">
            2023 to 2025: 2023 kicked off with me getting promoted to Head of Front End, managing a
            growing team of 9 FE engineers leading the development of the frontend of our product.
            Implementing the next steps for the platform, migrating our tech stack away from Vue to
            React, and refactoring our old codebases. From using modern CMS for our landing pages to
            implementing a design system with Storybook.
          </li>
          <li className="text-base leading-6 text-grey-400 mb-4">
            2025: We left our legacy app behind and moved towards a fully new monorepo with a full
            frontend team of 15 people. We've been minimizing render times from 10s to 0.3s
            interactivity and beyond. Transitioning to more of a people manager role while enabling
            the team to become 10x engineers through AI usage and modern tooling.
          </li>
          <li className="text-base leading-6 text-grey-400 mb-4">
            2026 - present: Promoted to VP of Product Engineering. Leading product engineering
            through AI-native approaches and an agentic engineering mindset, blending product
            thinking with engineering execution. Helped the team pivot to the new age of software
            development: vibe-coded solutions shipping at 10x speed, delivering mobile apps at a
            pace we never thought possible, and driving a full transition to AI-native teams. The
            overlap between product and engineering is where the magic happens now, and we're all
            in.
          </li>
        </ul>
        <hr className="my-6 border-neutral-100 dark:border-neutral-800" />
      </div>
    </section>
  )
}
