import "@/app/global.css"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { GeistMono } from "geist/font/mono"
import type { Metadata } from "next"
import Footer from "@/app/components/footer"
import { Navbar } from "@/app/components/nav"
import { ThemeProvider } from "@/app/components/theme-provider"

export const metadata: Metadata = {
  metadataBase: new URL("https://dkountanis.xyz"),
  title: {
    default: "Dimitris Kountanis",
    template: "%s | Dimitris Kountanis",
  },
  description: "Founding Engineer at Native Teams, Front-End Developer, and Fintech Enthusiast.",
  openGraph: {
    title: "Dimitris Kountanis | Head of Front-End at Native Teams",
    description:
      "Explore the portfolio of Dimitris Kountanis, a founding engineer at Native Teams, front-end developer, and fintech enthusiast. Discover insights on engineering management, software development, and industry trends.",
    url: "https://dkountanis.xyz",
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
    <html lang="en" className={GeistMono.variable} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="antialiased font-mono">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="h-screen max-w-xl w-full mx-0 sm:mx-4 mt-8 lg:mx-auto flex flex-col items-center text-black dark:text-white bg-background">
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
