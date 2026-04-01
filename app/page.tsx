import Image from "next/image"
import Link from "next/link"
import { BlogPosts } from "@/components/posts"
import NTLogo from "@/public/assets/icons/logo-monogram.png"
import DimitrisPortrait from "@/public/dimitris-photo.jpg"

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">Hey, I'm Dimitris 🏄🏼</h1>

      <Image
        src={DimitrisPortrait}
        alt="Dimitris"
        width="300"
        height="300"
        className="rounded-md w-48 h-48 object-cover object-top mb-4"
      />
      <p className="mb-4">
        {`VP of Product Engineering at`}{" "}
        <Link
          href="https://nativeteams.com/"
          className="inline-flex items-center border border-neutral-200 bg-neutral-50 p-1 text-sm leading-4 text-neutral-900 no-underline dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
        >
          {/* <Image src={NTLogo} alt="Native Teams Logo" width="12" height="12" className="mr-1 w-4 h-4 object-contain" /> */}
          Native Teams
        </Link>
        , building the future of work through an agentic engineering approach. I lead product
        engineering for the platform and I'm pushing my team into the new era of AI-native software
        development.
      </p>

      <p className="mb-4">
        This space is where I think out loud about the intersection of product, engineering, and AI.
        What's actually working, what's hype, what I'm betting on, and what I'm building along the
        way.
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  )
}
