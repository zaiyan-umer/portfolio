import 'server-only';
import { isIP } from 'node:net';

const requests = new Map<string, { count: number; timestamp: number }>();
const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 5;
const MAX_KEYS = 10000;
let lastCleanup = 0;

export function contactRequestKey(headers: Headers): string {
  // Only Vercel's server-set environment and protected header establish trust.
  // Other deployments share a bucket until their proxy contract is verified.
  if (process.env.VERCEL !== '1') return 'unknown';
  const ip = headers.get('x-vercel-forwarded-for')?.trim();
  return ip && isIP(ip) ? ip : 'unknown';
}

export function allowContactRequest(key: string): boolean {
  const now = Date.now();
  if (now - lastCleanup >= WINDOW_MS) {
    for (const [storedKey, record] of requests) {
      if (now - record.timestamp >= WINDOW_MS) requests.delete(storedKey);
    }
    lastCleanup = now;
  }
  const record = requests.get(key);

  if (record && now - record.timestamp < WINDOW_MS) {
    if (record.count >= MAX_REQUESTS) return false;
    record.count++;
  } else {
    // Do not evict live buckets: doing so would reopen their request allowance.
    if (!record && requests.size >= MAX_KEYS) return false;
    requests.set(key, { count: 1, timestamp: now });
  }

  return true;
}
