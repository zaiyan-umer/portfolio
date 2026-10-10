import type { MetadataRoute } from 'next';
import { siteOrigin } from '@/lib/site';
import { getProjectSitemapEntries } from '@/features/projects/server/sitemap';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    { url: siteOrigin },
    { url: `${siteOrigin}/projects` },
    { url: `${siteOrigin}/education` },
    ...await getProjectSitemapEntries(),
  ];
}
