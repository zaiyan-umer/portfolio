import type { AboutMeData, ExperienceData } from '@/features/home/types';

export function normalizeAbout(data: AboutMeData | null) {
  const paragraphs = Array.isArray(data?.paragraphs)
    ? data.paragraphs.filter(
        (paragraph): paragraph is string => typeof paragraph === 'string' && Boolean(paragraph.trim()),
      )
    : [];
  const highlights = Array.isArray(data?.highlights)
    ? data.highlights.flatMap((highlight) => {
        if (typeof highlight?.label !== 'string' || typeof highlight.value !== 'string') return [];
        const label = highlight.label.trim();
        const value = highlight.value.trim();
        return label && value ? [{ label, value }] : [];
      })
    : [];

  return { paragraphs, highlights };
}

const text = (value: unknown) => (typeof value === 'string' ? value.trim() : '');
const strings = (value: unknown): string[] => (Array.isArray(value) ? value.map(text).filter(Boolean) : []);

export function normalizeExperience(data: (ExperienceData | null)[] | null) {
  return Array.isArray(data)
    ? data.flatMap((item) => {
        if (!item || typeof item !== 'object') return [];
        const entry = {
          id: text(item._id),
          company: text(item.company),
          role: text(item.role),
          startDate: text(item.startDate),
          endDate: text(item.endDate),
          location: text(item.location),
          summary: text(item.summary),
          bullets: strings(item.bullets),
          tags: strings(item.tags),
          link: text(item.link),
        };
        return entry.role || entry.company || entry.summary || entry.bullets.length ? [entry] : [];
      })
    : [];
}
