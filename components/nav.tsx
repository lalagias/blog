"use client"

import Link from "next/link"
import { useState } from "react"
import { ModeToggle } from "@/components/mode-toggle"

const navItems = {
  "/": {
    name: "home",
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
  "/consulting": {
    name: "consulting",
  },
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <aside className="mb-16 tracking-tight relative">
      <div className="lg:sticky lg:top-20">
        {/* Desktop Nav */}
        <nav className="hidden md:flex flex-row items-center px-0 pb-0" id="nav">
          <div className="flex flex-row gap-1 pr-10 w-full">
            {Object.entries(navItems).map(([path, { name }]) => (
              <Link
                key={path}
                href={path}
                className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 py-1 px-2"
              >
                {name}
              </Link>
            ))}
            <ModeToggle className="ml-auto" />
          </div>
        </nav>

        {/* Mobile Nav */}
        <nav className="md:hidden flex items-center justify-between px-2" id="mobile-nav">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <CloseIcon className="size-5" /> : <MenuIcon className="size-5" />}
          </button>
          <ModeToggle />
        </nav>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background border border-neutral-200 dark:border-neutral-800 z-50 mt-2">
            <div className="flex flex-col py-2">
              {Object.entries(navItems).map(([path, { name }]) => (
                <Link
                  key={path}
                  href={path}
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-3 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                >
                  {name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}
