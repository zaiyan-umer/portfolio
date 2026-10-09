import { ArrowLeft, ArrowUpRight, Github } from 'lucide-react';
import Link from 'next/link';
import type { ProjectDetail } from '@/features/projects/types';
import { projectLink, projectPublication, projectText } from '@/features/projects/lib/story';
import ProjectPreview from '@/features/projects/components/ProjectPreview';
import ProjectStory from '@/features/projects/components/ProjectStory';

export default function ProjectDetailView({ project }: { project: ProjectDetail | null }) {
  if (!project) {
    return (
      <main className="portfolio-project-detail portfolio-project-missing portfolio-container">
        <p className="portfolio-eyebrow">Projects</p>
        <h1>Project Not Found</h1>
        <p>This project could not be found. Explore the other projects instead.</p>
        <Link href="/projects" className="portfolio-button portfolio-button-secondary">
          <ArrowLeft size={16} aria-hidden="true" />
          Back to projects
        </Link>
      </main>
    );
  }

  const title = projectText(project.title) || 'Untitled project';
  const description = projectText(project.description);
  const technologies = Array.isArray(project.techStack) ? project.techStack.map(projectText).filter(Boolean) : [];
  const liveUrl = projectLink(project.liveUrl);
  const githubUrl = projectLink(project.githubUrl);
  const publication = projectPublication(project.publishedAt);
  return (
    <main className="portfolio-project-detail portfolio-container">
      <article aria-labelledby="project-title">
        <header className="portfolio-project-detail-header">
          <p className="portfolio-eyebrow">Project</p>
          <h1 id="project-title">{title}</h1>
          {description ? <p className="portfolio-project-detail-description">{description}</p> : null}
          {technologies.length ? (
            <ul className="portfolio-project-tech" aria-label={`${title} technologies`}>
              {technologies.map((tech, index) => (
                <li key={`${tech}-${index}`}>{tech}</li>
              ))}
            </ul>
          ) : null}
          {liveUrl || githubUrl ? (
            <div className="portfolio-project-detail-actions">
              {liveUrl ? (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="portfolio-button portfolio-button-primary"
                  aria-label={`${title} live demo (opens in a new tab)`}
                >
                  Live demo
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              ) : null}
              {githubUrl ? (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="portfolio-button portfolio-button-secondary"
                  aria-label={`${title} source code (opens in a new tab)`}
                >
                  <Github size={16} aria-hidden="true" />
                  Source code
                </a>
              ) : null}
            </div>
          ) : null}
        </header>

        <ProjectPreview thumbnail={project.thumbnail} title={title} variant="detail" />
        <ProjectStory project={project} />

        <div className="portfolio-project-detail-bottom">
          {publication ? (
            <p>
              Published on <time dateTime={publication.dateTime}>{publication.label}</time>
            </p>
          ) : null}
          <Link href="/projects">
            <ArrowLeft size={16} aria-hidden="true" />
            Back to projects
          </Link>
        </div>
      </article>
    </main>
  );
}
