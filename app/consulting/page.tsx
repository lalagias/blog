import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ConsultingPage() {
  return (
    <section className="w-full">
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
        Consulting & Technical Advisory
      </h1>

      <div className="prose dark:prose-invert">
        <div className="mb-8">
          <p>
            I'm a VP of Product Engineering running a 15-person team at a Series B fintech. I joined
            as the first front-end engineer before we had a product and built alongside the company
            through every stage. Now I lead the full product engineering org and I've spent the last
            year transitioning the entire team to AI-native workflows.
          </p>
          <p>
            I take on consulting work because I like hard problems and I'm good at solving them fast.
            If you need someone who ships, not someone who advises from the sidelines, we should
            talk.
          </p>
        </div>

        <hr className="my-8" />

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">What I help with</h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold">AI-native engineering adoption</h3>
              <p>
                Your team is "exploring AI tools" but nothing has actually changed. I help
                engineering teams make the real transition: agentic workflows, AI-assisted code
                review, prompt-driven development, and the mindset shifts that make it stick. Not a
                workshop. An actual transformation of how your team ships software.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">Product engineering & MVPs</h3>
              <p>
                From idea to live product, fast. Web apps, SaaS, mobile, internal tools. I build
                with modern stacks (Next.js, Supabase, React Native) and ship at a speed most teams
                don't think is possible. If you need an MVP in weeks, not months, this is what I do.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">Scaling teams & architecture</h3>
              <p>
                Growing from 3 engineers to 15+. Monorepo setups, design systems, tech stack
                migrations, frontend architecture that doesn't fall apart at scale. I've done this at
                Native Teams (Vue to React, legacy monolith to modern monorepo) and I can help you
                skip the mistakes I already made.
              </p>
            </div>
          </div>
        </div>

        <hr className="my-8" />

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Why me</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>First engineer at a company that went from zero to Series B</li>
            <li>Grew and led a team from solo to 15+ engineers</li>
            <li>Shipped products used by 20,000+ users</li>
            <li>Led a full tech stack migration (Vue to React, monorepo)</li>
            <li>Transitioned an entire engineering org to AI-native workflows</li>
            <li>
              Building and shipping AI agent products on the side to stay on the bleeding edge
            </li>
          </ul>
          <p className="mt-4">
            I'm not a consultant who reads about this stuff. I do it every day.
          </p>
        </div>

        <hr className="my-8" />

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">How it works</h2>
          <p>
            Flexible engagement. One-off consulting sessions, weekly retainers, or full product
            builds. Remote-first, async-friendly. No unnecessary meetings. Direct communication and
            fast delivery.
          </p>
        </div>

        <hr className="my-8" />

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Let's talk.</h2>
          <p>
            DM me on{" "}
            <Link
              href="https://www.linkedin.com/in/dimitris-kountanis/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              LinkedIn
            </Link>{" "}
            or book a call below. You'll get honest feedback, fast execution, and real results.
          </p>

          <div className="mt-8">
            <Button variant="default" asChild>
              <Link
                href="https://cal.com/dkountanis-nteams/30min"
                style={{ textDecoration: "none" }}
              >
                Schedule a Discovery Call
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
