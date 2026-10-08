import { ArrowLeft, ArrowUpRight, Github, ImageIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { ProjectSummary } from '@/lib/project.types';
import { projectLink, projectText } from '@/lib/project-story';
import { projectPreviewUrl } from '@/lib/project-preview';

export default function ProjectListingView({ projects }: { projects: ProjectSummary[] | null }) {
  const records = Array.isArray(projects) ? projects.filter(project => project && typeof project === 'object') : [];

  return (
    <main className="portfolio-work-page portfolio-container">
      <header className="portfolio-work-heading">
        <h1>Featured projects</h1>
        <p>Selected projects, what I built, and the decisions behind them.</p>
      </header>

      {records.length ? (
        <div className="portfolio-work-grid">
          {records.map((project, index) => {
            const title = projectText(project.title) || 'Untitled project';
            const description = projectText(project.description);
            const slug = projectText(project.slug?.current);
            const technologies = Array.isArray(project.techStack) ? project.techStack.map(projectText).filter(Boolean) : [];
            const preview = projectPreviewUrl(project.thumbnail, 900);
            const githubUrl = projectLink(project.githubUrl);
            const liveUrl = projectLink(project.liveUrl);
            const headingId = `featured-project-${index}`;

            return (
              <article key={project._id || `${slug}-${index}`} aria-labelledby={headingId} className="portfolio-work-card">
                <div className="portfolio-work-card-preview">
                  {preview ? (
                    <Image src={preview} alt={`${title} project preview`} width={900} height={506}
                      sizes="(min-width: 1216px) 516px, (min-width: 768px) calc((100vw - 184px) / 2), (min-width: 640px) calc(100vw - 112px), calc(100vw - 80px)"
                      className="portfolio-project-detail-image" />
                  ) : (
                    <div className="portfolio-project-placeholder"><ImageIcon size={28} strokeWidth={1.25} aria-hidden="true" /><span>Preview unavailable</span></div>
                  )}
                </div>
                <div className="portfolio-work-card-copy">
                  <h2 id={headingId}>{title}</h2>
                  {description ? <p className="portfolio-work-card-description">{description}</p> : null}
                  {technologies.length ? (
                    <ul className="portfolio-project-tech" aria-label={`${title} technologies`}>
                      {technologies.map((tech, techIndex) => <li key={`${tech}-${techIndex}`}>{tech}</li>)}
                    </ul>
                  ) : null}
                  {slug || githubUrl || liveUrl ? (
                    <div className="portfolio-work-card-actions">
                      {slug ? <Link href={`/projects/${encodeURIComponent(slug)}`} className="portfolio-work-card-primary" aria-label={`View ${title} project`}>View project<ArrowUpRight size={16} aria-hidden="true" /></Link> : null}
                      {githubUrl ? <a href={githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`${title} source code (opens in a new tab)`}><Github size={16} aria-hidden="true" />Source code</a> : null}
                      {liveUrl ? <a href={liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`${title} live demo (opens in a new tab)`}>Live demo<ArrowUpRight size={16} aria-hidden="true" /></a> : null}
                    </div>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="portfolio-work-empty">
          <h2>No featured projects yet.</h2>
          <p>Explore the rest of the portfolio in the meantime.</p>
          <Link href="/" className="portfolio-button portfolio-button-secondary"><ArrowLeft size={16} aria-hidden="true" />Back home</Link>
        </div>
      )}
    </main>
  );
}
