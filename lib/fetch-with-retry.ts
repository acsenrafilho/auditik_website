const DEFAULT_MAX_ATTEMPTS = 3;
const DEFAULT_DELAYS_MS = [2000, 3000] as const;

const TRANSIENT_STATUS_CODES = new Set([408, 429, 500, 502, 503, 504]);

export type FetchWithRetryOptions = {
  maxAttempts?: number;
  delaysMs?: readonly number[];
};

const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

const isTransientStatus = (status: number): boolean =>
  TRANSIENT_STATUS_CODES.has(status);

const isNetworkError = (error: unknown): boolean => {
  if (error instanceof TypeError) {
    return true;
  }
  if (error instanceof Error) {
    const message = error.message.toLowerCase();
    return (
      message.includes("failed to fetch") ||
      message.includes("networkerror") ||
      message.includes("network request failed") ||
      message.includes("load failed")
    );
  }
  return false;
};

/**
 * fetch wrapper with silent retries for network and transient HTTP failures.
 * Callers keep their normal loading UI; no retry messaging is surfaced.
 */
export async function fetchWithRetry(
  input: RequestInfo | URL,
  init?: RequestInit,
  options?: FetchWithRetryOptions,
): Promise<Response> {
  const maxAttempts = options?.maxAttempts ?? DEFAULT_MAX_ATTEMPTS;
  const delaysMs = options?.delaysMs ?? DEFAULT_DELAYS_MS;

  let lastError: unknown;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      const response = await fetch(input, init);

      if (
        !response.ok &&
        isTransientStatus(response.status) &&
        attempt < maxAttempts
      ) {
        const delay = delaysMs[Math.min(attempt - 1, delaysMs.length - 1)] ?? 0;
        if (delay > 0) {
          await sleep(delay);
        }
        continue;
      }

      return response;
    } catch (error) {
      lastError = error;
      if (!isNetworkError(error) || attempt >= maxAttempts) {
        throw error;
      }
      const delay = delaysMs[Math.min(attempt - 1, delaysMs.length - 1)] ?? 0;
      if (delay > 0) {
        await sleep(delay);
      }
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error("Request failed after retries.");
}
