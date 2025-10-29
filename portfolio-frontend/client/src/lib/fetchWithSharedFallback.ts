export type FetchResult<T> = { data: T; source: "api" | "snapshot"; updatedAt?: string };

function sleep(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

function parseJsDelivr(url: string) {
  // https://cdn.jsdelivr.net/gh/OWNER/REPO@BRANCH/path/to/file
  const m = url.match(/^https?:\/\/cdn\.jsdelivr\.net\/gh\/([^/]+)\/([^@]+)@([^/]+)\/(.+)$/i);
  if (!m) return null;
  const owner = m[1];
  const repo = m[2];
  const branch = m[3];
  const path = m[4];
  return { owner, repo, branch, path };
}

function parseRawGit(url: string) {
  // https://raw.githubusercontent.com/OWNER/REPO/BRANCH/path
  const m = url.match(/^https?:\/\/raw\.githubusercontent\.com\/([^/]+)\/([^/]+)\/([^/]+)\/(.+)$/i);
  if (!m) return null;
  const owner = m[1];
  const repo = m[2];
  const branch = m[3];
  const path = m[4];
  return { owner, repo, branch, path };
}

function generateSnapshotCandidates(snapshotUrl: string) {
  const candidates: string[] = [];
  // prefer provided url first
  candidates.push(snapshotUrl);

  const jd = parseJsDelivr(snapshotUrl);
  if (jd) {
    const { owner, repo, branch, path } = jd;
    candidates.push(`https://raw.githack.com/${owner}/${repo}/${branch}/${path}`);
    candidates.push(`https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`);
  } else {
    const rg = parseRawGit(snapshotUrl);
    if (rg) {
      const { owner, repo, branch, path } = rg;
      candidates.push(`https://cdn.jsdelivr.net/gh/${owner}/${repo}@${branch}/${path}`);
      candidates.push(`https://raw.githack.com/${owner}/${repo}/${branch}/${path}`);
    }
  }

  // dedupe while preserving order
  return Array.from(new Set(candidates));
}

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
    // keep the original error to rethrow if all fallbacks fail
    const originalError = err;
    // Try multiple snapshot hosts with retries on 429
    const candidates = generateSnapshotCandidates(snapshotUrl);
    const maxAttemptsPerHost = 3;

    for (const candidate of candidates) {
      for (let attempt = 1; attempt <= maxAttemptsPerHost; attempt++) {
        try {
          const snapController = new AbortController();
          // snapshot fetch timeout slightly larger
          const snapTimer = setTimeout(() => snapController.abort(), 10000);
          const snapRes = await fetch(candidate, { signal: snapController.signal });
          clearTimeout(snapTimer);

          if (snapRes.status === 429) {
            // rate limited: backoff and retry same host
            const backoff = 500 * Math.pow(2, attempt - 1); // 500ms, 1000ms, 2000ms
            await sleep(backoff);
            continue;
          }

          if (!snapRes.ok) {
            // try next host
            break;
          }

          const json = await snapRes.json();
          if (json && Object.prototype.hasOwnProperty.call(json, "data")) {
            return { data: json.data as T, source: "snapshot", updatedAt: json.updatedAt };
          }
          return { data: json as T, source: "snapshot" };
        } catch (e) {
          // If aborted due to timeout or network error, try again (or next host)
          if (attempt < maxAttemptsPerHost) {
            const backoff = 300 * Math.pow(2, attempt - 1);
            await sleep(backoff);
            continue;
          }
          // exhausted attempts for this host -> move to next candidate
          break;
        }
      }
    }

    // none of the snapshot candidates worked — rethrow original API error
    throw originalError;
  }
}
