import 'server-only';
import { client } from '@/sanity/lib/client';
import { featuredProjectsQuery, projectQuery, projectsQuery } from '@/sanity/lib/queries';
import type { ProjectDetail, ProjectSummary } from '@/features/projects/types';

export function getFeaturedProjects() {
  return client.fetch<ProjectSummary[] | null>(featuredProjectsQuery);
}

export function getProject(slug: string) {
  return client.fetch<ProjectDetail | null>(projectQuery, { slug });
}

export function getProjectsForStaticParams() {
  return client.fetch<ProjectSummary[]>(projectsQuery);
}
