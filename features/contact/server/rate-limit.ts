import 'server-only';

// Preserve the existing process-local limit and request-key semantics.
const requests = new Map<string, { count: number; timestamp: number }>();
const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 5;

export function allowContactRequest(key: string): boolean {
  const now = Date.now();
  const record = requests.get(key);

  if (record && now - record.timestamp < WINDOW_MS) {
    if (record.count >= MAX_REQUESTS) return false;
    record.count++;
  } else {
    requests.set(key, { count: 1, timestamp: now });
  }

  return true;
}
