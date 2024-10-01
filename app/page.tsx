import Link from "next/link";
import Image from "next/image";

import { BlogPosts } from "app/components/posts";
import NTLogo from "app/assets/icons/logo-monogram.svg";
import DimitrisPortrait from "public/dimitris-photo.jpg";

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Hey, I'm Dimitris 🏄🏼
      </h1>

      <Image
        src={DimitrisPortrait}
        alt="Dimitris"
        width="300"
        height="300"
        className="rounded-md w-48 h-48 object-cover object-top mb-4"
      />
      <p className="mb-4">
        {`I'm a front-end developer and fintech enthusiast. Head of Frontend at`}{" "}
        <Link
          href="https://nativeteams.com/"
          className="inline-flex items-center rounded border border-neutral-200 bg-neutral-50 p-1 text-sm leading-4 text-neutral-900 no-underline dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100"
        >
          <Image
            src={NTLogo}
            alt="Native Teams Logo"
            width="12"
            height="12"
            className="mr-1"
          />
          Native Teams
        </Link>
        , where I help build the future of work. From HR to payroll solutions,
        we're creating a platform that supports the new way of working.
      </p>

      <p className="mb-4">
        This is all new for me – writing and sharing my thoughts with the world.
        I'll be sharing my mind about engineering management, software, fintech and whatever
        else pops. Dive in and enjoy the read!
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  );
}
