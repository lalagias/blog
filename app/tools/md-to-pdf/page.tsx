"use client"

import { useCallback, useState } from "react"
import { marked, type Tokens } from "marked"
import Link from "next/link"

const SAMPLE = `# My Document

A quick note converted to PDF — right in the browser.

## Why this exists

Sometimes you just need a clean PDF from markdown without spinning up a tool, uploading a file, or waiting for a conversion service. This does it locally with real, selectable text.

## Features

- **Bold** and *italic* text, plus ~~strikethrough~~
- \`Inline code\` and fenced code blocks
- Lists, blockquotes, links, and tables
- Crisp vector text — not a screenshot

## Code Example

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`
}
\`\`\`

## Table

| Name  | Role             | Status |
|-------|------------------|:------:|
| Alice | Product Engineer | Active |
| Bob   | Designer         | Active |
| Carol | Engineering Lead | Active |

> Ideas are cheap. Execution is everything.

[Visit the blog](https://dkountanis.xyz)
`

// biome-ignore lint/suspicious/noExplicitAny: pdfmake content nodes are loosely typed
type PdfNode = any

const COLORS = {
  text: "#1a1a1a",
  heading: "#111111",
  link: "#2563eb",
  codeText: "#c0341d",
  muted: "#6b7280",
  border: "#e5e7eb",
  codeBg: "#f4f4f5",
  headerBg: "#f9fafb",
  zebra: "#fafafa",
}

const CONTENT_WIDTH = 515 // A4 (595pt) minus default 40pt margins each side

type RunStyle = {
  bold?: boolean
  italics?: boolean
  color?: string
  decoration?: "underline" | "lineThrough"
  link?: string
}

// biome-ignore lint/suspicious/noExplicitAny: marked inline token unions
function inlineToRuns(tokens: any[] | undefined, inherited: RunStyle = {}): PdfNode[] {
  if (!tokens || tokens.length === 0) return [{ text: "", ...inherited }]
  const runs: PdfNode[] = []

  for (const token of tokens) {
    switch (token.type) {
      case "strong":
        runs.push(...inlineToRuns(token.tokens, { ...inherited, bold: true }))
        break
      case "em":
        runs.push(...inlineToRuns(token.tokens, { ...inherited, italics: true }))
        break
      case "del":
        runs.push(...inlineToRuns(token.tokens, { ...inherited, decoration: "lineThrough" }))
        break
      case "codespan":
        runs.push({ text: token.text, color: COLORS.codeText, ...inherited })
        break
      case "link":
        runs.push(
          ...inlineToRuns(token.tokens, {
            ...inherited,
            color: COLORS.link,
            decoration: "underline",
            link: token.href,
          }),
        )
        break
      case "br":
        runs.push({ text: "\n" })
        break
      case "escape":
        runs.push({ text: token.text, ...inherited })
        break
      case "text":
        if (token.tokens?.length) {
          runs.push(...inlineToRuns(token.tokens, inherited))
        } else {
          runs.push({ text: token.text, ...inherited })
        }
        break
      default:
        if (token.text) runs.push({ text: token.text, ...inherited })
    }
  }

  return runs
}

function mapAlign(a: string | null): "left" | "right" | "center" {
  if (a === "right") return "right"
  if (a === "center") return "center"
  return "left"
}

// biome-ignore lint/suspicious/noExplicitAny: marked list token
function convertListItems(listToken: any): PdfNode[] {
  return listToken.items.map((item: Tokens.ListItem) => {
    const parts: PdfNode[] = []
    // biome-ignore lint/suspicious/noExplicitAny: nested block tokens
    for (const t of item.tokens as any[]) {
      if (t.type === "list") {
        parts.push(t.ordered ? { ol: convertListItems(t) } : { ul: convertListItems(t) })
      } else if (t.type === "text" || t.type === "paragraph") {
        parts.push({ text: inlineToRuns(t.tokens), style: "listItem" })
      } else {
        parts.push(...convertBlocks([t]))
      }
    }
    return parts.length === 1 ? parts[0] : { stack: parts }
  })
}

