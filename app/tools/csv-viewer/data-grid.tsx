"use client"

import { useVirtualizer } from "@tanstack/react-virtual"
import { useDeferredValue, useMemo, useRef, useState } from "react"
import type { SpreadsheetSheet } from "@/lib/spreadsheet-store"

const ROW_NUMBER_WIDTH = 56
const DEFAULT_COLUMN_WIDTH = 164
const MIN_COLUMN_WIDTH = 88
const MAX_COLUMN_WIDTH = 420
const ROW_HEIGHT = 34
const numberFormatter = new Intl.NumberFormat()

type SortState = {
  columnIndex: number
  direction: "asc" | "desc"
} | null

type SelectedCell = {
  rowIndex: number
  columnIndex: number
} | null

type VisibleRow = {
  row: string[]
  originalIndex: number
}

function isNumericCell(value: string) {
  if (!value.trim()) return false
  return Number.isFinite(Number(value.replace(/,/g, "")))
}

function compareCells(a: string, b: string) {
  const cleanA = a.replace(/,/g, "")
  const cleanB = b.replace(/,/g, "")
  const numberA = Number(cleanA)
  const numberB = Number(cleanB)

  if (Number.isFinite(numberA) && Number.isFinite(numberB)) {
    return numberA - numberB
  }

  return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" })
}

function getNextSort(current: SortState, columnIndex: number): SortState {
  if (!current || current.columnIndex !== columnIndex) {
    return { columnIndex, direction: "asc" }
  }

  if (current.direction === "asc") {
    return { columnIndex, direction: "desc" }
  }

  return null
}

