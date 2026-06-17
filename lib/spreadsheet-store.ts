export type SpreadsheetCell = string

export type SpreadsheetSheet = {
  name: string
  columns: string[]
  rows: SpreadsheetCell[][]
}

export type SpreadsheetFormat = "csv" | "tsv" | "xlsx" | "xls" | "unknown"

export type SpreadsheetDocument = {
  id: string
  name: string
  format: SpreadsheetFormat
  importedAt: string
  sheets: SpreadsheetSheet[]
}

const DB_NAME = "csv-viewer"
const DB_VERSION = 1
const DOCUMENTS_STORE = "documents"

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onupgradeneeded = () => {
      const db = request.result
      if (!db.objectStoreNames.contains(DOCUMENTS_STORE)) {
        db.createObjectStore(DOCUMENTS_STORE, { keyPath: "id" })
      }
    }

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

function withStore<T>(
  mode: IDBTransactionMode,
  callback: (store: IDBObjectStore) => IDBRequest<T>,
): Promise<T> {
  return openDatabase().then(
    (db) =>
      new Promise((resolve, reject) => {
        const transaction = db.transaction(DOCUMENTS_STORE, mode)
        const store = transaction.objectStore(DOCUMENTS_STORE)
        const request = callback(store)

        request.onsuccess = () => resolve(request.result)
        request.onerror = () => reject(request.error)
        transaction.onerror = () => reject(transaction.error)
        transaction.oncomplete = () => db.close()
        transaction.onabort = () => {
          db.close()
          reject(transaction.error)
        }
      }),
  )
}

export function saveDocument(document: SpreadsheetDocument) {
  return withStore("readwrite", (store) => store.put(document))
}

export function getAllDocuments() {
  return withStore<SpreadsheetDocument[]>("readonly", (store) => store.getAll())
}

export function deleteDocument(id: string) {
  return withStore("readwrite", (store) => store.delete(id))
}

export function clearAllDocuments() {
  return withStore("readwrite", (store) => store.clear())
}
