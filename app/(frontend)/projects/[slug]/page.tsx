import { getProject, getProjectsForStaticParams } from '@/features/projects/server/data';
import ProjectDetailView from '@/features/projects/pages/ProjectDetailView';
import { projectText } from '@/features/projects/lib/story';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProjectPageProps) {
  'use cache';
  const resolvedParams = await params;
  const slug = resolvedParams?.slug ? decodeURIComponent(resolvedParams.slug) : '';
  const project = await getProject(slug);

  return {
    title: projectText(project?.title) || 'Project',
    description: projectText(project?.description) || undefined,
  };
}

export async function generateStaticParams() {
  const projects = await getProjectsForStaticParams();
  return Array.isArray(projects) ? projects.flatMap(project => {
    const slug = projectText(project?.slug?.current);
    return slug ? [{ slug }] : [];
  }) : [];
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  'use cache';
  const resolvedParams = await params;
  const slug = resolvedParams?.slug ? decodeURIComponent(resolvedParams.slug) : '';
  const project = await getProject(slug);

  return <ProjectDetailView project={project} />;
}