export function DataGrid({ sheet }: { sheet: SpreadsheetSheet }) {
  const parentRef = useRef<HTMLDivElement>(null)
  const [query, setQuery] = useState("")
  const deferredQuery = useDeferredValue(query)
  const [sort, setSort] = useState<SortState>(null)
  const [columnWidths, setColumnWidths] = useState<Record<number, number>>({})
  const [selectedCell, setSelectedCell] = useState<SelectedCell>(null)

  const visibleRows = useMemo<VisibleRow[]>(() => {
    const normalizedQuery = deferredQuery.trim().toLowerCase()
    const rows = sheet.rows.map((row, originalIndex) => ({ row, originalIndex }))
    const filteredRows = normalizedQuery
      ? rows.filter(({ row }) => row.some((cell) => cell.toLowerCase().includes(normalizedQuery)))
      : rows

    if (!sort) return filteredRows

    return [...filteredRows].sort((left, right) => {
      const result = compareCells(
        left.row[sort.columnIndex] ?? "",
        right.row[sort.columnIndex] ?? "",
      )
      return sort.direction === "asc" ? result : -result
    })
  }, [deferredQuery, sheet.rows, sort])

  const widths = useMemo(
    () => sheet.columns.map((_, index) => columnWidths[index] ?? DEFAULT_COLUMN_WIDTH),
    [columnWidths, sheet.columns],
  )
  const gridTemplateColumns = `${ROW_NUMBER_WIDTH}px ${widths.map((width) => `${width}px`).join(" ")}`
  const totalGridWidth = ROW_NUMBER_WIDTH + widths.reduce((sum, width) => sum + width, 0)

  const rowVirtualizer = useVirtualizer({
    count: visibleRows.length,
    estimateSize: () => ROW_HEIGHT,
    getScrollElement: () => parentRef.current,
    overscan: 16,
  })

  function resizeColumn(index: number, event: React.PointerEvent<HTMLSpanElement>) {
    event.preventDefault()
    event.stopPropagation()

    const startX = event.clientX
    const startWidth = columnWidths[index] ?? DEFAULT_COLUMN_WIDTH

    function handlePointerMove(moveEvent: PointerEvent) {
      const nextWidth = Math.min(
        MAX_COLUMN_WIDTH,
        Math.max(MIN_COLUMN_WIDTH, startWidth + moveEvent.clientX - startX),
      )
      setColumnWidths((current) => ({ ...current, [index]: nextWidth }))
    }

    function handlePointerUp() {
      document.body.style.cursor = ""
      document.body.style.userSelect = ""
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerup", handlePointerUp)
    }

    document.body.style.cursor = "col-resize"
    document.body.style.userSelect = "none"
    window.addEventListener("pointermove", handlePointerMove)
    window.addEventListener("pointerup", handlePointerUp)
  }

  function resizeColumnWithKeyboard(index: number, event: React.KeyboardEvent<HTMLSpanElement>) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return

    event.preventDefault()
    const direction = event.key === "ArrowRight" ? 1 : -1
    setColumnWidths((current) => {
      const currentWidth = current[index] ?? DEFAULT_COLUMN_WIDTH
      const nextWidth = Math.min(
        MAX_COLUMN_WIDTH,
        Math.max(MIN_COLUMN_WIDTH, currentWidth + 12 * direction),
      )

      return { ...current, [index]: nextWidth }
    })
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-200 bg-neutral-50 px-3 py-2 dark:border-neutral-800 dark:bg-neutral-900/70">
        <div>
          <p className="text-sm font-medium tracking-tight text-neutral-900 dark:text-neutral-100">
            {sheet.name}
          </p>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            {numberFormatter.format(sheet.rows.length)} rows x{" "}
            {numberFormatter.format(sheet.columns.length)} columns
            {visibleRows.length !== sheet.rows.length
              ? `, ${numberFormatter.format(visibleRows.length)} visible`
              : ""}
          </p>
        </div>
        <label className="relative w-full max-w-sm">
          <span className="sr-only">Search sheet</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            name="sheet-search"
            autoComplete="off"
            placeholder="Search every cell…"
            className="h-9 w-full border border-neutral-200 bg-white px-3 text-sm text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus-visible:border-neutral-400 focus-visible:ring-2 focus-visible:ring-neutral-300 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100 dark:focus-visible:border-neutral-600 dark:focus-visible:ring-neutral-700"
          />
        </label>
      </div>

      <div
        ref={parentRef}
        className="relative min-h-[520px] flex-1 overflow-auto bg-white dark:bg-neutral-950"
      >
        <div style={{ minWidth: totalGridWidth }}>
          <div
            className="sticky top-0 z-30 grid border-b border-neutral-300 bg-neutral-100 text-sm font-medium text-neutral-600 shadow-[0_1px_0_rgba(0,0,0,0.04)] dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300"
            style={{ gridTemplateColumns }}
          >
            <div className="sticky left-0 z-40 flex h-9 items-center justify-center border-r border-neutral-300 bg-neutral-100 text-neutral-400 dark:border-neutral-700 dark:bg-neutral-900">
              #
            </div>
            {sheet.columns.map((column, index) => {
              const activeSort = sort?.columnIndex === index ? sort.direction : null

              return (
                <button
                  key={`${column}-${index}`}
                  type="button"
                  onClick={() => setSort((current) => getNextSort(current, index))}
                  className="group relative flex h-9 items-center justify-between gap-2 border-r border-neutral-300 px-2 text-left hover:bg-neutral-200/70 focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:outline-none dark:border-neutral-700 dark:hover:bg-neutral-800 dark:focus-visible:ring-neutral-600"
                  title={column}
                >
                  <span className="truncate">{column}</span>
                    <span className="shrink-0 text-sm uppercase tracking-wide text-neutral-400">
                    {activeSort ?? ""}
                  </span>
                  <span
                    role="separator"
                    tabIndex={0}
                    aria-label={`Resize ${column} column`}
                    aria-orientation="vertical"
                    onPointerDown={(event) => resizeColumn(index, event)}
                    onKeyDown={(event) => resizeColumnWithKeyboard(index, event)}
                    className="-right-1 absolute top-0 h-full w-2 cursor-col-resize touch-none focus-visible:bg-neutral-400 focus-visible:outline-none dark:focus-visible:bg-neutral-600"
                  />
                </button>
              )
            })}
          </div>

          <div
            className="relative"
            style={{
              height: rowVirtualizer.getTotalSize(),
              minWidth: totalGridWidth,
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const visibleRow = visibleRows[virtualRow.index]
              const displayRowNumber = visibleRow.originalIndex + 2

              return (
                <div
                  key={visibleRow.originalIndex}
                  className="absolute left-0 grid border-b border-neutral-200 text-sm text-neutral-800 even:bg-neutral-50/60 hover:bg-blue-50/70 dark:border-neutral-800 dark:text-neutral-100 dark:even:bg-neutral-900/35 dark:hover:bg-blue-950/30"
                  style={{
                    gridTemplateColumns,
                    height: ROW_HEIGHT,
                    minWidth: totalGridWidth,
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                >
                  <div className="sticky left-0 z-20 flex items-center justify-center border-r border-neutral-200 bg-inherit text-sm text-neutral-400 dark:border-neutral-800">
                    {displayRowNumber}
                  </div>
                  {sheet.columns.map((_, columnIndex) => {
                    const value = visibleRow.row[columnIndex] ?? ""
                    const isSelected =
                      selectedCell?.rowIndex === visibleRow.originalIndex &&
                      selectedCell.columnIndex === columnIndex

                    return (
                      <button
                        key={columnIndex}
                        type="button"
                        onClick={() =>
                          setSelectedCell({
                            rowIndex: visibleRow.originalIndex,
                            columnIndex,
                          })
                        }
                        className={`truncate border-r border-neutral-200 px-2 text-left outline-none focus-visible:bg-blue-100 focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-blue-500 dark:border-neutral-800 dark:focus-visible:bg-blue-950/60 ${
                          isNumericCell(value) ? "font-mono tabular-nums" : ""
                        } ${
                          isSelected
                            ? "bg-blue-100 ring-1 ring-inset ring-blue-500 dark:bg-blue-950/70"
                            : ""
                        }`}
                        title={value}
                      >
                        {value}
                      </button>
                    )
                  })}
                </div>
              )
            })}
          </div>

          {visibleRows.length === 0 ? (
            <div className="flex h-64 items-center justify-center border-t border-neutral-200 text-sm text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
              {sheet.rows.length === 0 ? "This sheet is empty." : "No rows match your search."}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
