import { getFeaturedProjects } from '@/features/projects/server/data';
import ProjectListingView from '@/features/projects/pages/ProjectListingView';
import { createPageMetadata } from '@/lib/metadata';

export const metadata = createPageMetadata({
  title: 'Featured Projects | Zaiyan Umer',
  description:
    'Explore Zaiyan Umer’s featured projects in full-stack development, AI automation, and backend systems, with project details, demos, and source code.',
  path: '/projects',
});

export default async function ProjectsPage() {
  'use cache';
  const projects = await getFeaturedProjects();
  return <ProjectListingView projects={projects} />;
}
