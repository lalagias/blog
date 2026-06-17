import type {
  SpreadsheetDocument,
  SpreadsheetFormat,
  SpreadsheetSheet,
} from "@/lib/spreadsheet-store"

const SUPPORTED_FORMATS = new Set(["csv", "tsv", "xlsx", "xls"])

function getFormat(filename: string): SpreadsheetFormat {
  const extension = filename.split(".").pop()?.toLowerCase()
  if (extension && SUPPORTED_FORMATS.has(extension)) {
    return extension as SpreadsheetFormat
  }

  return "unknown"
}

function createDocumentId(filename: string) {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID()
  }

  return `${Date.now()}-${filename.replace(/[^a-z0-9]+/gi, "-")}`
}

function stringifyCell(value: unknown) {
  if (value == null) return ""
  if (value instanceof Date) return new Intl.DateTimeFormat().format(value)
  return String(value)
}

function normalizeHeader(rawHeader: unknown[], totalColumns: number) {
  const seen = new Map<string, number>()

  return Array.from({ length: totalColumns }, (_, index) => {
    const base = stringifyCell(rawHeader[index]).trim() || `Column ${index + 1}`
    const count = seen.get(base) ?? 0
    seen.set(base, count + 1)

    return count === 0 ? base : `${base} ${count + 1}`
  })
}

function normalizeRows(rows: unknown[][]): SpreadsheetSheet {
  const totalColumns = rows.reduce((largest, row) => Math.max(largest, row.length), 0)
  const [header = [], ...body] = rows
  const columns = normalizeHeader(header, Math.max(totalColumns, 1))

  return {
    name: "",
    columns,
    rows: body.map((row) =>
      Array.from({ length: columns.length }, (_, index) => stringifyCell(row[index])),
    ),
  }
}

export async function parseFile(file: File): Promise<SpreadsheetDocument> {
  const { read, utils } = await import("xlsx")
  const arrayBuffer = await file.arrayBuffer()
  const workbook = read(arrayBuffer, {
    cellDates: true,
    raw: false,
    type: "array",
  })

  const sheets: SpreadsheetSheet[] = workbook.SheetNames.map((sheetName) => {
    const worksheet = workbook.Sheets[sheetName]
    const rows = utils.sheet_to_json<unknown[]>(worksheet, {
      blankrows: false,
      defval: "",
      header: 1,
      raw: false,
    })
    const sheet = normalizeRows(rows)

    return {
      ...sheet,
      name: sheetName,
    }
  })

  return {
    id: createDocumentId(file.name),
    name: file.name,
    format: getFormat(file.name),
    importedAt: new Date().toISOString(),
    sheets: sheets.length > 0 ? sheets : [{ name: "Sheet 1", columns: ["Column 1"], rows: [] }],
  }
}
