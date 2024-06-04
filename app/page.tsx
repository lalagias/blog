import Link from "next/link";
import Image from "next/image";

import { BlogPosts } from "app/components/posts";
import NTLogo from "app/assets/icons/logo-monogram.svg";

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        hey, I'm Dimitris 🔥
      </h1>
      <p className="mb-4">
        {`I'm a frontend engineer. Day 1 employee at`} {` `}
        <Link href='https://nativeteams.com/' className="inline-flex items-center rounded border border-neutral-200 bg-neutral-50 p-1 text-sm leading-4 text-neutral-900 no-underline dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100">
          <Image src={NTLogo} alt="Native Teams Logo" width="16" height="16" className="mr-1" />
          Native Teams
        </Link>, where I help build the future of work. From HR to payroll, we're building a platform that helps new way of working.
        {``}
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  );
}
