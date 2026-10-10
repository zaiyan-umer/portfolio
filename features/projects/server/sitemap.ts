import 'server-only';
import { cacheLife } from 'next/cache';
import { client } from '@/sanity/lib/client';
import { projectSitemapQuery } from '@/sanity/lib/queries';
import { projectSitemapEntries, type ProjectSitemapRecord } from '@/features/projects/lib/sitemap';

export async function getProjectSitemapEntries() {
  'use cache';
  cacheLife('hours');
  const records = await client.fetch<ProjectSitemapRecord[]>(projectSitemapQuery, {}, { perspective: 'published' });
  if (!Array.isArray(records)) throw new Error('Invalid project sitemap response');
  return projectSitemapEntries(records);
}
