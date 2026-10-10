import { getProject, getProjectsForStaticParams } from '@/features/projects/server/data';
import ProjectDetailView from '@/features/projects/pages/ProjectDetailView';
import { projectText } from '@/features/projects/lib/story';
import { createPageMetadata } from '@/lib/metadata';
import { notFound } from 'next/navigation';
import { projectSlug } from '@/features/projects/lib/slug';
import { Suspense } from 'react';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

function MissingProjectStatus(): never {
  notFound();
}

export async function generateMetadata({ params }: ProjectPageProps) {
  'use cache';
  const resolvedParams = await params;
  const slug = projectSlug(resolvedParams?.slug);
  const project = slug ? await getProject(slug) : null;

  if (!project || !slug) {
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
    const slug = projectSlug(project?.slug?.current);
    return slug ? [{ slug }] : [];
  }) : [];
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  'use cache';
  const resolvedParams = await params;
  const slug = projectSlug(resolvedParams?.slug);
  const project = slug ? await getProject(slug) : null;
  if (!project) {
    // Keep recovery HTML visible without JavaScript. Next 16 can otherwise
    // return an empty error document when notFound() aborts the page shell.
    return (
      <>
        <ProjectDetailView project={null} />
        <Suspense fallback={null}>
          <MissingProjectStatus />
        </Suspense>
      </>
    );
  }

  return <ProjectDetailView project={project} />;
}
