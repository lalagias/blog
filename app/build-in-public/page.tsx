import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export const metadata = {
  title: "Build in Public",
  description: "Read my thoughts on software, business, product, growth and more.",
}

export default async function Page() {
  return (
    <section className="w-full">
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">Build in Public</h1>
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
          <Badge variant="warning" className="ml-auto">
            On hold
          </Badge>
        </Link>
        <Link
          href="https://whoisat.app"
          className="flex items-center mb-4 border rounded-md p-5 border-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        >
          <p className="text-lg font-semibold">WhoIsAt</p>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 ml-2">whoisat.app</p>
          <Badge variant="success" className="ml-auto">
            On going
          </Badge>
        </Link>
      </div>
    </section>
  )
}
