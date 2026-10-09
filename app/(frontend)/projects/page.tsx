import { getFeaturedProjects } from '@/features/projects/server/data';
import ProjectListingView from '@/features/projects/pages/ProjectListingView';

export default async function ProjectsPage() {
  'use cache';
  const projects = await getFeaturedProjects();
  return <ProjectListingView projects={projects} />;
}