// biome-ignore lint/suspicious/noExplicitAny: marked top-level token union
function convertBlocks(tokens: any[]): PdfNode[] {
  const content: PdfNode[] = []

  for (const token of tokens) {
    switch (token.type) {
      case "heading": {
        const styleName = `h${Math.min(token.depth, 4)}`
        content.push({ text: inlineToRuns(token.tokens), style: styleName })
        if (token.depth === 1) {
          content.push({
            canvas: [
              {
                type: "line",
                x1: 0,
                y1: 0,
                x2: CONTENT_WIDTH,
                y2: 0,
                lineWidth: 0.5,
                lineColor: COLORS.border,
              },
            ],
            margin: [0, 2, 0, 10],
          })
        }
        break
      }
      case "paragraph":
        content.push({ text: inlineToRuns(token.tokens), style: "paragraph" })
        break
      case "list":
        content.push({
          [token.ordered ? "ol" : "ul"]: convertListItems(token),
          margin: [0, 2, 0, 8],
        })
        break
      case "blockquote":
        content.push({
          table: {
            widths: ["*"],
            body: [[{ stack: convertBlocks(token.tokens), border: [false, false, false, false] }]],
          },
          layout: {
            hLineWidth: () => 0,
            vLineWidth: (i: number) => (i === 0 ? 3 : 0),
            vLineColor: () => "#d1d5db",
            paddingLeft: () => 12,
            paddingRight: () => 8,
            paddingTop: () => 2,
            paddingBottom: () => 2,
          },
          color: COLORS.muted,
          italics: true,
          margin: [0, 4, 0, 10],
        })
        break
      case "code":
        content.push({
          table: {
            widths: ["*"],
            body: [[{ text: token.text, style: "codeBlock" }]],
          },
          layout: {
            hLineWidth: () => 0,
            vLineWidth: () => 0,
            fillColor: () => COLORS.codeBg,
            paddingLeft: () => 12,
            paddingRight: () => 12,
            paddingTop: () => 10,
            paddingBottom: () => 10,
          },
          margin: [0, 4, 0, 10],
        })
        break
      case "table": {
        // biome-ignore lint/suspicious/noExplicitAny: marked table cell
        const header = token.header.map((cell: any, i: number) => ({
          text: inlineToRuns(cell.tokens),
          style: "tableHeader",
          alignment: mapAlign(token.align[i]),
        }))
        // biome-ignore lint/suspicious/noExplicitAny: marked table rows
        const rows = token.rows.map((row: any[]) =>
          // biome-ignore lint/suspicious/noExplicitAny: marked table cell
          row.map((cell: any, i: number) => ({
            text: inlineToRuns(cell.tokens),
            alignment: mapAlign(token.align[i]),
          })),
        )
        content.push({
          table: {
            headerRows: 1,
            widths: token.header.map(() => "*"),
            body: [header, ...rows],
          },
          layout: {
            hLineWidth: () => 0.5,
            vLineWidth: () => 0.5,
            hLineColor: () => COLORS.border,
            vLineColor: () => COLORS.border,
            fillColor: (rowIndex: number) =>
              rowIndex === 0 ? COLORS.headerBg : rowIndex % 2 === 0 ? COLORS.zebra : null,
            paddingLeft: () => 8,
            paddingRight: () => 8,
            paddingTop: () => 5,
            paddingBottom: () => 5,
          },
          margin: [0, 4, 0, 10],
        })
        break
      }
      case "hr":
        content.push({
          canvas: [
            {
              type: "line",
              x1: 0,
              y1: 0,
              x2: CONTENT_WIDTH,
              y2: 0,
              lineWidth: 0.5,
              lineColor: COLORS.border,
            },
          ],
          margin: [0, 8, 0, 12],
        })
        break
      case "space":
        break
      default:
        if (token.text) content.push({ text: token.text, style: "paragraph" })
    }
  }

  return content
}

