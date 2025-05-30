import Link from "next/link";
import { ModeToggle } from "@/app/components/mode-toggle";

const navItems = {
  "/": {
    name: "home",
  },
  "/consulting": {
    name: "consulting",
  },
  "/work": {
    name: "work",
  },
  "/blog": {
    name: "blog",
  },
  "/build-in-public": {
    name: "build in public",
  },
};

export function Navbar() {
  return (
    <aside className="-ml-[8px] mb-16 tracking-tight relative">
      <div className="lg:sticky lg:top-20">
        <nav
          className="flex flex-row items-start relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative"
          id="nav"
        >
          <div className="flex flex-row space-x-0 gap-1 pr-2 sm:pr-10">
            {Object.entries(navItems).map(([path, { name }]) => {
              return (
                <Link
                  key={path}
                  href={path}
                  className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative sm:py-1 sm:px-2 m-1"
                >
                  {name}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
      <ModeToggle className="absolute top-0 right-0" />
    </aside>
  );
}
