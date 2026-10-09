import { ArrowUpRight, Github } from 'lucide-react';
import Link from 'next/link';
import { projectLink, projectText } from '@/features/projects/lib/story';
import type { ProjectSummary } from '@/features/projects/types';
import ProjectPreview from '@/features/projects/components/ProjectPreview';

export default function ProjectCard({ project, index }: { project: ProjectSummary; index: number }) {
  const title = projectText(project.title) || 'Untitled project';
  const description = projectText(project.description);
  const slug = projectText(project.slug?.current);
  const technologies = Array.isArray(project.techStack) ? project.techStack.map(projectText).filter(Boolean) : [];
  const githubUrl = projectLink(project.githubUrl);
  const liveUrl = projectLink(project.liveUrl);
  const headingId = `featured-project-${index}`;

  return (
    <article aria-labelledby={headingId} className="portfolio-work-card">
      <ProjectPreview thumbnail={project.thumbnail} title={title} variant="listing" />
      <div className="portfolio-work-card-copy">
        <h2 id={headingId}>{title}</h2>
        {description ? <p className="portfolio-work-card-description">{description}</p> : null}
        {technologies.length ? (
          <ul className="portfolio-project-tech" aria-label={`${title} technologies`}>
            {technologies.map((tech, techIndex) => (
              <li key={`${tech}-${techIndex}`}>{tech}</li>
            ))}
          </ul>
        ) : null}
        {slug || githubUrl || liveUrl ? (
          <div className="portfolio-work-card-actions">
            {slug ? (
              <Link
                href={`/projects/${encodeURIComponent(slug)}`}
                className="portfolio-work-card-primary"
                aria-label={`View ${title} project`}
              >
                View project
                <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            ) : null}
            {githubUrl ? (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${title} source code (opens in a new tab)`}
              >
                <Github size={16} aria-hidden="true" />
                Source code
              </a>
            ) : null}
            {liveUrl ? (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${title} live demo (opens in a new tab)`}
              >
                Live demo
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </article>
  );
}
