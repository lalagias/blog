"use client"

import Link from "next/link"
import { useCallback, useEffect, useRef, useState } from "react"
import { DataGrid } from "@/app/tools/csv-viewer/data-grid"
import { parseFile } from "@/lib/parse-spreadsheet"
import {
  clearAllDocuments,
  deleteDocument,
  getAllDocuments,
  type SpreadsheetDocument,
  saveDocument,
} from "@/lib/spreadsheet-store"

const ACCEPTED_EXTENSIONS = [".csv", ".tsv", ".xlsx", ".xls"]
const VIEWER_STATE_KEY = "csv-viewer-state"
const VIEWER_STATE_VERSION = 1

type PersistedViewerState = {
  version: typeof VIEWER_STATE_VERSION
  activeDocumentId: string | null
  sheetIndexes: Record<string, number>
}

function isAcceptedFile(file: File) {
  const name = file.name.toLowerCase()
  return ACCEPTED_EXTENSIONS.some((extension) => name.endsWith(extension))
}

function formatImportedAt(value: string) {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value))
}

function readPersistedState(): PersistedViewerState {
  try {
    const raw = localStorage.getItem(VIEWER_STATE_KEY)
    if (!raw) return { version: VIEWER_STATE_VERSION, activeDocumentId: null, sheetIndexes: {} }
    const parsed = JSON.parse(raw) as Partial<PersistedViewerState>

    if (parsed.version !== VIEWER_STATE_VERSION) {
      return { version: VIEWER_STATE_VERSION, activeDocumentId: null, sheetIndexes: {} }
    }

    return {
      version: VIEWER_STATE_VERSION,
      activeDocumentId: parsed.activeDocumentId ?? null,
      sheetIndexes: parsed.sheetIndexes ?? {},
    }
  } catch {
    return { version: VIEWER_STATE_VERSION, activeDocumentId: null, sheetIndexes: {} }
  }
}

