import { getProject, getProjectsForStaticParams } from '@/features/projects/server/data';
import ProjectDetailView from '@/features/projects/pages/ProjectDetailView';
import { projectText } from '@/features/projects/lib/story';
import { createPageMetadata } from '@/lib/metadata';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProjectPageProps) {
  'use cache';
  const resolvedParams = await params;
  const slug = resolvedParams?.slug ? decodeURIComponent(resolvedParams.slug) : '';
  const project = await getProject(slug);

  if (!project) {
    return createPageMetadata({
      title: 'Project Not Found | Zaiyan Umer',
      description: 'This project could not be found. Explore Zaiyan Umer’s featured projects.',
      noIndex: true,
    });
  }

  const title = projectText(project.title) || 'Project';
  return createPageMetadata({
    title: `${title} | Zaiyan Umer`,
    description: projectText(project.description) || `Explore ${title}, a project by full-stack developer Zaiyan Umer.`,
    path: `/projects/${encodeURIComponent(slug)}`,
  });
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
