import { ArrowLeft, ArrowUpRight, Github, ImageIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { ProjectDetail } from '@/lib/project.types';
import { projectLink, projectPublication, projectText, storyParagraphs } from '@/lib/project-story';
import { projectPreviewUrl } from '@/lib/project-preview';

const storySections = [
  { key: 'overview', title: 'Overview' },
  { key: 'contribution', title: 'My contribution' },
  { key: 'technicalNotes', title: 'Technical notes' },
] as const;

export default function ProjectDetailView({ project }: { project: ProjectDetail | null }) {
  if (!project) {
    return (
      <main className="portfolio-project-detail portfolio-project-missing portfolio-container">
        <p className="portfolio-eyebrow">Projects</p>
        <h1>Project Not Found</h1>
        <p>This project could not be found. Explore the other projects instead.</p>
        <Link href="/projects" className="portfolio-button portfolio-button-secondary"><ArrowLeft size={16} aria-hidden="true" />Back to projects</Link>
      </main>
    );
  }

  const title = projectText(project.title) || 'Untitled project';
  const description = projectText(project.description);
  const technologies = Array.isArray(project.techStack) ? project.techStack.map(projectText).filter(Boolean) : [];
  const liveUrl = projectLink(project.liveUrl);
  const githubUrl = projectLink(project.githubUrl);
  const preview = projectPreviewUrl(project.thumbnail);
  const publication = projectPublication(project.publishedAt);
  const sections = storySections.map(section => ({ ...section, paragraphs: storyParagraphs(project[section.key]) }))
    .filter(section => section.paragraphs.length > 0);

  return (
    <main className="portfolio-project-detail portfolio-container">
      <article aria-labelledby="project-title">
        <header className="portfolio-project-detail-header">
          <p className="portfolio-eyebrow">Project</p>
          <h1 id="project-title">{title}</h1>
          {description ? <p className="portfolio-project-detail-description">{description}</p> : null}
          {technologies.length ? (
            <ul className="portfolio-project-tech" aria-label={`${title} technologies`}>
              {technologies.map((tech, index) => <li key={`${tech}-${index}`}>{tech}</li>)}
            </ul>
          ) : null}
          {liveUrl || githubUrl ? (
            <div className="portfolio-project-detail-actions">
              {liveUrl ? <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="portfolio-button portfolio-button-primary" aria-label={`${title} live demo (opens in a new tab)`}>Live demo<ArrowUpRight size={16} aria-hidden="true" /></a> : null}
              {githubUrl ? <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="portfolio-button portfolio-button-secondary" aria-label={`${title} source code (opens in a new tab)`}><Github size={16} aria-hidden="true" />Source code</a> : null}
            </div>
          ) : null}
        </header>

        <div className="portfolio-project-detail-preview">
          {preview ? (
            <Image src={preview} alt={`${title} project preview`} width={1800} height={1013}
              sizes="(min-width: 1216px) 1152px, (min-width: 640px) calc(100vw - 64px), calc(100vw - 40px)"
              className="portfolio-project-detail-image" />
          ) : (
            <div className="portfolio-project-placeholder"><ImageIcon size={32} strokeWidth={1.25} aria-hidden="true" /><span>Preview unavailable</span></div>
          )}
        </div>

        {sections.length ? (
          <div className="portfolio-project-story">
            {sections.map(section => (
              <section key={section.key} aria-labelledby={`project-${section.key}-heading`} className={`portfolio-project-story-section portfolio-project-story-${section.key}`}>
                <h2 id={`project-${section.key}-heading`}>{section.title}</h2>
                <div className="portfolio-project-story-copy">
                  {section.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
                </div>
              </section>
            ))}
          </div>
        ) : null}

        <div className="portfolio-project-detail-bottom">
          {publication ? <p>Published on <time dateTime={publication.dateTime}>{publication.label}</time></p> : null}
          <Link href="/projects"><ArrowLeft size={16} aria-hidden="true" />Back to projects</Link>
        </div>
      </article>
    </main>
  );
}
