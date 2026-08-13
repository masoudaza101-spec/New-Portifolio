type Entry = { count: number; resetAt: number };

const store = new Map<string, Entry>();

function cleanup(now: number) {
  for (const [key, entry] of store) {
    if (now > entry.resetAt) store.delete(key);
  }
}

export function rateLimit(
  key: string,
  options: { limit?: number; windowMs?: number } = {}
): boolean {
  const { limit = 5, windowMs = 60_000 } = options;
  const now = Date.now();
  cleanup(now);

  const entry = store.get(key);
  if (!entry) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (entry.count >= limit) {
    return false;
  }
  entry.count += 1;
  return true;
}
