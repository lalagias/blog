import "@/app/global.css"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { GeistSans } from "geist/font/sans"
import type { Metadata } from "next"
import Footer from "@/components/footer"
import { Navbar } from "@/components/nav"
import { ThemeProvider } from "@/components/theme-provider"
import { absoluteUrl, siteName, siteUrl } from "@/lib/site"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description:
    "VP of Product Engineering at Native Teams. Fintech, AI-native engineering, and building products.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Dimitris Kountanis | VP of Product Engineering at Native Teams",
    description:
      "Dimitris Kountanis — VP of Product Engineering at Native Teams. Writing about AI-native engineering, product development, fintech, and the future of software teams.",
    url: absoluteUrl("/"),
    siteName: "Dimitris Kountanis Portfolio",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "Dimitris Kountanis",
    card: "summary_large_image",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={GeistSans.variable} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/assets/icons/logo-monogram.svg" type="image/svg+xml" />
      </head>
      <body className="antialiased font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="h-screen max-w-xl w-full mt-0 mx-0 sm:mx-4 md:mt-8 lg:mx-auto flex flex-col items-center text-black dark:text-white bg-background">
            <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0 w-full">
              <Navbar />
              {children}
            </main>

            <Footer />
          </div>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
