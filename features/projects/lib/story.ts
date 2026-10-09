export function projectText(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

export function storyParagraphs(value: unknown): string[] {
  return projectText(value)
    .replace(/\r\n?/g, '\n')
    .split(/\n(?:[^\S\n]*\n)+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export function projectLink(value: unknown): string | null {
  const href = projectText(value);
  if (!href) return null;
  try {
    const url = new URL(href);
    return url.protocol === 'https:' || url.protocol === 'http:' ? href : null;
  } catch {
    return null;
  }
}

export function projectPublication(value: unknown): { dateTime: string; label: string } | null {
  const text = projectText(value);
  if (!text) return null;
  const date = new Date(text);
  if (Number.isNaN(date.getTime())) return null;
  return {
    dateTime: date.toISOString(),
    label: date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' }),
  };
}
