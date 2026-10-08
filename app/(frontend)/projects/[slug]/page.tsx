import ProjectDetailView from '@/components/projects/ProjectDetailView';
import type { ProjectDetail, ProjectSummary } from '@/lib/project.types';
import { projectText } from '@/lib/project-story';
import { projectQuery, projectsQuery } from '@/lib/sanity.queries';
import { client } from '@/sanity/lib/client';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProjectPageProps) {
  'use cache';
  const resolvedParams = await params;
  const slug = resolvedParams?.slug ? decodeURIComponent(resolvedParams.slug) : '';
  const project = await client.fetch<ProjectDetail | null>(projectQuery, { slug });

  return {
    title: projectText(project?.title) || 'Project',
    description: projectText(project?.description) || undefined,
  };
}

export async function generateStaticParams() {
  const projects = await client.fetch<ProjectSummary[]>(projectsQuery);
  return Array.isArray(projects) ? projects.flatMap(project => {
    const slug = projectText(project?.slug?.current);
    return slug ? [{ slug }] : [];
  }) : [];
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  'use cache';
  const resolvedParams = await params;
  const slug = resolvedParams?.slug ? decodeURIComponent(resolvedParams.slug) : '';
  const project = await client.fetch<ProjectDetail | null>(projectQuery, { slug });

  return <ProjectDetailView project={project} />;
}
