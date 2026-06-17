import type { Metadata } from "next"
import { CsvViewer } from "@/app/tools/csv-viewer/csv-viewer"
import { absoluteUrl, ogImageUrl, siteName } from "@/lib/site"

const title = "CSV / Excel Viewer"
const description =
  "Drop CSV or Excel files and browse them in a fast spreadsheet view. Everything stays in your browser."
const canonicalUrl = absoluteUrl("/tools/csv-viewer")
const image = ogImageUrl(title)

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    title,
    description,
    url: canonicalUrl,
    siteName,
    type: "website",
    images: [{ url: image, width: 1920, height: 1080, alt: title }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [image],
  },
}

export default function CsvViewerPage() {
  return <CsvViewer />
}