function buildDocDefinition(markdown: string): PdfNode {
  const tokens = marked.lexer(markdown)
  return {
    content: convertBlocks(tokens),
    defaultStyle: {
      fontSize: 11,
      lineHeight: 1.4,
      color: COLORS.text,
    },
    styles: {
      h1: { fontSize: 24, bold: true, color: COLORS.heading, margin: [0, 0, 0, 4] },
      h2: { fontSize: 18, bold: true, color: COLORS.heading, margin: [0, 14, 0, 6] },
      h3: { fontSize: 14, bold: true, color: COLORS.heading, margin: [0, 10, 0, 4] },
      h4: { fontSize: 12, bold: true, color: COLORS.heading, margin: [0, 8, 0, 4] },
      paragraph: { margin: [0, 0, 0, 8] },
      listItem: { margin: [0, 1, 0, 1] },
      codeBlock: { fontSize: 9.5, preserveLeadingSpaces: true, color: COLORS.text },
      tableHeader: { bold: true, color: COLORS.heading },
    },
    pageMargins: [40, 48, 40, 48],
  }
}

function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

type Tab = "write" | "preview"

export default function MdToPdfPage() {
  const [markdown, setMarkdown] = useState(SAMPLE)
  const [tab, setTab] = useState<Tab>("write")
  const [isDownloading, setIsDownloading] = useState(false)

  const htmlPreview = marked.parse(markdown) as string

  const downloadAsPdf = useCallback(async () => {
    if (!markdown.trim()) return
    setIsDownloading(true)

    try {
      // biome-ignore lint/suspicious/noExplicitAny: pdfmake has loose runtime exports
      const pdfMakeModule: any = await import("pdfmake/build/pdfmake")
      // biome-ignore lint/suspicious/noExplicitAny: vfs_fonts has no types
      const vfsModule: any = await import("pdfmake/build/vfs_fonts")

      const pdfMake = pdfMakeModule.default ?? pdfMakeModule
      const vfs = vfsModule.default ?? vfsModule
      pdfMake.addVirtualFileSystem(vfs)

      const docDefinition = buildDocDefinition(markdown)

      const firstHeading = markdown.match(/^#\s+(.+)/m)
      const filename = firstHeading ? `${slugify(firstHeading[1])}.pdf` : "document.pdf"

      pdfMake.createPdf(docDefinition).download(filename)
    } catch (err) {
      console.error("PDF generation failed", err)
    } finally {
      setIsDownloading(false)
    }
  }, [markdown])

  return (
    <section className="w-full">
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/tools"
          className="text-xs text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors mb-3 inline-flex items-center gap-1"
        >
          ← tools
        </Link>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="font-semibold text-2xl tracking-tighter">md → pdf</h1>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
              Write markdown, download a real PDF. Runs in your browser — nothing is stored.
            </p>
          </div>
          <button
            type="button"
            onClick={downloadAsPdf}
            disabled={isDownloading || !markdown.trim()}
            className="shrink-0 text-sm font-medium px-4 py-2 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 hover:bg-neutral-700 dark:hover:bg-neutral-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors rounded-sm"
          >
            {isDownloading ? "generating…" : "Download PDF"}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-neutral-200 dark:border-neutral-800">
        {(["write", "preview"] as Tab[]).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
              tab === t
                ? "border-neutral-900 dark:border-neutral-100 text-neutral-900 dark:text-neutral-100"
                : "border-transparent text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Editor / Preview */}
      {tab === "write" ? (
        <textarea
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          spellCheck={false}
          placeholder="Write or paste your markdown here…"
          className="w-full min-h-[480px] px-4 py-4 text-sm font-mono leading-relaxed bg-neutral-50 dark:bg-neutral-950 border border-t-0 border-neutral-200 dark:border-neutral-800 resize-y focus:outline-none focus:ring-1 focus:ring-neutral-400 dark:focus:ring-neutral-600 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400"
        />
      ) : (
        <div
          // biome-ignore lint/security/noDangerouslySetInnerHtml: user's own markdown rendered locally
          dangerouslySetInnerHTML={{ __html: htmlPreview }}
          className="prose prose-neutral dark:prose-invert min-h-[480px] px-4 py-4 border border-t-0 border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 max-w-none text-sm"
        />
      )}
    </section>
  )
}
