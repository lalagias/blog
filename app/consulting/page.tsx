import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ConsultingPage() {
  return (
    <section className="w-full">
      <h1 className="font-semibold text-2xl mb-2 tracking-tighter">
        Consulting & Technical Advisory
      </h1>

      <div className="prose dark:prose-invert">
        <div className="mb-8">
          <p className="text-lg font-medium text-blue-600 dark:text-blue-400">
            Proven track record of shipping impactful products:
          </p>
          <ul className="mt-2 space-y-2">
            <li>Built and scaled products from 1 to 20k+ users</li>
            <li>
              Led technical teams at venture-backed startups from seed to Series
              B
            </li>
            <li>
              Shipped dozens of successful MVPs and product launches, hundreds
              of features
            </li>
          </ul>
        </div>

        <div className="mb-8">
          <p className="text-lg font-medium">
            Need help shipping faster, scaling smarter, or integrating AI into
            your product?
          </p>
          <p>
            I work with growing teams and founders to solve high-leverage
            product and engineering problems fast.
          </p>
          <p>
            From building MVPs and AI features to fixing tech debt and scaling
            infra, I bring speed, clarity, and execution.
          </p>
        </div>

        <hr className="my-8" />

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">What I Do</h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold">AI Integration & Prototyping</h3>
              <p>
                Bring LLMs, embeddings, and automation into your product.
                <br />
                <span className="text-sm">
                  (I've shipped dozens of AI features across products.)
                </span>
              </p>
            </div>

            <div>
              <h3 className="font-semibold">MVPs & Product Launches</h3>
              <p>
                Rapidly build and ship high-quality MVPs with modern stacks.
                <br />
                <span className="text-sm">
                  (Web apps, SaaS, internal tools, you name it.)
                </span>
              </p>
            </div>

            <div>
              <h3 className="font-semibold">Tech Strategy & Refactoring</h3>
              <p>
                Untangle messy codebases, set up scalable infra, and help your
                team move faster.
              </p>
            </div>
          </div>
        </div>

        <hr className="my-8" />

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Who I Work With</h2>
          <ul className="list-disc pl-6">
            <li>
              Early-stage startups who need a hands-on CTO-type to get things
              moving.
            </li>
            <li>
              Product teams looking to integrate AI or ship features faster.
            </li>
            <li>
              Solo founders who want a tech partner without the long-term hire.
            </li>
          </ul>
        </div>

        <hr className="my-8" />

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">How It Works</h2>
          <ul className="list-disc pl-6">
            <li>
              Flexible: One-off consulting, weekly retainers, or full builds.
            </li>
            <li>
              Remote-first, async-friendly. No meetings unless we need them.
            </li>
            <li>Direct, no-fluff communication and fast delivery.</li>
          </ul>
        </div>

        <hr className="my-8" />

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Let's talk.</h2>
          <p>
            DM me on{" "}
            <Link
              href="https://x.com/ntanis_kou"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Twitter
            </Link>{" "}
          </p>
          <p>You'll get honest feedback, fast execution, and real results.</p>

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
  );
}
