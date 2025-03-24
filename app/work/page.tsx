import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work",
  description: "A summary of my work and contributions.",
};

export default function WorkPage() {
  return (
    <section>
      <h1 className="font-medium text-2xl mb-8 tracking-tighter">My Work</h1>
      <div className="prose prose-neutral dark:prose-invert">
        <p className="text-base leading-6 text-grey-400 mb-4">
          On a mission to build exceptional fintech products and lead innovative
          engineering teams. Here's a summary of my work so far.
        </p>
        <hr className="my-6 border-neutral-100 dark:border-neutral-800" />
        <h2 className="font-medium text-xl tracking-tighter">Native Teams</h2>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm">
          Front End Engineer, Head of Front End
        </p>
        <p className="text-base leading-6 text-grey-400 mb-4">
          Embracing risk and growth, I relocated to Lisbon as a junior engineer
          during the height of COVID-19. This leap of faith outside my comfort
          zone rewarded me with remarkable career growth and invaluable
          experiences.
        </p>
        <ul>
          <li className="text-base leading-6 text-grey-400 mb-4">
            2019 - 1 Year before launching Native Teams: My work spanned across
            diverse areas, including live streaming platforms, cloud storage
            solutions, and note-taking apps. During this covid period, I gained
            extensive experience in building dashboards, landing pages, and
            crafting user interfaces, which laid the groundwork for identifying
            an opportunity to launch Native Teams.
          </li>
          <li className="text-base leading-6 text-grey-400 mb-4">
            2020 - 2022: Took over landing pages and the first dashboards while
            we were in search of PMF. This was the hardest time as the only
            focus was navigating the ambiguity of the product and determining
            the best options to focus on, juggling between marketing and
            platform development.
          </li>
          <li className="text-base leading-6 text-grey-400 mb-4">
            2023 to present: 2023 kicked off with me getting promoted to Head of
            Front End, now managing a growing team of 9 FE engineers leading the
            development of the frontend of our product. Implementing the next
            steps for the platform, migrating our tech stack away from Vue to
            React, and refactoring our old codebases. From using modern CMS for
            our landing pages to implementing a design system with Storybook.
          </li>
        </ul>
        <hr className="my-6 border-neutral-100 dark:border-neutral-800" />
      </div>
    </section>
  );
}
