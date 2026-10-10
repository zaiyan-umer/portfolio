/** Route params are already decoded by Next.js. Preserve literal percent signs. */
export function projectSlug(value: unknown): string | null {
  if (typeof value !== 'string' || !value.trim() || value !== value.trim()) return null;
  if (value === '.' || value === '..' || /[\/\\\u0000-\u001f\u007f]/.test(value)) return null;
  try {
    encodeURIComponent(value);
  } catch {
    return null;
  }
  return value;
}
