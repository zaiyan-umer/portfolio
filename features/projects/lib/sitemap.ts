import type { MetadataRoute } from 'next';
import { siteOrigin } from '@/lib/site';
import { projectSlug } from '@/features/projects/lib/slug';

export interface ProjectSitemapRecord {
  slug?: { current?: string | null } | null;
  _updatedAt?: string | null;
}

export function projectSitemapEntries(records: ProjectSitemapRecord[]): MetadataRoute.Sitemap {
  const seen = new Set<string>();
  return records.flatMap(record => {
    const slug = projectSlug(record?.slug?.current);
    // Next 16.1.4's fallback route matcher can decode literal '%' again and
    // fail before the page runs. Do not advertise these unsupported URLs.
    if (!slug || slug.includes('%')) return [];
    const url = `${siteOrigin}/projects/${encodeURIComponent(slug)}`;
    if (seen.has(url)) return [];
    seen.add(url);
    const timestamp = record?._updatedAt;
    const validDate = typeof timestamp === 'string'
      && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?Z$/.test(timestamp)
      && Number.isFinite(Date.parse(timestamp))
      && new Date(timestamp).toISOString().slice(0, 19) === timestamp.slice(0, 19);
    return [{ url, ...(validDate ? { lastModified: new Date(timestamp) } : {}) }];
  });
}
