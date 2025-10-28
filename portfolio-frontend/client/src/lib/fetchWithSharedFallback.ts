export type FetchResult<T> = { data: T; source: "api" | "snapshot"; updatedAt?: string };

export async function fetchWithSharedFallback<T>(
  apiUrl: string,
  snapshotUrl: string,
  timeoutMs = 6000
): Promise<FetchResult<T>> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(apiUrl, { signal: controller.signal });
    clearTimeout(timer);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = (await res.json()) as T;
    return { data, source: "api" };
  } catch (err) {
    // On error or timeout, fallback to a shared snapshot file (served from public/)
    try {
      const snap = await fetch(snapshotUrl);
      if (!snap.ok) throw new Error(`Snapshot fetch failed: ${snap.status}`);
      const json = await snap.json();
      // Support the snapshot shape { updatedAt, data }
      if (json && Object.prototype.hasOwnProperty.call(json, "data")) {
        return { data: json.data as T, source: "snapshot", updatedAt: json.updatedAt };
      }
      return { data: json as T, source: "snapshot" };
    } catch (snapErr) {
      throw err; // rethrow original api error
    }
  }
}
