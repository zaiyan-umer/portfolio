import ProjectListingView from '@/components/projects/ProjectListingView';
import type { ProjectSummary } from '@/lib/project.types';
import { featuredProjectsQuery } from '@/lib/sanity.queries';
import { client } from '@/sanity/lib/client';

export default async function ProjectsPage() {
  'use cache';
  const projects = await client.fetch<ProjectSummary[] | null>(featuredProjectsQuery);
  return <ProjectListingView projects={projects} />;
}
