import type { CurrentInterest, CurrentlyNoteBlock, CurrentlyNoteLink, CurrentlySnapshot } from '@/features/home/types';

const text = (value: unknown) => typeof value === 'string' ? value.trim() : '';

export function currentlyLink(value: unknown): string | null {
  const href = text(value);
  if (!href || /[\u0000-\u001f\u007f\\]/.test(href)) return null;
  try {
    if (href.startsWith('/')) {
      const origin = 'https://portfolio.invalid';
      return !href.startsWith('//') && new URL(href, origin).origin === origin ? href : null;
    }
    const url = new URL(href);
    return (url.protocol === 'https:' || url.protocol === 'http:') && !url.username && !url.password ? href : null;
  } catch {
    return null;
  }
}

function records(value: unknown): Record<string, unknown>[] {
  return Array.isArray(value)
    ? value.filter((item): item is Record<string, unknown> => Boolean(item) && typeof item === 'object' && !Array.isArray(item))
    : [];
}

/** Restrict published content to one readable paragraph with safe inline links. */
export function normalizeCurrentNote(value: unknown): CurrentlyNoteBlock[] {
  for (const [blockIndex, block] of records(value).entries()) {
    if (block._type !== 'block' || (block.style && block.style !== 'normal') || block.listItem) continue;
    const links = new Map<string, CurrentlyNoteLink>();
    for (const mark of records(block.markDefs)) {
      const key = text(mark._key);
      const href = currentlyLink(mark.href);
      if (mark._type === 'link' && key && href && !links.has(key)) {
        links.set(key, { _type: 'link', _key: key, href });
      }
    }
    const children: CurrentlyNoteBlock['children'] = records(block.children).flatMap((span, index) => {
      if (span._type !== 'span' || typeof span.text !== 'string') return [];
      const marks = Array.isArray(span.marks)
        ? span.marks.filter((mark): mark is string => typeof mark === 'string' && links.has(mark)).slice(0, 1)
        : [];
      return [{ _type: 'span', _key: `${text(span._key) || 'span'}-${index}`, text: span.text, marks }];
    });
    if (!children.some((span) => span.text.trim())) continue;
    return [{ _type: 'block', _key: text(block._key) || `note-${blockIndex}`, style: 'normal', children, markDefs: [...links.values()] }];
  }
  return [];
}

function legacyNote(item: Record<string, unknown>): CurrentlyNoteBlock[] {
  const title = text(item.title);
  if (!title) return [];
  const href = currentlyLink(item.href);
  return [{
    _type: 'block', _key: 'legacy-note', style: 'normal',
    children: [{ _type: 'span', _key: 'legacy-text', text: title, marks: href ? ['legacy-link'] : [] }],
    markDefs: href ? [{ _type: 'link', _key: 'legacy-link', href }] : [],
  }];
}

function reviewedDate(value: unknown): CurrentlySnapshot['updatedAt'] {
  const dateTime = text(value);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateTime)) return null;
  const date = new Date(`${dateTime}T00:00:00.000Z`);
  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== dateTime) return null;
  return {
    dateTime,
    label: date.toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' }),
  };
}

export function normalizeCurrently(value: unknown): CurrentlySnapshot {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return { entries: [], updatedAt: null };
  const data = value as Record<string, unknown>;
  const entries: CurrentInterest[] = [];
  if (Array.isArray(data.entries)) {
    for (const [index, value] of data.entries.entries()) {
      if (!value || typeof value !== 'object' || Array.isArray(value)) continue;
      const item = value as Record<string, unknown>;
      const currentNote = normalizeCurrentNote(item.note);
      const note = currentNote.length ? currentNote : legacyNote(item);
      if (!note.length) continue;
      entries.push({ key: `${text(item._key) || 'interest'}-${index}`, note, description: text(item.description) || null });
      if (entries.length === 3) break;
    }
  }
  return { entries, updatedAt: reviewedDate(data.updatedAt) };
}