export function CsvViewer() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [documents, setDocuments] = useState<SpreadsheetDocument[]>([])
  const [activeDocumentId, setActiveDocumentId] = useState<string | null>(null)
  const [sheetIndexes, setSheetIndexes] = useState<Record<string, number>>({})
  const [isLoaded, setIsLoaded] = useState(false)
  const [isImporting, setIsImporting] = useState(false)
  const [dragDepth, setDragDepth] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const activeDocument =
    documents.find((document) => document.id === activeDocumentId) ?? documents[0]
  const activeSheetIndex = activeDocument ? (sheetIndexes[activeDocument.id] ?? 0) : 0
  const activeSheet = activeDocument
    ? activeDocument.sheets[Math.min(activeSheetIndex, activeDocument.sheets.length - 1)]
    : null

  useEffect(() => {
    let isMounted = true

    async function loadDocuments() {
      try {
        const persistedState = readPersistedState()
        const storedDocuments = await getAllDocuments()
        const sortedDocuments = storedDocuments.sort(
          (left, right) =>
            new Date(left.importedAt).getTime() - new Date(right.importedAt).getTime(),
        )

        if (!isMounted) return

        setDocuments(sortedDocuments)
        setSheetIndexes(persistedState.sheetIndexes)
        setActiveDocumentId(
          sortedDocuments.some((document) => document.id === persistedState.activeDocumentId)
            ? persistedState.activeDocumentId
            : (sortedDocuments.at(-1)?.id ?? null),
        )
      } catch {
        if (isMounted) setError("Could not load saved sheets from this browser.")
      } finally {
        if (isMounted) setIsLoaded(true)
      }
    }

    loadDocuments()

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    if (!isLoaded) return

    localStorage.setItem(
      VIEWER_STATE_KEY,
      JSON.stringify({
        version: VIEWER_STATE_VERSION,
        activeDocumentId: activeDocument?.id ?? null,
        sheetIndexes,
      } satisfies PersistedViewerState),
    )
  }, [activeDocument?.id, isLoaded, sheetIndexes])

  const importFiles = useCallback(async (files: FileList | File[]) => {
    const acceptedFiles = Array.from(files).filter(isAcceptedFile)

    if (acceptedFiles.length === 0) {
      setError("Drop CSV, TSV, XLS, or XLSX files.")
      return
    }

    setError(null)
    setIsImporting(true)

    try {
      const importedDocuments = await Promise.all(
        acceptedFiles.map(async (file) => {
          const document = await parseFile(file)
          await saveDocument(document)
          return document
        }),
      )

      setDocuments((current) => [...current, ...importedDocuments])
      setActiveDocumentId(importedDocuments.at(-1)?.id ?? null)
    } catch (importError) {
      console.error("Spreadsheet import failed", importError)
      setError("Could not import one of those files. Please check the format and try again.")
    } finally {
      setIsImporting(false)
      if (inputRef.current) inputRef.current.value = ""
    }
  }, [])

  async function removeDocument(id: string) {
    const nextDocuments = documents.filter((document) => document.id !== id)
    await deleteDocument(id)
    setDocuments(nextDocuments)
    setSheetIndexes((current) => {
      const next = { ...current }
      delete next[id]
      return next
    })

    if (activeDocument?.id === id) {
      setActiveDocumentId(nextDocuments.at(-1)?.id ?? null)
    }
  }

  async function clearDocuments() {
    if (documents.length === 0) return
    if (!window.confirm("Remove all saved sheets from this browser?")) return

    await clearAllDocuments()
    setDocuments([])
    setActiveDocumentId(null)
    setSheetIndexes({})
  }

  function handleDragEnter(event: React.DragEvent<HTMLDivElement>) {
    if (!Array.from(event.dataTransfer.items).some((item) => item.kind === "file")) return
    event.preventDefault()
    setDragDepth((depth) => depth + 1)
  }

  function handleDragLeave(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault()
    setDragDepth((depth) => Math.max(0, depth - 1))
  }

  function handleDragOver(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault()
    event.dataTransfer.dropEffect = "copy"
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault()
    setDragDepth(0)
    importFiles(event.dataTransfer.files)
  }

  return (
    <section
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="relative left-1/2 flex min-h-[calc(100vh-7rem)] w-screen -translate-x-1/2 flex-col px-3 pb-6 md:px-6"
    >
      {dragDepth > 0 ? (
        <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-white/85 backdrop-blur-sm dark:bg-neutral-950/85">
          <div className="border border-dashed border-neutral-400 bg-white px-10 py-8 text-center shadow-xl dark:border-neutral-600 dark:bg-neutral-950">
            <p className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
              Drop spreadsheets here
            </p>
            <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
              CSV, TSV, XLS, and XLSX files stay in this browser.
            </p>
          </div>
        </div>
      ) : null}

      <div className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
          <div>
            <Link
              href="/tools"
              className="mb-3 inline-flex items-center gap-1 text-xs text-neutral-500 transition-colors hover:text-neutral-800 focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:outline-none dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus-visible:ring-neutral-600 dark:focus-visible:ring-offset-neutral-950"
            >
              &larr; tools
            </Link>
            <h1 className="text-balance text-2xl font-semibold tracking-tighter">
              CSV / Excel Viewer
            </h1>
            <p className="mt-1 max-w-2xl text-sm text-neutral-500 dark:text-neutral-400">
              Drop as many CSV or Excel files as you need. Browse each one in tabs, with sheets and
              data stored locally in your browser.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <input
              ref={inputRef}
              type="file"
              multiple
              accept={ACCEPTED_EXTENSIONS.join(",")}
              onChange={(event) => {
                if (event.target.files) importFiles(event.target.files)
              }}
              className="sr-only"
            />
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={isImporting}
              className="h-9 touch-manipulation bg-neutral-900 px-4 text-sm font-medium text-white transition-colors hover:bg-neutral-700 focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-300 dark:focus-visible:ring-neutral-600 dark:focus-visible:ring-offset-neutral-950"
            >
              {isImporting ? "Importing…" : "Add Files"}
            </button>
            <button
              type="button"
              onClick={clearDocuments}
              disabled={documents.length === 0 || isImporting}
              className="h-9 touch-manipulation border border-neutral-200 px-4 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-40 dark:border-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-900 dark:focus-visible:ring-neutral-600 dark:focus-visible:ring-offset-neutral-950"
            >
              Clear All
            </button>
          </div>
        </div>

        {error ? (
          <div
            role="alert"
            aria-live="polite"
            className="mb-3 border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-950 dark:bg-red-950/30 dark:text-red-300"
          >
            {error}
          </div>
        ) : null}

        <div className="flex min-h-0 flex-1 flex-col border border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900/40">
          <div className="flex min-h-11 items-center gap-1 overflow-x-auto border-b border-neutral-200 bg-white px-2 dark:border-neutral-800 dark:bg-neutral-950">
            {documents.length > 0 ? (
              documents.map((document) => {
                const isActive = activeDocument?.id === document.id

                return (
                  <div
                    key={document.id}
                    className={`group flex max-w-xs shrink-0 items-center gap-2 border px-3 py-2 text-left text-sm transition-colors ${
                      isActive
                        ? "border-neutral-300 bg-neutral-100 text-neutral-900 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
                        : "border-transparent text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-neutral-100"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveDocumentId(document.id)}
                      className="flex min-w-0 flex-1 items-center gap-2 text-left focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:outline-none dark:focus-visible:ring-neutral-600 dark:focus-visible:ring-offset-neutral-950"
                      title={`${document.name} - imported ${formatImportedAt(document.importedAt)}`}
                    >
                      <span className="truncate">{document.name}</span>
                      <span className="shrink-0 text-[10px] uppercase text-neutral-400">
                        {document.format}
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => removeDocument(document.id)}
                      className="shrink-0 px-1 text-neutral-400 opacity-70 transition-colors hover:text-neutral-900 focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:outline-none group-hover:opacity-100 dark:hover:text-neutral-100 dark:focus-visible:ring-neutral-600"
                      aria-label={`Remove ${document.name}`}
                    >
                      x
                    </button>
                  </div>
                )
              })
            ) : (
              <p className="px-2 text-sm text-neutral-500 dark:text-neutral-400">
                No files imported yet.
              </p>
            )}
          </div>

          {activeDocument && activeDocument.sheets.length > 1 ? (
            <div className="flex min-h-10 items-center gap-1 overflow-x-auto border-b border-neutral-200 bg-neutral-50 px-2 dark:border-neutral-800 dark:bg-neutral-900">
              {activeDocument.sheets.map((sheet, index) => (
                <button
                  key={`${sheet.name}-${index}`}
                  type="button"
                  onClick={() =>
                    setSheetIndexes((current) => ({
                      ...current,
                      [activeDocument.id]: index,
                    }))
                  }
                  className={`shrink-0 px-3 py-1.5 text-xs font-medium transition-colors focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:outline-none dark:focus-visible:ring-neutral-600 ${
                    activeSheetIndex === index
                      ? "bg-white text-neutral-900 shadow-sm dark:bg-neutral-950 dark:text-neutral-100"
                      : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                  }`}
                >
                  {sheet.name}
                </button>
              ))}
            </div>
          ) : null}

          {activeSheet ? (
            <DataGrid sheet={activeSheet} />
          ) : (
            <div className="flex min-h-[560px] flex-1 items-center justify-center bg-white p-6 text-center dark:bg-neutral-950">
              <div className="max-w-md border border-dashed border-neutral-300 px-8 py-10 dark:border-neutral-700">
                <p className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
                  Drop CSV or Excel files
                </p>
                <p className="mt-2 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                  Import multiple files, switch between them with tabs, and keep them saved locally
                  in this browser.
                </p>
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  className="mt-5 h-9 touch-manipulation bg-neutral-900 px-4 text-sm font-medium text-white transition-colors hover:bg-neutral-700 focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 focus-visible:outline-none dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-300 dark:focus-visible:ring-neutral-600 dark:focus-visible:ring-offset-neutral-950"
                >
                  Choose Files
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
