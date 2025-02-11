import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mb-4 pt-4 mt-auto flex flex-row justify-between">
      <ul className="font-sm flex flex-col space-x-0 space-y-2 text-neutral-600 md:flex-row md:space-x-4 md:space-y-0 dark:text-neutral-300">
        <li>
          <Link
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href="/rss"
          >
            <p className="ml-2 h-7">rss</p>
          </Link>
        </li>
        <li>
          <Link
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/lalagias"
          >
            <p className="ml-2 h-7">github</p>
          </Link>
        </li>
        <li>
          <Link
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/lalagias/blog"
          >
            <p className="ml-2 h-7">view source</p>
          </Link>
        </li>
        <li>
          <Link
            className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
            rel="noopener noreferrer"
            target="_blank"
            href={`/sitemap.xml`}
          >
            <p className="ml-2 h-7">sitemap</p>
          </Link>
        </li>
      </ul>
    </footer>
  );
}
