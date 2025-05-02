import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <nav className="flex gap-4 text-sm text-neutral-600 dark:text-neutral-400">
              <Link
                href="/rss"
                className="transition-colors hover:text-neutral-800 dark:hover:text-neutral-200"
                rel="noopener noreferrer"
                target="_blank"
              >
                rss
              </Link>
              <Link
                href="https://github.com/lalagias"
                className="transition-colors hover:text-neutral-800 dark:hover:text-neutral-200"
                rel="noopener noreferrer"
                target="_blank"
              >
                github
              </Link>
              <Link
                href="https://github.com/lalagias/blog"
                className="transition-colors hover:text-neutral-800 dark:hover:text-neutral-200"
                rel="noopener noreferrer"
                target="_blank"
              >
                source
              </Link>
              <Link
                href="/sitemap.xml"
                className="transition-colors hover:text-neutral-800 dark:hover:text-neutral-200"
                rel="noopener noreferrer"
                target="_blank"
              >
                sitemap
              </Link>
            </nav>
          </div>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
