/**
 * blobStorage.ts — Wrapper for uploading images to Caffeine blob storage.
 *
 * Uploads image files to the storage gateway and returns a permanent HTTP URL
 * that is visible to all visitors (not stored in browser-local storage).
 */

import { HttpAgent } from "@icp-sdk/core/agent";
import { loadConfig } from "../config";
import { StorageClient } from "../utils/StorageClient";

let _storageClient: StorageClient | null = null;

async function getStorageClient(): Promise<StorageClient> {
  if (_storageClient) return _storageClient;
  const config = await loadConfig();
  const agent = new HttpAgent({
    host: config.backend_host,
  });
  _storageClient = new StorageClient(
    config.bucket_name,
    config.storage_gateway_url,
    config.backend_canister_id,
    config.project_id,
    agent,
  );
  return _storageClient;
}

/**
 * Upload an image File to blob storage and return its permanent public HTTP URL.
 *
 * @param file        The image File to upload.
 * @param onProgress  Optional callback receiving upload percentage (0–100).
 * @returns           A permanent HTTP URL string for the uploaded image.
 */
export async function uploadImageToBlob(
  file: File,
  onProgress?: (pct: number) => void,
): Promise<string> {
  // Reset the cached client on each upload to avoid stale agent/config issues
  _storageClient = null;
  const storageClient = await getStorageClient();
  const bytes = new Uint8Array(await file.arrayBuffer());
  const { hash } = await storageClient.putFile(bytes, onProgress);
  return storageClient.getDirectURL(hash);
}
