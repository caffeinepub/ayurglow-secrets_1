/**
 * IndexedDB-backed image store for AyurGlow Secrets.
 *
 * Images (base64 data-URLs) are stored keyed by their `id` in an IDB object
 * store called "images".  The BlogPost / InlineImage objects in localStorage
 * keep every field *except* `url` so they stay small; the real pixel data is
 * fetched from here on demand.
 *
 * API is fully promise-based and safe to call from any component.
 */

const DB_NAME = "ayurglow_images";
const DB_VERSION = 1;
const STORE = "images";

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = (e) => {
      const db = (e.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE); // keyPath = explicit key argument
      }
    };
    req.onsuccess = (e) => resolve((e.target as IDBOpenDBRequest).result);
    req.onerror = () => reject(req.error);
  });
}

/** Save or overwrite an image data-URL keyed by `id`. */
export async function saveImage(id: string, dataUrl: string): Promise<void> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).put(dataUrl, id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

/** Load an image data-URL by `id`. Returns null if not found. */
export async function loadImage(id: string): Promise<string | null> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readonly");
    const req = tx.objectStore(STORE).get(id);
    req.onsuccess = () => resolve((req.result as string) ?? null);
    req.onerror = () => reject(req.error);
  });
}

/** Load multiple images at once. Returns a map of id → dataUrl (missing ids are omitted). */
export async function loadImages(ids: string[]): Promise<Map<string, string>> {
  if (ids.length === 0) return new Map();
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const map = new Map<string, string>();
    const tx = db.transaction(STORE, "readonly");
    let pending = ids.length;
    for (const id of ids) {
      const req = tx.objectStore(STORE).get(id);
      req.onsuccess = () => {
        if (req.result) map.set(id, req.result as string);
        if (--pending === 0) resolve(map);
      };
      req.onerror = () => reject(req.error);
    }
    tx.onerror = () => reject(tx.error);
  });
}

/** Delete an image by `id`. */
export async function deleteImage(id: string): Promise<void> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).delete(id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

/** Delete multiple images. */
export async function deleteImages(ids: string[]): Promise<void> {
  if (ids.length === 0) return;
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    for (const id of ids) tx.objectStore(STORE).delete(id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}
