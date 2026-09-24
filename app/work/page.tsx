import type { Metadata } from "next"
import { absoluteUrl, ogImageUrl, siteName } from "@/lib/site"

const title = "Work"
const description =
  "A summary of Dimitris Kountanis' work leading technology, product engineering, fintech platforms, and AI-native teams."
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
      <h1 className="font-semibold text-sm mb-8 tracking-tighter">my work</h1>
      <div className="prose prose-neutral dark:prose-invert">
        <p className="text-sm leading-6 text-grey-400 mb-4">
          On a mission to build exceptional fintech products through AI-native engineering and lead
          teams into the new era of software development. Here's a reverse-chronological summary of
          my work so far.
        </p>
        <hr className="my-6 border-neutral-100 dark:border-neutral-800" />
        <h2 className="font-medium text-sm tracking-tighter">Native Teams</h2>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm">
          Front End Engineer, Head of Front End, VP of Product Engineering, CTO
        </p>
        <p className="text-sm leading-6 text-grey-400 mb-4">
          Embracing risk and growth, I relocated to Lisbon as a junior engineer during the height of
          COVID-19. This leap of faith outside my comfort zone rewarded me with remarkable career
          growth and invaluable experiences.
        </p>
        <ul>
          <li className="text-sm leading-6 text-grey-400 mb-4">
            Mid 2026 - present: Promoted to CTO after six months as VP of Product Engineering. I'm
            now leading technology strategy, product engineering, and the transition into AI-native
            teams. The focus is on turning agentic engineering into real operating leverage: faster
            product cycles, stronger platform foundations, and teams that can ship at a pace we
            could not imagine a few years ago.
          </li>
          <li className="text-sm leading-6 text-grey-400 mb-4">
            Early 2026: Promoted to VP of Product Engineering. I led product engineering through an
            AI-native and agentic engineering mindset, blending product thinking with engineering
            execution. We pushed deeper into vibe-coded solutions, faster mobile delivery, and a new
            way of working where product and engineering moved as one team.
          </li>
          <li className="text-sm leading-6 text-grey-400 mb-4">
            2025: We left our legacy app behind and moved towards a fully new monorepo with a full
            frontend team of 15 people. We minimized render times from 10s to 0.3s interactivity and
            beyond, while I transitioned further into a people-management role and helped the team
            become 10x engineers through AI usage and modern tooling.
          </li>
          <li className="text-sm leading-6 text-grey-400 mb-4">
            2023 - 2025: 2023 kicked off with my promotion to Head of Front End, managing a growing
            team of 9 frontend engineers and leading the development of our product frontend. We
            migrated the tech stack away from Vue to React, refactored old codebases, moved landing
            pages to a modern CMS, and implemented a design system with Storybook.
          </li>
          <li className="text-sm leading-6 text-grey-400 mb-4">
            2020 - 2022: Took over landing pages and the first dashboards while we were searching
            for PMF. This was the hardest period: navigating product ambiguity, choosing what to
            focus on, and juggling marketing work with platform development.
          </li>
          <li className="text-sm leading-6 text-grey-400 mb-4">
            2019 - one year before launching Native Teams: My work spanned live streaming platforms,
            cloud storage solutions, and note-taking apps. During this period, I gained extensive
            experience building dashboards, landing pages, and user interfaces, which helped lay the
            groundwork for identifying the opportunity that became Native Teams.
          </li>
        </ul>
        <hr className="my-6 border-neutral-100 dark:border-neutral-800" />
      </div>
    </section>
  )
}
